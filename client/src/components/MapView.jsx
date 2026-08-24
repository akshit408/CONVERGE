import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { useMobility } from '../context/MobilityContext';
import { CrowdIndicator } from './CrowdIndicator';
import { StatusBadge } from './StatusBadge';
import { ShieldAlert, CheckCircle2, Ticket, Key, Clock, Navigation, MapPin } from 'lucide-react';

const VADODARA_CENTER = {
  lat: 22.3072,
  lng: 73.1812
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
};

const defaultOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

// Safe SVG Marker Icon builder for Google Maps
const getVehicleSvgMarkerIcon = (vehicle) => {
  let color = '#2563EB'; // BLUE -> Public Transport
  let label = vehicle.code || vehicle.name.replace('Bus ', '').replace('Ambulance ', '').replace('Garbage Truck ', '').replace('Water Tanker ', '').replace('Fire Truck ', '').replace('School Bus ', '').replace('University Bus ', '');

  if (vehicle.category === 'emergency') {
    color = '#EF4444'; // RED -> Emergency
  } else if (vehicle.category === 'municipal') {
    color = '#F59E0B'; // ORANGE -> Municipal
  } else if (vehicle.category === 'school' || vehicle.category === 'university') {
    color = '#8B5CF6'; // PURPLE -> School / University
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="21" fill="${color}" stroke="#FFFFFF" stroke-width="3.5"/>
      ${vehicle.hasDeviation ? '<circle cx="25" cy="25" r="23" fill="none" stroke="#EF4444" stroke-width="3.5" opacity="0.9"/>' : ''}
      <text x="25" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">${label}</text>
    </svg>
  `;

  const icon = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
  };

  if (typeof window !== 'undefined' && window.google && window.google.maps) {
    icon.scaledSize = new window.google.maps.Size(42, 42);
    icon.anchor = new window.google.maps.Point(21, 21);
  }

  return icon;
};

export const MapView = ({ filteredCategory = 'all', height = 'h-[520px]' }) => {
  const { vehicles, selectedVehicle, setSelectedVehicle, boardTicket, triggerDeviation, resolveDeviation } = useMobility();
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const displayVehicles = filteredCategory === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.category === filteredCategory);

  // Vadodara Route Polylines
  const vadodaraRoutes = [
    {
      id: 'v-r1',
      name: 'Route 12 - Vadodara Station ↔ Alkapuri',
      color: '#2563EB',
      path: [
        { lat: 22.3072, lng: 73.1812 },
        { lat: 22.3100, lng: 73.1840 },
        { lat: 22.3120, lng: 73.1870 },
        { lat: 22.3140, lng: 73.1890 }
      ]
    },
    {
      id: 'v-r2',
      name: 'Route 24 - Sayajigunj ↔ Fatehgunj',
      color: '#F59E0B',
      path: [
        { lat: 22.3120, lng: 73.1870 },
        { lat: 22.3200, lng: 73.1920 },
        { lat: 22.3250, lng: 73.2050 }
      ]
    },
    {
      id: 'v-r3',
      name: 'Route 3 - Gotri ↔ Akota',
      color: '#8B5CF6',
      path: [
        { lat: 22.3150, lng: 73.1600 },
        { lat: 22.3010, lng: 73.1750 },
        { lat: 22.2980, lng: 73.1680 }
      ]
    }
  ];

  const onLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMapInstance(null);
  }, []);

  // Smoothly center map when vehicle is selected
  useEffect(() => {
    if (mapInstance && selectedVehicle && selectedVehicle.lat && selectedVehicle.lng) {
      mapInstance.panTo({ lat: selectedVehicle.lat, lng: selectedVehicle.lng });
      mapInstance.setZoom(15);
      setActiveMarker(selectedVehicle);
    }
  }, [selectedVehicle, mapInstance]);

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100`}>
      
      {/* API Key Banner */}
      {!apiKey && (
        <div className="absolute top-3 left-3 right-3 z-20 bg-slate-900/90 text-white text-xs p-3 rounded-xl backdrop-blur-md shadow-lg border border-slate-700 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Vadodara Google Maps Active:</strong> Set <code>VITE_GOOGLE_MAPS_API_KEY</code> in <code>.env</code>.
            </span>
          </div>
          <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
            {displayVehicles.length} Vehicles Moving
          </span>
        </div>
      )}

      {!isLoaded ? (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white text-xs font-semibold p-6 text-center">
          <div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p>Loading Google Maps (Vadodara, Gujarat)...</p>
          </div>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={VADODARA_CENTER}
          zoom={13}
          options={defaultOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Vadodara Route Polylines */}
          {vadodaraRoutes.map(r => (
            <Polyline
              key={r.id}
              path={r.path}
              options={{
                strokeColor: r.color,
                strokeOpacity: 0.85,
                strokeWeight: 4
              }}
            />
          ))}

          {/* All 12 Active Simulated Vehicles as Google Maps Markers */}
          {displayVehicles.map(v => (
            <Marker
              key={v.id}
              position={{ lat: v.lat, lng: v.lng }}
              icon={getVehicleSvgMarkerIcon(v)}
              title={`${v.name} (${v.code || v.id})`}
              onClick={() => {
                setActiveMarker(v);
                setSelectedVehicle(v);
              }}
            />
          ))}

          {/* InfoWindow Details when Marker is Clicked */}
          {activeMarker && (
            <InfoWindow
              position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="p-2 space-y-2 font-sans text-slate-900 max-w-[240px]">
                <div className="flex items-start justify-between gap-1 border-b border-slate-100 pb-1.5">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{activeMarker.name} ({activeMarker.code || activeMarker.id})</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{activeMarker.type}</p>
                  </div>
                  <StatusBadge type={activeMarker.status} size="sm" />
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] bg-slate-50 p-1.5 rounded border border-slate-100">
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Speed</span>
                    <strong className="text-slate-800">{activeMarker.speed} km/h</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">ETA</span>
                    <strong className="text-blue-600">{activeMarker.etaMinutes} mins</strong>
                  </div>
                  <div className="col-span-2 pt-0.5">
                    <span className="text-slate-400 block uppercase font-semibold">Assigned Route</span>
                    <span className="text-slate-800 font-semibold truncate block max-w-[210px]">{activeMarker.routeName}</span>
                  </div>
                </div>

                {activeMarker.capacity && (
                  <CrowdIndicator occupancy={activeMarker.occupancy} capacity={activeMarker.capacity} />
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-1 font-medium">
                  <span>Last Updated: <strong className="text-emerald-600 font-bold">{activeMarker.lastUpdated || 'Just now'}</strong></span>
                </div>

                {activeMarker.hasDeviation && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-[10px] p-1.5 rounded font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                    <span>Deviated by {activeMarker.deviationDistance || '650m'}</span>
                  </div>
                )}

                <div className="pt-1 flex items-center gap-1">
                  {activeMarker.category === 'public' && (
                    <button
                      onClick={() => boardTicket(activeMarker.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold py-1 px-1.5 rounded flex items-center justify-center gap-1"
                    >
                      <Ticket className="w-3 h-3" /> Board (+1)
                    </button>
                  )}
                  {activeMarker.hasDeviation ? (
                    <button
                      onClick={() => resolveDeviation(activeMarker.id)}
                      className="flex-1 bg-emerald-600 text-white text-[10px] font-bold py-1 px-1.5 rounded flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Clear Dev
                    </button>
                  ) : (
                    <button
                      onClick={() => triggerDeviation(activeMarker.id)}
                      className="bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-700 text-[10px] font-bold py-1 px-1.5 rounded"
                    >
                      Sim Dev
                    </button>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};
