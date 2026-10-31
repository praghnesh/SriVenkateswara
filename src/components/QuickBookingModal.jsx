import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Car, Calendar, MapPin, Navigation, User, Phone, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { sendModalReservation } from '../utils/whatsapp';
import LocationInput from './LocationInput';

export default function QuickBookingModal({ isOpen, onClose, bookingData = null, initialVehicle = '' }) {
  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: 'Guntur / Vijayawada',
    drop: '',
    car: 'Maruti Swift Dzire Sedan',
    date: tomorrow(),
    serviceType: '',
    tourPackage: '',
    fare: '',
    hoursPackage: ''
  });

  useEffect(() => {
    if (bookingData) {
      setFormData((prev) => ({
        ...prev,
        tourPackage: bookingData.tourPackage || bookingData.title || '',
        serviceType: bookingData.serviceType || (bookingData.tourPackage ? 'Tour Package' : ''),
        fare: bookingData.fare || bookingData.farePrice || bookingData.approxFare || '',
        drop: bookingData.destination || bookingData.drop || bookingData.tourPackage || bookingData.title || prev.drop,
        pickup: bookingData.pickup || 'Guntur / Vijayawada',
        car: bookingData.vehicle || bookingData.car || (initialVehicle || prev.car),
        date: bookingData.date || tomorrow(),
        hoursPackage: bookingData.hoursPackage || ''
      }));
    } else if (initialVehicle) {
      setFormData((prev) => ({ ...prev, car: initialVehicle }));
    }
  }, [bookingData, initialVehicle, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendModalReservation(formData);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl p-4 sm:p-5 max-w-md w-full shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header: Title on Left, CLEAR PROMINENT CLOSE BUTTON on Right */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-blue-700 tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Instant Dispatch Booking</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight truncate">
              Confirm Your Booking
            </h3>
          </div>

          {/* Cross Button: Always clearly visible in the header */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shrink-0 border border-slate-200 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Compact Pre-filled Tour / Service Strip */}
        {(formData.tourPackage || formData.serviceType || formData.fare || formData.hoursPackage) && (
          <div className="mb-2.5 px-3 py-1.5 bg-blue-50/80 rounded-xl border border-blue-200/70 flex items-center justify-between gap-2 text-xs">
            <div className="truncate">
              <span className="text-[9.5px] text-blue-700 font-bold uppercase block leading-none">
                {formData.tourPackage ? 'Tour Package' : formData.serviceType || 'Service'}
              </span>
              <span className="font-black text-slate-900 truncate block text-xs mt-0.5">
                {formData.tourPackage || formData.hoursPackage || formData.drop || 'Custom Trip'}
              </span>
            </div>

            {formData.fare && (
              <div className="text-right shrink-0 bg-white px-2 py-0.5 rounded-lg border border-amber-200 shadow-2xs">
                <span className="text-[8.5px] text-slate-400 font-bold block uppercase leading-none">Est. Fare</span>
                <span className="text-xs font-black text-amber-600">
                  {typeof formData.fare === 'number' ? `₹${formData.fare.toLocaleString()}` : formData.fare}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">

          {/* Row 1: Name & Phone (2-column on mobile) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block" htmlFor="modalCustName">
                Your Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  id="modalCustName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block" htmlFor="modalCustPhone">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="tel"
                  id="modalCustPhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="63094xxxxx"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Pickup Point & Destination (2-column on sm, stacked on xs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Pickup Point / Pincode
              </label>
              <LocationInput
                value={formData.pickup}
                onChange={(val) => setFormData((prev) => ({ ...prev, pickup: val }))}
                placeholder="e.g. 522002, Guntur"
                icon={MapPin}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Destination / Drop Point
              </label>
              <LocationInput
                value={formData.drop}
                onChange={(val) => setFormData((prev) => ({ ...prev, drop: val }))}
                placeholder="e.g. Tirupati, Hyderabad"
                icon={Navigation}
                required
              />
            </div>
          </div>

          {/* Row 3: Vehicle Select & Journey Date (2-column on mobile) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block" htmlFor="modalCarSelect">
                Select Vehicle
              </label>
              <div className="relative">
                <Car className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-2.5 pointer-events-none" />
                <select
                  id="modalCarSelect"
                  name="car"
                  value={formData.car}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
                >
                  <option value="Maruti Swift Dzire Sedan">Swift Dzire (4+1)</option>
                  <option value="Toyota Etios">Toyota Etios (4+1)</option>
                  <option value="Maruti Suzuki Ciaz">Maruti Ciaz (4+1)</option>
                  <option value="Maruti Suzuki Ertiga">Ertiga (6+1)</option>
                  <option value="Kia Carens">Kia Carens (6+1)</option>
                  <option value="Toyota Innova Classic">Innova Classic (7+1)</option>
                  <option value="Toyota Innova Crysta">Innova Crysta (7+1)</option>
                  <option value="Force Tempo Traveller">Tempo Traveller (12-26s)</option>
                  <option value="Force Urbania Luxury Van">Force Urbania VIP (10-17s)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block" htmlFor="modalTravelDate">
                Travel Date
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="date"
                  id="modalTravelDate"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Submit Action */}
          <div className="pt-1.5">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black py-2.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-md shadow-emerald-600/30 text-xs sm:text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              <span>Confirm &amp; Book on WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Zero advance required • Direct driver dispatch</span>
          </div>

        </form>

      </div>
    </div>
  );
}
