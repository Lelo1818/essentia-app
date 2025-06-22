import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, AlertTriangle, Target } from "lucide-react";

export default function SimularCenarios() {
  const [cenario, setCenario] = useState({
    rendaExtra: "",
    gastoExtra: "",
    metaMensal: "",
    prazoMeses: ""
  });

  const [resultado, setResultado] = useState<any>(null);

  const simular = () => {
    const rendaExtra = parseFloat(cenario.rendaExtra) || 0;
    const gastoExtra = parseFloat(cenario.gastoExtra) || 0;
    const metaMensal = parseFloat(cenario.metaMensal) || 0;
    const prazoMeses = parseInt(cenario.prazoMeses) || 1;

    const impactoMensal = rendaExtra - gastoExtra;
    const totalPeriodo = impactoMensal * prazoMeses;
    const percentualMeta = metaMensal > 0 ? (impactoMensal / metaMensal) * 100 : 0;

    setResultado({
      impactoMensal,
      totalPeriodo,
      percentualMeta,
      viabilidade: impactoMensal >= metaMensal ? "Viável" : "Necessita ajustes"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-8 rounded-b-3xl mb-8">
          <div className="flex items-center gap-4">
            <Calculator className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Simular Cenários Financeiros</h1>
              <p className="text-white/90 text-lg">Projete diferentes situações e tome decisões inteligentes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Parâmetros do Cenário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rendaExtra">Renda Extra Mensal (R$)</Label>
                <Input
                  id="rendaExtra"
                  type="number"
                  value={cenario.rendaExtra}
                  onChange={(e) => setCenario(prev => ({ ...prev, rendaExtra: e.target.value }))}
                  placeholder="0,00"
                />
              </div>

              <div>
                <Label htmlFor="gastoExtra">Gasto Extra Mensal (R$)</Label>
                <Input
                  id="gastoExtra"
                  type="number"
                  value={cenario.gastoExtra}
                  onChange={(e) => setCenario(prev => ({ ...prev, gastoExtra: e.target.value }))}
                  placeholder="0,00"
                />
              </div>

              <div>
                <Label htmlFor="metaMensal">Meta de Economia Mensal (R$)</Label>
                <Input
                  id="metaMensal"
                  type="number"
                  value={cenario.metaMensal}
                  onChange={(e) => setCenario(prev => ({ ...prev, metaMensal: e.target.value }))}
                  placeholder="0,00"
                />
              </div>

              <div>
                <Label htmlFor="prazoMeses">Prazo de Análise (meses)</Label>
                <Input
                  id="prazoMeses"
                  type="number"
                  value={cenario.prazoMeses}
                  onChange={(e) => setCenario(prev => ({ ...prev, prazoMeses: e.target.value }))}
                  placeholder="12"
                />
              </div>

              <Button onClick={simular} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                <Calculator className="w-4 h-4 mr-2" />
                Simular Cenário
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Resultados da Simulação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Impacto Mensal:</span>
                    <span className={`font-bold text-lg ${resultado.impactoMensal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {resultado.impactoMensal >= 0 ? '+' : ''}R$ {resultado.impactoMensal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total no Período:</span>
                    <span className={`font-bold text-lg ${resultado.totalPeriodo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {resultado.totalPeriodo >= 0 ? '+' : ''}R$ {resultado.totalPeriodo.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">% da Meta:</span>
                    <span className="font-bold text-lg text-indigo-600">
                      {resultado.percentualMeta.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  resultado.viabilidade === "Viável" ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                }`}>
                  {resultado.viabilidade === "Viável" ? 
                    <TrendingUp className="w-5 h-5" /> : 
                    <AlertTriangle className="w-5 h-5" />
                  }
                  <span className="font-semibold">Status: {resultado.viabilidade}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}