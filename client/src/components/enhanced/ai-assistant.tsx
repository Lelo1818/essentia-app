import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, Send, Bot, User, Lightbulb, TrendingUp,
  PieChart, Target, AlertTriangle, CheckCircle, X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
}

interface AIAssistantProps {
  context: "financial" | "educational" | "spiritual";
  userData?: any;
  onAction?: (action: string, data?: any) => void;
  className?: string;
}

export function AIAssistant({ context, userData, onAction, className }: AIAssistantProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const contextConfig = {
    financial: {
      name: "Consultor Financeiro IA",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      greeting: "Olá! Sou seu consultor financeiro pessoal. Como posso ajudar você a prosperar financeiramente hoje?"
    },
    educational: {
      name: "Tutor Educacional IA",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      greeting: "Oi! Sou seu tutor pessoal. Vamos descobrir juntos a melhor forma de você aprender e crescer!"
    },
    spiritual: {
      name: "Guia Espiritual IA",
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      greeting: "Namastê! Estou aqui para acompanhar sua jornada de autoconhecimento e crescimento pessoal."
    }
  };

  const config = contextConfig[context];

  React.useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: "welcome",
        type: "assistant",
        content: config.greeting,
        timestamp: new Date(),
        suggestions: getContextSuggestions(context)
      };
      setMessages([welcomeMessage]);
    }
  }, [config.greeting, context, messages.length]);

  const getContextSuggestions = (ctx: string): string[] => {
    switch (ctx) {
      case "financial":
        return [
          "Como posso economizar mais dinheiro?",
          "Qual é minha situação financeira atual?",
          "Sugira investimentos para meu perfil",
          "Como quitar minhas dívidas?"
        ];
      case "educational":
        return [
          "Crie um plano de estudos personalizado",
          "Como melhorar minha concentração?",
          "Sugira recursos para meu estilo de aprendizado",
          "Como superar dificuldades de aprendizado?"
        ];
      case "spiritual":
        return [
          "Como encontrar meu propósito de vida?",
          "Exercícios de autoconhecimento",
          "Como praticar mindfulness diariamente?",
          "Reflexões sobre meus valores pessoais"
        ];
      default:
        return [];
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<AIMessage> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI thinking

    let response = "";
    let suggestions: string[] = [];
    let actionData: any = undefined;

    // Simple AI logic based on context and keywords
    const message = userMessage.toLowerCase();

    if (context === "financial") {
      if (message.includes("economizar") || message.includes("poupar")) {
        response = "Excelente pergunta! Baseado em seus dados, identifiquei algumas oportunidades:\n\n• Reduza gastos com entretenimento em 15% (economia de R$ 120/mês)\n• Revise assinaturas não utilizadas\n• Aproveite cashbacks em compras essenciais\n\nCom essas mudanças, você pode economizar cerca de R$ 200 mensais!";
        suggestions = ["Criar meta de economia", "Ver detalhes dos gastos", "Configurar alertas"];
        actionData = { type: "savings_plan", amount: 200 };
      } else if (message.includes("investir") || message.includes("investimento")) {
        response = "Com base no seu perfil conservador e reserva de emergência adequada, recomendo:\n\n🏦 **Renda Fixa (70%)**\n• CDB 110% CDI\n• Tesouro Selic\n\n📈 **Renda Variável (30%)**\n• Fundos de índice (ETFs)\n• Ações de empresas consolidadas\n\nEssa distribuição oferece segurança com potencial de crescimento!";
        suggestions = ["Simular investimentos", "Ver carteira recomendada", "Estudar sobre investimentos"];
      } else {
        response = "Entendi sua dúvida! Para dar a melhor orientação financeira, preciso entender melhor sua situação. Você poderia me contar mais detalhes sobre o que especificamente te preocupa ou interessa?";
        suggestions = ["Analisar meu orçamento", "Revisar metas financeiras", "Dicas de economia"];
      }
    } else if (context === "educational") {
      if (message.includes("plano") || message.includes("estudo")) {
        response = "Perfeito! Vou criar um plano personalizado para você:\n\n📚 **Seu Plano de Estudos**\n• Segunda a Sexta: 2h diárias (manhã é ideal para seu perfil)\n• Técnica Pomodoro: 25min estudo + 5min pausa\n• Revisões: fins de semana\n• Materiais adaptados para aprendizado visual\n\nCom ADHD, é importante manter sessões focadas e variadas!";
        suggestions = ["Começar plano agora", "Personalizar horários", "Ver técnicas de foco"];
        actionData = { type: "study_plan", duration: "2h", technique: "pomodoro" };
      } else if (message.includes("concentração") || message.includes("foco")) {
        response = "Concentração é fundamental! Aqui estão estratégias específicas para você:\n\n🎯 **Técnicas de Foco**\n• Ambiente silencioso com música instrumental\n• Remove distrações visuais\n• Use timer para sessões de 25 minutos\n• Recompensas pequenas após cada sessão\n\nSeu perfil responde bem a estrutura e gamificação!";
        suggestions = ["Configurar ambiente", "Baixar app de foco", "Ver mais técnicas"];
      } else {
        response = "Que bom que quer aprender! Como seu tutor, estou aqui para tornar sua jornada educacional mais eficiente e prazerosa. Em que área específica gostaria de focar hoje?";
        suggestions = ["Criar trilha de aprendizado", "Avaliar progresso", "Dicas de estudo"];
      }
    } else if (context === "spiritual") {
      if (message.includes("propósito") || message.includes("missão")) {
        response = "Que jornada linda você está iniciando! Descobrir seu propósito é um processo gradual:\n\n✨ **Reflexões Guiadas**\n• O que te faz perder a noção do tempo?\n• Quando você se sente mais autêntico?\n• Que problemas do mundo te incomodam?\n• Como você gostaria de ser lembrado?\n\nVamos explorar essas perguntas juntos através de exercícios práticos.";
        suggestions = ["Fazer teste de valores", "Exercício de visualização", "Diário de propósito"];
        actionData = { type: "purpose_exercise", stage: "discovery" };
      } else if (message.includes("mindfulness") || message.includes("meditação")) {
        response = "Mindfulness transforma nossa relação com a vida! Aqui está um plano simples para começar:\n\n🧘‍♀️ **Prática Diária**\n• Manhã: 5 minutos de respiração consciente\n• Tarde: Caminhada mindful de 10 minutos\n• Noite: 3 gratidões antes de dormir\n\nComece pequeno e seja consistente. A transformação vem com a prática regular!";
        suggestions = ["Começar meditação guiada", "Definir lembretes", "Explorar técnicas"];
      } else {
        response = "Gratidão por compartilhar sua jornada comigo! O autoconhecimento é o maior presente que podemos dar a nós mesmos. Que aspecto da sua vida interior gostaria de explorar hoje?";
        suggestions = ["Explorar valores pessoais", "Exercícios de gratidão", "Reflexão guiada"];
      }
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: response,
      timestamp: new Date(),
      suggestions,
      data: actionData
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const aiResponse = await generateAIResponse(inputValue);
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleActionClick = (action: string, data?: any) => {
    if (onAction) {
      onAction(action, data);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg",
            config.bgColor,
            config.borderColor,
            config.color
          )}
          size="icon"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className={cn("fixed bottom-4 right-4 w-96 h-[500px] z-50 flex flex-col", className)}>
      <CardHeader className={cn("pb-3", config.bgColor, config.borderColor, "border-b")}>
        <div className="flex items-center justify-between">
          <CardTitle className={cn("text-lg flex items-center space-x-2", config.color)}>
            <config.icon className="w-5 h-5" />
            <span>{config.name}</span>
          </CardTitle>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : cn(config.bgColor, "border", config.borderColor)
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "assistant" && (
                      <Bot className={cn("w-4 h-4 mt-0.5", config.color)} />
                    )}
                    <div className="flex-1">
                      <p className="whitespace-pre-line">{message.content}</p>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              variant="outline"
                              size="sm"
                              className="w-full text-left justify-start text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      {message.data && (
                        <div className="mt-3">
                          <Button
                            onClick={() => handleActionClick(message.data.type, message.data)}
                            size="sm"
                            className="text-xs"
                          >
                            Aplicar Sugestão
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className={cn("rounded-lg p-3", config.bgColor, "border", config.borderColor)}>
                  <div className="flex items-center space-x-2">
                    <Bot className={cn("w-4 h-4", config.color)} />
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={cn("w-2 h-2 rounded-full animate-pulse", config.color)}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}