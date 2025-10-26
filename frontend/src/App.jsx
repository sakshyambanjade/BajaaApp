import { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import LiveLeaderboard from './components/Dashboard/LiveLeaderboard';
import WinProbability from './components/WinProbability';
import TelemetryCharts from './components/TelemetryCharts';
import StatsGrid from './components/StatsGrid';
import { Zap, Radio } from 'lucide-react';
import './App.css';

function App() {
  const { liveData, connected } = useWebSocket();
  const [predictions] = useState(null);
  useEffect(() => {
    // Only call prediction API if you want to test backend
    // Comment this out until backend endpoints are ready
    // fetchPredictions();
  }, []);

  return (
    <div className="min-h-screen bg-f1-darker relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-f1-darker via-f1-dark to-f1-darker opacity-50"></div>
      <div className="fixed inset-0 racing-stripe opacity-5"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-f1-gray-800 animate-slide-in">
        <div className="max-w-[1600px] mx-auto py-5 px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-f1-teal-400 blur-xl opacity-30 animate-pulse-slow"></div>
                <span className="text-5xl relative z-10">🏎️</span>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  <span className="gradient-text neon-text">PITLANE</span>
                  <span className="text-f1-red ml-2">AI</span>
                </h1>
                <p className="text-xs text-f1-gray-400 font-mono mt-1">REAL-TIME F1 ANALYTICS</p>
              </div>
            </div>
            
            {/* Race Info & Status */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="flex items-center gap-2 text-f1-gray-300">
                  <Zap className="w-4 h-4 text-f1-teal-400" />
                  <span className="font-semibold text-white text-lg">2025 Monaco GP</span>
                </div>
                <p className="text-sm text-f1-gray-400 font-mono">Lap 47 / 78</p>
              </div>
              
              <div className={`flex items-center gap-3 px-5 py-3 rounded-xl ${
                connected 
                  ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30' 
                  : 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30'
              }`}>
                <Radio className={`w-5 h-5 ${connected ? 'text-green-400' : 'text-yellow-400'}`} />
                <div>
                  <div className={`text-sm font-bold ${connected ? 'text-green-400' : 'text-yellow-400'}`}>
                    {connected ? 'LIVE' : 'DEMO MODE'}
                  </div>
                  <div className="text-xs text-f1-gray-400 font-mono">
                    {connected ? 'Real-time data' : 'Simulated data'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto py-8 px-8 space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <StatsGrid />
        </div>

        {/* Live Leaderboard */}
        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <LiveLeaderboard liveData={liveData} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <WinProbability predictions={predictions} />
          <TelemetryCharts telemetry={liveData?.telemetry} />
        </div>

        {/* ML Info Card */}
        <div className="glass rounded-2xl p-8 border border-f1-teal-400/20 shadow-glow card-hover animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-f1-teal-400/20 to-f1-teal-600/20 rounded-xl p-4 shadow-inner-glow">
              <Zap className="w-8 h-8 text-f1-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3 gradient-text">AI-Powered Predictions</h3>
              <p className="text-f1-gray-300 leading-relaxed mb-4">
                Leveraging cutting-edge machine learning models trained on 10,000+ historical race data points. 
                Real-time predictions powered by XGBoost classification, LSTM time-series forecasting, 
                Monte Carlo simulation, and reinforcement learning for optimal pit strategy.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-f1-teal-500/20 to-f1-teal-600/20 border border-f1-teal-400/30 text-f1-teal-400 text-sm font-semibold rounded-lg shadow-glow">
                  XGBoost
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 text-blue-400 text-sm font-semibold rounded-lg">
                  LSTM
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 text-purple-400 text-sm font-semibold rounded-lg">
                  Monte Carlo
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 text-orange-400 text-sm font-semibold rounded-lg">
                  RL Pit Strategy
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-f1-gray-800 mt-16 py-8 glass">
        <div className="max-w-[1600px] mx-auto px-8 text-center">
          <p className="text-f1-gray-400 font-mono text-sm">
            PITLANE AI © 2025 | Real-time F1 Analytics Platform
          </p>
          <p className="text-f1-gray-500 text-xs mt-2 font-mono">
            Data from OpenF1 API & FastF1 • Predictions via ML Models
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
