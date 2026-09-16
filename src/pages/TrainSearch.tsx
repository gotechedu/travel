import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { trainApi } from '../api/trainApi';
import { Train } from '../types';
import { TrainCard } from '../components/train/TrainCard';
import { ArrowLeftRight, Train as TrainIcon, Filter, Calendar } from 'lucide-react';
import { swapLocations } from '../store/searchSlice';

export const TrainSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { from, to, departureDate } = useAppSelector((state) => state.search);

  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [vandeBharatOnly, setVandeBharatOnly] = useState(false);

  useEffect(() => {
    setLoading(true);
    trainApi.searchTrains({ from, to }).then((data) => {
      setTrains(data);
      setLoading(false);
    });
  }, [from, to]);

  const filtered = trains.filter((t) => {
    if (vandeBharatOnly && !t.trainName.toLowerCase().includes('vande bharat')) return false;
    if (selectedClass !== 'all' && !t.classes.some((c) => c.code === selectedClass)) return false;
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
                <TrainIcon className="w-4 h-4" />
                <span>IRCTC Train Booking & PNR</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="text-2xl sm:text-3xl font-black">{from || 'Ayodhya'}</h1>
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
                <span>Real-time Indian Railways availability</span>
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
                <span>Train Filters</span>
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Premium Trains</h4>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vandeBharatOnly}
                  onChange={() => setVandeBharatOnly(!vandeBharatOnly)}
                  className="w-4 h-4 accent-brand-orange"
                />
                <span className="font-semibold text-brand-navy">Vande Bharat Express Only</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Journey Class</h4>
              <div className="space-y-2 text-xs">
                {['all', 'CC', 'EC', '3A', '2A', '1A', 'SL'].map((code) => (
                  <label key={code} className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="trainClass"
                      checked={selectedClass === code}
                      onChange={() => setSelectedClass(code)}
                      className="w-4 h-4 accent-brand-orange"
                    />
                    <span>{code === 'all' ? 'All Classes' : code}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Stream */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-600">
                {loading ? 'Checking IRCTC availability...' : `${filtered.length} Trains Running`}
              </span>
              <span className="text-xs text-slate-400">Live WL & RAC prediction enabled</span>
            </div>

            {loading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-1/3" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <TrainIcon className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No trains found for selected filters</h3>
              </div>
            ) : (
              <div>
                {filtered.map((train) => (
                  <TrainCard key={train.id} train={train} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
