import React, { useState } from 'react';
import { Bus, BusSeat } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleSeat, setBoardingPoint, setDroppingPoint } from '../../store/bookingSlice';
import { formatINR } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, User, MapPin } from 'lucide-react';

interface SeatMapProps {
  bus: Bus;
}

export const SeatMap: React.FC<SeatMapProps> = ({ bus }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedSeats, boardingPoint, droppingPoint, totalAmount } = useAppSelector(
    (state) => state.booking
  );
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');

  const lowerSeats = bus.seats.filter((s) => s.deck === 'lower');
  const upperSeats = bus.seats.filter((s) => s.deck === 'upper');

  const handleSeatClick = (seat: BusSeat) => {
    if (!seat.isAvailable) return;
    dispatch(toggleSeat({ seatNumber: seat.number, price: seat.price }));
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Seat Layout Map */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Select Your Preferred Seats</h4>
              <p className="text-[11px] text-slate-500">Click on available berths to select or deselect</p>
            </div>

            {/* Deck Toggle Switch */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveDeck('lower')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeDeck === 'lower' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Lower Deck
              </button>
              <button
                type="button"
                onClick={() => setActiveDeck('upper')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeDeck === 'upper' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Upper Deck (Sleepers)
              </button>
            </div>
          </div>

          {/* Seat Status Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mb-6 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md border border-slate-300 bg-white" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-brand-orange text-white flex items-center justify-center font-bold text-[10px]">✓</div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-slate-300 border border-slate-400" />
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md border border-pink-300 bg-pink-50" />
              <span>Ladies Berth</span>
            </div>
          </div>

          {/* Bus Interior Box */}
          <div className="border-2 border-slate-200 rounded-2xl p-4 max-w-sm mx-auto bg-slate-50/50">
            {/* Steering Wheel Indicator */}
            <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-300 mb-4 text-[10px] uppercase font-bold text-slate-400">
              <span>Front / Driver Side</span>
              <span className="p-1 rounded bg-slate-200 text-slate-600">🚗 Driver</span>
            </div>

            {/* Grid of Seats */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((rowNum) => {
                const currentDeckSeats = activeDeck === 'lower' ? lowerSeats : upperSeats;
                const rowSeats = currentDeckSeats.filter((s) => s.row === rowNum);

                return (
                  <div key={rowNum} className="flex items-center justify-between gap-2">
                    {/* Left Column (col 1 & 2) */}
                    <div className="flex gap-2">
                      {rowSeats
                        .filter((s) => s.col <= 2)
                        .map((seat) => {
                          const isSelected = selectedSeats.includes(seat.number);
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled={!seat.isAvailable}
                              onClick={() => handleSeatClick(seat)}
                              className={`relative transition-all rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs ${
                                seat.type === 'sleeper' ? 'w-16 h-9' : 'w-10 h-10'
                              } ${
                                !seat.isAvailable
                                  ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-brand-orange text-white shadow-md border border-brand-orangeHover ring-2 ring-orange-200'
                                  : seat.isLadiesOnly
                                  ? 'bg-pink-50 text-pink-700 border border-pink-300 hover:border-pink-500'
                                  : 'bg-white text-slate-700 border border-slate-300 hover:border-brand-orange'
                              }`}
                            >
                              <span>{seat.number}</span>
                              <span className="text-[9px] font-normal leading-none opacity-80">
                                ₹{seat.price}
                              </span>
                            </button>
                          );
                        })}
                    </div>

                    {/* Aisle Space */}
                    <div className="w-8 flex items-center justify-center">
                      <span className="text-[9px] text-slate-300 rotate-90">AISLE</span>
                    </div>

                    {/* Right Column (Single seat or berth) */}
                    <div>
                      {rowSeats
                        .filter((s) => s.col === 4)
                        .map((seat) => {
                          const isSelected = selectedSeats.includes(seat.number);
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled={!seat.isAvailable}
                              onClick={() => handleSeatClick(seat)}
                              className={`relative transition-all rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs ${
                                seat.type === 'sleeper' ? 'w-16 h-9' : 'w-10 h-10'
                              } ${
                                !seat.isAvailable
                                  ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-brand-orange text-white shadow-md border border-brand-orangeHover ring-2 ring-orange-200'
                                  : 'bg-white text-slate-700 border border-slate-300 hover:border-brand-orange'
                              }`}
                            >
                              <span>{seat.number}</span>
                              <span className="text-[9px] font-normal leading-none opacity-80">
                                ₹{seat.price}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-slate-300 text-center text-[10px] text-slate-400 font-semibold uppercase">
              Rear Exit
            </div>
          </div>
        </div>

        {/* Right Side: Boarding / Dropping & Fare Checkout */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>Boarding & Dropping Points</span>
            </h4>

            {/* Boarding Point Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Boarding Location</label>
              <select
                value={boardingPoint}
                onChange={(e) => dispatch(setBoardingPoint(e.target.value))}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-brand-orange"
              >
                {bus.boardingPoints.map((bp) => (
                  <option key={bp.id} value={bp.location}>
                    {bp.time} — {bp.location} {bp.landmark ? `(${bp.landmark})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropping Point Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Dropping Location</label>
              <select
                value={droppingPoint}
                onChange={(e) => dispatch(setDroppingPoint(e.target.value))}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-brand-orange"
              >
                {bus.droppingPoints.map((dp) => (
                  <option key={dp.id} value={dp.location}>
                    {dp.time} — {dp.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Seats summary */}
            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Selected Seats:</span>
                <p className="text-sm font-bold text-brand-navy">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-medium">Estimated Fare:</span>
                <p className="text-base font-extrabold text-brand-orange">
                  {formatINR(totalAmount || (selectedSeats.length * bus.price))}
                </p>
              </div>
            </div>
          </div>

          {/* Continue Action */}
          <button
            type="button"
            disabled={selectedSeats.length === 0}
            onClick={handleProceedToCheckout}
            className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Passenger Details ({selectedSeats.length} Seats)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
