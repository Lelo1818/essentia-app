import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator, TrendingDown, AlertCircle } from "lucide-react";

export default function RenegociarDividas() {
  const [divida, setDivida] = useState({
    valorTotal: "",
    valorParcela: "",
    parcelasRestantes: "",
    jurosAtual: ""
  });

  const [proposta, setProposta] = useState<any>(null);

  const calcularRenegociacao = () => {
    const valorTotal = parseFloat(divida.valorTotal) || 0;
    const valorParcela = parseFloat(divida.valorParcela) || 0;
    const parcelasRestantes = parseInt(divida.parcelasRestantes) || 1;
    const jurosAtual = parseFloat(divida.jurosAtual) || 0;

    // Simulação de propostas de renegociação
    const desconto15 = valorTotal * 0.85; // 15% desconto à vista
    const desconto25 = valorTotal * 0.75; // 25% desconto à vista
    const parcelamento = valorTotal / (parcelasRestantes + 6); // Mais 6 parcelas
    const reducaoJuros = valorTotal * (1 + (jurosAtual * 0.5) / 100); // Redução de 50% dos juros

    setProposta({
      atual: { valor: valorTotal, parcela: valorParcela, parcelas: parcelasRestantes },
      opcoes: [
        {
          tipo: "À Vista com 15% desconto",
          valor: desconto15,
          economia: valorTotal - desconto15,
          recomendacao: "Boa opção se tiver reserva"
        },
        {
          tipo: "À Vista com 25% desconto",
          valor: desconto25,
          economia: valorTotal - desconto25,
          recomendacao: "Melhor opção financeira"
        },
        {
          tipo: "Parcelamento Estendido",
          valor: valorTotal,
          parcela: parcelamento,
          parcelas: parcelasRestantes + 6,
          recomendacao: "Alivia o orçamento mensal"
        },
        {
          tipo: "Redução de Juros 50%",
          valor: reducaoJuros,
          economia: valorTotal - reducaoJuros,
          recomendacao: "Equilibra pagamento e economia"
        }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 text-white p-8 rounded-b-3xl mb-8">
          <div className="flex items-center gap-4">
            <DollarSign className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Renegociar Dívidas</h1>
              <p className="text-white/90 text-lg">Analise as melhores estratégias para quitar suas dívidas</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Dados da Dívida Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="valorTotal">Valor Total da Dívida (R$)</Label>
                <Input
                  id="valorTotal"
                  type="number"
                  value={divida.valorTotal}
                  onChange={(e) => setDivida(prev => ({ ...prev, valorTotal: e.target.value }))}
                  placeholder="0,00"
                />
              </div>

              <div>
                <Label htmlFor="valorParcela">Valor da Parcela Atual (R$)</Label>
                <Input
                  id="valorParcela"
                  type="number"
                  value={divida.valorParcela}
                  onChange={(e) => setDivida(prev => ({ ...prev, valorParcela: e.target.value }))}
                  placeholder="0,00"
                />
              </div>

              <div>
                <Label htmlFor="parcelasRestantes">Parcelas Restantes</Label>
                <Input
                  id="parcelasRestantes"
                  type="number"
                  value={divida.parcelasRestantes}
                  onChange={(e) => setDivida(prev => ({ ...prev, parcelasRestantes: e.target.value }))}
                  placeholder="12"
                />
              </div>

              <div>
                <Label htmlFor="jurosAtual">Taxa de Juros Atual (%)</Label>
                <Input
                  id="jurosAtual"
                  type="number"
                  value={divida.jurosAtual}
                  onChange={(e) => setDivida(prev => ({ ...prev, jurosAtual: e.target.value }))}
                  placeholder="2,5"
                />
              </div>

              <Button onClick={calcularRenegociacao} className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Propostas
              </Button>
            </CardContent>
          </Card>

          {proposta && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Situação Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-red-600 font-bold text-lg">R$ {proposta.atual.valor.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Valor Total</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-red-600 font-bold text-lg">{proposta.atual.parcelas}x</div>
                      <div className="text-sm text-gray-600">Parcelas Restantes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Propostas de Renegociação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proposta.opcoes.map((opcao: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{opcao.tipo}</h3>
                        {opcao.economia && (
                          <Badge className="bg-green-100 text-green-700">
                            Economia: R$ {opcao.economia.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">Valor:</span>
                          <div className="font-bold text-lg">R$ {opcao.valor.toFixed(2)}</div>
                        </div>
                        {opcao.parcela && (
                          <div>
                            <span className="text-sm text-gray-600">Parcela:</span>
                            <div className="font-bold text-lg">R$ {opcao.parcela.toFixed(2)}</div>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-blue-600 font-medium">
                        💡 {opcao.recomendacao}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
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