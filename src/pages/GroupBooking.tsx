import React from 'react';
import { GroupQuoteWizard } from '../components/group/GroupQuoteWizard';
import { Users, Bus, Car, ShieldCheck, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const GroupBooking: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Banner */}
      <div className="bg-navy-900 text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-extrabold uppercase mb-3">
            <Users className="w-4 h-4" />
            <span>Dedicated Group Transport Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Group & Bulk Fleet Booking
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 leading-relaxed">
            Planning a pilgrimage, school/college tour, corporate offsite, or wedding transit? We organize 10 to 500+ passengers with verified Volvo buses and multi-vehicle convoys.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <GroupQuoteWizard />

        {/* Value Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-14">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto">
              <Bus className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-navy-900">Multi-Axle Luxury Coaches</h4>
            <p className="text-xs text-slate-500">Volvo 9600, BharatBenz and Scania air-suspension buses with ample luggage space.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-navy-900">All Tolls & Taxes Included</h4>
            <p className="text-xs text-slate-500">Upfront fixed quotations with zero hidden surprises at state border checkpoints.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-navy-900">Dedicated Fleet Supervisor</h4>
            <p className="text-xs text-slate-500">Single point of contact coordinating all driver departures, boarding stops, and hotel drops.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
