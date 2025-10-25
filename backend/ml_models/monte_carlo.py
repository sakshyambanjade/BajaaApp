import numpy as np
import pandas as pd

class MonteCarloRaceSimulator:
    def __init__(self, drivers_data):
        """
        drivers_data: DataFrame with columns:
        - driver_name
        - avg_finish_position
        - std_finish_position
        - dnf_probability
        """
        self.drivers_data = drivers_data
    
    def simulate_single_race(self):
        """Simulate one race outcome"""
        results = []
        
        for _, driver in self.drivers_data.iterrows():
            # Sample position from normal distribution
            position = np.random.normal(
                driver['avg_finish_position'],
                driver['std_finish_position']
            )
            
            # Apply DNF probability
            if np.random.random() < driver['dnf_probability']:
                position = np.inf  # DNF
            
            results.append({
                'driver': driver['driver_name'],
                'position': position
            })
        
        # Sort by position
        results_df = pd.DataFrame(results)
        results_df = results_df.sort_values('position').reset_index(drop=True)
        results_df['final_position'] = range(1, len(results_df) + 1)
        
        return results_df
    
    def run_simulation(self, n_simulations=10000):
        """Run Monte Carlo simulation"""
        win_counts = {driver: 0 for driver in self.drivers_data['driver_name']}
        podium_counts = {driver: 0 for driver in self.drivers_data['driver_name']}
        
        for _ in range(n_simulations):
            race_result = self.simulate_single_race()
            
            # Count wins
            winner = race_result.iloc[0]['driver']
            win_counts[winner] += 1
            
            # Count podiums
            for idx in range(min(3, len(race_result))):
                driver = race_result.iloc[idx]['driver']
                podium_counts[driver] += 1
        
        # Calculate probabilities
        win_probs = {k: v/n_simulations for k, v in win_counts.items()}
        podium_probs = {k: v/n_simulations for k, v in podium_counts.items()}
        
        return {
            'win_probabilities': win_probs,
            'podium_probabilities': podium_probs
        }
