export interface User {
  id: string;
  name: string;
  clarity: number;
  daysActive: number;
  currentStage: string;
  achievements: number;
}

export interface JourneyStage {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Portal {
  id: string;
  name: string;
  icon: any;
  color: string;
  phrase: string;
  practice: string;
  unlocked: boolean;
  completed?: boolean;
  isSpecial?: boolean;
  scenes?: PortalScene[];
}

export interface PortalScene {
  id: number;
  title: string;
  description: string;
  audio: string;
  duration: number;
}

export interface AIPersonality {
  id: string;
  name: string;
  focus: string;
  color: string;
  phrase: string;
  specialty: string;
}

export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  pattern: number[];
  purpose: string;
}

export interface Environment {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
}