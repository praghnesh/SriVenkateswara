import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Navigation, X, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { searchLocations } from '../data/locationData';

export default function SearchableLocationSelect({
  label,
  icon: Icon = MapPin,
  value,
  onChange,
  placeholder = 'Type to search city, area or landmark...',
  options = [],
  isDestination = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync internal search input with value when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery(value || '');
    }
  }, [value, isOpen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        // If query was modified but not selected, commit or revert
        if (searchQuery.trim() && searchQuery.trim() !== value) {
          onChange(searchQuery.trim());
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery, value, onChange]);

  // Filter options based on query
  const cleanQ = searchQuery.trim().toLowerCase();

  const filteredPresetOptions = cleanQ
    ? options.filter((opt) => {
        const nameMatch = opt.name.toLowerCase().includes(cleanQ);
        const labelMatch = opt.label && opt.label.toLowerCase().includes(cleanQ);
        const stateMatch = opt.state && opt.state.toLowerCase().includes(cleanQ);
        const tagMatch = opt.tag && opt.tag.toLowerCase().includes(cleanQ);
        const areaMatch = opt.area && opt.area.toLowerCase().includes(cleanQ);
        return nameMatch || labelMatch || stateMatch || tagMatch || areaMatch;
      })
    : options;

  // Additional match from location database if user types 2+ characters
  const dbLocations = cleanQ.length >= 2 ? searchLocations(cleanQ) : [];
  // Exclude dbLocations already represented in preset options
  const filteredDbLocations = dbLocations.filter((dbLoc) => {
    return !filteredPresetOptions.some(
      (opt) => opt.name.toLowerCase() === dbLoc.city.toLowerCase() || opt.name.toLowerCase() === dbLoc.area.toLowerCase()
    );
  });

  const handleSelect = (name) => {
    onChange(name);
    setSearchQuery(name);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const hasExactMatch = options.some(
    (opt) => opt.name.toLowerCase() === cleanQ || (opt.label && opt.label.toLowerCase() === cleanQ)
  );

  return (
    <div ref={containerRef} className="space-y-1.5 relative">
      {label && (
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-amber-600" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-amber-600 font-semibold lowercase tracking-normal">
            (type to search)
          </span>
        </label>
      )}

      {/* Input container */}
      <div 
        className={`relative flex items-center bg-slate-50 border rounded-xl transition-all ${
          isOpen 
            ? 'ring-2 ring-amber-500 border-amber-500 bg-white shadow-sm' 
            : 'border-gray-200 hover:border-amber-400'
        }`}
      >
        <div className="pl-3 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4 text-amber-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (filteredPresetOptions.length > 0) {
                handleSelect(filteredPresetOptions[0].name);
              } else if (cleanQ) {
                handleSelect(searchQuery.trim());
              }
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          className="w-full bg-transparent py-2.5 px-2.5 text-sm text-gray-900 font-bold placeholder-gray-400 focus:outline-none"
        />

        {/* Clear button or Chevron */}
        <div className="flex items-center pr-2.5 gap-1">
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear search"
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-400 hover:text-amber-600 rounded-full transition-colors cursor-pointer"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Floating Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header count info */}
          <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between sticky top-0 z-10 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-amber-700">
              <Icon className="w-3 h-3 text-amber-500" />
              <span>{cleanQ ? `Search Results (${filteredPresetOptions.length + filteredDbLocations.length})` : 'Popular Locations (Select or Type)'}</span>
            </span>
            <span className="text-slate-400 font-normal lowercase">click to select</span>
          </div>

          {/* Option to use custom typed text if not an exact match */}
          {cleanQ && !hasExactMatch && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(searchQuery.trim())}
              className="w-full text-left px-3.5 py-2.5 bg-amber-50/70 hover:bg-amber-100/80 transition-colors flex items-center justify-between gap-2 border-b border-amber-200/60 cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 truncate">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span className="truncate">
                  Use custom: <span className="underline decoration-amber-500 font-black">"{searchQuery.trim()}"</span>
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded shrink-0">
                Custom Place
              </span>
            </button>
          )}

          {/* Preset options */}
          {filteredPresetOptions.map((opt) => {
            const isSelected = value && (value.toLowerCase() === opt.name.toLowerCase() || (opt.label && value.toLowerCase() === opt.label.toLowerCase()));

            return (
              <button
                key={opt.name}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt.name)}
                className={`w-full text-left px-3.5 py-2.5 hover:bg-amber-50 transition-colors flex items-center justify-between gap-2 cursor-pointer group ${
                  isSelected ? 'bg-amber-50/90 font-bold' : ''
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-amber-600' : 'text-slate-400 group-hover:text-amber-500'
                  }`} />
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 truncate flex items-center gap-1.5">
                      <span>{opt.name}</span>
                      {opt.state && (
                        <span className="text-[10px] font-normal text-slate-400">
                          ({opt.state})
                        </span>
                      )}
                      {opt.tag && (
                        <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800">
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    {opt.area && (
                      <div className="text-[11px] text-slate-500 truncate">
                        {opt.area}
                      </div>
                    )}
                  </div>
                </div>

                {/* Distance Badge for destinations */}
                {isDestination && opt.distance && (
                  <div className="shrink-0 flex items-center gap-1.5">
                    <span className="bg-amber-100 text-amber-900 font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-200/70 shadow-2xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      ~{opt.distance} Kms
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </div>
                )}
                {!isDestination && isSelected && (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}

          {/* Database locations (Local areas, towns, pincodes) */}
          {filteredDbLocations.length > 0 && (
            <>
              <div className="px-3 py-1 bg-slate-100 text-[9.5px] font-black uppercase tracking-wider text-slate-500 sticky top-7 z-10">
                Pincodes &amp; Specific Areas in AP/Telangana
              </div>
              {filteredDbLocations.map((loc, idx) => (
                <button
                  key={`${loc.pincode}-${idx}`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(`${loc.area}, ${loc.city}`)}
                  className="w-full text-left px-3.5 py-2 hover:bg-amber-50 transition-colors flex items-center justify-between gap-2 cursor-pointer group"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-amber-700 truncate">
                        {loc.area}
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        {loc.city}, {loc.state}
                      </div>
                    </div>
                  </div>
                  {loc.pincode && (
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {loc.pincode}
                    </span>
                  )}
                </button>
              ))}
            </>
          )}

          {/* No results banner */}
          {filteredPresetOptions.length === 0 && filteredDbLocations.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-xs text-slate-500">
                No standard match for "{searchQuery}".
              </p>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(searchQuery.trim())}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-sm cursor-pointer"
              >
                <span>Set "{searchQuery.trim()}" as location</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

