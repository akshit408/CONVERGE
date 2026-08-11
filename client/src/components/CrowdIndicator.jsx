import React from 'react';
import { StatusBadge } from './StatusBadge';

export const CrowdIndicator = ({ occupancy, capacity, showDetails = true }) => {
  const pct = Math.min(100, Math.round((occupancy / capacity) * 100));
  
  let crowdType = 'LOW';
  let barColor = 'bg-emerald-500';

  if (pct > 100) {
    crowdType = 'OVERCAPACITY';
    barColor = 'bg-slate-900';
  } else if (pct > 75) {
    crowdType = 'HIGH';
    barColor = 'bg-rose-500';
  } else if (pct > 40) {
    crowdType = 'MODERATE';
    barColor = 'bg-amber-500';
  }

  return (
    <div className="w-full space-y-1.5">
      {showDetails && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Occupancy: <strong className="text-slate-800 font-semibold">{occupancy} / {capacity}</strong> ({pct}%)</span>
          <StatusBadge type={crowdType} size="sm" />
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
};
