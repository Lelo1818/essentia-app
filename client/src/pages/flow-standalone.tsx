import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser } from "@/data/mock-users";
import { formatCurrency } from "@/lib/financial-utils";
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Trophy,
  Star
} from "lucide-react";

export default function FlowStandalone() {
  const currentUser = getCurrentUser();

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const { data: expenses } = useQuery({
    queryKey: ['/api/expenses'],
  });

  const balance = summary ? summary.totalIncome - summary.totalExpenses : 0;
  const savingsRate = summary ? ((balance / summary.totalIncome) * 100) : 0;

  const achievements = [
    { title: "Primeira Meta Atingida", description: "Parabéns! Você alcançou sua primeira meta financeira", icon: Trophy, color: "text-yellow-500" },
    { title: "Poupador Consistente", description: "30 dias seguidos economizando", icon: PiggyBank, color: "text-green-500" },
    { title: "Investidor Inteligente", description: "Diversificação de carteira", icon: TrendingUp, color: "text-blue-500" }
  ];

  const recentTransactions = expenses?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Flow */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Flow Financial
                </h1>
                <p className="text-sm text-gray-500">Sistema Inteligente de Gestão Financeira</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
              <UserAvatar user={currentUser} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(summary?.totalIncome || 0)}
              </div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(summary?.totalExpenses || 0)}
              </div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <TrendingDown className="w-3 h-3 mr-1" />
                -3.1% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saldo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(balance)}
              </div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <PiggyBank className="w-3 h-3 mr-1" />
                Taxa poupança: {savingsRate.toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Investimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(42750)}
              </div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.8% rentabilidade
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conquistas Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <p className="text-sm text-gray-600">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-red-600">
                      -{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}