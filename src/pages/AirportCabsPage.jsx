import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  Navigation
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';
import LocationInput from '../components/LocationInput';

export default function AirportCabsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().toISOString().split('T')[0];

  const [transferType, setTransferType] = useState(() => location.state?.transferType || 'drop'); // 'drop' or 'pickup'
  const [selectedAirport, setSelectedAirport] = useState('vga');
  const [cityLocality, setCityLocality] = useState(() => {
    if (location.state?.transferType === 'pickup') {
      return location.state?.destination || 'Guntur';
    }
    return location.state?.pickup || 'Guntur';
  });
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
        'toyota-etios': 1499,
        'maruti-ciaz': 1699,
        'maruti-ertiga': 1999,
        'kia-carens': 2199,
        'innova-classic': 2399,
        'innova-crysta': 2699,
        'tempo-traveller': 3999,
        'force-urbania': 4999
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
      <section className="bg-gradient-to-b from-[#070b14] via-[#0d1222] to-[#070b14] text-white pt-28 pb-14 px-4 md:px-8 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
              <Plane className="w-3.5 h-3.5 text-amber-400" />
              <span>24/7 AIRPORT TAXI DESK • GANNAVARAM (VIJAYAWADA AIRPORT)</span>
            </div>

            {/* Quick Redirect Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/outstation-cabs')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Outstation Cabs</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/hourly-rentals')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Hourly Rentals</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Airport Taxi <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">Pickup &amp; Drop Services</span>
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
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
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
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Plane className="w-4 h-4 -rotate-45" />
                    <span>Pickup from Airport</span>
                  </button>
                </div>
              </div>

              {/* Airport Badge Card - Focused on Vijayawada / Gannavaram */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
                  Designated Airport (Vijayawada Region)
                </label>
                <div className="p-4 rounded-2xl border-2 border-amber-500/50 bg-amber-50/40 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-sm">
                      <Plane className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <div className="font-black text-sm text-gray-900">Vijayawada Airport (Gannavaram - VGA)</div>
                      <div className="text-xs text-slate-500 font-medium">Direct Doorstep Transfers to/from Guntur &amp; Vijayawada • ~55 Kms (~1.2 Hrs)</div>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-black uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    Active Airport ✓
                  </span>
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
                    placeholder="e.g. 522002, Arundelpet Guntur, Benz Circle"
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
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                  <span className="text-[11px] text-amber-700 font-semibold block sm:hidden">
                    Tap any car to select &amp; book
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
                  {FLEET_VEHICLES.map((v) => {
                    const fare = currentAirport.fares[v.id] || 1499;
                    const isSelected = selectedVehicleId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-xs'
                        }`}
                      >
                        {/* Top Summary Row */}
                        <div className="p-3.5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={v.image}
                              alt={v.name}
                              className="w-14 h-11 object-cover rounded-xl shrink-0 border border-slate-100"
                            />
                            <div>
                              <div className="font-bold text-xs text-gray-900">{v.name}</div>
                              <div className="text-[11px] text-gray-500">{v.seats} • {v.luggage}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-black text-amber-700">₹{fare.toLocaleString('en-IN')}</div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-0.5 ${
                              isSelected
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black'
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {isSelected ? 'Selected ✓' : 'Fixed Fare'}
                            </span>
                          </div>
                        </div>

                        {/* Feature Badges & Direct In-Card Action Buttons (Uniform on ALL Cards) */}
                        <div className={`px-3.5 pb-3.5 pt-2.5 border-t space-y-2.5 mt-auto ${
                          isSelected ? 'border-amber-200/80 bg-amber-50/70' : 'border-slate-100 bg-slate-50/60'
                        }`}>
                          <div className="flex items-center justify-between text-[11px] gap-2">
                            <span className="font-semibold text-slate-700 flex items-center gap-1 truncate">
                              <span>❄</span> {v.acType || 'Commercial AC'}
                            </span>
                            <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[10.5px] shrink-0">
                              ✓ Doorstep Pickup Inc.
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedVehicleId(v.id);
                                const msg = `*AIRPORT CAB RESERVATION* ✈️\n*Sri Venkateswara Car Travels*\n\n• *Airport:* ${currentAirport.name} (${currentAirport.city})\n• *Trip Type:* ${transferType === 'drop' ? 'City to Airport Drop' : 'Airport to City Pickup'}\n• *Vehicle:* ${v.name} (${v.seats})\n• *Fixed All-Inclusive Fare:* ₹${fare.toLocaleString('en-IN')}\n• *Date & Time:* ${date} at ${time}\n• *Passenger Location:* ${locationAddress || 'Doorstep Pickup'}\n\nHello, I would like to book this airport transfer cab. Please confirm pickup.`;
                                openWhatsApp(msg);
                              }}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-3 rounded-xl flex items-center justify-center text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 mr-1" />
                              <span>Book Now</span>
                            </button>

                            <a
                              href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2.5 px-3 rounded-xl flex items-center justify-center text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all border border-amber-300/40 cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 mr-1 text-slate-950" />
                              <span>Call Driver</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Pricing Receipt & WhatsApp Booking */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-gradient-to-br from-[#070b14] via-[#0f172a] to-[#1e293b] border border-amber-500/30 rounded-[2rem] p-7 text-white shadow-2xl shadow-amber-500/10 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Airport Transfer Summary</span>
                  <span className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">Guaranteed Pickup</span>
                </div>

                <div>
                  <div className="text-xs text-slate-300 font-medium">Estimated All-Inclusive Fare</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent mt-1">
                    ₹{baseFare.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedVehicle.name} • {transferType === 'drop' ? 'City to Airport' : 'Airport to City'}
                  </div>
                </div>

                <div className="space-y-2 bg-black/15 backdrop-blur-xs rounded-xl p-4 text-xs">
                  <div className="flex justify-between text-slate-200">
                    <span>Airport:</span>
                    <span className="font-bold text-white truncate max-w-[190px]">{currentAirport.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>City Point:</span>
                    <span className="font-bold text-white truncate max-w-[190px]">{cityLocality}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Date &amp; Time:</span>
                    <span className="font-bold text-white">{date} at {time}</span>
                  </div>
                  <div className="flex justify-between text-slate-200 pt-2 border-t border-white/10">
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
                    className="inline-flex items-center text-xs font-bold text-amber-300 hover:text-amber-200"
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

