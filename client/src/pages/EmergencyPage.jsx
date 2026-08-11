import React, { useState } from 'react';
import { Ambulance, Flame, Siren, MapPin, Navigation, Clock, ShieldAlert, CheckCircle2, Send } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { MapView } from '../components/MapView';
import { StatusBadge } from '../components/StatusBadge';

export const EmergencyPage = () => {
  const { vehicles, dispatchEmergency, setSelectedVehicle } = useMobility();
  const [emergencyLocation, setEmergencyLocation] = useState('742 Evergreen Terrace (Cardiac Incident)');
  const [dispatchResult, setDispatchResult] = useState(null);

  const emergencyVehicles = vehicles.filter(v => v.category === 'emergency');

  const availableUnits = emergencyVehicles.filter(v => v.status === 'AVAILABLE');
  const respondingUnits = emergencyVehicles.filter(v => v.status === 'RESPONDING');

  const handleDispatch = async (e) => {
    e.preventDefault();
    const result = await dispatchEmergency(emergencyLocation);
    if (result) {
      setDispatchResult(result);
      if (result.vehicle) setSelectedVehicle(result.vehicle);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-rose-950 text-white p-6 rounded-2xl shadow-md border border-rose-900/60">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-600/30 text-rose-400 rounded-xl border border-rose-500/40">
            <Siren className="w-6 h-6 animate-pulse text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight">Emergency Operations Control Center</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                PRIORITY SIREN SYNC
              </span>
            </div>
            <p className="text-xs text-rose-200/80 font-medium">Real-time ambulance & fire rescue fleet tracking and dispatch</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Available Units</span>
            <strong className="text-emerald-400 text-sm font-bold">{availableUnits.length} Units</strong>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px]">Active Emergency Responses</span>
            <strong className="text-rose-400 text-sm font-bold">{respondingUnits.length} Active</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: DISPATCH TOOL & FLEET LIST */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* FIND NEAREST EMERGENCY VEHICLE DISPATCH BOX */}
          <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <Siren className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Find & Dispatch Nearest Unit</h3>
                <p className="text-xs text-slate-500 font-medium">Automated proximity dispatch calculation</p>
              </div>
            </div>

            <form onSubmit={handleDispatch} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Address / Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={emergencyLocation}
                    onChange={(e) => setEmergencyLocation(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    placeholder="Enter incident location..."
                    required
                  />
                </div>
              </div>

              {/* Nearest Unit Preview */}
              <div className="bg-rose-50/60 rounded-xl p-3.5 border border-rose-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-rose-900">Nearest Available Vehicle:</span>
                  <StatusBadge type="AVAILABLE" size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold text-sm">Ambulance E-02</strong>
                  <span className="text-slate-600 font-medium">Distance: <strong>2.4 km</strong></span>
                </div>
                <p className="text-[11px] text-slate-500">Estimated Response Time: <strong className="text-rose-700">5 min</strong></p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> DISPATCH EMERGENCY UNIT
              </button>
            </form>

            {dispatchResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Dispatch Confirmed!</strong>
                  <p>{dispatchResult.message}</p>
                </div>
              </div>
            )}
          </div>

          {/* EMERGENCY FLEET LIST */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
              Emergency Fleet Status ({emergencyVehicles.length})
            </h3>

            <div className="space-y-3">
              {emergencyVehicles.map(v => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
                        {v.type.includes('Fire') ? <Flame className="w-4 h-4" /> : <Ambulance className="w-4 h-4" />}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{v.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{v.driver}</p>
                      </div>
                    </div>
                    <StatusBadge type={v.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2 rounded-lg border border-slate-100 font-medium">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Speed</span>
                      <span className="text-slate-800 font-bold">{v.speed} km/h</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Target ETA</span>
                      <span className="text-rose-600 font-bold">{v.etaMinutes} mins</span>
                    </div>
                  </div>

                  {v.emergencyTarget && (
                    <div className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded-lg font-semibold flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                      <span>Target: {v.emergencyTarget}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MAP */}
        <div className="lg:col-span-7 space-y-4">
          <MapView filteredCategory="emergency" height="h-[620px]" />
        </div>

      </div>

    </div>
  );
};
