import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Brain, 
  Zap, 
  Play,
  Pause,
  CheckCircle,
  Target,
  Calendar,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Sun,
  Moon,
  Star,
  Compass
} from 'lucide-react';

// ========================================
// TYPES BASED ON MVP THAT WORKS
// ========================================

interface TriadScores {
  consciencia: number;  // 0-100
  energia: number;      // 0-100
  coerencia: number;    // 0-100
}

interface UserProfile {
  id: string;
  name: string;
  triadScores: TriadScores;
  streak: number;
  totalRitualsCompleted: number;
  insights?: string[];
  createdAt: Date;
}

interface DailyMood {
  date: string;
  humor: number;    // 1-5
  energia: number;  // 1-5
  timestamp: Date;
}

// ========================================
// PORTAL DESENHADO VISUAL COMPONENT
// ========================================

interface PortalCanvasProps {
  portal: string;
  isActive: boolean;
  progress: number;
}

const PortalCanvas = ({ portal, isActive, progress }: PortalCanvasProps) => {
  const getPortalConfig = (portalType: string) => {
    switch(portalType) {
      case 'proposito':
        return {
          color: '#6366f1', // purple
          title: 'Portal do Propósito',
          symbol: '🎯',
          description: 'Conecte-se com sua missão de vida',
          particles: 12,
          duration: '8 min'
        };
      case 'vitalidade':
        return {
          color: '#22c55e', // green  
          title: 'Portal da Vitalidade',
          symbol: '⚡',
          description: 'Desperte sua energia vital',
          particles: 15,
          duration: '6 min'
        };
      case 'harmonia':
        return {
          color: '#f59e0b', // amber
          title: 'Portal da Harmonia',
          symbol: '🌸',
          description: 'Equilibre mente, corpo e alma',
          particles: 10,
          duration: '10 min'
        };
      default:
        return {
          color: '#6366f1',
          title: 'Portal Místico',
          symbol: '✨',
          description: 'Uma jornada de autoconhecimento',
          particles: 8,
          duration: '5 min'
        };
    }
  };

  const config = getPortalConfig(portal);
  
  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* Central Portal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div 
            className={`w-48 h-48 rounded-full border-4 ${isActive ? 'animate-spin' : ''}`}
            style={{ 
              borderColor: config.color,
              borderTopColor: 'transparent',
              animation: isActive ? 'spin 8s linear infinite' : 'none'
            }}
          />
          
          {/* Middle ring */}
          <div 
            className={`absolute inset-4 rounded-full border-2 border-white/30 ${isActive ? 'animate-pulse' : ''}`}
            style={{ animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none' }}
          />
          
          {/* Inner core */}
          <div 
            className="absolute inset-8 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: config.color + '40' }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{config.symbol}</div>
              <div className="text-xs font-semibold">{config.duration}</div>
            </div>
          </div>

          {/* Progress ring */}
          {isActive && progress > 0 && (
            <div
              className="absolute inset-2 rounded-full border-4 border-transparent"
              style={{
                borderTopColor: config.color,
                transform: `rotate(${(progress / 100) * 360}deg)`,
                transition: 'transform 0.3s ease'
              }}
            />
          )}

          {/* Floating particles */}
          {isActive && Array.from({ length: config.particles }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: config.color,
                left: `${50 + Math.cos((i / config.particles) * 2 * Math.PI) * (60 + Math.sin(Date.now() / 1000 + i) * 20)}%`,
                top: `${50 + Math.sin((i / config.particles) * 2 * Math.PI) * (60 + Math.cos(Date.now() / 1000 + i) * 20)}%`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.8
              }}
            />
          ))}
        </div>
      </div>

      {/* Portal info overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <h3 className="text-white text-lg font-bold mb-1">{config.title}</h3>
        <p className="text-white/80 text-sm">{config.description}</p>
      </div>
    </div>
  );
};

// ========================================
// MAIN COMPONENT - ESSENTIA RENASCIDO
// ========================================

export default function EssentiaRenascido() {
  // Estados principais
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [currentStep, setCurrentStep] = useState<'onboarding' | 'checkin' | 'portal' | 'dashboard'>('onboarding');
  
  // Portal states
  const [recommendedPortal, setRecommendedPortal] = useState<string | null>(null);
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [portalProgress, setPortalProgress] = useState(0);
  const [isPortalActive, setIsPortalActive] = useState(false);
  
  // Daily states
  const [todayMood, setTodayMood] = useState<DailyMood | null>(null);
  const [dailyCheckinDone, setDailyCheckinDone] = useState(false);
  
  // Chat states
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Onboarding states - MOVIDOS PARA O TOPO
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingAnswers, setOnboardingAnswers] = useState<number[]>([50, 50, 50]);
  
  // Checkin states - MOVIDOS PARA O TOPO
  const [humor, setHumor] = useState(3);
  const [energia, setEnergia] = useState(3);

  // ========================================
  // CORE FUNCTIONS
  // ========================================

  const getRecommendedPortal = (triadScores: TriadScores): string => {
    const scores = [
      { key: 'consciencia', value: triadScores.consciencia, portal: 'proposito' },
      { key: 'energia', value: triadScores.energia, portal: 'vitalidade' },
      { key: 'coerencia', value: triadScores.coerencia, portal: 'harmonia' }
    ];
    
    scores.sort((a, b) => a.value - b.value);
    return scores[0].portal;
  };

  const completeOnboarding = (answers: number[]) => {
    const [consciencia, energia, coerencia] = answers;
    
    const newUser: UserProfile = {
      id: 'essentia_renascido_user',
      name: 'Explorador Essencial',
      triadScores: { consciencia, energia, coerencia },
      streak: 0,
      totalRitualsCompleted: 0,
      insights: [],
      createdAt: new Date()
    };

    setUser(newUser);
    setRecommendedPortal(getRecommendedPortal(newUser.triadScores));
    localStorage.setItem('essentia-renascido-user', JSON.stringify(newUser));
    setIsOnboarding(false);
    setCurrentStep('checkin');
  };

  const completeDailyCheckin = (humor: number, energia: number) => {
    const checkin: DailyMood = {
      date: new Date().toISOString().split('T')[0],
      humor,
      energia,
      timestamp: new Date()
    };
    
    setTodayMood(checkin);
    setDailyCheckinDone(true);
    localStorage.setItem('essentia-renascido-checkin-' + checkin.date, JSON.stringify(checkin));
    setCurrentStep('portal');
  };

  const startPortalExperience = (portalType: string) => {
    setActivePortal(portalType);
    setIsPortalActive(true);
    setPortalProgress(0);
    
    // Simulate portal progress
    const interval = setInterval(() => {
      setPortalProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPortalActive(false);
          completePortal();
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const completePortal = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-renascido-user', JSON.stringify(updatedUser));
    setActivePortal(null);
    setCurrentStep('dashboard');
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
          persona: 'SOFIA',
          context: {
            triad: user?.triadScores,
            streak: user?.streak,
            mood: todayMood
          }
        })
      });
      
      const data = await response.json();
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || 'Olá! Como posso te ajudar na sua jornada hoje?'
      }]);
    } catch (error) {
      console.error('Erro na IA:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '🌸 Estou aqui para te apoiar! Como você está se sentindo agora?'
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // ========================================
  // EFFECTS
  // ========================================

  useEffect(() => {
    const savedUser = localStorage.getItem('essentia-renascido-user');
    const todayCheckin = localStorage.getItem('essentia-renascido-checkin-' + new Date().toISOString().split('T')[0]);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsOnboarding(false);
      setRecommendedPortal(getRecommendedPortal(userData.triadScores));
      
      if (todayCheckin) {
        setTodayMood(JSON.parse(todayCheckin));
        setDailyCheckinDone(true);
        setCurrentStep('dashboard');
      } else {
        setCurrentStep('checkin');
      }
    }
  }, []);

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  const renderOnboarding = () => {
    const questions = [
      { title: 'Como está sua consciência hoje?', subtitle: 'Presença e percepção do momento', icon: Brain, color: 'purple' },
      { title: 'Como está sua energia?', subtitle: 'Vitalidade física e mental', icon: Zap, color: 'green' },
      { title: 'Como está sua coerência?', subtitle: 'Alinhamento entre valores e ações', icon: Heart, color: 'red' }
    ];

    if (onboardingStep === 0) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🌟</div>
            <CardTitle className="text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Essentia Renascido
            </CardTitle>
            <p className="text-gray-600 mt-4 text-lg">
              Baseado no que realmente funciona. Simples, poderoso, transformador.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Brain className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold text-purple-800">Consciência</h3>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold text-green-800">Energia</h3>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 mx-auto mb-2 text-red-600" />
                <h3 className="font-bold text-red-800">Coerência</h3>
              </div>
            </div>
            
            <Button 
              onClick={() => setOnboardingStep(1)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3"
              size="lg"
            >
              Iniciar Jornada <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      );
    }

    const currentQ = questions[onboardingStep - 1];
    const IconComponent = currentQ.icon;

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Badge variant="secondary">{onboardingStep}/3</Badge>
          <div className={`text-6xl mb-4 text-${currentQ.color}-500`}>
            <IconComponent className="w-16 h-16 mx-auto" />
          </div>
          <CardTitle className="text-2xl">{currentQ.title}</CardTitle>
          <p className="text-gray-600">{currentQ.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={onboardingAnswers[onboardingStep - 1]}
              onChange={(e) => {
                const newAnswers = [...onboardingAnswers];
                newAnswers[onboardingStep - 1] = Number(e.target.value);
                setOnboardingAnswers(newAnswers);
              }}
              className={`w-full accent-${currentQ.color}-500`}
            />
            <div className="text-center">
              <div className={`text-4xl font-bold text-${currentQ.color}-600`}>
                {onboardingAnswers[onboardingStep - 1]}%
              </div>
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
                if (onboardingStep === 3) {
                  completeOnboarding(onboardingAnswers);
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
  };

  const renderCheckin = () => {

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center">
            <Sun className="w-6 h-6 mr-2 text-yellow-500" />
            Check-in Diário
          </CardTitle>
          <p className="text-gray-600">Como você está se sentindo hoje?</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Humor (1-5)</label>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(num => (
                  <Button
                    key={num}
                    variant={humor === num ? "default" : "outline"}
                    onClick={() => setHumor(num)}
                    className="flex-1"
                  >
                    {num === 1 && '😢'}
                    {num === 2 && '😕'}
                    {num === 3 && '😐'}
                    {num === 4 && '😊'}
                    {num === 5 && '😄'}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Energia (1-5)</label>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(num => (
                  <Button
                    key={num}
                    variant={energia === num ? "default" : "outline"}
                    onClick={() => setEnergia(num)}
                    className="flex-1"
                  >
                    {num === 1 && '🔋'}
                    {num === 2 && '🔋'}
                    {num === 3 && '🔋'}
                    {num === 4 && '⚡'}
                    {num === 5 && '⚡'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={() => completeDailyCheckin(humor, energia)}
            className="w-full"
          >
            Continuar Jornada
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderPortalSelection = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center">
          <Compass className="w-6 h-6 mr-2 text-purple-600" />
          Portal Recomendado
        </CardTitle>
        <p className="text-gray-600">Baseado no seu estado atual da Tríade</p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <PortalCanvas 
            portal={recommendedPortal || 'proposito'} 
            isActive={false}
            progress={0}
          />
        </div>
        
        <div className="text-center space-y-4">
          <Button 
            onClick={() => startPortalExperience(recommendedPortal || 'proposito')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar Portal
          </Button>
          
          <div className="flex justify-center space-x-4 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('dashboard')}
            >
              Pular Portal
            </Button>
            <Button 
              variant="outline"
              onClick={() => setAiChatOpen(true)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Conversar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPortalExperience = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Portal em Andamento</CardTitle>
        <Progress value={portalProgress} className="mt-4" />
        <p className="text-sm text-gray-600 mt-2">{portalProgress}% concluído</p>
      </CardHeader>
      <CardContent>
        <PortalCanvas 
          portal={activePortal || 'proposito'} 
          isActive={isPortalActive}
          progress={portalProgress}
        />
        
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-4">
            Respire profundamente e se conecte com o momento presente...
          </p>
          {portalProgress === 100 && (
            <Button 
              onClick={() => setCurrentStep('dashboard')}
              className="bg-gradient-to-r from-green-600 to-blue-600"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Finalizar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Olá, {user?.name}!</CardTitle>
              <p className="text-purple-100 mt-1">
                {user?.totalRitualsCompleted} práticas • {user?.streak} dias consecutivos
              </p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Streak {user?.streak}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tríade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            Sua Tríade Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-bold text-purple-800">Consciência</h3>
              <div className="text-2xl font-bold text-purple-600">{user?.triadScores.consciencia}%</div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-bold text-green-800">Energia</h3>
              <div className="text-2xl font-bold text-green-600">{user?.triadScores.energia}%</div>
            </div>
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-bold text-red-800">Coerência</h3>
              <div className="text-2xl font-bold text-red-600">{user?.triadScores.coerencia}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setCurrentStep('portal')}
              className="h-20 flex-col"
            >
              <Compass className="w-6 h-6 mb-2" />
              Novo Portal
            </Button>
            
            <Button 
              onClick={() => setAiChatOpen(true)}
              variant="outline"
              className="h-20 flex-col"
            >
              <MessageCircle className="w-6 h-6 mb-2" />
              Conversar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Floating AI Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setAiChatOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-14 h-14 shadow-lg"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );

  const renderAIChat = () => {
    if (!aiChatOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl h-[70vh] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>🌸 Sofia - Sua Guia</CardTitle>
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
                <div className="text-4xl mb-2">🌸</div>
                <p>Olá! Sou Sofia. Como posso te apoiar hoje na sua jornada?</p>
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
                placeholder="Digite sua mensagem..."
                disabled={isAiLoading}
              />
              <Button
                onClick={() => sendAIMessage(chatInput)}
                disabled={isAiLoading || !chatInput.trim()}
              >
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // ========================================
  // MAIN RENDER
  // ========================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Essentia Renascido
          </h1>
          <p className="text-gray-600 mt-1">Baseado no que realmente funciona</p>
        </div>

        {/* Main Content */}
        {isOnboarding && renderOnboarding()}
        {currentStep === 'checkin' && renderCheckin()}
        {currentStep === 'portal' && !activePortal && renderPortalSelection()}
        {currentStep === 'portal' && activePortal && renderPortalExperience()}
        {currentStep === 'dashboard' && renderDashboard()}

        {/* AI Chat Modal */}
        {renderAIChat()}
      </div>
    </div>
  );
}