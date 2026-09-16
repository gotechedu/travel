import React, { useState, useEffect } from 'react';
import { bookingApi } from '../api/bookingApi';
import { Booking } from '../types';
import { formatINR } from '../utils/formatters';
import { useAppDispatch } from '../store/store';
import { showToast } from '../store/uiSlice';
import { Ticket, Calendar, MapPin, Printer, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyBookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    setLoading(true);
    bookingApi.getUserBookings().then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  const handleCancelBooking = async (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updated = await bookingApi.cancelBooking(id);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
        dispatch(showToast({ type: 'info', message: `Booking ${id} has been cancelled. Refund initiated.` }));
      }
    }
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-navy-900 text-white py-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange">
                <Ticket className="w-4 h-4" />
                <span>Customer Booking Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black mt-1">My Bookings & PNR</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                View upcoming trips, download e-tickets, and manage fleet coordination
              </p>
            </div>

            <Link
              to="/"
              className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-extrabold rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              + Book New Journey
            </Link>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Trips' },
              { id: 'confirmed', label: 'Upcoming / Active' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-orange text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse space-y-4">
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <Ticket className="w-16 h-16 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No bookings found in this category</h3>
            <p className="text-xs text-slate-400 mt-1">Plan your next journey with Singh Travel today.</p>
            <Link
              to="/"
              className="inline-block mt-4 px-6 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl"
            >
              Search Buses & Flights
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => {
              const isConfirmed = b.status === 'confirmed';
              const isCancelled = b.status === 'cancelled';

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-soft transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        PNR: {b.pnr}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isConfirmed
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCancelled
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400 font-medium">
                      Booked on: {new Date(b.bookedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-8 space-y-1">
                      <h3 className="font-extrabold text-navy-900 text-base leading-snug">{b.title}</h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <span>{b.route.from}</span>
                        <span className="text-brand-orange font-bold">→</span>
                        <span>{b.route.to}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Date: <strong>{b.journeyDate}</strong> at {b.journeyTime}
                      </p>
                      {b.boardingPoint && (
                        <p className="text-[11px] text-slate-400 truncate max-w-md">
                          Boarding: {b.boardingPoint}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">Total Fare</span>
                        <p className="text-xl font-black text-brand-orange">{formatINR(b.totalAmount)}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Link
                          to={`/booking-confirmation?id=${b.id}`}
                          className="px-3.5 py-1.5 bg-navy-900 hover:bg-brand-orange text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View Ticket</span>
                        </Link>

                        {isConfirmed && (
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-3 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
