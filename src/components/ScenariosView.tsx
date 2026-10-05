import React, { useState } from 'react';
import { SCENARIOS } from '../data/scenariosData';
import { EXTINGUISHERS } from '../data/extinguishersData';
import { FIRE_CLASSES } from '../data/fireClassesData';
import { ExtinguisherType, SimulationScenario } from '../types/fireTraining';
import { FireSimulationCanvas } from './FireSimulationCanvas';
import { ExtinguisherModel } from './ExtinguisherGraphics';
import { FireClassSymbol } from './FireClassGraphics';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface ScenariosViewProps {
  onMissionCompleted?: (missionId: string, badge?: string) => void;
  className?: string;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({ onMissionCompleted, className = '' }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);
  const [stage, setStage] = useState<'BRIEFING' | 'STAGING' | 'SIMULATION' | 'DEBRIEF'>('BRIEFING');
  const [chosenExtinguisher, setChosenExtinguisher] = useState<ExtinguisherType>('AFFF_FOAM');
  const [pinPulled, setPinPulled] = useState<boolean>(false);

  // Debrief stats
  const [debriefData, setDebriefData] = useState<{
    success: boolean;
    timeTakenSec: number;
    agentUsedPercent: number;
    techniqueScore: number;
    catastropheInfo?: { title: string; desc: string };
  } | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const fireClassInfo = FIRE_CLASSES[scenario.fireClass];

  const availableExtinguishers: ExtinguisherType[] = [
    'WATER_APW',
    'AFFF_FOAM',
    'CO2',
    'ABC_DRY_POWDER',
    'BC_PURPLE_K',
    'CLASS_D_POWDER',
    'WET_CHEMICAL',
    'CLEAN_AGENT'
  ];

  const handleStartMission = () => {
    setStage('STAGING');
    setPinPulled(false);
    setDebriefData(null);
    sounds.playClick();
  };

  const handleConfirmExtinguisher = () => {
    setStage('SIMULATION');
    sounds.playAlarm();
  };

  const handlePullPin = () => {
    setPinPulled(true);
    sounds.playCorrect();
  };

  const handleFireExtinguished = (stats: { timeTakenSec: number; agentUsedPercent: number; techniqueScore: number }) => {
    setDebriefData({
      success: true,
      timeTakenSec: stats.timeTakenSec,
      agentUsedPercent: stats.agentUsedPercent,
      techniqueScore: stats.techniqueScore
    });
    setStage('DEBRIEF');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    if (onMissionCompleted) {
      onMissionCompleted(scenario.id, scenario.badgeUnlock);
    }
  };

  const handleCatastrophe = (hazard: { title: string; desc: string; type: string }) => {
    setDebriefData({
      success: false,
      timeTakenSec: 0,
      agentUsedPercent: 100,
      techniqueScore: 0,
      catastropheInfo: {
        title: hazard.title,
        desc: hazard.desc
      }
    });
    setStage('DEBRIEF');
  };

  const handleResetMission = () => {
    setStage('BRIEFING');
    setPinPulled(false);
    setDebriefData(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Scenario Selection Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {SCENARIOS.map((sc) => {
          const isCurrent = sc.id === scenario.id;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setStage('BRIEFING');
                setDebriefData(null);
                setPinPulled(false);
              }}
              className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 text-left transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  CLASS {sc.fireClass}
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <strong className="text-xs text-white line-clamp-2 leading-tight">
                {sc.title.split(':')[0]}
              </strong>
              <span className="text-[10px] text-slate-400 truncate max-w-full">
                {sc.airportZone.split('-')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. STAGE: BRIEFING */}
      {stage === 'BRIEFING' && (
        <div className="bg-[#0a0f1a] rounded-xl border border-slate-800 p-6 space-y-6">
          {/* Incident Banner */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                AIRPORT TACTICAL MISSION DISPATCH
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {scenario.title}
              </h2>
              <p className="text-xs text-slate-400">
                Location: <strong className="text-slate-200">{scenario.airportZone}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FireClassSymbol fireClass={scenario.fireClass} size="md" />
            </div>
          </div>

          {/* Operational Briefing & Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-500 uppercase">
                  Incident Size-Up & Description:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {scenario.incidentBriefing}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900 rounded-lg text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Identified Fuel Material:</span>
                  <span className="text-amber-400 font-bold">{scenario.fuelName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Combustion Classification:</span>
                  <span className="text-white font-bold">Class {scenario.fireClass} ({fireClassInfo.subtitle})</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                <strong className="text-xs font-bold text-amber-400 block font-mono">
                  Proximity Hazards:
                </strong>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {scenario.ambientConditions.proximityHazards}
                </p>
              </div>
            </div>

            {/* Environmental Conditions */}
            <div className="md:col-span-4 bg-slate-950/80 rounded-xl border border-slate-800 p-4 space-y-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block border-b border-slate-800 pb-2">
                Field Ambient Telemetry
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Airfield Wind Speed:</span>
                  <span className="text-white font-bold">{scenario.ambientConditions.windSpeedKnots} Knots</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Wind Direction:</span>
                  <span className="text-white font-bold">{scenario.ambientConditions.windDirection}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Ambient Temperature:</span>
                  <span className="text-white font-bold">{scenario.ambientConditions.temperatureC}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Fire Intensity Index:</span>
                  <span className="text-rose-400 font-bold">{scenario.heatIntensity}/100</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartMission}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  STAGE RESPONSE RACK ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. STAGE: STAGING (EXTINGUISHER SELECTION) */}
      {stage === 'STAGING' && (
        <div className="bg-[#0a0f1a] rounded-xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                STEP 2: SELECT SUPPRESSION MEDIA
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                KSIA Emergency Equipment Rack
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Fuel: <strong className="text-amber-400">{scenario.fuelName}</strong> (Class {scenario.fireClass})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {availableExtinguishers.map((ext) => {
              const info = EXTINGUISHERS[ext];
              const isSelected = chosenExtinguisher === ext;
              return (
                <button
                  key={ext}
                  onClick={() => setChosenExtinguisher(ext)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/30 scale-105 shadow-xl'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <ExtinguisherModel type={ext} height={120} />
                  <span className="text-xs font-bold text-white text-center leading-tight">
                    {info.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono text-center">
                    {info.agentLabel.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Extinguisher Brief */}
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400">SELECTED AGENT FOR ATTACK:</span>
              <h4 className="text-sm font-bold text-white">
                {EXTINGUISHERS[chosenExtinguisher]?.name}
              </h4>
              <p className="text-xs text-slate-300">
                {EXTINGUISHERS[chosenExtinguisher]?.chemicalPrinciple}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStage('BRIEFING')}
                className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                BACK TO BRIEFING
              </button>
              <button
                onClick={handleConfirmExtinguisher}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-rose-900/30 cursor-pointer"
              >
                DEPLOY EXTINGUISHER TO FIRE LINE ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. STAGE: SIMULATION CANVAS */}
      {stage === 'SIMULATION' && (
        <div className="space-y-4">
          {/* Holster Actions Bar */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ExtinguisherModel type={chosenExtinguisher} height={60} />
              <div>
                <span className="text-xs font-mono text-slate-400 block">ACTIVE WEAPON:</span>
                <strong className="text-sm text-white">
                  {EXTINGUISHERS[chosenExtinguisher]?.name}
                </strong>
                <span className="text-xs text-slate-400 font-mono block">
                  Color Band: {EXTINGUISHERS[chosenExtinguisher]?.colorBandName}
                </span>
              </div>
            </div>

            {/* P.A.S.S. Step 1: Pull Pin Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePullPin}
                disabled={pinPulled}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider font-mono transition-all cursor-pointer ${
                  pinPulled
                    ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-400'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 animate-bounce'
                }`}
              >
                {pinPulled ? '✓ PIN PULLED (READY)' : '1. CLICK TO PULL PIN'}
              </button>
            </div>
          </div>

          {/* Real-time Interactive Fire Simulation Canvas */}
          <FireSimulationCanvas
            scenario={scenario}
            selectedExtinguisher={chosenExtinguisher}
            pinPulled={pinPulled}
            onFireExtinguished={handleFireExtinguished}
            onCatastropheTriggered={handleCatastrophe}
          />
        </div>
      )}

      {/* 4. STAGE: DEBRIEF & AFTER-ACTION REVIEW */}
      {stage === 'DEBRIEF' && debriefData && (
        <div className="bg-[#0a0f1a] rounded-xl border border-slate-800 p-8 space-y-6">
          {debriefData.success ? (
            /* MISSION SUCCESS DEBRIEF */
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 text-3xl font-bold">
                ✓
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block">
                  TACTICAL MISSION ACCOMPLISHED
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Fire Knocked Down & Surface Smothered!
                </h3>
                <p className="text-xs text-slate-400">
                  {scenario.title} — Official KSIA Incident Clearance
                </p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Suppression Time</span>
                  <strong className="text-lg text-white">{debriefData.timeTakenSec} Seconds</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Agent Consumed</span>
                  <strong className="text-lg text-sky-400">{debriefData.agentUsedPercent}%</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Sweep Technique</span>
                  <strong className="text-lg text-emerald-400">{debriefData.techniqueScore}/100</strong>
                </div>
              </div>

              {/* Badge Unlock Notification */}
              {scenario.badgeUnlock && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center gap-3">
                  <span className="text-xl">🎖️</span>
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-amber-400 block uppercase">Badge Earned</span>
                    <strong className="text-sm text-white">{scenario.badgeUnlock}</strong>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetMission}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  NEXT AIRPORT MISSION ➔
                </button>
              </div>
            </div>
          ) : (
            /* CATASTROPHIC FAILURE DEBRIEF */
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-500 text-3xl font-bold">
                ✕
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-semibold block">
                  INCIDENT FATAL CATASTROPHE
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {debriefData.catastropheInfo?.title || 'Fatal Extinguisher Incompatibility'}
                </h3>
                <p className="text-xs text-rose-300">
                  Critical safety violation under NFPA 10 & airport response guidelines
                </p>
              </div>

              {/* Chemical mechanism explanation */}
              <div className="p-5 bg-rose-950/40 rounded-xl border border-rose-500/40 text-left space-y-2">
                <strong className="text-xs font-mono text-rose-400 block uppercase">
                  Chemical Hazard Breakdown:
                </strong>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {debriefData.catastropheInfo?.desc}
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 text-left space-y-1">
                <span className="text-[11px] font-mono text-amber-400 block uppercase">
                  Tactical Lesson Learned:
                </span>
                <p>
                  Always verify the fuel material class before discharging an extinguisher. For {scenario.fuelName}, use {EXTINGUISHERS[scenario.recommendedExtinguisher]?.name}.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetMission}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-rose-900/30 cursor-pointer"
                >
                  RE-STAGE & RETRY DRILL
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
