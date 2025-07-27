import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Compass, Trophy, Target, Calendar, Star } from 'lucide-react';
import { journeyStages, achievements } from '../../data/essentia-pro-data';
import { User } from '../../types/essentia';

interface PurposeJourneyProProps {
  user: User;
  onStageClick: (stageId: number) => void;
}

export const PurposeJourneyPro = ({ user, onStageClick }: PurposeJourneyProProps) => {
  const completedStages = journeyStages.filter(s => s.completed).length;
  const currentStageIndex = journeyStages.findIndex(s => s.current);
  const nextMilestone = journeyStages.find(s => !s.completed && !s.current);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Compass className="w-8 h-8 mr-3 text-purple-600" />
                Jornada de Propósito
              </CardTitle>
              <p className="text-gray-600 mt-1">
                {user.name}, sua clareza cresceu {user.clarity}% em {user.daysActive} dias de jornada
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-purple-600 text-white px-4 py-2 text-lg">
                Estágio {currentStageIndex + 1}/6
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-1">{user.clarity}%</div>
              <div className="text-sm text-gray-600">Clareza de Propósito</div>
              <Progress value={user.clarity} className="h-2 mt-2" />
              <div className="text-xs text-gray-500 mt-1">
                {user.clarity < 30 ? 'Despertar Inicial' :
                 user.clarity < 60 ? 'Autoconhecimento' :
                 user.clarity < 80 ? 'Descoberta Ativa' : 'Propósito Claro'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{user.daysActive}</div>
              <div className="text-sm text-gray-600">Dias de Jornada</div>
              <div className="text-xs text-gray-500 mt-1">Consistência</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">{user.achievements}</div>
              <div className="text-sm text-gray-600">Conquistas</div>
              <div className="text-xs text-gray-500 mt-1">Marcos Pessoais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-1">{completedStages}/6</div>
              <div className="text-sm text-gray-600">Estágios Completos</div>
              <div className="text-xs text-gray-500 mt-1">Evolução</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Stage Highlight */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Estágio Atual: {user.currentStage}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Foco Atual</h4>
              <p className="text-gray-600 mb-4">
                {journeyStages[currentStageIndex]?.description}
              </p>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Continuar Estágio
                </Button>
                <Button size="sm" variant="outline">
                  Ver Práticas
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Próximo Marco</h4>
              <p className="text-gray-600 mb-2">
                {nextMilestone?.name || 'Jornada Completa!'}
              </p>
              <div className="text-sm text-gray-500">
                {nextMilestone?.description || 'Você completou todos os estágios principais'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa da Jornada</CardTitle>
          <p className="text-gray-600">Sua evolução através dos estágios de autoconhecimento</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journeyStages.map((stage, index) => (
              <div 
                key={stage.id} 
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                  stage.completed ? 'bg-green-50 border-green-200 hover:bg-green-100' :
                  stage.current ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' :
                  'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => onStageClick(stage.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    stage.completed ? 'bg-green-500' :
                    stage.current ? 'bg-blue-500 animate-pulse' :
                    'bg-gray-300'
                  }`}>
                    {stage.completed ? (
                      <Trophy className="w-6 h-6 text-white" />
                    ) : stage.current ? (
                      <Star className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        stage.current ? 'text-blue-700' : 'text-gray-800'
                      }`}>
                        {stage.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {stage.completed && (
                          <Badge className="bg-green-600 text-white">Completo</Badge>
                        )}
                        {stage.current && (
                          <Badge className="bg-blue-600 text-white animate-pulse">Ativo</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{stage.description}</p>
                    
                    {stage.current && (
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center text-blue-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          Em progresso há {Math.floor(Math.random() * 15) + 5} dias
                        </div>
                        <div className="text-gray-500">
                          {Math.floor(Math.random() * 3) + 2} práticas concluídas
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Connection line to next stage */}
                {index < journeyStages.length - 1 && (
                  <div className={`absolute left-6 -bottom-4 w-0.5 h-8 ${
                    stage.completed ? 'bg-green-300' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
            Conquistas Desbloqueadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked ? 
                    'bg-yellow-50 border-yellow-200' : 
                    'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}>
                    <Trophy className={`w-5 h-5 ${
                      achievement.unlocked ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-yellow-700' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};