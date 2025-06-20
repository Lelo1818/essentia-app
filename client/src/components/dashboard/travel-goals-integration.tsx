import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plane, MapPin, CreditCard, Target } from "lucide-react";
import { Link } from "wouter";

interface TravelGoal {
  destination: string;
  targetDate: string;
  totalCost: number;
  saved: number;
  milesNeeded: number;
  milesAvailable: number;
  strategy: "savings" | "miles" | "hybrid";
}

export default function TravelGoalsIntegration() {
  // Simulação de meta de viagem conectada com milhas
  const travelGoal: TravelGoal = {
    destination: "Paris, França",
    targetDate: "2024-12-20",
    totalCost: 4200,
    saved: 2200,
    milesNeeded: 85000,
    milesAvailable: 45000,
    strategy: "hybrid"
  };

  const savingsProgress = (travelGoal.saved / travelGoal.totalCost) * 100;
  const milesProgress = (travelGoal.milesAvailable / travelGoal.milesNeeded) * 100;
  
  // Cálculo inteligente da melhor estratégia
  const costToCompleteWithMiles = (travelGoal.milesNeeded - travelGoal.milesAvailable) * 0.025;
  const remainingSavingsNeeded = travelGoal.totalCost - travelGoal.saved;
  const hybridSavings = Math.min(remainingSavingsNeeded, costToCompleteWithMiles);

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">Meta de Viagem Inteligente</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{savingsProgress.toFixed(0)}%</div>
            <div className="text-xs text-gray-600">Progresso Geral</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="w-4 h-4 text-blue-500" />
          <div>
            <div className="font-semibold">{travelGoal.destination}</div>
            <div className="text-sm text-gray-600">Meta: {travelGoal.targetDate}</div>
          </div>
        </div>

        {/* Estratégia Híbrida Recomendada */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Estratégia Híbrida Recomendada pela IA
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Economia Atual</div>
              <div className="font-bold text-green-600">R$ {travelGoal.saved.toLocaleString()}</div>
              <Progress value={savingsProgress} className="h-2 mt-1" />
            </div>
            <div>
              <div className="text-gray-600">Milhas Disponíveis</div>
              <div className="font-bold text-blue-600">{travelGoal.milesAvailable.toLocaleString()}</div>
              <Progress value={milesProgress} className="h-2 mt-1" />
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
            <div className="text-sm text-green-800">
              <strong>Plano Otimizado:</strong> Use R$ {hybridSavings.toFixed(0)} para comprar {((travelGoal.milesNeeded - travelGoal.milesAvailable)).toLocaleString()} milhas faltantes. 
              Economia total: R$ {(remainingSavingsNeeded - hybridSavings).toFixed(0)} vs compra direta da passagem.
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex space-x-2">
          <Link href="/milhas">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plane className="w-4 h-4 mr-2" />
              Ver Milhas
            </Button>
          </Link>
          <Link href="/goals">
            <Button size="sm" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Ajustar Meta
            </Button>
          </Link>
          <Button size="sm" variant="outline">
            <CreditCard className="w-4 h-4 mr-2" />
            Comprar Milhas
          </Button>
        </div>

        {/* Progresso Visual */}
        <div className="mt-4">
          <div className="text-xs text-gray-600 mb-1">
            Próximos passos: Continue poupando R$ 300/mês + use cartão LATAM para gastos diários
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Meta atingível em 6 meses com estratégia híbrida</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}