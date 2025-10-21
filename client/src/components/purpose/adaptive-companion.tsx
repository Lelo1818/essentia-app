import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Brain, 
  Heart, 
  Sparkles,
  Calendar,
  TrendingUp,
  User,
  Lightbulb,
  Loader2
} from 'lucide-react';

interface AdaptiveCompanionProps {
  userName: string;
  recentActivity: string[];
  mood: 'energetic' | 'contemplative' | 'peaceful' | 'motivated';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export default function AdaptiveCompanion({ 
  userName, 
  recentActivity, 
  mood, 
  timeOfDay 
}: AdaptiveCompanionProps) {
  const { toast } = useToast();
  const [currentMessage, setCurrentMessage] = useState('');
  const [companionPersonality, setCompanionPersonality] = useState('supportive');
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const conversarMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/selfsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentMessage,
          context: `Personalidade: ${companionPersonality}, Humor: ${mood}, Hora: ${timeOfDay}`
        }),
      });
      if (!response.ok) throw new Error("Erro ao conversar com IA");
      return response.json();
    },
    onSuccess: (data: any) => {
      setAiResponse(data.response);
      toast({
        title: "Resposta da IA",
        description: data.response.substring(0, 100) + "...",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível conversar com a IA",
        variant: "destructive",
      });
    },
  });

  const insightMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: `Usuário: ${userName}, Atividades recentes: ${recentActivity.join(", ")}, Humor: ${mood}`
        }),
      });
      if (!response.ok) throw new Error("Erro ao gerar insight");
      return response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "💡 Insight Gerado",
        description: data.insight,
        duration: 8000,
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível gerar insight",
        variant: "destructive",
      });
    },
  });

  const companionPersonalities = {
    supportive: {
      name: "Sofia - Mentora Empática",
      icon: Heart,
      color: "from-pink-500 to-purple-500",
      style: "Calorosa e encorajadora, foca no crescimento emocional"
    },
    analytical: {
      name: "Marcus - Estrategista",
      icon: Brain,
      color: "from-blue-500 to-indigo-500", 
      style: "Lógico e estruturado, oferece insights práticos"
    },
    intuitive: {
      name: "Luna - Guia Espiritual",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      style: "Mística e profunda, conecta com sabedoria interior"
    },
    motivational: {
      name: "Leo - Coach de Vida",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      style: "Energético e desafiador, impulsiona ação"
    }
  };

  const generateContextualMessage = () => {
    const personality = companionPersonalities[companionPersonality as keyof typeof companionPersonalities];
    
    const greetings = {
      morning: {
        supportive: `Bom dia, ${userName}! Como você está se sentindo para começar este novo dia de descobertas?`,
        analytical: `${userName}, vamos analisar o que aprendemos ontem e planejar o dia de hoje.`,
        intuitive: `O universo está alinhado para você hoje, ${userName}. Que energia você sente chegando?`,
        motivational: `Hora de conquistar o dia, ${userName}! Qual será sua primeira vitória hoje?`
      },
      afternoon: {
        supportive: `Oi ${userName}, como está sendo seu dia? Percebo que você andou explorando novas ideias.`,
        analytical: `${userName}, que tal revisarmos os insights que surgiram desde esta manhã?`,
        intuitive: `Sinto que algo importante está emergindo em você hoje, ${userName}. Quer compartilhar?`,
        motivational: `Você está no ritmo certo, ${userName}! Vamos acelerar esse crescimento?`
      },
      evening: {
        supportive: `Boa noite, ${userName}. Que momento especial do dia você gostaria de relembrar?`,
        analytical: `Hora de fazer uma análise do dia, ${userName}. O que funcionou melhor?`,
        intuitive: `As estrelas estão brilhando para você, ${userName}. Que sabedoria este dia trouxe?`,
        motivational: `Parabéns pelo dia produtivo, ${userName}! Amanhã será ainda melhor!`
      },
      night: {
        supportive: `${userName}, um tempo para você refletir em paz. Como seu coração está?`,
        analytical: `Antes de descansar, ${userName}, vamos processar os aprendizados de hoje.`,
        intuitive: `A quietude da noite traz clareza, ${userName}. O que sua alma está sussurrando?`,
        motivational: `Você plantou sementes importantes hoje, ${userName}. Amanhã elas crescerão!`
      }
    };

    return greetings[timeOfDay][companionPersonality as keyof typeof greetings[typeof timeOfDay]];
  };

  const generateInsightBasedOnActivity = () => {
    const insights = [
      "Notei que você tem se conectado mais com suas reflexões internas ultimamente.",
      "Sua jornada está tomando uma direção muito interessante.",
      "Percebo um padrão de crescimento consistente em suas práticas.",
      "Você está desenvolvendo uma maior consciência sobre seus valores.",
      "Sua dedicação aos rituais diários está criando uma base sólida."
    ];
    
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const moodBasedSuggestions = {
    energetic: [
      "Que tal explorar uma reflexão mais desafiadora hoje?",
      "Sua energia está alta! Momento ideal para novos exercícios.",
      "Vamos canalizar essa energia para um projeto pessoal?"
    ],
    contemplative: [
      "Percebo você em um momento reflexivo. Quer explorar isso mais fundo?",
      "Momentos contemplativos são preciosos. O que está emergindo?",
      "Sua mente está processando algo importante. Vamos conversar?"
    ],
    peaceful: [
      "Que bela sensação de paz. Como chegou até aqui?",
      "Momentos de tranquilidade são conquistas. Celebre isso.",
      "Nessa paz interior, que insights surgem naturalmente?"
    ],
    motivated: [
      "Sinto sua motivação! Qual será seu próximo passo?",
      "Essa determinação é inspiradora. Onde quer aplicá-la?",
      "Sua motivação pode mover montanhas. Que montanha escolhe?"
    ]
  };

  useEffect(() => {
    setCurrentMessage(generateContextualMessage());
  }, [timeOfDay, companionPersonality, userName]);

  const handlePersonalityChange = (newPersonality: string) => {
    setCompanionPersonality(newPersonality);
    setCurrentMessage(generateContextualMessage());
  };

  const currentPersonality = companionPersonalities[companionPersonality as keyof typeof companionPersonalities];
  const PersonalityIcon = currentPersonality.icon;

  return (
    <div className="space-y-4">
      {/* Seletor de Personalidade */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(companionPersonalities).map(([key, personality]) => {
          const Icon = personality.icon;
          return (
            <Button
              key={key}
              variant={companionPersonality === key ? "default" : "outline"}
              size="sm"
              onClick={() => handlePersonalityChange(key)}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              <span>{personality.name.split(' - ')[0]}</span>
            </Button>
          );
        })}
      </div>

      {/* Companion Card */}
      <Card className={`bg-gradient-to-r ${currentPersonality.color} text-white`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PersonalityIcon className="w-6 h-6 mr-3" />
            {currentPersonality.name}
          </CardTitle>
          <p className="text-sm opacity-90">
            {currentPersonality.style}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="text-white">
                {currentMessage}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm opacity-90">
                💡 {generateInsightBasedOnActivity()}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {moodBasedSuggestions[mood].slice(0, 2).map((suggestion, index) => (
                  <Badge key={index} variant="outline" className="text-white border-white text-xs">
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs opacity-75">
              <span>Adaptado ao seu humor: {mood}</span>
              <span>Horário: {timeOfDay}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="flex items-center space-x-2"
          onClick={() => conversarMutation.mutate()}
          disabled={conversarMutation.isPending}
          data-testid="button-conversar"
        >
          {conversarMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MessageCircle className="w-4 h-4" />
          )}
          <span>Conversar</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center space-x-2"
          onClick={() => insightMutation.mutate()}
          disabled={insightMutation.isPending}
          data-testid="button-insight"
        >
          {insightMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Lightbulb className="w-4 h-4" />
          )}
          <span>Insight</span>
        </Button>
      </div>
      
      {/* AI Response Display */}
      {aiResponse && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-gray-700">{aiResponse}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}