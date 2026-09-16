import React from 'react';
import { Smartphone, Bell, Zap, Compass, ShieldCheck, Download } from 'lucide-react';

export const MobileAppSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-navy-950 via-navy-900 to-brand-blue text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Singh Travel Mobile App
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Travel Smarter. <span className="text-brand-orange">On the Go.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Experience seamless lightning-fast bus seat bookings, instant PNR status, driver live tracking, and mobile-exclusive coupons right in your pocket.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-orange">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">10-Second Express Booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-orange">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Live GPS Bus & Chauffeur Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-orange">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Real-Time Boarding Alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-orange">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Paperless Offline E-Tickets</span>
              </div>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black hover:bg-slate-900 border border-slate-700 transition-all shadow-lg"
              >
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">GET IT ON</span>
                  <span className="block text-sm font-bold text-white leading-none">Google Play</span>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black hover:bg-slate-900 border border-slate-700 transition-all shadow-lg"
              >
                <div className="text-2xl">🍏</div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Download on the</span>
                  <span className="block text-sm font-bold text-white leading-none">App Store</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-72 h-[480px] bg-navy-950 rounded-[40px] border-4 border-slate-700 shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
              {/* Phone Notch */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* Inside Screen Content */}
              <div className="space-y-3">
                <div className="bg-brand-orange/20 p-3 rounded-2xl border border-brand-orange/30">
                  <span className="text-[10px] font-bold text-brand-orange uppercase">Upcoming Trip</span>
                  <h4 className="text-xs font-bold text-white mt-0.5">Volvo 9600 Multi-Axle Sleeper</h4>
                  <p className="text-[10px] text-slate-300">Lucknow → Delhi • Tonight 21:30</p>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-300">Driver Location</span>
                    <span className="text-emerald-400 font-bold">On Highway (5 mins)</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-3/4 rounded-full" />
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-300">Fast Ticket QR</span>
                  <div className="bg-white p-2 rounded-xl text-center font-mono text-navy-900 font-black text-xs mt-1">
                    PNR: ST-92841
                  </div>
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
