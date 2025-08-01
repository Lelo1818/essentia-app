import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  BrainCircuit,
  MessageSquare,
  Send,
  Lightbulb,
  ArrowLeft,
  User,
  Bot
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface StudyModeProps {
  onBack: () => void;
}

export default function StudyMode({ onBack }: StudyModeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Olá! Sou seu tutor IA personalizado no modo Study Mode. 

Em vez de dar respostas diretas, vou te guiar através de perguntas e reflexões para que você construa o conhecimento por conta própria.

Sobre o que você gostaria de aprender hoje? Por exemplo:
• Conceitos de matemática ou física
• Programação e tecnologia  
• História ou geografia
• Ciências ou biologia
• Qualquer outro assunto!

Conte-me também qual é seu nível atual no tema.`,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsThinking(true);

    // Simula resposta do Study Mode
    setTimeout(() => {
      const response = generateStudyModeResponse(currentMessage, messages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const generateStudyModeResponse = (userInput: string, messageHistory: Message[]): string => {
    const input = userInput.toLowerCase();
    
    // Detecta o tópico e nível
    if (input.includes('matemática') || input.includes('matematica') || input.includes('algebra') || input.includes('geometria')) {
      return `Excelente! Matemática é uma área fascinante. 

Antes de começarmos, me ajude a entender melhor:

🤔 **Primeira pergunta:** Quando você pensa em matemática, o que mais te chama atenção ou te causa curiosidade?

📊 **Segunda pergunta:** Você já teve alguma experiência onde a matemática te ajudou a resolver um problema real do dia a dia? Qual foi?

🎯 **Terceira pergunta:** Existe algum conceito matemático específico que você sempre quis entender melhor?

Vamos construir seu aprendizado a partir das suas próprias experiências e curiosidades!`;
    }

    if (input.includes('programação') || input.includes('programacao') || input.includes('codigo') || input.includes('python') || input.includes('javascript')) {
      return `Programação é uma excelente escolha! É como aprender uma nova linguagem para se comunicar com computadores.

Vamos começar com algumas reflexões:

💭 **Pense nisso:** Você já usou algum aplicativo hoje? Como WhatsApp, Instagram, ou qualquer outro? 

🔍 **Agora me diga:** O que você acha que acontece "por trás" quando você clica em um botão no seu celular?

🛠️ **Reflita:** Se você pudesse criar qualquer aplicativo ou site, o que seria? Não precisa ser técnico, apenas sonhe!

Suas respostas vão me ajudar a guiar você pelo caminho certo da programação!`;
    }

    if (input.includes('historia') || input.includes('história') || input.includes('passado') || input.includes('antigo')) {
      return `História é incrível! É como ser um detetive do passado.

Vamos explorar juntos:

🕰️ **Primeira reflexão:** Que período histórico mais desperta sua curiosidade? Pode ser qualquer época - antiguidade, idade média, século XX...

🌍 **Segunda pergunta:** Você já visitou algum lugar histórico? Como se sentiu lá? Se não visitou, que lugar histórico gostaria de conhecer?

📚 **Terceira reflexão:** Na sua opinião, por que é importante estudar o passado? Como isso pode nos ajudar hoje?

Suas reflexões vão guiar nossa jornada pela história!`;
    }

    if (input.includes('fisica') || input.includes('física') || input.includes('universo') || input.includes('energia')) {
      return `Física é fantástica! É o estudo de como o universo funciona, desde as menores partículas até as maiores galáxias.

Vamos começar refletindo:

⚡ **Observe ao redor:** Neste momento, quais fenômenos físicos você consegue identificar onde está? (Pode ser luz, som, movimento, calor...)

🌟 **Pense grande:** O que mais te fascina no universo? As estrelas? Como as coisas se movem? Por que os objetos caem?

🔬 **Conecte:** Você já fez algum experimento simples? Mesmo que seja só observar algo interessante acontecer?

Suas observações são o primeiro passo para entender a física!`;
    }

    // Resposta genérica focada no método socrático
    return `Interessante! Vejo que você quer aprender sobre "${userInput}".

Como um bom tutor, em vez de dar respostas prontas, vou te fazer algumas perguntas para guiar seu raciocínio:

🤔 **Primeira pergunta:** O que você já sabe sobre esse assunto? Mesmo que seja pouco, toda base é importante.

💡 **Segunda pergunta:** Por que esse tema despertou seu interesse? O que você espera conseguir ao dominá-lo?

🎯 **Terceira pergunta:** Se você tivesse que explicar esse assunto para uma criança de 10 anos, como começaria?

🔍 **Quarta pergunta:** Que dúvidas específicas você tem? Onde se sente mais perdido?

Suas respostas vão me ajudar a criar um caminho de aprendizado personalizado para você!

**Lembre-se:** No Study Mode, você constrói o conhecimento respondendo perguntas e refletindo. Não tenha pressa - o processo é mais importante que a velocidade!`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Study Mode IA</h1>
              <p className="text-gray-600">Tutor personalizado com questionamento socrático</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Sessão de Estudo Ativa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-orange-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-2xl p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isThinking && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-sm ml-2">Preparando perguntas reflexivas...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Digite sua resposta ou novo tópico de estudo..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isThinking}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isThinking}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-800 mb-2">💡 Dicas do Study Mode</h3>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• <strong>Pense antes de responder:</strong> As perguntas são feitas para estimular sua reflexão</li>
                  <li>• <strong>Não tenha pressa:</strong> O processo de construir conhecimento é mais importante que a velocidade</li>
                  <li>• <strong>Seja honesto:</strong> Diga o que realmente sabe ou não sabe - isso ajuda a personalizar seu aprendizado</li>
                  <li>• <strong>Faça conexões:</strong> Relacione o novo conhecimento com suas experiências pessoais</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}