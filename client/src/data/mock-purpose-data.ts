export const mockPurposeData = {
  activeJourneys: 892,
  completedRituals: 4567,
  insights: 12438,
  avgSessionDuration: 28, // minutes

  userJourney: {
    currentPhase: "Rituais Simbólicos",
    overallProgress: 75,
    phasesCompleted: 5,
    totalPhases: 8,
    daysActive: 42,
    lastSession: "2025-06-20T19:30:00"
  },

  recentSessions: [
    {
      id: 1,
      phase: "Clareira",
      type: "Respiração Consciente", 
      duration: 15,
      completedAt: "2025-06-20T07:00:00",
      insight: "Encontrei paz na simplicidade do momento presente",
      mood: "Calmo",
      rating: 5
    },
    {
      id: 2,
      phase: "Chamado Interno",
      type: "Reflexão Profunda",
      duration: 25,
      completedAt: "2025-06-19T21:15:00", 
      insight: "Meu propósito está conectado com ajudar outras pessoas",
      mood: "Inspirado",
      rating: 5
    },
    {
      id: 3,
      phase: "Rituais Simbólicos",
      type: "Ritual do Fogo",
      duration: 35,
      completedAt: "2025-06-19T18:45:00",
      insight: "Libertei medos antigos que não me servem mais",
      mood: "Renovado",
      rating: 4
    }
  ],

  weeklyProgress: [
    { day: "Seg", sessions: 2, duration: 45 },
    { day: "Ter", sessions: 1, duration: 20 },
    { day: "Qua", sessions: 3, duration: 65 },
    { day: "Qui", sessions: 2, duration: 40 },
    { day: "Sex", sessions: 1, duration: 25 },
    { day: "Sáb", sessions: 2, duration: 50 },
    { day: "Dom", sessions: 1, duration: 30 }
  ],

  ritualsCompleted: {
    fire: { completed: 3, lastDate: "2025-06-19", mastery: 75 },
    water: { completed: 2, lastDate: "2025-06-15", mastery: 60 },
    earth: { completed: 4, lastDate: "2025-06-18", mastery: 90 },
    air: { completed: 2, lastDate: "2025-06-12", mastery: 55 },
    writing: { completed: 1, lastDate: "2025-06-10", mastery: 40 }
  },

  inspirationStats: {
    favoritePortals: 12,
    sharedInsights: 8,
    categoriesExplored: ["Propósito", "Coragem", "Amor", "Transformação"],
    mostResonantTheme: "Transformação"
  },

  wellnessMetrics: {
    energyLevel: 4.2,
    stressLevel: 2.1,
    clarityLevel: 4.5,
    gratitudeScore: 4.8,
    sleepQuality: 4.1,
    overallWellbeing: 4.3
  },

  personalAnchors: [
    {
      type: "Mantra Pessoal",
      content: "Sou corajoso, autêntico e guiado pela sabedoria do coração",
      createdAt: "2025-06-15",
      uses: 23
    },
    {
      type: "Símbolo de Poder", 
      content: "Árvore dourada com raízes profundas tocando estrelas",
      createdAt: "2025-06-10",
      uses: 15
    }
  ],

  communityStats: {
    globalUsers: 8924,
    countriesActive: 15,
    languagesSupported: 6,
    sharedWisdom: 1247,
    collectiveHours: 45672
  },

  transformationMilestones: [
    { milestone: "Primeira Conexão", date: "2025-05-10", description: "Iniciou jornada na Clareira" },
    { milestone: "Chamado Ouvido", date: "2025-05-18", description: "Respondeu às 4 perguntas essenciais" },
    { milestone: "Primeiro Ritual", date: "2025-05-25", description: "Completou Ritual do Fogo" },
    { milestone: "Respiração Consciente", date: "2025-06-02", description: "Dominou técnica de respiração quadrada" },
    { milestone: "Portal Aberto", date: "2025-06-08", description: "Explorou 8 categorias de inspiração" },
    { milestone: "Elemento Dominado", date: "2025-06-18", description: "Completou todos rituais da Terra" }
  ]
};

export const mockTransformationStories = [
  {
    user: "Maria, 34 anos",
    story: "Descobri meu propósito de ensinar após 3 semanas usando Essentia. Os rituais me ajudaram a superar medos profundos.",
    phase: "Encerramento",
    timeInJourney: "8 semanas"
  },
  {
    user: "João, 28 anos", 
    story: "As respirações conscientes mudaram minha ansiedade. Hoje sou mais presente em tudo que faço.",
    phase: "Bem-estar Expandido",
    timeInJourney: "5 semanas"
  },
  {
    user: "Ana, 42 anos",
    story: "Os portais de inspiração me reconectaram com minha criatividade perdida. Voltei a pintar depois de 10 anos.",
    phase: "Portais de Inspiração", 
    timeInJourney: "6 semanas"
  }
];