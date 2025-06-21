import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";

export default function CashFlowAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [viewType, setViewType] = useState("detailed");

  // Comprehensive cash flow data
  const cashFlowData = {
    "6months": {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      inflows: {
        salary: [4500, 4500, 4500, 4750, 4750, 4950],
        freelance: [800, 1200, 600, 900, 1100, 1400],
        investments: [200, 180, 220, 340, 280, 450],
        others: [150, 80, 200, 120, 160, 200]
      },
      outflows: {
        housing: [1800, 1800, 1800, 1850, 1850, 1850],
        food: [600, 580, 650, 620, 590, 640],
        transport: [350, 400, 320, 380, 360, 400],
        utilities: [280, 320, 290, 300, 310, 295],
        entertainment: [200, 350, 180, 250, 300, 220],
        healthcare: [150, 120, 200, 180, 160, 140],
        others: [420, 380, 460, 390, 430, 455]
      }
    }
  };

  const currentData = cashFlowData[selectedPeriod];
  
  // Calculate totals
  const totalInflows = currentData.labels.map((_, index) => 
    Object.values(currentData.inflows).reduce((sum, flow) => sum + flow[index], 0)
  );
  
  const totalOutflows = currentData.labels.map((_, index) => 
    Object.values(currentData.outflows).reduce((sum, flow) => sum + flow[index], 0)
  );
  
  const netFlow = totalInflows.map((inflow, index) => inflow - totalOutflows[index]);

  // Chart configurations
  const flowChartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Entradas',
        data: totalInflows,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Saídas',
        data: totalOutflows,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Fluxo Líquido',
        data: netFlow,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const detailedInflowData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Salário',
        data: currentData.inflows.salary,
        backgroundColor: '#10B981',
      },
      {
        label: 'Freelance',
        data: currentData.inflows.freelance,
        backgroundColor: '#06B6D4',
      },
      {
        label: 'Investimentos',
        data: currentData.inflows.investments,
        backgroundColor: '#8B5CF6',
      },
      {
        label: 'Outros',
        data: currentData.inflows.others,
        backgroundColor: '#F59E0B',
      }
    ]
  };

  const detailedOutflowData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Moradia',
        data: currentData.outflows.housing,
        backgroundColor: '#EF4444',
      },
      {
        label: 'Alimentação',
        data: currentData.outflows.food,
        backgroundColor: '#F97316',
      },
      {
        label: 'Transporte',
        data: currentData.outflows.transport,
        backgroundColor: '#EAB308',
      },
      {
        label: 'Utilidades',
        data: currentData.outflows.utilities,
        backgroundColor: '#84CC16',
      },
      {
        label: 'Lazer',
        data: currentData.outflows.entertainment,
        backgroundColor: '#06B6D4',
      },
      {
        label: 'Saúde',
        data: currentData.outflows.healthcare,
        backgroundColor: '#8B5CF6',
      },
      {
        label: 'Outros',
        data: currentData.outflows.others,
        backgroundColor: '#EC4899',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
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

  // Calculate insights
  const currentMonth = currentData.labels.length - 1;
  const currentInflow = totalInflows[currentMonth];
  const currentOutflow = totalOutflows[currentMonth];
  const currentNet = netFlow[currentMonth];
  const previousNet = netFlow[currentMonth - 1] || 0;
  const netChangePercentage = previousNet !== 0 ? ((currentNet - previousNet) / Math.abs(previousNet) * 100) : 0;

  const avgInflowGrowth = totalInflows.length > 1 ? 
    ((totalInflows[currentMonth] - totalInflows[0]) / totalInflows[0] * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            💰 Análise de Fluxo de Caixa
          </h2>
          <p className="text-muted-foreground">
            Visualize e analise o movimento completo de entrada e saída de recursos
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Meses</SelectItem>
              <SelectItem value="12months">12 Meses</SelectItem>
              <SelectItem value="24months">24 Meses</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detailed">Detalhado</SelectItem>
              <SelectItem value="summary">Resumo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas Totais</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              R$ {currentInflow.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              {avgInflowGrowth > 0 ? '+' : ''}{avgInflowGrowth.toFixed(1)}% vs início do período
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas Totais</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              R$ {currentOutflow.toLocaleString()}
            </div>
            <p className="text-xs text-red-600">
              {((currentOutflow / currentInflow) * 100).toFixed(1)}% das entradas
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fluxo Líquido</CardTitle>
            {currentNet >= 0 ? 
              <TrendingUp className="h-4 w-4 text-purple-600" /> : 
              <TrendingDown className="h-4 w-4 text-purple-600" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${currentNet >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
              R$ {currentNet.toLocaleString()}
            </div>
            <p className={`text-xs ${netChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netChangePercentage >= 0 ? '+' : ''}{netChangePercentage.toFixed(1)}% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Poupança</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {((currentNet / currentInflow) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-blue-600">
              Meta recomendada: 20%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Fluxo de Caixa Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line data={flowChartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {viewType === "detailed" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Detailed Inflows */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
                Detalhamento das Entradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Bar data={detailedInflowData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Detailed Outflows */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5 text-red-600" />
                Detalhamento das Saídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Bar data={detailedOutflowData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cash Flow Insights */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Insights do Fluxo de Caixa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentNet > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Fluxo Positivo</span>
                </div>
                <p className="text-sm text-green-700">
                  Você teve superávit de R$ {currentNet.toLocaleString()} este mês
                </p>
              </div>
            )}

            {((currentNet / currentInflow) * 100) >= 20 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Meta Atingida</span>
                </div>
                <p className="text-sm text-blue-700">
                  Taxa de poupança acima da meta recomendada de 20%
                </p>
              </div>
            )}

            {avgInflowGrowth > 5 && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Crescimento</span>
                </div>
                <p className="text-sm text-purple-700">
                  Suas entradas cresceram {avgInflowGrowth.toFixed(1)}% no período
                </p>
              </div>
            )}

            {((currentOutflow / currentInflow) * 100) > 80 && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Atenção</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Gastos representam mais de 80% da renda
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}