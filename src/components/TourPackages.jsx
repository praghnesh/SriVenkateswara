import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Navigation, ArrowRight } from 'lucide-react';
import { FEATURED_ROUTES, MINI_ROUTES } from '../data/travelData';

export default function TourPackages({ onOpenBookingModal }) {
  const navigate = useNavigate();

  const tirupatiRoute = FEATURED_ROUTES.find((r) => r.id === 'tirupati') || FEATURED_ROUTES[0];
  const hyderabadRoute = FEATURED_ROUTES.find((r) => r.id === 'hyderabad');
  const vizagRoute = FEATURED_ROUTES.find((r) => r.id === 'vizag');
  const srisailamRoute = MINI_ROUTES.find((r) => r.id === 'srisailam');
  const vijayawadaRoute = MINI_ROUTES.find((r) => r.id === 'vijayawada');
  const bengaluruRoute = MINI_ROUTES.find((r) => r.id === 'bengaluru-chennai');

  // Single button redirect handler (User requested: "ikkada kuda antey ra - book now okatey pettu nokkitey redirect avvali")
  const handleBookNowRedirect = (tourId) => {
    navigate('/tour-packages', { 
      state: { selectedTour: tourId } 
    });
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50" id="routes">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
            <span>Pilgrimage &amp; Outstation Trips</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Popular Tour Packages from Guntur &amp; Vijayawada
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm">
            Hand-curated travel itineraries with experienced ghat-road chauffeurs, timely pickups, and guaranteed peaceful family journeys.
          </p>
        </div>

        {/* ========================================================================
             TRUE BENTO GRID (One Big, Small ones, both on Mobile & Desktop)
             ======================================================================== */}
        <div className="space-y-3 sm:space-y-4">
          
          {/* Top Section: Tirupati (Big) + Hyderabad & Vizag (2-Col on mobile, stacked on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            
            {/* 1. Large Featured Card: Tirupati (Peddadhi) */}
            {tirupatiRoute && (
              <div 
                onClick={() => handleBookNowRedirect('tirupati')}
                className="lg:col-span-7 group relative rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] flex flex-col justify-end p-5 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <img
                  src={tirupatiRoute.image}
                  alt={tirupatiRoute.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>

                <div className="relative z-10 space-y-2.5 sm:space-y-3.5 text-white">
                  <span className="inline-block bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 py-1 rounded-full shadow-md">
                    {tirupatiRoute.badge}
                  </span>

                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                    {tirupatiRoute.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-gray-200">
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      <span>{tirupatiRoute.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      <span>Round Trip &amp; 2-Day Standby</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Sedan Package from</div>
                      <div className="text-xl sm:text-3xl font-black text-amber-400">{tirupatiRoute.farePrice}</div>
                    </div>

                    {/* Single "Book Now" Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNowRedirect('tirupati');
                      }}
                      className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 active:scale-95 text-slate-950 font-black px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl inline-flex items-center justify-center transition-all shadow-xl shadow-amber-500/30 text-xs sm:text-sm cursor-pointer whitespace-nowrap shrink-0 border border-amber-300/60"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 shrink-0 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2 & 3: Hyderabad & Vizag (2-column on mobile, stacked 2-row on desktop) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              
              {/* Hyderabad */}
              {hyderabadRoute && (
                <div 
                  onClick={() => handleBookNowRedirect('hyderabad')}
                  className="group relative rounded-3xl overflow-hidden min-h-[190px] sm:min-h-[215px] flex flex-col justify-end p-3.5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  <img
                    src={hyderabadRoute.image}
                    alt={hyderabadRoute.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  <div className="relative z-10 space-y-1.5 text-white">
                    <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[9px] sm:text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {hyderabadRoute.badge}
                    </span>

                    <h3 className="text-xs sm:text-xl font-black text-white leading-tight line-clamp-1">
                      {hyderabadRoute.title}
                    </h3>

                    <div className="flex items-center text-[9.5px] sm:text-xs text-gray-300">
                      <Clock className="w-3 h-3 mr-1 text-amber-400 shrink-0" />
                      <span className="truncate">{hyderabadRoute.duration}</span>
                    </div>

                    <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-1">
                      <div className="shrink-0">
                        <span className="text-xs sm:text-base font-black text-amber-400">{hyderabadRoute.farePrice}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNowRedirect('hyderabad');
                        }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[10.5px] sm:text-xs inline-flex items-center justify-center transition-all cursor-pointer shadow-md whitespace-nowrap shrink-0 border border-amber-300/40"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3 h-3 ml-1 shrink-0 text-slate-950" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Visakhapatnam */}
              {vizagRoute && (
                <div 
                  onClick={() => handleBookNowRedirect('visakhapatnam')}
                  className="group relative rounded-3xl overflow-hidden min-h-[190px] sm:min-h-[215px] flex flex-col justify-end p-3.5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  <img
                    src={vizagRoute.image}
                    alt={vizagRoute.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  <div className="relative z-10 space-y-1.5 text-white">
                    <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[9px] sm:text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {vizagRoute.badge}
                    </span>

                    <h3 className="text-xs sm:text-xl font-black text-white leading-tight line-clamp-1">
                      {vizagRoute.title}
                    </h3>

                    <div className="flex items-center text-[9.5px] sm:text-xs text-gray-300">
                      <Clock className="w-3 h-3 mr-1 text-amber-400 shrink-0" />
                      <span className="truncate">{vizagRoute.duration}</span>
                    </div>

                    <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-1">
                      <div className="shrink-0">
                        <span className="text-xs sm:text-base font-black text-amber-400">{vizagRoute.farePrice}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNowRedirect('visakhapatnam');
                        }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[10.5px] sm:text-xs inline-flex items-center justify-center transition-all cursor-pointer shadow-md whitespace-nowrap shrink-0 border border-amber-300/40"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3 h-3 ml-1 shrink-0 text-slate-950" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Bottom Section: Srisailam + Vijayawada (2-Col on mobile) + Bengaluru/Chennai (Full on mobile, 3-col on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Srisailam */}
            {srisailamRoute && (
              <div 
                onClick={() => handleBookNowRedirect('srisailam')}
                className="group relative rounded-3xl overflow-hidden min-h-[190px] sm:min-h-[220px] flex flex-col justify-end p-3 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <img
                  src={srisailamRoute.image}
                  alt={srisailamRoute.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="relative z-10 space-y-1 text-white">
                  <span className="inline-block bg-white/95 text-amber-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-md border border-amber-300/60">
                    {srisailamRoute.tag}
                  </span>

                  <h4 className="text-xs sm:text-base font-black text-white leading-tight line-clamp-1">
                    {srisailamRoute.title}
                  </h4>

                  <div className="text-[9px] sm:text-[11px] text-gray-300 truncate">
                    Via Nallamala Forest &amp; Ghats
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-sm font-black text-amber-300 shrink-0">{srisailamRoute.priceVal}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNowRedirect('srisailam');
                      }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[10.5px] sm:text-xs inline-flex items-center justify-center transition-all cursor-pointer shadow-md whitespace-nowrap shrink-0 border border-amber-300/40"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3 ml-1 shrink-0 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Vijayawada */}
            {vijayawadaRoute && (
              <div 
                onClick={() => handleBookNowRedirect('vijayawada-kanakadurgamma')}
                className="group relative rounded-3xl overflow-hidden min-h-[190px] sm:min-h-[220px] flex flex-col justify-end p-3 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <img
                  src={vijayawadaRoute.image}
                  alt={vijayawadaRoute.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="relative z-10 space-y-1 text-white">
                  <span className="inline-block bg-white/95 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-md">
                    {vijayawadaRoute.tag}
                  </span>

                  <h4 className="text-xs sm:text-base font-black text-white leading-tight line-clamp-1">
                    {vijayawadaRoute.title}
                  </h4>

                  <div className="text-[9px] sm:text-[11px] text-gray-300 truncate">
                    VGA Airport &amp; Kanaka Durga
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-sm font-black text-amber-300 shrink-0">{vijayawadaRoute.priceVal}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNowRedirect('vijayawada-kanakadurgamma');
                      }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[10.5px] sm:text-xs inline-flex items-center justify-center transition-all cursor-pointer shadow-md whitespace-nowrap shrink-0 border border-amber-300/40"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3 ml-1 shrink-0 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bengaluru & Chennai */}
            {bengaluruRoute && (
              <div 
                onClick={() => handleBookNowRedirect('bengaluru-chennai')}
                className="col-span-2 md:col-span-1 group relative rounded-3xl overflow-hidden min-h-[160px] sm:min-h-[220px] flex flex-col justify-end p-3.5 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <img
                  src={bengaluruRoute.image}
                  alt={bengaluruRoute.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="relative z-10 space-y-1 text-white">
                  <span className="inline-block bg-white/95 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-md">
                    {bengaluruRoute.tag}
                  </span>

                  <h4 className="text-xs sm:text-base font-black text-white leading-tight line-clamp-1">
                    {bengaluruRoute.title}
                  </h4>

                  <div className="text-[9px] sm:text-[11px] text-gray-300 truncate">
                    NH 16 &amp; NH 44 Doorstep Interstate Drop
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-sm font-black text-amber-300 shrink-0">{bengaluruRoute.priceVal}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNowRedirect('bengaluru-chennai');
                      }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-3 sm:px-4 py-1.5 rounded-xl text-[10.5px] sm:text-xs inline-flex items-center justify-center transition-all cursor-pointer shadow-md whitespace-nowrap shrink-0 border border-amber-300/40"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3 ml-1 shrink-0 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}