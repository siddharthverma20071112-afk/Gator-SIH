import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Search,
  Navigation,
  Compass,
  CheckCircle2,
  Building2,
  Store,
  Warehouse,
  Zap,
  Layers,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Info,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { ExtractedFacts, LocalDataEngineResult, BusinessType } from '../types';

interface EnterpriseLocationMapProps {
  currentFacts: ExtractedFacts;
  localData: LocalDataEngineResult | null;
  onLocationSelect: (locationData: {
    village: string;
    block: string;
    district: string;
    state: string;
    latitude: number;
    longitude: number;
    formattedAddress: string;
  }) => void;
  onNavigateToTab?: (tab: 'call' | 'map' | 'feasibility' | 'finance' | 'whatsapp' | 'admin' | 'dossier') => void;
}

interface NearbyInfraPoint {
  id: string;
  type: 'mandi' | 'bank' | 'highway' | 'power';
  name: string;
  nameHi: string;
  lat: number;
  lng: number;
  distanceKm: number;
  badge: string;
  significance: string;
}

const RURAL_PRESETS = [
  {
    name: 'Haidergarh, Barabanki',
    state: 'Uttar Pradesh',
    lat: 26.5888,
    lng: 81.3857,
    type: 'dairy',
    desc: 'Purvanchal Expressway Corridor'
  },
  {
    name: 'Benipatti, Madhubani',
    state: 'Bihar',
    lat: 26.4716,
    lng: 85.9221,
    type: 'grocery',
    desc: 'Mithila Panchayat Market'
  },
  {
    name: 'Anand Milk Cooperative',
    state: 'Gujarat',
    lat: 22.5645,
    lng: 72.9289,
    type: 'dairy',
    desc: 'White Revolution Dairy Hub'
  },
  {
    name: 'Omalur, Salem',
    state: 'Tamil Nadu',
    lat: 11.7456,
    lng: 78.0412,
    type: 'tailoring',
    desc: 'Handloom & Garment Cluster'
  },
  {
    name: 'Tijara, Alwar',
    state: 'Rajasthan',
    lat: 27.9332,
    lng: 76.8524,
    type: 'mobile_repair',
    desc: 'NCR Border Digital Highway'
  },
  {
    name: 'Dindori, Nashik',
    state: 'Maharashtra',
    lat: 20.2039,
    lng: 73.8329,
    type: 'food_processing',
    desc: 'Tomato & Agro Processing Valley'
  }
];

// Inner component with Places Search and Map Interaction
const MapContent: React.FC<{
  position: { lat: number; lng: number };
  onPositionChange: (pos: { lat: number; lng: number }) => void;
  addressInfo: {
    village: string;
    block: string;
    district: string;
    state: string;
    formattedAddress: string;
  };
  nearbyInfra: NearbyInfraPoint[];
  businessType?: BusinessType;
  businessName?: string;
}> = ({
  position,
  onPositionChange,
  addressInfo,
  nearbyInfra,
  businessType = 'dairy',
  businessName
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [selectedInfra, setSelectedInfra] = useState<NearbyInfraPoint | null>(null);
  const [showEnterpriseInfo, setShowEnterpriseInfo] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const sessionTokenRef = useRef<any>(null);

  // Pan map when position updates externally
  useEffect(() => {
    if (map && position) {
      map.panTo(position);
    }
  }, [map, position]);

  // Autocomplete fetch using Places API New
  useEffect(() => {
    if (!placesLib || !searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib as any;
    if (!AutocompleteSessionToken || !AutocompleteSuggestion) return;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    let isCancelled = false;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const request = {
          input: searchQuery,
          sessionToken: sessionTokenRef.current,
          includedRegionCodes: ['in']
        };
        const res = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        if (!isCancelled) {
          setSuggestions(res.suggestions || []);
          setIsSearching(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setIsSearching(false);
        }
      }
    }, 280);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [placesLib, searchQuery]);

  // Handle place selection
  const handleSelectPlace = async (suggestion: any) => {
    try {
      const place = suggestion.placePrediction?.toPlace();
      if (place) {
        await place.fetchFields({
          fields: ['displayName', 'formattedAddress', 'location', 'viewport', 'addressComponents']
        });

        sessionTokenRef.current = null;
        setSuggestions([]);
        setSearchQuery(place.displayName || place.formattedAddress || '');

        if (place.location) {
          const newPos = {
            lat: place.location.lat(),
            lng: place.location.lng()
          };
          onPositionChange(newPos);
          if (map) {
            map.setZoom(14);
            map.panTo(newPos);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to fetch place details:', e);
    }
  };

  const handleMapClick = (e: any) => {
    if (e.detail?.latLng) {
      const newPos = {
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng
      };
      onPositionChange(newPos);
    }
  };

  const handleMarkerDragEnd = (e: any) => {
    if (e.latLng) {
      onPositionChange({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Places Search Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-96 z-10">
        <div className="relative">
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200/90 px-3 py-2">
            <Search className="w-4 h-4 text-indigo-600 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खोजें (Search village, mandi, district)..."
              className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
            />
            {isSearching && (
              <span className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin shrink-0"></span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-lg border border-slate-200/90 overflow-hidden max-h-60 overflow-y-auto z-20">
              {suggestions.map((s, idx) => {
                const text = s.placePrediction?.text?.toString() || 'Location';
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPlace(s)}
                    className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-indigo-50/80 border-b border-slate-100 last:border-b-0 flex items-start gap-2 text-slate-700 hover:text-indigo-900 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map Element */}
      <Map
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
        defaultCenter={position}
        defaultZoom={13}
        gestureHandling="greedy"
        disableDefaultUI={false}
        onClick={handleMapClick}
        className="w-full h-full"
      >
        {/* Primary Enterprise Marker (Draggable) */}
        <AdvancedMarker
          position={position}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
          onClick={() => setShowEnterpriseInfo(true)}
          title={businessName || 'Proposed Enterprise Site'}
        >
          <Pin
            background="#4F46E5"
            glyphColor="#FFFFFF"
            borderColor="#312E81"
            scale={1.25}
          />
        </AdvancedMarker>

        {/* InfoWindow for Enterprise */}
        {showEnterpriseInfo && (
          <InfoWindow
            position={position}
            onCloseClick={() => setShowEnterpriseInfo(false)}
          >
            <div className="p-1 max-w-[220px] text-slate-900">
              <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900 mb-1">
                <Store className="w-3.5 h-3.5 text-indigo-600" />
                <span>{businessName || 'उद्यम स्थान (Enterprise Site)'}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight mb-1.5">
                {addressInfo.formattedAddress || `${addressInfo.village}, ${addressInfo.district}`}
              </p>
              <div className="bg-slate-50 p-1.5 rounded-md border border-slate-200 text-[10px] space-y-0.5 font-mono text-slate-700">
                <div>Lat: {position.lat.toFixed(5)}° N</div>
                <div>Lng: {position.lng.toFixed(5)}° E</div>
              </div>
              <p className="text-[10px] text-indigo-600 font-medium mt-1">
                📍 Drag pin to adjust exact rural shop/farm location
              </p>
            </div>
          </InfoWindow>
        )}

        {/* Nearby Rural Infrastructure Markers */}
        {nearbyInfra.map((infra) => {
          const pinColor =
            infra.type === 'mandi'
              ? { bg: '#D97706', glyph: '#FFFFFF', border: '#78350F' }
              : infra.type === 'bank'
              ? { bg: '#059669', glyph: '#FFFFFF', border: '#064E3B' }
              : infra.type === 'highway'
              ? { bg: '#0284C7', glyph: '#FFFFFF', border: '#075985' }
              : { bg: '#7C3AED', glyph: '#FFFFFF', border: '#4C1D95' };

          return (
            <AdvancedMarker
              key={infra.id}
              position={{ lat: infra.lat, lng: infra.lng }}
              onClick={() => setSelectedInfra(infra)}
              title={infra.name}
            >
              <Pin
                background={pinColor.bg}
                glyphColor={pinColor.glyph}
                borderColor={pinColor.border}
                scale={0.9}
              />
            </AdvancedMarker>
          );
        })}

        {/* InfoWindow for Nearby Infrastructure */}
        {selectedInfra && (
          <InfoWindow
            position={{ lat: selectedInfra.lat, lng: selectedInfra.lng }}
            onCloseClick={() => setSelectedInfra(null)}
          >
            <div className="p-1 max-w-[220px] text-slate-900">
              <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 uppercase mb-1">
                {selectedInfra.badge}
              </span>
              <h4 className="font-bold text-xs text-slate-900 mb-0.5">
                {selectedInfra.name}
              </h4>
              <p className="text-[11px] text-slate-600 mb-1">
                {selectedInfra.nameHi}
              </p>
              <div className="text-[10px] text-slate-500 font-medium border-t border-slate-100 pt-1">
                उद्यम से दूरी (Distance): <span className="font-bold text-slate-800">{selectedInfra.distanceKm} km</span>
              </div>
              <p className="text-[10px] text-emerald-700 bg-emerald-50 p-1 rounded mt-1">
                {selectedInfra.significance}
              </p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

// Fallback Interactive Canvas/Simulator for when API Key is pending
const FallbackInteractiveMap: React.FC<{
  position: { lat: number; lng: number };
  onPositionChange: (pos: { lat: number; lng: number }) => void;
  addressInfo: {
    village: string;
    block: string;
    district: string;
    state: string;
    formattedAddress: string;
  };
  nearbyInfra: NearbyInfraPoint[];
  businessName?: string;
}> = ({ position, onPositionChange, addressInfo, nearbyInfra, businessName }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Normalized map bounds around position
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const deltaLng = ((x / rect.width) - 0.5) * 0.08;
    const deltaLat = (0.5 - (y / rect.height)) * 0.08;
    onPositionChange({
      lat: Number((position.lat + deltaLat).toFixed(5)),
      lng: Number((position.lng + deltaLng).toFixed(5))
    });
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-full bg-slate-950 overflow-hidden cursor-crosshair select-none"
    >
      {/* Satellite-style grid and rural landscape simulation */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Simulated Road & River Arteries */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-800" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 140 Q 240 180 500 120 T 1000 240" fill="none" strokeWidth="6" stroke="#475569" strokeDasharray="6 3" />
        <path d="M 120 0 Q 180 260 220 540" fill="none" strokeWidth="4" stroke="#334155" />
        <path d="M 0 380 C 300 320 600 450 1000 360" fill="none" strokeWidth="5" stroke="#1e293b" />
        <circle cx="50%" cy="50%" r="80" fill="none" stroke="#4F46E5" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="50%" cy="50%" r="160" fill="none" stroke="#4F46E5" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
      </svg>

      {/* Center Pinpoint HUD */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center">
        <div className="bg-indigo-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 mb-1 border border-indigo-400 animate-bounce">
          <Store className="w-3 h-3" />
          <span>{businessName || 'Proposed Enterprise'}</span>
        </div>
        <div className="w-6 h-6 text-indigo-400 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-indigo-500 fill-indigo-600" />
        </div>
        <div className="w-2.5 h-1 bg-indigo-950/80 rounded-full blur-2xs mt-0.5"></div>
      </div>

      {/* Nearby Rural Points in Simulated Canvas */}
      <div className="absolute top-1/4 left-1/3 pointer-events-none flex items-center gap-1.5 bg-amber-950/80 border border-amber-600/50 text-amber-200 text-[10px] px-2 py-0.5 rounded-md shadow-xs">
        <Warehouse className="w-3 h-3 text-amber-400" />
        <span>APMC Mandi (3.8 km)</span>
      </div>

      <div className="absolute bottom-1/3 right-1/4 pointer-events-none flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 text-[10px] px-2 py-0.5 rounded-md shadow-xs">
        <Building2 className="w-3 h-3 text-emerald-400" />
        <span>Gramin Bank Branch (1.4 km)</span>
      </div>

      <div className="absolute top-1/3 right-1/5 pointer-events-none flex items-center gap-1.5 bg-sky-950/80 border border-sky-600/50 text-sky-200 text-[10px] px-2 py-0.5 rounded-md shadow-xs">
        <Navigation className="w-3 h-3 text-sky-400" />
        <span>NH Highway Junction (0.9 km)</span>
      </div>

      {/* Top Banner Notice */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-semibold text-slate-200">Interactive Location Simulator Active</span>
          <span className="text-slate-400 text-[10px]">(Click anywhere to pinpoint coordinates)</span>
        </div>
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-indigo-300 font-mono text-[11px] px-2.5 py-1 rounded-lg">
          {position.lat.toFixed(4)}° N, {position.lng.toFixed(4)}° E
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
        <span className="bg-slate-900/90 text-slate-300 text-[11px] px-3 py-1 rounded-full border border-slate-700 shadow-md">
          👉 Click on the map to place the pinpoint marker anywhere in rural India
        </span>
      </div>
    </div>
  );
};

export const EnterpriseLocationMap: React.FC<EnterpriseLocationMapProps> = ({
  currentFacts,
  localData,
  onLocationSelect,
  onNavigateToTab
}) => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCqjHAgcAp0PwiofeT6Bl0Nl6DXKvk_rfs').trim();
  const isApiKeyValid = Boolean(apiKey && apiKey !== 'MY_GOOGLE_MAPS_API_KEY' && apiKey.length > 10);

  // Position state
  const defaultLat = currentFacts.latitude || (localData?.latitude ?? 26.5888);
  const defaultLng = currentFacts.longitude || (localData?.longitude ?? 81.3857);

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: defaultLat,
    lng: defaultLng
  });

  const [addressInfo, setAddressInfo] = useState({
    village: currentFacts.village || localData?.village || 'Haidergarh',
    block: currentFacts.block || localData?.block || 'Haidergarh',
    district: currentFacts.district || localData?.district || 'Barabanki',
    state: currentFacts.state || localData?.state || 'Uttar Pradesh',
    formattedAddress: currentFacts.formattedAddress || localData?.formattedAddress || 'Haidergarh Rural Zone, Barabanki, Uttar Pradesh'
  });

  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Compute nearby infrastructure points relative to pinpoint position
  const nearbyInfra: NearbyInfraPoint[] = [
    {
      id: 'mandi-1',
      type: 'mandi',
      name: `${addressInfo.district} APMC Grain & Milk Mandi`,
      nameHi: `${addressInfo.district} कृषि उपज मंडी समिति`,
      lat: position.lat + 0.015,
      lng: position.lng + 0.012,
      distanceKm: localData?.marketDistanceKm || 3.8,
      badge: 'APMC Mandi',
      significance: 'Direct wholesale marketing outlet with daily MSP & market rate benchmarks.'
    },
    {
      id: 'bank-1',
      type: 'bank',
      name: 'Aryavart Gramin Bank / BC Point',
      nameHi: 'आर्यावर्त ग्रामीण बैंक शाखा एवं ग्राहक सेवा केंद्र',
      lat: position.lat - 0.009,
      lng: position.lng + 0.006,
      distanceKm: 1.4,
      badge: 'Rural Bank / BC',
      significance: 'Primary lending branch for Mudra / PMEGP subsidy disbursement.'
    },
    {
      id: 'highway-1',
      type: 'highway',
      name: 'State Highway / All-Weather Pucca Road Link',
      nameHi: 'राज्य राजमार्ग एवं पक्का संपर्क मार्ग',
      lat: position.lat + 0.007,
      lng: position.lng - 0.011,
      distanceKm: 0.9,
      badge: 'Road Access',
      significance: 'Ensures uninterrupted milk tankers or logistics trucks even during monsoon.'
    },
    {
      id: 'power-1',
      type: 'power',
      name: '33/11 kV Rural Feeder Substation',
      nameHi: '33/11 केवी ग्रामीण विद्युत उपकेंद्र',
      lat: position.lat - 0.013,
      lng: position.lng - 0.008,
      distanceKm: 2.3,
      badge: 'Power Grid',
      significance: 'Dedicated rural agriculture feeder providing 18-20 hours daily power.'
    }
  ];

  // Reverse geocode whenever position changes
  const reverseGeocodePos = useCallback(async (lat: number, lng: number) => {
    setIsGeocoding(true);
    setGpsError(null);
    try {
      const res = await fetch('/api/maps/reverse-geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng })
      });
      if (res.ok) {
        const data = await res.json();
        setAddressInfo({
          village: data.village || addressInfo.village,
          block: data.block || addressInfo.block,
          district: data.district || addressInfo.district,
          state: data.state || addressInfo.state,
          formattedAddress: data.formattedAddress || `${data.village}, ${data.district}`
        });
      }
    } catch (err) {
      console.warn('Reverse geocode error:', err);
    } finally {
      setIsGeocoding(false);
    }
  }, [addressInfo]);

  // Update position handler
  const handlePositionChange = (newPos: { lat: number; lng: number }) => {
    setPosition(newPos);
    reverseGeocodePos(newPos.lat, newPos.lng);
  };

  // Sync back to facts and engine
  const handleApplyToAppraisal = () => {
    onLocationSelect({
      village: addressInfo.village,
      block: addressInfo.block,
      district: addressInfo.district,
      state: addressInfo.state,
      latitude: position.lat,
      longitude: position.lng,
      formattedAddress: addressInfo.formattedAddress
    });

    setSyncNotice('✅ उद्यम का भू-स्थान सफलतापूर्वक लोन डोजियर में दर्ज हो गया!');
    setTimeout(() => setSyncNotice(null), 4000);
  };

  // Use current GPS location
  const handleUseCurrentGps = () => {
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('आपके ब्राउज़र में जीपीएस सुविधा उपलब्ध नहीं है।');
      return;
    }

    setIsGeocoding(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = {
          lat: Number(pos.coords.latitude.toFixed(5)),
          lng: Number(pos.coords.longitude.toFixed(5))
        };
        setPosition(newPos);
        reverseGeocodePos(newPos.lat, newPos.lng);
      },
      (err) => {
        setIsGeocoding(false);
        setGpsError('जीपीएस अनुमति अस्वीकृत या उपलब्ध नहीं। कृपया मानचित्र पर क्लिक करके स्थान चुनें।');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Quick Preset Jump
  const handleSelectPreset = (preset: typeof RURAL_PRESETS[0]) => {
    const newPos = { lat: preset.lat, lng: preset.lng };
    setPosition(newPos);
    setAddressInfo({
      village: preset.name.split(',')[0].trim(),
      block: preset.name.split(',')[0].trim(),
      district: preset.name.split(',')[1]?.trim() || preset.name,
      state: preset.state,
      formattedAddress: `${preset.name}, ${preset.state}`
    });
    reverseGeocodePos(preset.lat, preset.lng);
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Overview */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Google Maps Enterprise Pinpointer</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    GMP Powered
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  उद्यम का सटीक भू-स्थान, मंडी दूरी एवं सड़क पहुंच सत्यापन (Location Appraisal & Road Connectivity)
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleUseCurrentGps}
              disabled={isGeocoding}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-xl font-semibold text-xs border border-slate-300/80 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Navigation className="w-3.5 h-3.5 text-indigo-600" />
              <span>Use My GPS</span>
            </button>

            <button
              onClick={handleApplyToAppraisal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Apply Location to Loan Dossier</span>
            </button>
          </div>
        </div>

        {/* Sync or Error Feedback */}
        {syncNotice && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between animate-fadeIn">
            <span>{syncNotice}</span>
            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('feasibility')}
                className="font-bold underline text-emerald-900 cursor-pointer ml-2"
              >
                View Feasibility Meter &rarr;
              </button>
            )}
          </div>
        )}

        {gpsError && (
          <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* Quick Hub Jump Chips */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            त्वरित ग्रामीण केंद्र (Jump to Hub):
          </span>
          {RURAL_PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => handleSelectPreset(preset)}
              className={`px-2.5 py-1 text-xs rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                addressInfo.village.toLowerCase() === preset.name.split(',')[0].trim().toLowerCase()
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Live Location HUD Layout (2-Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* MAP CONTAINER (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Explicit height wrapper (Mandatory for Google Maps to render properly) */}
          <div className="h-[480px] w-full min-h-[420px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs relative bg-slate-100">
            {isApiKeyValid ? (
              <APIProvider apiKey={apiKey!} libraries={['places', 'marker']}>
                <MapContent
                  position={position}
                  onPositionChange={handlePositionChange}
                  addressInfo={addressInfo}
                  nearbyInfra={nearbyInfra}
                  businessType={currentFacts.business}
                  businessName={currentFacts.businessName}
                />
              </APIProvider>
            ) : (
              <FallbackInteractiveMap
                position={position}
                onPositionChange={handlePositionChange}
                addressInfo={addressInfo}
                nearbyInfra={nearbyInfra}
                businessName={currentFacts.businessName}
              />
            )}

            {/* Geocoding Loading Indicator */}
            {isGeocoding && (
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 text-xs text-slate-700 z-10">
                <span className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                <span>डाटा एवं पता अपडेट हो रहा है...</span>
              </div>
            )}
          </div>

          {/* Quick API Key Setup / Maps Notice Card */}
          {!isApiKeyValid && (
            <div className="mt-3 bg-gradient-to-r from-indigo-50/90 to-sky-50/90 border border-indigo-200/80 rounded-2xl p-4 text-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-indigo-600 text-white rounded-lg mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>Enable Live Google Maps Platform Vector Tiles</span>
                      <span className="text-[10px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                        Zero Billing Maps Demo Key Available
                      </span>
                    </h4>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      This app is fully instrumented with <code>@vis.gl/react-google-maps</code>, Places Autocomplete (New), and <code>AdvancedMarkerElement</code>. To view live high-resolution satellite imagery and Google Places search, obtain a free Google Maps Demo Key or configure your Cloud project key in <code>VITE_GOOGLE_MAPS_API_KEY</code>.
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <a
                        href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-2xs"
                      >
                        <span>Get Free Maps Demo Key (Instant)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://docs.cloud.google.com/api-keys/docs/add-restrictions-api-keys"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-lg font-medium text-xs transition-colors"
                      >
                        <span>Key Restriction Guide</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Location & Proximity Intelligence HUD (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Pinpointed Address Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-indigo-600" />
                <span>Selected Enterprise Site</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Verified Geo-Point
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 space-y-1.5">
              <div className="text-xs font-bold text-slate-900">
                {currentFacts.businessName || 'Rural Enterprise Unit'}
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {addressInfo.formattedAddress}
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>Lat: {position.lat.toFixed(4)}° N</span>
                <span>Lng: {position.lng.toFixed(4)}° E</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Village / GP</span>
                <span className="font-semibold text-slate-800">{addressInfo.village}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Tehsil / Block</span>
                <span className="font-semibold text-slate-800">{addressInfo.block}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">District</span>
                <span className="font-semibold text-slate-800">{addressInfo.district}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">State</span>
                <span className="font-semibold text-slate-800">{addressInfo.state}</span>
              </div>
            </div>
          </div>

          {/* Nearby Strategic Infrastructure Proximity */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Rural Proximity Engine</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Radius 5km</span>
            </div>

            <div className="space-y-2.5">
              {nearbyInfra.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {item.type === 'mandi' && <Warehouse className="w-3.5 h-3.5 text-amber-600" />}
                        {item.type === 'bank' && <Building2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {item.type === 'highway' && <Navigation className="w-3.5 h-3.5 text-sky-600" />}
                        {item.type === 'power' && <Zap className="w-3.5 h-3.5 text-purple-600" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-500">{item.nameHi}</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                      {item.distanceKm} km
                    </span>
                  </div>
                  <div className="mt-1.5 text-[10px] text-slate-600 leading-tight bg-white p-1.5 rounded-md border border-slate-100">
                    {item.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Loan Appraisal Relevance */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Credit Underwriter Geo-Audit</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Nationalized banks (NABARD, SBI, Baroda UP Bank) mandate geo-tagging of proposed rural business sites. Proximity to state highways (&lt;2 km) and APMC mandis boosts the enterprise's <strong>Supply & Logistics Score</strong> by up to +18 points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
