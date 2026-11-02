import React, { useState } from 'react';
import { Calculator, Clock, Car, MessageSquare, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { FLEET_VEHICLES, VEHICLE_TARIFF_DATA } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function CustomFareCalculator({ defaultMode = 'hourly' }) {
  const [calcMode, setCalcMode] = useState(defaultMode); // 'hourly' | 'outstation'
  const [vehicleId, setVehicleId] = useState('swift-dzire');

  // Hourly Mode States
  const [customHours, setCustomHours] = useState(8);
  const [customKm, setCustomKm] = useState(80);

  // Outstation Mode States
  const [outstationTripType, setOutstationTripType] = useState('Round Trip');
  const [outstationDays, setOutstationDays] = useState(1);
  const [outstationDistance, setOutstationDistance] = useState(400);

  const vehicle = FLEET_VEHICLES.find((v) => v.id === vehicleId) || FLEET_VEHICLES[0];
  const tariff = VEHICLE_TARIFF_DATA[vehicleId] || VEHICLE_TARIFF_DATA['swift-dzire'];

  // -------------------------------------------------------------
  // HOURLY / LOCAL CALCULATION LOGIC (Based on User's Exact Tariff)
  // -------------------------------------------------------------
  const parseNum = (str) => {
    if (!str || str === '—') return 0;
    return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
  };

  const base4hPrice = parseNum(tariff.localPackages.find((r) => r.label.includes('4 HRS'))?.value);
  const base8hPrice = parseNum(tariff.localPackages.find((r) => r.label.includes('8 HRS'))?.value);
  const extraHrRate = vehicle.extraHr || parseNum(tariff.localPackages.find((r) => r.label.includes('Extra Hour'))?.value) || 150;
  const extraKmRate = vehicle.extraKm || parseNum(tariff.localPackages.find((r) => r.label.includes('Extra Kms'))?.value) || 13;

  let hourlyBaseName = '8 HRS (80Km)';
  let hourlyBaseFare = base8hPrice;
  let extraHoursCharged = 0;
  let extraKmCharged = 0;

  if (base4hPrice > 0 && customHours <= 4 && customKm <= 40) {
    hourlyBaseName = '4 HRS (40Km)';
    hourlyBaseFare = base4hPrice;
    extraHoursCharged = 0;
    extraKmCharged = 0;
  } else if (base4hPrice > 0 && customHours <= 6 && customKm <= 60) {
    // 6h package calculation from 4h base
    hourlyBaseName = '4 HRS Base + Extra Usage';
    hourlyBaseFare = base4hPrice;
    extraHoursCharged = Math.max(0, customHours - 4);
    extraKmCharged = Math.max(0, customKm - 40);
  } else {
    // 8h base package
    hourlyBaseName = '8 HRS (80Km) Base';
    hourlyBaseFare = base8hPrice;
    extraHoursCharged = Math.max(0, customHours - 8);
    extraKmCharged = Math.max(0, customKm - 80);
  }

  const extraHoursCost = extraHoursCharged * extraHrRate;
  const extraKmCost = extraKmCharged * extraKmRate;
  const totalHourlyFare = hourlyBaseFare + extraHoursCost + extraKmCost;

  // -------------------------------------------------------------
  // OUTSTATION CALCULATION LOGIC (Based on User's Exact Tariff)
  // -------------------------------------------------------------
  const minKmPerDay = vehicle.minKm || (vehicle.category === 'sedan' ? 350 : 400);
  const outstationRatePerKm = vehicle.ratePerKm || 13;
  const driverBattaPerDay = vehicle.driverBatta || (vehicle.category === 'sedan' ? 300 : 400);
  const nightHaltRate = vehicle.nightHalt || (vehicle.category === 'sedan' ? 500 : 1000);

  const totalMinKm = outstationTripType === 'Round Trip' ? outstationDays * minKmPerDay : minKmPerDay;
  const billableDistance = Math.max(outstationDistance, totalMinKm);
  const outstationRunningFare = billableDistance * outstationRatePerKm;
  const totalDriverBatta = outstationDays * driverBattaPerDay;
  const totalNightHalt = outstationDays > 1 ? (outstationDays - 1) * nightHaltRate : 0;
  const totalOutstationFare = outstationRunningFare + totalDriverBatta + totalNightHalt;

  // -------------------------------------------------------------
  // WHATSAPP RESERVATION HANDLERS
  // -------------------------------------------------------------
  const handleBookHourly = () => {
    const msg = `*CUSTOM HOURLY RENTAL CALCULATION* ⏱️
*Sri Venkateswara Car Travels*

• *Vehicle:* ${vehicle.name} (${vehicle.categoryLabel})
• *Duration Needed:* ${customHours} Hours
• *Estimated Distance:* ${customKm} Kms
• *Base Package:* ${hourlyBaseName} (₹${hourlyBaseFare.toLocaleString('en-IN')})
${extraHoursCharged > 0 ? `• *Extra Hours:* ${extraHoursCharged} hrs @ ₹${extraHrRate}/hr = ₹${extraHoursCost.toLocaleString('en-IN')}\n` : ''}${extraKmCharged > 0 ? `• *Extra Kilometers:* ${extraKmCharged} kms @ ₹${extraKmRate}/km = ₹${extraKmCost.toLocaleString('en-IN')}\n` : ''}• *Driver Bata:* Included
• *Estimated Total Fare:* ₹${totalHourlyFare.toLocaleString('en-IN')}

Hello, I calculated this custom hourly rental package. Please confirm cab availability and driver details.`;
    openWhatsApp(msg);
  };

  const handleBookOutstation = () => {
    const msg = `*CUSTOM OUTSTATION ESTIMATE CALCULATION* 🚗
*Sri Venkateswara Car Travels*

• *Vehicle:* ${vehicle.name} (${vehicle.categoryLabel})
• *Trip Type:* ${outstationTripType} (${outstationDays} Day${outstationDays > 1 ? 's' : ''})
• *Total Travel Distance:* ~${billableDistance} Kms ${totalMinKm > outstationDistance ? `(Min ${minKmPerDay} km/day applied)` : ''}
• *KM Rate:* ₹${outstationRatePerKm}/km = ₹${outstationRunningFare.toLocaleString('en-IN')}
• *Driver Bata:* ${outstationDays} Day(s) @ ₹${driverBattaPerDay}/day = ₹${totalDriverBatta}
${totalNightHalt > 0 ? `• *Night Halt:* ${outstationDays - 1} Night(s) @ ₹${nightHaltRate}/night = ₹${totalNightHalt}\n` : ''}• *Estimated Total Outstation Fare:* ₹${totalOutstationFare.toLocaleString('en-IN')}

Hello, please check vehicle availability for this custom outstation trip.`;
    openWhatsApp(msg);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-lg">
      
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-amber-600" />
          <span>Universal Dynamic Fare Calculator</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Calculate Any Hours &amp; Any Kilometers
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Select your vehicle, slide to any required hours or highway distance, and get instant transparent billing based on our official tariff.
        </p>
      </div>

      {/* Main Mode Toggle: Hourly Local vs Outstation Highway */}
      <div className="flex items-center justify-center mb-8">
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-md w-full">
          <button
            type="button"
            onClick={() => setCalcMode('hourly')}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              calcMode === 'hourly'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Local &amp; Hourly Use</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('outstation')}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              calcMode === 'outstation'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Outstation Highway</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Vehicle Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Choose Vehicle
            </label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
            >
              {FLEET_VEHICLES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.categoryLabel}) — {v.rateText}
                </option>
              ))}
            </select>
          </div>

          {/* ======================================================== */}
          {/* MODE 1: HOURLY CONTROLS (Custom Hours & Custom KMs)     */}
          {/* ======================================================== */}
          {calcMode === 'hourly' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Hours Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Select Rental Hours Needed
                  </label>
                  <span className="text-base font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-lg">
                    {customHours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={customHours}
                  onChange={(e) => setCustomHours(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>2h</span>
                  <span>4h (Std Half-Day)</span>
                  <span>8h (Std Full-Day)</span>
                  <span>12h (Day Rent)</span>
                  <span>16h</span>
                  <span>24h</span>
                </div>
              </div>

              {/* Kilometers Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Estimated Distance
                  </label>
                  <span className="text-base font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-lg">
                    {customKm} Kms
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={customKm}
                  onChange={(e) => setCustomKm(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>20 Km</span>
                  <span>40 Km</span>
                  <span>80 Km</span>
                  <span>120 Km</span>
                  <span>200 Km</span>
                  <span>300 Km</span>
                </div>
              </div>

              {/* Quick Preset Pills */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Standard Popular Packages
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setCustomHours(4); setCustomKm(40); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customHours === 4 && customKm === 40 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    4 Hrs / 40 Kms
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCustomHours(6); setCustomKm(60); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customHours === 6 && customKm === 60 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    6 Hrs / 60 Kms
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCustomHours(8); setCustomKm(80); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customHours === 8 && customKm === 80 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    8 Hrs / 80 Kms
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCustomHours(10); setCustomKm(100); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customHours === 10 && customKm === 100 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    10 Hrs / 100 Kms
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCustomHours(12); setCustomKm(120); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customHours === 12 && customKm === 120 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    12 Hrs (Full Day)
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* MODE 2: OUTSTATION CONTROLS (Custom KMs & Days)          */}
          {/* ======================================================== */}
          {calcMode === 'outstation' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Trip Type & Days */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Trip Mode
                  </label>
                  <select
                    value={outstationTripType}
                    onChange={(e) => setOutstationTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Round Trip">Round Trip Journey</option>
                    <option value="One Way">One Way Drop</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Total Journey Days
                  </label>
                  <select
                    value={outstationDays}
                    onChange={(e) => setOutstationDays(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="1">1 Day Trip</option>
                    <option value="2">2 Days (1 Night Stay)</option>
                    <option value="3">3 Days (2 Nights Stay)</option>
                    <option value="4">4 Days (3 Nights Stay)</option>
                    <option value="5">5 Days (4 Nights Stay)</option>
                    <option value="7">7 Days (Full Week Tour)</option>
                  </select>
                </div>
              </div>

              {/* Outstation Distance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Total Estimated Distance
                  </label>
                  <span className="text-base font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-lg">
                    {outstationDistance} Kms
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="25"
                  value={outstationDistance}
                  onChange={(e) => setOutstationDistance(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>100 Km</span>
                  <span>350 Km (Min 1-Day)</span>
                  <span>700 Km (Min 2-Days)</span>
                  <span>1,050 Km</span>
                  <span>1,500+ Km</span>
                </div>
              </div>

              {/* Daily Minimum Notice */}
              <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80 text-xs text-amber-900 font-medium space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Outstation Commercial Minimum:</span>
                </div>
                <div>
                  • {vehicle.name} has a daily minimum average of <strong>{minKmPerDay} Kms/day</strong> ({outstationDays} day(s) = <strong>{totalMinKm} Kms min</strong>).
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Live Fare Receipt Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#070b14] via-[#0f172a] to-[#1e293b] border border-amber-500/30 rounded-3xl p-6 sm:p-7 text-white shadow-2xl shadow-amber-500/10 space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {calcMode === 'hourly' ? 'Local Rental Quote' : 'Outstation Quote'}
            </span>
            <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full">
              Transparent Tariff
            </span>
          </div>

          <div>
            <div className="text-xs text-slate-300 font-medium">Estimated Total Amount</div>
            <div className="text-4xl font-black bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent mt-1">
              ₹{(calcMode === 'hourly' ? totalHourlyFare : totalOutstationFare).toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {vehicle.name} • {calcMode === 'hourly' ? `${customHours} Hours & ${customKm} Kms` : `${billableDistance} Kms (${outstationDays} Day${outstationDays > 1 ? 's' : ''})`}
            </div>
          </div>

          {/* Breakdown Box */}
          <div className="space-y-2.5 bg-black/40 border border-amber-500/15 backdrop-blur-xs rounded-xl p-4 text-xs">
            {calcMode === 'hourly' ? (
              <>
                <div className="flex justify-between text-slate-300">
                  <span>Base Package ({hourlyBaseName}):</span>
                  <span className="font-bold text-white">₹{hourlyBaseFare.toLocaleString('en-IN')}</span>
                </div>
                {extraHoursCharged > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Extra Hours ({extraHoursCharged} hrs @ ₹{extraHrRate}/hr):</span>
                    <span className="font-bold text-amber-300">+₹{extraHoursCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {extraKmCharged > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Extra Kms ({extraKmCharged} km @ ₹{extraKmRate}/km):</span>
                    <span className="font-bold text-amber-300">+₹{extraKmCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300 pt-1.5 border-t border-white/10">
                  <span>Chauffeur Standby:</span>
                  <span className="text-emerald-400 font-bold">100% Included</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-slate-300">
                  <span>Running KMs ({billableDistance} km @ ₹{outstationRatePerKm}):</span>
                  <span className="font-bold text-white">₹{outstationRunningFare.toLocaleString('en-IN')}</span>
                </div>
                {totalMinKm > outstationDistance && (
                  <div className="text-[10px] text-amber-300/80">
                    * Min {minKmPerDay} km/day applied ({totalMinKm} km minimum for {outstationDays} day(s))
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Driver Bata ({outstationDays} day(s) @ ₹{driverBattaPerDay}):</span>
                  <span className="font-bold text-white">₹{totalDriverBatta.toLocaleString('en-IN')}</span>
                </div>
                {totalNightHalt > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Night Halt ({outstationDays - 1} night(s) @ ₹{nightHaltRate}):</span>
                    <span className="font-bold text-amber-300">₹{totalNightHalt.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300 pt-1.5 border-t border-white/10">
                  <span>Tolls &amp; Parking:</span>
                  <span className="text-amber-300 font-bold">As per actuals</span>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={calcMode === 'hourly' ? handleBookHourly : handleBookOutstation}
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black py-3.5 px-5 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-amber-500/25 active:scale-95 text-xs sm:text-sm cursor-pointer border border-amber-300/60"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Book This Estimate on WhatsApp</span>
          </button>

        </div>

      </div>

    </div>
  );
}
