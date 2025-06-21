import { Avatar3D } from "./avatar-3d";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function Avatar3DDisplay() {
  const [clarity, setClarity] = useState(72);
  const [environment, setEnvironment] = useState<"cave" | "forest" | "mountain" | "ocean" | "cosmos">("mountain");

  const environments = [
    { id: "cave", name: "Caverna", emoji: "🕳️" },
    { id: "forest", name: "Floresta", emoji: "🌲" },
    { id: "mountain", name: "Montanha", emoji: "⛰️" },
    { id: "ocean", name: "Oceano", emoji: "🌊" },
    { id: "cosmos", name: "Cosmos", emoji: "🌌" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Avatar 3D em Tempo Real
            <Badge className="bg-green-600 text-white animate-pulse">
              Live Canvas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Avatar3D 
              clarityLevel={clarity}
              environment={environment}
              isActive={true}
            />
          </div>

          {/* Environment Selector */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {environments.map((env) => (
              <Button
                key={env.id}
                size="sm"
                variant={environment === env.id ? "default" : "outline"}
                onClick={() => setEnvironment(env.id as any)}
                className="text-xs"
              >
                {env.emoji} {env.name}
              </Button>
            ))}
          </div>

          {/* Clarity Simulator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nível de Clareza</span>
              <span>{clarity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={clarity}
              onChange={(e) => setClarity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Avatar 3D Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Canvas HTML5 com animações em tempo real</li>
              <li>• 5 ambientes evolutivos interativos</li>
              <li>• Sistema de partículas dinâmicas</li>
              <li>• Aura que evolui com o nível de clareza</li>
              <li>• Rotação e respiração contínuas</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}