import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { trackOnboarding } from '@/lib/analytics';
import { Sparkles, ArrowRight, CheckCircle, Zap, MessageCircle } from 'lucide-react';
import { WelcomeAvatar } from '@/components/avatars/video-avatar';
import shamanAvatar from '@assets/Captura de tela 2025-10-21 212327_1761092690319.png';
import shamanVideo from '@assets/xama força vive em vc_1761096457901.mp4';

interface MegaQuestion {
  id: number;
  question: string;
  dimension: 'fisico' | 'energetico' | 'mental' | 'espiritual';
  placeholder: string;
}

const MEGA_QUESTIONS: MegaQuestion[] = [
  {
    id: 1,
    question: "Como você se sente fisicamente hoje? Seu corpo está pedindo algo?",
    dimension: "fisico",
    placeholder: "Exemplo: Estou com energia, mas sinto tensão nos ombros..."
  },
  {
    id: 2,
    question: "O que te dá energia verdadeira? O que drena sua vitalidade?",
    dimension: "energetico",
    placeholder: "Exemplo: Me sinto energizado quando estou na natureza..."
  },
  {
    id: 3,
    question: "Qual pensamento tem ocupado sua mente recentemente?",
    dimension: "mental",
    placeholder: "Exemplo: Tenho pensado muito sobre meu propósito..."
  },
  {
    id: 4,
    question: "O que traz significado profundo para sua vida neste momento?",
    dimension: "espiritual",
    placeholder: "Exemplo: Sinto que preciso me conectar mais comigo mesmo..."
  }
];

interface MegaOnboardingProps {
  onComplete: () => void;
}

type OnboardingMode = 'express' | 'reflexivo' | null;

export function MegaOnboarding({ onComplete }: MegaOnboardingProps) {
  const [mode, setMode] = useState<OnboardingMode>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Express mode state
  const [expressScores, setExpressScores] = useState({
    fisico: 5,
    energetico: 5,
    mental: 5,
    espiritual: 5,
  });

  useEffect(() => {
    trackOnboarding('start', { totalQuestions: MEGA_QUESTIONS.length });
  }, []);

  const currentQuestion = MEGA_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / MEGA_QUESTIONS.length) * 100;
  const isLastQuestion = currentIndex === MEGA_QUESTIONS.length - 1;

  const handleExpressComplete = async () => {
    setIsCompleting(true);
    trackOnboarding('complete_express', { 
      mode: 'express',
      scores: expressScores
    });
    
    // Save FEME checkin to backend
    try {
      await fetch('/api/feme/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fisico: expressScores.fisico,
          energetico: expressScores.energetico,
          mental: expressScores.mental,
          espiritual: expressScores.espiritual,
          coerencia: 0.7, // Initial coherence estimate
          intention: 'Onboarding inicial - Modo Express',
          meta: { mode: 'express', source: 'mega_onboarding' },
        }),
      });
    } catch (error) {
      console.error('Error saving FEME checkin:', error);
    }
    
    setTimeout(() => {
      localStorage.setItem('mega_onboarding_completed', 'true');
      localStorage.setItem('mega_mode', 'express');
      localStorage.setItem('mega_scores', JSON.stringify(expressScores));
      onComplete();
    }, 2000);
  };

  const handleNext = () => {
    if (currentAnswer.trim().length < 10) {
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: currentAnswer
    };
    setAnswers(updatedAnswers);

    trackOnboarding(`question_${currentQuestion.id}_answered`, {
      dimension: currentQuestion.dimension,
      answerLength: currentAnswer.length
    });

    if (isLastQuestion) {
      setIsCompleting(true);
      setTimeout(() => {
        trackOnboarding('complete', { 
          totalAnswers: MEGA_QUESTIONS.length,
          totalChars: Object.values(updatedAnswers).reduce((sum, a) => sum + a.length, 0)
        });
        localStorage.setItem('mega_onboarding_completed', 'true');
        localStorage.setItem('mega_mode', 'reflexivo');
        localStorage.setItem('mega_answers', JSON.stringify(updatedAnswers));
        onComplete();
      }, 2000);
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
    }
  };

  // Mode selection screen
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <Card className="max-w-4xl w-full border-2 border-purple-300 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Sparkles className="w-8 h-8" />
              Bem-vindo ao Mega - Avaliação Funcional
            </CardTitle>
            <p className="text-white/90 mt-2">Escolha como prefere começar sua jornada</p>
          </CardHeader>
          <CardContent className="p-8">
            {/* Avatar de Boas-vindas - Xamã com vídeo */}
            <div className="flex flex-col items-center mb-8">
              <WelcomeAvatar 
                videoUrl={shamanVideo}
                fallbackImage={shamanAvatar}
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-purple-900">🔥 A força vive em você</p>
                <p className="text-sm text-gray-600 max-w-md">
                  Clique no vídeo para ouvir a mensagem do seu guia xamânico
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Express Mode */}
              <div 
                onClick={() => {
                  setMode('express');
                  trackOnboarding('mode_selected', { mode: 'express' });
                }}
                className="group cursor-pointer border-2 border-purple-300 rounded-xl p-6 hover:border-purple-500 hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-blue-50"
                data-testid="button-mode-express"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">Modo Express</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Avaliação rápida com sliders numéricos de 0 a 10 para cada dimensão FEME.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>⚡ Apenas 2 minutos</li>
                  <li>🎯 Resultado visual imediato</li>
                  <li>📊 Ideal para check-ins diários</li>
                </ul>
              </div>

              {/* Reflexivo Mode */}
              <div 
                onClick={() => {
                  setMode('reflexivo');
                  trackOnboarding('mode_selected', { mode: 'reflexivo' });
                }}
                className="group cursor-pointer border-2 border-blue-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-indigo-50"
                data-testid="button-mode-reflexivo"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">Modo Reflexivo</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Jornada profunda com perguntas abertas para autoconhecimento.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>🌟 Exploração profunda</li>
                  <li>💭 Respostas escritas livres</li>
                  <li>🎭 Ideal para primeira avaliação</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full border-2 border-purple-300 shadow-2xl">
          <CardContent className="p-12 text-center space-y-6">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-purple-900">
              Revelando sua Bússola Interior...
            </h2>
            <p className="text-lg text-gray-600">
              Suas respostas estão sendo integradas às quatro dimensões FEME.
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Express Mode UI
  if (mode === 'express') {
    const dimensionLabels = {
      fisico: { label: 'Físico', color: 'from-red-500 to-orange-500', description: 'Como está seu corpo hoje?' },
      energetico: { label: 'Energético', color: 'from-yellow-500 to-amber-500', description: 'Qual seu nível de vitalidade?' },
      mental: { label: 'Mental', color: 'from-blue-500 to-cyan-500', description: 'Como está sua mente?' },
      espiritual: { label: 'Espiritual', color: 'from-purple-500 to-violet-500', description: 'Como está sua conexão interior?' },
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <Card className="max-w-3xl w-full border-2 border-purple-300 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="w-6 h-6" />
              Mega Express - Avaliação Rápida
            </CardTitle>
            <p className="text-white/90 mt-2">Avalie cada dimensão de 0 a 10</p>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {(Object.keys(expressScores) as Array<keyof typeof expressScores>).map((dimension) => {
              const config = dimensionLabels[dimension];
              return (
                <div key={dimension} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 capitalize">{config.label}</h3>
                      <p className="text-sm text-gray-600">{config.description}</p>
                    </div>
                    <Badge className={`bg-gradient-to-r ${config.color} text-white text-xl px-4 py-2`}>
                      {expressScores[dimension]}
                    </Badge>
                  </div>
                  <Slider
                    value={[expressScores[dimension]]}
                    onValueChange={(value) => {
                      setExpressScores(prev => ({ ...prev, [dimension]: value[0] }));
                    }}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                    data-testid={`slider-${dimension}`}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 - Muito Baixo</span>
                    <span>5 - Médio</span>
                    <span>10 - Excelente</span>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setMode(null)}
                data-testid="button-change-mode"
              >
                Trocar Modo
              </Button>
              <Button
                onClick={handleExpressComplete}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
                data-testid="button-complete-express"
              >
                Finalizar e Ver Bússola
                <CheckCircle className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full border-2 border-purple-300 shadow-2xl" data-testid="card-mega-onboarding">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6" />
              Mega - Avaliação Funcional
            </CardTitle>
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              {currentIndex + 1} de {MEGA_QUESTIONS.length}
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-3 bg-white/20" />
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
            <Badge className="mb-3 capitalize" variant="outline">
              Dimensão: {currentQuestion.dimension}
            </Badge>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-gray-600">
              Não há resposta certa ou errada. Seja honesto(a) consigo mesmo(a).
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Sua resposta:
            </label>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="min-h-[180px] text-lg resize-none"
              autoFocus
              data-testid={`textarea-question-${currentQuestion.id}`}
            />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{currentAnswer.length} caracteres</span>
              {currentAnswer.length < 10 && (
                <span className="text-amber-600">Escreva pelo menos 10 caracteres</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-600">
              {currentIndex > 0 && (
                <span>✓ {currentIndex} {currentIndex === 1 ? 'resposta' : 'respostas'} completadas</span>
              )}
            </div>
            <Button
              onClick={handleNext}
              disabled={currentAnswer.trim().length < 10}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
              data-testid="button-next-question"
            >
              {isLastQuestion ? (
                <>
                  Finalizar e Ver Bússola
                  <CheckCircle className="ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  Próxima Pergunta
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook para verificar se onboarding foi completado
export function useMegaOnboarding() {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem('mega_onboarding_completed') === 'true';
    setIsCompleted(completed);
  }, []);

  const markCompleted = () => {
    localStorage.setItem('mega_onboarding_completed', 'true');
    setIsCompleted(true);
  };

  const reset = () => {
    localStorage.removeItem('mega_onboarding_completed');
    localStorage.removeItem('mega_answers');
    setIsCompleted(false);
  };

  return { isCompleted, markCompleted, reset };
}
