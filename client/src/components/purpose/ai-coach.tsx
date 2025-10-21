import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Target,
  TrendingUp,
  Heart,
  Star,
  Send,
  Mic,
  Camera,
  RefreshCw,
  Zap,
  Loader2
} from "lucide-react";

interface Message {
  id: number;
  type: string;
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export default function AICoach() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "Olá! Sou sua guia de autoconhecimento. Como posso ajudá-lo hoje em sua jornada de desenvolvimento pessoal?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const aiMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await fetch("/api/ai/selfsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          context: "Sessão de autoconhecimento com foco em desenvolvimento pessoal e espiritual"
        }),
      });
      if (!response.ok) throw new Error("Falha na comunicação com IA");
      return response.json();
    },
    onSuccess: (data: any) => {
      const aiResponse = {
        id: messages.length + 1,
        type: "ai",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta da IA. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const insights = [
    {
      id: 1,
      title: "Padrão de Autossabotagem Identificado",
      type: "warning",
      confidence: 89,
      description: "Você tende a desqualificar suas próprias ideias antes mesmo de compartilhá-las. Isso apareceu em 7 das últimas 10 reflexões.",
      actionable: "Experimente compartilhar uma ideia 'imperfeita' com alguém de confiança esta semana."
    },
    {
      id: 2,
      title: "Crescimento na Autodescoberta",
      type: "positive",
      confidence: 94,
      description: "Sua capacidade de conectar experiências passadas com insights presentes aumentou 45% no último mês.",
      actionable: "Continue o ritmo atual de reflexões - está funcionando muito bem."
    },
    {
      id: 3,
      title: "Oportunidade de Integração",
      type: "opportunity",
      confidence: 76,
      description: "Seus valores de 'impacto social' e 'tecnologia' estão bem definidos, mas você ainda não criou um plano concreto para uni-los.",
      actionable: "Dedique 2 horas esta semana para esboçar um projeto que combine ambos."
    }
  ];

  const quickActions = [
    {
      icon: Target,
      label: "Definir Meta",
      description: "Criar objetivo específico baseado em insights",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: Lightbulb,
      label: "Gerar Insights",
      description: "Analisar padrões nas reflexões recentes",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      icon: Heart,
      label: "Check Emocional",
      description: "Avaliar estado emocional atual",
      color: "bg-red-100 text-red-700"
    },
    {
      icon: TrendingUp,
      label: "Progresso",
      description: "Revisar evolução na jornada",
      color: "bg-green-100 text-green-700"
    }
  ];

  const personalizedQuestions = [
    "Como você se sente sobre a conversa que planejou com seu pai?",
    "Que pequena ação você pode tomar hoje para se aproximar da sua missão?",
    "O que mais te energizou nas últimas 24 horas?",
    "Se não houvesse medo, que decisão você tomaria hoje?",
    "Como seus valores guiaram suas escolhas ontem?"
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || aiMutation.isPending) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage("");

    // Call real AI endpoint
    aiMutation.mutate(currentMessage);
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'opportunity': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return '🌟';
      case 'warning': return '⚠️';
      case 'opportunity': return '💡';
      default: return '🤔';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Coach de Propósito IA
          </CardTitle>
          <p className="text-sm text-gray-600">
            Seu companheiro inteligente para insights profundos e orientação personalizada
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      <Brain className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Sophia - Coach IA</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online • Especialista em Autoconhecimento</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Nova Conversa
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Messages */}
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </div>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          <div className="text-xs font-medium opacity-75">Sugestões:</div>
                          {message.suggestions.map((suggestion, i) => (
                            <Button 
                              key={i} 
                              size="sm" 
                              variant="outline" 
                              className="text-xs h-6 mr-1 mb-1"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {aiMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        <span className="text-sm text-gray-600">IA está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Compartilhe seus pensamentos ou faça uma pergunta..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
                <Button variant="outline">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Questions */}
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Perguntas personalizadas para você:</div>
                <div className="flex flex-wrap gap-2">
                  {personalizedQuestions.slice(0, 3).map((question, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setNewMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, i) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      className="w-full justify-start h-auto p-3"
                    >
                      <div className={`p-2 rounded mr-3 ${action.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{action.label}</div>
                        <div className="text-xs text-gray-500">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Insights IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
                    <div className="flex items-start space-x-2 mb-2">
                      <span className="text-lg">{getInsightIcon(insight.type)}</span>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{insight.title}</h5>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {insight.confidence}% confiança
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                    
                    <div className="p-2 bg-white/50 rounded border">
                      <div className="text-xs font-medium text-gray-700 mb-1">💡 Ação sugerida:</div>
                      <div className="text-xs text-gray-600">{insight.actionable}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coach Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas do Coach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversas este mês</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Insights gerados</span>
                  <span className="font-medium">67</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Precisão das sugestões</span>
                  <span className="font-medium text-green-600">89%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfação geral</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'fill-current text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}