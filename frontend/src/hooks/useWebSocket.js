import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url = 'ws://localhost:8000/ws/live-f1/') => {
  const [liveData, setLiveData] = useState(null);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    const connect = () => {
      try {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
          console.log('✅ WebSocket Connected');
          setConnected(true);
        };

        ws.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setLiveData(data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        ws.current.onerror = (error) => {
          console.error('❌ WebSocket Error:', error);
          setConnected(false);
        };

        ws.current.onclose = () => {
          console.log('🔌 WebSocket Disconnected');
          setConnected(false);
          
          // Auto-reconnect after 3 seconds
          reconnectTimeout.current = setTimeout(() => {
            console.log('🔄 Attempting to reconnect...');
            connect();
          }, 3000);
        };
      } catch (error) {
        console.error('Failed to create WebSocket:', error);
        setConnected(false);
      }
    };

    // For now, simulate connected state without actual WebSocket
    // Remove this and uncomment connect() when backend is ready
    setConnected(false);
    setLiveData({
      telemetry: {
        speed: 320,
        throttle: 100,
        brake: 0,
        gear: 8,
        rpm: 12000
      }
    });
    
    // Uncomment when backend WebSocket is ready:
    // connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  return { liveData, connected };
};
