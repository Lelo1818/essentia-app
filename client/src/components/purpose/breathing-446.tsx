import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trackBreathing } from '@/lib/analytics';
import { Play, Pause, X, Volume2 } from 'lucide-react';
import { MediaPlayer } from '@/components/MediaPlayer';
import desperteCoragemVideo from "@assets/Desperte Sua Coragem_1761138039346.mp4";

interface Breathing446Props {
  onClose?: () => void;
  videoSrc?: string;
}

export function Breathing446({ onClose, videoSrc = "/assets/inner-awakening.mp4" }: Breathing446Props) {
  const [videoWatched, setVideoWatched] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(err => {
      console.log('Autoplay prevented:', err);
    });
  }, []);

  useEffect(() => {
    if (!isActive) return;

    trackBreathing('start', '4-4-6');

    const cycleInterval = setInterval(() => {
      setCycles(prev => prev + 1);
    }, 14000); // 14 segundos por ciclo (4+4+6)

    return () => clearInterval(cycleInterval);
  }, [isActive]);

  const toggleAudio = () => {
    if (!audioEnabled) {
      // Inicializar áudio com tom suave
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 432; // Frequência A4 = 432 Hz (tom relaxante)
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillatorRef.current = oscillator;
      
      setAudioEnabled(true);
    } else {
      // Desligar áudio
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setAudioEnabled(false);
    }
  };

  const handleComplete = () => {
    trackBreathing('finish', '4-4-6');
    setIsActive(false);
    setCycles(0);
    
    if (audioEnabled) {
      toggleAudio();
    }
    
    onClose?.();
  };

  // Mostrar vídeo introdutório primeiro
  if (!videoWatched) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <MediaPlayer
          assetKey="desperte-sua-coragem"
          title="Desperte Sua Coragem"
          videoUrl={desperteCoragemVideo}
          onComplete={() => setVideoWatched(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        loop
        muted
        playsInline
        autoPlay
        data-testid="breathing-video"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
        {/* Header */}
        <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6">
          <div className="text-white/80 text-sm">
            {cycles > 0 && <span>Ciclo {cycles}</span>}
          </div>
          {onClose && (
            <Button
              onClick={handleComplete}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              data-testid="button-close-breathing"
            >
              <X className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Círculo de respiração animado */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-8">
          <svg 
            viewBox="0 0 200 200" 
            className="absolute inset-0 w-full h-full"
            data-testid="breathing-circle"
          >
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="rgba(139, 92, 246, 0.2)"
              stroke="rgba(139, 92, 246, 0.6)"
              strokeWidth="3"
              className={isActive ? 'breathing-circle-active' : ''}
            />
          </svg>
          
          {/* Texto central */}
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Respiração Viva</h2>
            <p className="text-lg opacity-80">4 - 4 - 6</p>
          </div>
        </div>

        {/* Instruções */}
        {isActive && (
          <div className="text-white text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-xl mb-2 breathing-instruction">
              <span className="breathing-phase-1">Inspire profundamente (4s)</span>
              <span className="breathing-phase-2">Segure o ar (4s)</span>
              <span className="breathing-phase-3">Solte devagar (6s)</span>
            </p>
            <p className="text-sm opacity-60">Acompanhe o círculo</p>
          </div>
        )}

        {/* Controles */}
        <div className="flex gap-4">
          {!isActive ? (
            <Button
              onClick={() => setIsActive(true)}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              data-testid="button-start-breathing"
            >
              <Play className="w-6 h-6 mr-2" />
              Iniciar Ritual
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setIsActive(false)}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-6"
                data-testid="button-pause-breathing"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pausar
              </Button>
              <Button
                onClick={toggleAudio}
                size="lg"
                variant="outline"
                className={`border-white text-white hover:bg-white/10 px-6 ${audioEnabled ? 'bg-white/20' : ''}`}
                data-testid="button-toggle-audio"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                {audioEnabled ? 'Som Ligado' : 'Ativar Som'}
              </Button>
            </>
          )}
        </div>

        {/* Botão Concluir */}
        {isActive && cycles >= 3 && (
          <Button
            onClick={handleComplete}
            size="lg"
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 animate-in fade-in slide-in-from-bottom-4"
            data-testid="button-complete-breathing"
          >
            Concluir Ritual ({cycles} ciclos)
          </Button>
        )}
      </div>

      <style>{`
        @keyframes breathe {
          0% {
            r: 50;
            opacity: 0.6;
          }
          28.57% {
            r: 85;
            opacity: 1;
          }
          57.14% {
            r: 85;
            opacity: 1;
          }
          100% {
            r: 50;
            opacity: 0.6;
          }
        }

        .breathing-circle-active {
          animation: breathe 14s ease-in-out infinite;
        }

        @keyframes breathe-instruction {
          0%, 28.57% {
            opacity: 1;
          }
          28.58%, 100% {
            opacity: 0;
          }
        }

        @keyframes breathe-instruction-2 {
          0%, 28.57% {
            opacity: 0;
          }
          28.58%, 57.14% {
            opacity: 1;
          }
          57.15%, 100% {
            opacity: 0;
          }
        }

        @keyframes breathe-instruction-3 {
          0%, 57.14% {
            opacity: 0;
          }
          57.15%, 100% {
            opacity: 1;
          }
        }

        .breathing-phase-1 {
          display: block;
          animation: breathe-instruction 14s ease-in-out infinite;
        }

        .breathing-phase-2 {
          display: block;
          animation: breathe-instruction-2 14s ease-in-out infinite;
        }

        .breathing-phase-3 {
          display: block;
          animation: breathe-instruction-3 14s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
