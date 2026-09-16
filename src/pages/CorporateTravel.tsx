import React, { useState } from 'react';
import { Building2, ShieldCheck, FileSpreadsheet, CheckCircle2, Clock, Phone, ArrowRight, Zap } from 'lucide-react';
import { useAppDispatch } from '../store/store';
import { showToast } from '../store/uiSlice';

export const CorporateTravel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(showToast({ type: 'success', message: 'Corporate partnership request received! Our B2B team will contact you.' }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Banner */}
      <div className="bg-navy-900 text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-extrabold uppercase mb-3">
            <Building2 className="w-4 h-4" />
            <span>B2B Corporate Travel Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Corporate Mobility & Executive Fleets
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 leading-relaxed">
            Automated GST compliance, monthly billing cycles, employee airport shuttle pools, and executive delegates transit across Delhi NCR, UP, and major business hubs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Employee Daily Commute', desc: 'Point-to-point sanitized cabs and buses with GPS geofencing & female employee escort protocols.' },
                { title: 'Airport Transfers On-Demand', desc: 'Guaranteed 24x7 pickups for leadership, visiting clients, and cross-city delegates.' },
                { title: 'Conference & Offsite Fleets', desc: 'Move 50 to 500 team members with luxury coaches to Jaipur, Agra, Jim Corbett & Rishikesh.' },
                { title: 'Automated GST Tax Invoicing', desc: 'Centralized monthly invoice with full GST breakdown for effortless corporate tax input claiming.' },
                { title: 'Dedicated Key Account Manager', desc: 'Single point of escalation available 24 hours a day for immediate fleet adjustments.' },
                { title: 'Zero Surge Pricing Contract', desc: 'Locked negotiated corporate rates regardless of weather, peak traffic hours, or festivals.' },
              ].map((f, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-navy-900 font-extrabold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>{f.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Request Corporate Plan Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-navy-900">Request Corporate Plan</h3>
            <p className="text-xs text-slate-500">
              Get an enterprise contract proposal with customized rate cards
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-navy-900 text-base">Request Submitted!</h4>
                <p className="text-xs text-slate-500">
                  Our Corporate Solutions Lead will send over the B2B brochure and master services agreement today.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization Name</label>
                  <input type="text" required placeholder="e.g. Tata Consultancy / TechCorp" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person</label>
                    <input type="text" required placeholder="Aditya Singh" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
                    <input type="email" required placeholder="name@company.com" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" required placeholder="+91 98765 43210" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company GSTIN (Optional)</label>
                    <input type="text" placeholder="09AAAAA0000A1Z5" className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold uppercase" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Monthly Requirement</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white">
                    <option>5 to 20 Monthly Outstation Trips</option>
                    <option>Daily Employee Transit (10-50 Cabs/Buses)</option>
                    <option>One-Time Annual Offsite Fleet</option>
                    <option>Executive VIP & Airport Priority Account</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Request Corporate Plan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
