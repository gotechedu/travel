import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Sparkles, CheckCircle2, Car, Bus, ArrowRight, ShieldCheck } from 'lucide-react';

export const WeddingSection: React.FC = () => {
  const weddingPerks = [
    'Luxury Groom & Bride Cars (Mercedes, BMW, Audi, Fortuner)',
    'Floral Ribbon & Red Carpet Car Decoration',
    'Multiple Innova Crystas for Baraat VIPs & Relatives',
    'Force Urbania & Luxury Buses for Guest Transfers',
    'Airport & Railway Station Pickup / Drop Coordination',
    'Single Dedicated Wedding Transport Coordinator',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0A3D6B] text-white relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Royal Indian Weddings & Events</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Make Your Special Day <span className="text-brand-orange">Move Smoothly.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Don’t let transport chaos worry you on your wedding day. Singh Travel manages everything from the Groom's luxury entry car to synchronized tempo travellers for outstation guests, hotel shuttle loops, and airport pickups.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {weddingPerks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/wedding-travel"
                className="px-8 py-4 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-glow-orange transition-all flex items-center gap-2 group"
              >
                <span>Plan Wedding Transport</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/multiple-car-booking"
                className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl transition-all border border-white/10"
              >
                Build Multi-Car Fleet
              </Link>
            </div>
          </div>

          {/* Right Visual Fleet Card */}
          <div className="lg:col-span-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">Popular Wedding Fleet Combos</h3>
                    <p className="text-xs text-slate-300">Customized for 50 to 300+ guests</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand-orange bg-white/10 px-2.5 py-1 rounded-lg">
                  Save ₹5,000
                </span>
              </div>

              {/* Combo Sample 1 */}
              <div className="bg-navy-950/60 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">Royal Baraat Convoy (3 Vehicles)</h4>
                  <span className="text-xs font-extrabold text-brand-orange">From ₹23,500/day</span>
                </div>
                <p className="text-xs text-slate-300">
                  1x Mercedes E-Class (Groom Decorated) + 2x Toyota Innova Crystas with chauffeurs
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span>✓ 18 Guests capacity</span>
                  <span>•</span>
                  <span>✓ Includes toll & fuel</span>
                </div>
              </div>

              {/* Combo Sample 2 */}
              <div className="bg-navy-950/60 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">Grand Wedding Guest Fleet (5 Vehicles)</h4>
                  <span className="text-xs font-extrabold text-brand-orange">From ₹48,000/day</span>
                </div>
                <p className="text-xs text-slate-300">
                  1x Fortuner VIP + 2x Innova Crystas + 2x Force Urbania 17-Seater Luxury Travellers
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span>✓ 52 Guests capacity</span>
                  <span>•</span>
                  <span>✓ Multi-point airport/hotel shuttles</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/wedding-travel"
                  className="text-xs font-bold text-brand-orange hover:text-white underline transition-colors"
                >
                  Request Customized Wedding Quote with Venue Routing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
