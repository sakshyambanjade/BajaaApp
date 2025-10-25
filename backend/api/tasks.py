from celery import shared_task
import fastf1
import requests
import pandas as pd
from datetime import datetime
from .models import Race, Driver, Session, TelemetryData
import os

# Create cache directory if it doesn't exist
cache_dir = os.path.join(os.path.dirname(__file__), '..', 'cache')
os.makedirs(cache_dir, exist_ok=True)

# Enable FastF1 cache
fastf1.Cache.enable_cache(cache_dir)

# Use Jolpica F1 API (Ergast replacement)
fastf1.ergast.interface.BASE_URL = "https://api.jolpi.ca/ergast/f1"

@shared_task
def fetch_ergast_historical_data(year=2024):
    """Fetch historical race data from Jolpica F1 API"""
    base_url = f'https://api.jolpi.ca/ergast/f1/{year}.json'
    
    try:
        response = requests.get(base_url, timeout=10)
        response.raise_for_status()
        data = response.json()
        races = data['MRData']['RaceTable']['Races']
        
        for race_data in races:
            Race.objects.update_or_create(
                season=year,
                round=race_data['round'],
                defaults={
                    'name': race_data['raceName'],
                    'circuit': race_data['Circuit']['circuitName'],
                    'date': race_data['date'],
                }
            )
        
        return f"Fetched {len(races)} races for {year}"
    except Exception as e:
        return f"Error fetching data: {str(e)}"

@shared_task
def fetch_fastf1_session_data(year, race_round, session_type='R'):
    """Fetch telemetry data using FastF1"""
    try:
        session = fastf1.get_session(year, race_round, session_type)
        session.load()
        
        # Get or create race
        race, _ = Race.objects.get_or_create(
            season=year,
            round=race_round,
            defaults={
                'name': session.event['EventName'],
                'circuit': session.event['Location'],
                'date': session.event['EventDate']
            }
        )
        
        # Create session
        session_obj, _ = Session.objects.get_or_create(
            race=race,
            session_type=session_type,
            defaults={'date': session.event['EventDate']}
        )
        
        # Get laps data
        laps = session.laps
        
        # Store in database
        for idx, lap in laps.iterrows():
            TelemetryData.objects.create(
                session=session_obj,
                driver_number=lap['DriverNumber'],
                lap_number=lap['LapNumber'],
                lap_time=lap['LapTime'].total_seconds() if pd.notna(lap['LapTime']) else None,
                sector1_time=lap['Sector1Time'].total_seconds() if pd.notna(lap['Sector1Time']) else None,
                sector2_time=lap['Sector2Time'].total_seconds() if pd.notna(lap['Sector2Time']) else None,
                sector3_time=lap['Sector3Time'].total_seconds() if pd.notna(lap['Sector3Time']) else None,
                speed_trap=lap.get('SpeedST'),
                compound=lap.get('Compound'),
                tyre_life=lap.get('TyreLife'),
            )
        
        return f"Loaded {len(laps)} laps for {year} Round {race_round} {session_type}"
    except Exception as e:
        return f"Error loading session data: {str(e)}"

@shared_task
def ingest_live_race_data(race_id):
    """Background task to continuously fetch live race data"""
    try:
        from channels.layers import get_channel_layer
        from asgiref.sync import async_to_sync
        
        channel_layer = get_channel_layer()
        
        # Simulate live data fetch
        live_data = {
            'positions': [],
            'lap_times': [],
            'predictions': {}
        }
        
        async_to_sync(channel_layer.group_send)(
            'live_race_data',
            {
                'type': 'race_update',
                'data': live_data
            }
        )
        
        return "Live data ingested successfully"
    except Exception as e:
        return f"Error ingesting live data: {str(e)}"
