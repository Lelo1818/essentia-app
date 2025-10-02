import { useState, useEffect, useRef } from 'react';
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
  CheckCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Sun,
  Star,
  Volume2,
  VolumeX,
  Wind
} from 'lucide-react';

// ========================================
// SIMPLES & FUNCIONAL
// ========================================

interface UserProfile {
  id: string;
  name: string;
  consciencia: number;
  energia: number;
  coerencia: number;
  streak: number;
  totalRitualsCompleted: number;
}

// ========================================
// RESPIRAÇÃO GUIADA COMPONENT
// ========================================

interface BreathingGuideProps {
  isActive: boolean;
}

const BreathingGuide = ({ isActive }: BreathingGuideProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [size, setSize] = useState(100);
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      setSize(100);
      setTimer(4);
      return;
    }

    const phaseInterval = setInterval(() => {
      setPhase(current => {
        if (current === 'inhale') return 'hold';
        if (current === 'hold') return 'exhale';
        return 'inhale';
      });
    }, 4000);

    const timerInterval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) return 4;
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(timerInterval);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (phase === 'inhale') {
      setSize(180);
      setTimer(4);
    } else if (phase === 'hold') {
      setSize(180);
      setTimer(4);
    } else if (phase === 'exhale') {
      setSize(100);
      setTimer(6);
    }
  }, [phase, isActive]);

  const getInstruction = () => {
    if (phase === 'inhale') return 'Inspire profundamente';
    if (phase === 'hold') return 'Segure o ar';
    return 'Expire lentamente';
  };

  const getColor = () => {
    if (phase === 'inhale') return '#10b981'; // green
    if (phase === 'hold') return '#f59e0b'; // orange
    return '#8b5cf6'; // purple
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative flex items-center justify-center" style={{ height: '220px' }}>
        <div
          className="rounded-full transition-all duration-[4000ms] ease-in-out flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: getColor(),
            boxShadow: `0 0 ${size / 2}px ${getColor()}40`
          }}
        >
          {timer}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-xl font-semibold text-gray-800 mb-2">
          {getInstruction()}
        </div>
        <div className="text-sm text-gray-600">
          {phase === 'inhale' && '4 segundos'}
          {phase === 'hold' && '4 segundos'}
          {phase === 'exhale' && '6 segundos'}
        </div>
      </div>
    </div>
  );
};

// ========================================
// SOM AMBIENTE COMPONENT
// ========================================

const AmbientSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = () => {
    if (audioContextRef.current) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(174.61, audioContext.currentTime); // F3 - frequência relaxante
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();

    audioContextRef.current = audioContext;
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        gainNodeRef.current = null;
        setIsPlaying(false);
      }, 1100);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    return () => {
      if (isPlaying) {
        stopSound();
      }
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleSound}
      className="flex items-center space-x-2"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4" />
          <span>Som ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span>Som OFF</span>
        </>
      )}
    </Button>
  );
};

// ========================================
// PORTAL DESENHADO SIMPLES
// ========================================

interface SimplePortalProps {
  isActive: boolean;
  progress: number;
  type: 'purple' | 'green' | 'orange';
}

const SimplePortal = ({ isActive, progress, type }: SimplePortalProps) => {
  const colors = {
    purple: '#8b5cf6',
    green: '#10b981', 
    orange: '#f59e0b'
  };
  
  const color = colors[type];
  
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}

      {/* Central Portal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div 
            className={`w-32 h-32 rounded-full border-4 ${isActive ? 'animate-spin' : ''}`}
            style={{ 
              borderColor: color,
              borderTopColor: 'transparent',
              animation: isActive ? 'spin 4s linear infinite' : 'none'
            }}
          />
          
          {/* Inner core */}
          <div 
            className="absolute inset-4 rounded-full flex items-center justify-center text-white text-2xl"
            style={{ backgroundColor: color + '60' }}
          >
            {type === 'purple' && '🧠'}
            {type === 'green' && '⚡'}
            {type === 'orange' && '❤️'}
          </div>

          {/* Progress */}
          {isActive && (
            <div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: color,
                transform: `rotate(${(progress / 100) * 360}deg)`
              }}
            />
          )}
        </div>
      </div>

      {/* Progress text */}
      {isActive && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-white">
          <div className="text-sm font-medium">{progress}% completo</div>
        </div>
      )}
    </div>
  );
};

// ========================================
// MAIN COMPONENT
// ========================================

export default function EssentiaSimples() {
  // Estados - TODOS no topo
  const [user, setUser] = useState<UserProfile | null>(null);
  const [step, setStep] = useState<'onboarding' | 'dashboard' | 'portal' | 'breathing'>('onboarding');
  const [onboardingQuestion, setOnboardingQuestion] = useState(0);
  const [consciencia, setConsciencia] = useState(50);
  const [energia, setEnergia] = useState(50);  
  const [coerencia, setCoerencia] = useState(50);
  const [portalActive, setPortalActive] = useState(false);
  const [portalProgress, setPortalProgress] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  
  // ========================================
  // FUNCTIONS
  // ========================================
  
  const completeOnboarding = () => {
    const newUser: UserProfile = {
      id: 'user_simples',
      name: 'Explorador',
      consciencia,
      energia,
      coerencia,
      streak: 0,
      totalRitualsCompleted: 0
    };
    
    setUser(newUser);
    localStorage.setItem('essentia-simples-user', JSON.stringify(newUser));
    setStep('dashboard');
  };

  const startPortal = () => {
    setStep('portal');
    setPortalActive(true);
    setPortalProgress(0);
    
    const interval = setInterval(() => {
      setPortalProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPortalActive(false);
          completePortal();
          return 100;
        }
        return prev + 3;
      });
    }, 150);
  };

  const completePortal = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-simples-user', JSON.stringify(updatedUser));
    setStep('dashboard');
  };

  const startBreathing = () => {
    setStep('breathing');
    setBreathingActive(true);
  };

  const completeBreathing = () => {
    setBreathingActive(false);
    
    if (!user) return;
    
    const updatedUser = {
      ...user,
      totalRitualsCompleted: user.totalRitualsCompleted + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-simples-user', JSON.stringify(updatedUser));
    setStep('dashboard');
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    const userMessage = chatInput;
    setChatInput('');
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          persona: 'SOFIA',
          context: { triad: user }
        })
      });
      
      const data = await response.json();
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || '🌸 Como posso te ajudar hoje?'
      }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '🌸 Estou aqui para te apoiar! Como você está se sentindo?'
      }]);
    }
  };

  // ========================================
  // EFFECTS
  // ========================================

  useEffect(() => {
    const saved = localStorage.getItem('essentia-simples-user');
    if (saved) {
      setUser(JSON.parse(saved));
      setStep('dashboard');
    }
  }, []);

  // ========================================
  // RENDER
  // ========================================

  if (step === 'onboarding') {
    const questions = [
      { title: 'Consciência', subtitle: 'Como está sua presença hoje?', icon: Brain, color: 'purple' },
      { title: 'Energia', subtitle: 'Como está sua vitalidade?', icon: Zap, color: 'green' },
      { title: 'Coerência', subtitle: 'Suas ações estão alinhadas?', icon: Heart, color: 'red' }
    ];

    if (onboardingQuestion === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Essentia Simples
              </CardTitle>
              <p className="text-gray-600 mt-2">Com respiração guiada e som ambiente!</p>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setOnboardingQuestion(1)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 w-full"
                size="lg"
              >
                Começar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const currentQ = questions[onboardingQuestion - 1];
    const IconComponent = currentQ.icon;
    const value = onboardingQuestion === 1 ? consciencia : onboardingQuestion === 2 ? energia : coerencia;
    const setValue = onboardingQuestion === 1 ? setConsciencia : onboardingQuestion === 2 ? setEnergia : setCoerencia;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <Badge>{onboardingQuestion}/3</Badge>
            <div className="text-5xl mb-3">
              <IconComponent className="w-12 h-12 mx-auto text-purple-600" />
            </div>
            <CardTitle className="text-xl">{currentQ.title}</CardTitle>
            <p className="text-gray-600 text-sm">{currentQ.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="text-center mt-2">
                <div className="text-3xl font-bold text-purple-600">{value}%</div>
              </div>
            </div>

            <Button
              onClick={() => {
                if (onboardingQuestion === 3) {
                  completeOnboarding();
                } else {
                  setOnboardingQuestion(onboardingQuestion + 1);
                }
              }}
              className="w-full"
            >
              {onboardingQuestion === 3 ? 'Finalizar' : 'Próximo'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'breathing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-2">
              <div></div>
              <CardTitle className="text-2xl flex items-center">
                <Wind className="w-6 h-6 mr-2 text-purple-600" />
                Respiração Guiada
              </CardTitle>
              <AmbientSound />
            </div>
            <p className="text-gray-600">Siga o ritmo do círculo</p>
          </CardHeader>
          <CardContent>
            <BreathingGuide isActive={breathingActive} />
            
            <div className="text-center mt-6 space-y-3">
              <Button 
                onClick={completeBreathing}
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Concluir Prática
              </Button>
              
              <div className="text-sm text-gray-600">
                Pratique por pelo menos 2 minutos para sentir os benefícios
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'portal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-2">
              <div></div>
              <CardTitle className="text-2xl">Portal em Andamento</CardTitle>
              <AmbientSound />
            </div>
            <Progress value={portalProgress} className="mt-4" />
          </CardHeader>
          <CardContent>
            <SimplePortal 
              isActive={portalActive}
              progress={portalProgress}
              type="purple"
            />
            
            {portalProgress === 100 && (
              <div className="text-center mt-6">
                <Button 
                  onClick={() => setStep('dashboard')}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar Portal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Olá, {user?.name}!</CardTitle>
                <p className="text-purple-100">
                  {user?.totalRitualsCompleted} práticas • {user?.streak} dias consecutivos
                </p>
              </div>
              <Star className="w-8 h-8" />
            </div>
          </CardHeader>
        </Card>

        {/* Tríade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Sua Tríade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold">Consciência</h3>
                <div className="text-2xl font-bold text-purple-600">{user?.consciencia}%</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold">Energia</h3>
                <div className="text-2xl font-bold text-green-600">{user?.energia}%</div>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <h3 className="font-bold">Coerência</h3>
                <div className="text-2xl font-bold text-red-600">{user?.coerencia}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Práticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portal Meditativo</CardTitle>
            </CardHeader>
            <CardContent>
              <SimplePortal isActive={false} progress={0} type="purple" />
              <div className="text-center mt-4">
                <Button 
                  onClick={startPortal}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Portal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Respiração */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Respiração Guiada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-8 text-center h-64 flex flex-col items-center justify-center">
                <Wind className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Técnica 4-4-6
                </h3>
                <p className="text-gray-600 text-sm">
                  Inspire 4s • Segure 4s • Expire 6s
                </p>
              </div>
              <div className="text-center mt-4">
                <Button 
                  onClick={startBreathing}
                  className="bg-gradient-to-r from-green-600 to-teal-600 w-full"
                  size="lg"
                >
                  <Wind className="w-4 h-4 mr-2" />
                  Começar Respiração
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat */}
        <div className="text-center">
          <Button 
            onClick={() => setChatOpen(true)}
            variant="outline"
            size="lg"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Conversar com IA
          </Button>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg h-96 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>🌸 Sofia</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setChatOpen(false)}>✕</Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">🌸</div>
                  <p className="text-gray-600">Olá! Como posso te ajudar?</p>
                </div>
              )}
              
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Digite sua mensagem..."
                />
                <Button onClick={sendMessage}>Enviar</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}