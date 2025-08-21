import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Heart, 
  Zap, 
  Brain,
  Clock,
  TrendingUp,
  MessageCircle,
  X
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface PresencaVivaProps {
  triadScores: TriadScores;
  lastRitualCompleted?: Date;
}

interface PresencaMessage {
  id: string;
  type: 'recomendacao' | 'conclusao' | 'insights' | 'motivacao';
  title: string;
  content: string;
  icon: any;
  color: string;
  bgColor: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const PresencaViva = ({ triadScores, lastRitualCompleted }: PresencaVivaProps) => {
  const [activeMessage, setActiveMessage] = useState<PresencaMessage | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  // Gerar mensagem contextual baseada no estado atual
  const generateContextualMessage = (): PresencaMessage | null => {
    const now = new Date();
    const lastRitual = lastRitualCompleted ? new Date(lastRitualCompleted) : null;
    const timeSinceLastRitual = lastRitual ? (now.getTime() - lastRitual.getTime()) / (1000 * 60 * 60) : null;

    // Identificar o aspecto mais baixo da tríade
    const { consciencia, energia, coerencia } = triadScores;
    const lowestScore = Math.min(consciencia, energia, coerencia);
    const lowestAspect = consciencia === lowestScore ? 'consciencia' : 
                       energia === lowestScore ? 'energia' : 'coerencia';

    // Mensagens pós-conclusão (primeiras 2 horas após ritual)
    if (timeSinceLastRitual && timeSinceLastRitual < 2) {
      return {
        id: 'post-ritual',
        type: 'conclusao',
        title: 'Ritual Concluído',
        content: 'Que lindo! Você dedicou tempo ao seu crescimento. Como você está se sentindo após esta prática? Permita-se integrar esta experiência.',
        icon: Sparkles,
        color: 'text-green-600',
        bgColor: 'from-green-50 to-emerald-50 border-green-200'
      };
    }

    // Mensagens baseadas no nível mais baixo da tríade
    switch (lowestAspect) {
      case 'consciencia':
        if (consciencia < 35) {
          return {
            id: 'consciencia-baixa',
            type: 'recomendacao',
            title: 'Momento de Reflexão',
            content: 'Sua consciência pede atenção. Que tal dedicar alguns minutos para se conectar com seus valores e propósito mais profundos?',
            icon: Brain,
            color: 'text-purple-600',
            bgColor: 'from-purple-50 to-indigo-50 border-purple-200'
          };
        }
        break;

      case 'energia':
        if (energia < 35) {
          return {
            id: 'energia-baixa',
            type: 'recomendacao',
            title: 'Desperte sua Vitalidade',
            content: 'Sua energia vital precisa de nutrição. Considere uma caminhada, respirações profundas ou um momento de movimento consciente.',
            icon: Zap,
            color: 'text-yellow-600',
            bgColor: 'from-yellow-50 to-orange-50 border-yellow-200'
          };
        }
        break;

      case 'coerencia':
        if (coerencia < 35) {
          return {
            id: 'coerencia-baixa',
            type: 'recomendacao',
            title: 'Busque Equilíbrio',
            content: 'Sua coerência interna está pedindo harmonia. Que tal um momento de respiração consciente ou uma prática de gratidão?',
            icon: Heart,
            color: 'text-red-600',
            bgColor: 'from-red-50 to-pink-50 border-red-200'
          };
        }
        break;
    }

    // Mensagens motivacionais para scores médios/altos
    const averageScore = (consciencia + energia + coerencia) / 3;
    
    if (averageScore >= 70) {
      return {
        id: 'alto-desempenho',
        type: 'motivacao',
        title: 'Você está Radiante!',
        content: 'Sua tríade está em belo equilíbrio. Continue cultivando esta harmonia e seja um exemplo de presença consciente no mundo.',
        icon: TrendingUp,
        color: 'text-emerald-600',
        bgColor: 'from-emerald-50 to-green-50 border-emerald-200'
      };
    }

    if (averageScore >= 50) {
      return {
        id: 'progresso-consistente',
        type: 'insights',
        title: 'Caminho do Crescimento',
        content: 'Você está em uma jornada consistente de desenvolvimento. Cada pequeno passo conta. Confie no processo.',
        icon: TrendingUp,
        color: 'text-blue-600',
        bgColor: 'from-blue-50 to-indigo-50 border-blue-200'
      };
    }

    // Mensagem padrão de boas-vindas
    return {
      id: 'bem-vindo',
      type: 'motivacao',
      title: 'Presença Viva',
      content: 'Sua jornada de crescimento é única e valiosa. Cada momento de presença consciente é um presente para você e para o mundo.',
      icon: MessageCircle,
      color: 'text-indigo-600',
      bgColor: 'from-indigo-50 to-purple-50 border-indigo-200'
    };
  };

  useEffect(() => {
    if (!isDismissed) {
      const message = generateContextualMessage();
      setActiveMessage(message);
    }
  }, [triadScores, lastRitualCompleted, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setActiveMessage(null);
  };

  if (!activeMessage || isDismissed) {
    return null;
  }

  const IconComponent = activeMessage.icon;

  return (
    <Card className={`bg-gradient-to-r ${activeMessage.bgColor} border-2 shadow-lg`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-full bg-white shadow-sm`}>
            <IconComponent className={`w-5 h-5 ${activeMessage.color}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-semibold ${activeMessage.color.replace('text-', 'text-').replace('600', '700')}`}>
                    {activeMessage.title}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${activeMessage.color} bg-white border-current`}
                  >
                    Presença Viva
                  </Badge>
                </div>
                <p className={`text-sm ${activeMessage.color.replace('600', '700')} leading-relaxed`}>
                  {activeMessage.content}
                </p>
              </div>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className={`p-1 h-auto ${activeMessage.color} hover:bg-white/50`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {activeMessage.action && (
              <Button
                onClick={activeMessage.action.onClick}
                className={`mt-3 text-xs bg-white ${activeMessage.color} hover:bg-gray-50`}
                variant="outline"
                size="sm"
              >
                {activeMessage.action.label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};