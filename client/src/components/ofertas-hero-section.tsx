import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Award, Target } from "lucide-react";

export default function OfertasHeroSection() {
  return (
    <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <CardContent className="relative p-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Título Principal */}
          <div className="space-y-3">
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1">
              Ecossistema de Recompensas Inteligente
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              No Flow, quem cuida bem do dinheiro não ganha só paz.
              <br />
              <span className="text-yellow-300">Ganha poder de compra.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium">
              Aqui, a economia vira conquista — e o bom hábito vira vantagem.
            </p>
          </div>

          {/* Métricas de Impacto */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold">47.850</div>
              <div className="text-sm text-blue-100">Milhas Acumuladas</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-300" />
              </div>
              <div className="text-2xl font-bold">R$ 21.999</div>
              <div className="text-sm text-blue-100">Economia Total</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-purple-300" />
              </div>
              <div className="text-2xl font-bold">Premium</div>
              <div className="text-sm text-blue-100">Nível Atual</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-8 h-8 text-orange-300" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-blue-100">Metas Conquistadas</div>
            </div>
          </div>

          {/* Call to Action Sutil */}
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-lg text-blue-100 mb-4">
              Cada oferta abaixo foi <strong>desbloqueada pelo seu comportamento financeiro</strong>.
              <br />
              Não são descontos genéricos — são recompensas que você conquistou.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-green-500/20 text-green-200 border-green-300/30">
                ✅ Meta Completada
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-300/30">
                ✅ Saldo Positivo
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-200 border-purple-300/30">
                ✅ Nível Premium
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-300/30">
                ✅ Poupador Consistente
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}