import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  TrendingDown, 
  AlertTriangle, 
  Smile,
  Frown,
  Meh,
  ShieldAlert,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodData {
  current: 'happy' | 'sad' | 'stressed' | 'excited' | 'neutral' | 'anxious';
  confidence: number;
  triggers: string[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

interface EmotionalSpending {
  date: Date;
  amount: number;
  category: string;
  mood: string;
  trigger: string;
  description: string;
}

export default function MoodAnalyzer() {
  const [currentMood, setCurrentMood] = useState<MoodData>({
    current: 'neutral',
    confidence: 0,
    triggers: [],
    riskLevel: 'low',
    recommendations: []
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emotionalSpending, setEmotionalSpending] = useState<EmotionalSpending[]>([]);
  const { toast } = useToast();

  const moodIcons = {
    happy: { icon: Smile, color: "text-green-500", bg: "bg-green-50" },
    sad: { icon: Frown, color: "text-blue-500", bg: "bg-blue-50" },
    stressed: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
    excited: { icon: Heart, color: "text-pink-500", bg: "bg-pink-50" },
    neutral: { icon: Meh, color: "text-gray-500", bg: "bg-gray-50" },
    anxious: { icon: ShieldAlert, color: "text-orange-500", bg: "bg-orange-50" }
  };

  const recentEmotionalSpending: EmotionalSpending[] = [
    {
      date: new Date(),
      amount: 120,
      category: "Entretenimento",
      mood: "stressed",
      trigger: "Trabalho pesado",
      description: "Streaming services + delivery"
    },
    {
      date: new Date(Date.now() - 86400000),
      amount: 80,
      category: "Alimentação",
      mood: "sad",
      trigger: "Relacionamento",
      description: "Comfort food"
    },
    {
      date: new Date(Date.now() - 172800000),
      amount: 200,
      category: "Roupas",
      mood: "excited",
      trigger: "Promoção no trabalho",
      description: "Compra por impulso"
    }
  ];

  const analyzeMood = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const moods = ['happy', 'sad', 'stressed', 'excited', 'neutral', 'anxious'] as const;
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    
    const moodAnalysis: MoodData = {
      current: randomMood,
      confidence: Math.random() * 30 + 70, // 70-100%
      triggers: getTriggers(randomMood),
      riskLevel: getRiskLevel(randomMood),
      recommendations: getRecommendations(randomMood)
    };

    setCurrentMood(moodAnalysis);
    setEmotionalSpending(recentEmotionalSpending);
    setIsAnalyzing(false);

    toast({
      title: "Análise de Humor Concluída",
      description: `Estado atual: ${getMoodLabel(randomMood)}`,
      variant: "default"
    });
  };

  const getTriggers = (mood: string): string[] => {
    const triggers = {
      stressed: ["Pressão no trabalho", "Deadline apertado", "Problemas familiares"],
      sad: ["Fim de relacionamento", "Rejeição", "Solidão", "Nostalgia"],
      anxious: ["Incerteza financeira", "Mudanças", "Responsabilidades"],
      excited: ["Conquista pessoal", "Boa notícia", "Encontro social"],
      happy: ["Dia produtivo", "Exercício", "Tempo com amigos"],
      neutral: ["Rotina normal", "Dia comum"]
    };
    return triggers[mood as keyof typeof triggers] || [];
  };

  const getRiskLevel = (mood: string): 'low' | 'medium' | 'high' => {
    const highRisk = ['stressed', 'sad', 'anxious'];
    const mediumRisk = ['excited'];
    return highRisk.includes(mood) ? 'high' : mediumRisk.includes(mood) ? 'medium' : 'low';
  };

  const getRecommendations = (mood: string): string[] => {
    const recommendations = {
      stressed: [
        "Evite compras por impulso nas próximas 2 horas",
        "Tente uma caminhada ou meditação de 10 minutos",
        "Configure alertas para gastos acima de R$ 50"
      ],
      sad: [
        "Considere ligar para um amigo antes de comprar",
        "Experimente atividades gratuitas como leitura",
        "Defina um limite de R$ 30 para 'comfort shopping'"
      ],
      anxious: [
        "Revise seu orçamento para reduzir ansiedade",
        "Evite decisões financeiras importantes hoje",
        "Pratique respiração profunda por 5 minutos"
      ],
      excited: [
        "Ótimo momento para revisar suas metas",
        "Cuidado com gastos impulsivos por euforia",
        "Considere investir essa energia positiva"
      ],
      happy: [
        "Aproveite para planejar investimentos",
        "Bom momento para revisar gastos passados",
        "Mantenha esse estado positivo"
      ],
      neutral: [
        "Estado ideal para decisões financeiras",
        "Bom momento para análises e planejamento"
      ]
    };
    return recommendations[mood as keyof typeof recommendations] || [];
  };

  const getMoodLabel = (mood: string): string => {
    const labels = {
      happy: "Feliz",
      sad: "Triste",
      stressed: "Estressado",
      excited: "Animado",
      neutral: "Neutro",
      anxious: "Ansioso"
    };
    return labels[mood as keyof typeof labels] || mood;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const MoodIcon = moodIcons[currentMood.current];

  useEffect(() => {
    // Auto-analyze mood on component mount
    analyzeMood();
  }, []);

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-800">
          <Brain className="w-5 h-5 mr-2" />
          Análise de Humor & Gastos Emocionais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Mood */}
          <div className="text-center">
            {isAnalyzing ? (
              <div className="space-y-3">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-purple-700">Analisando padrões comportamentais...</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className={`w-20 h-20 ${MoodIcon.bg} rounded-full flex items-center justify-center mx-auto`}>
                  <MoodIcon.icon className={`w-10 h-10 ${MoodIcon.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-800">
                    {getMoodLabel(currentMood.current)}
                  </h3>
                  <p className="text-sm text-purple-600">
                    Confiança: {Math.round(currentMood.confidence)}%
                  </p>
                </div>
                <Badge className={getRiskColor(currentMood.riskLevel)}>
                  Risco de Compra Emocional: {currentMood.riskLevel.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>

          {/* Triggers */}
          {currentMood.triggers.length > 0 && (
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Gatilhos Identificados</h4>
              <div className="flex flex-wrap gap-2">
                {currentMood.triggers.map((trigger, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {trigger}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Recomendações IA</h4>
            <div className="space-y-2">
              {currentMood.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <Target className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-purple-600">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Emotional Spending */}
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">Gastos Emocionais Recentes</h4>
            <div className="space-y-3">
              {emotionalSpending.slice(0, 3).map((spending, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">R$ {spending.amount}</div>
                      <div className="text-xs text-gray-600">{spending.category}</div>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs ${moodIcons[spending.mood as keyof typeof moodIcons].color.replace('text-', 'bg-').replace('-500', '-100')} ${moodIcons[spending.mood as keyof typeof moodIcons].color.replace('-500', '-700')}`}>
                        {getMoodLabel(spending.mood)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <div>Gatilho: {spending.trigger}</div>
                    <div>{spending.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Emotional Spending Trend */}
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Tendência Semanal</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gastos Emocionais</span>
                <span className="font-medium">R$ 400 (↑15%)</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="text-xs text-gray-600">
                65% dos seus gastos desta semana foram influenciados por emoções
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InteractiveButton
              onClick={analyzeMood}
              disabled={isAnalyzing}
              className="w-full"
              variant="outline"
              soundType="click"
            >
              <Brain className="w-4 h-4 mr-2" />
              Nova Análise
            </InteractiveButton>
            <InteractiveButton
              className="w-full bg-purple-600 hover:bg-purple-700"
              soundType="success"
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              Ver Relatório
            </InteractiveButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}