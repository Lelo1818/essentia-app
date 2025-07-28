import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Lock, PlayCircle, Star } from 'lucide-react';
import { User } from '../../types/essentia';

interface PurposeJourneyProProps {
  user: User;
  onStageClick: (stageId: number) => void;
}

const journeyStages = [
  {
    id: 1,
    name: "Despertar",
    description: "Reconheça quem você é realmente",
    completed: true,
    current: false,
    color: "from-purple-500 to-pink-500",
    progress: 100
  },
  {
    id: 2,
    name: "Descoberta",
    description: "Explore suas paixões e talentos únicos",
    completed: true,
    current: false,
    color: "from-blue-500 to-cyan-500",
    progress: 100
  },
  {
    id: 3,
    name: "Clareza",
    description: "Defina sua missão de vida",
    completed: false,
    current: true,
    color: "from-green-500 to-emerald-500",
    progress: 67
  },
  {
    id: 4,
    name: "Ação",
    description: "Implemente mudanças reais",
    completed: false,
    current: false,
    color: "from-orange-500 to-red-500",
    progress: 0
  },
  {
    id: 5,
    name: "Integração",
    description: "Viva seu propósito diariamente",
    completed: false,
    current: false,
    color: "from-indigo-500 to-purple-500",
    progress: 0
  },
  {
    id: 6,
    name: "Transcendência",
    description: "Inspire e transforme o mundo",
    completed: false,
    current: false,
    color: "from-pink-500 to-rose-500",
    progress: 0
  }
];

export const PurposeJourneyPro = ({ user, onStageClick }: PurposeJourneyProProps) => {
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sua Jornada de Propósito</CardTitle>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-purple-600">{user.clarity}%</div>
            <div className="text-gray-600">Clareza Total Alcançada</div>
            <div className="w-full bg-gray-200 rounded-full h-3 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${user.clarity}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Journey Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journeyStages.map((stage, index) => (
          <Card 
            key={stage.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              stage.current ? 'border-blue-500 shadow-blue-200' : 
              stage.completed ? 'border-green-500 shadow-green-200' : 
              'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStageClick(stage.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center shadow-lg`}>
                    {stage.completed ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : stage.current ? (
                      <PlayCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{stage.name}</h3>
                    <p className="text-sm text-gray-600">Estágio {stage.id}</p>
                  </div>
                </div>
                {stage.current && (
                  <Badge className="bg-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Atual
                  </Badge>
                )}
                {stage.completed && (
                  <Badge className="bg-green-600 text-white">
                    Completo
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-4">{stage.description}</p>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span className="font-semibold">{stage.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${stage.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${stage.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                size="sm" 
                className={`mt-4 w-full ${
                  stage.completed ? 'bg-green-600 hover:bg-green-700' :
                  stage.current ? `bg-gradient-to-r ${stage.color}` :
                  'bg-gray-400 hover:bg-gray-500'
                }`}
                disabled={!stage.completed && !stage.current}
              >
                {stage.completed ? 'Revisar' : stage.current ? 'Continuar' : 'Bloqueado'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center">Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              Você está no estágio <strong>Clareza</strong>. Continue explorando sua missão de vida
              através das práticas de reflexão e autoconhecimento.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <PlayCircle className="w-4 h-4 mr-2" />
                Práticas de Hoje
              </Button>
              <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                Ver Insights da IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};