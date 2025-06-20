import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, TrendingUp, Target, Calendar, Award, 
  BookOpen, Clock, Brain, BarChart3, Trophy
} from "lucide-react";
import type { User, LearningPath, Achievement, ProgressAnalytics } from "../../../../../shared/schema-edu";

export default function ProgressPage() {
  const { data: profileData } = useQuery<{ user: User }>({
    queryKey: ["/api/edu/profile"],
  });

  const { data: learningPaths = [] } = useQuery<LearningPath[]>({
    queryKey: ["/api/edu/learning-paths"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/edu/achievements"],
  });

  const { data: analytics = [] } = useQuery<ProgressAnalytics[]>({
    queryKey: ["/api/edu/analytics"],
  });

  const user = profileData?.user;
  const completedPaths = learningPaths.filter(path => path.isCompleted);
  const activePaths = learningPaths.filter(path => !path.isCompleted);

  const getLevel = (experience: number) => Math.floor(experience / 100) + 1;
  const getProgressToNextLevel = (experience: number) => experience % 100;

  const totalStudyTime = analytics.reduce((acc, day) => acc + day.timeSpent, 0);
  const averageScore = analytics.length > 0 
    ? Math.round(analytics.reduce((acc, day) => acc + day.averageScore, 0) / analytics.length)
    : 0;

  const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayData = analytics.find(a => 
      new Date(a.date).toDateString() === date.toDateString()
    );
    return {
      day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      sessions: dayData?.sessionsCompleted || 0,
      timeSpent: dayData?.timeSpent || 0,
    };
  }).reverse();

  const maxSessions = Math.max(...weeklyProgress.map(d => d.sessions), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Meu Progresso</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Nível Atual</p>
                  <p className="text-3xl font-bold">{getLevel(user?.experience || 0)}</p>
                </div>
                <Trophy className="w-8 h-8 text-blue-200" />
              </div>
              <div className="mt-4">
                <Progress 
                  value={getProgressToNextLevel(user?.experience || 0)} 
                  className="bg-blue-700"
                />
                <p className="text-xs text-blue-100 mt-1">
                  {getProgressToNextLevel(user?.experience || 0)}/100 XP
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Sequência</p>
                  <p className="text-3xl font-bold">{user?.streak || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
              <p className="text-green-100 text-sm mt-2">dias consecutivos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Trilhas Concluídas</p>
                  <p className="text-3xl font-bold text-gray-900">{completedPaths.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mt-2">
                de {learningPaths.length} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tempo Total</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round(totalStudyTime / 60)}h</p>
                </div>
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mt-2">estudando</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span>Atividade Semanal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600 font-medium">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(day.sessions / maxSessions) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {day.sessions}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {day.timeSpent > 0 ? `${day.timeSpent} min` : "Sem atividade"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>Desempenho</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pontuação Média</span>
                  <span className="text-lg font-bold text-gray-900">{averageScore}%</span>
                </div>
                <Progress value={averageScore} className="h-3" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Trilhas Ativas</span>
                  <span className="text-lg font-bold text-blue-600">{activePaths.length}</span>
                </div>
                <div className="space-y-2">
                  {activePaths.slice(0, 3).map((path) => (
                    <div key={path.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate flex-1 mr-2">{path.title}</span>
                      <span className="text-gray-500">{path.progress}%</span>
                    </div>
                  ))}
                  {activePaths.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{activePaths.length - 3} mais trilhas
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Conquistas</span>
                  <span className="text-lg font-bold text-yellow-600">{achievements.length}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {achievements.slice(0, 6).map((achievement) => (
                    <Badge key={achievement.id} variant="outline" className="text-xs">
                      {achievement.title}
                    </Badge>
                  ))}
                  {achievements.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{achievements.length - 6}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Paths Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Progresso das Trilhas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {learningPaths.length > 0 ? (
              <div className="space-y-4">
                {learningPaths.map((path) => (
                  <div key={path.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{path.title}</h4>
                        <div className="flex items-center space-x-2">
                          {path.isCompleted ? (
                            <Badge className="bg-green-100 text-green-800">
                              Concluída
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              Em progresso
                            </Badge>
                          )}
                          <span className="text-sm text-gray-600">{path.progress}%</span>
                        </div>
                      </div>
                      <Progress value={path.progress} className="mb-2" />
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{path.subject}</span>
                        <span>Meta: {path.targetDays} dias</span>
                      </div>
                    </div>
                    <Link href={`/estudar/${path.id}`}>
                      <Button size="sm" variant={path.isCompleted ? "outline" : "default"}>
                        {path.isCompleted ? "Revisar" : "Continuar"}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma trilha ainda
                </h3>
                <p className="text-gray-600 mb-4">
                  Crie sua primeira trilha para começar a acompanhar seu progresso!
                </p>
                <Link href="/criar-trilha">
                  <Button>Criar primeira trilha</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Conquistas Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.slice(-6).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.earnedAt).toLocaleDateString('pt-BR')}
                      </p>
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