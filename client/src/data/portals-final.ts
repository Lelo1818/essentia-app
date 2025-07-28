import { Eye, Heart, Shield, Star, Brain, Compass, Flame, Mountain } from 'lucide-react';

export const portalsData = [
  {
    id: 'clareza',
    name: 'Portal da Clareza',
    icon: Eye,
    color: 'from-blue-500 to-indigo-600',
    phrase: 'A verdade emerge quando a mente se aquieta e o coração escuta',
    practice: 'Encontre um local silencioso. Feche os olhos e respire profundamente por 3 minutos. A cada expiração, pergunte-se: "O que realmente importa na minha vida agora?" Deixe as respostas surgirem naturalmente, sem julgamento.',
    timeEstimate: '5-8 minutos',
    category: 'Autoconhecimento',
    unlocked: true,
    completed: false
  },
  {
    id: 'presenca',
    name: 'Portal da Presença',
    icon: Heart,
    color: 'from-green-500 to-emerald-600',
    phrase: 'Estar aqui, agora, é o maior presente que você pode oferecer a si mesmo',
    practice: 'Sente-se confortavelmente. Respire 7 vezes profundamente, focando apenas na sensação do ar entrando e saindo. A cada expiração, solte mentalmente algo que não pertence a este momento presente.',
    timeEstimate: '6-10 minutos',
    category: 'Mindfulness',
    unlocked: true,
    completed: false
  },
  {
    id: 'coragem',
    name: 'Portal da Coragem',
    icon: Shield,
    color: 'from-red-500 to-orange-600',
    phrase: 'Sinta o medo, honre sua presença, escolha a coragem e dê o próximo passo',
    practice: 'Identifique uma situação em sua vida que requer coragem. Visualize-se enfrentando essa situação com confiança. Sinta o medo, mas também sinta sua força interior. Comprometa-se com um pequeno ato de coragem hoje.',
    timeEstimate: '8-12 minutos',
    category: 'Crescimento',
    unlocked: true,
    completed: false
  },
  {
    id: 'sabedoria',
    name: 'Portal da Sabedoria',
    icon: Star,
    color: 'from-yellow-500 to-amber-600',
    phrase: 'A verdadeira sabedoria nasce da experiência vivida com consciência plena',
    practice: 'Reflita sobre uma lição importante que aprendeu recentemente. Como essa experiência mudou sua perspectiva? Que sabedoria você pode extrair para aplicar em situações futuras?',
    timeEstimate: '10-15 minutos',
    category: 'Reflexão',
    unlocked: false,
    completed: false
  },
  {
    id: 'intuicao',
    name: 'Portal da Intuição',
    icon: Brain,
    color: 'from-purple-500 to-violet-600',
    phrase: 'Sua intuição é uma bússola interna que sempre aponta para sua verdade',
    practice: 'Coloque uma mão no coração e outra no abdômen. Respire profundamente e faça uma pergunta importante para sua vida. Ouça não apenas com a mente, mas com todo o seu ser. Qual é a primeira sensação que surge?',
    timeEstimate: '7-10 minutos',
    category: 'Intuição',
    unlocked: false,
    completed: false
  },
  {
    id: 'proposito',
    name: 'Portal do Propósito',
    icon: Compass,
    color: 'from-indigo-500 to-purple-600',
    phrase: 'Seu propósito é a ponte entre quem você é e quem você pode se tornar',
    practice: 'Imagine-se daqui a 10 anos, vivendo sua vida ideal. O que você está fazendo? Como está contribuindo para o mundo? Que legado está construindo? Sinta a energia dessa visão.',
    timeEstimate: '12-18 minutos',
    category: 'Propósito',
    unlocked: false,
    completed: false
  },
  {
    id: 'transformacao',
    name: 'Portal da Transformação',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    phrase: 'A transformação acontece quando você abraça tanto sua luz quanto sua sombra',
    practice: 'Identifique um aspecto de si mesmo que deseja transformar. Sem julgar, observe esse padrão com compaixão. Agora visualize a versão transformada de si mesmo. Que um passo você pode dar hoje nessa direção?',
    timeEstimate: '15-20 minutos',
    category: 'Transformação',
    unlocked: false,
    completed: false
  },
  {
    id: 'transcendencia',
    name: 'Portal da Transcendência',
    icon: Mountain,
    color: 'from-pink-500 to-rose-600',
    phrase: 'Transcender é ir além do que você pensava ser possível para si mesmo',
    practice: 'Conecte-se com algo maior que você mesmo - pode ser a natureza, o universo, a humanidade. Sinta-se parte dessa totalidade. Como essa conexão transforma sua perspectiva sobre seus desafios e possibilidades?',
    timeEstimate: '18-25 minutos',
    category: 'Transcendência',
    unlocked: false,
    completed: false
  }
];

// Sistema de desbloqueio dos portais
export const unlockRequirements = {
  'sabedoria': { requiredClarity: 50, requiredPortals: ['clareza', 'presenca'] },
  'intuicao': { requiredClarity: 60, requiredPortals: ['clareza', 'presenca', 'coragem'] },
  'proposito': { requiredClarity: 70, requiredPortals: ['sabedoria', 'intuicao'] },
  'transformacao': { requiredClarity: 80, requiredPortals: ['proposito'] },
  'transcendencia': { requiredClarity: 90, requiredPortals: ['transformacao'] }
};

// Recompensas por conclusão de portal
export const portalRewards = {
  'clareza': { clarityIncrease: 8, xp: 100, badge: 'Visionário' },
  'presenca': { clarityIncrease: 7, xp: 90, badge: 'Consciente' },
  'coragem': { clarityIncrease: 10, xp: 120, badge: 'Corajoso' },
  'sabedoria': { clarityIncrease: 12, xp: 150, badge: 'Sábio' },
  'intuicao': { clarityIncrease: 8, xp: 130, badge: 'Intuitivo' },
  'proposito': { clarityIncrease: 15, xp: 200, badge: 'Direcionado' },
  'transformacao': { clarityIncrease: 12, xp: 180, badge: 'Transformador' },
  'transcendencia': { clarityIncrease: 20, xp: 300, badge: 'Transcendente' }
};