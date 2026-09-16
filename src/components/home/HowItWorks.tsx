import React, { useState } from 'react';
import { Search, SlidersHorizontal, CreditCard, Compass, FileText, Calculator, ShieldCheck, MapPin } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [tab, setTab] = useState<'individual' | 'group'>('individual');

  const individualSteps = [
    {
      num: '01',
      title: 'Search Route',
      desc: 'Enter your origin, destination, date and select from Bus, Train, Flight or Car rental.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Compare & Choose',
      desc: 'Filter by operator, timings, AC sleeper berths, seat layouts and genuine passenger ratings.',
      icon: SlidersHorizontal,
    },
    {
      num: '03',
      title: 'Book & Pay',
      desc: 'Pick your exact berth or vehicle, enter passenger details, and pay securely via UPI or Card.',
      icon: CreditCard,
    },
    {
      num: '04',
      title: 'Travel Hassle-Free',
      desc: 'Receive your live WhatsApp ticket, GPS tracking link, and board with zero delays.',
      icon: Compass,
    },
  ];

  const groupSteps = [
    {
      num: '01',
      title: 'Submit Requirement',
      desc: 'Specify number of guests, vehicle mix (Buses + Cabs), multi-point pickups, and event dates.',
      icon: FileText,
    },
    {
      num: '02',
      title: 'Get Custom Quote',
      desc: 'Receive transparent fleet quotation with vehicle interior photos within 15 minutes.',
      icon: Calculator,
    },
    {
      num: '03',
      title: 'Lock Fleet & Chauffeurs',
      desc: 'Confirm your booking with partial advance; dedicated wedding/corporate manager assigned.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Smooth Event Transit',
      desc: 'Vehicles report 30 mins early with sanitized interiors and uniformed experienced drivers.',
      icon: MapPin,
    },
  ];

  const currentSteps = tab === 'individual' ? individualSteps : groupSteps;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Effortless Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            How Singh Travel Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Streamlined workflow whether you are traveling solo or moving an entire wedding party
          </p>

          {/* Flow Switcher */}
          <div className="inline-flex bg-slate-200/80 p-1.5 rounded-2xl mt-6">
            <button
              type="button"
              onClick={() => setTab('individual')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'individual'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Individual Booking Flow
            </button>
            <button
              type="button"
              onClick={() => setTab('group')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'group'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Group & Bulk Fleet Flow
            </button>
          </div>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {currentSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-soft transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-brand-orange">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-navy-900 text-base leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
