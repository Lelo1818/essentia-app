import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { breathingTechniques } from '../../data/essentia-pro-data';

interface GuidedBreathingProProps {
  isActive: boolean;
  selectedTechnique: number;
  onTechniqueChange: (technique: number) => void;
  onToggle: () => void;
  onComplete: () => void;
}

export const GuidedBreathingPro = ({ 
  isActive, 
  selectedTechnique, 
  onTechniqueChange,
  onToggle, 
  onComplete 
}: GuidedBreathingProProps) => {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const technique = breathingTechniques[selectedTechnique];
  const totalCycles = 5;
  const phases = ['Inspire', 'Segure', 'Expire', 'Segure'];
  const phaseColors = ['bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'];

  useEffect(() => {
    if (!isActive || isCompleted) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        const newTimer = prev + 1;
        const phaseTime = technique.pattern[currentPhase];
        
        if (newTimer >= phaseTime) {
          const nextPhase = (currentPhase + 1) % technique.pattern.length;
          setCurrentPhase(nextPhase);
          
          if (nextPhase === 0) {
            const nextCycle = currentCycle + 1;
            setCurrentCycle(nextCycle);
            
            if (nextCycle >= totalCycles) {
              setIsCompleted(true);
              setTimeout(() => {
                onComplete();
                reset();
              }, 2000);
              return 0;
            }
          }
          return 0;
        }
        
        setProgress(((currentCycle * technique.pattern.length + currentPhase) / (totalCycles * technique.pattern.length)) * 100);
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentPhase, currentCycle, technique, onComplete, isCompleted]);

  const reset = () => {
    setCurrentCycle(0);
    setCurrentPhase(0);
    setTimer(0);
    setProgress(0);
    setIsCompleted(false);
  };

  const handleTechniqueChange = (value: string) => {
    const index = parseInt(value);
    onTechniqueChange(index);
    reset();
  };

  if (isCompleted) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Sessão Completa!</h3>
          <p className="text-green-700 mb-4">Você concluiu {totalCycles} ciclos de {technique.name}</p>
          <Button onClick={reset} className="bg-green-600 hover:bg-green-700">
            Nova Sessão
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="w-6 h-6 mr-2 text-blue-600" />
          {technique.name}
        </CardTitle>
        <p className="text-blue-700">{technique.description}</p>
        <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block">
          Propósito: {technique.purpose}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Technique Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Escolha a Técnica
            </label>
            <Select value={selectedTechnique.toString()} onValueChange={handleTechniqueChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {breathingTechniques.map((tech, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {tech.name} - {tech.purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Breathing Visualization */}
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto">
              <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                phaseColors[currentPhase]
              } ${isActive ? 
                currentPhase === 0 ? 'scale-110 opacity-80' :
                currentPhase === 1 ? 'scale-105 opacity-90' :
                currentPhase === 2 ? 'scale-95 opacity-70' :
                'scale-100 opacity-85'
                : 'scale-100 opacity-50'
              }`}></div>
              
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {isActive ? phases[currentPhase] : 'Pronto'}
                  </div>
                  <div className="text-xl text-gray-600">
                    {isActive ? `${technique.pattern[currentPhase] - timer}s` : 'Começar'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {isActive ? `Ciclo ${currentCycle + 1}/${totalCycles}` : technique.purpose}
                  </div>
                </div>
              </div>
              
              {/* Breathing rings */}
              <div className={`absolute inset-0 rounded-full border-4 border-white/30 transition-all duration-1000 ${
                isActive && currentPhase === 0 ? 'scale-125' : 'scale-110'
              }`}></div>
              <div className={`absolute inset-4 rounded-full border-2 border-white/20 transition-all duration-1000 ${
                isActive && currentPhase === 2 ? 'scale-90' : 'scale-100'
              }`}></div>
            </div>
          </div>

          {/* Progress and Pattern */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progresso da Sessão</span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}% completo
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            
            <div className="grid grid-cols-4 gap-2 text-center">
              {technique.pattern.map((time, index) => (
                <div key={index} className={`p-3 rounded-lg transition-all ${
                  index === currentPhase && isActive ? 
                    'bg-blue-200 scale-105 shadow-md' : 
                    'bg-gray-100'
                }`}>
                  <div className="font-bold text-lg">{time}s</div>
                  <div className="text-xs text-gray-600">{phases[index]}</div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={onToggle} 
                className="bg-blue-600 hover:bg-blue-700 px-6"
                size="lg"
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pausar' : 'Iniciar'}
              </Button>
              <Button onClick={reset} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};