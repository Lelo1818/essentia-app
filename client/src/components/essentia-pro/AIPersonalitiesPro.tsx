import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { User, Send, Sparkles, MessageCircle, Loader2 } from 'lucide-react';
import { AIPersonality } from '../../types/essentia';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

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

  // Real AI integration with Anthropic
  const aiChatMutation = useMutation({
    mutationFn: async ({ personalityId, message }: { personalityId: string; message: string }) => {
      const response = await fetch('/api/ai-coach/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalityId,
          message,
          context: {
            clarity: 75,
            daysActive: 12,
            currentStage: 'clareza'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI Response data:', data);
      return { response: data.message || data.error || 'Resposta vazia da IA' };
    }
  });

  const sendMessage = async () => {
    if (!currentMessage.trim() || !selectedAI) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Call simulated AI
      const response = await aiChatMutation.mutateAsync({
        personalityId: selectedAI.id,
        message: messageToSend
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro no chat da IA:', error);
      
      // Fallback response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: `Desculpe, tive um problema técnico. Como ${selectedAI.name}, estou aqui para te apoiar. Pode tentar novamente?`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
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
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center">
              {selectedAI && (
                <>
                  <div className={`w-12 h-12 mr-4 bg-gradient-to-r ${selectedAI.color} rounded-full flex items-center justify-center`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold">Conversa com {selectedAI.name}</div>
                    <div className="text-sm text-gray-600">{selectedAI.focus}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col min-h-0 p-6 pt-4">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg mb-6 min-h-[300px] max-h-[400px]">
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

            {/* Input Section */}
            <div className="flex-shrink-0 space-y-3">
              <div className="flex space-x-3">
                <Textarea 
                  placeholder={`Digite sua mensagem para ${selectedAI?.name}...`}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 min-h-[60px] max-h-[120px] resize-none text-base p-4"
                  rows={2}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isTyping || aiChatMutation.isPending}
                  size="lg"
                  className={selectedAI ? `bg-gradient-to-r ${selectedAI.color} hover:opacity-90` : 'bg-blue-600'}
                >
                  {aiChatMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                Pressione Enter para enviar ou Shift+Enter para nova linha
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};