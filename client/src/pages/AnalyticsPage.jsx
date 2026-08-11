import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, ShieldAlert, Activity } from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend 
} from 'recharts';

export const AnalyticsPage = () => {
  const passengerDemandData = [
    { hour: '06:00', passengers: 420 },
    { hour: '08:00', passengers: 1480 },
    { hour: '10:00', passengers: 920 },
    { hour: '12:00', passengers: 780 },
    { hour: '14:00', passengers: 850 },
    { hour: '16:00', passengers: 1320 },
    { hour: '18:00', passengers: 1650 },
    { hour: '20:00', passengers: 610 }
  ];

  const crowdByRouteData = [
    { route: 'Route 12 (Downtown)', occupancyPct: 56 },
    { route: 'Route 24 (Metro)', occupancyPct: 84 },
    { route: 'Route 3 (School)', occupancyPct: 63 },
    { route: 'Campus Shuttle U1', occupancyPct: 78 }
  ];

  const emergencyResponseData = [
    { category: 'Cardiac / Medical', avgMinutes: 4.2 },
    { category: 'Fire / Heavy Rescue', avgMinutes: 5.8 },
    { category: 'Hazard Response', avgMinutes: 6.5 }
  ];

  const schoolDeviationData = [
    { day: 'Mon', deviations: 1 },
    { day: 'Tue', deviations: 0 },
    { day: 'Wed', deviations: 2 },
    { day: 'Thu', deviations: 0 },
    { day: 'Fri', deviations: 1 }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Predictive Mobility Analytics & Fleet Insights</h2>
            <p className="text-xs text-slate-500 font-medium">Passenger demand forecasting, crowd distribution & emergency response times</p>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: PASSENGER DEMAND BY HOUR */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Passenger Demand by Hour (Peak Travel Periods)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">HOURLY SYNC</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={passengerDemandData}>
                <defs>
                  <linearGradient id="colorPass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Area type="monotone" dataKey="passengers" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorPass)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: CROWD LEVEL BY ROUTE */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Average Crowd Density by Route (%)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">SMART TICKETING</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crowdByRouteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="route" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={11} unit="%" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Bar dataKey="occupancyPct" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: EMERGENCY RESPONSE TIMES */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-600" /> Average Emergency Response Time (Minutes)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">SIREN PRIORITY</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emergencyResponseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} unit=" min" />
                <YAxis type="category" dataKey="category" stroke="#94A3B8" fontSize={10} width={130} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Bar dataKey="avgMinutes" fill="#EF4444" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: SCHOOL BUS DEVIATIONS */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-600" /> School Bus Route Deviations (Weekly)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">GUARDIAN LOG</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schoolDeviationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Bar dataKey="deviations" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
