import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Car, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Wind, 
  Briefcase,
  Plane,
  Navigation
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function HourlyRentalsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState('8h');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pickupCity, setPickupCity] = useState('Guntur / Vijayawada');

  const packages = [
    {
      id: '4h',
      hours: 4,
      km: 40,
      label: '4 Hrs / 40 Kms',
      badge: 'Half Day Quick Errands',
      rates: {
        'swift-dzire': { base: 1400, extraKm: 12, extraHr: 150 },
        'maruti-ertiga': { base: 1800, extraKm: 15, extraHr: 200 },
        'innova-classic': { base: 2100, extraKm: 18, extraHr: 250 },
        'innova-crysta': { base: 2600, extraKm: 21, extraHr: 300 },
        'kia-carens': { base: 1950, extraKm: 16, extraHr: 220 },
        'tempo-traveller': { base: 3500, extraKm: 26, extraHr: 400 }
      }
    },
    {
      id: '6h',
      hours: 6,
      km: 60,
      label: '6 Hrs / 60 Kms',
      badge: 'City Tour / Shopping',
      rates: {
        'swift-dzire': { base: 1800, extraKm: 12, extraHr: 150 },
        'maruti-ertiga': { base: 2400, extraKm: 15, extraHr: 200 },
        'innova-classic': { base: 2800, extraKm: 18, extraHr: 250 },
        'innova-crysta': { base: 3400, extraKm: 21, extraHr: 300 },
        'kia-carens': { base: 2550, extraKm: 16, extraHr: 220 },
        'tempo-traveller': { base: 4500, extraKm: 26, extraHr: 400 }
      }
    },
    {
      id: '8h',
      hours: 8,
      km: 80,
      label: '8 Hrs / 80 Kms',
      badge: 'Most Popular Full Day',
      rates: {
        'swift-dzire': { base: 2200, extraKm: 12, extraHr: 150 },
        'maruti-ertiga': { base: 2900, extraKm: 15, extraHr: 200 },
        'innova-classic': { base: 3400, extraKm: 18, extraHr: 250 },
        'innova-crysta': { base: 4200, extraKm: 21, extraHr: 300 },
        'kia-carens': { base: 3100, extraKm: 16, extraHr: 220 },
        'tempo-traveller': { base: 5600, extraKm: 26, extraHr: 400 }
      }
    },
    {
      id: '10h',
      hours: 10,
      km: 100,
      label: '10 Hrs / 100 Kms',
      badge: 'Extended Day / Suburbs',
      rates: {
        'swift-dzire': { base: 2600, extraKm: 12, extraHr: 150 },
        'maruti-ertiga': { base: 3400, extraKm: 15, extraHr: 200 },
        'innova-classic': { base: 4000, extraKm: 18, extraHr: 250 },
        'innova-crysta': { base: 4900, extraKm: 21, extraHr: 300 },
        'kia-carens': { base: 3600, extraKm: 16, extraHr: 220 },
        'tempo-traveller': { base: 6500, extraKm: 26, extraHr: 400 }
      }
    },
    {
      id: '12h',
      hours: 12,
      km: 120,
      label: '12 Hrs / 120 Kms',
      badge: 'All-Day / Wedding Function',
      rates: {
        'swift-dzire': { base: 3000, extraKm: 12, extraHr: 150 },
        'maruti-ertiga': { base: 3900, extraKm: 15, extraHr: 200 },
        'innova-classic': { base: 4600, extraKm: 18, extraHr: 250 },
        'innova-crysta': { base: 5600, extraKm: 21, extraHr: 300 },
        'kia-carens': { base: 4100, extraKm: 16, extraHr: 220 },
        'tempo-traveller': { base: 7400, extraKm: 26, extraHr: 400 }
      }
    }
  ];

  const currentPkg = packages.find((p) => p.id === selectedPackage) || packages[2];

  const filteredVehicles = FLEET_VEHICLES.filter((vehicle) => {
    if (selectedCategory === 'all') return true;
    return vehicle.category === selectedCategory;
  });

  const categoryFilters = [
    { id: 'all', label: `All Vehicles (${FLEET_VEHICLES.length})` },
    { id: 'sedan', label: 'Compact Sedans' },
    { id: 'mpv', label: 'Family MPVs' },
    { id: 'luxury', label: 'Premium Luxury' },
    { id: 'group', label: 'Tempo Travellers' }
  ];

  const handleBookVehicle = (vehicle) => {
    const rateInfo = currentPkg.rates[vehicle.id] || { base: 2200, extraKm: 12, extraHr: 150 };

    if (onOpenBookingModal) {
      onOpenBookingModal({
        serviceType: `Hourly Rental (${currentPkg.label})`,
        hoursPackage: currentPkg.label,
        vehicle: vehicle.name,
        fare: rateInfo.base,
        pickup: pickupCity,
        destination: `Local City Package (${currentPkg.label})`
      });
    } else {
      const msg = `*HOURLY CAB RENTAL RESERVATION* ⏱️\n*Sri Venkateswara Car Travels*\n\n• *Rental Package:* ${currentPkg.label} (${currentPkg.badge})\n• *Vehicle:* ${vehicle.name} (${vehicle.categoryLabel})\n• *Package Base Price:* ₹${rateInfo.base.toLocaleString('en-IN')}\n• *Extra Km Rate:* ₹${rateInfo.extraKm}/km\n• *Extra Hour Rate:* ₹${rateInfo.extraHr}/hr\n• *Pickup Location:* ${pickupCity}\n\nHello, I want to book this hourly rental package. Please confirm cab availability and driver details.`;
      openWhatsApp(msg);
    }
  };

  const handleSelectPackageWithScroll = (pkgId) => {
    setSelectedPackage(pkgId);
    setTimeout(() => {
      const el = document.getElementById('hourly-vehicles-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-12 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold shadow-sm mb-3">
            <span>LOCAL HOURLY CAB RENTALS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Guntur &amp; Vijayawada <span className="text-blue-400">Hourly Rentals</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2.5 font-medium leading-relaxed">
            Need a cab for city meetings, shopping runs, doctor visits, or family weddings? Rent sanitized cars by the hour with courteous private chauffeurs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chauffeur &amp; Fuel Included</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multiple Stops Permitted</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flexible 4h to 12h Packages</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Package Section */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Package Selector Cards (4h, 6h, 8h, 10h, 12h) - User requested adding 6 and 10 and scroll down */}
          <div className="mb-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">Choose Your Hourly Duration</h2>
              <p className="text-xs text-gray-500 mt-1">Select a duration below to view available cars and instant rates (4h to 12h)</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {packages.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleSelectPackageWithScroll(pkg.id)}
                    className={`p-4 sm:p-5 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-white shadow-xl ring-2 ring-blue-500/20 scale-[1.02]'
                        : 'border-gray-200 bg-white hover:bg-slate-50 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
                        SELECTED
                      </span>
                    )}

                    <div>
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1 line-clamp-1">
                        {pkg.badge}
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-gray-900 mb-0.5">
                        {pkg.label}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        Standard City Package
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600">
                      <span>View Cars</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vehicle Category Filter Pills */}
          <div id="hourly-vehicles-section" className="flex flex-wrap items-center justify-center gap-2 mb-8 scroll-mt-24">
            {categoryFilters.map((btn) => {
              const isActive = selectedCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedCategory(btn.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Active Package Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-blue-800 font-bold uppercase tracking-wider">Active Package Selected</div>
                <div className="text-base font-black text-slate-900">{currentPkg.label} ({currentPkg.badge})</div>
              </div>
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Chauffeur standby included • Over-limit kms and hours charged at standard rates
            </div>
          </div>

          {/* Vehicle Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car) => {
              const rateInfo = currentPkg.rates[car.id] || { base: 2200, extraKm: 12, extraHr: 150 };
              return (
                <div 
                  key={car.id} 
                  className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative h-44 bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-100">
                      <img
                        src={car.image}
                        alt={`${car.name} Rental`}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/80 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full absolute top-3 left-3 shadow-xs">
                        {car.categoryLabel}
                      </span>
                      <span className="bg-blue-600 text-white text-[11px] font-black px-3 py-1 rounded-full absolute top-3 right-3 shadow-md shadow-blue-600/30">
                        {currentPkg.label}
                      </span>
                    </div>

                    {/* Title & Pricing */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                          {car.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-semibold">
                          {car.submodels}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-gray-400 uppercase font-black block leading-none">BASE FARE</span>
                        <span className="text-2xl font-black text-blue-600">
                          ₹{rateInfo.base.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Specs Badges */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 mb-3 text-xs font-bold text-gray-700">
                      <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1.5 rounded-xl">
                        <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-[11px]">{car.seats}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1.5 rounded-xl">
                        <Wind className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-[11px]">{car.acType}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1.5 rounded-xl">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-[11px]">{car.luggage}</span>
                      </div>
                    </div>

                    {/* Extra Rates Breakdown */}
                    <div className="bg-slate-50 p-3 rounded-2xl mb-4 border border-slate-100 flex items-center justify-between text-xs font-semibold text-gray-600">
                      <div>
                        <span className="text-gray-400 block text-[10px]">EXTRA KM:</span>
                        <strong className="text-gray-900 font-bold">₹{rateInfo.extraKm}/km</strong>
                      </div>
                      <div className="h-6 w-px bg-gray-200"></div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">EXTRA HOUR:</span>
                        <strong className="text-gray-900 font-bold">₹{rateInfo.extraHr}/hr</strong>
                      </div>
                      <div className="h-6 w-px bg-gray-200"></div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">CHAUFFEUR:</span>
                        <strong className="text-emerald-700 font-bold">Included</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleBookVehicle(car)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                      <span>Book Package</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const msg = `*HOURLY RENTAL INQUIRY* ⏱️\n*Sri Venkateswara Car Travels*\n\n• *Package:* ${currentPkg.label}\n• *Car:* ${car.name}\n• *Base Price:* ₹${rateInfo.base.toLocaleString('en-IN')}\n\nHi, please confirm cab dispatch for this rental.`;
                        openWhatsApp(msg);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}