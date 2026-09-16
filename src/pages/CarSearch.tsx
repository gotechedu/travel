import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { carApi } from '../api/carApi';
import { Car } from '../types';
import { VehicleCard } from '../components/car/VehicleCard';
import { Car as CarIcon, Users, Filter, Plus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CarSearch: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { fleetItems, totalVehicles, estimatedFleetCost } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setLoading(true);
    carApi.getCars(selectedCategory).then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* Route Header Banner */}
      <div className="bg-navy-900 text-white py-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange">
                <CarIcon className="w-4 h-4" />
                <span>Outstation Cabs & Fleet Rental</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black mt-1">
                Sedans, SUVs, Luxury & Tempo Travellers
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Book a single private car with chauffeur, or bundle multiple vehicles for family pilgrimages, wedding baraats, and corporate events.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/multiple-car-booking"
                className="px-5 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2 transition-all hover:shadow-glow-orange"
              >
                <span>Fleet Builder ({totalVehicles} Vehicles)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'sedan', label: 'Sedans (Dzire, Etios)' },
              { id: 'suv', label: 'SUVs (Innova Crysta)' },
              { id: 'luxury', label: 'Luxury VIP (Mercedes, Fortuner)' },
              { id: 'tempo_traveller', label: 'Tempo Travellers (12-17 Pax)' },
              { id: 'mini_bus', label: 'Mini Buses & Coaches (32 Pax)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Fleet Builder Reminder Bar */}
      {fleetItems.length > 0 && (
        <div className="bg-orange-50 border-b border-orange-200 py-3 px-4 sticky top-16 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-brand-navy">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>
                You have <strong>{totalVehicles} vehicles</strong> added in your Multi-Car Fleet!
              </span>
            </div>
            <Link
              to="/multiple-car-booking"
              className="px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-brand-orangeHover transition-colors"
            >
              Review Fleet & Quote →
            </Link>
          </div>
        </div>
      )}

      {/* Grid of Vehicles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 text-xs">
          <span className="font-bold text-slate-700">
            {loading ? 'Fetching available vehicles...' : `${cars.length} Fleet Options Available`}
          </span>
          <span className="text-slate-500">Includes Chauffeur Allowance & Highway Fastag</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white h-80 rounded-2xl border border-slate-200 animate-pulse p-4 space-y-4">
                <div className="h-44 bg-slate-200 rounded-xl" />
                <div className="h-6 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <VehicleCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
