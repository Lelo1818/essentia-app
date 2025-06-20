import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gamepad2, 
  Star, 
  Trophy, 
  Coins, 
  Target,
  Gift,
  BookOpen,
  PiggyBank,
  Sparkles,
  Heart,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KidsAchievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  points: number;
  unlocked: boolean;
  category: 'saving' | 'learning' | 'goals' | 'sharing';
}

interface KidsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
  category: string;
  weeklyAllowance: number;
  weeksNeeded: number;
}

function KidsDashboard() {
  const [currentCoins, setCurrentCoins] = useState(1250);
  const [level, setLevel] = useState(5);
  const [xpProgress, setXpProgress] = useState(65);
  const { toast } = useToast();

  const achievements: KidsAchievement[] = [
    {
      id: "1",
      title: "Primeiro Cofrinho",
      description: "Guardou suas primeiras moedinhas!",
      icon: PiggyBank,
      points: 100,
      unlocked: true,
      category: 'saving'
    },
    {
      id: "2",
      title: "Super Poupador",
      description: "Guardou dinheiro por 1 semana seguida",
      icon: Star,
      points: 200,
      unlocked: true,
      category: 'saving'
    },
    {
      id: "3",
      title: "Pequeno Professor",
      description: "Completou 5 lições sobre dinheiro",
      icon: BookOpen,
      points: 150,
      unlocked: false,
      category: 'learning'
    },
    {
      id: "4",
      title: "Coração Generoso",
      description: "Ajudou alguém com seu dinheiro",
      icon: Heart,
      points: 300,
      unlocked: false,
      category: 'sharing'
    }
  ];

  const goals: KidsGoal[] = [
    {
      id: "1",
      title: "Bicicleta Nova",
      targetAmount: 300,
      currentAmount: 180,
      emoji: "🚲",
      category: "Brinquedos",
      weeklyAllowance: 25,
      weeksNeeded: 5
    },
    {
      id: "2",
      title: "Jogo do Switch",
      targetAmount: 120,
      currentAmount: 45,
      emoji: "🎮",
      category: "Games",
      weeklyAllowance: 25,
      weeksNeeded: 3
    },
    {
      id: "3",
      title: "Ajudar Animais",
      targetAmount: 50,
      currentAmount: 30,
      emoji: "🐶",
      category: "Caridade",
      weeklyAllowance: 10,
      weeksNeeded: 2
    }
  ];

  const weeklyTasks = [
    { id: "1", task: "Guardar mesada", points: 50, completed: true },
    { id: "2", task: "Ler sobre investimentos", points: 30, completed: true },
    { id: "3", task: "Ajudar em casa", points: 40, completed: false },
    { id: "4", task: "Não gastar impulsivamente", points: 60, completed: false }
  ];

  const completedTasks = weeklyTasks.filter(task => task.completed).length;
  const totalTasks = weeklyTasks.length;

  const addMoney = (goalId: string, amount: number) => {
    setCurrentCoins(prev => prev + amount);
    toast({
      title: "Dinheiro Adicionado!",
      description: `Você ganhou ${amount} Flow Coins!`,
      variant: "default"
    });
  };

  const playGame = (gameName: string) => {
    toast({
      title: `Jogando ${gameName}!`,
      description: "Divirta-se aprendendo sobre dinheiro!",
      variant: "default"
    });
  };

  const viewProgress = () => {
    toast({
      title: "Relatório dos Pais",
      description: "Visualizando progresso da criança...",
      variant: "default"
    });
  };

  const configureMesada = () => {
    toast({
      title: "Configurar Mesada",
      description: "Ajustando valor da mesada semanal...",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen p-6 pt-16">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Flow Kids
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Aprenda sobre dinheiro de forma divertida! 🌟
          </p>
        </div>

        {/* Player Stats */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">Level {level}</div>
                <div className="text-purple-500">Super Poupador</div>
                <Progress value={xpProgress} className="mt-2 h-3" />
                <div className="text-sm text-gray-600 mt-1">{xpProgress}% para próximo level</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-6 h-6 text-yellow-500" />
                  <div className="text-3xl font-bold text-yellow-600">{currentCoins}</div>
                </div>
                <div className="text-yellow-500">Flow Coins</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{achievements.filter(a => a.unlocked).length}</div>
                <div className="text-green-500">Conquistas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Missões da Semana ({completedTasks}/{totalTasks})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklyTasks.map((task) => (
                <div key={task.id} className={`p-4 rounded-lg border-2 ${task.completed ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${task.completed ? 'text-green-800' : 'text-gray-700'}`}>
                        {task.task}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">+{task.points} coins</span>
                      </div>
                    </div>
                    {task.completed && (
                      <div className="text-green-500">
                        <Trophy className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="w-5 h-5 mr-2 text-pink-600" />
              Meus Objetivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <Card key={goal.id} className="border-pink-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{goal.emoji}</div>
                      <h3 className="font-bold text-lg">{goal.title}</h3>
                      <Badge className="bg-pink-100 text-pink-800 mt-1">
                        {goal.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>R$ {goal.currentAmount}</span>
                          <span>R$ {goal.targetAmount}</span>
                        </div>
                        <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-3" />
                        <div className="text-center text-sm text-gray-600 mt-1">
                          {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% completo
                        </div>
                      </div>
                      
                      <div className="text-center text-sm text-gray-600">
                        <div>Mesada: R$ {goal.weeklyAllowance}/semana</div>
                        <div>Faltam {goal.weeksNeeded} semanas</div>
                      </div>
                      
                      <InteractiveButton
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                        soundType="success"
                        onClick={() => addMoney(goal.id, 25)}
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Adicionar Dinheiro
                      </InteractiveButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
              Troféus e Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-lg border-2 text-center ${
                  achievement.unlocked 
                    ? 'border-yellow-300 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                    achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                  }`} />
                  <h4 className={`font-bold ${achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">+{achievement.points}</span>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-yellow-100 text-yellow-800 mt-2">
                      Desbloqueado!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Games */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gamepad2 className="w-5 h-5 mr-2 text-green-600" />
              Jogos Educativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200 hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">🏪</div>
                  <h3 className="font-bold">Lojinha Virtual</h3>
                  <p className="text-sm text-gray-600 mt-1">Aprenda a fazer compras inteligentes</p>
                  <InteractiveButton 
                    className="w-full mt-3" 
                    variant="outline" 
                    soundType="click"
                    onClick={() => playGame("Lojinha Virtual")}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Jogar
                  </InteractiveButton>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">🏦</div>
                  <h3 className="font-bold">Banco do Flow</h3>
                  <p className="text-sm text-gray-600 mt-1">Descubra como funciona um banco</p>
                  <InteractiveButton 
                    className="w-full mt-3" 
                    variant="outline" 
                    soundType="click"
                    onClick={() => playGame("Banco do Flow")}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explorar
                  </InteractiveButton>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="font-bold">Investidor Mirim</h3>
                  <p className="text-sm text-gray-600 mt-1">Primeiros passos nos investimentos</p>
                  <InteractiveButton 
                    className="w-full mt-3" 
                    variant="outline" 
                    soundType="click"
                    onClick={() => playGame("Investidor Mirim")}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Começar
                  </InteractiveButton>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Parent Controls */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <Zap className="w-5 h-5 mr-2" />
              Área dos Pais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InteractiveButton 
                className="bg-orange-600 hover:bg-orange-700"
                soundType="click"
                onClick={viewProgress}
              >
                Ver Progresso da Criança
              </InteractiveButton>
              <InteractiveButton 
                variant="outline"
                className="border-orange-600 text-orange-600"
                soundType="click"
                onClick={configureMesada}
              >
                Configurar Mesada
              </InteractiveButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Removed Router function since we're directly rendering KidsDashboard

export default function FlowKidsApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <KidsDashboard />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}