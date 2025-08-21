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
  Heart, 
  Brain, 
  Zap, 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Eye,
  Wind,
  Waves,
  Sun
} from 'lucide-react';

interface ImmersivePortalExperienceProps {
  portalId: string;
  onComplete: (insights: string[]) => void;
  onBack: () => void;
}

interface PortalPhase {
  id: string;
  title: string;
  duration: number; // segundos
  description: string;
  instruction: string;
  soundFreq: number;
  visualPattern: string;
  breathingPattern?: {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
  };
}

const PORTAL_EXPERIENCES = {
  proposito: {
    title: "Portal do Propósito",
    icon: Brain,
    color: "purple",
    bgColor: "from-purple-900 via-indigo-900 to-blue-900",
    ambientSound: "cosmic",
    phases: [
      {
        id: "centering",
        title: "Centrando a Consciência",
        duration: 60,
        description: "Preparando sua mente para a jornada interior",
        instruction: "Feche os olhos e respire profundamente. Sinta-se presente neste momento.",
        soundFreq: 432,
        visualPattern: "expanding-circle",
        breathingPattern: { inhale: 4, hold: 2, exhale: 6, pause: 2 }
      },
      {
        id: "exploration",
        title: "Explorando sua Essência",
        duration: 120,
        description: "Conectando com seus valores mais profundos",
        instruction: "Reflita: O que realmente importa para você? Qual legado quer deixar?",
        soundFreq: 528,
        visualPattern: "spiral-journey"
      },
      {
        id: "clarity",
        title: "Cristalizando sua Missão",
        duration: 90,
        description: "Definindo seu propósito com clareza",
        instruction: "Visualize-se vivendo seu propósito plenamente. Como se sente?",
        soundFreq: 639,
        visualPattern: "diamond-formation"
      },
      {
        id: "integration",
        title: "Integrando Insights",
        duration: 60,
        description: "Consolidando as descobertas",
        instruction: "Anote mentalmente três insights principais desta experiência.",
        soundFreq: 741,
        visualPattern: "golden-light"
      }
    ]
  },
  vitalidade: {
    title: "Portal da Vitalidade",
    icon: Zap,
    color: "yellow",
    bgColor: "from-yellow-600 via-orange-600 to-red-600",
    ambientSound: "energetic",
    phases: [
      {
        id: "activation",
        title: "Ativando a Energia",
        duration: 45,
        description: "Despertando sua força vital",
        instruction: "Sinta a energia circulando pelo seu corpo. Mova-se levemente.",
        soundFreq: 396,
        visualPattern: "pulsing-energy",
        breathingPattern: { inhale: 3, hold: 1, exhale: 3, pause: 1 }
      },
      {
        id: "circulation",
        title: "Circulação Energética",
        duration: 100,
        description: "Distribuindo vitalidade por todo o ser",
        instruction: "Visualize luz dourada preenchendo cada célula do seu corpo.",
        soundFreq: 417,
        visualPattern: "flowing-river"
      },
      {
        id: "empowerment",
        title: "Empoderando Ações",
        duration: 80,
        description: "Canalizando energia para realizações",
        instruction: "Conecte-se com sua motivação. O que quer criar no mundo?",
        soundFreq: 852,
        visualPattern: "lightning-network"
      },
      {
        id: "sustainment",
        title: "Sustentando a Vitalidade",
        duration: 55,
        description: "Estabelecendo práticas duradouras",
        instruction: "Comprometa-se com hábitos que nutrem sua energia vital.",
        soundFreq: 963,
        visualPattern: "eternal-flame"
      }
    ]
  },
  harmonia: {
    title: "Portal da Harmonia",
    icon: Heart,
    color: "red",
    bgColor: "from-pink-600 via-rose-600 to-red-600",
    ambientSound: "healing",
    phases: [
      {
        id: "calming",
        title: "Acalmando as Ondas",
        duration: 70,
        description: "Tranquilizando mente e emoções",
        instruction: "Deixe ir qualquer tensão. Permita-se sentir paz profunda.",
        soundFreq: 174,
        visualPattern: "calm-ocean",
        breathingPattern: { inhale: 4, hold: 4, exhale: 8, pause: 4 }
      },
      {
        id: "balancing",
        title: "Equilibrando Polaridades",
        duration: 110,
        description: "Harmonizando aspectos internos",
        instruction: "Aceite todos os aspectos de si. Encontre equilíbrio na dualidade.",
        soundFreq: 285,
        visualPattern: "yin-yang-flow"
      },
      {
        id: "healing",
        title: "Curando Feridas Emocionais",
        duration: 95,
        description: "Liberando bloqueios do coração",
        instruction: "Envie amor e perdão para você mesmo e outros.",
        soundFreq: 396,
        visualPattern: "healing-mandala"
      },
      {
        id: "coherence",
        title: "Coerência do Coração",
        duration: 65,
        description: "Alinhando coração e mente",
        instruction: "Sinta gratidão. Deixe o coração guiar seus próximos passos.",
        soundFreq: 528,
        visualPattern: "heart-resonance"
      }
    ]
  }
};

export const ImmersivePortalExperience = ({ portalId, onComplete, onBack }: ImmersivePortalExperienceProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
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

  const portal = PORTAL_EXPERIENCES[portalId as keyof typeof PORTAL_EXPERIENCES];
  const phase = portal.phases[currentPhase];
  const progress = (timeElapsed / phase.duration) * 100;
  const totalProgress = ((currentPhase * 100) + progress) / portal.phases.length;

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
          if (prev >= phase.duration) {
            if (currentPhase < portal.phases.length - 1) {
              setCurrentPhase(currentPhase + 1);
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
  }, [isPlaying, currentPhase, phase.duration, portal.phases.length]);

  // Audio generation
  const startAudio = () => {
    if (!audioContextRef.current || isMuted) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(phase.soundFreq, audioContextRef.current.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 2);
      
      oscillator.start();
      
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
    } catch (error) {
      console.log('Audio não disponível');
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (error) {
        // Silent cleanup
      }
      oscillatorRef.current = null;
    }
  };

  // Canvas animation
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
      
      // Diferentes padrões visuais baseados na fase
      switch (phase.visualPattern) {
        case 'expanding-circle':
          const radius = 50 + Math.sin(animationTime * 0.02) * 30;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = `hsl(${270 + Math.sin(animationTime * 0.01) * 30}, 70%, 60%)`;
          ctx.lineWidth = 3;
          ctx.stroke();
          break;
          
        case 'spiral-journey':
          ctx.beginPath();
          for (let i = 0; i < 200; i++) {
            const angle = i * 0.1 + animationTime * 0.01;
            const r = i * 0.5;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `hsl(${240}, 80%, 70%)`;
          ctx.lineWidth = 2;
          ctx.stroke();
          break;
          
        case 'pulsing-energy':
          for (let i = 0; i < 5; i++) {
            const radius = 20 + i * 15 + Math.sin(animationTime * 0.05 + i) * 10;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = `hsla(${45 + i * 10}, 90%, 60%, ${0.8 - i * 0.15})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          break;
          
        case 'calm-ocean':
          for (let x = 0; x < canvas.width; x += 10) {
            const y = centerY + Math.sin(x * 0.02 + animationTime * 0.01) * 20;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = `hsla(${200}, 70%, 60%, 0.6)`;
            ctx.fill();
          }
          break;
          
        default:
          // Pattern padrão
          ctx.beginPath();
          ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
          ctx.strokeStyle = `hsl(${animationTime % 360}, 70%, 60%)`;
          ctx.lineWidth = 2;
          ctx.stroke();
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
  }, [isPlaying, phase.visualPattern]);

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
      `Através do ${portal.title}, descobri aspectos importantes sobre minha jornada.`,
      `A experiência me trouxe clareza sobre minhas prioridades atuais.`,
      `Sinto-me mais conectado(a) com minha essência após esta prática.`
    ];
    
    onComplete([...insights, ...generatedInsights]);
  };

  if (showInsightCapture) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${portal.bgColor} flex items-center justify-center p-4`}>
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              Portal Concluído!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Você completou o {portal.title}. Que insights surgiram?
              </p>
              
              <div className="space-y-3">
                <textarea
                  placeholder="Compartilhe suas descobertas e reflexões..."
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
    <div className={`min-h-screen bg-gradient-to-br ${portal.bgColor} text-white`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <h1 className="text-2xl font-bold flex items-center">
            <portal.icon className="w-6 h-6 mr-2" />
            {portal.title}
          </h1>
          
          <div className="flex items-center space-x-2">
            <Button onClick={toggleMute} variant="ghost" size="sm" className="text-white">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso Total</span>
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
            </CardContent>
          </Card>

          {/* Phase Information */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{phase.title}</span>
                <Badge variant="outline" className="text-white border-white/30">
                  Fase {currentPhase + 1}/{portal.phases.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/90">{phase.description}</p>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-white font-medium">{phase.instruction}</p>
              </div>
              
              {phase.breathingPattern && (
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Padrão Respiratório:</h4>
                  <div className="grid grid-cols-4 gap-2 text-sm text-white/80">
                    <div>Inspire: {phase.breathingPattern.inhale}s</div>
                    <div>Segure: {phase.breathingPattern.hold}s</div>
                    <div>Expire: {phase.breathingPattern.exhale}s</div>
                    <div>Pausa: {phase.breathingPattern.pause}s</div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/80">
                  <span>Tempo da Fase</span>
                  <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')} / {Math.floor(phase.duration / 60)}:{(phase.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <Progress value={progress} className="bg-white/20" />
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
            {isPlaying ? 'Pausar' : 'Iniciar'}
          </Button>
        </div>
      </div>
    </div>
  );
};