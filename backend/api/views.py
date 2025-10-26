"""
API views for F1 data endpoints.

Endpoints provided:
- get_live_standings: Returns current F1 driver standings.
- get_live_session_data: Returns data from the current/latest session.
- get_historical_race_analysis: Returns detailed historical race analysis
  for a given year and Grand Prix.
"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.services.openf1_service import OpenF1Service
from api.services.fastf1_service import FastF1Service


@api_view(['GET'])
def get_live_standings(request):
    """Get current F1 driver standings."""
    service = OpenF1Service()
    season = int(request.query_params.get('season', 2025))
    standings = service.get_driver_standings(season)
    return Response(standings)


def get_live_session_data(request):
    """Get data from current/latest session."""
    service = OpenF1Service()
    session = service.get_current_session()

    if session:
        positions = service.get_live_positions(session['session_key'])
        return Response({
            'session': session,
            'positions': positions
        })
    return Response(
        {'message': 'No active session'},
        status=404
    )
def get_historical_race_analysis(request, year, gp_name):
    """Get detailed historical race analysis."""
    service = FastF1Service()
    session = service.get_session_data(year, gp_name, 'R')

    if not session or not hasattr(session, 'results'):
        return Response(
            {'message': 'Session not found or invalid'},
            status=404
        )

    # Extract relevant data
    # results = session.results[
    #     ['Abbreviation', 'Position', 'Points', 'TeamName']
    # ]

    return Response({
    return Response({
        'event': session.event.get('EventName', ''),
        'session_info': {
            'date': str(session.date),
            'event': session.event['EventName'],
            'type': session.name
        }
    })
