import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PieChart,
  ArrowUpRight,
  Shield,
  Clock
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { Link } from "wouter";

export default function InvestmentOverview() {
  const portfolio = {
    totalValue: 128450,
    totalInvested: 115200,
    totalGain: 13250,
    gainPercentage: 11.5,
    monthlyContribution: 2500,
    monthlyGoal: 2800,
    emergencyFund: 33705,
    emergencyFundGoal: 33705,
    lastUpdate: "Hoje, 14:32"
  };

  const allocation = [
    { type: "Renda Fixa", percentage: 57.3, color: "bg-blue-500" },
    { type: "Ações", percentage: 24.2, color: "bg-green-500" },
    { type: "FIIs", percentage: 17.8, color: "bg-purple-500" },
    { type: "Cripto", percentage: 0.7, color: "bg-orange-500" }
  ];

  const recentPerformance = [
    { period: "Hoje", value: 2.34, positive: true },
    { period: "7 dias", value: 1.87, positive: true },
    { period: "30 dias", value: 4.52, positive: true },
    { period: "Ano", value: 11.5, positive: true }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Portfólio de Investimentos
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {portfolio.lastUpdate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(portfolio.totalValue)}
              </div>
              <div className="text-sm text-gray-500">Valor Total</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">
                {formatCurrency(portfolio.totalGain)}
              </div>
              <div className="text-sm text-green-600 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +{portfolio.gainPercentage}%
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">
                {formatCurrency(portfolio.monthlyContribution)}
              </div>
              <div className="text-sm text-gray-500">Aporte Mensal</div>
              <Progress 
                value={(portfolio.monthlyContribution / portfolio.monthlyGoal) * 100} 
                className="h-2 mt-1" 
              />
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {formatCurrency(portfolio.emergencyFund)}
              </div>
              <div className="text-sm text-blue-500 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-1" />
                Reserva 100%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Alocação de Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allocation.map((asset, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{asset.type}</span>
                    <span className="text-sm text-gray-600">{asset.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${asset.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${asset.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">
                <strong>Recomendação:</strong> Sua alocação está balanceada para perfil moderado. 
                Considere aumentar gradualmente a exposição em ações.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPerformance.map((period, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{period.period}</span>
                  <div className={`flex items-center ${period.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {period.positive ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span className="font-medium">+{period.value}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/investments">
                <Button size="sm" className="w-full">
                  Ver Detalhes
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-1" />
                Novo Aporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Goals */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Target className="w-5 h-5 mr-2" />
            Metas de Investimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">R$ 500K</div>
              <div className="text-sm text-purple-500">Aposentadoria (15 anos)</div>
              <Progress value={25.7} className="h-2 mt-2" />
              <div className="text-xs text-gray-600 mt-1">25.7% alcançado</div>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">R$ 150K</div>
              <div className="text-sm text-blue-500">Casa Própria (5 anos)</div>
              <Progress value={85.6} className="h-2 mt-2" />
              <div className="text-xs text-gray-600 mt-1">85.6% alcançado</div>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">R$ 50K</div>
              <div className="text-sm text-green-500">Viagem Europa (2 anos)</div>
              <Progress value={45.2} className="h-2 mt-2" />
              <div className="text-xs text-gray-600 mt-1">45.2% alcançado</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}