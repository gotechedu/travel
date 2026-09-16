import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Ticket, Tag, User, Car } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { openAuthModal } from '../../store/uiSlice';

export const BottomNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-brand-orange font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-brand-orange font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Ticket className="w-5 h-5 mb-0.5" />
          <span>Bookings</span>
        </NavLink>

        <NavLink
          to="/multiple-car-booking"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-brand-orange font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <div className="w-7 h-7 -mt-2 bg-gradient-to-tr from-brand-orange to-amber-500 rounded-full flex items-center justify-center text-white shadow-md">
            <Car className="w-4 h-4" />
          </div>
          <span className="mt-0.5">Fleets</span>
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-brand-orange font-bold' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Tag className="w-5 h-5 mb-0.5" />
          <span>Offers</span>
        </NavLink>

        {isAuthenticated ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-brand-orange font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <User className="w-5 h-5 mb-0.5" />
            <span>Account</span>
          </NavLink>
        ) : (
          <button
            onClick={() => dispatch(openAuthModal('login'))}
            className="flex flex-col items-center py-1 text-[10px] font-medium text-slate-500 hover:text-slate-800"
          >
            <User className="w-5 h-5 mb-0.5" />
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );
};
