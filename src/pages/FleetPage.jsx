import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Navigation
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { sendVehicleBooking, openWhatsApp } from '../utils/whatsapp';
import VehiclePricingModal from '../components/VehiclePricingModal';

export default function FleetPage({ onOpenBookingModal }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [tripType, setTripType] = useState('Round Trip'); // 'Round Trip' | 'One Way'
  const [modalVehicleId, setModalVehicleId] = useState(null);

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

  const handleBookCar = (car) => {
    const minKm = car.minKm || (car.category === 'sedan' ? 350 : 400);
    const bata = car.driverBatta || (car.category === 'sedan' ? 300 : 400);
    const isRound = tripType === 'Round Trip';

    const msg = `*FLEET CAB RESERVATION (${tripType.toUpperCase()})* 🚖\n*Sri Venkateswara Car Travels*\n\n• *Vehicle:* ${car.name} (${car.seats})\n• *Trip Type:* ${tripType} (${isRound ? 'Outstation Round Trip' : 'One Way Drop - Save 40%'})\n• *Running Rate:* ${car.rateText}\n${isRound ? `• *Min Distance:* ${minKm} Kms/Day\n• *Driver Bata:* ₹${bata}/Day\n` : '• *One Way Route:* Single journey drop (pay only 1-way distance)\n'}• *Pickup Location:* Guntur / Vijayawada / Amaravati\n\nHello, I would like to book this ${car.name} for a ${tripType} trip. Please check vehicle availability and confirm.`;

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
          
          {/* Trip Type Selector: One Way vs Round Trip (Requested by User) */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-slate-900 p-1.5 rounded-2xl border border-amber-500/30 shadow-xl inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTripType('Round Trip')}
                className={`px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                  tripType === 'Round Trip'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 scale-[1.02]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🔄 Round Trip</span>
                <span className="hidden sm:inline text-[11px] opacity-80 font-bold">(Outstation)</span>
              </button>

              <button
                type="button"
                onClick={() => setTripType('One Way')}
                className={`px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                  tripType === 'One Way'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 scale-[1.02]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>➡️ One Way Drop</span>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  Save 40%
                </span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 font-medium mt-2.5 text-center max-w-lg">
              {tripType === 'Round Trip' 
                ? '🔄 Round Trip: Ideal for same-day return or multi-day outstation visits across AP & Telangana.'
                : '➡️ One Way Drop: Pay only for one-way travel without paying return empty charges (Save up to 40%).'}
            </p>
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
              const carBatta = car.driverBatta || (car.category === 'sedan' ? 300 : 400);

              return (
                <div 
                  key={car.id} 
                  className="group bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Vehicle Image Frame */}
                    <div className="relative h-40 sm:h-56 bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-slate-100">
                      <img
                        src={car.image}
                        alt={`${car.name} Cab Rental`}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/80 text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-full absolute top-2.5 sm:top-3 left-2.5 sm:left-3 shadow-xs">
                        {car.categoryLabel}
                      </span>
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[11px] sm:text-xs font-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full absolute top-2.5 sm:top-3 right-2.5 sm:right-3 shadow-md border border-amber-300/60">
                        {car.rateText}
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

                    {/* Trip Type Selector & Tariff Pill inside each card */}
                    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 mb-4 space-y-2">
                      <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setTripType('Round Trip')}
                          className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all cursor-pointer text-center ${
                            tripType === 'Round Trip'
                              ? 'bg-amber-500 text-slate-950 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          🔄 Round Trip
                        </button>
                        <button
                          type="button"
                          onClick={() => setTripType('One Way')}
                          className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all cursor-pointer text-center ${
                            tripType === 'One Way'
                              ? 'bg-amber-500 text-slate-950 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          ➡️ One Way
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-0.5">
                        <span className="text-[11px] font-bold text-slate-600">
                          {tripType === 'Round Trip' ? 'Outstation Fare:' : 'One Way Drop:'}
                        </span>
                        <span className="text-amber-800 font-black text-sm">
                          {car.rateText}
                        </span>
                      </div>

                      <div className="text-[10.5px] font-semibold text-slate-500 border-t border-slate-200/60 pt-1.5 flex items-center justify-between">
                        {tripType === 'Round Trip' ? (
                          <>
                            <span>Min: <strong>{carMinKm} Kms/Day</strong></span>
                            <span>Driver Bata: <strong>₹{carBatta}/day</strong></span>
                          </>
                        ) : (
                          <span className="text-emerald-700 font-bold">
                            ✓ Pay only for 1-way distance (Save 40%)
                          </span>
                        )}
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
                      className="flex-1 py-2.5 sm:py-3 px-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap text-center"
                    >
                      View Pricing
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookCar(car)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Book {tripType === 'One Way' ? 'One Way' : 'Round Trip'}</span>
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
