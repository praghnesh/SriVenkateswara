import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  Clock,
  Receipt,
  Headphones,
  Mountain,
  ArrowRight,
  Users,
  CheckCircle2,
  Phone,
  MessageSquare,
  Car
} from 'lucide-react';
import { CONTACT_INFO, WHY_CHOOSE_US, TESTIMONIALS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function WhyUsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();

  const icons = [
    ShieldCheck,
    Receipt,
    Clock,
    CheckCircle2,
    Headphones,
    Mountain
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4 shadow-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>THE MOST TRUSTED TAXI SERVICE IN GUNTUR &amp; VIJAYAWADA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Why 50,000+ Travelers Choose <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">Sri Venkateswara Travels</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            We started with a simple promise: 100% transparent rates, spotless air-conditioned cars, and polite chauffeurs who treat you and your family with respect.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/outstation-cabs')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center gap-1.5 cursor-pointer border border-amber-300/40"
            >
              <span>Book Outstation Cab</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/fleet')}
              className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Fleet</span>
            </button>
          </div>

        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-black text-amber-700">12+ Years</div>
              <div className="text-xs font-semibold text-gray-500 mt-1">Service Excellence</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black text-amber-700">{CONTACT_INFO.happyPassengers}</div>
              <div className="text-xs font-semibold text-gray-500 mt-1">Happy Travelers</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black text-amber-700">{CONTACT_INFO.fleetSize}</div>
              <div className="text-xs font-semibold text-gray-500 mt-1">Verified Fleet Cars</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black text-amber-700">4.9 / 5</div>
              <div className="text-xs font-semibold text-gray-500 mt-1">Passenger Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Pillars of Trust */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Our 6 Unbreakable Pillars of Trust
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              Every trip with Sri Venkateswara Travels adheres to our strict safety, hygiene, and ethical billing guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComponent = icons[idx] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 border border-amber-200/60 rounded-2xl flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Real Stories from Our Passengers
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              Read how our polite chauffeurs and comfortable cars made journeys memorable for families and corporate clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="bg-slate-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 mb-3 text-sm">★★★★★</div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                    "{review.text}"
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-200 flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-full flex items-center justify-center border border-amber-300/40">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{review.name}</div>
                    <div className="text-[10px] text-amber-700 font-semibold">{review.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

