import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function FloatingActions() {
  return (
    <aside aria-label="Quick contact shortcuts" className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-auto">
      
      {/* Phone Call Button */}
      <a
        href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
        className="group relative w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-500/40 hover:scale-110 transition-all duration-300"
        aria-label="Call Sri Venkateswara Car Travels Helpline"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Call: {CONTACT_INFO.primaryPhone}
        </span>
      </a>

      {/* WhatsApp Button */}
      <button
        type="button"
        onClick={() => openWhatsApp('Hello Sri Venkateswara Car Travels, I would like to book a cab.')}
        className="group relative w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp with Sri Venkateswara Car Travels"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Instant WhatsApp Booking
        </span>
      </button>

    </aside>
  );
}
