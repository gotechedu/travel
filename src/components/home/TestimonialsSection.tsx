import React, { useState } from 'react';
import { MOCK_TESTIMONIALS } from '../../data/testimonials';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wedding' | 'bus' | 'corporate' | 'family'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = selectedCategory === 'all'
    ? MOCK_TESTIMONIALS
    : MOCK_TESTIMONIALS.filter((t) => t.category === selectedCategory);

  const activeTestimonial = filtered[currentIndex % filtered.length] || MOCK_TESTIMONIALS[0];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % filtered.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Real Stories, Real Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mt-2 tracking-tight">
            Trusted by Travelers & Event Planners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            From overnight Volvo sleeper commutes to high-stakes 50-car wedding logistics
          </p>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'bus', label: 'Bus Bookings' },
              { id: 'wedding', label: 'Wedding Fleets' },
              { id: 'corporate', label: 'Corporate Offsites' },
              { id: 'family', label: 'Family & Pilgrimage' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md relative">
          <Quote className="w-12 h-12 text-brand-orange/20 absolute top-6 right-8" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={activeTestimonial.avatar}
              alt={activeTestimonial.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-orange shadow-md shrink-0"
            />

            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                "{activeTestimonial.text}"
              </p>

              <div>
                <h4 className="font-extrabold text-navy-900 text-base">{activeTestimonial.name}</h4>
                <p className="text-xs text-slate-500">
                  {activeTestimonial.role} • <span className="text-brand-orange font-semibold">{activeTestimonial.city}</span> ({activeTestimonial.date})
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-end gap-2 mt-6 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-orange hover:text-brand-orange transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:border-brand-orange hover:text-brand-orange transition-colors shadow-xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
