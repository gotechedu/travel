import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { busApi } from '../api/busApi';
import { Bus } from '../types';
import { BusCard } from '../components/bus/BusCard';
import { BusFilters } from '../components/bus/BusFilters';
import { ArrowLeftRight, Filter, SlidersHorizontal, ArrowUpDown, Bus as BusIcon, Calendar, MapPin } from 'lucide-react';
import { setFrom, setTo, swapLocations } from '../store/searchSlice';
import { GroupQuoteWizard } from '../components/group/GroupQuoteWizard';

export const BusSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { from, to, departureDate } = useAppSelector((state) => state.search);

  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [acOnly, setAcOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState<'price_asc' | 'departure' | 'rating'>('rating');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    busApi.searchBuses({ from, to }).then((data) => {
      setBuses(data);
      setLoading(false);
    });
  }, [from, to]);

  // Filter logic
  let filtered = buses.filter((b) => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (acOnly && !b.isAC) return false;
    if (b.price > maxPrice) return false;
    return true;
  });

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setAcOnly(false);
    setMaxPrice(2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Route Header Banner */}
      <div className="bg-navy-900 text-white py-6 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange">
                <BusIcon className="w-4 h-4" />
                <span>Express Bus Booking</span>
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
                <span>Showing verified luxury fleets</span>
              </p>
            </div>

            {/* Quick Sort / Stats */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-navy-800 border border-navy-700 text-white text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-brand-orange"
              >
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Cheapest Price</option>
                <option value="departure">Early Departure</option>
              </select>

              {/* Mobile filter toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20">
            <BusFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              acOnly={acOnly}
              onToggleAc={() => setAcOnly(!acOnly)}
              maxPrice={maxPrice}
              onChangeMaxPrice={setMaxPrice}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setMobileFilterOpen(false)}
              />
              <div className="relative bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-base">Filter Buses</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-xs font-bold text-brand-orange px-3 py-1 bg-orange-50 rounded-lg"
                  >
                    Apply & Close
                  </button>
                </div>
                <BusFilters
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  acOnly={acOnly}
                  onToggleAc={() => setAcOnly(!acOnly)}
                  maxPrice={maxPrice}
                  onChangeMaxPrice={setMaxPrice}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* Right Results Stream */}
          <main className="lg:col-span-9">
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-600">
                {loading ? 'Searching buses...' : `${filtered.length} Buses Available`}
              </span>
              <span className="text-xs text-slate-400">All prices include GST & live tracking</span>
            </div>

            {loading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <BusIcon className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No buses match your filter</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try adjusting the price range, unchecking AC only, or resetting filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                {filtered.map((bus) => (
                  <BusCard key={bus.id} bus={bus} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <div className='mt-20'>
        <GroupQuoteWizard />
      </div>
    </div>
  );
};
