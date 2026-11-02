import React, { useState } from 'react';
import { Calculator, CheckCircle2, ShieldAlert, ArrowRight, MessageSquare, Clock, Car } from 'lucide-react';
import { TARIFF_TABLE_DATA, HOURLY_RENTAL_TARIFFS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function TariffEstimator() {
  const [selectedVehicle, setSelectedVehicle] = useState('Swift Dzire');
  const [distance, setDistance] = useState(250);
  const [tariffTab, setTariffTab] = useState('hourly');

  const vehicleRates = {
    'Swift Dzire': { rate: 13, batta: 300, minKm: 350, label: 'Swift Dzire Sedan — ₹13 / Km' },
    'Toyota Etios': { rate: 13, batta: 300, minKm: 350, label: 'Toyota Etios Sedan — ₹13 / Km' },
    'Maruti Ciaz': { rate: 14, batta: 350, minKm: 350, label: 'Maruti Ciaz Executive — ₹14 / Km' },
    'Maruti Ertiga': { rate: 16, batta: 400, minKm: 400, label: 'Maruti Ertiga (6+1) — ₹16 / Km' },
    'Kia Carens': { rate: 18, batta: 500, minKm: 400, label: 'Kia Carens (6+1) — ₹18 / Km' },
    'Toyota Innova': { rate: 18, batta: 500, minKm: 400, label: 'Toyota Innova (7+1) — ₹18 / Km' },
    'Innova Crysta': { rate: 18, batta: 600, minKm: 400, label: 'Innova Crysta Luxury — ₹18 / Km' },
    'Tempo Traveller': { rate: 26, batta: 600, minKm: 400, label: 'Tempo Traveller (12/17s) — ₹26 / Km' },
    'Force Urbania': { rate: 32, batta: 700, minKm: 400, label: 'Force Urbania VIP (10/17s) — ₹32 / Km' }
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
          <div className="inline-flex items-center bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4 mr-2 text-amber-600" />
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
                  className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
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
                  <span className="text-xl font-black text-amber-700 bg-amber-50 px-3.5 py-1 rounded-xl border border-amber-200">
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
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
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

            {/* Right: Price Receipt Card with Obsidian & Gold Styling */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#070b14] via-[#0f172a] to-[#1e293b] border border-amber-500/30 text-white rounded-[2rem] p-7 sm:p-8 shadow-2xl shadow-amber-500/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Trip Estimate</span>
                <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full">All-Inclusive</span>
              </div>

              <div>
                <div className="text-xs text-slate-300 font-medium mb-1">Estimated Total Fare</div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                  ₹{totalFare.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Based on ₹{currentInfo.rate}/km rate + Driver Batta
                </div>
              </div>

              <div className="space-y-2.5 bg-black/40 border border-amber-500/15 backdrop-blur-xs rounded-xl p-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Running Distance ({distance} km @ ₹{currentInfo.rate}):</span>
                  <span className="font-bold text-white">₹{runningFare.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Driver Allowance (Batta):</span>
                  <span className="font-bold text-white">₹{driverBatta}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                  <span>Tolls &amp; Parking:</span>
                  <span className="text-amber-300 font-bold">As per actuals</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLockIn}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-4 px-6 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-amber-500/30 hover:scale-[1.02] text-sm cursor-pointer border border-amber-300/60"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-slate-950" />
                <span>Lock In Fare on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>

        {/* Complete Standard Tariff Table with Tabs */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Official Fleet Tariff Master Table</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">Standard transparent tariffs valid for all Guntur &amp; Vijayawada bookings</p>

            {/* Tariff Switcher Tabs */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mt-2">
              <button
                type="button"
                onClick={() => setTariffTab('hourly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${tariffTab === 'hourly'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <Clock className="w-4 h-4" />
                <span>Local Hourly Rentals (4h &amp; 8h)</span>
              </button>
              <button
                type="button"
                onClick={() => setTariffTab('outstation')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${tariffTab === 'outstation'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <Car className="w-4 h-4" />
                <span>Outstation Highway Rates</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Local Hourly Rentals Table (Royal Gold & Obsidian Theme) */}
          {tariffTab === 'hourly' && (
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
                      <th className="py-3.5 px-2 sm:px-3 border-r border-slate-800 whitespace-nowrap">Driver Bata</th>
                      <th className="py-3.5 px-3 whitespace-nowrap">Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOURLY_RENTAL_TARIFFS.map((row, idx) => {
                      const isAlternate = idx % 2 === 1;
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors border-t border-slate-200/70 ${isAlternate
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
                            <button
                              type="button"
                              onClick={() => {
                                const msg = `*HOURLY RENTAL BOOKING* ⏱️\n*Sri Venkateswara Car Travels*\n\n• *Vehicle:* ${row.vehicle}\n• *4h/40km:* ₹${row.fourHrsFortyKm}\n• *8h/100km:* ₹${row.eightHrsHundredKm}\n• *Extra Km:* ₹${row.extraKm}/km\n• *Extra Hr:* ₹${row.extraHr}/hr\n• *Driver Batta:* Included\n\nPlease confirm availability for local city use.`;
                                openWhatsApp(msg);
                              }}
                              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-sm border border-amber-300/40 cursor-pointer"
                            >
                              Reserve
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Notes Footer */}
              <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-200 text-slate-600 text-[11px] sm:text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Driver Beta (Batta) is 100% INCLUDED in all 4h &amp; 8h local packages.</span>
                </div>
                <div className="text-slate-500 pl-5">
                  • Toll gates, parking charges, and entry permits are not included and payable as per actuals.
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Outstation Highway Table */}
          {tariffTab === 'outstation' && (
            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-amber-300 text-xs uppercase tracking-wider border-b border-amber-500/30">
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
                    <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900">{row.model}</td>
                      <td className="py-4 px-6 font-semibold text-gray-600">{row.seating}</td>
                      <td className="py-4 px-6 font-black text-amber-600">{row.outstationRate}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">{row.localPackage}</td>
                      <td className="py-4 px-6 font-medium text-gray-500">{row.extraKm}</td>
                      <td className="py-4 px-6 font-semibold text-gray-700">{row.batta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
