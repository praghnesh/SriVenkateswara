import React from 'react';
import { MapPin, CheckCircle2, Navigation, ArrowRight } from 'lucide-react';
import { SERVICE_HUBS } from '../data/travelData';
import { Link } from 'react-router-dom';

export default function ServiceAreasStrip() {
  return (
    <section className="py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Primary Service Hubs &amp; Outstation Depots</h3>
                <p className="text-xs text-gray-500 font-medium">Quick 15-minute doorstep dispatch across these major hubs</p>
              </div>
            </div>

            <Link
              to="/tour-packages"
              className="inline-flex items-center text-sm font-bold text-amber-700 hover:text-amber-800 group"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Hub Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 py-6">
            {SERVICE_HUBS.map((city) => (
              <div
                key={city}
                className="flex items-center space-x-2 bg-slate-50 hover:bg-amber-50/70 border border-slate-200/60 hover:border-amber-300 px-3.5 py-2.5 rounded-2xl transition-all group"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-gray-800">{city}</span>
              </div>
            ))}
          </div>

          {/* One-Way Drop Alert Banner */}
          <div className="bg-gradient-to-r from-[#0d1424] via-[#161f36] to-[#0a0e1a] border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start sm:items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>Special One-Way Dropping Service Available!</span>
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">Save 40%</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Heading to Hyderabad, Tirupati, Vizag, or Chennai? Pay only one-way trip charges with zero return toll or empty miles.
                </div>
              </div>
            </div>

            <Link
              to="/tariff"
              className="shrink-0 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md hover:shadow-lg text-center"
            >
              Check One-Way Tariff
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
