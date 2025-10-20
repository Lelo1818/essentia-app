import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Play, Pause, CheckCircle } from 'lucide-react';

interface BreathingRitualProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function BreathingRitual({ open, onClose, onComplete }: BreathingRitualProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const totalCycles = 18;
  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  };

  const phaseTexts = {
    inhale: 'Inspire profundamente',
    hold: 'Segure o ar',
    exhale: 'Expire lentamente',
    rest: 'Relaxe'
  };

  const phaseColors = {
    inhale: 'from-blue-400 to-cyan-400',
    hold: 'from-cyan-400 to-teal-400',
    exhale: 'from-purple-400 to-pink-400',
    rest: 'from-green-400 to-emerald-400'
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          const phases: ('inhale' | 'hold' | 'exhale' | 'rest')[] = ['inhale', 'hold', 'exhale', 'rest'];
          const currentIndex = phases.indexOf(phase);
          const nextPhase = phases[(currentIndex + 1) % phases.length];
          
          if (nextPhase === 'inhale') {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            
            if (newCycles >= totalCycles) {
              setIsActive(false);
              setCompleted(true);
              return phaseDurations.inhale;
            }
          }
          
          setPhase(nextPhase);
          return phaseDurations[nextPhase];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, cycles]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCountdown(phaseDurations.inhale);
    setCycles(0);
    setCompleted(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    setIsActive(false);
    setCycles(0);
    setCompleted(false);
  };

  const progress = (cycles / totalCycles) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-breathing-ritual">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Ritual Matinal de Conexão
          </DialogTitle>
        </DialogHeader>

        {!completed ? (
          <div className="space-y-6 py-4">
            {/* Círculo de Respiração Animado */}
            <div className="relative flex items-center justify-center h-64">
              <div 
                className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${phaseColors[phase]} opacity-20 blur-xl transition-all duration-1000 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              />
              <div 
                className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${phaseColors[phase]} flex flex-col items-center justify-center transition-all duration-1000 ${
                  isActive && (phase === 'inhale' || phase === 'hold') ? 'scale-125' : 'scale-100'
                }`}
                data-testid="breathing-circle"
              >
                <div className="text-6xl font-bold text-white" data-testid="countdown-display">
                  {countdown}
                </div>
                <div className="text-sm text-white/90 mt-2" data-testid="phase-display">
                  {phaseTexts[phase]}
                </div>
              </div>
            </div>

            {/* Progresso */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Ciclos completados</span>
                <span>{cycles}/{totalCycles}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Controles */}
            <div className="flex justify-center space-x-3">
              {!isActive ? (
                <Button 
                  onClick={handleStart} 
                  size="lg"
                  className="w-full"
                  data-testid="button-start-breathing"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {cycles === 0 ? 'Começar' : 'Retomar'}
                </Button>
              ) : (
                <Button 
                  onClick={handlePause} 
                  variant="outline"
                  size="lg"
                  className="w-full"
                  data-testid="button-pause-breathing"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Ritual Completo!</h3>
              <p className="text-gray-600">
                Você completou 5 minutos de respiração consciente.
                <br />
                <span className="text-green-600 font-medium">+10 pontos ganhos</span>
              </p>
            </div>
            <Button onClick={handleComplete} size="lg" className="w-full" data-testid="button-complete-ritual">
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
