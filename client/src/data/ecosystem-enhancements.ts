export interface EcosystemEnhancement {
  app: "flow" | "edu" | "essentia";
  category: "ai" | "biometric" | "social" | "gamification" | "content";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  implementation: "immediate" | "short_term" | "long_term";
  inspiration?: string;
}

export const ecosystemEnhancements: EcosystemEnhancement[] = [
  // FLOW Enhancements
  {
    app: "flow",
    category: "ai",
    title: "IA de Padrões Financeiros",
    description: "Analisa comportamentos e sugere micro-mudanças baseadas na personalidade financeira do usuário. Ex: 'Você gasta mais quando está estressado. Que tal uma pausa de 5 minutos antes de compras online?'",
    impact: "high",
    implementation: "short_term"
  },
  {
    app: "flow",
    category: "biometric",
    title: "Monitor de Stress Financeiro",
    description: "Integração com smartwatch para detectar ansiedade durante gastos. Dispara respiração guiada quando detecta stress financeiro.",
    impact: "high",
    implementation: "long_term"
  },
  {
    app: "flow",
    category: "social",
    title: "Círculos de Abundância",
    description: "Grupos de 6-8 pessoas com objetivos financeiros similares. Partilham conquistas, desafios e celebram marcos juntos.",
    impact: "medium",
    implementation: "short_term"
  },
  {
    app: "flow",
    category: "gamification",
    title: "Árvore da Prosperidade",
    description: "Cada meta alcançada faz a árvore crescer. Decisões financeiras conscientes geram 'frutos' que podem ser compartilhados com a comunidade.",
    impact: "medium",
    implementation: "immediate"
  },

  // EDU Enhancements
  {
    app: "edu",
    category: "ai",
    title: "IA Curadora Personalizada",
    description: "Aprende com as interações e cria trilhas únicas. Ex: 'Percebi que você aprende melhor com exemplos práticos. Preparei um módulo hands-on sobre o que você estudou.'",
    impact: "high",
    implementation: "short_term"
  },
  {
    app: "edu",
    category: "biometric",
    title: "Detector de Fadiga Mental",
    description: "Monitora sinais de cansaço cognitivo e sugere pausa ou mudança de formato (vídeo para áudio, texto para interativo).",
    impact: "high",
    implementation: "long_term"
  },
  {
    app: "edu",
    category: "content",
    title: "Sínteses Cinematográficas",
    description: "Resume livros/cursos em vídeos de 3-5min com trilha sonora emocional e animações simbólicas. Como mini-filmes do conhecimento.",
    impact: "high",
    implementation: "short_term",
    inspiration: "Baseado na sua ideia dos vídeos resumo"
  },
  {
    app: "edu",
    category: "social",
    title: "Mentorias Cruzadas",
    description: "Estudantes se tornam mentores em áreas que dominam e aprendizes em outras. Ciclos de 30 dias de troca de conhecimento.",
    impact: "medium",
    implementation: "short_term"
  },
  {
    app: "edu",
    category: "gamification",
    title: "Jardim do Conhecimento",
    description: "Cada aprendizado planta uma semente. Diferentes tipos de conhecimento geram diferentes plantas. O jardim fica mais rico e belo conforme aprende.",
    impact: "medium",
    implementation: "immediate"
  },

  // ESSENTIA Enhancements
  {
    app: "essentia",
    category: "ai",
    title: "IA Empática Adaptativa",
    description: "Reconhece o estado emocional pela voz/texto e ajusta linguagem e práticas. Ex: detecta tristeza e oferece práticas de acolhimento em vez de desafio.",
    impact: "high",
    implementation: "long_term"
  },
  {
    app: "essentia",
    category: "biometric",
    title: "Sincronização Circadiana",
    description: "Integra com dados de sono e luz natural para sugerir práticas alinhadas com ritmos biológicos. Meditação matinal quando cortisol está alto.",
    impact: "high",
    implementation: "long_term"
  },
  {
    app: "essentia",
    category: "content",
    title: "Biblioteca de Arquétipos Pessoais",
    description: "Identifica arquétipos da personalidade (criador, cuidador, explorador) e oferece práticas específicas para cada perfil.",
    impact: "high",
    implementation: "short_term"
  },
  {
    app: "essentia",
    category: "social",
    title: "Círculos de Propósito",
    description: "Grupos pequenos (4-6 pessoas) que se encontram virtualmente para rituais coletivos e partilha autêntica. Moderação por IA empática.",
    impact: "high",
    implementation: "short_term"
  },
  {
    app: "essentia",
    category: "ai",
    title: "Conselheiro de Sombra",
    description: "IA especializada em identificar padrões autossabotagem e oferecer práticas de integração. Não julga, apenas observa e sugere com suavidade.",
    impact: "high",
    implementation: "long_term"
  },
  {
    app: "essentia",
    category: "content",
    title: "Rituais Sazonais Adaptativos",
    description: "Conecta práticas com ciclos naturais, estações e fases lunares. Oferece rituais diferentes para cada momento do ano/mês.",
    impact: "medium",
    implementation: "immediate"
  },
  {
    app: "essentia",
    category: "biometric",
    title: "Avatar Biométrico 3D",
    description: "Avatar que reflete estado físico e emocional em tempo real. Cor, postura e movimento mudam baseados em dados de saúde e humor.",
    impact: "high",
    implementation: "long_term",
    inspiration: "Evolução da sua ideia do avatar 3D"
  },
  {
    app: "essentia",
    category: "content",
    title: "Oráculo Pessoal",
    description: "Sistema que combina reflexões passadas do usuário com sabedoria universal para gerar insights personalizados. Como ter um oráculo interno.",
    impact: "high",
    implementation: "short_term"
  }
];

export const getEnhancementsByApp = (app: string) => {
  return ecosystemEnhancements.filter(e => e.app === app);
};

export const getHighImpactEnhancements = () => {
  return ecosystemEnhancements.filter(e => e.impact === "high");
};

export const getImmediateImplementations = () => {
  return ecosystemEnhancements.filter(e => e.implementation === "immediate");
};