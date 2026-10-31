import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Navigation, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Plane,
  Car,
  ShieldCheck
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';
import LocationInput from '../components/LocationInput';

export default function OutstationCabsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [tripType, setTripType] = useState('One Way');
  const [pickupCity, setPickupCity] = useState('Guntur');
  const [dropCity, setDropCity] = useState('Hyderabad');
  const [date, setDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);
  const [time, setTime] = useState('06:00');
  const [selectedVehicleId, setSelectedVehicleId] = useState('swift-dzire');

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
  const distance = destinationDistances[dropCity] || 250;
  
  // Fare Calculation
  const totalKm = tripType === 'Round Trip' ? distance * 2 : distance;
  const runningFare = totalKm * selectedVehicle.ratePerKm;
  const driverBatta = tripType === 'Round Trip' ? 800 : 400;
  const totalFare = runningFare + driverBatta;

  const handleBooking = () => {
    const msg = `*OUTSTATION CAB RESERVATION* 🚗
*Sri Venkateswara Car Travels*

• *Trip Type:* ${tripType}
• *From:* ${pickupCity}
• *To Destination:* ${dropCity}
• *Estimated Distance:* ~${totalKm} Kms
• *Vehicle:* ${selectedVehicle.name} (${selectedVehicle.categoryLabel})
• *Departure Date & Time:* ${date} at ${time}
${tripType === 'Round Trip' ? `• *Return Date:* ${returnDate}` : ''}
• *Estimated Total Fare:* ₹${totalFare.toLocaleString('en-IN')} (incl. Driver Batta: ₹${driverBatta})
• *Per Km Rate:* ₹${selectedVehicle.ratePerKm}/km

Hello, please check vehicle availability and confirm this outstation cab booking.`;

    openWhatsApp(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-14 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold shadow-sm">
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
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/tour-packages')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Tour Packages</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Outstation Cabs &amp; <span className="text-blue-500">One-Way Drops</span>
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
                    onClick={() => setTripType('One Way')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tripType === 'One Way'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>One-Way Drop (Save 40%)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('Round Trip')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tripType === 'Round Trip'
                        ? 'bg-blue-600 text-white shadow-md'
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
                    onChange={(val) => setPickupCity(val)}
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
                    onChange={(val) => setDropCity(val)}
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
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Vehicle Selection: ONE Unified Box Container ("Oka box laga") */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10.5px] font-black uppercase text-blue-600 tracking-wider block">
                      Available Commercial AC Fleet
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      Select Vehicle for Outstation Ride
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
                      Driver Batta: ₹{driverBatta} (Fixed)
                    </span>
                  </div>
                </div>

                {/* Grid of Cars inside the box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLEET_VEHICLES.map((v) => {
                    const isSelected = selectedVehicleId === v.id;
                    const carRunningFare = totalKm * v.ratePerKm;
                    const carTotal = carRunningFare + driverBatta;

                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`rounded-xl border-2 p-3 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-blue-600 bg-white ring-2 ring-blue-500/20 shadow-md scale-[1.01]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={v.image}
                            alt={v.name}
                            className="w-14 h-11 object-cover rounded-lg shrink-0 border border-slate-100"
                          />
                          <div className="truncate">
                            <div className="font-black text-xs text-slate-900 truncate">{v.name}</div>
                            <div className="text-[11px] text-slate-500">{v.rateText} • {v.seats}</div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-black text-blue-600">₹{carTotal.toLocaleString('en-IN')}</div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isSelected ? 'Selected ✓' : 'Select'}
                          </span>
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
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Driver</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing Receipt & WhatsApp Booking */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 rounded-[2rem] p-7 text-white shadow-xl shadow-blue-500/20 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Outstation Fare Estimate</span>
                  <span className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
                    {tripType === 'One Way' ? 'One Way (Save 40%)' : 'Round Trip'}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-blue-200 font-medium">Estimated Total Fare</div>
                  <div className="text-4xl font-black text-white mt-1">
                    ₹{totalFare.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">
                    Based on ₹{selectedVehicle.ratePerKm}/km rate for ~{totalKm} Kms + Driver Batta
                  </div>
                </div>

                <div className="space-y-2 bg-black/15 backdrop-blur-xs rounded-xl p-4 text-xs">
                  <div className="flex justify-between text-blue-100">
                    <span>Route:</span>
                    <span className="font-bold text-white truncate max-w-[200px]">{pickupCity} → {dropCity}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Running KM Fare ({totalKm} km @ ₹{selectedVehicle.ratePerKm}):</span>
                    <span className="font-bold text-white">₹{runningFare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Driver Allowance (Batta):</span>
                    <span className="font-bold text-white">₹{driverBatta}</span>
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
                  <span>Lock In Outstation Fare</span>
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

    </div>
  );
}

