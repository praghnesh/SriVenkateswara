import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  HeartHandshake, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  Sparkles,
  Users
} from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function AboutUs({ onOpenBookingModal }) {
  const highlights = [
    {
      title: '12+ Years of Road Trust',
      desc: 'Serving families, tourists, and corporate executives across Guntur, Vijayawada, and Amaravati since 2012.'
    },
    {
      title: 'Police-Verified Chauffeurs',
      desc: 'Experienced, courteous, non-smoking drivers with deep knowledge of Andhra & Telangana highway routes.'
    },
    {
      title: 'Ghat-Road Certified',
      desc: 'Specialized handling on hill routes including Tirumala 1st/2nd ghats, Srisailam curves, and Araku valleys.'
    },
    {
      title: '100% Transparent Invoicing',
      desc: 'Zero surge pricing, zero hidden fuel/night penalties. Clear GST bills with detailed Fastag breakdowns.'
    }
  ];

  return (
    <section className="py-10 lg:py-14 bg-slate-50 border-y border-slate-100" id="about">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Image Collage with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
              <img
                src="/assets/images/hero-bg.jpg"
                alt="Sri Venkateswara Car Travels Fleet & Drivers"
                className="w-full h-[460px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Bottom Caption inside image */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <span className="bg-blue-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md mb-2 inline-block">
                  Andhra Pradesh's Premier Travel Partner
                </span>
                <h4 className="text-xl font-bold">Reliable, Safe &amp; Sanitized Travels</h4>
                <p className="text-xs text-gray-300 mt-1">Guntur • Vijayawada • Hyderabad • Tirupati • Vizag</p>
              </div>
            </div>

            {/* Floating Trust Badge - Top Left */}
            <div className="absolute -top-6 -left-6 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-gray-100 flex items-center space-x-3.5 z-20">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 leading-none">12+ Years</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">Excellence in Service</div>
              </div>
            </div>

            {/* Floating Trust Badge - Bottom Right */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-gray-100 flex items-center space-x-3.5 z-20">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 leading-none">{CONTACT_INFO.happyPassengers}</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">Delighted Travelers</div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center bg-blue-50 border border-blue-200/60 px-4 py-1.5 rounded-full text-blue-700 font-bold text-xs uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 mr-2" />
              About Sri Venkateswara Car Travels
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Your Most Trusted Travel Partner in <span className="text-blue-600">Andhra Pradesh</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Founded in Guntur with a steadfast commitment to passenger safety and punctual service, 
              <strong> Sri Venkateswara Car Travels</strong> has become a household name for pilgrims, families, 
              and corporate executives traveling across Andhra Pradesh and neighboring states.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Whether you need an early-morning airport transfer to Gannavaram (VGA) / Hyderabad (HYD), 
              a 3-day sacred pilgrimage to Tirumala or Srisailam, or comfortable outstation family travel, 
              we guarantee impeccably clean AC cabs, courteous chauffeurs, and 100% upfront pricing.
            </p>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, i) => (
                <div 
                  key={i} 
                  className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-gray-900">{h.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed pl-7">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/25 text-sm hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Call {CONTACT_INFO.primaryPhone}</span>
              </a>

              <button
                type="button"
                onClick={() => openWhatsApp('Hello Sri Venkateswara Car Travels, I would like to learn more about your services and book a ride.')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-emerald-600/20 text-sm hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

