import React, { useState } from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import ServiceAreasStrip from '../components/ServiceAreasStrip';
import { CONTACT_INFO, ALL_REGIONS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tripType: 'Outstation Trip',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*NEW CONTACT MESSAGE* 📩
*Sri Venkateswara Car Travels*

• *Name:* ${formData.name || 'Valued Guest'}
• *Phone:* ${formData.phone || 'Not Provided'}
• *Trip Interest:* ${formData.tripType}
• *Requirements:* ${formData.message || 'Need cab availability and quote.'}

Please get in touch with me as soon as possible.`;

    openWhatsApp(msg);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeaderBanner
        badge="24/7 Helpline & Dispatch"
        title="Contact &"
        highlightText="Location"
        subtitle="We operate 24 hours a day, 7 days a week. Connect with our dispatch office or chat directly with our travel manager on WhatsApp."
      />

      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider mb-4">
                  Head Office &amp; Booking Hub
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                  We Are Here to Assist Your Journey 24/7
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Whether you need an immediate cab within 15 minutes in Guntur/Vijayawada or want to schedule a multi-day family pilgrimage to Tirupati, our team is always ready.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                
                {/* Office Location */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 border border-amber-200/60">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      Main Dispatch Office
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                {/* 24/7 Phone */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      24/7 Direct Helplines
                    </h3>
                    <div className="space-y-1">
                      <a href={`tel:${CONTACT_INFO.primaryPhoneRaw}`} className="text-amber-800 font-bold text-base hover:underline block">
                        {CONTACT_INFO.primaryPhone} (Primary Dispatch)
                      </a>
                      <a href={`tel:${CONTACT_INFO.altPhoneRaw}`} className="text-gray-600 font-semibold text-sm hover:underline block">
                        {CONTACT_INFO.altPhone} (Supervisor Backup)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email & Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 border border-amber-200/60">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5">Email Bookings</h3>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-xs text-amber-800 hover:underline break-all">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5">Working Hours</h3>
                      <p className="text-xs text-gray-600">24 Hours / 7 Days a Week</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Service Regions Covered */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">
                  Service Depot Coverage:
                </span>
                <div className="flex flex-wrap gap-2">
                  {ALL_REGIONS.map((city) => (
                    <span key={city} className="flex items-center text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Message Form Card */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="mb-6">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  Send Instant Enquiry
                </span>
                <h3 className="text-2xl font-black text-gray-900">
                  Custom Route &amp; Tariff Request
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your travel details and connect immediately with our booking team on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block" htmlFor="cName">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="cName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Satyanarayana Murthy"
                    required
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block" htmlFor="cPhone">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="cPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 63094 26620"
                    required
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block" htmlFor="cTripType">
                    Journey Type
                  </label>
                  <select
                    id="cTripType"
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Outstation Round Trip">Outstation Round Trip (Tirupati, Srisailam, etc.)</option>
                    <option value="One-Way Drop">One-Way Drop (Hyderabad / Vizag / Chennai)</option>
                    <option value="Airport Pickup / Drop">Airport Pickup / Drop (VGA / HYD)</option>
                    <option value="Local Hourly Rental">Local Hourly Rental (City Use / Wedding)</option>
                    <option value="Corporate / Event Fleet">Corporate or Event Fleet Booking</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block" htmlFor="cMessage">
                    Pickup Location, Destination &amp; Dates
                  </label>
                  <textarea
                    id="cMessage"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Need 7-seater Innova Crysta for 4 adults from Guntur to Tirupati on 15th Nov, 3 days package."
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-emerald-600/30 hover:scale-[1.02] text-sm"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  <span>Send Request to WhatsApp</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center font-medium">
                  We reply within 5 minutes on WhatsApp with all-inclusive car rates.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      <ServiceAreasStrip />
    </div>
  );
}
