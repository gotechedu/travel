import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bus, Flight, Train, Car, Passenger, TravelMode } from '../types';

interface BookingWorkflowState {
  travelMode: TravelMode | 'group' | 'wedding' | 'fleet';
  selectedBus: Bus | null;
  selectedFlight: Flight | null;
  selectedTrain: Train | null;
  selectedTrainClass: string | null;
  selectedCar: Car | null;
  selectedSeats: string[];
  boardingPoint: string;
  droppingPoint: string;
  passengers: Passenger[];
  couponCode: string;
  discountAmount: number;
  baseAmount: number;
  totalAmount: number;
  gstAmount: number;
}

const initialState: BookingWorkflowState = {
  travelMode: 'bus',
  selectedBus: null,
  selectedFlight: null,
  selectedTrain: null,
  selectedTrainClass: null,
  selectedCar: null,
  selectedSeats: [],
  boardingPoint: '',
  droppingPoint: '',
  passengers: [
    {
      id: 'p-1',
      fullName: 'Aditya Singh',
      age: 28,
      gender: 'male',
    },
  ],
  couponCode: '',
  discountAmount: 0,
  baseAmount: 0,
  totalAmount: 0,
  gstAmount: 0,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectBus: (state, action: PayloadAction<Bus>) => {
      state.travelMode = 'bus';
      state.selectedBus = action.payload;
      state.selectedSeats = [];
      state.boardingPoint = action.payload.boardingPoints[0]?.location || '';
      state.droppingPoint = action.payload.droppingPoints[0]?.location || '';
      state.baseAmount = action.payload.price;
      state.totalAmount = Math.max(0, state.baseAmount - state.discountAmount);
    },
    selectFlight: (state, action: PayloadAction<Flight>) => {
      state.travelMode = 'flight';
      state.selectedFlight = action.payload;
      state.baseAmount = action.payload.price;
      state.totalAmount = Math.max(0, state.baseAmount - state.discountAmount);
    },
    selectTrain: (state, action: PayloadAction<{ train: Train; classCode: string; fare: number }>) => {
      state.travelMode = 'train';
      state.selectedTrain = action.payload.train;
      state.selectedTrainClass = action.payload.classCode;
      state.baseAmount = action.payload.fare;
      state.totalAmount = Math.max(0, state.baseAmount - state.discountAmount);
    },
    selectCar: (state, action: PayloadAction<Car>) => {
      state.travelMode = 'car';
      state.selectedCar = action.payload;
      state.baseAmount = action.payload.estimatedTotalFare;
      state.totalAmount = Math.max(0, state.baseAmount - state.discountAmount);
    },
    toggleSeat: (state, action: PayloadAction<{ seatNumber: string; price: number }>) => {
      const idx = state.selectedSeats.indexOf(action.payload.seatNumber);
      if (idx > -1) {
        state.selectedSeats.splice(idx, 1);
      } else {
        state.selectedSeats.push(action.payload.seatNumber);
      }

      // Recompute base amount based on seats count
      const seatCount = Math.max(1, state.selectedSeats.length);
      const unitPrice = state.selectedBus?.price || action.payload.price;
      state.baseAmount = seatCount * unitPrice;
      state.totalAmount = Math.max(0, state.baseAmount - state.discountAmount);

      // Align passengers array length
      while (state.passengers.length < state.selectedSeats.length) {
        const nextIdx = state.passengers.length + 1;
        state.passengers.push({
          id: `p-${nextIdx}`,
          fullName: '',
          age: 25,
          gender: 'male',
          seatNumber: state.selectedSeats[nextIdx - 1],
        });
      }
      if (state.passengers.length > state.selectedSeats.length && state.selectedSeats.length > 0) {
        state.passengers = state.passengers.slice(0, state.selectedSeats.length);
      }
    },
    setBoardingPoint: (state, action: PayloadAction<string>) => {
      state.boardingPoint = action.payload;
    },
    setDroppingPoint: (state, action: PayloadAction<string>) => {
      state.droppingPoint = action.payload;
    },
    setPassengers: (state, action: PayloadAction<Passenger[]>) => {
      state.passengers = action.payload;
    },
    updatePassenger: (state, action: PayloadAction<{ index: number; passenger: Partial<Passenger> }>) => {
      const p = state.passengers[action.payload.index];
      if (p) {
        state.passengers[action.payload.index] = { ...p, ...action.payload.passenger };
      }
    },
    applyDiscount: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.couponCode = action.payload.code;
      state.discountAmount = action.payload.discount;
      state.totalAmount = Math.max(0, state.baseAmount - action.payload.discount);
    },
    removeDiscount: (state) => {
      state.couponCode = '';
      state.discountAmount = 0;
      state.totalAmount = state.baseAmount;
    },
    resetBookingWorkflow: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  selectBus,
  selectFlight,
  selectTrain,
  selectCar,
  toggleSeat,
  setBoardingPoint,
  setDroppingPoint,
  setPassengers,
  updatePassenger,
  applyDiscount,
  removeDiscount,
  resetBookingWorkflow,
} = bookingSlice.actions;

export default bookingSlice.reducer;
