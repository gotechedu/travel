import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TravelMode, TripType } from '../types';

interface SearchState {
  mode: TravelMode;
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  travelClass: string;
  busType: string;
  carType: string;
  withDriver: boolean;
}

const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const initialState: SearchState = {
  mode: 'bus',
  tripType: 'oneWay',
  from: 'Lucknow',
  to: 'Delhi',
  departureDate: getTomorrowDate(),
  returnDate: '',
  passengers: 1,
  travelClass: 'all',
  busType: 'all',
  carType: 'sedan',
  withDriver: true,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<TravelMode>) => {
      state.mode = action.payload;
    },
    setTripType: (state, action: PayloadAction<TripType>) => {
      state.tripType = action.payload;
    },
    setFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    swapLocations: (state) => {
      const temp = state.from;
      state.from = state.to;
      state.to = temp;
    },
    setDepartureDate: (state, action: PayloadAction<string>) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<string>) => {
      state.returnDate = action.payload;
    },
    setPassengers: (state, action: PayloadAction<number>) => {
      state.passengers = Math.max(1, action.payload);
    },
    setTravelClass: (state, action: PayloadAction<string>) => {
      state.travelClass = action.payload;
    },
    setBusType: (state, action: PayloadAction<string>) => {
      state.busType = action.payload;
    },
    setCarType: (state, action: PayloadAction<string>) => {
      state.carType = action.payload;
    },
    setWithDriver: (state, action: PayloadAction<boolean>) => {
      state.withDriver = action.payload;
    },
  },
});

export const {
  setMode,
  setTripType,
  setFrom,
  setTo,
  swapLocations,
  setDepartureDate,
  setReturnDate,
  setPassengers,
  setTravelClass,
  setBusType,
  setCarType,
  setWithDriver,
} = searchSlice.actions;

export default searchSlice.reducer;
