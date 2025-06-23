import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AmbientPlayerProps {
  enabled?: boolean;
  className?: string;
}

export function AmbientPlayer({ enabled = false, className = '' }: AmbientPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    
    // Placeholder para trilha sonora ambiente
    // Na implementação final, conectaria com arquivos de áudio reais
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [enabled, volume]);

  const togglePlay = () => {
    if (!audioRef.current || !enabled) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Placeholder: aqui carregaria a trilha ambiente
      // audioRef.current.src = '/audio/ambient-flow.mp3';
      // audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!enabled) {
    return (
      <div className={`text-xs text-gray-400 ${className}`}>
        <Music className="w-4 h-4 inline mr-1" />
        Trilha sonora disponível na próxima versão
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="p-2 h-8 w-8"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </Button>
      <span className="text-xs text-gray-500">
        {isPlaying ? 'Tocando ambiente' : 'Áudio pausado'}
      </span>
    </div>
  );
}