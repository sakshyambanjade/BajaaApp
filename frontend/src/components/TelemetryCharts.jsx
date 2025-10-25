import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

export default function TelemetryCharts({ telemetry }) {
  const mockData = [
    { driver: 'VER', speed: 324, sector1: 18.2, sector2: 38.5, sector3: 22.8 },
    { driver: 'HAM', speed: 322, sector1: 18.4, sector2: 38.7, sector3: 23.1 },
    { driver: 'LEC', speed: 320, sector1: 18.6, sector2: 39.0, sector3: 23.4 },
    { driver: 'NOR', speed: 318, sector1: 18.8, sector2: 39.2, sector3: 23.6 },
    { driver: 'SAI', speed: 319, sector1: 18.7, sector2: 39.1, sector3: 23.5 },
  ];

  const data = telemetry || mockData;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" />
          Speed Trap (km/h)
        </h2>
        <span className="text-sm text-gray-400">Last Lap Data</span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="driver" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#F3F4F6' }}
          />
          <Bar dataKey="speed" fill="#00D2BE" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
