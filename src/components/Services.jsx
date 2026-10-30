import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Navigation, 
  Plane, 
  Clock, 
  Sparkles, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SERVICES_LIST } from '../data/travelData';

export default function Services({ onOpenBookingModal }) {
  const getServiceIcon = (id) => {
    switch (id) {
      case 'outstation-round':
        return Car;
      case 'oneway-drops':
        return Navigation;
      case 'airport-transfers':
        return Plane;
      case 'hourly-rentals':
        return Clock;
      case 'pilgrimage-tours':
        return Sparkles;
      case 'corporate-weddings':
      default:
        return Building2;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50/70" id="services">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center bg-blue-50 border border-blue-200/60 px-4 py-1.5 rounded-full text-blue-700 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Comprehensive Cab Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Our Premium Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            From airport drops to interstate pilgrimages, click any service to view live rates, vehicle options &amp; instant booking details.
          </p>
        </div>

        {/* Services 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_LIST.map((srv) => {
            const IconComponent = getServiceIcon(srv.id);
            const targetRoute = srv.route || '/outstation-cabs';

            return (
              <div 
                key={srv.id} 
                className="group bg-white p-7 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Large Background Watermark Icon */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-opacity text-blue-600 pointer-events-none">
                  <IconComponent className="w-28 h-28" />
                </div>

                <div>
                  {/* Floating Icon Box */}
                  <Link 
                    to={targetRoute}
                    className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm inline-flex"
                  >
                    <IconComponent className="w-7 h-7" />
                  </Link>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link to={targetRoute}>
                      {srv.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-8">
                    {srv.points.map((pt, idx) => (
                      <li key={idx} className="flex items-center text-sm font-medium text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 shrink-0"></div>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <Link
                    to={targetRoute}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{srv.ctaText ? srv.ctaText.replace('→', '').trim() : 'View Details'}</span>
                    <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Link>

                  {onOpenBookingModal && (
                    <button
                      type="button"
                      onClick={() => onOpenBookingModal(srv.title)}
                      className="text-xs bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white px-3.5 py-2 rounded-xl font-bold transition-all shadow-sm"
                    >
                      Book Now
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
