import React from 'react';
import { Bus, Users, GraduationCap, Building2, ShieldAlert, X } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';

export const RoleModal = ({ isOpen, onClose, onSelectRole }) => {
  const { setActiveRole } = useMobility();

  if (!isOpen) return null;

  const roles = [
    {
      id: 'passenger',
      title: '🚌 Passenger',
      sub: 'Find public transportation, check live bus locations, view crowd levels & recommendation.',
      badge: 'Public Domain',
      color: 'hover:border-blue-500 hover:bg-blue-50/40'
    },
    {
      id: 'parent',
      title: '👨‍👩‍👧 Parent',
      sub: 'Secure school bus tracking for parents/guardians with OTP verification & safety alerts.',
      badge: 'School Domain',
      color: 'hover:border-purple-500 hover:bg-purple-50/40'
    },
    {
      id: 'university',
      title: '🎓 University Student',
      sub: 'Direct campus transit access, favorite routes, campus shuttle live locations & ETAs.',
      badge: 'University Domain',
      color: 'hover:border-indigo-500 hover:bg-indigo-50/40'
    },
    {
      id: 'emergency',
      title: '🚨 Emergency Operator',
      sub: 'Control center for Ambulances & Fire Trucks, nearest vehicle detection & priority dispatch.',
      badge: 'Emergency Services',
      color: 'hover:border-rose-500 hover:bg-rose-50/40'
    },
    {
      id: 'admin',
      title: '🏢 Fleet / Authority',
      sub: 'Unified city fleet management, live multi-domain map, route manager & predictive analytics.',
      badge: 'Authority Control',
      color: 'hover:border-slate-800 hover:bg-slate-100/50'
    }
  ];

  const handleSelect = (roleId) => {
    setActiveRole(roleId);
    if (onSelectRole) onSelectRole(roleId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-scale-up border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">How are you using CONVERGE?</h2>
            <p className="text-xs text-slate-500 font-medium">Select your role to access tailored mobility intelligence</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id)}
              className={`text-left p-4 rounded-2xl border border-slate-200 transition-all cursor-pointer space-y-2 ${r.color}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{r.title}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {r.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{r.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
