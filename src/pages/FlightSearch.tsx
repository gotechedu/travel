import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { flightApi } from '../api/flightApi';
import { Flight } from '../types';
import { FlightCard } from '../components/flight/FlightCard';
import { ArrowLeftRight, Plane, Filter, ArrowUpDown, Calendar } from 'lucide-react';
import { swapLocations } from '../store/searchSlice';

export const FlightSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { from, to, departureDate } = useAppSelector((state) => state.search);

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(6500);

  useEffect(() => {
    setLoading(true);
    flightApi.searchFlights({ from, to }).then((data) => {
      setFlights(data);
      setLoading(false);
    });
  }, [from, to]);

  const filtered = flights.filter((f) => {
    if (selectedAirline !== 'all' && f.airline !== selectedAirline) return false;
    if (nonStopOnly && f.stops > 0) return false;
    if (f.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Route Header Banner */}
      <div className="bg-navy-900 text-white py-6 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange">
                <Plane className="w-4 h-4" />
                <span>Domestic Flights</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="text-2xl sm:text-3xl font-black">{from || 'Lucknow'}</h1>
                <button
                  type="button"
                  onClick={() => dispatch(swapLocations())}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-black">{to || 'Delhi'}</h1>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>{departureDate ? new Date(departureDate).toDateString() : 'Tomorrow'}</span>
                <span>•</span>
                <span>Economy & Premium Cabin Class</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6 sticky top-20">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-navy-900 font-extrabold text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-orange" />
                <span>Flight Filters</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedAirline('all');
                  setNonStopOnly(false);
                  setMaxPrice(6500);
                }}
                className="text-[11px] font-bold text-slate-400 hover:text-brand-orange"
              >
                Reset
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Stops</h4>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nonStopOnly}
                  onChange={() => setNonStopOnly(!nonStopOnly)}
                  className="w-4 h-4 accent-brand-orange"
                />
                <span className="font-semibold">Direct Flights (Non-Stop Only)</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Airlines</h4>
              <div className="space-y-2 text-xs">
                {['all', 'IndiGo', 'Air India', 'Vistara (Tata SIA)', 'SpiceJet', 'Akasa Air'].map((air) => (
                  <label key={air} className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="airline"
                      checked={selectedAirline === air}
                      onChange={() => setSelectedAirline(air)}
                      className="w-4 h-4 accent-brand-orange"
                    />
                    <span>{air === 'all' ? 'All Airlines' : air}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                <span>Max Fare</span>
                <span className="text-brand-orange">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={3000}
                max={7500}
                step={200}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
            </div>
          </aside>

          {/* Results Stream */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-600">
                {loading ? 'Fetching airline rates...' : `${filtered.length} Flights Available`}
              </span>
              <span className="text-xs text-emerald-600 font-semibold">Zero Convenience Fee Promo Active</span>
            </div>

            {loading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-1/4" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <Plane className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No flights found matching your filter</h3>
              </div>
            ) : (
              <div>
                {filtered.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
