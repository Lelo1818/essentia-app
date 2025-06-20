import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartInsights, useAutoInsights } from "@/components/enhanced/smart-insights";
import { Percent, Fuel, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function PersonalizedSuggestions() {
  const { data: summary } = useQuery({
    queryKey: ["/api/financial-summary"],
  });

  const autoInsights = useAutoInsights(summary || {});

  const manualSuggestions = [
    {
      title: "Meta de Economia",
      subtitle: "R$ 500/mês",
      description: "Baseado no seu histórico, você pode economizar R$ 500 mensais cortando gastos supérfluos.",
      icon: TrendingUp,
      color: "green",
      buttonText: "Ver Detalhes",
      buttonColor: "bg-green-500 hover:bg-green-600",
      action: () => window.location.href = '/goals'
    },
    {
      title: "Categoria em Alerta",
      subtitle: "Alimentação 120%",
      description: "Seus gastos com alimentação ultrapassaram o orçamento planejado em 20%.",
      icon: Percent,
      color: "blue",
      buttonText: "Revisar Orçamento",
      buttonColor: "bg-blue-500 hover:bg-blue-600", 
      action: () => window.location.href = '/planning'
    },
    {
      title: "Oportunidade de Renda",
      subtitle: "Nova Fonte",
      description: "Considere adicionar uma fonte de renda extra para atingir suas metas mais rapidamente.",
      icon: Fuel,
      color: "purple",
      buttonText: "Adicionar Renda",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      action: () => window.location.href = '/income'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Smart Insights */}
      {autoInsights.length > 0 && (
        <SmartInsights insights={autoInsights} maxDisplay={3} />
      )}

      {/* Manual Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Sugestões Personalizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manualSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <div key={suggestion.title} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getColorClasses(suggestion.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <p className="text-sm text-gray-500">{suggestion.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  <Button 
                    onClick={suggestion.action}
                    className={`w-full text-white transition-colors ${suggestion.buttonColor}`}
                  >
                    {suggestion.buttonText}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
