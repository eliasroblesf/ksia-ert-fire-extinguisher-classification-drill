/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KSIA Fire & ERT Directorate: Fire Classification & Extinguisher Training Academy
 * King Salman International Airport Emergency Response Directorate
 * 
 * Aligned with International Standards:
 * - NFPA 10: Standard for Portable Fire Extinguishers
 * - NFPA 402 / 403 / 1081: Aircraft Rescue and Fire-Fighting & Industrial Brigade
 * - ICAO Doc 9137 (Airport Services Manual - Part 1: Rescue and Fire Fighting)
 * - BS EN3: Portable Fire Extinguishers Classification & Color Band Standards
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  RotateCcw, 
  Award, 
  Volume2, 
  VolumeX, 
  User, 
  Timer, 
  CheckCircle2, 
  Download, 
  Droplets, 
  Zap, 
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Trophy,
  Building2,
  XCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CodexView } from './components/CodexView';
import { ScenariosView } from './components/ScenariosView';
import { RapidFireBlitz } from './components/RapidFireBlitz';
import { PASSMasterclass } from './components/PASSMasterclass';
import { FireSimulationCanvas } from './components/FireSimulationCanvas';
import { ExtinguisherModel } from './components/ExtinguisherGraphics';
import { CadetProfileModal } from './components/CadetProfileModal';
import { CadetIntakeSplash } from './components/CadetIntakeSplash';
import { FullScreenFireOverlay } from './components/FullScreenFireOverlay';
import { SCENARIOS } from './data/scenariosData';
import { EXTINGUISHERS } from './data/extinguishersData';
import { CadetProfile, CadetStats, ExtinguisherType, FireClass, SimulationScenario } from './types/fireTraining';
import { generateDrillReportPdf, ActivitySprintReportData, FireResultItem } from './utils/generateDrillReportPdf';
import { sounds } from './utils/soundEffects';

type NavTab = 'SIMULATOR' | 'CODEX' | 'SCENARIOS' | 'BLITZ' | 'PASS';

const DEFAULT_CADET: CadetProfile = {
  name: '',
  badgeId: '',
  division: 'Administration Directorate',
  assessorName: 'Lead Tactical Evaluator',
  certificationDate: new Date().toLocaleDateString()
};

const DEFAULT_STATS: CadetStats = {
  firesExtinguished: 0,
  catastrophesTriggered: 0,
  passRoundsCompleted: 0,
  blitzHighScore: 0,
  blitzStreakRecord: 0,
  missionsCompleted: [],
  badges: [],
  classProficiency: {
    A: { attempts: 0, correct: 0 },
    B: { attempts: 0, correct: 0 },
    C: { attempts: 0, correct: 0 },
    D: { attempts: 0, correct: 0 },
    K: { attempts: 0, correct: 0 }
  }
};

const CORE_EXTINGUISHERS: {
  type: ExtinguisherType;
  label: string;
  sublabel: string;
  badge: string;
  agentColor: string;
  icon: typeof Droplets;
}[] = [
  {
    type: 'WATER_APW',
    label: 'Water (APW)',
    sublabel: '9L Pressurized Water · High Quenching',
    badge: 'Class A: Paper, Archives & Furniture',
    agentColor: '#38bdf8',
    icon: Droplets
  },
  {
    type: 'CO2',
    label: 'CO2 Gas',
    sublabel: '5kg Clean Gas Discharge Horn · Non-Conductive',
    badge: 'Class C: Copiers, PCs & Server Racks',
    agentColor: '#cbd5e1',
    icon: Zap
  },
  {
    type: 'ABC_DRY_POWDER',
    label: 'ABC Powder',
    sublabel: '6kg Multi-Purpose · Vapor Blanketing',
    badge: 'Class B: Solvents, Waxes & Pantry Oils',
    agentColor: '#f59e0b',
    icon: Flame
  }
];

// Helper to shuffle the 10 scenarios in purely random order for every game
function shuffleScenarios(): SimulationScenario[] {
  const arr = [...SCENARIOS];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('SIMULATOR');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  // Load cadet profile & stats from localStorage
  const [cadet, setCadet] = useState<CadetProfile>(() => {
    try {
      const saved = localStorage.getItem('ksia_cadet_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.badgeId) return parsed;
      }
      return DEFAULT_CADET;
    } catch (e) {
      return DEFAULT_CADET;
    }
  });

  // Splash Screen control: Name and Employee ID required before every attempt
  const [showIntakeSplash, setShowIntakeSplash] = useState<boolean>(true);

  // Trigger a new attempt: opens splash screen so Name and Employee ID are entered before every attempt
  const handleStartNewAttempt = () => {
    setDrillCompletedModalOpen(false);
    setRestartConfirmModalOpen(false);
    setFullscreenCatastrophe(null);
    setShowIntakeSplash(true);
    sounds.playClick();
  };

  const [stats, setStats] = useState<CadetStats>(() => {
    try {
      const saved = localStorage.getItem('ksia_cadet_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch (e) {
      return DEFAULT_STATS;
    }
  });

  // Save cadet profile & stats to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('ksia_cadet_profile', JSON.stringify(cadet));
    } catch (e) {}
  }, [cadet]);

  useEffect(() => {
    try {
      localStorage.setItem('ksia_cadet_stats', JSON.stringify(stats));
    } catch (e) {}
  }, [stats]);

  // Audio mute toggle handler
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
  };

  // Top of page reference for auto-scroll on scenario advancement
  const topAnchorRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    topAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ============================================================
  // 10-FIRE 5-MINUTE SPRINT SIMULATOR STATE (NO DROPDOWN, PURE RANDOM)
  // ============================================================
  const [gauntletScenarios, setGauntletScenarios] = useState<SimulationScenario[]>(() => shuffleScenarios());
  const [currentFireIndex, setCurrentFireIndex] = useState<number>(0); // 0 to 9 (10 fires)
  const [sprintRemainingSec, setSprintRemainingSec] = useState<number>(300); // 5 minutes = 300s
  const [isSprintActive, setIsSprintActive] = useState<boolean>(false); // Armed, starts when first pin is removed!
  const [fireStopwatchSec, setFireStopwatchSec] = useState<number>(0);
  const [fireResults, setFireResults] = useState<FireResultItem[]>([]);

  // Active weapon & sandbox state
  const [sandboxExtinguisher, setSandboxExtinguisher] = useState<ExtinguisherType>('WATER_APW');
  const [sandboxPinPulled, setSandboxPinPulled] = useState<boolean>(false);
  const [liveFlameIntensity, setLiveFlameIntensity] = useState<number>(100);

  const [sandboxOutcome, setSandboxOutcome] = useState<{
    status: 'IDLE' | 'SUCCESS' | 'CATASTROPHE';
    message: string;
    details?: string;
  }>({ status: 'IDLE', message: '' });

  // Full-screen fire disaster state on wrong extinguisher deployment
  const [fullscreenCatastrophe, setFullscreenCatastrophe] = useState<{
    active: boolean;
    title: string;
    desc: string;
    type: string;
  } | null>(null);

  // Final Activity Report Modal State
  const [drillCompletedModalOpen, setDrillCompletedModalOpen] = useState<boolean>(false);
  const [activeSprintReport, setActiveSprintReport] = useState<ActivitySprintReportData | null>(null);

  // Restart warning confirmation modal state (Proceed or Cancel activity retry)
  const [restartConfirmModalOpen, setRestartConfirmModalOpen] = useState<boolean>(false);

  const promptRestartSprint = () => {
    setRestartConfirmModalOpen(true);
    sounds.playClick();
  };

  // Current active scenario
  const currentScenario = gauntletScenarios[currentFireIndex] || gauntletScenarios[0] || SCENARIOS[0];

  // Auto-scroll screen back to top whenever advancing scenarios sequentially
  useEffect(() => {
    scrollToTop();
  }, [currentFireIndex]);

  // Initialize or reset fire state for a scenario
  const resetFireStateForIndex = (index: number, scenariosList: SimulationScenario[] = gauntletScenarios) => {
    const target = scenariosList[index] || SCENARIOS[0];
    setSandboxPinPulled(false);
    setFireStopwatchSec(0);
    setLiveFlameIntensity(target.heatIntensity);
    setSandboxOutcome({ status: 'IDLE', message: '' });
    setFullscreenCatastrophe(null);
  };

  // Start fresh 10-fire challenge (armed: timer countdown starts on first pin removal)
  const handleStartFreshSprint = (customScenarios?: SimulationScenario[]) => {
    const freshList = customScenarios || shuffleScenarios();
    setGauntletScenarios(freshList);
    setCurrentFireIndex(0);
    setSprintRemainingSec(300);
    setIsSprintActive(false); // Armed: countdown starts as soon as first pin is removed
    setFireResults([]);
    resetFireStateForIndex(0, freshList);
    setDrillCompletedModalOpen(false);
    setActiveSprintReport(null);
    scrollToTop();
    sounds.playClick();
  };

  // Pull safety pin: starts overall countdown timer as soon as first scenario pin is removed!
  const handlePullSafetyPin = () => {
    setSandboxPinPulled(true);
    if (!isSprintActive) {
      setIsSprintActive(true);
      sounds.playAlarm(); // Signal overall 5-minute countdown start
    } else {
      sounds.playCorrect();
    }
  };

  // 5-minute countdown clock
  useEffect(() => {
    if (!isSprintActive || drillCompletedModalOpen || showIntakeSplash || activeTab !== 'SIMULATOR') {
      return;
    }

    const timer = setInterval(() => {
      setSprintRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSprintActive, drillCompletedModalOpen, showIntakeSplash, activeTab, currentFireIndex]);

  // Handle 5-minute timer expiration
  const handleTimeExpired = () => {
    sounds.playAlarm();
    // Fill remaining unfinished fires as timed out
    finalizeGauntlet(fireResults, sprintRemainingSec, true);
  };

  // Complete / Finalize Activity
  const finalizeGauntlet = (
    currentHistory: FireResultItem[],
    remainingSec: number,
    timeExpired: boolean = false
  ) => {
    setIsSprintActive(false);

    // If some of the 10 fires were not tackled before time expired
    const completedHistory = [...currentHistory];
    for (let i = completedHistory.length; i < 10; i++) {
      const sc = gauntletScenarios[i] || SCENARIOS[i];
      completedHistory.push({
        fireIndex: i + 1,
        scenarioId: sc.id,
        scenarioTitle: sc.title,
        airportZone: sc.airportZone,
        fireClass: sc.fireClass,
        chosenExtinguisher: 'WATER_APW',
        isCorrect: false,
        extinguished: false,
        timeTakenSec: timeExpired ? 30 : 0
      });
    }

    const firesExtinguishedCount = completedHistory.filter((r) => r.extinguished).length;
    const correctExtinguishersCount = completedHistory.filter((r) => r.isCorrect).length;
    const totalTimeUsedSec = Math.min(300, 300 - remainingSec);

    // 1. Fires extinguished score: up to 40 pts
    const firesExtinguishedScore = Math.round((firesExtinguishedCount / 10) * 40);

    // 2. Selection accuracy score: up to 30 pts
    const selectionAccuracyScore = Math.round((correctExtinguishersCount / 10) * 30);

    // 3. Speed score: up to 30 pts (based on speed & remaining time under 5m)
    let speedScore = 0;
    if (firesExtinguishedCount > 0 && totalTimeUsedSec < 300) {
      const timeBonus = (remainingSec / 300) * 20;
      const speedEfficiency = firesExtinguishedCount >= 7 ? 10 : (firesExtinguishedCount >= 4 ? 6 : 3);
      speedScore = Math.min(30, Math.round(timeBonus + speedEfficiency));
    } else if (firesExtinguishedCount > 0) {
      speedScore = 10;
    }

    const totalScore = firesExtinguishedScore + selectionAccuracyScore + speedScore;

    const reportData: ActivitySprintReportData = {
      cadet: {
        name: cadet.name || 'Candidate Responder',
        badgeId: cadet.badgeId || 'KSIA-OFFICE-8842',
        division: cadet.division || 'Terminal Operations',
        assessorName: cadet.assessorName || 'Lead Tactical Evaluator',
        certificationDate: new Date().toLocaleDateString()
      },
      completedAt: new Date().toLocaleString(),
      totalFires: 10,
      firesExtinguished: firesExtinguishedCount,
      correctExtinguishersCount,
      totalTimeUsedSec,
      timeLimitSec: 300,
      firesExtinguishedScore,
      selectionAccuracyScore,
      speedScore,
      totalScore,
      results: completedHistory
    };

    setActiveSprintReport(reportData);
    setDrillCompletedModalOpen(true);

    // Automatically trigger official PDF report download!
    generateDrillReportPdf(reportData);

    if (firesExtinguishedCount >= 7) {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
      sounds.playVictory();
    } else {
      sounds.playCorrect();
    }
  };

  // Simulator Fire Extinguished Callback
  const handleSandboxSuccess = (metrics: { timeTakenSec: number; agentUsedPercent: number; techniqueScore: number }) => {
    const isCorrect = currentScenario.acceptableExtinguishers.includes(sandboxExtinguisher);
    const fireTime = metrics.timeTakenSec;

    setLiveFlameIntensity(0);
    setSandboxOutcome({
      status: 'SUCCESS',
      message: `Fire #${currentFireIndex + 1} fully extinguished in ${fireTime.toFixed(1)}s!`
    });

    // Record this fire's result
    const resultItem: FireResultItem = {
      fireIndex: currentFireIndex + 1,
      scenarioId: currentScenario.id,
      scenarioTitle: currentScenario.title,
      airportZone: currentScenario.airportZone,
      fireClass: currentScenario.fireClass,
      chosenExtinguisher: sandboxExtinguisher,
      isCorrect,
      extinguished: true,
      timeTakenSec: fireTime
    };

    const nextHistory = [...fireResults, resultItem];
    setFireResults(nextHistory);

    setStats((prev) => ({
      ...prev,
      firesExtinguished: prev.firesExtinguished + 1,
      badges: prev.badges.includes('First Responder') ? prev.badges : [...prev.badges, 'First Responder']
    }));

    confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    sounds.playCorrect();

    // If it's fire #10 (last fire!), finalize immediately!
    if (currentFireIndex >= 9) {
      setTimeout(() => {
        finalizeGauntlet(nextHistory, sprintRemainingSec);
      }, 900);
    }
  };

  // Catastrophe handler: WRONG EXTINGUISHER TRIGGERED
  const handleSandboxCatastrophe = (hazard: { title: string; desc: string; type: string }) => {
    setSandboxOutcome({
      status: 'CATASTROPHE',
      message: hazard.title,
      details: hazard.desc
    });

    setStats((prev) => ({
      ...prev,
      catastrophesTriggered: prev.catastrophesTriggered + 1
    }));

    // Trigger full screen fire animation & failed splash screen!
    setFullscreenCatastrophe({
      active: true,
      title: hazard.title,
      desc: hazard.desc,
      type: hazard.type
    });
  };

  // User chooses "CONTINUE TO NEXT FIRE" on the failed screen
  const handleContinueNextFireAfterFail = () => {
    // Record failed fire item
    const failedItem: FireResultItem = {
      fireIndex: currentFireIndex + 1,
      scenarioId: currentScenario.id,
      scenarioTitle: currentScenario.title,
      airportZone: currentScenario.airportZone,
      fireClass: currentScenario.fireClass,
      chosenExtinguisher: sandboxExtinguisher,
      isCorrect: false,
      extinguished: false,
      timeTakenSec: Math.max(1, fireStopwatchSec)
    };

    const nextHistory = [...fireResults, failedItem];
    setFireResults(nextHistory);
    setFullscreenCatastrophe(null);

    // Check if this was the 10th fire
    if (currentFireIndex >= 9) {
      finalizeGauntlet(nextHistory, sprintRemainingSec);
    } else {
      // Advance to next fire in the gauntlet!
      const nextIndex = currentFireIndex + 1;
      setCurrentFireIndex(nextIndex);
      resetFireStateForIndex(nextIndex);
      scrollToTop();
      sounds.playClick();
    }
  };

  // User manually advances to next fire once current fire is suppressed
  const handleAdvanceNextFireManual = () => {
    if (currentFireIndex >= 9) {
      finalizeGauntlet(fireResults, sprintRemainingSec);
    } else {
      const nextIndex = currentFireIndex + 1;
      setCurrentFireIndex(nextIndex);
      resetFireStateForIndex(nextIndex);
      scrollToTop();
      sounds.playClick();
    }
  };

  // Check if current fire is out/controlled
  const isCurrentFireControlled = liveFlameIntensity <= 5 || sandboxOutcome.status === 'SUCCESS';

  // Format remaining time (MM:SS)
  const remainingMinutes = Math.floor(sprintRemainingSec / 60);
  const remainingSeconds = sprintRemainingSec % 60;
  const timerFormatted = `${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#05080f] text-slate-200 selection:bg-amber-500/30 flex flex-col font-sans">
      <div ref={topAnchorRef} />
      <OfflineIndicator />

      {/* 1. INITIAL CADET INTAKE SPLASH SCREEN (Mandatory before starting app) */}
      {showIntakeSplash && (
        <CadetIntakeSplash
          initialProfile={cadet}
          onStartDrill={(profile) => {
            sessionStorage.setItem('ksia_session_active', 'true');
            localStorage.setItem('ksia_cadet_profile', JSON.stringify(profile));
            setCadet(profile);
            setShowIntakeSplash(false);
            handleStartFreshSprint();
          }}
        />
      )}

      {/* 2. FULLSCREEN FIRE OVERLAY ON CATASTROPHIC WRONG CHOICE */}
      {fullscreenCatastrophe && fullscreenCatastrophe.active && (
        <FullScreenFireOverlay
          scenario={currentScenario}
          chosenExtinguisher={sandboxExtinguisher}
          hazardTitle={fullscreenCatastrophe.title}
          hazardDescription={fullscreenCatastrophe.desc}
          hazardType={fullscreenCatastrophe.type}
          fireNumber={currentFireIndex + 1}
          totalFires={10}
          remainingTimeSec={sprintRemainingSec}
          onContinueNextFire={handleContinueNextFireAfterFail}
          onRestartWholeActivity={promptRestartSprint}
        />
      )}

      {/* TOP NAVIGATION BAR: STRICT TOP BAR CONTRACT */}
      <header className="border-b border-slate-800/80 bg-[#0a0f1a]/95 backdrop-blur-md px-3 sm:px-8 py-3 sticky top-0 z-40 flex items-center justify-between">
        {/* Zone 1: Directorate Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shrink-0">
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap block leading-tight">
              KSIA Fire Academy
            </span>
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-mono hidden xs:block">
              10-Fire 5-Minute Office Challenge
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (hidden on phone, clean on tablet/desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => {
              setActiveTab('SIMULATOR');
              sounds.playClick();
            }}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeTab === 'SIMULATOR' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            Live Simulator
          </button>
          <button
            onClick={() => {
              setActiveTab('CODEX');
              sounds.playClick();
            }}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeTab === 'CODEX' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            Classification Codex
          </button>
          <button
            onClick={() => {
              setActiveTab('SCENARIOS');
              sounds.playClick();
            }}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeTab === 'SCENARIOS' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            Tactical Missions
          </button>
          <button
            onClick={() => {
              setActiveTab('BLITZ');
              sounds.playClick();
            }}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeTab === 'BLITZ' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            60s Rapid Blitz
          </button>
          <button
            onClick={() => {
              setActiveTab('PASS');
              sounds.playClick();
            }}
            className={`transition-colors hover:text-white cursor-pointer ${
              activeTab === 'PASS' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
            }`}
          >
            P.A.S.S. Masterclass
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Audio, Cadet, PWA) */}
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Sound Muted' : 'Sound Active'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Cadet Intake Button */}
          <button
            onClick={() => setShowIntakeSplash(true)}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Change cadet name / employee ID"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold truncate max-w-[80px] sm:max-w-[120px]">
              {cadet.name ? cadet.name.split(' ')[0] : 'Intake'}
            </span>
          </button>

          <PWAInstallButton />
        </div>
      </header>

      {/* MOBILE SEGMENTED CONTROL BAR */}
      <div className="lg:hidden border-b border-slate-800 bg-[#070b14] px-3 py-1.5 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {(
          [
            { id: 'SIMULATOR', label: '10-Fire Simulator' },
            { id: 'CODEX', label: 'Codex' },
            { id: 'SCENARIOS', label: 'Missions' },
            { id: 'BLITZ', label: '60s Blitz' },
            { id: 'PASS', label: 'P.A.S.S.' }
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              sounds.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === t.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 5-MINUTE SPRINT LIVE GAUNTLET BANNER (STICKY ON PHONES) */}
      {activeTab === 'SIMULATOR' && (
        <div className="bg-[#070c18] border-b border-amber-500/30 px-3 sm:px-8 py-2 sticky top-[57px] z-30 flex items-center justify-between gap-2 shadow-md">
          {/* Left: Gauntlet Progress */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-black">
              FIRE {currentFireIndex + 1} OF 10
            </span>

            {/* Fire Progress Dots */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: 10 }).map((_, i) => {
                const res = fireResults[i];
                const isCurrent = i === currentFireIndex;
                return (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-amber-400 ring-2 ring-amber-400/50 scale-125'
                        : res
                        ? res.extinguished
                          ? 'bg-emerald-400'
                          : 'bg-rose-500'
                        : 'bg-slate-700'
                    }`}
                    title={`Fire #${i + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right: 5-Minute Countdown Timer & Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 font-mono text-xs font-black transition-all ${
                !isSprintActive
                  ? 'bg-amber-950/60 border-amber-500/70 text-amber-300 ring-1 ring-amber-500/30'
                  : sprintRemainingSec <= 60
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-slate-900 border-amber-500/50 text-amber-300'
              }`}
            >
              <Timer className={`w-3.5 h-3.5 text-amber-400 shrink-0 ${isSprintActive ? 'animate-pulse' : ''}`} />
              <span>{timerFormatted}</span>
              <span className="hidden sm:inline text-[10px] text-slate-300 font-normal">
                {!isSprintActive ? '· PULL PIN TO START' : '/ 05:00 LIMIT'}
              </span>
            </div>

            <button
              onClick={promptRestartSprint}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              title="Restart 10-Fire Sprint"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-bold">RESTART</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        {/* 1. LIVE FIRE SIMULATOR VIEW (10-FIRE CHALLENGE) */}
        {activeTab === 'SIMULATOR' && (
          <div className="space-y-4 sm:space-y-6">
            {/* VERY CLEAR, READABLE AIRPORT OFFICE SCENARIO CARD */}
            <div className="bg-[#0b1120] border-2 border-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 space-y-3 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                    RANDOM OFFICE INCIDENT #{currentFireIndex + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                      currentScenario.fireClass === 'A'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        : currentScenario.fireClass === 'B'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    }`}
                  >
                    CLASS {currentScenario.fireClass}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Room: <strong className="text-slate-200">{currentScenario.airportZone}</strong>
                </div>
              </div>

              {/* Large, high-contrast readable briefing narrative */}
              <p className="text-xs sm:text-sm md:text-base text-slate-100 font-medium leading-relaxed">
                {currentScenario.incidentBriefing}
              </p>

              {/* High-visibility Tactical Indicators Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block font-semibold">
                    OFFICE COMBUSTIBLE FUEL:
                  </span>
                  <strong className="text-xs text-amber-400 block mt-0.5 truncate">
                    {currentScenario.fuelName}
                  </strong>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block font-semibold">
                    AIRFLOW / DRAFT:
                  </span>
                  <span className="text-xs text-slate-200 block mt-0.5 font-mono">
                    {currentScenario.ambientConditions.windSpeedKnots} kts · {currentScenario.ambientConditions.windDirection}
                  </span>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block font-semibold">
                    PROXIMITY RISK:
                  </span>
                  <span className="text-xs text-rose-300 block mt-0.5 truncate">
                    {currentScenario.ambientConditions.proximityHazards}
                  </span>
                </div>
              </div>
            </div>

            {/* FOCUSED EXTINGUISHER SELECTION RACK (Water, CO2, ABC) - OPTIMIZED FOR PHONES & TABLETS */}
            <div className="bg-[#0a0f1a] rounded-xl sm:rounded-2xl border border-slate-800 p-2.5 sm:p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  SELECT EXTINGUISHER FOR FIRE #{currentFireIndex + 1}:
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  Wrong extinguisher triggers fail screen with option to continue or restart
                </span>
              </div>

              {/* 3 Core Extinguishers Cards - Responsive for Vertical Phones, Tablets & Laptops */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {CORE_EXTINGUISHERS.map((ext) => {
                  const isSelected = sandboxExtinguisher === ext.type;
                  const Icon = ext.icon;
                  return (
                    <button
                      key={ext.type}
                      onClick={() => {
                        setSandboxExtinguisher(ext.type);
                        setSandboxPinPulled(false);
                        setSandboxOutcome({ status: 'IDLE', message: '' });
                        sounds.playClick();
                      }}
                      className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center sm:text-left transition-all cursor-pointer relative overflow-hidden flex flex-col items-center sm:items-stretch justify-between min-h-[82px] sm:min-h-[105px] ${
                        isSelected
                          ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/30 scale-[1.01] shadow-xl'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-1 w-full">
                        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-center sm:text-left">
                          <div className="shrink-0 h-[38px] sm:h-[50px] flex items-center justify-center">
                            <ExtinguisherModel type={ext.type} height={42} />
                          </div>
                          <div>
                            <div className="flex items-center justify-center sm:justify-start gap-1 font-bold text-xs sm:text-sm text-white">
                              <Icon className="w-3 h-3 hidden sm:inline shrink-0" style={{ color: ext.agentColor }} />
                              <span className="truncate">{ext.label.split(' ')[0]}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 hidden md:block">
                              {ext.sublabel}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="hidden sm:inline px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[9px] font-black uppercase">
                            ARMED
                          </span>
                        )}
                      </div>

                      <div className="w-full mt-1 pt-1 border-t border-slate-800/80 text-center sm:text-left">
                        <span className="text-[9px] sm:text-[10px] font-mono text-slate-300 block font-semibold truncate">
                          {ext.type === 'WATER_APW' ? 'Class A (Paper)' : ext.type === 'CO2' ? 'Class C (Elec)' : 'Class B (Solvent)'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LIVE SIMULATOR CANVAS & COMMAND CONSOLE */}
            <div className="space-y-3 sm:space-y-4">
              {/* Tactical Action Deck (Pull Pin, Stopwatch, Selected Weapon) */}
              <div className="bg-[#0b1120] border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <ExtinguisherModel type={sandboxExtinguisher} height={44} />
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">
                      ARMED AGENT:
                    </span>
                    <strong className="text-xs sm:text-sm text-white">
                      {EXTINGUISHERS[sandboxExtinguisher]?.name || sandboxExtinguisher}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Target: Class {currentScenario.fireClass} · Range: {EXTINGUISHERS[sandboxExtinguisher]?.effectiveRangeMeters}
                    </span>
                  </div>
                </div>

                {/* Pull Pin Button & Reset Fire */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={handlePullSafetyPin}
                    disabled={sandboxPinPulled}
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      sandboxPinPulled
                        ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-sm'
                        : !isSprintActive
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 animate-bounce ring-2 ring-amber-400/60'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {sandboxPinPulled
                      ? '✓ PIN PULLED (READY)'
                      : !isSprintActive
                      ? '1. PULL SAFETY PIN (STARTS 5-MIN TIMER)'
                      : '1. PULL SAFETY PIN'}
                  </button>

                  <button
                    onClick={() => resetFireStateForIndex(currentFireIndex)}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-white text-slate-400 cursor-pointer transition-colors"
                    title="Reset Current Fire"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Fire Simulation Canvas */}
              <FireSimulationCanvas
                key={`${currentScenario.id}-${sandboxExtinguisher}-${sandboxPinPulled}`}
                scenario={currentScenario}
                selectedExtinguisher={sandboxExtinguisher}
                pinPulled={sandboxPinPulled}
                onPullPin={handlePullSafetyPin}
                onFireExtinguished={handleSandboxSuccess}
                onCatastropheTriggered={handleSandboxCatastrophe}
                onTimeUpdate={(sec) => setFireStopwatchSec(sec)}
                onFlameIntensityChange={(intensity) => setLiveFlameIntensity(intensity)}
              />

              {/* SUCCESS OUTCOME / FIRE CONTROLLED ACTION BAR */}
              {isCurrentFireControlled ? (
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)] ring-2 ring-emerald-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <strong className="text-xs sm:text-sm md:text-base font-bold text-white">
                        ✓ FIRE #{currentFireIndex + 1} CONTROLLED IN {fireStopwatchSec.toFixed(1)}s!
                      </strong>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                      {currentFireIndex < 9
                        ? `Great job! Advance to Fire #${currentFireIndex + 2} of 10 to keep your 5-minute countdown going. The official PDF report unlocks once all 10 fires are completed or time expires!`
                        : 'Outstanding! You have completed all 10 office fire incidents. Download your official report dossier below!'}
                    </p>
                  </div>

                  <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                    {currentFireIndex < 9 ? (
                      <button
                        onClick={handleAdvanceNextFireManual}
                        className="w-full sm:w-auto min-h-[46px] px-6 py-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 cursor-pointer"
                      >
                        <span>NEXT FIRE ({currentFireIndex + 2}/10)</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    ) : (
                      <button
                        onClick={() => finalizeGauntlet(fireResults, sprintRemainingSec)}
                        className="w-full sm:w-auto min-h-[46px] px-6 py-3 bg-gradient-to-r from-amber-500 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/30 cursor-pointer animate-pulse"
                      >
                        <Trophy className="w-4 h-4 shrink-0" />
                        <span>FINISH 10 FIRES &amp; DOWNLOAD REPORT</span>
                        <Download className="w-4 h-4 shrink-0" />
                      </button>
                    )}

                    {/* RESTART BUTTON VISIBLE DIRECTLY UNDER THE NEXT FIRE BUTTON */}
                    <button
                      type="button"
                      onClick={promptRestartSprint}
                      className="w-full sm:w-auto px-4 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Restart 10-Fire Activity"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>RESTART ACTIVITY</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Ongoing Fire Status */
                <div className="p-3 rounded-xl border border-slate-800 bg-[#0a0f1a] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Active suppression: Aim at base of flame and sweep left/right</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-amber-400 font-bold">{fireStopwatchSec.toFixed(1)}s elapsed</span>
                    <button
                      type="button"
                      onClick={promptRestartSprint}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-white font-mono text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Restart 10-Fire Activity"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      <span>RESTART ACTIVITY</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. CLASSIFICATION CODEX VIEW */}
        {activeTab === 'CODEX' && <CodexView />}

        {/* 3. TACTICAL MISSIONS CAMPAIGN */}
        {activeTab === 'SCENARIOS' && (
          <ScenariosView onMissionCompleted={() => {}} />
        )}

        {/* 4. RAPID RESPONSE BLITZ VIEW */}
        {activeTab === 'BLITZ' && <RapidFireBlitz onFinish={() => {}} />}

        {/* 5. P.A.S.S. MASTERCLASS VIEW */}
        {activeTab === 'PASS' && (
          <PASSMasterclass onComplete={() => {}} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#070b14] px-4 sm:px-8 py-4 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">
              King Salman International Airport (KSIA)
            </span>
            <span aria-hidden="true">·</span>
            <span>Emergency Response Directorate</span>
            <span aria-hidden="true">·</span>
            <span>Office Fire Safety Division</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>NFPA 10 Compliant</span>
            <span aria-hidden="true">·</span>
            <span>10-Fire 5-Minute Sprint</span>
          </div>
        </div>
      </footer>

      {/* 3. FINAL COMPREHENSIVE ACTIVITY DOSSIER MODAL */}
      {drillCompletedModalOpen && activeSprintReport && (
        <div className="fixed inset-0 z-50 bg-[#05080f]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="max-w-2xl w-full my-auto max-h-[94vh] overflow-y-auto bg-[#0a0f1a] border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_0_60px_rgba(16,185,129,0.25)] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    10-FIRE OFFICE ACTIVITY COMPLETED
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Official Simulation Dossier
                  </h3>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs sm:text-sm font-bold">
                SCORE: {activeSprintReport.totalScore}/100
              </div>
            </div>

            {/* Score 3-Pillar Breakdown Callout */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block">
                  FIRES EXTINGUISHED
                </span>
                <strong className="text-sm sm:text-base font-bold text-emerald-400 block mt-0.5">
                  {activeSprintReport.firesExtinguished} / 10
                </strong>
                <span className="text-[9px] text-slate-500 font-mono">
                  +{activeSprintReport.firesExtinguishedScore} pts
                </span>
              </div>

              <div className="border-x border-slate-800/80 px-2">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block">
                  RIGHT AGENT PICKED
                </span>
                <strong className="text-sm sm:text-base font-bold text-amber-400 block mt-0.5">
                  {activeSprintReport.correctExtinguishersCount} / 10
                </strong>
                <span className="text-[9px] text-slate-500 font-mono">
                  +{activeSprintReport.selectionAccuracyScore} pts
                </span>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block">
                  SPEED &amp; TIME (5M)
                </span>
                <strong className="text-sm sm:text-base font-bold text-sky-400 block mt-0.5">
                  {Math.floor(activeSprintReport.totalTimeUsedSec / 60)}m {String(activeSprintReport.totalTimeUsedSec % 60).padStart(2, '0')}s
                </strong>
                <span className="text-[9px] text-slate-500 font-mono">
                  +{activeSprintReport.speedScore} pts
                </span>
              </div>
            </div>

            {/* Cadet Summary Credentials */}
            <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300">
              <span>
                Cadet: <strong className="text-white">{activeSprintReport.cadet.name}</strong>
              </span>
              <span>
                Badge ID: <strong className="text-amber-400">{activeSprintReport.cadet.badgeId}</strong>
              </span>
            </div>

            {/* Itemized 10-Fire Audit Table */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                AUDIT OF ALL 10 ATTEMPTED OFFICE FIRES:
              </span>

              <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/60 divide-y divide-slate-800/80">
                {activeSprintReport.results.map((res, i) => (
                  <div key={i} className="p-2 flex items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-slate-500 text-[10px]">#{i + 1}</span>
                      <span className="text-slate-200 truncate">{res.scenarioTitle.split(':')[1]?.trim() || res.scenarioTitle}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-[11px]">
                      <span className="text-slate-400">Class {res.fireClass}</span>
                      <span className="text-slate-300">{res.timeTakenSec.toFixed(1)}s</span>
                      {res.extinguished ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                          ✓ OUT
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                          ✕ FAIL
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Notification Alert */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-200">
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Official PDF Report Downloaded:</strong> Your complete evaluation report with score and table of all 10 fires has been saved to your device.
              </span>
            </div>

            {/* Actions: Download PDF Again or Play Again */}
            <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => {
                  generateDrillReportPdf(activeSprintReport);
                  sounds.playClick();
                }}
                className="w-full sm:flex-1 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs font-mono rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>DOWNLOAD PDF AGAIN</span>
              </button>

              <button
                onClick={handleStartNewAttempt}
                className="w-full sm:flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>PLAY AGAIN (NEW ATTEMPT)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. RESTART ACTIVITY CONFIRMATION WARNING MODAL (Proceed or Cancel) */}
      {restartConfirmModalOpen && (
        <div className="fixed inset-0 z-[70] bg-[#05080f]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0a0f1a] border-2 border-amber-500/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(245,158,11,0.25)] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Restart Simulation Activity?
                </h3>
                <span className="text-[11px] font-mono text-amber-400">
                  10-Fire Office Gauntlet
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Are you sure you want to restart? Your current progress on <strong className="text-amber-400">Fire #{currentFireIndex + 1} of 10</strong>, extinguished fire score, and 5-minute countdown timer will be reset from Fire #1.
            </p>

            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setRestartConfirmModalOpen(false);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer text-center"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={() => {
                  setRestartConfirmModalOpen(false);
                  handleStartNewAttempt();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-black transition-all shadow-md shadow-amber-500/30 cursor-pointer text-center"
              >
                PROCEED &amp; RESTART
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cadet Profile & Certificate Modal */}
      <CadetProfileModal
        profile={cadet}
        stats={stats}
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSaveProfile={(updated) => setCadet(updated)}
      />
    </div>
  );
}
