import { simulateApiCall } from './client';
import { MOCK_FLIGHTS } from '../data/flights';
import { Flight } from '../types';

export const flightApi = {
  searchFlights: async (params?: { from?: string; to?: string; date?: string; cabin?: string }): Promise<Flight[]> => {
    let results = [...MOCK_FLIGHTS];
    if (params?.from && params.from.trim()) {
      const q = params.from.toLowerCase();
      results = results.filter((f) => f.fromAirport.toLowerCase().includes(q) || f.fromCode.toLowerCase().includes(q));
    }
    if (params?.to && params.to.trim()) {
      const q = params.to.toLowerCase();
      results = results.filter((f) => f.toAirport.toLowerCase().includes(q) || f.toCode.toLowerCase().includes(q));
    }
    if (results.length === 0) {
      results = MOCK_FLIGHTS;
    }
    return simulateApiCall(results, 400);
  },

  getFlightById: async (id: string): Promise<Flight | undefined> => {
    const flight = MOCK_FLIGHTS.find((f) => f.id === id);
    return simulateApiCall(flight, 200);
  },
};
