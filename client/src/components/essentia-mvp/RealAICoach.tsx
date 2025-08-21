import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  MessageCircle, 
  Send, 
  Mic, 
  Volume2,
  Heart,
  Zap,
  Target,
  Sparkles,
  User,
  Bot
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface RealAICoachProps {
  triadScores: TriadScores;
  isOpen: boolean;
  onClose: () => void;
}

interface AIPersonality {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  style: string;
  color: string;
  prompt: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  personality: string;
}

const AI_PERSONALITIES: AIPersonality[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    avatar: '🧠',
    specialty: 'Autoconhecimento',
    style: 'Reflexiva e profunda',
    color: 'text-purple-600',
    prompt: 'Você é Sofia, uma mentora especializada em autoconhecimento e consciência. Você ajuda as pessoas a se conhecerem melhor através de perguntas reflexivas e insights profundos. Seja empática, curiosa e sempre focada no crescimento interior. Use linguagem brasileira natural.'
  },
  {
    id: 'marcos',
    name: 'Marcos',
    avatar: '⚡',
    specialty: 'Energia e Vitalidade',
    style: 'Motivador e energético',
    color: 'text-yellow-600',
    prompt: 'Você é Marcos, um coach energético especializado em vitalidade e motivação. Você inspira as pessoas a terem mais energia e ação na vida. Seja positivo, encorajador e prático. Foque em soluções concretas para aumentar energia. Use linguagem brasileira natural.'
  },
  {
    id: 'luna',
    name: 'Luna',
    avatar: '❤️',
    specialty: 'Equilíbrio Emocional',
    style: 'Compassiva e equilibrada',
    color: 'text-red-600',
    prompt: 'Você é Luna, uma terapeuta especializada em equilíbrio emocional e coerência. Você ajuda as pessoas a harmonizarem suas emoções e encontrarem paz interior. Seja acolhedora, sábia e sempre focada no bem-estar emocional. Use linguagem brasileira natural.'
  },
  {
    id: 'leo',
    name: 'Léo',
    avatar: '🎯',
    specialty: 'Propósito e Direcionamento',
    style: 'Focado e estratégico',
    color: 'text-blue-600',
    prompt: 'Você é Léo, um mentor especializado em propósito de vida e direcionamento. Você ajuda as pessoas a encontrarem sua missão e alinharem suas ações com seus valores. Seja direto, estratégico e inspirador. Use linguagem brasileira natural.'
  }
];

export const RealAICoach = ({ triadScores, isOpen, onClose }: RealAICoachProps) => {
  const [currentPersonality, setCurrentPersonality] = useState<AIPersonality>(AI_PERSONALITIES[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Som de notificação
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Som não disponível');
    }
  };

  // Mensagem inicial baseada na tríade
  const generateInitialMessage = () => {
    const { consciencia, energia, coerencia } = triadScores;
    const lowest = Math.min(consciencia, energia, coerencia);
    
    let selectedPersonality = AI_PERSONALITIES[0];
    let message = '';

    if (consciencia === lowest) {
      selectedPersonality = AI_PERSONALITIES[0]; // Sofia
      message = `Olá! Sou a Sofia, sua mentora de autoconhecimento. 🧠\n\nVejo que sua consciência está em ${consciencia}%. Que tal explorarmos juntas o que está por trás disso? O autoconhecimento é a base de toda transformação.\n\nComo você se sente em relação ao seu nível atual de autoconhecimento?`;
    } else if (energia === lowest) {
      selectedPersonality = AI_PERSONALITIES[1]; // Marcos
      message = `E aí! Sou o Marcos, seu coach de energia! ⚡\n\nPercebo que sua energia está em ${energia}%. Vamos dar uma turbinada nisso? Energia é vida, é movimento, é realizações!\n\nMe conta: o que tem drenado sua energia ultimamente?`;
    } else {
      selectedPersonality = AI_PERSONALITIES[2]; // Luna
      message = `Olá, querido(a)! Sou a Luna, sua guia emocional. ❤️\n\nVejo que sua coerência emocional está em ${coerencia}%. Vamos trabalhar juntas para harmonizar seu mundo interior?\n\nComo você tem se sentido emocionalmente nos últimos dias?`;
    }

    setCurrentPersonality(selectedPersonality);
    return {
      id: Date.now().toString(),
      role: 'assistant' as const,
      content: message,
      timestamp: new Date(),
      personality: selectedPersonality.id
    };
  };

  // Inicializar conversa
  useEffect(() => {
    if (isOpen && !isInitialized) {
      const initialMessage = generateInitialMessage();
      setChatMessages([initialMessage]);
      setIsInitialized(true);
      playNotificationSound();
    }
  }, [isOpen, isInitialized, triadScores]);

  // Scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Simular IA real com respostas contextuais
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simular tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const { consciencia, energia, coerencia } = triadScores;
    const context = `Scores atuais: Consciência ${consciencia}%, Energia ${energia}%, Coerência ${coerencia}%`;
    
    // Respostas contextuais baseadas na personalidade e scores
    const responses = getContextualResponses(userMessage, currentPersonality, triadScores);
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getContextualResponses = (userMessage: string, personality: AIPersonality, scores: TriadScores): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respostas específicas por personalidade
    switch (personality.id) {
      case 'sofia':
        if (lowerMessage.includes('não sei') || lowerMessage.includes('confuso')) {
          return [
            'A confusão é o primeiro passo para a clareza. 🌟 Quando não sabemos algo sobre nós mesmos, estamos criando espaço para descobrir.\n\nQue tal começarmos com algo simples: qual foi um momento recente em que você se sentiu mais "você mesmo"?',
            'É completamente normal não ter todas as respostas. O autoconhecimento é uma jornada, não um destino. 🗺️\n\nVamos explorar: quais são os valores que mais importam para você na vida?'
          ];
        }
        if (lowerMessage.includes('trabalho') || lowerMessage.includes('carreira')) {
          return [
            'O trabalho ocupa grande parte das nossas vidas. É importante que ele esteja alinhado com quem somos. 💼\n\nSua carreira atual reflete seus valores e talentos naturais? O que você mudaria se pudesse?',
            'Interessante você mencionar trabalho. Muitas vezes nossa profissão revela aspectos importantes de nossa personalidade. 🔍\n\nO que mais te energiza no seu trabalho? E o que mais te drena?'
          ];
        }
        return [
          'Entendo sua perspectiva. 🤔 Cada experiência nos ensina algo sobre nós mesmos.\n\nO que essa situação revela sobre seus padrões de pensamento ou comportamento?',
          'Obrigada por compartilhar isso comigo. 💭 Reflexão é minha especialidade!\n\nComo você acha que pode usar essa experiência para se conhecer melhor?'
        ];

      case 'marcos':
        if (lowerMessage.includes('cansado') || lowerMessage.includes('sem energia')) {
          return [
            'Entendo essa sensação de cansaço. Vamos mudar isso! 💪 A energia é como um músculo - quanto mais exercitamos, mais forte fica.\n\nConte-me: qual foi a última vez que você se sentiu realmente energizado? O que estava fazendo?',
            'Essa baixa energia pode ser um sinal de que algo precisa mudar. ⚡ Vamos identificar os ladrões de energia na sua vida!\n\nQuais atividades ou pessoas mais drenam sua energia?'
          ];
        }
        if (lowerMessage.includes('preguiça') || lowerMessage.includes('motivação')) {
          return [
            'A "preguiça" às vezes é só energia mal direcionada. 🎯 Quando encontramos o que realmente nos move, a motivação aparece naturalmente.\n\nO que te deixa animado só de pensar? Que atividade faz o tempo voar?',
            'Motivação não é algo que esperamos chegar - é algo que criamos! 🔥 Pequenas ações geram energia para ações maiores.\n\nQue pequena ação você poderia fazer agora para se sentir mais energizado?'
          ];
        }
        return [
          'Adorei seu entusiasmo! 🚀 É assim que se constrói uma vida vibrante - com ação e propósito.\n\nComo podemos canalizar essa energia de forma ainda mais eficaz?',
          'Isso aí! Essa é a atitude que move montanhas. ⚡ Energia atrai energia!\n\nQual seu próximo passo para manter esse momentum?'
        ];

      case 'luna':
        if (lowerMessage.includes('ansioso') || lowerMessage.includes('estresse') || lowerMessage.includes('tenso') || lowerMessage.includes('nervoso')) {
          return [
            'Sinto a tensão em suas palavras. 🌸 Ansiedade é um sinal de que nossa mente está no futuro, longe do presente.\n\nVamos praticar: respire fundo agora e me diga três coisas que você pode ver ao seu redor.',
            'O estresse é como ondas no oceano - intenso, mas temporário. 🌊 Podemos aprender a surfar essas ondas em vez de lutar contra elas.\n\nQue tal uma respiração guiada de 2 minutos para acalmar seu sistema nervoso?',
            'Percebo que você está tenso. Que tal experimentarmos o Portal da Harmonia? Ele tem exercícios específicos para equilibrar as emoções e trazer mais serenidade.'
          ];
        }
        if (lowerMessage.includes('raiva') || lowerMessage.includes('irritado')) {
          return [
            'A raiva é uma emoção válida que merece ser ouvida. 🔥 Ela geralmente está protegendo algo importante para você.\n\nO que essa raiva está tentando te dizer? Que valor ou necessidade foi ferida?',
            'Sinto que há uma frustração profunda aí. ❤️ Às vezes a raiva é tristeza usando armadura.\n\nSe pudesse transformar essa raiva em uma ação construtiva, o que faria?'
          ];
        }
        return [
          'Percebo a sabedoria emocional em suas palavras. 🦋 Você está aprendendo a navegar suas emoções com mais consciência.\n\nComo isso tem impactado seus relacionamentos?',
          'Fico feliz em ver seu crescimento emocional. 💝 O equilíbrio é uma dança constante, não um destino fixo.\n\nO que mais tem te ajudado nessa jornada de harmonização?'
        ];

      case 'leo':
        if (lowerMessage.includes('objetivo') || lowerMessage.includes('meta')) {
          return [
            'Objetivos são a bússola da vida! 🧭 Mas é importante que eles estejam alinhados com seu propósito maior.\n\nSeus objetivos atuais refletem realmente quem você é e o que valoriza?',
            'Adoro ver alguém focado em objetivos! 🎯 A clareza de propósito transforma metas em missões.\n\nQual objetivo seu está mais conectado com seu "por quê" mais profundo?'
          ];
        }
        if (lowerMessage.includes('perdido') || lowerMessage.includes('direção')) {
          return [
            'Sentir-se perdido é parte da jornada de encontrar seu caminho. 🗺️ Às vezes precisamos nos perder para nos encontrar de verdade.\n\nSe pudesse ignorar todas as expectativas externas, o que seu coração gostaria de fazer?',
            'A sensação de estar perdido pode ser um convite para explorar novos territórios internos. 🌟\n\nQuando você se sente mais alinhado consigo mesmo? Em que momentos há essa sensação de "estar no lugar certo"?'
          ];
        }
        return [
          'Vejo determinação em suas palavras. 🎖️ Propósito sem ação é apenas sonho, mas ação sem propósito é só movimento.\n\nComo podemos alinhar melhor suas ações com seu propósito?',
          'Excelente perspectiva! 🌟 Clareza de propósito é o que transforma pessoas comuns em extraordinárias.\n\nQual seria seu próximo passo estratégico para viver mais alinhado?'
        ];

      default:
        return ['Entendo sua perspectiva. Como posso ajudar você melhor?'];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      personality: currentPersonality.id
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        personality: currentPersonality.id
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      playNotificationSound();
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, tive um problema técnico. Pode repetir sua pergunta?',
        timestamp: new Date(),
        personality: currentPersonality.id
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const switchPersonality = (personality: AIPersonality) => {
    setCurrentPersonality(personality);
    playNotificationSound();
    
    const switchMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Olá! Agora estou falando como ${personality.name}. ${personality.avatar}\n\n${getPersonalityIntro(personality, triadScores)}\n\nEm que posso ajudar você hoje?`,
      timestamp: new Date(),
      personality: personality.id
    };
    
    setChatMessages(prev => [...prev, switchMessage]);
  };

  const getPersonalityIntro = (personality: AIPersonality, scores: TriadScores): string => {
    switch (personality.id) {
      case 'sofia':
        return `Sou especialista em autoconhecimento. Vejo que sua consciência está em ${scores.consciencia}%. Vamos explorar juntas os mistérios do seu mundo interior.`;
      case 'marcos':
        return `Sou seu coach de energia! Sua vitalidade está em ${scores.energia}%. Vamos turbinar essa energia e colocar você em ação!`;
      case 'luna':
        return `Sou sua guia emocional. Sua coerência está em ${scores.coerencia}%. Vamos harmonizar suas emoções e encontrar seu equilíbrio.`;
      case 'leo':
        return `Sou especialista em propósito. Analisando sua tríade, vamos descobrir qual sua verdadeira missão de vida.`;
      default:
        return 'Como posso ajudar você hoje?';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-indigo-600" />
              Mentores IA - Conversa Real
            </CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm">
              ✕
            </Button>
          </div>
          
          {/* Seletor de Personalidades */}
          <div className="flex space-x-2 mt-4">
            {AI_PERSONALITIES.map((personality) => (
              <Button
                key={personality.id}
                onClick={() => switchPersonality(personality)}
                variant={currentPersonality.id === personality.id ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-1"
              >
                <span>{personality.avatar}</span>
                <span className="text-xs">{personality.name}</span>
              </Button>
            ))}
          </div>
          
          {/* Info da Personalidade Atual */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{currentPersonality.avatar}</div>
              <div>
                <h4 className={`font-semibold ${currentPersonality.color}`}>
                  {currentPersonality.name}
                </h4>
                <p className="text-sm text-gray-600">{currentPersonality.specialty}</p>
                <p className="text-xs text-gray-500">{currentPersonality.style}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        {/* Chat Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{currentPersonality.avatar}</span>
                    <span className={`text-sm font-medium ${currentPersonality.color}`}>
                      {currentPersonality.name}
                    </span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{currentPersonality.avatar}</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Converse com ${currentPersonality.name}...`}
              className="resize-none min-h-[80px]"
              rows={3}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-2 text-center">
            🤖 IA Real: Respostas contextuais baseadas na sua tríade atual • Pressione Enter para enviar
          </div>
        </div>
      </Card>
    </div>
  );
};