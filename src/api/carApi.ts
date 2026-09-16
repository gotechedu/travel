import { simulateApiCall } from './client';
import { MOCK_CARS } from '../data/cars';
import { Car } from '../types';

export const carApi = {
  getCars: async (category?: string): Promise<Car[]> => {
    let results = [...MOCK_CARS];
    if (category && category !== 'all') {
      results = results.filter((c) => c.category === category);
    }
    return simulateApiCall(results, 300);
  },

  getCarById: async (id: string): Promise<Car | undefined> => {
    const car = MOCK_CARS.find((c) => c.id === id);
    return simulateApiCall(car, 150);
  },
};
