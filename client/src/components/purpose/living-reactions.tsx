import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Sparkles, 
  Star, 
  Smile,
  Zap,
  Sun,
  Moon,
  Wind,
  Flame
} from 'lucide-react';

interface LivingReactionsProps {
  trigger: string;
  intensity: 'gentle' | 'medium' | 'intense';
  onReactionComplete?: () => void;
}

export default function LivingReactions({ trigger, intensity, onReactionComplete }: LivingReactionsProps) {
  const [particles, setParticles] = useState<any[]>([]);
  const [heartbeat, setHeartbeat] = useState(false);
  const [surprise, setSurprise] = useState<string | null>(null);
  const [breathe, setBreathe] = useState(false);

  const surpriseMessages = [
    "✨ Que bela energia você trouxe agora!",
    "🌟 Posso sentir sua luz brilhando!",
    "💝 Sua presença aqui me inspira",
    "🦋 Algo lindo está nascendo em você",
    "🌱 Sinto crescimento acontecendo",
    "💫 Você está irradiando sabedoria",
    "🎭 Que transformação maravilhosa!",
    "🌸 Sua alma está florescendo",
    "⚡ Que energia poderosa!",
    "🎨 Você está pintando sua jornada"
  ];

  const createParticleExplosion = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 400,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      shape: ['✨', '💫', '⭐', '🌟', '💎'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);
  };

  const triggerHeartbeat = () => {
    setHeartbeat(true);
    setTimeout(() => setHeartbeat(false), 600);
  };

  const showSurprise = () => {
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    setSurprise(randomMessage);
    setTimeout(() => setSurprise(null), 4000);
  };

  const triggerBreathing = () => {
    setBreathe(true);
    setTimeout(() => setBreathe(false), 3000);
  };

  useEffect(() => {
    if (trigger) {
      // Sempre uma reação base
      triggerHeartbeat();
      
      // Reações baseadas na intensidade
      if (intensity === 'gentle') {
        triggerBreathing();
        if (Math.random() > 0.7) showSurprise();
      } else if (intensity === 'medium') {
        createParticleExplosion();
        if (Math.random() > 0.5) showSurprise();
      } else if (intensity === 'intense') {
        createParticleExplosion();
        showSurprise();
        setTimeout(createParticleExplosion, 500);
      }
      
      // Reação surpresa aleatória
      if (Math.random() > 0.8) {
        setTimeout(() => {
          const surpriseActions = [createParticleExplosion, showSurprise, triggerBreathing];
          const randomAction = surpriseActions[Math.floor(Math.random() * surpriseActions.length)];
          randomAction();
        }, Math.random() * 2000 + 1000);
      }
      
      setTimeout(() => {
        onReactionComplete?.();
      }, 5000);
    }
  }, [trigger, intensity]);

  // Animar partículas
  useEffect(() => {
    if (particles.length === 0) return;
    
    const animate = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02,
          size: particle.size * 0.98
        })).filter(particle => particle.life > 0)
      );
    };
    
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [particles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none transition-all duration-100"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: particle.size,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
            filter: `brightness(${1 + particle.life})`
          }}
        >
          {particle.shape}
        </div>
      ))}
      
      {/* Heartbeat Effect */}
      {heartbeat && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Heart 
            className={`w-16 h-16 text-red-500 transition-all duration-300 ${
              heartbeat ? 'animate-pulse scale-150' : ''
            }`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))',
              animation: 'heartbeat 0.6s ease-in-out'
            }}
          />
        </div>
      )}
      
      {/* Breathing Effect */}
      {breathe && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" 
             style={{ animation: 'breathe 3s ease-in-out' }} />
      )}
      
      {/* Surprise Message */}
      {surprise && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-2xl animate-bounce">
            <CardContent className="p-4">
              <p className="text-center font-medium text-lg">
                {surprise}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        
        @keyframes breathe {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}