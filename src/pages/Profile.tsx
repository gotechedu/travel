import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { updateProfile } from '../store/authSlice';
import { showToast } from '../store/uiSlice';
import { User, Phone, Mail, ShieldCheck, Heart, Users, CreditCard, Save } from 'lucide-react';

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || 'Aditya Singh');
  const [email, setEmail] = useState(user?.email || 'aditya.singh@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

  const [savedTravellers, setSavedTravellers] = useState([
    { id: '1', name: 'Aditya Singh', age: 28, gender: 'Male', idType: 'Aadhaar' },
    { id: '2', name: 'Neha Singh', age: 26, gender: 'Female', idType: 'Aadhaar' },
    { id: '3', name: 'Vikramaditya Singh', age: 58, gender: 'Male', idType: 'Senior Citizen' },
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, phone }));
    dispatch(showToast({ type: 'success', message: 'Profile updated successfully!' }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-navy-900 text-white py-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name || 'Profile'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-orange shadow-md"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black">{name}</h1>
              <p className="text-xs text-slate-300 mt-0.5">Singh Travel Verified Account • Primary Booker</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Personal Details Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-navy-900">Personal Information</h3>
              <p className="text-xs text-slate-500">Update your contact profile and booking communications</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>

          {/* Right: Saved Travellers List */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-navy-900">Saved Travellers</h3>
                <p className="text-xs text-slate-500">Quick autofill during seat booking</p>
              </div>
              <Users className="w-5 h-5 text-brand-orange" />
            </div>

            <div className="space-y-3">
              {savedTravellers.map((traveller) => (
                <div
                  key={traveller.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-extrabold text-navy-900">{traveller.name}</h4>
                    <p className="text-slate-500">
                      {traveller.age} yrs • {traveller.gender} • {traveller.idType}
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
              <span>Identity encrypted with Aadhaar tokenization protocols.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
