import React from 'react';
import { 
  Bus, Ambulance, Truck, GraduationCap, ArrowRight, ShieldCheck, 
  MapPin, Clock, Users, Navigation, AlertTriangle, Activity, Sparkles 
} from 'lucide-react';
import { MapView } from '../components/MapView';

export const LandingPage = ({ onExplore, onRoleSelect }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Mobility Intelligence
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                CONVERGE
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-blue-400">
                Real-Time Mobility & Safety Intelligence
              </p>
            </div>

            <p className="text-base text-slate-300 font-medium leading-relaxed max-w-xl">
              "One platform connecting public transport, emergency services, municipal fleets and educational transportation."
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExplore('public')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                Explore CONVERGE <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onExplore('admin')}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 transition-colors"
              >
                View Live Fleet Demo
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">4 Core Domains</span>
                <strong className="text-white text-sm font-bold">Public • Emerg • Muni • Edu</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Smart Crowd AI</span>
                <strong className="text-emerald-400 text-sm font-bold">Smart Ticketing Sync</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Safety Guard</span>
                <strong className="text-amber-400 text-sm font-bold">Dev Deviation Alert</strong>
              </div>
            </div>
          </div>

          {/* HERO VISUAL: Live Map preview showing converging routes */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
              <span className="flex items-center gap-1.5 text-blue-300">
                <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> Live Multi-Domain GPS Convergence Map
              </span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                5 Vehicles Active
              </span>
            </div>
            <MapView filteredCategory="all" height="h-[380px]" />
          </div>
        </div>
      </section>

      {/* SECTION HEADER: ONE PLATFORM. EVERY JOURNEY. */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            One Platform. Every Journey.
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Bridging fragmented city transit systems into a single real-time intelligence hub.
          </p>
        </div>

        {/* FOUR DOMAIN CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div 
            onClick={() => onExplore('public')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Public Transport</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                "Track buses, understand crowd levels and choose smarter journeys."
              </p>
            </div>
            <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
              Explore Passenger Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onExplore('emergency')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-300 transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Ambulance className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Emergency</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                "Locate emergency vehicles and monitor response in real time."
              </p>
            </div>
            <div className="text-xs font-bold text-rose-600 flex items-center gap-1">
              Open Control Center <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onExplore('municipal')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Municipal</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                "Monitor service vehicles and ensure routes are completed efficiently."
              </p>
            </div>
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
              View Fleet Tasks <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onExplore('school')}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Education</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                "Connect schools, universities, parents and students with safer transportation."
              </p>
            </div>
            <div className="text-xs font-bold text-purple-600 flex items-center gap-1">
              Access Portals <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRODUCT QUESTIONS ANSWERED */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-900">What Questions Does CONVERGE Answer?</h3>
          <p className="text-xs text-slate-500 font-medium">Solving key transportation questions for every stakeholder</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* For Passengers */}
          <div className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
              <Bus className="w-4 h-4 text-blue-600" /> For Passengers
            </h4>
            <ul className="space-y-1.5 text-slate-700 font-medium list-disc list-inside">
              <li>Where is my vehicle?</li>
              <li>When will it arrive?</li>
              <li>How crowded is it?</li>
              <li>Is it following expected route?</li>
              <li>Should I take this bus or wait?</li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="space-y-2 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
            <h4 className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> For School Parents
            </h4>
            <ul className="space-y-1.5 text-slate-700 font-medium list-disc list-inside">
              <li>Where is my child's bus?</li>
              <li>Is it following correct route?</li>
              <li>When will it reach home stop?</li>
              <li>Is there any safety issue?</li>
            </ul>
          </div>

          {/* For University */}
          <div className="space-y-2 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" /> For University Students
            </h4>
            <ul className="space-y-1.5 text-slate-700 font-medium list-disc list-inside">
              <li>Where are university buses?</li>
              <li>Which bus should I take?</li>
              <li>What is the live ETA?</li>
              <li>What route does it follow?</li>
            </ul>
          </div>

          {/* For Authorities */}
          <div className="space-y-2 bg-slate-100 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-700" /> For Authorities
            </h4>
            <ul className="space-y-1.5 text-slate-700 font-medium list-disc list-inside">
              <li>Where are all vehicles?</li>
              <li>Which vehicles have problems?</li>
              <li>Which routes are crowded?</li>
              <li>Where should resources go?</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};
