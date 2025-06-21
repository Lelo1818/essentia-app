import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Mountain, Waves, TreePine, Sun, Moon, Star } from "lucide-react";

interface Avatar3DProps {
  clarityLevel: number;
  environment: 'cave' | 'forest' | 'mountain' | 'ocean' | 'cosmos';
  isActive: boolean;
}

const ENVIRONMENTS = {
  cave: {
    name: "Caverna Interior",
    color: "from-gray-800 to-stone-900",
    icon: Mountain,
    description: "Início da jornada, introspecção profunda"
  },
  forest: {
    name: "Floresta Sagrada", 
    color: "from-green-600 to-emerald-800",
    icon: TreePine,
    description: "Crescimento e conexão com a natureza"
  },
  mountain: {
    name: "Pico da Clareza",
    color: "from-blue-600 to-indigo-800", 
    icon: Mountain,
    description: "Visão ampla e perspectiva elevada"
  },
  ocean: {
    name: "Oceano Infinito",
    color: "from-cyan-600 to-blue-900",
    icon: Waves,
    description: "Fluidez e adaptabilidade"
  },
  cosmos: {
    name: "Cosmos Universal",
    color: "from-purple-600 to-pink-900",
    icon: Star,
    description: "Conexão com o propósito universal"
  }
};

export default function Avatar3D({ clarityLevel, environment, isActive }: Avatar3DProps) {
  const [rotation, setRotation] = useState(0);
  const [breathing, setBreathing] = useState(1);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentEnv = ENVIRONMENTS[environment];
  const IconComponent = currentEnv.icon;

  // Animação de rotação suave
  useEffect(() => {
    if (!isActive) return;
    
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(rotationInterval);
  }, [isActive]);

  // Animação de respiração
  useEffect(() => {
    if (!isActive) return;

    const breathingInterval = setInterval(() => {
      setBreathing(prev => prev === 1 ? 1.1 : 1);
    }, 2000);

    return () => clearInterval(breathingInterval);
  }, [isActive]);

  // Sistema de partículas
  useEffect(() => {
    if (!isActive) return;

    const particleInterval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        
        // Adicionar nova partícula
        if (newParticles.length < 20) {
          newParticles.push({
            id: Date.now(),
            x: Math.random() * 200,
            y: Math.random() * 200,
            opacity: 1
          });
        }

        // Atualizar partículas existentes
        return newParticles.map(particle => ({
          ...particle,
          y: particle.y - 1,
          opacity: particle.opacity - 0.02
        })).filter(particle => particle.opacity > 0);
      });
    }, 100);

    return () => clearInterval(particleInterval);
  }, [isActive]);

  // Desenhar avatar 3D no canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configurar gradiente do ambiente
    const gradient = ctx.createRadialGradient(100, 100, 20, 100, 100, 100);
    
    switch (environment) {
      case 'cave':
        gradient.addColorStop(0, '#4a5568');
        gradient.addColorStop(1, '#1a202c');
        break;
      case 'forest':
        gradient.addColorStop(0, '#48bb78');
        gradient.addColorStop(1, '#2f855a');
        break;
      case 'mountain':
        gradient.addColorStop(0, '#4299e1');
        gradient.addColorStop(1, '#3182ce');
        break;
      case 'ocean':
        gradient.addColorStop(0, '#38b2ac');
        gradient.addColorStop(1, '#2c7a7b');
        break;
      case 'cosmos':
        gradient.addColorStop(0, '#9f7aea');
        gradient.addColorStop(1, '#805ad5');
        break;
    }

    // Desenhar fundo do ambiente
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar avatar (forma humanóide 3D)
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(breathing, breathing);

    // Corpo principal
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 10;
    
    // Cabeça
    ctx.beginPath();
    ctx.arc(0, -30, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Corpo
    ctx.fillRect(-8, -15, 16, 30);

    // Braços
    ctx.fillRect(-20, -10, 12, 8);
    ctx.fillRect(8, -10, 12, 8);

    // Pernas
    ctx.fillRect(-8, 15, 6, 20);
    ctx.fillRect(2, 15, 6, 20);

    // Aura baseada na clareza
    const auraIntensity = clarityLevel / 100;
    ctx.strokeStyle = `rgba(255, 255, 255, ${auraIntensity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 25 + (auraIntensity * 10), 0, 2 * Math.PI);
    ctx.stroke();

    ctx.restore();

    // Desenhar partículas
    particles.forEach(particle => {
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });

  }, [rotation, breathing, environment, clarityLevel, particles]);

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <IconComponent className="w-5 h-5 text-purple-300" />
            <h3 className="text-lg font-semibold text-white">{currentEnv.name}</h3>
          </div>
          <p className="text-sm text-gray-300">{currentEnv.description}</p>
        </div>

        {/* Avatar 3D Canvas */}
        <div className="relative mb-4">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="w-full max-w-[200px] mx-auto rounded-lg"
          />
          
          {/* Overlay de clareza */}
          <div className="absolute top-2 right-2">
            <Badge className={`bg-gradient-to-r ${currentEnv.color} text-white`}>
              {clarityLevel}% Clareza
            </Badge>
          </div>
        </div>

        {/* Controles */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-purple-300 border-purple-300"
            onClick={() => setRotation(prev => prev + 45)}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Evoluir
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-purple-300 border-purple-300"
            onClick={() => setBreathing(prev => prev === 1 ? 1.3 : 1)}
          >
            {breathing > 1 ? <Moon className="w-4 h-4 mr-1" /> : <Sun className="w-4 h-4 mr-1" />}
            {breathing > 1 ? 'Expirar' : 'Inspirar'}
          </Button>
        </div>

        {/* Status da evolução */}
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-400 mb-1">Evolução da Consciência</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${currentEnv.color} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${clarityLevel}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}