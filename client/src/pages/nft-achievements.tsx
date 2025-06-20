import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, TrendingUp } from "lucide-react";
import NFTGenerator from "@/components/nft/nft-generator";

export default function NFTAchievements() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              NFT de Conquistas
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme suas conquistas financeiras em NFTs únicos e compartilháveis. 
            Cada marco importante vira um certificado digital exclusivo.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-800">12</div>
              <div className="text-purple-600">NFTs Gerados</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-800">3</div>
              <div className="text-blue-600">NFTs Raros</div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-800">R$ 15k</div>
              <div className="text-green-600">Valor Conquistado</div>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-yellow-800">85%</div>
              <div className="text-yellow-600">Completude</div>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold">Conquiste Marcos</h3>
                <p className="text-gray-600 text-sm">
                  Alcance metas financeiras importantes como primeira economia, quitação de dívidas ou investimentos
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold">Gere NFT Único</h3>
                <p className="text-gray-600 text-sm">
                  Cada conquista gera um NFT com design exclusivo baseado na raridade e tipo de conquista
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold">Compartilhe</h3>
                <p className="text-gray-600 text-sm">
                  Compartilhe suas conquistas nas redes sociais e inspire outros com seu progresso financeiro
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rarity System */}
        <Card>
          <CardHeader>
            <CardTitle>Sistema de Raridade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg text-center">
                <Badge className="bg-gray-500 mb-2">COMUM</Badge>
                <h4 className="font-semibold">Primeiros Passos</h4>
                <p className="text-sm text-gray-600">Primeiras economias e metas básicas</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg text-center">
                <Badge className="bg-blue-500 mb-2">RARO</Badge>
                <h4 className="font-semibold">Progresso Sólido</h4>
                <p className="text-sm text-gray-600">Investimentos e metas intermediárias</p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-lg text-center">
                <Badge className="bg-emerald-500 mb-2">ÉPICO</Badge>
                <h4 className="font-semibold">Grandes Conquistas</h4>
                <p className="text-sm text-gray-600">Liberdade financeira e marcos importantes</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg text-center">
                <Badge className="bg-purple-500 mb-2">LENDÁRIO</Badge>
                <h4 className="font-semibold">Mestria Financeira</h4>
                <p className="text-sm text-gray-600">Conquistas extraordinárias e inspiracionais</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NFT Generator Component */}
        <NFTGenerator />
      </div>
    </div>
  );
}