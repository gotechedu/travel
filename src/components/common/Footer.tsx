import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, ShieldCheck, Award, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-brand-orange shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Verified Fleet</h4>
              <p className="text-xs text-slate-400">GPS tracked & commercial licensed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-brand-orange shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Transparent Pricing</h4>
              <p className="text-xs text-slate-400">No hidden fees or surge shocks</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-brand-orange shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24×7 Human Support</h4>
              <p className="text-xs text-slate-400">Call or WhatsApp anytime</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-brand-orange shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Pan-India Network</h4>
              <p className="text-xs text-slate-400">Delhi, UP, Rajasthan, Bihar & beyond</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl">S</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight">
                  Singh <span className="text-brand-orange">Travel</span>
                </span>
                <p className="text-[11px] text-brand-orangeLight font-medium">Travel Together, Explore More</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              India's premier unified multi-service travel and fleet platform. From individual Volvo sleeper bus tickets, trains, and flights to multi-car wedding convoys and corporate luxury coaches, we handle every kilometer with precision and care.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live 24×7 Operations Desk
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">Quick Links</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Singh Travel</Link></li>
              <li><Link to="/offers" className="hover:text-brand-orange transition-colors">Offers & Coupons</Link></li>
              <li><Link to="/destinations" className="hover:text-brand-orange transition-colors">Popular Destinations</Link></li>
              <li><Link to="/my-bookings" className="hover:text-brand-orange transition-colors">My Bookings & PNR</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">Services</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/buses" className="hover:text-brand-orange transition-colors">Bus Ticket Booking</Link></li>
              <li><Link to="/trains" className="hover:text-brand-orange transition-colors">Train Booking & PNR</Link></li>
              <li><Link to="/flights" className="hover:text-brand-orange transition-colors">Domestic Flights</Link></li>
              <li><Link to="/cars" className="hover:text-brand-orange transition-colors">Outstation Car Rental</Link></li>
              <li><Link to="/multiple-car-booking" className="hover:text-brand-orange transition-colors">Multiple Car Fleet Booking</Link></li>
              <li><Link to="/wedding-travel" className="hover:text-brand-orange transition-colors">Wedding & Event Transport</Link></li>
              <li><Link to="/group-booking" className="hover:text-brand-orange transition-colors">Group & Bulk Bus Booking</Link></li>
              <li><Link to="/corporate-travel" className="hover:text-brand-orange transition-colors">Corporate Travel Solutions</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">Support & Connect</h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:support@singhtravel.in" className="hover:text-white transition-colors">support@singhtravel.in</a>
              </li>
              <li className="pt-2">
                <Link to="/faq" className="hover:text-brand-orange transition-colors block">FAQs & Knowledge Base</Link>
                <Link to="/help" className="hover:text-brand-orange transition-colors block mt-1">Cancellation & Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Singh Travel India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/help" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/help" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/help" className="hover:text-slate-400 transition-colors">Security & Trust</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
