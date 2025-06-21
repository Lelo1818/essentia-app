import { useState } from "react";
import Avatar3DEdu from "@/components/edu/avatar-3d-edu";
import BearAvatar from "@/components/edu/bear-avatar";
import QuickNavButton from "@/components/shared/quick-nav-button";
import { AppLogo, AppName } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser } from "@/data/mock-users";
import { mockEduData, mockLearningPaths } from "@/data/mock-edu-data";
import { InteractiveCard, StatsCard, ActionCard } from "@/components/enhanced/interactive-cards";
import { InteractiveButton } from "@/components/enhanced/interactive-buttons";
import { LoadingState } from "@/components/enhanced/loading-states";
import { BreadcrumbNav } from "@/components/enhanced/navigation-links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearningPath from "@/components/edu/learning-path";
import ContentUpload from "@/components/edu/content-upload";
import AdaptiveQuiz from "@/components/edu/adaptive-quiz";
import SmartContentDetection from "@/components/edu/smart-content-detection";
import AgeBasedLearning from "@/components/edu/age-based-learning";
import AdvancedFeatures from "@/components/edu/advanced-features";
import ProfessionalFeatures from "@/components/edu/professional-features";
import HybridLearningSystem from "@/components/edu/hybrid-learning-system";
import PromptIntelligence from "@/components/edu/prompt-intelligence";
import { PromptShowcase } from "@/components/edu/prompt-showcase";
import { 
  BookOpen, 
  Brain, 
  Upload,
  Target,
  TrendingUp,
  Clock,
  Trophy,
  Zap,
  Calendar,
  Headphones,
  Video,
  FileText,
  Users,
  Lightbulb
} from "lucide-react";

export default function Edu() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const userStats = {
    activePaths: 3,
    completedPaths: 8,
    totalStudyTime: "127h",
    averageScore: 87,
    streak: 12,
    weeklyGoal: 14,
    weeklyProgress: 10
  };

  const currentPaths = [
    {
      id: 1,
      title: "Preparação ENEM - Física",
      progress: 67,
      nextSession: "Hoje, 14:30",
      difficulty: "Intermediário",
      timeLeft: "23 dias",
      performance: 89
    },
    {
      id: 2,
      title: "Python para Iniciantes",
      progress: 34,
      nextSession: "Amanhã, 09:00",
      difficulty: "Básico",
      timeLeft: "45 dias",
      performance: 92
    },
    {
      id: 3,
      title: "Marketing Digital",
      progress: 78,
      nextSession: "Seg, 20:00",
      difficulty: "Avançado",
      timeLeft: "7 dias",
      performance: 84
    }
  ];

  const todayActivities = [
    {
      type: "video",
      title: "Leis de Newton - Revisão",
      duration: "15 min",
      completed: true
    },
    {
      type: "quiz",
      title: "Quiz: Dinâmica",
      duration: "20 min",
      completed: true
    },
    {
      type: "reading",
      title: "Resumo: Força e Movimento",
      duration: "25 min",
      completed: false
    },
    {
      type: "practice",
      title: "Exercícios Práticos",
      duration: "30 min",
      completed: false
    }
  ];

  const achievements = [
    {
      title: "Streak Master",
      description: "12 dias consecutivos estudando",
      icon: "🔥",
      unlocked: true
    },
    {
      title: "Quiz Champion",
      description: "90%+ em 5 quizzes seguidos",
      icon: "🏆",
      unlocked: true
    },
    {
      title: "Early Bird",
      description: "Estudou antes das 8h por 7 dias",
      icon: "🌅",
      unlocked: false
    },
    {
      title: "Night Owl",
      description: "Estudou após 22h por 5 dias",
      icon: "🦉",
      unlocked: false
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'quiz': return Brain;
      case 'reading': return FileText;
      case 'practice': return Target;
      case 'audio': return Headphones;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <QuickNavButton />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Brain className="w-6 h-6 mr-3 text-blue-600" />
                EDU - Aprendizado Inteligente
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Sua jornada personalizada de aprendizado com IA adaptativa
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
              {userStats.streak} dias seguidos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{userStats.activePaths}</div>
              <div className="text-sm text-gray-600">Trilhas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{userStats.totalStudyTime}</div>
              <div className="text-sm text-gray-600">Tempo Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{userStats.averageScore}%</div>
              <div className="text-sm text-gray-600">Performance Média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{userStats.completedPaths}</div>
              <div className="text-sm text-gray-600">Trilhas Concluídas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Meta Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {userStats.weeklyProgress} de {userStats.weeklyGoal} horas esta semana
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((userStats.weeklyProgress / userStats.weeklyGoal) * 100)}%
              </span>
            </div>
            <Progress value={(userStats.weeklyProgress / userStats.weeklyGoal) * 100} className="h-3" />
            <p className="text-sm text-gray-600">
              Faltam {userStats.weeklyGoal - userStats.weeklyProgress} horas para bater sua meta!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard" className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>Pro</span>
          </TabsTrigger>
          <TabsTrigger value="paths" className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Trilhas</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center space-x-1">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </TabsTrigger>
          <TabsTrigger value="smart" className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>Smart</span>
          </TabsTrigger>
          <TabsTrigger value="ages" className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Idades</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-1">
            <Lightbulb className="w-4 h-4" />
            <span>Futuro</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center space-x-1">
            <Brain className="w-4 h-4" />
            <span>Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>Prompts IA</span>
          </TabsTrigger>
          <TabsTrigger value="avatar" className="flex items-center space-x-1">
            <Brain className="w-4 h-4" />
            <span>Bear Avatar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professional" className="mt-6">
          <ProfessionalFeatures />
        </TabsContent>

        <TabsContent value="dashboard" className="mt-6">
          {/* Avatar 3D Educational */}
          <div className="flex justify-center mb-8">
            <Avatar3DEdu
              knowledgeLevel={userStats.averageScore}
              environment="library"
              isActive={true}
              className="mx-auto"
            />
          </div>
          <HybridLearningSystem />
        </TabsContent>
        
        <TabsContent value="dashboard-old" className="mt-6">
          <div className="space-y-6">
            {/* Active Learning Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Suas Trilhas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentPaths.map((path) => (
                    <div
                      key={path.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{path.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>📅 {path.nextSession}</span>
                            <span>⏱️ {path.timeLeft}</span>
                            <Badge variant="secondary">{path.difficulty}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{path.progress}%</div>
                          <div className="text-sm text-gray-500">Performance: {path.performance}%</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={path.progress} className="h-2" />
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            Continuar Estudando
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Progresso
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Atividades de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayActivities.map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded border ${
                          activity.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded ${
                          activity.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-4 h-4 ${
                            activity.completed ? 'text-green-600' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{activity.title}</h5>
                          <p className="text-sm text-gray-600">{activity.duration}</p>
                        </div>
                        
                        {activity.completed ? (
                          <Badge className="bg-green-100 text-green-700">Concluído</Badge>
                        ) : (
                          <Button size="sm">Iniciar</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg text-center transition-all ${
                        achievement.unlocked
                          ? 'bg-yellow-50 border-2 border-yellow-200'
                          : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h5 className="font-medium text-gray-800 mb-1">{achievement.title}</h5>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="paths" className="mt-6">
          <LearningPath />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <ContentUpload />
        </TabsContent>

        <TabsContent value="smart" className="mt-6">
          <SmartContentDetection />
        </TabsContent>

        <TabsContent value="ages" className="mt-6">
          <AgeBasedLearning />
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <AdvancedFeatures />
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <AdaptiveQuiz />
        </TabsContent>
      </Tabs>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Insights da IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-white/50 rounded border border-green-200">
              <h6 className="font-medium text-green-800 mb-1">🎯 Padrão Identificado</h6>
              <p className="text-sm text-green-700">
                Você aprende 34% melhor pela manhã. Suas próximas sessões foram reagendadas para maximizar retenção.
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded border border-green-200">
              <h6 className="font-medium text-green-800 mb-1">📈 Performance em Alta</h6>
              <p className="text-sm text-green-700">
                Sua performance em Física melhorou 23% esta semana. Continue combinando vídeo + quiz + prática.
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded border border-green-200">
              <h6 className="font-medium text-green-800 mb-1">💡 Recomendação</h6>
              <p className="text-sm text-green-700">
                Baseado em seu perfil, seria ideal adicionar 15 min de revisão antes de dormir para consolidar conhecimento.
              </p>
            </div>
          </div>
          
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            <Zap className="w-4 h-4 mr-2" />
            Otimizar Trilhas com IA
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}