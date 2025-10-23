import { useState, useRef, useEffect } from "react";
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
}

const avatars: Avatar[] = [
  {
    id: "aruan-guardiao",
    name: "Aruan",
    title: "O Guardião do Propósito",
    element: "Espírito",
    color: "from-purple-600 to-indigo-600",
    video: aruanGuardiaoVideo,
    frase: "A força vive em você. Basta acordar para vê-la."
  },
  {
    id: "sofia",
    name: "Sofia",
    title: "A Luz da Clareza",
    element: "Mental",
    color: "from-blue-500 to-cyan-400",
    video: sofiaVideo,
    frase: "A clareza nasce quando a mente para de brigar com o que é."
  },
  {
    id: "nara",
    name: "Nara",
    title: "A Cura da Terra",
    element: "Físico",
    color: "from-green-600 to-emerald-500",
    video: naraVideo,
    frase: "O corpo fala. A cura começa quando você aprende a escutar."
  },
  {
    id: "kael",
    name: "Kael",
    title: "O Sopro da Sabedoria",
    element: "Energético",
    color: "from-amber-500 to-orange-400",
    video: kaelVideo,
    frase: "A respiração é a ponte entre o corpo e a alma."
  },
  {
    id: "amaya",
    name: "Amaya",
    title: "A Voz da Intuição",
    element: "Espiritual",
    color: "from-violet-600 to-purple-500",
    video: amayaVideo,
    frase: "A intuição sussurra. O medo grita. Escolha quem ouvir."
  },
  {
    id: "aruan-fogo",
    name: "Aruan",
    title: "O Fogo da Coragem",
    element: "Transformação",
    color: "from-red-600 to-orange-500",
    video: aruanFogoVideo,
    frase: "A coragem nasce quando abraço o medo e escolho avançar."
  }
];

function AvatarCard({ avatar }: { avatar: Avatar }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Auto-play silencioso quando o vídeo carregar
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.debug("Autoplay prevented:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      soundManager.play("ui_click");
    }
  };

  const handleConnect = () => {
    soundManager.play("ui_click");
    // Placeholder - futuramente conectará com a experiência específica
  };

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 overflow-hidden">
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
          className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={toggleMute}
          data-testid={`button-sound-${avatar.id}`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>

        {/* Badge Elemento */}
        <div className="absolute bottom-3 left-3">
          <Badge className={`bg-gradient-to-r ${avatar.color} text-white border-none`}>
            {avatar.element}
          </Badge>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Nome e Título */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">
            {avatar.name}
          </h3>
          <p className="text-sm text-purple-300">
            {avatar.title}
          </p>
        </div>

        {/* Frase-mestra */}
        <p className="text-sm text-gray-300 text-center italic leading-relaxed">
          "{avatar.frase}"
        </p>

        {/* Botão Conectar */}
        <Button 
          className={`w-full bg-gradient-to-r ${avatar.color} hover:opacity-90 transition-opacity`}
          onClick={handleConnect}
          data-testid={`button-connect-${avatar.id}`}
        >
          Conectar
        </Button>
      </div>
    </Card>
  );
}

export default function AvatarsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Avatares
          </h1>
          <p className="text-lg lg:text-xl text-purple-200 max-w-2xl mx-auto">
            Conheça os 6 guardiões que guiam sua jornada de transformação
          </p>
        </div>

        {/* Grid 2x3 (mobile) / 3x2 (desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {avatars.map((avatar) => (
            <AvatarCard key={avatar.id} avatar={avatar} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 lg:mt-12 text-center">
          <p className="text-purple-300 text-sm">
            💫 Cada avatar representa uma dimensão da sua jornada
          </p>
        </div>
      </div>
    </div>
  );
}
