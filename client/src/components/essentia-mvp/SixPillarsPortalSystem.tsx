import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowLeft,
  CheckCircle,
  Eye,
  Heart,
  Compass,
  Zap,
  Users,
  Crown
} from 'lucide-react';

interface SixPillarsPortalSystemProps {
  pillarId: string;
  onComplete: (insights: string[]) => void;
  onBack: () => void;
}

// Os 6 Pilares da Jornada de Propósito
const SIX_PILLARS = {
  autoconhecimento: {
    title: "Autoconhecimento",
    subtitle: "Quem Eu Sou?",
    icon: Eye,
    color: "blue",
    bgColor: "from-blue-800 via-indigo-800 to-purple-800",
    description: "Descobrindo sua essência, valores e identidade verdadeira",
    journey: "A jornada do autoconhecimento é sobre olhar para dentro e descobrir quem você realmente é, além das máscaras e expectativas.",
    practices: [
      {
        title: "Reflexão Profunda",
        duration: 180,
        instruction: "Explore suas crenças, valores e padrões de comportamento. O que te define verdadeiramente?",
        breathingPattern: { inhale: 4, hold: 4, exhale: 6, pause: 2 },
        soundType: "nature"
      },
      {
        title: "Diálogo Interior",
        duration: 240,
        instruction: "Converse com diferentes aspectos de sua personalidade. Que vozes internas você reconhece?",
        soundType: "meditation"
      },
      {
        title: "Integração da Sombra",
        duration: 200,
        instruction: "Aceite e integre os aspectos que você preferiria não ver em si mesmo.",
        soundType: "healing"
      }
    ]
  },
  paixao: {
    title: "Paixão",
    subtitle: "O que Me Move?",
    icon: Heart,
    color: "red",
    bgColor: "from-red-700 via-pink-700 to-rose-700",
    description: "Conectando com aquilo que desperta seu entusiasmo e energia vital",
    journey: "A paixão é o combustível da alma. É descobrir o que faz seus olhos brilharem e seu coração acelerar.",
    practices: [
      {
        title: "Ativação da Paixão",
        duration: 150,
        instruction: "Lembre-se de momentos quando se sentiu mais vivo. O que estava fazendo? Como se sentia?",
        breathingPattern: { inhale: 3, hold: 1, exhale: 4, pause: 1 },
        soundType: "energetic"
      },
      {
        title: "Exploração de Interesses",
        duration: 220,
        instruction: "Explore diferentes áreas que despertam sua curiosidade. Não julgue, apenas explore.",
        soundType: "creative"
      },
      {
        title: "Compromisso com a Paixão",
        duration: 180,
        instruction: "Como você pode incorporar mais daquilo que ama na sua vida diária?",
        soundType: "empowering"
      }
    ]
  },
  missao: {
    title: "Missão",
    subtitle: "Por que Estou Aqui?",
    icon: Compass,
    color: "green",
    bgColor: "from-green-700 via-emerald-700 to-teal-700",
    description: "Descobrindo seu propósito único e contribuição para o mundo",
    journey: "Sua missão é a razão pela qual você está aqui. É a contribuição única que só você pode dar ao mundo.",
    practices: [
      {
        title: "Chamado Interior",
        duration: 200,
        instruction: "Escute profundamente. Que chamado ressoa em seu coração? Que problema você sente chamado a resolver?",
        breathingPattern: { inhale: 5, hold: 2, exhale: 7, pause: 3 },
        soundType: "spiritual"
      },
      {
        title: "Visão de Futuro",
        duration: 250,
        instruction: "Visualize o mundo melhor que você quer criar. Como sua vida contribui para essa visão?",
        soundType: "visionary"
      },
      {
        title: "Declaração de Propósito",
        duration: 180,
        instruction: "Formule em palavras claras: qual é sua missão nesta vida?",
        soundType: "ceremonial"
      }
    ]
  },
  talentos: {
    title: "Talentos",
    subtitle: "Como Posso Contribuir?",
    icon: Zap,
    color: "yellow",
    bgColor: "from-yellow-600 via-orange-600 to-amber-600",
    description: "Reconhecendo e desenvolvendo seus dons naturais e habilidades únicas",
    journey: "Seus talentos são presentes que você trouxe para compartilhar. É hora de reconhecê-los e polí-los.",
    practices: [
      {
        title: "Reconhecimento de Dons",
        duration: 160,
        instruction: "O que vem naturalmente para você? Que elogios você recebe frequentemente?",
        breathingPattern: { inhale: 4, hold: 2, exhale: 4, pause: 2 },
        soundType: "confidence"
      },
      {
        title: "Desenvolvimento de Habilidades",
        duration: 200,
        instruction: "Como você pode aprimorar e expandir seus talentos naturais?",
        soundType: "growth"
      },
      {
        title: "Aplicação Prática",
        duration: 190,
        instruction: "De que formas você pode usar seus talentos para servir sua missão?",
        soundType: "achievement"
      }
    ]
  },
  conexao: {
    title: "Conexão",
    subtitle: "Como Me Relaciono?",
    icon: Users,
    color: "purple",
    bgColor: "from-purple-700 via-violet-700 to-indigo-700",
    description: "Cultivando relacionamentos autênticos e comunidade significativa",
    journey: "Nenhum propósito é vivido em isolamento. A conexão genuína com outros amplifica seu impacto.",
    practices: [
      {
        title: "Conexão Consigo",
        duration: 170,
        instruction: "Como você se relaciona consigo mesmo? Pratique autocompaixão e aceitação.",
        breathingPattern: { inhale: 4, hold: 3, exhale: 5, pause: 2 },
        soundType: "loving"
      },
      {
        title: "Relacionamentos Autênticos",
        duration: 210,
        instruction: "Reflita sobre seus relacionamentos. Onde você pode ser mais autêntico e vulnerável?",
        soundType: "harmonious"
      },
      {
        title: "Serviço à Comunidade",
        duration: 200,
        instruction: "Como sua missão serve à comunidade? Que redes de apoio você pode cultivar?",
        soundType: "unity"
      }
    ]
  },
  lideranca: {
    title: "Liderança",
    subtitle: "Como Posso Liderar?",
    icon: Crown,
    color: "gold",
    bgColor: "from-yellow-500 via-amber-500 to-orange-500",
    description: "Desenvolvendo sua capacidade de influenciar positivamente e inspirar outros",
    journey: "Liderança verdadeira vem do exemplo, da integridade e da capacidade de inspirar outros a serem sua melhor versão.",
    practices: [
      {
        title: "Liderança Pessoal",
        duration: 180,
        instruction: "Como você lidera sua própria vida? Que exemplo você está dando?",
        breathingPattern: { inhale: 5, hold: 3, exhale: 7, pause: 3 },
        soundType: "powerful"
      },
      {
        title: "Influência Positiva",
        duration: 230,
        instruction: "Como você pode usar sua influência para elevar outros e causar impacto positivo?",
        soundType: "inspiring"
      },
      {
        title: "Legado de Liderança",
        duration: 190,
        instruction: "Que tipo de líder você quer ser lembrado por ter sido? Qual seu legado?",
        soundType: "legacy"
      }
    ]
  }
};

// Sistema de sons mais naturais
const SOUND_LIBRARY = {
  nature: { frequency: 285, type: 'sine', volume: 0.3, modulation: 'gentle' },
  meditation: { frequency: 432, type: 'sine', volume: 0.25, modulation: 'steady' },
  healing: { frequency: 528, type: 'sine', volume: 0.3, modulation: 'healing' },
  energetic: { frequency: 396, type: 'square', volume: 0.4, modulation: 'dynamic' },
  creative: { frequency: 639, type: 'triangle', volume: 0.35, modulation: 'flowing' },
  empowering: { frequency: 741, type: 'sine', volume: 0.4, modulation: 'rising' },
  spiritual: { frequency: 852, type: 'sine', volume: 0.2, modulation: 'ethereal' },
  visionary: { frequency: 963, type: 'sine', volume: 0.25, modulation: 'expansive' },
  ceremonial: { frequency: 417, type: 'sine', volume: 0.3, modulation: 'ceremonial' },
  confidence: { frequency: 456, type: 'triangle', volume: 0.35, modulation: 'confident' },
  growth: { frequency: 512, type: 'sine', volume: 0.3, modulation: 'growing' },
  achievement: { frequency: 693, type: 'square', volume: 0.4, modulation: 'victorious' },
  loving: { frequency: 341, type: 'sine', volume: 0.25, modulation: 'warm' },
  harmonious: { frequency: 426, type: 'sine', volume: 0.3, modulation: 'harmonic' },
  unity: { frequency: 567, type: 'triangle', volume: 0.35, modulation: 'unifying' },
  powerful: { frequency: 789, type: 'square', volume: 0.45, modulation: 'strong' },
  inspiring: { frequency: 654, type: 'sine', volume: 0.4, modulation: 'uplifting' },
  legacy: { frequency: 888, type: 'sine', volume: 0.3, modulation: 'eternal' }
};

export const SixPillarsPortalSystem = ({ pillarId, onComplete, onBack }: SixPillarsPortalSystemProps) => {
  const [currentPractice, setCurrentPractice] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [showInsightCapture, setShowInsightCapture] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const pillar = SIX_PILLARS[pillarId as keyof typeof SIX_PILLARS];
  const practice = pillar.practices[currentPractice];
  const progress = (timeElapsed / practice.duration) * 100;
  const totalProgress = ((currentPractice * 100) + progress) / pillar.practices.length;

  // Inicializar Web Audio
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      stopAudio();
    };
  }, []);

  // Controle de tempo
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => {
          if (prev >= practice.duration) {
            if (currentPractice < pillar.practices.length - 1) {
              setCurrentPractice(currentPractice + 1);
              return 0;
            } else {
              setIsPlaying(false);
              setShowInsightCapture(true);
              return prev;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentPractice, practice.duration, pillar.practices.length]);

  // Sistema de áudio melhorado
  const startAudio = () => {
    if (!audioContextRef.current || isMuted) return;

    try {
      const soundConfig = SOUND_LIBRARY[practice.soundType as keyof typeof SOUND_LIBRARY];
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      const filterNode = audioContextRef.current.createBiquadFilter();
      
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(soundConfig.frequency, audioContextRef.current.currentTime);
      oscillator.type = soundConfig.type as OscillatorType;
      
      // Filtro para suavizar o som
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(soundConfig.volume, audioContextRef.current.currentTime + 3);
      
      oscillator.start();
      
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
    } catch (error) {
      console.log('Audio não disponível');
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current && gainNodeRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 1);
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
          }
        }, 1000);
      } catch (error) {
        // Silent cleanup
      }
      oscillatorRef.current = null;
      gainNodeRef.current = null;
    }
  };

  // Animação Canvas melhorada
  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Animação baseada no pilar
      switch (pillarId) {
        case 'autoconhecimento':
          // Olho que se abre gradualmente
          const eyeSize = 40 + Math.sin(animationTime * 0.02) * 10;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, eyeSize, eyeSize * 0.6, 0, 0, 2 * Math.PI);
          ctx.strokeStyle = `hsl(240, 70%, ${60 + Math.sin(animationTime * 0.01) * 20}%)`;
          ctx.lineWidth = 3;
          ctx.stroke();
          
          // Pupila
          ctx.beginPath();
          ctx.arc(centerX, centerY, eyeSize * 0.3, 0, 2 * Math.PI);
          ctx.fillStyle = `hsl(240, 90%, 30%)`;
          ctx.fill();
          break;
          
        case 'paixao':
          // Coração pulsante
          const heartSize = 1 + Math.sin(animationTime * 0.1) * 0.3;
          ctx.save();
          ctx.scale(heartSize, heartSize);
          ctx.translate(centerX / heartSize, centerY / heartSize);
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.bezierCurveTo(-20, -20, -40, -10, -20, 0);
          ctx.bezierCurveTo(-20, 10, 0, 20, 0, 30);
          ctx.bezierCurveTo(0, 20, 20, 10, 20, 0);
          ctx.bezierCurveTo(40, -10, 20, -20, 0, -10);
          ctx.fillStyle = `hsl(340, 80%, ${60 + Math.sin(animationTime * 0.05) * 20}%)`;
          ctx.fill();
          ctx.restore();
          break;
          
        case 'missao':
          // Bússola giratória
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(animationTime * 0.01);
          ctx.beginPath();
          ctx.moveTo(0, -40);
          ctx.lineTo(10, 0);
          ctx.lineTo(0, 40);
          ctx.lineTo(-10, 0);
          ctx.closePath();
          ctx.fillStyle = `hsl(160, 70%, 50%)`;
          ctx.fill();
          ctx.restore();
          break;
          
        default:
          // Padrão genérico
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2 / 6) + animationTime * 0.02;
            const x = centerX + Math.cos(angle) * (30 + Math.sin(animationTime * 0.05 + i) * 10);
            const y = centerY + Math.sin(angle) * (30 + Math.sin(animationTime * 0.05 + i) * 10);
            
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = `hsla(${60 * i}, 70%, 60%, 0.8)`;
            ctx.fill();
          }
      }
      
      animationTime++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, pillarId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAudio();
    } else {
      setIsPlaying(true);
      startAudio();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stopAudio();
    } else if (isPlaying) {
      startAudio();
    }
  };

  const handleComplete = () => {
    const generatedInsights = [
      `O pilar ${pillar.title} me trouxe clareza sobre ${pillar.subtitle.toLowerCase()}`,
      `Descobri aspectos importantes sobre minha jornada de propósito.`,
      `Sinto-me mais conectado(a) com minha essência e direção de vida.`
    ];
    
    onComplete([...insights, ...generatedInsights]);
  };

  if (showInsightCapture) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${pillar.bgColor} flex items-center justify-center p-4`}>
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              {pillar.title} Concluído!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Você explorou o pilar {pillar.title}. Que insights surgiram sobre {pillar.subtitle.toLowerCase()}?
              </p>
              
              <div className="space-y-3">
                <textarea
                  placeholder="Compartilhe suas descobertas sobre sua jornada de propósito..."
                  className="w-full p-4 border rounded-lg h-32 resize-none"
                  onChange={(e) => setInsights([e.target.value])}
                />
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button onClick={onBack} variant="outline" className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={handleComplete} className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${pillar.bgColor} text-white`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center">
              <pillar.icon className="w-8 h-8 mr-3" />
              {pillar.title}
            </h1>
            <p className="text-white/80 text-lg mt-1">{pillar.subtitle}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={toggleMute} variant="ghost" size="sm" className="text-white">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso da Jornada</span>
            <span>{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="bg-white/20" />
        </div>
      </div>

      {/* Main Experience */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visual Canvas */}
          <Card className="bg-black/30 backdrop-blur border-white/20">
            <CardContent className="p-6">
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg border border-white/20"
              />
              
              <div className="mt-4 text-center text-white/60 text-sm">
                {pillar.journey}
              </div>
            </CardContent>
          </Card>

          {/* Practice Information */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{practice.title}</span>
                <Badge variant="outline" className="text-white border-white/30">
                  Prática {currentPractice + 1}/{pillar.practices.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-white font-medium">{practice.instruction}</p>
              </div>
              
              {practice.breathingPattern && (
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Respiração Consciente:</h4>
                  <div className="grid grid-cols-4 gap-2 text-sm text-white/80">
                    <div>Inspire: {practice.breathingPattern.inhale}s</div>
                    <div>Segure: {practice.breathingPattern.hold}s</div>
                    <div>Expire: {practice.breathingPattern.exhale}s</div>
                    <div>Pausa: {practice.breathingPattern.pause}s</div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/80">
                  <span>Tempo da Prática</span>
                  <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')} / {Math.floor(practice.duration / 60)}:{(practice.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <Progress value={progress} className="bg-white/20" />
              </div>
              
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-white/70 text-sm">{pillar.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-8 text-center">
          <Button
            onClick={togglePlayPause}
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isPlaying ? 'Pausar Jornada' : 'Iniciar Jornada'}
          </Button>
        </div>
      </div>
    </div>
  );
};