import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Phone, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Plane,
  Car
} from 'lucide-react';
import { CONTACT_INFO, FAQS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function FaqPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'fares', label: 'Tariffs & Tolls' },
    { id: 'booking', label: 'Booking & Cancellation' },
    { id: 'safety', label: 'Safety & Drivers' }
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden text-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>24/7 KNOWLEDGE BASE &amp; CUSTOMER SUPPORT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Find instant answers about outstation fares, driver bhatta, airport pickup delays, toll gate billing, and our zero-advance booking policy.
          </p>

          {/* Quick Redirect Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/outstation-cabs')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Outstation Cabs →</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/airport-cabs')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plane className="w-3.5 h-3.5 text-blue-400" />
              <span>Airport Cabs →</span>
            </button>
          </div>

        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Search Input Box */}
          <div className="relative mb-8">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. tolls, driver bhatta, tirupati, cancellation)..."
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 mb-14">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white rounded-2xl transition-all duration-200 border ${
                    isOpen 
                      ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                      : 'border-gray-200/80 hover:border-gray-300 shadow-xs'
                  } overflow-hidden`}
                >
                  <button
                    type="button"
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Box */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 sm:p-12 text-center shadow-sm">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-7 h-7" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Our 24/7 travel desk is available right now to assist you with customized routes, vehicle availability, and instant quotes.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                type="button"
                onClick={() => openWhatsApp('Hello Sri Venkateswara Travels, I have a query about cab booking.')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center transition-all shadow-md shadow-emerald-600/20 text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Chat on WhatsApp</span>
              </button>

              <a 
                href={`tel:${CONTACT_INFO.primaryPhoneRaw}`} 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center transition-all shadow-md shadow-blue-600/20 text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Call {CONTACT_INFO.primaryPhone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

