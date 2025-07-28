import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, RotateCcw, Sparkles, Eye } from 'lucide-react';

interface Avatar3DProProps {
  clarity: number;
  environment: number;
  rotation: number;
  auraIntensity: number;
  onEnvironmentChange: (env: number) => void;
}

const environments = [
  { name: 'Oceano', emoji: '🌊', color: '#3B82F6', gradient: 'from-blue-400 to-cyan-500' },
  { name: 'Floresta', emoji: '🌲', color: '#10B981', gradient: 'from-green-400 to-emerald-500' },
  { name: 'Montanha', emoji: '⛰️', color: '#8B5CF6', gradient: 'from-purple-400 to-violet-500' },
  { name: 'Cosmos', emoji: '✨', color: '#F59E0B', gradient: 'from-amber-400 to-orange-500' },
  { name: 'Cristal', emoji: '💎', color: '#EC4899', gradient: 'from-pink-400 to-rose-500' }
];

export const Avatar3DPro = ({ clarity, environment, rotation, auraIntensity, onEnvironmentChange }: Avatar3DProProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, opacity: number}>>([]);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setParticles(newParticles);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const currentEnv = environments[environment];

      // Background gradient
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      bgGradient.addColorStop(0, `${currentEnv.color}20`);
      bgGradient.addColorStop(1, `${currentEnv.color}05`);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle, index) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity * auraIntensity;
        ctx.fillStyle = currentEnv.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      // Draw main avatar circle
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      // Aura rings
      for (let i = 3; i >= 1; i--) {
        const auraGradient = ctx.createRadialGradient(0, 0, 50 + i * 20, 0, 0, 70 + i * 20);
        auraGradient.addColorStop(0, `${currentEnv.color}00`);
        auraGradient.addColorStop(1, `${currentEnv.color}${Math.floor(auraIntensity * 40).toString(16).padStart(2, '0')}`);
        
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(0, 0, 70 + i * 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Main avatar body
      const avatarGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 50);
      avatarGradient.addColorStop(0, currentEnv.color);
      avatarGradient.addColorStop(1, `${currentEnv.color}CC`);
      
      ctx.fillStyle = avatarGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      // Clarity indicator (inner circle)
      const claritySize = (clarity / 100) * 40;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, claritySize, 0, Math.PI * 2);
      ctx.fill();

      // Avatar face/symbol
      ctx.fillStyle = currentEnv.color;
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentEnv.emoji, 0, 0);

      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [environment, rotation, auraIntensity, clarity, particles]);

  return (
    <div className="space-y-6">
      {/* Avatar Display */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            Avatar 3D Interativo
          </CardTitle>
          <div className="text-center">
            <Badge className="bg-purple-600 text-white">
              Clareza: {clarity}% • Ambiente: {environments[environment].name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full max-w-md mx-auto border rounded-xl bg-gradient-to-br from-gray-50 to-gray-100"
              style={{ aspectRatio: '1/1' }}
            />
            
            {/* Overlay info */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Eye className="w-4 h-4 inline mr-2" />
                Aura: {Math.round(auraIntensity * 100)}%
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Rotação: {Math.round(rotation)}°
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Ambientes Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {environments.map((env, index) => (
              <Button
                key={index}
                onClick={() => onEnvironmentChange(index)}
                variant={environment === index ? "default" : "outline"}
                className={`flex flex-col items-center p-4 h-auto ${
                  environment === index 
                    ? `bg-gradient-to-r ${env.gradient} text-white border-0` 
                    : `border-2 hover:bg-gradient-to-r hover:${env.gradient} hover:text-white`
                }`}
              >
                <span className="text-2xl mb-2">{env.emoji}</span>
                <span className="text-sm font-medium">{env.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Ambiente Atual: {environments[environment].name}</h4>
            <p className="text-sm text-gray-600">
              Cada ambiente oferece uma energia única para sua jornada. O avatar responde ao seu nível de clareza 
              e se adapta ao ambiente escolhido com partículas e aura personalizadas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};