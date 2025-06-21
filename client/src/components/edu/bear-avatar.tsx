import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BearAvatarProps {
  isRoaring?: boolean;
  environment?: string;
}

export default function BearAvatar({ isRoaring = false, environment = "forest" }: BearAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

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
      
      // Background floresta mística
      const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
      gradient.addColorStop(0, '#1a4d3a');
      gradient.addColorStop(0.5, '#0f2a1a');
      gradient.addColorStop(1, '#051510');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Efeito de respiração e rugido
      const time = Date.now() * 0.003;
      const roarIntensity = isRoaring ? 1 + Math.sin(time * 8) * 0.3 : 1;
      const breathingScale = roarIntensity * (1 + Math.sin(time) * 0.08);
      
      ctx.save();
      ctx.translate(200, 200);
      ctx.scale(breathingScale, breathingScale);
      
      // URSO PODEROSO
      
      // Corpo do urso
      ctx.fillStyle = '#4A4A4A';
      ctx.beginPath();
      ctx.ellipse(0, 30, 80, 100, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Barriga
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      ctx.ellipse(0, 40, 50, 70, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Cabeça do urso
      ctx.fillStyle = '#654321';
      ctx.beginPath();
      ctx.arc(0, -50, 70, 0, Math.PI * 2);
      ctx.fill();
      
      // Orelhas
      ctx.fillStyle = '#4A4A4A';
      ctx.beginPath();
      ctx.arc(-45, -85, 30, 0, Math.PI * 2);
      ctx.arc(45, -85, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Orelhas internas
      ctx.fillStyle = '#D2691E';
      ctx.beginPath();
      ctx.arc(-45, -85, 18, 0, Math.PI * 2);
      ctx.arc(45, -85, 18, 0, Math.PI * 2);
      ctx.fill();
      
      // Focinho expandido (rugindo)
      const mouthScale = isRoaring ? 1.5 : 1;
      ctx.fillStyle = '#DEB887';
      ctx.beginPath();
      ctx.ellipse(0, -30, 35 * mouthScale, 25, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Nariz
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(0, -45, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Boca rugindo
      if (isRoaring) {
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.ellipse(0, -15, 25, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Dentes durante rugido
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 6; i++) {
          const x = -20 + (i * 8);
          ctx.beginPath();
          ctx.ellipse(x, -25, 3, 12, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Caninos grandes
        ctx.beginPath();
        ctx.ellipse(-15, -20, 4, 18, 0, 0, Math.PI * 2);
        ctx.ellipse(15, -20, 4, 18, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Boca normal
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, -10, 15, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }
      
      // Olhos intensos
      const eyeSize = isRoaring ? 18 : 15;
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.arc(-25, -60, eyeSize, 0, Math.PI * 2);
      ctx.arc(25, -60, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Pupilas ferozes
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-25, -60, eyeSize * 0.6, 0, Math.PI * 2);
      ctx.arc(25, -60, eyeSize * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // Brilho feroz nos olhos
      ctx.fillStyle = '#FF4500';
      ctx.beginPath();
      ctx.arc(-20, -65, 4, 0, Math.PI * 2);
      ctx.arc(30, -65, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Garras poderosas
      ctx.strokeStyle = '#2F2F2F';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      
      // Garra esquerda
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-70 + i * 8, 100);
        ctx.lineTo(-65 + i * 8, 120);
        ctx.stroke();
      }
      
      // Garra direita  
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(70 - i * 8, 100);
        ctx.lineTo(65 - i * 8, 120);
        ctx.stroke();
      }
      
      // Ondas sonoras do rugido
      if (isRoaring) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        
        for (let i = 0; i < 4; i++) {
          const radius = 100 + i * 25 + Math.sin(time * 6) * 10;
          const alpha = 0.8 - (i * 0.2);
          ctx.globalAlpha = alpha;
          
          ctx.beginPath();
          ctx.arc(0, -30, radius, -0.8, 0.8);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      
      // Partículas de energia selvagem
      for (let i = 0; i < 12; i++) {
        const angle = time * 0.8 + (i / 12) * Math.PI * 2;
        const radius = 120 + Math.sin(time * 2 + i) * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const intensity = isRoaring ? 1.5 : 1;
        ctx.fillStyle = `hsla(${30 + Math.sin(time + i) * 60}, 80%, 60%, ${(0.4 + Math.sin(time + i) * 0.4) * intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 4 + Math.sin(time * 3 + i) * 3, 0, Math.PI * 2);
        ctx.fill();
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
  }, [isRoaring]);

  const playRoarSound = () => {
    if (!soundEnabled) return;
    
    // Simular som de rugido com Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border-2 border-amber-600 rounded-lg shadow-2xl"
        style={{ background: 'radial-gradient(circle, #1a4d3a 0%, #051510 100%)' }}
      />
      
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-amber-900/80 border-amber-600 text-amber-100 hover:bg-amber-800"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
        
        <Button
          size="sm"
          className="bg-red-700 hover:bg-red-600 text-white font-bold"
          onClick={playRoarSound}
        >
          RUGIR!
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-amber-300 font-semibold text-lg">
          🐻 Urso Sábio - Mentor de Conhecimento
        </p>
        <p className="text-amber-200 text-sm">
          {isRoaring ? "RUGINDO COM PODER!" : "Guardião da Sabedoria Ancestral"}
        </p>
      </div>
    </div>
  );
}