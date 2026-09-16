import React, { useState } from 'react';
import { HeartHandshake, Sparkles, CheckCircle2, Car, Bus, ArrowRight, ShieldCheck, Phone, Mail, Clock } from 'lucide-react';
import { useAppDispatch } from '../store/store';
import { showToast } from '../store/uiSlice';
import { bookingApi } from '../api/bookingApi';

export const WeddingTravel: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    eventType: 'full_wedding' as const,
    eventDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    venueCity: 'Lucknow',
    venueName: 'Hotel Hyatt Regency / Royal Banquet',
    guestCount: 120,
    groomCar: 'Mercedes-Benz E-Class Luxury',
    brideCar: 'Toyota Fortuner VIP',
    guestCarsCount: 4,
    guestBusesCount: 2,
    airportPickupNeeded: true,
    contactName: 'Aditya Singh',
    contactPhone: '+91 98765 43210',
    contactEmail: 'aditya.singh@example.com',
    specialNotes: 'Require floral decoration on Groom car, airport reception placard.',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookingApi.submitWeddingQuote(formData);
      setSubmittedId(res.quoteId);
      dispatch(showToast({ type: 'success', message: 'Wedding fleet inquiry received! Coordinator assigned.' }));
    } catch {
      dispatch(showToast({ type: 'error', message: 'Error submitting quote request.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-[#0B4F8A] text-white py-12 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-extrabold uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Royal Wedding Transport Logistics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Make Your Special Day Move Smoothly
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 leading-relaxed">
            From the Groom’s decorated luxury car to 20-car family convoys and guest airport shuttle loops, Singh Travel provides complete peace of mind.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Plan Wedding Transport */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-navy-900">Plan Wedding Transportation</h3>
              <p className="text-xs text-slate-500">
                Receive customized package pricing with vehicle photos and chauffeur details
              </p>
            </div>

            {submittedId ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-navy-900">Wedding Fleet Request #{submittedId}</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Congratulations! Our senior wedding transportation supervisor will reach out on{' '}
                  <strong>{formData.contactPhone}</strong> within 15 minutes to review venue coordinates and schedule test inspections.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="px-6 py-2.5 bg-navy-900 text-white rounded-xl text-xs font-bold"
                >
                  Submit Another Event
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                    >
                      <option value="full_wedding">Full Wedding (3-Day Multi-Event)</option>
                      <option value="wedding">Baraat & Wedding Day (1-Day)</option>
                      <option value="reception">Reception & Dinner Transfer</option>
                      <option value="sangeet">Sangeet & Cocktail Shuttle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Event Date</label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Venue City</label>
                    <input
                      type="text"
                      required
                      value={formData.venueCity}
                      onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Venue / Resort Name</label>
                    <input
                      type="text"
                      required
                      value={formData.venueName}
                      onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expected Guests</label>
                    <input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cars Needed (Innova / Sedan)</label>
                    <input
                      type="number"
                      value={formData.guestCarsCount}
                      onChange={(e) => setFormData({ ...formData, guestCarsCount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Buses / Tempo Travellers</label>
                    <input
                      type="number"
                      value={formData.guestBusesCount}
                      onChange={(e) => setFormData({ ...formData, guestBusesCount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Groom Car Preference</label>
                    <select
                      value={formData.groomCar}
                      onChange={(e) => setFormData({ ...formData, groomCar: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                    >
                      <option value="Mercedes-Benz E-Class Luxury">Mercedes-Benz E-Class Luxury</option>
                      <option value="BMW 5-Series Executive">BMW 5-Series Executive</option>
                      <option value="Toyota Fortuner VIP (White)">Toyota Fortuner VIP (White)</option>
                      <option value="Audi A6 Matrix">Audi A6 Matrix</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Organizer WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements</label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Get Custom Wedding Fleet Quote'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Fleet Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-extrabold text-navy-900 text-base">Popular Wedding Vehicle Categories</h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80"
                    alt="Mercedes"
                    className="w-16 h-14 object-cover rounded-xl shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-navy-900">Mercedes-Benz & BMW Fleet</h4>
                    <p className="text-[11px] text-slate-500">Premium ribbons, flower art & white-glove driver</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80"
                    alt="Innova"
                    className="w-16 h-14 object-cover rounded-xl shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-navy-900">Toyota Innova Crysta Convoys</h4>
                    <p className="text-[11px] text-slate-500">7-seater luxury highway AC comfort for relatives</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=200&q=80"
                    alt="Tempo"
                    className="w-16 h-14 object-cover rounded-xl shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-navy-900">Force Urbania & Tempo Travellers</h4>
                    <p className="text-[11px] text-slate-500">12, 17 and 26-seater AC coaches for guest shuttles</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Includes all state road taxes, highway tolls, and driver DA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Backup emergency vehicle on standby across Delhi, UP & NCR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
