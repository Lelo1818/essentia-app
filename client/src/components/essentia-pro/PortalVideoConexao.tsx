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
    title: 'O Despertar',
    description: 'Universo nascendo com partículas de luz se formando',
    narration: 'Respire fundo. Você é parte de algo infinito.',
    startTime: 0,
    duration: 12
  },
  {
    id: 2,
    title: 'A Conexão',
    description: 'Energia irradiando e conectando com outras consciências',
    narration: 'Sinta sua energia se expandindo e se conectando.',
    startTime: 12,
    duration: 12
  },
  {
    id: 3,
    title: 'O Tecido Universal',
    description: 'Rede cósmica de conexões pulsando em harmonia',
    narration: 'Você faz parte do grande tecido da existência.',
    startTime: 24,
    duration: 12
  },
  {
    id: 4,
    title: 'O Toque da Unidade',
    description: 'Momento interativo com ondas de conexão',
    narration: 'Toque a tela e sinta a unidade.',
    startTime: 36,
    duration: 12,
    interactive: true
  },
  {
    id: 5,
    title: 'A Revelação',
    description: 'Explosão de luz revelando a interconexão total',
    narration: 'Você nunca esteve sozinho. A conexão é eterna.',
    startTime: 48,
    duration: 12
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

  const totalDuration = 60; // 1 minuto
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

  // Sistema de partículas avançado
  const particles = useRef<Array<{
    x: number, y: number, vx: number, vy: number, 
    size: number, life: number, maxLife: number,
    color: string, type: 'star' | 'energy' | 'connection'
  }>>([]);

  // Renderização cinematográfica avançada
  const renderScene = (ctx: CanvasRenderingContext2D, sceneId: number, progress: number) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now() * 0.001;

    // Limpar com fade suave
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    switch (sceneId) {
      case 1: // O Despertar - Universo nascendo
        // Fundo Big Bang
        const bigBangGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        bigBangGradient.addColorStop(0, `rgba(255, 255, 255, ${progress * 0.8})`);
        bigBangGradient.addColorStop(0.3, `rgba(255, 215, 0, ${progress * 0.6})`);
        bigBangGradient.addColorStop(0.7, `rgba(138, 43, 226, ${progress * 0.4})`);
        bigBangGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = bigBangGradient;
        ctx.fillRect(0, 0, width, height);

        // Partículas de luz se formando
        for (let i = 0; i < 100; i++) {
          const angle = (i / 100) * Math.PI * 2;
          const radius = 50 + Math.sin(time * 2 + i * 0.1) * 30;
          const x = width/2 + Math.cos(angle) * radius * progress;
          const y = height/2 + Math.sin(angle) * radius * progress;
          const size = Math.random() * 3 + 1;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * progress})`;
          ctx.fill();
          
          // Rastro de luz
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${0.3 * progress})`;
          ctx.fill();
        }
        break;

      case 2: // A Conexão - Energia irradiando
        // Fundo energético
        ctx.fillStyle = 'rgba(10, 10, 30, 0.9)';
        ctx.fillRect(0, 0, width, height);

        // Centro energético pulsante
        const energyPulse = Math.sin(time * 4) * 0.3 + 1;
        const coreGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 100 * energyPulse);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.6)');
        coreGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = coreGradient;
        ctx.fillRect(0, 0, width, height);

        // Raios de energia cinematográficos
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2 + time * 0.5;
          const length = 200 + Math.sin(time * 3 + i) * 50;
          
          ctx.save();
          ctx.translate(width/2, height/2);
          ctx.rotate(angle);
          
          const energyGradient = ctx.createLinearGradient(0, 0, length, 0);
          energyGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          energyGradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.6)');
          energyGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
          
          ctx.strokeStyle = energyGradient;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(length, 0);
          ctx.stroke();
          
          ctx.restore();
        }
        break;

      case 3: // O Tecido Universal - Rede cósmica
        // Fundo cósmico profundo
        const cosmicGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        cosmicGradient.addColorStop(0, 'rgba(20, 20, 60, 1)');
        cosmicGradient.addColorStop(0.5, 'rgba(60, 20, 100, 0.8)');
        cosmicGradient.addColorStop(1, 'rgba(0, 0, 20, 1)');
        ctx.fillStyle = cosmicGradient;
        ctx.fillRect(0, 0, width, height);

        // Rede neural cósmica
        const nodes = [];
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 6; j++) {
            const x = (i * width / 7) + 50;
            const y = (j * height / 5) + 50;
            const pulse = Math.sin(time * 2 + i * 0.5 + j * 0.3) * 0.5 + 1;
            nodes.push({ x, y, pulse });
          }
        }

        // Conexões pulsantes
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.lineWidth = 2;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
            if (dist < 150) {
              const opacity = 1 - (dist / 150);
              ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.8})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        // Nós da rede
        nodes.forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6 * node.pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${node.pulse * 0.9})`;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12 * node.pulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 211, 238, ${node.pulse * 0.5})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
        break;

      case 4: // O Toque da Unidade - Interativo
        // Fundo místico
        const mysticGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
        mysticGradient.addColorStop(0, 'rgba(75, 0, 130, 0.8)');
        mysticGradient.addColorStop(1, 'rgba(25, 25, 112, 1)');
        ctx.fillStyle = mysticGradient;
        ctx.fillRect(0, 0, width, height);

        // Mandala interativa central
        ctx.save();
        ctx.translate(width/2, height/2);
        ctx.rotate(time * 0.5);
        
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 80;
          
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.6 + Math.sin(time * 3 + i) * 0.4})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, radius, angle, angle + Math.PI / 4);
          ctx.stroke();
        }
        ctx.restore();

        // Texto chamativo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Toque da Unidade', width/2, height/2 - 60);
        ctx.font = '20px Arial';
        ctx.fillText('Toque a tela para conectar', width/2, height/2 + 100);

        // Ondas de toque cinematográficas
        touchPoints.forEach(point => {
          const age = Date.now() - point.time;
          const radius = (age / 5) % 150;
          const opacity = Math.max(0, 1 - age / 3000);
          
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius + i * 20, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity / (i + 1)})`;
            ctx.lineWidth = 4 - i;
            ctx.stroke();
          }
        });
        break;

      case 5: // A Revelação - Explosão de luz
        // Explosão cósmica final
        const explosionGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        explosionGradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.7)');
        explosionGradient.addColorStop(0.6, 'rgba(138, 43, 226, 0.5)');
        explosionGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
        ctx.fillStyle = explosionGradient;
        ctx.fillRect(0, 0, width, height);

        // Galáxia de conexões
        for (let i = 0; i < 200; i++) {
          const angle = (i / 200) * Math.PI * 2 * 3;
          const radius = (i / 200) * 300 + Math.sin(time * 2 + i * 0.1) * 20;
          const x = width/2 + Math.cos(angle) * radius * progress;
          const y = height/2 + Math.sin(angle) * radius * progress;
          const size = Math.random() * 4 + 1;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 - (radius / 300) * 0.7})`;
          ctx.fill();
        }

        // Mensagem final épica
        ctx.save();
        ctx.translate(width/2, height/2);
        ctx.rotate(Math.sin(time) * 0.05);
        
        ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText('CONEXÃO ETERNA', 0, -30);
        
        ctx.font = '24px Arial';
        ctx.fillText('Você nunca esteve sozinho', 0, 30);
        
        ctx.restore();
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
                <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 1:00</span>
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
                Experiência Cinematográfica Avançada
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Renderização cinematográfica em tempo real</li>
                <li>• Sistema de partículas e efeitos visuais avançados</li>
                <li>• 5 cenas épicas em 1 minuto de duração</li>
                <li>• Interatividade com ondas de conexão</li>
                <li>• Animações fluidas tipo filme de ficção científica</li>
                <li>• Gradientes dinâmicos e explosões de luz</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};