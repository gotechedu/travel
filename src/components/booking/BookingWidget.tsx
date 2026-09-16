import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, Plane, Train, Car, ArrowLeftRight, Calendar, Users, 
  Search, ShieldCheck, Clock, BadgePercent, CheckCircle2, ChevronDown, Plus, Minus
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { 
  setMode, setTripType, setFrom, setTo, swapLocations, 
  setDepartureDate, setReturnDate, setPassengers, setTravelClass, 
  setBusType, setCarType, setWithDriver 
} from '../../store/searchSlice';
import { TravelMode, TripType } from '../../types';

export const BookingWidget: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  const [passengerDropdownOpen, setPassengerDropdownOpen] = useState(false);

  const POPULAR_ROUTES = [
    { from: 'Lucknow', to: 'Delhi', mode: 'bus' as TravelMode },
    { from: 'Lucknow', to: 'Ayodhya', mode: 'bus' as TravelMode },
    { from: 'Gorakhpur', to: 'Lucknow', mode: 'train' as TravelMode },
    { from: 'Delhi', to: 'Jaipur', mode: 'car' as TravelMode },
    { from: 'Delhi', to: 'Mumbai', mode: 'flight' as TravelMode },
    { from: 'Varanasi', to: 'Delhi', mode: 'train' as TravelMode },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (search.mode) {
      case 'bus':
        navigate('/buses');
        break;
      case 'flight':
        navigate('/flights');
        break;
      case 'train':
        navigate('/trains');
        break;
      case 'car':
        navigate('/cars');
        break;
      default:
        navigate('/buses');
    }
  };

  const handleQuickRoute = (from: string, to: string, mode: TravelMode) => {
    dispatch(setMode(mode));
    dispatch(setFrom(from));
    dispatch(setTo(to));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Widget Wrapper */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100/80 overflow-hidden booking-card-shadow">
        {/* Travel Mode Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/60 p-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 w-full">
            <button
              type="button"
              onClick={() => dispatch(setMode('bus'))}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
                search.mode === 'bus'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-200/60'
              }`}
            >
              <Bus className={`w-4 h-4 ${search.mode === 'bus' ? 'text-brand-orange' : 'text-slate-500'}`} />
              <span>Bus Tickets</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(setMode('car'))}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
                search.mode === 'car'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-200/60'
              }`}
            >
              <Car className={`w-4 h-4 ${search.mode === 'car' ? 'text-brand-orange' : 'text-slate-500'}`} />
              <span>Cabs & Rental</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(setMode('train'))}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
                search.mode === 'train'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-200/60'
              }`}
            >
              <Train className={`w-4 h-4 ${search.mode === 'train' ? 'text-brand-orange' : 'text-slate-500'}`} />
              <span>Trains</span>
            </button>

            <button
              type="button"
              onClick={() => dispatch(setMode('flight'))}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
                search.mode === 'flight'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-200/60'
              }`}
            >
              <Plane className={`w-4 h-4 ${search.mode === 'flight' ? 'text-brand-orange' : 'text-slate-500'}`} />
              <span>Flights</span>
            </button>
          </div>
        </div>

        {/* Sub Header: Trip Type Radio / Options */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="radio"
                name="tripType"
                checked={search.tripType === 'oneWay'}
                onChange={() => dispatch(setTripType('oneWay'))}
                className="w-4 h-4 text-brand-orange accent-brand-orange focus:ring-brand-orange"
              />
              <span>One Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="radio"
                name="tripType"
                checked={search.tripType === 'roundTrip'}
                onChange={() => dispatch(setTripType('roundTrip'))}
                className="w-4 h-4 text-brand-orange accent-brand-orange focus:ring-brand-orange"
              />
              <span>Round Trip</span>
            </label>
            {search.mode === 'flight' && (
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="tripType"
                  checked={search.tripType === 'multiCity'}
                  onChange={() => dispatch(setTripType('multiCity'))}
                  className="w-4 h-4 text-brand-orange accent-brand-orange focus:ring-brand-orange"
                />
                <span>Multi-City</span>
              </label>
            )}
          </div>

          {/* Mode-specific quick toggles */}
          {search.mode === 'car' && (
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => dispatch(setWithDriver(true))}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  search.withDriver ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                With Chauffeur
              </button>
              <button
                type="button"
                onClick={() => dispatch(setWithDriver(false))}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  !search.withDriver ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Self-Drive
              </button>
            </div>
          )}

          {search.mode === 'bus' && (
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span className="font-semibold text-navy-900">Popular Bus Types:</span>
              <span className="bg-orange-50 text-brand-orange font-semibold px-2 py-0.5 rounded-md">Volvo Multi-Axle</span>
              <span className="hidden sm:inline bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">BharatBenz AC</span>
            </div>
          )}
        </div>

        {/* Dynamic Booking Form */}
        <form onSubmit={handleSearchSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* From Origin */}
            <div className="md:col-span-3.5 relative">
              <div className="border border-slate-200 hover:border-slate-300 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange rounded-xl p-3 bg-slate-50/50 transition-all">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {search.mode === 'bus' ? 'From City / Station' : search.mode === 'flight' ? 'From Airport' : search.mode === 'train' ? 'From Railway Station' : 'Pickup Location'}
                </label>
                <input
                  type="text"
                  required
                  value={search.from}
                  onChange={(e) => dispatch(setFrom(e.target.value))}
                  placeholder="e.g. Lucknow"
                  className="w-full bg-transparent font-bold text-slate-900 text-base focus:outline-none placeholder:text-slate-300"
                />
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={() => dispatch(swapLocations())}
                aria-label="Swap from and to locations"
                className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-brand-orange hover:border-brand-orange transition-all"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* To Destination */}
            <div className="md:col-span-3.5">
              <div className="border border-slate-200 hover:border-slate-300 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange rounded-xl p-3 bg-slate-50/50 transition-all">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {search.mode === 'bus' ? 'To City / Station' : search.mode === 'flight' ? 'To Airport' : search.mode === 'train' ? 'To Railway Station' : 'Drop Location'}
                </label>
                <input
                  type="text"
                  required
                  value={search.to}
                  onChange={(e) => dispatch(setTo(e.target.value))}
                  placeholder="e.g. Delhi"
                  className="w-full bg-transparent font-bold text-slate-900 text-base focus:outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Date Pickers */}
            <div className={`${search.tripType === 'roundTrip' ? 'md:col-span-3' : 'md:col-span-2.5'} grid ${search.tripType === 'roundTrip' ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
              <div className="border border-slate-200 hover:border-slate-300 focus-within:border-brand-orange rounded-xl p-3 bg-slate-50/50">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <span>{search.tripType === 'roundTrip' ? 'Depart' : 'Date'}</span>
                  <Calendar className="w-3 h-3 text-slate-400" />
                </div>
                <input
                  type="date"
                  value={search.departureDate}
                  onChange={(e) => dispatch(setDepartureDate(e.target.value))}
                  className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none mt-0.5 cursor-pointer"
                />
              </div>

              {search.tripType === 'roundTrip' && (
                <div className="border border-slate-200 hover:border-slate-300 focus-within:border-brand-orange rounded-xl p-3 bg-slate-50/50">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    <span>Return</span>
                    <Calendar className="w-3 h-3 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    value={search.returnDate}
                    onChange={(e) => dispatch(setReturnDate(e.target.value))}
                    className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none mt-0.5 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Passengers & Class selector */}
            <div className="md:col-span-2.5 relative">
              <div
                onClick={() => setPassengerDropdownOpen(!passengerDropdownOpen)}
                className="border border-slate-200 hover:border-slate-300 rounded-xl p-3 bg-slate-50/50 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {search.mode === 'car' ? 'Vehicle & Pax' : 'Travellers'}
                  </label>
                  <p className="font-bold text-slate-900 text-sm truncate">
                    {search.passengers} {search.passengers === 1 ? 'Passenger' : 'Passengers'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              {/* Popover */}
              {passengerDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="font-bold text-xs text-slate-900">Passengers</span>
                      <p className="text-[10px] text-slate-400">Age 5 years and above</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => dispatch(setPassengers(search.passengers - 1))}
                        disabled={search.passengers <= 1}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3 text-slate-700" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{search.passengers}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(setPassengers(search.passengers + 1))}
                        disabled={search.passengers >= 10}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-slate-700" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPassengerDropdownOpen(false)}
                    className="w-full mt-3 py-1.5 bg-navy-900 text-white rounded-lg text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Button Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Quick Popular Routes Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">Popular:</span>
              {POPULAR_ROUTES.map((route, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickRoute(route.from, route.to, route.mode)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-brand-orange text-[11px] font-medium text-slate-600 transition-colors shrink-0"
                >
                  {route.from} → {route.to}
                </button>
              ))}
            </div>

            {/* CTA Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-glow-orange transition-all flex items-center justify-center gap-2 group shrink-0"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>
                Search {search.mode === 'bus' ? 'Buses' : search.mode === 'flight' ? 'Flights' : search.mode === 'train' ? 'Trains' : 'Cars & Fleets'}
              </span>
            </button>
          </div>
        </form>

        {/* Trust Indicators Strip Under Search */}
        <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-700">100% Verified Operators</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
            <span className="font-semibold text-slate-700">Secure IRCTC & Airline Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgePercent className="w-4 h-4 text-brand-orange shrink-0" />
            <span className="font-semibold text-slate-700">Zero Hidden Convenience Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500 shrink-0" />
            <span className="font-semibold text-slate-700">24×7 Instant Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
