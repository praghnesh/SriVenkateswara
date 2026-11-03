import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Clock, Award, Car, MapPin, Navigation, Calendar, User, Phone, CheckCircle2, ArrowRight, Plane, ArrowLeftRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/travelData';
import LocationInput from './LocationInput';

export default function Hero({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const nextDay = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const [tripType, setTripType] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('sv_tripType') || 'One Way' : 'One Way'));
  const [localHours, setLocalHours] = useState('8 Hrs / 100 Km');
  const [airportTransferType, setAirportTransferType] = useState('drop'); // 'drop' = To Airport, 'pickup' = From Airport
  const [selectedAirport, setSelectedAirport] = useState('Vijayawada Airport (VGA)');
  const [returnDate, setReturnDate] = useState(() => (typeof window !== 'undefined' ? sessionStorage.getItem('sv_returnDate') || nextDay() : nextDay()));
  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    pickup: typeof window !== 'undefined' ? sessionStorage.getItem('sv_pickup') || 'Guntur' : 'Guntur',
    drop: typeof window !== 'undefined' ? sessionStorage.getItem('sv_drop') || '' : '',
    date: typeof window !== 'undefined' ? sessionStorage.getItem('sv_date') || today : today,
    time: typeof window !== 'undefined' ? sessionStorage.getItem('sv_time') || '08:00 AM' : '08:00 AM'
  }));

  const quickCities = ['Hyderabad', 'Tirupati', 'Vijayawada (VGA) Airport', 'Vizag', 'Srisailam'];

  // Hourly duration packages (4 hrs to 12 hrs) without prices
  const hourlyPackages = [
    { id: '4h', label: '4 Hrs / 40 Km' },
    { id: '6h', label: '6 Hrs / 60 Km' },
    { id: '8h', label: '8 Hrs / 100 Km' },
    { id: '10h', label: '10 Hrs / 120 Km' },
    { id: '12h', label: '12 Hrs / 140 Km' }
  ];

  // Route mapping for each trip type module
  const tripTypeRoutes = {
    'One Way': '/outstation-cabs',
    'Round Trip': '/outstation-cabs',
    'Local Rental': '/hourly-rentals',
    'Airport Transfer': '/airport-cabs',
    'Tour Package': '/tour-packages'
  };

  const handleTabClick = (tabId) => {
    setTripType(tabId);
    if (tabId === 'Local Rental') {
      setFormData((prev) => ({
        ...prev,
        drop: `Local Package (${localHours})`
      }));
    } else if (tabId === 'Airport Transfer') {
      if (airportTransferType === 'drop') {
        setFormData((prev) => ({
          ...prev,
          pickup: prev.pickup.includes('Airport') ? 'Guntur' : prev.pickup,
          drop: selectedAirport
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          pickup: selectedAirport,
          drop: prev.drop.includes('Airport') ? 'Guntur' : prev.drop || 'Guntur'
        }));
      }
    }
  };

  const handleAirportTransferToggle = (type) => {
    setAirportTransferType(type);
    if (type === 'drop') {
      // To Airport (Drop): User city -> Airport
      setFormData((prev) => ({
        ...prev,
        pickup: prev.pickup.includes('Airport') ? 'Guntur' : prev.pickup,
        drop: selectedAirport
      }));
    } else {
      // From Airport (Pickup): Airport -> User city
      setFormData((prev) => ({
        ...prev,
        pickup: selectedAirport,
        drop: prev.drop.includes('Airport') ? 'Guntur' : prev.drop || 'Guntur'
      }));
    }
  };

  const handleAirportSelect = (airportName) => {
    setSelectedAirport(airportName);
    if (airportTransferType === 'drop') {
      setFormData((prev) => ({ ...prev, drop: airportName }));
    } else {
      setFormData((prev) => ({ ...prev, pickup: airportName }));
    }
  };

  const handleSwapLocations = () => {
    if (tripType === 'Airport Transfer') {
      const nextType = airportTransferType === 'drop' ? 'pickup' : 'drop';
      handleAirportTransferToggle(nextType);
    } else {
      setFormData((prev) => ({
        ...prev,
        pickup: prev.drop,
        drop: prev.pickup
      }));
    }
  };

  const handleSelectHourlyPackage = (pkg) => {
    setLocalHours(pkg.label);
    setFormData((prev) => ({
      ...prev,
      drop: `Local Package (${pkg.label})`
    }));
  };

  const handlePickupChange = (val) => {
    setFormData((prev) => ({ ...prev, pickup: val }));
    try { sessionStorage.setItem('sv_pickup', val); } catch (_) {}
  };

  const handleDropChange = (val) => {
    setFormData((prev) => ({ ...prev, drop: val }));
    try { sessionStorage.setItem('sv_drop', val); } catch (_) {}
  };

  const handleExploreModule = () => {
    try {
      sessionStorage.setItem('sv_pickup', formData.pickup);
      sessionStorage.setItem('sv_drop', formData.drop);
      sessionStorage.setItem('sv_tripType', tripType);
      sessionStorage.setItem('sv_date', formData.date);
      sessionStorage.setItem('sv_time', formData.time);
      if (tripType === 'Round Trip' && returnDate) {
        sessionStorage.setItem('sv_returnDate', returnDate);
      }
    } catch (_) {}

    const targetRoute = tripTypeRoutes[tripType] || '/outstation-cabs';
    navigate(targetRoute, { 
      state: { 
        tripType, 
        transferType: airportTransferType,
        selectedAirport,
        pickup: formData.pickup, 
        destination: formData.drop,
        date: formData.date,
        returnDate: tripType === 'Round Trip' ? returnDate : null,
        localHours,
        name: formData.name,
        phone: formData.phone
      } 
    });
  };

  const getDropPlaceholder = () => {
    if (tripType === 'Local Rental') {
      return `e.g. Local City Sightseeing (${localHours})`;
    }
    if (tripType === 'Airport Transfer') {
      return airportTransferType === 'drop' ? 'Vijayawada Airport (VGA - Gannavaram)' : 'e.g. Guntur, Vijayawada, Amaravati';
    }
    return 'Destination City / Place...';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectQuickCity = (city) => {
    setFormData((prev) => ({
      ...prev,
      drop: city
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // User requested: "ikkada book now okatey pettu nokkitey redirect avvali"
    handleExploreModule();
  };

  return (
    <section className="relative min-h-[86vh] flex items-center pt-24 pb-8 lg:pb-12 overflow-hidden">
      
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero-bg.jpg"
          alt="Sri Venkateswara Car Travels"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50"></div>
      </div>

      <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Headlines & Trust Signals (Hidden on mobile as user requested: "mobile screen lo first form ravali ela mobile lo tesey ra") */}
        <div className="hidden lg:block text-white space-y-6">
          <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-md border border-amber-400/40 px-4 py-2 rounded-full text-amber-300 font-semibold text-sm">
            <Star className="w-4 h-4 mr-2 fill-current text-amber-400" />
            Best Car Travels in Guntur • Cheapest &amp; Affordable Car Prices
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Reliable Rides for <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">Every Journey.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed">
            Rated the best car travels in Guntur with the most affordable car prices, transparent per-km billing, and sanitized cars with courteous verified chauffeurs.
          </p>

          {/* 4-Box Trust Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2 max-w-lg">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm text-amber-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">Safe Travels</div>
                <div className="text-xs text-gray-400">Verified Chauffeurs</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">24/7 Helpline</div>
                <div className="text-xs text-gray-400">Doorstep Pickup</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">Fair Pricing</div>
                <div className="text-xs text-gray-400">Zero Empty Burden</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm text-amber-400 shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm sm:text-base">Clean AC Fleet</div>
                <div className="text-xs text-gray-400">100% Sanitized</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form (Appears FIRST on mobile) */}
        <div className="relative w-full max-w-xl mx-auto lg:ml-auto">
          <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full"></div>

          <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-7 rounded-3xl shadow-2xl border border-amber-500/20 relative z-10 text-gray-900">
            <div className="mb-4">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">Book Your Ride</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Direct module booking &amp; driver dispatch</p>
            </div>

            {/* Trip Type Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 rounded-xl mb-3">
              {[
                { id: 'One Way', label: 'One Way' },
                { id: 'Round Trip', label: 'Round Trip' },
                { id: 'Local Rental', label: 'Hourly (4h-12h)' },
                { id: 'Airport Transfer', label: 'Airport' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                    tripType === tab.id
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 4 Hrs to 12 Hrs Duration Picker (Shown when Local Rental is selected) - No prices */}
            {tripType === 'Local Rental' && (
              <div className="mb-3.5 p-3 bg-amber-50/80 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Choose Rental Duration (4 to 12 Hours):</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                    {localHours}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {hourlyPackages.map((pkg) => {
                    const isSelected = localHours === pkg.label;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => handleSelectHourlyPackage(pkg)}
                        className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-500 shadow-sm font-black'
                            : 'bg-white text-gray-700 hover:bg-amber-100/70 border-gray-200 font-bold'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-black">{pkg.id.toUpperCase()}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Airport Transfer Direction Toggle (User requested: "ikkada from air port to air port pettu ok na") */}
            {tripType === 'Airport Transfer' && (
              <div className="mb-3.5 p-3 bg-amber-50/90 rounded-2xl border border-amber-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-amber-600" />
                    <span>Select Airport Trip Type:</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                    {airportTransferType === 'drop' ? 'Going to Airport' : 'Leaving Airport'}
                  </span>
                </div>

                {/* Direction Toggle Pills */}
                <div className="grid grid-cols-2 gap-2 bg-white/90 p-1 rounded-xl border border-amber-100 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleAirportTransferToggle('drop')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      airportTransferType === 'drop'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm font-black'
                        : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/50'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 rotate-45" />
                    <span>To Airport (Drop)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAirportTransferToggle('pickup')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      airportTransferType === 'pickup'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm font-black'
                        : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/50'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5 -rotate-45" />
                    <span>From Airport (Pickup)</span>
                  </button>
                </div>

                {/* Quick Airport Badge - Focused on Vijayawada / Gannavaram */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Airport:</span>
                  <div className="text-[10.5px] px-2.5 py-1 rounded-lg font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs border border-amber-400/50 flex items-center gap-1">
                    <Plane className="w-3 h-3 text-slate-950" />
                    <span>Vijayawada Airport (Gannavaram - VGA)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-amber-600" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs sm:text-sm font-medium"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-amber-600" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 63094xxxxx"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Pickup Location */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      {tripType === 'Airport Transfer' && airportTransferType === 'pickup'
                        ? 'Pickup Airport'
                        : 'Pickup Point (Enter Pincode/Area)'}
                    </label>
                    <button
                      type="button"
                      onClick={handleSwapLocations}
                      title="Swap Pickup & Drop"
                      className="text-[10px] text-amber-700 hover:text-amber-800 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>Swap</span>
                    </button>
                  </div>
                  <LocationInput
                    value={formData.pickup}
                    onChange={handlePickupChange}
                    placeholder="e.g. 522002, Arundelpet Guntur, Vijayawada"
                    icon={MapPin}
                    required
                  />
                </div>

                {/* Drop Location */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 flex items-center">
                    <Navigation className="w-3.5 h-3.5 mr-1 text-amber-600" /> 
                    {tripType === 'Local Rental'
                      ? 'Local Package / Sightseeing'
                      : tripType === 'Airport Transfer' && airportTransferType === 'drop'
                      ? 'Destination Airport'
                      : 'Drop Location (Enter Pincode/Area)'}
                  </label>
                  <LocationInput
                    value={formData.drop}
                    onChange={handleDropChange}
                    placeholder={getDropPlaceholder()}
                    icon={Navigation}
                    required
                  />
                </div>
              </div>

              {/* Date & Time: When Round Trip, shows Departure Date + Return Date */}
              {tripType === 'Round Trip' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Departure Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" /> Travel Date
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs font-medium"
                    />
                  </div>

                  {/* Return Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" /> Return Date
                    </label>
                    <input
                      required
                      type="date"
                      name="returnDate"
                      min={formData.date || today}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-2.5 py-2 bg-gray-50 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs font-medium"
                    />
                  </div>

                  {/* Pickup Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> Pickup Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs font-medium"
                    >
                      <option value="05:00 AM">05:00 AM</option>
                      <option value="06:30 AM">06:30 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Single Travel Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" /> Travel Date
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs sm:text-sm font-medium"
                    />
                  </div>

                  {/* Pickup Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> Pickup Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-xs sm:text-sm font-medium"
                    >
                      <option value="05:00 AM">05:00 AM (Early)</option>
                      <option value="06:30 AM">06:30 AM</option>
                      <option value="08:00 AM">08:00 AM (Standard)</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="01:00 PM">01:00 PM (Afternoon)</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="07:00 PM">07:00 PM (Evening)</option>
                      <option value="10:00 PM">10:00 PM (Night)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Single "Book Now" Button (User requested: "ikkada book now okatey pettu nokkitey redirect avvali") */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 text-sm sm:text-base group cursor-pointer border border-amber-300/60"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform text-slate-950" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-500 pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant route quotes &amp; verified driver dispatch</span>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}