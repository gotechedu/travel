import { simulateApiCall } from './client';
import { MOCK_OFFERS } from '../data/offers';
import { Offer } from '../types';

export const offersApi = {
  getOffers: async (category?: string): Promise<Offer[]> => {
    let offers = [...MOCK_OFFERS];
    if (category && category !== 'all') {
      offers = offers.filter((o) => o.category === category || o.category === 'all');
    }
    return simulateApiCall(offers, 200);
  },

  validateCoupon: async (code: string, amount: number): Promise<{ valid: boolean; discount: number; message: string; offer?: Offer }> => {
    const found = MOCK_OFFERS.find((o) => o.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return simulateApiCall({ valid: false, discount: 0, message: 'Invalid coupon code. Try SINGH500' }, 200);
    }
    if (amount < found.minBookingValue) {
      return simulateApiCall({
        valid: false,
        discount: 0,
        message: `Minimum booking value of ₹${found.minBookingValue} required for coupon ${found.code}`,
      }, 200);
    }
    const discount = found.isPercentage ? Math.round((amount * found.discountAmount) / 100) : found.discountAmount;
    return simulateApiCall({
      valid: true,
      discount,
      message: `Coupon ${found.code} applied! Saved ₹${discount}`,
      offer: found,
    }, 250);
  },
};
