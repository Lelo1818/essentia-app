import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, Brain, Zap, Play, CheckCircle, MessageCircle, Sparkles,
  ArrowRight, Star, Volume2, VolumeX, Wind, Book, Sun, Moon,
  Target, Compass, Flame, Calendar, TrendingUp, ArrowLeft, Users,
  Home, Eye, Shield, Lightbulb, TreePine, Globe, UserPlus,
  Coffee, Share2, RotateCcw, Sunrise, Crown
} from 'lucide-react';

// ========================================
// TYPES
// ========================================

interface LifeWheelData {
  relacionamentos: number;
  carreira: number;
  saude: number;
  crescimento: number;
  financas: number;
  lazer: number;
  ambiente: number;
  contribuicao: number;
}

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface UserProfile {
  id: string;
  name: string;
  lifeWheel: LifeWheelData;
  triadScores: TriadScores;
  streak: number;
  totalPractices: number;
  clarity: number;
  journeyStage: number;
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
  completedPortals: string[];
  rituals: {
    morning: boolean;
    evening: boolean;
  };
}

type Persona = 'SOFIA' | 'MARCUS' | 'LUNA' | 'LEO';
type Step = 'intro' | 'name' | 'wheel' | 'triad' | 'checkin' | 'dashboard' | 'portal' | 'breathing' | 'journal' | 'chat' | 'community' | 'ritual';

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  persona?: Persona;
}

// ========================================
// BREATHING COMPONENT
// ========================================

const BreathingGuide = ({ isActive, onComplete }: { isActive: boolean; onComplete?: () => void }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [size, setSize] = useState(100);
  const [timer, setTimer] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = async () => {
    if (audioContextRef.current) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // CRITICAL: Resume AudioContext (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
        console.log('AudioContext resumed:', audioContext.state);
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(174.61, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 2);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();

      audioContextRef.current = audioContext;
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      
      console.log('Som iniciado com sucesso: 174Hz');
    } catch (error) {
      console.error('Erro ao iniciar som:', error);
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      
      setTimeout(() => {
        oscillatorRef.current?.stop();
        audioContextRef.current?.close();
        audioContextRef.current = null;
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      }, 1100);
    }
  };

  useEffect(() => {
    if (isActive) {
      startSound();
    } else {
      stopSound();
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
      setTimer(t => t <= 1 ? 4 : t - 1);
    }, 1000);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(timerInterval);
      stopSound();
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (phase === 'inhale') { setSize(180); setTimer(4); }
    else if (phase === 'hold') { setSize(180); setTimer(4); }
    else if (phase === 'exhale') { setSize(100); setTimer(6); }
  }, [phase, isActive]);

  useEffect(() => {
    if (cycleCount >= 5 && onComplete) {
      stopSound();
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
        <div className="text-xl font-semibold text-gray-800 mb-2">{getInstruction()}</div>
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
// AVATAR COMPONENT
// ========================================

const EssentiaAvatar = ({ state, breathingSync = false }: { state: 'calm' | 'attentive' | 'grateful'; breathingSync?: boolean }) => {
  const getColor = () => {
    if (state === 'calm') return '#8b5cf6';
    if (state === 'attentive') return '#f59e0b';
    return '#10b981';
  };

  const getEmoji = () => {
    if (state === 'calm') return '🧘';
    if (state === 'attentive') return '👁️';
    return '🌟';
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
        {getEmoji()}
      </div>
    </div>
  );
};

// ========================================
// PORTAL VISUAL
// ========================================

const Portal = ({ type, isActive, progress }: { type: string; isActive: boolean; progress: number }) => {
  const config: any = {
    clareza: { color: '#3b82f6', emoji: '👁️', title: 'Clareza' },
    presenca: { color: '#10b981', emoji: '🧘', title: 'Presença' },
    coragem: { color: '#ef4444', emoji: '🛡️', title: 'Coragem' },
    sabedoria: { color: '#8b5cf6', emoji: '📚', title: 'Sabedoria' },
    intuicao: { color: '#ec4899', emoji: '🌙', title: 'Intuição' },
    proposito: { color: '#f59e0b', emoji: '🎯', title: 'Propósito' },
    conexao: { color: '#06b6d4', emoji: '🤝', title: 'Conexão' }
  };

  const current = config[type] || config.clareza;

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl overflow-hidden">
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

export default function EssentiaMega() {
  const [step, setStep] = useState<Step>('intro');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Onboarding
  const [userName, setUserName] = useState('');
  const [wheelStep, setWheelStep] = useState(0);
  const [lifeWheelData, setLifeWheelData] = useState<LifeWheelData>({
    relacionamentos: 0, carreira: 0, saude: 0, crescimento: 0,
    financas: 0, lazer: 0, ambiente: 0, contribuicao: 0
  });
  const [consciencia, setConsciencia] = useState(50);
  const [energia, setEnergia] = useState(50);
  const [coerencia, setCoerencia] = useState(50);
  
  // Check-in
  const [mood, setMood] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  
  // Portal
  const [selectedPortal, setSelectedPortal] = useState<string>('clareza');
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

  // Audio System
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Community
  const [communityPosts] = useState([
    {
      id: 1,
      author: 'Marina Silva',
      level: 'Alma Iluminada',
      content: 'Após 6 meses de jornada, finalmente tive coragem de deixar meu emprego corporativo para seguir minha paixão por arte terapia!',
      tags: ['coragem', 'transição'],
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: 'Roberto Lima',
      level: 'Buscador Avançado',
      content: 'Reflexão de hoje: percebi que minha necessidade de controle vem do medo de decepcionar outros.',
      tags: ['autoconhecimento', 'aceitação'],
      likes: 18,
      comments: 12
    }
  ]);

  const lifeAreas = [
    { id: 'relacionamentos', name: 'Relacionamentos', question: 'Em seus relacionamentos, o que te nutre hoje?' },
    { id: 'carreira', name: 'Carreira', question: 'Como você se sente em relação ao seu trabalho atual?' },
    { id: 'saude', name: 'Saúde', question: 'Como está sua conexão com seu corpo?' },
    { id: 'crescimento', name: 'Crescimento Pessoal', question: 'Que aspectos de si você gostaria de desenvolver?' },
    { id: 'financas', name: 'Finanças', question: 'Como é sua relação com o dinheiro?' },
    { id: 'lazer', name: 'Lazer', question: 'O que traz alegria genuína para sua vida?' },
    { id: 'ambiente', name: 'Ambiente', question: 'Como você se sente nos espaços que habita?' },
    { id: 'contribuicao', name: 'Contribuição Social', question: 'Como você contribui para o mundo?' }
  ];

  const journeyStages = [
    { id: 1, name: 'Despertar Interior', icon: Sunrise, emoji: '🌅', description: 'Primeiros passos no autoconhecimento' },
    { id: 2, name: 'Autoconhecimento Profundo', icon: Brain, emoji: '🧠', description: 'Compreender padrões e crenças' },
    { id: 3, name: 'Descoberta de Paixões', icon: Sparkles, emoji: '✨', description: 'Encontrar o que te move' },
    { id: 4, name: 'Relacionamentos Significativos', icon: Heart, emoji: '💫', description: 'Conexões autênticas' },
    { id: 5, name: 'Missão e Contribuição', icon: Compass, emoji: '🎯', description: 'Impactar o mundo' },
    { id: 6, name: 'Vida com Propósito', icon: Crown, emoji: '👑', description: 'Plenitude e realização' }
  ];

  const portals = [
    { id: 'clareza', name: 'Clareza', icon: Eye, color: 'blue' },
    { id: 'presenca', name: 'Presença', icon: Heart, color: 'green' },
    { id: 'coragem', name: 'Coragem', icon: Shield, color: 'red' },
    { id: 'sabedoria', name: 'Sabedoria', icon: Book, color: 'purple' },
    { id: 'intuicao', name: 'Intuição', icon: Moon, color: 'pink' },
    { id: 'proposito', name: 'Propósito', icon: Target, color: 'orange' },
    { id: 'conexao', name: 'Conexão', icon: Users, color: 'cyan' }
  ];

  const personas: Array<{id: Persona, name: string, emoji: string, focus: string}> = [
    { id: 'SOFIA', name: 'Sofia', emoji: '🌸', focus: 'Empatia & Acolhimento' },
    { id: 'MARCUS', name: 'Marcus', emoji: '🎯', focus: 'Estratégia & Ação' },
    { id: 'LUNA', name: 'Luna', emoji: '🌙', focus: 'Intuição & Reflexão' },
    { id: 'LEO', name: 'Leo', emoji: '🦁', focus: 'Energia & Motivação' }
  ];

  // ========================================
  // FUNCTIONS
  // ========================================

  const completeOnboarding = () => {
    const newUser: UserProfile = {
      id: 'essentia_mega_user',
      name: userName || 'Explorador',
      lifeWheel: lifeWheelData,
      triadScores: { consciencia, energia, coerencia },
      streak: 0,
      totalPractices: 0,
      clarity: Math.round((consciencia + energia + coerencia) / 3),
      journeyStage: 1, // Sempre começa no estágio 1
      dailyCheckIns: [],
      journal: [],
      completedPortals: [],
      rituals: { morning: false, evening: false }
    };

    setUser(newUser);
    localStorage.setItem('essentia-mega-user', JSON.stringify(newUser));
    setStep('checkin');
  };

  const completeCheckIn = () => {
    if (!user) return;
    
    const isMorning = new Date().getHours() < 12;
    
    const updatedUser = {
      ...user,
      dailyCheckIns: [...user.dailyCheckIns, {
        date: new Date().toISOString().split('T')[0],
        mood,
        energy: energyLevel
      }]
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-mega-user', JSON.stringify(updatedUser));
    
    // Ir para ritual se for manhã e ainda não fez
    if (isMorning && !user.rituals.morning) {
      setStep('ritual');
    } else {
      setStep('dashboard');
    }
  };

  const completeRitual = (type: 'morning' | 'evening') => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      rituals: {
        ...user.rituals,
        [type]: true
      },
      totalPractices: user.totalPractices + 1,
      clarity: Math.min(100, user.clarity + 5),
      journeyStage: user.totalPractices >= 10 && user.journeyStage < 6 ? user.journeyStage + 1 : user.journeyStage
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-mega-user', JSON.stringify(updatedUser));
    setStep('dashboard');
  };

  const startPortal = (portalId: string) => {
    setSelectedPortal(portalId);
    setStep('portal');
    setPortalActive(true);
    setPortalProgress(0);
    setAvatarState('attentive');
    
    const interval = setInterval(() => {
      setPortalProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPortalActive(false);
          completePortal(portalId);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const completePortal = (portalId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      completedPortals: [...user.completedPortals, portalId],
      totalPractices: user.totalPractices + 1,
      clarity: Math.min(100, user.clarity + 5)
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-mega-user', JSON.stringify(updatedUser));
    setAvatarState('grateful');
    
    setTimeout(() => {
      setStep('dashboard');
      setAvatarState('calm');
    }, 2000);
  };

  const startSound174Hz = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    
    // Resume AudioContext (necessário para navegadores modernos)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Criar oscilador para 174Hz
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(174, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Volume moderado
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setSoundEnabled(true);
  };

  const stopSound174Hz = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setSoundEnabled(false);
  };

  const toggleBackgroundMusic = () => {
    setMusicEnabled(!musicEnabled);
    // Música ambiente poderia ser adicionada aqui com <audio> element
  };

  const startBreathing = () => {
    setStep('breathing');
    setBreathingActive(true);
    setAvatarState('calm');
    startSound174Hz(); // Inicia som automaticamente
  };

  const completeBreathing = () => {
    setBreathingActive(false);
    stopSound174Hz(); // Para o som ao sair
    
    if (!user) return;
    
    const updatedUser = {
      ...user,
      totalPractices: user.totalPractices + 1,
      clarity: Math.min(100, user.clarity + 3)
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-mega-user', JSON.stringify(updatedUser));
    setAvatarState('grateful');
    
    setTimeout(() => {
      setStep('dashboard');
      setAvatarState('calm');
    }, 1500);
  };

  const saveJournal = async () => {
    if (!journalEntry.trim() || !user) return;
    
    setAvatarState('attentive');
    
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
      const insight = data.response || 'Obrigado por compartilhar sua jornada.';
      
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
      localStorage.setItem('essentia-mega-user', JSON.stringify(updatedUser));
      setAvatarState('grateful');
      
    } catch (error) {
      console.error('Erro ao salvar diário:', error);
      setAiInsight('Sua reflexão foi registrada com carinho.');
      setAvatarState('calm');
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage: AIMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setIsAiLoading(true);
    const messageToSend = chatInput;
    setChatInput('');
    setAvatarState('attentive');
    
    try {
      const latestMood = user?.dailyCheckIns?.length 
        ? user.dailyCheckIns[user.dailyCheckIns.length - 1]?.mood 
        : null;
      
      console.log('Enviando mensagem para IA:', {
        message: messageToSend,
        persona: selectedPersona,
        context: { triad: user?.triadScores, mood: latestMood }
      });
      
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          persona: selectedPersona,
          context: { 
            triad: user?.triadScores || null,
            mood: latestMood
          }
        })
      });
      
      console.log('Resposta HTTP status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos da IA:', data);
      
      const aiMessage: AIMessage = {
        role: 'assistant',
        content: data.response || 'Olá! Como posso te ajudar?',
        persona: selectedPersona
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setAvatarState('calm');
      
    } catch (error) {
      console.error('Erro completo na IA:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, estou com dificuldades técnicas.',
        persona: selectedPersona
      }]);
      setAvatarState('calm');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Load saved user
  useEffect(() => {
    const saved = localStorage.getItem('essentia-mega-user');
    if (saved) {
      const userData = JSON.parse(saved);
      setUser(userData);
      
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

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center text-white">
            <div className="text-7xl mb-6">✨</div>
            <CardTitle className="text-5xl font-bold mb-4">Essentia Mega</CardTitle>
            <p className="text-xl text-purple-100 mb-6">Sistema Completo de Autoconhecimento</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-sm">
              <Badge className="bg-white/20 text-white">Roda da Vida 8 Áreas</Badge>
              <Badge className="bg-white/20 text-white">Tríade Essentia</Badge>
              <Badge className="bg-white/20 text-white">7 Portais Imersivos</Badge>
              <Badge className="bg-white/20 text-white">Respiração + Som</Badge>
              <Badge className="bg-white/20 text-white">4 IAs Reais</Badge>
              <Badge className="bg-white/20 text-white">Jornada 6 Estágios</Badge>
              <Badge className="bg-white/20 text-white">Diário + Insights</Badge>
              <Badge className="bg-white/20 text-white">Comunidade</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setStep('name')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg"
              size="lg"
            >
              Iniciar Jornada Completa <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'name') {
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
              onClick={() => setStep('wheel')}
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

  if (step === 'wheel') {
    const currentArea = lifeAreas[wheelStep];
    const progress = ((wheelStep + 1) / lifeAreas.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Roda da Vida: {currentArea.name}
              </h2>
              <Badge variant="outline">{Math.round(progress)}% concluído</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl mb-4">{currentArea.question}</CardTitle>
              <p className="text-gray-600">De 0 (insatisfeito) a 10 (plenitude)</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-600 mb-4">
                    {lifeWheelData[currentArea.id as keyof LifeWheelData]}
                  </div>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={lifeWheelData[currentArea.id as keyof LifeWheelData]}
                  onChange={(e) => setLifeWheelData(prev => ({
                    ...prev,
                    [currentArea.id]: Number(e.target.value)
                  }))}
                  className="w-full h-3 accent-purple-600"
                  style={{ cursor: 'pointer' }}
                />
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 - Insatisfeito</span>
                  <span>10 - Plenitude</span>
                </div>

                <Textarea
                  placeholder="Escreva suas reflexões sobre esta área... (opcional)"
                  className="min-h-24"
                />
              </div>

              <div className="flex space-x-3">
                {wheelStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setWheelStep(wheelStep - 1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (wheelStep === lifeAreas.length - 1) {
                      setStep('triad');
                    } else {
                      setWheelStep(wheelStep + 1);
                    }
                  }}
                  className="flex-1"
                  size="lg"
                >
                  {wheelStep === lifeAreas.length - 1 ? 'Finalizar Roda' : 'Próxima Área'} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'triad') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Tríade Essentia</CardTitle>
            <p className="text-gray-600">Como você se sente hoje nessas dimensões?</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold">Consciência</span>
                </div>
                <span className="text-2xl font-bold text-purple-600">{consciencia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={consciencia}
                onChange={(e) => setConsciencia(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-green-600" />
                  <span className="font-semibold">Energia</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{energia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={energia}
                onChange={(e) => setEnergia(Number(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  <span className="font-semibold">Coerência</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{coerencia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={coerencia}
                onChange={(e) => setCoerencia(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>

            <Button onClick={completeOnboarding} className="w-full" size="lg">
              Finalizar Onboarding
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  if (step === 'breathing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center">
              <Wind className="w-6 h-6 mr-2 text-purple-600" />
              Respiração Guiada com Som
            </CardTitle>
            <div className="mt-4">
              <EssentiaAvatar state={avatarState} breathingSync={breathingActive} />
            </div>
          </CardHeader>
          <CardContent>
            <BreathingGuide isActive={breathingActive} onComplete={completeBreathing} />
            
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">5 ciclos • Técnica 4-4-6 • 🔊 Som 174Hz ativo</p>
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

  if (step === 'ritual') {
    const isMorning = new Date().getHours() < 12;
    const ritualType = isMorning ? 'morning' : 'evening';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{isMorning ? '🌅' : '🌙'}</div>
            <CardTitle className="text-3xl">
              {isMorning ? 'Ritual Matinal' : 'Ritual Noturno'}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {isMorning 
                ? 'Comece seu dia com intenção e clareza' 
                : 'Encerre seu dia com gratidão e reflexão'}
            </p>
            <div className="mt-4">
              <EssentiaAvatar state="calm" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="font-bold text-lg flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-600" />
                {isMorning ? '3 Gratidões' : '3 Aprendizados'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isMorning 
                  ? 'Pelo que você é grato hoje? (mental ou escrito)' 
                  : 'O que você aprendeu hoje? (mental ou escrito)'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="font-bold text-lg flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                {isMorning ? 'Intenção do Dia' : 'Reflexão do Dia'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isMorning 
                  ? 'Qual sua principal intenção para hoje?' 
                  : 'Como foi seu dia de 0-10?'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="font-bold text-lg flex items-center">
                <Wind className="w-5 h-5 mr-2 text-green-600" />
                Respiração Consciente
              </h3>
              <p className="text-gray-600 text-sm">3 respirações profundas (4-4-6)</p>
              <div className="text-center text-4xl">🧘</div>
            </div>

            <Button
              onClick={() => completeRitual(ritualType)}
              className="w-full"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Ritual Concluído
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'portal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Portal {portals.find(p => p.id === selectedPortal)?.name}</CardTitle>
            <div className="mt-4">
              <EssentiaAvatar state={avatarState} />
            </div>
            <Progress value={portalProgress} className="mt-4" />
          </CardHeader>
          <CardContent>
            <Portal
              type={selectedPortal}
              isActive={portalActive}
              progress={portalProgress}
            />

            {portalProgress === 100 && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => setStep('dashboard')}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Portal Concluído!
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'journal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <Book className="w-12 h-12 mx-auto mb-2 text-purple-600" />
            <CardTitle className="text-2xl">Diário de Jornada</CardTitle>
            <p className="text-gray-600">O que você está sentindo ou pensando?</p>
            <div className="mt-4">
              <EssentiaAvatar state={avatarState} />
            </div>
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

  if (step === 'chat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="max-w-4xl mx-auto h-[90vh] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <EssentiaAvatar state={avatarState} />
                <div>
                  <CardTitle className="text-2xl">Coach IA - 4 Personas</CardTitle>
                  <p className="text-gray-600 text-sm">Escolha quem te guiará hoje</p>
                </div>
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
                  size="sm"
                  className="flex-1"
                >
                  <span>{p.emoji}</span>
                  <span className="ml-1 hidden md:inline">{p.name}</span>
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
                  Olá! Sou {personas.find(p => p.id === selectedPersona)?.name}. Como posso te ajudar?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {personas.find(p => p.id === selectedPersona)?.focus}
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

  if (step === 'community') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-purple-600" />
                    Comunidade Essentia
                  </CardTitle>
                  <p className="text-gray-600">Conecte-se com outros exploradores</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep('dashboard')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {communityPosts.map(post => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                          {post.author[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <Badge variant="outline" className="text-xs">{post.level}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">{post.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2 border-t">
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500">
                        <Share2 className="w-4 h-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conectar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Encontrar Conexões
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Eventos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Coffee className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Círculo de Propósito</p>
                      <p className="text-xs text-gray-600">Amanhã às 19h</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Meditação Global</p>
                      <p className="text-xs text-gray-600">Sábado às 7h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <EssentiaAvatar state={avatarState} />
                <div>
                  <CardTitle className="text-3xl">Olá, {user?.name}! ✨</CardTitle>
                  <p className="text-purple-100 mt-1">
                    Clareza: {user?.clarity}% • {user?.totalPractices} práticas • Estágio {user?.journeyStage}/6
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleBackgroundMusic}
                  className="bg-white/20 text-white border-white/40 hover:bg-white/30"
                  title="Música ambiente"
                >
                  {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('essentia-mega-user');
                    window.location.reload();
                  }}
                  className="bg-white/20 text-white border-white/40 hover:bg-white/30"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resetar
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="journey" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="journey">Jornada</TabsTrigger>
            <TabsTrigger value="portals">Portais</TabsTrigger>
            <TabsTrigger value="practices">Práticas</TabsTrigger>
            <TabsTrigger value="ai">IA Coach</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
          </TabsList>

          <TabsContent value="journey" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="text-center mb-4">
                  <EssentiaAvatar state={avatarState} />
                </div>
                <CardTitle className="flex items-center justify-center">
                  <Compass className="w-5 h-5 mr-2 text-purple-600" />
                  Jornada de 6 Estágios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {journeyStages.map(stage => {
                    const Icon = stage.icon;
                    const isCompleted = user && user.journeyStage > stage.id;
                    const isCurrent = user?.journeyStage === stage.id;
                    
                    const handleStageClick = () => {
                      // Navegação baseada no estágio
                      switch(stage.id) {
                        case 1: // Despertar Interior
                          startBreathing();
                          break;
                        case 2: // Autoconhecimento
                          setStep('journal');
                          break;
                        case 3: // Paixões
                          startPortal('clareza');
                          break;
                        case 4: // Relacionamentos
                          setStep('community');
                          break;
                        case 5: // Missão
                          startPortal('proposito');
                          break;
                        case 6: // Propósito
                          setStep('chat');
                          break;
                      }
                    };
                    
                    return (
                      <button
                        key={stage.id}
                        onClick={handleStageClick}
                        className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
                          isCurrent ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-600 shadow-md' :
                          isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200 hover:bg-purple-50/30'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl">{stage.emoji}</span>
                          <Icon className={`w-6 h-6 ${
                            isCurrent ? 'text-purple-600' :
                            isCompleted ? 'text-green-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold">{stage.name}</p>
                          <p className="text-xs text-gray-600">{stage.description}</p>
                          {isCurrent && <Badge className="mt-1 bg-purple-600">✨ Atual</Badge>}
                        </div>
                        {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                        <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Tríade Essentia
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
          </TabsContent>

          <TabsContent value="portals" className="mt-6">
            <div className="text-center mb-6">
              <EssentiaAvatar state={avatarState} />
              <p className="text-gray-600 mt-2">Escolha um portal para explorar</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portals.map(portal => {
                const Icon = portal.icon;
                const isCompleted = user?.completedPortals.includes(portal.id);
                
                const gradients = {
                  blue: 'from-blue-500 to-cyan-500',
                  green: 'from-green-500 to-emerald-500',
                  red: 'from-red-500 to-orange-500',
                  purple: 'from-purple-500 to-pink-500',
                  pink: 'from-pink-500 to-rose-500',
                  orange: 'from-orange-500 to-amber-500',
                  cyan: 'from-cyan-500 to-teal-500'
                };
                
                return (
                  <Card key={portal.id} className={`hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden ${isCompleted ? 'border-2 border-green-400' : ''}`}>
                    <div className={`h-2 bg-gradient-to-r ${gradients[portal.color as keyof typeof gradients]}`} />
                    <CardHeader className="text-center pb-2">
                      <Icon className={`w-12 h-12 mx-auto mb-2 text-${portal.color}-600`} />
                      <CardTitle className="text-lg">
                        {portal.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => startPortal(portal.id)}
                        className={`w-full bg-gradient-to-r ${gradients[portal.color as keyof typeof gradients]} hover:opacity-90`}
                      >
                        {isCompleted ? (
                          <>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Repetir
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar
                          </>
                        )}
                      </Button>
                      {isCompleted && (
                        <Badge className="w-full mt-2 bg-green-600 justify-center">
                          Concluído ✓
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="practices" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Button
                onClick={startBreathing}
                className="h-32 text-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 flex-col relative overflow-hidden"
              >
                {soundEnabled && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
                <Wind className="w-8 h-8 mb-2 relative z-10" />
                <span className="relative z-10">Respiração Guiada</span>
                <span className="text-sm mt-1 flex items-center relative z-10">
                  🔊 Som 174Hz {soundEnabled && '• Tocando'}
                </span>
              </Button>

              <Button
                onClick={() => setStep('ritual')}
                className="h-32 text-lg bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 flex-col"
                disabled={user?.rituals.morning && user?.rituals.evening}
              >
                {new Date().getHours() < 12 ? '🌅' : '🌙'}
                <span className="text-base mt-2">
                  {new Date().getHours() < 12 ? 'Ritual Matinal' : 'Ritual Noturno'}
                </span>
                {user?.rituals.morning && new Date().getHours() < 12 && (
                  <Badge className="mt-1 bg-green-600">Feito ✓</Badge>
                )}
                {user?.rituals.evening && new Date().getHours() >= 18 && (
                  <Badge className="mt-1 bg-green-600">Feito ✓</Badge>
                )}
              </Button>

              <Button
                onClick={() => setStep('journal')}
                className="h-32 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex-col"
              >
                <Book className="w-8 h-8 mb-2" />
                Diário
                <span className="text-sm mt-1">Com insights IA</span>
              </Button>

              <Button
                onClick={() => setStep('chat')}
                className="h-32 text-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 flex-col"
              >
                <MessageCircle className="w-8 h-8 mb-2" />
                Coach IA
                <span className="text-sm mt-1">4 Personas</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personas.map(p => (
                <Card key={p.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <span className="text-3xl mr-3">{p.emoji}</span>
                      {p.name}
                    </CardTitle>
                    <p className="text-gray-600">{p.focus}</p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => {
                        setSelectedPersona(p.id);
                        setStep('chat');
                      }}
                      className="w-full"
                    >
                      Conversar com {p.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Feed da Comunidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityPosts.slice(0, 2).map(post => (
                    <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm">
                          {post.author[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{post.author}</p>
                          <Badge variant="outline" className="text-xs">{post.level}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{post.content}</p>
                      <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setStep('community')}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Ver Comunidade Completa
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Estatísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{user?.streak || 0}</div>
                <div className="text-sm text-gray-600">Dias Consecutivos</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{user?.totalPractices || 0}</div>
                <div className="text-sm text-gray-600">Total Práticas</div>
              </div>
              <div className="text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{user?.clarity || 0}%</div>
                <div className="text-sm text-gray-600">Clareza</div>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{user?.completedPortals.length || 0}/{portals.length}</div>
                <div className="text-sm text-gray-600">Portais</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}