import React, { useState } from 'react';
import { 
  Bus, Ambulance, Truck, GraduationCap, ShieldAlert, BarChart3, 
  MapPin, Menu, X, Zap, ChevronDown, UserCheck, Layers, Bell
} from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { RoleModal } from './RoleModal';

export const Navbar = ({ activePage, setActivePage }) => {
  const { activeRole, alerts, triggerDeviation, vehicles } = useMobility();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeAlertCount = alerts.filter(a => !a.resolved).length;

  const roleLabels = {
    passenger: '🚌 Passenger',
    parent: '👨‍👩‍👧 Parent',
    university: '🎓 University Student',
    emergency: '🚨 Emergency Operator',
    admin: '🏢 Fleet Authority'
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Layers },
    { id: 'public', label: 'Public Transport', icon: Bus },
    { id: 'emergency', label: 'Emergency', icon: Ambulance },
    { id: 'municipal', label: 'Municipal', icon: Truck },
    { id: 'school', label: 'School Bus', icon: ShieldAlert },
    { id: 'university', label: 'University', icon: GraduationCap },
    { id: 'admin', label: 'Admin Fleet', icon: MapPin },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: activeAlertCount },
    { id: 'routes', label: 'Routes', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* BRANDING */}
            <div 
              onClick={() => setActivePage('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img src="/logo.svg" alt="CONVERGE Logo" className="w-9 h-9 transition-transform group-hover:scale-105" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">CONVERGE</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">PROTOTYPE</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
                  Real-Time Mobility & Safety Intelligence Platform
                </p>
              </div>
            </div>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
              {navItems.slice(0, 6).map(item => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60 shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* ACTION CONTROLS */}
            <div className="flex items-center gap-2">
              {/* Role Switcher Pill */}
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-200 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{roleLabels[activeRole] || 'Switch Role'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Alerts Quick Access */}
              <button
                onClick={() => setActivePage('alerts')}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title="Alert Center"
              >
                <Bell className="w-4 h-4" />
                {activeAlertCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                    {activeAlertCount}
                  </span>
                )}
              </button>

              {/* Live Test Trigger Button */}
              <button
                onClick={() => {
                  const target = vehicles.find(v => v.category === 'public') || vehicles[0];
                  if (target) triggerDeviation(target.id);
                }}
                className="hidden xl:flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold py-1.5 px-2.5 rounded-xl border border-amber-200 transition-colors"
                title="Simulate Route Deviation Event"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulate Dev</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1 text-xs font-semibold shadow-lg">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between ${
                    isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Role Selection Modal */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectRole={(role) => {
          if (role === 'parent') setActivePage('school');
          else if (role === 'university') setActivePage('university');
          else if (role === 'emergency') setActivePage('emergency');
          else if (role === 'admin') setActivePage('admin');
          else setActivePage('public');
        }}
      />
    </>
  );
};
