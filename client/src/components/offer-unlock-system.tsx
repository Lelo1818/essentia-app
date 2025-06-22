import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Lock, Unlock, Copy, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

interface UnlockableOffer {
  id: string;
  title: string;
  description: string;
  partner: string;
  discount: number;
  couponCode?: string;
  requirements: string;
  unlocked: boolean;
  category: string;
  value: number;
  validUntil: string;
}

export default function OfferUnlockSystem() {
  const [unlockedOffers, setUnlockedOffers] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
  });

  // Ofertas baseadas em comportamento real do usuário
  const availableOffers: UnlockableOffer[] = [
    {
      id: 'edu_udemy',
      title: 'Udemy - 80% OFF em Cursos',
      description: 'Desconto massivo em cursos de tecnologia e negócios',
      partner: 'Udemy',
      discount: 80,
      couponCode: 'FLOW80OFF',
      requirements: 'Complete 1 meta financeira',
      unlocked: false,
      category: 'educacao',
      value: 29.90,
      validUntil: '2025-08-31'
    },
    {
      id: 'cash_amazon',
      title: 'Amazon - 5% Cashback',
      description: 'Cashback em todas as categorias da Amazon',
      partner: 'Méliuz',
      discount: 0,
      requirements: 'Mantenha saldo positivo por 30 dias',
      unlocked: false,
      category: 'marketplace',
      value: 0,
      validUntil: '2025-12-31'
    },
    {
      id: 'premium_iphone',
      title: 'iPhone 15 Pro - R$ 1.000 OFF',
      description: 'Desconto exclusivo para usuários Flow Premium',
      partner: 'iPlace',
      discount: 1000,
      couponCode: 'FLOWPREMIUM1K',
      requirements: 'Atinja nível Premium (5+ metas)',
      unlocked: false,
      category: 'tecnologia',
      value: 8999.00,
      validUntil: '2025-07-15'
    },
    {
      id: 'health_plan',
      title: 'Plano de Saúde - 3 meses grátis',
      description: 'Benefício de saúde para poupadores consistentes',
      partner: 'Unimed',
      discount: 100,
      couponCode: 'FLOWHEALTH3',
      requirements: 'Economy R$ 2.000+ em 60 dias',
      unlocked: false,
      category: 'saude',
      value: 450.00,
      validUntil: '2025-09-30'
    },
    {
      id: 'invest_course',
      title: 'Curso de Investimentos Premium',
      description: 'Mentoria 1:1 + curso completo de investimentos',
      partner: 'Rico Educação',
      discount: 50,
      couponCode: 'FLOWINVEST50',
      requirements: 'Patrimônio > R$ 10.000',
      unlocked: false,
      category: 'educacao',
      value: 2997.00,
      validUntil: '2025-10-31'
    }
  ];

  // Lógica de desbloqueio baseada no perfil financeiro real
  useEffect(() => {
    if (!summary || !goals) return;

    const currentBalance = summary.balance || 0;
    const completedGoals = goals.filter(g => 
      parseFloat(g.currentAmount || 0) >= parseFloat(g.targetAmount || 1)
    ).length;

    const newUnlocked: string[] = [];

    // Meta completada = Curso Udemy
    if (completedGoals >= 1) {
      newUnlocked.push('edu_udemy');
    }

    // Saldo alto = Cashback Amazon
    if (currentBalance > 2000) {
      newUnlocked.push('cash_amazon');
    }

    // 5+ metas = iPhone Premium
    if (completedGoals >= 5) {
      newUnlocked.push('premium_iphone');
    }

    // Economia consistente = Plano saúde
    if (currentBalance > 5000) {
      newUnlocked.push('health_plan');
    }

    // Alto patrimônio = Curso investimentos
    if (currentBalance > 10000) {
      newUnlocked.push('invest_course');
    }

    // Verificar se há novos desbloqueios
    const reallyNew = newUnlocked.filter(id => !unlockedOffers.includes(id));
    if (reallyNew.length > 0) {
      setUnlockedOffers(newUnlocked);
      
      // Mostrar toast para cada nova oferta desbloqueada
      reallyNew.forEach(offerId => {
        const offer = availableOffers.find(o => o.id === offerId);
        if (offer) {
          toast({
            title: "🎉 Nova oferta desbloqueada!",
            description: `${offer.title} - Parabéns pelo seu progresso!`,
          });
        }
      });
    }
  }, [summary, goals, unlockedOffers, toast]);

  const copyCode = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado!",
      description: `${code} foi copiado. Use na finalização da compra.`,
    });
  };

  const goToPartner = (partner: string, title: string) => {
    toast({
      title: "Redirecionando...",
      description: `Você será direcionado para ${partner} em uma nova aba.`,
    });
    // Simular redirecionamento
    console.log(`Redirect to: ${partner} - ${title}`);
  };

  const offersWithStatus = availableOffers.map(offer => ({
    ...offer,
    unlocked: unlockedOffers.includes(offer.id)
  }));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">🎁 Sistema de Desbloqueio Inteligente</h2>
        <p className="text-gray-600">
          Ofertas exclusivas baseadas no seu comportamento financeiro real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offersWithStatus.map((offer) => (
          <Card key={offer.id} className={`transition-all duration-300 ${
            offer.unlocked 
              ? 'border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-blue-50' 
              : 'border-gray-200 opacity-75'
          }`}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header da oferta */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      offer.unlocked ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {offer.unlocked ? (
                        <Unlock className="w-5 h-5 text-green-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{offer.title}</h3>
                      <p className="text-sm text-gray-600">por {offer.partner}</p>
                    </div>
                  </div>
                  
                  <Badge className={offer.unlocked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                    {offer.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600">{offer.description}</p>

                {/* Valor da oferta */}
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Desconto:</span>
                    <span className="font-bold text-green-600">
                      {offer.discount > 0 
                        ? `${offer.discount}% OFF`
                        : '5% Cashback'
                      }
                    </span>
                  </div>
                  {offer.value > 0 && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">Valor:</span>
                      <span className="font-medium">
                        {formatCurrency(offer.value)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Requisitos */}
                <div className={`p-3 rounded border-l-4 ${
                  offer.unlocked 
                    ? 'bg-green-50 border-green-400' 
                    : 'bg-yellow-50 border-yellow-400'
                }`}>
                  <p className="text-sm">
                    <strong>Requisito:</strong> {offer.requirements}
                  </p>
                </div>

                {/* Código do cupom (se desbloqueado) */}
                {offer.unlocked && offer.couponCode && (
                  <div className="bg-gray-100 p-3 rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Código:</p>
                        <p className="font-mono font-bold">{offer.couponCode}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyCode(offer.couponCode!, offer.title)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="flex gap-2">
                  {offer.unlocked ? (
                    <>
                      {offer.couponCode && (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => copyCode(offer.couponCode!, offer.title)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar Código
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => goToPartner(offer.partner, offer.title)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ir à Loja
                      </Button>
                    </>
                  ) : (
                    <Button disabled className="w-full" size="sm">
                      <Lock className="w-4 h-4 mr-2" />
                      Bloqueado
                    </Button>
                  )}
                </div>

                {/* Validade */}
                <p className="text-xs text-gray-500 text-center">
                  Válido até: {new Date(offer.validUntil).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo de desbloqueios */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Progresso de Desbloqueio</h3>
              <p className="text-gray-600">
                {unlockedOffers.length} de {availableOffers.length} ofertas desbloqueadas
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Ofertas Ativas</p>
              <p className="text-2xl font-bold text-blue-600">{unlockedOffers.length}</p>
            </div>
            <div>
              <p className="font-medium">Valor Total Desbloqueado</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  offersWithStatus
                    .filter(o => o.unlocked && o.value > 0)
                    .reduce((sum, o) => sum + (o.value * o.discount / 100), 0)
                )}
              </p>
            </div>
            <div>
              <p className="font-medium">Próximo Desbloqueio</p>
              <p className="text-sm text-gray-600">
                {offersWithStatus.find(o => !o.unlocked)?.requirements || 'Todas desbloqueadas!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}