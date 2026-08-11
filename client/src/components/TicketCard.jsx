import React, { useState } from 'react';
import { Ticket, QrCode, ArrowUpRight, ArrowDownLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { useMobility } from '../context/MobilityContext';
import { CrowdIndicator } from './CrowdIndicator';

export const TicketCard = ({ targetBusId = 'bus-p24' }) => {
  const { vehicles, boardTicket, exitTicket } = useMobility();
  const currentBus = vehicles.find(v => v.id === targetBusId) || vehicles[0] || { occupancy: 42, capacity: 50, name: 'Bus P-24' };
  
  const [ticketDetails] = useState({
    ticketId: 'CNV-8942-TK',
    passengerName: 'Alex Vance',
    boardingStop: 'Central Station',
    destinationStop: 'University Plaza',
    time: '14:25 PM',
    busName: currentBus.name
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 max-w-md w-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            C
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Smart Ticketing</h4>
            <p className="text-[11px] text-slate-500 font-medium">CONVERGE Contactless Transit Pass</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          VALID TICKET
        </span>
      </div>

      {/* Ticket Details Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 space-y-3 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Passenger</span>
            <h5 className="font-bold text-base text-slate-50">{ticketDetails.passengerName}</h5>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Ticket ID</span>
            <p className="font-mono text-xs text-blue-400 font-semibold">{ticketDetails.ticketId}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-700/80 pt-3">
          <div>
            <span className="text-slate-400 block text-[10px]">Boarding</span>
            <strong className="text-slate-200">{ticketDetails.boardingStop}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Destination</span>
            <strong className="text-slate-200">{ticketDetails.destinationStop}</strong>
          </div>
        </div>

        {/* QR Code Simulation */}
        <div className="bg-white rounded-lg p-3 text-slate-900 flex items-center justify-between mt-2">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Assigned Transit</span>
            <span className="font-extrabold text-sm text-blue-600 block">{currentBus.name}</span>
            <span className="text-[10px] text-slate-400 block">{ticketDetails.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-14 h-14 bg-slate-900 rounded p-1 flex items-center justify-center text-white">
              <QrCode className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scan Simulation Controls */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Live Vehicle Occupancy Counter</span>
          <span className="font-bold text-blue-600 text-sm">{currentBus.occupancy} / {currentBus.capacity} Pass</span>
        </div>

        <CrowdIndicator occupancy={currentBus.occupancy} capacity={currentBus.capacity} showDetails={false} />

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => boardTicket(currentBus.id)}
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowUpRight className="w-4 h-4" /> Board (+1)
          </button>
          <button
            onClick={() => exitTicket(currentBus.id)}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-900 active:scale-98 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowDownLeft className="w-4 h-4" /> Exit (-1)
          </button>
        </div>
      </div>
    </div>
  );
};
