// Definição de todas as conquistas disponíveis no Essentia

export interface AchievementConfig {
  key: string;
  title: string;
  description: string;
  icon: string;
  category: 'checkin' | 'breath' | 'points' | 'streak' | 'journey' | 'special';
  tier: 'bronze' | 'prata' | 'ouro' | 'platina' | 'special';
  target: number; // Valor alvo para desbloquear
  points: number; // Pontos ganhos ao desbloquear
  color: string; // Cor do badge
}

export const ACHIEVEMENTS: Record<string, AchievementConfig> = {
  // Check-in FEME
  primeiro_checkin: {
    key: 'primeiro_checkin',
    title: '🌱 Primeiro Passo',
    description: 'Completou seu primeiro check-in FEME',
    icon: '🌱',
    category: 'checkin',
    tier: 'special',
    target: 1,
    points: 10,
    color: 'green',
  },
  checkin_bronze: {
    key: 'checkin_bronze',
    title: '🥉 Explorador FEME',
    description: 'Completou 5 check-ins FEME',
    icon: '🥉',
    category: 'checkin',
    tier: 'bronze',
    target: 5,
    points: 25,
    color: 'amber',
  },
  checkin_prata: {
    key: 'checkin_prata',
    title: '🥈 Observador Consciente',
    description: 'Completou 20 check-ins FEME',
    icon: '🥈',
    category: 'checkin',
    tier: 'prata',
    target: 20,
    points: 50,
    color: 'gray',
  },
  checkin_ouro: {
    key: 'checkin_ouro',
    title: '🥇 Mestre do Autoconhecimento',
    description: 'Completou 50 check-ins FEME',
    icon: '🥇',
    category: 'checkin',
    tier: 'ouro',
    target: 50,
    points: 100,
    color: 'yellow',
  },
  
  // Respiração
  primeira_respiracao: {
    key: 'primeira_respiracao',
    title: '🌬️ Primeira Respiração Consciente',
    description: 'Completou sua primeira sessão de respiração 4-4-6',
    icon: '🌬️',
    category: 'breath',
    tier: 'special',
    target: 1,
    points: 10,
    color: 'cyan',
  },
  respirador_bronze: {
    key: 'respirador_bronze',
    title: '🥉 Respirador Iniciante',
    description: 'Completou 5 sessões de respiração',
    icon: '🥉',
    category: 'breath',
    tier: 'bronze',
    target: 5,
    points: 25,
    color: 'teal',
  },
  respirador_prata: {
    key: 'respirador_prata',
    title: '🥈 Respirador Dedicado',
    description: 'Completou 20 sessões de respiração',
    icon: '🥈',
    category: 'breath',
    tier: 'prata',
    target: 20,
    points: 50,
    color: 'cyan',
  },
  respirador_ouro: {
    key: 'respirador_ouro',
    title: '🥇 Mestre da Respiração',
    description: 'Completou 50 sessões de respiração',
    icon: '🥇',
    category: 'breath',
    tier: 'ouro',
    target: 50,
    points: 100,
    color: 'sky',
  },
  
  // Pontos
  pontos_100: {
    key: 'pontos_100',
    title: '⭐ Centena',
    description: 'Acumulou 100 pontos',
    icon: '⭐',
    category: 'points',
    tier: 'bronze',
    target: 100,
    points: 20,
    color: 'purple',
  },
  pontos_500: {
    key: 'pontos_500',
    title: '🌟 Quinhentos',
    description: 'Acumulou 500 pontos',
    icon: '🌟',
    category: 'points',
    tier: 'prata',
    target: 500,
    points: 50,
    color: 'violet',
  },
  pontos_1000: {
    key: 'pontos_1000',
    title: '💫 Milhar',
    description: 'Acumulou 1000 pontos',
    icon: '💫',
    category: 'points',
    tier: 'ouro',
    target: 1000,
    points: 100,
    color: 'indigo',
  },
  pontos_5000: {
    key: 'pontos_5000',
    title: '✨ Lenda',
    description: 'Acumulou 5000 pontos',
    icon: '✨',
    category: 'points',
    tier: 'platina',
    target: 5000,
    points: 250,
    color: 'pink',
  },
  
  // Streak (dias consecutivos)
  streak_3: {
    key: 'streak_3',
    title: '🔥 Aquecendo',
    description: '3 dias consecutivos de atividade',
    icon: '🔥',
    category: 'streak',
    tier: 'bronze',
    target: 3,
    points: 15,
    color: 'orange',
  },
  streak_7: {
    key: 'streak_7',
    title: '🔥 Semana Completa',
    description: '7 dias consecutivos de atividade',
    icon: '🔥',
    category: 'streak',
    tier: 'prata',
    target: 7,
    points: 50,
    color: 'red',
  },
  streak_30: {
    key: 'streak_30',
    title: '🔥 Mestre da Consistência',
    description: '30 dias consecutivos de atividade',
    icon: '🔥',
    category: 'streak',
    tier: 'ouro',
    target: 30,
    points: 150,
    color: 'rose',
  },
  
  // Journey (Jornada)
  portal_uau: {
    key: 'portal_uau',
    title: '🌌 Portal UAU',
    description: 'Completou o Portal UAU transformador',
    icon: '🌌',
    category: 'journey',
    tier: 'special',
    target: 1,
    points: 50,
    color: 'purple',
  },
  plano_criado: {
    key: 'plano_criado',
    title: '📋 Planejador',
    description: 'Criou seu primeiro plano de ação',
    icon: '📋',
    category: 'journey',
    tier: 'special',
    target: 1,
    points: 20,
    color: 'blue',
  },
  ia_terapeuta: {
    key: 'ia_terapeuta',
    title: '🤖 Conversa Profunda',
    description: 'Interagiu com os terapeutas IA',
    icon: '🤖',
    category: 'journey',
    tier: 'special',
    target: 1,
    points: 15,
    color: 'indigo',
  },
};

// Helper para verificar se uma conquista foi alcançada
export function checkAchievement(key: string, currentValue: number): boolean {
  const achievement = ACHIEVEMENTS[key];
  if (!achievement) return false;
  return currentValue >= achievement.target;
}

// Retorna lista de conquistas organizadas por categoria
export function getAchievementsByCategory(category: AchievementConfig['category']) {
  return Object.values(ACHIEVEMENTS).filter(a => a.category === category);
}

// Retorna próxima conquista a desbloquear
export function getNextAchievement(category: AchievementConfig['category'], currentValue: number): AchievementConfig | null {
  const categoryAchievements = getAchievementsByCategory(category)
    .filter(a => currentValue < a.target)
    .sort((a, b) => a.target - b.target);
  
  return categoryAchievements[0] || null;
}
