import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  BarChart3,
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react";
import { Line, Doughnut, Bar } from "react-chartjs-2";

export default function AdvancedAnalytics() {
  // Advanced financial analytics data
  const analyticsData = {
    cashFlow: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      income: [4200, 4500, 4300, 4600, 4500, 4800],
      expenses: [3800, 3200, 3500, 3100, 3400, 3600],
      investments: [800, 900, 1200, 1000, 1100, 1400]
    },
    categoryBreakdown: {
      labels: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação'],
      data: [1200, 800, 1500, 600, 400, 500],
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    },
    financialHealth: {
      score: 78,
      metrics: [
        { name: 'Liquidez', value: 85, status: 'good' },
        { name: 'Endividamento', value: 45, status: 'warning' },
        { name: 'Poupança', value: 72, status: 'good' },
        { name: 'Investimentos', value: 60, status: 'average' }
      ]
    },
    projections: {
      patrimony: [50000, 55000, 61000, 68000, 76000, 85000],
      retirement: {
        currentAge: 32,
        retirementAge: 65,
        monthlyContribution: 1500,
        projectedValue: 2800000
      }
    }
  };

  const cashFlowData = {
    labels: analyticsData.cashFlow.labels,
    datasets: [
      {
        label: 'Receitas',
        data: analyticsData.cashFlow.income,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Gastos',
        data: analyticsData.cashFlow.expenses,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Investimentos',
        data: analyticsData.cashFlow.investments,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const categoryData = {
    labels: analyticsData.categoryBreakdown.labels,
    datasets: [{
      data: analyticsData.categoryBreakdown.data,
      backgroundColor: analyticsData.categoryBreakdown.colors,
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const projectionData = {
    labels: ['2024', '2025', '2026', '2027', '2028', '2029'],
    datasets: [{
      label: 'Patrimônio Projetado',
      data: analyticsData.projections.patrimony,
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          📊 Analytics Avançado
        </h2>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <BarChart3 className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="health">Saúde Financeira</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Distribuição por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut data={categoryData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Insights Rápidos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Economia</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Você economizou R$ 1.200 este mês comparado ao anterior
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Atenção</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Gastos com alimentação aumentaram 15% este mês
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Meta</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Você está 78% próximo de atingir sua meta de poupança
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Análise de Fluxo de Caixa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={cashFlowData} options={chartOptions} />
              </div>
              
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {analyticsData.cashFlow.income[analyticsData.cashFlow.income.length - 1].toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700">Receita Atual</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    R$ {analyticsData.cashFlow.expenses[analyticsData.cashFlow.expenses.length - 1].toLocaleString()}
                  </div>
                  <div className="text-sm text-red-700">Gastos Atuais</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    R$ {analyticsData.cashFlow.investments[analyticsData.cashFlow.investments.length - 1].toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700">Investimentos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Financial Health Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Score de Saúde Financeira
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-blue-600">
                      {analyticsData.financialHealth.score}
                    </div>
                  </div>
                  <Progress 
                    value={analyticsData.financialHealth.score} 
                    className="w-full h-4 transform rotate-0"
                  />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Saúde Financeira Boa
                </Badge>
              </CardContent>
            </Card>

            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas Detalhadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.financialHealth.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}</span>
                      <span className={`font-bold ${getHealthColor(metric.status)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Patrimony Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Crescimento do Patrimônio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line data={projectionData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Retirement Planning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Planejamento de Aposentadoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Idade atual:</span>
                    <span className="font-medium">{analyticsData.projections.retirement.currentAge} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Aposentadoria em:</span>
                    <span className="font-medium">{analyticsData.projections.retirement.retirementAge} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contribuição mensal:</span>
                    <span className="font-medium">R$ {analyticsData.projections.retirement.monthlyContribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-medium">Valor projetado:</span>
                    <span className="font-bold text-green-600">
                      R$ {analyticsData.projections.retirement.projectedValue.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Simular Cenários
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}