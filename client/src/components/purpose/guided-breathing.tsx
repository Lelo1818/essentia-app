import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { guidedBreathings, type GuidedBreathing } from "@/data/essentia-content";
import { cn } from "@/lib/utils";
import { trackBreathing } from "@/lib/analytics";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles,
  Heart,
  Eye
} from "lucide-react";

interface GuidedBreathingProps {
  breathingId?: string;
  purpose?: GuidedBreathing["purpose"];
  onComplete?: () => void;
}

export function GuidedBreathingComponent({ breathingId, purpose, onComplete }: GuidedBreathingProps) {
  const [selectedBreathing, setSelectedBreathing] = useState<GuidedBreathing | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [timeInPhase, setTimeInPhase] = useState(0);

  useEffect(() => {
    if (breathingId) {
      const breathing = guidedBreathings.find(b => b.id === breathingId);
      setSelectedBreathing(breathing || null);
    } else if (purpose) {
      const breathing = guidedBreathings.find(b => b.purpose === purpose);
      setSelectedBreathing(breathing || null);
    } else {
      setSelectedBreathing(guidedBreathings[0]);
    }
  }, [breathingId, purpose]);

  useEffect(() => {
    if (!isActive || !selectedBreathing) return;

    const timer = setInterval(() => {
      setTimeInPhase(prev => {
        const newTime = prev + 0.1;
        let phaseDuration: number;
        
        switch (currentPhase) {
          case "inhale":
            phaseDuration = selectedBreathing.inhale;
            break;
          case "hold":
            phaseDuration = selectedBreathing.hold;
            break;
          case "exhale":
            phaseDuration = selectedBreathing.exhale;
            break;
          default:
            phaseDuration = selectedBreathing.inhale;
        }

        const progress = (newTime / phaseDuration) * 100;
        setPhaseProgress(Math.min(progress, 100));

        if (newTime >= phaseDuration) {
          // Move to next phase
          if (currentPhase === "inhale") {
            setCurrentPhase("hold");
          } else if (currentPhase === "hold") {
            setCurrentPhase("exhale");
          } else {
            // Complete cycle
            setCurrentCycle(prev => {
              const nextCycle = prev + 1;
              if (nextCycle >= selectedBreathing.cycles) {
                setIsActive(false);
                trackBreathing('finish', selectedBreathing?.name || 'unknown');
                onComplete?.();
                return 0;
              }
              return nextCycle;
            });
            setCurrentPhase("inhale");
          }
          setTimeInPhase(0);
          setPhaseProgress(0);
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isActive, selectedBreathing, currentPhase, currentCycle, onComplete]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentCycle(0);
    setCurrentPhase("inhale");
    setTimeInPhase(0);
    setPhaseProgress(0);
    trackBreathing('start', selectedBreathing?.name || 'unknown');
  };

  const pauseBreathing = () => {
    setIsActive(false);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setCurrentPhase("inhale");
    setTimeInPhase(0);
    setPhaseProgress(0);
  };

  if (!selectedBreathing) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Respiração não encontrada</p>
        </CardContent>
      </Card>
    );
  }

  const purposeColors = {
    clarity: "bg-blue-100 text-blue-700 border-blue-300",
    focus: "bg-orange-100 text-orange-700 border-orange-300",
    presence: "bg-green-100 text-green-700 border-green-300"
  };

  const purposeIcons = {
    clarity: Sparkles,
    focus: Eye,
    presence: Heart
  };

  const PurposeIcon = purposeIcons[selectedBreathing.purpose];

  const phaseInstructions = {
    inhale: "Inspire profundamente",
    hold: "Mantenha o ar",
    exhale: "Expire lentamente"
  };

  const cycleProgress = ((currentCycle) / selectedBreathing.cycles) * 100;

  return (
    <div className="space-y-6">
      {/* Breathing Selection */}
      {!breathingId && !purpose && (
        <Card>
          <CardHeader>
            <CardTitle>Escolha uma Respiração Guiada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {guidedBreathings.map((breathing) => {
                const Icon = purposeIcons[breathing.purpose];
                return (
                  <button
                    key={breathing.id}
                    onClick={() => setSelectedBreathing(breathing)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      selectedBreathing.id === breathing.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn("p-2 rounded-full", purposeColors[breathing.purpose])}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {breathing.symbol} {breathing.name}
                        </h4>
                        <p className="text-sm text-gray-600">{breathing.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breathing Interface */}
      <Card className={cn("border-2", purposeColors[selectedBreathing.purpose])}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <PurposeIcon className="w-6 h-6 mr-2" />
              {selectedBreathing.symbol} {selectedBreathing.name}
            </div>
            <Badge className={purposeColors[selectedBreathing.purpose]}>
              {selectedBreathing.purpose}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Instruction */}
            <div className="text-center">
              <p className="text-gray-700 leading-relaxed italic">
                {selectedBreathing.instruction}
              </p>
            </div>

            {/* Breathing Circle */}
            <div className="relative">
              <div className="w-48 h-48 mx-auto">
                <div className={cn(
                  "w-full h-full rounded-full border-8 transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? currentPhase === "inhale" 
                      ? "border-green-400 scale-110 bg-green-50" 
                      : currentPhase === "hold"
                        ? "border-yellow-400 scale-105 bg-yellow-50"
                        : "border-blue-400 scale-95 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                )}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {selectedBreathing.symbol}
                    </div>
                    {isActive && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-gray-700">
                          {phaseInstructions[currentPhase]}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Ciclo {currentCycle + 1} de {selectedBreathing.cycles}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phase Progress */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32">
                  <Progress value={phaseProgress} className="h-2" />
                  <div className="text-xs text-center text-gray-600 mt-1">
                    {currentPhase}
                  </div>
                </div>
              )}
            </div>

            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Progresso Total</span>
                <span>{currentCycle} / {selectedBreathing.cycles} ciclos</span>
              </div>
              <Progress value={cycleProgress} className="h-3" />
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-3">
              {!isActive ? (
                <Button 
                  onClick={startBreathing}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Começar
                </Button>
              ) : (
                <Button 
                  onClick={pauseBreathing}
                  variant="outline"
                  className="border-orange-300 text-orange-700"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </Button>
              )}
              
              <Button 
                onClick={resetBreathing}
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>

            {/* Breathing Pattern Info */}
            <div className="p-4 bg-white/50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Padrão de Respiração</h4>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div>
                  <div className="font-bold text-green-600">{selectedBreathing.inhale}s</div>
                  <div className="text-gray-600">Inspire</div>
                </div>
                <div>
                  <div className="font-bold text-yellow-600">{selectedBreathing.hold}s</div>
                  <div className="text-gray-600">Segure</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">{selectedBreathing.exhale}s</div>
                  <div className="text-gray-600">Expire</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}