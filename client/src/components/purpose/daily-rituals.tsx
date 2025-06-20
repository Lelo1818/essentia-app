import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { dailyRituals, type DailyRitual } from "@/data/essentia-content";
import { cn } from "@/lib/utils";
import { 
  Sunrise, 
  Sunset, 
  Heart, 
  Edit3,
  CheckCircle,
  Sparkles
} from "lucide-react";

interface DailyRitualsProps {
  onRitualComplete?: (ritual: DailyRitual, response: string) => void;
}

export function DailyRitualsComponent({ onRitualComplete }: DailyRitualsProps) {
  const [activeRitual, setActiveRitual] = useState<DailyRitual | null>(null);
  const [ritualResponse, setRitualResponse] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [completedRituals, setCompletedRituals] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load completed rituals from localStorage
    const saved = localStorage.getItem('daily-rituals-completed');
    if (saved) {
      setCompletedRituals(new Set(JSON.parse(saved)));
    }
  }, []);

  const openRitual = (ritual: DailyRitual) => {
    setActiveRitual(ritual);
    setRitualResponse("");
    setSelectedOption("");
  };

  const completeRitual = () => {
    if (!activeRitual) return;
    
    const response = activeRitual.isWriteable 
      ? ritualResponse 
      : selectedOption;
    
    if (!response.trim()) return;

    // Mark as completed
    const newCompleted = new Set([...completedRituals, activeRitual.id]);
    setCompletedRituals(newCompleted);
    localStorage.setItem('daily-rituals-completed', JSON.stringify([...newCompleted]));

    // Save response
    const responses = JSON.parse(localStorage.getItem('daily-ritual-responses') || '{}');
    responses[activeRitual.id] = {
      response,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    localStorage.setItem('daily-ritual-responses', JSON.stringify(responses));

    onRitualComplete?.(activeRitual, response);
    setActiveRitual(null);
  };

  const resetDailyRituals = () => {
    setCompletedRituals(new Set());
    localStorage.removeItem('daily-rituals-completed');
    localStorage.removeItem('daily-ritual-responses');
  };

  const ritualIcons = {
    opening: Sunrise,
    closing: Sunset
  };

  const ritualColors = {
    opening: "bg-amber-100 text-amber-700 border-amber-300",
    closing: "bg-indigo-100 text-indigo-700 border-indigo-300"
  };

  if (activeRitual) {
    const RitualIcon = ritualIcons[activeRitual.type];
    
    return (
      <Card className={cn("border-2", ritualColors[activeRitual.type])}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RitualIcon className="w-6 h-6 mr-2" />
            {activeRitual.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-white/50 rounded-lg border border-gray-200">
              <p className="text-gray-800 font-medium italic">
                {activeRitual.prompt}
              </p>
            </div>

            {/* Options */}
            {activeRitual.options && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Escolha uma opção:</h4>
                <div className="space-y-2">
                  {activeRitual.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={cn(
                        "w-full p-3 rounded-lg border-2 text-left transition-all",
                        selectedOption === option
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Written Response */}
            {activeRitual.isWriteable && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Sua reflexão:</h4>
                <Textarea
                  value={ritualResponse}
                  onChange={(e) => setRitualResponse(e.target.value)}
                  placeholder="Escreva aqui sua resposta com sinceridade..."
                  className="min-h-[120px] resize-none"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <Button
                onClick={completeRitual}
                disabled={!ritualResponse.trim() && !selectedOption}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Concluir Ritual
              </Button>
              
              <Button
                onClick={() => setActiveRitual(null)}
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                Fechar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Sparkles className="w-6 h-6 mr-2" />
            Rituais Diários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700">
            Momentos sagrados para iniciar e encerrar suas sessões com intenção e presença.
          </p>
        </CardContent>
      </Card>

      {/* Rituals Grid */}
      <div className="grid gap-4">
        {dailyRituals.map((ritual) => {
          const RitualIcon = ritualIcons[ritual.type];
          const isCompleted = completedRituals.has(ritual.id);
          
          return (
            <Card
              key={ritual.id}
              className={cn(
                "border-2 transition-all hover:shadow-md cursor-pointer",
                isCompleted 
                  ? "border-green-300 bg-green-50" 
                  : ritualColors[ritual.type]
              )}
              onClick={() => !isCompleted && openRitual(ritual)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      isCompleted 
                        ? "bg-green-100" 
                        : ritual.type === "opening" 
                          ? "bg-amber-100" 
                          : "bg-indigo-100"
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <RitualIcon className={cn(
                          "w-6 h-6",
                          ritual.type === "opening" ? "text-amber-600" : "text-indigo-600"
                        )} />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {ritual.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {ritual.prompt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-700">
                        Concluído
                      </Badge>
                    )}
                    
                    <Badge className={cn(
                      ritual.type === "opening" 
                        ? "bg-amber-100 text-amber-700" 
                        : "bg-indigo-100 text-indigo-700"
                    )}>
                      {ritual.type === "opening" ? "Abertura" : "Encerramento"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gratitude Space - Special Card */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center text-pink-800">
            <Heart className="w-5 h-5 mr-2" />
            Espaço da Gratidão Diária
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-pink-700 text-sm">
              Um momento para reconhecer as bençãos do dia, por menores que sejam.
            </p>
            
            <div className="flex items-center space-x-3">
              <Textarea
                placeholder="Por que você é grato hoje? (ou use um emoji ❤️)"
                className="flex-1 min-h-[60px] resize-none border-pink-200 focus:border-pink-400"
              />
              <Button
                variant="outline"
                className="border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Option */}
      {completedRituals.size > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {completedRituals.size} ritual(s) concluído(s) hoje
              </span>
              <Button
                onClick={resetDailyRituals}
                variant="outline"
                size="sm"
                className="text-gray-600"
              >
                Reiniciar Dia
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}