import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Target,
  AlertCircle,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function Investments() {
  const [portfolioView, setPortfolioView] = useState("overview");

  // Dados realistas de investimentos baseados na renda mensal de R$ 11.235
  const portfolio = {
    totalValue: 128450,
    totalInvested: 115200,
    totalGain: 13250,
    gainPercentage: 11.5,
    monthlyContribution: 2500,
    monthlyGoal: 2800, // 25% da renda líquida
    emergencyFund: 33705, // 3x gastos mensais (R$ 11.235)
    emergencyFundGoal: 33705,
    riskProfile: "Moderado",
    investmentHorizon: "Longo Prazo (10+ anos)"
  };

  const investments = [
    {
      id: 1,
      name: "Tesouro Selic 2029",
      type: "Renda Fixa",
      amount: 45000,
      invested: 42000,
      gain: 3000,
      gainPercent: 7.14,
      allocation: 35.1,
      risk: "Baixo",
      maturity: "2029-01-01",
      institution: "Tesouro Nacional",
      liquidity: "Diária"
    },
    {
      id: 2,
      name: "CDB Banco Inter 110% CDI",
      type: "Renda Fixa",
      amount: 28500,
      invested: 26000,
      gain: 2500,
      gainPercent: 9.62,
      allocation: 22.2,
      risk: "Baixo",
      maturity: "2026-08-15",
      institution: "Banco Inter",
      liquidity: "No vencimento"
    },
    {
      id: 3,
      name: "FII XP Malls",
      type: "Fundos Imobiliários",
      amount: 22800,
      invested: 20000,
      gain: 2800,
      gainPercent: 14.0,
      allocation: 17.8,
      risk: "Médio",
      maturity: "Indefinido",
      institution: "XP Investimentos",
      liquidity: "Diária",
      dividend: 0.85 // yield mensal
    },
    {
      id: 4,
      name: "Itaú Unibanco (ITUB4)",
      type: "Ações",
      amount: 18200,
      invested: 15000,
      gain: 3200,
      gainPercent: 21.33,
      allocation: 14.2,
      risk: "Alto",
      maturity: "Indefinido",
      institution: "B3",
      liquidity: "Diária"
    },
    {
      id: 5,
      name: "FIDC Kinea Crédito",
      type: "Renda Fixa", 
      amount: 32500,
      invested: 30000,
      gain: 2500,
      gainPercent: 8.33,
      allocation: 25.3,
      risk: "Baixo",
      maturity: "2026-08-15"
    },
    {
      id: 3,
      name: "IVVB11 (S&P 500)",
      type: "ETF Internacional",
      amount: 28900,
      invested: 25000,
      gain: 3900,
      gainPercent: 15.6,
      allocation: 22.5,
      risk: "Alto",
      maturity: null
    },
    {
      id: 4,
      name: "VALE3",
      type: "Ações Nacionais",
      amount: 12750,
      invested: 12000,
      gain: 750,
      gainPercent: 6.25,
      allocation: 9.9,
      risk: "Alto",
      maturity: null
    },
    {
      id: 5,
      name: "PETR4",
      type: "Ações Nacionais",
      amount: 9300,
      invested: 6200,
      gain: 3100,
      gainPercent: 50.0,
      allocation: 7.2,
      risk: "Alto",
      maturity: null
    }
  ];

  const riskAllocation = {
    "Baixo": investments.filter(i => i.risk === "Baixo").reduce((sum, i) => sum + i.allocation, 0),
    "Médio": investments.filter(i => i.risk === "Médio").reduce((sum, i) => sum + i.allocation, 0),
    "Alto": investments.filter(i => i.risk === "Alto").reduce((sum, i) => sum + i.allocation, 0)
  };

  const monthlyRecommendations = [
    {
      asset: "BOVA11 (Ibovespa)",
      type: "ETF Nacional",
      suggestedAmount: 800,
      reason: "Diversificação em mercado brasileiro",
      risk: "Médio"
    },
    {
      asset: "LCI Banco do Brasil",
      type: "Renda Fixa",
      suggestedAmount: 1200,
      reason: "Isento de IR e boa liquidez",
      risk: "Baixo"
    },
    {
      asset: "MXRF11 (FII)",
      type: "Fundo Imobiliário",
      suggestedAmount: 500,
      reason: "Renda passiva mensal",
      risk: "Médio"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo": return "bg-green-100 text-green-800";
      case "Médio": return "bg-yellow-100 text-yellow-800";
      case "Alto": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Investimentos</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Faça seu dinheiro trabalhar para você</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
              <Plus className="w-4 h-4 mr-2" />
              Novo Investimento
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Eye className="w-4 h-4 mr-2" />
              Análise
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patrimônio Total</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(portfolio.totalValue)}</p>
                </div>
                <PieChart className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Investido</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio.totalInvested)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ganho Total</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolio.totalGain)}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +{portfolio.gainPercentage}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Aporte Mensal</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(portfolio.monthlyContribution)}</p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="portfolio" 
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-600 font-medium"
            >
              Carteira
            </TabsTrigger>
            <TabsTrigger 
              value="allocation" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-green-600 font-medium"
            >
              Alocação
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600 font-medium"
            >
              Recomendações
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-purple-600 font-medium"
            >
              Análise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Investimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{investment.name}</h4>
                          <p className="text-sm text-gray-500">{investment.type}</p>
                          {investment.maturity && (
                            <p className="text-xs text-gray-400">Vencimento: {new Date(investment.maturity).toLocaleDateString()}</p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(investment.amount)}</p>
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-semibold ${investment.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {investment.gain >= 0 ? '+' : ''}{formatCurrency(investment.gain)}
                            </p>
                            <div className="flex items-center">
                              {investment.gain >= 0 ? (
                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-600" />
                              )}
                              <span className={`text-sm ${investment.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {investment.gainPercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="ml-4">
                          <Badge className={getRiskColor(investment.risk)}>
                            {investment.risk}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Alocação</span>
                          <span>{investment.allocation.toFixed(1)}%</span>
                        </div>
                        <Progress value={investment.allocation} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alocação por Risco</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Baixo Risco</span>
                        <span className="text-sm font-semibold">{riskAllocation.Baixo.toFixed(1)}%</span>
                      </div>
                      <Progress value={riskAllocation.Baixo} className="h-3 bg-green-100">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${riskAllocation.Baixo}%` }} />
                      </Progress>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Médio Risco</span>
                        <span className="text-sm font-semibold">{riskAllocation.Médio.toFixed(1)}%</span>
                      </div>
                      <Progress value={riskAllocation.Médio} className="h-3 bg-yellow-100">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${riskAllocation.Médio}%` }} />
                      </Progress>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Alto Risco</span>
                        <span className="text-sm font-semibold">{riskAllocation.Alto.toFixed(1)}%</span>
                      </div>
                      <Progress value={riskAllocation.Alto} className="h-3 bg-red-100">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${riskAllocation.Alto}%` }} />
                      </Progress>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rebalanceamento Sugerido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Alocação Ideal</h4>
                      <div className="text-sm text-blue-700">
                        <p>• Baixo Risco: 40-50%</p>
                        <p>• Médio Risco: 30-40%</p>
                        <p>• Alto Risco: 20-30%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Ação Recomendada</h4>
                          <p className="text-sm text-yellow-700">
                            Sua carteira está concentrada em renda fixa. Considere aumentar exposição a renda variável.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sugestões de Aportes - Julho 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {monthlyRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        <h4 className="font-semibold">{rec.asset}</h4>
                        <Badge className={getRiskColor(rec.risk)}>
                          {rec.risk}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Aporte sugerido</span>
                          <span className="font-semibold">{formatCurrency(rec.suggestedAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Tipo</span>
                          <span className="font-semibold">{rec.type}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-3" variant="outline">Investir Agora</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance vs CDI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Sua carteira (12 meses)</span>
                      <span className="font-bold text-green-600">+11.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CDI (12 meses)</span>
                      <span className="font-bold">+10.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>IBOVESPA (12 meses)</span>
                      <span className="font-bold text-red-600">+8.2%</span>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-green-600 font-semibold">
                        ✓ Sua carteira superou o CDI em 0.7 pontos percentuais
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projeção Patrimonial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Em 5 anos</h4>
                      <p className="text-2xl font-bold text-green-600">R$ 285.400</p>
                      <p className="text-sm text-green-600">Com aportes de R$ 2.500/mês</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Em 10 anos</h4>
                      <p className="text-2xl font-bold text-blue-600">R$ 628.950</p>
                      <p className="text-sm text-blue-600">Considerando 8% a.a.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}