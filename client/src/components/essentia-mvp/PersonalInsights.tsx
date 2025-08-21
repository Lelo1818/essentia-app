import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Lightbulb,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface UserProfile {
  id: string;
  name: string;
  triadScores: TriadScores;
  streak: number;
  totalRitualsCompleted: number;
  createdAt: Date;
  lastCompletedAt?: Date;
}

interface PersonalInsightsProps {
  user: UserProfile;
  todayMood?: { humor: number; energia: number };
}

interface Insight {
  id: string;
  type: 'tendencia' | 'recomendacao' | 'conquista' | 'alerta';
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  actionable?: {
    label: string;
    action: () => void;
  };
}

export const PersonalInsights = ({ user, todayMood }: PersonalInsightsProps) => {
  const [insights, setInsights] = useState<Insight[]>([]);

  // Analisar dados e gerar insights personalizados
  const generatePersonalInsights = (): Insight[] => {
    const generatedInsights: Insight[] = [];
    const { consciencia, energia, coerencia } = user.triadScores;
    const totalScore = Math.round((consciencia + energia + coerencia) / 3);

    // 1. Análise de Tendências
    const lowestScore = Math.min(consciencia, energia, coerencia);
    const highestScore = Math.max(consciencia, energia, coerencia);
    const scoreRange = highestScore - lowestScore;

    if (scoreRange > 30) {
      const lowestArea = consciencia === lowestScore ? 'Consciência' : 
                       energia === lowestScore ? 'Energia' : 'Coerência';
      generatedInsights.push({
        id: 'desequilibrio',
        type: 'alerta',
        title: 'Desequilíbrio na Tríade',
        description: `Há uma diferença de ${scoreRange} pontos entre seus aspectos. ${lowestArea} (${lowestScore}%) precisa de atenção para melhor harmonia.`,
        icon: BarChart3,
        color: 'text-orange-600',
        bgColor: 'from-orange-50 to-red-50 border-orange-200'
      });
    }

    // 2. Conquistas e Progressos
    if (user.streak >= 7) {
      generatedInsights.push({
        id: 'streak-conquista',
        type: 'conquista',
        title: 'Consistência Excepcional!',
        description: `${user.streak} dias consecutivos de prática! Você está construindo hábitos poderosos para seu crescimento.`,
        icon: Target,
        color: 'text-green-600',
        bgColor: 'from-green-50 to-emerald-50 border-green-200'
      });
    }

    if (user.totalRitualsCompleted >= 10) {
      generatedInsights.push({
        id: 'rituais-marco',
        type: 'conquista',
        title: 'Marco de Desenvolvimento',
        description: `${user.totalRitualsCompleted} rituais completados! Cada prática fortalece sua jornada de autoconhecimento.`,
        icon: Sparkles,
        color: 'text-purple-600',
        bgColor: 'from-purple-50 to-indigo-50 border-purple-200'
      });
    }

    // 3. Recomendações Baseadas no Humor de Hoje
    if (todayMood) {
      if (todayMood.humor <= 2 && todayMood.energia <= 2) {
        generatedInsights.push({
          id: 'apoio-emocional',
          type: 'recomendacao',
          title: 'Momento de Autocuidado',
          description: 'Seu humor e energia estão baixos hoje. Que tal uma prática suave de respiração ou um momento de gratidão?',
          icon: Lightbulb,
          color: 'text-blue-600',
          bgColor: 'from-blue-50 to-indigo-50 border-blue-200'
        });
      } else if (todayMood.energia >= 4) {
        generatedInsights.push({
          id: 'aproveitar-energia',
          type: 'recomendacao',
          title: 'Alta Energia Detectada',
          description: 'Você está com ótima energia hoje! Momento ideal para práticas mais desafiadoras ou estabelecer novos objetivos.',
          icon: TrendingUp,
          color: 'text-yellow-600',
          bgColor: 'from-yellow-50 to-orange-50 border-yellow-200'
        });
      }
    }

    // 4. Análise de Padrões de Tempo
    const diasAtivos = Math.ceil((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const frequenciaRituais = user.totalRitualsCompleted / diasAtivos;

    if (frequenciaRituais < 0.3) {
      generatedInsights.push({
        id: 'frequencia-baixa',
        type: 'recomendacao',
        title: 'Oportunidade de Constância',
        description: `Com ${(frequenciaRituais * 100).toFixed(0)}% de frequência, pequenos aumentos na regularidade podem gerar grandes resultados.`,
        icon: Calendar,
        color: 'text-indigo-600',
        bgColor: 'from-indigo-50 to-purple-50 border-indigo-200'
      });
    }

    // 5. Insights Baseados no Score Total
    if (totalScore >= 80) {
      generatedInsights.push({
        id: 'alto-desempenho',
        type: 'tendencia',
        title: 'Excelência Pessoal',
        description: `Com ${totalScore}% na tríade geral, você está no caminho da maestria pessoal. Continue sendo um exemplo!`,
        icon: TrendingUp,
        color: 'text-emerald-600',
        bgColor: 'from-emerald-50 to-green-50 border-emerald-200'
      });
    } else if (totalScore >= 60) {
      generatedInsights.push({
        id: 'crescimento-consistente',
        type: 'tendencia',
        title: 'Progresso Sólido',
        description: `${totalScore}% na tríade mostra crescimento consistente. Você está no caminho certo para a transformação.`,
        icon: TrendingUp,
        color: 'text-blue-600',
        bgColor: 'from-blue-50 to-indigo-50 border-blue-200'
      });
    } else {
      generatedInsights.push({
        id: 'potencial-crescimento',
        type: 'recomendacao',
        title: 'Grande Potencial',
        description: `Com ${totalScore}%, você tem um oceano de possibilidades à frente. Cada pequeno passo conta enormemente.`,
        icon: Lightbulb,
        color: 'text-purple-600',
        bgColor: 'from-purple-50 to-pink-50 border-purple-200'
      });
    }

    // 6. Insight de Última Atividade
    if (user.lastCompletedAt) {
      const horasDesdeUltimoRitual = (new Date().getTime() - new Date(user.lastCompletedAt).getTime()) / (1000 * 60 * 60);
      
      if (horasDesdeUltimoRitual > 48) {
        generatedInsights.push({
          id: 'retomar-pratica',
          type: 'recomendacao',
          title: 'Hora de Retomar',
          description: `Faz ${Math.round(horasDesdeUltimoRitual/24)} dias desde seu último ritual. Que tal reconectar com sua prática hoje?`,
          icon: Target,
          color: 'text-orange-600',
          bgColor: 'from-orange-50 to-yellow-50 border-orange-200'
        });
      }
    }

    return generatedInsights.slice(0, 4); // Máximo 4 insights por vez
  };

  useEffect(() => {
    const personalInsights = generatePersonalInsights();
    setInsights(personalInsights);
  }, [user, todayMood]);

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'tendencia': return TrendingUp;
      case 'recomendacao': return Lightbulb;
      case 'conquista': return Target;
      case 'alerta': return BarChart3;
      default: return Sparkles;
    }
  };

  const getInsightTypeBadge = (type: string) => {
    switch (type) {
      case 'tendencia': return { label: 'Tendência', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'recomendacao': return { label: 'Recomendação', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'conquista': return { label: 'Conquista', color: 'bg-green-100 text-green-700 border-green-200' };
      case 'alerta': return { label: 'Atenção', color: 'bg-orange-100 text-orange-700 border-orange-200' };
      default: return { label: 'Insight', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600">Gerando insights personalizados...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
          Insights Pessoais
        </CardTitle>
        <p className="text-sm text-gray-600">
          Análise inteligente do seu progresso e recomendações personalizadas
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const IconComponent = insight.icon;
            const badge = getInsightTypeBadge(insight.type);
            
            return (
              <Card key={insight.id} className={`bg-gradient-to-r ${insight.bgColor} border-2`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <IconComponent className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${insight.color.replace('text-', 'text-').replace('600', '700')}`}>
                          {insight.title}
                        </h4>
                        <Badge className={badge.color} variant="outline">
                          {badge.label}
                        </Badge>
                      </div>
                      
                      <p className={`text-sm ${insight.color.replace('600', '700')} leading-relaxed mb-3`}>
                        {insight.description}
                      </p>
                      
                      {insight.actionable && (
                        <Button
                          onClick={insight.actionable.action}
                          size="sm"
                          className={`bg-white ${insight.color} hover:bg-gray-50 text-xs`}
                          variant="outline"
                        >
                          {insight.actionable.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            💡 <strong>IA Analítica:</strong> Estes insights são gerados em tempo real baseados nos seus dados, 
            humor diário e padrões de comportamento para apoiar seu crescimento pessoal.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};