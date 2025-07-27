import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { User, Send, Sparkles, MessageCircle } from 'lucide-react';
import { AIPersonality } from '../../types/essentia';

interface AIPersonalitiesProProps {
  personalities: AIPersonality[];
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIPersonalitiesPro = ({ personalities }: AIPersonalitiesProProps) => {
  const [selectedAI, setSelectedAI] = useState<AIPersonality | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const openChat = (ai: AIPersonality) => {
    setSelectedAI(ai);
    setIsDialogOpen(true);
    // Initial message from AI
    setMessages([{
      id: '1',
      sender: 'ai',
      content: ai.phrase,
      timestamp: new Date()
    }]);
  };

  const sendMessage = () => {
    if (!currentMessage.trim() || !selectedAI) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        sofia: [
          "Compreendo sua situação. Lembre-se de que cada desafio é uma oportunidade de crescimento. Como posso apoiá-lo melhor?",
          "Sua vulnerabilidade é uma força, não uma fraqueza. O que você está sentindo agora é válido e importante.",
          "Às vezes precisamos parar e simplesmente respirar. Que tal fazermos isso juntos por um momento?"
        ],
        marcos: [
          "Excelente reflexão! Agora vamos transformar isso em ação. Qual seria o primeiro passo prático que você pode dar hoje?",
          "Foco é fundamental. Vamos quebrar esse objetivo em tarefas menores e executáveis. Por onde começamos?",
          "Você tem o poder de criar mudanças reais. Que ação específica você pode tomar nas próximas 24 horas?"
        ],
        luna: [
          "Que bela oportunidade para reflexão profunda. O que essa experiência está tentando te ensinar?",
          "A sabedoria emerge no silêncio. Permita-se sentir o que precisa ser sentido, sem julgamentos.",
          "Cada fim de dia é uma chance de integrar as lições aprendidas. O que você descobriu sobre si hoje?"
        ],
        leo: [
          "Que energia incrível! Vamos canalizar essa motivação em conquistas concretas. Qual é seu maior sonho?",
          "Você está radiante hoje! Essa energia positiva é contagiante. Como podemos multiplicá-la?",
          "O mundo precisa da sua luz! Que tal usar essa energia para inspirar alguém hoje?"
        ]
      };

      const responses = aiResponses[selectedAI.id as keyof typeof aiResponses] || aiResponses.sofia;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getTimeString = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            Guias de IA Personalizados
          </CardTitle>
          <p className="text-center text-gray-600">
            Quatro personalidades especializadas que se adaptam às suas necessidades
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalities.map((ai) => (
              <Card key={ai.id} className="border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${ai.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{ai.name}</CardTitle>
                      <p className="text-sm text-gray-600">{ai.focus}</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-xs text-green-600">Online</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl mb-4 border-l-4 ${ai.color.replace('from-', 'border-').split(' ')[0]}`}>
                    <p className="text-gray-700 italic text-sm">"{ai.phrase}"</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    <strong>Especialidade:</strong> {ai.specialty}
                  </p>
                  <Button 
                    size="sm" 
                    className={`bg-gradient-to-r ${ai.color} text-white w-full group-hover:shadow-md transition-shadow`}
                    onClick={() => openChat(ai)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Conversar com {ai.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedAI && (
                <>
                  <div className={`w-8 h-8 mr-3 bg-gradient-to-r ${selectedAI.color} rounded-full flex items-center justify-center`}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Conversa com {selectedAI.name}
                  <div className="ml-auto flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : `bg-gradient-to-r ${selectedAI?.color} text-white`
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-white/80'
                    }`}>
                      {getTimeString(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`bg-gradient-to-r ${selectedAI?.color} text-white p-3 rounded-lg`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Textarea 
                placeholder={`Digite sua mensagem para ${selectedAI?.name}...`}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                className="flex-1 min-h-[40px] max-h-[120px]"
                rows={1}
              />
              <Button 
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isTyping}
                size="sm"
                className={selectedAI ? `bg-gradient-to-r ${selectedAI.color}` : 'bg-blue-600'}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};