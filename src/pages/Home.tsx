import React from 'react';
import { motion } from 'framer-motion';
import { BookingWidget } from '../components/booking/BookingWidget';
import { SpecialServicesSection } from '../components/home/SpecialServicesSection';
import { GroupQuoteWizard } from '../components/group/GroupQuoteWizard';
import { WeddingSection } from '../components/home/WeddingSection';
import { PopularDestinations } from '../components/home/PopularDestinations';
import { PopularRoutes } from '../components/home/PopularRoutes';
import { OffersSection } from '../components/home/OffersSection';
import { WhySinghTravel } from '../components/home/WhySinghTravel';
import { HowItWorks } from '../components/home/HowItWorks';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { MobileAppSection } from '../components/home/MobileAppSection';
import { FaqSection } from '../components/home/FaqSection';
import { ContactSupportSection } from '../components/home/ContactSupportSection';
import { ShieldCheck, Award, Sparkles, MapPin, Bus, Car, Train, Plane, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden bg-navy-950">
        {/* Rich Travel Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Travel Scenic Landscape"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform animate-pulse duration-[8000ms]"
          />
          {/* Contrast-protecting gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-900/80 to-[#082B52]" />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-10 md:mb-12 space-y-4"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-orangeLight text-xs font-extrabold tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
              <span>India’s Unified Travel & Fleet Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight md:leading-[1.15]">
              Travel Your Way. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-orange-400">
                We’ll Handle the Journey.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
              Flights, Trains, Buses, Cars and Group Travel — All in One Place. From individual tickets to complete wedding convoys and corporate fleets.
            </p>

            {/* Quick Differentiator Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-300">
              <span className="px-3 py-1 bg-navy-900/80 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-brand-orange" />
                <span>Volvo Sleeper Buses</span>
              </span>
              <span className="px-3 py-1 bg-navy-900/80 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5 text-brand-orange" />
                <span>IRCTC Train Booking</span>
              </span>
              <span className="px-3 py-1 bg-navy-900/80 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-orange" />
                <span>Wedding & Bulk Fleets</span>
              </span>
              <span className="px-3 py-1 bg-navy-900/80 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-brand-orange" />
                <span>Chauffeur Cabs</span>
              </span>
            </div>
          </motion.div>

          {/* 2. LARGE BOOKING WIDGET */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <BookingWidget />
          </motion.div>
        </div>
      </section>

      {/* 3. SPECIAL SERVICES (12 Cards) */}
      <SpecialServicesSection />

      {/* 4. GROUP & BULK BOOKING SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Coordinated Fleet Mobility
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
              Travel Together. Travel Smarter.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Managing 10 to 500+ passengers? Our interactive Group Quote builder provides instant vehicle allocation, transparent package pricing, and dedicated coordination.
            </p>
          </div>

          <GroupQuoteWizard />
        </div>
      </section>

      {/* 5. WEDDING & EVENT TRANSPORT */}
      <WeddingSection />

      {/* 6. POPULAR DESTINATIONS */}
      <PopularDestinations />

      {/* 7. POPULAR ROUTES */}
      <PopularRoutes />

      {/* 8. OFFERS & DEALS */}
      <OffersSection />

      {/* 9. WHY SINGH TRAVEL */}
      <WhySinghTravel />

      {/* 10. HOW IT WORKS */}
      <HowItWorks />

      {/* 11. CUSTOMER REVIEWS */}
      <TestimonialsSection />

      {/* 12. MOBILE APP */}
      <MobileAppSection />

      {/* 13. FAQ ACCORDION */}
      <FaqSection />

      {/* 14. CONTACT / SUPPORT */}
      <ContactSupportSection />
    </div>
  );
};
