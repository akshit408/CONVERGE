import React, { useState } from 'react';
import { Search, Bus, Clock, MapPin, AlertTriangle, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { MapView } from '../components/MapView';
import { CrowdIndicator } from '../components/CrowdIndicator';
import { StatusBadge } from '../components/StatusBadge';
import { SmartBusRecommendation } from '../components/SmartBusRecommendation';
import { TicketCard } from '../components/TicketCard';

export const PublicTransportPage = () => {
  const { vehicles, setSelectedVehicle, selectedVehicle, triggerDeviation } = useMobility();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusId, setSelectedBusId] = useState('bus-p24');

  const publicBuses = vehicles.filter(v => v.category === 'public');
  
  const filteredBuses = publicBuses.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeBus = vehicles.find(v => v.id === selectedBusId) || publicBuses[0] || {};
  const hasRouteDeviation = activeBus.hasDeviation || publicBuses.some(b => b.hasDeviation);
  const deviatedBus = publicBuses.find(b => b.hasDeviation) || activeBus;

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <Bus className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Public Transport Intelligence</h2>
              <p className="text-xs text-slate-500 font-medium">Real-time bus tracking, smart ticketing & occupancy prediction</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search destination or route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* PUBLIC PASSENGER ALERT BANNER IF ROUTE DEVIATED */}
      {hasRouteDeviation && (
        <div className="bg-gradient-to-r from-rose-900 to-rose-800 text-white rounded-2xl p-4 sm:p-5 shadow-md border border-rose-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-scale-up">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-700 text-white rounded-xl shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm uppercase tracking-wide text-rose-200">
                  🚨 Route Deviation Alert
                </span>
                <span className="text-[10px] bg-rose-950 text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-700">
                  AFFECTED BUS
                </span>
              </div>
              <h4 className="font-bold text-base text-white">
                "{deviatedBus.name}" has deviated from its scheduled route!
              </h4>
              <p className="text-xs text-rose-100 font-medium">
                Expected: <span className="underline">Central Station → Market Street → Univ</span> | Actual: <span className="underline text-amber-300">Highway Bypass Detour</span>. Your ETA has updated: <strong>7 min → 14 min</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                setSelectedVehicle(deviatedBus);
                setSelectedBusId(deviatedBus.id);
              }}
              className="flex-1 md:flex-none px-4 py-2 bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              View Live Bus
            </button>
            <button
              onClick={() => setSelectedBusId('bus-p31')}
              className="flex-1 md:flex-none px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs rounded-xl border border-rose-600 transition-colors"
            >
              Find Alternative Bus
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT: LEFT NEARBY BUSES, CENTER MAP, RIGHT RECOMMENDATION & TICKET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: NEARBY BUSES */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 text-sm">Nearby Buses</h3>
              <span className="text-xs font-semibold text-slate-500">{filteredBuses.length} Vehicles</span>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {filteredBuses.map(bus => {
                const isSelected = selectedBusId === bus.id;
                const isRecommended = bus.recommended;

                return (
                  <div
                    key={bus.id}
                    onClick={() => {
                      setSelectedBusId(bus.id);
                      setSelectedVehicle(bus);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20 shadow-xs' 
                        : isRecommended
                        ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-400'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center text-xs text-white ${
                          bus.hasDeviation ? 'bg-rose-600' : isRecommended ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}>
                          {bus.name.replace('Bus P-', '')}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {bus.name}
                            {isRecommended && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                ⭐ Recommended
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[170px]">
                            {bus.routeName}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-blue-600 block">
                          ETA: {bus.etaMinutes} min
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          1.2 km away
                        </span>
                      </div>
                    </div>

                    <CrowdIndicator occupancy={bus.occupancy} capacity={bus.capacity} />

                    {bus.hasDeviation && (
                      <div className="text-[11px] font-semibold text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Route deviation detected (+7m delay)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: LIVE MAP */}
        <div className="lg:col-span-8 space-y-6">
          <MapView filteredCategory="public" height="h-[460px]" />

          {/* SMART BUS RECOMMENDATION MODULE */}
          <SmartBusRecommendation 
            onSelectBus={(busId) => {
              setSelectedBusId(busId);
              const b = vehicles.find(v => v.id === busId);
              if (b) setSelectedVehicle(b);
            }} 
          />

          {/* SMART TICKETING DEMO MODULE */}
          <div className="pt-2">
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-blue-600" /> Interactive Smart Ticketing Simulation
            </h3>
            <TicketCard targetBusId={selectedBusId} />
          </div>
        </div>

      </div>

    </div>
  );
};
