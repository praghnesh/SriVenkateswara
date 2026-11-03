import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Heart, MessageSquare } from 'lucide-react';
import { CONTACT_INFO, ALL_REGIONS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info & Social Media */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                <img 
                  src="/assets/images/sv-logo.jpg" 
                  alt="Sri Venkateswara Car Travels" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white leading-none">
                  SRI VENKATESWARA
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase mt-0.5 text-amber-400">
                  Car Travels &amp; Cabs
                </div>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your most trusted taxi &amp; car rental service in Guntur, Vijayawada, and Amaravati since 2012. Providing sanitized AC cars, courteous drivers, and 100% transparent rates.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Follow Us:</span>
              <div className="flex items-center space-x-2.5">
                {/* Instagram */}
                <a 
                  href={CONTACT_INFO.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Follow Sri Venkateswara Car Travels on Instagram (@svctravelsguntur)"
                  title="Follow @svctravelsguntur on Instagram"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-600 hover:to-fuchsia-600 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-10 h-10 bg-slate-900 border border-amber-500/30 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 text-amber-400 hover:text-slate-950 rounded-full flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => openWhatsApp('Hello Sri Venkateswara Car Travels, I am contacting you from your website footer.')}
                  aria-label="WhatsApp"
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                {/* Twitter / X */}
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X (Twitter)"
                  className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black text-gray-400 rounded-full flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Service Hubs:</span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_REGIONS.map((city) => (
                  <span 
                    key={city} 
                    className="bg-gray-800 text-gray-300 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Services & Tour Modules (Exact user request) */}
          <div>
            <h4 className="text-base font-bold text-white mb-6 uppercase tracking-wider">Cab Services &amp; Modules</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/airport-cabs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">✈</span>
                  <span>Airport Transfer &amp; Drop</span>
                </Link>
              </li>
              <li>
                <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">🚗</span>
                  <span>One-Way &amp; Round Trip Cabs</span>
                </Link>
              </li>
              <li>
                <Link to="/hourly-rentals" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">⏱</span>
                  <span>Local Hourly Rentals (4h/8h/12h)</span>
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">🧳</span>
                  <span>Holiday &amp; Pilgrimage Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">🚘</span>
                  <span>Car Booking Fleet &amp; Models</span>
                </Link>
              </li>
              <li>
                <Link to="/tariff" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">₹</span>
                  <span>Tariff &amp; Per-Km Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">★</span>
                  <span>About Us &amp; 12+ Years Story</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">📍</span>
                  <span>Contact Page &amp; Office Hubs</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">?</span>
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Fleet Vehicles */}
          <div>
            <h4 className="text-base font-bold text-white mb-6 uppercase tracking-wider">Fleet Vehicles</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">Maruti Swift Dzire (Sedan)</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">Maruti Ertiga (6+1 Seater)</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">Toyota Innova Crysta (Luxury)</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">Kia Carens (Premium MPV)</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">Tempo Traveller (12/17 Seater)</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-400 transition-colors">Force Urbania &amp; Buses</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-base font-bold text-white mb-6 uppercase tracking-wider">Contact &amp; Office</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-snug">{CONTACT_INFO.address}</span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <a href={`tel:${CONTACT_INFO.primaryPhoneRaw}`} className="text-white font-bold hover:text-amber-400 block">
                    {CONTACT_INFO.primaryPhone}
                  </a>
                  <a href={`tel:${CONTACT_INFO.altPhoneRaw}`} className="text-gray-400 text-xs hover:text-amber-400">
                    {CONTACT_INFO.altPhone}
                  </a>
                </div>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-amber-400 truncate text-xs">
                  {CONTACT_INFO.email}
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-gray-400 text-xs">{CONTACT_INFO.operatingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* On-Page SEO Directory / Keyword Cloud for Search Engine Indexing */}
        <div className="pt-8 pb-4 border-t border-gray-800/80 my-8 space-y-6">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-3">
              Popular Outstation Cab Routes:
            </h5>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-400">
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Guntur to Hyderabad Car Travels</Link>
              <span className="text-gray-600">•</span>
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Guntur to Vijayawada Cab</Link>
              <span className="text-gray-600">•</span>
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Vijayawada to Guntur Taxi</Link>
              <span className="text-gray-600">•</span>
              <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">Guntur to Tirupati Car Rental</Link>
              <span className="text-gray-600">•</span>
              <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">Vijayawada to Tirupati Cab</Link>
              <span className="text-gray-600">•</span>
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Guntur to Vizag Cab</Link>
              <span className="text-gray-600">•</span>
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Vijayawada to Hyderabad Cabs</Link>
              <span className="text-gray-600">•</span>
              <Link to="/airport-cabs" className="hover:text-amber-400 transition-colors">Guntur to Gannavaram Airport Cab</Link>
              <span className="text-gray-600">•</span>
              <Link to="/airport-cabs" className="hover:text-amber-400 transition-colors">Gannavaram Airport Taxi Service</Link>
              <span className="text-gray-600">•</span>
              <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">Guntur to Srisailam Taxi</Link>
              <span className="text-gray-600">•</span>
              <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">Guntur to Bhadrachalam Car Travels</Link>
              <span className="text-gray-600">•</span>
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Guntur to Bangalore Outstation Taxi</Link>
              <span className="text-gray-600">•</span>
              <Link to="/outstation-cabs" className="hover:text-amber-400 transition-colors">Guntur to Chennai Car Hire</Link>
              <span className="text-gray-600">•</span>
              <Link to="/tour-packages" className="hover:text-amber-400 transition-colors">Tirupati Tour Package from Guntur &amp; Vijayawada</Link>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-3">
              Popular Searches &amp; Cab Services Near Me:
            </h5>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-400">
              <span className="hover:text-amber-400 transition-colors">Car Travels Near Me</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Car Rental Near Me</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Cab Services Near Me</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Taxi Services Near Me</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Best Car Travels in Guntur</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Car Travels in Vijayawada</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">24/7 Cab Service Guntur</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Outstation Cabs in Guntur</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Airport Cabs Vijayawada</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Car with Driver Near Me</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Budget Car Rental Guntur</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Luxury Innova Crysta Hire</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Tempo Traveller 12-26 Seater</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">One Way Drop Cabs</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Round Trip Car Rental</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Local Sightseeing Car Rental</span>
              <span className="text-gray-600">•</span>
              <span className="hover:text-amber-400 transition-colors">Andhra Pradesh Taxi Services</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-3">
              Brand Names &amp; Synonyms:
            </h5>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-500">
              <span className="hover:text-gray-300 transition-colors">Sri Venkateswara Car Travels</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sri Venkateswara Travels Guntur</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sri Venkateswara Cabs Vijayawada</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sri Venkateswara Taxi</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Srivenkat Travels</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Srivenkat Car Travels</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Srivenkat Cabs</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">SV Travels Guntur</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">SV Cabs Vijayawada</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">SV Car Rentals</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sriven Travels</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sriven Cabs</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sri Venkateshwara Travels</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Sri Venkateswar Travels</span>
              <span className="text-gray-700">•</span>
              <span className="hover:text-gray-300 transition-colors">Srivenkateswara Online Booking</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Sri Venkateswara Car Travels. All rights reserved. Andhra Pradesh.</p>
          <p className="flex items-center">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 mx-1 fill-current" />
            <span>for seamless journeys across AP &amp; Telangana</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
