import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Navigation, Compass, MapPin, Clock, Route, Loader2 } from 'lucide-react';

// Pre-configured coordinates for AP, Telangana & South India hubs
export const CITY_COORDS = {
  // Guntur & local surrounding mandals
  'guntur': { lat: 16.3067, lng: 80.4365, label: 'Guntur City' },
  'pedakakani': { lat: 16.3403, lng: 80.4936, label: 'Pedakakani Temple' },
  'mangalagiri': { lat: 16.4300, lng: 80.5700, label: 'Mangalagiri' },
  'aiims': { lat: 16.4422, lng: 80.5658, label: 'AIIMS Mangalagiri' },
  'amaravati': { lat: 16.5131, lng: 80.5165, label: 'Amaravati Capital' },
  'velagapudi': { lat: 16.5312, lng: 80.5284, label: 'Velagapudi Secretariat' },
  'tenali': { lat: 16.2430, lng: 80.6400, label: 'Tenali Town' },
  'chilakaluripet': { lat: 16.0892, lng: 80.1672, label: 'Chilakaluripet' },
  'narasaraopet': { lat: 16.2361, lng: 80.0499, label: 'Narasaraopet' },
  'bapatla': { lat: 15.9042, lng: 80.4674, label: 'Bapatla' },
  'suryalanka': { lat: 15.8600, lng: 80.5100, label: 'Suryalanka Beach' },
  'chirala': { lat: 15.8246, lng: 80.3521, label: 'Chirala' },
  'kotappakonda': { lat: 16.1478, lng: 80.0544, label: 'Kotappakonda' },

  // Vijayawada region
  'vijayawada': { lat: 16.5062, lng: 80.6480, label: 'Vijayawada' },
  'gannavaram': { lat: 16.5304, lng: 80.7968, label: 'Gannavaram Airport (VGA)' },
  'benz circle': { lat: 16.4988, lng: 80.6558, label: 'Benz Circle' },
  'eluru': { lat: 16.7107, lng: 81.0952, label: 'Eluru' },

  // Major Outstation destinations
  'hyderabad': { lat: 17.3850, lng: 78.4867, label: 'Hyderabad' },
  'secunderabad': { lat: 17.4399, lng: 78.4983, label: 'Secunderabad' },
  'shamshabad': { lat: 17.2403, lng: 78.4294, label: 'RGIA Airport Shamshabad' },
  'tirupati': { lat: 13.6288, lng: 79.4192, label: 'Tirupati' },
  'tirumala': { lat: 13.6833, lng: 79.3472, label: 'Tirumala Balaji' },
  'srisailam': { lat: 16.0736, lng: 78.8686, label: 'Srisailam Jyotirlinga' },
  'visakhapatnam': { lat: 17.6868, lng: 83.2185, label: 'Visakhapatnam' },
  'vizag': { lat: 17.6868, lng: 83.2185, label: 'Visakhapatnam' },
  'araku': { lat: 18.3273, lng: 82.8775, label: 'Araku Valley' },
  'rajahmundry': { lat: 17.0005, lng: 81.8040, label: 'Rajahmundry' },
  'kakinada': { lat: 16.9891, lng: 82.2475, label: 'Kakinada' },
  'bhimavaram': { lat: 16.5449, lng: 81.5212, label: 'Bhimavaram' },
  'ongole': { lat: 15.5057, lng: 80.0499, label: 'Ongole' },
  'nellore': { lat: 14.4426, lng: 79.9865, label: 'Nellore' },
  'kurnool': { lat: 15.8281, lng: 78.0373, label: 'Kurnool' },
  'anantapur': { lat: 14.6819, lng: 77.6006, label: 'Anantapur' },
  'kadapa': { lat: 14.4673, lng: 78.8242, label: 'Kadapa' },
  'warangal': { lat: 17.9689, lng: 79.5941, label: 'Warangal' },
  'khammam': { lat: 17.2473, lng: 80.1514, label: 'Khammam' },
  'bhadrachalam': { lat: 17.6689, lng: 80.8936, label: 'Bhadrachalam' },
  'chennai': { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
  'bengaluru': { lat: 12.9716, lng: 77.5946, label: 'Bengaluru' },
  'bangalore': { lat: 12.9716, lng: 77.5946, label: 'Bengaluru' },
  'shirdi': { lat: 19.7667, lng: 74.4764, label: 'Shirdi' },
  'goa': { lat: 15.2993, lng: 74.1240, label: 'Goa' }
};

// Haversine fallback distance formula (in KM)
function calculateHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;
  // Apply Indian highway road-winding multiplier (~1.25x)
  return Math.max(5, Math.round(straightKm * 1.25));
}

// Find coordinates from string or online search
async function resolveLocationCoords(query, fallbackLat = 16.3067, fallbackLng = 80.4365) {
  if (!query || typeof query !== 'string') {
    return { lat: fallbackLat, lng: fallbackLng, name: 'Location' };
  }
  const clean = query.trim().toLowerCase();

  // 1. Direct dictionary match
  for (const [key, val] of Object.entries(CITY_COORDS)) {
    if (clean.includes(key)) {
      return { lat: val.lat, lng: val.lng, name: val.label };
    }
  }

  // 2. Online Geocoding via OpenStreetMap Nominatim
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=json&limit=1`,
      {
        signal: controller.signal,
        headers: { 'User-Agent': 'SriVenkateswaraTravels/1.0' }
      }
    );
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          name: data[0].display_name.split(',')[0]
        };
      }
    }
  } catch (err) {
    // fallback
  }

  return { lat: fallbackLat, lng: fallbackLng, name: query.split(',')[0] };
}

export default function RouteMapVisualizer({
  pickup = 'Guntur',
  destination = 'Hyderabad',
  tripType = 'One Way',
  onDistanceChange
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [routeData, setRouteData] = useState({
    distanceKm: 280,
    durationText: '~4.5 Hrs',
    loading: false
  });

  // 1. Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [16.3067, 80.4365],
        zoom: 8,
        scrollWheelZoom: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Attribution small banner at bottom
      L.control
        .attribution({
          position: 'bottomright',
          prefix: '<span class="text-[9px] text-slate-500">Leaflet | &copy; OpenStreetMap</span>'
        })
        .addTo(map);

      mapInstanceRef.current = map;
      routeLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Fetch Route & Update Map when Pickup or Destination changes
  useEffect(() => {
    let isCancelled = false;

    async function updateRoute() {
      if (!mapInstanceRef.current) return;

      setRouteData((prev) => ({ ...prev, loading: true }));

      // Resolve coordinates
      const pCoords = await resolveLocationCoords(pickup, 16.3067, 80.4365); // default Guntur
      const dCoords = await resolveLocationCoords(destination, 17.3850, 78.4867); // default Hyderabad

      if (isCancelled) return;

      let roadCoords = [];
      let distKm = 0;
      let durationStr = '';

      // Try OSRM Real Road Routing
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2800);
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pCoords.lng},${pCoords.lat};${dCoords.lng},${dCoords.lat}?overview=full&geometries=geojson`;

        const res = await fetch(osrmUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (res.ok) {
          const json = await res.json();
          if (json.routes && json.routes.length > 0) {
            const r = json.routes[0];
            distKm = Math.round(r.distance / 1000);
            roadCoords = r.geometry.coordinates.map((c) => [c[1], c[0]]); // reverse to [lat, lng]

            const durMinutes = Math.round(r.duration / 60);
            if (durMinutes < 60) {
              durationStr = `~${durMinutes} Mins`;
            } else {
              const hrs = (durMinutes / 60).toFixed(1);
              durationStr = `~${hrs} Hrs`;
            }
          }
        }
      } catch (e) {
        // OSRM failed or timed out -> Fallback to Haversine
      }

      // Fallback if OSRM failed
      if (distKm === 0) {
        distKm = calculateHaversine(pCoords.lat, pCoords.lng, dCoords.lat, dCoords.lng);
        // Straight line + slight midpoint curve
        const midLat = (pCoords.lat + dCoords.lat) / 2 + 0.05;
        const midLng = (pCoords.lng + dCoords.lng) / 2 - 0.05;
        roadCoords = [
          [pCoords.lat, pCoords.lng],
          [midLat, midLng],
          [dCoords.lat, dCoords.lng]
        ];

        const estHours = (distKm / 55).toFixed(1);
        durationStr = distKm < 40 ? `~${Math.round((distKm / 35) * 60)} Mins` : `~${estHours} Hrs`;
      }

      if (isCancelled) return;

      setRouteData({
        distanceKm: distKm,
        durationText: durationStr,
        loading: false
      });

      // Notify parent to dynamically calculate fare based on exact KM!
      if (onDistanceChange) {
        onDistanceChange(distKm, durationStr);
      }

      // Draw markers and polyline on map
      const map = mapInstanceRef.current;
      if (markersLayerRef.current) markersLayerRef.current.clearLayers();
      if (routeLayerRef.current) routeLayerRef.current.clearLayers();

      // Custom Pickup Marker Icon
      const pickupIcon = L.divIcon({
        className: 'custom-pickup-marker',
        html: `<div style="background-color: #10b981; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.4); border: 2.5px solid white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
        </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      // Custom Destination Marker Icon
      const dropIcon = L.divIcon({
        className: 'custom-drop-marker',
        html: `<div style="background-color: #f59e0b; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(245,158,11,0.5); border: 2.5px solid white;">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#090d16" stroke-width="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0c.3-.3 7.3-6.4 7.3-11.8a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3" fill="#090d16"/></svg>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      const pMarker = L.marker([pCoords.lat, pCoords.lng], { icon: pickupIcon }).bindPopup(
        `<div class="p-1 font-bold text-xs"><strong>📍 Pickup:</strong><br/>${pickup}</div>`
      );
      const dMarker = L.marker([dCoords.lat, dCoords.lng], { icon: dropIcon }).bindPopup(
        `<div class="p-1 font-bold text-xs"><strong>🏁 Destination:</strong><br/>${destination}</div>`
      );

      markersLayerRef.current.addLayer(pMarker);
      markersLayerRef.current.addLayer(dMarker);

      // Draw Road Route Polyline (Green line with dark edge)
      const polylineBg = L.polyline(roadCoords, {
        color: '#064e3b',
        weight: 6,
        opacity: 0.8
      });
      const polylineMain = L.polyline(roadCoords, {
        color: '#10b981',
        weight: 4,
        opacity: 1
      });

      routeLayerRef.current.addLayer(polylineBg);
      routeLayerRef.current.addLayer(polylineMain);

      // Auto-fit bounds with padding
      const group = L.featureGroup([pMarker, dMarker, polylineMain]);
      map.fitBounds(group.getBounds(), { padding: [40, 40], maxZoom: 13 });
    }

    updateRoute();

    return () => {
      isCancelled = true;
    };
  }, [pickup, destination]);

  return (
    <div className="bg-[#0b1120] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl space-y-0 text-white relative">
      
      {/* Visualizer Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-[#070b14] via-[#0f172a] to-[#161f36] border-b border-amber-500/20 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white flex items-center gap-2">
              <span>Route &amp; Distance Live Visualizer</span>
              {routeData.loading && (
                <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              )}
            </div>
            <div className="text-[11px] text-amber-400/80 font-medium">
              Real-time GPS Distance Tracking
            </div>
          </div>
        </div>

        <span className="bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm shrink-0">
          {tripType === 'Round Trip' ? '🔄 Round Trip' : '➡️ One Way Drop'}
        </span>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div className="relative">
        <div 
          ref={mapContainerRef} 
          className="h-64 sm:h-72 w-full z-0 bg-slate-900"
          style={{ minHeight: '260px' }}
        />

        {/* Small floating map badge */}
        <div className="absolute top-3 left-3 z-10 bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg pointer-events-none flex items-center gap-1.5 shadow-md">
          <Route className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive GPS Route</span>
        </div>
      </div>

      {/* Bottom Route Trajectory Strip (Exact replica of User's screenshot) */}
      <div className="bg-[#070b14] px-5 py-3.5 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        
        {/* Left: Route Trajectory Name */}
        <div className="space-y-0.5 min-w-0">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Route Trajectory</span>
          </div>
          <div className="font-extrabold text-sm text-white truncate max-w-xs sm:max-w-sm">
            {pickup} → {destination}
          </div>
        </div>

        {/* Right: Distance & Travel Time Stats */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {tripType === 'Round Trip' ? 'Round Trip Dist' : 'One Way Dist'}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-400">
              {tripType === 'Round Trip' ? routeData.distanceKm * 2 : routeData.distanceKm} KM
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Est. Time
            </span>
            <span className="text-base sm:text-lg font-black text-amber-300">
              {routeData.durationText}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

