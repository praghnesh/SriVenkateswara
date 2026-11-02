import React from 'react';
import { Star, MessageCircle, Quote } from 'lucide-react';
import { TESTIMONIALS, CONTACT_INFO } from '../data/travelData';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="reviews">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
            Verified Passenger Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Over {CONTACT_INFO.happyPassengers} happy families, pilgrims, and corporate executives rate our taxi service {CONTACT_INFO.rating} / 5.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div 
              key={review.id} 
              className="bg-slate-50 p-8 rounded-[2rem] border border-gray-100 hover:border-amber-300 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Stars & Quote */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-amber-200 group-hover:text-amber-500 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 font-medium">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200/60">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{review.name}</div>
                  <div className="text-xs text-amber-700 font-semibold">{review.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
