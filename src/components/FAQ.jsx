import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/travelData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 mr-2" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Clear, transparent answers to everything you need to know before booking your ride.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl transition-all duration-200 border ${isOpen
                  ? 'border-amber-500 shadow-md ring-1 ring-amber-500/20'
                  : 'border-gray-200/80 hover:border-gray-300 shadow-xs'
                  } overflow-hidden`}
              >
                <button
                  type="button"
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-amber-600 transition-colors cursor-pointer"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rotate-180' : 'bg-gray-100 text-gray-500'
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

      </div>
    </section>
  );
}
