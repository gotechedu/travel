import React from 'react';
import { 
  ShieldCheck, Award, CreditCard, Clock, RotateCcw, 
  UserCheck, Zap, Layers 
} from 'lucide-react';

export const WhySinghTravel: React.FC = () => {
  const reasons = [
    {
      title: 'Verified Vehicles & Operators',
      desc: 'Every bus, cab, and tempo traveller undergoes rigorous fitness and commercial permit audits.',
      icon: ShieldCheck,
    },
    {
      title: '100% Transparent Pricing',
      desc: 'All highway tolls, state border taxes, and driver night allowances clearly itemized without surprise surcharges.',
      icon: Award,
    },
    {
      title: 'Secure Digital Payments',
      desc: 'Zero-friction UPI, RuPay, cards and net banking with instant 256-bit bank encrypted confirmations.',
      icon: CreditCard,
    },
    {
      title: '24×7 Human Support',
      desc: 'Our dedicated operations desks in Lucknow and Delhi answer phone and WhatsApp queries within rings.',
      icon: Clock,
    },
    {
      title: 'Easy & Fast Cancellations',
      desc: 'Hassle-free 1-click self cancellations with prompt refunds credited directly back to your account.',
      icon: RotateCcw,
    },
    {
      title: 'Experienced Highway Drivers',
      desc: 'Polite, verified chauffeurs with extensive experience navigating Indian expressways day and night.',
      icon: UserCheck,
    },
    {
      title: 'Instant Confirmation & PNR',
      desc: 'Live SMS, WhatsApp e-ticket, and downloadable PDF boarding pass issued right upon booking.',
      icon: Zap,
    },
    {
      title: 'Single to Large Fleet Scale',
      desc: 'The only platform in India capable of handling 1 seat up to 25 coordinated vehicles simultaneously.',
      icon: Layers,
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            The Singh Travel Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Engineered for reliability across everyday passenger commutes and once-in-a-lifetime family celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-brand-orange/40 hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100/70 text-brand-orange flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-navy-900 text-base leading-snug">{r.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
