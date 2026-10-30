import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Wind,
  Navigation,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';
import LocationInput from '../components/LocationInput';

export default function AirportCabsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [transferType, setTransferType] = useState('drop'); // 'drop' or 'pickup'
  const [selectedAirport, setSelectedAirport] = useState('vga');
  const [cityLocality, setCityLocality] = useState('Guntur City Center');
  const [flightNo, setFlightNo] = useState('');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('06:00');
  const [selectedVehicleId, setSelectedVehicleId] = useState('swift-dzire');

  const airports = [
    {
      id: 'vga',
      name: 'Vijayawada Airport (Gannavaram - VGA)',
      city: 'Vijayawada / Gannavaram',
      distanceFromGuntur: '55 Kms (~1.2 Hrs)',
      fares: {
        'swift-dzire': 1499,
        'maruti-ertiga': 1999,
        'innova-crysta': 2699,
        'tempo-traveller': 3999,
        'innova-classic': 2399,
        'kia-carens': 2199
      }
    },
    {
      id: 'hyd',
      name: 'Hyderabad International Airport (RGIA - HYD)',
      city: 'Shamshabad, Hyderabad',
      distanceFromGuntur: '290 Kms (~4.5 Hrs)',
      fares: {
        'swift-dzire': 4199,
        'maruti-ertiga': 5399,
        'innova-crysta': 6899,
        'tempo-traveller': 9899,
        'innova-classic': 6299,
        'kia-carens': 5699
      }
    }
  ];

  const currentAirport = airports.find((a) => a.id === selectedAirport) || airports[0];
  const selectedVehicle = FLEET_VEHICLES.find((v) => v.id === selectedVehicleId) || FLEET_VEHICLES[0];
  const baseFare = currentAirport.fares[selectedVehicleId] || 1499;

  const handleBooking = () => {
    const pickupLoc = transferType === 'pickup' ? currentAirport.name : cityLocality;
    const dropLoc = transferType === 'pickup' ? cityLocality : currentAirport.name;

    const message = `*AIRPORT TAXI TRANSFER BOOKING* ✈️
*Sri Venkateswara Car Travels*

• *Transfer:* ${transferType === 'pickup' ? 'Airport Pickup (Arrival)' : 'Airport Drop (Departure)'}
• *Airport:* ${currentAirport.name}
• *City Address:* ${cityLocality}
• *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.categoryLabel})
• *Date & Time:* ${date} at ${time}
• *Flight No:* ${flightNo || 'Will share closer to departure'}
• *Estimated Flat Fare:* ₹${baseFare.toLocaleString('en-IN')}

Hello Sri Venkateswara Travels, please confirm cab availability for this airport transfer.`;

    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold shadow-sm">
              <Plane className="w-3.5 h-3.5 text-amber-400" />
              <span>24/7 AIRPORT TAXI DESK • GANNAVARAM &amp; HYDERABAD</span>
            </div>

            {/* Quick Redirect Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/outstation-cabs')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Outstation Cabs</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/hourly-rentals')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Hourly Rentals</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Airport Taxi <span className="text-blue-500">Pickup &amp; Drop Services</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Guaranteed on-time doorstep airport transfers with live flight delay tracking, zero surge pricing, and sanitized AC vehicles.
          </p>

        </div>
      </section>

      {/* Main Interactive Booking Section */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Booking Form */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              
              {/* Transfer Direction Toggle */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
                  Select Transfer Type
                </label>
                <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setTransferType('drop')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      transferType === 'drop'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Plane className="w-4 h-4 rotate-45" />
                    <span>Drop to Airport</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransferType('pickup')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      transferType === 'pickup'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Plane className="w-4 h-4 -rotate-45" />
                    <span>Pickup from Airport</span>
                  </button>
                </div>
              </div>

              {/* Airport Selector Tabs */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
                  Select Destination Airport
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {airports.map((apt) => (
                    <button
                      key={apt.id}
                      type="button"
                      onClick={() => setSelectedAirport(apt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedAirport === apt.id
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">{apt.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{apt.distanceFromGuntur}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Address & Flight No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    {transferType === 'pickup' ? 'Drop Location in City (Enter Area/Pincode)' : 'Doorstep Pickup Address (Enter Area/Pincode)'}
                  </label>
                  <LocationInput
                    value={cityLocality}
                    onChange={(val) => setCityLocality(val)}
                    placeholder="e.g. 522006, Brodipet Guntur, Benz Circle"
                    icon={MapPin}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Flight Number (Optional)
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={flightNo}
                      onChange={(e) => setFlightNo(e.target.value)}
                      placeholder="e.g. 6E-452 / AI-542"
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Journey Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={date}
                      min={today}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    {transferType === 'pickup' ? 'Flight Landing Time' : 'Pickup Time'}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Select Vehicle Cards */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Select Vehicle Category
                  </label>
                  <span className="text-[11px] text-blue-600 font-semibold block sm:hidden">
                    Tap any car to select &amp; book
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLEET_VEHICLES.map((v) => {
                    const fare = currentAirport.fares[v.id] || 1499;
                    const isSelected = selectedVehicleId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`rounded-2xl border transition-all cursor-pointer flex flex-col overflow-hidden ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/25 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {/* Top Summary Row */}
                        <div className="p-3.5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={v.image}
                              alt={v.name}
                              className="w-14 h-11 object-cover rounded-xl shrink-0"
                            />
                            <div>
                              <div className="font-bold text-xs text-gray-900">{v.name}</div>
                              <div className="text-[11px] text-gray-500">{v.seats} • {v.luggage}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black text-blue-600">₹{fare.toLocaleString('en-IN')}</div>
                            <div className="text-[10px] text-gray-400 font-semibold">Fixed Fare</div>
                          </div>
                        </div>

                        {/* Collapsible Mobile Drawer: Opens downwards when selected! */}
                        {isSelected && (
                          <div className="px-3.5 pb-3.5 pt-2 border-t border-blue-200/60 bg-blue-50/70 sm:hidden space-y-2.5 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                              <span>❄ {v.acType}</span>
                              <span>🧳 {v.luggage}</span>
                              <span className="font-bold text-emerald-700">Flight Tracking Inc.</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBooking();
                                }}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-3 rounded-xl flex items-center justify-center text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                              >
                                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                                <span>WhatsApp Book</span>
                              </button>

                              <a
                                href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 px-3 rounded-xl flex items-center justify-center text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
                              >
                                <Phone className="w-3.5 h-3.5 mr-1" />
                                <span>Call Driver</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Pricing Receipt & WhatsApp Booking */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 rounded-[2rem] p-7 text-white shadow-xl shadow-blue-500/20 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Airport Transfer Summary</span>
                  <span className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">Guaranteed Pickup</span>
                </div>

                <div>
                  <div className="text-xs text-blue-200 font-medium">Estimated All-Inclusive Fare</div>
                  <div className="text-4xl font-black text-white mt-1">
                    ₹{baseFare.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">
                    {selectedVehicle.name} • {transferType === 'drop' ? 'City to Airport' : 'Airport to City'}
                  </div>
                </div>

                <div className="space-y-2 bg-black/15 backdrop-blur-xs rounded-xl p-4 text-xs">
                  <div className="flex justify-between text-blue-100">
                    <span>Airport:</span>
                    <span className="font-bold text-white truncate max-w-[190px]">{currentAirport.name}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>City Point:</span>
                    <span className="font-bold text-white truncate max-w-[190px]">{cityLocality}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Date &amp; Time:</span>
                    <span className="font-bold text-white">{date} at {time}</span>
                  </div>
                  <div className="flex justify-between text-blue-100 pt-2 border-t border-white/10">
                    <span>Tolls &amp; Parking:</span>
                    <span className="text-amber-300 font-bold">As per actual Fastag</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-emerald-500/30 hover:scale-[1.02] text-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Confirm on WhatsApp</span>
                </button>

                <div className="text-center">
                  <a
                    href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                    className="inline-flex items-center text-xs font-bold text-blue-200 hover:text-white"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1" />
                    <span>Or Call Dispatch: {CONTACT_INFO.primaryPhone}</span>
                  </a>
                </div>

              </div>

              {/* Airport Guarantee Card */}
              <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Airport Service Guarantee
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>60 Mins Free Waiting:</strong> If flight is delayed, driver waits with zero penalty charges.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Doorstep Pickup:</strong> Arrives 15 minutes before departure time to ensure you never miss a flight.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Luggage Assistance:</strong> Chauffeur assists with trolley loading &amp; unloading.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

