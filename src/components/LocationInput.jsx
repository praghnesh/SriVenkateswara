import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { searchLocations } from '../data/locationData';

export default function LocationInput({
  value,
  onChange,
  placeholder = 'Enter city, area or pincode...',
  icon: Icon = MapPin,
  className = '',
  required = false,
  autoComplete = 'off'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value && value.trim().length >= 2) {
      const results = searchLocations(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc) => {
    // Format: "Dwaraka Nagar / RTC Complex, Visakhapatnam (530016)"
    const formatted = `${loc.area}, ${loc.city} (${loc.pincode})`;
    onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <Icon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={value}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => {
            if (value && value.trim().length >= 2) {
              setSuggestions(searchLocations(value));
              setIsOpen(true);
            }
          }}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
        />
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-64 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Matching Areas &amp; Pincodes</span>
            <span className="text-blue-600">{suggestions.length} Found</span>
          </div>

          {suggestions.map((loc, idx) => (
            <button
              key={`${loc.pincode}-${idx}`}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur
                handleSelect(loc);
              }}
              className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50/70 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate">
                    {loc.area}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {loc.city}, {loc.state}
                  </div>
                </div>
              </div>

              <span className="shrink-0 bg-blue-100/70 group-hover:bg-blue-600 group-hover:text-white text-blue-800 font-mono text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors">
                {loc.pincode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
