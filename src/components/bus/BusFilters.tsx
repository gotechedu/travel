import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface BusFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  acOnly: boolean;
  onToggleAc: () => void;
  maxPrice: number;
  onChangeMaxPrice: (val: number) => void;
  onReset: () => void;
}

export const BusFilters: React.FC<BusFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  acOnly,
  onToggleAc,
  maxPrice,
  onChangeMaxPrice,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-navy-900 font-extrabold text-sm">
          <Filter className="w-4 h-4 text-brand-orange" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-brand-orange transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Bus Category / Seat Type */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Seat / Berth Type</h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Bus Types' },
            { id: 'sleeper', label: 'Sleeper Berths' },
            { id: 'semi-sleeper', label: 'Semi-Sleeper' },
            { id: 'seater', label: 'Seater Pushback' },
          ].map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer hover:text-navy-900">
              <input
                type="radio"
                name="busCategory"
                checked={selectedCategory === cat.id}
                onChange={() => onSelectCategory(cat.id)}
                className="w-4 h-4 text-brand-orange accent-brand-orange"
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AC Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Climate Control</h4>
        <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer hover:text-navy-900">
          <input
            type="checkbox"
            checked={acOnly}
            onChange={onToggleAc}
            className="w-4 h-4 text-brand-orange rounded-sm accent-brand-orange"
          />
          <span className="font-semibold text-slate-800">Air Conditioned (AC Only)</span>
        </label>
      </div>

      {/* Max Price Slider */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
          <span className="uppercase tracking-wider">Max Price</span>
          <span className="text-brand-orange font-extrabold">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min={400}
          max={2500}
          step={50}
          value={maxPrice}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-orange cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
          <span>₹400</span>
          <span>₹2,500</span>
        </div>
      </div>

      {/* Departure Window */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Departure Time</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl border border-slate-200 text-center hover:border-brand-orange cursor-pointer">
            <span className="block font-bold text-slate-800">Morning</span>
            <span className="text-[10px] text-slate-400">06:00 - 12:00</span>
          </div>
          <div className="p-2.5 rounded-xl border border-brand-orange bg-orange-50/50 text-center cursor-pointer">
            <span className="block font-bold text-brand-navy">Night</span>
            <span className="text-[10px] text-brand-orange font-bold">18:00 - 24:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
