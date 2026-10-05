import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ExtinguisherType, FireClass, SimulationScenario } from '../types/fireTraining';
import { sounds } from '../utils/soundEffects';

interface FireSimulationCanvasProps {
  scenario: SimulationScenario;
  selectedExtinguisher: ExtinguisherType;
  pinPulled: boolean;
  onFireExtinguished: (stats: { timeTakenSec: number; agentUsedPercent: number; techniqueScore: number }) => void;
  onCatastropheTriggered: (hazard: { title: string; desc: string; type: string }) => void;
  onTimeUpdate?: (seconds: number) => void;
  onFlameIntensityChange?: (intensity: number) => void;
  onPullPin?: () => void;
  className?: string;
}

interface Particle {
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

export const FireSimulationCanvas: React.FC<FireSimulationCanvasProps> = ({
  scenario,
  selectedExtinguisher,
  pinPulled,
  onFireExtinguished,
  onCatastropheTriggered,
  onTimeUpdate,
  onFlameIntensityChange,
  onPullPin,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation state
  const [isSpraying, setIsSpraying] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState<number>(scenario.heatIntensity);
  const [agentRemaining, setAgentRemaining] = useState<number>(100);
  const [sweepScore, setSweepScore] = useState<number>(0);
  const [aimAtBase, setAimAtBase] = useState<boolean>(false);
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  const [catastropheActive, setCatastropheActive] = useState<string | null>(null);

  // Reticle position (0 to 1 normalized)
  const reticleRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.7 });
  const prevReticleX = useRef<number>(0.5);
  const sweepVelocity = useRef<number>(0);
  const timeElapsed = useRef<number>(0);
  const hasTriggeredEnd = useRef<boolean>(false);

  // Particle pools
  const flameParticles = useRef<Particle[]>([]);
  const smokeParticles = useRef<Particle[]>([]);
  const sprayParticles = useRef<Particle[]>([]);
  const catastropheParticles = useRef<Particle[]>([]);

  // Check if extinguisher is catastrophic or wrong for this scenario
  const catastropheCheck = useCallback(() => {
    // 1. Explicit scenario catastrophe
    const catastrophic = scenario.catastrophicExtinguishers.find(
      (c) => c.type === selectedExtinguisher
    );
    if (catastrophic) return catastrophic;

    // 2. Not in acceptable extinguishers list
    const isAcceptable = scenario.acceptableExtinguishers.includes(selectedExtinguisher);
    if (!isAcceptable) {
      if (selectedExtinguisher === 'WATER_APW') {
        if (scenario.fireClass === 'B') {
          return {
            type: selectedExtinguisher,
            eventTitle: 'CATASTROPHIC VIOLENT BOILOVER EXPLOSION',
            hazardDescription: 'Applying water into boiling hydrocarbon liquid caused sudden 1,700x steam expansion, ejecting a massive 15-meter wave of flaming fuel across the entire area!',
            animationType: 'BOILOVER' as const
          };
        }
        if (scenario.fireClass === 'C') {
          return {
            type: selectedExtinguisher,
            eventTitle: 'FATAL HIGH-VOLTAGE ELECTROCUTION',
            hazardDescription: 'Discharging water onto energized electrical equipment created a direct conductive path straight through the stream, electrocuting the responder with lethal voltage!',
            animationType: 'ELECTROCUTION' as const
          };
        }
      } else if (selectedExtinguisher === 'CO2') {
        if (scenario.fireClass === 'A') {
          return {
            type: selectedExtinguisher,
            eventTitle: 'INSUFFICIENT LATENT COOLING & FLASH REIGNITION',
            hazardDescription: 'CO2 displaced surface oxygen without absorbing core heat from cellulosic embers. As soon as gas dispersed, fresh air triggered an explosive flashback!',
            animationType: 'BOILOVER' as const
          };
        }
      } else if (selectedExtinguisher === 'ABC_DRY_POWDER') {
        if (scenario.fireClass === 'C') {
          return {
            type: selectedExtinguisher,
            eventTitle: 'CORROSIVE RESIDUE SHORT-CIRCUIT & BLACKOUT',
            hazardDescription: 'Monoammonium phosphate powder baked onto live electrical components, melting delicate circuit boards and triggering electrical arc flash detonations!',
            animationType: 'ELECTROCUTION' as const
          };
        }
      }

      return {
        type: selectedExtinguisher,
        eventTitle: 'CATASTROPHIC INCOMPATIBLE AGENT HAZARD',
        hazardDescription: `Selected extinguisher is not approved for Class ${scenario.fireClass} fires. Chemical incompatibility caused thermal runaway and fire flashover!`,
        animationType: 'BOILOVER' as const
      };
    }

    return null;
  }, [scenario, selectedExtinguisher]);

  // Handle spray start/stop
  const startSpray = () => {
    if (!pinPulled) {
      sounds.playIncorrect();
      return;
    }
    if (agentRemaining <= 0 || isExtinguished) return;

    // Check for catastrophic failure on first trigger
    const hazard = catastropheCheck();
    if (hazard) {
      setCatastropheActive(hazard.animationType);
      sounds.playExplosion();
      if (hazard.animationType === 'ELECTROCUTION') {
        sounds.playElectricArc();
      }
      onCatastropheTriggered({
        title: hazard.eventTitle,
        desc: hazard.hazardDescription,
        type: hazard.animationType
      });
      return;
    }

    setIsSpraying(true);
    sounds.startHiss();
  };

  const stopSpray = () => {
    setIsSpraying(false);
    sounds.stopHiss();
  };

  // Keyboard shortcut: Spacebar to spray
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        startSpray();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        stopSpray();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      sounds.stopHiss();
    };
  }, [pinPulled, agentRemaining, isExtinguished, selectedExtinguisher]);

  // Mouse / Touch movement tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate horizontal sweep speed
    const dx = Math.abs(x - prevReticleX.current);
    sweepVelocity.current = Math.min(1, sweepVelocity.current * 0.85 + dx * 6);
    prevReticleX.current = x;

    reticleRef.current = { x, y };

    // Check if aiming at the base of fire (typically y between 0.65 and 0.85, x between 0.35 and 0.65)
    const isAtBase = y >= 0.62 && y <= 0.82 && x >= 0.3 && x <= 0.7;
    setAimAtBase(isAtBase);
  };

  // Main animation and physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      if (!isExtinguished && !catastropheActive) {
        timeElapsed.current += dt;
        if (onTimeUpdate) {
          onTimeUpdate(timeElapsed.current);
        }
      }

      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear Canvas with Atmospheric Dark Airport Background
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle airport ground / deck line
      const groundY = height * 0.75;
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Ground tarmac texture lines
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, groundY);
        ctx.lineTo(i - 30, height);
        ctx.stroke();
      }

      // Draw target fuel base circle/puddle
      ctx.fillStyle = scenario.fireClass === 'B' ? 'rgba(127, 29, 29, 0.4)' : 'rgba(30, 41, 59, 0.5)';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, groundY, width * 0.22, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Base target indicator box (tactical HUD cue)
      ctx.strokeStyle = aimAtBase ? 'rgba(16, 185, 129, 0.6)' : 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(width * 0.32, groundY - 15, width * 0.36, 30);
      ctx.setLineDash([]);

      ctx.fillStyle = aimAtBase ? '#10b981' : '#f59e0b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TARGET BASE (P.A.S.S. AIM ZONE)', width * 0.5, groundY + 28);

      // 2. Spawn and Update Fire Particles (if intensity > 0)
      if (flameIntensity > 0 && !catastropheActive) {
        const spawnCount = Math.floor((flameIntensity / 100) * 8) + 1;
        for (let i = 0; i < spawnCount; i++) {
          const offsetX = (Math.random() - 0.5) * (width * 0.3 * (flameIntensity / 100));
          const windShift = scenario.ambientConditions.windSpeedKnots * 0.4;
          
          flameParticles.current.push({
            x: width * 0.5 + offsetX,
            y: groundY - Math.random() * 5,
            vx: (Math.random() - 0.5) * 1.5 + windShift,
            vy: -(Math.random() * 3 + 2.5),
            size: Math.random() * 18 + 12,
            color: Math.random() > 0.4 ? '#f59e0b' : (Math.random() > 0.5 ? '#ef4444' : '#fef08a'),
            alpha: 0.85,
            life: 0,
            maxLife: Math.random() * 0.5 + 0.3
          });
        }

        // Spawn Smoke Particles
        if (Math.random() < 0.6) {
          smokeParticles.current.push({
            x: width * 0.5 + (Math.random() - 0.5) * (width * 0.2),
            y: groundY - 40,
            vx: (Math.random() - 0.5) * 1.2 + scenario.ambientConditions.windSpeedKnots * 0.3,
            vy: -(Math.random() * 2 + 1),
            size: Math.random() * 24 + 16,
            color: '#334155',
            alpha: 0.4,
            life: 0,
            maxLife: Math.random() * 1.5 + 1.0
          });
        }
      }

      // 3. Render Smoke Particles
      smokeParticles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.4;
        p.life += dt;
        p.alpha = Math.max(0, 0.4 * (1 - p.life / p.maxLife));

        ctx.fillStyle = `rgba(71, 85, 105, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      smokeParticles.current = smokeParticles.current.filter((p) => p.life < p.maxLife);

      // 4. Render Flame Particles
      flameParticles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.size = Math.max(1, p.size - 0.35);
        p.life += dt;
        p.alpha = Math.max(0, 0.85 * (1 - p.life / p.maxLife));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      flameParticles.current = flameParticles.current.filter((p) => p.life < p.maxLife);

      // 5. Handle Spray Particle Physics
      if (isSpraying && agentRemaining > 0 && !catastropheActive) {
        // Decrement agent reserve
        setAgentRemaining((prev) => {
          const next = Math.max(0, prev - dt * 5.5);
          if (next <= 0) {
            stopSpray();
          }
          return next;
        });

        // Spawn spray particles from bottom right towards reticle
        const originX = width * 0.88;
        const originY = height * 0.95;
        const targetX = reticleRef.current.x * width;
        const targetY = reticleRef.current.y * height;

        const sprayColorMap: Record<ExtinguisherType, string> = {
          WATER_APW: 'rgba(56, 189, 248, 0.7)',
          AFFF_FOAM: 'rgba(254, 243, 199, 0.85)',
          CO2: 'rgba(224, 242, 254, 0.75)',
          ABC_DRY_POWDER: 'rgba(254, 240, 138, 0.8)',
          BC_PURPLE_K: 'rgba(233, 213, 255, 0.8)',
          CLASS_D_POWDER: 'rgba(250, 204, 21, 0.85)',
          WET_CHEMICAL: 'rgba(253, 230, 138, 0.75)',
          CLEAN_AGENT: 'rgba(167, 243, 208, 0.8)'
        };

        for (let i = 0; i < 7; i++) {
          const spread = (Math.random() - 0.5) * 25;
          sprayParticles.current.push({
            x: originX,
            y: originY,
            vx: ((targetX + spread - originX) / 15) * (0.9 + Math.random() * 0.2),
            vy: ((targetY + spread - originY) / 15) * (0.9 + Math.random() * 0.2),
            size: Math.random() * 8 + 4,
            color: sprayColorMap[selectedExtinguisher] || 'rgba(255,255,255,0.8)',
            alpha: 0.9,
            life: 0,
            maxLife: 0.35
          });
        }

        // Fire Suppression Rate Calculation based on Technique
        const isAimingAtBase = aimAtBase;
        const isSweeping = sweepVelocity.current > 0.15;
        
        let suppressionRate = 0;
        if (isAimingAtBase) {
          suppressionRate = 12 * dt;
          if (isSweeping) {
            suppressionRate = 28 * dt; // Huge reward for sweeping!
            setSweepScore((prev) => Math.min(100, prev + dt * 15));
          }
        } else {
          // Rookie mistake: aiming at flames barely cools fire
          suppressionRate = 2 * dt;
        }

        // Apply suppression
        setFlameIntensity((prev) => {
          const next = Math.max(0, prev - suppressionRate);
          if (onFlameIntensityChange) {
            onFlameIntensityChange(next);
          }
          if (next === 0 && !hasTriggeredEnd.current) {
            hasTriggeredEnd.current = true;
            setIsExtinguished(true);
            sounds.stopHiss();
            sounds.playVictory();
            onFireExtinguished({
              timeTakenSec: Math.round(timeElapsed.current * 10) / 10,
              agentUsedPercent: Math.round(100 - agentRemaining),
              techniqueScore: Math.round(sweepScore)
            });
          }
          return next;
        });
      } else if (!isExtinguished && flameIntensity > 0 && flameIntensity < 95) {
        // Natural Re-ignition if agent stopped before fully out!
        setFlameIntensity((prev) => {
          const next = Math.min(95, prev + dt * 2.5);
          if (onFlameIntensityChange) {
            onFlameIntensityChange(next);
          }
          return next;
        });
      }

      // Render Spray Particles
      sprayParticles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.2;
        p.life += dt;
        p.alpha = Math.max(0, 0.9 * (1 - p.life / p.maxLife));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      sprayParticles.current = sprayParticles.current.filter((p) => p.life < p.maxLife);

      // 6. Catastrophic Blast Animation if triggered
      if (catastropheActive) {
        const cx = width * 0.5;
        const cy = groundY;

        // Spawn explosive blast particles
        for (let i = 0; i < 12; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 4;
          catastropheParticles.current.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 18 + 8,
            color: catastropheActive === 'ELECTROCUTION' ? '#60a5fa' : (catastropheActive === 'METAL_BLAST' ? '#ffffff' : '#ef4444'),
            alpha: 1,
            life: 0,
            maxLife: 1.2
          });
        }

        // Fullscreen flash overlay
        ctx.fillStyle = catastropheActive === 'ELECTROCUTION' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.35)';
        ctx.fillRect(0, 0, width, height);

        // Flash text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CRITICAL CATASTROPHIC EVENT!', width * 0.5, height * 0.3);
      }

      // Render Catastrophe Particles
      catastropheParticles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += dt;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 7. Render Reticle Crosshair
      const rx = reticleRef.current.x * width;
      const ry = reticleRef.current.y * height;

      ctx.strokeStyle = aimAtBase ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(rx, ry, 16, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(rx - 22, ry);
      ctx.lineTo(rx - 8, ry);
      ctx.moveTo(rx + 8, ry);
      ctx.lineTo(rx + 22, ry);
      ctx.moveTo(rx, ry - 22);
      ctx.lineTo(rx, ry - 8);
      ctx.moveTo(rx, ry + 8);
      ctx.lineTo(rx, ry + 22);
      ctx.stroke();

      // Reticle center dot
      ctx.fillStyle = aimAtBase ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(rx, ry, 3, 0, Math.PI * 2);
      ctx.fill();

      // If extinguished, draw victory overlay
      if (isExtinguished) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('FIRE SUCCESSFULLY EXTINGUISHED', width * 0.5, height * 0.35);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px sans-serif';
        ctx.fillText('Fuel cooled & vapors smothered — Zero re-ignition detected', width * 0.5, height * 0.42);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [
    flameIntensity,
    isSpraying,
    agentRemaining,
    aimAtBase,
    isExtinguished,
    catastropheActive,
    selectedExtinguisher,
    scenario
  ]);

  return (
    <div className={`relative flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-[#060a14] ${className}`}>
      {/* Simulation HUD Top Bar */}
      <div className="bg-[#0b1120] border-b border-slate-800 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-4 truncate max-w-full">
          <span className="text-slate-400 truncate text-[11px] sm:text-xs">
            TARGET: <strong className="text-white">{scenario.fuelName}</strong>
          </span>
        </div>

        {/* Live Gauges */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Flame Intensity Meter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[9px] sm:text-[10px]">HEAT:</span>
            <div className="w-16 sm:w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  flameIntensity > 50 ? 'bg-rose-500' : flameIntensity > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${flameIntensity}%` }}
              />
            </div>
            <span className="text-white font-bold text-[11px] sm:text-xs">{Math.round(flameIntensity)}%</span>
          </div>

          {/* Agent Remaining */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[9px] sm:text-[10px]">AGENT:</span>
            <div className="w-14 sm:w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  agentRemaining > 30 ? 'bg-sky-500' : 'bg-rose-500 animate-pulse'
                }`}
                style={{ width: `${agentRemaining}%` }}
              />
            </div>
            <span className="text-white font-bold text-[11px] sm:text-xs">{Math.round(agentRemaining)}%</span>
          </div>
        </div>
      </div>

      {/* Main Simulation Canvas with mobile-optimized aspect ratio and touch-action: none */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[220px] max-h-[340px] sm:max-h-[460px] cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          style={{ touchAction: 'none' }}
          className="w-full h-full object-cover select-none"
          onPointerMove={handlePointerMove}
          onPointerDown={startSpray}
          onPointerUp={stopSpray}
          onPointerLeave={stopSpray}
        />

        {/* Reticle Context Hint */}
        <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur border border-slate-700/60 rounded-lg px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-300 pointer-events-none font-mono">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${aimAtBase ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>AIM: {aimAtBase ? 'BASE LOCKED' : 'AIM AT BASE'}</span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-slate-400">
            SWEEP LEFT &amp; RIGHT
          </div>
        </div>

        {/* Safety Pin Warning Alert if not pulled */}
        {!pinPulled && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 text-center z-10">
            <div className="max-w-xs sm:max-w-md bg-slate-900 border border-amber-500/50 rounded-xl p-4 sm:p-5 shadow-2xl space-y-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400 block font-bold">
                P.A.S.S. STEP 1: SAFETY PIN LOCKED
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">Extinguisher Pin Not Pulled</h3>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Pull safety pin to arm nozzle and unlock agent discharge.
              </p>
              {onPullPin ? (
                <button
                  type="button"
                  onClick={onPullPin}
                  className="mt-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/30 cursor-pointer animate-pulse transition-transform active:scale-95 inline-flex items-center gap-1.5"
                >
                  <span>1. PULL SAFETY PIN NOW</span>
                </button>
              ) : (
                <div className="text-[10px] sm:text-xs text-amber-400 font-mono bg-amber-500/10 py-1 px-2.5 rounded border border-amber-500/30">
                  Tap "1. PULL SAFETY PIN" below
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Simulator Bottom Control Deck */}
      <div className="bg-[#080d1a] border-t border-slate-800 p-2.5 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-xs text-slate-400 font-mono">
          <span className="hidden sm:inline text-slate-500">How to use:</span>
          <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
            Drag on screen to aim
          </span>
          <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
            Hold trigger or Space to spray
          </span>
        </div>

        {/* Spray Action Button - Big thumb target on mobile */}
        <div className="flex items-center justify-center sm:justify-end">
          <button
            onPointerDown={startSpray}
            onPointerUp={stopSpray}
            onPointerLeave={stopSpray}
            disabled={!pinPulled || agentRemaining <= 0 || isExtinguished || !!catastropheActive}
            className={`w-full sm:w-auto px-6 py-3 sm:py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg font-mono flex items-center justify-center gap-2 select-none cursor-pointer ${
              isSpraying
                ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 scale-98'
                : pinPulled && agentRemaining > 0 && !isExtinguished
                ? 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-rose-900/40 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isSpraying ? 'DISCHARGING AGENT...' : 'HOLD TO SQUEEZE TRIGGER'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
