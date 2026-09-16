import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { addFleetItem, removeFleetItem, updateItemQuantity, clearFleet } from '../store/cartSlice';
import { MOCK_CARS } from '../data/cars';
import { formatINR } from '../utils/formatters';
import { showToast } from '../store/uiSlice';
import { Car, Plus, Trash2, Users, Calendar, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const MultipleCarBooking: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fleetItems, totalVehicles, totalPassengersCapacity, estimatedFleetCost } = useAppSelector(
    (state) => state.cart
  );

  // Form to add a new vehicle to fleet
  const [selectedCarId, setSelectedCarId] = useState(MOCK_CARS[1].id); // Innova Crysta
  const [quantity, setQuantity] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('Lucknow Airport / Hotel');
  const [dropLocation, setDropLocation] = useState('Ayodhya Dham / Resort');
  const [pickupDate, setPickupDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('08:00');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const car = MOCK_CARS.find((c) => c.id === selectedCarId) || MOCK_CARS[0];

    dispatch(
      addFleetItem({
        id: `fleet-${Date.now()}`,
        carId: car.id,
        carName: car.name,
        category: car.category,
        quantity,
        pickupLocation,
        dropLocation,
        pickupDate,
        pickupTime,
        withDriver: true,
        pricePerVehicle: car.estimatedTotalFare,
      })
    );

    dispatch(showToast({ type: 'success', message: `Added ${quantity}x ${car.name} to your fleet!` }));
  };

  const handleProceedToBooking = () => {
    if (fleetItems.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Banner */}
      <div className="bg-navy-900 text-white py-10 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Multiple Car & Mixed Fleet Builder
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
              Build Your Custom Fleet
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Combine groom luxury cars, passenger Innovas, and tempo travellers for weddings, pilgrimages, and corporate offsites. Get centralized routing and billing.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Add Vehicle Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-navy-900">Add Vehicle to Fleet</h3>
                <p className="text-xs text-slate-500">Select model, quantities, and reporting details</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              {/* Vehicle Type Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Vehicle Model</label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 focus:outline-none focus:border-brand-orange"
                >
                  {MOCK_CARS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.seats} Seater) — {formatINR(c.estimatedTotalFare)}/day
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity Required: <span className="text-brand-orange font-black text-sm">{quantity}</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuantity(num)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        quantity === num
                          ? 'bg-navy-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup & Drop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Point</label>
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Lucknow Hotel / Airport"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Drop Point</label>
                  <input
                    type="text"
                    required
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="e.g. Ayodhya Wedding Venue"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle to Current Fleet</span>
              </button>
            </form>
          </div>

          {/* Right Column: Fleet Summary & Checkout */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">Fleet Manifest Summary</h3>
                  <p className="text-xs text-slate-500">Live capacity and vehicle allocation</p>
                </div>
                {fleetItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => dispatch(clearFleet())}
                    className="text-xs text-rose-600 hover:underline font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Stat Chips */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Vehicles</span>
                  <span className="text-xl font-black text-navy-900">{totalVehicles}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Guest Capacity</span>
                  <span className="text-xl font-black text-brand-orange">{totalPassengersCapacity} Pax</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fleet Package</span>
                  <span className="text-xl font-black text-emerald-600">{formatINR(estimatedFleetCost)}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {fleetItems.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <Car className="w-12 h-12 mx-auto mb-2 opacity-30 text-slate-500" />
                    <p className="text-xs font-semibold text-slate-600">No vehicles in fleet yet</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Use the form on the left to add Sedans, Innovas, or Tempo Travellers.
                    </p>
                  </div>
                ) : (
                  fleetItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-navy-900 truncate">{item.carName}</span>
                          <span className="text-[10px] bg-brand-orange text-white font-bold px-1.5 py-0.2 rounded">
                            {item.quantity}x Units
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {item.pickupLocation} → {item.dropLocation}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.pickupDate} at {item.pickupTime} • With Chauffeur
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-xs font-black text-brand-orange">
                          {formatINR(item.pricePerVehicle * item.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFleetItem(item.id))}
                          className="text-slate-400 hover:text-rose-600 p-1 mt-1 transition-colors"
                          title="Remove vehicle"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Proceed CTA */}
              <button
                type="button"
                disabled={fleetItems.length === 0}
                onClick={handleProceedToBooking}
                className="w-full py-4 bg-brand-orange hover:bg-brand-orangeHover disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Booking ({totalVehicles} Vehicles)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
