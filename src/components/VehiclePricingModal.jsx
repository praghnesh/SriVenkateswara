import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VEHICLE_TARIFF_DATA, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function VehiclePricingModal({ isOpen, onClose, vehicleId = 'swift-dzire', initialTab = 'local' }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab); // 'local' | 'day' | 'outstation'

  if (!isOpen) return null;

  // Retrieve tariff data or fallback to Sedan
  const tariff = VEHICLE_TARIFF_DATA[vehicleId] || VEHICLE_TARIFF_DATA['swift-dzire'];
  const fleetInfo = FLEET_VEHICLES.find((v) => v.id === vehicleId) || FLEET_VEHICLES[0];

  const getRows = () => {
    if (activeTab === 'local') return tariff.localPackages;
    if (activeTab === 'day') return tariff.dayRental;
    return tariff.outstation;
  };

  const currentTabLabel = activeTab === 'local' ? 'Local Package' : activeTab === 'day' ? 'Day Rental' : 'Outstation Journey';

  const handleBookNow = () => {
    const rows = getRows();
    const rowsSummary = rows.map((r) => `• ${r.label}: ${r.value}`).join('\n');
    const msg = `*VEHICLE RESERVATION INQUIRY* 🚗\n*Sri Venkateswara Car Travels*\n\n• *Vehicle:* ${tariff.name} (${tariff.subtitle})\n• *Selected Tariff Plan:* ${currentTabLabel}\n\n*Tariff Details:*\n${rowsSummary}\n\nHello, I would like to book this vehicle with the above tariff. Please confirm vehicle availability and driver details.`;
    openWhatsApp(msg);
  };

  const handleViewFullPricing = () => {
    onClose();
    navigate('/tariff');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {tariff.name} – Pricing
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {tariff.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Pill Switcher Tabs matching screenshot */}
          <div className="flex items-center justify-center bg-slate-100 p-1.5 rounded-full max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('local')}
              className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === 'local'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Local Packages
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('day')}
              className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === 'day'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day Rental
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('outstation')}
              className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === 'outstation'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Outstation
            </button>
          </div>

          {/* Pricing Table Card matching screenshot */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
            {/* Dark Card Header */}
            <div className="bg-[#1e293b] text-white py-3 px-5 font-black text-sm tracking-wide">
              {tariff.name}
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100 bg-white">
              {getRows().map((row, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between py-3.5 px-5 hover:bg-slate-50/70 transition-colors"
                >
                  <span className="text-slate-600 text-xs sm:text-sm font-medium">
                    {row.label}
                  </span>
                  <span className="text-slate-900 text-sm sm:text-base font-black">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes / Terms */}
          <div className="text-[11px] text-slate-500 space-y-0.5 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
            <div className="font-bold text-amber-900">
              {activeTab === 'outstation' && '• Outstation charges calculated on minimum daily distance or actual KMs.'}
              {activeTab === 'day' && '• 12 Hours vehicle standby with dedicated professional chauffeur.'}
              {activeTab === 'local' && '• Chauffeur included in package. Tolls & parking as per actuals.'}
            </div>
          </div>

        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="p-5 sm:p-6 pt-3 border-t border-slate-100 flex items-center gap-3">
          <button
            type="button"
            onClick={handleBookNow}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Book Now</span>
          </button>

          <button
            type="button"
            onClick={handleViewFullPricing}
            className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
          >
            View Full Pricing
          </button>
        </div>

      </div>

    </div>
  );
}
