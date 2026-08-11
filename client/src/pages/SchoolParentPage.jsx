import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Phone, KeyRound, CheckCircle2, User, Clock, MapPin, PhoneCall, AlertTriangle, ChevronRight } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { MapView } from '../components/MapView';
import { StatusBadge } from '../components/StatusBadge';

export const SchoolParentPage = () => {
  const { parentAuth, loginParent, vehicles, setSelectedVehicle, triggerDeviation } = useMobility();
  
  // Auth Form State
  const [selectedSchool, setSelectedSchool] = useState('St. Jude Academy');
  const [mobileNumber, setMobileNumber] = useState('+1 (555) 019-2834');
  const [otp, setOtp] = useState('4829');
  const [studentId, setStudentId] = useState('STU-9924');
  const [step, setStep] = useState(1); // 1: School/Phone -> 2: OTP -> 3: Authenticated

  // Authority View Toggle
  const [viewMode, setViewMode] = useState('parent'); // 'parent' | 'authority'
  const [driverDetourReason, setDriverDetourReason] = useState(null);

  const schoolBus = vehicles.find(v => v.id === 'school-sb07') || vehicles[0];

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    await loginParent(mobileNumber, otp, studentId);
    setStep(3);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR & MODE TOGGLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md border border-purple-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600/30 text-purple-300 rounded-xl border border-purple-500/40">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight">School Transportation & Child Safety</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500 text-white">
                PARENT AUTH GUARDIAN PROTOCOL
              </span>
            </div>
            <p className="text-xs text-purple-200/80 font-medium">Secure verification portal for verified parents & school administrators</p>
          </div>
        </div>

        {/* View Switcher: Parent Portal vs School Authority */}
        <div className="flex items-center bg-purple-950/80 p-1 rounded-xl border border-purple-700 text-xs font-semibold">
          <button
            onClick={() => setViewMode('parent')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'parent' ? 'bg-purple-600 text-white font-bold shadow-xs' : 'text-purple-300 hover:text-white'
            }`}
          >
            👨‍👩‍👧 Parent Portal
          </button>
          <button
            onClick={() => setViewMode('authority')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'authority' ? 'bg-purple-600 text-white font-bold shadow-xs' : 'text-purple-300 hover:text-white'
            }`}
          >
            🏫 School Authority
          </button>
        </div>
      </div>

      {/* PARENT FLOW */}
      {viewMode === 'parent' && (
        <>
          {/* STEP 1 & 2: PARENT AUTHENTICATION */}
          {(!parentAuth || step < 3) ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border border-purple-200 shadow-xl space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto font-bold">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">Parent Verification</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Child location data is restricted to verified guardians only.
                </p>
              </div>

              {step === 1 && (
                <form onSubmit={handlePhoneSubmit} className="space-y-4 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Select School</label>
                    <select
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                    >
                      <option>St. Jude Academy</option>
                      <option>Oakridge Elementary</option>
                      <option>Green Valley Prep</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Registered Mobile Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Student ID / Child Code</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Send OTP Verification Code
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="space-y-4 text-xs font-medium">
                  <div className="bg-purple-50 p-3 rounded-xl text-purple-900 border border-purple-100">
                    OTP sent to <strong>{mobileNumber}</strong>. (Mock OTP: <code>4829</code>)
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Enter 4-Digit OTP</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-extrabold text-lg text-slate-900 tracking-widest text-center"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Verify & Track Child's Bus
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* STEP 3: PARENT LIVE CHILD BUS TRACKING DASHBOARD */
            <div className="space-y-6">
              
              {/* SAFETY ALERT IF BUS DEVIATED */}
              {schoolBus.hasDeviation && (
                <div className="bg-rose-900 text-white p-5 rounded-2xl border-2 border-rose-600 shadow-xl space-y-3 animate-scale-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-6 h-6 text-rose-400 animate-pulse" />
                      <h3 className="font-extrabold text-lg text-white">🚨 SCHOOL BUS SAFETY ALERT</h3>
                    </div>
                    <span className="text-xs bg-rose-950 font-bold px-2.5 py-0.5 rounded-full border border-rose-700 text-rose-300">
                      SAFETY DISPATCH TRIGGERED
                    </span>
                  </div>

                  <p className="text-xs text-rose-100 font-medium">
                    "Your child's bus (<strong>{schoolBus.name}</strong>) has deviated from its scheduled route by <strong>{schoolBus.deviationDistance || '650 meters'}</strong>."
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setSelectedVehicle(schoolBus)}
                      className="px-4 py-2 bg-white text-rose-900 font-extrabold text-xs rounded-xl shadow-sm hover:bg-rose-50"
                    >
                      View Live Location
                    </button>
                    <button
                      onClick={() => alert('Dialing St. Jude Academy Safety Line: +1 (555) 992-8800')}
                      className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs rounded-xl border border-rose-500 flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Contact School Admin
                    </button>
                  </div>
                </div>
              )}

              {/* CHILD & BUS TRACKER CARD */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm space-y-4">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">Emma Vance</h4>
                          <span className="text-xs text-slate-500 font-medium">St. Jude Academy • Grade 5</span>
                        </div>
                      </div>
                      <StatusBadge type={schoolBus.hasDeviation ? 'DEVIATED' : 'ON ROUTE'} text={schoolBus.hasDeviation ? '⚠ DEVIATED' : '🟢 ON ROUTE'} />
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Assigned Bus:</span>
                          <strong className="text-slate-900 font-bold">{schoolBus.name} ({schoolBus.type})</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Assigned Driver:</span>
                          <strong className="text-slate-800">{schoolBus.driver}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Current Route:</span>
                          <strong className="text-purple-700 font-bold">{schoolBus.routeName}</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
                          <span className="text-purple-700 block text-[10px] uppercase font-bold">Upcoming Stop</span>
                          <strong className="text-slate-900 text-sm font-extrabold">{schoolBus.upcomingStop || 'Green Park Stop'}</strong>
                        </div>
                        <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                          <span className="text-blue-700 block text-[10px] uppercase font-bold">Home ETA</span>
                          <strong className="text-blue-900 text-sm font-extrabold">{schoolBus.etaMinutes} mins</strong>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => triggerDeviation(schoolBus.id)}
                          className="w-full py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                        >
                          Simulate Test Safety Alert
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="lg:col-span-7">
                  <MapView filteredCategory="school" height="h-[520px]" />
                </div>

              </div>
            </div>
          )}
        </>
      )}

      {/* SCHOOL AUTHORITY DASHBOARD VIEW */}
      {viewMode === 'authority' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              St. Jude Academy Transportation Authority Control
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Vehicle</th>
                    <th className="p-3">Assigned Driver</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Deviation</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{schoolBus.name}</td>
                    <td className="p-3 text-slate-700">{schoolBus.driver}</td>
                    <td className="p-3 text-purple-700 font-bold">{schoolBus.routeName}</td>
                    <td className="p-3">
                      <StatusBadge type={schoolBus.hasDeviation ? 'DEVIATED' : 'ON ROUTE'} />
                    </td>
                    <td className="p-3 text-rose-600 font-bold">
                      {schoolBus.hasDeviation ? `${schoolBus.deviationDistance || '650m'} (${schoolBus.deviationDuration || '2m 14s'})` : 'None'}
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          const reasons = ['Road blocked by construction', 'Traffic bottleneck detour', 'Emergency water main breakdown'];
                          const r = reasons[Math.floor(Math.random() * reasons.length)];
                          setDriverDetourReason(r);
                        }}
                        className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 font-semibold"
                      >
                        Contact Driver
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {driverDetourReason && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-xs space-y-1">
                <strong className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Driver Confirmation Received (Thomas Miller):
                </strong>
                <p>"{driverDetourReason}" — Route ETA updated automatically for parents.</p>
              </div>
            )}
          </div>

          <MapView filteredCategory="school" height="h-[460px]" />
        </div>
      )}

    </div>
  );
};
