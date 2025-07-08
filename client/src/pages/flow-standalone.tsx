import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser } from "@/data/mock-users";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";
import { useInteractiveActions } from "@/hooks/useInteractiveActions";
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Trophy,
  Star,
  Plus,
  CreditCard,
  Target,
  DollarSign,
  Eye,
  Settings
} from "lucide-react";

export default function FlowStandalone() {
  const currentUser = getCurrentUser();
  const { toast } = useToast();
  const { handleFinancialAction } = useInteractiveActions();
  const [activeView, setActiveView] = useState("overview");
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense"
  });

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

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    handleFinancialAction("add-expense", Number(newTransaction.amount), newTransaction.description);
    setNewTransaction({ description: "", amount: "", category: "", type: "expense" });
    setIsAddingTransaction(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "view-goals":
        setActiveView("goals");
        toast({
          title: "Metas Financeiras",
          description: "Visualizando suas metas de economia"
        });
        break;
      case "view-investments":
        setActiveView("investments");
        toast({
          title: "Investimentos", 
          description: "Acompanhe seu portfólio de investimentos"
        });
        break;
      case "view-transactions":
        setActiveView("transactions");
        toast({
          title: "Transações",
          description: "Histórico completo de movimentações"
        });
        break;
      default:
        toast({
          title: "Funcionalidade",
          description: "Esta ação será implementada em breve"
        });
    }
  };

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

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: "overview", label: "Visão Geral", icon: Eye },
            { id: "transactions", label: "Transações", icon: CreditCard },
            { id: "goals", label: "Metas", icon: Target },
            { id: "investments", label: "Investimentos", icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeView === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-6">
        
        {/* Overview Tab */}
        {activeView === "overview" && (
          <>
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleQuickAction("view-goals")}
                  className="h-auto p-4 flex flex-col space-y-2"
                  variant="outline"
                >
                  <Target className="w-6 h-6 text-purple-600" />
                  <span className="text-sm">Ver Metas</span>
                </Button>
                <Button 
                  onClick={() => handleQuickAction("view-investments")}
                  className="h-auto p-4 flex flex-col space-y-2"
                  variant="outline"
                >
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span className="text-sm">Investimentos</span>
                </Button>
                <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
                  <DialogTrigger asChild>
                    <Button 
                      className="h-auto p-4 flex flex-col space-y-2"
                      variant="outline"
                    >
                      <Plus className="w-6 h-6 text-blue-600" />
                      <span className="text-sm">Nova Transação</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Nova Transação</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                          id="description"
                          value={newTransaction.description}
                          onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                          placeholder="Ex: Supermercado, Salário..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount">Valor (R$)</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={newTransaction.amount}
                          onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                          placeholder="0,00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alimentacao">Alimentação</SelectItem>
                            <SelectItem value="transporte">Transporte</SelectItem>
                            <SelectItem value="lazer">Lazer</SelectItem>
                            <SelectItem value="saude">Saúde</SelectItem>
                            <SelectItem value="educacao">Educação</SelectItem>
                            <SelectItem value="salario">Salário</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddTransaction} className="w-full">
                        Adicionar Transação
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  onClick={() => handleQuickAction("view-transactions")}
                  className="h-auto p-4 flex flex-col space-y-2"
                  variant="outline"
                >
                  <CreditCard className="w-6 h-6 text-orange-600" />
                  <span className="text-sm">Ver Histórico</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </>
        )}

        {/* Transactions Tab */}
        {activeView === "transactions" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Histórico de Transações</CardTitle>
              <Button onClick={() => setIsAddingTransaction(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Transação
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                      <p className="text-sm text-gray-600">{transaction.category}</p>
                    </div>
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
        )}

        {/* Goals Tab */}
        {activeView === "goals" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Metas Financeiras</h2>
              <Button onClick={() => toast({ title: "Em breve", description: "Criação de metas será implementada" })}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Meta
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, title: "Reserva Emergência", progress: 68, target: 25000, current: 17000, color: "bg-blue-500" },
                { id: 2, title: "Viagem Europa", progress: 45, target: 12000, current: 5400, color: "bg-green-500" },
                { id: 3, title: "Investimento Casa", progress: 23, target: 80000, current: 18400, color: "bg-purple-500" }
              ].map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => toast({ title: goal.title, description: `Progresso: ${goal.progress}%` })}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{goal.title}</span>
                      <Badge variant="outline">
                        {goal.progress}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${goal.color} h-2 rounded-full`} style={{ width: `${goal.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                    <Button size="sm" className="w-full" onClick={(e) => {
                      e.stopPropagation();
                      handleFinancialAction("add-goal", 500, goal.title);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar R$ 500
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Investments Tab */}
        {activeView === "investments" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Portfólio de Investimentos</h2>
              <Button onClick={() => toast({ title: "Em breve", description: "Novos investimentos disponíveis em breve" })}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Investimento
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Tesouro Selic", value: 15250, return: "+2.1%", color: "text-green-600", risk: "Baixo" },
                { name: "Fundo Imobiliário", value: 12800, return: "+5.8%", color: "text-green-600", risk: "Médio" },
                { name: "Ações Nacionais", value: 8900, return: "+12.3%", color: "text-green-600", risk: "Alto" },
                { name: "CDB Premium", value: 5800, return: "+1.8%", color: "text-green-600", risk: "Baixo" }
              ].map((investment, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => toast({ title: investment.name, description: `Rentabilidade: ${investment.return}` })}>
                  <CardHeader>
                    <CardTitle className="text-lg">{investment.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-2xl font-bold">{formatCurrency(investment.value)}</div>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${investment.color}`}>{investment.return}</span>
                      <Badge variant="outline">{investment.risk}</Badge>
                    </div>
                    <Button size="sm" className="w-full" onClick={(e) => {
                      e.stopPropagation();
                      handleFinancialAction("investment-aport", 1000, investment.name);
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Aportar R$ 1.000
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}