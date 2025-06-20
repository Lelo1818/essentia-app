import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Brain, TrendingUp, Target, Clock, Award,
  PlayCircle, Plus, FileText, BarChart3, Lightbulb, Users
} from "lucide-react";
import eduvibeLogo from "@assets/image_1750383852695.png";
import type { User, LearningPath, Achievement, ContentSuggestion } from "../../../../../shared/schema-edu";

export default function Dashboard() {
  const { data: profileData } = useQuery<{ user: User }>({
    queryKey: ["/api/edu/profile"],
  });

  const { data: learningPaths = [] } = useQuery<LearningPath[]>({
    queryKey: ["/api/edu/learning-paths"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/edu/achievements"],
  });

  const { data: suggestions = [] } = useQuery<ContentSuggestion[]>({
    queryKey: ["/api/edu/suggestions", { trending: true }],
  });

  const user = profileData?.user;
  const activePaths = learningPaths.filter(path => !path.isCompleted);
  const completedPaths = learningPaths.filter(path => path.isCompleted);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getLevel = (experience: number) => Math.floor(experience / 100) + 1;
  const getProgressToNextLevel = (experience: number) => experience % 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                <img src={eduvibeLogo} alt="EduVibe Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduVibe
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/perfil">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0) || "E"}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{user?.name || "Estudante"}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {user?.name || "Estudante"}! 🌟
          </h1>
          <p className="text-gray-600">
            Onde aprender não é tarefa, é experiência. Continue sua jornada de conhecimento!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Nível Atual</p>
                  <p className="text-2xl font-bold">{getLevel(user?.experience || 0)}</p>
                </div>
                <Award className="w-8 h-8 text-blue-200" />
              </div>
              <div className="mt-4">
                <Progress 
                  value={getProgressToNextLevel(user?.experience || 0)} 
                  className="bg-blue-700"
                />
                <p className="text-xs text-blue-100 mt-1">
                  {getProgressToNextLevel(user?.experience || 0)}/100 XP para próximo nível
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Sequência</p>
                  <p className="text-2xl font-bold">{user?.streak || 0} dias</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Trilhas Ativas</p>
                  <p className="text-2xl font-bold text-gray-900">{activePaths.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Conquistas</p>
                  <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
                </div>
                <Target className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { icon: Plus, label: "Nova Trilha", href: "/criar-trilha", color: "blue" },
            { icon: PlayCircle, label: "Continuar Estudos", href: "/estudar", color: "green" },
            { icon: FileText, label: "Meus Materiais", href: "/materiais", color: "purple" },
            { icon: BarChart3, label: "Progresso", href: "/progresso", color: "orange" },
            { icon: BookOpen, label: "Minhas Trilhas", href: "/trilhas", color: "indigo" },
            { icon: Lightbulb, label: "Sugestões", href: "/", color: "yellow" }
          ].map((action) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
              green: "bg-green-100 text-green-600 hover:bg-green-200",
              purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
              orange: "bg-orange-100 text-orange-600 hover:bg-orange-200",
              indigo: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
              yellow: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
            };
            
            return (
              <Link key={action.label} href={action.href}>
                <Card className="cursor-pointer hover:shadow-md transition-all hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${colorClasses[action.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">{action.label}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                <span>Continue Aprendendo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activePaths.length > 0 ? (
                <div className="space-y-4">
                  {activePaths.slice(0, 3).map((path) => (
                    <div key={path.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{path.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={path.progress} className="flex-1" />
                          <span className="text-sm text-gray-500">{path.progress}%</span>
                        </div>
                      </div>
                      <Link href={`/estudar/${path.id}`}>
                        <Button size="sm" className="ml-4">
                          Continuar
                        </Button>
                      </Link>
                    </div>
                  ))}
                  {activePaths.length > 3 && (
                    <Link href="/trilhas">
                      <Button variant="outline" className="w-full">
                        Ver todas as trilhas ({activePaths.length})
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma trilha ativa</h3>
                  <p className="text-gray-600 mb-4">Comece sua jornada de aprendizado criando uma nova trilha!</p>
                  <Link href="/criar-trilha">
                    <Button>Criar primeira trilha</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trending Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Conteúdo em Alta</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.slice(0, 4).map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {suggestion.estimatedTime}h
                          </span>
                        </div>
                      </div>
                      {suggestion.trending && (
                        <Badge className="bg-red-500 text-white text-xs">
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Conquistas Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.slice(-3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}