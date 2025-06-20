import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SmartChart } from "./data-visualization";
import { AdvancedAnalytics } from "@/lib/advanced-analytics";
import { 
  TrendingUp, TrendingDown, AlertTriangle, Target, 
  Brain, Zap, Award, Calendar, DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictiveDashboardProps {
  context: "financial" | "educational" | "spiritual";
  userData: any;
  className?: string;
}

export function PredictiveDashboard({ context, userData, className }: PredictiveDashboardProps) {
  const [predictions, setPredictions] = React.useState<any>(null);
  const [healthScore, setHealthScore] = React.useState<any>(null);

  React.useEffect(() => {
    if (!userData) return;

    if (context === "financial") {
      const patterns = AdvancedAnalytics.analyzeSpendingPatterns(userData.transactions || []);
      const health = AdvancedAnalytics.calculateFinancialHealth(userData);
      const futureBalance = AdvancedAnalytics.predictFutureBalance(
        userData.balance || 0,
        userData.totalIncome || 0,
        userData.totalExpenses || 0,
        6
      );

      setPredictions({
        patterns,
        futureBalance,
        insights: AdvancedAnalytics.generatePersonalizedInsights(userData)
      });
      setHealthScore(health);
    }
  }, [userData, context]);

  if (context === "financial") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Financial Health Score */}
        {healthScore && (
          <Card className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Saúde Financeira</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{healthScore.score}</div>
                  <div className="text-2xl font-semibold text-gray-700">Nota {healthScore.grade}</div>
                </div>
                <div className="flex-1 ml-8">
                  <Progress value={healthScore.score} className="h-4 mb-2" />
                  <p className="text-sm text-gray-600">
                    {healthScore.score >= 80 ? "Excelente controle financeiro!" :
                     healthScore.score >= 60 ? "Bom progresso, continue melhorando" :
                     "Há oportunidades significativas de melhoria"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {healthScore.factors.map((factor: any, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{factor.name}</span>
                      <span className="text-gray-600">{Math.round(factor.score)}</span>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Spending Patterns & Predictions */}
        {predictions && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Padrões de Gastos Inteligentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictions.patterns.slice(0, 3).map((pattern: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-blue-400 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium capitalize">{pattern.category}</h4>
                      <Badge className={cn(
                        pattern.trend === "increasing" ? "bg-red-100 text-red-800" :
                        pattern.trend === "decreasing" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      )}>
                        {pattern.trend === "increasing" ? "↗ Subindo" :
                         pattern.trend === "decreasing" ? "↘ Caindo" : "→ Estável"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pattern.recommendation}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Previsão próximo mês: R$ {pattern.prediction.toFixed(0)}</span>
                      <span>Confiança: {(pattern.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Projeção de Saldo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {predictions.futureBalance && (
                  <SmartChart
                    type="line"
                    data={predictions.futureBalance.map((balance: number, idx: number) => ({
                      label: `Mês ${idx + 1}`,
                      value: balance,
                      trend: idx > 0 ? 
                        (balance > predictions.futureBalance[idx - 1] ? 5 : -5) : 0
                    }))}
                    height={200}
                    showTrend={true}
                    animated={true}
                  />
                )}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Insights Preditivos</h5>
                  <ul className="space-y-1 text-sm text-blue-800">
                    {predictions.insights.map((insight: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Zap className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Smart Recommendations */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span>Recomendações Inteligentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Economizar</h4>
                <p className="text-sm text-gray-600">Potencial de R$ 350/mês em economia identificado</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Investir</h4>
                <p className="text-sm text-gray-600">Momento ideal para diversificar investimentos</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Atenção</h4>
                <p className="text-sm text-gray-600">Revisar gastos com alimentação este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Análise Preditiva</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Recursos preditivos em desenvolvimento para este contexto.</p>
      </CardContent>
    </Card>
  );
}