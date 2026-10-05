import React, { useState } from 'react';
import { 
  User, 
  BadgeCheck, 
  ArrowRight, 
  Flame, 
  Droplets, 
  Zap, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { CadetProfile } from '../types/fireTraining';

interface CadetIntakeSplashProps {
  initialProfile?: CadetProfile;
  onStartDrill: (profile: CadetProfile) => void;
}

export const CadetIntakeSplash: React.FC<CadetIntakeSplashProps> = ({
  onStartDrill
}) => {
  // Pre-empty name and employee ID boxes as requested
  const [name, setName] = useState('');
  const [badgeId, setBadgeId] = useState('');

  const isNameValid = name.trim().length >= 2;
  const isBadgeValid = badgeId.trim().length >= 2;
  const isValid = isNameValid && isBadgeValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    onStartDrill({
      name: name.trim(),
      badgeId: badgeId.trim().toUpperCase(),
      division: 'Administration Directorate',
      assessorName: 'Lead Tactical Evaluator',
      certificationDate: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05080f]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="max-w-xl w-full my-auto space-y-4 sm:space-y-6 max-h-[96vh] overflow-y-auto">
        {/* Emblem & Academy Header */}
        <div className="bg-[#0a0f1a] border border-amber-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_0_60px_rgba(245,158,11,0.15)] relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

          {/* Directorate Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>KSIA Airport Office Safety Academy</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1.5">
            Airport Office Fire Safety Drill
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-4">
            Enter your name and employee ID before every attempt. This information is required for your official evaluation report upon completing the 10 office fire scenarios.
          </p>

          {/* Core Extinguishers Triad Showcase */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-4 text-left">
            <div className="bg-slate-900/90 border border-sky-500/30 p-2 sm:p-2.5 rounded-xl">
              <div className="flex items-center gap-1 text-sky-400 font-bold text-[11px] sm:text-xs mb-0.5">
                <Droplets className="w-3 h-3 shrink-0" />
                <span className="truncate">Water</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight">
                Class A: Paper archives, desks &amp; files
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-700 p-2 sm:p-2.5 rounded-xl">
              <div className="flex items-center gap-1 text-slate-200 font-bold text-[11px] sm:text-xs mb-0.5">
                <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">CO2 Gas</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight">
                Class C: Live copiers, PCs &amp; servers
              </div>
            </div>

            <div className="bg-slate-900/90 border border-amber-500/30 p-2 sm:p-2.5 rounded-xl">
              <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px] sm:text-xs mb-0.5">
                <Flame className="w-3 h-3 shrink-0" />
                <span className="truncate">ABC Powder</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight">
                Class B: Solvents, wax &amp; pantry oil
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs uppercase font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Responder Credentials
              </span>
              <span className="text-[10px] font-mono text-slate-500">MANDATORY</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Full Name <span className="text-rose-400">*</span>
                  {isNameValid && <span className="text-[10px] text-emerald-400 font-mono ml-auto">✓ Verified</span>}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className={`w-full min-h-[44px] bg-slate-900 border rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 transition-colors ${
                    isNameValid ? 'border-emerald-500/60 focus:border-emerald-500' : 'border-slate-700 focus:border-amber-500'
                  }`}
                />
                {!isNameValid && name.length > 0 && (
                  <span className="text-[10px] text-rose-400 block mt-0.5 font-mono">
                    Name must be at least 2 characters
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-400" />
                  Employee ID Number <span className="text-rose-400">*</span>
                  {isBadgeValid && <span className="text-[10px] text-emerald-400 font-mono ml-auto">✓ Verified</span>}
                </label>
                <input
                  type="text"
                  required
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  placeholder="Enter employee ID (e.g. EMP-10492)"
                  className={`w-full min-h-[44px] bg-slate-900 border rounded-xl px-3.5 py-2 text-sm font-mono text-white placeholder-slate-500 transition-colors ${
                    isBadgeValid ? 'border-emerald-500/60 focus:border-emerald-500' : 'border-slate-700 focus:border-amber-500'
                  }`}
                />
                {!isBadgeValid && badgeId.length > 0 && (
                  <span className="text-[10px] text-rose-400 block mt-0.5 font-mono">
                    Employee ID must be at least 2 characters
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full min-h-[48px] py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25 active:scale-[0.99] cursor-pointer"
                >
                  <span>{isValid ? 'START 10-FIRE OFFICE DRILL' : 'ENTER NAME & EMPLOYEE ID TO UNLOCK APP'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 pt-0.5">
                  Official evaluation report with time &amp; score downloaded upon completing or controlling the fire.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
