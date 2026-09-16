import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { updatePassenger, applyDiscount, removeDiscount } from '../store/bookingSlice';
import { offersApi } from '../api/offersApi';
import { bookingApi } from '../api/bookingApi';
import { formatINR } from '../utils/formatters';
import { showToast } from '../store/uiSlice';
import { 
  ShieldCheck, User, Phone, Mail, Tag, CreditCard, 
  Smartphone, Building2, Wallet, CheckCircle2, ArrowRight, Bus, Plane, Train, Car, Sparkles 
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);
  const search = useAppSelector((state) => state.search);
  const cart = useAppSelector((state) => state.cart);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [addInsurance, setAddInsurance] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('aditya@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine base fare and details
  let tripTitle = 'Express Journey';
  let routeText = `${search.from || 'Lucknow'} → ${search.to || 'Delhi'}`;
  let itemPrice = booking.totalAmount || 1199;

  if (booking.selectedBus) {
    tripTitle = booking.selectedBus.operatorName;
    routeText = `${booking.selectedBus.fromCity} → ${booking.selectedBus.toCity}`;
  } else if (booking.selectedFlight) {
    tripTitle = `${booking.selectedFlight.airline} (${booking.selectedFlight.flightNumber})`;
    routeText = `${booking.selectedFlight.fromAirport.split('(')[0]} → ${booking.selectedFlight.toAirport.split('(')[0]}`;
  } else if (booking.selectedTrain) {
    tripTitle = `${booking.selectedTrain.trainName} (#${booking.selectedTrain.trainNumber})`;
    routeText = `${booking.selectedTrain.fromStation} → ${booking.selectedTrain.toStation}`;
  } else if (booking.selectedCar) {
    tripTitle = booking.selectedCar.name;
    routeText = `${search.from || 'Lucknow'} → ${search.to || 'Outstation'}`;
  } else if (cart.fleetItems.length > 0) {
    tripTitle = `Multi-Car Fleet Package (${cart.totalVehicles} Vehicles)`;
    itemPrice = cart.estimatedFleetCost;
  }

  const insuranceCost = addInsurance ? 29 * (booking.passengers.length || 1) : 0;
  const gstAmount = Math.round(itemPrice * 0.05);
  const grandTotal = Math.max(0, itemPrice + insuranceCost + gstAmount - booking.discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    const result = await offersApi.validateCoupon(couponInput, itemPrice);
    setCouponLoading(false);
    if (result.valid) {
      dispatch(applyDiscount({ code: couponInput.toUpperCase(), discount: result.discount }));
      dispatch(showToast({ type: 'success', message: result.message }));
    } else {
      dispatch(showToast({ type: 'error', message: result.message }));
    }
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);
    try {
      const newBooking = await bookingApi.createBooking({
        travelMode: booking.travelMode,
        title: tripTitle,
        route: { from: routeText.split('→')[0].trim(), to: routeText.split('→')[1]?.trim() || 'Destination' },
        journeyDate: search.departureDate || new Date().toISOString().split('T')[0],
        journeyTime: '21:30',
        passengers: booking.passengers,
        selectedSeats: booking.selectedSeats,
        totalAmount: grandTotal,
        discountAmount: booking.discountAmount,
        status: 'confirmed',
        vehicleDetails: booking.selectedBus?.busType || 'Volvo 9600 Multi-Axle',
        boardingPoint: booking.boardingPoint || 'Alambagh Terminal Gate 2',
        droppingPoint: booking.droppingPoint || 'Kashmere Gate ISBT',
        paymentMethod: paymentMethod.toUpperCase(),
      });

      dispatch(showToast({ type: 'success', message: 'Booking confirmed! Ticket PNR generated.' }));
      navigate(`/booking-confirmation?id=${newBooking.id}`);
    } catch {
      dispatch(showToast({ type: 'error', message: 'Booking transaction failed. Please try again.' }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Checkout Stepper Header */}
      <div className="bg-navy-900 text-white py-6 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                Secure 256-Bit SSL Checkout
              </span>
              <h1 className="text-2xl font-black mt-0.5">Review Trip & Passenger Details</h1>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`px-2.5 py-1 rounded-lg ${activeStep >= 1 ? 'bg-brand-orange text-white' : 'bg-navy-800 text-slate-400'}`}>
                1. Travellers
              </span>
              <span className="text-slate-500">→</span>
              <span className={`px-2.5 py-1 rounded-lg ${activeStep >= 2 ? 'bg-brand-orange text-white' : 'bg-navy-800 text-slate-400'}`}>
                2. Review & Addons
              </span>
              <span className="text-slate-500">→</span>
              <span className={`px-2.5 py-1 rounded-lg ${activeStep >= 3 ? 'bg-brand-orange text-white' : 'bg-navy-800 text-slate-400'}`}>
                3. Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Flow Steps */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Passenger Details Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-base">Passenger Information</h3>
                    <p className="text-xs text-slate-500">Enter names as per Aadhaar or government ID</p>
                  </div>
                </div>
                {booking.selectedSeats.length > 0 && (
                  <span className="text-xs font-bold text-navy-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Seats: {booking.selectedSeats.join(', ')}
                  </span>
                )}
              </div>

              {booking.passengers.map((pax, index) => (
                <div key={pax.id || index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-navy">
                      Passenger #{index + 1} {pax.seatNumber ? `(Seat ${pax.seatNumber})` : ''}
                    </span>
                    <span className="text-[10px] text-slate-400">Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={pax.fullName}
                        onChange={(e) =>
                          dispatch(updatePassenger({ index, passenger: { fullName: e.target.value } }))
                        }
                        placeholder="e.g. Aditya Singh"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Age</label>
                      <input
                        type="number"
                        required
                        value={pax.age}
                        onChange={(e) =>
                          dispatch(updatePassenger({ index, passenger: { age: Number(e.target.value) } }))
                        }
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gender</label>
                      <select
                        value={pax.gender}
                        onChange={(e) =>
                          dispatch(updatePassenger({ index, passenger: { gender: e.target.value as any } }))
                        }
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white focus:outline-none focus:border-brand-orange"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Primary Contact details */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Send Booking Ticket & Live GPS Tracking to:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                      placeholder="WhatsApp Mobile Number"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      defaultValue="aditya.singh@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Trip Protection & Add-ons */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="font-extrabold text-navy-900 text-base">Travel Protection & Add-ons</h3>
                  <p className="text-xs text-slate-500">Government certified trip insurance</p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={addInsurance}
                    onChange={() => setAddInsurance(!addInsurance)}
                    className="w-5 h-5 mt-0.5 accent-brand-orange cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">
                      Add Comprehensive Indian Travel Insurance (₹29 / passenger)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Covers baggage loss, accident hospitalization up to ₹5,00,000, and travel delays.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-brand-orange shrink-0">
                  {formatINR(29 * (booking.passengers.length || 1))}
                </span>
              </div>
            </div>

            {/* Step 3: Payment Method Simulator */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="font-extrabold text-navy-900 text-base">Payment Method</h3>
                  <p className="text-xs text-slate-500">Instant API-ready mock payment gateway</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'upi', label: 'UPI / QR', desc: 'GPay, PhonePe, Paytm', icon: Smartphone },
                  { id: 'card', label: 'Cards', desc: 'Visa, RuPay, Master', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', desc: 'All Indian Banks', icon: Building2 },
                  { id: 'wallet', label: 'Wallets', desc: 'Paytm, Amazon Pay', icon: Wallet },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-orange bg-orange-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-brand-orange' : 'text-slate-600'}`} />
                      <h4 className="font-bold text-xs text-navy-900">{item.label}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Mock UPI details */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-700">Enter UPI ID / VPA</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okaxis"
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Verify
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium">✓ Verified Aditya Singh (State Bank of India)</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary & Checkout Action */}
          <div className="lg:col-span-4 space-y-6 sticky top-20">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold text-brand-orange uppercase">Order Summary</span>
                <h3 className="text-base font-extrabold text-navy-900 mt-0.5">{tripTitle}</h3>
                <p className="text-xs text-slate-500">{routeText}</p>
              </div>

              {/* Coupon code box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Apply Promo Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Try SINGH500"
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-bold uppercase focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="button"
                    disabled={couponLoading}
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-navy-900 hover:bg-brand-orange text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex items-center justify-between mt-2 text-xs text-emerald-600 font-bold">
                    <span>Applied: {booking.couponCode}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(removeDiscount())}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Line items */}
              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Base Booking Amount:</span>
                  <span className="font-semibold text-slate-900">{formatINR(itemPrice)}</span>
                </div>
                {addInsurance && (
                  <div className="flex justify-between">
                    <span>Travel Insurance (₹29/pax):</span>
                    <span className="font-semibold text-slate-900">{formatINR(insuranceCost)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes & GST (5%):</span>
                  <span className="font-semibold text-slate-900">{formatINR(gstAmount)}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Savings:</span>
                    <span>-{formatINR(booking.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-slate-200 text-sm font-black text-navy-900">
                  <span>Total Payable:</span>
                  <span className="text-brand-orange text-xl">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteBooking}
                className="w-full py-4 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-slate-300 text-white font-black text-sm rounded-xl shadow-lg hover:shadow-glow-orange transition-all flex items-center justify-center gap-2 group"
              >
                <span>{isProcessing ? 'Confirming Ticket...' : `Pay & Confirm Booking (${formatINR(grandTotal)})`}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  By clicking Pay, you agree to the Singh Travel Passenger Policy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
