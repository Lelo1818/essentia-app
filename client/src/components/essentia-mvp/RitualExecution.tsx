import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Target,
  Zap,
  Heart,
  Clock,
  ArrowRight
} from 'lucide-react';

interface RitualExecutionProps {
  portalId: string;
  onComplete: (portalId: string) => void;
}

interface RitualStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  duration: number; // em segundos
  type: 'reflection' | 'breathing' | 'movement' | 'visualization' | 'intention';
}

const ritualsData: Record<string, { name: string; icon: any; steps: RitualStep[] }> = {
  proposito: {
    name: 'Ritual do Propósito',
    icon: Target,
    steps: [
      {
        id: 'p1',
        title: 'Centramento Inicial',
        description: 'Conecte-se com o momento presente',
        instruction: 'Respire profundamente 3 vezes. Sinta seu corpo na cadeira. Permita-se estar completamente presente neste momento.',
        duration: 60,
        type: 'breathing'
      },
      {
        id: 'p2',
        title: 'Reflexão sobre Valores',
        description: 'Explore seus valores mais profundos',
        instruction: 'Pense em 3 momentos da sua vida onde você se sentiu mais realizado. O que esses momentos têm em comum? Que valores estavam sendo honrados?',
        duration: 180,
        type: 'reflection'
      },
      {
        id: 'p3',
        title: 'Visualização do Futuro',
        description: 'Vislumbre sua vida ideal',
        instruction: 'Imagine-se daqui a 5 anos vivendo plenamente seu propósito. Como você se sente? O que está fazendo? Como está impactando o mundo?',
        duration: 120,
        type: 'visualization'
      },
      {
        id: 'p4',
        title: 'Intenção e Ação',
        description: 'Defina passos práticos',
        instruction: 'Escolha 3 ações específicas que você pode tomar esta semana para se aproximar mais da vida que visualizou. Seja específico e realista.',
        duration: 120,
        type: 'intention'
      }
    ]
  },
  vitalidade: {
    name: 'Ritual da Vitalidade',
    icon: Zap,
    steps: [
      {
        id: 'v1',
        title: 'Ativação Corporal',
        description: 'Desperte a energia do seu corpo',
        instruction: 'Alongue-se suavemente. Mova os ombros, o pescoço, as mãos. Sinta a vida pulsando em cada parte do seu corpo.',
        duration: 90,
        type: 'movement'
      },
      {
        id: 'v2',
        title: 'Respiração Energizante',
        description: 'Use a respiração para gerar vitalidade',
        instruction: 'Inspire profundamente pelo nariz (4 tempos), segure (4 tempos), expire pela boca (4 tempos). Repita 10 vezes sentindo energia entrando no seu corpo.',
        duration: 120,
        type: 'breathing'
      },
      {
        id: 'v3',
        title: 'Visualização Solar',
        description: 'Conecte-se com a energia vital universal',
        instruction: 'Visualize um sol dourado no centro do seu peito. A cada respiração, ele brilha mais forte, irradiando energia para todo seu corpo.',
        duration: 90,
        type: 'visualization'
      },
      {
        id: 'v4',
        title: 'Compromisso com a Vitalidade',
        description: 'Estabeleça intenções energéticas',
        instruction: 'Comprometa-se com uma ação hoje que nutrirá sua vitalidade: uma caminhada, um alimento nutritivo, um momento de descanso.',
        duration: 60,
        type: 'intention'
      }
    ]
  },
  harmonia: {
    name: 'Ritual da Harmonia',
    icon: Heart,
    steps: [
      {
        id: 'h1',
        title: 'Centramento Cardíaco',
        description: 'Conecte-se com seu coração',
        instruction: 'Coloque a mão no coração. Respire direcionando a atenção para esta região. Sinta o ritmo e a presença do seu coração.',
        duration: 90,
        type: 'breathing'
      },
      {
        id: 'h2',
        title: 'Meditação da Coerência',
        description: 'Alinhamento entre mente e coração',
        instruction: 'Inspire amor e gratidão pelo coração, expire paz e harmonia. Permita que mente e coração encontrem o mesmo ritmo.',
        duration: 150,
        type: 'breathing'
      },
      {
        id: 'h3',
        title: 'Prática de Gratidão',
        description: 'Cultive apreciação sincera',
        instruction: 'Traga à mente 3 coisas pelas quais você é genuinamente grato hoje. Sinta a gratidão expandindo no seu peito.',
        duration: 90,
        type: 'reflection'
      },
      {
        id: 'h4',
        title: 'Intenção de Harmonia',
        description: 'Estabeleça paz interior',
        instruction: 'Defina uma intenção de como você quer se relacionar consigo mesmo e com os outros hoje. Comprometa-se com essa harmonia.',
        duration: 90,
        type: 'intention'
      }
    ]
  }
};

export const RitualExecution = ({ portalId, onComplete }: RitualExecutionProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const ritual = ritualsData[portalId];
  const currentStep = ritual?.steps[currentStepIndex];
  const totalSteps = ritual?.steps.length || 0;

  useEffect(() => {
    if (currentStep) {
      setTimeRemaining(currentStep.duration);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!isPlaying || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setIsPlaying(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete(portalId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'breathing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reflection': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'movement': return 'bg-green-100 text-green-700 border-green-200';
      case 'visualization': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'intention': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!ritual) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <p>Ritual não encontrado.</p>
        </CardContent>
      </Card>
    );
  }

  if (isCompleted) {
    const IconComponent = ritual.icon;
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-800">
            Ritual Completado! 
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Parabéns por dedicar este tempo ao seu crescimento pessoal.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
            <IconComponent className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              {ritual.name}
            </h3>
            <p className="text-green-700 text-sm">
              Você completou todas as {totalSteps} etapas deste ritual. 
              Sua tríade essencial foi fortalecida.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">O que acontece agora:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Seus pontos na tríade essencial foram atualizados</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Seu progresso foi registrado no dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Novas recomendações serão geradas baseadas no seu crescimento</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            size="lg"
          >
            Voltar ao Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Etapa {currentStepIndex + 1} de {totalSteps}
          </div>
          <Progress value={((currentStepIndex + 1) / totalSteps) * 100} className="w-32" />
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <ritual.icon className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-xl">
            {currentStep?.title}
          </CardTitle>
          <p className="text-gray-600 mt-1 text-sm">
            {currentStep?.description}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timer e Status */}
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {formatTime(timeRemaining)}
          </div>
          <Badge className={getStepTypeColor(currentStep?.type || '')}>
            {currentStep?.type}
          </Badge>
        </div>

        {/* Instrução */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <p className="text-purple-800 leading-relaxed">
            {currentStep?.instruction}
          </p>
        </div>

        {/* Controles */}
        <div className="flex justify-center space-x-4">
          {!isPlaying ? (
            <Button 
              onClick={handlePlay}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              {timeRemaining === (currentStep?.duration || 0) ? 'Iniciar' : 'Continuar'}
            </Button>
          ) : (
            <Button 
              onClick={handlePause}
              variant="outline"
              size="lg"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
          )}
          
          <Button 
            onClick={handleNext}
            variant="outline"
            size="lg"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            {currentStepIndex === totalSteps - 1 ? 'Finalizar' : 'Próxima'}
          </Button>
        </div>

        {/* Indicador de Progresso das Etapas */}
        <div className="flex justify-center space-x-2">
          {ritual.steps.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentStepIndex 
                  ? 'bg-green-500' 
                  : index === currentStepIndex 
                    ? 'bg-purple-500' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};