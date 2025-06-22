import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppLogo, AppName } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser } from "@/data/mock-users";
import { mockEduData } from "@/data/mock-edu-data";
import { mockPurposeData } from "@/data/mock-purpose-data";
import WelcomeHeader from "@/components/dashboard/welcome-header";

import FinancialOverview from "@/components/dashboard/financial-overview";
import FinancialCards from "@/components/dashboard/financial-cards";
import ExpenseCategories from "@/components/dashboard/expense-categories";
import DebtOptimization from "@/components/dashboard/debt-optimization";
import PersonalizedSuggestions from "@/components/dashboard/personalized-suggestions";
import AdvancedAnalytics from "@/components/flow/advanced-analytics";
import CashFlowAnalysis from "@/components/flow/cash-flow-analysis";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import TravelGoalsIntegration from "@/components/dashboard/travel-goals-integration";
import CryptoTracker from "@/components/future-features/crypto-tracker";
import SocialGoals from "@/components/future-features/social-goals";
import InvestmentSuggestions from "@/components/future-features/investment-suggestions";
import AICoach from "@/components/future-features/ai-coach";
import NFTPreview from "@/components/dashboard/nft-preview";
import MoodAnalyzer from "@/components/mood/mood-analyzer";
import CashbackMarketplace from "@/components/cashback/marketplace";
import IncomeModal from "@/components/modals/income-modal";
import ExpenseCameraModal from "@/components/modals/expense-camera-modal";
import PlanningModal from "@/components/modals/planning-modal";
import GoalsModal from "@/components/modals/goals-modal";
import InvestmentOverview from "@/components/dashboard/investment-overview";
import SmartNotifications from "@/components/dashboard/smart-notifications";
import FinancialHealthScore from "@/components/dashboard/financial-health-score";
import PredictiveInsights from "@/components/dashboard/predictive-insights";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartLoading } from "@/components/ui/smart-loading";
import { formatCurrency, calculateGoalProgress } from "@/lib/financial-utils";
import { AIAssistant } from "@/components/enhanced/ai-assistant";
import { GamificationSystem } from "@/components/enhanced/gamification-system";
import { PredictiveDashboard } from "@/components/enhanced/predictive-dashboard";
import EcosystemStats from "@/components/dashboard/ecosystem-stats";
import AppShowcase from "@/components/ecosystem/app-showcase";
import { useKeyboardShortcuts, FINANCIAL_SHORTCUTS } from "@/hooks/useKeyboardShortcuts";
import { Trophy, Medal, Target, TrendingUp, Zap, Calendar, Calculator, DollarSign, Camera } from "lucide-react";
import ActionButtons from "@/components/dashboard/action-buttons";
import type { FinancialSummary } from "@/types";

export default function Dashboard() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [planningModalOpen, setPlanningModalOpen] = useState(false);
  const [goalsModalOpen, setGoalsModalOpen] = useState(false);
  const currentUser = getCurrentUser();

  // Enhanced keyboard shortcuts with modal controls
  const shortcuts = FINANCIAL_SHORTCUTS.map(shortcut => ({
    ...shortcut,
    callback: shortcut.key === 'r' && shortcut.ctrl ? () => setIncomeModalOpen(true) :
              shortcut.key === 'e' && shortcut.ctrl ? () => setExpenseModalOpen(true) :
              shortcut.key === 'g' && shortcut.ctrl ? () => setGoalsModalOpen(true) :
              shortcut.callback
  }));

  useKeyboardShortcuts(shortcuts);

  // Static data for stable demo
  const summary = {
    totalIncome: 10050,
    totalExpenses: 3730,
    balance: 6320,
    savings: 15420,
    investments: 8750
  };
  
  const goals = [
    { id: 1, title: "Viagem Europa", progress: 57, target: 15000, current: 8500 },
    { id: 2, title: "Reserva Emergência", progress: 48, target: 25000, current: 12000 }
  ];
  
  const achievements = [
    { id: 1, title: "Primeiro Login", description: "Bem-vindo ao Flow!" },
    { id: 2, title: "Meta Alcançada", description: "Parabéns pela disciplina!" }
  ];
  
  const isLoading = false;

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
    <div className="min-h-screen bg-gray-50 p-6">
      <AppShowcase />
      
      <WelcomeHeader userName={currentUser.name.split(' ')[0]} level={3} progress={progress} />
      
      {/* ✨ SEÇÃO PRINCIPAL DE FERRAMENTAS ✨ */}
      <div style={{
        backgroundColor: '#f8fafc', 
        padding: '32px', 
        borderRadius: '16px', 
        marginBottom: '32px',
        border: '2px solid #e2e8f0'
      }}>
        <h2 style={{
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1e293b', 
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          ⚡ Ferramentas de Alto Impacto
        </h2>
        <p style={{
          textAlign: 'center', 
          color: '#64748b', 
          marginBottom: '32px',
          fontSize: '16px'
        }}>
          Acesse as funcionalidades mais poderosas do seu ecossistema financeiro
        </p>
        
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px'
        }}>
          
          <div
            onClick={() => {
              console.log('🔵 DASHBOARD → AGENDAR PAGAMENTOS');
              window.location.href = '/agendar-pagamentos';
            }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              color: 'white',
              padding: '24px',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >
            <Calendar style={{width: '40px', height: '40px', margin: '0 auto 16px'}} />
            <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px'}}>
              📅 Agendar Pagamentos
            </h3>
            <p style={{fontSize: '14px', margin: '0', opacity: '0.9'}}>
              Organize e controle todas suas contas
            </p>
          </div>

          <div
            onClick={() => {
              console.log('🟣 DASHBOARD → SIMULAR CENÁRIOS');
              window.location.href = '/simular-cenarios';
            }}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '24px',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Calculator style={{width: '40px', height: '40px', margin: '0 auto 16px'}} />
            <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px'}}>
              📊 Simular Cenários
            </h3>
            <p style={{fontSize: '14px', margin: '0', opacity: '0.9'}}>
              Projete diferentes situações financeiras
            </p>
          </div>

          <div
            onClick={() => {
              console.log('🟢 DASHBOARD → RENEGOCIAR DÍVIDAS');
              window.location.href = '/renegociar-dividas';
            }}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '24px',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            }}
          >
            <DollarSign style={{width: '40px', height: '40px', margin: '0 auto 16px'}} />
            <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px'}}>
              💰 Renegociar Dívidas
            </h3>
            <p style={{fontSize: '14px', margin: '0', opacity: '0.9'}}>
              Estratégias inteligentes para quitar
            </p>
          </div>
        </div>
      </div>

      <ActionButtons />

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

      <AdvancedAnalytics />

      <CashFlowAnalysis />

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
    </div>
  );
}
