import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Percent, TrendingUp, Gift } from "lucide-react";
import CashbackMarketplace from "@/components/cashback/marketplace";

export default function CashbackMarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Marketplace de Cashback
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme cada compra em economia. Ganhe dinheiro de volta comprando nas suas lojas favoritas 
            através da nossa plataforma integrada.
          </p>
          <Badge className="bg-orange-600 text-white px-4 py-1 text-sm">
            ATÉ 12% DE CASHBACK
          </Badge>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <Percent className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Cashback Real</h3>
              <p className="text-green-700 text-sm">
                Dinheiro de volta direto na sua conta Flow, sem pegadinhas ou complicações
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-blue-800 mb-2">Otimização Automática</h3>
              <p className="text-blue-700 text-sm">
                IA encontra as melhores ofertas e sugere quando e onde comprar
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-800 mb-2">Recompensas Extras</h3>
              <p className="text-purple-700 text-sm">
                Bônus especiais para usuários Flow e promoções exclusivas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold">Escolha a Loja</h4>
                <p className="text-gray-600 text-sm">
                  Navegue pelas ofertas de cashback e ative a que preferir
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold">Faça a Compra</h4>
                <p className="text-gray-600 text-sm">
                  Compre normalmente através do link ou código fornecido
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold">Rastreamento</h4>
                <p className="text-gray-600 text-sm">
                  Sistema confirma sua compra e calcula o cashback automaticamente
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h4 className="font-semibold">Receba o Dinheiro</h4>
                <p className="text-gray-600 text-sm">
                  Cashback é creditado em sua conta Flow em até 30 dias
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Impacto Real dos Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-700">R$ 2.8M</div>
                <div className="text-green-600">Cashback distribuído</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700">150+</div>
                <div className="text-green-600">Lojas parceiras</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700">45K</div>
                <div className="text-green-600">Usuários ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700">R$ 186</div>
                <div className="text-green-600">Média cashback/mês</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Marketplace */}
        <CashbackMarketplace />

        {/* Tips */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Dicas para Maximizar seu Cashback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">💡 Estratégias Inteligentes</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Combine promoções da loja com nosso cashback</li>
                  <li>• Compre em datas especiais (Black Friday, Cyber Monday)</li>
                  <li>• Use cartões de crédito com cashback adicional</li>
                  <li>• Ative notificações para ofertas em alta</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">⚠️ Cuidados Importantes</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Sempre compare preços antes de comprar</li>
                  <li>• Não compre apenas pelo cashback</li>
                  <li>• Leia os termos de cada oferta</li>
                  <li>• Verifique prazos de confirmação</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}