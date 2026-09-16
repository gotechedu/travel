import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { selectCar } from '../store/bookingSlice';
import { MOCK_CARS } from '../data/cars';
import { formatINR } from '../utils/formatters';
import { Car, MapPin, Calendar, Clock, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WholeCarBooking: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pickup, setPickup] = useState('Lucknow (Home Pickup)');
  const [drop, setDrop] = useState('Ayodhya Dham (Resort Drop)');
  const [pickupDate, setPickupDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('07:00');
  const [paxCount, setPaxCount] = useState(5);
  const [selectedCarId, setSelectedCarId] = useState('car-2'); // Innova Crysta
  const [specialNotes, setSpecialNotes] = useState('');

  const selectedCar = MOCK_CARS.find((c) => c.id === selectedCarId) || MOCK_CARS[1];

  const handleBookCar = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(selectCar(selectedCar));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-10 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Private Door-to-Door Chauffeur Service
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
              Book the Entire Car for Your Journey
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              No shared co-passengers. Complete privacy, flexibility to stop anywhere on the expressway, and an experienced professional chauffeur dedicated to your family.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handleBookCar}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form Settings */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-navy-900">Trip & Route Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">Where and when should the private car arrive?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address / Landmark</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Drop Address / City</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time</label>
                  <input
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Passengers Count</label>
                  <select
                    value={paxCount}
                    onChange={(e) => setPaxCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 12, 17].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'Persons'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Selection Grid */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Select Private Vehicle Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOCK_CARS.map((c) => {
                    const isSelected = selectedCarId === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCarId(c.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'border-brand-orange bg-orange-50/60 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img src={c.image} alt={c.name} className="w-16 h-14 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-xs text-navy-900 truncate">{c.name}</h4>
                          <p className="text-[11px] text-slate-500">
                            {c.seats} Seats • {c.luggage} Bags
                          </p>
                          <p className="text-xs font-black text-brand-orange mt-0.5">
                            {formatINR(c.estimatedTotalFare)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Need baby car seat, specific route via Taj Expressway, or pet onboard..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            {/* Right Summary & Recommendation Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-20">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Recommended Private Vehicle
                </span>
                <h3 className="text-xl font-black text-navy-900 mt-2">{selectedCar.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedCar.idealFor}</p>
              </div>

              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-44 object-cover rounded-2xl shadow-xs"
              />

              {/* Fare breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Base Outstation Fare:</span>
                  <span className="font-semibold text-slate-900">{formatINR(selectedCar.baseFarePerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chauffeur Night Allowance:</span>
                  <span className="font-semibold text-slate-900">{formatINR(selectedCar.driverAllowancePerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expressway Fastag Toll & State Tax:</span>
                  <span className="font-semibold text-emerald-600">Included (Free)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-navy-900">
                  <span>Total Estimated Cost:</span>
                  <span className="text-brand-orange text-lg">{formatINR(selectedCar.estimatedTotalFare)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sanitized vehicle with verified chauffeur</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  <span>Zero cancellation fee up to 12 hours prior</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Book Whole Car</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
