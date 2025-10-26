// frontend/src/components/TelemetryCharts.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TelemetryCharts({ telemetry }) {
  const generateMockData = () => {
    return Array.from({ length: 50 }, (_, i) => ({
      time: i,
      speed: 280 + Math.random() * 40,
      throttle: 85 + Math.random() * 15,
      brake: Math.random() * 20,
      rpm: 11000 + Math.random() * 2000,
    }));
  };

  // Convert telemetry object to array format for Recharts
  const chartData = telemetry ? [
    {
      time: 0,
      speed: telemetry.speed || 0,
      throttle: telemetry.throttle || 0,
      brake: telemetry.brake || 0,
      rpm: telemetry.rpm || 0,
    }
  ] : generateMockData();

  return (
    <div className="glass rounded-2xl p-6 border border-f1-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">📈 Live Telemetry</h2>
      
      {!telemetry && (
        <p className="text-f1-gray-400 text-sm mb-4">
          Showing simulated data - waiting for live telemetry...
        </p>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#9ca3af"
            label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="#06b6d4" 
            strokeWidth={2}
            dot={false}
            name="Speed (km/h)"
          />
          <Line 
            type="monotone" 
            dataKey="throttle" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={false}
            name="Throttle (%)"
          />
          <Line 
            type="monotone" 
            dataKey="brake" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={false}
            name="Brake (%)"
          />
        </LineChart>
      </ResponsiveContainer>

      {telemetry && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-f1-gray-400 text-xs">Speed</p>
            <p className="text-2xl font-bold text-f1-teal-400">{telemetry.speed}</p>
            <p className="text-xs text-f1-gray-500">km/h</p>
          </div>
          <div className="text-center">
            <p className="text-f1-gray-400 text-xs">Throttle</p>
            <p className="text-2xl font-bold text-green-400">{telemetry.throttle}%</p>
          </div>
          <div className="text-center">
            <p className="text-f1-gray-400 text-xs">Brake</p>
            <p className="text-2xl font-bold text-red-400">{telemetry.brake}%</p>
          </div>
          <div className="text-center">
            <p className="text-f1-gray-400 text-xs">Gear</p>
            <p className="text-2xl font-bold text-purple-400">{telemetry.gear}</p>
          </div>
        </div>
      )}
    </div>
  );
}
