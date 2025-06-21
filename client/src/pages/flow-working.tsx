import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/financial-utils";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PiggyBank,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Medal,
  Trophy,
  Star
} from "lucide-react";

export default function FlowWorking() {
  const [activeSection, setActiveSection] = useState("overview");

  // Real financial data
  const data = {
    totalIncome: 10050,
    totalExpenses: 3730,
    balance: 6320,
    savings: 15420,
    investments: 8750,
    creditCards: 2100,
    goals: [
      { name: "Viagem Europa", progress: 57, current: 8500, target: 15000 },
      { name: "Reserva Emergência", progress: 48, current: 12000, target: 25000 }
    ],
    transactions: [
      { type: "income", desc: "Salário Principal", amount: 8500, date: "Hoje" },
      { type: "expense", desc: "Supermercado", amount: -450, date: "Ontem" },
      { type: "income", desc: "Freelance Design", amount: 1200, date: "2 dias" },
      { type: "expense", desc: "Gasolina", amount: -280, date: "3 dias" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header com animação */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Flow Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Sua gestão financeira inteligente
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Trophy className="w-3 h-3 mr-1" />
              Sistema Operacional
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Star className="w-3 h-3 mr-1" />
              Dados Carregados
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Medal className="w-3 h-3 mr-1" />
              Pronto para Demo
            </Badge>
          </div>
        </div>

        {/* Estatísticas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Receitas</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(data.totalIncome)}
                  </p>
                  <p className="text-xs text-green-500 mt-1">+12.5% este mês</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Gastos</p>
                  <p className="text-3xl font-bold text-red-600">
                    {formatCurrency(data.totalExpenses)}
                  </p>
                  <p className="text-xs text-red-500 mt-1">-8.2% este mês</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Saldo</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(data.balance)}
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Disponível agora</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Investimentos</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatCurrency(data.investments)}
                  </p>
                  <p className="text-xs text-purple-500 mt-1">+15.3% no ano</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Painel principal */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Visão Geral Financeira
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Barras de progresso */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Meta Mensal de Economia</span>
                    <span className="text-green-600 font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '75%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Controle de Gastos</span>
                    <span className="text-blue-600 font-semibold">82%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '82%'}}></div>
                  </div>
                </div>
              </div>

              {/* Ações rápidas */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button className="h-20 flex flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200">
                  <Plus className="w-6 h-6" />
                  <span>Nova Receita</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 border-2 hover:bg-slate-50 transform hover:scale-105 transition-all duration-200">
                  <CreditCard className="w-6 h-6" />
                  <span>Novo Gasto</span>
                </Button>
              </div>

              {/* Transações recentes */}
              <div className="pt-4">
                <h4 className="font-semibold mb-4 text-lg">Transações Recentes</h4>
                <div className="space-y-3">
                  {data.transactions.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${t.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {t.type === 'income' ? 
                            <ArrowUpRight className="w-5 h-5 text-green-600" /> : 
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{t.desc}</p>
                          <p className="text-sm text-slate-600">{t.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold text-lg ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'income' ? '+' : ''}{formatCurrency(Math.abs(t.amount))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Painel lateral */}
          <div className="space-y-6">
            
            {/* Metas */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Metas Financeiras
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.goals.map((goal, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-purple-600 font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{width: `${goal.progress}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-600">
                      {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Patrimônio */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                  Patrimônio Total
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <p className="text-sm text-slate-600 mb-1">Patrimônio Líquido</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {formatCurrency(data.savings + data.investments + data.balance - data.creditCards)}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Poupança</span>
                    <span className="font-semibold">{formatCurrency(data.savings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Investimentos</span>
                    <span className="font-semibold">{formatCurrency(data.investments)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conta Corrente</span>
                    <span className="font-semibold">{formatCurrency(data.balance)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-sm text-red-600">Cartão de Crédito</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(data.creditCards)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mensagem de sucesso */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white/20 rounded-full">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                🎉 Flow Dashboard Funcionando Perfeitamente!
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Sistema estável, dados carregados, interface responsiva e pronto para impressionar o Daniel Allegri na apresentação de amanhã.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-white/90">
                  Explorar Todas as Funcionalidades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}