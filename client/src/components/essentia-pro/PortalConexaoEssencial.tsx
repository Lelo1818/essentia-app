import { useState, useEffect } from 'react';
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
  Hand,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface PortalConexaoEssencialProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (reflection: string) => void;
}

interface Scene {
  id: number;
  title: string;
  description: string;
  audio: string;
  duration: number;
  visual: string;
}

const scenes: Scene[] = [
  {
    id: 1,
    title: 'O Vazio e a Respiração',
    description: 'Começa com um fundo escuro, minimalista. Você está sozinho, no centro, envolto por um brilho sutil.',
    audio: 'Respire fundo. Sinta-se aqui, agora, com o seu corpo. Apenas você.',
    duration: 30,
    visual: 'dark-void'
  },
  {
    id: 2,
    title: 'O Fio de Luz',
    description: 'Uma luz suave pulsa no seu peito, como um coração. Pequenos fios de luz se movem para fora, como raízes brilhantes.',
    audio: 'Sinta a sua própria energia. Imagine uma luz, um calor que vem do centro do seu peito. A cada expiração, visualize essa luz se expandindo.',
    duration: 45,
    visual: 'light-threads'
  },
  {
    id: 3,
    title: 'O Grande Tecido',
    description: 'Os fios de luz se conectam a outros pontos luminosos. O vazio se transforma em um vasto tecido de estrelas interconectadas.',
    audio: 'Esses fios de luz são suas conexões. Sinta-os se unindo ao grande tecido da vida. Você não está sozinho. Você está interconectado a tudo que existe.',
    duration: 60,
    visual: 'cosmic-web'
  },
  {
    id: 4,
    title: 'A Prática do Toque',
    description: 'Surge a instrução "O Toque da Unidade". Você interage tocando uma representação digital, criando ondas de luz.',
    audio: 'Toque algo próximo a você. A sua pele, uma mesa, o chão. Sinta a textura, a temperatura. Sua consciência está viva nesse toque.',
    duration: 30,
    visual: 'touch-unity'
  },
  {
    id: 5,
    title: 'O Círculo Completo',
    description: 'Você não está mais sozinho, mas sim um ponto luminoso em uma vasta constelação. A beleza da rede de conexões se revela.',
    audio: 'Você não está sozinho(a). A conexão essencial vive em você.',
    duration: 15,
    visual: 'constellation'
  }
];

export const PortalConexaoEssencial = ({ isOpen, onOpenChange, onComplete }: PortalConexaoEssencialProps) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [reflection, setReflection] = useState('');
  const [touchWaves, setTouchWaves] = useState<{id: number, x: number, y: number}[]>([]);

  const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSceneProgress(prev => {
        const newProgress = prev + (100 / scenes[currentScene].duration);
        if (newProgress >= 100) {
          // Cena completa, avançar para próxima
          if (currentScene < scenes.length - 1) {
            setCurrentScene(currentScene + 1);
            return 0;
          } else {
            // Portal completo
            setIsPlaying(false);
            setIsComplete(true);
            return 100;
          }
        }
        return newProgress;
      });

      setTotalProgress(prev => {
        const sceneWeight = scenes[currentScene].duration / totalDuration;
        const sceneContribution = (sceneProgress * sceneWeight) * 100;
        const previousScenesProgress = scenes
          .slice(0, currentScene)
          .reduce((sum, scene) => sum + (scene.duration / totalDuration) * 100, 0);
        
        return previousScenesProgress + sceneContribution;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentScene, sceneProgress]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentScene(0);
    setSceneProgress(0);
    setTotalProgress(0);
    setIsComplete(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentScene(0);
    setSceneProgress(0);
    setTotalProgress(0);
    setIsComplete(false);
  };

  const handleTouch = (e: React.MouseEvent) => {
    if (currentScene !== 3) return; // Só funciona na cena do toque
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newWave = { id: Date.now(), x, y };
    setTouchWaves(prev => [...prev, newWave]);
    
    // Remover onda após animação
    setTimeout(() => {
      setTouchWaves(prev => prev.filter(wave => wave.id !== newWave.id));
    }, 2000);
  };

  const getVisualComponent = () => {
    const scene = scenes[currentScene];
    
    switch (scene.visual) {
      case 'dark-void':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-pulse opacity-60">
                <div className="w-full h-full rounded-full border-2 border-cyan-300 animate-ping"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gray-300 text-sm italic">"{scene.audio}"</p>
            </div>
          </div>
        );
        
      case 'light-threads':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-pulse">
                  <Heart className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                </div>
                {/* Fios de luz */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-10 left-10 w-1 bg-gradient-to-r from-cyan-300 to-transparent animate-pulse"
                    style={{
                      height: '60px',
                      transform: `rotate(${i * 45}deg)`,
                      transformOrigin: 'bottom center',
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gray-300 text-sm italic">"{scene.audio}"</p>
            </div>
          </div>
        );
        
      case 'cosmic-web':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              {/* Pontos de luz conectados */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-white rounded-full animate-pulse"
                  style={{
                    left: `${20 + (i * 7)}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
              {/* Linhas de conexão */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {[...Array(6)].map((_, i) => (
                  <line
                    key={i}
                    x1={`${20 + (i * 14)}%`}
                    y1={`${40 + Math.sin(i) * 15}%`}
                    x2={`${34 + (i * 14)}%`}
                    y2={`${40 + Math.sin(i + 1) * 15}%`}
                    stroke="rgba(34, 211, 238, 0.6)"
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-12 h-12 text-cyan-300 animate-pulse" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gray-200 text-sm italic">"{scene.audio}"</p>
            </div>
          </div>
        );
        
      case 'touch-unity':
        return (
          <div 
            className="relative w-full h-64 bg-gradient-to-br from-teal-800 to-cyan-900 rounded-lg overflow-hidden cursor-pointer"
            onClick={handleTouch}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Hand className="w-16 h-16 text-cyan-300 mx-auto mb-4 animate-bounce" />
                <p className="text-cyan-200 font-semibold">O Toque da Unidade</p>
                <p className="text-cyan-300 text-sm mt-2">Toque na tela para criar conexões</p>
              </div>
            </div>
            
            {/* Ondas de toque */}
            {touchWaves.map(wave => (
              <div
                key={wave.id}
                className="absolute pointer-events-none"
                style={{ left: wave.x - 25, top: wave.y - 25 }}
              >
                <div className="w-12 h-12 border-2 border-cyan-300 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 w-12 h-12 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
              </div>
            ))}
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gray-200 text-sm italic">"{scene.audio}"</p>
            </div>
          </div>
        );
        
      case 'constellation':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              {/* Constelação maior */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-white to-cyan-300 rounded-full animate-pulse"
                  style={{
                    left: `${10 + (i * 4)}%`,
                    top: `${20 + Math.sin(i * 0.5) * 30}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-2 animate-spin" />
                  <p className="text-yellow-200 font-semibold">Você é parte do todo</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-gray-200 text-sm italic">"{scene.audio}"</p>
            </div>
          </div>
        );
        
      default:
        return <div className="w-full h-64 bg-gray-800 rounded-lg" />;
    }
  };

  const handleSubmitReflection = () => {
    if (reflection.trim()) {
      onComplete(reflection);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <div className="w-8 h-8 mr-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            Portal da Conexão Essencial
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

          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Cena {currentScene + 1} de {scenes.length}: {scenes[currentScene]?.title}
              </span>
              <Badge variant="outline" className="text-cyan-700 border-cyan-300">
                {Math.round(totalProgress)}% completo
              </Badge>
            </div>
            <Progress value={totalProgress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Progresso da cena: {Math.round(sceneProgress)}%</span>
              <span>Tempo total: ~3 minutos</span>
            </div>
          </div>

          {/* Visualização da cena */}
          {getVisualComponent()}

          {/* Controles */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleStart}
              disabled={isPlaying}
              className="bg-gradient-to-r from-cyan-600 to-teal-600"
            >
              <Play className="w-4 h-4 mr-2" />
              {totalProgress > 0 ? 'Continuar' : 'Iniciar Jornada'}
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
          </div>

          {/* Descrição da cena atual */}
          {scenes[currentScene] && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {scenes[currentScene].title}
                </h4>
                <p className="text-sm text-gray-600">
                  {scenes[currentScene].description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reflexão final */}
          {isComplete && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Portal Completo!</span>
                </div>
                
                <div>
                  <p className="text-green-700 mb-3">
                    Como você se sente agora sobre sua conexão com o todo?
                    Que insights surgiram durante esta jornada?
                  </p>
                  <Textarea
                    placeholder="Escreva sua reflexão sobre a experiência de conexão..."
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

          {/* Informações sobre o portal */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                <Volume2 className="w-4 h-4 mr-2" />
                Sobre esta Experiência
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Duração: 2-3 minutos de experiência imersiva</li>
                <li>• Propósito: Dissolver o isolamento e ativar a percepção de interconexão</li>
                <li>• Técnica: Visualização guiada + respiração consciente + toque mindful</li>
                <li>• Resultado: Sensação profunda de pertencimento ao grande tecido da vida</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};