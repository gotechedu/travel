import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MultiCarItem } from '../types';

interface CartState {
  fleetItems: MultiCarItem[];
  totalVehicles: number;
  totalPassengersCapacity: number;
  estimatedFleetCost: number;
}

const initialState: CartState = {
  fleetItems: [
    {
      id: 'fleet-init-1',
      carId: 'car-2',
      carName: 'Toyota Innova Crysta',
      category: 'suv',
      quantity: 2,
      pickupLocation: 'Lucknow Airport',
      dropLocation: 'Ayodhya Resort',
      pickupDate: '2026-10-18',
      pickupTime: '09:00',
      withDriver: true,
      pricePerVehicle: 4200,
    },
    {
      id: 'fleet-init-2',
      carId: 'car-4',
      carName: 'Mercedes-Benz E-Class (Groom VIP)',
      category: 'luxury',
      quantity: 1,
      pickupLocation: 'Hotel Hyatt Regency Lucknow',
      dropLocation: 'Ayodhya Resort',
      pickupDate: '2026-10-18',
      pickupTime: '08:00',
      withDriver: true,
      pricePerVehicle: 15500,
    }
  ],
  totalVehicles: 3,
  totalPassengersCapacity: 18,
  estimatedFleetCost: 23900,
};

const recalculateTotals = (state: CartState) => {
  let vehicles = 0;
  let cost = 0;
  let pax = 0;

  state.fleetItems.forEach((item) => {
    vehicles += item.quantity;
    cost += item.pricePerVehicle * item.quantity;
    const capacityPerVehicle = item.category === 'tempo_traveller' ? 17 : item.category === 'mini_bus' ? 32 : item.category === 'suv' ? 7 : 4;
    pax += capacityPerVehicle * item.quantity;
  });

  state.totalVehicles = vehicles;
  state.totalPassengersCapacity = pax;
  state.estimatedFleetCost = cost;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addFleetItem: (state, action: PayloadAction<MultiCarItem>) => {
      state.fleetItems.push(action.payload);
      recalculateTotals(state);
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.fleetItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        recalculateTotals(state);
      }
    },
    removeFleetItem: (state, action: PayloadAction<string>) => {
      state.fleetItems = state.fleetItems.filter((i) => i.id !== action.payload);
      recalculateTotals(state);
    },
    clearFleet: (state) => {
      state.fleetItems = [];
      recalculateTotals(state);
    },
  },
});

export const { addFleetItem, updateItemQuantity, removeFleetItem, clearFleet } = cartSlice.actions;
export default cartSlice.reducer;
