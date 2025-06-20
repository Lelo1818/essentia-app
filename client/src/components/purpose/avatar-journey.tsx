import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  User, 
  Mountain, 
  Sunrise, 
  TreePine, 
  Waves, 
  Flame, 
  Star,
  BookOpen,
  Heart,
  Compass,
  Coffee,
  Camera,
  Music
} from "lucide-react";

interface AvatarAction {
  id: string;
  type: "meditation" | "writing" | "reading" | "cooking" | "walking" | "reflection" | "connection";
  description: string;
  scenery: "mountain" | "forest" | "beach" | "home" | "sky" | "fire" | "garden";
  timestamp: Date;
  intensity: number; // 1-10
}

interface AvatarState {
  energy: number;
  clarity: number;
  peace: number;
  growth: number;
  currentScenery: string;
  recentActions: AvatarAction[];
}

export function AvatarJourney() {
  const [avatarState, setAvatarState] = useState<AvatarState>({
    energy: 65,
    clarity: 72,
    peace: 58,
    growth: 84,
    currentScenery: "mountain",
    recentActions: []
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate diary entries creating avatar actions
  const simulateAction = (actionType: AvatarAction["type"], scenery: AvatarAction["scenery"]) => {
    setIsAnimating(true);
    
    const newAction: AvatarAction = {
      id: `action-${Date.now()}`,
      type: actionType,
      description: getActionDescription(actionType),
      scenery,
      timestamp: new Date(),
      intensity: Math.floor(Math.random() * 5) + 6
    };

    setAvatarState(prev => ({
      ...prev,
      currentScenery: scenery,
      recentActions: [newAction, ...prev.recentActions.slice(0, 4)],
      energy: Math.min(100, prev.energy + getEnergyBoost(actionType)),
      clarity: Math.min(100, prev.clarity + getClarityBoost(actionType)),
      peace: Math.min(100, prev.peace + getPeaceBoost(actionType)),
      growth: Math.min(100, prev.growth + 2)
    }));

    setTimeout(() => setIsAnimating(false), 2000);
  };

  const getActionDescription = (type: AvatarAction["type"]): string => {
    const descriptions = {
      meditation: "Sentado em silêncio, respirando com presença",
      writing: "Escrevendo reflexões no diário vivo",
      reading: "Absorvendo sabedoria através das palavras",
      cooking: "Criando uma refeição com intenção",
      walking: "Caminhando descalço, conectado à terra",
      reflection: "Contemplando a jornada percorrida",
      connection: "Compartilhando momentos verdadeiros"
    };
    return descriptions[type];
  };

  const getEnergyBoost = (type: AvatarAction["type"]): number => {
    const boosts = {
      meditation: 8, writing: 5, reading: 4, cooking: 6, 
      walking: 10, reflection: 3, connection: 7
    };
    return boosts[type];
  };

  const getClarityBoost = (type: AvatarAction["type"]): number => {
    const boosts = {
      meditation: 10, writing: 8, reading: 6, cooking: 2,
      walking: 4, reflection: 9, connection: 5
    };
    return boosts[type];
  };

  const getPeaceBoost = (type: AvatarAction["type"]): number => {
    const boosts = {
      meditation: 12, writing: 6, reading: 5, cooking: 8,
      walking: 9, reflection: 7, connection: 6
    };
    return boosts[type];
  };

  const sceneryConfig = {
    mountain: { 
      bg: "bg-gradient-to-b from-blue-200 via-purple-100 to-gray-100",
      icon: Mountain,
      name: "Montanha da Contemplação",
      color: "text-purple-700"
    },
    forest: { 
      bg: "bg-gradient-to-b from-green-200 via-emerald-100 to-green-50",
      icon: TreePine,
      name: "Floresta da Sabedoria",
      color: "text-green-700"
    },
    beach: { 
      bg: "bg-gradient-to-b from-sky-200 via-blue-100 to-yellow-50",
      icon: Waves,
      name: "Praia da Renovação",
      color: "text-blue-700"
    },
    fire: { 
      bg: "bg-gradient-to-b from-orange-200 via-red-100 to-yellow-50",
      icon: Flame,
      name: "Fogueira da Transformação",
      color: "text-orange-700"
    },
    sky: { 
      bg: "bg-gradient-to-b from-indigo-200 via-purple-100 to-pink-50",
      icon: Star,
      name: "Céu dos Sonhos",
      color: "text-indigo-700"
    },
    home: { 
      bg: "bg-gradient-to-b from-amber-200 via-orange-100 to-yellow-50",
      icon: Heart,
      name: "Lar do Coração",
      color: "text-amber-700"
    },
    garden: { 
      bg: "bg-gradient-to-b from-lime-200 via-green-100 to-emerald-50",
      icon: Sunrise,
      name: "Jardim do Crescimento",
      color: "text-lime-700"
    }
  };

  const currentScene = sceneryConfig[avatarState.currentScenery as keyof typeof sceneryConfig] || sceneryConfig.mountain;
  const SceneryIcon = currentScene.icon;

  const actionIcons = {
    meditation: User,
    writing: BookOpen,
    reading: BookOpen,
    cooking: Coffee,
    walking: Compass,
    reflection: Heart,
    connection: Star
  };

  return (
    <div className="space-y-6">
      {/* Avatar Landscape */}
      <Card className={cn("border-2 transition-all duration-1000", currentScene.bg, isAnimating && "scale-105 shadow-lg")}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <SceneryIcon className={cn("w-6 h-6 mr-2", currentScene.color)} />
              {currentScene.name}
            </div>
            <Badge className="bg-white/80 text-gray-700">
              Avatar em Jornada
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Avatar Representation */}
            <div className="relative h-48 bg-white/30 rounded-lg border border-white/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  "w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center transition-all duration-1000",
                  isAnimating && "animate-pulse scale-110"
                )}>
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              
              {/* Floating elements based on recent actions */}
              {avatarState.recentActions.slice(0, 3).map((action, index) => {
                const ActionIcon = actionIcons[action.type];
                return (
                  <div
                    key={action.id}
                    className={cn(
                      "absolute w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md transition-all duration-500",
                      index === 0 && "top-4 right-4 animate-bounce",
                      index === 1 && "bottom-4 left-4 animate-pulse",
                      index === 2 && "top-4 left-4 animate-pulse"
                    )}
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <ActionIcon className="w-4 h-4 text-gray-700" />
                  </div>
                );
              })}
              
              {/* Energy particles */}
              {isAnimating && (
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Avatar Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{avatarState.energy}%</div>
                <div className="text-sm text-gray-600">Energia</div>
                <Progress value={avatarState.energy} className="h-2 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{avatarState.clarity}%</div>
                <div className="text-sm text-gray-600">Clareza</div>
                <Progress value={avatarState.clarity} className="h-2 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{avatarState.peace}%</div>
                <div className="text-sm text-gray-600">Paz</div>
                <Progress value={avatarState.peace} className="h-2 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{avatarState.growth}%</div>
                <div className="text-sm text-gray-600">Crescimento</div>
                <Progress value={avatarState.growth} className="h-2 mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Simulator (represents diary entries) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Simular Entrada do Diário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Cada entrada no diário vivo cria uma nova ação do avatar em seu mundo 3D
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => simulateAction("meditation", "mountain")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <User className="w-5 h-5 text-purple-600" />
                <span className="text-xs">Meditar</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("writing", "home")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-xs">Escrever</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("walking", "forest")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <Compass className="w-5 h-5 text-green-600" />
                <span className="text-xs">Caminhar</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("cooking", "home")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <Coffee className="w-5 h-5 text-orange-600" />
                <span className="text-xs">Cozinhar</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("reflection", "beach")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <Heart className="w-5 h-5 text-pink-600" />
                <span className="text-xs">Refletir</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("reading", "garden")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <BookOpen className="w-5 h-5 text-lime-600" />
                <span className="text-xs">Ler</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("connection", "sky")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <Star className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Conectar</span>
              </Button>
              
              <Button
                onClick={() => simulateAction("meditation", "fire")}
                variant="outline"
                className="h-auto p-3 flex-col space-y-1"
                disabled={isAnimating}
              >
                <Flame className="w-5 h-5 text-red-600" />
                <span className="text-xs">Ritual</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Actions Feed */}
      {avatarState.recentActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Últimas Ações do Avatar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {avatarState.recentActions.map((action) => {
                const ActionIcon = actionIcons[action.type];
                const actionScene = sceneryConfig[action.scenery];
                return (
                  <div
                    key={action.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <ActionIcon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {action.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="text-xs bg-gray-100 text-gray-600">
                          {actionScene.name}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {action.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Intensidade</div>
                      <div className="text-sm font-bold text-gray-800">
                        {action.intensity}/10
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Future Vision */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-800">Visão Futura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-indigo-700">
              Este é apenas o começo. No futuro, o avatar será completamente 3D, 
              com paisagens imersivas que evoluem baseadas nas suas reflexões e jornada pessoal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-indigo-600">
              <div>• Paisagens 3D interativas</div>
              <div>• Avatar personalizado</div>
              <div>• Trilha sonora dinâmica</div>
              <div>• Integração com diário vivo</div>
              <div>• Compartilhamento de jornadas</div>
              <div>• Realidade aumentada</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}