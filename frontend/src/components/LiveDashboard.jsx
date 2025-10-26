import React, { useEffect, useState } from 'react';
import { useF1Store } from '../stores/f1Store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { RefreshCw } from 'lucide-react';

export const LiveDashboard = () => {
  const { 
    currentStandings, 
    liveSession, 
    loading, 
    fetchStandings, 
    fetchLiveSession 
  } = useF1Store();
  
  const [autoRefresh] = useState(true);
  
  useEffect(() => {
    fetchStandings();
    fetchLiveSession();
    
    // Auto-refresh every 30 seconds during live sessions
    const interval = autoRefresh ? setInterval(() => {
      fetchLiveSession();
    }, 30000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, fetchLiveSession, fetchStandings]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Live Session Status */}
      <div className="mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Live Session</CardTitle>
              {liveSession && (
                <Badge className="mt-2 bg-red-600">
                  🔴 LIVE
                </Badge>
              )}
            </div>
            <button 
              onClick={() => fetchLiveSession()}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <RefreshCw className={loading ? 'animate-spin' : ''} />
            </button>
          </CardHeader>
          <CardContent>
            {liveSession ? (
              <div>
                <p className="text-lg font-semibold">{liveSession.session.event_name}</p>
                <p className="text-gray-400">{liveSession.session.session_type}</p>
              </div>
            ) : (
              <p className="text-gray-400">No active session</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Driver Standings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Driver Standings 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentStandings.map((driver, index) => (
              <div 
                key={driver.driver_number}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-400">
                    {index + 1}
                  </span>
                  <div 
                    className="w-1 h-12 rounded"
                    style={{ backgroundColor: getTeamColor(driver.team) }}
                  />
                  <div>
                    <p className="font-semibold text-lg">{driver.full_name}</p>
                    <p className="text-sm text-gray-400">{driver.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{driver.points}</p>
                  <p className="text-sm text-gray-400">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Team color mapping
const getTeamColor = (teamName) => {
  const colors = {
    'McLaren': '#FF8700',
    'Red Bull': '#3671C6',
    'Ferrari': '#E8002D',
    'Mercedes': '#27F4D2',
    'Aston Martin': '#229971',
    'Alpine': '#FF87BC',
    'Williams': '#64C4FF',
    'RB': '#6692FF',
    'Sauber': '#52E252',
    'Haas': '#B6BABD'
  };
  return colors[teamName] || '#888';
};
