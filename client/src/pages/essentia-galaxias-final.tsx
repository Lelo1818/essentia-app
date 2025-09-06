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
  LifeBuoy
} from 'lucide-react';

// ========================================
// TYPES & INTERFACES 
// ========================================

interface TriadScores {
  consciencia: number;  // 0-10
  energia: number;      // 0-10
  coerencia: number;    // 0-10
}

interface UserProfile {
  id: string;
  name: string;
  triadScores: TriadScores;
  streak: number;
  totalRitualsCompleted: number;
  lastPortalId?: string;
  lastCompletedAt?: Date;
  insights?: string[];
  preferences: {
    preferredTime: string;
    dailyGoal: string;
    focusArea: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
}

interface Portal {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  color: string;
  duration: string;
  benefits: string[];
}

interface TabContent {
  id: string;
  title: string;
  icon: any;
  content: string;
  practices: string[];
  videoUrl?: string;
}

// ========================================
// DATA CONSTANTS
// ========================================

const PERSONAS: Persona[] = [
  {
    id: 'SOFIA',
    name: 'Sofia',
    role: 'Empatia',
    description: 'Acolhe, reflete e regula emoções com compaixão',
    avatar: '🌸'
  },
  {
    id: 'MARCUS',
    name: 'Marcus',
    role: 'Estratégia',
    description: 'Define micro-ação, prioriza clareza e execução',
    avatar: '🎯'
  },
  {
    id: 'LUNA',
    name: 'Luna',
    role: 'Intuição',
    description: 'Amplia significado, conecta símbolos e natureza',
    avatar: '🌙'
  },
  {
    id: 'LEO',
    name: 'Leo',
    role: 'Rotina',
    description: 'Lembra, consolida hábitos, protege streak',
    avatar: '⚡'
  }
];

const PORTALS: Portal[] = [
  {
    id: 'consciencia',
    name: 'Portal da Consciência',
    description: 'Desperte sua percepção interior com práticas milenares de mindfulness',
    videoUrl: 'https://www.youtube.com/embed/YQP1xZqcrfE',
    color: 'from-blue-500 to-indigo-600',
    duration: '10-15 min',
    benefits: ['Maior clareza mental', 'Redução do stress', 'Presença ativa']
  },
  {
    id: 'gratidao',
    name: 'Portal da Gratidão',
    description: 'Cultive a abundância do coração e transforme sua perspectiva',
    videoUrl: 'https://www.youtube.com/embed/JMd1CcGZYwU',
    color: 'from-green-500 to-emerald-600',
    duration: '8-12 min',
    benefits: ['Aumento da felicidade', 'Melhores relacionamentos', 'Visão positiva']
  },
  {
    id: 'coragem',
    name: 'Portal da Coragem',
    description: 'Abrace sua força interior e supere limitações com confiança',
    videoUrl: 'https://www.youtube.com/embed/Ks-_Mh1QhMc',
    color: 'from-orange-500 to-red-600',
    duration: '12-18 min',
    benefits: ['Maior autoconfiança', 'Superação de medos', 'Força interior']
  }
];

const TAB_CONTENTS: TabContent[] = [
  {
    id: 'espiritualidade',
    title: 'Espiritualidade',
    icon: TreePine,
    content: 'Conecte-se com algo maior que você mesmo através de práticas contemplativas',
    practices: [
      'Meditação de conexão universal',
      'Contemplação da natureza',
      'Reflexão sobre propósito maior',
      'Prática de gratidão cósmica'
    ],
    videoUrl: 'https://www.youtube.com/embed/mMHVW7Vq_dA'
  },
  {
    id: 'proposito',
    title: 'Propósito',
    icon: Target,
    content: 'Descubra e alinhe-se com sua missão única nesta vida',
    practices: [
      'Reflexão sobre valores essenciais',
      'Visualização do futuro ideal',
      'Identificação de talentos únicos',
      'Planejamento de micro-ações'
    ],
    videoUrl: 'https://www.youtube.com/embed/u4ZoJKF_VuA'
  },
  {
    id: 'sos',
    title: 'SOS',
    icon: LifeBuoy,
    content: 'Ferramentas de emergência para momentos de crise emocional',
    practices: [
      'Respiração de emergência (4-7-8)',
      'Técnica de grounding 5-4-3-2-1',
      'Auto-compaixão em crise',
      'Conexão com rede de apoio'
    ],
    videoUrl: 'https://www.youtube.com/embed/YRPh_GaiL8s'
  }
];

const ONBOARDING_QUESTIONS = [
  {
    id: 1,
    question: 'Como você está se sentindo agora, neste momento?',
    type: 'scale',
    options: ['Muito mal', 'Mal', 'Neutro', 'Bem', 'Muito bem'],
    triadImpact: { consciencia: 1, energia: 0, coerencia: 0 }
  },
  {
    id: 2,
    question: 'Quanto você se conhece profundamente?',
    type: 'scale',
    options: ['Pouco', 'Um pouco', 'Razoável', 'Bem', 'Muito bem'],
    triadImpact: { consciencia: 2, energia: 0, coerencia: 0 }
  },
  {
    id: 3,
    question: 'Como está sua energia vital no dia a dia?',
    type: 'scale',
    options: ['Muito baixa', 'Baixa', 'Regular', 'Alta', 'Muito alta'],
    triadImpact: { consciencia: 0, energia: 2, coerencia: 0 }
  },
  {
    id: 4,
    question: 'Suas ações estão alinhadas com seus valores?',
    type: 'scale',
    options: ['Nada alinhadas', 'Pouco alinhadas', 'Razoáveis', 'Bem alinhadas', 'Muito alinhadas'],
    triadImpact: { consciencia: 0, energia: 0, coerencia: 2 }
  },
  {
    id: 5,
    question: 'Qual prática te chama mais atenção?',
    type: 'multiple',
    options: ['Meditação', 'Reflexão escrita', 'Exercícios respiratórios', 'Contemplação da natureza'],
    triadImpact: { consciencia: 1, energia: 1, coerencia: 1 }
  },
  {
    id: 6,
    question: 'Quanto tempo pode dedicar ao desenvolvimento pessoal?',
    type: 'multiple',
    options: ['2-5 minutos', '5-10 minutos', '10-20 minutos', '20-30 minutos'],
    triadImpact: { consciencia: 0, energia: 1, coerencia: 1 }
  }
];

// ========================================
// MAIN COMPONENT
// ========================================

export default function EssentiaGalaxiasFinal() {
  // States principais
  const [currentFlow, setCurrentFlow] = useState<'onboarding' | 'dashboard' | 'portal' | 'tab'>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Portal states
  const [activePortal, setActivePortal] = useState<Portal | null>(null);
  const [portalProgress, setPortalProgress] = useState(0);
  const [isPortalPlaying, setIsPortalPlaying] = useState(false);
  
  // Tab states
  const [activeTab, setActiveTab] = useState<TabContent | null>(null);
  
  // AI Chat states
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Timer states
  const [currentTimer, setCurrentTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ========================================
  // CORE FUNCTIONS
  // ========================================

  const createUser = (responses: any[]) => {
    let triadScores = { consciencia: 5, energia: 5, coerencia: 5 };
    let preferences = { preferredTime: 'manhã', dailyGoal: '10 minutos', focusArea: 'geral' };
    
    // Calculate triad based on responses
    responses.forEach(response => {
      if (response.triadImpact) {
        triadScores.consciencia += response.triadImpact.consciencia;
        triadScores.energia += response.triadImpact.energia;
        triadScores.coerencia += response.triadImpact.coerencia;
      }
    });
    
    // Clamp values between 0-10
    triadScores.consciencia = Math.min(10, Math.max(0, triadScores.consciencia));
    triadScores.energia = Math.min(10, Math.max(0, triadScores.energia));
    triadScores.coerencia = Math.min(10, Math.max(0, triadScores.coerencia));

    const newUser: UserProfile = {
      id: 'user_galaxias',
      name: 'Explorador Galáctico',
      triadScores,
      streak: 0,
      totalRitualsCompleted: 0,
      insights: [],
      preferences,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('essentia-galaxias-final-user', JSON.stringify(newUser));
    setCurrentFlow('dashboard');
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
          persona: activePersona.id,
          context: {
            triad: user?.triadScores,
            streak: user?.streak,
            totalRitualsCompleted: user?.totalRitualsCompleted
          }
        })
      });
      
      const data = await response.json();
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || `${activePersona.avatar} Olá! Como posso te ajudar na sua jornada hoje?`
      }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem para IA:', error);
      
      const fallbackResponses = {
        SOFIA: "🌸 Percebo que você precisa de acolhimento. Respire fundo e me conte: o que está pesando no seu coração?",
        MARCUS: "🎯 Vamos direto ao ponto! Qual é a sua prioridade número 1 hoje? Podemos transformar isso em ação!",
        LUNA: "🌙 Sua intuição está tentando te dizer algo. Feche os olhos por um momento... o que emerge naturalmente?",
        LEO: "⚡ Hora de organizar! Como está sua rotina? Vamos criar um plano que funciona para você."
      };
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackResponses[activePersona.id as keyof typeof fallbackResponses] || 
                'Olá! Como posso te ajudar na sua jornada hoje?'
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

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  const renderOnboarding = () => {
    if (onboardingStep === 0) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ✨ Bem-vindo ao Essentia Galáxias ✨
            </CardTitle>
            <p className="text-gray-600 mt-4 text-lg">
              Sua jornada de crescimento pessoal baseada na Tríade Essencial.
              Vamos calibrar seu perfil único em alguns passos simples.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl mb-6">🌌</div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-xl">
                <Brain className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-bold text-blue-800">Consciência</h3>
                <p className="text-sm text-blue-600">Desperte sua percepção</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold text-green-800">Energia</h3>
                <p className="text-sm text-green-600">Cultive sua vitalidade</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <Heart className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold text-purple-800">Coerência</h3>
                <p className="text-sm text-purple-600">Alinhe valores e ações</p>
              </div>
            </div>
            <Button 
              onClick={() => setOnboardingStep(1)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Iniciar Jornada <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      );
    }

    const currentQuestion = ONBOARDING_QUESTIONS[onboardingStep - 1];
    if (!currentQuestion) {
      // Complete onboarding with dummy responses
      createUser([]);
      return null;
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{onboardingStep}/{ONBOARDING_QUESTIONS.length}</Badge>
            <Progress value={(onboardingStep / ONBOARDING_QUESTIONS.length) * 100} className="flex-1 mx-4" />
          </div>
          <CardTitle className="text-2xl mt-4">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start p-4 h-auto"
              onClick={() => {
                if (onboardingStep < ONBOARDING_QUESTIONS.length) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  createUser([]);
                }
              }}
            >
              <span className="text-lg">{option}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header com usuário */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Olá, {user?.name}! 🌟</CardTitle>
              <p className="text-purple-100 mt-2">
                Sua jornada de {user?.totalRitualsCompleted} práticas concluídas
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{user?.streak}</div>
              <div className="text-sm text-purple-200">dias consecutivos</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tríade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            Sua Tríade Essencial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-bold text-blue-800">Consciência</h3>
              <Progress value={user?.triadScores.consciencia ? user.triadScores.consciencia * 10 : 50} className="mt-2" />
              <span className="text-sm text-blue-600">{user?.triadScores.consciencia || 5}/10</span>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <h3 className="font-bold text-green-800">Energia</h3>
              <Progress value={user?.triadScores.energia ? user.triadScores.energia * 10 : 50} className="mt-2" />
              <span className="text-sm text-green-600">{user?.triadScores.energia || 5}/10</span>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-bold text-purple-800">Coerência</h3>
              <Progress value={user?.triadScores.coerencia ? user.triadScores.coerencia * 10 : 50} className="mt-2" />
              <span className="text-sm text-purple-600">{user?.triadScores.coerencia || 5}/10</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-indigo-600" />
            Portais Cinematográficos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PORTALS.map(portal => (
              <div 
                key={portal.id}
                className={`p-6 rounded-xl bg-gradient-to-br ${portal.color} text-white cursor-pointer transform hover:scale-105 transition-all`}
                onClick={() => {
                  setActivePortal(portal);
                  setCurrentFlow('portal');
                }}
              >
                <div className="text-4xl mb-3">
                  {portal.id === 'consciencia' && '👁️'}
                  {portal.id === 'gratidao' && '💚'}
                  {portal.id === 'coragem' && '🦁'}
                </div>
                <h3 className="text-xl font-bold mb-2">{portal.name}</h3>
                <p className="text-sm opacity-90 mb-3">{portal.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{portal.duration}</span>
                  <Play className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Abas Fixas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="w-5 h-5 mr-2 text-green-600" />
            Abas Essenciais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TAB_CONTENTS.map(tab => {
              const IconComponent = tab.icon;
              return (
                <div 
                  key={tab.id}
                  className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-all"
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentFlow('tab');
                  }}
                >
                  <IconComponent className="w-8 h-8 mb-3 text-purple-600" />
                  <h3 className="text-lg font-bold mb-2">{tab.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tab.content}</p>
                  <div className="text-xs text-purple-600 font-medium">
                    {tab.practices.length} práticas disponíveis
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Floating Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setAiChatOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );

  const renderPortal = () => {
    if (!activePortal) return null;

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{activePortal.name}</CardTitle>
              <p className="text-gray-600 mt-1">{activePortal.description}</p>
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
          {/* Video Player */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            <iframe
              src={activePortal.videoUrl}
              title={activePortal.name}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-bold mb-3 text-lg">Benefícios desta prática:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activePortal.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Button */}
          <div className="text-center">
            <Button 
              onClick={() => {
                if (user) {
                  const updatedUser = {
                    ...user,
                    streak: user.streak + 1,
                    totalRitualsCompleted: user.totalRitualsCompleted + 1,
                    lastPortalId: activePortal.id,
                    lastCompletedAt: new Date(),
                    updatedAt: new Date()
                  };
                  setUser(updatedUser);
                  localStorage.setItem('essentia-galaxias-final-user', JSON.stringify(updatedUser));
                }
                setActivePortal(null);
                setCurrentFlow('dashboard');
              }}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Completar Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderTab = () => {
    if (!activeTab) return null;

    const IconComponent = activeTab.icon;

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="w-8 h-8 text-purple-600" />
              <div>
                <CardTitle className="text-2xl">{activeTab.title}</CardTitle>
                <p className="text-gray-600 mt-1">{activeTab.content}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setActiveTab(null);
                setCurrentFlow('dashboard');
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video if available */}
          {activeTab.videoUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
              <iframe
                src={activeTab.videoUrl}
                title={activeTab.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTab.practices.map((practice, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{practice}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => startTimer(300, () => {
                    if (user) {
                      const updatedUser = {
                        ...user,
                        streak: user.streak + 1,
                        totalRitualsCompleted: user.totalRitualsCompleted + 1,
                        updatedAt: new Date()
                      };
                      setUser(updatedUser);
                      localStorage.setItem('essentia-galaxias-final-user', JSON.stringify(updatedUser));
                    }
                  })}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Prática (5min)
                </Button>
              </div>
            ))}
          </div>

          {/* Timer if active */}
          {isTimerActive && (
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="text-center py-8">
                <div className="text-4xl mb-2">⏱️</div>
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
        </CardContent>
      </Card>
    );
  };

  const renderAIChat = () => {
    if (!aiChatOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{activePersona.avatar}</div>
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
            <div className="flex space-x-2 mb-3">
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
            
            <div className="flex justify-center space-x-2">
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
  // EFFECTS
  // ========================================

  useEffect(() => {
    const savedUser = localStorage.getItem('essentia-galaxias-final-user');
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

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ========================================
  // MAIN RENDER
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
                  variant="outline"
                  onClick={() => setCurrentFlow('dashboard')}
                  className="mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              )}
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Essentia Galáxias
            </h1>
            <div className="flex-1"></div>
          </div>
        </div>

        {/* Main Content */}
        {currentFlow === 'onboarding' && renderOnboarding()}
        {currentFlow === 'dashboard' && renderDashboard()}
        {currentFlow === 'portal' && renderPortal()}
        {currentFlow === 'tab' && renderTab()}

        {/* AI Chat Modal */}
        {renderAIChat()}
      </div>
    </div>
  );
}