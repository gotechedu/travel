import { simulateApiCall } from './client';
import { INITIAL_MOCK_BOOKINGS } from '../data/bookings';
import { Booking, GroupQuoteRequest, WeddingFleetRequest } from '../types';

let bookingsDatabase: Booking[] = [...INITIAL_MOCK_BOOKINGS];

export const bookingApi = {
  getUserBookings: async (): Promise<Booking[]> => {
    return simulateApiCall([...bookingsDatabase], 300);
  },

  getBookingById: async (id: string): Promise<Booking | undefined> => {
    const booking = bookingsDatabase.find((b) => b.id === id || b.pnr === id);
    return simulateApiCall(booking, 200);
  },

  createBooking: async (bookingData: Omit<Booking, 'id' | 'pnr' | 'bookedAt'>): Promise<Booking> => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      ...bookingData,
      id: `ST-${randomDigits}`,
      pnr: `ST-${randomDigits}`,
      bookedAt: new Date().toISOString(),
    };
    bookingsDatabase = [newBooking, ...bookingsDatabase];
    return simulateApiCall(newBooking, 500);
  },

  cancelBooking: async (id: string): Promise<Booking | undefined> => {
    const index = bookingsDatabase.findIndex((b) => b.id === id || b.pnr === id);
    if (index !== -1) {
      bookingsDatabase[index] = { ...bookingsDatabase[index], status: 'cancelled' };
      return simulateApiCall(bookingsDatabase[index], 400);
    }
    return simulateApiCall(undefined, 200);
  },

  submitGroupQuote: async (quoteData: GroupQuoteRequest): Promise<{ quoteId: string; status: string }> => {
    const quoteId = `GQ-${Math.floor(10000 + Math.random() * 90000)}`;
    return simulateApiCall({ quoteId, status: 'RECEIVED' }, 600);
  },

  submitWeddingQuote: async (weddingData: WeddingFleetRequest): Promise<{ quoteId: string; status: string }> => {
    const quoteId = `WQ-${Math.floor(10000 + Math.random() * 90000)}`;
    return simulateApiCall({ quoteId, status: 'RECEIVED' }, 600);
  },
};
