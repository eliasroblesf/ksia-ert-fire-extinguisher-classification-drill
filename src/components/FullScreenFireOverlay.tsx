import React, { useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  RotateCcw, 
  ArrowRight, 
  ShieldAlert, 
  XCircle, 
  Zap, 
  Timer
} from 'lucide-react';
import { ExtinguisherType, SimulationScenario } from '../types/fireTraining';
import { EXTINGUISHERS } from '../data/extinguishersData';
import { sounds } from '../utils/soundEffects';

interface FullScreenFireOverlayProps {
  scenario: SimulationScenario;
  chosenExtinguisher: ExtinguisherType;
  hazardTitle: string;
  hazardDescription: string;
  hazardType: string;
  fireNumber: number; // e.g. 1
  totalFires: number; // e.g. 10
  remainingTimeSec: number;
  onContinueNextFire: () => void;
  onRestartWholeActivity: () => void;
}

export const FullScreenFireOverlay: React.FC<FullScreenFireOverlayProps> = ({
  scenario,
  chosenExtinguisher,
  hazardTitle,
  hazardDescription,
  hazardType,
  fireNumber,
  totalFires,
  remainingTimeSec,
  onContinueNextFire,
  onRestartWholeActivity
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play audio alarm & explosion on mount
  useEffect(() => {
    sounds.playExplosion();
    if (hazardType === 'ELECTROCUTION') {
      sounds.playElectricArc();
    }
    const timer = setTimeout(() => {
      sounds.playAlarm();
    }, 350);

    return () => clearTimeout(timer);
  }, [hazardType]);

  // Fullscreen Fire Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    interface FireParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const particles: FireParticle[] = [];
    const colors = ['#f59e0b', '#ef4444', '#f97316', '#dc2626', '#fef08a'];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Dark semi-transparent clear for motion blur trail
      ctx.fillStyle = 'rgba(10, 5, 5, 0.25)';
      ctx.fillRect(0, 0, w, h);

      // Spawn fire particles along bottom and sides
      const spawnCount = 14;
      for (let i = 0; i < spawnCount; i++) {
        const fromSide = Math.random() < 0.25;
        let x = Math.random() * w;
        let y = h + 10;
        let vx = (Math.random() - 0.5) * 4;
        let vy = -(Math.random() * 8 + 5);

        if (fromSide) {
          x = Math.random() < 0.5 ? -10 : w + 10;
          y = h * (0.4 + Math.random() * 0.6);
          vx = x < 0 ? Math.random() * 6 + 2 : -(Math.random() * 6 + 2);
          vy = -(Math.random() * 6 + 3);
        }

        particles.push({
          x,
          y,
          vx,
          vy,
          size: Math.random() * 40 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.9,
          life: 0,
          maxLife: Math.random() * 0.9 + 0.5
        });
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.016;
        p.size *= 0.985;
        p.alpha = Math.max(0, 0.9 * (1 - p.life / p.maxLife));

        if (p.life >= p.maxLife || p.size <= 2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Outer edge heat vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      grad.addColorStop(0.7, 'rgba(220, 38, 38, 0.35)');
      grad.addColorStop(1, 'rgba(185, 28, 28, 0.75)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const extInfo = EXTINGUISHERS[chosenExtinguisher];
  const minutes = Math.floor(remainingTimeSec / 60);
  const seconds = remainingTimeSec % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Background full-screen burning canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Screen Shaking Fiery Glow Overlay */}
      <div className="fixed inset-0 bg-red-950/40 mix-blend-overlay pointer-events-none animate-pulse z-0" />

      {/* Fiery Top & Bottom Flickering Borders */}
      <div className="fixed top-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse z-10" />
      <div className="fixed bottom-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse z-10" />

      {/* Centered Failed Splash Card */}
      <div className="relative z-20 max-w-xl w-full my-auto max-h-[92vh] overflow-y-auto bg-[#0a0606]/95 border-2 border-red-500/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_80px_rgba(239,68,68,0.5)] backdrop-blur-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
        {/* Catastrophe Banner Header */}
        <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 shrink-0 animate-bounce">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                FIRE #{fireNumber} OF {totalFires} · WRONG EXTINGUISHER
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                WHOLE OFFICE CAUGHT FIRE!
              </h2>
            </div>
          </div>

          {/* Sprint Clock Badge */}
          <div className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/40 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5 shrink-0">
            <Timer className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{timeFormatted}</span>
          </div>
        </div>

        {/* Hazard Title & Consequence Explanation */}
        <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-red-300 font-bold text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{hazardTitle || 'CATASTROPHIC INCOMPATIBLE AGENT REACTION!'}</span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            {hazardDescription}
          </p>
        </div>

        {/* Tactical Error Diagnosis Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950/80 border border-red-500/30 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[9px] font-mono text-red-400 uppercase block font-bold">
              YOU APPLIED:
            </span>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="truncate">{extInfo?.name || chosenExtinguisher}</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Not safe for Class {scenario.fireClass} office fire.
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-2.5 space-y-0.5">
            <span className="text-[9px] font-mono text-emerald-400 uppercase block font-bold">
              CORRECT AGENT WAS:
            </span>
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{EXTINGUISHERS[scenario.recommendedExtinguisher]?.name}</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Target: {scenario.fuelName.split(',')[0]}
            </div>
          </div>
        </div>

        {/* Tactical Guidance note */}
        <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl text-[11px] text-amber-200 flex items-start gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            You can advance to Fire #{Math.min(totalFires, fireNumber + 1)} to keep your 5-minute timer going, or restart the 10-fire challenge from Fire #1.
          </span>
        </div>

        {/* The Two Distinct Action Options */}
        <div className="pt-1 flex flex-col items-stretch gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onContinueNextFire();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-[0.99] cursor-pointer"
          >
            <span>CONTINUE TO NEXT FIRE ({Math.min(totalFires, fireNumber + 1)}/{totalFires})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onRestartWholeActivity();
            }}
            className="w-full py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>RESTART ACTIVITY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
