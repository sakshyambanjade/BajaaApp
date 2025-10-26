from datetime import datetime
import requests
from requests.exceptions import Timeout, RequestException


class OpenF1Service:
    """Service class for interacting with OpenF1 API endpoints."""
    
    BASE_URL = "https://api.openf1.org/v1"
    DEFAULT_TIMEOUT = (3, 10)  # (connect_timeout, read_timeout) in seconds
    
    def get_current_session(self):
        """
        Get the latest or ongoing F1 session.
        
        Returns:
            dict: Session data from OpenF1 API
            
        Raises:
            Timeout: If request exceeds timeout limit
            RequestException: If request fails
        """
        try:
            response = requests.get(
                f"{self.BASE_URL}/sessions?session_key=latest",
                timeout=self.DEFAULT_TIMEOUT
            )
            response.raise_for_status()
        except Timeout as exc:
            raise Timeout("Request to OpenF1 API timed out") from exc
        except RequestException as e:
            raise RequestException(f"Failed to fetch current session: {e}") from e
            raise RequestException(f"Failed to fetch current session: {e}")
    
    def get_driver_standings(self, season=2025):
        """
        Get current driver standings for specified season.
        
        Args:
            season (int): F1 season year (default: 2025)
            
        Returns:
            dict: Driver standings data
            
        Raises:
            Timeout: If request exceeds timeout limit
            RequestException: If request fails
        """
        try:
            response = requests.get(
                f"{self.BASE_URL}/drivers?season_key={season}",
                timeout=self.DEFAULT_TIMEOUT
            )
            response.raise_for_status()
        except Timeout as exc:
            raise Timeout("Request to fetch driver standings timed out") from exc
        except RequestException as e:
            raise RequestException(f"Failed to fetch driver standings: {e}") from e
            raise RequestException(f"Failed to fetch driver standings: {e}")
    
    def get_live_positions(self, session_key):
        """
        Get real-time driver positions during a session.
        
        Args:
            session_key (str): Unique session identifier
            
        Returns:
            dict: Live position data for all drivers
            
        Raises:
            Timeout: If request exceeds timeout limit
            RequestException: If request fails
        """
        try:
            response = requests.get(
                f"{self.BASE_URL}/position",
                params={
                    "session_key": session_key,
                    "date>": datetime.now().isoformat()
                },
                timeout=self.DEFAULT_TIMEOUT
            )
            response.raise_for_status()
        except Timeout as exc:
            raise Timeout("Request to fetch live positions timed out") from exc
        except RequestException as e:
            raise RequestException(f"Failed to fetch live positions: {e}") from e
            raise RequestException(f"Failed to fetch live positions: {e}")
    
    def get_car_telemetry(self, session_key, driver_number):
        """
        Get live car telemetry data for specific driver.
        
        Args:
            driver_number (int): Driver number (e.g., 1 for Verstappen, 4 for Norris
                )
            driver_number (int): Driver number (e.g., 1 for Verstappen, 4 for Norris)
            dict: Car telemetry data including speed, throttle, brake, gear, 
                etc.
        Returns:
            dict: Car telemetry data including speed, throttle, brake, gear, etc.
            
        Raises:
            Timeout: If request exceeds timeout limit
            RequestException: If request fails
        """
        try:
            response = requests.get(
                f"{self.BASE_URL}/car_data",
                params={
                    "session_key": session_key,
                    "driver_number": driver_number
                },
                timeout=self.DEFAULT_TIMEOUT
            )
            response.raise_for_status()
            return response.json()
        except Timeout as exc:
            raise Timeout("Request to fetch car telemetry timed out") from exc
        except RequestException as e:
            raise RequestException(f"Failed to fetch car telemetry: {e}") from e
    
    def get_lap_times(self, session_key, driver_number=None):
        """
        Get lap times for session, optionally filtered by driver.
        
        Args:
            session_key (str): Unique session identifier
            driver_number (int, optional): Driver number to filter results
            
        Returns:
            dict: Lap time data
            
        Raises:
            Timeout: If request exceeds timeout limit
            RequestException: If request fails
        """
        params = {"session_key": session_key}
        if driver_number:
            params["driver_number"] = driver_number
        
        try:
            response = requests.get(
                f"{self.BASE_URL}/laps",
                params=params,
                timeout=self.DEFAULT_TIMEOUT
            )
            response.raise_for_status()
            return response.json()
        except Timeout as exc:
            raise Timeout("Request to fetch lap times timed out") from exc
        except RequestException as e:
            raise RequestException(f"Failed to fetch lap times: {e}")
