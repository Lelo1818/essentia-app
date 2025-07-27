import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User } from 'lucide-react';
import { environments } from '../../data/essentia-pro-data';

interface Avatar3DProProps {
  clarity: number;
  environment: number;
  rotation: number;
  auraIntensity: number;
  onEnvironmentChange: (env: number) => void;
}

export const Avatar3DPro = ({ clarity, environment, rotation, auraIntensity, onEnvironmentChange }: Avatar3DProProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 80;
      const radius = baseRadius + (clarity * 0.8);

      // Environment background
      const env = environments[environment];
      const backgroundGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width / 2
      );
      backgroundGradient.addColorStop(0, env.color + '30');
      backgroundGradient.addColorStop(0.7, env.color + '15');
      backgroundGradient.addColorStop(1, env.color + '05');
      ctx.fillStyle = backgroundGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Outer aura (breathing effect)
      const auraRadius = radius + 30 + (auraIntensity * 20);
      const auraGradient = ctx.createRadialGradient(
        centerX, centerY, radius,
        centerX, centerY, auraRadius
      );
      auraGradient.addColorStop(0, `rgba(255, 255, 255, ${auraIntensity * 0.6})`);
      auraGradient.addColorStop(0.5, `rgba(255, 255, 255, ${auraIntensity * 0.3})`);
      auraGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner energy field
      const energyGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.3,
        centerX, centerY, radius
      );
      energyGradient.addColorStop(0, env.color + 'FF');
      energyGradient.addColorStop(0.7, env.color + 'AA');
      energyGradient.addColorStop(1, env.color + '44');
      ctx.fillStyle = energyGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Core avatar
      const coreGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, 0,
        centerX, centerY, radius * 0.8
      );
      coreGradient.addColorStop(0, '#FFFFFF');
      coreGradient.addColorStop(0.5, '#F8FAFC');
      coreGradient.addColorStop(1, '#E2E8F0');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Floating particles
      const time = Date.now() / 1000;
      for (let i = 0; i < 8; i++) {
        const angle = (time + i * Math.PI / 4) % (Math.PI * 2);
        const particleRadius = radius + 40;
        const x = centerX + Math.cos(angle) * particleRadius;
        const y = centerY + Math.sin(angle) * particleRadius;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + Math.sin(time * 2 + i) * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [clarity, environment, rotation, auraIntensity]);

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avatar 3D Evolutivo</span>
          <Badge className="bg-green-600 text-white animate-pulse">
            Live Canvas
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">Seu reflexo interior em tempo real</p>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="relative mx-auto w-80 h-80 rounded-xl overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <User className="w-16 h-16 text-white/80 animate-pulse" />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 font-medium">
              {environments[environment].name} • Clareza: {clarity}%
            </p>
            <div className="text-sm text-gray-500">
              "Sua energia atual reflete {clarity < 30 ? 'potencial adormecido' : 
                clarity < 60 ? 'despertar em progresso' : 
                clarity < 80 ? 'clareza emergente' : 'propósito radiante'}"
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Ambientes Evolutivos
            </label>
            <div className="grid grid-cols-5 gap-2">
              {environments.map((env, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={index === environment ? "default" : "outline"}
                  className="flex flex-col py-3 h-auto"
                  onClick={() => onEnvironmentChange(index)}
                >
                  <span className="text-lg mb-1">{env.emoji}</span>
                  <span className="text-xs">{env.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nível de Clareza</span>
              <span className="font-semibold">{clarity}%</span>
            </div>
            <Progress value={clarity} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div className="p-2 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600">Aura</div>
              <div className="text-blue-500">Ativa</div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-600">Energia</div>
              <div className="text-green-500">{Math.round(auraIntensity * 100)}%</div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-600">Partículas</div>
              <div className="text-purple-500">8</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};