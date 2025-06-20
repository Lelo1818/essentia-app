import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Target,
  Calendar,
  DollarSign,
  Zap
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function ExpenseInsights() {
  const currentMonth = {
    total: 3822,
    budget: 4500,
    percentage: 84.9,
    daysLeft: 8,
    projectedTotal: 4200
  };

  const insights = [
    {
      type: "warning",
      title: "Gastos com Alimentação Altos",
      description: "Você gastou 23% mais em restaurantes este mês",
      category: "Alimentação",
      amount: 847,
      suggestion: "Considere cozinhar mais em casa nos próximos dias",
      impact: "Economia potencial: R$ 200/mês",
      action: "Ver Sugestões",
      trend: "up"
    },
    {
      type: "success",
      title: "Ótimo Controle de Transporte",
      description: "15% abaixo do orçamento mensal",
      category: "Transporte",
      amount: 285,
      suggestion: "Continue usando transporte público",
      impact: "Economia: R$ 50 este mês",
      action: "Manter Estratégia",
      trend: "down"
    },
    {
      type: "opportunity",
      title: "Potencial de Investimento",
      description: "Você tem R$ 678 não alocados este mês",
      category: "Sobra",
      amount: 678,
      suggestion: "Considere investir em CDB ou Tesouro",
      impact: "Rendimento potencial: R$ 54/ano",
      action: "Investir Agora",
      trend: "up"
    }
  ];

  const categoryComparison = [
    { name: "Alimentação", current: 847, budget: 650, variance: 30.3, color: "red" },
    { name: "Transporte", current: 285, budget: 350, variance: -18.6, color: "green" },
    { name: "Saúde", current: 420, budget: 400, variance: 5.0, color: "yellow" },
    { name: "Educação", current: 380, budget: 500, variance: -24.0, color: "green" },
    { name: "Lazer", current: 520, budget: 600, variance: -13.3, color: "green" }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'opportunity': return Target;
      default: return DollarSign;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-red-200 bg-red-50';
      case 'success': return 'border-green-200 bg-green-50';
      case 'opportunity': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 15) return 'text-red-600';
    if (variance > 5) return 'text-yellow-600';
    if (variance < -10) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Monthly Progress */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Progresso do Mês
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {currentMonth.daysLeft} dias restantes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentMonth.total)}
                </div>
                <div className="text-sm text-gray-600">
                  de {formatCurrency(currentMonth.budget)} orçado
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-700">
                  {currentMonth.percentage}%
                </div>
                <div className="text-sm text-gray-500">utilizado</div>
              </div>
            </div>
            
            <Progress value={currentMonth.percentage} className="h-3" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Projeção Final</div>
                <div className="font-semibold">
                  {formatCurrency(currentMonth.projectedTotal)}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-green-600">Economia Prevista</div>
                <div className="font-semibold text-green-700">
                  {formatCurrency(currentMonth.budget - currentMonth.projectedTotal)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Análise por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryComparison.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{category.name}</span>
                    <div className={`text-sm font-semibold ${getVarianceColor(category.variance)}`}>
                      {category.variance > 0 ? '+' : ''}{category.variance.toFixed(1)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatCurrency(category.current)}</span>
                    <span>orçado: {formatCurrency(category.budget)}</span>
                  </div>
                  <Progress 
                    value={(category.current / category.budget) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Insights Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const IconComponent = getInsightIcon(insight.type);
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-white/70">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{insight.title}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          {insight.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                          )}
                          <span className="font-medium">{formatCurrency(insight.amount)}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        {insight.description}
                      </p>
                      
                      <div className="bg-white/50 p-2 rounded text-xs mb-3">
                        <div className="font-medium text-gray-700">💡 {insight.suggestion}</div>
                        <div className="text-gray-600">{insight.impact}</div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="text-xs">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}