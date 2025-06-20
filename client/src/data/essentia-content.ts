export interface EssentiaWindow {
  id: string;
  phrase: string;
  sound: "wind" | "leaves" | "fire" | "water" | "silence";
  image: "path" | "sky" | "seed" | "mountain" | "forest";
  duration: number; // in seconds
  trigger: "study_start" | "study_break" | "study_end" | "reflection" | "transition";
}

export interface GuidedBreathing {
  id: string;
  name: string;
  description: string;
  instruction: string;
  cycles: number;
  inhale: number;
  hold: number;
  exhale: number;
  symbol: string;
  purpose: "clarity" | "focus" | "presence";
}

export interface DailyRitual {
  id: string;
  type: "opening" | "closing";
  title: string;
  prompt: string;
  options?: string[];
  isWriteable: boolean;
}

export const essentiaWindows: EssentiaWindow[] = [
  {
    id: "morning-clarity",
    phrase: "Cada novo aprendizado é um despertar.",
    sound: "wind",
    image: "sky",
    duration: 5,
    trigger: "study_start"
  },
  {
    id: "focus-breath",
    phrase: "Respire. Você está exatamente onde precisa estar.",
    sound: "leaves",
    image: "forest",
    duration: 3,
    trigger: "study_break"
  },
  {
    id: "integration-moment",
    phrase: "O conhecimento se torna sabedoria quando toca o coração.",
    sound: "water",
    image: "path",
    duration: 4,
    trigger: "study_end"
  },
  {
    id: "reflection-space",
    phrase: "Não é sobre saber tudo. É sobre ser verdadeiro.",
    sound: "fire",
    image: "seed",
    duration: 6,
    trigger: "reflection"
  },
  {
    id: "transition-wisdom",
    phrase: "Cada fim é um novo começo disfarçado.",
    sound: "silence",
    image: "mountain",
    duration: 4,
    trigger: "transition"
  }
];

export const guidedBreathings: GuidedBreathing[] = [
  {
    id: "clarity-breath",
    name: "Respiração da Clareza",
    description: "Para momentos em que você precisa de visão cristalina",
    instruction: "Inspire pela narina direita. Segure. Expire pela narina esquerda. Deixe a clareza fluir.",
    cycles: 4,
    inhale: 4,
    hold: 2,
    exhale: 6,
    symbol: "💎",
    purpose: "clarity"
  },
  {
    id: "focus-breath",
    name: "Sopro do Foco Vivo",
    description: "Para alinhar mente e intenção antes do estudo",
    instruction: "Respire como se estivesse acendendo uma chama interior. Cada inspiração alimenta sua concentração.",
    cycles: 3,
    inhale: 3,
    hold: 3,
    exhale: 3,
    symbol: "🔥",
    purpose: "focus"
  },
  {
    id: "presence-breath",
    name: "Âncora do Agora",
    description: "Para se conectar completamente com o momento presente",
    instruction: "Respire como se fosse a primeira vez. Cada ciclo te traz mais para o agora.",
    cycles: 5,
    inhale: 5,
    hold: 1,
    exhale: 5,
    symbol: "⚓",
    purpose: "presence"
  }
];

export const dailyRituals: DailyRitual[] = [
  {
    id: "intention-setting",
    type: "opening",
    title: "Escolha Sua Intenção",
    prompt: "Antes de começar, qual é sua intenção para este momento de aprendizado?",
    options: [
      "Crescer com curiosidade",
      "Aplicar o que aprendo",
      "Expandir minha visão",
      "Conectar conhecimento e vida"
    ],
    isWriteable: true
  },
  {
    id: "integration-reflection",
    type: "closing",
    title: "O Que Você Leva Com Você?",
    prompt: "Ao encerrar esta sessão, o que mais tocou seu coração ou mente?",
    isWriteable: true
  },
  {
    id: "gratitude-moment",
    type: "closing",
    title: "Espaço da Gratidão",
    prompt: "Por que você é grato neste momento?",
    isWriteable: true
  }
];

export const symbolicNotifications = [
  "Você não está só. O caminho do conhecimento é uma jornada compartilhada.",
  "Errar é ensaio. Aprender é viver.",
  "Uma semente por dia muda uma floresta.",
  "O verdadeiro aprendizado acontece quando você conecta o novo com quem você é.",
  "Cada pergunta é mais valiosa que mil respostas prontas.",
  "Você está estudando... mas quem você está se tornando?",
  "O conhecimento sem presença é apenas informação. Com presença, vira transformação."
];

export const microNarrations = [
  {
    id: "study-becoming",
    text: "Você está estudando... mas quem você está se tornando?",
    context: "mid_study",
    tone: "reflective"
  },
  {
    id: "error-learning",
    text: "Cada erro é um professor disfarçado. O que ele quer te ensinar?",
    context: "after_mistake",
    tone: "encouraging"
  },
  {
    id: "knowledge-wisdom",
    text: "Conhecimento informa. Sabedoria transforma. Qual dos dois você está buscando?",
    context: "deep_learning",
    tone: "thoughtful"
  }
];

export const inspirationCards = [
  {
    id: "seed-forest",
    phrase: "Uma semente por dia muda uma floresta",
    visual: "seed-growing-animation",
    soundTrack: "gentle-piano"
  },
  {
    id: "journey-destination",
    phrase: "O caminho ensina mais que o destino",
    visual: "path-through-mountains",
    soundTrack: "nature-sounds"
  },
  {
    id: "question-answer",
    phrase: "A pergunta certa vale mais que mil respostas prontas",
    visual: "question-mark-blooming",
    soundTrack: "contemplative-melody"
  }
];

export const getEssentiaWindow = (trigger: EssentiaWindow["trigger"]): EssentiaWindow | undefined => {
  const windows = essentiaWindows.filter(w => w.trigger === trigger);
  return windows[Math.floor(Math.random() * windows.length)];
};

export const getRandomNotification = (): string => {
  return symbolicNotifications[Math.floor(Math.random() * symbolicNotifications.length)];
};

export const getBreathingByPurpose = (purpose: GuidedBreathing["purpose"]): GuidedBreathing | undefined => {
  return guidedBreathings.find(b => b.purpose === purpose);
};