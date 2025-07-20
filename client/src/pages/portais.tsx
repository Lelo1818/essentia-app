import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Square, Heart } from "lucide-react";

export default function Portais() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState('Inspire');
  const [count, setCount] = useState(4);
  const [feedbackMessage, setFeedbackMessage] = useState("Clique para iniciar sua jornada de quietude.");
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startBreathingPractice = () => {
    if (isBreathing) return;
    
    setIsBreathing(true);
    setPhase('Inspire');
    setCount(4);
    setFeedbackMessage('Inspire...');
    
    let currentPhase = 'Inspire';
    let currentCount = 4;
    let duration = 4;
    
    intervalRef.current = setInterval(() => {
      currentCount--;
      setCount(currentCount);
      
      if (currentCount === 0) {
        if (currentPhase === 'Inspire') {
          currentPhase = 'Segure';
          duration = 2;
        } else if (currentPhase === 'Segure' && duration === 2) {
          currentPhase = 'Expire';
          duration = 6;
        } else if (currentPhase === 'Expire') {
          currentPhase = 'Segure';
          duration = 2;
        } else if (currentPhase === 'Segure' && duration === 2) {
          currentPhase = 'Inspire';
          duration = 4;
        }
        
        currentCount = duration;
        setPhase(currentPhase);
        setCount(currentCount);
        setFeedbackMessage(`${currentPhase}...`);
      }
    }, 1000);
  };

  const stopBreathingPractice = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsBreathing(false);
    setFeedbackMessage("Prática finalizada. Sinta a quietude.");
    setCount(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-2xl border-0 backdrop-blur-sm bg-white/90">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold text-slate-800 mb-4">
            Portal do Silêncio
          </CardTitle>
          <p className="text-lg text-slate-600 leading-relaxed">
            Encontre paz, respostas e renovação na quietude interior. Este portal convida você a desacelerar e a se reconectar com a sua essência através da respiração consciente.
          </p>
        </CardHeader>

        <CardContent className="text-center space-y-8">
          {!isBreathing ? (
            <Button
              onClick={startBreathingPractice}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar Prática de Silêncio
            </Button>
          ) : (
            <Button
              onClick={stopBreathingPractice}
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Square className="w-5 h-5 mr-2" />
              Parar Prática
            </Button>
          )}

          <div className="space-y-6">
            <p className="text-xl text-slate-700 font-medium min-h-[30px]">
              {feedbackMessage}
            </p>

            {isBreathing && (
              <div className={`text-6xl font-bold text-blue-600 transition-all duration-500 ${isBreathing ? 'animate-pulse scale-105' : ''}`}>
                {count}
              </div>
            )}
          </div>

          <div className="pt-8">
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="text-slate-600 hover:text-slate-800 border-slate-300 hover:border-slate-400"
            >
              Voltar ao Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}