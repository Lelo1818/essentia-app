import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SymbolicMirror } from "@/components/purpose/symbolic-mirror";
import { CompleteExperience } from "@/components/media/complete-experience";
import { journeyStructure, getPhaseById, getNextPhase, type JourneyPhase } from "@/data/journey-structure";
import { ceremonialPhrases, getRandomPhrase } from "@/data/ceremonial-phrases";
import { cn } from "@/lib/utils";
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Eye,
  Heart,
  Sparkles,
  Camera,
  Volume2
} from "lucide-react";

export default function JourneyPhases() {
  const [currentPhaseId, setCurrentPhaseId] = useState("entrada-inicial");
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());
  const [showMirror, setShowMirror] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [ceremonialPhrase, setCeremonialPhrase] = useState(getRandomPhrase("opening"));

  const currentPhase = getPhaseById(currentPhaseId);
  const nextPhase = getNextPhase(currentPhaseId);
  const totalPhases = journeyStructure.length;
  const currentIndex = journeyStructure.findIndex(p => p.id === currentPhaseId);
  const progressPercent = ((currentIndex + 1) / totalPhases) * 100;

  useEffect(() => {
    // Set ceremonial phrase based on phase context
    if (currentPhase) {
      if (currentPhase.phase === 0) {
        setCeremonialPhrase(getRandomPhrase("opening"));
      } else if (currentPhase.phase >= 3) {
        setCeremonialPhrase(getRandomPhrase("closing"));
      } else {
        setCeremonialPhrase(getRandomPhrase("transition"));
      }
    }
  }, [currentPhase]);

  const handlePhaseComplete = () => {
    if (currentPhase) {
      setCompletedPhases(prev => new Set([...prev, currentPhase.id]));
      
      // Trigger mirror for specific phases
      if (currentPhase.id === "espelho-eu" || currentPhase.phase === 2) {
        setShowMirror(true);
        return;
      }
      
      // Move to next phase
      if (nextPhase) {
        setCurrentPhaseId(nextPhase.id);
      }
    }
  };

  const handleMirrorComplete = () => {
    setShowMirror(false);
    if (nextPhase) {
      setCurrentPhaseId(nextPhase.id);
    }
  };

  const handlePreviousPhase = () => {
    if (currentIndex > 0) {
      setCurrentPhaseId(journeyStructure[currentIndex - 1].id);
    }
  };

  const startExperience = () => {
    setShowExperience(true);
  };

  if (showMirror && currentPhase) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Eye className="w-6 h-6 mr-2" />
              {currentPhase.title}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <SymbolicMirror
          phase={currentPhase.phase}
          onReflectionComplete={handleMirrorComplete}
        />
      </div>
    );
  }

  if (showExperience && currentPhase) {
    return (
      <CompleteExperience
        textId="despertar-interior"
        onComplete={() => setShowExperience(false)}
      />
    );
  }

  if (!currentPhase) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Fase não encontrada</p>
        </CardContent>
      </Card>
    );
  }

  const categoryColors = {
    entrada: "bg-blue-100 text-blue-700 border-blue-300",
    chamado: "bg-purple-100 text-purple-700 border-purple-300",
    travessia: "bg-orange-100 text-orange-700 border-orange-300",
    desprendimento: "bg-gray-100 text-gray-700 border-gray-300",
    reconexao: "bg-green-100 text-green-700 border-green-300",
    expressao: "bg-yellow-100 text-yellow-700 border-yellow-300",
    comunhao: "bg-pink-100 text-pink-700 border-pink-300",
    retorno: "bg-indigo-100 text-indigo-700 border-indigo-300"
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-blue-800">
              <Compass className="w-6 h-6 mr-2" />
              Jornada de Despertar
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-700">
              Fase {currentPhase.phase} • {currentPhase.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Etapa {currentIndex + 1} de {totalPhases}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progressPercent)}% da jornada
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Ceremonial Phrase */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6 text-center">
          <div className="space-y-3">
            <Sparkles className="w-8 h-8 mx-auto text-amber-600" />
            <p className="text-lg font-medium text-amber-800 italic">
              "{ceremonialPhrase.text}"
            </p>
            <Badge className="bg-amber-100 text-amber-700">
              {ceremonialPhrase.usage}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Current Phase */}
      <Card className={cn("border-2", categoryColors[currentPhase.category])}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{currentPhase.title}</span>
            <Badge className={categoryColors[currentPhase.category]}>
              {currentPhase.category}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              {currentPhase.description}
            </p>
            
            <div className="p-4 bg-white/50 rounded-lg border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">Texto Simbólico:</p>
              <p className="text-gray-700 italic leading-relaxed">
                {currentPhase.symbolText}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {currentPhase.id === "espelho-eu" && (
                <Button 
                  onClick={() => setShowMirror(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Espelho Simbólico
                </Button>
              )}
              
              <Button 
                onClick={startExperience}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Experiência Audiovisual
              </Button>
              
              <Button 
                onClick={handlePhaseComplete}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Integrar e Continuar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePreviousPhase}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Fase Anterior
        </Button>

        {nextPhase && (
          <Button
            onClick={() => setCurrentPhaseId(nextPhase.id)}
            variant="outline"
            className="flex items-center"
          >
            Próxima: {nextPhase.title}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Journey Map */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa da Jornada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {journeyStructure.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhaseId(phase.id)}
                className={cn(
                  "p-3 rounded-lg border-2 text-left transition-all hover:shadow-md",
                  phase.id === currentPhaseId
                    ? "border-blue-500 bg-blue-50"
                    : completedPhases.has(phase.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400"
                )}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    phase.id === currentPhaseId
                      ? "bg-blue-500 text-white"
                      : completedPhases.has(phase.id)
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  )}>
                    {completedPhases.has(phase.id) ? "✓" : index + 1}
                  </div>
                  <Badge className={cn("text-xs", categoryColors[phase.category])}>
                    {phase.category}
                  </Badge>
                </div>
                <div className="text-sm font-medium">{phase.title}</div>
                <div className="text-xs text-gray-600 mt-1">
                  Fase {phase.phase}
                  {phase.subPhase && `.${phase.subPhase}`}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}