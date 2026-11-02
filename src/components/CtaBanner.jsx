import React from 'react';
import { Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function CtaBanner({ onOpenBookingModal }) {
  return (
    <section className="py-16 lg:py-24 bg-white" id="cta-banner">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-[#070b14] via-[#0f172a] to-[#1a2336] border-2 border-amber-500/40 rounded-[2.5rem] p-10 lg:p-16 text-white overflow-hidden shadow-2xl shadow-amber-500/10">
          
          {/* Background Decorative Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-md border border-amber-400/30 px-4 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 mr-2 text-amber-400" />
              Instant Confirmation • 24/7 Dispatch
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Book Your Next Ride?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Get instant cab confirmation on WhatsApp or phone. No app download needed, no surge pricing, and 100% verified cars &amp; courteous chauffeurs.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openWhatsApp('Hello Sri Venkateswara Car Travels, I want to reserve a cab now.')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-emerald-600/30 hover:scale-105 text-base cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Book on WhatsApp</span>
              </button>

              <a
                href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black px-8 py-4 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-amber-500/20 hover:scale-105 text-base border border-amber-300/60"
              >
                <Phone className="w-5 h-5 mr-2 text-slate-950" />
                <span>Call {CONTACT_INFO.primaryPhone}</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-amber-300/80 font-medium">
              <span>✓ Doorstep Pickup</span>
              <span>✓ Clean AC Cars</span>
              <span>✓ Experienced Drivers</span>
              <span>✓ Pay After Ride</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
