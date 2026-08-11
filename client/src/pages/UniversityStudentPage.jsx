import React, { useState } from 'react';
import { GraduationCap, Star, Clock, MapPin, Bus, Heart, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { MapView } from '../components/MapView';
import { CrowdIndicator } from '../components/CrowdIndicator';
import { StatusBadge } from '../components/StatusBadge';

export const UniversityStudentPage = () => {
  const { universityAuth, loginUniversity, vehicles, setSelectedVehicle } = useMobility();

  const [email, setEmail] = useState('alex.rivera@metrotech.edu');
  const [studentId, setStudentId] = useState('MTU-88401');
  const [isAuthenticated, setIsAuthenticated] = useState(!!universityAuth);

  // Favorites state
  const [favorites, setFavorites] = useState({
    favBus: 'University Bus U-01',
    favRoute: 'North Campus ↔ Quad Loop',
    homeStop: 'North Dorms Stop',
    campusStop: 'Engineering Hub'
  });

  const [editingFavorites, setEditingFavorites] = useState(false);

  const uniBuses = vehicles.filter(v => v.category === 'university');

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUniversity(email, studentId);
    setIsAuthenticated(true);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/30 text-indigo-300 rounded-xl border border-indigo-500/40">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight">University Transportation & Campus Transit</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500 text-white">
                STUDENT DIRECT ACCESS
              </span>
            </div>
            <p className="text-xs text-indigo-200/80 font-medium">Metropolitan Tech University Campus Shuttle Network</p>
          </div>
        </div>
      </div>

      {!isAuthenticated ? (
        /* LOGIN AUTH FORM */
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border border-indigo-100 shadow-xl space-y-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Student Shuttle Auth</h3>
            <p className="text-xs text-slate-500 font-medium">Enter your university email or Student ID to track campus buses.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">University Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                placeholder="student@university.edu"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                placeholder="MTU-XXXXX"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              Sign In to Campus Transit
            </button>
          </form>
        </div>
      ) : (
        /* AUTHENTICATED STUDENT DASHBOARD */
        <div className="space-y-6">
          
          {/* FAVORITES PREFERENCES BAR */}
          <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">Saved Transit Preferences</h3>
              </div>
              <button
                onClick={() => setEditingFavorites(!editingFavorites)}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                {editingFavorites ? 'Save Preferences' : 'Edit Favorites'}
              </button>
            </div>

            {editingFavorites ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Favorite Bus</label>
                  <input
                    type="text"
                    value={favorites.favBus}
                    onChange={(e) => setFavorites({ ...favorites, favBus: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Favorite Route</label>
                  <input
                    type="text"
                    value={favorites.favRoute}
                    onChange={(e) => setFavorites({ ...favorites, favRoute: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Home Stop</label>
                  <input
                    type="text"
                    value={favorites.homeStop}
                    onChange={(e) => setFavorites({ ...favorites, homeStop: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Campus Stop</label>
                  <input
                    type="text"
                    value={favorites.campusStop}
                    onChange={(e) => setFavorites({ ...favorites, campusStop: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                  <span className="text-indigo-700 block text-[10px] uppercase font-bold">⭐ Favorite Bus</span>
                  <strong className="text-slate-900 font-bold">{favorites.favBus}</strong>
                </div>
                <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100">
                  <span className="text-purple-700 block text-[10px] uppercase font-bold">📍 Favorite Route</span>
                  <strong className="text-slate-900 font-bold">{favorites.favRoute}</strong>
                </div>
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                  <span className="text-blue-700 block text-[10px] uppercase font-bold">🏠 Home Stop</span>
                  <strong className="text-slate-900 font-bold">{favorites.homeStop}</strong>
                </div>
                <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">🎓 Campus Stop</span>
                  <strong className="text-slate-900 font-bold">{favorites.campusStop}</strong>
                </div>
              </div>
            )}
          </div>

          {/* MAIN BUS LIST & MAP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* BUS CARDS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                  Live Campus Shuttle Network ({uniBuses.length})
                </h3>

                <div className="space-y-4">
                  {uniBuses.map(v => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v)}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl font-bold">
                            <Bus className="w-4 h-4" />
                          </span>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{v.name}</h4>
                            <p className="text-xs text-indigo-700 font-semibold">{v.routeName}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-indigo-600 block">
                            ETA: {v.etaMinutes} min
                          </span>
                          <StatusBadge type="ACTIVE" size="sm" />
                        </div>
                      </div>

                      <CrowdIndicator occupancy={v.occupancy} capacity={v.capacity} />

                      <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 font-medium">
                        Stops: {v.stops ? v.stops.join(' ➔ ') : 'Campus Loop'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="lg:col-span-7 space-y-4">
              <MapView filteredCategory="university" height="h-[560px]" />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
