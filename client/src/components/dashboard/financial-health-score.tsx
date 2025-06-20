import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Target,
  DollarSign,
  CreditCard,
  PiggyBank,
  Zap
} from "lucide-react";

export default function FinancialHealthScore() {
  const healthScore = 78; // Score de 0-100
  const previousScore = 71;
  const improvement = healthScore - previousScore;

  const metrics = [
    {
      category: "Reserva de Emergência",
      score: 95,
      status: "excellent",
      description: "6 meses de gastos cobertos",
      recommendation: "Perfeito! Mantenha este nível",
      icon: Shield,
      color: "text-green-600"
    },
    {
      category: "Controle de Gastos",
      score: 82,
      status: "good",
      description: "15% abaixo do orçamento mensal",
      recommendation: "Continue monitorando alimentação",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      category: "Saúde do Crédito",
      score: 68,
      status: "warning",
      description: "45% do limite utilizado",
      recommendation: "Reduza uso dos cartões para 30%",
      icon: CreditCard,
      color: "text-yellow-600"
    },
    {
      category: "Investimentos",
      score: 75,
      status: "good", 
      description: "22% da renda investida",
      recommendation: "Meta ideal: 25% da renda",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      category: "Diversificação",
      score: 85,
      status: "excellent",
      description: "Portfolio bem balanceado",
      recommendation: "Excelente alocação de ativos",
      icon: Target,
      color: "text-green-600"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excelente";
    if (score >= 80) return "Muito Bom";
    if (score >= 70) return "Bom";
    if (score >= 60) return "Regular";
    return "Precisa Melhorar";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Score de Saúde Financeira
          </CardTitle>
          <Badge className="bg-purple-100 text-purple-700">
            {improvement > 0 ? '+' : ''}{improvement} pts este mês
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#8b5cf6" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${healthScore * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-purple-600">{healthScore}</span>
                  <span className="text-sm text-gray-500">de 100</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className={`text-xl font-bold ${getScoreColor(healthScore)}`}>
                {getScoreLabel(healthScore)}
              </h3>
              <p className="text-gray-600">
                Sua saúde financeira está {improvement > 0 ? 'melhorando' : 'estável'}
              </p>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-3">Análise Detalhada</h4>
            
            {metrics.map((metric, index) => {
              const StatusIcon = getStatusIcon(metric.status);
              const IconComponent = metric.icon;
              
              return (
                <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getStatusColor(metric.status)}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-800">{metric.category}</h5>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getScoreColor(metric.score)}`}>
                            {metric.score}
                          </span>
                          <StatusIcon className={`w-4 h-4 ${metric.color}`} />
                        </div>
                      </div>
                      
                      <Progress value={metric.score} className="h-2 mb-2" />
                      
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">{metric.description}</p>
                        <p className="text-gray-500 italic">💡 {metric.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Items */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-800 mb-3">Próximas Ações para Melhorar</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Reduzir uso do cartão de crédito para 30% do limite</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Aumentar aportes mensais para 25% da renda</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Controlar gastos com alimentação fora de casa</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Ver Plano Personalizado
              </Button>
              <Button size="sm" variant="outline" className="border-purple-600 text-purple-600">
                Histórico de Score
              </Button>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h6 className="font-medium text-gray-700 mb-2">Evolução nos Últimos 3 Meses</h6>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600">65</div>
                <div className="text-gray-500">Março</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600">71</div>
                <div className="text-gray-500">Abril</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{healthScore}</div>
                <div className="text-purple-500">Maio</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 font-medium">
              📈 Crescimento de 20% em 3 meses
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}