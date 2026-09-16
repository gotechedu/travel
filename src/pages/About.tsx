import React from 'react';
import { ShieldCheck, Award, Heart, Users, Bus, Building2, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Banner */}
      <div className="bg-navy-900 text-white py-14 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            About Singh Travel
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
            Travel Together, Explore More
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-3 leading-relaxed">
            Founded to bridge the divide between everyday public transit and organized large-scale private event mobility in India.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Story */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-navy-900">Our Story & Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Singh Travel started with a clear observation: while booking an individual bus or train ticket was becoming digital, organizing group travel for 20, 50, or 300 wedding guests and corporate teams remained painful, chaotic, and unorganized.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            We built Singh Travel as a unified platform that solves both needs with equal rigor. Whether a traveler is searching for a late-night Volvo sleeper berth from Lucknow to Delhi or a family needs a convoy of 4 Innovas and 2 luxury coaches for a destination wedding in Ayodhya, our fleet technology delivers guaranteed vehicles, verified chauffeurs, and upfront transparent pricing.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-brand-orange">1,200+</span>
            <p className="text-xs font-bold text-navy-900 mt-1">Verified Buses & Fleets</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-navy-900">350K+</span>
            <p className="text-xs font-bold text-navy-900 mt-1">Happy Passengers Moved</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-brand-orange">450+</span>
            <p className="text-xs font-bold text-navy-900 mt-1">Weddings Managed</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-black text-navy-900">24×7</span>
            <p className="text-xs font-bold text-navy-900 mt-1">Live Human Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
