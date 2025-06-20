import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  Lightbulb, Target, Zap, Star 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "opportunity" | "warning" | "achievement" | "tip";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  actionable: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  metrics?: {
    current: number;
    target: number;
    improvement: string;
  };
}

interface SmartInsightsProps {
  insights: Insight[];
  title?: string;
  maxDisplay?: number;
  className?: string;
}

export function SmartInsights({ 
  insights, 
  title = "Insights Inteligentes", 
  maxDisplay = 3,
  className 
}: SmartInsightsProps) {
  const [selectedInsight, setSelectedInsight] = React.useState<string | null>(null);
  const sortedInsights = React.useMemo(() => {
    return insights
      .sort((a, b) => {
        const impactOrder = { high: 3, medium: 2, low: 1 };
        return impactOrder[b.impact] - impactOrder[a.impact];
      })
      .slice(0, maxDisplay);
  }, [insights, maxDisplay]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            isSelected={selectedInsight === insight.id}
            onSelect={() => setSelectedInsight(
              selectedInsight === insight.id ? null : insight.id
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function InsightCard({ 
  insight, 
  isSelected, 
  onSelect 
}: { 
  insight: Insight; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  const config = {
    opportunity: {
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    achievement: {
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    tip: {
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  };

  const { icon: Icon, color, bgColor, borderColor } = config[insight.type];

  const impactColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800"
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
        borderColor,
        bgColor,
        isSelected && "ring-2 ring-offset-2",
        isSelected && color.replace("text-", "ring-")
      )}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn("w-5 h-5 mt-0.5", color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{insight.title}</h4>
            <div className="flex items-center space-x-2">
              <Badge className={impactColors[insight.impact]}>
                {insight.impact === "high" ? "Alto" : 
                 insight.impact === "medium" ? "Médio" : "Baixo"} Impacto
              </Badge>
              {insight.actionable && (
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Acionável
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
          
          {insight.metrics && (
            <div className="bg-white/50 rounded-md p-3 mb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Atual:</span>
                <span className="font-medium">{insight.metrics.current}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Meta:</span>
                <span className="font-medium">{insight.metrics.target}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t">
                <span className="text-gray-600">Melhoria:</span>
                <span className="font-medium text-green-600">{insight.metrics.improvement}</span>
              </div>
            </div>
          )}
          
          {insight.action && isSelected && (
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                insight.action!.onClick();
              }}
              size="sm"
              className="w-full mt-2"
              variant="outline"
            >
              {insight.action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook para gerar insights automáticos baseados em dados
export function useAutoInsights(data: any): Insight[] {
  return React.useMemo(() => {
    const insights: Insight[] = [];
    
    // Análise financeira
    if (data.totalIncome && data.totalExpenses) {
      const savingsRate = ((data.totalIncome - data.totalExpenses) / data.totalIncome) * 100;
      
      if (savingsRate < 10) {
        insights.push({
          id: "low-savings",
          type: "warning",
          title: "Taxa de Poupança Baixa",
          description: `Você está poupando apenas ${savingsRate.toFixed(1)}% da sua renda. O ideal é 20% ou mais.`,
          impact: "high",
          actionable: true,
          action: {
            label: "Revisar Orçamento",
            onClick: () => window.location.href = "/planning"
          },
          metrics: {
            current: Math.round(savingsRate),
            target: 20,
            improvement: `+${(20 - savingsRate).toFixed(1)}%`
          }
        });
      }
      
      if (savingsRate >= 20) {
        insights.push({
          id: "good-savings",
          type: "achievement",
          title: "Excelente Controle Financeiro!",
          description: `Parabéns! Você está poupando ${savingsRate.toFixed(1)}% da sua renda.`,
          impact: "medium",
          actionable: false
        });
      }
    }
    
    // Análise de categorias de gastos
    if (data.expenseCategories) {
      const highestCategory = Object.entries(data.expenseCategories)
        .reduce((max, [cat, value]) => 
          (value as number) > (max[1] as number) ? [cat, value] : max
        );
      
      if ((highestCategory[1] as number) > data.totalExpenses * 0.4) {
        insights.push({
          id: "category-concentration",
          type: "tip",
          title: "Concentração de Gastos",
          description: `${(((highestCategory[1] as number) / data.totalExpenses) * 100).toFixed(1)}% dos seus gastos estão em ${highestCategory[0]}. Considere diversificar.`,
          impact: "medium",
          actionable: true,
          action: {
            label: "Analisar Categoria",
            onClick: () => console.log("Analyze category", highestCategory[0])
          }
        });
      }
    }
    
    return insights;
  }, [data]);
}