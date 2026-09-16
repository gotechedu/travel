import React from 'react';
import { Flight } from '../../types';
import { useAppDispatch } from '../../store/store';
import { selectFlight } from '../../store/bookingSlice';
import { formatINR } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Luggage, Utensils, ArrowRight, ShieldCheck } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectFlight = () => {
    dispatch(selectFlight(flight));
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-soft transition-all overflow-hidden p-5 sm:p-6 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Airline & Flight Number */}
        <div className="lg:col-span-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shadow-xs border border-slate-200">
            {flight.airlineLogo}
          </div>
          <div>
            <h4 className="font-extrabold text-navy-900 text-sm leading-tight">{flight.airline}</h4>
            <span className="text-xs text-slate-500 font-mono">{flight.flightNumber}</span>
            <div className="mt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 capitalize">
                {flight.cabinClass.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule, Duration & Stops */}
        <div className="lg:col-span-5 flex items-center justify-between gap-3">
          {/* Departure */}
          <div>
            <p className="text-xl font-extrabold text-slate-900 leading-none">{flight.departureTime}</p>
            <p className="text-xs font-bold text-navy-900 mt-1">{flight.fromCode}</p>
            <p className="text-[11px] text-slate-400 truncate max-w-[110px]">{flight.fromAirport.split('(')[0]}</p>
          </div>

          {/* Duration info */}
          <div className="flex-1 flex flex-col items-center px-2">
            <span className="text-[11px] font-bold text-slate-500 mb-1">{flight.duration}</span>
            <div className="w-full flex items-center">
              <div className="w-2 h-2 rounded-full border-2 border-slate-300 bg-white" />
              <div className="flex-1 border-t-2 border-slate-300" />
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1">
              {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop`}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <p className="text-xl font-extrabold text-slate-900 leading-none">{flight.arrivalTime}</p>
            <p className="text-xs font-bold text-navy-900 mt-1">{flight.toCode}</p>
            <p className="text-[11px] text-slate-400 truncate max-w-[110px]">{flight.toAirport.split('(')[0]}</p>
          </div>
        </div>

        {/* Baggage & Meal Amenities */}
        <div className="lg:col-span-2 text-xs text-slate-500 space-y-1.5 border-t lg:border-t-0 pt-3 lg:pt-0">
          <div className="flex items-center gap-1.5">
            <Luggage className="w-3.5 h-3.5 text-slate-400" />
            <span>Check-in: {flight.baggage.checkIn}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-slate-400" />
            <span>{flight.mealsIncluded ? 'Complimentary Meal' : 'Paid Meals'}</span>
          </div>
          {flight.refundable && (
            <span className="inline-block text-[10px] text-emerald-600 font-bold">✓ Refundable Fare</span>
          )}
        </div>

        {/* Fare & Book CTA */}
        <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0">
          <div className="text-left lg:text-right">
            <span className="text-[11px] text-slate-400">Total Fare</span>
            <p className="text-2xl font-black text-brand-orange">{formatINR(flight.price)}</p>
          </div>

          <button
            type="button"
            onClick={handleSelectFlight}
            className="mt-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center gap-1.5 group"
          >
            <span>Book Flight</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
