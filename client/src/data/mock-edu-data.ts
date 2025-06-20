export const mockEduData = {
  activeUsers: 1247,
  totalCourses: 156,
  completionRate: 87,
  avgSessionTime: 32, // minutes
  
  recentCourses: [
    {
      id: 1,
      title: "Física Quântica - Fundamentos",
      instructor: "Dr. Maria Santos",
      progress: 75,
      nextSession: "2025-06-21T10:00:00",
      difficulty: "Intermediário",
      estimatedTime: "2h 30min",
      language: "Português",
      tags: ["Ciências", "Física", "Matemática"]
    },
    {
      id: 2,
      title: "Machine Learning para Iniciantes",
      instructor: "Prof. Carlos Silva",
      progress: 45,
      nextSession: "2025-06-22T14:00:00",
      difficulty: "Iniciante",
      estimatedTime: "4h 15min",
      language: "Português",
      tags: ["Tecnologia", "IA", "Programação"]
    },
    {
      id: 3,
      title: "História da Arte Moderna",
      instructor: "Profa. Ana Costa",
      progress: 90,
      nextSession: "2025-06-23T16:00:00",
      difficulty: "Básico",
      estimatedTime: "3h 45min",
      language: "Português",
      tags: ["Arte", "História", "Cultura"]
    }
  ],

  studyStats: {
    weeklyGoal: 10, // hours
    completedThisWeek: 7.5,
    streak: 15, // days
    totalHours: 124,
    averageScore: 92,
    certificatesEarned: 8
  },

  aiInsights: [
    {
      type: "performance",
      message: "Seu desempenho em matemática melhorou 23% esta semana",
      action: "Continue praticando exercícios de cálculo"
    },
    {
      type: "emotion",
      message: "Detectamos maior foco durante sessões matutinas",
      action: "Considere agendar estudos importantes pela manhã"
    },
    {
      type: "retention",
      message: "É hora de revisar: Física - Leis de Newton",
      action: "Revisão baseada na Curva de Ebbinghaus"
    }
  ],

  ageGroups: [
    { range: "3-7 anos", users: 156, method: "Lúdico/Visual" },
    { range: "8-14 anos", users: 342, method: "Gamificação" },
    { range: "15-25 anos", users: 489, method: "Interativo/Social" },
    { range: "26-45 anos", users: 198, method: "Prático/Objetivo" },
    { range: "46+ anos", users: 62, method: "Estruturado/Reflexivo" }
  ],

  globalStats: {
    countriesActive: 12,
    languagesSupported: 8,
    ocrAccuracy: 94.2,
    emotionDetectionRate: 91.7
  }
};

export const mockLearningPaths = [
  {
    id: 1,
    title: "Trilha de Desenvolvimento Full-Stack",
    description: "Do zero ao mercado de trabalho em 6 meses",
    modules: 12,
    estimatedHours: 180,
    difficulty: "Intermediário",
    enrolled: 2847,
    rating: 4.8,
    completionRate: 78,
    nextStart: "2025-07-01"
  },
  {
    id: 2,
    title: "Ciências Exatas - Preparatório ENEM",
    description: "Matemática, Física e Química com IA personalizada",
    modules: 8,
    estimatedHours: 120,
    difficulty: "Avançado",
    enrolled: 1956,
    rating: 4.9,
    completionRate: 85,
    nextStart: "2025-06-25"
  },
  {
    id: 3,
    title: "Idiomas com IA - Inglês Fluente",
    description: "Conversação real com IA emocional adaptativa",
    modules: 15,
    estimatedHours: 90,
    difficulty: "Básico",
    enrolled: 3421,
    rating: 4.7,
    completionRate: 92,
    nextStart: "2025-06-22"
  }
];