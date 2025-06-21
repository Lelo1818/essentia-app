import { useRef, useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShamanAvatarProps {
  isChanneling?: boolean;
  environment?: string;
}

export default function ShamanAvatar({ isChanneling = false, environment = "sacred" }: ShamanAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [powerLevel, setPowerLevel] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background xamânico místico
      const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
      gradient.addColorStop(0, '#2D1B69');
      gradient.addColorStop(0.5, '#1e1b4b');
      gradient.addColorStop(1, '#0f0a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Efeito de canalização espiritual
      const time = Date.now() * 0.005;
      const channelingIntensity = isChanneling ? 1 + Math.sin(time * 5) * 0.4 : 1;
      const breathingScale = channelingIntensity * (1 + Math.sin(time) * 0.08);
      const floatingY = Math.sin(time * 0.4) * 15;
      
      ctx.save();
      ctx.translate(200, 200 + floatingY);
      ctx.scale(breathingScale, breathingScale);
      
      // ARQUI-XAMÃ - MESTRE DOS PORTAIS DIMENSIONAIS
      
      // Aura espiritual externa (mais intensa quando canalizando)
      const auraIntensity = isChanneling ? 0.6 : 0.2;
      ctx.fillStyle = `hsla(${270 + Math.sin(time) * 30}, 80%, 60%, ${auraIntensity})`;
      ctx.beginPath();
      ctx.arc(0, 0, 140 + Math.sin(time * 3) * 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Corpo energizado
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(0, 20, 55, 80, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Tatuagens de poder
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Espiral no peito
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 4;
        const radius = i * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius + 20;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Pinturas corporais sagradas
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.bezierCurveTo(-15, 10, 15, 10, 30, 0);
      ctx.moveTo(-40, 30);
      ctx.bezierCurveTo(-20, 40, 20, 40, 40, 30);
      ctx.stroke();
      
      // Rosto
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.arc(0, -40, 50, 0, Math.PI * 2);
      ctx.fill();
      
      // Cabelo longo com movimento
      ctx.fillStyle = '#000000';
      for (let i = 0; i < 5; i++) {
        const x = -40 + i * 20 + Math.sin(time + i) * 5;
        const y = -70 + Math.sin(time * 0.8 + i) * 8;
        ctx.beginPath();
        ctx.ellipse(x, y, 8, 35, Math.sin(time + i) * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Cocar cerimonial
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI - Math.PI/2;
        const x = Math.cos(angle) * 60;
        const y = Math.sin(angle) * 60 - 40;
        
        ctx.fillStyle = ['#FF6B35', '#F7931E', '#FFD23F', '#FF1744', '#9C27B0', '#00BCD4', '#4CAF50'][i];
        ctx.beginPath();
        ctx.ellipse(x, y, 6, 25 + Math.sin(time + i) * 5, angle + Math.PI/2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Olhos místicos (brilham quando canalizando)
      const eyeGlow = isChanneling ? '#FFD700' : '#ffffff';
      ctx.fillStyle = eyeGlow;
      ctx.beginPath();
      ctx.arc(-15, -45, 12, 0, Math.PI * 2);
      ctx.arc(15, -45, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Pupilas com poder espiritual
      ctx.fillStyle = isChanneling ? '#8A2BE2' : '#4169E1';
      ctx.beginPath();
      ctx.arc(-15, -45, 8, 0, Math.PI * 2);
      ctx.arc(15, -45, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Terceiro olho (ativo quando canalizando)
      if (isChanneling) {
        ctx.fillStyle = '#FF1744';
        ctx.beginPath();
        ctx.arc(0, -55, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, -55, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Pintura facial sagrada
      ctx.strokeStyle = '#DC143C';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-25, -25);
      ctx.lineTo(0, -20);
      ctx.lineTo(25, -25);
      ctx.moveTo(-20, -10);
      ctx.lineTo(20, -10);
      ctx.stroke();
      
      // Colar xamânico
      ctx.strokeStyle = '#F5DEB3';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, 5, 40, 0, Math.PI * 2);
      ctx.stroke();
      
      // Dentes e ossos no colar
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const x = Math.cos(angle) * 40;
        const y = Math.sin(angle) * 40 + 5;
        
        ctx.fillStyle = i % 2 === 0 ? '#FFFAF0' : '#D2691E';
        ctx.beginPath();
        ctx.ellipse(x, y, 4, i % 2 === 0 ? 10 : 6, angle, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Bastão xamânico cósmico
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(70, 10);
      ctx.lineTo(90, -30);
      ctx.stroke();
      
      // Cristal de poder no bastão
      const crystalGlow = isChanneling ? 20 : 12;
      ctx.fillStyle = isChanneling ? '#FF1744' : '#9370DB';
      ctx.beginPath();
      ctx.arc(90, -30, crystalGlow, 0, Math.PI * 2);
      ctx.fill();
      
      // Raios de energia do cristal
      if (isChanneling) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time * 2;
          const x1 = 90 + Math.cos(angle) * 15;
          const y1 = -30 + Math.sin(angle) * 15;
          const x2 = 90 + Math.cos(angle) * 35;
          const y2 = -30 + Math.sin(angle) * 35;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      
      // Partículas espirituais orbitando
      const particleCount = isChanneling ? 20 : 12;
      for (let i = 0; i < particleCount; i++) {
        const angle = time * 0.6 + (i / particleCount) * Math.PI * 2;
        const radius = 110 + Math.sin(time * 2 + i) * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const hue = (time * 40 + i * (360 / particleCount)) % 360;
        const alpha = isChanneling ? 0.8 : 0.5;
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha + Math.sin(time + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 4 + Math.sin(time * 3 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Rastro espiritual
        if (isChanneling) {
          ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.3)`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Portal dimensional (quando canalizando)
      if (isChanneling) {
        ctx.strokeStyle = '#FF1744';
        ctx.lineWidth = 4;
        for (let i = 0; i < 3; i++) {
          const radius = 150 + i * 20 + Math.sin(time * 4) * 10;
          const alpha = 0.8 - i * 0.2;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      
      ctx.restore();
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isChanneling]);

  const channelPower = () => {
    setPowerLevel(prev => Math.min(prev + 1, 5));
    setTimeout(() => setPowerLevel(prev => Math.max(prev - 1, 0)), 2000);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border-2 border-purple-600 rounded-lg shadow-2xl"
        style={{ background: 'radial-gradient(circle, #2D1B69 0%, #0f0a2e 100%)' }}
      />
      
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          size="sm"
          className="bg-purple-700 hover:bg-purple-600 text-white font-bold"
          onClick={channelPower}
        >
          <Sparkles className="w-4 h-4 mr-1" />
          CANALIZAR
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-8 rounded-full ${
              i < powerLevel ? 'bg-purple-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-purple-300 font-semibold text-lg">
          🔮 Xamã Ancestral - Guardião dos Mistérios
        </p>
        <p className="text-purple-200 text-sm">
          {isChanneling ? "CANALIZANDO ENERGIA CÓSMICA!" : "Sabedoria dos Antepassados"}
        </p>
        <p className="text-purple-400 text-xs mt-1">
          Poder Espiritual: {"⚡".repeat(powerLevel)}
        </p>
      </div>
    </div>
  );
}