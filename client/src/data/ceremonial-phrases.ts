export interface CeremonialPhrase {
  id: string;
  text: string;
  context: "opening" | "closing" | "transition" | "reflection";
  rating: number; // 1-10 scale
  variation?: string;
  usage: "ritual" | "meditation" | "gratitude" | "learning" | "purpose" | "balance";
}

export const ceremonialPhrases: CeremonialPhrase[] = [
  // Closing Phrases - Frases de Encerramento
  {
    id: "take-only-what-matters",
    text: "Levo comigo só o que importa.",
    context: "closing",
    rating: 8,
    variation: "Levo só o essencial.",
    usage: "ritual"
  },
  {
    id: "small-gesture-big-impact",
    text: "O gesto foi pequeno. O impacto, não.",
    context: "closing",
    rating: 9,
    variation: "Um pequeno gesto, um grande impacto.",
    usage: "reflection"
  },
  {
    id: "return-different",
    text: "Volto diferente.",
    context: "closing",
    rating: 7,
    variation: "Retorno renovado.",
    usage: "ritual"
  },
  {
    id: "planted-seed",
    text: "Plantei uma semente. Agora, deixo florescer.",
    context: "closing",
    rating: 9,
    variation: "A semente está plantada. O futuro florescerá.",
    usage: "purpose"
  },
  {
    id: "light-and-present",
    text: "Sigo leve. Presente.",
    context: "closing",
    rating: 9,
    variation: "Leve e presente, sigo.",
    usage: "meditation"
  },
  {
    id: "grateful-and-moving",
    text: "Agradeço e sigo.",
    context: "closing",
    rating: 7,
    variation: "Com gratidão, sigo adiante.",
    usage: "gratitude"
  },
  {
    id: "journey-continues",
    text: "A jornada continua.",
    context: "closing",
    rating: 8,
    variation: "A vida segue, e eu também.",
    usage: "transition"
  },
  {
    id: "close-eyes-open-space",
    text: "Fecho os olhos. Abro espaço.",
    context: "closing",
    rating: 9,
    variation: "Respiro fundo. Faço espaço.",
    usage: "meditation"
  },
  {
    id: "essence-remains",
    text: "A essência fica.",
    context: "closing",
    rating: 8,
    usage: "learning"
  },
  {
    id: "learning-is-mine",
    text: "O aprendizado é meu.",
    context: "closing",
    rating: 8,
    usage: "learning"
  },
  {
    id: "with-intention-proceed",
    text: "Com esta intenção, prossigo.",
    context: "closing",
    rating: 8,
    usage: "purpose"
  },
  {
    id: "energy-flows",
    text: "A energia flui.",
    context: "closing",
    rating: 8,
    usage: "balance"
  },
  {
    id: "done-sealed-moving",
    text: "Feito. Selado. A caminho.",
    context: "closing",
    rating: 9,
    usage: "ritual"
  },
  {
    id: "quiet-mind-strengthen-spirit",
    text: "Aquieto a mente. Fortaleço o espírito.",
    context: "closing",
    rating: 9,
    usage: "meditation"
  },
  {
    id: "each-step-new-self",
    text: "Cada passo, um novo eu.",
    context: "closing",
    rating: 8,
    usage: "purpose"
  },

  // Opening Phrases - Frases de Abertura
  {
    id: "transition-not-fall",
    text: "Transição não é queda. É renascimento.",
    context: "opening",
    rating: 9,
    usage: "ritual"
  },
  {
    id: "world-taught-speed",
    text: "O mundo te ensinou a responder rápido, agir, correr. Mas o despertar não grita - ele sussurra.",
    context: "opening",
    rating: 9,
    usage: "meditation"
  },
  {
    id: "no-purpose-without-mirror",
    text: "Não há propósito sem espelho. Olhar para si não é vaidade - é coragem.",
    context: "opening",
    rating: 9,
    usage: "reflection"
  },
  {
    id: "you-felt-it",
    text: "Você sentiu. Não sabe explicar, mas pulsa aí dentro.",
    context: "opening",
    rating: 9,
    usage: "purpose"
  },
  {
    id: "not-a-machine",
    text: "Você não é uma máquina. E mesmo que fosse, até as máquinas precisam de pausa.",
    context: "opening",
    rating: 8,
    usage: "balance"
  },
  {
    id: "nature-in-human-form",
    text: "Você é natureza em forma de gente.",
    context: "opening",
    rating: 9,
    usage: "reflection"
  },
  {
    id: "alone-awaken-together-flourish",
    text: "Sozinho, você desperta. Mas junto... você floresce.",
    context: "opening",
    rating: 9,
    usage: "gratitude"
  },

  // Transition Phrases
  {
    id: "back-to-myself-now",
    text: "Volto pra mim, agora.",
    context: "transition",
    rating: 9,
    usage: "meditation"
  },
  {
    id: "water-cleanses-renews",
    text: "Água que limpa, renova e prepara.",
    context: "transition",
    rating: 8,
    usage: "ritual"
  },
  {
    id: "fire-burns-warms",
    text: "O fogo queima o que não serve mais e aquece o que ainda vive.",
    context: "transition",
    rating: 9,
    usage: "ritual"
  }
];

export const getPhrasesbyContext = (context: string): CeremonialPhrase[] => {
  return ceremonialPhrases.filter(phrase => phrase.context === context);
};

export const getPhrasesByUsage = (usage: string): CeremonialPhrase[] => {
  return ceremonialPhrases.filter(phrase => phrase.usage === usage);
};

export const getTopRatedPhrases = (minRating: number = 8): CeremonialPhrase[] => {
  return ceremonialPhrases.filter(phrase => phrase.rating >= minRating);
};

export const getRandomPhrase = (context?: string): CeremonialPhrase => {
  const filtered = context ? getPhrasesbyContext(context) : ceremonialPhrases;
  return filtered[Math.floor(Math.random() * filtered.length)];
};