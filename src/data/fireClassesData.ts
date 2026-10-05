import { FireClassInfo } from '../types/fireTraining';

export const FIRE_CLASSES: Record<string, FireClassInfo> = {
  A: {
    id: 'A',
    symbolName: 'Green Triangle',
    shape: 'TRIANGLE',
    colorHex: '#10B981', // Emerald Green
    badgeBg: 'bg-emerald-950/60',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    title: 'Class A: Ordinary Combustibles',
    subtitle: 'Wood, Paper, Baggage, Fabric & Plastics',
    fuelDescription: 'Solid organic materials that burn with glowing embers and produce ash (pyrolysis decomposition).',
    airportExamples: [
      'Checked passenger luggage & nylon travel bags in baggage sorting halls',
      'Cardboard packing boxes & pallets in air cargo handling facilities',
      'Duty-free retail store displays, wooden fixtures & merchandise',
      'Upholstered seating & carpet inside passenger departure lounges',
      'Aircraft cabin seat fabric, carpets & composite panels'
    ],
    combustionMechanism: 'Thermal degradation of cellulosic and synthetic polymers producing flammable volatile gases. Deep-seated glowing embers require deep cooling below combustion temperature.',
    primaryAgents: ['WATER_APW', 'AFFF_FOAM', 'ABC_DRY_POWDER', 'WET_CHEMICAL'],
    prohibitedAgents: ['CO2'], // Ineffective on deep embers outdoors
    catastropheWarning: 'Carbon dioxide lacks adequate cooling capacity for deep-seated Class A embers; the fire will rapidly flash and reignite once CO2 dissipates.',
    nfpaDescription: 'Fires in ordinary combustible materials, such as wood, cloth, paper, rubber, and many plastics.',
    bsEn3Equivalent: 'Class A (Fires involving solid materials, usually of an organic nature, in which combustion normally takes place with the formation of glowing embers).'
  },

  B: {
    id: 'B',
    symbolName: 'Red Square',
    shape: 'SQUARE',
    colorHex: '#EF4444', // Red
    badgeBg: 'bg-rose-950/60',
    badgeBorder: 'border-rose-500/40',
    badgeText: 'text-rose-400',
    title: 'Class B: Flammable Liquids & Gases',
    subtitle: 'Jet A-1 Aviation Fuel, AVGAS, Hydraulic Fluid & Solvents',
    fuelDescription: 'Volatile hydrocarbon liquids and pressurized combustible gases. The liquid itself does not burn; its evaporating vapors burn above the surface.',
    airportExamples: [
      'Jet A-1 aviation kerosene fuel spill during hydrant or bowser aircraft refueling on apron',
      'Hydraulic fluid leaks under high pressure (Skydrol) from aircraft landing gear oleo struts',
      'Diesel & gasoline from ground service equipment (GSE tugs, belt loaders, stairs)',
      'Aviation maintenance solvents, paints, and thinners in maintenance hangars',
      'Liquid propane (LPG) and compressed natural gas tanks powering ramp vehicles'
    ],
    combustionMechanism: 'Liquid vapors combust with atmospheric oxygen in an exothermic free-radical chain reaction. Requires vapor suppression (foam blanket) or chemical chain reaction interruption (dry chemical/clean agent).',
    primaryAgents: ['AFFF_FOAM', 'BC_PURPLE_K', 'ABC_DRY_POWDER', 'CO2', 'CLEAN_AGENT'],
    prohibitedAgents: ['WATER_APW'],
    catastropheWarning: 'CATASTROPHIC VIOLENT BOILOVER: Applying water to burning hydrocarbon fuel causes water to sink, flash instantly into superheated steam (1,700x expansion ratio), and violently erupt the burning fuel across the entire apron and nearby aircraft!',
    nfpaDescription: 'Fires in flammable liquids, combustible liquids, petroleum greases, tars, oils, oil-based paints, solvents, lacquers, alcohols, and flammable gases.',
    bsEn3Equivalent: 'Class B (Fires involving liquids or liquefiable solids, including fuels, oils, paints, fats and solvents).'
  },

  C: {
    id: 'C',
    symbolName: 'Blue Circle',
    shape: 'CIRCLE',
    colorHex: '#3B82F6', // Blue
    badgeBg: 'bg-blue-950/60',
    badgeBorder: 'border-blue-500/40',
    badgeText: 'text-blue-400',
    title: 'Class C: Energized Electrical Equipment',
    subtitle: 'Avionics, Radar Systems, Server Racks & Substation Switchgear',
    fuelDescription: 'Active electrical equipment where live electrical voltage poses electrocution risk to responders. Once de-energized, the fire reverts to its underlying fuel class (A or B).',
    airportExamples: [
      'Airport Air Traffic Control (ATC) radar transceiver & transponder server racks',
      'Main baggage conveyor SCADA electrical motor control centers (MCC)',
      'Substation 33kV/415V electrical switchboards and step-down transformers',
      'Passenger terminal uninterruptible power supply (UPS) inverter battery banks',
      'Aircraft cockpit flight deck avionics bays and power distribution units'
    ],
    combustionMechanism: 'Electrical arcing and resistive overheating igniting wire insulation, PCB epoxy resin, and surrounding plastics with continuous high-energy electrical re-ignition source.',
    primaryAgents: ['CO2', 'CLEAN_AGENT', 'ABC_DRY_POWDER'],
    prohibitedAgents: ['WATER_APW', 'AFFF_FOAM'],
    catastropheWarning: 'FATAL HIGH-VOLTAGE ELECTROCUTION: Water and standard foam are electrically conductive. Directing a stream of water onto live 415V/3.3kV airport switchgear sends electrical current directly back up the stream through the responder’s body, causing fatal electrocution!',
    nfpaDescription: 'Fires that involve energized electrical equipment where the electrical non-conductivity of the extinguishing media is of importance.',
    bsEn3Equivalent: 'Class E / Electrical (In BS EN3, energized electrical fires are treated as a hazard classification requiring non-conductive extinguishing agents: CO2, Clean Agent, Dry Powder).'
  },

  D: {
    id: 'D',
    symbolName: 'Yellow 5-Point Star',
    shape: 'STAR',
    colorHex: '#F59E0B', // Amber / Gold
    badgeBg: 'bg-amber-950/60',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-400',
    title: 'Class D: Combustible Metals',
    subtitle: 'Aircraft Magnesium Wheels, Titanium Blades & Lithium Metal',
    fuelDescription: 'Alkaline and transitional metals that combust at extreme temperatures (2,000°C to 3,000°C / 3,600°F to 5,400°F) and decompose water into explosive hydrogen.',
    airportExamples: [
      'Overheated aircraft landing gear magnesium-alloy wheel hubs and brake assemblies following high-speed rejected takeoffs (RTO)',
      'Titanium alloy fan and compressor blades in jet engine turbine casings',
      'Lithium metal battery cells and sodium chemical reagents in air cargo consignments',
      'Aircraft airframe structural components fabricated with lightweight aluminium-lithium alloys',
      'Runway maintenance thermite welding equipment for airfield ground lighting tracks'
    ],
    combustionMechanism: 'Metals burn at hyper-temperatures, stripping oxygen atoms from surrounding air, moisture, and even carbon dioxide. Molten burning metal generates blinding white light flares.',
    primaryAgents: ['CLASS_D_POWDER'],
    prohibitedAgents: ['WATER_APW', 'AFFF_FOAM', 'CO2', 'CLEAN_AGENT'],
    catastropheWarning: 'VIOLENT HYDROGEN EXPLOSION & BLINDING BLAST: Applying water, foam, or CO2 to burning magnesium or titanium splits the water molecule (2H2O + Mg -> Mg(OH)2 + H2), creating explosive hydrogen gas that detonates instantly with supersonic shockwaves and lethal white-hot metal shrapnel!',
    nfpaDescription: 'Fires in combustible metals, such as magnesium, titanium, zirconium, sodium, lithium, and potassium.',
    bsEn3Equivalent: 'Class D (Fires involving combustible metals such as magnesium, aluminium, lithium and sodium).'
  },

  K: {
    id: 'K',
    symbolName: 'Black Hexagon',
    shape: 'HEXAGON',
    colorHex: '#E11D48', // Crimson / Dark Rose
    badgeBg: 'bg-zinc-900',
    badgeBorder: 'border-rose-500/50',
    badgeText: 'text-rose-400',
    title: 'Class K (Class F in BS EN3): Cooking Media',
    subtitle: 'Commercial Galley & Food Court Deep-Fat Fryers',
    fuelDescription: 'High-temperature cooking oils, vegetable oils, and animal fats (triglycerides) maintained at or above auto-ignition temperatures (360°C / 680°F).',
    airportExamples: [
      'Terminal 1 & Terminal 2 international food court commercial deep-fat fryers',
      'In-flight catering production kitchen industrial tilting bratt pans and fryers',
      'Airport lounge buffet induction hotplates with cooking oil buildup',
      'VIP terminal private kitchen sauté ranges and deep fat fryers',
      'Air cargo crew cafeteria industrial grease extraction ducting'
    ],
    combustionMechanism: 'Sustained thermal mass in large volumes of boiling oil. Requires saponification — an alkaline chemical reaction converting fatty acids into an inert soap-like crust that cools and smothers.',
    primaryAgents: ['WET_CHEMICAL'],
    prohibitedAgents: ['WATER_APW', 'AFFF_FOAM', 'CO2', 'ABC_DRY_POWDER'],
    catastropheWarning: 'ERUPTIVE STEAM FIREBALL SPLATTER: Pouring water into boiling cooking oil causes water (denser than oil) to instantly boil into steam beneath the oil surface, shooting flaming 380°C oil droplets 5 meters across the kitchen in an eruptive fireball, causing catastrophic 3rd-degree burns!',
    nfpaDescription: 'Fires in cooking appliances that involve combustible cooking media (vegetable or animal oils and fats).',
    bsEn3Equivalent: 'Class F (Fires involving cooking media such as vegetable or animal oils and fats in deep fat fryers or industrial catering equipment).'
  }
};
