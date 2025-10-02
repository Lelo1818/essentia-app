import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, Brain, Zap, Play, CheckCircle, MessageCircle, Sparkles,
  ArrowRight, Star, Volume2, VolumeX, Wind, Book, Sun, Moon,
  Target, Compass, Flame, Calendar, TrendingUp, ArrowLeft
} from 'lucide-react';

// ========================================
// TYPES
// ========================================

interface UserProfile {
  id: string;
  name: string;
  triadScores: {
    consciencia: number;
    energia: number;
    coerencia: number;
  };
  streak: number;
  totalPractices: number;
  dailyCheckIns: Array<{
    date: string;
    mood: number;
    energy: number;
  }>;
  journal: Array<{
    date: string;
    entry: string;
    aiInsight?: string;
  }>;
}

type Persona = 'SOFIA' | 'MARCUS' | 'LUNA' | 'LEO';

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  persona?: Persona;
}

// ========================================
// BREATHING GUIDE COMPONENT
// ========================================

interface BreathingGuideProps {
  isActive: boolean;
  onComplete?: () => void;
}

const BreathingGuide = ({ isActive, onComplete }: BreathingGuideProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [size, setSize] = useState(100);
  const [timer, setTimer] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      setSize(100);
      setTimer(4);
      setCycleCount(0);
      return;
    }

    const phaseInterval = setInterval(() => {
      setPhase(current => {
        if (current === 'inhale') return 'hold';
        if (current === 'hold') return 'exhale';
        
        setCycleCount(prev => prev + 1);
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

  useEffect(() => {
    if (cycleCount >= 5 && onComplete) {
      onComplete();
    }
  }, [cycleCount, onComplete]);

  const getInstruction = () => {
    if (phase === 'inhale') return 'Inspire profundamente';
    if (phase === 'hold') return 'Segure o ar';
    return 'Expire lentamente';
  };

  const getColor = () => {
    if (phase === 'inhale') return '#10b981';
    if (phase === 'hold') return '#f59e0b';
    return '#8b5cf6';
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative flex items-center justify-center" style={{ height: '220px' }}>
        <div
          className="rounded-full transition-all ease-in-out flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: getColor(),
            boxShadow: `0 0 ${size / 2}px ${getColor()}40`,
            transitionDuration: '4000ms'
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
          Ciclo {cycleCount + 1}/5 • {phase === 'inhale' && '4 segundos'}
          {phase === 'hold' && '4 segundos'}
          {phase === 'exhale' && '6 segundos'}
        </div>
      </div>
    </div>
  );
};

// ========================================
// AMBIENT SOUND COMPONENT
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
    oscillator.frequency.setValueAtTime(174.61, audioContext.currentTime);
    
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
// AVATAR COMPONENT
// ========================================

interface AvatarProps {
  state: 'calm' | 'attentive' | 'grateful';
  breathingSync?: boolean;
}

const EssentiaAvatar = ({ state, breathingSync = false }: AvatarProps) => {
  const getColor = () => {
    if (state === 'calm') return '#8b5cf6';
    if (state === 'attentive') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
          breathingSync ? 'animate-pulse' : ''
        }`}
        style={{
          backgroundColor: getColor() + '40',
          border: `3px solid ${getColor()}`,
          boxShadow: `0 0 20px ${getColor()}40`
        }}
      >
        {state === 'calm' && '🧘'}
        {state === 'attentive' && '👁️'}
        {state === 'grateful' && '🌟'}
      </div>
    </div>
  );
};

// ========================================
// PORTAL VISUAL COMPONENT
// ========================================

interface PortalProps {
  isActive: boolean;
  progress: number;
  type: 'proposito' | 'vitalidade' | 'harmonia';
}

const Portal = ({ isActive, progress, type }: PortalProps) => {
  const config = {
    proposito: { color: '#8b5cf6', emoji: '🎯', title: 'Propósito' },
    vitalidade: { color: '#10b981', emoji: '⚡', title: 'Vitalidade' },
    harmonia: { color: '#f59e0b', emoji: '🌸', title: 'Harmonia' }
  };

  const current = config[type];

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
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
          <div 
            className={`w-48 h-48 rounded-full border-4 ${isActive ? 'animate-spin' : ''}`}
            style={{ 
              borderColor: current.color,
              borderTopColor: 'transparent',
              animation: isActive ? 'spin 8s linear infinite' : 'none'
            }}
          />
          
          <div 
            className="absolute inset-8 rounded-full flex items-center justify-center text-white text-5xl"
            style={{ backgroundColor: current.color + '40' }}
          >
            {current.emoji}
          </div>

          {isActive && progress > 0 && (
            <div
              className="absolute inset-2 rounded-full border-4 border-transparent"
              style={{
                borderTopColor: current.color,
                transform: `rotate(${(progress / 100) * 360}deg)`,
                transition: 'transform 0.3s ease'
              }}
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <h3 className="text-white text-xl font-bold text-center">{current.title}</h3>
        {isActive && <p className="text-white/80 text-center mt-1">{progress}% completo</p>}
      </div>
    </div>
  );
};

// ========================================
// MAIN COMPONENT
// ========================================

export default function EssentiaUnified() {
  // Core states
  const [user, setUser] = useState<UserProfile | null>(null);
  const [step, setStep] = useState<'intro' | 'onboarding' | 'checkin' | 'dashboard' | 'portal' | 'breathing' | 'journal' | 'chat'>('intro');
  
  // Onboarding
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [consciencia, setConsciencia] = useState(50);
  const [energia, setEnergia] = useState(50);
  const [coerencia, setCoerencia] = useState(50);
  
  // Check-in
  const [mood, setMood] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  
  // Portal
  const [recommendedPortal, setRecommendedPortal] = useState<'proposito' | 'vitalidade' | 'harmonia'>('proposito');
  const [portalActive, setPortalActive] = useState(false);
  const [portalProgress, setPortalProgress] = useState(0);
  
  // Breathing
  const [breathingActive, setBreathingActive] = useState(false);
  
  // Journal
  const [journalEntry, setJournalEntry] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  
  // Chat
  const [selectedPersona, setSelectedPersona] = useState<Persona>('SOFIA');
  const [chatMessages, setChatMessages] = useState<AIMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Avatar
  const [avatarState, setAvatarState] = useState<'calm' | 'attentive' | 'grateful'>('calm');

  // ========================================
  // FUNCTIONS
  // ========================================

  const completeOnboarding = () => {
    const newUser: UserProfile = {
      id: 'essentia_unified_user',
      name: userName || 'Explorador',
      triadScores: { consciencia, energia, coerencia },
      streak: 0,
      totalPractices: 0,
      dailyCheckIns: [],
      journal: []
    };

    setUser(newUser);
    localStorage.setItem('essentia-unified-user', JSON.stringify(newUser));
    
    // Recommend portal based on lowest score
    const scores = [
      { key: 'proposito', value: consciencia },
      { key: 'vitalidade', value: energia },
      { key: 'harmonia', value: coerencia }
    ];
    scores.sort((a, b) => a.value - b.value);
    setRecommendedPortal(scores[0].key as any);
    
    setStep('checkin');
  };

  const completeCheckIn = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      dailyCheckIns: [...user.dailyCheckIns, {
        date: new Date().toISOString().split('T')[0],
        mood,
        energy: energyLevel
      }]
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-unified-user', JSON.stringify(updatedUser));
    setStep('dashboard');
  };

  const startPortal = (type: 'proposito' | 'vitalidade' | 'harmonia') => {
    setRecommendedPortal(type);
    setStep('portal');
    setPortalActive(true);
    setPortalProgress(0);
    setAvatarState('attentive');
    
    const interval = setInterval(() => {
      setPortalProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPortalActive(false);
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
      totalPractices: user.totalPractices + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-unified-user', JSON.stringify(updatedUser));
    setAvatarState('grateful');
    
    setTimeout(() => {
      setStep('dashboard');
      setAvatarState('calm');
    }, 2000);
  };

  const startBreathing = () => {
    setStep('breathing');
    setBreathingActive(true);
    setAvatarState('calm');
  };

  const completeBreathing = () => {
    setBreathingActive(false);
    
    if (!user) return;
    
    const updatedUser = {
      ...user,
      totalPractices: user.totalPractices + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-unified-user', JSON.stringify(updatedUser));
    setAvatarState('grateful');
    
    setTimeout(() => {
      setStep('dashboard');
      setAvatarState('calm');
    }, 1500);
  };

  const saveJournal = async () => {
    if (!journalEntry.trim() || !user) return;
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Gere um insight breve (1 frase) sobre este diário: "${journalEntry}"`,
          persona: 'SOFIA',
          context: { triad: user.triadScores }
        })
      });
      
      const data = await response.json();
      const insight = data.response || 'Obrigado por compartilhar. Continue registrando sua jornada.';
      
      setAiInsight(insight);
      
      const updatedUser = {
        ...user,
        journal: [...user.journal, {
          date: new Date().toISOString().split('T')[0],
          entry: journalEntry,
          aiInsight: insight
        }]
      };
      
      setUser(updatedUser);
      localStorage.setItem('essentia-unified-user', JSON.stringify(updatedUser));
      setAvatarState('grateful');
      
    } catch (error) {
      console.error('Erro ao salvar diário:', error);
      setAiInsight('Sua reflexão foi registrada com carinho.');
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage: AIMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setIsAiLoading(true);
    setChatInput('');
    setAvatarState('attentive');
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatInput,
          persona: selectedPersona,
          context: { 
            triad: user?.triadScores,
            mood: user?.dailyCheckIns[user.dailyCheckIns.length - 1]?.mood
          }
        })
      });
      
      const data = await response.json();
      
      const aiMessage: AIMessage = {
        role: 'assistant',
        content: data.response || 'Olá! Como posso te ajudar?',
        persona: selectedPersona
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setAvatarState('calm');
      
    } catch (error) {
      console.error('Erro na IA:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, estou com dificuldades técnicas. Como posso te ajudar de outra forma?',
        persona: selectedPersona
      }]);
      setAvatarState('calm');
    } finally {
      setIsAiLoading(false);
    }
  };

  // ========================================
  // EFFECTS
  // ========================================

  useEffect(() => {
    const saved = localStorage.getItem('essentia-unified-user');
    if (saved) {
      const userData = JSON.parse(saved);
      setUser(userData);
      
      // Check if already did check-in today
      const today = new Date().toISOString().split('T')[0];
      const todayCheckIn = userData.dailyCheckIns.find((c: any) => c.date === today);
      
      if (todayCheckIn) {
        setStep('dashboard');
      } else {
        setStep('checkin');
      }
    }
  }, []);

  // ========================================
  // RENDER
  // ========================================

  // Intro Screen
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center text-white">
            <div className="text-7xl mb-6">✨</div>
            <CardTitle className="text-5xl font-bold mb-4">Essentia Unified</CardTitle>
            <p className="text-xl text-purple-100 mb-2">Tudo que você precisa, em um só lugar</p>
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
              <Badge className="bg-white/20 text-white">Respiração Guiada</Badge>
              <Badge className="bg-white/20 text-white">Portais Imersivos</Badge>
              <Badge className="bg-white/20 text-white">IA com 4 Personas</Badge>
              <Badge className="bg-white/20 text-white">Avatar Interativo</Badge>
              <Badge className="bg-white/20 text-white">Diário + Insights</Badge>
              <Badge className="bg-white/20 text-white">Som Ambiente</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setStep('onboarding')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg"
              size="lg"
            >
              Iniciar Jornada <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Onboarding
  if (step === 'onboarding') {
    if (onboardingStep === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <CardTitle className="text-2xl">Bem-vindo(a) ao Essentia</CardTitle>
              <p className="text-gray-600 mt-2">Como podemos te chamar?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome ou apelido"
                className="text-center text-lg"
              />
              <Button
                onClick={() => setOnboardingStep(1)}
                disabled={!userName.trim()}
                className="w-full"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const questions = [
      { title: 'Consciência', subtitle: 'Presença e atenção plena', icon: Brain, value: consciencia, setValue: setConsciencia },
      { title: 'Energia', subtitle: 'Vitalidade física e mental', icon: Zap, value: energia, setValue: setEnergia },
      { title: 'Coerência', subtitle: 'Alinhamento de valores e ações', icon: Heart, value: coerencia, setValue: setCoerencia }
    ];

    const current = questions[onboardingStep - 1];
    const IconComponent = current.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <Badge className="mb-4">{onboardingStep}/3</Badge>
            <div className="mb-4">
              <IconComponent className="w-16 h-16 mx-auto text-purple-600" />
            </div>
            <CardTitle className="text-2xl">{current.title}</CardTitle>
            <p className="text-gray-600">{current.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={current.value}
                onChange={(e) => current.setValue(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="text-center mt-2">
                <div className="text-4xl font-bold text-purple-600">{current.value}%</div>
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
                  Voltar
                </Button>
              )}
              <Button
                onClick={() => {
                  if (onboardingStep === 3) {
                    completeOnboarding();
                  } else {
                    setOnboardingStep(onboardingStep + 1);
                  }
                }}
                className="flex-1"
              >
                {onboardingStep === 3 ? 'Finalizar' : 'Próximo'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Daily Check-in
  if (step === 'checkin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <Sun className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
            <CardTitle className="text-2xl">Check-in Diário</CardTitle>
            <p className="text-gray-600">Como você está hoje?</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Humor (1-5)</label>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(num => (
                  <Button
                    key={num}
                    variant={mood === num ? "default" : "outline"}
                    onClick={() => setMood(num)}
                    className="flex-1 text-2xl"
                  >
                    {['😢','😕','😐','😊','😄'][num-1]}
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
                    variant={energyLevel === num ? "default" : "outline"}
                    onClick={() => setEnergyLevel(num)}
                    className="flex-1"
                  >
                    {num <= 2 ? '🔋' : '⚡'}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={completeCheckIn} className="w-full" size="lg">
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Breathing
  if (step === 'breathing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <CardTitle className="text-2xl flex items-center">
                <Wind className="w-6 h-6 mr-2 text-purple-600" />
                Respiração Guiada
              </CardTitle>
              <AmbientSound />
            </div>
            <EssentiaAvatar state={avatarState} breathingSync={breathingActive} />
          </CardHeader>
          <CardContent>
            <BreathingGuide isActive={breathingActive} onComplete={completeBreathing} />
            
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">5 ciclos • Técnica 4-4-6</p>
              <Button
                onClick={completeBreathing}
                variant="outline"
              >
                Concluir agora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Portal
  if (step === 'portal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-2">
              <div></div>
              <CardTitle className="text-2xl">Portal {recommendedPortal}</CardTitle>
              <AmbientSound />
            </div>
            <EssentiaAvatar state={avatarState} />
            <Progress value={portalProgress} className="mt-4" />
          </CardHeader>
          <CardContent>
            <Portal
              isActive={portalActive}
              progress={portalProgress}
              type={recommendedPortal}
            />

            {portalProgress === 100 && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => setStep('dashboard')}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Concluir Portal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Journal
  if (step === 'journal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <Book className="w-12 h-12 mx-auto mb-2 text-purple-600" />
            <CardTitle className="text-2xl">Diário de Jornada</CardTitle>
            <p className="text-gray-600">O que você está sentindo ou pensando?</p>
            <EssentiaAvatar state={avatarState} />
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Escreva livremente..."
              className="min-h-32"
            />

            <Button
              onClick={saveJournal}
              disabled={!journalEntry.trim()}
              className="w-full"
            >
              Salvar Reflexão
            </Button>

            {aiInsight && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">Insight da IA</p>
                    <p className="text-sm text-purple-800 mt-1">{aiInsight}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => setStep('dashboard')}
              className="w-full"
            >
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Chat with AI
  if (step === 'chat') {
    const personas: Array<{id: Persona, name: string, emoji: string, color: string}> = [
      { id: 'SOFIA', name: 'Sofia', emoji: '🌸', color: 'pink' },
      { id: 'MARCUS', name: 'Marcus', emoji: '🎯', color: 'blue' },
      { id: 'LUNA', name: 'Luna', emoji: '🌙', color: 'purple' },
      { id: 'LEO', name: 'Leo', emoji: '🦁', color: 'orange' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="max-w-4xl mx-auto h-[90vh] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Conversa com IA</CardTitle>
                <p className="text-gray-600 text-sm">Escolha uma persona para te guiar</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setStep('dashboard')}>
                Voltar
              </Button>
            </div>
            
            <div className="flex space-x-2 mt-4">
              {personas.map(p => (
                <Button
                  key={p.id}
                  variant={selectedPersona === p.id ? "default" : "outline"}
                  onClick={() => setSelectedPersona(p.id)}
                  className="flex items-center space-x-1"
                  size="sm"
                >
                  <span>{p.emoji}</span>
                  <span>{p.name}</span>
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {personas.find(p => p.id === selectedPersona)?.emoji}
                </div>
                <p className="text-gray-600">
                  Olá! Sou {personas.find(p => p.id === selectedPersona)?.name}. Como posso te ajudar hoje?
                </p>
              </div>
            )}

            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.role === 'assistant' && msg.persona && (
                    <div className="text-xs mb-1 opacity-70">
                      {personas.find(p => p.id === msg.persona)?.emoji}{' '}
                      {personas.find(p => p.id === msg.persona)?.name}
                    </div>
                  )}
                  {msg.content}
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
                onKeyPress={(e) => e.key === 'Enter' && !isAiLoading && sendMessage()}
                placeholder="Digite sua mensagem..."
                disabled={isAiLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isAiLoading || !chatInput.trim()}
              >
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">Olá, {user?.name}! ✨</CardTitle>
                <p className="text-purple-100 mt-1">
                  {user?.totalPractices} práticas • {user?.streak} dias consecutivos
                </p>
              </div>
              <EssentiaAvatar state={avatarState} />
            </div>
          </CardHeader>
        </Card>

        {/* Tríade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Sua Tríade Essentia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Brain className="w-10 h-10 mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold text-purple-800">Consciência</h3>
                <div className="text-3xl font-bold text-purple-600">{user?.triadScores.consciencia}%</div>
              </div>
              <div className="text-center">
                <Zap className="w-10 h-10 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold text-green-800">Energia</h3>
                <div className="text-3xl font-bold text-green-600">{user?.triadScores.energia}%</div>
              </div>
              <div className="text-center">
                <Heart className="w-10 h-10 mx-auto mb-2 text-red-600" />
                <h3 className="font-bold text-red-800">Coerência</h3>
                <div className="text-3xl font-bold text-red-600">{user?.triadScores.coerencia}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Práticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Portal Propósito */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Portal Propósito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 text-center h-40 flex items-center justify-center">
                <div className="text-6xl">🎯</div>
              </div>
              <Button
                onClick={() => startPortal('proposito')}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </Button>
            </CardContent>
          </Card>

          {/* Portal Vitalidade */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Flame className="w-5 h-5 mr-2 text-green-600" />
                Portal Vitalidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-6 text-center h-40 flex items-center justify-center">
                <div className="text-6xl">⚡</div>
              </div>
              <Button
                onClick={() => startPortal('vitalidade')}
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </Button>
            </CardContent>
          </Card>

          {/* Portal Harmonia */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Heart className="w-5 h-5 mr-2 text-orange-600" />
                Portal Harmonia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-6 text-center h-40 flex items-center justify-center">
                <div className="text-6xl">🌸</div>
              </div>
              <Button
                onClick={() => startPortal('harmonia')}
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ferramentas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            onClick={startBreathing}
            className="h-24 text-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            <Wind className="w-6 h-6 mr-2" />
            Respiração Guiada
          </Button>

          <Button
            onClick={() => setStep('journal')}
            className="h-24 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Book className="w-6 h-6 mr-2" />
            Diário
          </Button>

          <Button
            onClick={() => setStep('chat')}
            className="h-24 text-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Conversar com IA
          </Button>
        </div>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Seu Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{user?.streak}</div>
                <div className="text-sm text-gray-600">Dias Consecutivos</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{user?.totalPractices}</div>
                <div className="text-sm text-gray-600">Total Práticas</div>
              </div>
              <div className="text-center">
                <Book className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{user?.journal.length || 0}</div>
                <div className="text-sm text-gray-600">Reflexões</div>
              </div>
              <div className="text-center">
                <Sun className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{user?.dailyCheckIns.length || 0}</div>
                <div className="text-sm text-gray-600">Check-ins</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}