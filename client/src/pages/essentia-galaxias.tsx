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
  Leaf,
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
  LifeBuoy
} from 'lucide-react';

// ========================================
// TYPES & INTERFACES (baseado nos documentos)
// ========================================

interface TriadScores {
  consciencia: number;  // 0-10 (conforme especificação)
  energia: number;      // 0-10 
  coerencia: number;    // 0-10
}

interface UserProfile {
  id: string;
  locale: string;
  reminderHour: number;
  dailyTimeBudgetMin: number;
  triadScores: TriadScores;
  streak: number;
  totalRitualsCompleted: number;
  lastPortalId?: string;
  lastCompletedAt?: Date;
  insights?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Persona {
  id: 'SOFIA' | 'MARCUS' | 'LUNA' | 'LEO';
  name: string;
  role: string;
  description: string;
  tone: string;
  useCase: string[];
  avatar: string;
}

interface Portal {
  id: 'consciencia' | 'gratidao' | 'coragem';
  name: string;
  purpose: string;
  closingPhrase: string;
  palette: {
    from: string;
    to: string;
  };
  totalDuration: number; // em segundos
  scenes: PortalScene[];
}

interface PortalScene {
  id: string;
  duration: number;
  visual: string;
  audio: string;
  narration: string;
  interactivePause?: {
    duration: number;
    instruction: string;
    type: 'breathing' | 'reflection' | 'action' | 'commitment';
  };
}

interface MicroPractice {
  id: string;
  title: string;
  category: 'reflexoes' | 'mindfulness' | 'contemplacao' | 'espiritualidade' | 'proposito' | 'sos';
  duration: number;
  instruction: string;
  steps?: string[];
  ambientSound?: string;
}

interface RecommendationRule {
  ruleId: string;
  condition: any;
  action: {
    type: 'practice' | 'portal' | 'reflection' | 'contemplation' | 'purpose' | 'spirituality' | 'sos';
    id: string;
    persona: 'SOFIA' | 'MARCUS' | 'LUNA' | 'LEO';
  };
  cooldownHours: number;
  priority: number;
}

// ========================================
// DADOS FIXOS (baseado nas especificações)
// ========================================

const PERSONAS: Persona[] = [
  {
    id: 'SOFIA',
    name: 'Sofia',
    role: 'Empatia',
    description: 'Acolhe, reflete e regula emoções',
    tone: 'acolhedor, compassivo. Foque em nomear emoções e oferecer segurança.',
    useCase: ['SOS', 'Reflexões', 'fechamento de portais'],
    avatar: '🌸'
  },
  {
    id: 'MARCUS',
    name: 'Marcus',
    role: 'Estratégia',
    description: 'Define micro-ação, prioriza clareza e execução',
    tone: 'direto e estratégico. Transforme objetivo em micro-ação acionável hoje.',
    useCase: ['Propósito', 'próximos passos'],
    avatar: '🎯'
  },
  {
    id: 'LUNA',
    name: 'Luna',
    role: 'Intuição',
    description: 'Amplia significado, conecta símbolos/natureza',
    tone: 'poético e intuitivo. Traga símbolos, natureza e conexão com o todo.',
    useCase: ['Contemplação', 'Espiritualidade'],
    avatar: '🌙'
  },
  {
    id: 'LEO',
    name: 'Leo',
    role: 'Rotina',
    description: 'Lembra, consolida hábitos, protege streak',
    tone: 'prático e consistente. Reforce rotina, streak e mínimos viáveis diários.',
    useCase: ['Mindfulness', 'lembretes'],
    avatar: '⚡'
  }
];

const PORTALS: Portal[] = [
  {
    id: 'consciencia',
    name: 'Portal da Consciência',
    purpose: 'Despertar para o momento presente e treinar atenção plena em atos simples',
    closingPhrase: 'Eu sou a minha consciência. Eu sou a minha presença.',
    palette: {
      from: '#8FA3FF',
      to: '#B5FFC8'
    },
    totalDuration: 420, // 7 minutos
    scenes: [
      {
        id: 'piloto_automatico',
        duration: 40,
        visual: 'Avatar atravessa rua movimentada; tudo embaçado nas bordas, rastro de luz nas pessoas e carros.',
        audio: 'Camada urbana abafada + batimentos acelerados; respiração curta.',
        narration: 'Reconheça a pressa. Veja como sua atenção foi sequestrada.',
        interactivePause: {
          duration: 45,
          instruction: 'Siga o box breathing por 3 ciclos. Toque no contador a cada transição (inspire/segure/expire/segure).',
          type: 'breathing'
        }
      },
      {
        id: 'ancora_agora',
        duration: 60,
        visual: 'Avatar para, fecha os olhos, inspira; as cores voltam; luz suave acende no peito.',
        audio: 'Sinos cristalinos; som de respiração ritmada 4–4; ruído urbano reduz 70%.',
        narration: 'Sua âncora é a respiração. Inspire por quatro, segure por quatro, expire por quatro, segure por quatro.',
        interactivePause: {
          duration: 60,
          instruction: 'Escreva: 5 coisas que vê, 4 que toca, 3 que ouve, 2 cheiros, 1 sabor. Salve no diário.',
          type: 'reflection'
        }
      },
      {
        id: 'toque_consciente',
        duration: 55,
        visual: 'Close na mão tocando uma folha/pedra; macro de textura, luz, sombra; micro‑partículas flutuam.',
        audio: 'Melodia mínima (cordas), plano de fundo natural (pássaros leves).',
        narration: 'Traga sua mente para os sentidos. Um gesto presente transforma o mundo à sua volta.',
        interactivePause: {
          duration: 45,
          instruction: 'Em uma frase: "O que eu estou realmente sentindo agora?"',
          type: 'reflection'
        }
      }
    ]
  },
  {
    id: 'gratidao',
    name: 'Portal da Gratidão',
    purpose: 'Mudar o foco de carência para plenitude, criando um ciclo virtuoso de abundância',
    closingPhrase: 'Minha gratidão abre a porta da abundância.',
    palette: {
      from: '#AAAAAA',
      to: '#CBA46A'
    },
    totalDuration: 420,
    scenes: [
      {
        id: 'escassez_percebida',
        duration: 40,
        visual: 'Cenário dessaturado; avatar de mãos vazias, olhar baixo; objetos sem cor.',
        audio: 'Carrilhão metálico rarefeito; silêncio com leve reverberação.',
        narration: 'Perceba o foco no que falta. Reconheça a carência que nublou sua visão.',
        interactivePause: {
          duration: 45,
          instruction: 'Liste três coisas de hoje pelas quais é grato. Uma deve ser bem pequena.',
          type: 'reflection'
        }
      },
      {
        id: 'coracao_acende',
        duration: 60,
        visual: 'Mão no peito; luz pulsa junto ao batimento; cores voltam em suaves ondas ao redor.',
        audio: 'Sinos leves + cordas quentes; batida cardíaca estabiliza.',
        narration: 'A gratidão é sua luz interna. Deixe-a iluminar o que já existe.',
        interactivePause: {
          duration: 60,
          instruction: 'Escreva 2 frases para alguém (ou para si) expressando gratidão concreta.',
          type: 'reflection'
        }
      },
      {
        id: 'florescer_entorno',
        duration: 70,
        visual: 'O ambiente "floresce": plantas, luz e vida retornam; câmera gira lentamente 360º.',
        audio: 'Melodia ascendente; som de brisa e folhas.',
        narration: 'O que você foca, se expande. Agradeça e veja o mundo florescer.',
        interactivePause: {
          duration: 30,
          instruction: 'Relaxe a face e sustente um sorriso leve por 30s. Observe o efeito no corpo.',
          type: 'action'
        }
      }
    ]
  },
  {
    id: 'coragem',
    name: 'Portal da Coragem',
    purpose: 'Desbloquear ação autêntica diante de incertezas, transformando medo em movimento',
    closingPhrase: 'Eu ajo com coragem. Eu ajo apesar do medo.',
    palette: {
      from: '#1C2541',
      to: '#F2C14E'
    },
    totalDuration: 420,
    scenes: [
      {
        id: 'encarar_abismo',
        duration: 50,
        visual: 'Avatar na beira de um penhasco; vento forte; noite com relâmpagos distantes.',
        audio: 'Vento grave + tambores lentos; respiração audível.',
        narration: 'Sinta o medo que te paralisa. Nomeie-o. Ele não define quem você é.',
        interactivePause: {
          duration: 45,
          instruction: 'Escreva: "Estou com medo de…" (uma frase). Depois: "Mesmo assim, escolho…"',
          type: 'reflection'
        }
      },
      {
        id: 'chama_peito',
        duration: 65,
        visual: 'Close no peito: uma chama dourada surge e cresce; o entorno escurecido ganha contornos.',
        audio: 'Tambores diminuem; entra melodia tribal suave e pulsante.',
        narration: 'A coragem já vive em você. Dê espaço para ela crescer com a sua respiração.',
        interactivePause: {
          duration: 45,
          instruction: 'Em pé, ombros abertos, pés firmes, 45s em silêncio atento à respiração.',
          type: 'action'
        }
      },
      {
        id: 'passo_decisivo',
        duration: 60,
        visual: 'O avatar dá um passo; surge uma ponte de luz; cada passo firma a ponte e ilumina o abismo.',
        audio: 'Música ascendente; respiração estabiliza; vento suaviza.',
        narration: 'Um passo de cada vez. Caminhe apesar do medo. O caminho aparece com o passo.',
        interactivePause: {
          duration: 45,
          instruction: 'Defina um micro‑passo que fará hoje (≤5 min). Registre no diário.',
          type: 'commitment'
        }
      }
    ]
  }
];

const MICRO_PRACTICES: MicroPractice[] = [
  // Reflexões Rápidas
  {
    id: 'reflexao_melhor_momento',
    title: 'Melhor Momento do Dia',
    category: 'reflexoes',
    duration: 45,
    instruction: 'Qual foi o melhor momento do seu dia até agora? Por quê?'
  },
  {
    id: 'reflexao_5min_melhor',
    title: 'Micro-ação de Bem-estar',
    category: 'reflexoes',
    duration: 45,
    instruction: 'O que você pode fazer em 5 minutos para se sentir 1% melhor?'
  },
  {
    id: 'reflexao_emocao_corpo',
    title: 'Emoção no Corpo',
    category: 'reflexoes',
    duration: 45,
    instruction: 'Qual emoção está mais presente agora? Onde ela aparece no corpo?'
  },
  {
    id: 'reflexao_proposito_acao',
    title: 'Ação de Propósito',
    category: 'reflexoes',
    duration: 45,
    instruction: 'Qual pequena ação de hoje te aproximou do seu propósito?'
  },
  
  // Mindfulness (Presença)
  {
    id: 'mindfulness_2min',
    title: 'Respiração no Quadrado (2 min)',
    category: 'mindfulness',
    duration: 120,
    instruction: 'Respiração no Quadrado (4-4-4-4): guia por 3 ciclos.',
    steps: [
      'Inspire contando até 4',
      'Segure a respiração por 4',
      'Expire contando até 4', 
      'Segure vazio por 4',
      'Observe sem julgar'
    ]
  },
  {
    id: 'mindfulness_5min',
    title: 'Escaneamento Corporal (5 min)',
    category: 'mindfulness',
    duration: 300,
    instruction: 'Escaneamento Corporal: pés→cabeça em 8 etapas.',
    steps: [
      'Leve a atenção aos pés',
      'Sinta as panturrilhas',
      'Observe os joelhos',
      'Escaneie as coxas',
      'Sinta o abdômen',
      'Observe o peito',
      'Escaneie os braços',
      'Sinta até o topo da cabeça'
    ]
  },
  
  // Contemplação da Natureza
  {
    id: 'contemplacao_ceu',
    title: 'Contemplação do Céu',
    category: 'contemplacao',
    duration: 90,
    instruction: 'Observe camadas de cor/movimento. Nomeie 3 tons.',
    ambientSound: 'vento_leve'
  },
  {
    id: 'contemplacao_arvore',
    title: 'Contemplação da Árvore',
    category: 'contemplacao',
    duration: 90,
    instruction: 'Observe textura, sombras e variações.',
    ambientSound: 'folhas_passaros'
  },
  {
    id: 'contemplacao_agua',
    title: 'Contemplação da Água',
    category: 'contemplacao',
    duration: 90,
    instruction: 'Observe padrões de fluxo/ondas. Sincronize respiração com o som.',
    ambientSound: 'agua_corrente'
  }
];

const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    ruleId: 'E_LOW',
    condition: { 'triad.energia': { lte: 4 } },
    action: { type: 'practice', id: 'mindfulness_2min', persona: 'LEO' },
    cooldownHours: 12,
    priority: 90
  },
  {
    ruleId: 'C_LOW',
    condition: { 'triad.consciencia': { lte: 4 } },
    action: { type: 'portal', id: 'consciencia', persona: 'MARCUS' },
    cooldownHours: 20,
    priority: 80
  },
  {
    ruleId: 'CO_LOW',
    condition: { 'triad.coerencia': { lte: 4 } },
    action: { type: 'contemplation', id: 'contemplacao_arvore', persona: 'SOFIA' },
    cooldownHours: 16,
    priority: 80
  }
];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export default function EssentiaGalaxias() {
  // Estados principais
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentFlow, setCurrentFlow] = useState<'onboarding' | 'triad-check' | 'recommendation' | 'portal' | 'practice' | 'dashboard'>('onboarding');
  
  // Estados do onboarding
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [preferences, setPreferences] = useState({
    locale: 'pt-BR',
    reminderHour: 8,
    dailyTimeBudgetMin: 10
  });
  
  // Estados da tríade
  const [triadAnswers, setTriadAnswers] = useState<Record<string, number>>({});
  
  // Estados do sistema
  const [activePortal, setActivePortal] = useState<Portal | null>(null);
  const [activePractice, setActivePractice] = useState<MicroPractice | null>(null);
  const [currentRecommendation, setCurrentRecommendation] = useState<any>(null);
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  
  // Estados de UI
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [practiceNote, setPracticeNote] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Estados de IA Coach
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ========================================
  // MOTOR DE RECOMENDAÇÃO
  // ========================================
  
  const getRecommendation = (triadScores: TriadScores, lastPortalId?: string): any => {
    const rules = RECOMMENDATION_RULES.filter(rule => {
      // Verificar condições simples
      if (rule.condition['triad.energia']?.lte && triadScores.energia > rule.condition['triad.energia'].lte) {
        return false;
      }
      if (rule.condition['triad.consciencia']?.lte && triadScores.consciencia > rule.condition['triad.consciencia'].lte) {
        return false;
      }
      if (rule.condition['triad.coerencia']?.lte && triadScores.coerencia > rule.condition['triad.coerencia'].lte) {
        return false;
      }
      
      // Cooldown check (simplificado para MVP)
      if (lastPortalId === rule.action.id) {
        return false;
      }
      
      return true;
    });
    
    // Ordenar por prioridade
    rules.sort((a, b) => b.priority - a.priority);
    
    if (rules.length > 0) {
      const rule = rules[0];
      const persona = PERSONAS.find(p => p.id === rule.action.persona) || PERSONAS[0];
      
      return {
        rule,
        persona,
        type: rule.action.type,
        target: rule.action.type === 'portal' 
          ? PORTALS.find(p => p.id === rule.action.id)
          : MICRO_PRACTICES.find(p => p.id === rule.action.id)
      };
    }
    
    return null;
  };

  // ========================================
  // SISTEMA DE TIMER
  // ========================================
  
  const startTimer = (duration: number, onComplete?: () => void) => {
    setCurrentTimer(duration);
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
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ========================================
  // INTEGRAÇÃO COM IA (API REAL)
  // ========================================
  
  const sendAIMessage = async (message: string) => {
    if (!user || !message.trim()) return;
    
    setIsAiLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    setChatInput('');
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context: {
            triad: user.triadScores,
            streak: user.streak,
            lastPortalId: user.lastPortalId,
            totalRitualsCompleted: user.totalRitualsCompleted
          },
          persona: activePersona.id
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }]);
      } else {
        throw new Error('Erro na comunicação com IA');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem para IA:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, estou enfrentando dificuldades técnicas. Tente novamente em alguns instantes.' 
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // ========================================
  // HANDLERS DO FLUXO
  // ========================================
  
  const handleOnboardingComplete = () => {
    const triadScores = calculateTriadFromAnswers();
    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      locale: preferences.locale,
      reminderHour: preferences.reminderHour,
      dailyTimeBudgetMin: preferences.dailyTimeBudgetMin,
      triadScores,
      streak: 0,
      totalRitualsCompleted: 0,
      insights: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('essentia-galaxias-user', JSON.stringify(newUser));
    setCurrentFlow('recommendation');
    
    // Gerar primeira recomendação
    const recommendation = getRecommendation(triadScores);
    setCurrentRecommendation(recommendation);
    if (recommendation) {
      setActivePersona(recommendation.persona);
    }
  };
  
  const calculateTriadFromAnswers = (): TriadScores => {
    // Simplificado - calcular baseado nas respostas
    const consciencia = Math.round((triadAnswers.c1 || 5) + (triadAnswers.c2 || 5)) / 2;
    const energia = Math.round((triadAnswers.e1 || 5) + (triadAnswers.e2 || 5)) / 2;
    const coerencia = Math.round((triadAnswers.h1 || 5) + (triadAnswers.h2 || 5)) / 2;
    
    return { consciencia, energia, coerencia };
  };
  
  const handleAcceptRecommendation = () => {
    if (!currentRecommendation) return;
    
    if (currentRecommendation.type === 'portal') {
      setActivePortal(currentRecommendation.target);
      setCurrentFlow('portal');
    } else {
      setActivePractice(currentRecommendation.target);
      setCurrentFlow('practice');
      startTimer(currentRecommendation.target.duration, () => {
        handlePracticeComplete();
      });
    }
  };
  
  const handlePracticeComplete = () => {
    if (!user || !activePractice) return;
    
    // Atualizar usuário
    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1,
      lastCompletedAt: new Date(),
      updatedAt: new Date()
    };
    
    if (practiceNote.trim()) {
      updatedUser.insights = [...(user.insights || []), practiceNote.trim()];
    }
    
    setUser(updatedUser);
    localStorage.setItem('essentia-galaxias-user', JSON.stringify(updatedUser));
    
    // Resetar estados
    setActivePractice(null);
    setPracticeNote('');
    setCurrentFlow('dashboard');
  };
  
  const handlePortalComplete = () => {
    if (!user || !activePortal) return;
    
    // Aplicar reforço simbólico na tríade
    const triadBoost = {
      consciencia: activePortal.id === 'consciencia' ? 1 : 0,
      gratidao: activePortal.id === 'gratidao' ? 1 : 0,
      coragem: activePortal.id === 'coragem' ? 1 : 0
    };
    
    const updatedTriad = {
      consciencia: Math.min(10, user.triadScores.consciencia + triadBoost.consciencia),
      energia: Math.min(10, user.triadScores.energia + (activePortal.id === 'gratidao' ? 1 : 0)),
      coerencia: Math.min(10, user.triadScores.coerencia + (activePortal.id === 'coragem' ? 1 : 0))
    };
    
    const updatedUser = {
      ...user,
      triadScores: updatedTriad,
      lastPortalId: activePortal.id,
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1,
      lastCompletedAt: new Date(),
      updatedAt: new Date()
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-galaxias-user', JSON.stringify(updatedUser));
    
    setActivePortal(null);
    setCurrentFlow('dashboard');
  };

  // ========================================
  // CARREGAR DADOS SALVOS
  // ========================================
  
  useEffect(() => {
    const savedUser = localStorage.getItem('essentia-galaxias-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setCurrentFlow('dashboard');
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }, []);

  // ========================================
  // COMPONENTES DE RENDERIZAÇÃO
  // ========================================
  
  const renderOnboarding = () => {
    const steps = [
      'Boas-vindas',
      'Preferências',
      'Tríade - Consciência',
      'Tríade - Energia', 
      'Tríade - Coerência',
      'Conclusão'
    ];
    
    if (onboardingStep === 0) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Bem-vindo ao Essentia Galáxias ✨
            </CardTitle>
            <p className="text-gray-600 mt-4">
              Sua jornada de crescimento pessoal baseada na Tríade Essencial. 
              Vamos calibrar seu perfil em alguns passos simples.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Seus dados são privados</h4>
                <p className="text-blue-700 text-sm">
                  Seguimos a LGPD. Seus dados ficam apenas no seu dispositivo e são usados 
                  exclusivamente para personalizar sua experiência.
                </p>
              </div>
              
              <Button 
                onClick={() => setOnboardingStep(1)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
                size="lg"
              >
                Aceitar e Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    if (onboardingStep === 1) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Suas Preferências</CardTitle>
            <p className="text-gray-600">Como você prefere usar o Essentia?</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Tempo disponível por dia</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[5, 10, 15].map(time => (
                  <Button
                    key={time}
                    variant={preferences.dailyTimeBudgetMin === time ? "default" : "outline"}
                    onClick={() => setPreferences(prev => ({ ...prev, dailyTimeBudgetMin: time }))}
                  >
                    {time} min
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Horário preferido para lembretes</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[8, 12, 17, 20].map(hour => (
                  <Button
                    key={hour}
                    variant={preferences.reminderHour === hour ? "default" : "outline"}
                    onClick={() => setPreferences(prev => ({ ...prev, reminderHour: hour }))}
                    size="sm"
                  >
                    {hour}h
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => setOnboardingStep(2)}
              className="w-full"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    // Perguntas da Tríade (steps 2-4)
    if (onboardingStep >= 2 && onboardingStep <= 4) {
      const triadQuestions = [
        {
          category: 'consciencia',
          icon: Brain,
          color: 'purple',
          question: 'Quanta presença você sentiu hoje?',
          description: 'Avalie seu nível de consciência e atenção plena'
        },
        {
          category: 'energia', 
          icon: Zap,
          color: 'yellow',
          question: 'Quanta vitalidade você sente agora?',
          description: 'Como está sua energia física e mental'
        },
        {
          category: 'coerencia',
          icon: Heart, 
          color: 'red',
          question: 'Suas ações refletem seus valores hoje?',
          description: 'Nível de alinhamento entre o que você acredita e faz'
        }
      ];
      
      const currentQ = triadQuestions[onboardingStep - 2];
      const IconComponent = currentQ.icon;
      
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${currentQ.color}-100 flex items-center justify-center`}>
              <IconComponent className={`w-8 h-8 text-${currentQ.color}-600`} />
            </div>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            <p className="text-gray-600">{currentQ.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                <Button
                  key={value}
                  variant={triadAnswers[currentQ.category] === value ? "default" : "outline"}
                  onClick={() => {
                    setTriadAnswers(prev => ({ ...prev, [currentQ.category]: value }));
                    setTimeout(() => {
                      if (onboardingStep === 4) {
                        setOnboardingStep(5);
                      } else {
                        setOnboardingStep(prev => prev + 1);
                      }
                    }, 300);
                  }}
                  className="w-full justify-between"
                >
                  <span>{value}/10</span>
                  {value <= 3 && <span className="text-sm opacity-70">Baixo</span>}
                  {value >= 4 && value <= 7 && <span className="text-sm opacity-70">Moderado</span>}
                  {value >= 8 && <span className="text-sm opacity-70">Alto</span>}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }
    
    // Conclusão (step 5)
    if (onboardingStep === 5) {
      const scores = calculateTriadFromAnswers();
      
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sua Tríade Essencial</CardTitle>
            <p className="text-gray-600 mt-2">
              Seu perfil inicial foi calibrado. Vamos começar!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Brain className="w-10 h-10 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Consciência</h3>
                <div className="text-2xl font-bold text-purple-600 mt-1">{scores.consciencia}/10</div>
                <Progress value={scores.consciencia * 10} className="mt-2" />
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Zap className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">Energia</h3>
                <div className="text-2xl font-bold text-yellow-600 mt-1">{scores.energia}/10</div>
                <Progress value={scores.energia * 10} className="mt-2" />
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="w-10 h-10 mx-auto mb-2 text-red-600" />
                <h3 className="font-semibold text-red-800">Coerência</h3>
                <div className="text-2xl font-bold text-red-600 mt-1">{scores.coerencia}/10</div>
                <Progress value={scores.coerencia * 10} className="mt-2" />
              </div>
            </div>
            
            <Button 
              onClick={handleOnboardingComplete}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
              size="lg"
            >
              Iniciar Jornada Essentia
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      );
    }
  };
  
  const renderRecommendation = () => {
    if (!currentRecommendation) return null;
    
    const { persona, type, target } = currentRecommendation;
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{persona.avatar}</div>
            <div>
              <CardTitle>{persona.name} recomenda:</CardTitle>
              <p className="text-gray-600">{persona.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">{target.name || target.title}</h3>
            <p className="text-gray-700 mb-4">
              {target.purpose || target.instruction}
            </p>
            {target.duration && (
              <div className="flex items-center text-sm text-gray-600">
                <Timer className="w-4 h-4 mr-1" />
                {Math.round(target.duration / 60)} minutos
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleAcceptRecommendation}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Aceitar Recomendação
              <Play className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setCurrentFlow('dashboard')}
            >
              Pular
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderPortal = () => {
    if (!activePortal) return null;
    
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{activePortal.name}</CardTitle>
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
          <p className="text-gray-600">{activePortal.purpose}</p>
        </CardHeader>
        <CardContent>
          <div 
            className="relative h-96 rounded-lg mb-6 flex items-center justify-center text-white"
            style={{
              background: `linear-gradient(135deg, ${activePortal.palette.from}, ${activePortal.palette.to})`
            }}
          >
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">
                {activePortal.id === 'consciencia' && '🧠'}
                {activePortal.id === 'gratidao' && '🙏'}
                {activePortal.id === 'coragem' && '🦁'}
              </div>
              
              {!isPlaying ? (
                <Button 
                  onClick={() => setIsPlaying(true)}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Iniciar Experiência
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg">Experiência em andamento...</div>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      onClick={() => setIsPlaying(false)}
                      variant="outline"
                      className="bg-white/20 border-white/30"
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                    {soundEnabled ? (
                      <Button
                        onClick={() => setSoundEnabled(false)}
                        variant="outline"
                        className="bg-white/20 border-white/30"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setSoundEnabled(true)}
                        variant="outline"
                        className="bg-white/20 border-white/30"
                      >
                        <VolumeX className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Frase de Encerramento:</h4>
            <p className="text-gray-700 italic">"{activePortal.closingPhrase}"</p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handlePortalComplete}
              className="bg-gradient-to-r from-green-600 to-blue-600"
              size="lg"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Completar Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderPractice = () => {
    if (!activePractice) return null;
    
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{activePractice.title}</CardTitle>
            <Button
              variant="outline"
              onClick={() => {
                stopTimer();
                setActivePractice(null);
                setCurrentFlow('dashboard');
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {isTimerActive ? '⏱️' : '✅'}
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatTime(currentTimer)}
            </div>
            <p className="text-gray-600">{activePractice.instruction}</p>
          </div>
          
          {activePractice.steps && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Passos:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {activePractice.steps.map((step, index) => (
                  <li key={index} className="text-blue-800">{step}</li>
                ))}
              </ol>
            </div>
          )}
          
          <div className="space-y-3">
            <Label htmlFor="practice-note">Notas da prática (opcional):</Label>
            <Input
              id="practice-note"
              value={practiceNote}
              onChange={(e) => setPracticeNote(e.target.value)}
              placeholder="Como foi esta experiência para você?"
            />
          </div>
          
          <div className="flex space-x-3">
            {!isTimerActive && currentTimer === 0 ? (
              <Button 
                onClick={handlePracticeComplete}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Concluir Prática
              </Button>
            ) : (
              <Button 
                onClick={() => stopTimer()}
                variant="outline"
                className="flex-1"
              >
                Parar Timer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderDashboard = () => {
    if (!user) return null;
    
    return (
      <div className="space-y-6">
        {/* Header com Tríade */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Sua Tríade Essencial</CardTitle>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="bg-white">
                  🔥 {user.streak} dias
                </Badge>
                <Button
                  onClick={() => setAiChatOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {activePersona.avatar} IA Coach
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-sm text-gray-600 mb-1">Consciência</div>
                <Progress value={user.triadScores.consciencia * 10} className="mb-2" />
                <div className="text-xl font-bold text-purple-600">{user.triadScores.consciencia}/10</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-sm text-gray-600 mb-1">Energia</div>
                <Progress value={user.triadScores.energia * 10} className="mb-2" />
                <div className="text-xl font-bold text-yellow-600">{user.triadScores.energia}/10</div>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-sm text-gray-600 mb-1">Coerência</div>
                <Progress value={user.triadScores.coerencia * 10} className="mb-2" />
                <div className="text-xl font-bold text-red-600">{user.triadScores.coerencia}/10</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => {
                  const recommendation = getRecommendation(user.triadScores, user.lastPortalId);
                  setCurrentRecommendation(recommendation);
                  setCurrentFlow('recommendation');
                }}
                variant="outline"
                className="h-20 flex-col"
              >
                <Target className="w-6 h-6 mb-1" />
                Nova Recomendação
              </Button>
              
              <Button
                onClick={() => {
                  setActivePortal(PORTALS[0]);
                  setCurrentFlow('portal');
                }}
                variant="outline"
                className="h-20 flex-col"
              >
                <Eye className="w-6 h-6 mb-1" />
                Portal Consciência
              </Button>
              
              <Button
                onClick={() => {
                  setActivePractice(MICRO_PRACTICES.find(p => p.id === 'mindfulness_2min')!);
                  setCurrentFlow('practice');
                  startTimer(120, handlePracticeComplete);
                }}
                variant="outline"
                className="h-20 flex-col"
              >
                <Wind className="w-6 h-6 mb-1" />
                Mindfulness 2min
              </Button>
              
              <Button
                onClick={() => setAiChatOpen(true)}
                variant="outline"
                className="h-20 flex-col"
              >
                <MessageCircle className="w-6 h-6 mb-1" />
                IA Coach
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Portais Disponíveis */}
        <Card>
          <CardHeader>
            <CardTitle>Portais Cinematográficos</CardTitle>
            <p className="text-gray-600">Experiências imersivas de 5-8 minutos</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PORTALS.map(portal => (
                <Card 
                  key={portal.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setActivePortal(portal);
                    setCurrentFlow('portal');
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${portal.palette.from}, ${portal.palette.to})`
                      }}
                    >
                      {portal.id === 'consciencia' && '🧠'}
                      {portal.id === 'gratidao' && '🙏'}
                      {portal.id === 'coragem' && '🦁'}
                    </div>
                    <h3 className="font-semibold mb-2">{portal.name}</h3>
                    <p className="text-sm text-gray-600">{portal.purpose}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Micropráticas */}
        <Card>
          <CardHeader>
            <CardTitle>Abas Fixas & Micropráticas</CardTitle>
            <p className="text-gray-600">Práticas rápidas de 30 segundos a 5 minutos</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="reflexoes" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="reflexoes">Reflexões</TabsTrigger>
                <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
                <TabsTrigger value="contemplacao">Natureza</TabsTrigger>
                <TabsTrigger value="espiritualidade">Espirit.</TabsTrigger>
                <TabsTrigger value="proposito">Propósito</TabsTrigger>
                <TabsTrigger value="sos">SOS</TabsTrigger>
              </TabsList>
              
              {['reflexoes', 'mindfulness', 'contemplacao', 'espiritualidade', 'proposito', 'sos'].map(category => (
                <TabsContent key={category} value={category} className="space-y-3">
                  {MICRO_PRACTICES
                    .filter(practice => practice.category === category)
                    .map(practice => (
                      <Card 
                        key={practice.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          setActivePractice(practice);
                          setCurrentFlow('practice');
                          startTimer(practice.duration, handlePracticeComplete);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{practice.title}</h4>
                              <p className="text-sm text-gray-600">{practice.instruction}</p>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <div className="flex items-center">
                                <Timer className="w-4 h-4 mr-1" />
                                {Math.round(practice.duration / 60)}min
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{user.streak}</div>
                <div className="text-sm text-gray-600">Dias consecutivos</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{user.totalRitualsCompleted}</div>
                <div className="text-sm text-gray-600">Rituais completos</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">
                  {Math.round((user.triadScores.consciencia + user.triadScores.energia + user.triadScores.coerencia) / 3)}
                </div>
                <div className="text-sm text-gray-600">Tríade média</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24))}</div>
                <div className="text-sm text-gray-600">Dias na jornada</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const renderAIChat = () => {
    if (!aiChatOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{activePersona.avatar}</div>
                <div>
                  <CardTitle>{activePersona.name} - {activePersona.role}</CardTitle>
                  <p className="text-sm text-gray-600">{activePersona.description}</p>
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
                <div className="text-4xl mb-2">{activePersona.avatar}</div>
                <p>Olá! Sou {activePersona.name}. Como posso te ajudar hoje?</p>
              </div>
            )}
            
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
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
                <div className="bg-gray-100 p-3 rounded-lg">
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
            <div className="flex space-x-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAIMessage(chatInput)}
                placeholder={`Converse com ${activePersona.name}...`}
                disabled={isAiLoading}
              />
              <Button
                onClick={() => sendAIMessage(chatInput)}
                disabled={isAiLoading || !chatInput.trim()}
              >
                Enviar
              </Button>
            </div>
            
            <div className="flex justify-center space-x-2 mt-3">
              {PERSONAS.map(persona => (
                <Button
                  key={persona.id}
                  variant={activePersona.id === persona.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActivePersona(persona)}
                  className="text-xs"
                >
                  {persona.avatar} {persona.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // ========================================
  // RENDER PRINCIPAL
  // ========================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              {currentFlow !== 'onboarding' && (
                <Button 
                  onClick={() => setCurrentFlow('dashboard')}
                  variant="outline"
                  size="sm"
                >
                  ← Dashboard
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Essentia Galáxias ✨
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              {user && (
                <div className="text-right text-sm text-gray-600">
                  <div>🔥 {user.streak} dias</div>
                  <div>⭐ {user.totalRitualsCompleted} rituais</div>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-600">
            Sua jornada de crescimento pessoal baseada na Tríade Essencial
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-5xl mx-auto">
          {currentFlow === 'onboarding' && renderOnboarding()}
          {currentFlow === 'recommendation' && renderRecommendation()}
          {currentFlow === 'portal' && renderPortal()}
          {currentFlow === 'practice' && renderPractice()}
          {currentFlow === 'dashboard' && renderDashboard()}
        </div>
        
        {/* IA Chat Modal */}
        {renderAIChat()}
      </div>
    </div>
  );
}