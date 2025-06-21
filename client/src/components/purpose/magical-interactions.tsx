import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LivingReactions from './living-reactions';
import { 
  Heart, 
  Sparkles, 
  Smile,
  Star,
  Sun,
  Moon,
  Zap,
  Wind
} from 'lucide-react';

export default function MagicalInteractions() {
  const [reaction, setReaction] = useState<string>('');
  const [isHovering, setIsHovering] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const magicalButtons = [
    {
      id: 'gratitude',
      icon: Heart,
      label: 'Gratidão',
      color: 'from-pink-500 to-red-500',
      reaction: 'gratitude',
      messages: ['💝 Seu coração está radiante!', '🌹 Gratidão transforma tudo']
    },
    {
      id: 'insight', 
      icon: Sparkles,
      label: 'Insight',
      color: 'from-purple-500 to-blue-500',
      reaction: 'insight',
      messages: ['💡 Que descoberta brilhante!', '✨ Sua sabedoria está emergindo']
    },
    {
      id: 'joy',
      icon: Smile,
      label: 'Alegria',
      color: 'from-yellow-500 to-orange-500', 
      reaction: 'joy',
      messages: ['😊 Sua alegria é contagiante!', '🌈 Você está irradiando felicidade']
    },
    {
      id: 'peace',
      icon: Wind,
      label: 'Paz',
      color: 'from-green-500 to-blue-500',
      reaction: 'peace', 
      messages: ['🕊️ Que serenidade linda!', '🌊 Sua paz interior é poderosa']
    }
  ];

  const handleMagicalClick = (buttonId: string, intensity: 'gentle' | 'medium' | 'intense') => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    
    // Detectar cliques rápidos para reações mais intensas
    if (timeDiff < 500) {
      setClicks(prev => prev + 1);
      if (clicks >= 2) {
        intensity = 'intense';
        setClicks(0);
      }
    } else {
      setClicks(1);
    }
    
    setLastClickTime(now);
    setReaction(`${buttonId}-${Date.now()}`);
    
    // Som sutil (se possível)
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Frequências diferentes para cada emoção
      const frequencies = {
        gratitude: 528, // Frequência do amor
        insight: 741,   // Frequência da intuição  
        joy: 639,       // Frequência da alegria
        peace: 432      // Frequência da paz
      };
      
      oscillator.frequency.value = frequencies[buttonId as keyof typeof frequencies] || 528;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      // Falha silenciosa se áudio não disponível
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Criar rastro de partículas suave
    const newTrail = {
      x, y, 
      id: Date.now() + Math.random()
    };
    
    setMouseTrail(prev => [...prev.slice(-8), newTrail]);
  };

  // Limpar rastro gradualmente
  useEffect(() => {
    const interval = setInterval(() => {
      setMouseTrail(prev => prev.slice(1));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    const greetings = {
      morning: ['🌅 Que energia linda para começar o dia!', '☀️ Bom dia, alma radiante!'],
      afternoon: ['🌞 Que tarde inspiradora!', '🌻 Sua luz está brilhando forte!'],
      evening: ['🌅 Que energia serena para a noite!', '🌙 Boa noite, ser iluminado!'],
      night: ['✨ Que momento mágico da madrugada!', '🌌 As estrelas conspiram a seu favor!']
    };
    
    let timeOfDay: keyof typeof greetings;
    if (hour < 12) timeOfDay = 'morning';
    else if (hour < 18) timeOfDay = 'afternoon'; 
    else if (hour < 22) timeOfDay = 'evening';
    else timeOfDay = 'night';
    
    const messages = greetings[timeOfDay];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div 
      ref={containerRef}
      className="relative p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Rastro do mouse */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className="absolute pointer-events-none transition-all duration-500"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4,
            height: 4,
            background: `hsla(${index * 45}, 70%, 60%, ${(index + 1) / mouseTrail.length})`,
            borderRadius: '50%',
            transform: `scale(${(index + 1) / mouseTrail.length})`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Efeito de hover */}
      {isHovering && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-pink-100/30 animate-pulse" />
      )}
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Como você está se sentindo?
          </h3>
          <p className="text-gray-600 animate-fade-in">
            {getTimeBasedGreeting()}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {magicalButtons.map((button) => {
            const Icon = button.icon;
            return (
              <Button
                key={button.id}
                onClick={() => handleMagicalClick(button.id, 'medium')}
                className={`
                  relative overflow-hidden h-20 bg-gradient-to-r ${button.color} 
                  hover:scale-105 active:scale-95 transform transition-all duration-200
                  shadow-lg hover:shadow-xl group
                `}
                onMouseEnter={() => {
                  // Micro-reação no hover
                  if (Math.random() > 0.7) {
                    setReaction(`hover-${button.id}-${Date.now()}`);
                  }
                }}
              >
                {/* Efeito shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative flex flex-col items-center space-y-2">
                  <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                  <span className="text-white font-semibold text-sm">
                    {button.label}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
        
        {/* Dica interativa */}
        <div className="text-center mt-4 text-xs text-gray-500 animate-bounce">
          💫 Clique rapidamente para reações mais intensas
        </div>
      </div>
      
      {/* Sistema de reações vivas */}
      {reaction && (
        <LivingReactions
          trigger={reaction}
          intensity={clicks > 2 ? 'intense' : clicks > 0 ? 'medium' : 'gentle'}
          onReactionComplete={() => setReaction('')}
        />
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}