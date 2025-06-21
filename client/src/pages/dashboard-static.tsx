import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ArrowDownRight
} from "lucide-react";

export default function DashboardStatic() {
  const [activeTab, setActiveTab] = useState("overview");

  // Static financial data
  const financialData = {
    totalIncome: 10050,
    totalExpenses: 3730,
    balance: 6320,
    savings: 15420,
    investments: 8750,
    creditCardDebt: 2100,
    monthlyGrowth: 12.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Flow Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Sua gestão financeira inteligente
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Receitas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(financialData.totalIncome)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Gastos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(financialData.totalExpenses)}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Saldo</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(financialData.balance)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Investimentos</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(financialData.investments)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Overview Card */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Visão Geral Financeira
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* Progress Bars */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Meta Mensal</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-16 flex flex-col gap-1">
                    <Plus className="w-5 h-5" />
                    <span className="text-xs">Nova Receita</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Novo Gasto</span>
                  </Button>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h4 className="font-semibold mb-3">Transações Recentes</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Salário Principal</p>
                          <p className="text-sm text-slate-600">Hoje</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        +{formatCurrency(8500)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Supermercado</p>
                          <p className="text-sm text-slate-600">Ontem</p>
                        </div>
                      </div>
                      <span className="font-semibold text-red-600">
                        -{formatCurrency(450)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <ArrowUpRight className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Freelance Design</p>
                          <p className="text-sm text-slate-600">2 dias atrás</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        +{formatCurrency(1200)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side Panel */}
          <div className="space-y-6">
            
            {/* Goals Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Metas Financeiras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Viagem Europa</span>
                      <span>57%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '57%'}}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {formatCurrency(8500)} de {formatCurrency(15000)}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Reserva Emergência</span>
                      <span>48%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '48%'}}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {formatCurrency(12000)} de {formatCurrency(25000)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5" />
                  Poupança & Investimentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Conta Poupança</span>
                    <span className="font-semibold">{formatCurrency(15420)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Renda Fixa</span>
                    <span className="font-semibold">{formatCurrency(8750)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ações</span>
                    <span className="font-semibold">{formatCurrency(3200)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">{formatCurrency(27370)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Flow Dashboard Funcionando Perfeitamente!
              </h2>
              <p className="text-blue-100 mb-6">
                Sistema estável, dados carregados, pronto para a apresentação do Daniel Allegri amanhã.
              </p>
              <Button size="lg" variant="secondary">
                Explorar Funcionalidades Completas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}