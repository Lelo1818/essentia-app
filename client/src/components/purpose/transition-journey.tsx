import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { threeDayTransitionJourney, getTransitionPhraseByDay, transitionTexts, type TransitionPractice } from "@/data/transition-content";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  ArrowLeft,
  Brain,
  HelpCircle,
  Eye,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface TransitionJourneyProps {
  onComplete?: () => void;
}

export function TransitionJourney({ onComplete }: TransitionJourneyProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [reflections, setReflections] = useState<Record<number, string>>({});
  const [showIntro, setShowIntro] = useState(true);

  const currentPractice = threeDayTransitionJourney.find(p => p.day === currentDay);
  const isCurrentDayComplete = currentDay in reflections && reflections[currentDay].trim().length > 0;
  const journeyProgress = (completedDays.size / 3) * 100;

  useEffect(() => {
    if (completedDays.size === 3 && onComplete) {
      setTimeout(onComplete, 1000);
    }
  }, [completedDays, onComplete]);

  const handleDayComplete = () => {
    if (isCurrentDayComplete) {
      setCompletedDays(prev => new Set([...prev, currentDay]));
      if (currentDay < 3) {
        setCurrentDay(currentDay + 1);
      }
    }
  };

  const handleReflectionChange = (value: string) => {
    setReflections(prev => ({ ...prev, [currentDay]: value }));
  };

  const resetJourney = () => {
    setCurrentDay(1);
    setCompletedDays(new Set());
    setReflections({});
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 text-center">
              Entre Mundos: Jornada de Transição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <RotateCcw className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-amber-800 font-medium mb-4">
                  "Você já não é o que foi. Mas também não precisa saber o que vai ser. O agora é seu ponto de poder."
                </p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">A Jornada de 3 Dias</h4>
                <div className="space-y-2 text-sm text-amber-700">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span><strong>Dia 1:</strong> Plasticidade - Quebrar padrões mentais</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4" />
                    <span><strong>Dia 2:</strong> Liberdade - O poder das perguntas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span><strong>Dia 3:</strong> Presença - Você é quem observa</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={() => setShowIntro(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Começar Jornada
                </Button>
              </div>
              
              <div className="text-xs text-amber-600 text-center">
                Conteúdo inspirado em Rômulo Nomad
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentPractice) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Prática não encontrada</p>
        </CardContent>
      </Card>
    );
  }

  const practiceColors = {
    cerebral: "bg-blue-100 text-blue-700 border-blue-300",
    conceptual: "bg-purple-100 text-purple-700 border-purple-300", 
    presence: "bg-green-100 text-green-700 border-green-300"
  };

  const practiceIcons = {
    cerebral: Brain,
    conceptual: HelpCircle,
    presence: Eye
  };

  const Icon = practiceIcons[currentPractice.practiceType];

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-amber-800">
              Jornada de Transição
            </CardTitle>
            <Badge className="bg-amber-100 text-amber-700">
              Dia {currentDay} de 3
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progresso da Jornada</span>
              <span className="text-sm text-gray-600">{Math.round(journeyProgress)}%</span>
            </div>
            <Progress value={journeyProgress} className="h-3" />
            
            <div className="text-center">
              <p className="text-amber-700 italic">
                "{getTransitionPhraseByDay(currentDay)}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Practice */}
      <Card className={cn("border-2", practiceColors[currentPractice.practiceType])}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon className="w-6 h-6 mr-2" />
              {currentPractice.title}
            </div>
            <Badge className={practiceColors[currentPractice.practiceType]}>
              {currentPractice.practiceType}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Descrição</h4>
              <p className="text-gray-700">{currentPractice.description}</p>
            </div>

            <div className="p-4 bg-white/70 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Prática de Hoje</h4>
              <p className="text-gray-700 leading-relaxed">
                {currentPractice.instruction}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Reflexão</h4>
              <p className="text-gray-600 mb-3 text-sm">{currentPractice.reflection}</p>
              <Textarea
                value={reflections[currentDay] || ""}
                onChange={(e) => handleReflectionChange(e.target.value)}
                placeholder="Compartilhe sua experiência e reflexões aqui..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {isCurrentDayComplete && !completedDays.has(currentDay) && (
              <Button 
                onClick={handleDayComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Completar Dia {currentDay}
              </Button>
            )}

            {completedDays.has(currentDay) && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <p className="text-green-800 font-medium">Dia {currentDay} Concluído!</p>
                <p className="text-green-700 text-sm mt-1">
                  Parabéns por essa exploração corajosa.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
          disabled={currentDay === 1}
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Dia Anterior
        </Button>

        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all",
                day === currentDay
                  ? "border-amber-500 bg-amber-500 text-white"
                  : completedDays.has(day)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              )}
            >
              {completedDays.has(day) ? "✓" : day}
            </button>
          ))}
        </div>

        <Button
          onClick={() => setCurrentDay(Math.min(3, currentDay + 1))}
          disabled={currentDay === 3}
          variant="outline"
        >
          Próximo Dia
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Journey Complete */}
      {completedDays.size === 3 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Jornada de Transição Completa
                </h3>
                <p className="text-green-700">
                  Você explorou as três dimensões da transição com coragem e presença. 
                  Lembre-se: transição não é queda, é renascimento.
                </p>
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button 
                  onClick={resetJourney}
                  variant="outline" 
                  className="border-green-300 text-green-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Refazer Jornada
                </Button>
                
                {onComplete && (
                  <Button 
                    onClick={onComplete}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Continuar Exploração
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}