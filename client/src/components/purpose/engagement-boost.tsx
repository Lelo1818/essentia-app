import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy,
  Star,
  Flame,
  Heart,
  Zap,
  Target,
  Calendar,
  Users,
  Gift,
  Crown,
  Sparkles,
  TrendingUp,
  Award,
  Timer,
  Bell
} from "lucide-react";

export default function EngagementBoost() {
  const [currentStreak, setCurrentStreak] = useState(42);
  const [weeklyChallenge, setWeeklyChallenge] = useState({
    progress: 3,
    total: 5,
    title: "Semana da Transformação",
    reward: "Meditação Premium + Análise Profunda"
  });

  const [socialFeed, setSocialFeed] = useState([
    {
      user: "Maria S.",
      achievement: "Completou 21 dias consecutivos!",
      insight: "Descobri que minha essência está ligada ao ensino",
      likes: 23,
      time: "2h"
    },
    {
      user: "João P.",
      achievement: "Desbloqueou Ritual do Fogo Avançado",
      insight: "A respiração consciente mudou minha ansiedade",
      likes: 15,
      time: "4h"
    },
    {
      user: "Ana R.",
      achievement: "Criou sua primeira Âncora Sagrada",
      insight: "Meu mantra: 'Sou coragem em movimento'",
      likes: 31,
      time: "6h"
    }
  ]);

  const [dailyMissions, setDailyMissions] = useState([
    { id: 1, title: "Respiração Matinal", completed: true, xp: 10 },
    { id: 2, title: "Reflexão de Gratidão", completed: true, xp: 15 },
    { id: 3, title: "Compartilhar Insight", completed: false, xp: 25 },
    { id: 4, title: "Ritual dos Elementos", completed: false, xp: 30 },
    { id: 5, title: "Conexão Comunitária", completed: false, xp: 20 }
  ]);

  const [achievements, setAchievements] = useState([
    { title: "Primeiro Passo", description: "Iniciou a jornada", unlocked: true, rare: false },
    { title: "Respirador Zen", description: "7 dias de respiração consciente", unlocked: true, rare: false },
    { title: "Descobridor", description: "Completou todas as reflexões", unlocked: true, rare: true },
    { title: "Mestre dos Elementos", description: "Rituais de todos os elementos", unlocked: false, rare: true },
    { title: "Influenciador", description: "10 pessoas inspiradas", unlocked: false, rare: true },
    { title: "Guru Digital", description: "100 dias consecutivos", unlocked: false, rare: true }
  ]);

  const [notifications, setNotifications] = useState([
    { type: "achievement", message: "🏆 Nova conquista desbloqueada!", time: "agora" },
    { type: "social", message: "💬 3 pessoas curtiram sua reflexão", time: "5min" },
    { type: "reminder", message: "🔔 Hora da sua prática vespertina", time: "15min" },
    { type: "challenge", message: "⚡ Desafio semanal: 60% completo", time: "1h" }
  ]);

  const completedMissions = dailyMissions.filter(m => m.completed).length;
  const totalXP = dailyMissions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);
  const challengeProgress = (weeklyChallenge.progress / weeklyChallenge.total) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{currentStreak}</div>
              <div className="text-purple-100 text-sm">Dias Consecutivos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalXP}</div>
              <div className="text-purple-100 text-sm">XP Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
              <div className="text-purple-100 text-sm">Conquistas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">#{Math.floor(Math.random() * 50) + 1}</div>
              <div className="text-purple-100 text-sm">Ranking Global</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Missions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Missões Diárias
                <Badge className="ml-2 bg-blue-100 text-blue-700">
                  {completedMissions}/{dailyMissions.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyMissions.map((mission) => (
                  <div
                    key={mission.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      mission.completed 
                        ? "bg-green-50 border-green-200" 
                        : "bg-gray-50 border-gray-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        mission.completed ? "bg-green-500" : "bg-gray-300"
                      }`}>
                        {mission.completed ? (
                          <Star className="w-3 h-3 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className={mission.completed ? "line-through text-gray-500" : "text-gray-800"}>
                        {mission.title}
                      </span>
                    </div>
                    <Badge className={mission.completed ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                      {mission.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-800">Progresso do Dia</span>
                  <span className="text-amber-600">{Math.round((completedMissions / dailyMissions.length) * 100)}%</span>
                </div>
                <Progress value={(completedMissions / dailyMissions.length) * 100} className="h-2" />
                <p className="text-xs text-amber-700 mt-2">
                  Complete mais {dailyMissions.length - completedMissions} missões para desbloquear bônus especial!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Challenge */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                {weeklyChallenge.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Progresso Semanal</span>
                  <Badge className="bg-purple-100 text-purple-700">
                    {weeklyChallenge.progress}/{weeklyChallenge.total}
                  </Badge>
                </div>
                
                <Progress value={challengeProgress} className="h-3" />
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h6 className="font-medium text-purple-800 mb-2">🎁 Recompensa:</h6>
                  <p className="text-purple-700 text-sm">{weeklyChallenge.reward}</p>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Flame className="w-4 h-4 mr-2" />
                  Continuar Desafio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Comunidade Inspiradora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialFeed.map((post, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {post.user.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{post.user}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.time}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="ml-10 space-y-2">
                      <p className="text-sm text-blue-600">🏆 {post.achievement}</p>
                      <p className="text-sm text-gray-700 italic">"{post.insight}"</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-red-500">
                          <Heart className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="hover:text-blue-500">Inspirar</button>
                        <button className="hover:text-green-500">Compartilhar</button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Ver Mais Inspirações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Notificações
                <Badge className="ml-2 bg-red-500 text-white">
                  {notifications.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif, i) => (
                  <div key={i} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.type === 'achievement' ? 'bg-gold-500' :
                      notif.type === 'social' ? 'bg-blue-500' :
                      notif.type === 'reminder' ? 'bg-orange-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-gold-600" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      achievement.unlocked 
                        ? "bg-gold-50 border-gold-200" 
                        : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? "bg-gold-500" : "bg-gray-300"
                    }`}>
                      {achievement.rare ? (
                        <Crown className="w-4 h-4 text-white" />
                      ) : (
                        <Star className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{achievement.title}</span>
                        {achievement.rare && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs">
                            Raro
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <Timer className="w-4 h-4 mr-2" />
                  Sessão Express (5min)
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Compartilhar Insight
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Conectar com Comunidade
                </Button>
                <Button variant="outline" className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Indicar Amigo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}