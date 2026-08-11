import React, { useState } from 'react';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle2, Filter, Clock, MapPin, Search } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { StatusBadge } from '../components/StatusBadge';

export const AlertCenterPage = () => {
  const { alerts, resolveAlert, setSelectedVehicle, vehicles } = useMobility();
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredAlerts = alerts.filter(a => {
    if (filterPriority === 'all') return true;
    return a.priority.toLowerCase() === filterPriority.toLowerCase();
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Safety & Incident Alert Center</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time notification dispatch for route deviations, emergencies & high crowd events</p>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500">Filter Priority:</span>
          {['all', 'CRITICAL', 'HIGH', 'MEDIUM'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px] font-extrabold transition-all ${
                filterPriority === p 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-extrabold text-slate-900 text-base">All Operational Signals Normal</h3>
            <p className="text-xs text-slate-500 font-medium">No unresolved safety or deviation alerts detected across all 4 domains.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isCritical = alert.priority === 'CRITICAL';
            const isHigh = alert.priority === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl p-5 border transition-all space-y-3 shadow-2xs ${
                  alert.resolved 
                    ? 'opacity-60 border-slate-200 bg-slate-50' 
                    : isCritical 
                    ? 'border-2 border-rose-500 bg-rose-50/20' 
                    : isHigh 
                    ? 'border-amber-300 bg-amber-50/20' 
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      isCritical ? 'bg-rose-600 text-white' :
                      isHigh ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      🚨 {alert.priority}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">{alert.title}</h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {alert.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {alert.location}
                    </span>
                    <span>Vehicle: <strong className="text-slate-800">{alert.vehicleName}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {alert.vehicleId && (
                      <button
                        onClick={() => {
                          const v = vehicles.find(item => item.id === alert.vehicleId);
                          if (v) setSelectedVehicle(v);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
                      >
                        Locate Vehicle
                      </button>
                    )}

                    {!alert.resolved ? (
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                      >
                        Resolve Alert
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
