import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useMobility } from '../context/MobilityContext';
import { CrowdIndicator } from './CrowdIndicator';
import { StatusBadge } from './StatusBadge';
import { Bus, Ambulance, Truck, GraduationCap, ShieldAlert, CheckCircle2, Ticket } from 'lucide-react';

// Custom Marker HTML Builder using DivIcon
const createCustomMarker = (vehicle) => {
  let color = '#2563EB'; // public blue
  let iconSvg = '🚌';

  if (vehicle.category === 'emergency') {
    color = '#EF4444';
    iconSvg = '🚑';
  } else if (vehicle.category === 'municipal') {
    color = '#F59E0B';
    iconSvg = '🚛';
  } else if (vehicle.category === 'school') {
    color = '#8B5CF6';
    iconSvg = '🏫';
  } else if (vehicle.category === 'university') {
    color = '#6366F1';
    iconSvg = '🎓';
  }

  const isDeviated = vehicle.hasDeviation;

  const html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
      ${isDeviated ? `<div style="position: absolute; width: 44px; height: 44px; background: rgba(239,68,68,0.35); border-radius: 50%; animation: pulseGlow 1.5s infinite ease-in-out;"></div>` : ''}
      <div style="
        background-color: ${color};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        border: 2.5px solid white;
        transition: transform 0.3s ease;
      ">
        ${iconSvg}
      </div>
      <div style="
        position: absolute;
        bottom: -18px;
        background: rgba(15, 23, 42, 0.85);
        color: white;
        font-size: 10px;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 6px;
        white-space: nowrap;
        backdrop-filter: blur(4px);
      ">
        ${vehicle.name}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
};

// Map Controller for Smooth Focus
const MapController = ({ selectedVehicle }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedVehicle && selectedVehicle.lat && selectedVehicle.lng) {
      map.flyTo([selectedVehicle.lat, selectedVehicle.lng], 15, { duration: 1.2 });
    }
  }, [selectedVehicle, map]);
  return null;
};

export const MapView = ({ filteredCategory = 'all', height = 'h-[520px]' }) => {
  const { vehicles, selectedVehicle, setSelectedVehicle, boardTicket, triggerDeviation, resolveDeviation } = useMobility();

  const displayVehicles = filteredCategory === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.category === filteredCategory);

  // Sample Route Polylines
  const routePolylines = [
    {
      id: 'r1',
      color: '#2563EB',
      positions: [
        [37.7749, -122.4194],
        [37.7780, -122.4170],
        [37.7833, -122.4167],
        [37.7890, -122.4080]
      ]
    },
    {
      id: 'r2',
      color: '#8B5CF6',
      positions: [
        [37.7710, -122.4400],
        [37.7650, -122.4350],
        [37.7600, -122.4250]
      ]
    }
  ];

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100`}>
      <MapContainer 
        center={[37.7749, -122.4194]} 
        zoom={13} 
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapController selectedVehicle={selectedVehicle} />

        {routePolylines.map(r => (
          <Polyline key={r.id} positions={r.positions} color={r.color} weight={4} opacity={0.65} dashArray="6, 8" />
        ))}

        {displayVehicles.map(v => (
          <Marker 
            key={v.id} 
            position={[v.lat, v.lng]} 
            icon={createCustomMarker(v)}
            eventHandlers={{
              click: () => setSelectedVehicle(v)
            }}
          >
            <Popup>
              <div className="p-3.5 space-y-3 font-sans">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{v.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{v.type}</p>
                  </div>
                  <StatusBadge type={v.status} size="sm" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Speed</span>
                    <span className="font-bold text-slate-800">{v.speed} km/h</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">ETA</span>
                    <span className="font-bold text-blue-600">{v.etaMinutes} mins</span>
                  </div>
                </div>

                {v.category === 'public' && (
                  <CrowdIndicator occupancy={v.occupancy} capacity={v.capacity} />
                )}

                {v.hasDeviation && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-2 rounded-lg flex items-center gap-1.5 font-medium">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>Deviated by {v.deviationDistance || '650m'}</span>
                  </div>
                )}

                <div className="pt-1 flex items-center gap-2">
                  {v.category === 'public' && (
                    <button
                      onClick={() => boardTicket(v.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      Scan Board
                    </button>
                  )}
                  {v.hasDeviation ? (
                    <button
                      onClick={() => resolveDeviation(v.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resolve
                    </button>
                  ) : (
                    <button
                      onClick={() => triggerDeviation(v.id)}
                      className="bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 text-xs font-semibold py-1.5 px-2 rounded-lg transition-colors"
                    >
                      Simulate Dev
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
