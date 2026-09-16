import React, { useState } from 'react';
import { Bus } from '../../types';
import { useAppDispatch } from '../../store/store';
import { selectBus } from '../../store/bookingSlice';
import { formatINR } from '../../utils/formatters';
import { SeatMap } from './SeatMap';
import { Star, ShieldCheck, Clock, Wifi, Zap, Coffee, ChevronDown, ChevronUp } from 'lucide-react';

interface BusCardProps {
  bus: Bus;
}

export const BusCard: React.FC<BusCardProps> = ({ bus }) => {
  const dispatch = useAppDispatch();
  const [showSeats, setShowSeats] = useState(false);

  const handleToggleSeats = () => {
    if (!showSeats) {
      dispatch(selectBus(bus));
    }
    setShowSeats(!showSeats);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-soft transition-all overflow-hidden mb-4">
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Operator info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-navy-900 leading-tight">{bus.operatorName}</h3>
              {bus.liveTracking && (
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live GPS
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">{bus.busType}</p>

            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-current" />
                {bus.rating}
              </span>
              <span className="text-xs text-slate-400">({bus.reviewCount} ratings)</span>
            </div>

            {/* Amenities preview */}
            <div className="flex items-center gap-2 mt-3 text-slate-400">
              {bus.amenities.includes('WiFi') && <span title="Free WiFi"><Wifi className="w-3.5 h-3.5 text-slate-500" /></span>}
              {bus.amenities.includes('Charging Point') && <span title="Charging Socket"><Zap className="w-3.5 h-3.5 text-slate-500" /></span>}
              {bus.amenities.includes('Water Bottle') && <span title="Water Bottle"><Coffee className="w-3.5 h-3.5 text-slate-500" /></span>}
              <span className="text-[11px] text-slate-500 font-medium">
                +{bus.amenities.length} amenities
              </span>
            </div>
          </div>

          {/* Schedule & Route */}
          <div className="lg:col-span-5 flex items-center justify-between gap-4">
            {/* Departure */}
            <div>
              <p className="text-xl font-extrabold text-slate-900 leading-none">{bus.departureTime}</p>
              <p className="text-xs font-semibold text-slate-600 mt-1">{bus.fromCity}</p>
              <p className="text-[11px] text-slate-400 truncate max-w-[120px]">
                {bus.boardingPoints[0]?.location.split(',')[0]}
              </p>
            </div>

            {/* Duration Line */}
            <div className="flex-1 flex flex-col items-center px-2">
              <span className="text-[11px] font-bold text-slate-500 mb-1">{bus.duration}</span>
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full border-2 border-slate-300 bg-white" />
                <div className="flex-1 border-t-2 border-dashed border-slate-300" />
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Direct Expressway</span>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <p className="text-xl font-extrabold text-slate-900 leading-none">{bus.arrivalTime}</p>
              <p className="text-xs font-semibold text-slate-600 mt-1">{bus.toCity}</p>
              <p className="text-[11px] text-slate-400 truncate max-w-[120px]">
                {bus.droppingPoints[0]?.location.split(',')[0]}
              </p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
            <div className="text-left lg:text-right">
              <span className="text-[11px] text-slate-400 font-medium">Starts from</span>
              <div className="flex items-baseline gap-2">
                {bus.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(bus.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-black text-brand-orange">
                  {formatINR(bus.price)}
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                {bus.availableSeats} seats left
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleSeats}
              className={`mt-3 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                showSeats
                  ? 'bg-navy-900 text-white'
                  : 'bg-brand-orange hover:bg-brand-orangeHover text-white shadow-md hover:shadow-glow-orange'
              }`}
            >
              <span>{showSeats ? 'Hide Seats' : 'Select Seats'}</span>
              {showSeats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Seat Map */}
      {showSeats && <SeatMap bus={bus} />}
    </div>
  );
};
