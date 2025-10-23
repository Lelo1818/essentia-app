import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Heart, 
  Leaf, 
  Wind, 
  Eye, 
  Flame,
  X,
  Play
} from "lucide-react";
import { MediaPlayer } from "@/components/MediaPlayer";
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
  icon: typeof Sparkles;
  video: string;
  description: string;
  energy: string;
  gift: string;
}

const avatars: Avatar[] = [
  {
    id: "aruan-guardiao",
    name: "Aruan",
    title: "O Guardião do Propósito",
    element: "Espírito",
    color: "from-purple-600 to-indigo-600",
    icon: Sparkles,
    video: aruanGuardiaoVideo,
    description: "Guardião ancestral que desperta a força interior",
    energy: "Presença, coragem e propósito",
    gift: "Conexão com seu eu autêntico"
  },
  {
    id: "sofia",
    name: "Sofia",
    title: "A Luz da Clareza",
    element: "Mental",
    color: "from-blue-500 to-cyan-400",
    icon: Sparkles,
    video: sofiaVideo,
    description: "Mestra da mente clara e do discernimento",
    energy: "Sabedoria, clareza e insight",
    gift: "Visão além das ilusões"
  },
  {
    id: "nara",
    name: "Nara",
    title: "A Cura da Terra",
    element: "Físico",
    color: "from-green-600 to-emerald-500",
    icon: Leaf,
    video: naraVideo,
    description: "Guardiã da cura e do enraizamento terrestre",
    energy: "Regeneração, vitalidade e equilíbrio",
    gift: "Conexão profunda com o corpo"
  },
  {
    id: "kael",
    name: "Kael",
    title: "O Sopro da Sabedoria",
    element: "Energético",
    color: "from-amber-500 to-orange-400",
    icon: Wind,
    video: kaelVideo,
    description: "Mestre do sopro vital e da energia sutil",
    energy: "Respiração, fluxo e transformação",
    gift: "Domínio da energia vital"
  },
  {
    id: "amaya",
    name: "Amaya",
    title: "A Voz da Intuição",
    element: "Espiritual",
    color: "from-violet-600 to-purple-500",
    icon: Eye,
    video: amayaVideo,
    description: "Guardiã da intuição e da visão interior",
    energy: "Percepção, sensibilidade e conexão",
    gift: "Escuta profunda da alma"
  },
  {
    id: "aruan-fogo",
    name: "Aruan",
    title: "O Fogo da Coragem",
    element: "Transformação",
    color: "from-red-600 to-orange-500",
    icon: Flame,
    video: aruanFogoVideo,
    description: "Guerreiro do fogo que acende a chama interior",
    energy: "Coragem, ação e transformação",
    gift: "Poder de agir apesar do medo"
  }
];

export default function AvatarsPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleAvatarClick = (avatar: Avatar) => {
    soundManager.play("ui_click");
    setSelectedAvatar(avatar);
  };

  const handleClose = () => {
    soundManager.play("ui_click");
    setSelectedAvatar(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Os 6 Guardiões da Jornada
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Cada guardião representa uma dimensão essencial do seu despertar.
            Conheça os mestres que irão guiá-lo nesta transformação.
          </p>
        </div>

        {/* Avatars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {avatars.map((avatar) => {
            const Icon = avatar.icon;
            return (
              <Card 
                key={avatar.id}
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                onClick={() => handleAvatarClick(avatar)}
                data-testid={`card-avatar-${avatar.id}`}
              >
                <CardContent className="p-6">
                  {/* Avatar Icon */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {avatar.name}
                    </h3>
                    <p className="text-sm text-purple-300">
                      {avatar.title}
                    </p>
                  </div>

                  {/* Element Badge */}
                  <div className="flex justify-center mb-4">
                    <Badge className={`bg-gradient-to-r ${avatar.color} text-white border-none`}>
                      {avatar.element}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 text-center mb-4">
                    {avatar.description}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-purple-300">Energia</div>
                        <div className="text-sm text-white">{avatar.energy}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-purple-300">Dom</div>
                        <div className="text-sm text-white">{avatar.gift}</div>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${avatar.color} hover:opacity-90 transition-opacity`}
                    data-testid={`button-play-${avatar.id}`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Conhecer {avatar.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <p className="text-purple-300 text-sm max-w-2xl mx-auto">
            💫 Cada guardião oferece uma experiência única de transformação.
            Clique em qualquer avatar para iniciar sua jornada com ele.
          </p>
        </div>
      </div>

      {/* Video Modal */}
      {selectedAvatar && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-6xl">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={handleClose}
                data-testid="button-close-modal"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Avatar Info */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedAvatar.name} - {selectedAvatar.title}
              </h2>
              <p className="text-purple-200">
                {selectedAvatar.description}
              </p>
            </div>

            {/* Video Player */}
            <MediaPlayer
              assetKey={`avatar-${selectedAvatar.id}`}
              title={`${selectedAvatar.name} - ${selectedAvatar.title}`}
              videoUrl={selectedAvatar.video}
              onClose={handleClose}
              onComplete={() => {
                soundManager.play("ui_success");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
