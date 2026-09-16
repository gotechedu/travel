import { simulateApiCall } from './client';
import { MOCK_TRAINS } from '../data/trains';
import { Train } from '../types';

export const trainApi = {
  searchTrains: async (params?: { from?: string; to?: string; date?: string }): Promise<Train[]> => {
    let results = [...MOCK_TRAINS];
    if (params?.from && params.from.trim()) {
      const q = params.from.toLowerCase();
      results = results.filter((t) => t.fromStation.toLowerCase().includes(q) || t.fromCode.toLowerCase().includes(q));
    }
    if (params?.to && params.to.trim()) {
      const q = params.to.toLowerCase();
      results = results.filter((t) => t.toStation.toLowerCase().includes(q) || t.toCode.toLowerCase().includes(q));
    }
    if (results.length === 0) {
      results = MOCK_TRAINS;
    }
    return simulateApiCall(results, 350);
  },

  getTrainById: async (id: string): Promise<Train | undefined> => {
    const train = MOCK_TRAINS.find((t) => t.id === id);
    return simulateApiCall(train, 200);
  },
};
