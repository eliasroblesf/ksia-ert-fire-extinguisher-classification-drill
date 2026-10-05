import React, { useState } from 'react';
import { ExtinguisherType } from '../types/fireTraining';

interface ExtinguisherModelProps {
  type: ExtinguisherType;
  height?: number;
  interactive?: boolean;
  className?: string;
  onHotspotClick?: (part: string) => void;
}

export const ExtinguisherModel: React.FC<ExtinguisherModelProps> = ({
  type,
  height = 240,
  interactive = false,
  className = '',
  onHotspotClick
}) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Styling traits per extinguisher type
  const getSpecs = () => {
    switch (type) {
      case 'WATER_APW':
        return {
          bodyColor: '#DC2626',
          bandColor: '#FFFFFF',
          bandLabel: 'WATER',
          hasGauge: true,
          nozzleStyle: 'PINPOINT_JET',
          wandLength: 0,
          isYellowBody: false
        };
      case 'AFFF_FOAM':
        return {
          bodyColor: '#DC2626',
          bandColor: '#FEF3C7', // Cream
          bandLabel: 'FOAM',
          hasGauge: true,
          nozzleStyle: 'AERATING_BRANCHPIPE',
          wandLength: 0,
          isYellowBody: false
        };
      case 'CO2':
        return {
          bodyColor: '#DC2626',
          bandColor: '#18181B', // Black
          bandLabel: 'CO2',
          hasGauge: false, // CO2 has NO pressure gauge! Weighed by tare weight
          nozzleStyle: 'FLARED_HORN',
          wandLength: 0,
          isYellowBody: false
        };
      case 'ABC_DRY_POWDER':
        return {
          bodyColor: '#DC2626',
          bandColor: '#2563EB', // Blue
          bandLabel: 'POWDER',
          hasGauge: true,
          nozzleStyle: 'PINCH_NOZZLE',
          wandLength: 0,
          isYellowBody: false
        };
      case 'BC_PURPLE_K':
        return {
          bodyColor: '#DC2626',
          bandColor: '#9333EA', // Purple
          bandLabel: 'PURPLE-K',
          hasGauge: true,
          nozzleStyle: 'TACTICAL_GUN',
          wandLength: 0,
          isYellowBody: false
        };
      case 'CLASS_D_POWDER':
        return {
          bodyColor: '#CA8A04', // Yellow cylinder
          bandColor: '#FEF08A',
          bandLabel: 'CLASS D',
          hasGauge: true,
          nozzleStyle: 'SOFT_BELL_WAND',
          wandLength: 50,
          isYellowBody: true
        };
      case 'WET_CHEMICAL':
        return {
          bodyColor: '#DC2626',
          bandColor: '#FACC15', // Canary Yellow
          bandLabel: 'WET CHEM',
          hasGauge: true,
          nozzleStyle: 'MIST_WAND',
          wandLength: 45,
          isYellowBody: false
        };
      case 'CLEAN_AGENT':
        return {
          bodyColor: '#DC2626',
          bandColor: '#059669', // Emerald
          bandLabel: 'HALOTRON',
          hasGauge: true,
          nozzleStyle: 'PRECISION_STREAM',
          wandLength: 0,
          isYellowBody: false
        };
      default:
        return {
          bodyColor: '#DC2626',
          bandColor: '#FFFFFF',
          bandLabel: 'WATER',
          hasGauge: true,
          nozzleStyle: 'PINPOINT_JET',
          wandLength: 0,
          isYellowBody: false
        };
    }
  };

  const spec = getSpecs();

  const handleHotspot = (part: string) => {
    setActiveHotspot(part);
    if (onHotspotClick) onHotspotClick(part);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 140 280"
        style={{ height: `${height}px`, width: `${(height * 140) / 280}px` }}
        className="filter drop-shadow-xl"
      >
        {/* Defs for gradients */}
        <defs>
          {/* Cylinder Metallic Sheen */}
          <linearGradient id={`cylGrad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="25%" stopColor={spec.bodyColor} />
            <stop offset="55%" stopColor="#F87171" />
            <stop offset="75%" stopColor={spec.bodyColor} />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>

          {/* Yellow body sheen for Class D */}
          <linearGradient id="cylGrad-D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#713F12" />
            <stop offset="25%" stopColor="#CA8A04" />
            <stop offset="55%" stopColor="#FEF08A" />
            <stop offset="75%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#422006" />
          </linearGradient>

          {/* Pressure Gauge Bezel */}
          <radialGradient id="gaugeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="90%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
        </defs>

        {/* 1. Carrying Handle & Discharge Valve Body (Brass/Steel) */}
        <g
          className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
          onClick={() => interactive && handleHotspot('LEVER')}
        >
          {/* Valve Base Neck */}
          <rect x="62" y="58" width="16" height="14" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          
          {/* Fixed Carrying Handle */}
          <path d="M50 68 L78 68 L76 73 L52 73 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          
          {/* Operable Squeeze Lever */}
          <path d="M48 56 Q62 52 76 66 L74 70 Q62 57 50 60 Z" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />

          {/* Pull Pin & Ring (Yellow/Stainless) */}
          <circle cx="60" cy="62" r="5" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
          <line x1="60" y1="62" x2="72" y2="62" stroke="#FBBF24" strokeWidth="2.5" />
          {/* Plastic Tamper Seal Flag */}
          <rect x="70" y="60" width="4" height="6" fill="#EF4444" rx="1" />
        </g>

        {/* 2. Pressure Gauge (Present on all EXCEPT CO2!) */}
        {spec.hasGauge ? (
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('GAUGE')}
          >
            <circle cx="82" cy="64" r="7" fill="url(#gaugeGrad)" stroke="#334155" strokeWidth="1" />
            {/* Green operational arc */}
            <path d="M80 60 A4 4 0 0 1 84 60" stroke="#10B981" strokeWidth="2" fill="none" />
            {/* Red left/right warning zones */}
            <path d="M78 62 A4 4 0 0 1 80 60" stroke="#EF4444" strokeWidth="1.5" fill="none" />
            <path d="M84 60 A4 4 0 0 1 86 62" stroke="#EF4444" strokeWidth="1.5" fill="none" />
            {/* Indicator Needle pointing straight up (Operable in Green) */}
            <line x1="82" y1="64" x2="82" y2="59" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
            <circle cx="82" cy="64" r="1.5" fill="#000000" />
          </g>
        ) : (
          /* CO2 Stamp Tag (No Gauge) */
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('TARE_WEIGHT')}
          >
            <rect x="76" y="61" width="10" height="7" rx="1" fill="#18181B" stroke="#64748B" strokeWidth="0.8" />
            <text x="81" y="66" fill="#FBBF24" fontSize="4" textAnchor="middle" fontFamily="monospace">TARE</text>
          </g>
        )}

        {/* 3. Main Cylinder Body */}
        <g
          className={interactive ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}
          onClick={() => interactive && handleHotspot('CYLINDER')}
        >
          {/* Cylinder Top Dome */}
          <path
            d="M38 90 C38 68 102 68 102 90 Z"
            fill={spec.isYellowBody ? 'url(#cylGrad-D)' : `url(#cylGrad-${type})`}
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Cylinder Tubular Body */}
          <rect
            x="38"
            y="90"
            width="64"
            height="145"
            fill={spec.isYellowBody ? 'url(#cylGrad-D)' : `url(#cylGrad-${type})`}
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Cylinder Bottom Skirt / Base Foot Rim */}
          <path d="M36 235 C36 242 104 242 104 235 L102 232 L38 232 Z" fill="#0F172A" stroke="#334155" strokeWidth="1" />

          {/* Color Identification Band (NFPA / BS EN3) */}
          <rect x="39" y="106" width="62" height="26" fill={spec.bandColor} stroke="#334155" strokeWidth="0.8" />
          
          {/* Text in Band */}
          <text
            x="70"
            y="122"
            textAnchor="middle"
            fill={spec.bandColor === '#FFFFFF' || spec.bandColor === '#FEF3C7' || spec.bandColor === '#FACC15' || spec.bandColor === '#FEF08A' ? '#0F172A' : '#FFFFFF'}
            fontSize="8.5"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="0.05em"
          >
            {spec.bandLabel}
          </text>

          {/* Official KSIA Operating Instructions Placard */}
          <rect x="42" y="140" width="56" height="78" rx="2" fill="#0A0F1A" stroke="#334155" strokeWidth="0.8" opacity="0.9" />
          
          {/* P.A.S.S. Symbol Icons on Placard */}
          <text x="46" y="152" fill="#FBBF24" fontSize="6.5" fontWeight="bold" fontFamily="monospace">P.A.S.S.</text>
          <line x1="46" y1="154" x2="94" y2="154" stroke="#475569" strokeWidth="0.5" />
          <text x="46" y="163" fill="#CBD5E1" fontSize="4.8" fontFamily="sans-serif">1. PULL PIN</text>
          <text x="46" y="172" fill="#CBD5E1" fontSize="4.8" fontFamily="sans-serif">2. AIM AT BASE</text>
          <text x="46" y="181" fill="#CBD5E1" fontSize="4.8" fontFamily="sans-serif">3. SQUEEZE LEVER</text>
          <text x="46" y="190" fill="#CBD5E1" fontSize="4.8" fontFamily="sans-serif">4. SWEEP SIDE-SIDE</text>

          {/* Suitable Classes Row */}
          <rect x="45" y="196" width="50" height="16" rx="1.5" fill="#1E293B" stroke="#475569" strokeWidth="0.5" />
          <text x="70" y="207" textAnchor="middle" fill="#38BDF8" fontSize="5.5" fontWeight="bold" fontFamily="monospace">
            KSIA CERTIFIED
          </text>
        </g>

        {/* 4. Inspection Tag hanging on collar */}
        <g
          className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
          onClick={() => interactive && handleHotspot('INSPECTION_TAG')}
        >
          {/* Tie Wire */}
          <line x1="64" y1="72" x2="56" y2="92" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="1 1" />
          {/* Tag Card */}
          <rect x="48" y="92" width="14" height="24" rx="1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
          <circle cx="55" cy="95" r="1.5" fill="#000000" />
          <line x1="51" y1="100" x2="59" y2="100" stroke="#713F12" strokeWidth="0.8" />
          <line x1="51" y1="104" x2="59" y2="104" stroke="#713F12" strokeWidth="0.8" />
          <line x1="51" y1="108" x2="59" y2="108" stroke="#713F12" strokeWidth="0.8" />
        </g>

        {/* 5. Discharge Hose & Specialized Nozzle */}
        {spec.nozzleStyle === 'FLARED_HORN' ? (
          /* CO2 Flared Discharge Horn */
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('HORN')}
          >
            {/* High pressure braided hose curving out */}
            <path d="M62 66 Q30 75 24 110" stroke="#0F172A" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Insulated handle on horn */}
            <rect x="18" y="110" width="10" height="16" rx="2" fill="#334155" stroke="#64748B" strokeWidth="1" />
            <text x="23" y="121" textAnchor="middle" fill="#FFFFFF" fontSize="3.5" fontWeight="bold">HOLD</text>
            {/* Flared Black Plastic Horn */}
            <path d="M20 126 L12 175 L34 175 L26 126 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
            <ellipse cx="23" cy="175" rx="11" ry="3.5" fill="#27272A" stroke="#52525B" strokeWidth="1" />
          </g>
        ) : spec.nozzleStyle === 'SOFT_BELL_WAND' ? (
          /* Class D Low-Velocity Wand with Flared Bell Nozzle */
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('WAND')}
          >
            <path d="M62 66 Q25 80 20 125" stroke="#0F172A" strokeWidth="4" fill="none" />
            {/* Long Stainless Extension Wand */}
            <line x1="20" y1="125" x2="20" y2="200" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            {/* Soft velocity bell applicator */}
            <path d="M16 200 L12 225 L28 225 L24 200 Z" fill="#CA8A04" stroke="#713F12" strokeWidth="1" />
          </g>
        ) : spec.nozzleStyle === 'MIST_WAND' ? (
          /* Wet Chemical Fine Mist Wand */
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('WAND')}
          >
            <path d="M62 66 Q26 78 22 130" stroke="#0F172A" strokeWidth="4" fill="none" />
            <line x1="22" y1="130" x2="22" y2="195" stroke="#E2E8F0" strokeWidth="3" />
            {/* 45-degree angle mist nozzle tip */}
            <path d="M22 195 L14 208" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="13" cy="210" r="2.5" fill="#FACC15" />
          </g>
        ) : spec.nozzleStyle === 'AERATING_BRANCHPIPE' ? (
          /* Foam Aerating Branchpipe Nozzle with Air Inlets */
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('NOZZLE')}
          >
            <path d="M62 66 Q28 85 24 140" stroke="#0F172A" strokeWidth="4.5" fill="none" />
            {/* Cylindrical Aerating Nozzle */}
            <rect x="18" y="140" width="12" height="35" rx="2" fill="#334155" stroke="#64748B" strokeWidth="1" />
            {/* Air inlet holes for foam expansion */}
            <circle cx="21" cy="148" r="1.5" fill="#000000" />
            <circle cx="27" cy="148" r="1.5" fill="#000000" />
            <circle cx="21" cy="154" r="1.5" fill="#000000" />
            <circle cx="27" cy="154" r="1.5" fill="#000000" />
          </g>
        ) : (
          /* Standard Flexible Hose with Pinch/Stream Nozzle (Water, Dry Chem, Clean Agent) */
          <g
            className={interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
            onClick={() => interactive && handleHotspot('NOZZLE')}
          >
            <path d="M62 66 Q26 80 22 135" stroke="#0F172A" strokeWidth="4.5" fill="none" />
            {/* Brass or polymer nozzle */}
            <rect x="19" y="135" width="6" height="24" rx="1.5" fill="#D97706" stroke="#78350F" strokeWidth="1" />
            {/* Clip bracket on cylinder holding hose */}
            <rect x="36" y="145" width="4" height="6" fill="#475569" rx="1" />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Interactive Extinguisher Cutaway Anatomy Modal / Viewer
 */
export const ExtinguisherAnatomyExplorer: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<'PIN' | 'GAUGE' | 'LEVER' | 'SIPHON' | 'AGENT' | 'HOSE'>('GAUGE');

  const partsInfo = {
    PIN: {
      title: 'Safety Pull-Pin & Tamper Seal',
      desc: 'Prevents accidental discharge during transit or handling. Fitted with a tamper-evident plastic break-away seal. In the P.A.S.S. sequence, PULLING the pin is Step 1. It shears the seal cleanly and frees the squeeze handle.',
      inspectionCheck: 'Verify tamper seal is intact and pin is not bent or corroded.'
    },
    GAUGE: {
      title: 'Pressure Gauge (Stored Pressure)',
      desc: 'Monitors the propellant gas (dry nitrogen or air) pressure inside the cylinder. The needle MUST rest firmly in the green operable sector (100–195 psi). Note: CO2 extinguishers do NOT have pressure gauges; they are verified solely by weighing the tare mass!',
      inspectionCheck: 'Ensure indicator needle is centered in the green pie zone. Tap lightly to verify needle is not stuck.'
    },
    LEVER: {
      title: 'Carrying Handle & Operating Squeeze Lever',
      desc: 'The lower handle is stationary and designed to bear the full weight of the extinguisher while in transit. The upper spring-loaded squeeze lever depresses the internal Schrader valve spindle to initiate agent flow.',
      inspectionCheck: 'Ensure free movement when pin is removed; ensure handle is rigidly fastened to the collar.'
    },
    SIPHON: {
      title: 'Internal Siphon Dip Tube',
      desc: 'Extends from the discharge valve at the top all the way down to within 1 cm of the bottom of the cylinder. Pressure forces the chemical agent down through the fluid bed and UP the siphon tube to the discharge hose.',
      inspectionCheck: 'Requires internal annual hydrostatic testing and dip tube clearance verification.'
    },
    AGENT: {
      title: 'Suppression Chemical & Nitrogen Charge',
      desc: 'Contains the rated suppression media (AFFF foam concentrate, monoammonium phosphate powder, clean agent liquid, or water) pressurized under dry nitrogen propellant. The cylinder shell is pressure-tested up to 500+ psi.',
      inspectionCheck: 'Monthly visual check for dents, severe rust, scorch marks, or chemical leakage around seams.'
    },
    HOSE: {
      title: 'Reinforced Discharge Hose & Tactical Nozzle',
      desc: 'Braided synthetic rubber hose capable of withstanding operating pressures. Allows the responder to direct the stream precisely at the base of the fire while sweeping side-to-side without tilting the heavy cylinder.',
      inspectionCheck: 'Check for cracking, dry rot, blocked nozzle tip, or wasp/insect nesting inside the orifice.'
    }
  };

  const current = partsInfo[selectedPart];

  return (
    <div className="rounded-xl bg-[#0a0f1a] border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Portable Fire Extinguisher Anatomy</h3>
          <p className="text-xs text-slate-400">Interactive NFPA 10 Stored-Pressure Cutaway Inspection Model</p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
          NFPA 10 COMPLIANT
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Cutaway Graphic with clickable pins */}
        <div className="relative bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex items-center justify-center min-h-[300px]">
          <svg viewBox="0 0 160 300" className="w-48 h-auto">
            {/* Cutaway Cylinder Shell */}
            <path d="M40 95 C40 70 120 70 120 95 L120 240 C120 252 40 252 40 240 Z" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            
            {/* Cutaway Agent Fill (50% interior visible) */}
            <rect x="42" y="140" width="76" height="100" fill="#CA8A04" opacity="0.6" />
            {/* Nitrogen gas head space */}
            <rect x="42" y="95" width="76" height="45" fill="#38BDF8" opacity="0.15" />
            <text x="80" y="115" textAnchor="middle" fill="#7DD3FC" fontSize="5" fontFamily="monospace">N2 PROPELLANT</text>
            <text x="80" y="180" textAnchor="middle" fill="#FEF08A" fontSize="6.5" fontWeight="bold" fontFamily="monospace">CHEMICAL AGENT</text>

            {/* Siphon tube running down center */}
            <rect x="76" y="70" width="8" height="165" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            
            {/* Valve & Lever */}
            <rect x="70" y="55" width="20" height="15" fill="#94A3B8" />
            <path d="M52 68 L96 68 L94 74 L54 74 Z" fill="#334155" />
            <path d="M50 56 Q70 52 96 66 L94 70 Q70 57 52 60 Z" fill="#0F172A" />
            <circle cx="68" cy="62" r="5" fill="none" stroke="#FBBF24" strokeWidth="2.5" />

            {/* Gauge */}
            <circle cx="102" cy="62" r="7" fill="#F1F5F9" stroke="#334155" strokeWidth="1" />
            <line x1="102" y1="62" x2="102" y2="57" stroke="#000" strokeWidth="1" />

            {/* Hose */}
            <path d="M72 65 Q35 80 26 150" stroke="#0F172A" strokeWidth="5" fill="none" />
            <rect x="23" y="150" width="6" height="25" fill="#D97706" />

            {/* INTERACTIVE CALLOUT HOTSPOTS */}
            {/* 1. Pin Hotspot */}
            <circle
              cx="68"
              cy="62"
              r="8"
              fill={selectedPart === 'PIN' ? '#F59E0B' : '#FBBF24'}
              opacity={selectedPart === 'PIN' ? '0.8' : '0.4'}
              className="cursor-pointer animate-ping"
              onClick={() => setSelectedPart('PIN')}
            />
            <circle cx="68" cy="62" r="4" fill="#F59E0B" className="cursor-pointer" onClick={() => setSelectedPart('PIN')} />

            {/* 2. Gauge Hotspot */}
            <circle
              cx="102"
              cy="62"
              r="8"
              fill={selectedPart === 'GAUGE' ? '#3B82F6' : '#60A5FA'}
              opacity={selectedPart === 'GAUGE' ? '0.8' : '0.4'}
              className="cursor-pointer animate-ping"
              onClick={() => setSelectedPart('GAUGE')}
            />
            <circle cx="102" cy="62" r="4" fill="#3B82F6" className="cursor-pointer" onClick={() => setSelectedPart('GAUGE')} />

            {/* 3. Lever Hotspot */}
            <circle cx="80" cy="50" r="4" fill="#10B981" className="cursor-pointer" onClick={() => setSelectedPart('LEVER')} />

            {/* 4. Siphon Hotspot */}
            <circle cx="80" cy="135" r="4" fill="#8B5CF6" className="cursor-pointer" onClick={() => setSelectedPart('SIPHON')} />

            {/* 5. Agent Hotspot */}
            <circle cx="80" cy="205" r="4" fill="#F43F5E" className="cursor-pointer" onClick={() => setSelectedPart('AGENT')} />

            {/* 6. Hose Hotspot */}
            <circle cx="26" cy="140" r="4" fill="#06B6D4" className="cursor-pointer" onClick={() => setSelectedPart('HOSE')} />
          </svg>
        </div>

        {/* Hotspot details and parts selector tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-lg">
            {(['PIN', 'GAUGE', 'LEVER', 'SIPHON', 'AGENT', 'HOSE'] as const).map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                  selectedPart === part
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {part}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-amber-400 flex items-center justify-between">
              <span>{current.title}</span>
              <span className="text-[10px] text-slate-500 font-mono">PART ID: {selectedPart}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-emerald-400 block mb-0.5">
                Pre-Drill Inspection Checklist:
              </span>
              <span className="text-xs text-slate-400 italic">{current.inspectionCheck}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
