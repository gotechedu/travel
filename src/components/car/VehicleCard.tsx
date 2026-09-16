import React from 'react';
import { Car } from '../../types';
import { useAppDispatch } from '../../store/store';
import { selectCar } from '../../store/bookingSlice';
import { addFleetItem } from '../../store/cartSlice';
import { showToast } from '../../store/uiSlice';
import { formatINR } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Fuel, ShieldCheck, Plus, Check, Star } from 'lucide-react';

interface VehicleCardProps {
  car: Car;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ car }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBookSingle = () => {
    dispatch(selectCar(car));
    navigate('/checkout');
  };

  const handleAddToFleet = () => {
    dispatch(
      addFleetItem({
        id: `fleet-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        carId: car.id,
        carName: car.name,
        category: car.category,
        quantity: 1,
        pickupLocation: 'Lucknow',
        dropLocation: 'Outstation',
        pickupDate: new Date().toISOString().split('T')[0],
        pickupTime: '08:00',
        withDriver: true,
        pricePerVehicle: car.estimatedTotalFare,
      })
    );
    dispatch(showToast({ type: 'success', message: `Added ${car.name} to Fleet Builder!` }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-soft transition-all overflow-hidden flex flex-col justify-between mb-6 group">
      <div>
        {/* Image and Category badge */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-navy-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider">
            {car.category.replace('_', ' ')}
          </div>
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{car.rating}</span>
          </div>
        </div>

        {/* Details */}
        <div className="p-5">
          <h3 className="font-extrabold text-navy-900 text-lg leading-snug">{car.name}</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{car.idealFor}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-orange" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-brand-orange" />
              <span>{car.luggage} Bags</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-brand-orange" />
              <span className="capitalize">{car.fuelType}</span>
            </div>
          </div>

          {/* Features pill tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {car.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-orange-50 text-brand-orange px-2 py-0.5 rounded-md"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing and CTAs */}
      <div className="p-5 pt-0 border-t border-slate-100 mt-2">
        <div className="flex items-baseline justify-between py-3">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Estimated Day Rate</span>
            <p className="text-xl font-black text-brand-orange">{formatINR(car.estimatedTotalFare)}</p>
          </div>
          <span className="text-xs text-slate-500 font-medium">₹{car.pricePerKm}/km base</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            type="button"
            onClick={handleAddToFleet}
            className="py-2.5 px-3 border border-slate-300 hover:border-brand-orange hover:bg-orange-50/50 text-slate-700 hover:text-brand-orange text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Fleet</span>
          </button>

          <button
            type="button"
            onClick={handleBookSingle}
            className="py-2.5 px-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-1"
          >
            <span>Book Car</span>
          </button>
        </div>
      </div>
    </div>
  );
};
