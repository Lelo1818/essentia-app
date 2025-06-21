import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Coins, 
  Trophy,
  Target,
  Gift,
  Heart,
  Gamepad2,
  BookOpen,
  PiggyBank,
  Wallet,
  ShoppingCart,
  TrendingUp,
  Award,
  Sparkles,
  Crown,
  Zap
} from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  points: number;
  color: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  points: number;
  completed: boolean;
  category: string;
  duration: string;
}

export default function FlowKids() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAvatar, setSelectedAvatar] = useState("unicorn");

  const kidProfile = {
    name: "Sofia",
    age: 8,
    level: 5,
    totalPoints: 1250,
    nextLevelPoints: 1500,
    streak: 12,
    savings: 125.50,
    goals: 3,
    completedLessons: 18
  };

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Primeiro Depósito",
      description: "Guardou dinheiro pela primeira vez!",
      icon: PiggyBank,
      earned: true,
      points: 50,
      color: "text-pink-500 bg-pink-50"
    },
    {
      id: 2,
      title: "Economista Mirim",
      description: "Completou 10 lições sobre economia",
      icon: BookOpen,
      earned: true,
      points: 100,
      color: "text-blue-500 bg-blue-50"
    },
    {
      id: 3,
      title: "Meta Alcançada",
      description: "Conquistou sua primeira meta de economia",
      icon: Target,
      earned: true,
      points: 75,
      color: "text-green-500 bg-green-50"
    },
    {
      id: 4,
      title: "Super Poupador",
      description: "Economizou por 30 dias seguidos",
      icon: Crown,
      earned: false,
      points: 200,
      color: "text-yellow-500 bg-yellow-50"
    }
  ];

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "O que é Dinheiro?",
      description: "Aprenda de forma divertida o que é dinheiro e para que serve",
      difficulty: 'Fácil',
      points: 25,
      completed: true,
      category: "Básico",
      duration: "5 min"
    },
    {
      id: 2,
      title: "Economizar é Legal!",
      description: "Descubra por que guardar dinheiro pode ser divertido",
      difficulty: 'Fácil',
      points: 30,
      completed: true,
      category: "Poupança",
      duration: "7 min"
    },
    {
      id: 3,
      title: "Necessidade vs Desejo",
      description: "Aprenda a diferença entre o que precisamos e o que queremos",
      difficulty: 'Médio',
      points: 40,
      completed: false,
      category: "Planejamento",
      duration: "10 min"
    },
    {
      id: 4,
      title: "Minha Primeira Meta",
      description: "Como definir e alcançar objetivos financeiros",
      difficulty: 'Médio',
      points: 50,
      completed: false,
      category: "Metas",
      duration: "12 min"
    }
  ];

  const avatars = [
    { id: "unicorn", name: "Unicórnio Mágico", emoji: "🦄", color: "from-pink-400 to-purple-400" },
    { id: "dragon", name: "Dragão Amigo", emoji: "🐲", color: "from-green-400 to-blue-400" },
    { id: "cat", name: "Gatinho Esperto", emoji: "🐱", color: "from-orange-400 to-red-400" },
    { id: "robot", name: "Robô Legal", emoji: "🤖", color: "from-blue-400 to-cyan-400" }
  ];

  const currentAvatar = avatars.find(a => a.id === selectedAvatar);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      {/* Floating CSS for complete isolation */}
      <style>
        {`
          /* Hide all other elements */
          body > div:not(#flowkids-container),
          #root > div:not(#flowkids-container),
          nav, main, header, footer,
          .min-h-screen.bg-gray-50,
          .mobile-navigation,
          .fixed.bottom-0 {
            display: none !important;
          }
          
          /* Flow Kids takes over completely */
          #flowkids-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 99999 !important;
            background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%) !important;
            overflow-y: auto !important;
          }
          
          body {
            overflow: hidden !important;
          }
        `}
      </style>

      <div id="flowkids-container" className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
        {/* Header Colorido */}
        <div className="bg-white/90 backdrop-blur-sm border-b-4 border-rainbow bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-1">
          <div className="bg-white rounded-lg mx-2 my-1 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentAvatar?.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {currentAvatar?.emoji}
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Flow Kids
                  </h1>
                  <p className="text-sm text-gray-600">Oi, {kidProfile.name}! 👋</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                  <Coins className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">{kidProfile.totalPoints}</span>
                </div>
                <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-bold text-orange-700">{kidProfile.streak}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 pb-20">
          {/* Cards de Status Divertidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="bg-gradient-to-br from-pink-400 to-pink-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <PiggyBank className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">R$ {kidProfile.savings}</div>
                <div className="text-xs opacity-90">Poupança</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">Nível {kidProfile.level}</div>
                <div className="text-xs opacity-90">Seu Level</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{kidProfile.goals}</div>
                <div className="text-xs opacity-90">Metas Ativas</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{kidProfile.completedLessons}</div>
                <div className="text-xs opacity-90">Lições</div>
              </CardContent>
            </Card>
          </div>

          {/* Progresso para Próximo Nível */}
          <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Próximo Nível</span>
                <span className="text-sm text-gray-600">{kidProfile.totalPoints}/{kidProfile.nextLevelPoints} pontos</span>
              </div>
              <Progress 
                value={(kidProfile.totalPoints / kidProfile.nextLevelPoints) * 100} 
                className="h-3 mb-2"
              />
              <p className="text-sm text-gray-600">
                Faltam {kidProfile.nextLevelPoints - kidProfile.totalPoints} pontos para o nível {kidProfile.level + 1}! 🎉
              </p>
            </CardContent>
          </Card>

          {/* Navegação Principal */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-white/80 p-1">
              <TabsTrigger value="dashboard" className="flex flex-col items-center p-2">
                <Gamepad2 className="w-5 h-5 mb-1" />
                <span className="text-xs">Jogar</span>
              </TabsTrigger>
              <TabsTrigger value="lessons" className="flex flex-col items-center p-2">
                <BookOpen className="w-5 h-5 mb-1" />
                <span className="text-xs">Aprender</span>
              </TabsTrigger>
              <TabsTrigger value="savings" className="flex flex-col items-center p-2">
                <PiggyBank className="w-5 h-5 mb-1" />
                <span className="text-xs">Poupança</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex flex-col items-center p-2">
                <Star className="w-5 h-5 mb-1" />
                <span className="text-xs">Perfil</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Principal */}
            <TabsContent value="dashboard" className="mt-4">
              <div className="space-y-4">
                <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Sparkles className="w-6 h-6 mr-2" />
                      Atividade de Hoje
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white/20 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">🎯 Desafio Diário</h3>
                      <p className="text-sm opacity-90 mb-3">
                        Vamos aprender sobre "Necessidade vs Desejo"! Complete a lição e ganhe 40 pontos.
                      </p>
                      <Button 
                        className="bg-white text-purple-600 hover:bg-gray-100"
                        onClick={() => setActiveTab("lessons")}
                      >
                        Começar Agora! 🚀
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Conquistas Recentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Suas Conquistas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {achievements.filter(a => a.earned).map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-lg border-2 border-dashed ${achievement.color}`}
                        >
                          <achievement.icon className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-center">
                            <div className="text-sm font-semibold">{achievement.title}</div>
                            <div className="text-xs text-gray-600">{achievement.points} pts</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Lições */}
            <TabsContent value="lessons" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    Suas Lições
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-lg border-2 ${
                          lesson.completed
                            ? 'border-green-200 bg-green-50'
                            : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{lesson.title}</h4>
                              {lesson.completed && <Badge className="bg-green-500 text-white text-xs">Concluída</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline">{lesson.difficulty}</Badge>
                              <span className="text-gray-500">{lesson.duration}</span>
                              <span className="text-yellow-600 font-semibold">{lesson.points} pts</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={lesson.completed ? "outline" : "default"}
                            className={lesson.completed ? "text-green-600" : ""}
                          >
                            {lesson.completed ? "✓ Feito" : "Começar"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Poupança */}
            <TabsContent value="savings" className="mt-4">
              <div className="space-y-4">
                <Card className="bg-gradient-to-r from-green-400 to-blue-400 text-white border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PiggyBank className="w-6 h-6 mr-2" />
                      Meu Cofrinho Digital
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">R$ {kidProfile.savings}</div>
                      <p className="text-sm opacity-90">Você está indo muito bem!</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-purple-500" />
                      Suas Metas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg border-purple-200 border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">🎮 Videogame Novo</h4>
                          <span className="text-sm text-purple-600">R$ 299</span>
                        </div>
                        <Progress value={42} className="h-2 mb-2" />
                        <div className="text-xs text-gray-600">R$ 125 de R$ 299 (42%)</div>
                      </div>
                      
                      <div className="p-3 bg-pink-50 rounded-lg border-pink-200 border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">🎁 Presente para Mamãe</h4>
                          <span className="text-sm text-pink-600">R$ 50</span>
                        </div>
                        <Progress value={75} className="h-2 mb-2" />
                        <div className="text-xs text-gray-600">R$ 37 de R$ 50 (75%)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Perfil */}
            <TabsContent value="profile" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      Meu Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentAvatar?.color} flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg`}>
                        {currentAvatar?.emoji}
                      </div>
                      <h3 className="text-xl font-bold">{kidProfile.name}</h3>
                      <p className="text-gray-600">{kidProfile.age} anos • Nível {kidProfile.level}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{kidProfile.totalPoints}</div>
                        <div className="text-xs text-gray-600">Pontos Totais</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{kidProfile.streak}</div>
                        <div className="text-xs text-gray-600">Dias Seguidos</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Escolha seu Avatar:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {avatars.map((avatar) => (
                          <button
                            key={avatar.id}
                            onClick={() => setSelectedAvatar(avatar.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedAvatar === avatar.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${avatar.color} flex items-center justify-center text-2xl mx-auto mb-2`}>
                              {avatar.emoji}
                            </div>
                            <div className="text-xs font-semibold">{avatar.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Todas as Conquistas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-purple-500" />
                      Todas as Conquistas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            achievement.earned
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-50 border border-gray-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <achievement.icon className={`w-6 h-6 ${achievement.earned ? achievement.color.split(' ')[0] : 'text-gray-400'}`} />
                            <div>
                              <div className="font-semibold text-sm">{achievement.title}</div>
                              <div className="text-xs text-gray-600">{achievement.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-yellow-600">{achievement.points} pts</div>
                            {achievement.earned && <div className="text-xs text-green-600">✓ Conquistada</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}