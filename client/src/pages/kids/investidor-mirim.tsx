import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ArrowLeft, DollarSign, Target, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Investment {
  id: string;
  name: string;
  emoji: string;
  initialValue: number;
  currentValue: number;
  risk: 'low' | 'medium' | 'high';
  timeframe: string;
  description: string;
}

export default function InvestidorMirim({ onBack }: { onBack: () => void }) {
  const [portfolio] = useState<Investment[]>([
    {
      id: "1",
      name: "Poupança Mágica",
      emoji: "🏦",
      initialValue: 100,
      currentValue: 105,
      risk: 'low',
      timeframe: "1 ano",
      description: "Seguro e sempre cresce um pouquinho"
    },
    {
      id: "2",
      name: "Ações da Empresa de Brinquedos",
      emoji: "🧸",
      initialValue: 100,
      currentValue: 120,
      risk: 'medium',
      timeframe: "6 meses",
      description: "Pode subir ou descer, mas tem potencial"
    },
    {
      id: "3",
      name: "Criptomoeda Kids",
      emoji: "🪙",
      initialValue: 100,
      currentValue: 80,
      risk: 'high',
      timeframe: "3 meses",
      description: "Muito arriscado, mas pode dar muito lucro"
    }
  ]);

  const { toast } = useToast();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Baixo Risco';
      case 'medium': return 'Risco Médio';
      case 'high': return 'Alto Risco';
      default: return risk;
    }
  };

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.initialValue, 0);
  const totalCurrent = portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = totalCurrent - totalInvested;
  const returnPercentage = ((totalReturn / totalInvested) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">📈 Investidor Mirim</h1>
        </div>

        {/* Portfolio Summary */}
        <Card className="border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-center text-purple-800">Seu Portfólio de Investimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">R$ {totalInvested}</div>
                <div className="text-purple-500 text-sm">Investido</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">R$ {totalCurrent}</div>
                <div className="text-indigo-500 text-sm">Valor Atual</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {totalReturn > 0 ? '+' : ''}{totalReturn}
                </div>
                <div className="text-gray-500 text-sm">Lucro/Prejuízo</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {returnPercentage}%
                </div>
                <div className="text-gray-500 text-sm">Retorno</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investments */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Investimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio.map((investment) => {
                const return_ = investment.currentValue - investment.initialValue;
                const returnPerc = ((return_ / investment.initialValue) * 100).toFixed(1);
                
                return (
                  <Card key={investment.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{investment.emoji}</div>
                          <div>
                            <h3 className="font-bold text-lg">{investment.name}</h3>
                            <p className="text-gray-600 text-sm">{investment.description}</p>
                            <Badge className={getRiskColor(investment.risk)}>
                              {getRiskLabel(investment.risk)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">R$ {investment.currentValue}</div>
                          <div className={`text-sm font-medium ${return_ >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {return_ > 0 ? '+' : ''}R$ {return_} ({returnPerc}%)
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Investimento inicial:</span>
                          <div className="font-medium">R$ {investment.initialValue}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tempo de investimento:</span>
                          <div className="font-medium">{investment.timeframe}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning About Investments */}
        <Card>
          <CardHeader>
            <CardTitle>O que são Investimentos?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">💰 O que é Investir?</h4>
                <div className="space-y-2 text-sm">
                  <p>• É como plantar uma semente</p>
                  <p>• Você usa dinheiro para ganhar mais dinheiro</p>
                  <p>• É diferente de guardar na poupança</p>
                  <p>• Pode crescer mais, mas também pode diminuir</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-yellow-700">⚖️ Risco vs Retorno</h4>
                <div className="space-y-2 text-sm">
                  <p>• Baixo risco = pouco lucro (mas seguro)</p>
                  <p>• Alto risco = pode lucrar muito (ou perder)</p>
                  <p>• É importante diversificar</p>
                  <p>• Nunca invista tudo em uma coisa só</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">⏰ Tempo é Importante</h4>
                <div className="space-y-2 text-sm">
                  <p>• Quanto mais tempo, melhor</p>
                  <p>• Juros compostos são mágicos</p>
                  <p>• Começar cedo é vantagem</p>
                  <p>• Paciência é fundamental</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Quiz */}
        <Card className="border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="text-indigo-800">Quiz do Investidor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Pergunta 1: Qual é mais arriscado?</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    A) Poupança
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    B) Ações de empresas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    C) Criptomoedas
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Histórias de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl mb-2">👦</div>
                <h4 className="font-semibold">João, 12 anos</h4>
                <p className="text-gray-600">"Comecei investindo R$ 50 da minha mesada. Depois de 2 anos, já tenho R$ 200!"</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl mb-2">👧</div>
                <h4 className="font-semibold">Maria, 10 anos</h4>
                <p className="text-gray-600">"Meus pais me ensinaram sobre ações. Agora eu entendo como as empresas funcionam!"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}