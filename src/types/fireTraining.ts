export type FireClass = 'A' | 'B' | 'C' | 'D' | 'K';

export type ExtinguisherType =
  | 'WATER_APW'
  | 'AFFF_FOAM'
  | 'CO2'
  | 'ABC_DRY_POWDER'
  | 'BC_PURPLE_K'
  | 'CLASS_D_POWDER'
  | 'WET_CHEMICAL'
  | 'CLEAN_AGENT';

export interface FireClassInfo {
  id: FireClass;
  symbolName: string;
  shape: 'TRIANGLE' | 'SQUARE' | 'CIRCLE' | 'STAR' | 'HEXAGON';
  colorHex: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  title: string;
  subtitle: string;
  fuelDescription: string;
  airportExamples: string[];
  combustionMechanism: string;
  primaryAgents: ExtinguisherType[];
  prohibitedAgents: ExtinguisherType[];
  catastropheWarning: string;
  nfpaDescription: string;
  bsEn3Equivalent: string;
}

export interface ExtinguisherInfo {
  id: ExtinguisherType;
  name: string;
  agentLabel: string;
  colorBand: string; // NFPA & BS EN3 visual color band
  colorBandName: string;
  suitableClasses: FireClass[];
  conditionallyAllowedClasses?: FireClass[];
  prohibitedClasses: FireClass[];
  dischargeDurationSec: number; // In seconds
  effectiveRangeMeters: string; // e.g. "9-12m (30-40ft)" or "1-2.5m"
  operatingPressure: string;
  nozzleType: string;
  chemicalPrinciple: string;
  airportSuitability: string;
  tacticalAdvantages: string[];
  criticalLimitations: string[];
  passTechniqueNote: string;
  catastrophes: Partial<Record<FireClass, string>>;
}

export interface SimulationScenario {
  id: string;
  title: string;
  airportZone: string;
  fireClass: FireClass;
  fuelName: string;
  incidentBriefing: string;
  ambientConditions: {
    windSpeedKnots: number;
    windDirection: string;
    temperatureC: number;
    proximityHazards: string;
  };
  recommendedExtinguisher: ExtinguisherType;
  acceptableExtinguishers: ExtinguisherType[];
  catastrophicExtinguishers: {
    type: ExtinguisherType;
    eventTitle: string;
    hazardDescription: string;
    animationType: 'BOILOVER' | 'ELECTROCUTION' | 'STEAM_SPLATTER' | 'METAL_BLAST';
  }[];
  initialFuel: number; // 100%
  burnRate: number; // speed fuel consumes
  heatIntensity: number; // 0 - 100
  targetBaseY: number; // position on canvas
  badgeUnlock?: string;
}

export interface RapidQuestion {
  id: number;
  situation: string;
  airportFacility: string;
  fuelItem: string;
  correctClass: FireClass;
  correctExtinguisher: ExtinguisherType;
  alternativeExtinguisher?: ExtinguisherType;
  distractorClasses: FireClass[];
  distractorExtinguishers: ExtinguisherType[];
  tacticalTip: string;
}

export interface CadetProfile {
  name: string;
  badgeId: string;
  division: string;
  assessorName: string;
  certificationDate: string;
}

export interface CadetStats {
  firesExtinguished: number;
  catastrophesTriggered: number;
  passRoundsCompleted: number;
  blitzHighScore: number;
  blitzStreakRecord: number;
  missionsCompleted: string[];
  badges: string[];
  classProficiency: Record<FireClass, { attempts: number; correct: number }>;
}
