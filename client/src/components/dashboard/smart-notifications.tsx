import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, TrendingUp, Target, Trophy, Zap, X, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  action?: string;
  actionUrl?: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  dismissed?: boolean;
}

export default function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
  });

  const { data: debts = [] } = useQuery({
    queryKey: ["/api/debts"],
  });

  // Gerar notificações inteligentes baseadas no estado financeiro
  useEffect(() => {
    if (!summary) return;

    const newNotifications: Notification[] = [];
    const currentBalance = summary.balance || 0;
    const monthlyIncome = summary.totalIncome || 0;
    const monthlyExpenses = summary.totalExpenses || 0;
    const monthlySavings = monthlyIncome - monthlyExpenses;

    // Alertas de Saldo
    if (currentBalance < 0) {
      newNotifications.push({
        id: 'saldo_negativo',
        type: 'warning',
        title: 'Atenção: Saldo Negativo',
        message: `Seu saldo está em ${formatCurrency(currentBalance)}. Que tal revisar seus gastos?`,
        action: 'Ver Fluxo de Caixa',
        actionUrl: '/fluxo-caixa',
        timestamp: new Date(),
        priority: 'high'
      });
    } else if (currentBalance > 5000) {
      newNotifications.push({
        id: 'saldo_alto',
        type: 'success',
        title: 'Oportunidade de Investimento',
        message: `Você tem ${formatCurrency(currentBalance)} disponível. Que tal criar uma nova meta?`,
        action: 'Criar Meta',
        actionUrl: '/metas',
        timestamp: new Date(),
        priority: 'medium'
      });
    }

    // Alertas de Poupança
    if (monthlySavings < 0) {
      newNotifications.push({
        id: 'gastando_mais',
        type: 'warning',
        title: 'Gastos Acima da Renda',
        message: `Você está gastando ${formatCurrency(Math.abs(monthlySavings))} a mais do que ganha.`,
        action: 'Revisar Gastos',
        actionUrl: '/gastos',
        timestamp: new Date(),
        priority: 'high'
      });
    } else if (monthlySavings > 1000) {
      newNotifications.push({
        id: 'poupador_expert',
        type: 'achievement',
        title: 'Conquista Desbloqueada!',
        message: `Parabéns! Você está poupando ${formatCurrency(monthlySavings)} por mês.`,
        action: 'Ver Conquistas',
        actionUrl: '/conquistas',
        timestamp: new Date(),
        priority: 'medium'
      });
    }

    // Alertas de Metas
    goals.forEach((goal: any) => {
      const progress = (parseFloat(goal.currentAmount || 0) / parseFloat(goal.targetAmount || 1)) * 100;
      
      if (progress >= 100) {
        newNotifications.push({
          id: `meta_completa_${goal.id}`,
          type: 'achievement',
          title: 'Meta Conquistada!',
          message: `Parabéns! Você atingiu a meta "${goal.title}".`,
          action: 'Celebrar',
          actionUrl: '/conquistas',
          timestamp: new Date(),
          priority: 'high'
        });
      } else if (progress >= 80) {
        newNotifications.push({
          id: `meta_quase_${goal.id}`,
          type: 'info',
          title: 'Meta Quase Completa',
          message: `Faltam apenas ${formatCurrency(parseFloat(goal.targetAmount) - parseFloat(goal.currentAmount || 0))} para "${goal.title}".`,
          action: 'Ver Meta',
          actionUrl: '/metas',
          timestamp: new Date(),
          priority: 'medium'
        });
      }
    });

    // Alertas de Dívidas
    debts.forEach((debt: any) => {
      const daysOverdue = debt.daysOverdue || 0;
      
      if (daysOverdue > 30) {
        newNotifications.push({
          id: `divida_atrasada_${debt.id}`,
          type: 'warning',
          title: 'Dívida em Atraso',
          message: `${debt.description} está ${daysOverdue} dias em atraso.`,
          action: 'Renegociar',
          actionUrl: '/renegociar-dividas',
          timestamp: new Date(),
          priority: 'high'
        });
      } else if (daysOverdue > 0) {
        newNotifications.push({
          id: `divida_vencendo_${debt.id}`,
          type: 'warning',
          title: 'Pagamento em Atraso',
          message: `${debt.description} venceu há ${daysOverdue} dias.`,
          action: 'Pagar Agora',
          actionUrl: '/agendar-pagamentos',
          timestamp: new Date(),
          priority: 'medium'
        });
      }
    });

    // Dicas Inteligentes
    if (monthlySavings > 0 && goals.length === 0) {
      newNotifications.push({
        id: 'dica_primeira_meta',
        type: 'info',
        title: 'Dica Inteligente',
        message: `Com ${formatCurrency(monthlySavings)}/mês, você pode criar sua primeira meta financeira.`,
        action: 'Criar Meta',
        actionUrl: '/metas',
        timestamp: new Date(),
        priority: 'low'
      });
    }

    setNotifications(newNotifications.filter(n => !n.dismissed));
  }, [summary, goals, debts]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, dismissed: true } : n
    ).filter(n => !n.dismissed));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'achievement': return 'bg-purple-50 border-purple-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const priorityNotifications = notifications
    .filter(n => !n.dismissed)
    .sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    });

  if (priorityNotifications.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Alertas Inteligentes
          <Badge variant="secondary">{priorityNotifications.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {priorityNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getBackgroundColor(notification.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <Badge variant="outline" size="sm">
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                    {notification.action && (
                      <Button size="sm" variant="outline" className="mr-2">
                        {notification.action}
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dismissNotification(notification.id)}
                  className="ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}