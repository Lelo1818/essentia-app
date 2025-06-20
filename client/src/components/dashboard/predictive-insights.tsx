import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Calendar,
  DollarSign,
  Lightbulb,
  Zap,
  ArrowRight
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function PredictiveInsights() {
  const predictions = [
    {
      type: "expense_forecast",
      title: "Previsão de Gastos - Junho",
      confidence: 92,
      prediction: {
        amount: 4150,
        variance: 180,
        categories: [
          { name: "Alimentação", predicted: 920, trend: "up" },
          { name: "Transporte", predicted: 310, trend: "stable" },
          { name: "Lazer", predicted: 580, trend: "up" }
        ]
      },
      insights: [
        "Gastos tendem a aumentar 8% devido ao feriado prolongado",
        "Restaurantes: alta probabilidade de gastos extras",
        "Viagem planejada impactará categoria lazer"
      ],
      action: "Ajustar orçamento preventivamente"
    },
    {
      type: "savings_opportunity",
      title: "Oportunidade de Economia",
      confidence: 87,
      prediction: {
        amount: 650,
        timeframe: "próximos 30 dias",
        method: "Otimização de assinaturas"
      },
      insights: [
        "3 assinaturas não utilizadas nos últimos 60 dias",
        "Plano celular pode ser reduzido em 40%",
        "Cashback perdido: R$ 180 este mês"
      ],
      action: "Revisar assinaturas agora"
    },
    {
      type: "investment_timing",
      title: "Timing de Investimento",
      confidence: 79,
      prediction: {
        amount: 2800,
        asset: "Tesouro IPCA+ 2029",
        expectedReturn: 6.8,
        reason: "Taxa atrativa antes da próxima reunião do COPOM"
      },
      insights: [
        "Juros podem subir nas próximas 2 semanas",
        "Oportunidade de lock-in em taxa atual",
        "Alocação recomendada: 25% do valor disponível"
      ],
      action: "Investir nos próximos 5 dias"
    },
    {
      type: "goal_achievement",
      title: "Alcance de Meta - Casa Própria",
      confidence: 94,
      prediction: {
        goal: "Entrada da casa",
        currentAmount: 128450,
        targetAmount: 150000,
        daysToGoal: 142,
        monthlyContribution: 2500
      },
      insights: [
        "No ritmo atual, meta será alcançada em 4.7 meses",
        "Aumento de 15% nos aportes anteciparia em 1 mês",
        "Rendimento do portfolio está alinhado"
      ],
      action: "Manter estratégia atual"
    }
  ];

  const marketInsights = [
    {
      title: "Selic em Alta",
      impact: "Positivo para Renda Fixa",
      probability: 85,
      timeframe: "Próximos 30 dias",
      description: "COPOM deve subir juros para 11.25%"
    },
    {
      title: "Dólar Volátil",
      impact: "Neutro para Portfolio",
      probability: 72,
      timeframe: "Próximas 2 semanas", 
      description: "Eleições americanas geram incerteza"
    },
    {
      title: "Bolsa em Correção",
      impact: "Oportunidade de Compra",
      probability: 68,
      timeframe: "Próximos 15 dias",
      description: "Ações brasileiras com desconto"
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100";
    if (confidence >= 75) return "text-blue-600 bg-blue-100";
    if (confidence >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "expense_forecast": return Calendar;
      case "savings_opportunity": return DollarSign;
      case "investment_timing": return TrendingUp;
      case "goal_achievement": return Target;
      default: return Brain;
    }
  };

  const getImpactColor = (impact: string) => {
    if (impact.includes("Positivo")) return "text-green-600";
    if (impact.includes("Oportunidade")) return "text-blue-600";
    if (impact.includes("Neutro")) return "text-gray-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      {/* AI Predictions */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            Insights Preditivos IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictions.map((prediction, index) => {
              const IconComponent = getTypeIcon(prediction.type);
              
              return (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{prediction.title}</h4>
                        <Badge className={`text-xs ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}% confiança
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {prediction.type === "expense_forecast" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(prediction.prediction.amount)}
                          </div>
                          <div className="text-sm text-gray-600">
                            ±{formatCurrency(prediction.prediction.variance)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {prediction.prediction.categories.map((cat, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span>{cat.name}:</span>
                              <span className="font-medium">{formatCurrency(cat.predicted)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {prediction.type === "savings_opportunity" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(prediction.prediction.amount)}
                        </div>
                        <div className="text-sm text-gray-600">economia potencial</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-700">
                          {prediction.prediction.timeframe}
                        </div>
                        <div className="text-sm text-gray-600">{prediction.prediction.method}</div>
                      </div>
                    </div>
                  )}

                  {prediction.type === "investment_timing" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(prediction.prediction.amount)}
                        </div>
                        <div className="text-sm text-gray-600">valor recomendado</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-700">
                          {prediction.prediction.expectedReturn}% a.a.
                        </div>
                        <div className="text-sm text-gray-600">{prediction.prediction.asset}</div>
                      </div>
                    </div>
                  )}

                  {prediction.type === "goal_achievement" && (
                    <div className="space-y-3">
                      <Progress 
                        value={(prediction.prediction.currentAmount / prediction.prediction.targetAmount) * 100} 
                        className="h-3" 
                      />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-700">{prediction.prediction.daysToGoal}</div>
                          <div className="text-xs text-gray-500">dias restantes</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {formatCurrency(prediction.prediction.monthlyContribution)}
                          </div>
                          <div className="text-xs text-gray-500">aporte mensal</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">85.6%</div>
                          <div className="text-xs text-gray-500">concluído</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    <h6 className="font-medium text-gray-700 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-1 text-yellow-500" />
                      Insights:
                    </h6>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {prediction.insights.map((insight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button size="sm" className="mt-4 w-full" variant="outline">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    {prediction.action}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Market Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Inteligência de Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-800">{insight.title}</h5>
                  <Badge variant="secondary" className="text-xs">
                    {insight.probability}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                    {insight.impact}
                  </span>
                  <span className="text-xs text-gray-500">{insight.timeframe}</span>
                </div>
                
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-700">
              <strong>Recomendação da IA:</strong> Mantenha 60% em renda fixa, aproveite volatilidade para aportes adicionais em ações, monitore decisões do COPOM.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}