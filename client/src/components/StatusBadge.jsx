import React from 'react';

export const StatusBadge = ({ type, text, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  let colors = 'bg-slate-100 text-slate-700 border-slate-200';

  switch (type) {
    case 'LOW':
    case 'NORMAL':
    case 'AVAILABLE':
    case 'ON ROUTE':
    case 'ACTIVE':
    case 'SAFE':
      colors = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      break;
    case 'MODERATE':
    case 'ASSIGNED':
    case 'WARNING':
      colors = 'bg-amber-50 text-amber-700 border-amber-200/80';
      break;
    case 'HIGH':
    case 'RESPONDING':
    case 'CRITICAL':
    case 'DEVIATED':
    case 'DANGER':
      colors = 'bg-rose-50 text-rose-700 border-rose-200/80';
      break;
    case 'OVERCAPACITY':
    case 'OFFLINE':
      colors = 'bg-slate-900 text-slate-100 border-slate-700';
      break;
    case 'RECOMMENDED':
      colors = 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/20';
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs font-medium ${sizeClasses} ${colors}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        type === 'LOW' || type === 'ACTIVE' || type === 'AVAILABLE' ? 'bg-emerald-500' :
        type === 'MODERATE' || type === 'WARNING' ? 'bg-amber-500' :
        type === 'HIGH' || type === 'RESPONDING' || type === 'DEVIATED' ? 'bg-rose-500' : 'bg-slate-400'
      }`}></span>
      {text || type}
    </span>
  );
};
