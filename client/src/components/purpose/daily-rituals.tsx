import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { dailyRituals, type DailyRitual } from "@/data/essentia-content";
import { cn } from "@/lib/utils";
import { MediaPlayer } from "@/components/MediaPlayer";
import { 
  Sunrise, 
  Sunset, 
  Heart, 
  Edit3,
  CheckCircle,
  Sparkles
} from "lucide-react";

import portalGratidaoVideo from "@assets/Portal da Gratidão_1761137810586.mp4";

interface DailyRitualsProps {
  onRitualComplete?: (ritual: DailyRitual, response: string) => void;
}

export function DailyRitualsComponent({ onRitualComplete }: DailyRitualsProps) {
  const [activeRitual, setActiveRitual] = useState<DailyRitual | null>(null);
  const [ritualResponse, setRitualResponse] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [completedRituals, setCompletedRituals] = useState<Set<string>>(new Set());
  
  // Estado para Ritual da Gratidão com vídeo
  const [gratitudeRitualActive, setGratitudeRitualActive] = useState(false);
  const [gratitudeVideoComplete, setGratitudeVideoComplete] = useState(false);
  const [gratitudeText, setGratitudeText] = useState("");
  const [gratitudeCompleted, setGratitudeCompleted] = useState(false);

  useEffect(() => {
    // Load completed rituals from localStorage
    const saved = localStorage.getItem('daily-rituals-completed');
    if (saved) {
      setCompletedRituals(new Set(JSON.parse(saved)));
    }
    
    // Check if gratitude ritual was completed today
    const gratitudeData = localStorage.getItem('gratitude-ritual-date');
    const today = new Date().toDateString();
    if (gratitudeData === today) {
      setGratitudeCompleted(true);
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
    const completedArray = Array.from(completedRituals);
    const newCompleted = new Set([...completedArray, activeRitual.id]);
    setCompletedRituals(newCompleted);
    localStorage.setItem('daily-rituals-completed', JSON.stringify(Array.from(newCompleted)));

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
    localStorage.removeItem('gratitude-ritual-date');
    setGratitudeCompleted(false);
  };

  const openGratitudeRitual = () => {
    setGratitudeRitualActive(true);
    setGratitudeVideoComplete(false);
    setGratitudeText("");
  };

  const completeGratitudeRitual = async () => {
    if (!gratitudeText.trim()) return;

    // Salvar no localStorage
    const today = new Date().toDateString();
    localStorage.setItem('gratitude-ritual-date', today);
    
    const gratitudeResponses = JSON.parse(localStorage.getItem('gratitude-responses') || '[]');
    gratitudeResponses.push({
      text: gratitudeText,
      timestamp: new Date().toISOString(),
      date: today
    });
    localStorage.setItem('gratitude-responses', JSON.stringify(gratitudeResponses));

    // Marcar como concluído
    setGratitudeCompleted(true);
    setGratitudeRitualActive(false);
    
    // Opcional: salvar no banco
    try {
      await fetch('/api/rituals/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ritualType: 'gratitude',
          response: gratitudeText,
          ritual_completed: true
        })
      });
    } catch (error) {
      console.debug('Ritual save failed (offline mode):', error);
    }
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

      {/* Ritual da Gratidão - Com vídeo do Aruan */}
      {gratitudeRitualActive ? (
        <Card className="border-2 border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50">
          <CardContent className="p-6">
            {!gratitudeVideoComplete ? (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-pink-800 mb-2">
                    🌿 Portal da Gratidão
                  </h3>
                  <p className="text-pink-700">
                    Aruan te convida para um momento de presença e reconhecimento
                  </p>
                </div>
                
                <MediaPlayer
                  assetKey="portal_gratidao"
                  title="Portal da Gratidão"
                  videoUrl={portalGratidaoVideo}
                  onComplete={() => setGratitudeVideoComplete(true)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Mensagem pós-vídeo */}
                <div className="text-center p-6 bg-white/70 rounded-xl border-2 border-pink-300">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-pink-500" />
                  <p className="text-xl font-medium text-pink-900 italic">
                    "Respira e agradece.
                  </p>
                  <p className="text-xl font-medium text-pink-900 italic mt-2">
                    A cada pequeno passo, a vida floresce contigo."
                  </p>
                </div>

                {/* Campo de gratidão */}
                <div className="space-y-3">
                  <h4 className="font-medium text-pink-800">
                    Por que você é grato hoje?
                  </h4>
                  <Textarea
                    value={gratitudeText}
                    onChange={(e) => setGratitudeText(e.target.value)}
                    placeholder="Uma frase, uma palavra, um sentimento... o que seu coração deseja expressar?"
                    className="min-h-[100px] resize-none border-pink-300 focus:border-pink-500 bg-white/80"
                    data-testid="input-gratitude-text"
                  />
                </div>

                {/* Ações */}
                <div className="flex space-x-3">
                  <Button
                    onClick={completeGratitudeRitual}
                    disabled={!gratitudeText.trim()}
                    className="bg-pink-600 hover:bg-pink-700 text-white flex-1"
                    data-testid="button-complete-gratitude"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Concluir Ritual
                  </Button>
                  
                  <Button
                    onClick={() => setGratitudeRitualActive(false)}
                    variant="outline"
                    className="border-pink-300 text-pink-700"
                    data-testid="button-close-gratitude"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card 
          className={cn(
            "cursor-pointer hover:shadow-lg transition-all border-2",
            gratitudeCompleted 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
              : "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300"
          )}
          onClick={() => !gratitudeCompleted && openGratitudeRitual()}
          data-testid="card-gratitude-ritual"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center",
                  gratitudeCompleted ? "bg-green-100" : "bg-pink-100"
                )}>
                  {gratitudeCompleted ? (
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  ) : (
                    <Heart className="w-7 h-7 text-pink-600" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    🌿 Ritual da Gratidão
                  </h3>
                  <p className="text-sm text-gray-600">
                    {gratitudeCompleted 
                      ? "Ritual concluído hoje. Volte amanhã para uma nova prática."
                      : "Pause, respire e reconheça as bençãos do dia com Aruan"
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                {gratitudeCompleted && (
                  <Badge className="bg-green-100 text-green-700">
                    ✓ Concluído
                  </Badge>
                )}
                <Badge className="bg-pink-100 text-pink-700">
                  🎬 Com vídeo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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