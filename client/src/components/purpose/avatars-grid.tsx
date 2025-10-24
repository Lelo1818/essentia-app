import { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { soundManager } from "@/lib/sound";

// Import dos vídeos
import sofiaVideo from "@assets/Sofia — A Luz da Clareza_1761230808883.mp4";
import naraVideo from "@assets/Nara — A Cura da Terra_1761230808884.mp4";
import aruanGuardiaoVideo from "@assets/Aruan O guardiao do Proposito_1761230808884.mp4";
import kaelVideo from "@assets/Kael — O Sopro da Sabedoria_1761230808885.mp4";
import amayaVideo from "@assets/Amaya — A Voz da Intuição_1761230808885.mp4";
import aruanFogoVideo from "@assets/Aruan — O Fogo da Coragem_1761230808886.mp4";

interface Avatar {
  id: string;
  name: string;
  title: string;
  element: string;
  color: string;
  video: string;
  frase: string;
  link?: string;
}

const avatars: Avatar[] = [
  {
    id: "aruan-guardiao",
    name: "Aruan",
    title: "O Guardião do Propósito",
    element: "Espírito",
    color: "from-purple-600 to-indigo-600",
    video: aruanGuardiaoVideo,
    frase: "A força vive em você. Basta acordar para vê-la.",
    link: "/journey"
  },
  {
    id: "sofia",
    name: "Sofia",
    title: "A Luz da Clareza",
    element: "Mental",
    color: "from-blue-500 to-cyan-400",
    video: sofiaVideo,
    frase: "A clareza nasce quando a mente para de brigar com o que é.",
    link: "/purpose#therapist"
  },
  {
    id: "nara",
    name: "Nara",
    title: "A Cura da Terra",
    element: "Físico",
    color: "from-green-600 to-emerald-500",
    video: naraVideo,
    frase: "O corpo fala. A cura começa quando você aprende a escutar.",
    link: "/purpose#feme"
  },
  {
    id: "kael",
    name: "Kael",
    title: "O Sopro da Sabedoria",
    element: "Energético",
    color: "from-amber-500 to-orange-400",
    video: kaelVideo,
    frase: "A respiração é a ponte entre o corpo e a alma.",
    link: "/breath"
  },
  {
    id: "amaya",
    name: "Amaya",
    title: "A Voz da Intuição",
    element: "Espiritual",
    color: "from-violet-600 to-purple-500",
    video: amayaVideo,
    frase: "A intuição sussurra. O medo grita. Escolha quem ouvir.",
    link: "/portals?open=intuicao"
  },
  {
    id: "aruan-fogo",
    name: "Aruan",
    title: "O Fogo da Coragem",
    element: "Transformação",
    color: "from-red-600 to-orange-500",
    video: aruanFogoVideo,
    frase: "A coragem nasce quando abraço o medo e escolho avançar.",
    link: "/breathing-446"
  }
];

interface AvatarCardProps {
  avatar: Avatar;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

function AvatarCard({ avatar, isActive, onActivate, onDeactivate }: AvatarCardProps) {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const allowAutoplayRef = useRef<boolean>(true);

  // Pausar outros vídeos quando este é ativado
  useEffect(() => {
    if (!videoRef.current) return;

    // Se NÃO está ativo e estava tocando, pausar
    if (!isActive && isPlaying) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  // Pausar quando sai de viewport (melhora UX e bateria)
  useEffect(() => {
    if (!cardRef.current || !videoRef.current) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting && !videoRef.current?.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );
    observerRef.current.observe(cardRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  const handleCardClick = () => {
    if (!isActive) {
      // Ativar este avatar E tocar vídeo (só se nunca tocou antes)
      soundManager.play("ui_click");
      onActivate();
      
      // Aguardar um pouco para dar tempo do onActivate processar
      if (!hasPlayed) {
        setTimeout(() => playVideo(), 100);
      }
    }
  };

  const playVideo = () => {
    if (!videoRef.current) return;
    
    // mobile safari exige autoplay com muted/playsInline no primeiro toque
    videoRef.current.muted = !allowAutoplayRef.current ? true : false;
    setIsMuted(videoRef.current.muted);
    videoRef.current.playsInline = true;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => {
        console.log(`video:start ${avatar.id}`);
        setIsPlaying(true);
        setHasPlayed(true);
      })
      .catch((err) => {
        // fallback: força muted para destravar autoplay
        console.debug("Play failed, retry muted:", err);
        allowAutoplayRef.current = false;
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => {
            setIsPlaying(true);
            setHasPlayed(true);
          }).catch(() => {});
        }
      });
  };

  const handleVideoEnd = () => {
    console.log(`video:end ${avatar.id}`);
    // Vídeo terminou - pausar e manter no último frame
    setIsPlaying(false);
    // Não desativar automaticamente para manter a aura
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && isActive) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        soundManager.play("ui_click");
      }).catch(err => {
        console.debug("Replay failed:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && isActive) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      soundManager.play("ui_click");
    }
  };

  const handleConnect = async (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.play("ui_success");
    
    // Registrar portal linking no Integration Engine
    try {
      const { actions } = await import('@/state/integration-engine');
      await actions.linkPortal({ avatarId: avatar.id });
    } catch (error) {
      console.error('[Avatar] Erro ao registrar portal linking:', error);
    }
    
    if (avatar.link) {
      setLocation(avatar.link);
    }
  };

  return (
    <Card 
      className={`
        bg-gray-900/50 backdrop-blur-sm border-gray-700 overflow-hidden 
        transition-all duration-300 shadow-lg cursor-pointer
        ${isActive ? 'ring-4 ring-purple-500 ring-opacity-50 shadow-2xl shadow-purple-500/30 scale-105' : 'hover:border-gray-500'}
      `}
      onClick={handleCardClick}
      ref={cardRef}
    >
      {/* Vídeo */}
      <div className="relative bg-black" style={{ aspectRatio: "9/16" }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}
          src={avatar.video}
          muted
          playsInline
          preload="metadata"
          poster="/placeholders/avatar-poster.jpg"
          onEnded={handleVideoEnd}
          data-testid={`video-${avatar.id}`}
        />
        
        {/* Overlay quando não ativo - mostra que pode clicar */}
        {!isActive && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">▶️</div>
              <p className="text-sm font-medium">Clique para ativar</p>
            </div>
          </div>
        )}

        {/* Aura brilhante quando ativo */}
        {isActive && isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${avatar.color} opacity-20 animate-pulse`} />
          </div>
        )}
        
        {/* Controles (só aparecem quando ativo) */}
        {isActive && (
          <>
            {/* Botão de Som */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm h-8 w-8 shadow-md"
              onClick={toggleMute}
              data-testid={`button-sound-${avatar.id}`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            {/* Botão Replay (aparece quando terminou) */}
            {hasPlayed && !isPlaying && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm h-8 w-8 shadow-md"
                onClick={handleReplay}
                data-testid={`button-replay-${avatar.id}`}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </>
        )}

        {/* Badge Elemento */}
        <div className="absolute bottom-2 left-2">
          <Badge className={`bg-gradient-to-r ${avatar.color} text-white border-none text-[11px] leading-tight shadow-md`}>
            {avatar.element}
          </Badge>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3 bg-gradient-to-b from-gray-900 to-gray-950">
        {/* Nome e Título */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-1">
            {avatar.name}
          </h3>
          <p className="text-xs text-purple-300 font-medium">
            {avatar.title}
          </p>
        </div>

        {/* Frase-mestra */}
        <p className="text-[12px] text-gray-200 text-center italic leading-relaxed min-h-[3rem] flex items-center justify-center px-2">
          "{avatar.frase}"
        </p>

        {/* Botão Conectar */}
        <Button 
          className={`w-full bg-gradient-to-r ${avatar.color} hover:opacity-90 transition-all text-white font-semibold text-sm h-9 shadow-lg hover:shadow-xl`}
          onClick={handleConnect}
          data-testid={`button-connect-${avatar.id}`}
        >
          Conectar
        </Button>
      </div>
    </Card>
  );
}

export default function AvatarsGrid() {
  const [activeAvatarId, setActiveAvatarId] = useState<string | null>(null);

  useEffect(() => {
    // Som de entrada suave ao carregar a aba
    soundManager.play("ui_click");
  }, []);

  const handleActivateAvatar = (id: string) => {
    setActiveAvatarId(id);
  };

  const handleDeactivateAvatar = () => {
    setActiveAvatarId(null);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="text-center px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Os 6 Guardiões da Jornada
        </h2>
        <p className="text-base lg:text-lg text-gray-700 dark:text-purple-200 max-w-2xl mx-auto">
          Escolha um guardião para ouvir sua mensagem
        </p>
      </div>

      {/* Grid 2x3 (mobile) / 3x2 (desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-2">
        {avatars.map((avatar) => (
          <AvatarCard 
            key={avatar.id} 
            avatar={avatar}
            isActive={activeAvatarId === avatar.id}
            onActivate={() => handleActivateAvatar(avatar.id)}
            onDeactivate={handleDeactivateAvatar}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center px-4">
        <p className="text-gray-600 dark:text-purple-300 text-sm">
          💫 Cada avatar representa uma dimensão da sua jornada FEME
        </p>
        <p className="text-gray-500 dark:text-purple-400 text-xs mt-2 italic">
          {activeAvatarId 
            ? "Clique em outro avatar para mudar de guardião" 
            : "Clique em um avatar para ouvir sua sabedoria"}
        </p>
      </div>
    </div>
  );
}
