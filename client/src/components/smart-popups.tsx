import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Gift, Star, TrendingUp, Target } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

interface SmartPopup {
  id: string;
  type: 'celebration' | 'opportunity' | 'warning' | 'tip';
  trigger: string;
  title: string;
  message: string;
  offerTitle?: string;
  offerValue?: number;
  offerUrl?: string;
  priority: 'high' | 'medium' | 'low';
  showOnce?: boolean;
}

export default function SmartPopups() {
  const [activePopup, setActivePopup] = useState<SmartPopup | null>(null);
  const [dismissedPopups, setDismissedPopups] = useState<string[]>([]);

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
  });

  // Sistema inteligente de pop-ups baseado no contexto do usuário
  useEffect(() => {
    if (!summary) return;

    const currentBalance = summary.balance || 0;
    const monthlyIncome = summary.totalIncome || 0;
    const monthlySavings = monthlyIncome - (summary.totalExpenses || 0);
    const completedGoals = goals.filter(g => parseFloat(g.currentAmount || 0) >= parseFloat(g.targetAmount || 1));

    const popupTriggers: SmartPopup[] = [
      // Celebração - Meta completada
      {
        id: 'meta_completada',
        type: 'celebration',
        trigger: 'goal_completed',
        title: '🎉 Parabéns! Meta Conquistada!',
        message: 'Você atingiu sua meta financeira! Que tal celebrar com uma oferta especial?',
        offerTitle: 'Viagem Europa - 30% OFF',
        offerValue: 6800,
        offerUrl: '/ofertas',
        priority: 'high',
        showOnce: true
      },

      // Oportunidade - Saldo alto
      {
        id: 'saldo_alto_investimento',
        type: 'opportunity',
        trigger: 'high_balance',
        title: '💰 Oportunidade de Investimento',
        message: `Você tem ${formatCurrency(currentBalance)} disponível. Hora de fazer seu dinheiro trabalhar para você!`,
        offerTitle: 'CDB 120% CDI - Sem taxa',
        offerValue: 0,
        offerUrl: '/ofertas',
        priority: 'medium'
      },

      // Dica - Primeira meta
      {
        id: 'primeira_meta',
        type: 'tip',
        trigger: 'no_goals',
        title: '🎯 Dica Inteligente',
        message: `Com ${formatCurrency(monthlySavings)} de sobra mensal, você pode criar sua primeira meta!`,
        offerTitle: 'Curso: Primeiros Passos nos Investimentos',
        offerValue: 197,
        offerUrl: '/metas',
        priority: 'low'
      },

      // Recompensa - Poupador consistente
      {
        id: 'poupador_expert',
        type: 'celebration',
        trigger: 'good_saver',
        title: '🏆 Poupador Expert Desbloqueado!',
        message: 'Você está economizando mais de R$ 1.000/mês. Ofertas Premium liberadas!',
        offerTitle: 'iPhone 15 Pro - 15% Cashback',
        offerValue: 8999,
        offerUrl: '/ofertas',
        priority: 'high'
      }
    ];

    // Lógica de trigger baseada no estado financeiro
    let triggeredPopup: SmartPopup | null = null;

    if (completedGoals.length > 0 && !dismissedPopups.includes('meta_completada')) {
      triggeredPopup = popupTriggers.find(p => p.id === 'meta_completada') || null;
    } else if (currentBalance > 5000 && !dismissedPopups.includes('saldo_alto_investimento')) {
      triggeredPopup = popupTriggers.find(p => p.id === 'saldo_alto_investimento') || null;
    } else if (monthlySavings > 1000 && !dismissedPopups.includes('poupador_expert')) {
      triggeredPopup = popupTriggers.find(p => p.id === 'poupador_expert') || null;
    } else if (goals.length === 0 && monthlySavings > 0 && !dismissedPopups.includes('primeira_meta')) {
      triggeredPopup = popupTriggers.find(p => p.id === 'primeira_meta') || null;
    }

    // Mostrar popup se houver trigger e não estiver ativo
    if (triggeredPopup && !activePopup) {
      // Delay para não ser intrusivo
      const timer = setTimeout(() => {
        setActivePopup(triggeredPopup);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [summary, goals, dismissedPopups, activePopup]);

  const dismissPopup = (popupId: string, permanent = false) => {
    setActivePopup(null);
    if (permanent) {
      setDismissedPopups(prev => [...prev, popupId]);
      // Persistir no localStorage
      localStorage.setItem('dismissedPopups', JSON.stringify([...dismissedPopups, popupId]));
    }
  };

  const getPopupColor = (type: string) => {
    switch (type) {
      case 'celebration': return 'from-green-500 to-emerald-600';
      case 'opportunity': return 'from-blue-500 to-indigo-600';
      case 'warning': return 'from-yellow-500 to-orange-600';
      case 'tip': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'celebration': return <Gift className="w-6 h-6 text-white" />;
      case 'opportunity': return <TrendingUp className="w-6 h-6 text-white" />;
      case 'warning': return <Star className="w-6 h-6 text-white" />;
      case 'tip': return <Target className="w-6 h-6 text-white" />;
      default: return <Gift className="w-6 h-6 text-white" />;
    }
  };

  // Carregar popups dismissados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dismissedPopups');
    if (saved) {
      setDismissedPopups(JSON.parse(saved));
    }
  }, []);

  if (!activePopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header colorido baseado no tipo */}
        <div className={`h-2 bg-gradient-to-r ${getPopupColor(activePopup.type)}`}></div>
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full bg-gradient-to-r ${getPopupColor(activePopup.type)}`}>
                {getIcon(activePopup.type)}
              </div>
              <div>
                <CardTitle className="text-lg">{activePopup.title}</CardTitle>
                <Badge variant="outline" className="mt-1">
                  {activePopup.priority === 'high' ? 'Urgente' : 
                   activePopup.priority === 'medium' ? 'Importante' : 'Dica'}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissPopup(activePopup.id)}
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600">{activePopup.message}</p>

          {activePopup.offerTitle && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
              <h4 className="font-semibold text-blue-900 mb-2">Oferta Especial:</h4>
              <p className="text-sm text-blue-800 mb-2">{activePopup.offerTitle}</p>
              {activePopup.offerValue && activePopup.offerValue > 0 && (
                <p className="font-bold text-green-600">
                  {formatCurrency(activePopup.offerValue)}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                if (activePopup.offerUrl) {
                  window.location.href = activePopup.offerUrl;
                }
                dismissPopup(activePopup.id, true);
              }}
            >
              {activePopup.offerTitle ? 'Ver Oferta' : 'Entendi'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => dismissPopup(activePopup.id, true)}
            >
              Não mostrar novamente
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            💡 Ofertas baseadas no seu perfil financeiro real
          </p>
        </CardContent>
      </Card>
    </div>
  );
}