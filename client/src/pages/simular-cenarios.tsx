import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { BarChart, TrendingUp, TrendingDown, Calculator, Target, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScenarioResult {
  name: string;
  monthlySavings: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  emergencyFund: number;
  goalProgress: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export default function SimularCenarios() {
  const [currentIncome, setCurrentIncome] = useState(5000);
  const [currentExpenses, setCurrentExpenses] = useState(3500);
  const [emergencyTarget, setEmergencyTarget] = useState(6);
  const [savingsGoal, setSavingsGoal] = useState(50000);
  const [timeframe, setTimeframe] = useState(24);

  const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
  const { toast } = useToast();

  const calculateScenario = (
    income: number,
    expenses: number,
    name: string,
    changes: string
  ): ScenarioResult => {
    const monthlySavings = income - expenses;
    const emergencyFund = monthlySavings * emergencyTarget;
    const goalProgress = (monthlySavings * timeframe / savingsGoal) * 100;
    
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (monthlySavings < income * 0.1) riskLevel = 'high';
    else if (monthlySavings < income * 0.2) riskLevel = 'medium';

    let recommendation = "";
    if (riskLevel === 'high') {
      recommendation = "Reduza gastos urgentemente ou aumente a renda";
    } else if (riskLevel === 'medium') {
      recommendation = "Considere cortar gastos desnecessários";
    } else {
      recommendation = "Situação financeira saudável, continue assim!";
    }

    return {
      name,
      monthlySavings,
      monthlyExpenses: expenses,
      monthlyIncome: income,
      emergencyFund,
      goalProgress: Math.min(goalProgress, 100),
      riskLevel,
      recommendation
    };
  };

  const runSimulations = () => {
    const newScenarios: ScenarioResult[] = [
      // Cenário atual
      calculateScenario(currentIncome, currentExpenses, "Cenário Atual", "Situação real"),
      
      // Cenário otimista - aumento de renda
      calculateScenario(currentIncome * 1.2, currentExpenses, "Cenário Otimista", "+20% renda"),
      
      // Cenário pessimista - redução de renda
      calculateScenario(currentIncome * 0.8, currentExpenses, "Cenário Pessimista", "-20% renda"),
      
      // Cenário de economia - redução de gastos
      calculateScenario(currentIncome, currentExpenses * 0.85, "Cenário Economia", "-15% gastos"),
      
      // Cenário de emergência - gastos extras
      calculateScenario(currentIncome, currentExpenses * 1.3, "Cenário Emergência", "+30% gastos"),
      
      // Cenário balanceado
      calculateScenario(currentIncome * 1.1, currentExpenses * 0.9, "Cenário Balanceado", "+10% renda, -10% gastos")
    ];

    setScenarios(newScenarios);
    
    toast({
      title: "Simulação Concluída",
      description: "6 cenários financeiros foram calculados",
      variant: "default"
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'high': return 'Alto Risco';
      case 'medium': return 'Risco Moderado';
      default: return 'Baixo Risco';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Simular Cenários Financeiros</h1>
        <Badge className="bg-purple-600 text-white">
          Análise Preditiva
        </Badge>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Parâmetros da Simulação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="income">Renda Mensal Atual</Label>
              <Input
                id="income"
                type="number"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(Number(e.target.value))}
                className="mt-1"
              />
              <div className="text-sm text-gray-500 mt-1">R$ {currentIncome.toLocaleString()}</div>
            </div>
            
            <div>
              <Label htmlFor="expenses">Gastos Mensais Atuais</Label>
              <Input
                id="expenses"
                type="number"
                value={currentExpenses}
                onChange={(e) => setCurrentExpenses(Number(e.target.value))}
                className="mt-1"
              />
              <div className="text-sm text-gray-500 mt-1">R$ {currentExpenses.toLocaleString()}</div>
            </div>
            
            <div>
              <Label>Reserva de Emergência (meses de gastos)</Label>
              <Slider
                value={[emergencyTarget]}
                onValueChange={(value) => setEmergencyTarget(value[0])}
                max={12}
                min={3}
                step={1}
                className="mt-2"
              />
              <div className="text-sm text-gray-500 mt-1">{emergencyTarget} meses</div>
            </div>
            
            <div>
              <Label htmlFor="goal">Meta de Economia</Label>
              <Input
                id="goal"
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                className="mt-1"
              />
              <div className="text-sm text-gray-500 mt-1">R$ {savingsGoal.toLocaleString()}</div>
            </div>
            
            <div className="md:col-span-2">
              <Label>Prazo para Meta (meses)</Label>
              <Slider
                value={[timeframe]}
                onValueChange={(value) => setTimeframe(value[0])}
                max={60}
                min={6}
                step={6}
                className="mt-2"
              />
              <div className="text-sm text-gray-500 mt-1">{timeframe} meses ({Math.round(timeframe/12)} anos)</div>
            </div>
          </div>
          
          <InteractiveButton
            onClick={runSimulations}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
            soundType="success"
          >
            <BarChart className="w-4 h-4 mr-2" />
            Simular Cenários
          </InteractiveButton>
        </CardContent>
      </Card>

      {/* Current Situation Summary */}
      {currentIncome && currentExpenses && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">R$ {(currentIncome - currentExpenses).toLocaleString()}</div>
              <div className="text-green-600 text-sm">Economia Mensal</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{Math.round(((currentIncome - currentExpenses) / currentIncome) * 100)}%</div>
              <div className="text-blue-600 text-sm">Taxa de Poupança</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">R$ {(currentExpenses * emergencyTarget).toLocaleString()}</div>
              <div className="text-orange-600 text-sm">Reserva Ideal</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingDown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">{Math.ceil(savingsGoal / (currentIncome - currentExpenses))}</div>
              <div className="text-purple-600 text-sm">Meses para Meta</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Simulation Results */}
      {scenarios.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Simulação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scenarios.map((scenario, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{scenario.name}</h4>
                      <Badge className={getRiskColor(scenario.riskLevel)}>
                        {getRiskLabel(scenario.riskLevel)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        R$ {scenario.monthlySavings.toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-sm">economia/mês</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">R$ {scenario.monthlyIncome.toLocaleString()}</div>
                      <div className="text-gray-500 text-sm">Renda</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">R$ {scenario.monthlyExpenses.toLocaleString()}</div>
                      <div className="text-gray-500 text-sm">Gastos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{Math.round(scenario.goalProgress)}%</div>
                      <div className="text-gray-500 text-sm">Progresso da Meta</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso da Meta</span>
                      <span>{Math.round(scenario.goalProgress)}%</span>
                    </div>
                    <Progress value={scenario.goalProgress} className="h-2" />
                  </div>
                  
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <strong>Recomendação:</strong> {scenario.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Como Usar as Simulações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-semibold mb-2">Análise dos Cenários</h4>
              <ul className="space-y-1">
                <li>• Compare diferentes situações financeiras</li>
                <li>• Identifique riscos e oportunidades</li>
                <li>• Planeje para emergências</li>
                <li>• Defina metas realistas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tomada de Decisão</h4>
              <ul className="space-y-1">
                <li>• Use o cenário pessimista para planejar emergências</li>
                <li>• O cenário otimista mostra o potencial máximo</li>
                <li>• Cenários de economia indicam onde cortar gastos</li>
                <li>• Sempre mantenha uma reserva de emergência</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}