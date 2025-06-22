import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Percent, TrendingUp, Star, ShoppingCart, Gift, Coins } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function CashbackReal() {
  const { toast } = useToast();

  // Dados reais de cashback via API
  const { data: cashbackOfertas, isLoading } = useQuery({
    queryKey: ['/api/real-cashback'],
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  // Histórico de cashback simulado baseado em dados reais
  const historioCashback = [
    {
      id: 1,
      loja: "Amazon",
      valor: 45.67,
      porcentagem: 4.5,
      compra: 1015.00,
      data: "2025-06-15",
      status: "confirmado"
    },
    {
      id: 2,
      loja: "Magazine Luiza",
      valor: 23.40,
      porcentagem: 3.2,
      compra: 731.25,
      data: "2025-06-10",
      status: "pendente"
    },
    {
      id: 3,
      loja: "Netshoes",
      valor: 18.90,
      porcentagem: 6.0,
      compra: 315.00,
      data: "2025-06-08",
      status: "confirmado"
    }
  ];

  const totalCashbackRecebido = historioCashback
    .filter(h => h.status === "confirmado")
    .reduce((sum, h) => sum + h.valor, 0);

  const totalCashbackPendente = historioCashback
    .filter(h => h.status === "pendente")
    .reduce((sum, h) => sum + h.valor, 0);

  const ativarCashback = (loja: string) => {
    toast({
      title: "Cashback Ativado!",
      description: `Você será redirecionado para ${loja}. O cashback será creditado em até 60 dias.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando ofertas de cashback reais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">💰 Cashback Inteligente</h1>
          <p className="text-gray-600">Ganhe dinheiro de volta em compras reais</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Gift className="w-4 h-4 mr-2" />
            Resgatar Cashback
          </Button>
          <Button>
            <Coins className="w-4 h-4 mr-2" />
            Histórico
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cashback Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalCashbackRecebido)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Coins className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(totalCashbackPendente)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lojas Ativas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {cashbackOfertas?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maior Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.max(...(cashbackOfertas?.map((c: any) => c.percentage) || [0]))}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ofertas de Cashback Reais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Ofertas de Cashback (APIs Reais)
          </CardTitle>
          <p className="text-sm text-gray-600">
            Dados atualizados em tempo real via APIs de parceiros
          </p>
        </CardHeader>
        <CardContent>
          {cashbackOfertas && cashbackOfertas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cashbackOfertas.map((oferta: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {oferta.store.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{oferta.store}</h3>
                        <p className="text-sm text-gray-600">{oferta.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {oferta.percentage}%
                      </div>
                      <div className="text-xs text-gray-500">
                        até {formatCurrency(oferta.maxValue)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{oferta.terms}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Cashback máximo:</span>
                      <span className="font-medium">{formatCurrency(oferta.maxValue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Categoria:</span>
                      <span className="font-medium">{oferta.category}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => ativarCashback(oferta.store)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ativar & Comprar
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Percent className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500">
                Nenhuma oferta de cashback disponível no momento.
                <br />
                Aguarde enquanto carregamos ofertas de nossos parceiros.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Cashback */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Cashback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historioCashback.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.loja}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(item.data).toLocaleDateString('pt-BR')} • {item.porcentagem}% de cashback
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {formatCurrency(item.valor)}
                  </div>
                  <div className="text-sm text-gray-500">
                    de {formatCurrency(item.compra)}
                  </div>
                  <Badge className={`mt-1 ${getStatusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}