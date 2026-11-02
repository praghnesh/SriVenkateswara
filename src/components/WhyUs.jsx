import React from 'react';
import {
  ShieldCheck,
  Receipt,
  Clock,
  CheckCircle2,
  Headphones,
  Mountain,
  Award
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/travelData';

export default function WhyUs() {
  const icons = [
    ShieldCheck,
    Receipt,
    Clock,
    CheckCircle2,
    Headphones,
    Mountain
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50" id="why-us">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 mr-2" />
            The Sri Venkateswara Standard
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Why Thousands of Travelers Trust Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            We combine traditional Andhra hospitality with modern fleet reliability to make every journey safe, punctual, and memorable.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = icons[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
              >
                {/* Large Background Watermark Icon */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-amber-500 pointer-events-none">
                  <IconComponent className="w-24 h-24" />
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 transition-all shadow-sm border border-amber-200/60">
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
