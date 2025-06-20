import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  Target,
  X,
  CheckCircle,
  DollarSign,
  Clock
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

interface Notification {
  id: string;
  type: 'alert' | 'opportunity' | 'reminder' | 'achievement';
  title: string;
  message: string;
  amount?: number;
  priority: 'high' | 'medium' | 'low';
  actionLabel?: string;
  onAction?: () => void;
  createdAt: Date;
}

export default function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Fatura vencendo amanhã',
      message: 'Cartão Nubank vence em 1 dia',
      amount: 2847.30,
      priority: 'high',
      actionLabel: 'Pagar Agora',
      createdAt: new Date()
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Oportunidade de investimento',
      message: 'CDB 115% CDI disponível - prazo 18 meses',
      priority: 'medium',
      actionLabel: 'Ver Detalhes',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Meta alcançada!',
      message: 'Você economizou R$ 3.000 este mês',
      amount: 3000,
      priority: 'low',
      actionLabel: 'Celebrar',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Aporte mensal disponível',
      message: 'Você tem R$ 2.500 disponíveis para investir',
      amount: 2500,
      priority: 'medium',
      actionLabel: 'Investir',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'opportunity': return TrendingUp;
      case 'reminder': return Clock;
      case 'achievement': return Target;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-red-200 bg-red-50';
    if (type === 'opportunity') return 'border-green-200 bg-green-50';
    if (type === 'achievement') return 'border-purple-200 bg-purple-50';
    return 'border-blue-200 bg-blue-50';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAction = (notification: Notification) => {
    if (notification.onAction) {
      notification.onAction();
    }
    // Simular ação realizada
    console.log(`Ação executada para: ${notification.title}`);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  const highPriorityCount = notifications.filter(n => n.priority === 'high').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificações Inteligentes
            {highPriorityCount > 0 && (
              <Badge className="ml-2 bg-red-100 text-red-700">
                {highPriorityCount} urgente{highPriorityCount > 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm">
            Ver Todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${getNotificationColor(notification.type, notification.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 rounded-full bg-white/70">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      
                      {notification.amount && (
                        <div className="text-lg font-semibold text-gray-800 mb-2">
                          {formatCurrency(notification.amount)}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        
                        <div className="flex space-x-2">
                          {notification.actionLabel && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleAction(notification)}
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs p-1"
                            onClick={() => dismissNotification(notification.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p>Você está em dia com tudo!</p>
            <p className="text-sm">Nenhuma notificação urgente.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}