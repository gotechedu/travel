import React, { useState } from 'react';
import { MOCK_OFFERS } from '../data/offers';
import { useAppDispatch } from '../store/store';
import { showToast } from '../store/uiSlice';
import { Tag, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { TravelMode } from '../types';

export const Offers: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredOffers = selectedCategory === 'all'
    ? MOCK_OFFERS
    : MOCK_OFFERS.filter((o) => o.category === selectedCategory || o.category === 'all');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    dispatch(showToast({ type: 'success', message: `Coupon code "${code}" copied to clipboard!` }));
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-navy-900 text-white py-10 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Promo Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
              Deals, Discounts & Coupons
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Save up to ₹5,000 on Buses, Trains, Flights, Car Rentals and Wedding Fleet bookings
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pt-6">
            {[
              { id: 'all', label: 'All Coupons' },
              { id: 'bus', label: 'Bus Deals' },
              { id: 'flight', label: 'Flight Offers' },
              { id: 'car', label: 'Car Rental Discounts' },
              { id: 'group', label: 'Group & Wedding Specials' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-orange-100 text-brand-orange">
                      {offer.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Valid till {offer.validTill}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-navy-900 text-lg leading-snug">{offer.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{offer.description}</p>
                  <p className="text-[11px] text-slate-400 mt-3 italic">{offer.terms}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between gap-3">
                  <div className="border border-brand-orange/40 bg-orange-50/60 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="font-mono font-extrabold text-xs text-brand-navy">{offer.code}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-navy-900 hover:bg-brand-orange text-white shadow-xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Coupon</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
