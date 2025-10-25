import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

export const useWebSocket = () => {
  const [liveData, setLiveData] = useState(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(WS_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('✅ WebSocket connected');
      setConnected(true);
    });

    socketRef.current.on('race_update', (data) => {
      console.log('📊 Race update received:', data);
      setLiveData(data);
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
      setConnected(false);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { liveData, connected };
};
