import React, { useState } from 'react';
import { CadetProfile, CadetStats } from '../types/fireTraining';
import { generateExtinguisherCertificatePdf } from '../utils/generateExtinguisherPdf';
import { sounds } from '../utils/soundEffects';

interface CadetProfileModalProps {
  profile: CadetProfile;
  stats: CadetStats;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updated: CadetProfile) => void;
}

export const CadetProfileModal: React.FC<CadetProfileModalProps> = ({
  profile,
  stats,
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [name, setName] = useState(profile.name);
  const [badgeId, setBadgeId] = useState(profile.badgeId);
  const [division, setDivision] = useState(profile.division);
  const [assessorName, setAssessorName] = useState(profile.assessorName);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playCorrect();
    onSaveProfile({
      name: name.trim() || 'KSIA Responder',
      badgeId: badgeId.trim() || 'KSIA-ERT-2026',
      division,
      assessorName: assessorName.trim() || 'Lead Tactical Evaluator',
      certificationDate: new Date().toLocaleDateString()
    });
    onClose();
  };

  const handleDownloadPdf = () => {
    sounds.playVictory();
    generateExtinguisherCertificatePdf(
      {
        name: name.trim() || 'KSIA Responder',
        badgeId: badgeId.trim() || 'KSIA-ERT-2026',
        division,
        assessorName: assessorName.trim() || 'Lead Tactical Evaluator',
        certificationDate: new Date().toLocaleDateString()
      },
      stats
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0a0f1a] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-semibold">
              CADET PROFILE & CERTIFICATION
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Emergency Response Directorate Record
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 block">Cadet Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tariq Al-Ghamdi"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 block">Badge ID Number:</label>
              <input
                type="text"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                placeholder="e.g. KSIA-ERT-8842"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 block">Airport Division:</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="Apron & Ramp ERT">Apron & Ramp ERT</option>
                <option value="ARFF Crash Rescue">ARFF Crash Rescue</option>
                <option value="Terminal Operations">Terminal Operations</option>
                <option value="Avionics & Infrastructure">Avionics & Infrastructure</option>
                <option value="Catering Logistics">Catering Logistics</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 block">Lead Evaluator Name:</label>
            <input
              type="text"
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
              placeholder="e.g. Chief Instructor Al-Otaibi"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Performance Audit Highlights */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold block">
              Cumulative Drill Performance
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block">Fires Put Out</span>
                <strong className="text-white text-sm">{stats.firesExtinguished}</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block">Blitz Best</span>
                <strong className="text-amber-400 text-sm">{stats.blitzHighScore}</strong>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block">Streak Record</span>
                <strong className="text-emerald-400 text-sm">{stats.blitzStreakRecord}x</strong>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
            >
              <span>📄 DOWNLOAD OFFICIAL PDF CERTIFICATE</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
              >
                SAVE RECORD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
