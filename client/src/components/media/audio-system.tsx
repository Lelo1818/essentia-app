import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Waves,
  Music,
  Mic,
  Headphones
} from "lucide-react";

interface AudioTrack {
  id: string;
  title: string;
  type: "narration" | "ambient" | "transition" | "meditation";
  duration?: number;
  src: string; // Será substituído por arquivos reais
  description?: string;
  loop?: boolean;
}

interface AudioSystemProps {
  tracks?: AudioTrack[];
  autoPlay?: boolean;
  ambient?: boolean;
  className?: string;
}

export function AudioSystem({ 
  tracks = [], 
  autoPlay = false, 
  ambient = false,
  className 
}: AudioSystemProps) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(tracks[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [autoPlay, currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume[0];
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case "narration": return Mic;
      case "ambient": return Waves;
      case "transition": return Music;
      case "meditation": return Headphones;
      default: return Play;
    }
  };

  if (ambient && currentTrack) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <Card className="bg-black/80 text-white border-gray-600">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <div className="text-xs">
                <div className="font-medium">{currentTrack.title}</div>
                <div className="text-gray-400">{formatTime(currentTime)} / {formatTime(duration)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          loop={currentTrack.loop}
        />
      </div>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Track Selection */}
          {tracks.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tracks.map((track) => {
                const TrackIcon = getTrackIcon(track.type);
                return (
                  <Button
                    key={track.id}
                    variant={currentTrack?.id === track.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTrack(track)}
                    className="justify-start"
                  >
                    <TrackIcon className="w-4 h-4 mr-2" />
                    {track.title}
                  </Button>
                );
              })}
            </div>
          )}

          {currentTrack && (
            <>
              {/* Current Track Info */}
              <div className="text-center space-y-2">
                <h4 className="font-medium text-gray-800">{currentTrack.title}</h4>
                {currentTrack.description && (
                  <p className="text-sm text-gray-600">{currentTrack.description}</p>
                )}
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      setCurrentTime(0);
                    }
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <Button
                  size="lg"
                  onClick={togglePlay}
                  className="rounded-full w-12 h-12"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <VolumeX className="w-4 h-4 text-gray-400" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.1}
                  className="flex-1"
                />
                <Volume2 className="w-4 h-4 text-gray-400" />
              </div>

              <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                loop={currentTrack.loop}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para áudios específicos de jornada
export function JourneyAudio({ 
  phase, 
  autoPlay = false 
}: { 
  phase: string; 
  autoPlay?: boolean;
}) {
  const journeyTracks: Record<string, AudioTrack[]> = {
    clareira: [
      {
        id: "clareira-intro",
        title: "Bem-vindo à sua Clareira",
        type: "narration",
        src: "[ÁUDIO_CLAREIRA_INTRO]", // Placeholder
        description: "Narração suave de boas-vindas",
        duration: 45
      },
      {
        id: "floresta-ambiente",
        title: "Sons da Floresta",
        type: "ambient",
        src: "[ÁUDIO_FLORESTA_AMBIENTE]",
        description: "Sons relaxantes da natureza",
        loop: true,
        duration: 300
      }
    ],
    respiracao: [
      {
        id: "respiracao-guiada",
        title: "Respiração Consciente",
        type: "meditation",
        src: "[ÁUDIO_RESPIRACAO_GUIADA]",
        description: "Exercício de respiração 4-7-8",
        duration: 180
      }
    ],
    rituais: [
      {
        id: "ritual-fogo",
        title: "Ritual do Fogo",
        type: "meditation",
        src: "[ÁUDIO_RITUAL_FOGO]",
        description: "Meditação guiada com elemento fogo",
        duration: 420
      },
      {
        id: "som-chamas",
        title: "Crepitar das Chamas",
        type: "ambient",
        src: "[ÁUDIO_SOM_CHAMAS]",
        description: "Som ambiente de fogueira",
        loop: true,
        duration: 600
      }
    ]
  };

  const tracks = journeyTracks[phase] || [];

  return (
    <AudioSystem 
      tracks={tracks} 
      autoPlay={autoPlay}
      className="mt-4"
    />
  );
}

// Hook para controle global de áudio
export function useAudioContext() {
  const [globalVolume, setGlobalVolume] = useState(0.7);
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [narrationEnabled, setNarrationEnabled] = useState(true);

  return {
    globalVolume,
    setGlobalVolume,
    ambientEnabled,
    setAmbientEnabled,
    narrationEnabled,
    setNarrationEnabled
  };
}