import { useState, useCallback } from 'react';

export interface GeoLocationData {
  id?: string;
  name: string;
  city: string;
  state?: string;
  country?: string;
  lat: number;
  lng: number;
  accuracy?: number;
  isLive: boolean;
  timestamp?: number;
  // Dynamic community profile for real locations
  wardCode?: string;
  population?: number;
  dailyDemandLiters?: number;
  stressProfile?: string;
  hospitalName?: string;
  schoolName?: string;
  sectorAName?: string;
  sectorBName?: string;
  sectorCName?: string;
}

export const REAL_LOCATION_PRESETS: GeoLocationData[] = [
  {
    id: 'delhi-lakshmi-nagar',
    name: 'Lakshmi Nagar Ward',
    city: 'East Delhi',
    state: 'Delhi',
    country: 'India',
    lat: 28.6304,
    lng: 77.2773,
    wardCode: 'EDMC-Ward 24',
    population: 2840,
    dailyDemandLiters: 29000,
    stressProfile: 'Yamuna trans-river pipeline bottleneck. Severe peak summer pressure drops.',
    hospitalName: 'East Delhi General Hospital',
    schoolName: 'Lakshmi Nagar Senior Secondary School',
    sectorAName: 'Vikas Marg Housing Cluster',
    sectorBName: 'Shakarpur Central Colony',
    sectorCName: 'Laxmi Nagar Metro Enclave',
    isLive: false,
  },
  {
    id: 'bengaluru-bellandur',
    name: 'Bellandur - Outer Ring Road',
    city: 'Bengaluru Urban',
    state: 'Karnataka',
    country: 'India',
    lat: 12.9298,
    lng: 77.6748,
    wardCode: 'BBMP-Ward 150',
    population: 4120,
    dailyDemandLiters: 42000,
    stressProfile: 'Groundwater depleted past 1,200 ft. High reliance on municipal emergency tankers.',
    hospitalName: 'Sakra World Trauma Center',
    schoolName: 'Bellandur Govt Model High School',
    sectorAName: 'Green Glen Layout',
    sectorBName: 'EcoSpace Residential Towers',
    sectorCName: 'Kaveri Piped Corridor East',
    isLive: false,
  },
  {
    id: 'mumbai-dharavi',
    name: 'Dharavi Sector 5',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    lat: 19.0402,
    lng: 72.8509,
    wardCode: 'MCGM-Ward G/North',
    population: 5800,
    dailyDemandLiters: 38000,
    stressProfile: 'Ultra-dense municipal feeder lines. Rationed water delivery hours (04:00 - 07:00).',
    hospitalName: 'Sion Municipal Trauma Center',
    schoolName: 'Dharavi Municipal English School',
    sectorAName: 'Transit Camp Sector A',
    sectorBName: 'Matunga Labour Camp Zone',
    sectorCName: 'Kumbharwada Artisans Colony',
    isLive: false,
  },
  {
    id: 'chennai-velachery',
    name: 'Velachery Tech Belt',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    lat: 12.9784,
    lng: 80.2184,
    wardCode: 'GCC-Ward 177',
    population: 3260,
    dailyDemandLiters: 33500,
    stressProfile: 'Desalination plant pipeline dependency. High seasonal saline incursion.',
    hospitalName: 'Velachery Government Hospital',
    schoolName: 'St. Britto Matriculation Campus',
    sectorAName: 'Vijayanagar High-Rise Enclave',
    sectorBName: 'Bypass Road Residential Loop',
    sectorCName: 'Lake View Colony Sector C',
    isLive: false,
  },
  {
    id: 'hyderabad-hitec',
    name: 'Hitec City - Madhapur',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    lat: 17.4474,
    lng: 78.3762,
    wardCode: 'GHMC-Ward 104',
    population: 3650,
    dailyDemandLiters: 37000,
    stressProfile: 'Krishna River phase-3 intake supply network. Extreme rocky plateau water table.',
    hospitalName: 'Madhapur Emergency Care Center',
    schoolName: 'Cyberabad Public School',
    sectorAName: 'Ayyappa Society High-Rise',
    sectorBName: 'Silicon Valley Residency',
    sectorCName: 'Mindspace Commercial Boundary',
    isLive: false,
  },
  {
    id: 'jaipur-malviya-nagar',
    name: 'Malviya Nagar Sector 4',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    lat: 26.8532,
    lng: 75.8055,
    wardCode: 'JMC-Ward 82',
    population: 2950,
    dailyDemandLiters: 31000,
    stressProfile: 'Arid climate zone. Bisalpur Dam reservoir pipeline rationing during peak heatwave.',
    hospitalName: 'Apex Medical Research Hospital',
    schoolName: 'Mahaveer Public Model School',
    sectorAName: 'Sector 3 Residential Colony',
    sectorBName: 'Calgiri Marg Apartment Hub',
    sectorCName: 'Pradhan Marg Commercial Zone',
    isLive: false,
  },
  {
    id: 'capetown-khayelitsha',
    name: 'Khayelitsha Sub-Council',
    city: 'Cape Town',
    state: 'Western Cape',
    country: 'South Africa',
    lat: -34.0378,
    lng: 18.6754,
    wardCode: 'CPT-Ward 93',
    population: 4600,
    dailyDemandLiters: 36000,
    stressProfile: 'Day Zero contingency zone. Communal tap standpipes with 50 L/person daily cap.',
    hospitalName: 'Khayelitsha District Hospital',
    schoolName: 'Chris Hani Secondary School',
    sectorAName: 'Site B Settlement Sector',
    sectorBName: 'Makhaza Housing Corridor',
    sectorCName: 'Harare Community Enclave',
    isLive: false,
  }
];

export const useLiveLocation = () => {
  const [location, setLocation] = useState<GeoLocationData>(REAL_LOCATION_PRESETS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Reverse geocode lat/lng to get real street / colony / city name
  const reverseGeocode = async (lat: number, lng: number): Promise<{ name: string; city: string; state?: string; country?: string }> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        const locality = address.suburb || address.neighbourhood || address.residential || address.road || 'Local Community Ward';
        const city = address.city || address.town || address.county || address.state_district || 'Municipal Sector';
        const stateName = address.state || '';
        const country = address.country || '';
        return {
          name: locality,
          city: `${city}${stateName ? ', ' + stateName : ''}`,
          state: stateName,
          country
        };
      }
    } catch (e) {
      console.warn('Reverse geocoding fallback triggered:', e);
    }
    return {
      name: `Ward (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
      city: 'Live Community',
    };
  };

  // Browser Geolocation trigger
  const detectLiveLocation = useCallback(async (): Promise<GeoLocationData | null> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          const geoDetails = await reverseGeocode(lat, lng);

          const liveData: GeoLocationData = {
            id: 'live-device-gps',
            name: geoDetails.name,
            city: geoDetails.city,
            state: geoDetails.state,
            country: geoDetails.country,
            lat,
            lng,
            accuracy,
            isLive: true,
            timestamp: Date.now(),
            wardCode: `GPS-Live-Fix (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
            population: 3200,
            dailyDemandLiters: 32000,
            stressProfile: 'Real-time GPS local community anchor. Synchronized with live municipal twin.',
            hospitalName: `${geoDetails.name} Trauma Center`,
            schoolName: `${geoDetails.name} Public Academy`,
            sectorAName: `${geoDetails.name} North Sector`,
            sectorBName: `${geoDetails.name} Central Zone`,
            sectorCName: `${geoDetails.name} East Enclave`,
          };

          setLocation(liveData);
          setIsLoading(false);
          resolve(liveData);
        },
        (err) => {
          let errorMsg = 'Could not retrieve your live location.';
          if (err.code === err.PERMISSION_DENIED) {
            errorMsg = 'Location permission was denied. Please allow location access in your browser.';
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMsg = 'Location information is unavailable.';
          } else if (err.code === err.TIMEOUT) {
            errorMsg = 'Location request timed out.';
          }
          setError(errorMsg);
          setIsLoading(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, []);

  // Quick preset selection
  const selectPresetLocation = useCallback((presetId: string): GeoLocationData | null => {
    const found = REAL_LOCATION_PRESETS.find(p => p.id === presetId);
    if (found) {
      setLocation(found);
      setError(null);
      return found;
    }
    return null;
  }, []);

  // Search any city / locality worldwide
  const searchLocation = useCallback(async (query: string): Promise<GeoLocationData | null> => {
    if (!query || query.trim().length === 0) return null;

    setIsLoading(true);
    setError(null);

    // Fast check if user typed one of our presets
    const lowerQuery = query.toLowerCase().trim();
    const matchedPreset = REAL_LOCATION_PRESETS.find(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.city.toLowerCase().includes(lowerQuery) ||
      (p.state && p.state.toLowerCase().includes(lowerQuery))
    );
    if (matchedPreset) {
      setLocation(matchedPreset);
      setIsLoading(false);
      return matchedPreset;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (response.ok) {
        const results = await response.json();
        if (results && results.length > 0) {
          const item = results[0];
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          const address = item.address || {};
          const locality = address.suburb || address.neighbourhood || address.road || item.display_name.split(',')[0];
          const city = address.city || address.town || address.state_district || '';
          const stateName = address.state || '';

          const searchData: GeoLocationData = {
            id: `search-${Date.now()}`,
            name: locality,
            city: `${city}${stateName ? ', ' + stateName : ''}`,
            state: stateName,
            country: address.country || '',
            lat,
            lng,
            isLive: false,
            wardCode: `Ward-${locality.slice(0, 3).toUpperCase()}`,
            population: 3100,
            dailyDemandLiters: 31500,
            stressProfile: `Live geo-targeted ward in ${city}. Automated mass-balance hydrological allocation active.`,
            hospitalName: `${locality} General Hospital`,
            schoolName: `${locality} Community School`,
            sectorAName: `${locality} Block A`,
            sectorBName: `${locality} Central Avenue`,
            sectorCName: `${locality} East Sector`,
          };

          setLocation(searchData);
          setIsLoading(false);
          return searchData;
        } else {
          setError(`No location found matching "${query}"`);
        }
      }
    } catch {
      setError('Search request failed. Please check network connectivity.');
    }

    setIsLoading(false);
    return null;
  }, []);

  return {
    location,
    setLocation,
    detectLiveLocation,
    selectPresetLocation,
    searchLocation,
    isLoading,
    error,
    presets: REAL_LOCATION_PRESETS,
  };
};
