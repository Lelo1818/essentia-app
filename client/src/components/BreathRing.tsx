import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/lib/sound';

interface BreathRingProps {
  mode?: '446' | '478';
  onComplete?: () => void;
}

export function BreathRing({ mode = '446', onComplete }: BreathRingProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
  const [cycleCount, setCycleCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const phases = mode === '446' ? {
    inhale: 4,
    hold: 4,
    exhale: 6,
  } : {
    inhale: 4,
    hold: 7,
    exhale: 8,
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'inhale': return 'Inspire';
      case 'hold': return 'Segure';
      case 'exhale': return 'Expire';
      default: return 'Preparado?';
    }
  };

  const getRingScale = () => {
    if (phase === 'rest') return 1;
    if (phase === 'inhale') return 1.3;
    if (phase === 'hold') return 1.3;
    if (phase === 'exhale') return 1;
    return 1;
  };

  const startBreathing = useCallback(() => {
    setIsActive(true);
    setPhase('inhale');
    setTimeRemaining(phases.inhale);
    setCycleCount(0);
    soundManager.play('breath_tick');
  }, [phases.inhale]);

  const stopBreathing = () => {
    setIsActive(false);
    setPhase('rest');
    setTimeRemaining(0);
  };

  const resetBreathing = () => {
    stopBreathing();
    setCycleCount(0);
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Transition to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            soundManager.play('breath_tick');
            return phases.hold;
          } else if (phase === 'hold') {
            setPhase('exhale');
            soundManager.play('breath_tick');
            return phases.exhale;
          } else if (phase === 'exhale') {
            const newCount = cycleCount + 1;
            setCycleCount(newCount);
            
            if (newCount >= 3) {
              setIsActive(false);
              setPhase('rest');
              soundManager.play('ui_success');
              onComplete?.();
              return 0;
            } else {
              setPhase('inhale');
              soundManager.play('breath_tick');
              return phases.inhale;
            }
          }
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, cycleCount, phases, onComplete]);

  const progress = phase === 'rest' ? 0 : (1 - (timeRemaining / (phases[phase as keyof typeof phases] || 1))) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {/* Breath Ring */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer rings */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-purple-200 transition-all duration-1000 ease-in-out"
          style={{
            transform: `scale(${getRingScale()})`,
            opacity: phase === 'rest' ? 0.3 : 0.8,
          }}
        />
        <div 
          className="absolute inset-4 rounded-full border-4 border-purple-300 transition-all duration-1000 ease-in-out"
          style={{
            transform: `scale(${getRingScale()})`,
            opacity: phase === 'rest' ? 0.3 : 0.6,
          }}
        />
        
        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center bg-white rounded-full w-40 h-40 shadow-lg">
          <div className="text-3xl font-bold text-purple-600">
            {phase === 'rest' ? '🌬️' : timeRemaining}
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">
            {getPhaseLabel()}
          </div>
          {cycleCount > 0 && (
            <div className="text-xs text-gray-400 mt-1">
              Ciclo {cycleCount}/3
            </div>
          )}
        </div>

        {/* Progress indicator */}
        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-purple-500"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s linear' }}
            />
          </svg>
        )}
      </div>

      {/* Controls */}
      <div className="flex space-x-3">
        {!isActive ? (
          <Button 
            onClick={startBreathing}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
            data-testid="button-start-breath"
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar
          </Button>
        ) : (
          <Button 
            onClick={stopBreathing}
            size="lg"
            variant="outline"
            data-testid="button-pause-breath"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pausar
          </Button>
        )}
        
        {cycleCount > 0 && (
          <Button 
            onClick={resetBreathing}
            size="lg"
            variant="ghost"
            data-testid="button-reset-breath"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reiniciar
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center max-w-md">
        <p className="text-sm text-gray-600">
          Técnica {mode === '446' ? '4-4-6' : '4-7-8'}: {' '}
          {phases.inhale}s inspire, {phases.hold}s segure, {phases.exhale}s expire
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Complete 3 ciclos para ganhar pontos
        </p>
      </div>
    </div>
  );
}
