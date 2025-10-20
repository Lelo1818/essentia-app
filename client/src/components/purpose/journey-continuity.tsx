import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  Clock, 
  Star, 
  Target, 
  Heart,
  BookOpen,
  Lightbulb,
  Mountain,
  CheckCircle
} from 'lucide-react';
import BreathingRitual from './activities/BreathingRitual';
import GuidedReflection from './activities/GuidedReflection';
import CaptureInsight from './activities/CaptureInsight';
import LifelineExercise from './activities/LifelineExercise';
import ValuesAssessment from './activities/ValuesAssessment';

interface JourneyContinuityProps {
  userId: number;
  currentPhase: string;
  progress: number;
}

export default function JourneyContinuity({ userId, currentPhase, progress }: JourneyContinuityProps) {
  const [nextActions, setNextActions] = useState<any[]>([]);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [activeActivity, setActiveActivity] = useState<{type: string; id: number} | null>(null);

  const journeyPhases = {
    "awakening": {
      name: "Despertar Interior",
      description: "Tomando consciência de sua jornada",
      color: "from-purple-500 to-pink-500",
      icon: Star,
      nextPhase: "exploration"
    },
    "exploration": {
      name: "Exploração Profunda", 
      description: "Descobrindo suas verdades internas",
      color: "from-blue-500 to-indigo-500",
      icon: BookOpen,
      nextPhase: "clarity"
    },
    "clarity": {
      name: "Clareza de Propósito",
      description: "Definindo sua missão de vida",
      color: "from-green-500 to-emerald-500", 
      icon: Lightbulb,
      nextPhase: "integration"
    },
    "integration": {
      name: "Integração e Ação",
      description: "Vivendo seu propósito diariamente",
      color: "from-orange-500 to-red-500",
      icon: Mountain,
      nextPhase: "mastery"
    },
    "mastery": {
      name: "Maestria Espiritual",
      description: "Guiando outros em suas jornadas",
      color: "from-yellow-500 to-orange-500",
      icon: Target,
      nextPhase: "mastery"
    }
  };

  const generateNextActions = () => {
    const phase = journeyPhases[currentPhase as keyof typeof journeyPhases];
    const baseActions = [
      {
        id: 1,
        type: "ritual",
        title: "Ritual Matinal de Conexão",
        description: "5 minutos de respiração consciente",
        duration: "5 min",
        points: 10,
        icon: Heart,
        urgent: true
      },
      {
        id: 2, 
        type: "reflection",
        title: "Reflexão Guiada",
        description: `Pergunta do dia sobre ${phase?.name.toLowerCase()}`,
        duration: "10 min",
        points: 20,
        icon: Lightbulb,
        urgent: false
      },
      {
        id: 3,
        type: "insight",
        title: "Capturar Insight",
        description: "Registre uma descoberta pessoal",
        duration: "3 min", 
        points: 15,
        icon: Star,
        urgent: false
      }
    ];

    // Adicionar ações específicas por fase
    if (currentPhase === "awakening") {
      baseActions.push({
        id: 4,
        type: "assessment",
        title: "Autoavaliação de Valores",
        description: "Identifique seus 5 valores fundamentais",
        duration: "15 min",
        points: 30,
        icon: Target,
        urgent: true
      });
    } else if (currentPhase === "exploration") {
      baseActions.push({
        id: 4,
        type: "exercise",
        title: "Exercício da Linha da Vida", 
        description: "Mapeie momentos transformadores",
        duration: "20 min",
        points: 40,
        icon: BookOpen,
        urgent: false
      });
    }

    setNextActions(baseActions);
  };

  useEffect(() => {
    generateNextActions();
  }, [currentPhase]);

  const currentPhaseData = journeyPhases[currentPhase as keyof typeof journeyPhases];
  const CurrentIcon = currentPhaseData?.icon || Star;

  const handleStartActivity = (action: any) => {
    setActiveActivity({ type: action.type, id: action.id });
  };

  const handleActivityComplete = () => {
    if (activeActivity) {
      setNextActions(prev => 
        prev.map(action => 
          action.id === activeActivity.id 
            ? { ...action, completed: true }
            : action
        )
      );
      setActiveActivity(null);
    }
  };

  const handleCloseActivity = () => {
    setActiveActivity(null);
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Sua jornada de autoconhecimento continua...",
      "Cada pequeno passo é uma grande vitória",
      "Você está mais próximo de seu propósito",
      "Sua evolução inspira outros ao redor",
      "O crescimento acontece fora da zona de conforto"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="space-y-6">
      {/* Header de Continuidade */}
      <Card className={`bg-gradient-to-r ${currentPhaseData?.color} text-white`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CurrentIcon className="w-8 h-8" />
              <div>
                <CardTitle className="text-xl">
                  {getTimeBasedGreeting()}! Continue sua jornada
                </CardTitle>
                <p className="text-sm opacity-90">
                  {getMotivationalMessage()}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-white border-white">
              {dailyStreak} dias seguidos
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Progresso da Fase Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CurrentIcon className="w-5 h-5 mr-2" />
            {currentPhaseData?.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {currentPhaseData?.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progresso na fase</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {100 - progress}% restante para avançar para a próxima fase
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Próximas Ações Sugeridas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Suas Próximas Ações
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Atividades personalizadas para seu momento atual
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <div
                  key={action.id}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    action.completed 
                      ? 'bg-green-50 border-green-200' 
                      : action.urgent 
                        ? 'bg-orange-50 border-orange-200' 
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ActionIcon className={`w-5 h-5 ${
                        action.completed ? 'text-green-600' : 
                        action.urgent ? 'text-orange-600' : 'text-blue-600'
                      }`} />
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            ⏱️ {action.duration}
                          </span>
                          <span className="text-xs text-blue-600">
                            +{action.points} pontos
                          </span>
                          {action.urgent && (
                            <Badge variant="outline" className="text-xs">
                              Urgente
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {action.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleStartActivity(action)}
                        className="min-w-[80px]"
                        data-testid={`button-start-${action.type}-${action.id}`}
                      >
                        <ChevronRight className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Preview da Próxima Fase */}
      {currentPhaseData?.nextPhase && currentPhaseData.nextPhase !== currentPhase && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Mountain className="w-5 h-5 mr-2" />
              Próxima Fase: {journeyPhases[currentPhaseData.nextPhase as keyof typeof journeyPhases]?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {journeyPhases[currentPhaseData.nextPhase as keyof typeof journeyPhases]?.description}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <Target className="w-4 h-4 mr-1" />
              Desbloqueada em {100 - progress}% de progresso
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Dialogs */}
      <BreathingRitual
        open={activeActivity?.type === 'ritual'}
        onClose={handleCloseActivity}
        onComplete={handleActivityComplete}
      />
      <GuidedReflection
        open={activeActivity?.type === 'reflection'}
        onClose={handleCloseActivity}
        onComplete={handleActivityComplete}
        phase={currentPhase}
      />
      <CaptureInsight
        open={activeActivity?.type === 'insight'}
        onClose={handleCloseActivity}
        onComplete={handleActivityComplete}
      />
      <LifelineExercise
        open={activeActivity?.type === 'exercise'}
        onClose={handleCloseActivity}
        onComplete={handleActivityComplete}
      />
      <ValuesAssessment
        open={activeActivity?.type === 'assessment'}
        onClose={handleCloseActivity}
        onComplete={handleActivityComplete}
      />
    </div>
  );
}