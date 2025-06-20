import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Heart, 
  Star, 
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Lightbulb
} from "lucide-react";

export default function JourneyProgress() {
  const journeyStages = [
    {
      id: 1,
      title: "Despertar Interior",
      description: "Reconheça que há mais na vida do que a rotina atual",
      progress: 100,
      status: "completed",
      insights: [
        "Identificou padrões limitantes de pensamento",
        "Questionou crenças herdadas da família",
        "Reconheceu a diferença entre sucesso e realização"
      ],
      timeSpent: "3 semanas"
    },
    {
      id: 2,
      title: "Autoconhecimento Profundo",
      description: "Descubra seus valores, forças e paixões fundamentais",
      progress: 100,
      status: "completed",
      insights: [
        "Definiu 5 valores centrais: autenticidade, impacto, crescimento, liberdade, conexão",
        "Identificou talentos naturais em tecnologia e ensino",
        "Descobriu paixão por democratizar educação"
      ],
      timeSpent: "4 semanas"
    },
    {
      id: 3,
      title: "Relacionamentos Significativos",
      description: "Construa conexões mais profundas e autênticas",
      progress: 78,
      status: "in_progress",
      insights: [
        "Melhorou comunicação com família (especialmente pai)",
        "Criou círculo de amigos alinhados com valores",
        "Aprendeu a estabelecer limites saudáveis"
      ],
      currentChallenge: "Conversa profunda com pai sobre sonhos e apoio",
      timeSpent: "3 semanas"
    },
    {
      id: 4,
      title: "Missão e Contribuição",
      description: "Encontre como impactar positivamente o mundo",
      progress: 45,
      status: "in_progress",
      insights: [
        "Definiu missão: democratizar educação via tecnologia",
        "Identificou problema real: 50M brasileiros sem educação de qualidade",
        "Começou prototipagem da solução educacional"
      ],
      currentChallenge: "Validar solução com 100 pessoas do público-alvo",
      timeSpent: "2 semanas"
    },
    {
      id: 5,
      title: "Plano de Ação",
      description: "Crie um roadmap concreto para viver seu propósito",
      progress: 25,
      status: "starting",
      insights: [
        "Esboçou cronograma de 24 meses",
        "Identificou recursos necessários",
        "Definiu primeiros passos concretos"
      ],
      currentChallenge: "Estruturar modelo de negócio sustentável",
      timeSpent: "1 semana"
    },
    {
      id: 6,
      title: "Vida com Propósito",
      description: "Integre seu propósito no dia a dia e inspire outros",
      progress: 0,
      status: "locked",
      insights: [],
      timeSpent: "Em breve"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'starting': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'locked': return 'bg-gray-100 text-gray-500 border-gray-300';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Target;
      case 'starting': return Clock;
      case 'locked': return Clock;
      default: return Clock;
    }
  };

  const overallProgress = journeyStages.reduce((acc, stage) => acc + stage.progress, 0) / journeyStages.length;

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Compass className="w-5 h-5 mr-2 text-purple-600" />
            Jornada de Descoberta
          </CardTitle>
          <Badge className="bg-purple-100 text-purple-700">
            {Math.round(overallProgress)}% concluído
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
              <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-xs text-gray-500">
              Você está na fase de {journeyStages.find(s => s.status === 'in_progress')?.title || 'preparação'}
            </p>
          </div>

          {/* Journey Stages */}
          <div className="space-y-4">
            {journeyStages.map((stage, index) => {
              const StatusIcon = getStatusIcon(stage.status);
              
              return (
                <div key={stage.id} className={`p-4 rounded-lg border-2 ${getStatusColor(stage.status)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center">
                        <StatusIcon className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{stage.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium">{stage.progress}%</span>
                          <Badge variant="secondary" className="text-xs">
                            {stage.timeSpent}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                      
                      {stage.progress > 0 && (
                        <Progress value={stage.progress} className="h-2 mb-3" />
                      )}
                      
                      {stage.insights.length > 0 && (
                        <div className="space-y-2">
                          <h6 className="text-xs font-medium text-gray-700 flex items-center">
                            <Lightbulb className="w-3 h-3 mr-1" />
                            Insights Descobertos:
                          </h6>
                          <ul className="space-y-1">
                            {stage.insights.map((insight, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {stage.currentChallenge && (
                        <div className="mt-3 p-2 bg-white/50 rounded text-xs">
                          <strong>Desafio Atual:</strong> {stage.currentChallenge}
                        </div>
                      )}
                      
                      {stage.status === 'in_progress' && (
                        <Button size="sm" className="mt-3 text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          Continuar Etapa
                        </Button>
                      )}
                      
                      {stage.status === 'starting' && (
                        <Button size="sm" variant="outline" className="mt-3 text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Iniciar Fase
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-800 mb-2">Próximos Passos Recomendados</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Finalizar conversa profunda com pai (Meta: até domingo)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Validar solução educacional com 10 pessoas esta semana</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Escrever reflexão diária sobre aprendizados</span>
              </div>
            </div>
          </div>

          {/* Inspiration Quote */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm italic text-gray-600">
              "O propósito da vida não é ser feliz. É ser útil, ser honorável, ser compassivo, 
              fazer alguma diferença ao ter vivido e vivido bem."
            </p>
            <p className="text-xs text-gray-500 mt-1">— Ralph Waldo Emerson</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}