import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Compass, 
  Navigation,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Lightbulb,
  Sparkles,
  Book,
  Play
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface ContextualGuidanceProps {
  triadScores: TriadScores;
  currentStep: 'onboarding' | 'checkin' | 'portal' | 'ritual' | 'dashboard';
  streak: number;
  totalRitualsCompleted: number;
  onActionRequest?: (action: string) => void;
}

interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  estimatedTime: string;
  isCompleted: boolean;
  isActive: boolean;
  icon: any;
  color: string;
}

interface ContextualMessage {
  id: string;
  type: 'orientacao' | 'motivacao' | 'insight' | 'proximos-passos';
  title: string;
  content: string;
  actionable?: {
    label: string;
    action: string;
  };
}

export const ContextualGuidance = ({ 
  triadScores, 
  currentStep, 
  streak, 
  totalRitualsCompleted,
  onActionRequest 
}: ContextualGuidanceProps) => {
  const [guidanceSteps, setGuidanceSteps] = useState<GuidanceStep[]>([]);
  const [contextualMessage, setContextualMessage] = useState<ContextualMessage | null>(null);

  // Definir jornada de steps baseada no progresso
  const generateGuidanceSteps = (): GuidanceStep[] => {
    const steps: GuidanceStep[] = [
      {
        id: 'onboarding',
        title: 'Conhecer sua Tríade',
        description: 'Mapeamento inicial dos seus níveis de consciência, energia e coerência',
        instruction: 'Complete as 6 perguntas de avaliação pessoal',
        estimatedTime: '5-8 min',
        isCompleted: currentStep !== 'onboarding',
        isActive: currentStep === 'onboarding',
        icon: MapPin,
        color: 'text-purple-600'
      },
      {
        id: 'checkin',
        title: 'Check-in Diário',
        description: 'Avaliação do seu estado emocional e energético atual',
        instruction: 'Registre como você está se sentindo hoje',
        estimatedTime: '2-3 min',
        isCompleted: ['portal', 'ritual', 'dashboard'].includes(currentStep),
        isActive: currentStep === 'checkin',
        icon: CheckCircle,
        color: 'text-blue-600'
      },
      {
        id: 'portal',
        title: 'Portal Recomendado',
        description: 'Receba recomendação personalizada baseada na sua tríade',
        instruction: 'Aceite ou solicite novo portal personalizado',
        estimatedTime: '1-2 min',
        isCompleted: ['ritual', 'dashboard'].includes(currentStep),
        isActive: currentStep === 'portal',
        icon: Target,
        color: 'text-green-600'
      },
      {
        id: 'ritual',
        title: 'Prática Ritual',
        description: 'Execute o ritual completo com 4 etapas guiadas',
        instruction: 'Complete todas as etapas com presença e intenção',
        estimatedTime: '15-20 min',
        isCompleted: currentStep === 'dashboard',
        isActive: currentStep === 'ritual',
        icon: Play,
        color: 'text-orange-600'
      },
      {
        id: 'dashboard',
        title: 'Integração',
        description: 'Veja seu progresso e planeje próximos passos',
        instruction: 'Explore insights, conquistas e recomendações',
        estimatedTime: 'Livre',
        isCompleted: false,
        isActive: currentStep === 'dashboard',
        icon: Compass,
        color: 'text-indigo-600'
      }
    ];

    return steps;
  };

  // Gerar mensagem contextual baseada no estado atual
  const generateContextualMessage = (): ContextualMessage => {
    const totalScore = Math.round((triadScores.consciencia + triadScores.energia + triadScores.coerencia) / 3);
    
    switch (currentStep) {
      case 'onboarding':
        return {
          id: 'onboarding-guidance',
          type: 'orientacao',
          title: 'Bem-vindo à sua Jornada Essencial',
          content: 'Você está prestes a descobrir seus níveis atuais na Tríade Essencial. Responda com honestidade - não existem respostas certas ou erradas, apenas seu estado atual de consciência.'
        };

      case 'checkin':
        if (streak === 0) {
          return {
            id: 'primeiro-checkin',
            type: 'motivacao',
            title: 'Seu Primeiro Check-in',
            content: 'Parabéns por iniciar esta jornada! O check-in diário é fundamental para acompanhar seus padrões emocionais e energéticos. Esta informação guiará suas práticas.',
          };
        } else {
          return {
            id: 'checkin-continuo',
            type: 'insight',
            title: `Check-in - Dia ${streak + 1}`,
            content: `Você está construindo um hábito poderoso! ${streak} dias de prática mostram seu comprometimento. Como você se sente hoje comparado a ontem?`
          };
        }

      case 'portal':
        const lowestScore = Math.min(triadScores.consciencia, triadScores.energia, triadScores.coerencia);
        const lowestArea = triadScores.consciencia === lowestScore ? 'Consciência' : 
                          triadScores.energia === lowestScore ? 'Energia' : 'Coerência';
        
        return {
          id: 'portal-guidance',
          type: 'orientacao',
          title: 'Portal Personalizado',
          content: `Baseado na sua tríade, recomendamos foco em ${lowestArea} (${lowestScore}%). O algoritmo identifica onde você mais se beneficiaria de atenção agora.`,
          actionable: {
            label: 'Entendi, vamos lá!',
            action: 'accept-portal'
          }
        };

      case 'ritual':
        return {
          id: 'ritual-guidance',
          type: 'orientacao',
          title: 'Momento Sagrado de Prática',
          content: 'Você está entrando em um espaço sagrado de desenvolvimento pessoal. Desligue distrações, respire profundamente e permita-se estar totalmente presente.',
          actionable: {
            label: 'Estou pronto',
            action: 'start-ritual'
          }
        };

      case 'dashboard':
        if (totalRitualsCompleted === 1) {
          return {
            id: 'primeiro-ritual-completo',
            type: 'motivacao',
            title: 'Primeiro Ritual Completado! 🎉',
            content: 'Parabéns! Você acaba de dar o primeiro passo real em sua jornada de crescimento. Cada ritual fortalece sua tríade. Como você se sente após esta prática?'
          };
        } else if (totalRitualsCompleted >= 5) {
          return {
            id: 'progresso-significativo',
            type: 'insight',
            title: 'Progresso Consistente',
            content: `${totalRitualsCompleted} rituais completados mostram dedicação real. Você está criando novos padrões neurais e expandindo sua capacidade de crescimento.`,
            actionable: {
              label: 'Continuar crescendo',
              action: 'new-portal'
            }
          };
        } else {
          return {
            id: 'dashboard-exploration',
            type: 'proximos-passos',
            title: 'Explore seus Insights',
            content: `Com ${totalScore}% na tríade geral, você tem uma base sólida. Explore seus insights pessoais e recomendações inteligentes para continuar evoluindo.`,
            actionable: {
              label: 'Novo portal',
              action: 'new-portal'
            }
          };
        }

      default:
        return {
          id: 'default-guidance',
          type: 'orientacao',
          title: 'Sua Jornada Continua',
          content: 'Cada momento de presença consciente é um passo em direção à versão mais autêntica de você mesmo.'
        };
    }
  };

  useEffect(() => {
    const steps = generateGuidanceSteps();
    setGuidanceSteps(steps);
    
    const message = generateContextualMessage();
    setContextualMessage(message);
  }, [currentStep, triadScores, streak, totalRitualsCompleted]);

  const handleActionClick = (action: string) => {
    if (onActionRequest) {
      onActionRequest(action);
    }
  };

  const getStepProgress = () => {
    const completedSteps = guidanceSteps.filter(step => step.isCompleted).length;
    return (completedSteps / guidanceSteps.length) * 100;
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-indigo-600" />
          Orientação Contextual
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Sua jornada passo a passo</p>
          <Badge variant="outline" className="bg-white text-indigo-600 border-indigo-300">
            {guidanceSteps.filter(s => s.isCompleted).length}/{guidanceSteps.length} etapas
          </Badge>
        </div>
        <Progress value={getStepProgress()} className="h-2 mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mensagem Contextual */}
        {contextualMessage && (
          <Card className="bg-white border-2 border-indigo-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-indigo-800 mb-1">
                    {contextualMessage.title}
                  </h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    {contextualMessage.content}
                  </p>
                  {contextualMessage.actionable && (
                    <Button
                      onClick={() => handleActionClick(contextualMessage.actionable!.action)}
                      size="sm"
                      className="mt-3 bg-indigo-600 hover:bg-indigo-700"
                    >
                      {contextualMessage.actionable.label}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Steps da Jornada */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Book className="w-4 h-4 mr-2" />
            Fluxo da Sessão
          </h4>
          
          {guidanceSteps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  step.isActive 
                    ? 'bg-white border-2 border-indigo-300 shadow-md' 
                    : step.isCompleted 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  step.isActive 
                    ? 'bg-indigo-100' 
                    : step.isCompleted 
                      ? 'bg-green-100' 
                      : 'bg-gray-100'
                }`}>
                  {step.isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <IconComponent className={`w-4 h-4 ${
                      step.isActive ? 'text-indigo-600' : 'text-gray-500'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className={`font-medium ${
                      step.isActive 
                        ? 'text-indigo-800' 
                        : step.isCompleted 
                          ? 'text-green-800' 
                          : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h5>
                    <div className="flex items-center space-x-2 text-xs">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-500">{step.estimatedTime}</span>
                    </div>
                  </div>
                  <p className={`text-sm mt-1 ${
                    step.isActive 
                      ? 'text-indigo-700' 
                      : step.isCompleted 
                        ? 'text-green-700' 
                        : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                  {step.isActive && (
                    <p className="text-xs text-indigo-600 mt-1 font-medium">
                      → {step.instruction}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 bg-white p-3 rounded-lg">
            🧭 <strong>Guia IA:</strong> Esta orientação adapta-se automaticamente ao seu progresso, 
            oferecendo direcionamento contextual para maximizar sua experiência de crescimento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};