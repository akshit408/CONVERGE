import React from 'react';
import { Truck, CheckCircle2, AlertTriangle, MapPin, BarChart2, ShieldAlert } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { MapView } from '../components/MapView';
import { StatusBadge } from '../components/StatusBadge';

export const MunicipalPage = () => {
  const { vehicles, setSelectedVehicle } = useMobility();

  const muniVehicles = vehicles.filter(v => v.category === 'municipal');

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Municipal Services & Fleet Intelligence</h2>
            <p className="text-xs text-slate-500 font-medium">Garbage trucks, water tankers & municipal service route completion tracking</p>
          </div>
        </div>
      </div>

      {/* ANALYTICS TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Completed Locations</span>
          <strong className="text-2xl font-extrabold text-slate-900">30 / 39</strong>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">77% On-Schedule Rate</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Missed Bins / Locations</span>
          <strong className="text-2xl font-extrabold text-amber-600">1 Location</strong>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Oak & 5th St Bin #4</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Average Route Time</span>
          <strong className="text-2xl font-extrabold text-slate-900">42 mins</strong>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">4.5m Faster than Avg</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Vehicle Utilization</span>
          <strong className="text-2xl font-extrabold text-blue-600">88.5%</strong>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Fleet Operational Efficiency</span>
        </div>
      </div>

      {/* MAIN CONTENT: FLEET LIST & MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: VEHICLE CARDS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
              Municipal Fleet Roster ({muniVehicles.length})
            </h3>

            <div className="space-y-4">
              {muniVehicles.map(v => {
                const completionPct = Math.round(((v.completedTasks || 18) / (v.totalTasks || 24)) * 100);

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 bg-amber-100 text-amber-700 rounded-xl font-bold">
                          <Truck className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{v.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">{v.type}</p>
                        </div>
                      </div>
                      <StatusBadge type={v.status} />
                    </div>

                    {/* Progress Bar for Tasks */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Task Completion</span>
                        <span>{v.completedTasks || 18} / {v.totalTasks || 24} ({completionPct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                          style={{ width: `${completionPct}%` }}
                        />
                      </div>
                    </div>

                    {v.hasDeviation && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2 rounded-lg font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Route deviation detected: {v.deviationDistance || '420m'}</span>
                      </div>
                    )}

                    {v.missedLocations && v.missedLocations.length > 0 && (
                      <div className="text-[11px] text-rose-700 font-medium">
                        ⚠️ Missed Locations: <strong>{v.missedLocations.join(', ')}</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAP */}
        <div className="lg:col-span-7 space-y-4">
          <MapView filteredCategory="municipal" height="h-[580px]" />
        </div>

      </div>

    </div>
  );
};
