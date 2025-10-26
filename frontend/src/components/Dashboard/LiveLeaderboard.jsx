import { Trophy, TrendingUp, TrendingDown, Flag } from 'lucide-react';

export default function LiveLeaderboard({ liveData }) {
  const mockData = [
    { position: 1, driver: 'Verstappen', team: 'Red Bull', gap: 'Leader', lastLap: '1:32.451', change: 0 },
    { position: 2, driver: 'Hamilton', team: 'Mercedes', gap: '+2.134', lastLap: '1:32.789', change: 1 },
    { position: 3, driver: 'Leclerc', team: 'Ferrari', gap: '+5.892', lastLap: '1:33.012', change: -1 },
    { position: 4, driver: 'Norris', team: 'McLaren', gap: '+8.456', lastLap: '1:33.234', change: 0 },
    { position: 5, driver: 'Sainz', team: 'Ferrari', gap: '+12.789', lastLap: '1:33.567', change: 2 },
  ];

  const positions = liveData?.positions || mockData;

  return (
    <div className="glass rounded-2xl overflow-hidden border border-f1-gray-800 shadow-glow card-hover">
      <div className="px-8 py-6 bg-gradient-to-r from-f1-gray-900/50 to-f1-gray-800/50 border-b border-f1-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Live Leaderboard</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-f1-red/20 border border-f1-red/30 rounded-lg animate-pulse">
          <Flag className="w-4 h-4 text-f1-red" />
          <span className="text-sm font-bold text-f1-red">LIVE</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-f1-gray-900/80 text-f1-gray-400 text-sm font-semibold">
            <tr>
              <th className="px-8 py-4 text-left">POS</th>
              <th className="px-8 py-4 text-left">DRIVER</th>
              <th className="px-8 py-4 text-left">TEAM</th>
              <th className="px-8 py-4 text-left">GAP</th>
              <th className="px-8 py-4 text-left">LAST LAP</th>
              <th className="px-8 py-4 text-center">CHANGE</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {positions.map((driver, idx) => (
              <tr 
                key={idx} 
                className="border-t border-f1-gray-800 hover:bg-f1-teal-400/5 transition-all duration-200"
              >
                <td className="px-8 py-5 font-extrabold text-2xl gradient-text">{driver.position}</td>
                <td className="px-8 py-5 font-bold text-lg">{driver.driver}</td>
                <td className="px-8 py-5 text-f1-gray-400">{driver.team}</td>
                <td className="px-8 py-5 text-f1-gray-300 font-semibold">{driver.gap}</td>
                <td className="px-8 py-5 font-mono text-f1-teal-400 font-semibold">{driver.lastLap}</td>
                <td className="px-8 py-5 text-center">
                  {driver.change > 0 && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg font-bold">
                      <TrendingUp className="w-4 h-4" /> +{driver.change}
                    </span>
                  )}
                  {driver.change < 0 && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg font-bold">
                      <TrendingDown className="w-4 h-4" /> {driver.change}
                    </span>
                  )}
                  {driver.change === 0 && (
                    <span className="text-f1-gray-600 font-bold">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
