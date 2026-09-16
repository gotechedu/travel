import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Plane, Train, Car, ArrowRight } from 'lucide-react';
import { TravelMode } from '../../types';
import { useAppDispatch } from '../../store/store';
import { setFrom, setTo, setMode } from '../../store/searchSlice';
import { formatINR } from '../../utils/formatters';

interface RouteItem {
  id: string;
  from: string;
  to: string;
  mode: TravelMode;
  startingPrice: number;
  duration: string;
  frequency: string;
}

export const PopularRoutes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TravelMode>('bus');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ROUTES_DATA: Record<TravelMode, RouteItem[]> = {
    bus: [
      { id: 'b1', from: 'Lucknow', to: 'Delhi', mode: 'bus', startingPrice: 949, duration: '8h 30m', frequency: '24 Buses Daily' },
      { id: 'b2', from: 'Lucknow', to: 'Ayodhya', mode: 'bus', startingPrice: 499, duration: '3h 30m', frequency: '18 Buses Daily' },
      { id: 'b3', from: 'Gorakhpur', to: 'Lucknow', mode: 'bus', startingPrice: 799, duration: '6h 30m', frequency: '14 Buses Daily' },
      { id: 'b4', from: 'Varanasi', to: 'Lucknow', mode: 'bus', startingPrice: 649, duration: '5h 45m', frequency: '12 Buses Daily' },
      { id: 'b5', from: 'Delhi', to: 'Jaipur', mode: 'bus', startingPrice: 850, duration: '6h 00m', frequency: '30 Buses Daily' },
      { id: 'b6', from: 'Varanasi', to: 'Delhi', mode: 'bus', startingPrice: 1299, duration: '12h 00m', frequency: '8 Buses Daily' },
    ],
    flight: [
      { id: 'f1', from: 'Lucknow', to: 'Delhi', mode: 'flight', startingPrice: 3450, duration: '1h 15m', frequency: '8 Flights Daily' },
      { id: 'f2', from: 'Delhi', to: 'Mumbai', mode: 'flight', startingPrice: 5120, duration: '2h 20m', frequency: '35 Flights Daily' },
      { id: 'f3', from: 'Delhi', to: 'Varanasi', mode: 'flight', startingPrice: 4100, duration: '1h 25m', frequency: '6 Flights Daily' },
      { id: 'f4', from: 'Lucknow', to: 'Mumbai', mode: 'flight', startingPrice: 5890, duration: '4h 15m', frequency: '5 Flights Daily' },
    ],
    train: [
      { id: 't1', from: 'Ayodhya Dham', to: 'Delhi (Anand Vihar)', mode: 'train', startingPrice: 1625, duration: '8h 20m', frequency: 'Vande Bharat Express' },
      { id: 't2', from: 'Lucknow', to: 'New Delhi', mode: 'train', startingPrice: 980, duration: '6h 55m', frequency: 'Shatabdi & AC Express' },
      { id: 't3', from: 'Varanasi', to: 'New Delhi', mode: 'train', startingPrice: 1750, duration: '8h 00m', frequency: 'Vande Bharat Express' },
      { id: 't4', from: 'Gorakhpur', to: 'New Delhi', mode: 'train', startingPrice: 440, duration: '12h 40m', frequency: 'Gorakhdham Superfast' },
    ],
    car: [
      { id: 'c1', from: 'Lucknow', to: 'Ayodhya', mode: 'car', startingPrice: 2450, duration: '2h 45m', frequency: 'Chauffeur Sedan/SUV' },
      { id: 'c2', from: 'Delhi', to: 'Jaipur', mode: 'car', startingPrice: 3800, duration: '4h 30m', frequency: 'Expressway Cab' },
      { id: 'c3', from: 'Delhi', to: 'Agra', mode: 'car', startingPrice: 2800, duration: '3h 15m', frequency: 'Yamuna Expressway' },
      { id: 'c4', from: 'Lucknow', to: 'Varanasi', mode: 'car', startingPrice: 4200, duration: '5h 00m', frequency: 'Door-to-Door Private' },
    ],
  };

  const handleRouteClick = (route: RouteItem) => {
    dispatch(setMode(route.mode));
    dispatch(setFrom(route.from));
    dispatch(setTo(route.to));
    navigate(`/${route.mode === 'bus' ? 'buses' : route.mode === 'flight' ? 'flights' : route.mode === 'train' ? 'trains' : 'cars'}`);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Highway & Express Connectivity
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            Popular Travel Routes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare live starting fares and schedules across high-demand travel corridors
          </p>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[
              { id: 'bus', label: 'Bus Routes', icon: Bus },
              { id: 'train', label: 'Train Routes', icon: Train },
              { id: 'flight', label: 'Flight Routes', icon: Plane },
              { id: 'car', label: 'Car & Cab Routes', icon: Car },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TravelMode)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-orange' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROUTES_DATA[activeTab].map((route) => (
            <div
              key={route.id}
              onClick={() => handleRouteClick(route)}
              className="group p-5 rounded-2xl border border-slate-200 hover:border-brand-orange bg-slate-50/50 hover:bg-white hover:shadow-soft transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-500">{route.duration}</span>
                  <span className="text-[11px] font-bold bg-orange-50 text-brand-orange px-2 py-0.5 rounded">
                    {route.frequency}
                  </span>
                </div>

                <div className="flex items-center gap-2 my-2">
                  <span className="font-extrabold text-navy-900 text-base">{route.from}</span>
                  <span className="text-brand-orange font-bold">→</span>
                  <span className="font-extrabold text-navy-900 text-base">{route.to}</span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Starts from</span>
                  <p className="text-lg font-black text-brand-orange leading-tight">{formatINR(route.startingPrice)}</p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-navy-900 group-hover:text-brand-orange transition-colors">
                  <span>View Options</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
