export interface AdaptiveQuestion {
  id: string;
  question: string;
  context: string;
  phase: number;
  alternatives: string[];
  reasoning: string;
  timing: "early" | "middle" | "late" | "anytime";
  userType?: "rational" | "emotional" | "spiritual" | "neutral";
}

export const adaptiveQuestions: AdaptiveQuestion[] = [
  {
    id: "self-observation-gentle",
    question: "O que mais te chamou atenção em você mesmo até aqui?",
    context: "Auto-observação sem pressupor mudança",
    phase: 2,
    alternatives: [
      "Mesmo que ainda esteja tudo fresco, algo em você já parece diferente?",
      "Qual parte de você está pedindo mais atenção agora?"
    ],
    reasoning: "Não pressupõe mudança, apenas convida à auto-observação leve",
    timing: "early"
  },
  
  {
    id: "growth-neutral",
    question: "Qual parte da sua vida parece que quer se fortalecer agora?",
    context: "Crescimento pessoal em linguagem neutra",
    phase: 2,
    alternatives: [
      "Qual parte da sua vida sente que merece mais atenção agora?",
      "O que em você está pedindo espaço pra crescer?"
    ],
    reasoning: "Traz ideia de crescimento com mais sutileza, acessível a perfis racionais",
    timing: "middle",
    userType: "rational"
  },

  {
    id: "transformation-gentle",
    question: "Mesmo que ainda esteja tudo fresco, algo em você já parece diferente?",
    context: "Mudança com delicadeza temporal",
    phase: 3,
    alternatives: [
      "Se sim, anota aqui. Se não, só respira — tudo tem seu tempo.",
      "Como você se sente em relação ao caminho que está percorrendo?"
    ],
    reasoning: "Cria espaço tanto pra quem já sentiu algo quanto pra quem ainda está processando",
    timing: "late"
  },

  {
    id: "symbolic-mirror",
    question: "Como você se olha? Como você se enxerga?",
    context: "Momento da selfie simbólica",
    phase: 2,
    alternatives: [
      "Tire uma selfie. Não pra postar. Não pra julgar. Apenas pra se ver.",
      "Que tal se olhar com presença?"
    ],
    reasoning: "Autopercepção consciente como espelho interno, não vaidade",
    timing: "middle"
  },

  {
    id: "self-recognition",
    question: "Você gostou do que viu?",
    context: "Pós-selfie simbólica",
    phase: 2,
    alternatives: [
      "Sim, estou me reconhecendo",
      "Ainda estou em busca", 
      "Não sei — e tudo bem"
    ],
    reasoning: "Validação sem julgamento, todas as respostas são acolhidas",
    timing: "middle"
  },

  {
    id: "future-intention",
    question: "O que você gostaria de cultivar daqui pra frente?",
    context: "Intenção futura sem pressão",
    phase: 3,
    alternatives: [
      "Que semente você gostaria de plantar agora?",
      "Qual é sua intenção para os próximos passos?"
    ],
    reasoning: "Foca no futuro de forma construtiva sem pressupor falhas atuais",
    timing: "late",
    userType: "spiritual"
  },

  {
    id: "progress-acknowledgment",
    question: "O que você reconhece em si mesmo que antes não via?",
    context: "Reconhecimento de progresso sutil",
    phase: 4,
    alternatives: [
      "Que fortaleza você descobriu em você?",
      "O que em você merece ser celebrado hoje?"
    ],
    reasoning: "Celebra descobertas internas sem comparação temporal direta",
    timing: "late"
  }
];

export const getQuestionsByPhase = (phase: number): AdaptiveQuestion[] => {
  return adaptiveQuestions.filter(q => q.phase === phase);
};

export const getQuestionsByUserType = (userType: string): AdaptiveQuestion[] => {
  return adaptiveQuestions.filter(q => !q.userType || q.userType === userType || q.userType === "neutral");
};

export const getQuestionsByTiming = (timing: string): AdaptiveQuestion[] => {
  return adaptiveQuestions.filter(q => q.timing === timing || q.timing === "anytime");
};

export const getAdaptiveQuestion = (phase: number, timing: string, userType?: string): AdaptiveQuestion | undefined => {
  const filtered = adaptiveQuestions.filter(q => 
    q.phase === phase && 
    (q.timing === timing || q.timing === "anytime") &&
    (!q.userType || !userType || q.userType === userType || q.userType === "neutral")
  );
  
  return filtered.length > 0 ? filtered[0] : undefined;
};