import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Wind, 
  Briefcase, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Car, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { FLEET_VEHICLES, CONTACT_INFO } from '../data/travelData';
import { sendVehicleBooking, openWhatsApp } from '../utils/whatsapp';

export default function Fleet({ onOpenBookingModal }) {
  const [filter, setFilter] = useState('all');
  const [tripType, setTripType] = useState('Round Trip'); // 'Round Trip' | 'One Way'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive items count per slide
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const filteredVehicles = FLEET_VEHICLES.filter((vehicle) => {
    if (filter === 'all') return true;
    return vehicle.category === filter;
  });

  const filterButtons = [
    { id: 'all', label: `All Fleet (${FLEET_VEHICLES.length})` },
    { id: 'sedan', label: 'Compact Sedans' },
    { id: 'mpv', label: 'Family MPVs' },
    { id: 'luxury', label: 'Premium Luxury' },
    { id: 'group', label: 'Group Travellers' }
  ];

  const maxIndex = Math.max(0, filteredVehicles.length - visibleCount);

  const handleFilterChange = (id) => {
    setFilter(id);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  return (
    <section className="py-8 sm:py-12 bg-white relative overflow-hidden" id="fleet">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-6 space-y-1.5">
          <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Car className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
            <span>Our Verified Fleet</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Choose Your Vehicle
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-xs sm:text-sm">
            Comfortable, clean, sanitized vehicles with licensed chauffeurs for city commutes and long outstation journeys.
          </p>
        </div>

        {/* Trip Type Selector: One Way vs Round Trip */}
        <div className="flex flex-col items-center justify-center mb-5">
          <div className="bg-slate-900 p-1 rounded-2xl border border-amber-500/30 shadow-lg inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTripType('Round Trip')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                tripType === 'Round Trip'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 scale-[1.02]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>🔄 Round Trip</span>
              <span className="hidden sm:inline text-[10.5px] opacity-75 font-semibold">(Outstation)</span>
            </button>

            <button
              type="button"
              onClick={() => setTripType('One Way')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                tripType === 'One Way'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 scale-[1.02]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>➡️ One Way Drop</span>
              <span className="bg-emerald-500 text-white text-[9.5px] font-black px-1.5 py-0.2 rounded">
                Save 40%
              </span>
            </button>
          </div>
        </div>

        {/* Filter Pills (Compact) */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 mb-6">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => handleFilterChange(btn.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === btn.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div 
          className="relative px-0 sm:px-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          {maxIndex > 0 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-amber-600 hover:scale-105 items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-amber-600 hover:scale-105 items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Carousel Viewport */}
          <div className="overflow-hidden py-1">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
              }}
            >
              {filteredVehicles.map((car) => (
                <div 
                  key={car.id} 
                  className="shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Compact Card (User requested "ivi konchem chinnavi cheyyu ra") */}
                  <div className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 flex flex-col justify-between h-full">
                    <div>
                      {/* Vehicle Image Frame: Compact height */}
                      <div className="relative h-28 sm:h-36 bg-slate-50 rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 border border-slate-100 flex items-center justify-center p-1.5">
                        <img
                          src={car.image}
                          alt={`${car.name} Cab Rental`}
                          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                          loading="lazy"
                        />
                        <span className="bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-md absolute top-2 left-2 shadow-xs">
                          {car.categoryLabel}
                        </span>
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full absolute top-2 right-2 shadow-sm border border-amber-300/60">
                          {car.rateText}
                        </span>
                      </div>

                      {/* Car Details */}
                      <h3 className="text-sm sm:text-base font-black text-gray-900 mb-0.5 group-hover:text-amber-600 transition-colors leading-tight truncate">
                        {car.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium mb-2 truncate">
                        {car.submodels}
                      </p>

                      {/* Specs Badges Row (Compact) */}
                      <div className="grid grid-cols-3 gap-1 py-1.5 border-y border-gray-100 mb-2.5 text-[9.5px] sm:text-[10px] font-bold text-gray-700">
                        <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1 px-1 rounded-md" title={car.seats}>
                          <Users className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">{car.seats}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1 px-1 rounded-md" title={car.acType}>
                          <Wind className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">{car.acType}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1 bg-gray-50 py-1 px-1 rounded-md" title={car.luggage}>
                          <Briefcase className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">{car.luggage === 'Rooftop Carrier' ? 'Roof Carrier' : car.luggage}</span>
                        </div>
                      </div>

                      {/* Mini Trip Tariff Indicator */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-1 mb-2 text-[10px] flex items-center justify-between">
                        <span className="font-bold text-slate-700">
                          {tripType === 'Round Trip' ? '🔄 Round Trip' : '➡️ One Way Drop'}
                        </span>
                        <span className="font-black text-amber-800">
                          {car.rateText}
                        </span>
                      </div>

                      {/* Features List (Short & compact) */}
                      <ul className="space-y-1 mb-2.5">
                        {car.features.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="flex items-start text-[10px] sm:text-[11px] font-medium text-gray-600">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button: Single Full-Width Book Now */}
                    <div className="pt-2.5 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenBookingModal) {
                            onOpenBookingModal({
                              vehicle: car.name,
                              serviceType: `${tripType} Rental`,
                              fare: car.rateText
                            });
                          } else {
                            window.location.href = `tel:${CONTACT_INFO.primaryPhoneRaw}`;
                          }
                        }}
                        className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-slate-950 py-2 sm:py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer border border-amber-300/60"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0 text-slate-950" />
                        <span>Book Now</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dot Indicators */}
          {maxIndex > 0 && (
            <div className="flex items-center justify-center space-x-1.5 mt-5">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-6 bg-gradient-to-r from-amber-500 to-yellow-500' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}