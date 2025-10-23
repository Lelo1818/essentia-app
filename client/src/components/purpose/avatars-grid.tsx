import { useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from "lucide-react";
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
  link?: string; // Link para experiência específica
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
    link: "/portals"
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

// Estado global para ativar som após primeiro toque
let globalFirstInteraction = false;

function AvatarCard({ avatar }: { avatar: Avatar }) {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Auto-play com som APÓS primeira interação global
    const handleFirstInteraction = () => {
      if (!globalFirstInteraction && videoRef.current) {
        globalFirstInteraction = true;
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play();
      }
    };

    // Adicionar listener de primeira interação
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    // Auto-play inicial (muted)
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.debug("Autoplay prevented:", err);
      });
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      soundManager.play("ui_click");
      
      // Se desmutou, garantir que está tocando
      if (!newMutedState) {
        videoRef.current.play();
      }
    }
  };

  const handleConnect = () => {
    // Som de sino/pulsação ao conectar
    soundManager.play("ui_success");
    
    // Navegar para experiência
    if (avatar.link) {
      setLocation(avatar.link);
    }
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700 overflow-hidden hover:border-gray-500 transition-all shadow-lg">
      {/* Vídeo */}
      <div className="relative aspect-[9/16] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={avatar.video}
          loop
          muted={isMuted}
          playsInline
          data-testid={`video-${avatar.id}`}
        />
        
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

        {/* Badge Elemento */}
        <div className="absolute bottom-2 left-2">
          <Badge className={`bg-gradient-to-r ${avatar.color} text-white border-none text-xs shadow-md`}>
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
        <p className="text-xs text-gray-200 text-center italic leading-relaxed min-h-[3rem] flex items-center justify-center px-2">
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
  useEffect(() => {
    // Som de entrada suave ao carregar a aba
    soundManager.play("ui_click");
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="text-center px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Os 6 Guardiões da Jornada
        </h2>
        <p className="text-base lg:text-lg text-gray-700 dark:text-purple-200 max-w-2xl mx-auto">
          Conheça os mestres que guiam sua transformação
        </p>
      </div>

      {/* Grid 2x3 (mobile) / 3x2 (desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-2">
        {avatars.map((avatar) => (
          <AvatarCard key={avatar.id} avatar={avatar} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center px-4">
        <p className="text-gray-600 dark:text-purple-300 text-sm">
          💫 Cada avatar representa uma dimensão da sua jornada FEME
        </p>
      </div>
    </div>
  );
}
