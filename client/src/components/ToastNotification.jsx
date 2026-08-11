import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';

export const ToastNotification = () => {
  const { toast } = useMobility();

  if (!toast) return null;

  const bgMap = {
    success: 'bg-emerald-900 text-emerald-50 border-emerald-700',
    warning: 'bg-amber-900 text-amber-50 border-amber-700',
    danger: 'bg-rose-900 text-rose-50 border-rose-700',
    info: 'bg-slate-900 text-slate-50 border-slate-700'
  };

  const IconMap = {
    success: CheckCircle2,
    warning: AlertTriangle,
    danger: AlertCircle,
    info: Info
  };

  const Icon = IconMap[toast.type] || Info;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-bounce-in">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-xl ${bgMap[toast.type] || bgMap.info}`}>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium tracking-wide leading-tight">{toast.message}</span>
      </div>
    </div>
  );
};
