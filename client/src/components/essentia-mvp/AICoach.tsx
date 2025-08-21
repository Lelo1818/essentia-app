import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Brain,
  Heart,
  Zap,
  X
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface AICoachProps {
  triadScores: TriadScores;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  coachType: 'geral' | 'consciencia' | 'energia' | 'coerencia';
}

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  specialty: 'geral' | 'consciencia' | 'energia' | 'coerencia';
}

const aiPersonalities: AIPersonality[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    description: 'Coach de Consciência e Propósito',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'from-purple-500 to-indigo-600',
    specialty: 'consciencia'
  },
  {
    id: 'marcos',
    name: 'Marcos',
    description: 'Coach de Energia e Vitalidade',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'from-yellow-500 to-orange-600',
    specialty: 'energia'
  },
  {
    id: 'luna',
    name: 'Luna',
    description: 'Coach de Coerência e Harmonia',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'from-red-500 to-pink-600',
    specialty: 'coerencia'
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Coach Geral e Integração',
    icon: Sparkles,
    color: 'text-emerald-600',
    bgColor: 'from-emerald-500 to-green-600',
    specialty: 'geral'
  }
];

export const AICoach = ({ triadScores, isOpen, onClose }: AICoachProps) => {
  const [selectedCoach, setSelectedCoach] = useState<AIPersonality>(aiPersonalities[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Gerar mensagem de boas-vindas baseada na tríade
  const generateWelcomeMessage = (coach: AIPersonality): string => {
    const score = triadScores[coach.specialty as keyof TriadScores] || 0;
    
    switch (coach.specialty) {
      case 'consciencia':
        return `Olá! Sou Sofia, sua coach de Consciência. Vejo que seu nível atual está em ${triadScores.consciencia}%. Estou aqui para ajudar você a desenvolver autoconhecimento e clareza sobre seu propósito. Como posso apoiá-lo hoje?`;
        
      case 'energia':
        return `Oi! Eu sou Marcos, especialista em Energia e Vitalidade. Seu nível energético está em ${triadScores.energia}%. Vamos trabalhar juntos para elevar sua vitalidade e disposição. O que você gostaria de explorar?`;
        
      case 'coerencia':
        return `Olá! Sou Luna, coach de Coerência e Harmonia. Observo que sua coerência está em ${triadScores.coerencia}%. Posso ajudar você a encontrar mais equilíbrio e alinhamento interno. Qual aspecto da harmonia te interessa?`;
        
      case 'geral':
        const media = Math.round((triadScores.consciencia + triadScores.energia + triadScores.coerencia) / 3);
        return `Olá! Sou Alex, seu coach de integração. Sua tríade geral está em ${media}%. Trabalho com a visão completa do seu desenvolvimento. Como posso apoiar sua jornada hoje?`;
        
      default:
        return `Olá! Como posso ajudar você hoje na sua jornada de crescimento pessoal?`;
    }
  };

  // Simular resposta inteligente da IA (em produção seria integração real)
  const generateAIResponse = (userMessage: string, coach: AIPersonality): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respostas contextuais baseadas na especialidade do coach
    if (coach.specialty === 'consciencia') {
      if (lowerMessage.includes('propósito') || lowerMessage.includes('missão')) {
        return `Entendo sua busca por propósito. Baseado no seu nível de consciência atual (${triadScores.consciencia}%), sugiro começar refletindo: "Em que momentos da minha vida me senti mais autêntico e realizado?" Esses momentos revelam pistas importantes sobre seus valores centrais.`;
      }
      if (lowerMessage.includes('valores') || lowerMessage.includes('princípios')) {
        return `Valores são sua bússola interna. Uma prática poderosa é identificar 3-5 valores fundamentais e observar como eles aparecem (ou não) no seu dia a dia. Quando agimos alinhados aos nossos valores, a consciência se expande naturalmente.`;
      }
      return `Como coach de consciência, percebo que você está buscando clareza interna. Que tal explorarmos seus padrões de pensamento e como eles influenciam suas escolhas? A autoconsciência é o primeiro passo para qualquer transformação.`;
    }
    
    if (coach.specialty === 'energia') {
      if (lowerMessage.includes('cansado') || lowerMessage.includes('energia')) {
        return `Energia é recurso vital! Com ${triadScores.energia}% atual, vamos focar em estratégias práticas: 1) Respiração energizante (4-7-8), 2) Movimento consciente, 3) Alimentação que nutre. Qual dessas áreas você sente que precisa de mais atenção?`;
      }
      if (lowerMessage.includes('sono') || lowerMessage.includes('descanso')) {
        return `Descanso de qualidade é fundamental para vitalidade. Crie um ritual de transição para o sono: desligue telas 1h antes, pratique gratidão, respire profundamente. O corpo precisa de sinais claros para restaurar sua energia.`;
      }
      return `Vitalidade é mais que energia física - é entusiasmo pela vida! Vamos identificar o que te energiza e o que te drena. Pequenos ajustes podem gerar grandes mudanças no seu nível energético.`;
    }
    
    if (coach.specialty === 'coerencia') {
      if (lowerMessage.includes('ansiedade') || lowerMessage.includes('estresse')) {
        return `A ansiedade mostra desalinhamento interno. Com ${triadScores.coerencia}% de coerência, pratique o "centramento cardíaco": mão no coração, respiração lenta, foque em gratidão. Isso sincroniza mente e emoções.`;
      }
      if (lowerMessage.includes('conflito') || lowerMessage.includes('decisão')) {
        return `Decisões difíceis pedem coerência interna. Pause, respire, conecte-se com seus valores centrais e sinta o que ressoa no seu coração. A resposta certa geralmente traz uma sensação de alinhamento, mesmo que desafiadora.`;
      }
      return `Harmonia interna é quando pensamentos, sentimentos e ações fluem juntos. Observo que você busca esse equilíbrio. Vamos explorar onde está a desconexão e como realinhar essas dimensões.`;
    }
    
    // Coach geral (Alex)
    const lowestScore = Math.min(triadScores.consciencia, triadScores.energia, triadScores.coerencia);
    const needsAttention = lowestScore === triadScores.consciencia ? 'consciência' : 
                          lowestScore === triadScores.energia ? 'energia' : 'coerência';
    
    return `Olhando sua tríade como um todo, percebo que a ${needsAttention} merece atenção especial. Crescimento integral acontece quando desenvolvemos todas as dimensões harmoniosamente. Que tal focarmos primeiro nisso e depois integramos com as outras áreas?`;
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        content: generateWelcomeMessage(selectedCoach),
        timestamp: new Date(),
        coachType: selectedCoach.specialty
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, selectedCoach]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
      coachType: selectedCoach.specialty
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay da IA
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        content: generateAIResponse(inputMessage, selectedCoach),
        timestamp: new Date(),
        coachType: selectedCoach.specialty
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCoachChange = (coach: AIPersonality) => {
    setSelectedCoach(coach);
    setMessages([]); // Limpar chat ao trocar coach
  };

  if (!isOpen) return null;

  const IconComponent = selectedCoach.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl h-[80vh] mx-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${selectedCoach.bgColor}`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{selectedCoach.name}</CardTitle>
                <p className="text-sm text-gray-600">{selectedCoach.description}</p>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Seletor de Coach */}
          <div className="flex space-x-2 mt-4">
            {aiPersonalities.map((coach) => {
              const CoachIcon = coach.icon;
              return (
                <button
                  key={coach.id}
                  onClick={() => handleCoachChange(coach)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCoach.id === coach.id
                      ? `bg-gradient-to-r ${coach.bgColor} text-white shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <CoachIcon className="w-4 h-4" />
                  <span>{coach.name}</span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col h-[calc(80vh-140px)]">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4 pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white ml-4'
                        : `bg-gray-100 text-gray-800 mr-4`
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'ai' && (
                        <IconComponent className={`w-4 h-4 mt-0.5 ${selectedCoach.color}`} />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 mt-0.5 text-blue-200" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-4">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-4 h-4 ${selectedCoach.color}`} />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Converse com ${selectedCoach.name}...`}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isTyping}
              className={`bg-gradient-to-r ${selectedCoach.bgColor}`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};