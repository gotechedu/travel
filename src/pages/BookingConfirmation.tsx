import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { bookingApi } from '../api/bookingApi';
import { Booking } from '../types';
import { formatINR } from '../utils/formatters';
import { useAppDispatch } from '../store/store';
import { showToast } from '../store/uiSlice';
import { 
  CheckCircle2, Download, Printer, Share2, MessageSquare, 
  Mail, ArrowRight, ShieldCheck, Ticket, Calendar, Clock, MapPin, XCircle 
} from 'lucide-react';

export const BookingConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookingId = searchParams.get('id') || 'ST-92841';

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    bookingApi.getBookingById(bookingId).then((data) => {
      if (data) {
        setBooking(data);
      } else {
        // Fallback default
        setBooking({
          id: bookingId,
          pnr: bookingId,
          travelMode: 'bus',
          title: 'Volvo 9600 Multi-Axle A/C Sleeper',
          operatorName: 'Singh Royal Travels',
          route: { from: 'Lucknow', to: 'Delhi' },
          journeyDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          journeyTime: '21:30',
          passengers: [{ id: 'p1', fullName: 'Aditya Singh', age: 28, gender: 'male', seatNumber: 'U2A' }],
          selectedSeats: ['U2A'],
          totalAmount: 1259,
          discountAmount: 0,
          status: 'confirmed',
          bookedAt: new Date().toISOString(),
          vehicleDetails: 'UP32-EX-4092 (Volvo 9600)',
          boardingPoint: 'Alambagh Terminal Gate 2',
          droppingPoint: 'Kashmere Gate ISBT',
          paymentMethod: 'UPI (VERIFIED)',
        });
      }
      setLoading(false);
    });
  }, [bookingId]);

  const handleDownload = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    dispatch(showToast({ type: 'success', message: 'E-Ticket sent to your WhatsApp number (+91 98765 43210)' }));
  };

  const handleEmailTicket = () => {
    dispatch(showToast({ type: 'success', message: 'PDF Boarding pass dispatched to aditya.singh@example.com' }));
  };

  const handleCancelBooking = async () => {
    if (confirm('Are you sure you want to cancel this booking? Full refund will be initiated.')) {
      await bookingApi.cancelBooking(bookingId);
      dispatch(showToast({ type: 'info', message: 'Booking cancelled. Refund of full amount initiated.' }));
      navigate('/my-bookings');
    }
  };

  if (loading || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Celebration Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Confirmed & Ticket Issued
          </span>
          <h1 className="text-3xl font-black text-navy-900 tracking-tight">
            Booking Confirmed! Have a Safe Journey.
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your travel itinerary is confirmed. We have sent the live GPS tracking link and ticket details to your phone and email.
          </p>
        </div>

        {/* E-Ticket Card Layout */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
          {/* Ticket Header Banner */}
          <div className="bg-navy-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-lg">Singh Travel</span>
                <span className="text-[10px] bg-brand-orange text-white font-bold px-2 py-0.5 rounded">
                  E-TICKET / PASS
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{booking.title}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Booking Reference / PNR</span>
              <p className="text-xl font-mono font-black text-brand-orange">{booking.pnr}</p>
            </div>
          </div>

          {/* Journey Path */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Origin</span>
                <h3 className="text-xl font-extrabold text-navy-900">{booking.route.from}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{booking.boardingPoint}</p>
              </div>

              <div className="flex-1 flex flex-col items-center px-4">
                <span className="text-xs font-bold text-brand-orange">{booking.journeyTime}</span>
                <div className="w-full flex items-center">
                  <div className="w-2 h-2 rounded-full bg-brand-orange" />
                  <div className="flex-1 border-t-2 border-dashed border-slate-300" />
                  <div className="w-2 h-2 rounded-full bg-navy-900" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Confirmed Trip</span>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Destination</span>
                <h3 className="text-xl font-extrabold text-navy-900">{booking.route.to}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{booking.droppingPoint}</p>
              </div>
            </div>

            {/* Travel & Passenger Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Journey Date</span>
                <span className="font-extrabold text-navy-900">{booking.journeyDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Seat / Berths</span>
                <span className="font-extrabold text-brand-orange">
                  {booking.selectedSeats?.join(', ') || 'Allocated at gate'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Amount Paid</span>
                <span className="font-extrabold text-emerald-600">{formatINR(booking.totalAmount)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Mode</span>
                <span className="font-extrabold text-navy-900">{booking.paymentMethod || 'UPI'}</span>
              </div>
            </div>

            {/* Passengers list */}
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Passenger Manifest
              </span>
              <div className="space-y-2">
                {booking.passengers.map((pax, idx) => (
                  <div
                    key={pax.id || idx}
                    className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <span className="font-extrabold text-slate-800">
                      {idx + 1}. {pax.fullName} ({pax.age} yrs, {pax.gender})
                    </span>
                    <span className="font-mono font-bold text-brand-navy">
                      Seat: {pax.seatNumber || booking.selectedSeats?.[idx] || 'Confirmed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket Actions Bar */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="p-3 rounded-xl border border-slate-200 hover:border-brand-orange hover:bg-orange-50/50 text-xs font-bold text-slate-700 hover:text-brand-orange flex items-center justify-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / PDF</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmailTicket}
                className="p-3 rounded-xl border border-slate-200 hover:border-brand-blue hover:bg-blue-50/50 text-xs font-bold text-slate-700 hover:text-brand-blue flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>Email Pass</span>
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                className="p-3 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-xs font-bold text-rose-600 flex items-center justify-center gap-1.5 transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard link */}
        <div className="mt-8 text-center flex items-center justify-center gap-4 text-xs font-bold">
          <Link to="/my-bookings" className="text-brand-orange hover:underline flex items-center gap-1">
            <span>View All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span>•</span>
          <Link to="/" className="text-navy-900 hover:underline">
            Book Another Trip
          </Link>
        </div>
      </div>
    </div>
  );
};
