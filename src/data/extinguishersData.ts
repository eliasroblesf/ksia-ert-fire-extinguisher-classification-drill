import { ExtinguisherInfo } from '../types/fireTraining';

export const EXTINGUISHERS: Record<string, ExtinguisherInfo> = {
  WATER_APW: {
    id: 'WATER_APW',
    name: 'Water (APW - Air-Pressurized Water)',
    agentLabel: 'Pressurized Fresh Water / Wetting Agent',
    colorBand: '#FFFFFF', // White band on red cylinder (BS EN3) or polished chrome
    colorBandName: 'White Band / Polished Silver',
    suitableClasses: ['A'],
    prohibitedClasses: ['B', 'C', 'D', 'K'],
    dischargeDurationSec: 60,
    effectiveRangeMeters: '9 - 12m (30 - 40 ft)',
    operatingPressure: '100 psi (6.9 bar)',
    nozzleType: 'Solid brass jet nozzle (concentrated pinpoint stream)',
    chemicalPrinciple: 'Deep thermal cooling: Water absorbs 2,260 kJ/kg latent heat of vaporization, dropping the solid fuel below its ignition temperature and soaking embers.',
    airportSuitability: 'Duty-free stores, terminal departure gate seating lounges, baggage storage carton depots.',
    tacticalAdvantages: [
      'Maximum thermal quench capacity for deep-seated burning paper, cloth, and wood',
      'Long standoff distance (up to 12 meters), keeping responders clear of smoke plume',
      'Completely non-toxic, non-corrosive, environmentally safe, leaves minimal chemical residue'
    ],
    criticalLimitations: [
      'LETHAL on energized electrical circuits (high conductivity electrocution hazard)',
      'DISASTROUS on flammable liquids (causes explosive boilover and spreads fuel)',
      'EXPLOSIVE on combustible metals (magnesium/titanium split water into hydrogen gas)',
      'DANGEROUS on kitchen cooking oils (triggers violent explosive steam splatter)'
    ],
    passTechniqueNote: 'Aim solid stream directly at the burning base of embers. Work progressively from front to back of burning debris.',
    catastrophes: {
      B: 'Water sank beneath Jet A-1 fuel, flashed into steam, and violently erupted flaming fuel 15 meters across the apron (Boilover catastrophe).',
      C: 'Conductive water stream carried 415V electrical current back to responder hands, resulting in severe electrocution shock!',
      D: 'Molten burning magnesium stripped oxygen from water, creating explosive hydrogen gas that detonated with supersonic blast wave!',
      K: 'Water flashed beneath boiling cooking oil, erupting a 4-meter fireball of burning fat into the galley and engulfing responders.'
    }
  },

  AFFF_FOAM: {
    id: 'AFFF_FOAM',
    name: 'AFFF Foam (Aqueous Film-Forming Foam)',
    agentLabel: '3% or 6% Fluorosurfactant Synthetic Foam Solution',
    colorBand: '#F5E6CA', // Cream band (BS EN3)
    colorBandName: 'Cream Band',
    suitableClasses: ['A', 'B'],
    prohibitedClasses: ['C', 'D', 'K'],
    dischargeDurationSec: 30,
    effectiveRangeMeters: '4 - 6m (13 - 20 ft)',
    operatingPressure: '150 psi (10.3 bar)',
    nozzleType: 'Aspirating aerated branchpipe (mixes air into water-foam concentrate)',
    chemicalPrinciple: 'Dual suppression: Forms a floating aqueous film that spreads rapidly over liquid hydrocarbon fuel surfaces, sealing in flammable vapors while water blanket cools.',
    airportSuitability: 'Aircraft apron stands, fuel hydrant pits, maintenance hangars, ground equipment fueling stations.',
    tacticalAdvantages: [
      'Gold standard for aviation fuel spills (Jet A-1, AVGAS, diesel, hydraulic oils)',
      'Vapor suppression barrier prevents flash-back ignition even when hot metal is present',
      'Covers and blankets 2D fuel spills smoothly across concrete apron surfaces'
    ],
    criticalLimitations: [
      'Conductive water-based solution — strictly prohibited on live electrical switchgear',
      'Violently reactive on burning combustible metals (magnesium landing gear brakes)',
      'Splashes boiling cooking oil in commercial galley fryers'
    ],
    passTechniqueNote: 'Never plunge stream directly into liquid pool! Bounce foam off adjacent vertical surfaces (e.g. aircraft tire or wall) to allow the foam blanket to gently float across fuel.',
    catastrophes: {
      C: 'Aqueous foam solution formed conductive liquid path across electrical terminal box, causing instantaneous phase-to-ground flashover arc!',
      D: 'Water content in foam reacted violently with burning titanium/magnesium, triggering explosive white-hot flash!',
      K: 'Foam impact scattered boiling grease across kitchen counters, igniting grease duct filters.'
    }
  },

  CO2: {
    id: 'CO2',
    name: 'Carbon Dioxide (CO2)',
    agentLabel: 'Pure Liquefied CO2 Under High Vapor Pressure',
    colorBand: '#18181B', // Black band (BS EN3)
    colorBandName: 'Black Band / Flared Horn',
    suitableClasses: ['B', 'C'],
    prohibitedClasses: ['A', 'D', 'K'],
    dischargeDurationSec: 15,
    effectiveRangeMeters: '1 - 2.5m (3 - 8 ft)',
    operatingPressure: '830 psi at 20°C (self-pressurized)',
    nozzleType: 'Flared non-conductive frost-resistant discharge horn (no pressure gauge!)',
    chemicalPrinciple: 'Oxygen displacement and cryogenic chilling: Gaseous CO2 expands 450-fold, reducing oxygen concentration below 15% while discharging dry ice snow at -78.5°C (-109°F).',
    airportSuitability: 'Air Traffic Control radar rooms, avionics maintenance workshops, airport server data rooms, cockpit electrical panels.',
    tacticalAdvantages: [
      'Zero residue — 100% clean agent that will not corrode sensitive gold-plated avionics circuits',
      'Electrically non-conductive, safe on energized 415V/3.3kV equipment',
      'Rapid knockdown of small liquid spill fires and electrical component flames'
    ],
    criticalLimitations: [
      'Short standoff distance (1-2.5m) requires responder to get very close to heat',
      'High wind/outdoor dispersion: ineffective on open airfield apron when wind exceeds 8 knots',
      'Lacks cooling power for deep-seated Class A embers (fire quickly reignites)',
      'Frostbite risk: horn gets extremely cold; must only hold insulated handle, never touch horn',
      'Asphyxiation hazard in confined airport electrical vaults or aircraft cargo holds'
    ],
    passTechniqueNote: 'Hold insulated handle firmly. Aim horn directly at base of electrical fire or liquid edge. Sweep closely from edge inward.',
    catastrophes: {
      A: 'CO2 knocked down surface flame, but failed to extinguish deep embers inside luggage. Fire flashed back intensely within 10 seconds.',
      D: 'Magnesium at 2,000°C reacted chemically with CO2 (2Mg + CO2 -> 2MgO + C), accelerating combustion violently with black carbon smoke and sparks!',
      K: 'High-pressure CO2 gas jet blasted boiling oil out of the fryer vat, spreading fire across the galley.'
    }
  },

  ABC_DRY_POWDER: {
    id: 'ABC_DRY_POWDER',
    name: 'ABC Multi-Purpose Dry Chemical',
    agentLabel: 'Siliconized Monoammonium Phosphate (NH4H2PO4)',
    colorBand: '#2563EB', // Blue band (BS EN3)
    colorBandName: 'Blue Band',
    suitableClasses: ['A', 'B', 'C'],
    prohibitedClasses: ['D', 'K'],
    dischargeDurationSec: 20,
    effectiveRangeMeters: '4 - 6m (13 - 20 ft)',
    operatingPressure: '195 psi (13.4 bar)',
    nozzleType: 'High-velocity pinch grip hose nozzle with internal diffuser',
    chemicalPrinciple: 'Chemical chain reaction inhibition: Decomposes into metaphosphoric acid which coats combustible solids (Class A) with an airtight glassy crust, and interrupts free radicals in flames.',
    airportSuitability: 'Airport terminal common areas, baggage transfer tugs, general ramp workshops, carpark garages.',
    tacticalAdvantages: [
      'Highest versatility: highly effective across Classes A, B, and C simultaneously',
      'Rapid fire knockdown capability on 3D running fuel fires',
      'Forms a molten crust over solid combustibles to prevent rekindling'
    ],
    criticalLimitations: [
      'CORROSIVE RESIDUE: Leaves fine yellow powder that attracts moisture and turns into phosphoric acid, destroying aircraft avionics, radar components, and server circuit boards',
      'Creates dense blinding white dust cloud that severely impairs visibility and airway breathing in confined spaces',
      'Not rated for commercial cooking fryers (cannot saponify high-temperature oil)'
    ],
    passTechniqueNote: 'Aim at the fire base 5 meters back. Squeeze lever and sweep side-to-side, creating a dense curtain of powder that blankets the fuel.',
    catastrophes: {
      D: 'Moisture in chemical powder and phosphate decomposition triggered violent thermal spatter with burning magnesium metal.',
      K: 'Failed to saponify hot vegetable oil; chemical powder crust broke and fryer reignited vigorously.'
    }
  },

  BC_PURPLE_K: {
    id: 'BC_PURPLE_K',
    name: 'BC Dry Chemical (Purple-K)',
    agentLabel: 'Potassium Bicarbonate (KHCO3) - Military & Airport ARFF Spec',
    colorBand: '#9333EA', // Purple band accent
    colorBandName: 'Purple Accent / Red Body',
    suitableClasses: ['B', 'C'],
    prohibitedClasses: ['A', 'D', 'K'],
    dischargeDurationSec: 22,
    effectiveRangeMeters: '5 - 8m (16 - 26 ft)',
    operatingPressure: '200 psi (13.8 bar)',
    nozzleType: 'High-flow tactical discharge wand / lever gun',
    chemicalPrinciple: 'Superior free-radical scavenging: Potassium ions are twice as effective as sodium at capturing H+ and OH- free radicals in the combustion reaction zone.',
    airportSuitability: 'Aviation refueling trucks, rapid response ARFF support units, fuel farm loading racks, engine test cells.',
    tacticalAdvantages: [
      'Preferred agent specified by NFPA 403 / 408 for airport crash rescue rapid hydrocarbon knock-down',
      'Twice as effective on flammable liquid fires per kilogram as standard sodium bicarbonate',
      'Compatible with AFFF foam (can be applied in dual-agent attack without destroying foam)'
    ],
    criticalLimitations: [
      'Not rated for Class A deep-seated embers (does not leave an airtight coating)',
      'Leaves alkaline powdery residue, unsuitable for pristine avionics bays',
      'Violent reaction if applied to combustible metals'
    ],
    passTechniqueNote: 'Start at leading edge of burning fuel spill, sweep rapidly from side to side advancing across the surface.',
    catastrophes: {
      A: 'Liquid flame extinguished, but deep smoldering cardboard ignited again after 45 seconds due to lack of ember cooling.',
      D: 'Violent metal reaction with violent flash spattering molten metal sparks.',
      K: 'Discharged into cooking fryer, causing splashing and rapid re-flash.'
    }
  },

  CLASS_D_POWDER: {
    id: 'CLASS_D_POWDER',
    name: 'Class D Dry Powder (Met-L-X / Lith-X / Copper)',
    agentLabel: 'Granular Sodium Chloride / Copper Powder with Polymer Sealant',
    colorBand: '#EAB308', // Yellow band / Yellow cylinder
    colorBandName: 'Yellow Cylinder / Soft Wand',
    suitableClasses: ['D'],
    prohibitedClasses: ['A', 'B', 'C', 'K'],
    dischargeDurationSec: 28,
    effectiveRangeMeters: '1.5 - 2.5m (5 - 8 ft)',
    operatingPressure: '175 psi (12 bar)',
    nozzleType: 'Long stainless low-velocity applicator extension wand with flared velocity-reduction bell',
    chemicalPrinciple: 'Smothering and conductive heat sinking: Powder gently forms a solid, heat-absorbing crust over molten metal at 2,500°C, cutting off atmospheric oxygen without blowing burning flakes.',
    airportSuitability: 'Runway rapid intervention vehicles, aircraft brake maintenance workshops, landing gear overhaul bays.',
    tacticalAdvantages: [
      'The ONLY agent capable of safely extinguishing 2,000°C+ aircraft magnesium wheel brake fires and titanium engine fires',
      'Soft-velocity applicator prevents blowing burning metal fragments into adjacent aircraft fuel tanks or personnel',
      'Forms a resilient solid slag crust that withstands extreme metal temperatures'
    ],
    criticalLimitations: [
      'Heavy and bulky with specialized applicator wand; requires specific tactical training',
      'Useless on flammable liquid spills or electrical fires (will sink or fail to blanket)',
      'Once crust is formed, MUST NOT be disturbed or punctured until 100% cooled'
    ],
    passTechniqueNote: 'Stand 2 meters away. Discharge powder GENTLY over burning metal through the soft-flow bell, allowing it to smother the metal without disturbing the molten pool.',
    catastrophes: {
      A: 'Powder rolled off vertical burning furniture and cardboard, leaving fire unchecked.',
      B: 'Heavy salt granules sank directly to the bottom of the Jet A-1 fuel pool without extinguishing surface vapors.',
      C: 'Fine conductive salt powder caused permanent short-circuit bridging in electrical components.',
      K: 'Powder sank in hot oil, displacing volume and causing boiling fryer overflow.'
    }
  },

  WET_CHEMICAL: {
    id: 'WET_CHEMICAL',
    name: 'Wet Chemical (Class K / F)',
    agentLabel: 'Potassium Acetate / Potassium Citrate Aqueous Solution',
    colorBand: '#CA8A04', // Canary Yellow band (BS EN3)
    colorBandName: 'Yellow Band / Mist Wand',
    suitableClasses: ['K', 'A'],
    prohibitedClasses: ['B', 'C', 'D'],
    dischargeDurationSec: 45,
    effectiveRangeMeters: '2.5 - 3.5m (8 - 12 ft)',
    operatingPressure: '100 psi (6.9 bar)',
    nozzleType: 'Curved stainless steel wand with low-velocity fine mist atomizing nozzle',
    chemicalPrinciple: 'Saponification: Potassium salts react with fatty acids in hot oil to form a thick, soapy foam blanket (soap crust) that blocks oxygen, while the mist gently cools oil below auto-ignition.',
    airportSuitability: 'Terminal food courts, VIP terminal commercial kitchens, in-flight catering production facilities.',
    tacticalAdvantages: [
      'Only approved agent for hot commercial deep-fat fryers and culinary vegetable oil fires',
      'Gentle mist discharge prevents splashing scalding hot 380°C oil onto personnel',
      'Produces a lasting soapy blanket that permanently prevents re-flash of hot fat'
    ],
    criticalLimitations: [
      'Conductive alkaline solution — power to fryer must be shut off prior to application',
      'Not rated for large flammable hydrocarbon fuel spills on the apron (low vapor seal on fuel)',
      'Catastrophic if applied to burning metal landing gear components'
    ],
    passTechniqueNote: 'Hold wand nozzle 1 meter above the fryer. Discharge fine mist in circular sweeping motions, allowing the foam blanket to settle gently onto the oil surface.',
    catastrophes: {
      B: 'Failed to create adequate vapor barrier over Jet A-1 fuel spill; fuel pool reignited immediately.',
      C: 'Alkaline potassium solution bridged high-voltage wiring, sending electrical shock through equipment.',
      D: 'Moisture in solution triggered explosive hydrogen flash with burning magnesium metal.'
    }
  },

  CLEAN_AGENT: {
    id: 'CLEAN_AGENT',
    name: 'Clean Agent (Halotron I / FE-36)',
    agentLabel: 'Hydrochlorofluorocarbon (HCFC) / Hydrofluorocarbon (HFC) Gas',
    colorBand: '#059669', // Emerald band
    colorBandName: 'Green Band / Clean Nozzle',
    suitableClasses: ['B', 'C', 'A'],
    prohibitedClasses: ['D', 'K'],
    dischargeDurationSec: 14,
    effectiveRangeMeters: '3 - 4.5m (10 - 15 ft)',
    operatingPressure: '125 psi (8.6 bar)',
    nozzleType: 'High-dispersion stream nozzle with pressure regulator',
    chemicalPrinciple: 'Chemical flame inhibition & evaporative cooling: Discharges as an evaporating liquid stream that turns into gas, capturing thermal energy and interrupting the chemical combustion chain without leaving residue.',
    airportSuitability: 'Flight decks, aircraft cockpits, ATC radar control tower consoles, telecom server rooms.',
    tacticalAdvantages: [
      'The ultimate clean agent: Leaves ZERO corrosive residue, non-conductive, and non-corrosive to aerospace electronics',
      'Safe for delicate computer equipment, airport baggage scanners, and flight simulators',
      'Higher range and less susceptible to wind dissipation than CO2 gas'
    ],
    criticalLimitations: [
      'Higher cost per unit than standard dry chemical',
      'Not rated for combustible metals (Class D) or commercial deep-fat fryers (Class K)',
      'Must maintain adequate ventilation following discharge in confined spaces'
    ],
    passTechniqueNote: 'Aim at the base of the fire. Sweep across base until flame is fully extinguished. Inspect for hidden smoldering wires.',
    catastrophes: {
      D: 'Decomposed at 2,000°C metal temperature into toxic halogenated gases and exacerbated magnesium flame.',
      K: 'Gas pressure splashed burning oil; lacked saponification capability.'
    }
  }
};
