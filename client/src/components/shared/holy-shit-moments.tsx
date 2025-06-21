import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Crown, 
  Sparkles, 
  Star,
  Flame,
  Diamond,
  Rocket,
  Lightning
} from 'lucide-react';

export default function HolyShitMoments() {
  const [isExploding, setIsExploding] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [godModeActive, setGodModeActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Explosão de partículas épica
  const triggerExplosion = () => {
    setIsExploding(true);
    
    // Som épico de explosão
    playEpicSound([200, 400, 800, 1600], [0.3, 0.4, 0.5, 0.3]);
    
    // Shake na tela
    document.body.style.animation = 'earthquake 1s ease-in-out';
    
    setTimeout(() => {
      setIsExploding(false);
      document.body.style.animation = '';
    }, 3000);
  };

  // Portal dimensional
  const openPortal = () => {
    setShowPortal(true);
    
    // Som de portal dimensional
    playEpicSound([100, 150, 200, 300, 500], [0.2, 0.3, 0.4, 0.3, 0.2]);
    
    // Efeito de distorção na tela
    document.body.style.filter = 'hue-rotate(180deg) contrast(150%)';
    
    setTimeout(() => {
      document.body.style.filter = '';
      setShowPortal(false);
    }, 4000);
  };

  // Modo Matrix
  const activateMatrix = () => {
    setMatrixMode(true);
    startMatrixRain();
    
    // Som de hack matrix
    playEpicSound([440, 880, 1320, 1760], [0.1, 0.1, 0.1, 0.1]);
    
    setTimeout(() => {
      setMatrixMode(false);
      stopMatrixRain();
    }, 8000);
  };

  // Modo Deus
  const activateGodMode = () => {
    setGodModeActive(true);
    
    // Som celestial
    playEpicSound([528, 594, 660, 792, 880], [0.3, 0.3, 0.3, 0.3, 0.3]);
    
    // Aura dourada
    document.body.style.boxShadow = 'inset 0 0 100px rgba(255, 215, 0, 0.3)';
    document.body.style.background = 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)';
    
    setTimeout(() => {
      setGodModeActive(false);
      document.body.style.boxShadow = '';
      document.body.style.background = '';
    }, 10000);
  };

  // Sistema de som épico
  const playEpicSound = (frequencies: number[], volumes: number[]) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      const ctx = audioContextRef.current;
      
      frequencies.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'square';
          osc.frequency.value = freq;
          filter.type = 'lowpass';
          filter.frequency.value = freq * 2;
          
          gain.gain.setValueAtTime(volumes[i] || 0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
          
          osc.start();
          osc.stop(ctx.currentTime + 1);
        }, i * 100);
      });
    } catch (e) {
      console.log('Epic sound failed, but visual effects work!');
    }
  };

  // Matrix Rain Effect
  const startMatrixRain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "FLOW EDUIE ESSENTIA KIDS 0123456789 ✨💎🚀⚡";
    const drops: number[] = [];
    
    for (let x = 0; x < canvas.width / 10; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * 10, drops[i] * 10);
        
        if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 35);
    
    // Limpar depois
    setTimeout(() => {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 8000);
  };

  const stopMatrixRain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Sequência ULTIMATE
  const triggerUltimate = () => {
    // Sequência cascata de efeitos
    triggerExplosion();
    
    setTimeout(() => {
      openPortal();
    }, 1000);
    
    setTimeout(() => {
      activateMatrix();
    }, 2000);
    
    setTimeout(() => {
      activateGodMode();
    }, 4000);
    
    // Mensagem final
    setTimeout(() => {
      alert('🎉 HOLY SHIT! VOCÊ DESBLOQUEOU O FLOW ECOSYSTEM COMPLETO! 🚀');
    }, 6000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Canvas para Matrix */}
      <canvas 
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${matrixMode ? 'block' : 'hidden'}`}
        style={{ zIndex: 100 }}
      />
      
      {/* Controles (só visível em desenvolvimento) */}
      <div className="absolute bottom-4 right-4 pointer-events-auto space-y-2">
        <Button 
          onClick={triggerExplosion}
          className="bg-red-600 hover:bg-red-700 w-full"
          size="sm"
        >
          <Zap className="w-4 h-4 mr-1" />
          Explosão
        </Button>
        
        <Button 
          onClick={openPortal}
          className="bg-purple-600 hover:bg-purple-700 w-full"
          size="sm"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          Portal
        </Button>
        
        <Button 
          onClick={activateMatrix}
          className="bg-green-600 hover:bg-green-700 w-full"
          size="sm"
        >
          <Lightning className="w-4 h-4 mr-1" />
          Matrix
        </Button>
        
        <Button 
          onClick={activateGodMode}
          className="bg-yellow-600 hover:bg-yellow-700 w-full"
          size="sm"
        >
          <Crown className="w-4 h-4 mr-1" />
          God Mode
        </Button>
        
        <Button 
          onClick={triggerUltimate}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 w-full text-white font-bold"
          size="sm"
        >
          <Rocket className="w-4 h-4 mr-1" />
          ULTIMATE
        </Button>
      </div>
      
      {/* Explosão de partículas */}
      {isExploding && (
        <div className="fixed inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Portal dimensional */}
      {showPortal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div 
            className="w-64 h-64 rounded-full border-4 border-purple-500 animate-spin"
            style={{
              background: 'conic-gradient(from 0deg, transparent, purple, transparent)',
              filter: 'blur(2px)'
            }}
          />
          <div 
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
            style={{ filter: 'blur(4px)' }}
          />
        </div>
      )}
      
      {/* Modo Deus - Aura */}
      {godModeActive && (
        <div className="fixed inset-0">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Crown className="w-32 h-32 text-yellow-500 animate-bounce drop-shadow-2xl" />
          </div>
        </div>
      )}
      
      {/* CSS para efeitos */}
      <style jsx global>{`
        @keyframes earthquake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-10px); }
          20% { transform: translateX(10px); }
          30% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          50% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          70% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          90% { transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
}