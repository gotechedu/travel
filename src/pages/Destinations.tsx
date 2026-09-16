import React from 'react';
import { MOCK_DESTINATIONS } from '../data/destinations';
import { formatINR } from '../utils/formatters';
import { useAppDispatch } from '../store/store';
import { setTo } from '../store/searchSlice';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, ArrowRight } from 'lucide-react';

export const Destinations: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBook = (name: string) => {
    dispatch(setTo(name));
    navigate('/buses');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-navy-900 text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-extrabold uppercase mb-3">
            <Compass className="w-4 h-4" />
            <span>Incredible India Corridor</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Popular Indian Destinations
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2">
            Explore spiritual ghats, historic capitals, royal heritage forts, and express business cities
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-soft transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  {dest.badge && (
                    <span className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {dest.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-extrabold text-lg leading-tight">{dest.name}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{dest.state}</span>
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-slate-500 leading-relaxed">{dest.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dest.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Starts from</span>
                  <p className="text-lg font-black text-navy-900">{formatINR(dest.startingPrice)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBook(dest.name)}
                  className="px-4 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
                >
                  <span>Book Trip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
