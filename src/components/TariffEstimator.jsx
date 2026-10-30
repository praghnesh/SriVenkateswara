import React, { useState } from 'react';
import { Calculator, CheckCircle2, ShieldAlert, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { TARIFF_TABLE_DATA } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function TariffEstimator() {
  const [selectedVehicle, setSelectedVehicle] = useState('Swift Dzire');
  const [distance, setDistance] = useState(250);

  const vehicleRates = {
    'Swift Dzire': { rate: 12, batta: 400, label: 'Swift Dzire Sedan — ₹12 / Km' },
    'Maruti Ertiga': { rate: 15, batta: 400, label: 'Maruti Ertiga (6+1) — ₹15 / Km' },
    'Kia Carens': { rate: 16, batta: 400, label: 'Kia Carens (6+1) — ₹16 / Km' },
    'Toyota Innova': { rate: 18, batta: 400, label: 'Toyota Innova (7+1) — ₹18 / Km' },
    'Innova Crysta': { rate: 21, batta: 500, label: 'Innova Crysta Luxury — ₹21 / Km' },
    'Tempo Traveller': { rate: 26, batta: 600, label: 'Tempo Traveller (12/17s) — ₹26 / Km' }
  };

  const currentInfo = vehicleRates[selectedVehicle] || vehicleRates['Swift Dzire'];
  const runningFare = distance * currentInfo.rate;
  const driverBatta = currentInfo.batta;
  const totalFare = runningFare + driverBatta;

  const handleLockIn = () => {
    const message = `*ESTIMATED FARE LOCK-IN REQUEST* 🚗
*Sri Venkateswara Car Travels*

• *Vehicle:* ${selectedVehicle}
• *Approx Distance:* ${distance} Kms
• *Estimated Total Fare:* ₹${totalFare.toLocaleString('en-IN')} (incl. Driver Batta: ₹${driverBatta})
• *Per Km Rate:* ₹${currentInfo.rate}/km

Hello, I would like to reserve this vehicle for my upcoming trip with this tariff estimate. Please confirm availability.`;

    openWhatsApp(message);
  };

  return (
    <section className="py-20 lg:py-28 bg-white" id="tariff">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center bg-blue-50 border border-blue-200/60 px-4 py-1.5 rounded-full text-blue-700 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4 mr-2" />
            100% Transparent Rates
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Instant Fare Estimator &amp; Tariff
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            No surge charges, no hidden night add-ons. Calculate your trip estimate instantly with complete peace of mind.
          </p>
        </div>

        {/* Live Interactive Calculator Box */}
        <div className="max-w-5xl mx-auto bg-slate-50 border border-gray-100 rounded-[2.5rem] p-8 lg:p-12 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: User Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Estimate Your Outstation Trip Fare
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Select your vehicle and slide to adjust your estimated one-way or round-trip kilometers.
                </p>
              </div>

              {/* Vehicle Dropdown */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider" htmlFor="calcVehicle">
                  Choose Vehicle Type
                </label>
                <select
                  id="calcVehicle"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                >
                  {Object.entries(vehicleRates).map(([name, info]) => (
                    <option key={name} value={name}>
                      {info.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Distance Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider" htmlFor="calcDistance">
                    Estimated Journey Distance
                  </label>
                  <span className="text-xl font-black text-blue-600 bg-blue-50 px-3.5 py-1 rounded-xl">
                    {distance} Kms
                  </span>
                </div>

                <input
                  type="range"
                  id="calcDistance"
                  min="50"
                  max="1000"
                  step="10"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                  <span>50 Kms</span>
                  <span>300 Kms (Std Outstation)</span>
                  <span>600 Kms</span>
                  <span>1000+ Kms</span>
                </div>
              </div>

              {/* Guarantee bullets */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center text-xs font-semibold text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>No Surge / Peak Hours</span>
                </div>
                <div className="flex items-center text-xs font-semibold text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>GST Bill Available</span>
                </div>
              </div>
            </div>

            {/* Right: Price Receipt Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] p-7 sm:p-8 shadow-xl shadow-blue-500/20 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Trip Estimate</span>
                <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">All-Inclusive</span>
              </div>

              <div>
                <div className="text-xs text-blue-200 font-medium mb-1">Estimated Total Fare</div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  ₹{totalFare.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-blue-200 mt-1">
                  Based on ₹{currentInfo.rate}/km rate + Driver Batta
                </div>
              </div>

              <div className="space-y-2.5 bg-black/15 backdrop-blur-xs rounded-xl p-4 text-xs">
                <div className="flex justify-between text-blue-100">
                  <span>Running Distance ({distance} km @ ₹{currentInfo.rate}):</span>
                  <span className="font-bold text-white">₹{runningFare.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-blue-100">
                  <span>Driver Allowance (Batta):</span>
                  <span className="font-bold text-white">₹{driverBatta}</span>
                </div>
                <div className="flex justify-between text-blue-100 pt-2 border-t border-white/10">
                  <span>Tolls &amp; Parking:</span>
                  <span className="text-amber-300 font-bold">As per actuals</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLockIn}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-emerald-500/30 hover:scale-[1.02] text-sm"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Lock In Fare on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>

        {/* Complete Standard Tariff Table */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-black text-gray-900">Official Fleet Tariff Master Table</h3>
            <p className="text-xs text-gray-500 mt-1">Standard tariffs valid for all Guntur &amp; Vijayawada bookings</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Vehicle Model</th>
                  <th className="py-4 px-6 font-bold">Seating</th>
                  <th className="py-4 px-6 font-bold">Outstation Rate</th>
                  <th className="py-4 px-6 font-bold">Local Package (8h/80km)</th>
                  <th className="py-4 px-6 font-bold">Extra Km</th>
                  <th className="py-4 px-6 font-bold">Driver Batta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {TARIFF_TABLE_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-900">{row.model}</td>
                    <td className="py-4 px-6 font-semibold text-gray-600">{row.seating}</td>
                    <td className="py-4 px-6 font-black text-blue-600">{row.outstationRate}</td>
                    <td className="py-4 px-6 font-semibold text-gray-800">{row.localPackage}</td>
                    <td className="py-4 px-6 font-medium text-gray-500">{row.extraKm}</td>
                    <td className="py-4 px-6 font-semibold text-gray-700">{row.batta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
