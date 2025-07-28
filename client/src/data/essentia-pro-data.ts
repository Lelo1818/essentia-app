import { Eye, Heart, Shield, Star, TreePine, Mountain, Waves, Sparkles } from 'lucide-react';
import { JourneyStage, Portal, AIPersonality, BreathingTechnique, Environment } from '../types/essentia';

export const journeyStages: JourneyStage[] = [
  { 
    id: 1, 
    name: "Despertar Interior", 
    completed: true, 
    current: false, 
    description: "Primeira consciência do caminho de transformação pessoal" 
  },
  { 
    id: 2, 
    name: "Autoconhecimento Profundo", 
    completed: true, 
    current: false, 
    description: "Exploração das camadas mais profundas de si mesmo" 
  },
  { 
    id: 3, 
    name: "Descoberta de Paixões", 
    completed: false, 
    current: true, 
    description: "Identificação dos verdadeiros interesses e talentos" 
  },
  { 
    id: 4, 
    name: "Relacionamentos Significativos", 
    completed: false, 
    current: false, 
    description: "Construção de conexões autênticas e profundas" 
  },
  { 
    id: 5, 
    name: "Missão e Contribuição", 
    completed: false, 
    current: false, 
    description: "Definição do propósito e forma de servir ao mundo" 
  },
  { 
    id: 6, 
    name: "Vida com Propósito", 
    completed: false, 
    current: false, 
    description: "Integração total do propósito na vida cotidiana" 
  }
];

export const environments: Environment[] = [
  { 
    name: 'Caverna', 
    emoji: '🕳️', 
    color: '#1F2937',
    gradient: 'from-gray-800 to-stone-900'
  },
  { 
    name: 'Floresta', 
    emoji: '🌲', 
    color: '#059669',
    gradient: 'from-green-600 to-emerald-800'
  },
  { 
    name: 'Montanha', 
    emoji: '⛰️', 
    color: '#2563EB',
    gradient: 'from-blue-600 to-indigo-800'
  },
  { 
    name: 'Oceano', 
    emoji: '🌊', 
    color: '#0891B2',
    gradient: 'from-cyan-600 to-blue-900'
  },
  { 
    name: 'Cosmos', 
    emoji: '🌌', 
    color: '#7C3AED',
    gradient: 'from-purple-600 to-pink-900'
  }
];

export const portals: Portal[] = [
  {
    id: 'clareza',
    name: 'Portal da Clareza',
    icon: Eye,
    color: 'from-blue-500 to-indigo-600',
    phrase: 'A verdade emerge quando a mente se aquieta',
    practice: 'Feche os olhos por 2 minutos. Faça apenas uma pergunta: "O que realmente importa agora?"',
    unlocked: true
  },
  {
    id: 'presenca',
    name: 'Portal da Presença',
    icon: Heart,
    color: 'from-green-500 to-emerald-600',
    phrase: 'Estar aqui, agora, é o maior presente que você pode se dar',
    practice: 'Respire 5 vezes profundamente. A cada expiração, solte algo que não pertence a este momento.',
    unlocked: true
  },
  {
    id: 'coragem',
    name: 'Portal da Coragem',
    icon: Shield,
    color: 'from-red-500 to-orange-600',
    phrase: 'Sinta o medo. Escolha a coragem. Dê o passo.',
    practice: 'Identifique um pequeno ato de coragem e comprometa-se a realizá-lo hoje.',
    unlocked: true
  },
  {
    id: 'sabedoria',
    name: 'Portal da Sabedoria',
    icon: Star,
    color: 'from-yellow-500 to-amber-600',
    phrase: 'A sabedoria não está no conhecimento, mas na experiência vivida',
    practice: 'Reflita sobre uma lição aprendida recentemente. Como ela mudou sua perspectiva?',
    unlocked: false
  },
  {
    id: 'intuicao',
    name: 'Portal da Intuição',
    icon: TreePine,
    color: 'from-purple-500 to-violet-600',
    phrase: 'Sua intuição é uma bússola interna que sempre aponta para sua verdade',
    practice: 'Coloque uma mão no coração e outra no abdômen. Respire profundamente e faça uma pergunta importante para sua vida.',
    unlocked: false
  },
  {
    id: 'proposito',
    name: 'Portal do Propósito',
    icon: Mountain,
    color: 'from-indigo-500 to-purple-600',
    phrase: 'Seu propósito é a ponte entre quem você é e quem você pode se tornar',
    practice: 'Imagine-se daqui a 10 anos, vivendo sua vida ideal. O que você está fazendo? Que legado está construindo?',
    unlocked: false
  }
];

export const aiPersonalities: AIPersonality[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    focus: 'Suporte & Cuidado',
    color: 'from-pink-500 to-rose-600',
    phrase: 'Vejo que você está enfrentando desafios. Cada passo corajoso que você dá planta uma semente de transformação.',
    specialty: 'Momentos de dificuldade e necessidade de acolhimento emocional'
  },
  {
    id: 'marcos',
    name: 'Marcos',
    focus: 'Foco & Ação',
    color: 'from-blue-500 to-indigo-600',
    phrase: 'Hora de transformar reflexão em ação! Qual é o próximo passo concreto que você pode dar hoje?',
    specialty: 'Motivação e direcionamento para ações práticas e objetivas'
  },
  {
    id: 'luna',
    name: 'Luna',
    focus: 'Reflexão & Calma',
    color: 'from-purple-500 to-violet-600',
    phrase: 'Que a tranquilidade da noite traga clareza. Respire fundo e conecte-se com sua sabedoria interior.',
    specialty: 'Momentos de introspecção e reflexão profunda sobre a vida'
  },
  {
    id: 'leo',
    name: 'Léo',
    focus: 'Motivação & Energia',
    color: 'from-yellow-500 to-orange-600',
    phrase: 'Bom dia, campeão! Sua energia matinal está vibrante. Vamos canalizar essa força em conquistas reais!',
    specialty: 'Energia, clareza e direcionamento para começar o dia com propósito'
  }
];

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: 'box',
    name: 'Respiração Quadrada',
    description: 'Técnica equilibrante para clareza mental e foco',
    pattern: [4, 4, 4, 4],
    purpose: 'Equilíbrio e concentração'
  },
  {
    id: '478',
    name: 'Respiração 4-7-8',
    description: 'Técnica calmante para relaxamento profundo',
    pattern: [4, 7, 8],
    purpose: 'Relaxamento e redução do estresse'
  },
  {
    id: 'coherent',
    name: 'Respiração Coerente',
    description: 'Sincronização entre corpo, mente e coração',
    pattern: [5, 5],
    purpose: 'Harmonia interior e coerência cardíaca'
  },
  {
    id: 'energizing',
    name: 'Respiração Energizante',
    description: 'Técnica vigorizante para despertar a vitalidade',
    pattern: [3, 1, 6, 1],
    purpose: 'Energia e vitalidade'
  }
];

export const dailyPractices = [
  {
    id: 'morning',
    name: 'Ritual Matinal',
    description: 'Inicie o dia com intenção e propósito',
    time: '5-10 min',
    steps: [
      'Respire profundamente 3 vezes',
      'Defina sua intenção para o dia',
      'Visualize-se vivendo com propósito',
      'Agradeça por 3 coisas em sua vida'
    ]
  },
  {
    id: 'evening',
    name: 'Ritual Noturno',
    description: 'Reflita e integre as experiências do dia',
    time: '5-10 min',
    steps: [
      'Pause e respire conscientemente',
      'Reflita sobre 3 momentos significativos',
      'Reconheça seus crescimentos do dia',
      'Solte o que não serve mais'
    ]
  }
];

export const portalRewards = {
  'clareza': { clarityIncrease: 10, xp: 100, badge: 'Visionário' },
  'presenca': { clarityIncrease: 8, xp: 90, badge: 'Consciente' },
  'coragem': { clarityIncrease: 12, xp: 120, badge: 'Corajoso' },
  'sabedoria': { clarityIncrease: 15, xp: 150, badge: 'Sábio' },
  'intuicao': { clarityIncrease: 8, xp: 130, badge: 'Intuitivo' },
  'proposito': { clarityIncrease: 20, xp: 200, badge: 'Direcionado' }
};

export const unlockRequirements = {
  'sabedoria': { requiredClarity: 50, requiredPortals: ['clareza', 'presenca'] },
  'intuicao': { requiredClarity: 60, requiredPortals: ['clareza', 'presenca', 'coragem'] },
  'proposito': { requiredClarity: 80, requiredPortals: ['sabedoria', 'intuicao'] }
};

export const achievements = [
  { id: 1, name: 'Primeiro Despertar', description: 'Iniciou a jornada de autoconhecimento', unlocked: true },
  { id: 2, name: 'Respiração Consciente', description: 'Completou 10 sessões de respiração guiada', unlocked: true },
  { id: 3, name: 'Portal Desbloqueado', description: 'Acessou seu primeiro portal de transformação', unlocked: true },
  { id: 4, name: 'Clareza Crescente', description: 'Atingiu 50% de clareza de propósito', unlocked: true },
  { id: 5, name: 'Visionário', description: 'Completou o Portal da Clareza', unlocked: false },
  { id: 6, name: 'Consciente', description: 'Completou o Portal da Presença', unlocked: false },
  { id: 7, name: 'Corajoso', description: 'Completou o Portal da Coragem', unlocked: false },
  { id: 8, name: 'Sábio', description: 'Completou o Portal da Sabedoria', unlocked: false },
  { id: 9, name: 'Intuitivo', description: 'Completou o Portal da Intuição', unlocked: false },
  { id: 10, name: 'Direcionado', description: 'Completou o Portal do Propósito', unlocked: false },
  { id: 11, name: 'Persistência', description: 'Manteve prática diária por 30 dias', unlocked: false },
  { id: 12, name: 'Mestria Interior', description: 'Completou todos os portais da jornada', unlocked: false }
];