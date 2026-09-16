import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, HelpCircle, Send, CheckCircle2 } from 'lucide-react';
import { useAppDispatch } from '../../store/store';
import { showToast } from '../../store/uiSlice';

export const ContactSupportSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bookingId: '',
    category: 'Booking Query',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(showToast({ type: 'success', message: 'Query received! Our support agent will call you shortly.' }));
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Support Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Always Here For You
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
                24×7 Customer Support Desk
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Need urgent assistance with your ongoing bus journey, driver coordination, or wedding convoy quote? Speak directly to our operations team.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-orange shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Call Toll-Free</h4>
                  <p className="text-sm font-extrabold text-navy-900">+91 98765 43210</p>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Instant WhatsApp Support</h4>
                  <p className="text-sm font-extrabold text-emerald-700">+91 98765 43210 (Live Now)</p>
                </div>
              </a>

              <a
                href="mailto:support@singhtravel.in"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Official Email Desk</h4>
                  <p className="text-sm font-extrabold text-navy-900">support@singhtravel.in</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-black text-navy-900 mb-1">Submit Your Travel Query</h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill the details below and an operations specialist will respond within 10 minutes.
              </p>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-black text-navy-900">Message Received!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our Lucknow customer care supervisor is reviewing your query and will contact {formData.phone || formData.email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        bookingId: '',
                        category: 'Booking Query',
                        message: '',
                      });
                    }}
                    className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditya Singh"
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aditya@example.com"
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Booking ID / PNR (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.bookingId}
                        onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                        placeholder="e.g. ST-92841"
                        className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Query Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-orange"
                    >
                      <option value="Booking Query">Booking Status & PNR</option>
                      <option value="Group / Bulk Travel">Group / Bulk Bus Booking</option>
                      <option value="Wedding Transport">Wedding Fleet Coordination</option>
                      <option value="Corporate Travel">Corporate B2B Account</option>
                      <option value="Cancellation / Refund">Cancellation & Refund Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your query or fleet requirement in detail..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Query to Support Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
