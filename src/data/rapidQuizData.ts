import { RapidQuestion } from '../types/fireTraining';

export const RAPID_QUESTIONS: RapidQuestion[] = [
  {
    id: 1,
    situation: 'Jet A-1 aviation kerosene fuel spilled on concrete apron stand and ignited by ground power unit spark.',
    airportFacility: 'Aircraft Apron Stand 12',
    fuelItem: 'Aviation Kerosene (Jet A-1)',
    correctClass: 'B',
    correctExtinguisher: 'AFFF_FOAM',
    alternativeExtinguisher: 'BC_PURPLE_K',
    distractorClasses: ['A', 'C', 'D'],
    distractorExtinguishers: ['WATER_APW', 'CLASS_D_POWDER', 'WET_CHEMICAL'],
    tacticalTip: 'Jet A-1 is a Class B hydrocarbon liquid. Never use water (triggers boilover explosion). AFFF Foam creates an airtight blanket.'
  },
  {
    id: 2,
    situation: 'Overheated deep fat fryer vat in terminal food court kitchen with flames shooting up into extraction hood.',
    airportFacility: 'Terminal 1 Food Court Kitchen',
    fuelItem: 'Boiling Vegetable Cooking Oil (380°C)',
    correctClass: 'K',
    correctExtinguisher: 'WET_CHEMICAL',
    distractorClasses: ['B', 'A', 'C'],
    distractorExtinguishers: ['WATER_APW', 'CO2', 'ABC_DRY_POWDER'],
    tacticalTip: 'Class K (Class F in BS EN3) requires Wet Chemical. The potassium salts react with fat to create a thick soapy blanket (saponification).'
  },
  {
    id: 3,
    situation: 'Air Traffic Control radar power supply unit with 415V electrical arcing and burning cable insulation.',
    airportFacility: 'ATC Radar Operations Room',
    fuelItem: 'Live Electrical Power Distribution Board',
    correctClass: 'C',
    correctExtinguisher: 'CLEAN_AGENT',
    alternativeExtinguisher: 'CO2',
    distractorClasses: ['A', 'B', 'D'],
    distractorExtinguishers: ['WATER_APW', 'AFFF_FOAM', 'CLASS_D_POWDER'],
    tacticalTip: 'Class C involves live electricity. Clean Agent (Halotron) or CO2 is non-conductive and leaves zero corrosive residue on avionics.'
  },
  {
    id: 4,
    situation: 'Heavy landing aircraft brake assembly glowing white-hot with burning magnesium wheel hub at 2,200°C.',
    airportFacility: 'Runway Rapid Exit Taxiway Charlie',
    fuelItem: 'Magnesium-Alloy Wheel Hub',
    correctClass: 'D',
    correctExtinguisher: 'CLASS_D_POWDER',
    distractorClasses: ['A', 'B', 'C'],
    distractorExtinguishers: ['WATER_APW', 'CO2', 'AFFF_FOAM'],
    tacticalTip: 'Class D combustible metals react violently with water, foam, or CO2 to form explosive hydrogen gas! Only use Class D Dry Powder.'
  },
  {
    id: 5,
    situation: 'Piles of empty cardboard packing boxes and wooden cargo pallets smoldering near cargo bay door.',
    airportFacility: 'Air Cargo Logistics Warehouse 4',
    fuelItem: 'Cardboard Cartons & Timber Pallets',
    correctClass: 'A',
    correctExtinguisher: 'WATER_APW',
    alternativeExtinguisher: 'ABC_DRY_POWDER',
    distractorClasses: ['B', 'C', 'K'],
    distractorExtinguishers: ['CO2', 'CLASS_D_POWDER', 'BC_PURPLE_K'],
    tacticalTip: 'Class A ordinary combustibles require deep cooling. Water (APW) quenches burning embers and penetrates deep into paper and wood fibers.'
  },
  {
    id: 6,
    situation: 'Hydraulic Skydrol fluid line burst under 3,000 psi onto hot aircraft brake assembly during taxiing.',
    airportFacility: 'Taxiway Alpha Holding Point',
    fuelItem: 'Aviation Hydraulic Fluid (Phosphate Ester)',
    correctClass: 'B',
    correctExtinguisher: 'AFFF_FOAM',
    alternativeExtinguisher: 'BC_PURPLE_K',
    distractorClasses: ['A', 'D', 'K'],
    distractorExtinguishers: ['WATER_APW', 'CLASS_D_POWDER', 'WET_CHEMICAL'],
    tacticalTip: 'Aviation hydraulic fluids are Class B combustible liquids. Foam or Purple-K dry chemical blankets the vapor layer rapidly.'
  },
  {
    id: 7,
    situation: 'Duty-free shop upholstered chair and nylon display banners set ablaze by discarded cigarette.',
    airportFacility: 'Concourse B Departure Lounge',
    fuelItem: 'Synthetic Upholstery & Nylon Banners',
    correctClass: 'A',
    correctExtinguisher: 'WATER_APW',
    alternativeExtinguisher: 'ABC_DRY_POWDER',
    distractorClasses: ['C', 'B', 'K'],
    distractorExtinguishers: ['CO2', 'CLASS_D_POWDER', 'WET_CHEMICAL'],
    tacticalTip: 'Class A synthetic fabrics require thermal cooling. Water provides superior heat absorption and stops deep smoldering.'
  },
  {
    id: 8,
    situation: 'Baggage sorting conveyor 3-phase induction motor seized, drawing locked-rotor current and arcing.',
    airportFacility: 'Terminal Basement Baggage Sorting Vault',
    fuelItem: '415V Electric Motor Stator Coils',
    correctClass: 'C',
    correctExtinguisher: 'CO2',
    alternativeExtinguisher: 'ABC_DRY_POWDER',
    distractorClasses: ['A', 'B', 'D'],
    distractorExtinguishers: ['WATER_APW', 'AFFF_FOAM', 'WET_CHEMICAL'],
    tacticalTip: 'Class C energized electrical equipment. CO2 or Clean Agent does not conduct electricity and suppresses flames quickly.'
  },
  {
    id: 9,
    situation: 'Titanium compressor disc in disassembled jet engine caught fire during abrasive grinding maintenance.',
    airportFacility: 'Aircraft Engine Maintenance Hangar 2',
    fuelItem: 'Titanium Metal Shavings & Rotor Disc',
    correctClass: 'D',
    correctExtinguisher: 'CLASS_D_POWDER',
    distractorClasses: ['B', 'C', 'K'],
    distractorExtinguishers: ['WATER_APW', 'CO2', 'AFFF_FOAM'],
    tacticalTip: 'Titanium is a Class D combustible metal that burns at intense temperatures. Class D Dry Powder (Met-L-X/Copper) smothers it gently.'
  },
  {
    id: 10,
    situation: 'VIP lounge commercial espresso machine shorted out with sparks igniting internal plastic panels.',
    airportFacility: 'First Class Lounge Bar',
    fuelItem: 'Live Electrical Espresso Machine',
    correctClass: 'C',
    correctExtinguisher: 'CO2',
    alternativeExtinguisher: 'CLEAN_AGENT',
    distractorClasses: ['A', 'B', 'K'],
    distractorExtinguishers: ['WATER_APW', 'AFFF_FOAM', 'CLASS_D_POWDER'],
    tacticalTip: 'Energized electrical appliance = Class C. Using water could electrocute the responder; CO2 leaves no residue on food equipment.'
  },
  {
    id: 11,
    situation: 'Aviation diesel fuel leaking from ground baggage tug fuel tank ignited by exhaust manifold.',
    airportFacility: 'Ramp Service Equipment Lane',
    fuelItem: 'Automotive Diesel Fuel',
    correctClass: 'B',
    correctExtinguisher: 'AFFF_FOAM',
    alternativeExtinguisher: 'ABC_DRY_POWDER',
    distractorClasses: ['A', 'C', 'D'],
    distractorExtinguishers: ['WATER_APW', 'CLASS_D_POWDER', 'WET_CHEMICAL'],
    tacticalTip: 'Diesel fuel is a Class B hydrocarbon. AFFF Foam blankets the pool and prevents toxic vapor evaporation.'
  },
  {
    id: 12,
    situation: 'Galley tilt-skillet filled with beef tallow and butter fat flash-ignited during breakfast prep.',
    airportFacility: 'In-Flight Catering Production Facility',
    fuelItem: 'Animal Fat / Cooking Tallow',
    correctClass: 'K',
    correctExtinguisher: 'WET_CHEMICAL',
    distractorClasses: ['B', 'A', 'C'],
    distractorExtinguishers: ['WATER_APW', 'CO2', 'ABC_DRY_POWDER'],
    tacticalTip: 'High-temperature animal fats are Class K (BS EN3 Class F). Wet chemical mist saponifies the tallow into a heat-sealing soap crust.'
  }
];
