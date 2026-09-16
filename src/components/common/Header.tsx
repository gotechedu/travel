import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bus, Train, Plane, Car, Users, HeartHandshake, Building2, 
  Bell, HelpCircle, Ticket, Menu, X, User as UserIcon, LogOut, ChevronDown 
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { openAuthModal, toggleNotificationDrawer, toggleMobileMenu, closeMobileMenu } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const unreadCount = useAppSelector((state) => state.notifications.unreadCount);
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Buses', path: '/buses', icon: Bus },
    { label: 'Flights', path: '/flights', icon: Plane },
    { label: 'Trains', path: '/trains', icon: Train },
    { label: 'Cars', path: '/cars', icon: Car },
    { label: 'Group Booking', path: '/group-booking', icon: Users, badge: 'Popular' },
    { label: 'Wedding & Events', path: '/wedding-travel', icon: HeartHandshake, badge: 'Fleet' },
    { label: 'Corporate', path: '/corporate-travel', icon: Building2 },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg py-2.5 border-b border-navy-800'
            : 'bg-navy-900 py-3.5 border-b border-navy-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-xl tracking-tight">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg md:text-xl tracking-tight leading-none group-hover:text-brand-orangeLight transition-colors">
                  Singh <span className="text-brand-orange">Travel</span>
                </span>
                <span className="text-[10px] text-slate-300 font-medium tracking-wide mt-0.5 hidden sm:block">
                  Travel Together, Explore More
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-blue text-white shadow-xs'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-orange' : 'text-slate-300'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-brand-orange text-white uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notification Bell */}
              <button
                onClick={() => dispatch(toggleNotificationDrawer())}
                className="relative p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-navy-900 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* My Bookings link (Desktop) */}
              <Link
                to="/my-bookings"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Ticket className="w-4 h-4 text-brand-orange" />
                <span>My Bookings</span>
              </Link>

              {/* Help Center */}
              <Link
                to="/help"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-slate-300" />
                <span>Help</span>
              </Link>

              {/* Auth / Profile */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-xl text-white text-xs font-semibold transition-all border border-white/10"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-orange"
                    />
                    <span className="hidden sm:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                  </button>

                  {profileDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 text-slate-700 text-xs font-medium z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>Profile & Travellers</span>
                      </Link>
                      <Link to="/my-bookings" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50">
                        <Ticket className="w-4 h-4 text-slate-400" />
                        <span>All Bookings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left border-t border-slate-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => dispatch(openAuthModal('login'))}
                  className="px-4 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md transition-all hover:shadow-glow-orange"
                >
                  Sign In
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="xl:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs"
            onClick={() => dispatch(closeMobileMenu())}
          />
          <div className="fixed top-16 left-0 right-0 bg-navy-900 border-b border-navy-800 p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => dispatch(closeMobileMenu())}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold ${
                      isActive ? 'bg-brand-orange text-white' : 'bg-navy-800 text-slate-200 hover:bg-navy-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-navy-800 space-y-2">
              <Link
                to="/my-bookings"
                onClick={() => dispatch(closeMobileMenu())}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-800/80 text-white text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-brand-orange" />
                  <span>My Bookings</span>
                </div>
                <span className="text-[10px] text-slate-400">View Tickets</span>
              </Link>
              <Link
                to="/offers"
                onClick={() => dispatch(closeMobileMenu())}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-800/80 text-white text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <span className="text-brand-orange">🏷️</span>
                  <span>Offers & Coupons</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Save upto ₹5,000</span>
              </Link>
              <Link
                to="/help"
                onClick={() => dispatch(closeMobileMenu())}
                className="flex items-center gap-2 p-3 rounded-xl bg-navy-800/80 text-white text-xs font-semibold"
              >
                <HelpCircle className="w-4 h-4 text-slate-300" />
                <span>Help Center & 24x7 Support</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
