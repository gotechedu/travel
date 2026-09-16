import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bus, Car, Train, Plane, HeartHandshake, Building2, 
  Users, Sparkles, Navigation, Compass, ShieldCheck, MapPin, ArrowRight 
} from 'lucide-react';

export const SpecialServicesSection: React.FC = () => {
  const services = [
    {
      id: 'bus-book',
      title: 'Bus Ticket Booking',
      desc: 'Volvo, BharatBenz & Scania sleeper and seater luxury buses across North & Central India.',
      icon: Bus,
      link: '/buses',
      tag: 'Express',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'bus-bulk',
      title: 'Bus Bulk Booking',
      desc: 'Charter entire luxury 32-55 seater coaches for pilgrimages, school tours and large groups.',
      icon: Bus,
      link: '/group-booking',
      tag: 'Group Saver',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'car-rental',
      title: 'Outstation Car Rental',
      desc: 'Sanitized Dzire, Honda City, Ertiga & Innova Crystas with verified experienced highway drivers.',
      icon: Car,
      link: '/cars',
      tag: 'Top Rated',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'whole-car',
      title: 'Whole Car Booking',
      desc: 'Exclusive private vehicle for your family door-to-door journey without sharing.',
      icon: Car,
      link: '/whole-car-booking',
      tag: 'Private',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'train-book',
      title: 'Train Ticket Booking',
      desc: 'Confirmed Vande Bharat, Shatabdi & Superfast train tickets with instant PNR tracking.',
      icon: Train,
      link: '/trains',
      tag: 'IRCTC Partner',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'flight-book',
      title: 'Flight Ticket Booking',
      desc: 'Domestic flight tickets on IndiGo, Air India & Vistara with zero convenience fee deals.',
      icon: Plane,
      link: '/flights',
      tag: 'Instant',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'wedding-car',
      title: 'Wedding Car Fleet',
      desc: 'Groom Mercedes, BMW & Fortuner convoys plus decorated bridal cars for royal celebrations.',
      icon: HeartHandshake,
      link: '/wedding-travel',
      tag: 'Luxury',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'event-transport',
      title: 'Event Transportation',
      desc: 'Seamless guest transit shuttles between hotels, airports, banquet halls & reception grounds.',
      icon: Navigation,
      link: '/wedding-travel',
      tag: 'Full Logistics',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'corporate-travel',
      title: 'Corporate Travel Solutions',
      desc: 'Monthly cab fleets, executive employee transit, GST invoicing & conference logistics.',
      icon: Building2,
      link: '/corporate-travel',
      tag: 'B2B Plans',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'airport-transfer',
      title: 'Airport Transfers',
      desc: 'Guaranteed on-time flight pickups & drop-offs with flight tracking and polite chauffeurs.',
      icon: Plane,
      link: '/cars',
      tag: '24x7',
      image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'group-travel',
      title: 'Group & Family Travel',
      desc: 'Tempo Travellers (12, 17, 26 seater) for Kashi, Ayodhya, Prayagraj & Rajasthan circuits.',
      icon: Users,
      link: '/group-booking',
      tag: 'Spacious',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 'custom-package',
      title: 'Custom Travel Packages',
      desc: 'Tailored multi-city holiday and spiritual tour packages with transport & hotel coordination.',
      icon: Compass,
      link: '/destinations',
      tag: 'Personalized',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Unified Indian Mobility
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-3 tracking-tight">
            Travel Solutions for Every Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Whether you are booking a single sleeper berth or orchestrating a 20-vehicle wedding fleet, Singh Travel provides end-to-end reliability.
          </p>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.link}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-brand-orange/50 overflow-hidden shadow-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-navy-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-extrabold text-navy-900 text-base group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-5 pb-5 pt-0 flex items-center gap-1.5 text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
                  <span>Explore & Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
