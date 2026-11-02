import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function FloatingActions() {
  return (
    <aside aria-label="Quick contact shortcuts" className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col space-y-2.5 sm:space-y-3 pointer-events-auto">
      
      {/* Phone Call Button - Royal Gold Theme matching Official Crest */}
      <a
        href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 text-slate-950 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-amber-200/80"
        aria-label="Call Sri Venkateswara Car Travels Helpline"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 fill-current animate-pulse" />
        <span className="absolute right-14 sm:right-16 bg-slate-950 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
          Call: {CONTACT_INFO.primaryPhone}
        </span>
      </a>

      {/* WhatsApp Button */}
      <button
        type="button"
        onClick={() => openWhatsApp('Hello Sri Venkateswara Car Travels, I would like to book a cab.')}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp with Sri Venkateswara Car Travels"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-14 sm:right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Instant WhatsApp Booking
        </span>
      </button>

    </aside>
  );
}
