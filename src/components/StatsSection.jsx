import React from 'react';
import { Award, Car, Star, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';

export default function StatsSection() {
  const stats = [
    { label: 'Happy Passengers', value: `${CONTACT_INFO.happyPassengers}`, icon: Award },
    { label: 'Well-Maintained Cars', value: `${CONTACT_INFO.fleetSize}`, icon: Car },
    { label: 'Tours Completed', value: '4,500+', icon: Star },
    { label: 'Years of Experience', value: `${CONTACT_INFO.experienceYears}`, icon: Clock },
  ];

  return (
    <section className="py-8 lg:py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="text-center p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group"
              >
                <div className="w-13 h-13 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-gray-900 mb-0.5 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-gray-500 font-semibold text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

