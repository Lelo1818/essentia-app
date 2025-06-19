export interface UserProfile {
  user: {
    id: number;
    name: string;
    email: string;
    level: number;
    experience: number;
    currentModule: string;
    createdAt: Date;
  };
  modules: JourneyModule[];
  achievements: Achievement[];
  progress: {
    currentLevel: number;
    experience: number;
    currentModule: string;
  };
}

export interface JourneyModule {
  id: number;
  userId: number;
  moduleType: string;
  isCompleted: boolean;
  progress: number;
  completedAt?: Date;
  createdAt: Date;
}

export interface DiaryEntry {
  id: number;
  userId: number;
  title: string;
  content: string;
  mood?: string;
  tags?: string[];
  isPrivate: boolean;
  createdAt: Date;
}

export interface PurposeMap {
  id: number;
  userId: number;
  values?: string[];
  passions?: string[];
  talents?: string[];
  mission?: string;
  vision?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Reflection {
  id: number;
  userId: number;
  moduleType: string;
  question: string;
  answer: string;
  insights?: string;
  createdAt: Date;
}

export interface Achievement {
  id: number;
  userId: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt: Date;
}

export interface InspirationContent {
  id: number;
  type: string;
  title: string;
  content: string;
  author?: string;
  category: string;
  isActive: boolean;
}

export const JOURNEY_MODULES = [
  {
    key: "despertar",
    name: "Despertar",
    description: "Reconecte-se com sua essência interior",
    icon: "sunrise",
    color: "orange"
  },
  {
    key: "descoberta",
    name: "Descoberta",
    description: "Explore seus valores, paixões e talentos",
    icon: "compass",
    color: "blue"
  },
  {
    key: "decisao",
    name: "Decisão",
    description: "Defina sua missão e visão de vida",
    icon: "target",
    color: "green"
  },
  {
    key: "direcao",
    name: "Direção",
    description: "Crie seu plano de ação autêntico",
    icon: "map",
    color: "purple"
  }
];

export const MOOD_OPTIONS = [
  { value: "peaceful", label: "Tranquilo", emoji: "🌅" },
  { value: "inspired", label: "Inspirado", emoji: "✨" },
  { value: "confused", label: "Confuso", emoji: "🤔" },
  { value: "excited", label: "Empolgado", emoji: "🔥" },
  { value: "reflective", label: "Reflexivo", emoji: "🧘" },
  { value: "grateful", label: "Grato", emoji: "🙏" },
  { value: "uncertain", label: "Incerto", emoji: "❓" },
  { value: "hopeful", label: "Esperançoso", emoji: "🌟" }
];

export const TAG_SUGGESTIONS = [
  "valores",
  "paixões", 
  "talentos",
  "sonhos",
  "medos",
  "propósito",
  "família",
  "carreira",
  "espiritualidade",
  "relacionamentos",
  "saúde",
  "crescimento",
  "gratidão",
  "desafios"
];