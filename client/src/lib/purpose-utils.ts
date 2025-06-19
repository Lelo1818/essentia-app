export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
}

export function formatDateRelative(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Hoje";
  if (diffInDays === 1) return "Ontem";
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`;
  
  return formatDate(d);
}

export function calculateLevel(experience: number): number {
  return Math.floor(experience / 100) + 1;
}

export function getExperienceForNextLevel(experience: number): number {
  const currentLevel = calculateLevel(experience);
  return (currentLevel * 100) - experience;
}

export function getLevelProgress(experience: number): number {
  const currentLevel = calculateLevel(experience);
  const experienceInCurrentLevel = experience - ((currentLevel - 1) * 100);
  return experienceInCurrentLevel;
}

export function getLevelTitle(level: number): string {
  if (level <= 2) return "Buscador Iniciante";
  if (level <= 4) return "Explorador Interior";
  if (level <= 6) return "Sábio em Formação";
  if (level <= 8) return "Mestre do Propósito";
  return "Guia Iluminado";
}

export function getModuleProgress(modules: any[]): { [key: string]: number } {
  const progress: { [key: string]: number } = {};
  
  modules.forEach(module => {
    progress[module.moduleType] = module.progress;
  });
  
  return progress;
}

export function calculateOverallProgress(modules: any[]): number {
  if (modules.length === 0) return 0;
  
  const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0);
  return Math.round(totalProgress / modules.length);
}

export function getRandomInspiration(inspirations: any[], category?: string): any {
  let filtered = inspirations;
  
  if (category) {
    filtered = inspirations.filter(item => item.category === category);
  }
  
  if (filtered.length === 0) return null;
  
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function validatePurposeMapCompletion(purposeMap: any): {
  isComplete: boolean;
  completedSections: number;
  totalSections: number;
} {
  const sections = ['values', 'passions', 'talents', 'mission', 'vision'];
  let completedSections = 0;
  
  sections.forEach(section => {
    const value = purposeMap?.[section];
    if (value && (Array.isArray(value) ? value.length > 0 : value.trim().length > 0)) {
      completedSections++;
    }
  });
  
  return {
    isComplete: completedSections === sections.length,
    completedSections,
    totalSections: sections.length
  };
}

export function generateReflectionPrompts(moduleType: string): string[] {
  const prompts = {
    despertar: [
      "O que me faz sentir mais vivo e autêntico?",
      "Quando foi a última vez que me senti completamente conectado comigo mesmo?",
      "Que aspectos da minha vida atual não refletem quem eu realmente sou?",
      "O que meu coração sussurra quando tudo está silencioso?"
    ],
    descoberta: [
      "Quais valores são absolutamente inegociáveis para mim?",
      "O que eu fazia quando criança que me trazia alegria pura?",
      "Em que atividades eu perco a noção do tempo?",
      "Que impacto eu gostaria de deixar no mundo?"
    ],
    decisao: [
      "Se eu tivesse coragem ilimitada, o que eu faria diferente?",
      "Qual seria minha declaração de missão pessoal?",
      "Como eu quero ser lembrado daqui a 20 anos?",
      "Que decisão mudaria completamente o rumo da minha vida?"
    ],
    direcao: [
      "Qual é o primeiro passo que posso dar hoje em direção ao meu propósito?",
      "Que obstáculos internos preciso superar?",
      "Como posso alinhar minha vida atual com meus valores descobertos?",
      "Que suporte preciso para seguir este caminho?"
    ]
  };
  
  return prompts[moduleType as keyof typeof prompts] || [];
}

export function suggestNextSteps(userProfile: any): string[] {
  const suggestions = [];
  const currentModule = userProfile.progress?.currentModule;
  const level = userProfile.progress?.currentLevel || 1;
  
  if (level === 1) {
    suggestions.push("Complete seu primeiro módulo de jornada");
    suggestions.push("Escreva sua primeira entrada no diário");
  }
  
  if (currentModule === "despertar") {
    suggestions.push("Dedique 10 minutos para uma meditação silenciosa");
    suggestions.push("Reflita sobre seus momentos mais autênticos");
  } else if (currentModule === "descoberta") {
    suggestions.push("Mapeie seus valores fundamentais");
    suggestions.push("Explore suas paixões naturais");
  } else if (currentModule === "decisao") {
    suggestions.push("Escreva sua declaração de missão pessoal");
    suggestions.push("Visualize seu futuro ideal");
  } else if (currentModule === "direcao") {
    suggestions.push("Crie um plano de ação concreto");
    suggestions.push("Identifique seus próximos passos");
  }
  
  return suggestions.slice(0, 3);
}