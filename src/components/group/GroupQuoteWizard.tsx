import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, Car, Users, Calendar, MapPin, CheckCircle2, 
  ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Phone, Mail, FileText 
} from 'lucide-react';
import { useAppDispatch } from '../../store/store';
import { showToast } from '../../store/uiSlice';
import { bookingApi } from '../../api/bookingApi';
import { GroupQuoteRequest } from '../../types';

export const GroupQuoteWizard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{ quoteId: string; status: string } | null>(null);

  const [formData, setFormData] = useState<GroupQuoteRequest>({
    travelType: 'mixed_fleet',
    totalTravellers: 35,
    numberOfVehicles: 3,
    vehicleTypes: ['Force Urbania Tempo Traveller', 'Toyota Innova Crysta'],
    pickupCity: 'Lucknow',
    dropCity: 'Ayodhya Dham',
    startDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 9 * 86400000).toISOString().split('T')[0],
    pickupTime: '06:30',
    pickupPointsCount: 2,
    dropPointsCount: 1,
    purpose: 'family',
    contactName: 'Aditya Singh',
    contactPhone: '+91 98765 43210',
    contactEmail: 'aditya.singh@example.com',
    specialNotes: 'Senior citizens onboard, AC and bottled water required.',
  });

  const nextStep = () => setStep((s) => Math.min(7, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmitQuote = async () => {
    setIsSubmitting(true);
    try {
      const res = await bookingApi.submitGroupQuote(formData);
      setQuoteResult(res);
      setStep(7);
      dispatch(showToast({ type: 'success', message: 'Group quotation request received! Dedicated manager assigned.' }));
    } catch (e) {
      dispatch(showToast({ type: 'error', message: 'Failed to submit quote request. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Top Wizard Progress Bar */}
      <div className="bg-navy-900 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
              Singh Travel Group Desk
            </span>
            <h3 className="text-xl font-extrabold tracking-tight">Bulk & Group Travel Quote Builder</h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-300">Step {step} of 7</span>
            <p className="text-xs font-bold text-brand-orangeLight">
              {step === 1 && 'Select Travel Type'}
              {step === 2 && 'Fleet & Passengers'}
              {step === 3 && 'Route & Multiple Stops'}
              {step === 4 && 'Schedule & Dates'}
              {step === 5 && 'Special Requirements'}
              {step === 6 && 'Contact Details'}
              {step === 7 && 'Quote Summary'}
            </p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="grid grid-cols-7 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div
              key={num}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                num <= step ? 'bg-brand-orange' : 'bg-navy-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Travel Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg">Choose Your Fleet Category</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select whether you need multiple buses, cars, or a synchronized mixed fleet.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'bus',
                    title: 'Full & Bulk Buses',
                    desc: 'Volvo & BharatBenz coaches for 25 to 500+ passengers',
                    icon: Bus,
                  },
                  {
                    id: 'cars',
                    title: 'Multiple Cars / Cabs',
                    desc: 'Sedans, Innova Crystas & Fortuners for family & corporate convoys',
                    icon: Car,
                  },
                  {
                    id: 'mixed_fleet',
                    title: 'Mixed Fleet (Buses + Cabs)',
                    desc: 'Combined luxury groom/guest cars with tempo travellers & buses',
                    icon: Users,
                    recommended: true,
                  },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.travelType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setFormData({ ...formData, travelType: type.id as any })}
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-brand-orange bg-orange-50/50 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {type.recommended && (
                        <span className="absolute -top-2.5 right-4 bg-brand-orange text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      )}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-brand-orange' : 'text-slate-700'}`} />
                      </div>
                      <h5 className="font-bold text-sm text-navy-900">{type.title}</h5>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{type.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Continue to Fleet Size</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Travellers & Vehicles */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg">Travellers & Vehicle Estimate</h4>
                <p className="text-xs text-slate-500 mt-0.5">Tell us the scale of your group</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Total Estimated Passengers: <span className="text-brand-orange font-black text-sm">{formData.totalTravellers}</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={300}
                    step={5}
                    value={formData.totalTravellers}
                    onChange={(e) => setFormData({ ...formData, totalTravellers: Number(e.target.value) })}
                    className="w-full accent-brand-orange"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>10 pax (Small Group)</span>
                    <span>150+ pax</span>
                    <span>300+ pax (Conferences)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Estimated Vehicles Required: <span className="text-brand-orange font-black text-sm">{formData.numberOfVehicles}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={formData.numberOfVehicles}
                    onChange={(e) => setFormData({ ...formData, numberOfVehicles: Number(e.target.value) })}
                    className="w-full accent-brand-orange"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1 Vehicle</span>
                    <span>10 Fleet</span>
                    <span>20+ Convoys</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Trip Purpose</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'family', label: 'Family Pilgrimage / Vacation' },
                    { id: 'wedding', label: 'Wedding & Guest Fleet' },
                    { id: 'corporate', label: 'Corporate Offsite / Event' },
                    { id: 'college', label: 'School / College Tour' },
                    { id: 'pilgrimage', label: 'Temple / Kashi Yatra' },
                    { id: 'other', label: 'Other Group Tour' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, purpose: p.id as any })}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        formData.purpose === p.id
                          ? 'border-brand-orange bg-orange-50 text-brand-navy'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Set Route & Stops</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Route & Multi-point Stops */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg">Route & Multiple Pickups</h4>
                <p className="text-xs text-slate-500 mt-0.5">We support multi-point boarding for wedding & corporate guests</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Origin City / Area</label>
                  <input
                    type="text"
                    value={formData.pickupCity}
                    onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                    placeholder="e.g. Lucknow, Kanpur, Delhi"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination City / Venue</label>
                  <input
                    type="text"
                    value={formData.dropCity}
                    onChange={(e) => setFormData({ ...formData, dropCity: e.target.value })}
                    placeholder="e.g. Ayodhya Dham, Varanasi, Jaipur"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Number of Pickup Points: {formData.pickupPointsCount}
                  </label>
                  <select
                    value={formData.pickupPointsCount}
                    onChange={(e) => setFormData({ ...formData, pickupPointsCount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  >
                    <option value={1}>Single Point Pickup</option>
                    <option value={2}>2 Boarding Locations (e.g. Airport + Hotel)</option>
                    <option value={3}>3 Boarding Locations</option>
                    <option value={4}>4+ Multi-stop Boarding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Drop Locations: {formData.dropPointsCount}
                  </label>
                  <select
                    value={formData.dropPointsCount}
                    onChange={(e) => setFormData({ ...formData, dropPointsCount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  >
                    <option value={1}>Single Venue Drop</option>
                    <option value={2}>2 Drop Points (Resort + Banquet)</option>
                    <option value={3}>Multiple Drop Points</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Select Dates & Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg">Travel Dates & Timings</h4>
                <p className="text-xs text-slate-500 mt-0.5">When should the fleet report to your pickup point?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Journey Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Return / End Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Reporting Time</label>
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Special Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Special Requirements */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg">Special Amenities & Custom Requests</h4>
                <p className="text-xs text-slate-500 mt-0.5">Let us know if you need specific bus features or luggage vans</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  'Chilled Air Conditioning',
                  'Individual USB Charging',
                  'Microphone & PA System',
                  'Extra Roof Luggage Carrier',
                  'Water Bottles & Refreshments',
                  'Elderly Seat Accessibility',
                  'Uniformed Chauffeur / Attendant',
                  'Night Driving Permissions',
                  'GST Tax Invoice for Corporate',
                ].map((amenity, i) => (
                  <label key={i} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-brand-orange cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 3} className="w-4 h-4 accent-brand-orange" />
                    <span className="font-semibold text-slate-700">{amenity}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Additional Instructions / Notes</label>
                <textarea
                  rows={3}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="Specify any route deviations, VIP guests, or wedding schedule details..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Contact Information</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Contact Information */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-extrabold text-navy-900 text-lg">Organizer Contact Details</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our group fleet manager will send the formal quotation & vehicle photos via WhatsApp/Email.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitQuote}
                  className="px-8 py-3.5 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-slate-300 text-white text-xs font-extrabold rounded-xl shadow-lg hover:shadow-glow-orange flex items-center gap-2"
                >
                  <span>{isSubmitting ? 'Generating Quote...' : 'Submit & Get Custom Quote'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 7: Confirmation Summary */}
          {step === 7 && quoteResult && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  Request Dispatched
                </span>
                <h4 className="text-2xl font-black text-navy-900 mt-1">Group Quote Request Received!</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2">
                  Quotation Reference <span className="font-mono font-bold text-navy-900">#{quoteResult.quoteId}</span>. 
                  Our senior fleet supervisor will call <span className="font-bold text-slate-800">{formData.contactPhone}</span> with photos and vehicle options within 15 minutes.
                </p>
              </div>

              {/* Estimate Snapshot */}
              <div className="bg-slate-50 rounded-2xl p-5 max-w-lg mx-auto border border-slate-200 text-left space-y-3">
                <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-navy-900">{formData.pickupCity} → {formData.dropCity}</span>
                </div>
                <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Estimated Pax & Vehicles:</span>
                  <span className="font-bold text-navy-900">{formData.totalTravellers} Travellers ({formData.numberOfVehicles} Vehicles)</span>
                </div>
                <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Dates:</span>
                  <span className="font-bold text-navy-900">{formData.startDate} at {formData.pickupTime}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Indicative Price Range:</span>
                  <span className="font-extrabold text-brand-orange text-sm">₹18,500 – ₹24,000 (Incl. Toll & Driver)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setQuoteResult(null);
                  }}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Create Another Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
