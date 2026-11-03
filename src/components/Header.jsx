import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';

export default function Header({ onOpenBookingModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fleet & Cars', href: '/fleet' },
    { name: 'Tour Packages', href: '/tour-packages' },
    { name: 'Hourly Rentals', href: '/hourly-rentals' },
    { name: 'Airport Cabs', href: '/airport-cabs' },
    { name: 'Reviews', href: '/why-us' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  // Header background logic: transparent over dark hero on Home, or white on scroll / inner pages
  const isTransparent = isHomePage && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-black/35 backdrop-blur-md py-3.5 border-b border-white/10' 
          : 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Brand Logo with Official SV Crest */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 shadow-md group-hover:scale-105 transition-all flex-shrink-0">
            <img 
              src="/assets/images/sv-logo.jpg" 
              alt="Sri Venkateswara Car Travels" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className={`text-base sm:text-lg font-black tracking-tight leading-none ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
              SRI VENKATESWARA
            </div>
            <div className={`text-[9.5px] font-bold tracking-widest uppercase mt-0.5 ${isTransparent ? 'text-amber-400' : 'text-amber-600'}`}>
              Car Travels &amp; Cabs
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              const isDropdownActive = ['/services', '/airport-cabs', '/outstation-cabs', '/hourly-rentals'].includes(location.pathname);
              return (
                <div 
                  key={link.name} 
                  className="relative group/drop"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <NavLink
                    to={link.href}
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold transition-all whitespace-nowrap ${
                      isDropdownActive
                        ? isTransparent
                          ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                          : 'bg-[#FEF3C7] text-[#92400E] font-bold shadow-xs'
                        : isTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-hover/drop:rotate-180" />
                  </NavLink>

                  {/* Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-amber-50/70 transition-colors group/sub"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover/sub:text-amber-700 transition-colors">
                            {sub.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {sub.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) => `px-2.5 xl:px-3 py-1.5 rounded-full text-[12.5px] xl:text-[13.5px] font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? isTransparent
                      ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                      : 'bg-[#FEF3C7] text-[#92400E] font-bold shadow-xs'
                    : isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop CTAs matching screenshot */}
        <div className="hidden md:flex items-center space-x-2.5">
          <a 
            href={`tel:${CONTACT_INFO.primaryPhoneRaw}`} 
            className={`flex items-center px-4 py-2 rounded-full border transition-all text-xs font-bold whitespace-nowrap ${
              isTransparent
                ? 'border-white/30 text-white hover:bg-white/15'
                : 'border-slate-200 text-slate-800 hover:border-amber-500 hover:text-amber-700 bg-white shadow-2xs'
            }`}
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            <span>Call Us</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBookingModal()}
            className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg shadow-emerald-600/20 hover:scale-105 text-xs font-bold whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          type="button"
          className="lg:hidden p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className={isTransparent ? 'text-white w-7 h-7' : 'text-gray-900 w-7 h-7'} />
          ) : (
            <Menu className={isTransparent ? 'text-white w-7 h-7' : 'text-gray-900 w-7 h-7'} />
          )}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl py-5 border-t border-gray-100 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5 px-5">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) => `py-2.5 px-4 rounded-xl font-semibold text-base transition-colors ${
                  isActive ? 'bg-amber-50 text-amber-800 font-bold border-l-4 border-amber-500' : 'text-gray-800 hover:text-amber-700 hover:bg-amber-50/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a 
                href={`tel:${CONTACT_INFO.primaryPhoneRaw}`} 
                className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 py-3 px-4 rounded-xl font-bold text-sm shadow-md"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call: {CONTACT_INFO.primaryPhone}
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Book Cab Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
