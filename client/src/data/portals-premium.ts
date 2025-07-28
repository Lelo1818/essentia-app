import { Eye, Heart, Shield, Star } from 'lucide-react';

export const portalsData = [
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
  }
];