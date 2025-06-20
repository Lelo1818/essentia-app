import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Plane, CreditCard, Target, TrendingUp, MapPin, Calendar, Gift } from "lucide-react";

interface ProgramaMilhas {
  id: string;
  nome: string;
  saldo: number;
  validade: string;
  valorMilha: number;
  cartaoVinculado?: string;
  logo: string;
}

interface SonhoViagem {
  id: string;
  destino: string;
  custoPassagem: number;
  milhasNecessarias: number;
  dataDesejada: string;
  prioridade: "alta" | "media" | "baixa";
  progresso: number;
}

export default function GestaoMilhas() {
  const [programas, setProgramas] = useState<ProgramaMilhas[]>([]);
  const [sonhosViagem, setSonhosViagem] = useState<SonhoViagem[]>([]);
  const [novoSonho, setNovoSonho] = useState({
    destino: "",
    dataDesejada: "",
    custoPassagem: 0
  });

  useEffect(() => {
    const programasExemplo: ProgramaMilhas[] = [
      {
        id: "1",
        nome: "LATAM Pass",
        saldo: 45000,
        validade: "Dec 2024",
        valorMilha: 0.018,
        cartaoVinculado: "Itaú LATAM",
        logo: "✈️"
      },
      {
        id: "2",
        nome: "Smiles",
        saldo: 28000,
        validade: "Mar 2025",
        valorMilha: 0.015,
        cartaoVinculado: "Santander Smiles",
        logo: "🛫"
      },
      {
        id: "3",
        nome: "TudoAzul",
        saldo: 12000,
        validade: "Jun 2024",
        valorMilha: 0.020,
        logo: "🔵"
      }
    ];

    const sonhosExemplo: SonhoViagem[] = [
      {
        id: "1",
        destino: "Paris, França",
        custoPassagem: 4200,
        milhasNecessarias: 85000,
        dataDesejada: "2024-12-20",
        prioridade: "alta",
        progresso: 53
      },
      {
        id: "2",
        destino: "Tóquio, Japão",
        custoPassagem: 6800,
        milhasNecessarias: 120000,
        dataDesejada: "2025-06-15",
        prioridade: "media",
        progresso: 28
      },
      {
        id: "3",
        destino: "Buenos Aires, Argentina",
        custoPassagem: 1200,
        milhasNecessarias: 35000,
        dataDesejada: "2024-09-10",
        prioridade: "alta",
        progresso: 85
      }
    ];

    setProgramas(programasExemplo);
    setSonhosViagem(sonhosExemplo);
  }, []);

  const totalMilhas = programas.reduce((acc, p) => acc + p.saldo, 0);
  const valorTotalMilhas = programas.reduce((acc, p) => acc + (p.saldo * p.valorMilha), 0);

  const calcularEstrategia = (sonho: SonhoViagem) => {
    const milhasDisponiveis = totalMilhas;
    const milhasFaltando = Math.max(0, sonho.milhasNecessarias - milhasDisponiveis);
    const custoComprarMilhas = milhasFaltando * 0.025; // Média compra de milhas
    const economiaVsPassagem = sonho.custoPassagem - custoComprarMilhas;
    
    return {
      milhasFaltando,
      custoComprarMilhas,
      economiaVsPassagem,
      viavel: economiaVsPassagem > 500
    };
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta": return "text-red-600 bg-red-100";
      case "media": return "text-yellow-600 bg-yellow-100";
      case "baixa": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Milhas</h1>
          <p className="text-gray-600">Otimize suas milhas para realizar sonhos de viagem</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{totalMilhas.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total de Milhas</div>
        </div>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalMilhas.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Milhas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">R$ {valorTotalMilhas.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Valor Estimado</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{programas.length}</div>
            <div className="text-sm text-gray-600">Programas Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{sonhosViagem.length}</div>
            <div className="text-sm text-gray-600">Sonhos de Viagem</div>
          </CardContent>
        </Card>
      </div>

      {/* Programas de Milhas */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Programas de Milhas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {programas.map((programa) => (
              <div key={programa.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{programa.logo}</span>
                    <div>
                      <h4 className="font-semibold">{programa.nome}</h4>
                      {programa.cartaoVinculado && (
                        <div className="text-xs text-gray-600">{programa.cartaoVinculado}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{programa.saldo.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">milhas</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Validade:</span>
                    <span className="font-medium">{programa.validade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor estimado:</span>
                    <span className="font-medium text-green-600">
                      R$ {(programa.saldo * programa.valorMilha).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sonhos de Viagem */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Sonhos de Viagem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sonhosViagem.map((sonho) => {
              const estrategia = calcularEstrategia(sonho);
              return (
                <div key={sonho.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-lg">{sonho.destino}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(sonho.dataDesejada).toLocaleDateString()}</span>
                          <Badge className={`text-xs ${getPrioridadeColor(sonho.prioridade)}`}>
                            {sonho.prioridade === "alta" ? "Alta" : 
                             sonho.prioridade === "media" ? "Média" : "Baixa"} Prioridade
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {sonho.milhasNecessarias.toLocaleString()} milhas
                      </div>
                      <div className="text-sm text-gray-600">
                        ou R$ {sonho.custoPassagem.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progresso das Milhas</span>
                      <span className="text-sm font-bold">{sonho.progresso}%</span>
                    </div>
                    <Progress value={sonho.progresso} className="h-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">Milhas Necessárias</div>
                      <div className="text-lg font-bold">{sonho.milhasNecessarias.toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Milhas Faltando</div>
                      <div className="text-lg font-bold text-blue-600">
                        {estrategia.milhasFaltando.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Economia vs Passagem</div>
                      <div className="text-lg font-bold text-green-600">
                        R$ {estrategia.economiaVsPassagem.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {estrategia.viavel ? (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800">Estratégia Recomendada</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Compre {estrategia.milhasFaltando.toLocaleString()} milhas por R$ {estrategia.custoComprarMilhas.toFixed(0)} 
                        e economize R$ {estrategia.economiaVsPassagem.toFixed(0)} vs comprar passagem diretamente.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Sugestão de Acúmulo</span>
                      </div>
                      <p className="text-yellow-700 text-sm mt-1">
                        Use cartão de crédito com programa de milhas para gastos mensais. 
                        Estimativa: +2.000 milhas/mês com gastos atuais.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plane className="w-4 h-4 mr-2" />
                      Buscar Passagens
                    </Button>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Comprar Milhas
                      </Button>
                      <Button size="sm" variant="outline">
                        Ajustar Meta
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dicas de Otimização */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-blue-800">Dicas de Acúmulo</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>• Use cartão LATAM para gastos recorrentes (+2.000 milhas/mês)</li>
              <li>• Transfira pontos do Livelo (1:1 para Smiles)</li>
              <li>• Promoções: 100% bonus até 31/Jul</li>
              <li>• Parcerias: Uber, iFood, Magazine Luiza</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-green-600" />
              <CardTitle className="text-green-800">Alertas Inteligentes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-green-700 text-sm">
              <li>• 12.000 milhas TudoAzul vencem em 3 meses</li>
              <li>• Promoção 50% off para Buenos Aires ativa</li>
              <li>• Meta Paris: faltam 40.000 milhas (viável)</li>
              <li>• Cartão Smiles: próxima anuidade em 45 dias</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}