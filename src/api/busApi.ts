import { simulateApiCall } from './client';
import { MOCK_BUSES } from '../data/buses';
import { Bus } from '../types';

export const busApi = {
  searchBuses: async (params?: { from?: string; to?: string; date?: string; busType?: string }): Promise<Bus[]> => {
    let results = [...MOCK_BUSES];
    if (params?.from && params.from.trim()) {
      const q = params.from.toLowerCase();
      results = results.filter((b) => b.fromCity.toLowerCase().includes(q));
    }
    if (params?.to && params.to.trim()) {
      const q = params.to.toLowerCase();
      results = results.filter((b) => b.toCity.toLowerCase().includes(q));
    }
    // If specific search returns none, return all mock buses for demonstration
    if (results.length === 0) {
      results = MOCK_BUSES;
    }
    return simulateApiCall(results, 350);
  },

  getBusById: async (id: string): Promise<Bus | undefined> => {
    const bus = MOCK_BUSES.find((b) => b.id === id);
    return simulateApiCall(bus, 200);
  },
};
