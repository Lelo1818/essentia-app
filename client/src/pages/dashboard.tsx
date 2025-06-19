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
import { formatCurrency, calculateGoalProgress } from "@/lib/financial-utils";
import { Trophy, Medal } from "lucide-react";
import type { FinancialSummary } from "@/types";

export default function Dashboard() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [planningModalOpen, setPlanningModalOpen] = useState(false);
  const [goalsModalOpen, setGoalsModalOpen] = useState(false);

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando dashboard...</p>
        </div>
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

      <IncomeModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
      <ExpenseCameraModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
      <PlanningModal open={planningModalOpen} onOpenChange={setPlanningModalOpen} />
      <GoalsModal open={goalsModalOpen} onOpenChange={setGoalsModalOpen} />
    </>
  );
}
