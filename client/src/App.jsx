import React, { useState } from 'react';
import { MobilityProvider, useMobility } from './context/MobilityContext';
import { Navbar } from './components/Navbar';
import { ToastNotification } from './components/ToastNotification';
import { LandingPage } from './pages/LandingPage';
import { PublicTransportPage } from './pages/PublicTransportPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { MunicipalPage } from './pages/MunicipalPage';
import { SchoolParentPage } from './pages/SchoolParentPage';
import { UniversityStudentPage } from './pages/UniversityStudentPage';
import { AdminFleetPage } from './pages/AdminFleetPage';
import { AlertCenterPage } from './pages/AlertCenterPage';
import { RouteManagementPage } from './pages/RouteManagementPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { Bus, Ambulance, Truck, GraduationCap, ShieldAlert, MapPin, Bell, Layers, Zap } from 'lucide-react';

const MainContent = () => {
  const [activePage, setActivePage] = useState('landing');
  const { vehicles, triggerDeviation } = useMobility();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* NAVBAR */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* LIVE SIMULATION QUICK BANNER */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-300">Live GPS Simulation Engine Active:</span>
          <span className="text-slate-400 hidden sm:inline">12 Fleet Vehicles updating every 2.5s</span>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => {
                const target = vehicles.find(v => v.category === 'public') || vehicles[0];
                if (target) triggerDeviation(target.id);
              }}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-2.5 py-0.5 rounded border border-amber-500/40 text-[11px] flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-amber-400" /> Trigger Route Dev
            </button>
          </div>
        </div>
      </div>

      {/* PAGE CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
        {activePage === 'landing' && (
          <LandingPage 
            onExplore={(page) => setActivePage(page)} 
            onRoleSelect={(role) => {
              if (role === 'parent') setActivePage('school');
              else if (role === 'university') setActivePage('university');
              else if (role === 'emergency') setActivePage('emergency');
              else if (role === 'admin') setActivePage('admin');
              else setActivePage('public');
            }}
          />
        )}
        {activePage === 'public' && <PublicTransportPage />}
        {activePage === 'emergency' && <EmergencyPage />}
        {activePage === 'municipal' && <MunicipalPage />}
        {activePage === 'school' && <SchoolParentPage />}
        {activePage === 'university' && <UniversityStudentPage />}
        {activePage === 'admin' && <AdminFleetPage />}
        {activePage === 'alerts' && <AlertCenterPage />}
        {activePage === 'routes' && <RouteManagementPage />}
        {activePage === 'analytics' && <AnalyticsPage />}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <img src="/logo.svg" className="w-5 h-5" alt="CONVERGE" />
            <span>CONVERGE — Real-Time Mobility & Safety Intelligence Platform</span>
          </div>
          <div>
            Tagline: <strong>One Platform. Every Journey.</strong>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR (Requirement #26) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 flex items-center justify-around text-[10px] font-bold text-slate-600 shadow-lg">
        <button
          onClick={() => setActivePage('landing')}
          className={`flex flex-col items-center gap-0.5 ${activePage === 'landing' ? 'text-blue-600' : ''}`}
        >
          <Layers className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActivePage('public')}
          className={`flex flex-col items-center gap-0.5 ${activePage === 'public' ? 'text-blue-600' : ''}`}
        >
          <Bus className="w-4 h-4" />
          <span>Public</span>
        </button>
        <button
          onClick={() => setActivePage('emergency')}
          className={`flex flex-col items-center gap-0.5 ${activePage === 'emergency' ? 'text-rose-600' : ''}`}
        >
          <Ambulance className="w-4 h-4" />
          <span>Emerg</span>
        </button>
        <button
          onClick={() => setActivePage('school')}
          className={`flex flex-col items-center gap-0.5 ${activePage === 'school' ? 'text-purple-600' : ''}`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>School</span>
        </button>
        <button
          onClick={() => setActivePage('admin')}
          className={`flex flex-col items-center gap-0.5 ${activePage === 'admin' ? 'text-slate-900' : ''}`}
        >
          <MapPin className="w-4 h-4" />
          <span>Admin</span>
        </button>
      </div>

      {/* GLOBAL TOAST ALERTS */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <MobilityProvider>
      <MainContent />
    </MobilityProvider>
  );
}
