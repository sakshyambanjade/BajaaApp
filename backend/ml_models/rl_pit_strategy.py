import numpy as np
import tensorflow as tf
from tensorflow import keras
from collections import deque
import random

class PitStopEnvironment:
    """Simplified F1 race environment for pit stop optimization"""
    
    def __init__(self, total_laps=50):
        self.total_laps = total_laps
        self.current_lap = 0
        self.tire_age = 0
        self.fuel_load = 100
        self.position = 5
        
    def reset(self):
        self.current_lap = 0
        self.tire_age = 0
        self.fuel_load = 100
        self.position = np.random.randint(1, 20)
        return self._get_state()
    
    def _get_state(self):
        return np.array([
            self.current_lap / self.total_laps,
            self.tire_age / 50,
            self.fuel_load / 100,
            self.position / 20
        ])
    
    def step(self, action):
        """
        action: 0 = continue, 1 = pit
        """
        reward = 0
        
        if action == 1:  # Pit stop
            # Pit stop time penalty
            time_lost = 25  # seconds
            self.tire_age = 0
            self.position += np.random.randint(1, 4)  # Lose positions
            reward -= 10
        else:
            # Continue racing
            self.tire_age += 1
            # Tire degradation affects lap time
            degradation = self.tire_age * 0.05
            reward -= degradation
        
        self.current_lap += 1
        self.fuel_load -= 2
        
        # Check if race finished
        done = self.current_lap >= self.total_laps
        
        if done:
            # Reward based on final position
            reward += (20 - self.position) * 5
        
        return self._get_state(), reward, done

class DQNPitAgent:
    """Deep Q-Network for pit stop decisions"""
    
    def __init__(self, state_size=4, action_size=2):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=2000)
        self.gamma = 0.95
        self.epsilon = 1.0
        self.epsilon_decay = 0.995
        self.epsilon_min = 0.01
        self.learning_rate = 0.001
        self.model = self._build_model()
        
    def _build_model(self):
        model = keras.Sequential([
            layers.Dense(24, activation='relu', input_shape=(self.state_size,)),
            layers.Dense(24, activation='relu'),
            layers.Dense(self.action_size, activation='linear')
        ])
        model.compile(optimizer=keras.optimizers.Adam(lr=self.learning_rate),
                      loss='mse')
        return model
    
    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))
    
    def act(self, state):
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.action_size)
        q_values = self.model.predict(state, verbose=0)
        return np.argmax(q_values[0])
    
    def replay(self, batch_size=32):
        if len(self.memory) < batch_size:
            return
        
        minibatch = random.sample(self.memory, batch_size)
        
        for state, action, reward, next_state, done in minibatch:
            target = reward
            if not done:
                target += self.gamma * np.amax(
                    self.model.predict(next_state, verbose=0)[0]
                )
            
            target_f = self.model.predict(state, verbose=0)
            target_f[0][action] = target
            
            self.model.fit(state, target_f, epochs=1, verbose=0)
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay
    
    def save(self, path):
        self.model.save(path)

# Training loop
env = PitStopEnvironment(total_laps=50)
agent = DQNPitAgent()

episodes = 500
for e in range(episodes):
    state = env.reset()
    state = np.reshape(state, [1, 4])
    total_reward = 0
    
    for time in range(50):
        action = agent.act(state)
        next_state, reward, done = env.step(action)
        next_state = np.reshape(next_state, [1, 4])
        
        agent.remember(state, action, reward, next_state, done)
        state = next_state
        total_reward += reward
        
        if done:
            print(f"Episode: {e}/{episodes}, Reward: {total_reward:.2f}, Epsilon: {agent.epsilon:.2f}")
            break
        
        agent.replay(32)

agent.save('../ml_models/dqn_pit_agent.h5')
