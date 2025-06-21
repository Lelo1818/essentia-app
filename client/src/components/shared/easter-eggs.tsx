import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EasterEggs() {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [secretUnlocked, setSecretUnlocked] = useState<string | null>(null);
  const [clickPattern, setClickPattern] = useState<number[]>([]);
  const [timePattern, setTimePattern] = useState<number[]>([]);

  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  const secrets = {
    konami: {
      name: "Código Konami",
      message: "🎮 Você desbloqueou o modo desenvolvedor! Avatares especiais liberados!",
      reward: "dev_mode"
    },
    fibonacci: {
      name: "Sequência Dourada", 
      message: "🌀 Você descobriu a sequência de Fibonacci! Desbloqueou meditação matemática!",
      reward: "fibonacci_meditation"
    },
    trinity: {
      name: "Trindade Sagrada",
      message: "⚡ Três cliques rápidos no avatar - poder triplo ativado!",
      reward: "triple_power"
    },
    midnight: {
      name: "Guardião da Meia-noite",
      message: "🌙 Você encontrou o portal noturno! Rituais noturnos especiais liberados!",
      reward: "night_rituals"
    },
    birthday: {
      name: "Aniversário Cósmico",
      message: "🎂 O universo celebra você hoje! Dia de poderes ilimitados!",
      reward: "unlimited_power"
    }
  };

  // Detectar Konami Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiCode(prev => {
        const newCode = [...prev, e.code];
        if (newCode.length > konamiSequence.length) {
          newCode.shift();
        }
        
        if (newCode.length === konamiSequence.length && 
            newCode.every((key, i) => key === konamiSequence[i])) {
          triggerSecret('konami');
          return [];
        }
        
        return newCode;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Detectar padrões de tempo especiais
  useEffect(() => {
    const checkTimePatterns = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      // Meia-noite exata
      if (hour === 0 && minute === 0) {
        triggerSecret('midnight');
      }
      
      // Horários Fibonacci
      const fibonacciHours = [1, 1, 2, 3, 5, 8, 13, 21];
      if (fibonacciHours.includes(hour) && minute === hour) {
        triggerSecret('fibonacci');
      }
      
      // Números especiais
      if (hour === minute && hour % 3 === 0) {
        triggerSecret('trinity');
      }
    };

    const interval = setInterval(checkTimePatterns, 60000); // Check a cada minuto
    return () => clearInterval(interval);
  }, []);

  const triggerSecret = (secretKey: keyof typeof secrets) => {
    const secret = secrets[secretKey];
    setSecretUnlocked(secretKey);
    
    // Efeito visual épico
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    // Som especial
    try {
      const audioContext = new AudioContext();
      // Arpejo ascendente
      [262, 330, 392, 523].forEach((freq, i) => {
        setTimeout(() => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.2, audioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          osc.start();
          osc.stop(audioContext.currentTime + 0.5);
        }, i * 200);
      });
    } catch (e) {
      console.log('Easter egg sound failed, but visual works!');
    }
    
    setTimeout(() => {
      setSecretUnlocked(null);
      document.body.style.animation = '';
    }, 5000);
  };

  // Easter eggs específicos
  const handleAvatarClick = () => {
    const now = Date.now();
    setClickPattern(prev => {
      const newPattern = [...prev, now].slice(-3);
      
      // Três cliques rápidos (menos de 1 segundo entre eles)
      if (newPattern.length === 3) {
        const intervals = [
          newPattern[1] - newPattern[0],
          newPattern[2] - newPattern[1]
        ];
        
        if (intervals.every(interval => interval < 1000)) {
          triggerSecret('trinity');
          return [];
        }
      }
      
      return newPattern;
    });
  };

  const checkBirthdayEasterEgg = () => {
    // Simular detecção de aniversário baseado em data/perfil
    const today = new Date();
    const isSpecialDay = today.getDate() === today.getMonth() + 1; // Dia = mês
    
    if (isSpecialDay) {
      triggerSecret('birthday');
    }
  };

  useEffect(() => {
    checkBirthdayEasterEgg();
  }, []);

  return (
    <>
      {/* Easter Egg revelado */}
      {secretUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
          <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 text-white shadow-2xl border-0 max-w-md animate-bounce">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">EASTER EGG ENCONTRADO!</h2>
              <h3 className="text-xl font-semibold mb-3">
                {secrets[secretUnlocked].name}
              </h3>
              <p className="mb-4">
                {secrets[secretUnlocked].message}
              </p>
              <Badge variant="outline" className="text-white border-white">
                Recompensa Especial Desbloqueada
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Elemento clicável oculto para testes */}
      <div 
        onClick={handleAvatarClick}
        className="fixed bottom-4 left-4 w-8 h-8 opacity-0 cursor-pointer z-40"
        title="Avatar secreto"
      />
      
      {/* CSS para efeitos */}
      <style jsx global>{`
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  );
}