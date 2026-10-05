import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

interface PASSMasterclassProps {
  onComplete?: () => void;
  className?: string;
}

export const PASSMasterclass: React.FC<PASSMasterclassProps> = ({ onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pinSheared, setPinSheared] = useState<boolean>(false);
  const [aimHeight, setAimHeight] = useState<'BASE' | 'TOP'>('TOP');
  const [isSqueezing, setIsSqueezing] = useState<boolean>(false);
  const [sweepCount, setSweepCount] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const steps = [
    {
      letter: 'P',
      title: 'PULL THE PIN',
      subtitle: 'Break the plastic tamper inspection seal and release the handle lock',
      instructions: 'Click and drag or press the pin to break the red tamper seal. Without pulling the pin, the discharge lever is mechanically locked to prevent accidental discharge.',
      practicalAirportTip: 'Inspect the plastic break-away seal. Twist the pin slightly if the seal resists pulling.'
    },
    {
      letter: 'A',
      title: 'AIM LOW AT THE BASE',
      subtitle: 'Target the burning fuel, NEVER the dancing flames above',
      instructions: 'Direct the nozzle at the fuel base (the liquid pool, burning luggage, or tire). Aiming at the high flames wastes agent into the air without cooling the burning material below.',
      practicalAirportTip: 'On Jet A-1 fuel spills on the apron, aim at the leading edge of the puddle and bounce foam over the surface.'
    },
    {
      letter: 'S',
      title: 'SQUEEZE THE LEVER',
      subtitle: 'Depress the operating trigger evenly to release the pressurized agent',
      instructions: 'Hold the carrying handle with your non-dominant hand and squeeze the upper discharge lever smoothly. Releasing the handle will stop the flow.',
      practicalAirportTip: 'A standard 9kg airport dry chemical extinguisher empties in only 15 to 20 seconds. Conserve agent!'
    },
    {
      letter: 'S',
      title: 'SWEEP FROM SIDE TO SIDE',
      subtitle: 'Cover the entire width of the fire base until completely smothered',
      instructions: 'Move the nozzle horizontally across the entire width of the fire, extending 15 cm (6 inches) past both edges. Watch for smoldering embers and reignition.',
      practicalAirportTip: 'Never turn your back on an extinguished fire! Back away slowly while watching for re-flash.'
    }
  ];

  const handlePullPin = () => {
    setPinSheared(true);
    sounds.playCorrect();
    setTimeout(() => {
      setCurrentStep(1);
    }, 600);
  };

  const handleSetAim = (h: 'BASE' | 'TOP') => {
    setAimHeight(h);
    if (h === 'BASE') {
      sounds.playCorrect();
      setTimeout(() => {
        setCurrentStep(2);
      }, 600);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleSqueeze = () => {
    setIsSqueezing(true);
    sounds.startHiss();
    setTimeout(() => {
      setIsSqueezing(false);
      sounds.stopHiss();
      setCurrentStep(3);
    }, 1500);
  };

  const handleSweepTick = () => {
    const next = sweepCount + 1;
    setSweepCount(next);
    sounds.playClick();
    if (next >= 4) {
      sounds.playVictory();
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setPinSheared(false);
    setAimHeight('TOP');
    setIsSqueezing(false);
    setSweepCount(0);
    setCompleted(false);
  };

  return (
    <div className={`rounded-xl bg-[#0a0f1a] border border-slate-800 p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            The P.A.S.S. Tactical Protocol Masterclass
          </h2>
          <p className="text-xs text-slate-400">
            Mandatory NFPA 10 / ICAO Airport Rescue Firefighting Operational Drill
          </p>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((st, idx) => (
            <div
              key={st.letter}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                currentStep === idx
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-500/40'
                  : currentStep > idx || completed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-600 border border-slate-800'
              }`}
            >
              {st.letter}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Step Display */}
      {!completed ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Tactical Instructions */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-semibold">
                STEP {currentStep + 1} OF 4
              </span>
              <h3 className="text-xl font-bold text-white">
                {steps[currentStep].title}
              </h3>
              <p className="text-sm font-medium text-slate-300">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {steps[currentStep].instructions}
            </p>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
              <strong className="block font-semibold text-amber-400">
                Airport Operational Note:
              </strong>
              <span>{steps[currentStep].practicalAirportTip}</span>
            </div>
          </div>

          {/* Right Column: Interactive Hands-On Practice Box */}
          <div className="md:col-span-5 bg-slate-950/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[260px] text-center space-y-4">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-slate-900 rounded-full border border-slate-700">
                  <svg viewBox="0 0 100 100" className="w-20 h-20">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#FBBF24" strokeWidth="6" />
                    <line x1="50" y1="50" x2="85" y2="50" stroke="#FBBF24" strokeWidth="6" />
                    {!pinSheared && (
                      <rect x="75" y="44" width="8" height="12" fill="#EF4444" rx="2" />
                    )}
                  </svg>
                  {!pinSheared && (
                    <span className="absolute -bottom-2 text-[9px] font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
                      SEAL INTACT
                    </span>
                  )}
                </div>

                <button
                  onClick={handlePullPin}
                  disabled={pinSheared}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {pinSheared ? 'PIN SHEARED & PULLED' : 'CLICK TO PULL PIN'}
                </button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 w-full">
                <span className="text-xs text-slate-400 block">
                  Select where you should point the nozzle:
                </span>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSetAim('TOP')}
                    className="w-full py-2.5 px-4 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:border-rose-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Aim into dancing flames near the top
                  </button>
                  <button
                    onClick={() => handleSetAim('BASE')}
                    className="w-full py-2.5 px-4 rounded-lg border border-emerald-500/60 bg-emerald-950/30 text-xs font-mono text-emerald-400 hover:bg-emerald-900/50 transition-colors cursor-pointer font-bold"
                  >
                    Aim directly at the burning base of fuel
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-rose-950/40 border border-rose-500/40 flex items-center justify-center mx-auto">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-rose-500" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                  </svg>
                </div>
                <button
                  onPointerDown={handleSqueeze}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg font-mono transition-all cursor-pointer ${
                    isSqueezing
                      ? 'bg-amber-400 text-slate-950 scale-95 ring-4 ring-amber-400/30'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40'
                  }`}
                >
                  {isSqueezing ? 'DISCHARGING AGENT...' : 'CLICK TO SQUEEZE TRIGGER'}
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 w-full">
                <span className="text-xs text-slate-400 block">
                  Sweep nozzle back and forth across base (Target: 4 sweeps):
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                        sweepCount >= i
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSweepTick}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  SWEEP NOZZLE ACROSS BASE ({sweepCount}/4)
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Completion State */
        <div className="p-8 text-center bg-gradient-to-b from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-500/30 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 text-2xl font-bold">
            ✓
          </div>
          <h3 className="text-xl font-bold text-white">P.A.S.S. Technique Certified!</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            You have executed the 4 sequential fundamentals: Pull the pin, Aim at the base, Squeeze the trigger, and Sweep across the width of the fire.
          </p>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-lg transition-colors cursor-pointer"
            >
              PRACTICE DRILL AGAIN
            </button>
          </div>
        </div>
      )}

      {/* Airport 3 Golden Safety Rules Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
        <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
          <strong className="text-white block font-mono text-[11px]">1. STANDOFF DISTANCE</strong>
          <span className="text-slate-400">Position yourself 6 to 8 feet (2 to 2.5m) away from the fire.</span>
        </div>
        <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
          <strong className="text-white block font-mono text-[11px]">2. WIND AT YOUR BACK</strong>
          <span className="text-slate-400">Always attack fire with prevailing airport wind behind you.</span>
        </div>
        <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
          <strong className="text-white block font-mono text-[11px]">3. UNBLOCKED EXIT</strong>
          <span className="text-slate-400">Never allow fire to cut off your escape route or emergency exit.</span>
        </div>
      </div>
    </div>
  );
};
