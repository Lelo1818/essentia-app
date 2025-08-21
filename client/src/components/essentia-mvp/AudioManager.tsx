import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  Music,
  Waves,
  Wind,
  Droplets
} from 'lucide-react';

interface AudioManagerProps {
  portalId: string;
  isActive: boolean;
  onVolumeChange?: (volume: number) => void;
}

// Sons procedurais para diferentes ambientes
const generateAmbientWaves = (context: AudioContext, frequency: number, duration: number) => {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const filter = context.createBiquadFilter();
  
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(context.destination);
  
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  oscillator.type = 'sine';
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, context.currentTime);
  
  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.5);
  gainNode.gain.linearRampToValueAtTime(0.05, context.currentTime + duration - 0.5);
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);
  
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
};

const generateRainSound = (context: AudioContext) => {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.1;
  }
  
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gainNode = context.createGain();
  
  noise.buffer = buffer;
  noise.loop = true;
  
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(200, context.currentTime);
  
  gainNode.gain.setValueAtTime(0.15, context.currentTime);
  
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(context.destination);
  
  return { noise, gainNode };
};

export const AudioManager = ({ portalId, isActive, onVolumeChange }: AudioManagerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([60]);
  const [currentTrack, setCurrentTrack] = useState<'waves' | 'rain' | 'wind' | 'silence'>('waves');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<any>(null);

  // Inicializar contexto de áudio
  useEffect(() => {
    if (isActive && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isActive]);

  // Gerar sons específicos do portal
  const playPortalAmbient = () => {
    if (!audioContextRef.current || !isActive) return;

    // Parar som anterior
    if (currentSourceRef.current) {
      try {
        if (currentSourceRef.current.noise) {
          currentSourceRef.current.noise.stop();
        }
        if (currentSourceRef.current.gainNode) {
          currentSourceRef.current.gainNode.disconnect();
        }
      } catch (e) {
        console.log('Erro ao parar som anterior');
      }
    }

    const context = audioContextRef.current;
    
    switch (currentTrack) {
      case 'waves':
        // Sons de ondas para harmonia
        const waveInterval = setInterval(() => {
          if (isPlaying) {
            generateAmbientWaves(context, 80 + Math.random() * 40, 3 + Math.random() * 2);
          }
        }, 2000);
        currentSourceRef.current = { interval: waveInterval };
        break;
        
      case 'rain':
        // Som de chuva para concentração
        const rainSource = generateRainSound(context);
        rainSource.noise.start();
        rainSource.gainNode.gain.setValueAtTime(volume[0] / 100 * 0.3, context.currentTime);
        currentSourceRef.current = rainSource;
        break;
        
      case 'wind':
        // Vento suave para energia
        const windOscillator = context.createOscillator();
        const windGain = context.createGain();
        const windFilter = context.createBiquadFilter();
        
        windOscillator.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(context.destination);
        
        windOscillator.frequency.setValueAtTime(60, context.currentTime);
        windOscillator.type = 'sawtooth';
        
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(300, context.currentTime);
        
        windGain.gain.setValueAtTime(volume[0] / 100 * 0.2, context.currentTime);
        
        // Modulação para simular rajadas
        const lfo = context.createOscillator();
        const lfoGain = context.createGain();
        lfo.connect(lfoGain);
        lfoGain.connect(windGain.gain);
        
        lfo.frequency.setValueAtTime(0.1, context.currentTime);
        lfoGain.gain.setValueAtTime(0.05, context.currentTime);
        
        windOscillator.start();
        lfo.start();
        
        currentSourceRef.current = { windOscillator, lfo, windGain };
        break;
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      playPortalAmbient();
    } else {
      // Parar reprodução
      if (currentSourceRef.current) {
        try {
          if (currentSourceRef.current.interval) {
            clearInterval(currentSourceRef.current.interval);
          }
          if (currentSourceRef.current.windOscillator) {
            currentSourceRef.current.windOscillator.stop();
          }
          if (currentSourceRef.current.lfo) {
            currentSourceRef.current.lfo.stop();
          }
          if (currentSourceRef.current.noise) {
            currentSourceRef.current.noise.stop();
          }
        } catch (e) {
          console.log('Som já parado');
        }
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (onVolumeChange) {
      onVolumeChange(newVolume[0]);
    }
    
    // Ajustar volume em tempo real
    if (currentSourceRef.current && currentSourceRef.current.gainNode) {
      currentSourceRef.current.gainNode.gain.setValueAtTime(
        newVolume[0] / 100 * 0.3, 
        audioContextRef.current?.currentTime || 0
      );
    }
  };

  const getTrackIcon = (track: string) => {
    switch (track) {
      case 'waves': return Waves;
      case 'rain': return Droplets;
      case 'wind': return Wind;
      default: return Music;
    }
  };

  const getPortalSounds = () => {
    switch (portalId) {
      case 'proposito':
        return [
          { id: 'waves', name: 'Ondas Profundas', icon: Waves },
          { id: 'rain', name: 'Chuva Reflexiva', icon: Droplets }
        ];
      case 'vitalidade':
        return [
          { id: 'wind', name: 'Vento Energético', icon: Wind },
          { id: 'waves', name: 'Ondas Vibrantes', icon: Waves }
        ];
      case 'harmonia':
        return [
          { id: 'rain', name: 'Chuva Harmonizante', icon: Droplets },
          { id: 'waves', name: 'Ondas Equilibrantes', icon: Waves }
        ];
      default:
        return [
          { id: 'waves', name: 'Ondas', icon: Waves },
          { id: 'rain', name: 'Chuva', icon: Droplets }
        ];
    }
  };

  if (!isActive) return null;

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-indigo-800 flex items-center">
            <Music className="w-4 h-4 mr-2" />
            Ambiente Sonoro
          </h4>
          
          <div className="flex items-center space-x-2">
            <VolumeX className="w-3 h-3 text-gray-400" />
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-20"
            />
            <Volume2 className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 w-8">{volume[0]}%</span>
          </div>
        </div>
        
        {/* Seleção de Som Ambiente */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {getPortalSounds().map((sound) => {
            const IconComponent = sound.icon;
            return (
              <Button
                key={sound.id}
                onClick={() => setCurrentTrack(sound.id as any)}
                variant={currentTrack === sound.id ? 'default' : 'outline'}
                size="sm"
                className="flex items-center space-x-1 text-xs"
              >
                <IconComponent className="w-3 h-3" />
                <span>{sound.name}</span>
              </Button>
            );
          })}
        </div>
        
        {/* Controles de Reprodução */}
        <div className="flex items-center justify-center space-x-3">
          <Button
            onClick={() => setCurrentTrack('silence' as any)}
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            🔇 Silêncio
          </Button>
          
          <Button
            onClick={handlePlay}
            className={`${isPlaying ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            size="sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <div className="text-xs text-gray-600">
            {isPlaying ? 'Reproduzindo' : 'Pausado'}
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            🎵 Sons procedurais gerados em tempo real para maximizar a imersão
          </p>
        </div>
      </CardContent>
    </Card>
  );
};