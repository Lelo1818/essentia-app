import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, TrendingUp, Calendar, DollarSign, Zap, Crown, Medal, Award, Sparkles, Shield, Flame } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function Achievements() {
  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
  });

  // Calcular dados para conquistas dinâmicas
  const currentBalance = summary?.balance || 0;
  const monthlyIncome = summary?.totalIncome || 0;
  const monthlyExpenses = summary?.totalExpenses || 0;
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const completedGoals = goals.filter(g => parseFloat(g.currentAmount || 0) >= parseFloat(g.targetAmount || 1)).length;
  const savingsRate = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;

  // Sistema completo de conquistas gamificadas
  const conquistas = [
    // Financeiras Reais
    {
      id: "saldo_positivo",
      title: "Guardião do Saldo",
      description: "Mantenha seu saldo sempre no azul",
      icon: "💙",
      categoria: "Financeiras",
      isCompleted: currentBalance > 0,
      progress: currentBalance > 0 ? 100 : Math.max(0, ((currentBalance + 1000) / 1000) * 100),
      xp: 100,
      nivel: "Bronze",
      frase: "Você escolheu a tranquilidade financeira"
    },
    {
      id: "poupador_expert",
      title: "Mestre da Poupança",
      description: "Economize mais de 20% da sua renda mensal",
      icon: "🏆",
      categoria: "Financeiras",
      isCompleted: savingsRate >= 20,
      progress: Math.min(100, (savingsRate / 20) * 100),
      xp: 300,
      nivel: "Ouro",
      frase: "Cada real poupado é um passo rumo à liberdade"
    },
    {
      id: "conquistador_sonhos",
      title: "Conquistador de Sonhos",
      description: "Complete sua primeira meta financeira",
      icon: "🎯",
      categoria: "Financeiras",
      isCompleted: completedGoals > 0,
      progress: completedGoals > 0 ? 100 : (goals.length > 0 ? 50 : 0),
      xp: 500,
      nivel: "Platina",
      frase: "Sonhos realizados transformam vidas"
    },
    {
      id: "equilibrio_master",
      title: "Equilibrista Financeiro",
      description: "Mantenha gastos abaixo de 70% da renda por 3 meses",
      icon: "⚖️",
      categoria: "Financeiras",
      isCompleted: (monthlyExpenses / (monthlyIncome || 1)) < 0.7,
      progress: Math.min(100, (1 - (monthlyExpenses / (monthlyIncome || 1))) * 100),
      xp: 250,
      nivel: "Prata",
      frase: "O equilíbrio é a base da prosperidade"
    },
    
    // Comportamentais
    {
      id: "consistencia_rei",
      title: "Rei da Consistência",
      description: "Use o app por 7 dias consecutivos",
      icon: "👑",
      categoria: "Comportamentais",
      isCompleted: false,
      progress: 85,
      xp: 200,
      nivel: "Prata",
      frase: "A consistência constrói impérios"
    },
    {
      id: "simulador_inteligente",
      title: "Simulador Inteligente",
      description: "Simule 5 cenários antes de tomar decisões financeiras",
      icon: "🧠",
      categoria: "Comportamentais",
      isCompleted: false,
      progress: 60,
      xp: 150,
      nivel: "Bronze",
      frase: "Pensar antes de agir é sabedoria aplicada"
    },
    {
      id: "disciplina_credito",
      title: "Disciplinado do Crédito",
      description: "Não use cartão de crédito por 30 dias",
      icon: "🛡️",
      categoria: "Comportamentais",
      isCompleted: false,
      progress: 40,
      xp: 400,
      nivel: "Ouro",
      frase: "A verdadeira riqueza não depende de crédito"
    },
    {
      id: "planejador_mensal",
      title: "Planejador Mensal",
      description: "Acompanhe seu fluxo de caixa por 30 dias seguidos",
      icon: "📊",
      categoria: "Comportamentais",
      isCompleted: false,
      progress: 75,
      xp: 300,
      nivel: "Prata",
      frase: "Quem planeja, prospera"
    },
    
    // Simbolicamente Inspiradoras
    {
      id: "despertar_consciencia",
      title: "Despertar da Consciência",
      description: "Parou de ignorar seus números financeiros",
      icon: "✨",
      categoria: "Inspiradoras",
      isCompleted: true,
      progress: 100,
      xp: 100,
      nivel: "Bronze",
      frase: "A consciência é o primeiro passo para a transformação"
    },
    {
      id: "arquiteto_futuro",
      title: "Arquiteto do Futuro",
      description: "Criou sua primeira meta com intenção clara",
      icon: "🏗️",
      categoria: "Inspiradoras",
      isCompleted: goals.length > 0,
      progress: goals.length > 0 ? 100 : 0,
      xp: 200,
      nivel: "Prata",
      frase: "Cada meta é um tijolo no castelo dos seus sonhos"
    },
    {
      id: "guardiao_liberdade",
      title: "Guardião da Liberdade",
      description: "Escolheu dizer não e ganhou liberdade financeira",
      icon: "🦅",
      categoria: "Inspiradoras",
      isCompleted: false,
      progress: 90,
      xp: 600,
      nivel: "Diamante",
      frase: "Dizer não hoje é dizer sim para o amanhã"
    },
    {
      id: "sabio_decisoes",
      title: "Sábio das Decisões",
      description: "Tomou 10 decisões financeiras conscientes",
      icon: "🎭",
      categoria: "Inspiradoras",
      isCompleted: false,
      progress: 70,
      xp: 350,
      nivel: "Ouro",
      frase: "Cada decisão consciente molda seu destino"
    }
  ];

  const conquistasCompletas = conquistas.filter(c => c.isCompleted);
  const totalXP = conquistasCompletas.reduce((sum, c) => sum + c.xp, 0);
  const userLevel = Math.floor(totalXP / 500) + 1;
  const nextLevelXP = userLevel * 500;
  const currentLevelProgress = ((totalXP % 500) / 500) * 100;

  const getNivelColor = (nivel: string) => {
    const cores = {
      "Bronze": "text-orange-600 bg-orange-100",
      "Prata": "text-gray-600 bg-gray-100", 
      "Ouro": "text-yellow-600 bg-yellow-100",
      "Platina": "text-purple-600 bg-purple-100",
      "Diamante": "text-blue-600 bg-blue-100"
    };
    return cores[nivel as keyof typeof cores] || "text-gray-600 bg-gray-100";
  };

  const proximaConquista = conquistas.find(c => !c.isCompleted && c.progress > 50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🏆 Sistema de Conquistas</h1>
          <p className="text-gray-600">Celebre cada passo da sua jornada financeira</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-xl">Nível {userLevel}</span>
          </div>
          <p className="text-sm text-gray-600">{totalXP} XP total</p>
        </div>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nível Atual</p>
                <p className="text-2xl font-bold text-yellow-600">{userLevel}</p>
                <div className="mt-2">
                  <Progress value={currentLevelProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {totalXP % 500}/500 XP para o próximo nível
                  </p>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conquistas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {conquistasCompletas.length}/{conquistas.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((conquistasCompletas.length / conquistas.length) * 100)}% completo
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">XP Total</p>
                <p className="text-2xl font-bold text-blue-600">{totalXP}</p>
                <p className="text-xs text-gray-500 mt-1">Pontos de experiência</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próxima Conquista</p>
                <p className="text-sm font-bold text-green-600">
                  {proximaConquista?.title || "Mestre da Poupança"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(proximaConquista?.progress || 75)}% completo
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conquistas.map((conquista) => (
          <Card key={conquista.id} className={`transition-all duration-300 hover:shadow-lg ${
            conquista.isCompleted 
              ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
              : 'hover:bg-gray-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`text-3xl ${conquista.isCompleted ? 'filter-none' : 'grayscale opacity-50'}`}>
                    {conquista.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${conquista.isCompleted ? 'text-yellow-800' : 'text-gray-900'}`}>
                      {conquista.title}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className={getNivelColor(conquista.nivel)}>
                        {conquista.nivel}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {conquista.categoria}
                      </Badge>
                    </div>
                  </div>
                </div>
                {conquista.isCompleted && (
                  <div className="flex items-center gap-1">
                    <Medal className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">{conquista.xp} XP</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{conquista.description}</p>
              
              {conquista.isCompleted && (
                <div className="bg-yellow-100 p-3 rounded-lg mb-4">
                  <p className="text-sm italic text-yellow-800">"{conquista.frase}"</p>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Progresso</span>
                  <span className="text-sm text-gray-600">{Math.round(conquista.progress)}%</span>
                </div>
                <Progress 
                  value={conquista.progress} 
                  className={`h-2 ${conquista.isCompleted ? 'bg-yellow-100' : ''}`}
                />
                {conquista.isCompleted && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-yellow-700">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">Conquista desbloqueada!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}