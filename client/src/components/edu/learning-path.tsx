import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Play, 
  CheckCircle,
  Clock,
  Target,
  Brain,
  Headphones,
  Video,
  FileText,
  Zap,
  Calendar,
  Trophy
} from "lucide-react";

export default function LearningPath() {
  const [selectedDay, setSelectedDay] = useState(null);

  // Trilha gerada automaticamente baseada no briefing técnico
  const learningPath = {
    title: "Preparação ENEM - Física",
    totalDays: 90,
    currentDay: 23,
    progress: 25.6,
    dailyTime: "2h por dia",
    goalDate: "2025-11-03",
    material: "Apostila Física - 200 páginas",
    difficulty: "Intermediário"
  };

  const weeklyPlan = [
    {
      day: 1,
      date: "20/06",
      status: "completed",
      topic: "Introdução à Mecânica",
      activities: [
        { type: "reading", title: "Resumo: Cinemática Básica", duration: "30 min", completed: true },
        { type: "video", title: "Vídeo Explicativo", duration: "15 min", completed: true },
        { type: "quiz", title: "Quiz: 10 questões", duration: "20 min", completed: true },
        { type: "flashcard", title: "Flashcards: Fórmulas", duration: "15 min", completed: true }
      ],
      timeSpent: "80 min",
      performance: 85
    },
    {
      day: 2,
      date: "21/06",
      status: "completed",
      topic: "Movimento Retilíneo Uniforme",
      activities: [
        { type: "reading", title: "Resumo: MRU e MRUV", duration: "35 min", completed: true },
        { type: "audio", title: "Áudio Explicativo", duration: "20 min", completed: true },
        { type: "practice", title: "Exercícios Práticos", duration: "25 min", completed: true }
      ],
      timeSpent: "80 min",
      performance: 92
    },
    {
      day: 3,
      date: "22/06",
      status: "current",
      topic: "Leis de Newton",
      activities: [
        { type: "reading", title: "Resumo: 3 Leis de Newton", duration: "40 min", completed: false },
        { type: "video", title: "Vídeo: Aplicações Práticas", duration: "25 min", completed: false },
        { type: "quiz", title: "Quiz: Dinâmica", duration: "30 min", completed: false },
        { type: "summary", title: "Criar Resumo Próprio", duration: "25 min", completed: false }
      ],
      timeSpent: "0 min",
      performance: null
    },
    {
      day: 4,
      date: "23/06",
      status: "upcoming",
      topic: "Força e Movimento",
      activities: [
        { type: "reading", title: "Resumo: Tipos de Força", duration: "30 min", completed: false },
        { type: "simulation", title: "Simulação Interativa", duration: "20 min", completed: false },
        { type: "quiz", title: "Quiz: Aplicação de Forças", duration: "25 min", completed: false }
      ],
      timeSpent: "0 min",
      performance: null
    },
    {
      day: 5,
      date: "24/06",
      status: "upcoming",
      topic: "Revisão da Semana",
      activities: [
        { type: "review", title: "Revisão Geral", duration: "45 min", completed: false },
        { type: "test", title: "Simulado Semanal", duration: "60 min", completed: false },
        { type: "reflection", title: "Autoavaliação", duration: "15 min", completed: false }
      ],
      timeSpent: "0 min",
      performance: null
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'reading': return FileText;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'quiz': return Brain;
      case 'flashcard': return Zap;
      case 'practice': return Target;
      case 'summary': return BookOpen;
      case 'review': return CheckCircle;
      case 'test': return Trophy;
      case 'simulation': return Play;
      default: return BookOpen;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'current': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'upcoming': return 'bg-gray-100 text-gray-600 border-gray-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getActivityTypeLabel = (type: string) => {
    const labels = {
      reading: 'Leitura',
      video: 'Vídeo',
      audio: 'Áudio',
      quiz: 'Quiz',
      flashcard: 'Flashcards',
      practice: 'Prática',
      summary: 'Resumo',
      review: 'Revisão',
      test: 'Teste',
      simulation: 'Simulação'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                {learningPath.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Trilha personalizada criada automaticamente pela IA
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              Dia {learningPath.currentDay} de {learningPath.totalDays}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-lg font-bold text-blue-600">{learningPath.progress}%</div>
              <div className="text-sm text-gray-600">Progresso Geral</div>
              <Progress value={learningPath.progress} className="h-2 mt-1" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-700">{learningPath.dailyTime}</div>
              <div className="text-sm text-gray-600">Tempo Diário</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{learningPath.goalDate}</div>
              <div className="text-sm text-gray-600">Meta Final</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{learningPath.difficulty}</div>
              <div className="text-sm text-gray-600">Nível</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Semana Atual - Mecânica Básica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyPlan.map((day) => (
              <div
                key={day.day}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${getStatusColor(day.status)} ${
                  selectedDay === day.day ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      day.status === 'completed' ? 'bg-green-500 text-white' :
                      day.status === 'current' ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {day.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : day.day}
                    </div>
                    <div>
                      <h4 className="font-semibold">{day.date} - {day.topic}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{day.activities.length} atividades</span>
                        <span>⏱️ {day.timeSpent}</span>
                        {day.performance && (
                          <span className="text-green-600">📊 {day.performance}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {day.status === 'current' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-1" />
                        Continuar
                      </Button>
                    )}
                    {day.status === 'upcoming' && (
                      <Badge variant="secondary">Em breve</Badge>
                    )}
                    {day.status === 'completed' && (
                      <Badge className="bg-green-100 text-green-700">Concluído</Badge>
                    )}
                  </div>
                </div>

                {/* Expanded Activities */}
                {selectedDay === day.day && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <h6 className="font-medium text-gray-700">Atividades do Dia:</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {day.activities.map((activity, index) => {
                        const IconComponent = getActivityIcon(activity.type);
                        return (
                          <div
                            key={index}
                            className={`p-3 rounded border ${activity.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <IconComponent className={`w-4 h-4 ${activity.completed ? 'text-green-600' : 'text-gray-500'}`} />
                              <span className="text-sm font-medium">{getActivityTypeLabel(activity.type)}</span>
                              <Badge variant="outline" className="text-xs">{activity.duration}</Badge>
                            </div>
                            <p className="text-sm text-gray-700">{activity.title}</p>
                            {!activity.completed && day.status === 'current' && (
                              <Button size="sm" className="mt-2 w-full">
                                Iniciar
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Insights da IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <h6 className="font-medium text-purple-800 mb-1">🎯 Padrão Identificado</h6>
              <p className="text-sm text-purple-700">
                Você aprende melhor pela manhã (89% das atividades completadas foram antes das 11h). 
                Suas próximas sessões foram otimizadas para esse horário.
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <h6 className="font-medium text-purple-800 mb-1">📈 Progresso Observado</h6>
              <p className="text-sm text-purple-700">
                Sua performance em quizzes melhorou 23% esta semana. Continue combinando 
                vídeo + quiz para máxima retenção.
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <h6 className="font-medium text-purple-800 mb-1">💡 Sugestão Personalizada</h6>
              <p className="text-sm text-purple-700">
                Baseado em seu perfil, adicionei 15 min de flashcards antes dos simulados. 
                Isso pode aumentar sua nota em até 12%.
              </p>
            </div>
          </div>
          
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
            Ajustar Trilha com IA
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <div className="text-sm text-gray-600">Dias Estudados</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">46h</div>
            <div className="text-sm text-gray-600">Tempo Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-gray-600">Performance Média</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">67</div>
            <div className="text-sm text-gray-600">Dias Restantes</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}