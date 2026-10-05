import React, { useState } from 'react';
import { FIRE_CLASSES } from '../data/fireClassesData';
import { EXTINGUISHERS } from '../data/extinguishersData';
import { FireClass, ExtinguisherType } from '../types/fireTraining';
import { FireClassSymbol, FireSceneIllustration } from './FireClassGraphics';
import { ExtinguisherModel, ExtinguisherAnatomyExplorer } from './ExtinguisherGraphics';

export const CodexView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CLASSES' | 'EXTINGUISHERS' | 'MATRIX' | 'ANATOMY'>('CLASSES');
  const [selectedClass, setSelectedClass] = useState<FireClass>('B');
  const [selectedExtinguisher, setSelectedExtinguisher] = useState<ExtinguisherType>('AFFF_FOAM');

  const currentClassInfo = FIRE_CLASSES[selectedClass];
  const currentExtinguisherInfo = EXTINGUISHERS[selectedExtinguisher];

  const fireClassesList: FireClass[] = ['A', 'B', 'C', 'D', 'K'];
  const extinguishersList: ExtinguisherType[] = [
    'WATER_APW',
    'AFFF_FOAM',
    'CO2',
    'ABC_DRY_POWDER',
    'BC_PURPLE_K',
    'CLASS_D_POWDER',
    'WET_CHEMICAL',
    'CLEAN_AGENT'
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg">
          {(
            [
              { id: 'CLASSES', label: 'Fire Classes (A-K)' },
              { id: 'EXTINGUISHERS', label: 'Extinguisher Specs' },
              { id: 'MATRIX', label: 'Tactical Suitability Matrix' },
              { id: 'ANATOMY', label: 'Extinguisher Anatomy' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-500 hidden sm:inline">
          NFPA 10 / BS EN3 / ICAO DOC 9137 STANDARDS
        </span>
      </div>

      {/* 1. FIRE CLASSES EXPLORER */}
      {activeTab === 'CLASSES' && (
        <div className="space-y-6">
          {/* Class Selectors Bar */}
          <div className="grid grid-cols-5 gap-3">
            {fireClassesList.map((fc) => {
              const info = FIRE_CLASSES[fc];
              const isSelected = selectedClass === fc;
              return (
                <button
                  key={fc}
                  onClick={() => setSelectedClass(fc)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20 shadow-lg scale-[1.02]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <FireClassSymbol fireClass={fc} size="sm" showLabel={false} />
                  <span className="text-xs font-bold text-white font-mono">CLASS {fc}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Class View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0f1a] rounded-xl border border-slate-800 p-6">
            {/* Left: Graphic Illustration and Symbol */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-4">
                <FireClassSymbol fireClass={selectedClass} size="lg" showLabel={false} />
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {currentClassInfo.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-mono">
                    {currentClassInfo.subtitle}
                  </p>
                </div>
              </div>

              {/* Rich Contextual Vector Scene */}
              <FireSceneIllustration fireClass={selectedClass} />

              {/* Prohibited Extinguisher Alert */}
              <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/30 space-y-1">
                <span className="text-xs font-bold text-rose-400 font-mono block">
                  CATASTROPHIC FAILURE WARNING:
                </span>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {currentClassInfo.catastropheWarning}
                </p>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Fuel Chemistry & Characteristics
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentClassInfo.combustionMechanism}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  King Salman International Airport Hazard Locations
                </span>
                <ul className="space-y-1.5">
                  {currentClassInfo.airportExamples.map((ex, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-500 font-mono">▸</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approved Extinguishers */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Recommended Suppression Media:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentClassInfo.primaryAgents.map((ag) => {
                    const ext = EXTINGUISHERS[ag];
                    return (
                      <span
                        key={ag}
                        className="px-2.5 py-1 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 rounded text-xs font-mono"
                      >
                        ✓ {ext?.name || ag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Standards notes */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>
                  <strong className="text-slate-300 font-mono">NFPA 10 Standard:</strong>{' '}
                  {currentClassInfo.nfpaDescription}
                </div>
                <div>
                  <strong className="text-slate-300 font-mono">BS EN3 European Standard:</strong>{' '}
                  {currentClassInfo.bsEn3Equivalent}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXTINGUISHER SPECS EXPLORER */}
      {activeTab === 'EXTINGUISHERS' && (
        <div className="space-y-6">
          {/* Extinguisher Grid Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {extinguishersList.map((ext) => {
              const info = EXTINGUISHERS[ext];
              const isSelected = selectedExtinguisher === ext;
              return (
                <button
                  key={ext}
                  onClick={() => setSelectedExtinguisher(ext)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20 scale-[1.02]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <ExtinguisherModel type={ext} height={70} />
                  <span className="text-[11px] font-bold text-white truncate max-w-full">
                    {info.name.split(' ')[0]}
                  </span>
                  <div
                    className="w-full h-1 rounded-full"
                    style={{ backgroundColor: info.colorBand === '#FFFFFF' ? '#CBD5E1' : info.colorBand }}
                  />
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Extinguisher Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0f1a] rounded-xl border border-slate-800 p-6">
            {/* Visual Extinguisher rendering with color band */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-xl border border-slate-800">
              <ExtinguisherModel type={selectedExtinguisher} height={220} />
              <div className="mt-4 text-center space-y-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                  {currentExtinguisherInfo.colorBandName}
                </span>
                <p className="text-[11px] text-slate-500 font-mono mt-1">
                  NOZZLE: {currentExtinguisherInfo.nozzleType}
                </p>
              </div>
            </div>

            {/* Extinguisher Technical Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {currentExtinguisherInfo.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-mono">
                    {currentExtinguisherInfo.agentLabel}
                  </p>
                </div>

                {/* Rating Badges */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-mono">RATED:</span>
                  {currentExtinguisherInfo.suitableClasses.map((fc) => (
                    <span
                      key={fc}
                      className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold"
                    >
                      {fc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Operating Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900 rounded-lg text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Discharge Duration:</span>
                  <span className="text-white font-bold">{currentExtinguisherInfo.dischargeDurationSec} Seconds</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Effective Range:</span>
                  <span className="text-white font-bold">{currentExtinguisherInfo.effectiveRangeMeters}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Operating Pressure:</span>
                  <span className="text-white font-bold">{currentExtinguisherInfo.operatingPressure}</span>
                </div>
              </div>

              {/* Chemical Principle */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Chemical Extinguishing Mechanism:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentExtinguisherInfo.chemicalPrinciple}
                </p>
              </div>

              {/* Advantages and Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
                    Tactical Advantages:
                  </span>
                  <ul className="space-y-1">
                    {currentExtinguisherInfo.tacticalAdvantages.map((adv, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-500">✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-rose-400 uppercase font-semibold">
                    Critical Hazards & Limitations:
                  </span>
                  <ul className="space-y-1">
                    {currentExtinguisherInfo.criticalLimitations.map((lim, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-rose-500">✕</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* P.A.S.S. Application Guidance */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs space-y-1">
                <strong className="text-amber-400 font-mono block">
                  P.A.S.S. Deployment Technique:
                </strong>
                <p className="text-amber-200/90">{currentExtinguisherInfo.passTechniqueNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TACTICAL MATRIX TABLE */}
      {activeTab === 'MATRIX' && (
        <div className="bg-[#0a0f1a] rounded-xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                NFPA 10 Comprehensive Suitability Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Cross-matching 8 portable extinguishing agents against international fire classes
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Recommended
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Catastrophic Danger
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3">EXTINGUISHER AGENT</th>
                  <th className="py-3 px-2 text-center text-emerald-400">CLASS A<br /><span className="text-[10px] text-slate-500">Solids</span></th>
                  <th className="py-3 px-2 text-center text-rose-400">CLASS B<br /><span className="text-[10px] text-slate-500">Liquids</span></th>
                  <th className="py-3 px-2 text-center text-blue-400">CLASS C<br /><span className="text-[10px] text-slate-500">Electrical</span></th>
                  <th className="py-3 px-2 text-center text-amber-400">CLASS D<br /><span className="text-[10px] text-slate-500">Metals</span></th>
                  <th className="py-3 px-2 text-center text-rose-500">CLASS K<br /><span className="text-[10px] text-slate-500">Kitchen Oils</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {extinguishersList.map((extKey) => {
                  const ext = EXTINGUISHERS[extKey];
                  return (
                    <tr key={extKey} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: ext.colorBand === '#FFFFFF' ? '#CBD5E1' : ext.colorBand }}
                        />
                        <span>{ext.name}</span>
                      </td>

                      {(['A', 'B', 'C', 'D', 'K'] as FireClass[]).map((fc) => {
                        const isSuitable = ext.suitableClasses.includes(fc);
                        const isProhibited = ext.prohibitedClasses.includes(fc);

                        return (
                          <td key={fc} className="py-3 px-2 text-center">
                            {isSuitable ? (
                              <span className="inline-block px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-bold">
                                ✓ YES
                              </span>
                            ) : isProhibited ? (
                              <span className="inline-block px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/50 text-rose-400 font-bold" title={ext.catastrophes[fc] || 'Dangerous'}>
                                ✕ DANGER
                              </span>
                            ) : (
                              <span className="text-slate-600 font-mono">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. ANATOMY EXPLORER */}
      {activeTab === 'ANATOMY' && <ExtinguisherAnatomyExplorer />}
    </div>
  );
};
