import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Zap, 
  Heart, 
  Brain,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  Play,
  BookOpen,
  Compass
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface SmartRecommendationsProps {
  triadScores: TriadScores;
  todayMood?: { humor: number; energia: number };
  lastPortalId?: string;
  streak: number;
  onPortalRequest: (portalId: string) => void;
}

interface SmartRecommendation {
  id: string;
  type: 'portal' | 'pratica' | 'reflexao' | 'acao';
  title: string;
  description: string;
  reason: string;
  priority: 'alta' | 'media' | 'baixa';
  estimatedTime: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  icon: any;
  color: string;
  bgColor: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  portalId?: string;
}

export const SmartRecommendations = ({ 
  triadScores, 
  todayMood, 
  lastPortalId, 
  streak,
  onPortalRequest 
}: SmartRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);

  // Motor de IA para gerar recomendações contextuais
  const generateSmartRecommendations = (): SmartRecommendation[] => {
    const recs: SmartRecommendation[] = [];
    const { consciencia, energia, coerencia } = triadScores;
    
    // Identificar área que mais precisa de atenção
    const scores = [
      { area: 'consciencia', value: consciencia, portal: 'proposito' },
      { area: 'energia', value: energia, portal: 'vitalidade' },
      { area: 'coerencia', value: coerencia, portal: 'harmonia' }
    ];
    scores.sort((a, b) => a.value - b.value);
    const lowestArea = scores[0];

    // 1. Recomendação de Portal Inteligente
    if (lowestArea.portal !== lastPortalId || !lastPortalId) {
      const portalData = {
        proposito: {
          title: 'Portal do Propósito',
          description: 'Sessão focada em clareza de valores e direcionamento de vida',
          icon: Target,
          color: 'text-purple-600',
          bgColor: 'from-purple-50 to-indigo-50 border-purple-200'
        },
        vitalidade: {
          title: 'Portal da Vitalidade',
          description: 'Práticas energizantes para revigorar corpo e mente',
          icon: Zap,
          color: 'text-yellow-600',
          bgColor: 'from-yellow-50 to-orange-50 border-yellow-200'
        },
        harmonia: {
          title: 'Portal da Harmonia',
          description: 'Exercícios de equilíbrio emocional e coerência interna',
          icon: Heart,
          color: 'text-red-600',
          bgColor: 'from-red-50 to-pink-50 border-red-200'
        }
      };

      const portal = portalData[lowestArea.portal as keyof typeof portalData];
      recs.push({
        id: `portal-${lowestArea.portal}`,
        type: 'portal',
        title: portal.title,
        description: portal.description,
        reason: `Sua ${lowestArea.area} (${lowestArea.value}%) é o aspecto que mais se beneficiaria de atenção agora.`,
        priority: 'alta',
        estimatedTime: '15-20 min',
        difficulty: lowestArea.value < 40 ? 'iniciante' : lowestArea.value < 70 ? 'intermediario' : 'avancado',
        icon: portal.icon,
        color: portal.color,
        bgColor: portal.bgColor,
        action: {
          label: 'Iniciar Portal',
          onClick: () => {
            console.log('Portal clicado:', lowestArea.portal);
            onPortalRequest(lowestArea.portal);
          }
        },
        portalId: lowestArea.portal
      });
    }

    // 2. Recomendações baseadas no humor de hoje
    if (todayMood) {
      if (todayMood.humor <= 2) {
        recs.push({
          id: 'pratica-autocompaixao',
          type: 'pratica',
          title: 'Prática de Autocompaixão',
          description: 'Exercício suave para acolher suas emoções do momento',
          reason: 'Seu humor está baixo hoje. Autocompaixão ajuda a restaurar o equilíbrio emocional.',
          priority: 'alta',
          estimatedTime: '5-10 min',
          difficulty: 'iniciante',
          icon: Heart,
          color: 'text-pink-600',
          bgColor: 'from-pink-50 to-red-50 border-pink-200'
        });
      }

      if (todayMood.energia <= 2) {
        recs.push({
          id: 'respiracao-energizante',
          type: 'pratica',
          title: 'Respiração Energizante',
          description: 'Técnica de respiração 4-7-8 para aumentar vitalidade rapidamente',
          reason: 'Sua energia está baixa. Esta técnica pode dar o impulso que você precisa.',
          priority: 'media',
          estimatedTime: '3-5 min',
          difficulty: 'iniciante',
          icon: Zap,
          color: 'text-yellow-600',
          bgColor: 'from-yellow-50 to-orange-50 border-yellow-200'
        });
      }

      if (todayMood.humor >= 4 && todayMood.energia >= 4) {
        recs.push({
          id: 'reflexao-expansiva',
          type: 'reflexao',
          title: 'Reflexão Expansiva',
          description: 'Momento ideal para explorar objetivos maiores e visões de futuro',
          reason: 'Você está com ótima energia e humor. Aproveite para expandir horizontes!',
          priority: 'media',
          estimatedTime: '10-15 min',
          difficulty: 'intermediario',
          icon: Brain,
          color: 'text-blue-600',
          bgColor: 'from-blue-50 to-indigo-50 border-blue-200'
        });
      }
    }

    // 3. Recomendações baseadas no streak
    if (streak >= 7) {
      recs.push({
        id: 'celebracao-conquista',
        type: 'reflexao',
        title: 'Celebração de Conquista',
        description: 'Momento para reconhecer e integrar seu progresso consistente',
        reason: `${streak} dias consecutivos merecem reconhecimento! Celebrar fortalece a motivação.`,
        priority: 'media',
        estimatedTime: '5-8 min',
        difficulty: 'iniciante',
        icon: Star,
        color: 'text-green-600',
        bgColor: 'from-green-50 to-emerald-50 border-green-200'
      });
    } else if (streak === 0) {
      recs.push({
        id: 'novo-inicio',
        type: 'acao',
        title: 'Novo Início',
        description: 'Recomeço é sempre possível. Que tal um portal rápido para reativar sua jornada?',
        reason: 'Todo especialista já foi iniciante. O importante é dar o primeiro passo.',
        priority: 'alta',
        estimatedTime: '10-15 min',
        difficulty: 'iniciante',
        icon: Play,
        color: 'text-indigo-600',
        bgColor: 'from-indigo-50 to-purple-50 border-indigo-200'
      });
    }

    // 4. Recomendações baseadas no equilíbrio da tríade
    const maxDiff = Math.max(consciencia, energia, coerencia) - Math.min(consciencia, energia, coerencia);
    if (maxDiff > 25) {
      recs.push({
        id: 'equilibrio-triade',
        type: 'reflexao',
        title: 'Integração da Tríade',
        description: 'Reflexão sobre como alinhar melhor consciência, energia e coerência',
        reason: `Diferença de ${maxDiff} pontos entre aspectos sugere foco na integração.`,
        priority: 'media',
        estimatedTime: '8-12 min',
        difficulty: 'intermediario',
        icon: Compass,
        color: 'text-purple-600',
        bgColor: 'from-purple-50 to-violet-50 border-purple-200'
      });
    }

    // 5. Recomendação semanal inteligente
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 1) { // Segunda-feira
      recs.push({
        id: 'planejamento-semanal',
        type: 'reflexao',
        title: 'Intenção Semanal',
        description: 'Defina uma intenção clara para sua semana de crescimento',
        reason: 'Segunda-feira é ideal para estabelecer direcionamento semanal.',
        priority: 'baixa',
        estimatedTime: '5-10 min',
        difficulty: 'iniciante',
        icon: Calendar,
        color: 'text-blue-600',
        bgColor: 'from-blue-50 to-cyan-50 border-blue-200'
      });
    }

    // Retornar máximo 3 recomendações priorizadas
    return recs
      .sort((a, b) => {
        const priorityOrder = { alta: 3, media: 2, baixa: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 3);
  };

  useEffect(() => {
    const smartRecs = generateSmartRecommendations();
    setRecommendations(smartRecs);
  }, [triadScores, todayMood, lastPortalId, streak]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'iniciante': return 'bg-green-100 text-green-700';
      case 'intermediario': return 'bg-yellow-100 text-yellow-700';
      case 'avancado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Brain className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600">Analisando seu perfil para gerar recomendações...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-indigo-600" />
          Recomendações Inteligentes
        </CardTitle>
        <p className="text-sm text-gray-600">
          Sugestões personalizadas baseadas no seu estado atual e padrões
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const IconComponent = rec.icon;
            
            return (
              <Card key={rec.id} className={`bg-gradient-to-r ${rec.bgColor} border-2 hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <IconComponent className={`w-5 h-5 ${rec.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className={`font-semibold ${rec.color.replace('text-', 'text-').replace('600', '700')}`}>
                            {rec.title}
                          </h4>
                          <p className={`text-sm ${rec.color.replace('600', '700')} mt-1`}>
                            {rec.description}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(rec.priority)} variant="outline">
                          {rec.priority}
                        </Badge>
                      </div>
                      
                      <div className="bg-white/60 p-3 rounded-lg mb-3">
                        <p className="text-xs text-gray-700 font-medium mb-2">Por que agora?</p>
                        <p className="text-xs text-gray-600">{rec.reason}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{rec.estimatedTime}</span>
                          </div>
                          <Badge className={getDifficultyColor(rec.difficulty)} variant="outline">
                            {rec.difficulty}
                          </Badge>
                        </div>
                        
                        {rec.action && (
                          <Button
                            onClick={() => {
                              console.log('Botão clicado:', rec);
                              console.log('Chamando onPortalRequest com:', rec.portalId);
                              if (rec.portalId) {
                                onPortalRequest(rec.portalId);
                              } else if (rec.action) {
                                rec.action.onClick();
                              }
                            }}
                            size="sm"
                            className={`bg-white ${rec.color} hover:bg-gray-50`}
                            variant="outline"
                          >
                            {rec.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            🧠 <strong>Motor IA:</strong> Estas recomendações são geradas em tempo real considerando 
            sua tríade atual, humor do dia, histórico de práticas e contexto temporal.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};