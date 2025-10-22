import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  MessageCircle, 
  Heart, 
  Lightbulb,
  Send,
  Mic,
  Camera,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  Loader2
} from "lucide-react";

interface TherapyMessage {
  id: number;
  type: "user" | "therapist";
  content: string;
  timestamp: string;
  mood?: "reflective" | "supportive" | "challenging" | "celebrating";
  techniques?: string[];
  insights?: string[];
}

export default function AITherapist() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<TherapyMessage[]>([
    {
      id: 1,
      type: "therapist",
      content: "Olá! Sou Sofia, sua assistente de autoconhecimento especializada em crescimento pessoal. Como você está se sentindo hoje? (Lembrando: não substituo terapia profissional)",
      timestamp: "14:30",
      mood: "supportive",
      techniques: ["acolhimento", "rapport"],
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [sessionData, setSessionData] = useState({
    duration: 0,
    insights: 3,
    breakthroughs: 1,
    emotionalState: "equilibrado"
  });

  const aiMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const response = await fetch("/api/ai/selfsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          context: "Responda em no máximo 2 parágrafos. Você é Sofia, terapeuta especializada em autoconhecimento."
        }),
      });
      if (!response.ok) throw new Error("Erro ao conversar com IA");
      return response.json();
    },
    onSuccess: (data: any) => {
      const newMessage: TherapyMessage = {
        id: messages.length + 1,
        type: "therapist",
        content: data.response,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        mood: "supportive",
      };
      setMessages(prev => [...prev, newMessage]);
      setSessionData(prev => ({
        ...prev,
        insights: prev.insights + 1,
        duration: prev.duration + 1
      }));
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta da IA",
        variant: "destructive",
      });
    },
  });

  const therapyTechniques = [
    "Terapia Cognitivo-Comportamental",
    "Mindfulness",
    "Análise Transacional", 
    "Psicologia Positiva",
    "Gestalt",
    "Terapia Narrativa"
  ];

  const quickResponses = [
    "Me sinto ansioso sobre o futuro",
    "Preciso entender meus padrões",
    "Quero trabalhar autoestima",
    "Tenho dificuldade com relacionamentos"
  ];

  const aiResponses = {
    "ansioso": {
      content: "Entendo que a ansiedade sobre o futuro pode ser avassaladora. É natural sentir isso - nossa mente tenta nos proteger antecipando problemas. Vamos explorar: o que especificamente te preocupa? E como essa preocupação se manifesta no seu corpo?",
      mood: "supportive" as const,
      techniques: ["validação emocional", "ancoragem no presente", "consciência corporal"],
      insights: ["Ansiedade é mecanismo de proteção", "Corpo reflete mente"]
    },
    "padrões": {
      content: "Que insights poderosos você está buscando! Reconhecer padrões é o primeiro passo para a transformação. Conte-me sobre uma situação recente onde você notou um comportamento se repetindo. O que você sentiu nesse momento?",
      mood: "reflective" as const,
      techniques: ["análise de padrões", "metacognição", "autoobservação"],
      insights: ["Autoconhecimento é poder", "Padrões podem ser reprogramados"]
    },
    "autoestima": {
      content: "A autoestima é como um músculo - quanto mais exercitamos, mais forte fica. Vou te fazer uma pergunta que pode parecer simples, mas é profunda: quando foi a última vez que você se parabenizou por algo, mesmo que pequeno?",
      mood: "challenging" as const,
      techniques: ["psicologia positiva", "autocompaixão", "reframe cognitivo"],
      insights: ["Autoestima se constrói diariamente", "Pequenas vitórias importam"]
    },
    "relacionamentos": {
      content: "Relacionamentos são espelhos da nossa alma. Eles nos mostram onde precisamos crescer e onde já brilhamos. Que padrão você tem notado nos seus relacionamentos? E como isso reflete sua relação consigo mesmo?",
      mood: "reflective" as const,
      techniques: ["espelhamento", "análise sistêmica", "inteligência emocional"],
      insights: ["Relacionamentos são professores", "Autoamor atrai amor"]
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || aiMutation.isPending) return;

    const userMessage: TherapyMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    aiMutation.mutate(currentInput);
  };

  const useQuickResponse = (response: string) => {
    setInputMessage(response);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionData(prev => ({
        ...prev,
        duration: prev.duration + 1
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Brain className="w-6 h-6 mr-3" />
            Sofia - Assistente de Autoconhecimento
          </CardTitle>
          <p className="text-purple-100">
            Assistente digital baseada em técnicas de autoconhecimento e desenvolvimento pessoal
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{sessionData.duration}</div>
              <div className="text-sm text-purple-200">min de sessão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{sessionData.insights}</div>
              <div className="text-sm text-purple-200">insights gerados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{sessionData.breakthroughs}</div>
              <div className="text-sm text-purple-200">breakthroughs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold capitalize">{sessionData.emotionalState}</div>
              <div className="text-sm text-purple-200">estado atual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Therapy Chat */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Sessão de Autoconhecimento
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-green-100 text-green-700 shrink-0">
                <Sparkles className="w-3 h-3 mr-1" />
                IA Empática Ativa
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 shrink-0">
                <Shield className="w-3 h-3 mr-1" />
                100% Confidencial
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-purple-50 border border-purple-200"
                }`}>
                  {message.type === "therapist" && (
                    <div className="flex items-center mb-2">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          S
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-purple-800">Sofia</span>
                      <Badge className="ml-2 text-xs bg-purple-100 text-purple-700">
                        {message.mood}
                      </Badge>
                    </div>
                  )}
                  
                  <p className={`text-sm ${message.type === "user" ? "text-white" : "text-gray-700"}`}>
                    {message.content}
                  </p>
                  
                  {message.techniques && (
                    <div className="mt-2 pt-2 border-t border-purple-200">
                      <div className="text-xs text-purple-600 mb-1">Técnicas aplicadas:</div>
                      <div className="flex gap-1 flex-wrap">
                        {message.techniques.map((technique, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 ${message.type === "user" ? "text-blue-200" : "text-gray-500"}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {aiMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-purple-600 text-white text-xs">S</AvatarFallback>
                    </Avatar>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-xs text-purple-600">Sofia está refletindo...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Responses */}
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Respostas rápidas:</div>
            <div className="flex gap-2 flex-wrap">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => useQuickResponse(response)}
                  className="text-xs"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Compartilhe seus pensamentos e sentimentos..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Techniques & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
              Técnicas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {therapyTechniques.map((technique, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{technique}</span>
                  <Badge variant="outline" className="text-xs">
                    Disponível
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Progresso da Sessão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Autoconhecimento</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>Clareza Emocional</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>Ferramentas Adquiridas</span>
                  <span>4/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}