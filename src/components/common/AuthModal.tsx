import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Lock, User as UserIcon, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { closeAuthModal, openAuthModal, showToast } from '../../store/uiSlice';
import { login } from '../../store/authSlice';

export const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isAuthModalOpen);
  const currentTab = useAppSelector((state) => state.ui.authModalTab);

  const [useOtp, setUseOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Aditya Singh',
    identifier: 'aditya.singh@example.com',
    password: 'password123',
    otp: '4920',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        id: 'usr-' + Date.now().toString().slice(-4),
        name: formData.name || 'Aditya Singh',
        email: formData.identifier.includes('@') ? formData.identifier : 'aditya.singh@example.com',
        phone: !formData.identifier.includes('@') ? formData.identifier : '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        isLoggedIn: true,
      })
    );
    dispatch(closeAuthModal());
    dispatch(
      showToast({
        type: 'success',
        message: currentTab === 'login' ? 'Logged in successfully! Welcome back.' : 'Account created successfully!',
      })
    );
  };

  const handleGoogleLogin = () => {
    dispatch(
      login({
        id: 'usr-google',
        name: 'Aditya Singh',
        email: 'aditya.google@gmail.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        isLoggedIn: true,
      })
    );
    dispatch(closeAuthModal());
    dispatch(showToast({ type: 'success', message: 'Signed in with Google account!' }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeAuthModal())}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden z-10"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-brand-blue p-6 text-white text-center relative">
              <button
                onClick={() => dispatch(closeAuthModal())}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md mb-3 border border-white/20">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Singh Travel Account</h2>
              <p className="text-xs text-slate-300 mt-1">Unlock express booking, saved passengers & fleet quotes</p>

              {/* Tabs */}
              <div className="flex bg-navy-950/50 p-1 rounded-xl mt-4 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => dispatch(openAuthModal('login'))}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentTab === 'login' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(openAuthModal('register'))}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentTab === 'register' ? 'bg-brand-orange text-white shadow-sm' : 'text-slate-300 hover:text-white'
                    }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {currentTab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aditya Singh"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {useOtp ? 'Mobile Number (for OTP)' : 'Email or Mobile Number'}
                </label>
                <div className="relative">
                  {useOtp ? (
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  )}
                  <input
                    type="text"
                    required
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    placeholder={useOtp ? '+91 98765 43210' : 'name@example.com or phone'}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>

              {!useOtp ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Password</label>
                    {currentTab === 'login' && (
                      <button
                        type="button"
                        onClick={() => setUseOtp(true)}
                        className="text-[11px] font-medium text-brand-blue hover:text-brand-orange transition-colors"
                      >
                        Login via OTP instead
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Enter 4-Digit OTP</label>
                    <button
                      type="button"
                      onClick={() => setUseOtp(false)}
                      className="text-[11px] font-medium text-brand-blue hover:text-brand-orange transition-colors"
                    >
                      Use password instead
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    placeholder="4920 (Auto-sent to phone)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-center font-mono tracking-widest focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-brand-orangeHover text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2 group mt-2"
              >
                <span>{currentTab === 'login' ? 'Sign In to Account' : 'Create Singh Travel Account'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-slate-400">or continue with</span>
                </div>
              </div>

              {/* Google login mock */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              \
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
