import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Navigation,
  MapPin,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Plane,
  Car,
  ShieldCheck
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';
import LocationInput from '../components/LocationInput';
import VehiclePricingModal from '../components/VehiclePricingModal';
import RouteMapVisualizer from '../components/RouteMapVisualizer';

export default function OutstationCabsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state || {};
  const today = new Date().toISOString().split('T')[0];

  const initialTripType = navState.tripType === 'Round Trip' ? 'Round Trip' : (typeof window !== 'undefined' ? sessionStorage.getItem('sv_tripType') || 'One Way' : 'One Way');
  const initialPickup = navState.pickup || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_pickup') || 'Guntur' : 'Guntur');
  const initialDrop = navState.destination || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_drop') || 'Hyderabad' : 'Hyderabad');
  const initialDate = navState.date || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_date') || today : today);
  const initialReturnDate = navState.returnDate || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_returnDate') || today : today);
  const initialTime = navState.time || (typeof window !== 'undefined' ? sessionStorage.getItem('sv_time') || '06:00' : '06:00');

  const [tripType, setTripType] = useState(initialTripType);
  const [pickupCity, setPickupCity] = useState(initialPickup);
  const [dropCity, setDropCity] = useState(initialDrop);
  const [date, setDate] = useState(initialDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [time, setTime] = useState(initialTime);
  const [selectedVehicleId, setSelectedVehicleId] = useState('swift-dzire');
  const [pricingModalCarId, setPricingModalCarId] = useState(null);

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
      if (location.state.returnDate) {
        setReturnDate(location.state.returnDate);
        try { sessionStorage.setItem('sv_returnDate', location.state.returnDate); } catch (_) {}
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

  const destinationDistances = {
    'Hyderabad': 280,
    'Tirupati': 380,
    'Visakhapatnam (Vizag)': 370,
    'Srisailam': 220,
    'Chennai': 390,
    'Bengaluru (Bangalore)': 580,
    'Rajahmundry': 210,
    'Vijayawada': 35
  };

  const quickDestinations = [
    'Hyderabad',
    'Tirupati',
    'Visakhapatnam (Vizag)',
    'Srisailam',
    'Chennai',
    'Bengaluru (Bangalore)'
  ];

  const selectedVehicle = FLEET_VEHICLES.find((v) => v.id === selectedVehicleId) || FLEET_VEHICLES[0];
  
  // Real distance computed from Live Route Map Visualizer
  const effectiveDistance = routeDistance > 0 ? routeDistance : (destinationDistances[dropCity] || 250);

  // Fare Calculation based on exact real KM distance
  const tripDays = tripType === 'Round Trip' && returnDate && date
    ? Math.max(1, Math.round((new Date(returnDate).getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)) + 1)
    : 1;

  const minKmPerDay = selectedVehicle.minKm || (selectedVehicle.category === 'sedan' ? 300 : 350);
  const totalMinKm = tripType === 'Round Trip' ? tripDays * minKmPerDay : 0;
  const actualKm = tripType === 'Round Trip' ? effectiveDistance * 2 : effectiveDistance;
  
  // For One-Way: calculate based on REAL road distance (with small 20km base for local drops)
  const totalKm = tripType === 'One Way' ? Math.max(20, actualKm) : Math.max(actualKm, totalMinKm);
  const runningFare = totalKm * selectedVehicle.ratePerKm;

  const dailyBatta = selectedVehicle.driverBatta || (selectedVehicle.category === 'sedan' ? 300 : 400);
  const totalDriverBatta = tripDays * dailyBatta;
  const nightHaltRate = selectedVehicle.nightHalt || (selectedVehicle.category === 'sedan' ? 500 : 1000);
  const totalNightHalt = tripDays > 1 ? (tripDays - 1) * nightHaltRate : 0;
  const oneWayExtra = tripType === 'One Way' ? 2000 : 0;

  const totalFare = runningFare + totalDriverBatta + totalNightHalt + oneWayExtra;

  const handleBooking = () => {
    const msg = `*OUTSTATION CAB RESERVATION* 🚗
*Sri Venkateswara Car Travels*

• *Trip Type:* ${tripType} (${tripDays} Day${tripDays > 1 ? 's' : ''} Trip)
• *From:* ${pickupCity}
• *To Destination:* ${dropCity}
• *Estimated Distance:* ~${totalKm} Kms ${totalMinKm > actualKm ? `(Min ${minKmPerDay} Kms/day applied for ${tripDays} days)` : ''}
• *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.categoryLabel})
• *Departure Date & Time:* ${date} at ${time}
${tripType === 'Round Trip' ? `• *Return Date:* ${returnDate}` : ''}
• *Running KM Rate:* ₹${selectedVehicle.ratePerKm}/km (₹${runningFare.toLocaleString('en-IN')})
• *Driver Bata:* ${tripDays} Day(s) × ₹${dailyBatta} = ₹${totalDriverBatta}
${tripType === 'One Way' ? '• *One Way Extra:* +₹2,000 (Included)\n' : ''}${totalNightHalt > 0 ? `• *Night Halt:* ${tripDays - 1} Night(s) × ₹${nightHaltRate} = ₹${totalNightHalt}\n` : ''}• *Estimated Total Fare:* ₹${totalFare.toLocaleString('en-IN')}

Hello, please check vehicle availability and confirm this outstation cab booking.`;

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
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL OUTSTATION &amp; ONE-WAY DROPPING DESK</span>
            </div>

            {/* Quick Redirect Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/airport-cabs')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Airport Cabs</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/tour-packages')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Tour Packages</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Outstation Cabs &amp; <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">One-Way Drops</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Reliable highway travel to Hyderabad, Tirupati, Vizag, Srisailam, Bangalore &amp; Chennai with police-verified drivers and zero hidden return fuel charges.
          </p>

        </div>
      </section>

      {/* Main Interactive Booking Section */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Outstation Booking Calculator */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">

              {/* Trip Type Toggle */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
                  Select Trip Mode
                </label>
                <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => handleTripTypeChange('One Way')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${tripType === 'One Way'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                        : 'text-gray-700 hover:text-gray-900'
                      }`}
                  >
                    <span>One-Way Drop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTripTypeChange('Round Trip')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${tripType === 'Round Trip'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                        : 'text-gray-700 hover:text-gray-900'
                      }`}
                  >
                    <span>Round Trip Journey</span>
                  </button>
                </div>
              </div>

              {/* Pickup & Destination with Area & Pincode Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Pickup City / Town / Area (Enter Pincode)
                  </label>
                  <LocationInput
                    value={pickupCity}
                    onChange={handlePickupChange}
                    placeholder="e.g. 522002, Arundelpet Guntur, Benz Circle"
                    icon={MapPin}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Destination City / Area (Enter Pincode)
                  </label>
                  <LocationInput
                    value={dropCity}
                    onChange={handleDropChange}
                    placeholder="e.g. 500081, Hitec City, Tirupati"
                    icon={Navigation}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => {
                      setDate(e.target.value);
                      try { sessionStorage.setItem('sv_date', e.target.value); } catch (_) {}
                    }}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {tripType === 'Round Trip' ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      min={date}
                      onChange={(e) => {
                        setReturnDate(e.target.value);
                        try { sessionStorage.setItem('sv_returnDate', e.target.value); } catch (_) {}
                      }}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                ) : null}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      try { sessionStorage.setItem('sv_time', e.target.value); } catch (_) {}
                    }}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Vehicle Selection: ONE Unified Box Container ("Oka box laga") */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10.5px] font-black uppercase text-amber-600 tracking-wider block">
                      Available Commercial AC Fleet
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      Select Vehicle for Outstation Ride
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
                      {tripDays > 1 ? `${tripDays} Days Trip` : '1 Day'} • Driver Bata: ₹{dailyBatta}/day • Min {minKmPerDay} Km/Day
                    </span>
                  </div>
                </div>

                {/* Grid of Cars inside the box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                  {FLEET_VEHICLES.map((v) => {
                    const isSelected = selectedVehicleId === v.id;
                    const carMinKm = v.minKm || (v.category === 'sedan' ? 300 : 350);
                    const carTotalMinKm = tripType === 'Round Trip' ? tripDays * carMinKm : 0;
                    const carKm = tripType === 'One Way' ? Math.max(20, actualKm) : Math.max(actualKm, carTotalMinKm);
                    const carRunningFare = carKm * v.ratePerKm;
                    const carDailyBatta = v.driverBatta || (v.category === 'sedan' ? 300 : 400);
                    const carTotalBatta = tripDays * carDailyBatta;
                    const carNightHaltRate = v.nightHalt || (v.category === 'sedan' ? 500 : 1000);
                    const carTotalNight = tripDays > 1 ? (tripDays - 1) * carNightHaltRate : 0;
                    const carOneWayExtra = tripType === 'One Way' ? 2000 : 0;
                    const carTotal = carRunningFare + carTotalBatta + carTotalNight + carOneWayExtra;

                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`rounded-2xl border-2 p-3 sm:p-3.5 transition-all cursor-pointer flex flex-col justify-between ${isSelected
                            ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/25 shadow-lg scale-[1.01]'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                          }`}
                      >
                        {/* Top Info Row */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={v.image}
                              alt={v.name}
                              className="w-14 h-11 object-cover rounded-lg shrink-0 border border-slate-100"
                            />
                            <div className="truncate">
                              <div className="font-black text-xs sm:text-sm text-slate-900 truncate">{v.name}</div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                                <span>{v.rateText} • {v.seats}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPricingModalCarId(v.id);
                                  }}
                                  className="text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer text-[10.5px]"
                                >
                                  Pricing Card
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-sm font-black text-amber-700">₹{carTotal.toLocaleString('en-IN')}</div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black' : 'bg-slate-100 text-slate-600'
                              }`}>
                              {isSelected ? 'Selected ✓' : 'Select'}
                            </span>
                          </div>
                        </div>

                        {/* Direct In-Card Action Buttons on ALL Cards for uniform, clean grid alignment */}
                        <div className={`pt-2.5 mt-2.5 border-t grid grid-cols-2 gap-2 ${
                          isSelected ? 'border-amber-200/80' : 'border-slate-100'
                        }`}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVehicleId(v.id);
                              const msg = `*OUTSTATION CAB RESERVATION* 🚗\n*Sri Venkateswara Car Travels*\n\n• *Trip Type:* ${tripType} (${tripDays} Day${tripDays > 1 ? 's' : ''} Trip)\n• *From:* ${pickupCity}\n• *To Destination:* ${dropCity}\n• *Estimated Distance:* ~${carKm} Kms ${carTotalMinKm > actualKm ? `(Min ${carMinKm} Kms/day applied for ${tripDays} days)` : ''}\n• *Vehicle:* ${v.name} (${v.seats})\n• *Departure Date & Time:* ${date} at ${time}\n${tripType === 'Round Trip' ? `• *Return Date:* ${returnDate}\n` : ''}• *Running Rate:* ₹${v.ratePerKm}/km (₹${carRunningFare.toLocaleString('en-IN')})\n• *Driver Bata:* ${tripDays} Day(s) × ₹${carDailyBatta} = ₹${carTotalBatta}\n${carTotalNight > 0 ? `• *Night Halt:* ${tripDays - 1} Night(s) × ₹${carNightHaltRate} = ₹${carTotalNight}\n` : ''}• *Estimated Total Fare:* ₹${carTotal.toLocaleString('en-IN')}\n\nHello, please check vehicle availability and confirm this outstation cab booking.`;
                              openWhatsApp(msg);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 cursor-pointer transition-all"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Book Now</span>
                          </button>

                          <a
                            href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 border border-amber-300/40 cursor-pointer transition-all"
                          >
                            <Phone className="w-4 h-4 text-slate-950" />
                            <span>Call Driver</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Vehicle Action Strip inside the box */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-600 text-center sm:text-left">
                    Selected: <strong className="text-slate-900 font-black">{selectedVehicle.name}</strong> ({selectedVehicle.seats}, {selectedVehicle.acType})
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Book</span>
                    </button>
                    <a
                      href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 border border-amber-300/40"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-950" />
                      <span>Call Driver</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing Receipt & WhatsApp Booking */}
            <div className="lg:col-span-5 space-y-6">

              {/* Live Interactive Leaflet Route Map Visualizer (Real-time GPS Distance Tracking) */}
              <RouteMapVisualizer
                pickup={pickupCity}
                destination={dropCity}
                tripType={tripType}
                onDistanceChange={(distKm, durStr) => {
                  setRouteDistance(distKm);
                  setRouteDuration(durStr);
                }}
              />

              <div className="bg-gradient-to-br from-[#070b14] via-[#0f172a] to-[#1e293b] border border-amber-500/30 rounded-[2rem] p-7 text-white shadow-2xl shadow-amber-500/10 space-y-6">

                <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Outstation Fare Estimate</span>
                  <span className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
                    {tripType === 'One Way' ? 'One Way Drop' : 'Round Trip'}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-300 font-medium">Estimated Total Fare ({tripDays} Day{tripDays > 1 ? 's' : ''})</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent mt-1">
                    ₹{totalFare.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-amber-200/80 mt-1">
                    Based on ₹{selectedVehicle.ratePerKm}/km rate for ~{totalKm} Kms + Driver Bata
                  </div>
                </div>

                <div className="space-y-2 bg-black/15 backdrop-blur-xs rounded-xl p-4 text-xs">
                  <div className="flex justify-between text-slate-200">
                    <span>Route:</span>
                    <span className="font-bold text-white truncate max-w-[200px]">{pickupCity} → {dropCity}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Running KM Fare ({totalKm} km @ ₹{selectedVehicle.ratePerKm}):</span>
                    <span className="font-bold text-white">₹{runningFare.toLocaleString('en-IN')}</span>
                  </div>
                  {totalMinKm > actualKm && (
                    <div className="text-[10px] text-amber-300 font-semibold pl-2">
                      * Min {minKmPerDay} km/day applied for {tripDays} day(s) = {totalMinKm} km
                    </div>
                  )}
                  <div className="flex justify-between text-slate-200">
                    <span>Driver Allowance ({tripDays} day(s) @ ₹{dailyBatta}):</span>
                    <span className="font-bold text-white">₹{totalDriverBatta}</span>
                  </div>
                  {totalNightHalt > 0 && (
                    <div className="flex justify-between text-slate-200">
                      <span>Night Halt ({tripDays - 1} night(s) @ ₹{nightHaltRate}):</span>
                      <span className="font-bold text-amber-300">₹{totalNightHalt}</span>
                    </div>
                  )}
                  {tripType === 'One Way' && (
                    <div className="flex justify-between text-amber-300">
                      <span>One Way Surcharge:</span>
                      <span className="font-bold text-amber-300">+₹2,000</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-200 pt-2 border-t border-white/10">
                    <span>Tolls &amp; Parking:</span>
                    <span className="text-amber-300 font-bold">As per actual Fastag</span>
                  </div>
                </div>

                {/* Transparent Pricing Formula Guarantee (from user's reference) */}
                <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3.5 text-xs text-amber-200/90 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 uppercase text-[10.5px] tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Transparent Pricing Guarantee</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    • {tripType === 'One Way' ? 'One-Way Drop Formula' : 'Round Trip Formula'}: Distance ({totalKm} KM @ ₹{selectedVehicle.ratePerKm}/km) + Driver Bata (₹{totalDriverBatta}){tripType === 'One Way' ? ' + One-Way Surcharge (₹2,000)' : ''}. Zero return toll or empty charges.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-emerald-500/30 hover:scale-[1.02] text-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Lock In Outstation Fare</span>
                </button>

                <div className="text-center">
                  <a
                    href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                    className="inline-flex items-center text-xs font-bold text-amber-300 hover:text-amber-200"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1" />
                    <span>Or Call Dispatch: {CONTACT_INFO.primaryPhone}</span>
                  </a>
                </div>

              </div>

              {/* Highway Assurance Card */}
              <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Outstation Highway Assurance
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Ghat-Road Certified:</strong> Safe handling on hill routes (Tirumala, Srisailam, Araku).</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Zero Return Empty Mileage:</strong> On one-way bookings, pay only for what you travel.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Advance Online:</strong> Pay the driver comfortably at pickup or trip end.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3-Tab Vehicle Pricing Modal matching screenshots */}
      <VehiclePricingModal
        isOpen={Boolean(pricingModalCarId)}
        vehicleId={pricingModalCarId}
        initialTab="outstation"
        onClose={() => setPricingModalCarId(null)}
      />

    </div>
  );
}

