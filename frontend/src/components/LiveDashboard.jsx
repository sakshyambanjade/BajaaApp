import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchLiveData } from '../services/api';
import { useWebSocket } from '../hooks/useWebSocket';

export default function LiveDashboard() {
  const [raceData, setRaceData] = useState(null);
  const { liveData, connected } = useWebSocket();

  useEffect(() => {
    if (liveData) {
      setRaceData(liveData);
    }
  }, [liveData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Pitlane AI — Live Race Dashboard</h1>
        <p className="text-gray-400">
          Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}
        </p>
      </header>

      {/* Live Leaderboard */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Live Leaderboard</h2>
        <div className="bg-gray-800 rounded-lg p-4">
          {/* Position table */}
        </div>
      </section>

      {/* Win Probability Chart */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Win Probability</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={raceData?.win_probs || []}>
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="verstappen" stroke="#00D2BE" />
            <Line type="monotone" dataKey="hamilton" stroke="#6CD3BF" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Telemetry Charts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Live Telemetry</h2>
        {/* Speed, tire wear, etc. charts */}
      </section>
    </div>
  );
}
