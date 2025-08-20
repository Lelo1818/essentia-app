import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  Heart, 
  Sparkles, 
  Volume2,
  VolumeX,
  Hand,
  CheckCircle,
  Film
} from 'lucide-react';

interface PortalVideoConexaoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (reflection: string) => void;
}

interface VideoScene {
  id: number;
  title: string;
  description: string;
  narration: string;
  startTime: number;
  duration: number;
  interactive?: boolean;
}

const videoScenes: VideoScene[] = [
  {
    id: 1,
    title: 'O Vazio e a Respiração',
    description: 'Fundo escuro minimalista, avatar sozinho com brilho sutil',
    narration: 'Respire fundo. Sinta-se aqui, agora, com o seu corpo. Apenas você.',
    startTime: 0,
    duration: 30
  },
  {
    id: 2,
    title: 'O Fio de Luz',
    description: 'Luz pulsando no peito, fios de energia se expandindo',
    narration: 'Sinta a sua própria energia. Imagine uma luz, um calor que vem do centro do seu peito. A cada expiração, visualize essa luz se expandindo.',
    startTime: 30,
    duration: 45
  },
  {
    id: 3,
    title: 'O Grande Tecido',
    description: 'Conexões se formando, vasto tecido de estrelas interconectadas',
    narration: 'Esses fios de luz são suas conexões. Sinta-os se unindo ao grande tecido da vida. Você não está sozinho. Você está interconectado a tudo que existe.',
    startTime: 75,
    duration: 60
  },
  {
    id: 4,
    title: 'A Prática do Toque',
    description: 'Momento interativo - O Toque da Unidade',
    narration: 'Toque algo próximo a você. A sua pele, uma mesa, o chão. Sinta a textura, a temperatura. Sua consciência está viva nesse toque.',
    startTime: 135,
    duration: 30,
    interactive: true
  },
  {
    id: 5,
    title: 'O Círculo Completo',
    description: 'Constelação final revelando a beleza das conexões',
    narration: 'Você não está sozinho. A conexão essencial vive em você.',
    startTime: 165,
    duration: 15
  }
];

export const PortalVideoConexao = ({ isOpen, onOpenChange, onComplete }: PortalVideoConexaoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [touchPoints, setTouchPoints] = useState<{x: number, y: number, time: number}[]>([]);
  const animationFrameRef = useRef<number>();

  const totalDuration = 180; // 3 minutos
  const currentScene = videoScenes[currentSceneIndex];

  // Síntese de voz usando Web Speech API
  const speakNarration = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 0.7;
      
      // Procurar por voz feminina em português
      const voices = speechSynthesis.getVoices();
      const ptVoice = voices.find(voice => 
        voice.lang.includes('pt') && voice.name.toLowerCase().includes('female')
      ) || voices.find(voice => voice.lang.includes('pt'));
      
      if (ptVoice) {
        utterance.voice = ptVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  // Renderização das cenas no canvas
  const renderScene = (ctx: CanvasRenderingContext2D, sceneId: number, progress: number) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;

    // Limpar canvas
    ctx.clearRect(0, 0, width, height);

    switch (sceneId) {
      case 1: // O Vazio e a Respiração
        // Fundo escuro com gradiente
        const gradient1 = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
        gradient1.addColorStop(0, 'rgba(20, 20, 40, 0.8)');
        gradient1.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, width, height);

        // Avatar central com brilho sutil
        const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(width/2, height/2, 30 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${pulse * 0.6})`;
        ctx.fill();
        
        // Aura sutil
        ctx.beginPath();
        ctx.arc(width/2, height/2, 50 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${pulse * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        break;

      case 2: // O Fio de Luz
        // Fundo escuro
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, width, height);

        // Coração pulsante
        const heartPulse = Math.sin(Date.now() * 0.008) * 0.4 + 1;
        ctx.beginPath();
        ctx.arc(width/2, height/2, 25 * heartPulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${heartPulse * 0.8})`;
        ctx.fill();

        // Fios de luz irradiando
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const length = 80 + Math.sin(Date.now() * 0.003 + i) * 20;
          const x1 = width/2 + Math.cos(angle) * 30;
          const y1 = height/2 + Math.sin(angle) * 30;
          const x2 = width/2 + Math.cos(angle) * length;
          const y2 = height/2 + Math.sin(angle) * length;
          
          const threadGradient = ctx.createLinearGradient(x1, y1, x2, y2);
          threadGradient.addColorStop(0, 'rgba(34, 211, 238, 0.8)');
          threadGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
          
          ctx.strokeStyle = threadGradient;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        break;

      case 3: // O Grande Tecido
        // Fundo cósmico
        const cosmicGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        cosmicGradient.addColorStop(0, 'rgba(30, 20, 60, 1)');
        cosmicGradient.addColorStop(0.5, 'rgba(60, 20, 80, 1)');
        cosmicGradient.addColorStop(1, 'rgba(0, 0, 20, 1)');
        ctx.fillStyle = cosmicGradient;
        ctx.fillRect(0, 0, width, height);

        // Pontos de conexão
        const points = [];
        for (let i = 0; i < 15; i++) {
          const x = (i % 5) * (width / 4) + width / 8;
          const y = Math.floor(i / 5) * (height / 3) + height / 6;
          const pulse = Math.sin(Date.now() * 0.004 + i * 0.5) * 0.5 + 1;
          
          points.push({ x, y });
          
          ctx.beginPath();
          ctx.arc(x, y, 4 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.8})`;
          ctx.fill();
        }

        // Linhas de conexão
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            if (Math.random() > 0.7) {
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }

        // Avatar central integrado
        ctx.beginPath();
        ctx.arc(width/2, height/2, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 1)';
        ctx.fill();
        break;

      case 4: // A Prática do Toque
        // Fundo sereno
        ctx.fillStyle = '#0f4c75';
        ctx.fillRect(0, 0, width, height);

        // Indicação de toque
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Toque da Unidade', width/2, height/2 - 40);
        ctx.font = '16px Arial';
        ctx.fillText('Toque aqui para criar conexões', width/2, height/2 + 20);

        // Renderizar ondas de toque
        touchPoints.forEach(point => {
          const age = Date.now() - point.time;
          const radius = (age / 10) % 100;
          const opacity = Math.max(0, 1 - age / 2000);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
        break;

      case 5: // O Círculo Completo
        // Fundo da constelação final
        ctx.fillStyle = '#000011';
        ctx.fillRect(0, 0, width, height);

        // Constelação completa
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 3 + 1;
          const twinkle = Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
          ctx.fill();
        }

        // Mensagem final
        ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Você é parte do todo', width/2, height/2 - 20);
        ctx.font = '20px Arial';
        ctx.fillText('A conexão essencial vive em você', width/2, height/2 + 20);
        break;
    }
  };

  // Animação principal
  const animate = () => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    renderScene(ctx, currentScene.id, (currentTime - currentScene.startTime) / currentScene.duration);
    
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  // Timer principal
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        
        // Verificar mudança de cena
        const newSceneIndex = videoScenes.findIndex(scene => 
          newTime >= scene.startTime && newTime < scene.startTime + scene.duration
        );
        
        if (newSceneIndex !== currentSceneIndex && newSceneIndex !== -1) {
          setCurrentSceneIndex(newSceneIndex);
          speakNarration(videoScenes[newSceneIndex].narration);
        }
        
        // Verificar se terminou
        if (newTime >= totalDuration) {
          setIsPlaying(false);
          setIsComplete(true);
          return totalDuration;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSceneIndex]);

  // Iniciar animação
  useEffect(() => {
    if (isPlaying) {
      animate();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentSceneIndex]);

  // Limpar pontos de toque antigos
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTouchPoints(prev => 
        prev.filter(point => Date.now() - point.time < 2000)
      );
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    setIsComplete(false);
    speakNarration(videoScenes[0].narration);
  };

  const handlePause = () => {
    setIsPlaying(false);
    speechSynthesis.cancel();
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    setIsComplete(false);
    speechSynthesis.cancel();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentScene.interactive) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setTouchPoints(prev => [...prev, { x, y, time: Date.now() }]);
    }
  };

  const handleSubmitReflection = () => {
    if (reflection.trim()) {
      onComplete(reflection);
      onOpenChange(false);
    }
  };

  const progressPercentage = (currentTime / totalDuration) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <div className="w-8 h-8 mr-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            Portal da Conexão Essencial - Experiência Cinematográfica
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Frase central */}
          <Card className="bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200">
            <CardContent className="p-4 text-center">
              <p className="text-lg font-medium text-cyan-800 italic">
                "Você é parte do todo. Sinta a conexão que te une."
              </p>
            </CardContent>
          </Card>

          {/* Canvas de vídeo */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-auto bg-black rounded-lg cursor-pointer"
              onClick={handleCanvasClick}
            />
            
            {/* Overlay de informações */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>{currentScene?.title}</span>
                <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 3:00</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mt-2" />
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleStart}
              disabled={isPlaying}
              className="bg-gradient-to-r from-cyan-600 to-teal-600"
            >
              <Play className="w-4 h-4 mr-2" />
              {currentTime > 0 ? 'Continuar' : 'Iniciar Experiência'}
            </Button>
            
            <Button
              onClick={handlePause}
              disabled={!isPlaying}
              variant="outline"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
            
            <Button
              onClick={handleRestart}
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>

            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              size="sm"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Informações da cena atual */}
          {currentScene && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Cena {currentScene.id}: {currentScene.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {currentScene.description}
                </p>
                <p className="text-sm italic text-gray-700">
                  "{currentScene.narration}"
                </p>
                {currentScene.interactive && (
                  <Badge className="mt-2 bg-cyan-100 text-cyan-700">
                    Cena Interativa - Toque na tela
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}

          {/* Reflexão final */}
          {isComplete && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Experiência Completa!</span>
                </div>
                
                <div>
                  <p className="text-green-700 mb-3">
                    Como você se sente após essa jornada de conexão? 
                    Que percepções surgiram sobre sua interconexão com o todo?
                  </p>
                  <Textarea
                    placeholder="Escreva sua reflexão sobre a experiência cinematográfica..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button
                  onClick={handleSubmitReflection}
                  disabled={!reflection.trim()}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Completar Portal
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Informações técnicas */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                <Film className="w-4 h-4 mr-2" />
                Experiência Cinematográfica
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Vídeo renderizado em tempo real com Canvas HTML5</li>
                <li>• Narração em português usando síntese de voz</li>
                <li>• 5 cenas sequenciais com 3 minutos de duração total</li>
                <li>• Interatividade na cena 4 com efeitos de toque</li>
                <li>• Animações suaves e transições cinematográficas</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};