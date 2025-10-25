import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function WinProbability({ predictions }) {
  const mockData = [
    { lap: 0, Verstappen: 45, Hamilton: 35, Leclerc: 20 },
    { lap: 10, Verstappen: 52, Hamilton: 30, Leclerc: 18 },
    { lap: 20, Verstappen: 58, Hamilton: 28, Leclerc: 14 },
    { lap: 30, Verstappen: 65, Hamilton: 25, Leclerc: 10 },
    { lap: 40, Verstappen: 72, Hamilton: 22, Leclerc: 6 },
    { lap: 50, Verstappen: 78, Hamilton: 18, Leclerc: 4 },
  ];

  const data = predictions?.winProbability || mockData;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-400" />
          Win Probability
        </h2>
        <div className="text-sm text-gray-400">
          ML Prediction: XGBoost + Monte Carlo
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="lap" 
            stroke="#9CA3AF"
            label={{ value: 'Lap', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            label={{ value: 'Win Probability (%)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#F3F4F6' }}
          />
          <Legend />
          <Line type="monotone" dataKey="Verstappen" stroke="#00D2BE" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Hamilton" stroke="#6CD3BF" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Leclerc" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Verstappen</div>
          <div className="text-2xl font-bold text-teal-400">78%</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Hamilton</div>
          <div className="text-2xl font-bold text-teal-400">18%</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Leclerc</div>
          <div className="text-2xl font-bold text-teal-400">4%</div>
        </div>
      </div>
    </div>
  );
}
