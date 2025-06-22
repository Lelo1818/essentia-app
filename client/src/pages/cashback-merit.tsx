import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Gift, Target } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function CashbackMerit() {
  const { data: meritData, isLoading } = useQuery({
    queryKey: ['/api/cashback-merit'],
  });

  const { data: challenges = [], isLoading: challengesLoading } = useQuery({
    queryKey: ['/api/weekly-challenges'],
  });

  const { data: patterns, isLoading: patternsLoading } = useQuery({
    queryKey: ['/api/behavior-patterns'],
  });

  const { data: behaviorOffers, isLoading: offersLoading } = useQuery({
    queryKey: ['/api/behavior-unlocked-offers'],
  });

  if (isLoading || challengesLoading || patternsLoading || offersLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando sistema de mérito...</p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    const colors = {
      Bronze: "bg-amber-600",
      Silver: "bg-gray-400", 
      Gold: "bg-yellow-500",
      Premium: "bg-purple-600"
    };
    return colors[level as keyof typeof colors] || "bg-blue-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cashback por Mérito</h1>
          <p className="text-gray-600">Sua disciplina financeira gera recompensas reais</p>
        </div>
        <Badge className={`${getLevelColor(meritData?.userLevel)} text-white px-4 py-2`}>
          <Star className="w-4 h-4 mr-2" />
          Nível {meritData?.userLevel}
        </Badge>
      </div>

      {/* Status do Cashback por Mérito */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Taxa de Cashback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {meritData?.cashbackRate?.percentage}%
            </div>
            <p className="text-sm text-gray-600">
              Máximo mensal: {formatCurrency(meritData?.cashbackRate?.maxMonthly || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ganho Este Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatCurrency(meritData?.earnedThisMonth || 0)}
            </div>
            <p className="text-sm text-gray-600">
              {Math.round(((meritData?.earnedThisMonth || 0) / (meritData?.cashbackRate?.maxMonthly || 1)) * 100)}% do limite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Próximo Nível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold mb-2">Premium</div>
            <Progress value={85} className="mb-2" />
            <p className="text-sm text-gray-600">85% para 5% cashback</p>
          </CardContent>
        </Card>
      </div>

      {/* Desafios Semanais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Desafios Semanais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge: any) => (
              <div key={challenge.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                  <Badge variant={challenge.difficulty === 'easy' ? 'default' : 'secondary'}>
                    {challenge.daysLeft} dias
                  </Badge>
                </div>
                
                <Progress value={challenge.progress} className="mb-3" />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Progresso: {challenge.progress}%
                  </div>
                  <div className="text-sm font-medium">
                    Recompensa: +{challenge.reward.xp} XP
                  </div>
                </div>
                
                {challenge.reward.unlock && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                    🎁 Desbloqueará: {challenge.reward.unlock}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Comportamental */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Análise Comportamental
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {patterns?.savingConsistency?.score}%
              </div>
              <div className="text-sm text-gray-600">Consistência Poupança</div>
              <div className="text-xs text-green-600 mt-1">
                {patterns?.savingConsistency?.trend === 'improving' ? '📈 Melhorando' : '📊 Estável'}
              </div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {patterns?.spendingControl?.score}%
              </div>
              <div className="text-sm text-gray-600">Controle de Gastos</div>
              <div className="text-xs text-blue-600 mt-1">
                {patterns?.spendingControl?.trend === 'stable' ? '📊 Estável' : '📈 Melhorando'}
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {patterns?.goalProgress?.score}%
              </div>
              <div className="text-sm text-gray-600">Progresso das Metas</div>
              <div className="text-xs text-purple-600 mt-1">
                {patterns?.goalProgress?.trend === 'excellent' ? '⭐ Excelente' : '📈 Bom'}
              </div>
            </div>
          </div>

          {/* Recomendações Inteligentes */}
          <div className="space-y-3">
            <h4 className="font-semibold">Recomendações Inteligentes</h4>
            {patterns?.recommendations?.map((rec: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm">{rec.message}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Confiança: {rec.confidence}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ofertas Desbloqueadas por Comportamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Ofertas Desbloqueadas por Comportamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {behaviorOffers?.availableOffers?.map((offer: any) => (
              <div key={offer.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{offer.title}</h3>
                    <p className="text-sm text-gray-600">{offer.description}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Desbloqueado por: {offer.unlockedBy.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <Badge variant="secondary">{offer.merchant}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {offer.discount && (
                      <span className="text-green-600 font-semibold">
                        {offer.discount} desconto
                      </span>
                    )}
                    {offer.cashback && (
                      <span className="text-blue-600 font-semibold">
                        {offer.cashback} cashback
                      </span>
                    )}
                  </div>
                  <Button size="sm">
                    {offer.code ? 'Copiar Código' : 'Usar Oferta'}
                  </Button>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Expira em: {offer.expiresIn}
                </div>
              </div>
            ))}
          </div>

          {/* Próximo Desbloqueio */}
          {behaviorOffers?.nextUnlock && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Próximo Desbloqueio</h4>
                  <p className="text-sm text-gray-600">{behaviorOffers.nextUnlock.offer}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">
                    Score {behaviorOffers.nextUnlock.score}
                  </div>
                  <div className="text-xs text-gray-500">
                    Atual: {behaviorOffers.userScore}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}