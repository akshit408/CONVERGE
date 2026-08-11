import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, AlertTriangle, Layers, X } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { StatusBadge } from '../components/StatusBadge';

export const RouteManagementPage = () => {
  const { routes, vehicles } = useMobility();
  const [routeList, setRouteList] = useState(routes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  // Form State
  const [routeName, setRouteName] = useState('');
  const [category, setCategory] = useState('public');
  const [assignedVehicle, setAssignedVehicle] = useState('Bus P-12');
  const [schedule, setSchedule] = useState('Every 10 mins');
  const [stopsText, setStopsText] = useState('Central Station, Market Street, Tech Hub');

  const openCreateModal = () => {
    setEditingRoute(null);
    setRouteName('');
    setCategory('public');
    setAssignedVehicle('Bus P-12');
    setSchedule('Every 10 mins');
    setStopsText('Central Station, Market Street, Tech Hub');
    setIsModalOpen(true);
  };

  const openEditModal = (r) => {
    setEditingRoute(r);
    setRouteName(r.name);
    setCategory(r.category || 'public');
    setAssignedVehicle(r.assignedVehicle);
    setSchedule(r.schedule);
    setStopsText(r.stops ? r.stops.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleSaveRoute = (e) => {
    e.preventDefault();
    const stopsArray = stopsText.split(',').map(s => s.trim()).filter(Boolean);

    if (editingRoute) {
      setRouteList(prev => prev.map(r => r.id === editingRoute.id ? {
        ...r,
        name: routeName,
        category,
        assignedVehicle,
        schedule,
        stops: stopsArray
      } : r));
    } else {
      const newRoute = {
        id: `route-${Date.now()}`,
        name: routeName,
        category,
        assignedVehicle,
        schedule,
        stops: stopsArray,
        status: 'NORMAL'
      };
      setRouteList(prev => [...prev, newRoute]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Transportation Route Management</h2>
            <p className="text-xs text-slate-500 font-medium">Manage transit lines, assigned vehicles & stop sequences</p>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Route
        </button>
      </div>

      {/* ROUTES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {routeList.map(r => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {r.category || 'public'} domain
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-1">{r.name}</h3>
              </div>
              <StatusBadge type={r.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Assigned Vehicle</span>
                <strong className="text-slate-900 font-bold">{r.assignedVehicle}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Frequency Schedule</span>
                <strong className="text-blue-700 font-bold">{r.schedule}</strong>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-slate-500 font-semibold block">Stop Sequence ({r.stops ? r.stops.length : 0} Stops):</span>
              <div className="bg-slate-100/70 p-2.5 rounded-lg text-slate-800 font-medium leading-relaxed">
                {r.stops ? r.stops.join(' ➔ ') : 'No stops configured'}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => openEditModal(r)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Route
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT ROUTE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingRoute ? 'Edit Route Configuration' : 'Create New Transportation Route'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="space-y-3.5 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Route Name</label>
                <input
                  type="text"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Domain Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  >
                    <option value="public">Public Transport</option>
                    <option value="emergency">Emergency</option>
                    <option value="municipal">Municipal</option>
                    <option value="school">School</option>
                    <option value="university">University</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Assigned Vehicle</label>
                  <input
                    type="text"
                    value={assignedVehicle}
                    onChange={(e) => setAssignedVehicle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Schedule / Frequency</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Stops (Comma Separated)</label>
                <textarea
                  value={stopsText}
                  onChange={(e) => setStopsText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 h-20"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-xs"
                >
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
