import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  Users, 
  Wind, 
  Briefcase, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Plane,
  Navigation,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { sendVehicleBooking, openWhatsApp } from '../utils/whatsapp';
import VehiclePricingModal from '../components/VehiclePricingModal';
import SearchableLocationSelect from '../components/SearchableLocationSelect';
import RouteMapVisualizer from '../components/RouteMapVisualizer';

const FLEET_DESTINATIONS = [
  { name: 'Hyderabad', distance: 280, label: 'Hyderabad (~280 Kms)', state: 'Telangana', tag: 'Top Route' },
  { name: 'Tirupati', distance: 380, label: 'Tirupati / Tirumala (~380 Kms)', state: 'Andhra Pradesh', tag: 'Pilgrimage' },
  { name: 'Visakhapatnam (Vizag)', distance: 370, label: 'Visakhapatnam / Vizag (~370 Kms)', state: 'Andhra Pradesh', tag: 'Coastal' },
  { name: 'Srisailam', distance: 220, label: 'Srisailam Temple (~220 Kms)', state: 'Andhra Pradesh', tag: 'Pilgrimage' },
  { name: 'Chennai', distance: 390, label: 'Chennai (~390 Kms)', state: 'Tamil Nadu', tag: 'Metro' },
  { name: 'Bengaluru (Bangalore)', distance: 580, label: 'Bengaluru (~580 Kms)', state: 'Karnataka', tag: 'Tech Hub' },
  { name: 'Rajahmundry', distance: 210, label: 'Rajahmundry (~210 Kms)', state: 'Andhra Pradesh', tag: 'Godavari' },
  { name: 'Vijayawada', distance: 35, label: 'Vijayawada (~35 Kms)', state: 'Andhra Pradesh', tag: 'Nearby' },
  { name: 'Gannavaram Airport (VGA)', distance: 55, label: 'Gannavaram Airport (VGA) (~55 Kms)', state: 'Vijayawada', tag: 'Airport' },
  { name: 'RGIA Hyderabad Airport (HYD)', distance: 290, label: 'RGIA Hyderabad Airport (~290 Kms)', state: 'Hyderabad', tag: 'Airport' },
  { name: 'Kakinada', distance: 270, label: 'Kakinada Port (~270 Kms)', state: 'Andhra Pradesh', tag: 'Coastal' },
  { name: 'Kurnool', distance: 260, label: 'Kurnool (~260 Kms)', state: 'Andhra Pradesh', tag: 'Rayalaseema' },
  { name: 'Nellore', distance: 240, label: 'Nellore (~240 Kms)', state: 'Andhra Pradesh', tag: 'City' },
  { name: 'Ongole', distance: 110, label: 'Ongole (~110 Kms)', state: 'Andhra Pradesh', tag: 'Nearby' },
  { name: 'Warangal', distance: 260, label: 'Warangal (~260 Kms)', state: 'Telangana', tag: 'Heritage' },
  { name: 'Khammam', distance: 130, label: 'Khammam (~130 Kms)', state: 'Telangana', tag: 'City' },
  { name: 'Bhadrachalam', distance: 230, label: 'Bhadrachalam Temple (~230 Kms)', state: 'Telangana', tag: 'Pilgrimage' },
  { name: 'Shirdi', distance: 820, label: 'Shirdi Sai Baba Temple (~820 Kms)', state: 'Maharashtra', tag: 'Pilgrimage' },
  { name: 'Goa', distance: 780, label: 'Goa Holiday (~780 Kms)', state: 'Goa', tag: 'Holiday' },
  { name: 'Suryalanka Beach (Bapatla)', distance: 75, label: 'Suryalanka Beach / Bapatla (~75 Kms)', state: 'Andhra Pradesh', tag: 'Beach' },
  { name: 'Chirala', distance: 70, label: 'Chirala Handlooms (~70 Kms)', state: 'Andhra Pradesh', tag: 'Nearby' },
  { name: 'Kotappakonda', distance: 45, label: 'Kotappakonda Temple (~45 Kms)', state: 'Andhra Pradesh', tag: 'Pilgrimage' },
  { name: 'Pedakakani Temple', distance: 10, label: 'Pedakakani Temple (~10 Kms)', state: 'Guntur', tag: 'Local Temple' }
];

const FLEET_PICKUPS = [
  { name: 'Guntur', label: 'Guntur (Town / Station / Arundelpet / Brodipet)', area: 'Head Office & Citywide', tag: 'Primary Hub' },
  { name: 'Vijayawada', label: 'Vijayawada (City / Railway Station / Benz Circle)', area: 'Benz Circle / Station', tag: 'Primary Hub' },
  { name: 'Mangalagiri', label: 'Mangalagiri / AIIMS Hospital', area: 'AIIMS & Temple Town', tag: 'Hub' },
  { name: 'Amaravati', label: 'Amaravati Capital / Secretariat / High Court', area: 'Velagapudi Secretariat', tag: 'Capital' },
  { name: 'Tenali', label: 'Tenali Junction / Morrispet', area: 'Tenali Town', tag: 'Hub' },
  { name: 'Gannavaram', label: 'Gannavaram Airport (VGA)', area: 'Airport Pickup Point', tag: 'Airport' },
  { name: 'Chilakaluripet', label: 'Chilakaluripet NH-16', area: 'Highway Junction', tag: 'Town' },
  { name: 'Narasaraopet', label: 'Narasaraopet Clock Tower', area: 'Palnadu Hub', tag: 'Town' },
  { name: 'Hyderabad', label: 'Hyderabad (Hitec City / Airport / Secunderabad)', area: 'Telangana Hub', tag: 'Metro' }
];

function estimateDistance(destinationName) {
  if (!destinationName) return 250;
  const lower = destinationName.toLowerCase();
  
  // Direct match in destinations list
  const match = FLEET_DESTINATIONS.find(d => 
    d.name.toLowerCase() === lower || 
    (d.label && d.label.toLowerCase() === lower)
  );
  if (match) return match.distance;

  // Fuzzy keyword matching
  if (lower.includes('hyderabad') || lower.includes('secunderabad') || lower.includes('shamshabad') || lower.includes('rgia')) return 280;
  if (lower.includes('tirupati') || lower.includes('tirumala') || lower.includes('alipiri') || lower.includes('renigunta') || lower.includes('srikalahasti')) return 380;
  if (lower.includes('visakhapatnam') || lower.includes('vizag') || lower.includes('araku') || lower.includes('anakapalle') || lower.includes('bheemili')) return 370;
  if (lower.includes('srisailam') || lower.includes('sunnipenta')) return 220;
  if (lower.includes('chennai') || lower.includes('madras')) return 390;
  if (lower.includes('bengaluru') || lower.includes('bangalore') || lower.includes('whitefield') || lower.includes('electronic city')) return 580;
  if (lower.includes('rajahmundry') || lower.includes('godavari')) return 210;
  if (lower.includes('kakinada')) return 270;
  if (lower.includes('vijayawada') || lower.includes('benz circle') || lower.includes('kanaka durga') || lower.includes('gollapudi')) return 35;
  if (lower.includes('gannavaram')) return 55;
  if (lower.includes('kurnool')) return 260;
  if (lower.includes('nellore')) return 240;
  if (lower.includes('ongole')) return 110;
  if (lower.includes('warangal') || lower.includes('hanamkonda')) return 260;
  if (lower.includes('khammam')) return 130;
  if (lower.includes('shirdi')) return 820;
  if (lower.includes('goa')) return 780;
  if (lower.includes('bhadrachalam')) return 230;
  if (lower.includes('suryalanka') || lower.includes('bapatla')) return 75;
  if (lower.includes('chirala')) return 70;
  if (lower.includes('kotappakonda')) return 45;
  if (lower.includes('pedakakani')) return 10;
  if (lower.includes('mangalagiri') || lower.includes('aiims')) return 20;
  if (lower.includes('amaravati') || lower.includes('velagapudi')) return 35;
  if (lower.includes('tenali')) return 30;
  if (lower.includes('eluru')) return 95;
  if (lower.includes('bhimavaram')) return 135;
  if (lower.includes('mumbai') || lower.includes('pune')) return 920;
  
  return 250;
}

export default function FleetPage({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state || {};
  const today = new Date().toISOString().split('T')[0];

  const initialTripType = navState.tripType === 'One Way' ? 'One Way' : (typeof window !== 'undefined' ? sessionStorage.getItem('sv_tripType') || 'Round Trip' : 'Round Trip');
  const initialPickup = navState.pickup || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_pickup') || 'Guntur' : 'Guntur');
  const initialDrop = navState.destination || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_drop') || 'Hyderabad' : 'Hyderabad');
  const initialDate = navState.date || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_date') || today : today);
  const initialTime = navState.time || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_time') || '06:00' : '06:00');

  const [filter, setFilter] = useState('all');
  const [tripType, setTripType] = useState(initialTripType);
  const [modalVehicleId, setModalVehicleId] = useState(null);

  const [pickupCity, setPickupCity] = useState(initialPickup);
  const [dropCity, setDropCity] = useState(initialDrop);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  // Live GPS Route tracking states
  const [routeDistance, setRouteDistance] = useState(280);
  const [routeDuration, setRouteDuration] = useState('~4.5 Hrs');

  // Sync state if navigation with state occurs (e.g. from Home Hero Form)
  useEffect(() => {
    if (location.state) {
      if (location.state.pickup) {
        setPickupCity(location.state.pickup);
        try { sessionStorage.setItem('sv_pickup', location.state.pickup); } catch (_) {}
      }
      if (location.state.destination) {
        setDropCity(location.state.destination);
        try { sessionStorage.setItem('sv_drop', location.state.destination); } catch (_) {}
      }
      if (location.state.tripType) {
        setTripType(location.state.tripType);
        try { sessionStorage.setItem('sv_tripType', location.state.tripType); } catch (_) {}
      }
      if (location.state.date) {
        setDate(location.state.date);
        try { sessionStorage.setItem('sv_date', location.state.date); } catch (_) {}
      }
      if (location.state.time) {
        setTime(location.state.time);
        try { sessionStorage.setItem('sv_time', location.state.time); } catch (_) {}
      }
    }
  }, [location.state]);

  const handlePickupChange = (val) => {
    setPickupCity(val);
    try { sessionStorage.setItem('sv_pickup', val); } catch (_) {}
  };

  const handleDropChange = (val) => {
    setDropCity(val);
    try { sessionStorage.setItem('sv_drop', val); } catch (_) {}
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    try { sessionStorage.setItem('sv_tripType', type); } catch (_) {}
  };

  const quickDestinations = [
    'Hyderabad',
    'Tirupati',
    'Visakhapatnam (Vizag)',
    'Srisailam',
    'Chennai',
    'Bengaluru (Bangalore)'
  ];

  // Dynamic distance powered by RouteMapVisualizer GPS with fallback to estimateDistance
  const effectiveDistance = routeDistance > 0 ? routeDistance : estimateDistance(dropCity);
  const distance = effectiveDistance;
  const tripDays = 1;

  const filteredVehicles = FLEET_VEHICLES.filter((vehicle) => {
    if (filter === 'all') return true;
    return vehicle.category === filter;
  });

  const filterButtons = [
    { id: 'all', label: `All Fleet (${FLEET_VEHICLES.length})` },
    { id: 'sedan', label: 'Compact Sedans' },
    { id: 'mpv', label: 'Family MPVs' },
    { id: 'luxury', label: 'Premium Luxury' },
    { id: 'group', label: 'Tempo Travellers' }
  ];

  const handleBookCar = (car, carTotalFare, carKm, carTotalMinKm, actualKm, carTotalBatta) => {
    const isRound = tripType === 'Round Trip';
    const carMinKm = car.minKm || (car.category === 'sedan' ? 350 : 400);

    const msg = `*FLEET CAB RESERVATION* 🚗
*Sri Venkateswara Car Travels*

• *Vehicle:* ${car.name} (${car.seats})
• *Trip Type:* ${tripType}
• *From:* ${pickupCity}
• *To Destination:* ${dropCity}
• *Estimated Distance:* ~${carKm} Kms ${carTotalMinKm > actualKm ? `(Min ${carMinKm} Kms/day applied)` : ''}
• *Departure Date & Time:* ${date} at ${time}
• *Running Rate:* ${car.rateText}
• *Driver Bata:* ₹${carTotalBatta} (Included)
${tripType === 'One Way' ? '• *One Way Extra:* +₹2,000 (Included)\n' : ''}• *Estimated Total Fare:* ₹${carTotalFare.toLocaleString('en-IN')}

Hello, please check vehicle availability and confirm this cab booking.`;

    openWhatsApp(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL VERIFIED FLEET SHOWROOM</span>
            </div>

            {/* Quick Redirect Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/outstation-cabs')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Outstation Cabs</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/hourly-rentals')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Hourly Rentals</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Our Luxury <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">Vehicle Fleet</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Explore our sanitized, commercial tourist permit vehicles ranging from executive sedans to luxury 17-seater Tempo Travellers.
          </p>

        </div>
      </section>

      {/* Fleet Grid Section */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* 2-Column Responsive Section: Trip Configurator on left + Route Map Visualizer on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10">
            
            {/* Left 7 Columns: Trip Configurator Box */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-500/30 shadow-xl space-y-5">
              
              {/* Header row: Title & Trip Type Toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider block">
                    Interactive Route &amp; Fare Selector
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Select Destination &amp; Travel Dates
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pick your destination below to instantly see live estimated fares across our entire fleet.
                  </p>
                </div>

                {/* One Way vs Round Trip Toggle */}
                <div className="bg-slate-900 p-1.5 rounded-2xl border border-amber-500/30 shadow-md inline-flex items-center gap-1.5 shrink-0 self-stretch sm:self-auto justify-center">
                  <button
                    type="button"
                    onClick={() => handleTripTypeChange('Round Trip')}
                    className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      tripType === 'Round Trip'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🔄 Round Trip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTripTypeChange('One Way')}
                    className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      tripType === 'One Way'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>➡️ One Way Drop</span>
                  </button>
                </div>
              </div>

              {/* Inputs Grid: Pickup, Drop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Pickup City (Searchable Autocomplete Input) */}
                <SearchableLocationSelect
                  label="From (Pickup)"
                  icon={MapPin}
                  value={pickupCity}
                  onChange={handlePickupChange}
                  placeholder="Type pickup city or area..."
                  options={FLEET_PICKUPS}
                  isDestination={false}
                />

                {/* Destination / Drop City (Searchable Autocomplete Input) */}
                <SearchableLocationSelect
                  label="To (Destination)"
                  icon={Navigation}
                  value={dropCity}
                  onChange={handleDropChange}
                  placeholder="Type destination (e.g. Hyderabad, Tirupati...)"
                  options={FLEET_DESTINATIONS}
                  isDestination={true}
                />
              </div>

              {/* Dates & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Departure Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Departure Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => {
                      setDate(e.target.value);
                      try { sessionStorage.setItem('sv_date', e.target.value); } catch (_) {}
                    }}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Pickup Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pickup Time</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      try { sessionStorage.setItem('sv_time', e.target.value); } catch (_) {}
                    }}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Quick Destination Chips */}
              <div className="flex items-center flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 mr-1">Popular:</span>
                {quickDestinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => handleDropChange(dest)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      dropCity === dest
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>

              {/* Route Summary Banner */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-black text-slate-900">
                    {pickupCity} → {dropCity} (~{effectiveDistance} Kms {tripType === 'Round Trip' ? `One Way • ${effectiveDistance * 2} Kms Round` : 'Single Journey Drop'})
                  </span>
                </div>
                <span className="font-bold text-amber-900 bg-white/90 px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                  {tripType === 'Round Trip' ? 'Round Trip Journey (Driver Bata Included)' : 'One Way Drop (Single Journey)'}
                </span>
              </div>

            </div>

            {/* Right 5 Columns: Interactive Route & Distance Map Visualizer */}
            <div className="lg:col-span-5 sticky top-24">
              <RouteMapVisualizer
                pickup={pickupCity}
                destination={dropCity}
                tripType={tripType}
                onDistanceChange={(distKm, durStr) => {
                  setRouteDistance(distKm);
                  setRouteDuration(durStr);
                }}
              />
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {filterButtons.map((btn) => {
              const isActive = filter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setFilter(btn.id)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Vehicles 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {filteredVehicles.map((car) => {
              const carMinKm = car.minKm || (car.category === 'sedan' ? 350 : 400);
              const carTotalMinKm = tripType === 'Round Trip' ? tripDays * carMinKm : 0;
              const actualKm = tripType === 'Round Trip' ? distance * 2 : distance;
              const carKm = tripType === 'One Way' ? Math.max(20, actualKm) : Math.max(actualKm, carTotalMinKm);
              const carRunningFare = carKm * car.ratePerKm;
              const carDailyBatta = car.driverBatta || (car.category === 'sedan' ? 300 : 400);
              const carTotalBatta = tripDays * carDailyBatta;
              const carNightHaltRate = car.nightHalt || (car.category === 'sedan' ? 500 : 1000);
              const carTotalNight = tripDays > 1 ? (tripDays - 1) * carNightHaltRate : 0;
              const oneWayExtra = tripType === 'One Way' ? 2000 : 0;
              const carTotalFare = carRunningFare + carTotalBatta + carTotalNight + oneWayExtra;

              return (
                <div 
                  key={car.id} 
                  className="group bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Vehicle Image Frame */}
                    <div className="relative h-44 sm:h-56 bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-slate-100">
                      <img
                        src={car.image}
                        alt={`${car.name} Cab Rental`}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/80 text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-full absolute top-2.5 sm:top-3 left-2.5 sm:left-3 shadow-xs">
                        {car.categoryLabel}
                      </span>
                      
                      {/* Live Calculated Fare Badge on Image */}
                      <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-amber-200/80 text-right">
                        <span className="text-[9px] font-black uppercase block leading-none opacity-80">Est. Total Fare</span>
                        <span className="text-xs sm:text-sm font-black leading-tight">
                          ₹{carTotalFare.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Bottom rate overlay */}
                      <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-amber-300 text-[10.5px] font-bold px-2 py-0.5 rounded-md">
                        {car.rateText} • Min {carMinKm} Km/Day
                      </span>
                    </div>

                    {/* Car Details */}
                    <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-0.5 sm:mb-1 group-hover:text-amber-600 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-semibold mb-3 sm:mb-4 truncate">
                      {car.submodels}
                    </p>

                    {/* Specs Badges Row */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2.5 sm:py-3 border-y border-gray-100 mb-3.5 text-[11px] sm:text-xs font-bold text-gray-700">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 bg-gray-50 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{car.seats}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 bg-gray-50 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                        <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{car.acType}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 bg-gray-50 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                        <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{car.luggage === 'Rooftop Carrier' ? 'Roof Carrier' : car.luggage}</span>
                      </div>
                    </div>

                    {/* Live Trip Fare Breakdown Pill inside each card */}
                    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 mb-4 space-y-2">
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-200/60">
                        <span className="text-[11px] font-black uppercase text-amber-800">
                          {tripType === 'Round Trip' ? '🔄 Round Trip Outstation' : '➡️ One Way Drop'}
                        </span>
                        <span className="font-bold text-slate-700 text-[11px]">
                          ~{carKm} Kms ({car.rateText})
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Running KM Fare:</span>
                          <strong className="text-slate-900 font-bold">₹{carRunningFare.toLocaleString('en-IN')}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Driver Bata:</span>
                          <strong className="text-slate-900 font-bold">₹{carTotalBatta}</strong>
                        </div>
                        {tripType === 'One Way' && (
                          <div className="flex justify-between text-amber-800">
                            <span>One Way Extra:</span>
                            <strong className="text-amber-900 font-bold">+₹2,000</strong>
                          </div>
                        )}
                        <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-200/60">
                          <span className="font-black text-slate-900 text-xs">Total Estimate:</span>
                          <span className="font-black text-amber-700 text-base">
                            ₹{carTotalFare.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                      {car.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-[11px] sm:text-xs font-medium text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mr-1.5 sm:mr-2 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 sm:pt-4 border-t border-gray-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModalVehicleId(car.id)}
                      className="py-2.5 sm:py-3 px-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap text-center"
                    >
                      Pricing Card
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookCar(car, carTotalFare, carKm, carTotalMinKm, actualKm, carTotalBatta)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Book ₹{carTotalFare.toLocaleString('en-IN')}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3-Tab Vehicle Pricing Modal matching screenshots */}
      <VehiclePricingModal
        isOpen={Boolean(modalVehicleId)}
        vehicleId={modalVehicleId}
        initialTab="local"
        onClose={() => setModalVehicleId(null)}
      />

    </div>
  );
}
