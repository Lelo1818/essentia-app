import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, Star, BookOpen, Map, Compass, Sparkles, 
  Target, Clock, TrendingUp, Award
} from "lucide-react";
import { formatDateRelative, getLevelTitle, suggestNextSteps } from "@/lib/purpose-utils";
import type { UserProfile, InspirationContent } from "@/types/purpose";

export default function PurposeDashboard() {
  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ["/api/purpose/profile"],
  });

  const { data: inspirations = [] } = useQuery<InspirationContent[]>({
    queryKey: ["/api/purpose/inspiration"],
  });

  const { data: diaryEntries = [] } = useQuery({
    queryKey: ["/api/purpose/diary"],
  });

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Conectando com sua essência...</p>
        </div>
      </div>
    );
  }

  const user = profile?.user;
  const currentLevel = user?.level || 1;
  const experience = user?.experience || 0;
  const experienceInLevel = experience % 100;
  const experienceForNext = 100 - experienceInLevel;

  const recentInspiration = inspirations[0];
  const nextSteps = profile ? suggestNextSteps(profile) : [];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden">
        <Card className="border-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Bem-vinda, {user?.name || "Alma Buscadora"} 🌟
                </h1>
                <p className="text-purple-100 text-lg mb-4">
                  Sua jornada de autodescoberta continua. Cada passo te aproxima da sua essência verdadeira.
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="w-4 h-4 mr-1" />
                    Nível {currentLevel}
                  </Badge>
                  <span className="text-purple-100">{getLevelTitle(currentLevel)}</span>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-4xl mb-2">🧘‍♀️</div>
                <div className="text-sm text-purple-100">
                  {experienceForNext} exp para próximo nível
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso Espiritual</span>
                <span>{experienceInLevel}/100 exp</span>
              </div>
              <Progress value={experienceInLevel} className="h-3 bg-purple-400/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Compass, label: "Continuar Jornada", color: "orange", href: "/jornada" },
          { icon: BookOpen, label: "Escrever no Diário", color: "blue", href: "/diario" },
          { icon: Map, label: "Meu Mapa", color: "green", href: "/mapa" },
          { icon: Sparkles, label: "Inspiração", color: "purple", href: "/inspiracao" }
        ].map((action) => {
          const Icon = action.icon;
          const colorClasses = {
            orange: "bg-orange-100 text-orange-600 hover:bg-orange-200",
            blue: "bg-blue-100 text-blue-600 hover:bg-blue-200", 
            green: "bg-green-100 text-green-600 hover:bg-green-200",
            purple: "bg-purple-100 text-purple-600 hover:bg-purple-200"
          };
          
          return (
            <Link key={action.label} href={action.href}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Sua Jornada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Module Progress */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Módulos da Jornada</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "despertar", name: "Despertar", icon: "🌅", progress: 0 },
                    { key: "descoberta", name: "Descoberta", icon: "🧭", progress: 0 },
                    { key: "decisao", name: "Decisão", icon: "🎯", progress: 0 },
                    { key: "direcao", name: "Direção", icon: "🗺️", progress: 0 }
                  ].map((module) => (
                    <div key={module.key} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{module.icon}</span>
                          <span className="font-medium">{module.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Próximos Passos Sugeridos</h4>
                <div className="space-y-2">
                  {nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                      <Target className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Daily Inspiration */}
          {recentInspiration && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Inspiração do Momento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="text-gray-700 italic mb-3">
                  "{recentInspiration.content}"
                </blockquote>
                {recentInspiration.author && (
                  <p className="text-sm text-gray-500">— {recentInspiration.author}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {diaryEntries.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Comece escrevendo no seu diário pessoal</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {diaryEntries.slice(0, 3).map((entry: any) => (
                    <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{entry.title}</h4>
                      <p className="text-xs text-gray-600">{formatDateRelative(entry.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-gray-500">
                <Award className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Suas conquistas aparecerão aqui</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}