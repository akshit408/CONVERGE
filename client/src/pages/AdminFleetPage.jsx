import React, { useState } from 'react';
import { MapPin, Bus, Ambulance, Truck, GraduationCap, ShieldAlert, Activity, CheckCircle2, Clock, Filter, Search } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { MapView } from '../components/MapView';
import { StatusBadge } from '../components/StatusBadge';

export const AdminFleetPage = () => {
  const { vehicles, selectedVehicle, setSelectedVehicle, alerts } = useMobility();
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  const activeAlertCount = alerts.filter(a => !a.resolved).length;

  const displayVehicles = vehicles.filter(v => {
    const matchesCat = filterCategory === 'all' || v.category === filterCategory;
    const matchesSearch = v.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          v.routeName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          v.driver.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const domainTabs = [
    { id: 'all', label: 'All Fleet', icon: Activity, count: vehicles.length },
    { id: 'public', label: 'Public Transport', icon: Bus, count: vehicles.filter(v => v.category === 'public').length },
    { id: 'emergency', label: 'Emergency', icon: Ambulance, count: vehicles.filter(v => v.category === 'emergency').length },
    { id: 'municipal', label: 'Municipal', icon: Truck, count: vehicles.filter(v => v.category === 'municipal').length },
    { id: 'school', label: 'School Bus', icon: ShieldAlert, count: vehicles.filter(v => v.category === 'school').length },
    { id: 'university', label: 'University', icon: GraduationCap, count: vehicles.filter(v => v.category === 'university').length }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800 text-blue-400 rounded-xl border border-slate-700">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Unified Fleet & Operations Authority</h2>
            <p className="text-xs text-slate-400 font-medium">Cross-domain vehicle tracking, routing control & real-time dispatch</p>
          </div>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Active Vehicles</span>
          <strong className="text-2xl font-extrabold text-slate-900">{vehicles.length} Units</strong>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">100% Signal Coverage</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">On-Time Reliability</span>
          <strong className="text-2xl font-extrabold text-emerald-600">92.4%</strong>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">+1.8% vs last week</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Active System Alerts</span>
          <strong className="text-2xl font-extrabold text-rose-600">{activeAlertCount} Alerts</strong>
          <span className="text-[11px] text-rose-600 font-medium block mt-1">Requires Attention</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 text-xs font-semibold block">Average Fleet ETA</span>
          <strong className="text-2xl font-extrabold text-blue-600">6.2 mins</strong>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Optimal Dispatch Latency</span>
        </div>
      </div>

      {/* MAP VIEW */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Domain Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
            {domainTabs.map(t => {
              const Icon = t.icon;
              const isActive = filterCategory === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setFilterCategory(t.id)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive 
                      ? 'bg-slate-900 text-white font-bold shadow-xs' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label} ({t.count})
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search vehicle or driver..."
              className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 w-full sm:w-60"
            />
          </div>
        </div>

        <MapView filteredCategory={filterCategory} height="h-[500px]" />
      </div>

      {/* VEHICLE MANAGEMENT TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base">Fleet Directory & Operational Status</h3>
          <span className="text-xs font-semibold text-slate-500">
            Showing {displayVehicles.length} of {vehicles.length} Vehicles
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Speed</th>
                <th className="p-3">ETA</th>
                <th className="p-3">Occupancy</th>
                <th className="p-3">Assigned Route</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {displayVehicles.map(v => {
                const isSelected = selectedVehicle && selectedVehicle.id === v.id;
                return (
                  <tr 
                    key={v.id} 
                    onClick={() => setSelectedVehicle(v)}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/60 font-semibold' : ''}`}
                  >
                    <td className="p-3 font-bold text-slate-900">
                      <div>{v.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{v.driver}</div>
                    </td>
                    <td className="p-3 uppercase text-[10px] font-bold tracking-wider">
                      <span className={`px-2 py-0.5 rounded-full ${
                        v.category === 'public' ? 'bg-blue-100 text-blue-800' :
                        v.category === 'emergency' ? 'bg-rose-100 text-rose-800' :
                        v.category === 'municipal' ? 'bg-amber-100 text-amber-800' :
                        v.category === 'school' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {v.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatusBadge type={v.status} />
                    </td>
                    <td className="p-3 font-bold text-slate-800">{v.speed} km/h</td>
                    <td className="p-3 font-bold text-blue-600">{v.etaMinutes} min</td>
                    <td className="p-3">
                      {v.capacity ? `${v.occupancy || 0} / ${v.capacity}` : 'N/A'}
                    </td>
                    <td className="p-3 text-slate-700 font-semibold truncate max-w-[200px]">{v.routeName}</td>
                    <td className="p-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(v);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Focus Map
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
