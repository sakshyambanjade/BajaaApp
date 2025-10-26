
import { create } from 'zustand';
// Import or define f1Api here
import { f1Api } from '../../src/services/api'; // Adjust the path as needed

interface F1State {
  currentStandings: any[];
  liveSession: any | null;
  selectedDriver: number | null;
  isLiveMode: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchStandings: () => Promise<void>;
  fetchLiveSession: () => Promise<void>;
  setSelectedDriver: (driverNumber: number) => void;
  toggleLiveMode: () => void;
}

export const useF1Store = create<F1State>((set, get) => ({
  currentStandings: [],
  liveSession: null,
  selectedDriver: null,
  isLiveMode: false,
  loading: false,
  error: null,
  
  fetchStandings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await f1Api.getLiveStandings();
      set({ currentStandings: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch standings', loading: false });
    }
  },
  
  fetchLiveSession: async () => {
    set({ loading: true, error: null });
    try {
      const data = await f1Api.getLiveSession();
      set({ liveSession: data, loading: false });
    } catch (error) {
      set({ error: 'No live session available', loading: false });
    }
  },
  
  setSelectedDriver: (driverNumber) => {
    set({ selectedDriver: driverNumber });
  },
  
  toggleLiveMode: () => {
    set((state) => ({ isLiveMode: !state.isLiveMode }));
  }
}));
