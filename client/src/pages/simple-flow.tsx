import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Shield, 
  Receipt, 
  Plane,
  PlusCircle,
  Target,
  BarChart3,
  Home
} from "lucide-react";

export default function SimpleFlow() {
  const mockData = {
    balance: 12450.80,
    income: 8500.00,
    expenses: 6200.00,
    cards: 3,
    insurance: 4,
    miles: 73980
  };

  const quickActions = [
    { icon: PlusCircle, label: "Adicionar Gasto", color: "bg-red-500" },
    { icon: TrendingUp, label: "Nova Receita", color: "bg-green-500" },
    { icon: Target, label: "Criar Meta", color: "bg-blue-500" },
    { icon: BarChart3, label: "Ver Relatório", color: "bg-purple-500" }
  ];

  const financialCards = [
    {
      title: "Cartões",
      value: "R$ 90.000",
      subtitle: "Limite total",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
      route: "/flow/cartoes"
    },
    {
      title: "Seguros",
      value: "R$ 1.530K",
      subtitle: "Cobertura total",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      route: "/flow/seguros"
    },
    {
      title: "Impostos",
      value: "R$ 45.680",
      subtitle: "Pago em 2024",
      icon: Receipt,
      color: "from-green-500 to-emerald-500",
      route: "/flow/impostos"
    },
    {
      title: "Milhas",
      value: "73.980",
      subtitle: "Total acumulado",
      icon: Plane,
      color: "from-orange-500 to-yellow-500",
      route: "/flow/milhas"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Flow</h1>
              <p className="text-sm text-gray-600">Gestão Financeira</p>
            </div>
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Balance Card */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-blue-100 mb-2">Saldo Total</p>
            <h2 className="text-4xl font-bold mb-4">
              R$ {mockData.balance.toLocaleString()}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Receitas</p>
                <p className="text-xl font-semibold text-green-200">
                  +R$ {mockData.income.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Gastos</p>
                <p className="text-xl font-semibold text-red-200">
                  -R$ {mockData.expenses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-16 flex-col gap-2"
              >
                <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Financial Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Meus Produtos Financeiros</h3>
        {financialCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link key={index} href={card.route}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{card.title}</h4>
                        <p className="text-sm text-gray-600">{card.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{card.value}</p>
                      <Badge variant="outline" className="mt-1">Ver mais</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Progress Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Meta do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Economia de R$ 2.000</span>
              <span className="font-medium">78%</span>
            </div>
            <Progress value={78} className="h-3" />
            <p className="text-sm text-gray-600">
              Faltam R$ 440 para atingir sua meta
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}