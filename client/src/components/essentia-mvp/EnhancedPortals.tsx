import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Target, 
  Zap, 
  Heart, 
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  PenTool,
  Image,
  Sparkles,
  Eye,
  Headphones,
  Edit3
} from 'lucide-react';
import { AudioManager } from './AudioManager';

interface EnhancedPortalsProps {
  portalId: string;
  onComplete: (insights: string[]) => void;
  onClose: () => void;
}

interface PortalConfig {
  id: string;
  name: string;
  theme: string;
  gradient: string;
  icon: any;
  description: string;
  visualElements: {
    backgroundImage: string;
    primaryColor: string;
    secondaryColor: string;
  };
  audioGuides: {
    intro: string;
    meditation: string;
    conclusion: string;
  };
  backgroundMusic: {
    url: string;
    volume: number;
  };
  ambientSounds: {
    breathing: string;
    nature: string;
    meditation: string;
  };
  interactiveElements: {
    breathing: boolean;
    writing: boolean;
    visualization: boolean;
    voice: boolean;
  };
}

const portalsConfig: Record<string, PortalConfig> = {
  proposito: {
    id: 'proposito',
    name: 'Portal do Propósito',
    theme: 'Descoberta da Missão de Vida',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    icon: Target,
    description: 'Jornada profunda para conectar-se com sua razão de ser',
    visualElements: {
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      primaryColor: '#8b5cf6',
      secondaryColor: '#6366f1'
    },
    audioGuides: {
      intro: 'Bem-vindo ao Portal do Propósito. Respire profundamente e permita-se explorar sua essência.',
      meditation: 'Conecte-se com seus valores mais profundos. O que realmente importa para você?',
      conclusion: 'Sua missão está se revelando. Confie no processo de descoberta.'
    },
    backgroundMusic: {
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      volume: 0.3
    },
    ambientSounds: {
      breathing: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ==',
      nature: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ==',
      meditation: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ=='
    },
    interactiveElements: {
      breathing: true,
      writing: true,
      visualization: true,
      voice: true
    }
  },
  vitalidade: {
    id: 'vitalidade',
    name: 'Portal da Vitalidade',
    theme: 'Despertar da Energia Vital',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    icon: Zap,
    description: 'Ativação completa da sua força vital e energia criativa',
    visualElements: {
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      primaryColor: '#f59e0b',
      secondaryColor: '#f97316'
    },
    audioGuides: {
      intro: 'Desperte a energia que habita em você. Sinta a vitalidade pulsando.',
      meditation: 'Visualize luz dourada preenchendo cada célula do seu corpo.',
      conclusion: 'Sua energia está renovada. Carregue esta vitalidade para o mundo.'
    },
    backgroundMusic: {
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      volume: 0.4
    },
    ambientSounds: {
      breathing: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ==',
      nature: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ==',
      meditation: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ=='
    },
    interactiveElements: {
      breathing: true,
      writing: false,
      visualization: true,
      voice: true
    }
  },
  harmonia: {
    id: 'harmonia',
    name: 'Portal da Harmonia',
    theme: 'Alinhamento do Ser',
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    icon: Heart,
    description: 'Encontro com o equilíbrio entre mente, coração e espírito',
    visualElements: {
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      primaryColor: '#f43f5e',
      secondaryColor: '#ec4899'
    },
    audioGuides: {
      intro: 'Entre no espaço sagrado da harmonia. Permita-se encontrar seu centro.',
      meditation: 'Sinta a coerência entre seus pensamentos, emoções e ações.',
      conclusion: 'A harmonia está estabelecida. Você encontrou seu equilíbrio interior.'
    },
    backgroundMusic: {
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      volume: 0.2
    },
    ambientSounds: {
      breathing: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ==',
      nature: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ==',
      meditation: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIdAzuS2OjIeSgGKX/K8dF8OQgVYbTk4a1VEQ8EZZUAAFLgAADN2+UJPQ=='
    },
    interactiveElements: {
      breathing: true,
      writing: true,
      visualization: true,
      voice: false
    }
  }
};

export const EnhancedPortals = ({ portalId, onComplete, onClose }: EnhancedPortalsProps) => {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'experience' | 'integration'>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState([70]);
  const [breathingRate, setBreathingRate] = useState(4);
  const [writings, setWritings] = useState<string[]>([]);
  const [currentWriting, setCurrentWriting] = useState('');
  const [insights, setInsights] = useState<string[]>([]);
  const [currentAmbientSound, setCurrentAmbientSound] = useState<string>('meditation');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const ambientSoundRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const portal = portalsConfig[portalId];

  // Animação de respiração no canvas
  useEffect(() => {
    if (!canvasRef.current || currentPhase !== 'experience') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 400;
    
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 80;
      const breathCycle = Math.sin(time * (breathingRate / 60)) * 30;
      const radius = baseRadius + breathCycle;
      
      // Gradiente baseado no portal
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, portal.visualElements.primaryColor + '40');
      gradient.addColorStop(1, portal.visualElements.secondaryColor + '20');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Texto de respiração
      ctx.fillStyle = portal.visualElements.primaryColor;
      ctx.font = '20px Inter';
      ctx.textAlign = 'center';
      const breathText = breathCycle > 0 ? 'Inspire...' : 'Expire...';
      ctx.fillText(breathText, centerX, centerY + 8);
      
      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentPhase, breathingRate, portal]);

  // Síntese de voz
  const speakText = (text: string) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = volume[0] / 100;
    
    // Configurar voz brasileira se disponível
    const voices = speechSynthesis.getVoices();
    const ptBRVoice = voices.find(voice => voice.lang.includes('pt-BR'));
    if (ptBRVoice) {
      utterance.voice = ptBRVoice;
    }
    
    speechSynthesis.speak(utterance);
  };

  // Controle de música de fundo
  const playBackgroundMusic = () => {
    if (backgroundMusicRef.current && audioEnabled) {
      backgroundMusicRef.current.volume = (portal.backgroundMusic.volume * volume[0]) / 100;
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.play().catch(console.error);
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  };

  // Controle de sons ambientes
  const playAmbientSound = (soundType: keyof typeof portal.ambientSounds) => {
    if (ambientSoundRef.current && audioEnabled) {
      setCurrentAmbientSound(soundType);
      ambientSoundRef.current.volume = (volume[0] / 100) * 0.6;
      ambientSoundRef.current.loop = true;
      ambientSoundRef.current.play().catch(console.error);
    }
  };

  const stopAmbientSound = () => {
    if (ambientSoundRef.current) {
      ambientSoundRef.current.pause();
      ambientSoundRef.current.currentTime = 0;
    }
  };

  // Gerador de som de respiração procedural
  const generateBreathingSound = () => {
    if (!audioEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1 * volume[0] / 100, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + breathingRate);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + breathingRate);
    } catch (error) {
      console.log('Web Audio API não suportada');
    }
  };

  // Navegação entre fases
  const handlePhaseTransition = (nextPhase: typeof currentPhase) => {
    setCurrentPhase(nextPhase);
    
    switch (nextPhase) {
      case 'intro':
        speakText(portal.audioGuides.intro);
        playBackgroundMusic();
        break;
      case 'experience':
        speakText(portal.audioGuides.meditation);
        playAmbientSound('meditation');
        setIsPlaying(true);
        break;
      case 'integration':
        speakText(portal.audioGuides.conclusion);
        stopAmbientSound();
        break;
    }
  };

  // Adicionar insight
  const addInsight = () => {
    if (currentWriting.trim()) {
      setInsights(prev => [...prev, currentWriting.trim()]);
      setCurrentWriting('');
    }
  };

  // Completar portal
  const handleComplete = () => {
    stopBackgroundMusic();
    stopAmbientSound();
    onComplete(insights);
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      stopBackgroundMusic();
      stopAmbientSound();
    };
  }, []);

  const IconComponent = portal.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl h-[90vh] mx-4 overflow-hidden">
        {/* Header */}
        <CardHeader className={`bg-gradient-to-r ${portal.gradient} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">{portal.name}</CardTitle>
                <p className="text-white/80">{portal.theme}</p>
              </div>
            </div>
            
            {/* Controles de áudio */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <div className="w-20">
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
              <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20">
                ← Voltar
              </Button>
            </div>
          </div>
          
          {/* Indicador de fases */}
          <div className="flex justify-center space-x-4 mt-4">
            <Badge variant={currentPhase === 'intro' ? 'default' : 'outline'} className="bg-white/20">
              1. Entrada
            </Badge>
            <Badge variant={currentPhase === 'experience' ? 'default' : 'outline'} className="bg-white/20">
              2. Experiência
            </Badge>
            <Badge variant={currentPhase === 'integration' ? 'default' : 'outline'} className="bg-white/20">
              3. Integração
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 h-full overflow-y-auto">
          {/* Fase Intro */}
          {currentPhase === 'intro' && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                <IconComponent className={`w-16 h-16 text-${portal.visualElements.primaryColor}`} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">{portal.description}</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Você está prestes a entrar em um espaço sagrado de transformação. 
                  Desligue distrações, encontre uma posição confortável e permita-se estar totalmente presente.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                {portal.interactiveElements.breathing && (
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm text-blue-800">Respiração Guiada</div>
                  </div>
                )}
                {portal.interactiveElements.visualization && (
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm text-purple-800">Visualização</div>
                  </div>
                )}
                {portal.interactiveElements.writing && (
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Edit3 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-sm text-green-800">Escrita Reflexiva</div>
                  </div>
                )}
                {portal.interactiveElements.voice && (
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Headphones className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-sm text-orange-800">Áudio Guiado</div>
                  </div>
                )}
              </div>
              
              {/* Controles de Áudio */}
              <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
                <h4 className="text-sm font-semibold mb-3 text-center">🎵 Ambiente Sonoro</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <Button
                    onClick={() => playAmbientSound('meditation')}
                    variant={currentAmbientSound === 'meditation' ? 'default' : 'outline'}
                    size="sm"
                    className="text-xs"
                  >
                    🧘 Meditação
                  </Button>
                  <Button
                    onClick={() => playAmbientSound('nature')}
                    variant={currentAmbientSound === 'nature' ? 'default' : 'outline'}
                    size="sm"
                    className="text-xs"
                  >
                    🌿 Natureza
                  </Button>
                  <Button
                    onClick={() => playAmbientSound('breathing')}
                    variant={currentAmbientSound === 'breathing' ? 'default' : 'outline'}
                    size="sm"
                    className="text-xs"
                  >
                    🫁 Respiração
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    onClick={stopAmbientSound}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    ⏸️ Pausar
                  </Button>
                  <Button
                    onClick={playBackgroundMusic}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    🎼 Música
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={() => handlePhaseTransition('experience')}
                className={`bg-gradient-to-r ${portal.gradient} hover:opacity-90`}
                size="lg"
              >
                Entrar no Portal
              </Button>
            </div>
          )}
          
          {/* Fase Experience */}
          {currentPhase === 'experience' && (
            <div className="space-y-6">
              {/* Canvas de Respiração */}
              {portal.interactiveElements.breathing && (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Respiração Consciente</h3>
                  
                  <canvas 
                    ref={canvasRef}
                    className="mx-auto border border-gray-200 rounded-lg shadow-lg"
                  />
                  
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Ritmo:</span>
                      <Slider
                        value={[breathingRate]}
                        onValueChange={(value) => setBreathingRate(value[0])}
                        min={2}
                        max={8}
                        step={1}
                        className="w-32"
                      />
                      <span className="text-sm text-gray-600">{breathingRate}s</span>
                    </div>
                    
                    <Button
                      onClick={generateBreathingSound}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="text-xs">Som Respiração</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Sistema de Áudio Avançado */}
              <AudioManager 
                portalId={portal.id}
                isActive={currentPhase === 'experience'}
                onVolumeChange={(vol) => setVolume([vol])}
              />
              
              {/* Área de Escrita Reflexiva */}
              {portal.interactiveElements.writing && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <PenTool className="w-5 h-5 mr-2" />
                    Reflexões e Insights
                  </h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <textarea
                      value={currentWriting}
                      onChange={(e) => setCurrentWriting(e.target.value)}
                      placeholder="O que está emergindo em sua consciência? Escreva livremente..."
                      className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Button 
                      onClick={addInsight}
                      className="mt-2 bg-purple-600 hover:bg-purple-700"
                      size="sm"
                      disabled={!currentWriting.trim()}
                    >
                      Adicionar Insight
                    </Button>
                  </div>
                  
                  {insights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Seus Insights:</h4>
                      {insights.map((insight, index) => (
                        <div key={index} className="bg-white p-3 rounded border-l-4 border-purple-500">
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-center">
                <Button 
                  onClick={() => handlePhaseTransition('integration')}
                  className={`bg-gradient-to-r ${portal.gradient} hover:opacity-90`}
                  size="lg"
                >
                  Integrar Experiência
                </Button>
              </div>
            </div>
          )}
          
          {/* Fase Integration */}
          {currentPhase === 'integration' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">Integração Completa</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Você completou sua jornada no {portal.name}. 
                  Leve consigo as descobertas e insights que emergiram durante esta prática.
                </p>
              </div>
              
              {insights.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
                  <h4 className="font-semibold mb-4">Resumo dos seus Insights:</h4>
                  <div className="space-y-3 text-left">
                    {insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                        <p className="text-sm text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleComplete}
                className={`bg-gradient-to-r ${portal.gradient} hover:opacity-90`}
                size="lg"
              >
                Concluir Portal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Elementos de áudio ocultos */}
      <audio ref={backgroundMusicRef} preload="none">
        <source src={portal.backgroundMusic.url} type="audio/mpeg" />
      </audio>
      
      <audio ref={ambientSoundRef} preload="none" loop>
        <source src={portal.ambientSounds[currentAmbientSound as keyof typeof portal.ambientSounds]} type="audio/wav" />
      </audio>
    </div>
  );
};