import React from 'react';
import { FireClass } from '../types/fireTraining';

interface FireClassSymbolProps {
  fireClass: FireClass;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

export const FireClassSymbol: React.FC<FireClassSymbolProps> = ({
  fireClass,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const sizeMap = {
    sm: { box: 'w-10 h-10', svg: 40, text: 'text-[10px]' },
    md: { box: 'w-16 h-16', svg: 64, text: 'text-xs' },
    lg: { box: 'w-24 h-24', svg: 96, text: 'text-sm font-semibold' },
    xl: { box: 'w-32 h-32', svg: 128, text: 'text-base font-bold' }
  };

  const current = sizeMap[size];

  switch (fireClass) {
    case 'A':
      return (
        <div className={`flex flex-col items-center gap-1.5 ${className}`}>
          <div className={`${current.box} relative flex items-center justify-center filter drop-shadow-md`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Green Triangle */}
              <polygon points="50,6 94,88 6,88" fill="#059669" stroke="#10B981" strokeWidth="4" strokeLinejoin="round" />
              <polygon points="50,14 86,83 14,83" fill="#047857" opacity="0.6" />
              {/* Letter A */}
              <text
                x="50"
                y="68"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="44"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                A
              </text>
              {/* Subtle wood / campfire motif in small size */}
              <path d="M42 78 L58 78" stroke="#D1FAE5" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          {showLabel && <span className={`${current.text} text-emerald-400 font-mono tracking-wider`}>CLASS A</span>}
        </div>
      );

    case 'B':
      return (
        <div className={`flex flex-col items-center gap-1.5 ${className}`}>
          <div className={`${current.box} relative flex items-center justify-center filter drop-shadow-md`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Red Square */}
              <rect x="8" y="8" width="84" height="84" rx="8" fill="#DC2626" stroke="#EF4444" strokeWidth="4" />
              <rect x="14" y="14" width="72" height="72" rx="4" fill="#B91C1C" opacity="0.6" />
              {/* Letter B */}
              <text
                x="50"
                y="67"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="44"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                B
              </text>
              {/* Fuel wave indicator */}
              <path d="M30 76 Q50 72 70 76" stroke="#FEE2E2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          {showLabel && <span className={`${current.text} text-rose-400 font-mono tracking-wider`}>CLASS B</span>}
        </div>
      );

    case 'C':
      return (
        <div className={`flex flex-col items-center gap-1.5 ${className}`}>
          <div className={`${current.box} relative flex items-center justify-center filter drop-shadow-md`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Blue Circle */}
              <circle cx="50" cy="50" r="42" fill="#2563EB" stroke="#3B82F6" strokeWidth="4" />
              <circle cx="50" cy="50" r="36" fill="#1D4ED8" opacity="0.6" />
              {/* Letter C */}
              <text
                x="50"
                y="67"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="44"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                C
              </text>
              {/* Spark accent */}
              <path d="M68 28 L72 34 L76 31" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          {showLabel && <span className={`${current.text} text-blue-400 font-mono tracking-wider`}>CLASS C</span>}
        </div>
      );

    case 'D':
      return (
        <div className={`flex flex-col items-center gap-1.5 ${className}`}>
          <div className={`${current.box} relative flex items-center justify-center filter drop-shadow-md`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Yellow 5-Point Star */}
              <polygon
                points="50,6 63,33 93,37 71,58 77,88 50,74 23,88 29,58 7,37 37,33"
                fill="#D97706"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <polygon
                points="50,14 60,36 84,39 66,56 71,80 50,68 29,80 34,56 16,39 40,36"
                fill="#B45309"
                opacity="0.6"
              />
              {/* Letter D */}
              <text
                x="50"
                y="63"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="36"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                D
              </text>
            </svg>
          </div>
          {showLabel && <span className={`${current.text} text-amber-400 font-mono tracking-wider`}>CLASS D</span>}
        </div>
      );

    case 'K':
      return (
        <div className={`flex flex-col items-center gap-1.5 ${className}`}>
          <div className={`${current.box} relative flex items-center justify-center filter drop-shadow-md`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Black / Dark Burgundy Hexagon */}
              <polygon
                points="50,6 88,27 88,73 50,94 12,73 12,27"
                fill="#18181B"
                stroke="#E11D48"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <polygon
                points="50,14 81,31 81,69 50,86 19,69 19,31"
                fill="#27272A"
                opacity="0.7"
              />
              {/* Letter K */}
              <text
                x="50"
                y="66"
                textAnchor="middle"
                fill="#F43F5E"
                fontSize="42"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                K
              </text>
              {/* Fryer steam accent */}
              <path d="M40 78 Q50 74 60 78" stroke="#FDA4AF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          {showLabel && <span className={`${current.text} text-rose-400 font-mono tracking-wider`}>CLASS K</span>}
        </div>
      );

    default:
      return null;
  }
};

/**
 * Rich Pictogram Graphic illustrating the fire type in context
 */
export const FireSceneIllustration: React.FC<{
  fireClass: FireClass;
  className?: string;
}> = ({ fireClass, className = '' }) => {
  switch (fireClass) {
    case 'A':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-emerald-950/40 border border-emerald-500/20 p-4 ${className}`}>
          <svg viewBox="0 0 300 140" className="w-full h-auto">
            {/* Ground line */}
            <line x1="10" y1="120" x2="290" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Cardboard box and wooden pallet */}
            <rect x="50" y="85" width="55" height="35" rx="2" fill="#78350F" stroke="#92400E" strokeWidth="2" />
            <line x1="50" y1="95" x2="105" y2="95" stroke="#92400E" strokeWidth="1.5" />
            <line x1="77" y1="85" x2="77" y2="120" stroke="#92400E" strokeWidth="1.5" />

            {/* Luggage bag */}
            <rect x="115" y="80" width="50" height="40" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            <rect x="128" y="72" width="24" height="10" rx="3" fill="none" stroke="#64748B" strokeWidth="2" />
            <line x1="115" y1="98" x2="165" y2="98" stroke="#334155" strokeWidth="2" />

            {/* Glowing embers & flames */}
            <g className="animate-pulse">
              {/* Flame layer 1 - Deep Orange */}
              <path d="M70 95 Q60 55 85 45 Q75 65 95 35 Q115 65 105 85 Z" fill="#EA580C" opacity="0.9" />
              {/* Flame layer 2 - Bright Gold */}
              <path d="M78 95 Q70 65 86 55 Q80 70 96 48 Q108 70 100 88 Z" fill="#FBBF24" opacity="0.95" />
              {/* Embers */}
              <circle cx="85" cy="30" r="2" fill="#FDE68A" />
              <circle cx="110" cy="22" r="1.5" fill="#FDE68A" />
              <circle cx="65" cy="40" r="1.5" fill="#F97316" />
            </g>

            {/* Smoke plume */}
            <path d="M95 35 Q105 15 130 10 Q155 8 180 5" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
            
            {/* Label Overlay */}
            <text x="210" y="45" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="monospace">ORDINARY COMBUSTIBLE</text>
            <text x="210" y="65" fill="#94A3B8" fontSize="10">Wood, Paper & Luggage</text>
            <text x="210" y="80" fill="#94A3B8" fontSize="10">Leaves ash & glowing embers</text>
            <text x="210" y="100" fill="#34D399" fontSize="10" fontWeight="bold">EXTINGUISH: Water / Foam</text>
          </svg>
        </div>
      );

    case 'B':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-rose-950/40 border border-rose-500/20 p-4 ${className}`}>
          <svg viewBox="0 0 300 140" className="w-full h-auto">
            {/* Concrete apron ground */}
            <line x1="10" y1="120" x2="290" y2="120" stroke="#334155" strokeWidth="2" />
            
            {/* Spilled fuel puddle */}
            <ellipse cx="105" cy="118" rx="65" ry="10" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" opacity="0.8" />
            <ellipse cx="105" cy="118" rx="45" ry="6" fill="#991B1B" opacity="0.9" />

            {/* Fuel Jerrycan tipped */}
            <rect x="42" y="90" width="30" height="26" rx="3" fill="#B91C1C" stroke="#DC2626" strokeWidth="1.5" transform="rotate(-25 42 90)" />

            {/* Vapors burning above liquid surface */}
            <g className="animate-pulse">
              <path d="M60 114 Q70 70 85 50 Q80 80 105 35 Q130 65 120 85 Q145 60 145 114 Z" fill="#DC2626" opacity="0.85" />
              <path d="M75 114 Q85 80 95 60 Q92 82 108 50 Q122 75 118 114 Z" fill="#F59E0B" opacity="0.95" />
              <path d="M88 114 Q95 90 102 75 Q106 88 112 114 Z" fill="#FEF08A" opacity="0.95" />
            </g>

            {/* Vapor waves */}
            <path d="M60 108 Q80 102 105 106 Q130 110 150 106" stroke="#FCA5A5" strokeWidth="1" fill="none" opacity="0.6" />

            {/* Label Overlay */}
            <text x="180" y="45" fill="#EF4444" fontSize="13" fontWeight="bold" fontFamily="monospace">FLAMMABLE LIQUIDS</text>
            <text x="180" y="65" fill="#94A3B8" fontSize="10">Jet A-1 Fuel & Hydraulic Oil</text>
            <text x="180" y="80" fill="#F87171" fontSize="10" fontWeight="bold">DANGER: NEVER USE WATER!</text>
            <text x="180" y="100" fill="#38BDF8" fontSize="10" fontWeight="bold">EXTINGUISH: Foam / Purple-K</text>
          </svg>
        </div>
      );

    case 'C':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-blue-950/40 border border-blue-500/20 p-4 ${className}`}>
          <svg viewBox="0 0 300 140" className="w-full h-auto">
            {/* Electrical cabinet / server rack */}
            <rect x="40" y="30" width="80" height="90" rx="4" fill="#0F172A" stroke="#3B82F6" strokeWidth="2" />
            {/* Server unit slots */}
            <line x1="45" y1="48" x2="115" y2="48" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <line x1="45" y1="62" x2="115" y2="62" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <line x1="45" y1="76" x2="115" y2="76" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <line x1="45" y1="90" x2="115" y2="90" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            {/* Blinking status LEDs */}
            <circle cx="50" cy="48" r="1.5" fill="#EF4444" />
            <circle cx="56" cy="48" r="1.5" fill="#F59E0B" />
            
            {/* High-Voltage Lightning Arc */}
            <g className="animate-pulse">
              <path d="M85 45 L75 65 L90 68 L70 98 L78 72 L65 70 Z" fill="#60A5FA" stroke="#93C5FD" strokeWidth="1.5" />
              {/* Blue spark dots */}
              <circle cx="95" cy="55" r="2" fill="#E0F2FE" />
              <circle cx="60" cy="85" r="1.5" fill="#E0F2FE" />
              <circle cx="105" cy="75" r="2" fill="#38BDF8" />
            </g>

            {/* Electrical fire burning insulation */}
            <path d="M80 50 Q75 35 88 25 Q95 40 90 52 Z" fill="#F97316" opacity="0.9" />

            {/* Label Overlay */}
            <text x="160" y="45" fill="#3B82F6" fontSize="13" fontWeight="bold" fontFamily="monospace">ENERGIZED ELECTRICAL</text>
            <text x="160" y="65" fill="#94A3B8" fontSize="10">Radar, Servers & Switchgear</text>
            <text x="160" y="80" fill="#F87171" fontSize="10" fontWeight="bold">DANGER: CONDUCTIVE SHOCK!</text>
            <text x="160" y="100" fill="#60A5FA" fontSize="10" fontWeight="bold">EXTINGUISH: CO2 / Clean Agent</text>
          </svg>
        </div>
      );

    case 'D':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-amber-950/40 border border-amber-500/20 p-4 ${className}`}>
          <svg viewBox="0 0 300 140" className="w-full h-auto">
            {/* Aircraft wheel & brake assembly */}
            <circle cx="90" cy="80" r="40" fill="#1E293B" stroke="#475569" strokeWidth="8" />
            <circle cx="90" cy="80" r="26" fill="#334155" stroke="#64748B" strokeWidth="3" />
            <circle cx="90" cy="80" r="14" fill="#0F172A" />

            {/* White-hot burning magnesium brake zone (2,000°C) */}
            <g className="animate-pulse">
              <circle cx="90" cy="80" r="20" fill="#FEF3C7" opacity="0.9" />
              <circle cx="90" cy="80" r="12" fill="#FFFFFF" />
              
              {/* Intense radiating spark rays */}
              <line x1="90" y1="55" x2="90" y2="40" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="110" y1="65" x2="125" y2="55" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="115" y1="85" x2="135" y2="90" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="70" y1="65" x2="55" y2="50" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />

              {/* Blinding white flare particles */}
              <circle cx="120" cy="45" r="2.5" fill="#FFFFFF" />
              <circle cx="65" cy="45" r="2" fill="#FFFFFF" />
              <circle cx="130" cy="75" r="2" fill="#FEF08A" />
            </g>

            {/* Label Overlay */}
            <text x="160" y="45" fill="#F59E0B" fontSize="13" fontWeight="bold" fontFamily="monospace">COMBUSTIBLE METALS</text>
            <text x="160" y="65" fill="#94A3B8" fontSize="10">Magnesium Brakes & Titanium</text>
            <text x="160" y="80" fill="#EF4444" fontSize="10" fontWeight="bold">DANGER: WATER EXPLODES!</text>
            <text x="160" y="100" fill="#F59E0B" fontSize="10" fontWeight="bold">EXTINGUISH: Class D Powder</text>
          </svg>
        </div>
      );

    case 'K':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-rose-950/40 border border-rose-500/20 p-4 ${className}`}>
          <svg viewBox="0 0 300 140" className="w-full h-auto">
            {/* Commercial Fryer Vat */}
            <rect x="40" y="60" width="80" height="60" rx="3" fill="#334155" stroke="#64748B" strokeWidth="2" />
            <rect x="45" y="65" width="70" height="25" fill="#713F12" opacity="0.9" /> {/* Hot oil */}
            <rect x="60" y="55" width="40" height="25" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" /> {/* Fryer basket */}

            {/* Flames roaring from boiling cooking oil */}
            <g className="animate-pulse">
              <path d="M50 75 Q60 30 75 20 Q70 50 85 15 Q100 45 95 75 Z" fill="#DC2626" opacity="0.9" />
              <path d="M60 75 Q70 45 78 35 Q75 55 88 30 Q98 55 92 75 Z" fill="#F59E0B" opacity="0.95" />
              <path d="M70 75 Q75 55 80 42 Q85 60 88 75 Z" fill="#FEF08A" opacity="0.95" />
            </g>

            {/* Splatter oil warning dots */}
            <circle cx="68" cy="22" r="1.5" fill="#F97316" />
            <circle cx="95" cy="18" r="1.5" fill="#F97316" />

            {/* Label Overlay */}
            <text x="155" y="45" fill="#E11D48" fontSize="13" fontWeight="bold" fontFamily="monospace">COOKING OILS & FATS</text>
            <text x="155" y="65" fill="#94A3B8" fontSize="10">Deep-Fat Fryers & Galley Grease</text>
            <text x="155" y="80" fill="#EF4444" fontSize="10" fontWeight="bold">DANGER: WATER FIREBALL!</text>
            <text x="155" y="100" fill="#F43F5E" fontSize="10" fontWeight="bold">EXTINGUISH: Wet Chemical</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
