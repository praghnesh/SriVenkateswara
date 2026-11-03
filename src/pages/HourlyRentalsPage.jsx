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
import { CONTACT_INFO, FLEET_VEHICLES, HOURLY_RENTAL_TARIFFS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';
import VehiclePricingModal from '../components/VehiclePricingModal';

export default function HourlyRentalsPage({ onOpenBookingModal }) {
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState('8h');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pickupCity, setPickupCity] = useState('Guntur / Vijayawada');
  const [pricingModalCarId, setPricingModalCarId] = useState(null);

  const packages = [
    {
      id: '4h',
      hours: 4,
      km: 40,
      label: '4 Hrs / 40 Kms',
      badge: 'Half Day City Errands',
      rates: {
        'swift-dzire': { base: 1300, extraKm: 13, extraHr: 150 },
        'toyota-etios': { base: 1300, extraKm: 13, extraHr: 150 },
        'maruti-ciaz': { base: 1400, extraKm: 14, extraHr: 180 },
        'maruti-ertiga': { base: 1600, extraKm: 16, extraHr: 200 },
        'kia-carens': { base: 2000, extraKm: 18, extraHr: 200 },
        'innova-classic': { base: 2000, extraKm: 17, extraHr: 250 },
        'innova-crysta': { base: 2500, extraKm: 19, extraHr: 300 },
        'tempo-traveller': { base: 3500, extraKm: 24, extraHr: 400 },
        'force-urbania': { base: 4500, extraKm: 32, extraHr: 450 }
      }
    },
    {
      id: '6h',
      hours: 6,
      km: 60,
      label: '6 Hrs / 60 Kms',
      badge: 'Flexible Shopping & Visits',
      rates: {
        'swift-dzire': { base: 1850, extraKm: 13, extraHr: 150 },
        'toyota-etios': { base: 1850, extraKm: 13, extraHr: 150 },
        'maruti-ciaz': { base: 2000, extraKm: 14, extraHr: 180 },
        'maruti-ertiga': { base: 2300, extraKm: 16, extraHr: 200 },
        'kia-carens': { base: 2750, extraKm: 18, extraHr: 200 },
        'innova-classic': { base: 2850, extraKm: 17, extraHr: 250 },
        'innova-crysta': { base: 3500, extraKm: 19, extraHr: 300 },
        'tempo-traveller': { base: 4500, extraKm: 24, extraHr: 400 },
        'force-urbania': { base: 5500, extraKm: 32, extraHr: 450 }
      }
    },
    {
      id: '8h',
      hours: 8,
      km: 80,
      label: '8 Hrs / 80 Kms',
      badge: 'Most Popular Full Day',
      rates: {
        'swift-dzire': { base: 2200, extraKm: 13, extraHr: 150 },
        'toyota-etios': { base: 2200, extraKm: 13, extraHr: 150 },
        'maruti-ciaz': { base: 2300, extraKm: 14, extraHr: 180 },
        'maruti-ertiga': { base: 2500, extraKm: 16, extraHr: 200 },
        'kia-carens': { base: 3200, extraKm: 18, extraHr: 200 },
        'innova-classic': { base: 3000, extraKm: 17, extraHr: 250 },
        'innova-crysta': { base: 3500, extraKm: 19, extraHr: 300 },
        'tempo-traveller': { base: 4500, extraKm: 24, extraHr: 400 },
        'force-urbania': { base: 5500, extraKm: 32, extraHr: 450 }
      }
    },
    {
      id: '10h',
      hours: 10,
      km: 100,
      label: '10 Hrs / 100 Kms',
      badge: 'Extended Day Package',
      rates: {
        'swift-dzire': { base: 2750, extraKm: 13, extraHr: 150 },
        'toyota-etios': { base: 2750, extraKm: 13, extraHr: 150 },
        'maruti-ciaz': { base: 2950, extraKm: 14, extraHr: 180 },
        'maruti-ertiga': { base: 3200, extraKm: 16, extraHr: 200 },
        'kia-carens': { base: 3950, extraKm: 18, extraHr: 200 },
        'innova-classic': { base: 3850, extraKm: 17, extraHr: 250 },
        'innova-crysta': { base: 4500, extraKm: 19, extraHr: 300 },
        'tempo-traveller': { base: 5750, extraKm: 24, extraHr: 400 },
        'force-urbania': { base: 7000, extraKm: 32, extraHr: 450 }
      }
    },
    {
      id: '12h',
      hours: 12,
      km: 120,
      label: '12 Hrs Day Rental',
      badge: 'All-Day Dedicated Rental',
      rates: {
        'swift-dzire': { base: 3100, extraKm: 13, extraHr: 150 },
        'toyota-etios': { base: 3100, extraKm: 13, extraHr: 150 },
        'maruti-ciaz': { base: 3300, extraKm: 14, extraHr: 180 },
        'maruti-ertiga': { base: 3700, extraKm: 16, extraHr: 200 },
        'kia-carens': { base: 4500, extraKm: 18, extraHr: 200 },
        'innova-classic': { base: 4500, extraKm: 17, extraHr: 250 },
        'innova-crysta': { base: 5200, extraKm: 19, extraHr: 300 },
        'tempo-traveller': { base: 6900, extraKm: 24, extraHr: 400 },
        'force-urbania': { base: 8300, extraKm: 32, extraHr: 450 }
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
    const rateInfo = currentPkg.rates[vehicle.id] || { base: 2000, extraKm: 13, extraHr: 150 };

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

  const handleBookFromTable = (item, pkgType = '8Hrs/80Km') => {
    const fare = pkgType === '4Hrs/40Km' ? item.fourHrsFortyKm : item.eightHrsHundredKm;
    if (onOpenBookingModal) {
      onOpenBookingModal({
        serviceType: `Hourly Rental (${pkgType})`,
        hoursPackage: pkgType,
        vehicle: item.vehicle,
        fare: fare,
        pickup: pickupCity,
        destination: `Local City Rental (${pkgType})`
      });
    } else {
      const msg = `*LOCAL HOURLY RENTAL RESERVATION* ⏱️\n*Sri Venkateswara Car Travels*\n\n• *Vehicle:* ${item.vehicle}\n• *Rental Package:* ${pkgType}\n• *Package Fare:* ₹${fare.toLocaleString('en-IN')}\n• *Extra Km Rate:* ₹${item.extraKm}/km\n• *Extra Hour Rate:* ₹${item.extraHr}/hr\n• *Driver Batta:* Included\n• *Pickup Location:* ${pickupCity}\n\nHello, I would like to book this local hourly rental cab. Please confirm availability.`;
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm mb-3">
            <span>LOCAL HOURLY CAB RENTALS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Guntur &amp; Vijayawada <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">Hourly Rentals</span>
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
          
          {/* ========================================================================
               OFFICIAL LOCAL USE / HOURLY RENTALS TARIFF CARD (Gold & Obsidian Theme)
               ======================================================================== */}
          <div className="mb-14" id="tariff-table">
            <div className="text-center mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <span>Official Rate Card</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Local Hourly Rental Tariff Chart
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                Fixed transparent rates for Guntur &amp; Vijayawada local city usage with certified private chauffeurs.
              </p>
            </div>

            {/* Table Container */}
            <div className="rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-amber-300 font-black uppercase text-[11px] sm:text-xs tracking-wider border-b border-amber-500/30">
                      <th className="py-3.5 px-3 sm:px-4 text-left border-r border-slate-800">Local Use</th>
                      <th className="py-3.5 px-2.5 sm:px-3 border-r border-slate-800 whitespace-nowrap">4Hrs/40Km</th>
                      <th className="py-3.5 px-2.5 sm:px-3 border-r border-slate-800 whitespace-nowrap">8Hrs/80Km</th>
                      <th className="py-3.5 px-2 sm:px-3 border-r border-slate-800 whitespace-nowrap">Extra Km</th>
                      <th className="py-3.5 px-2 sm:px-3 border-r border-slate-800 whitespace-nowrap">Extra Hr</th>
                      <th className="py-3.5 px-2 sm:px-3 border-r border-slate-800 whitespace-nowrap">Driver Beta</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Instant Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOURLY_RENTAL_TARIFFS.map((row, idx) => {
                      const isAlternate = idx % 2 === 1;
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors border-t border-slate-200/70 ${
                            isAlternate
                              ? 'bg-amber-50/35 text-slate-900 font-medium hover:bg-amber-100/50'
                              : 'bg-white text-slate-800 font-medium hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-3 sm:px-4 text-left border-r border-slate-200/60 font-bold whitespace-nowrap sm:whitespace-normal">
                            <div className="leading-tight text-slate-950 font-black">{row.vehicle}</div>
                            <div className="text-[10px] text-slate-500 font-normal">
                              {row.type}
                            </div>
                          </td>
                          <td className="py-3 px-2.5 sm:px-3 border-r border-slate-200/60 font-black text-slate-900">
                            ₹{row.fourHrsFortyKm}
                          </td>
                          <td className="py-3 px-2.5 sm:px-3 border-r border-slate-200/60 font-black text-slate-900">
                            ₹{row.eightHrsHundredKm}
                          </td>
                          <td className="py-3 px-2 sm:px-3 border-r border-slate-200/60 font-bold text-slate-700">
                            ₹{row.extraKm}
                          </td>
                          <td className="py-3 px-2 sm:px-3 border-r border-slate-200/60 font-bold text-slate-700">
                            ₹{row.extraHr}
                          </td>
                          <td className="py-3 px-2 sm:px-3 border-r border-slate-200/60 font-bold">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                              *included*
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleBookFromTable(row, '4Hrs/40Km')}
                                title="Book 4Hrs/40Km"
                                className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-black transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-600 hover:to-amber-700 shadow-xs border border-amber-300/40"
                              >
                                4h Book
                              </button>
                              <button
                                type="button"
                                onClick={() => handleBookFromTable(row, '8Hrs/80Km')}
                                title="Book 8Hrs/80Km"
                                className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-black transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                              >
                                8h Book
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Terms / Notes Footer matching user image */}
              <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-200 text-slate-600 text-[11px] sm:text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Driver Beta (Batta) is 100% INCLUDED in all 4h &amp; 8h local packages.</span>
                </div>
                <div className="text-slate-500 pl-5">
                  • Toll gates, parking charges, and entry permits are not included and payable as per actuals.
                </div>
                <div className="text-slate-500 pl-5">
                  • Standard night allowance of ₹200 applies for driving between 10:00 PM and 6:00 AM.
                </div>
              </div>
            </div>
          </div>

          {/* Package Selector Cards (4h, 6h, 8h, 10h, 12h) */}
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
                        ? 'border-amber-500 bg-white shadow-xl ring-2 ring-amber-500/20 scale-[1.02]'
                        : 'border-gray-200 bg-white hover:bg-slate-50 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
                        SELECTED
                      </span>
                    )}

                    <div>
                      <div className="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-1 line-clamp-1">
                        {pkg.badge}
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-gray-900 mb-0.5">
                        {pkg.label}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        Standard City Package
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-center gap-1 text-[11px] font-bold text-amber-700">
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
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25 scale-105'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Active Package Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">Active Package Selected</div>
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
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full absolute top-3 right-3 shadow-md border border-amber-300/50">
                        {currentPkg.label}
                      </span>
                    </div>

                    {/* Title & Pricing */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-black text-gray-900 group-hover:text-amber-600 transition-colors">
                          {car.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-semibold flex items-center gap-2 mt-0.5">
                          <span>{car.submodels}</span>
                          <button
                            type="button"
                            onClick={() => setPricingModalCarId(car.id)}
                            className="text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer text-[10.5px]"
                          >
                            Pricing Card
                          </button>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-gray-400 uppercase font-black block leading-none">BASE FARE</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                          ₹{rateInfo.base.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Specs Badges */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 mb-3 text-xs font-bold text-gray-700">
                      <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1.5 rounded-xl">
                        <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-[11px]">{car.seats}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1.5 rounded-xl">
                        <Wind className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-[11px]">{car.acType}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1.5 rounded-xl">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
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
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center transition-all shadow-md shadow-amber-500/20 cursor-pointer border border-amber-300/40"
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

      {/* 3-Tab Vehicle Pricing Modal matching reference tariff cards */}
      <VehiclePricingModal
        isOpen={Boolean(pricingModalCarId)}
        vehicleId={pricingModalCarId}
        initialTab="local"
        onClose={() => setPricingModalCarId(null)}
      />

    </div>
  );
}