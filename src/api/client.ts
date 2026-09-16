import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.singhtravel.in/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Mock simulation helper that returns typed data after a slight delay
export const simulateApiCall = <T>(data: T, delayMs: number = 300): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
};
