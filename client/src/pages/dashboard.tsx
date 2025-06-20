import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import WelcomeHeader from "@/components/dashboard/welcome-header";
import QuickActions from "@/components/dashboard/quick-actions";
import FinancialOverview from "@/components/dashboard/financial-overview";
import ExpenseCategories from "@/components/dashboard/expense-categories";
import DebtOptimization from "@/components/dashboard/debt-optimization";
import PersonalizedSuggestions from "@/components/dashboard/personalized-suggestions";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import IncomeModal from "@/components/modals/income-modal";
import ExpenseCameraModal from "@/components/modals/expense-camera-modal";
import PlanningModal from "@/components/modals/planning-modal";
import GoalsModal from "@/components/modals/goals-modal";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartLoading } from "@/components/ui/smart-loading";
import { formatCurrency, calculateGoalProgress } from "@/lib/financial-utils";
import { AIAssistant } from "@/components/enhanced/ai-assistant";
import { GamificationSystem } from "@/components/enhanced/gamification-system";
import { PredictiveDashboard } from "@/components/enhanced/predictive-dashboard";
import { useKeyboardShortcuts, FINANCIAL_SHORTCUTS } from "@/hooks/useKeyboardShortcuts";
import { Trophy, Medal, Target, TrendingUp, Zap } from "lucide-react";
import type { FinancialSummary } from "@/types";

export default function Dashboard() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [planningModalOpen, setPlanningModalOpen] = useState(false);
  const [goalsModalOpen, setGoalsModalOpen] = useState(false);

  // Enhanced keyboard shortcuts with modal controls
  const shortcuts = FINANCIAL_SHORTCUTS.map(shortcut => ({
    ...shortcut,
    callback: shortcut.key === 'r' && shortcut.ctrl ? () => setIncomeModalOpen(true) :
              shortcut.key === 'e' && shortcut.ctrl ? () => setExpenseModalOpen(true) :
              shortcut.key === 'g' && shortcut.ctrl ? () => setGoalsModalOpen(true) :
              shortcut.callback
  }));

  useKeyboardShortcuts(shortcuts);

  const { data: summary, isLoading } = useQuery<FinancialSummary>({
    queryKey: ["/api/financial-summary"],
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ["/api/achievements"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <SmartLoading type="financial" />
      </div>
    );
  }

  const totalIncome = summary?.totalIncome || 0;
  const totalExpenses = summary?.totalExpenses || 0;
  const balance = summary?.balance || 0;
  const expensesByCategory = summary?.expensesByCategory || {};
  const debts = summary?.debts || [];
  const recentTransactions = summary?.recentTransactions || [];

  // Calculate user progress (mock calculation)
  const progress = Math.min((totalIncome > 0 ? (balance / totalIncome) * 100 : 0) + 25, 100);

  // Mock gamification data
  const userLevel = {
    current: 3,
    xp: 1250,
    xpToNext: 750,
    title: "Investidor Consciente",
    perks: [
      "Análises avançadas desbloqueadas",
      "Consultor IA personalizado",
      "Alertas inteligentes de economia",
      "Acesso a investimentos premium"
    ]
  };

  const mockAchievements = [
    {
      id: "1",
      title: "Primeiro Orçamento",
      description: "Criou seu primeiro planejamento mensal",
      icon: Target,
      category: "financial" as const,
      rarity: "common" as const,
      progress: 1,
      maxProgress: 1,
      reward: { xp: 100 },
      unlocked: true,
      dateUnlocked: new Date()
    },
    {
      id: "2", 
      title: "Poupador Disciplinado",
      description: "Economize por 3 meses consecutivos",
      icon: TrendingUp,
      category: "financial" as const,
      rarity: "rare" as const,
      progress: 2,
      maxProgress: 3,
      reward: { xp: 250 },
      unlocked: false
    }
  ];

  const mockQuests = [
    {
      id: "1",
      title: "Revisar Gastos da Semana",
      description: "Analise e categorize todos os gastos dos últimos 7 dias",
      category: "financial",
      difficulty: "easy" as const,
      reward: { xp: 50, coins: 10 },
      progress: 5,
      maxProgress: 7,
      completed: false
    }
  ];

  return (
    <>
      <WelcomeHeader userName="Maria" level={3} progress={progress} />
      
      <QuickActions
        onOpenIncomeModal={() => setIncomeModalOpen(true)}
        onOpenExpenseModal={() => setExpenseModalOpen(true)}
        onOpenPlanningModal={() => setPlanningModalOpen(true)}
        onOpenGoalsModal={() => setGoalsModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <FinancialOverview
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />
        
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Metas Próximas</CardTitle>
            </CardHeader>
            <CardContent>
              {goals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhuma meta definida ainda.</p>
                  <p className="text-sm mt-2">Crie suas primeiras metas financeiras!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {goals.slice(0, 3).map((goal: any) => {
                    const { percentage, remaining } = calculateGoalProgress(goal);
                    return (
                      <div key={goal.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{goal.name}</span>
                          <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatCurrency(parseFloat(goal.currentAmount))}</span>
                          <span>{formatCurrency(parseFloat(goal.targetAmount))}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Conquistas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {achievements.length === 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Primeiro Passo</div>
                      <div className="text-sm text-gray-500">Começou a usar o Flow</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Medal className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Organizador Iniciante</div>
                      <div className="text-sm text-gray-500">Pronto para organizar suas finanças</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {achievements.slice(0, 2).map((achievement: any) => (
                    <div key={achievement.id} className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <i className={achievement.icon || "fas fa-trophy"}></i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{achievement.name}</div>
                        <div className="text-sm text-gray-500">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ExpenseCategories
          expensesByCategory={expensesByCategory}
          totalExpenses={totalExpenses}
        />
        <DebtOptimization debts={debts} />
      </div>

      <PersonalizedSuggestions />

      <RecentTransactions transactions={recentTransactions} />

      <div className="grid grid-cols-1 gap-8 mb-8">
        <PredictiveDashboard 
          context="financial" 
          userData={summary} 
        />
        
        <GamificationSystem
          context="financial"
          userLevel={userLevel}
          achievements={mockAchievements}
          quests={mockQuests}
        />
      </div>

      <IncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
      <ExpenseCameraModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
      <PlanningModal open={planningModalOpen} onOpenChange={setPlanningModalOpen} />
      <GoalsModal open={goalsModalOpen} onOpenChange={setGoalsModalOpen} />
      
      <AIAssistant 
        context="financial" 
        userData={summary}
        onAction={(action, data) => {
          console.log("AI Action:", action, data);
        }}
      />
    </>
  );
}
