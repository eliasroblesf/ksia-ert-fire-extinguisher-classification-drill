import { SimulationScenario } from '../types/fireTraining';

/**
 * 10 Official Airport Office Environment Scenarios focused on:
 * - WATER_APW: Class A (Paper files, archive boxes, wooden desks, shredder waste, office furniture)
 * - CO2: Class C (Photocopiers, workstations, server racks, boardroom video displays, badging printers)
 * - ABC_DRY_POWDER: Class B (Office cleaning solvents, floor polishers, painting thinners, breakroom lubricants)
 */
export const SCENARIOS: SimulationScenario[] = [
  // 1. Class A - Water APW
  {
    id: 'scenario-1-office-shredder',
    title: 'Incident 01: Airport Administration HQ - Document Shredder & Archive Fire',
    airportZone: 'Airport Administration Building - 3rd Floor Executive Records Room',
    fireClass: 'A',
    fuelName: 'Shredded Confidential Papers, Cardboard Archive Boxes & Wooden Filing Units',
    incidentBriefing: 'During end-of-quarter record decommissioning in the airport executive suite, a continuous-duty paper shredder motor overheated and ignited its paper catch-bin. Dense smoldering embers have spread into stacked cardboard archive boxes and adjacent wooden filing cabinets. Acrid paper smoke is drifting into executive corridors.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Office HVAC Fresh-Air Vent (Low Draft)',
      temperatureC: 23,
      proximityHazards: 'Confidential paper archives floor-to-ceiling; wooden executive desks.'
    },
    recommendedExtinguisher: 'WATER_APW',
    acceptableExtinguishers: ['WATER_APW', 'ABC_DRY_POWDER'],
    catastrophicExtinguishers: [
      {
        type: 'CO2',
        eventTitle: 'INSUFFICIENT COOLING & SUDDEN RE-FLASH EXPLOSION',
        hazardDescription: 'The high-velocity discharge from the CO2 horn blasted burning shredded paper scraps into the air. The gas dissipated in 4 seconds without cooling the deep cellulosic embers, causing a violent flashover that ignited adjacent cardboard boxes!',
        animationType: 'BOILOVER'
      }
    ],
    initialFuel: 100,
    burnRate: 1.0,
    heatIntensity: 75,
    targetBaseY: 68,
    badgeUnlock: 'Office Safety Guardian'
  },

  // 2. Class C - CO2
  {
    id: 'scenario-2-photocopier-arcing',
    title: 'Incident 02: Airline Station Management Office - High-Speed Photocopier Arcing',
    airportZone: 'Administration Wing - Airline Station Operations Open-Plan Office',
    fireClass: 'C',
    fuelName: 'Energized 240V Multi-Function Photocopier, Corona Wire & Circuit Boards',
    incidentBriefing: 'A high-speed laser photocopier in the flight dispatch documentation bay suffered internal corona wire breakdown. Live 240V continuous electrical arcing has ignited plastic gear assemblies and wiring looms inside the printing mechanism with ozone and toxic plastic smoke filling the open-plan office.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Internal Office HVAC Recirculating Flow',
      temperatureC: 24,
      proximityHazards: 'Live electrical wall socket; 8 adjacent dispatch computer workstations.'
    },
    recommendedExtinguisher: 'CO2',
    acceptableExtinguishers: ['CO2'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'FATAL 240V HIGH-VOLTAGE ELECTROCUTION',
        hazardDescription: 'Applying a stream of water directly onto the energized 240V photocopier chassis created an instantaneous electrical circuit back into the responder’s body, causing severe electrical shock and cardiac arrest!',
        animationType: 'ELECTROCUTION'
      },
      {
        type: 'ABC_DRY_POWDER',
        eventTitle: 'CORROSIVE CONTAMINATION & TOTAL IT BLACKOUT',
        hazardDescription: 'Discharging chemical powder inside the open-plan office created an acidic cloud that settled into cooling fans of 8 adjacent workstations, permanently ruining flight planning computers!',
        animationType: 'ELECTROCUTION'
      }
    ],
    initialFuel: 100,
    burnRate: 1.1,
    heatIntensity: 78,
    targetBaseY: 65,
    badgeUnlock: 'IT Safety Master'
  },

  // 3. Class B - ABC Dry Powder
  {
    id: 'scenario-3-janitorial-solvent',
    title: 'Incident 03: Airport Office Facilities - Solvent Wax & Polish Spill Fire',
    airportZone: 'Airport Executive Offices - 2nd Floor Facilities & Janitorial Storage',
    fireClass: 'B',
    fuelName: '15 Liters High-Gloss Floor Stripper, Petroleum Solvent & Mineral Spirits',
    incidentBriefing: 'While preparing to polish the administrative boardroom parquet floors, a maintenance worker dropped a container of petroleum-based floor stripper next to a hot halogen work light. The volatile solvent puddle ignited instantly, with flames spreading across 4 square meters toward chemical storage shelves.',
    ambientConditions: {
      windSpeedKnots: 2,
      windDirection: 'Utility Exhaust Grille (Draft East)',
      temperatureC: 26,
      proximityHazards: 'Aerosol disinfectant cans on shelving; wooden janitorial supply closets.'
    },
    recommendedExtinguisher: 'ABC_DRY_POWDER',
    acceptableExtinguishers: ['ABC_DRY_POWDER'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'CATASTROPHIC VIOLENT BOILOVER EXPLOSION',
        hazardDescription: 'Water discharged onto burning solvent sank beneath the petroleum puddle and flashed into steam, blasting a 5-meter wave of flaming liquid through the office doorway into the main corridor!',
        animationType: 'BOILOVER'
      },
      {
        type: 'CO2',
        eventTitle: 'LIQUID SOLVENT SPLATTER & RAPID RE-IGNITION',
        hazardDescription: 'High-pressure CO2 gas blasted liquid solvent across the janitorial storage floor, failing to maintain an inert blanket and splashing burning hydrocarbons onto the responder’s uniform!',
        animationType: 'BOILOVER'
      }
    ],
    initialFuel: 100,
    burnRate: 1.25,
    heatIntensity: 84,
    targetBaseY: 70,
    badgeUnlock: 'Facility Protector'
  },

  // 4. Class A - Water APW
  {
    id: 'scenario-4-office-cubicle-foam',
    title: 'Incident 04: Human Resources Office - Acoustic Partition & Chair Fire',
    airportZone: 'Airport Headquarters - HR & Recruitment Suite (Cubicle Sector 4)',
    fireClass: 'A',
    fuelName: 'Upholstered Ergonomic Desk Chairs, Polyurethane Foam & Fabric Partitions',
    incidentBriefing: 'An unauthorized personal ceramic space heater placed beneath an employee desk scorched the synthetic fabric backing of an ergonomic office chair. The dense polyurethane foam cushion is burning with glowing smoldering embers spreading into fabric-covered cubicle partition walls.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Office Ceiling Air Diffusers Active',
      temperatureC: 22,
      proximityHazards: 'Plastics and fabric cubicles in close density; employee workstations.'
    },
    recommendedExtinguisher: 'WATER_APW',
    acceptableExtinguishers: ['WATER_APW', 'ABC_DRY_POWDER'],
    catastrophicExtinguishers: [
      {
        type: 'CO2',
        eventTitle: 'INCOMPLETE SUPPRESSION & DEEP FOAM RE-IGNITION',
        hazardDescription: 'CO2 quenched surface flames but lacked the latent cooling to extinguish glowing embers deep within the dense polyurethane seat foam. Within 6 seconds, the chair erupted into flames again with toxic smoke!',
        animationType: 'BOILOVER'
      }
    ],
    initialFuel: 100,
    burnRate: 1.0,
    heatIntensity: 72,
    targetBaseY: 67,
    badgeUnlock: 'Cubicle Defender'
  },

  // 5. Class C - CO2
  {
    id: 'scenario-5-it-server-closet',
    title: 'Incident 05: Airport IT Network Office - Departmental Server Rack Arcing',
    airportZone: 'Airport Administration Complex - IT Operations Floor & Server Hub',
    fireClass: 'C',
    fuelName: 'Energized 240V Server Power Supplies, Patch Panels & Fiber Optic Trunks',
    incidentBriefing: 'A switching power supply short-circuited inside the airport departmental rack powering employee badge issuance and digital payroll processing. Continuous 240V arcing is torching internal wire looms and plastic circuit mounts directly underneath high-speed fiber transceivers.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Server Closet Dedicated Cleanroom Air Intake',
      temperatureC: 21,
      proximityHazards: 'Live electrical busways; $2.5M administrative network infrastructure.'
    },
    recommendedExtinguisher: 'CO2',
    acceptableExtinguishers: ['CO2'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'FATAL HIGH-VOLTAGE ELECTROCUTION & NETWORK SHUTDOWN',
        hazardDescription: 'The water stream contacted the live 240V server power distribution unit, conducting lethal electrical current straight into the operator and causing a massive explosion across the server room!',
        animationType: 'ELECTROCUTION'
      },
      {
        type: 'ABC_DRY_POWDER',
        eventTitle: 'IRREVERSIBLE CORROSION OF NETWORK INFRASTRUCTURE',
        hazardDescription: 'Dry powder melted into high-density fiber connectors and circuit motherboards, permanently destroying all network servers and halting administrative airport operations!',
        animationType: 'ELECTROCUTION'
      }
    ],
    initialFuel: 100,
    burnRate: 1.05,
    heatIntensity: 76,
    targetBaseY: 66,
    badgeUnlock: 'Data Network Savior'
  },

  // 6. Class B - ABC Dry Powder
  {
    id: 'scenario-6-office-renovation-paint',
    title: 'Incident 06: Office Remodeling Annex - Lacquer Thinner & Paint Spill',
    airportZone: 'Airport Admin Headquarters - Office Refurbishment & Workshop Room',
    fireClass: 'B',
    fuelName: 'Toluene Lacquer Thinner (10L), Oil-Based Enamel Paint & Solvent Rags',
    incidentBriefing: 'During weekend office wall repainting, a contractor’s heat gun tipped over into an open pan of lacquer thinner used for cleaning paint brushes. A sudden whoosh ignited the flammable vapor, turning the solvent pool into an intense chemical fire rolling across the concrete workshop floor.',
    ambientConditions: {
      windSpeedKnots: 1,
      windDirection: 'Floor Ventilation Draft',
      temperatureC: 27,
      proximityHazards: 'Stacked cardboard boxes; 6 sealed gallons of paint thinner nearby.'
    },
    recommendedExtinguisher: 'ABC_DRY_POWDER',
    acceptableExtinguishers: ['ABC_DRY_POWDER'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'VIOLENT HYDROCARBON FLASHOVER & LIQUID SPREAD',
        hazardDescription: 'Water poured into the burning thinner pool caused boiling solvent to float on the water surface and flood across 8 meters of hallway, igniting carpet tiles outside the office door!',
        animationType: 'BOILOVER'
      },
      {
        type: 'CO2',
        eventTitle: 'RAPID VAPOR RE-FLASH & CHEMICAL FLARE',
        hazardDescription: 'CO2 failed to blanket the hot solvent vapors. The instant gas pressure subsided, hot paint cans reignited volatile fumes with an explosive flash!',
        animationType: 'BOILOVER'
      }
    ],
    initialFuel: 100,
    burnRate: 1.3,
    heatIntensity: 85,
    targetBaseY: 70,
    badgeUnlock: 'Workshop Specialist'
  },

  // 7. Class C - CO2
  {
    id: 'scenario-7-boardroom-videowall',
    title: 'Incident 07: Executive Boardroom - 98-Inch Video Display Power Arcing',
    airportZone: 'Airport Director’s Suite - Main Executive Boardroom Conference Room',
    fireClass: 'C',
    fuelName: 'Energized 240V LED Video Wall Power Converters & Acrylic Facia',
    incidentBriefing: 'During a high-level airport emergency management briefing, the internal power inverter of the main 98-inch wall-mounted boardroom presentation display suffered catastrophic dielectric puncture. Severe electrical arcing is melting acoustic paneling behind the display with thick black toxic smoke entering the room.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Boardroom Quiet HVAC Zone',
      temperatureC: 22,
      proximityHazards: 'Hardwood boardroom table; live 240V in-wall conduit lines.'
    },
    recommendedExtinguisher: 'CO2',
    acceptableExtinguishers: ['CO2'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'FATAL 240V BOARDROOM ELECTROCUTION',
        hazardDescription: 'Spraying water onto the energized video wall power module sent 240V current through the stream into the firefighter, blowing out the floor breaker and shocking the operator!',
        animationType: 'ELECTROCUTION'
      },
      {
        type: 'ABC_DRY_POWDER',
        eventTitle: 'CORROSIVE RESIDUE & BOARDROOM ASSET LOSS',
        hazardDescription: 'Chemical powder discharge coated the executive conference suite with abrasive monoammonium phosphate, irreparably ruining executive audio/visual teleconference gear!',
        animationType: 'ELECTROCUTION'
      }
    ],
    initialFuel: 100,
    burnRate: 1.1,
    heatIntensity: 77,
    targetBaseY: 65,
    badgeUnlock: 'Boardroom Sentinel'
  },

  // 8. Class B - ABC Dry Powder
  {
    id: 'scenario-8-office-kitchenette-oil',
    title: 'Incident 08: Office Breakroom Pantry - Cooking Oil & Appliance Motor Fire',
    airportZone: 'Airport Flight Operations - Staff Kitchenette & Rest Lounge',
    fireClass: 'B',
    fuelName: 'Spilled Canola Cooking Oil on Portable Electric Burner & Lubricant Grease',
    incidentBriefing: 'An electric hotplate in the office pantry was accidentally left on next to a bottle of cooking oil and aerosol machinery lubricant spray. The bottle melted, spilling flammable cooking fat directly across the glowing red element. Flames are shooting up into wooden kitchen cabinets overhead.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Pantry Window Exhaust Draft',
      temperatureC: 28,
      proximityHazards: 'Wooden cabinetry; microwave and coffee machine power cords.'
    },
    recommendedExtinguisher: 'ABC_DRY_POWDER',
    acceptableExtinguishers: ['ABC_DRY_POWDER'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'CATASTROPHIC STEAM FIREBALL EXPLOSION',
        hazardDescription: 'Water thrown onto 300°C cooking oil flashed violently into steam beneath the oil surface, blasting flaming oil droplets across the breakroom and scorching the ceiling!',
        animationType: 'STEAM_SPLATTER'
      },
      {
        type: 'CO2',
        eventTitle: 'HOT OIL SPLATTER & FUME RE-IGNITION',
        hazardDescription: 'High-pressure CO2 blast splattered burning oil out of the pan onto adjacent kitchen curtains, failing to smother the deep thermal mass of the oil!',
        animationType: 'STEAM_SPLATTER'
      }
    ],
    initialFuel: 100,
    burnRate: 1.2,
    heatIntensity: 82,
    targetBaseY: 69,
    badgeUnlock: 'Breakroom Defender'
  },

  // 9. Class A - Water APW
  {
    id: 'scenario-9-finance-ledger-archives',
    title: 'Incident 09: Airport Finance & Payroll - Tax Records & Wooden Shelving',
    airportZone: 'Airport Financial Directorate - Accounting & Tax Archive Vault',
    fireClass: 'A',
    fuelName: 'Dense Bound Financial Ledgers, Manila Folders & Oak Bookcases',
    incidentBriefing: 'A halogen desk lamp fell over onto a stack of audit files and accounting ledgers in the airport finance records office. The fire has burrowed deeply into compressed paper stacks and is beginning to burn through solid oak archive shelving. Deep smoldering carbonaceous embers are giving off heavy smoke.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Archive Vault Static Atmosphere',
      temperatureC: 25,
      proximityHazards: '5,000 dense paper files; wooden archival storage racks.'
    },
    recommendedExtinguisher: 'WATER_APW',
    acceptableExtinguishers: ['WATER_APW', 'ABC_DRY_POWDER'],
    catastrophicExtinguishers: [
      {
        type: 'CO2',
        eventTitle: 'FAILURE TO COOL DEEP EMBERS & INSTANT RE-FLASH',
        hazardDescription: 'CO2 extinguished surface flame flickers but provided zero latent cooling. The core temperature within the bound ledgers remained at 420°C, and files burst back into flames within 8 seconds!',
        animationType: 'BOILOVER'
      }
    ],
    initialFuel: 100,
    burnRate: 1.0,
    heatIntensity: 74,
    targetBaseY: 67,
    badgeUnlock: 'Archive Preserver'
  },

  // 10. Class C - CO2
  {
    id: 'scenario-10-badging-station-printer',
    title: 'Incident 10: Aviation Security Badging Office - Thermal Card Encoder Arcing',
    airportZone: 'Airport Security Pass Issuance Office - Processing Counter Bay 2',
    fireClass: 'C',
    fuelName: 'Energized Thermal Hologram Badging Printer, Dual Displays & PC Workstation',
    incidentBriefing: 'A thermal transfer laminator inside the airport badging counter suffered a power relay short-circuit while printing biometric access badges. 240V arcing ignited internal plastic ribbons and electronic boards behind the counter with sparks leaping towards computer monitors.',
    ambientConditions: {
      windSpeedKnots: 0,
      windDirection: 'Security Office Positive Air Pressure',
      temperatureC: 23,
      proximityHazards: 'Airport employee biometric scanner; live 240V under-desk power strips.'
    },
    recommendedExtinguisher: 'CO2',
    acceptableExtinguishers: ['CO2'],
    catastrophicExtinguishers: [
      {
        type: 'WATER_APW',
        eventTitle: 'LETHAL HIGH-VOLTAGE BADGING COUNTER ELECTROCUTION',
        hazardDescription: 'Water discharged onto the live badging printer conducted 240V current straight through the stream, knocking down the badging officer with severe electrical shock!',
        animationType: 'ELECTROCUTION'
      },
      {
        type: 'ABC_DRY_POWDER',
        eventTitle: 'CORROSIVE DESTRUCTION OF BIOMETRIC BADGING ENCODERS',
        hazardDescription: 'Chemical powder baked into high-precision thermal printheads and biometric readers, permanently disabling the entire airport ID badging station!',
        animationType: 'ELECTROCUTION'
      }
    ],
    initialFuel: 100,
    burnRate: 1.1,
    heatIntensity: 79,
    targetBaseY: 66,
    badgeUnlock: 'Security Station Shield'
  }
];
