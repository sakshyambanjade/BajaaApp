import { Timer, Gauge, Flame, Clock } from 'lucide-react';

export default function StatsGrid() {
  const stats = [
    { icon: Timer, label: 'Fastest Lap', value: '1:32.451', driver: 'Verstappen', color: 'text-purple-400' },
    { icon: Gauge, label: 'Top Speed', value: '324 km/h', driver: 'Verstappen', color: 'text-blue-400' },
    { icon: Flame, label: 'Most Overtakes', value: '12', driver: 'Norris', color: 'text-orange-400' },
    { icon: Clock, label: 'Avg Pit Stop', value: '2.3s', driver: 'Red Bull', color: 'text-green-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.driver}</div>
        </div>
      ))}
    </div>
  );
}
