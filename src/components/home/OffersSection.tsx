import React, { useState } from 'react';
import { MOCK_OFFERS } from '../../data/offers';
import { useAppDispatch } from '../../store/store';
import { showToast } from '../../store/uiSlice';
import { Tag, Copy, Check, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OffersSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    dispatch(showToast({ type: 'success', message: `Coupon code "${code}" copied to clipboard!` }));
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Exclusive Savings
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
              Deals & Special Offers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Apply verified promo codes during checkout to unlock instant discounts
            </p>
          </div>

          <Link
            to="/offers"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-navy-900 transition-colors"
          >
            <span>All Offers & Terms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-orange-100 text-brand-orange">
                    {offer.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Till {offer.validTill}
                  </span>
                </div>

                {/* Offer Details */}
                <div>
                  <h3 className="font-extrabold text-navy-900 text-base leading-snug">{offer.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{offer.description}</p>
                  <p className="text-[11px] text-slate-400 mt-2 italic font-medium">{offer.terms}</p>
                </div>

                {/* Bottom Coupon Code & Action */}
                <div className="mt-5 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between gap-3">
                  <div className="border border-brand-orange/40 bg-orange-50/60 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-brand-orange" />
                    <span className="font-mono font-extrabold text-xs text-brand-navy">{offer.code}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
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
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
