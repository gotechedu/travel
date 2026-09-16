import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../../data/destinations';
import { formatINR } from '../../utils/formatters';
import { useAppDispatch } from '../../store/store';
import { setTo } from '../../store/searchSlice';
import { MapPin, ArrowRight, Compass } from 'lucide-react';

export const PopularDestinations: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleExploreDestination = (destName: string) => {
    dispatch(setTo(destName));
    navigate('/buses');
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Explore North & Central India
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
              Top Travel Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Spiritual yatras, royal heritage, and bustling metropolitan hubs connected by Singh Travel
            </p>
          </div>

          <Link
            to="/destinations"
            className="flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-navy-900 transition-colors shrink-0"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Scrollable on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 sm:pb-0 snap-x">
          {MOCK_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="min-w-[260px] sm:min-w-0 snap-center group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  {dest.badge && (
                    <span className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                      {dest.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-extrabold text-base leading-tight">{dest.name}</h3>
                    <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-brand-orange" />
                      <span>{dest.state}</span>
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dest.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing and Action */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Starts from</span>
                  <p className="text-base font-black text-navy-900">{formatINR(dest.startingPrice)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleExploreDestination(dest.name)}
                  className="px-3.5 py-1.5 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-bold text-xs rounded-xl transition-all"
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
