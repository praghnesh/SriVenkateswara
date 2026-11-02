import React from 'react';
import { Share2, ArrowUpRight, MessageSquare, Play, Users, ThumbsUp } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { CONTACT_INFO } from '../data/travelData';

export default function SocialMediaSection() {
  return (
    <section className="py-8 sm:py-12 bg-white" id="social-media">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Unified Bento Box Container (User requested: "ooka box ah box lo grid - chinnadhi peddadhi") */}
        <div className="bg-gradient-to-br from-[#070b14] via-[#0d1222] to-[#070b14] rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Box Header */}
          <div className="text-center mb-6 sm:mb-8 relative z-10 max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center bg-slate-900 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              <span>Connect With Our Community</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Follow Sri Venkateswara Travels
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Stay connected across your favorite social networks for live darshan schedules, ghat road conditions, customer reels, and exclusive route discounts.
            </p>
          </div>

          {/* ========================================================================
               BENTO GRID INSIDE THE BOX (Peddadhi & Chinnadhi)
               ======================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 relative z-10">
            
            {/* 1. Large Spotlight Card: Instagram (Peddadhi - md:col-span-7) */}
            <div className="md:col-span-7 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-slate-700/80 hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg min-w-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-pink-400 transition-colors truncate">Instagram</h3>
                      <div className="text-[11px] sm:text-xs text-pink-400 font-bold truncate">{CONTACT_INFO.instagramHandle}</div>
                    </div>
                  </div>
                  <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded-full shrink-0">
                    Photos &amp; Reels
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-medium">
                  Watch daily pilgrimage darshan updates, sacred ghat-road videos to Tirumala &amp; Srisailam, fleet walkthroughs, and genuine customer travel stories.
                </p>

                {/* Mini Visual Preview Grid */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="h-16 sm:h-20 rounded-xl overflow-hidden relative">
                    <img src="/assets/images/tirupati.jpg" alt="Tirupati" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 left-1 text-[8px] bg-black/70 px-1 py-0.5 rounded font-black text-amber-300">Tirumala</span>
                  </div>
                  <div className="h-16 sm:h-20 rounded-xl overflow-hidden relative">
                    <img src="/assets/images/srisailam.jpg" alt="Srisailam" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 left-1 text-[8px] bg-black/70 px-1 py-0.5 rounded font-black text-amber-300">Srisailam</span>
                  </div>
                  <div className="h-16 sm:h-20 rounded-xl overflow-hidden relative">
                    <img src="/assets/images/vizag.jpg" alt="Vizag" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 left-1 text-[8px] bg-black/70 px-1 py-0.5 rounded font-black text-amber-300">Vizag</span>
                  </div>
                </div>
              </div>

              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 hover:opacity-95 text-white py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center transition-all shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                <span>Follow on Instagram ({CONTACT_INFO.instagramHandle})</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </a>
            </div>

            {/* 2. WhatsApp VIP Channel (Medium - md:col-span-5) */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 border border-slate-700/80 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg min-w-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 min-w-0">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-400 transition-colors truncate">WhatsApp Channel</h3>
                      <div className="text-[11px] sm:text-xs text-emerald-400 font-bold truncate">VIP Travel Alerts</div>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded-full shrink-0">
                    Live Deals
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-medium">
                  Receive instant empty-leg drops (up to 40% off), Vijayawada airport ride notifications, and priority bookings with zero advance deposit.
                </p>

                <div className="p-2.5 sm:p-3 bg-emerald-950/40 rounded-xl sm:rounded-2xl border border-emerald-500/20 space-y-1 mb-4 sm:mb-5 text-xs text-emerald-300 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Daily One-Way empty leg route deals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Direct chat with 24/7 dispatcher</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openWhatsApp('Hello Sri Venkateswara Travels, please add me to your WhatsApp travel and empty-leg deals channel.')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Join WhatsApp Channel</span>
              </button>
            </div>

            {/* 3. Facebook Customer Community (Chinnadhi - md:col-span-6) */}
            <div className="md:col-span-6 bg-slate-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-slate-700/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-sm min-w-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-sm shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-black text-white group-hover:text-amber-300 transition-colors truncate">Facebook Community</h4>
                      <div className="text-[10px] sm:text-[11px] text-amber-400 font-semibold truncate">Sri Venkateswara Car Travels</div>
                    </div>
                  </div>
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[8.5px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0">
                    Reviews
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                  Join our customer community for travel tips, seasonal temple holiday packages, customer photo reviews, and route recommendations across South India.
                </p>
              </div>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 text-slate-200 hover:text-slate-950 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer"
              >
                <span>Visit Facebook Page</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* 4. YouTube Guides & Helpline (Chinnadhi - md:col-span-6) */}
            <div className="md:col-span-6 bg-slate-900/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-slate-700/80 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group shadow-sm min-w-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm shrink-0">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-black text-white group-hover:text-red-400 transition-colors truncate">YouTube Video Guides</h4>
                      <div className="text-[10px] sm:text-[11px] text-red-400 font-semibold truncate">@SriVenkateswaraTravels</div>
                    </div>
                  </div>
                  <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[8.5px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0">
                    Video Guides
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                  Watch certified driver route previews, Srisailam &amp; Tirumala ghat hairpin curves, and fleet inspections before reserving your family vehicle.
                </p>
              </div>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer"
              >
                <span>Watch on YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}