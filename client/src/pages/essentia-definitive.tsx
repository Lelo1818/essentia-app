import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Brain, 
  Zap, 
  Play,
  Pause,
  CheckCircle,
  Timer,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Mountain,
  User,
  MessageCircle,
  Calendar,
  Target,
  Book,
  SunIcon,
  Moon,
  Wind,
  Waves,
  TreePine,
  Camera,
  Volume2,
  VolumeX,
  Settings,
  TrendingUp,
  Award,
  LifeBuoy,
  Star,
  Compass,
  Shield,
  Flame,
  Feather
} from 'lucide-react';

// ========================================
// TYPES & INTERFACES - VERSÃO DEFINITIVA
// ========================================

interface TriadScores {
  energia: number;      // 0-10 - Vitalidade física e mental
  coerencia: number;    // 0-10 - Alinhamento valores-ações
  consciencia: number;  // 0-10 - Percepção e presença
}

interface AvatarState {
  expression: 'neutral' | 'happy' | 'focused' | 'tired' | 'energetic' | 'contemplative';
  posture: 'relaxed' | 'upright' | 'slumped' | 'confident';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  animations: string[];
  unlocked_features: string[];
}

interface UserProfile {
  id: string;
  name: string;
  triadScores: TriadScores;
  avatar: AvatarState;
  streak: number;
  totalRitualsCompleted: number;
  minorstones: string[];
  insights: string[];
  preferences: {
    aiArchetype: 'mentor' | 'coach' | 'amigo';
    notificationTime: string;
    dailyGoal: number; // minutes
    focusAreas: string[];
  };
  weeklyFlow: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ContextualPortal {
  id: string;
  name: string;
  type: 'principal' | 'secundario';
  activationCriteria: {
    energia?: { min?: number, max?: number };
    coerencia?: { min?: number, max?: number };
    consciencia?: { min?: number, max?: number };
    timeOfDay?: string[];
    lastUsed?: number; // hours since last use
  };
  microFeedback: string;
  practice: {
    duration: number; // minutes
    type: 'respiracao' | 'meditacao' | 'movimento' | 'reflexao' | 'diario';
    instructions: string[];
    videoUrl?: string;
  };
  benefits: string[];
  color: string;
}

interface AIArchetype {
  id: 'mentor' | 'coach' | 'amigo';
  name: string;
  personality: string;
  responseStyle: string;
  avatar: string;
  systemPrompt: string;
  microFeedbackExamples: {
    energia_baixa: string;
    coerencia_media: string;
    consciencia_alta: string;
    geral: string;
  };
}

interface Minorstone {
  id: string;
  title: string;
  description: string;
  criteria: any;
  reward: {
    type: 'avatar' | 'feature' | 'badge';
    value: string;
  };
  unlocked: boolean;
  unlockedAt?: Date;
}

// ========================================
// DATA CONSTANTS - VERSÃO DEFINITIVA
// ========================================

const AI_ARCHETYPES: AIArchetype[] = [
  {
    id: 'mentor',
    name: 'Sofia - Mentora',
    personality: 'Profunda, reflexiva, sábia',
    responseStyle: 'Pergunta para refletir, oferece perspectivas profundas',
    avatar: '🌸',
    systemPrompt: 'Você é uma mentora sábia e compassiva. Fale com profundidade, faça perguntas reflexivas e ofereça insights para crescimento interior. Seja acolhedora mas desafie o usuário a pensar mais profundamente.',
    microFeedbackExamples: {
      energia_baixa: 'Percebo que sua energia está baixa. Que tal explorar o que realmente drena sua vitalidade?',
      coerencia_media: 'Vejo um desalinhamento sutil entre suas intenções e ações. Vamos refletir sobre isso?',
      consciencia_alta: 'Sua consciência está aguçada! Momento perfeito para insights profundos.',
      geral: 'Cada momento é uma oportunidade de autoconhecimento. Como você está se percebendo agora?'
    }
  },
  {
    id: 'coach',
    name: 'Marcus - Coach',
    personality: 'Estratégico, objetivo, orientado para ação',
    responseStyle: 'Foco em soluções práticas e próximos passos',
    avatar: '🎯',
    systemPrompt: 'Você é um coach estratégico e orientado para resultados. Seja direto, focado em ação e ajude o usuário a transformar insights em passos concretos. Sempre ofereça próximos passos claros.',
    microFeedbackExamples: {
      energia_baixa: 'Energia baixa detectada. Vamos criar um plano de 5 minutos para recarregar agora!',
      coerencia_media: 'Hora de alinhar! Qual é sua prioridade #1 hoje e como suas ações vão refletir isso?',
      consciencia_alta: 'Consciência alta = momento de decisão! Que ação você vai tomar baseada nessa clareza?',
      geral: 'Qual é o próximo micro-passo que vai te levar mais perto do seu objetivo hoje?'
    }
  },
  {
    id: 'amigo',
    name: 'Luna - Amiga',
    personality: 'Leve, motivadora, empática',
    responseStyle: 'Suporte emocional, motivação positiva, leveza',
    avatar: '🌙',
    systemPrompt: 'Você é uma amiga próxima e motivadora. Seja leve, empática e sempre encontre o lado positivo. Ofereça suporte emocional e motivação com um toque de humor quando apropriado.',
    microFeedbackExamples: {
      energia_baixa: 'Hey, todo mundo tem dias assim! Que tal começarmos com algo bem simples e gostoso?',
      coerencia_media: 'Você está no caminho certo! Às vezes é normal ter alguns desalinhamentos. Vamos ajustar juntos?',
      consciencia_alta: 'Uau! Você está super conectado hoje! Aproveita essa energia boa!',
      geral: 'Oi, querido! Como você está se sentindo hoje? Lembra que eu estou aqui para te apoiar!'
    }
  }
];

const CONTEXTUAL_PORTALS: ContextualPortal[] = [
  {
    id: 'portal-sono',
    name: 'Portal do Sono Restaurador',
    type: 'principal',
    activationCriteria: {
      energia: { max: 4 }
    },
    microFeedback: 'Vamos recarregar sua energia com uma prática restauradora',
    practice: {
      duration: 5,
      type: 'respiracao',
      instructions: [
        'Encontre uma posição confortável',
        'Feche os olhos suavemente',
        'Inspire por 4 tempos',
        'Segure por 4 tempos',
        'Expire por 6 tempos',
        'Repita por 5 minutos'
      ],
      videoUrl: 'https://www.youtube.com/embed/YQP1xZqcrfE'
    },
    benefits: ['Restaura energia vital', 'Reduz fadiga mental', 'Melhora foco'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'portal-diario',
    name: 'Portal do Diário Guiado',
    type: 'principal',
    activationCriteria: {
      coerencia: { max: 5 }
    },
    microFeedback: 'Hora de alinhar pensamentos e ações através da escrita',
    practice: {
      duration: 8,
      type: 'diario',
      instructions: [
        'O que realmente importa para mim hoje?',
        'Como minhas ações refletiram meus valores?',
        'Que pequeno ajuste posso fazer agora?',
        'Pelo que sou grato neste momento?'
      ]
    },
    benefits: ['Alinha valores e ações', 'Aumenta autoconhecimento', 'Clarifica prioridades'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'portal-mindfulness',
    name: 'Portal da Consciência Plena',
    type: 'principal',
    activationCriteria: {
      consciencia: { max: 5 }
    },
    microFeedback: 'Vamos expandir sua percepção e presença no momento',
    practice: {
      duration: 6,
      type: 'meditacao',
      instructions: [
        'Sente-se confortavelmente',
        'Observe sua respiração natural',
        'Quando a mente vagar, volte gentilmente',
        'Perceba sensações no corpo',
        'Permaneça presente'
      ],
      videoUrl: 'https://www.youtube.com/embed/mMHVW7Vq_dA'
    },
    benefits: ['Aumenta consciência corporal', 'Melhora foco', 'Reduz ansiedade'],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'portal-movimento',
    name: 'Portal do Movimento Consciente',
    type: 'secundario',
    activationCriteria: {
      energia: { min: 3, max: 7 },
      timeOfDay: ['manha', 'tarde']
    },
    microFeedback: 'Movimente seu corpo e desperte sua energia vital',
    practice: {
      duration: 10,
      type: 'movimento',
      instructions: [
        'Alongue braços e pescoço',
        'Faça 10 respirações profundas',
        'Caminhada consciente 5 minutos',
        'Observe como se sente após'
      ]
    },
    benefits: ['Aumenta energia física', 'Melhora circulação', 'Eleva humor'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'portal-micro-habito',
    name: 'Portal do Micro-hábito',
    type: 'secundario',
    activationCriteria: {
      energia: { min: 6 },
      coerencia: { min: 6 }
    },
    microFeedback: 'Momento perfeito para consolidar um pequeno hábito positivo',
    practice: {
      duration: 3,
      type: 'reflexao',
      instructions: [
        'Escolha um micro-hábito (beber água, respirar 3x, agradecer)',
        'Faça agora conscientemente',
        'Observe como se sente',
        'Programe para repetir amanhã'
      ]
    },
    benefits: ['Constrói consistência', 'Pequenas vitórias', 'Momentum positivo'],
    color: 'from-yellow-500 to-orange-500'
  }
];

const MINORSTONES: Minorstone[] = [
  {
    id: 'primeiro-portal',
    title: 'Primeiro Portal',
    description: 'Completou sua primeira prática portal',
    criteria: { totalRitualsCompleted: 1 },
    reward: { type: 'avatar', value: 'confident_posture' },
    unlocked: false
  },
  {
    id: 'energia-consistente',
    title: 'Energia Consistente',
    description: 'Manteve energia acima de 6 por 3 dias consecutivos',
    criteria: { energiaStreak: 3, energiaMin: 6 },
    reward: { type: 'avatar', value: 'energetic_expression' },
    unlocked: false
  },
  {
    id: 'coerencia-alinhada',
    title: 'Coerência Alinhada',
    description: 'Manteve coerência acima de 7 por 5 dias',
    criteria: { coerenciaStreak: 5, coerenciaMin: 7 },
    reward: { type: 'avatar', value: 'serene_colors' },
    unlocked: false
  },
  {
    id: 'consciencia-expandida',
    title: 'Consciência Expandida',
    description: 'Alcançou consciência máxima (10) por 3 vezes',
    criteria: { conscienciaMaxCount: 3 },
    reward: { type: 'avatar', value: 'wisdom_glow' },
    unlocked: false
  },
  {
    id: 'semana-completa',
    title: 'Semana Completa',
    description: 'Completou pelo menos uma prática todos os dias da semana',
    criteria: { weeklyStreak: 7 },
    reward: { type: 'feature', value: 'advanced_insights' },
    unlocked: false
  }
];

// ========================================
// MAIN COMPONENT - ESSENTIA DEFINITIVA
// ========================================

export default function EssentiaDefinitive() {
  // Estados principais - TODOS declarados no início
  const [currentFlow, setCurrentFlow] = useState<'onboarding' | 'dashboard' | 'portal' | 'diary' | 'community'>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [availablePortals, setAvailablePortals] = useState<ContextualPortal[]>([]);
  const [activePortal, setActivePortal] = useState<ContextualPortal | null>(null);
  const [portalProgress, setPortalProgress] = useState(0);
  const [currentArchetype, setCurrentArchetype] = useState<AIArchetype>(AI_ARCHETYPES[0]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [microFeedback, setMicroFeedback] = useState<string>('');
  const [diaryEntry, setDiaryEntry] = useState('');
  const [diaryPrompts, setDiaryPrompts] = useState<string[]>([]);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(5);
  
  // Ref sempre no mesmo lugar
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ========================================
  // CORE FUNCTIONS
  // ========================================

  const evaluateTriad = (energia: number, coerencia: number, consciencia: number): TriadScores => {
    return { energia, coerencia, consciencia };
  };

  const generateAvatarState = (triad: TriadScores): AvatarState => {
    let expression: AvatarState['expression'] = 'neutral';
    let posture: AvatarState['posture'] = 'relaxed';
    
    // Determine expression based on consciousness and energy
    if (triad.consciencia >= 8) expression = 'contemplative';
    else if (triad.energia >= 7) expression = 'energetic';
    else if (triad.energia <= 3) expression = 'tired';
    else if (triad.coerencia >= 7) expression = 'focused';
    else expression = 'neutral';

    // Determine posture based on overall state
    if (triad.energia <= 3) posture = 'slumped';
    else if (triad.coerencia >= 7 && triad.consciencia >= 7) posture = 'confident';
    else if (triad.consciencia >= 6) posture = 'upright';
    else posture = 'relaxed';

    const colors = {
      primary: triad.energia >= 6 ? '#f59e0b' : '#6b7280',
      secondary: triad.coerencia >= 6 ? '#10b981' : '#6b7280', 
      accent: triad.consciencia >= 6 ? '#8b5cf6' : '#6b7280'
    };

    return {
      expression,
      posture,
      colors,
      animations: ['breathing', 'subtle_movement'],
      unlocked_features: []
    };
  };

  const evaluateContextualPortals = (triad: TriadScores): ContextualPortal[] => {
    const currentHour = new Date().getHours();
    const timeOfDay = currentHour < 12 ? 'manha' : currentHour < 18 ? 'tarde' : 'noite';
    
    return CONTEXTUAL_PORTALS.filter(portal => {
      const { energia, coerencia, consciencia, timeOfDay: portalTimeOfDay } = portal.activationCriteria;
      
      let matches = true;
      
      if (energia) {
        if (energia.min && triad.energia < energia.min) matches = false;
        if (energia.max && triad.energia > energia.max) matches = false;
      }
      
      if (coerencia) {
        if (coerencia.min && triad.coerencia < coerencia.min) matches = false;
        if (coerencia.max && triad.coerencia > coerencia.max) matches = false;
      }
      
      if (consciencia) {
        if (consciencia.min && triad.consciencia < consciencia.min) matches = false;
        if (consciencia.max && triad.consciencia > consciencia.max) matches = false;
      }
      
      if (portalTimeOfDay && !portalTimeOfDay.includes(timeOfDay)) matches = false;
      
      return matches;
    });
  };

  const generateMicroFeedback = (triad: TriadScores, archetype: AIArchetype): string => {
    if (triad.energia <= 4) {
      return archetype.microFeedbackExamples.energia_baixa;
    } else if (triad.coerencia <= 5) {
      return archetype.microFeedbackExamples.coerencia_media;
    } else if (triad.consciencia >= 8) {
      return archetype.microFeedbackExamples.consciencia_alta;
    } else {
      return archetype.microFeedbackExamples.geral;
    }
  };

  const createUserProfile = (responses: any[]): UserProfile => {
    // Calculate triad based on responses
    let energia = 5, coerencia = 5, consciencia = 5;
    
    responses.forEach((response, index) => {
      switch(index) {
        case 0: energia = response; break;
        case 1: coerencia = response; break;
        case 2: consciencia = response; break;
      }
    });

    const triadScores = { energia, coerencia, consciencia };
    const avatar = generateAvatarState(triadScores);

    const newUser: UserProfile = {
      id: 'essentia_definitive_user',
      name: 'Explorador Essencial',
      triadScores,
      avatar,
      streak: 0,
      totalRitualsCompleted: 0,
      minorstones: [],
      insights: [],
      preferences: {
        aiArchetype: 'mentor',
        notificationTime: '09:00',
        dailyGoal: 10,
        focusAreas: []
      },
      weeklyFlow: {
        monday: 'Check-in + Tríade',
        tuesday: 'Portais + Diário',
        wednesday: 'Mindfulness',
        thursday: 'Portais + Exercícios',
        friday: 'Diário + Reflexão',
        saturday: 'Revisão + Insights',
        sunday: 'Planejamento'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setUser(newUser);
    setCurrentArchetype(AI_ARCHETYPES.find(a => a.id === newUser.preferences.aiArchetype) || AI_ARCHETYPES[0]);
    const availablePortals = evaluateContextualPortals(triadScores);
    setAvailablePortals(availablePortals);
    setMicroFeedback(generateMicroFeedback(triadScores, currentArchetype));
    
    localStorage.setItem('essentia-definitive-user', JSON.stringify(newUser));
    setCurrentFlow('dashboard');
    
    return newUser;
  };

  const sendAIMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setIsAiLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    setChatInput('');
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          persona: currentArchetype.id.toUpperCase(),
          context: {
            triad: user?.triadScores,
            archetype: currentArchetype.id,
            streak: user?.streak,
            totalRitualsCompleted: user?.totalRitualsCompleted
          }
        })
      });
      
      const data = await response.json();
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || currentArchetype.microFeedbackExamples.geral
      }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem para IA:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: currentArchetype.microFeedbackExamples.geral
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const startTimer = (seconds: number, onComplete?: () => void) => {
    setCurrentTimer(seconds);
    setIsTimerActive(true);
    
    timerRef.current = setInterval(() => {
      setCurrentTimer(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerActive(false);
    setCurrentTimer(0);
  };

  const completePortal = (portal: ContextualPortal) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1,
      updatedAt: new Date()
    };

    // Check for new minorstones
    MINORSTONES.forEach(minorstone => {
      if (!minorstone.unlocked) {
        if (minorstone.id === 'primeiro-portal' && updatedUser.totalRitualsCompleted >= 1) {
          minorstone.unlocked = true;
          minorstone.unlockedAt = new Date();
          updatedUser.minorstones.push(minorstone.id);
        }
      }
    });

    setUser(updatedUser);
    localStorage.setItem('essentia-definitive-user', JSON.stringify(updatedUser));
    setActivePortal(null);
    setCurrentFlow('dashboard');
  };

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  const renderAvatar = (size: 'small' | 'medium' | 'large' = 'medium') => {
    if (!user) return null;
    
    const { avatar } = user;
    const sizeClasses = {
      small: 'w-16 h-16',
      medium: 'w-24 h-24', 
      large: 'w-32 h-32'
    };

    return (
      <div className={`${sizeClasses[size]} mx-auto relative`}>
        <div 
          className={`w-full h-full rounded-full ${avatar.posture === 'confident' ? 'ring-4 ring-yellow-400' : ''}`}
          style={{
            background: `linear-gradient(135deg, ${avatar.colors.primary}, ${avatar.colors.secondary})`
          }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {avatar.expression === 'energetic' && '⚡'}
            {avatar.expression === 'contemplative' && '🧘'}
            {avatar.expression === 'focused' && '🎯'}
            {avatar.expression === 'tired' && '😴'}
            {avatar.expression === 'happy' && '😊'}
            {avatar.expression === 'neutral' && '🌟'}
          </div>
          
          {/* Breathing animation */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
          
          {/* Unlocked features */}
          {avatar.unlocked_features.includes('wisdom_glow') && (
            <div className="absolute -inset-2 rounded-full bg-purple-400/20 animate-pulse"></div>
          )}
        </div>
      </div>
    );
  };

  const renderTriadVisualization = () => {
    if (!user) return null;
    
    const { triadScores } = user;
    
    return (
      <div className="relative w-64 h-64 mx-auto">
        {/* Triangular visualization */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Background triangle */}
          <polygon
            points="100,20 20,160 180,160"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          
          {/* Dynamic triangle based on scores */}
          <polygon
            points={`100,${20 + (10-triadScores.consciencia) * 14} ${20 + (10-triadScores.energia) * 16},160 ${180 - (10-triadScores.coerencia) * 16},160`}
            fill="url(#triadGradient)"
            fillOpacity="0.6"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="triadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={user.avatar.colors.accent} />
              <stop offset="50%" stopColor={user.avatar.colors.primary} />
              <stop offset="100%" stopColor={user.avatar.colors.secondary} />
            </linearGradient>
          </defs>
          
          {/* Labels */}
          <text x="100" y="15" textAnchor="middle" className="text-xs font-semibold fill-purple-600">
            Consciência {triadScores.consciencia}
          </text>
          <text x="15" y="175" textAnchor="middle" className="text-xs font-semibold fill-green-600">
            Energia {triadScores.energia}
          </text>
          <text x="185" y="175" textAnchor="middle" className="text-xs font-semibold fill-blue-600">
            Coerência {triadScores.coerencia}
          </text>
        </svg>
      </div>
    );
  };

  const renderOnboarding = () => {
    if (onboardingStep === 0) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🌟</div>
            <CardTitle className="text-4xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Bem-vindo ao Essentia Definitiva
            </CardTitle>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              Hoje vamos explorar seu potencial através da Tríade Essencial. 
              Cada passo é seu, mas vamos guiar você com clareza e energia.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 rounded-2xl"></div>
              <div className="relative grid grid-cols-3 gap-6 p-6">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                  <h3 className="font-bold text-yellow-700 mb-2">Energia</h3>
                  <p className="text-sm text-yellow-600">Vitalidade física e mental</p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-red-500" />
                  <h3 className="font-bold text-red-700 mb-2">Coerência</h3>
                  <p className="text-sm text-red-600">Alinhamento valores-ações</p>
                </div>
                <div className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                  <h3 className="font-bold text-purple-700 mb-2">Consciência</h3>
                  <p className="text-sm text-purple-600">Percepção e presença</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setOnboardingStep(1)}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white px-8 py-4 text-lg hover:shadow-xl transition-all"
              size="lg"
            >
              Iniciar Jornada <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </CardContent>
        </Card>
      );
    }

    const questions = [
      { 
        title: 'Como está sua energia vital hoje?', 
        subtitle: 'Vitalidade física e mental (1=Muito baixa, 10=Muito alta)',
        icon: Zap,
        color: 'yellow'
      },
      { 
        title: 'Suas ações refletem seus valores?', 
        subtitle: 'Alinhamento entre intenções e ações (1=Nada alinhadas, 10=Perfeitamente alinhadas)',
        icon: Heart,
        color: 'red'
      },
      { 
        title: 'Quanta presença você sente agora?', 
        subtitle: 'Consciência e percepção do momento (1=Muito disperso, 10=Totalmente presente)',
        icon: Brain,
        color: 'purple'
      }
    ];

    if (onboardingStep <= 3) {
      const questionIndex = onboardingStep - 1;
      const question = questions[questionIndex];
      const IconComponent = question.icon;

      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{onboardingStep}/3</Badge>
              <Progress value={(onboardingStep / 3) * 100} className="flex-1 mx-4" />
              <Badge variant="secondary">Tríade</Badge>
            </div>
            <div className={`text-6xl mb-4 text-${question.color}-500`}>
              <IconComponent className="w-16 h-16 mx-auto" />
            </div>
            <CardTitle className="text-2xl mb-2">{question.title}</CardTitle>
            <p className="text-gray-600">{question.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">1</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(Number(e.target.value))}
                  className={`flex-1 mx-4 accent-${question.color}-500`}
                />
                <span className="text-sm text-gray-500">10</span>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold text-${question.color}-600 mb-2`}>
                  {selectedValue}
                </div>
                <p className="text-sm text-gray-600">
                  {selectedValue <= 3 && 'Precisa de atenção'}
                  {selectedValue > 3 && selectedValue <= 6 && 'Em equilíbrio'}
                  {selectedValue > 6 && selectedValue <= 8 && 'Muito bem'}
                  {selectedValue > 8 && 'Excelente!'}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              {onboardingStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}
              <Button
                onClick={() => {
                  const responses = JSON.parse(localStorage.getItem('onboarding-responses') || '[]');
                  responses[questionIndex] = selectedValue;
                  localStorage.setItem('onboarding-responses', JSON.stringify(responses));
                  
                  if (onboardingStep === 3) {
                    createUserProfile(responses);
                  } else {
                    setOnboardingStep(onboardingStep + 1);
                  }
                }}
                className="flex-1"
              >
                {onboardingStep === 3 ? 'Finalizar' : 'Próximo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header com Avatar e Micro-feedback */}
      <Card className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {renderAvatar('large')}
              <div>
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <p className="text-white/80 mt-1">
                  {user?.totalRitualsCompleted} práticas • {user?.streak} dias consecutivos
                </p>
                <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-medium">💫 {microFeedback}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setAiChatOpen(true)}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Conversar com {currentArchetype.name.split(' - ')[0]}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tríade Dinâmica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            Sua Tríade Essencial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {renderTriadVisualization()}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">Energia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={user?.triadScores.energia ? user.triadScores.energia * 10 : 50} className="w-20" />
                  <span className="text-sm font-bold">{user?.triadScores.energia}/10</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">Coerência</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={user?.triadScores.coerencia ? user.triadScores.coerencia * 10 : 50} className="w-20" />
                  <span className="text-sm font-bold">{user?.triadScores.coerencia}/10</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold">Consciência</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={user?.triadScores.consciencia ? user.triadScores.consciencia * 10 : 50} className="w-20" />
                  <span className="text-sm font-bold">{user?.triadScores.consciencia}/10</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portais Contextuais */}
      {availablePortals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-indigo-600" />
              Portais Recomendados
            </CardTitle>
            <p className="text-gray-600">Práticas selecionadas baseadas no seu estado atual</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePortals.slice(0, 3).map(portal => (
                <div 
                  key={portal.id}
                  className={`p-6 rounded-xl bg-gradient-to-br ${portal.color} text-white cursor-pointer transform hover:scale-105 transition-all`}
                  onClick={() => {
                    setActivePortal(portal);
                    setCurrentFlow('portal');
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                        {portal.type === 'principal' ? 'Principal' : 'Secundário'}
                      </Badge>
                      <h3 className="text-lg font-bold">{portal.name}</h3>
                    </div>
                    <div className="text-2xl">
                      {portal.practice.type === 'respiracao' && '🫁'}
                      {portal.practice.type === 'meditacao' && '🧘'}
                      {portal.practice.type === 'movimento' && '🏃'}
                      {portal.practice.type === 'diario' && '📝'}
                      {portal.practice.type === 'reflexao' && '💭'}
                    </div>
                  </div>
                  
                  <p className="text-sm opacity-90 mb-3">{portal.microFeedback}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{portal.practice.duration} min</span>
                    <Play className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Minorstones */}
      {user?.minorstones && user.minorstones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Suas Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MINORSTONES.filter(m => m.unlocked).map(minorstone => (
                <div key={minorstone.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-800">{minorstone.title}</h4>
                      <p className="text-sm text-yellow-600">{minorstone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Compass className="w-5 h-5 mr-2 text-blue-600" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
              onClick={() => setCurrentFlow('diary')}
            >
              <Book className="w-6 h-6 mb-2 text-green-600" />
              <span className="text-sm">Diário Guiado</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
              onClick={() => setAiChatOpen(true)}
            >
              <MessageCircle className="w-6 h-6 mb-2 text-purple-600" />
              <span className="text-sm">Chat IA</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col bg-red-50 border-red-200"
            >
              <LifeBuoy className="w-6 h-6 mb-2 text-red-600" />
              <span className="text-sm">SOS</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col"
              onClick={() => setCurrentFlow('community')}
            >
              <TrendingUp className="w-6 h-6 mb-2 text-indigo-600" />
              <span className="text-sm">Comunidade</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPortal = () => {
    if (!activePortal) return null;

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <div className="text-3xl mr-3">
                  {activePortal.practice.type === 'respiracao' && '🫁'}
                  {activePortal.practice.type === 'meditacao' && '🧘'}
                  {activePortal.practice.type === 'movimento' && '🏃'}
                  {activePortal.practice.type === 'diario' && '📝'}
                  {activePortal.practice.type === 'reflexao' && '💭'}
                </div>
                {activePortal.name}
              </CardTitle>
              <p className="text-gray-600 mt-1">{activePortal.microFeedback}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setActivePortal(null);
                setCurrentFlow('dashboard');
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Player if available */}
          {activePortal.practice.videoUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
              <iframe
                src={activePortal.practice.videoUrl}
                title={activePortal.name}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Practice Instructions */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-bold mb-4 text-lg">Instruções da Prática:</h4>
            <ol className="list-decimal list-inside space-y-2">
              {activePortal.practice.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>

          {/* Practice Timer */}
          <div className="text-center">
            {!isTimerActive ? (
              <Button 
                onClick={() => startTimer(activePortal.practice.duration * 60, () => completePortal(activePortal))}
                className={`bg-gradient-to-r ${activePortal.color} text-white px-8 py-4 text-lg`}
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Prática ({activePortal.practice.duration} min)
              </Button>
            ) : (
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white max-w-sm mx-auto">
                <CardContent className="text-center py-8">
                  <div className="text-4xl mb-4">⏱️</div>
                  <div className="text-3xl font-bold mb-2">
                    {Math.floor(currentTimer / 60)}:{(currentTimer % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-blue-100">Prática em andamento...</p>
                  <Button 
                    variant="outline" 
                    onClick={stopTimer}
                    className="mt-4 text-blue-600"
                  >
                    Parar Timer
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-green-50 p-6 rounded-xl">
            <h4 className="font-bold mb-3 text-lg text-green-800">Benefícios desta prática:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activePortal.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderDiary = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center">
            <Book className="w-6 h-6 mr-3 text-green-600" />
            Diário Guiado
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setCurrentFlow('dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-bold mb-4 text-green-800">Reflexões Guiadas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTEXTUAL_PORTALS.find(p => p.id === 'portal-diario')?.practice.instructions.map((prompt, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <p className="text-sm font-medium text-green-700">💭 {prompt}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="diary-entry" className="text-lg font-semibold mb-4 block">
            Sua reflexão de hoje:
          </Label>
          <textarea
            id="diary-entry"
            value={diaryEntry}
            onChange={(e) => setDiaryEntry(e.target.value)}
            placeholder="Escreva aqui suas reflexões, pensamentos e insights do dia..."
            className="w-full h-64 p-4 border rounded-xl resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="flex space-x-4">
          <Button 
            onClick={() => {
              // Save diary entry logic here
              console.log('Diary saved:', diaryEntry);
              setDiaryEntry('');
              setCurrentFlow('dashboard');
            }}
            className="bg-gradient-to-r from-green-600 to-blue-600 flex-1"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Salvar Reflexão
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setAiChatOpen(true)}
            className="flex-1"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Conversar sobre isso
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAIChat = () => {
    if (!aiChatOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-3xl h-[85vh] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{currentArchetype.avatar}</div>
                <div>
                  <CardTitle>{currentArchetype.name}</CardTitle>
                  <p className="text-sm text-gray-600">{currentArchetype.personality}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAiChatOpen(false)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="text-6xl mb-4">{currentArchetype.avatar}</div>
                <h3 className="text-lg font-semibold mb-2">{currentArchetype.name}</h3>
                <p className="mb-4">{currentArchetype.responseStyle}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{microFeedback}</p>
                </div>
              </div>
            )}
            
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isAiLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <div className="border-t p-4">
            <div className="flex space-x-2 mb-3">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAIMessage(chatInput)}
                placeholder={`Converse com ${currentArchetype.name}...`}
                disabled={isAiLoading}
                className="flex-1"
              />
              <Button
                onClick={() => sendAIMessage(chatInput)}
                disabled={isAiLoading || !chatInput.trim()}
              >
                Enviar
              </Button>
            </div>
            
            <div className="flex justify-center space-x-2">
              {AI_ARCHETYPES.map(archetype => (
                <Button
                  key={archetype.id}
                  variant={currentArchetype.id === archetype.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentArchetype(archetype)}
                  className="text-xs"
                >
                  {archetype.avatar} {archetype.name.split(' - ')[0]}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // ========================================
  // EFFECTS
  // ========================================

  useEffect(() => {
    const savedUser = localStorage.getItem('essentia-definitive-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setCurrentArchetype(AI_ARCHETYPES.find(a => a.id === userData.preferences?.aiArchetype) || AI_ARCHETYPES[0]);
        const portals = evaluateContextualPortals(userData.triadScores);
        setAvailablePortals(portals);
        setMicroFeedback(generateMicroFeedback(userData.triadScores, currentArchetype));
        setCurrentFlow('dashboard');
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Update micro-feedback when archetype changes
  useEffect(() => {
    if (user) {
      setMicroFeedback(generateMicroFeedback(user.triadScores, currentArchetype));
    }
  }, [currentArchetype, user]);

  // ========================================
  // MAIN RENDER
  // ========================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              {currentFlow !== 'onboarding' && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentFlow('dashboard')}
                  className="mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              )}
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Essentia Definitiva
              </h1>
              <p className="text-gray-600 mt-1">Sua jornada de crescimento pessoal completa</p>
            </div>
            <div className="flex-1 text-right">
              {user && currentFlow === 'dashboard' && (
                <Badge variant="secondary" className="text-sm">
                  v3.8 • {currentArchetype.name.split(' - ')[0]}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentFlow === 'onboarding' && renderOnboarding()}
        {currentFlow === 'dashboard' && renderDashboard()}
        {currentFlow === 'portal' && renderPortal()}
        {currentFlow === 'diary' && renderDiary()}

        {/* AI Chat Modal */}
        {renderAIChat()}

        {/* Floating SOS Button */}
        {currentFlow === 'dashboard' && (
          <div className="fixed bottom-6 left-6">
            <Button
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <LifeBuoy className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}