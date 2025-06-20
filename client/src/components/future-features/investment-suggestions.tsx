import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Shield, Zap } from "lucide-react";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Progress } from "@/components/ui/progress";

export default function InvestmentSuggestions() {
  const suggestions = [
    {
      type: "CDB",
      institution: "Nubank",
      yield: "102% CDI",
      risk: "Baixo",
      minAmount: 1000,
      liquidez: "Diária",
      icon: Shield,
      color: "text-green-600"
    },
    {
      type: "Tesouro Selic",
      institution: "Tesouro Nacional",
      yield: "100% Selic",
      risk: "Muito Baixo",
      minAmount: 100,
      liquidez: "Diária",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      type: "Ações",
      institution: "ITUB4",
      yield: "+8.5% (12m)",
      risk: "Alto",
      minAmount: 500,
      liquidez: "Imediata",
      icon: TrendingUp,
      color: "text-red-600"
    }
  ];

  const portfolioSuggestion = {
    conservative: 60,
    moderate: 30,
    aggressive: 10
  };

  return (
    <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <DollarSign className="w-5 h-5 mr-2" />
          Sugestões de Investimento IA (FUTURO)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">Portfolio Recomendado para Seu Perfil</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Conservador (CDB, Tesouro)</span>
                <span className="font-bold text-emerald-600">{portfolioSuggestion.conservative}%</span>
              </div>
              <Progress value={portfolioSuggestion.conservative} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Moderado (Fundos, FIIs)</span>
                <span className="font-bold text-blue-600">{portfolioSuggestion.moderate}%</span>
              </div>
              <Progress value={portfolioSuggestion.moderate} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Agressivo (Ações, Crypto)</span>
                <span className="font-bold text-red-600">{portfolioSuggestion.aggressive}%</span>
              </div>
              <Progress value={portfolioSuggestion.aggressive} className="h-2" />
            </div>
          </div>

          <div className="space-y-3">
            {suggestions.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <investment.icon className={`w-5 h-5 ${investment.color}`} />
                  <div>
                    <div className="font-semibold text-sm">{investment.type}</div>
                    <div className="text-xs text-gray-600">{investment.institution}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{investment.yield}</div>
                  <div className="text-xs text-gray-500">Risco {investment.risk}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-2">
            <InteractiveButton className="w-full" soundType="notification">
              <Zap className="w-4 h-4 mr-2" />
              Investir Automaticamente (Em Breve)
            </InteractiveButton>
            <div className="text-xs text-gray-500 mt-2">
              IA otimizará seus investimentos automaticamente baseado em suas metas
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}