import React from 'react';
import { Sparkles, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CrowdIndicator } from './CrowdIndicator';
import { StatusBadge } from './StatusBadge';

export const SmartBusRecommendation = ({ onSelectBus }) => {
  const bus24 = {
    id: 'bus-p24',
    name: 'Bus 24',
    eta: '4 min',
    occupancy: 42,
    capacity: 50,
    crowd: 'HIGH',
    recommended: false
  };

  const bus31 = {
    id: 'bus-p31',
    name: 'Bus 31',
    eta: '8 min',
    occupancy: 18,
    capacity: 50,
    crowd: 'LOW',
    recommended: true,
    reason: 'Bus 31 arrives 4 minutes later but has 57% lower crowd density.'
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Which bus should I take?</h3>
            <p className="text-xs text-slate-500 font-medium">Smart AI Crowd & Frequency Optimization</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
          Real-Time Decision Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bus 24 Option */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center text-sm">
                24
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Bus 24</h4>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ETA: {bus24.eta}
                </span>
              </div>
            </div>
            <StatusBadge type="HIGH" text="🔴 HIGH" />
          </div>

          <CrowdIndicator occupancy={bus24.occupancy} capacity={bus24.capacity} />

          <button 
            onClick={() => onSelectBus && onSelectBus(bus24.id)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            Select Bus 24 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bus 31 Recommended Option */}
        <div className="border-2 border-blue-500 rounded-xl p-4 bg-blue-50/30 hover:bg-blue-50/50 transition-all space-y-3 relative shadow-xs">
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> RECOMMENDED
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                31
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Bus 31</h4>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> ETA: {bus31.eta}
                </span>
              </div>
            </div>
            <StatusBadge type="LOW" text="🟢 LOW" />
          </div>

          <CrowdIndicator occupancy={bus31.occupancy} capacity={bus31.capacity} />

          <div className="bg-blue-100/70 border border-blue-200/80 rounded-lg p-2.5 text-xs text-blue-900 font-medium leading-relaxed">
            "{bus31.reason}"
          </div>

          <button 
            onClick={() => onSelectBus && onSelectBus(bus31.id)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            Take Recommended Bus 31 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
