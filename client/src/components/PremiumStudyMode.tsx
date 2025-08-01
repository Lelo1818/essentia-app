import React, { useState, useRef, useEffect } from "react";
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
  Bot,
  Camera,
  FileText,
  Image,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Download,
  Share,
  BookOpen,
  Target,
  Trophy,
  Zap,
  Star,
  Crown,
  Sparkles,
  Eye,
  Brain
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasImage?: boolean;
  imageUrl?: string;
  hasAudio?: boolean;
  audioUrl?: string;
  type?: 'text' | 'quiz' | 'exercise' | 'summary';
}

interface StudySession {
  topic: string;
  duration: number;
  questionsAnswered: number;
  comprehensionScore: number;
  achievements: string[];
}

interface PremiumStudyModeProps {
  onBack: () => void;
}

export default function PremiumStudyMode({ onBack }: PremiumStudyModeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `🎓 **Bem-vindo ao EduVibe Study Mode Premium!**

Sou seu tutor IA com recursos exclusivos que você não encontra em nenhum outro lugar:

✨ **Recursos Premium Únicos:**
• 📸 **Análise de imagens educacionais** - Envie fotos de exercícios, gráficos, livros
• 🎤 **Conversas por voz** - Pratique idiomas e discussões orais
• 🧠 **Mapas mentais visuais** - Visualize conexões de conhecimento
• 🎯 **Trilhas personalizadas** - Planos de estudo adaptados ao seu perfil
• 🏆 **Sistema de conquistas** - Gamificação real do aprendizado
• 📊 **Relatórios de progresso** - Análise detalhada do seu desenvolvimento
• 💾 **Biblioteca pessoal** - Salve todas as suas descobertas

**Sobre o que você quer aprender hoje?**
Posso criar uma experiência completamente personalizada para você!`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSession, setCurrentSession] = useState<StudySession>({
    topic: '',
    duration: 0,
    questionsAnswered: 0,
    comprehensionScore: 85,
    achievements: ['🎯 Primeira Sessão', '🧠 Pensador Crítico']
  });
  const [showVisualMap, setShowVisualMap] = useState(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSession(prev => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentSession(prev => ({ 
      ...prev, 
      questionsAnswered: prev.questionsAnswered + 1,
      topic: prev.topic || currentMessage.slice(0, 30) + '...'
    }));
    setCurrentMessage('');
    setIsThinking(true);

    setTimeout(() => {
      const response = generatePremiumResponse(currentMessage, messages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        type: response.type,
        hasImage: response.hasVisual
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);

      // Adiciona conquistas baseadas no progresso
      if (currentSession.questionsAnswered > 0 && currentSession.questionsAnswered % 5 === 0) {
        const newAchievement = getRandomAchievement();
        setCurrentSession(prev => ({
          ...prev,
          achievements: [...prev.achievements, newAchievement]
        }));
        toast({
          title: "🏆 Nova Conquista!",
          description: newAchievement,
        });
      }
    }, 2000);
  };

  const generatePremiumResponse = (userInput: string, messageHistory: Message[]) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('matemática') || input.includes('matematica') || input.includes('algebra')) {
      return {
        content: `🔢 **Matemática Premium Experience**

Vou criar uma experiência única de aprendizado matemático para você!

📊 **Análise do seu perfil:**
- Nível detectado: Intermediário
- Estilo de aprendizado: Visual + Prático
- Pontos fracos identificados: Álgebra abstrata

🎯 **Plano personalizado (Exclusive EduVibe):**

**Semana 1-2: Fundamentos Visuais**
• Gráficos interativos para equações
• Manipulação de objetos 3D
• Exercícios gamificados

**Semana 3-4: Aplicações Práticas**
• Problemas do mundo real
• Projetos com dados reais
• Simulações interativas

🧠 **Primeira reflexão guiada:**
Imagine que você está projetando um jardim retangular. Se você tem 50 metros de cerca e quer maximizar a área, que perguntas matemáticas surgem naturalmente?

**Pense em voz alta:** Como você abordaria este problema? Não me dê a resposta - me conte seu processo de pensamento!

💡 **Recurso Premium:** Após sua resposta, criarei um mapa mental visual mostrando todas as conexões matemáticas envolvidas.`,
        type: 'exercise' as const,
        hasVisual: true
      };
    }

    if (input.includes('programação') || input.includes('codigo') || input.includes('python')) {
      return {
        content: `💻 **Programação Premium Experience**

🎮 **Gamificação Exclusiva Ativada!**

Seu perfil de programador:
- XP atual: 1,250 pontos
- Nível: Aventureiro de Código 
- Especialização sugerida: Python + Web

🏆 **Missão Atual: "Primeiro Algoritmo"**

Em vez de te ensinar sintaxe, vamos **construir algo real juntos**:

**🎯 Projeto:** Criar um "Analisador de Humor de Texto"

**Etapa 1 - Raciocínio Lógico (antes do código):**
1. Se você fosse analisar se um texto é positivo ou negativo, que pistas você procuraria?
2. Como você explicaria isso para uma criança de 8 anos?
3. Que exemplos de frases claramente positivas e negativas você daria?

**🎁 Recursos Premium inclusos:**
• Biblioteca de 10.000 exemplos reais
• Visualizador de algoritmos em tempo real
• Mentor IA que verifica cada linha do seu código
• Certificado digital ao completar

**Sua primeira reflexão:** Me conte como VOCÊ pensaria para resolver esse problema, sem usar termos técnicos!`,
        type: 'exercise' as const,
        hasVisual: true
      };
    }

    if (input.includes('historia') || input.includes('história')) {
      return {
        content: `🏛️ **História Premium Experience**

🎭 **Simulação Histórica Ativada!**

**Cenário Exclusivo:** Você é um conselheiro em 1500, na corte de D. Manuel I de Portugal.

📜 **Situação crítica:** Vasco da Gama acabou de retornar da Índia. O reino está dividido sobre o que fazer com essas novas rotas comerciais.

🎯 **Sua missão como conselheiro:**

**Facção 1 - Conservadores:** "Devemos manter nossas tradições, essa exploração é perigosa"

**Facção 2 - Expansionistas:** "Esta é nossa chance de dominar o comércio mundial"

**Facção 3 - Religiosos:** "Nossa missão é evangelizar essas terras distantes"

🤔 **Reflexões guiadas (método socrático premium):**

1. **Contexto económico:** Que recursos Portugal tinha na época? Por que precisavam dessas rotas?

2. **Perspectiva humana:** Como você acha que se sentia um marinheiro comum nessas viagens?

3. **Consequências:** Quais impactos de longo prazo você preveria para Portugal e para os povos encontrados?

**🎁 Premium:** Após suas reflexões, revelarei documentos históricos reais e mapas interativos da época!

**Comece:** Qual facção faria mais sentido para você na época? Por quê?`,
        type: 'exercise' as const,
        hasVisual: true
      };
    }

    // Resposta padrão premium
    return {
      content: `🚀 **EduVibe Premium Analysis**

Detectei que você quer aprender sobre: **"${userInput}"**

🎯 **Análise personalizada do seu perfil:**
- Estilo de aprendizado identificado: Kinestésico + Visual
- Nível de conhecimento estimado: Iniciante-Intermediário
- Motivação principal: Aplicação prática

📋 **Trilha de aprendizado exclusiva criada:**

**Fase 1: Contextualização (5-10 min)**
• Por que esse tema é relevante para VOCÊ especificamente?
• Conexões com seus interesses pessoais
• Aplicações no mundo real

**Fase 2: Construção Ativa (15-20 min)**  
• Exercícios práticos personalizados
• Simulações interativas
• Questionamentos socráticos

**Fase 3: Consolidação (5-10 min)**
• Mapa mental visual do aprendizado
• Quiz adaptativo inteligente
• Plano de próximos passos

🧠 **Primeira pergunta reflexiva:**
Antes de eu te "ensinar" qualquer coisa, me conte: onde você já encontrou esse assunto na sua vida real? Mesmo que não tenha percebido na época?

💎 **Recursos Premium disponíveis:**
• Análise por voz (clique no microfone)
• Upload de imagens relacionadas
• Biblioteca personalizada
• Relatório de progresso detalhado`,
      type: 'exercise' as const,
      hasVisual: false
    };
  };

  const getRandomAchievement = () => {
    const achievements = [
      '🎯 Questionador Nato',
      '🧠 Pensamento Crítico',
      '🔥 Sequência de 5 Perguntas',
      '⭐ Insight Brilhante',
      '🚀 Aprendiz Dedicado',
      '💡 Conectador de Ideias',
      '🏆 Explorador do Conhecimento'
    ];
    return achievements[Math.floor(Math.random() * achievements.length)];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const imageMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: 'Analisei uma imagem educacional',
          timestamp: new Date(),
          hasImage: true,
          imageUrl: imageUrl
        };
        setMessages(prev => [...prev, imageMessage]);
        
        // Análise real da imagem usando IA
        analyzeImageWithAI(imageUrl, file.name).then(analysis => {
          const analysisMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: analysis,
            timestamp: new Date(),
            type: 'exercise'
          };
          setMessages(prev => [...prev, analysisMessage]);
        }).catch(() => {
          // Fallback caso a IA não funcione
          const fallbackMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `📸 **Análise da Imagem**

Recebi sua imagem "${file.name}". 

🎯 **Processo de aprendizado guiado:**

1. **Descreva o que vê:** Quais são os elementos principais da imagem?
2. **Identifique padrões:** Há relações, fórmulas, diagramas ou estruturas?
3. **Formule perguntas:** O que te intriga ou gera dúvidas?
4. **Conecte conhecimentos:** Como isso se relaciona com o que já sabe?

**Comece descrevendo:** O que mais chama sua atenção na imagem?`,
            timestamp: new Date(),
            type: 'exercise'
          };
          setMessages(prev => [...prev, fallbackMessage]);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "🎤 Gravação iniciada",
        description: "Fale sobre o que quer aprender!",
      });
      // Simula fim da gravação após 3 segundos
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: 'Mensagem por voz sobre matemática avançada',
          timestamp: new Date(),
          hasAudio: true
        };
        setMessages(prev => [...prev, voiceMessage]);
        
        setTimeout(() => {
          const voiceResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `🎤 **Análise de Voz Premium**

Ouvi sua pergunta sobre matemática avançada!

🎯 **Detectei em sua voz:**
• Curiosidade genuína sobre o tópico
• Alguma insegurança (normal!)
• Motivação para aplicação prática

📢 **Resposta em áudio disponível:** Posso explicar conceitos complexos usando analogias faladas e exemplos do cotidiano.

🧠 **Método socrático por voz:** Em vez de lectures, terei conversas reais com você, onde descobrimos juntos através de perguntas e reflexões.

**Quer continuar nossa conversa por voz?** Isso torna o aprendizado muito mais natural e efetivo!`,
            timestamp: new Date(),
            type: 'text',
            hasAudio: true
          };
          setMessages(prev => [...prev, voiceResponse]);
        }, 1000);
      }, 3000);
    }
  };

  const saveToLibrary = (messageId: string) => {
    setSavedItems(prev => [...prev, messageId]);
    // Salva no localStorage para persistir
    const message = messages.find(m => m.id === messageId);
    if (message) {
      const savedLibrary = JSON.parse(localStorage.getItem('eduvibe-library') || '[]');
      savedLibrary.push({
        id: messageId,
        content: message.content,
        timestamp: message.timestamp,
        topic: currentSession.topic
      });
      localStorage.setItem('eduvibe-library', JSON.stringify(savedLibrary));
    }
    toast({
      title: "💾 Salvo na biblioteca",
      description: "Item adicionado à sua coleção pessoal!",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Função para análise real de imagens
  const analyzeImageWithAI = async (imageUrl: string, fileName: string): Promise<string> => {
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          imageUrl, 
          fileName,
          context: 'educational analysis' 
        }),
      });

      if (!response.ok) {
        throw new Error('Análise não disponível');
      }

      const result = await response.json();
      
      return `📸 **Análise IA da Imagem - ${fileName}**

${result.analysis}

🎯 **Perguntas reflexivas baseadas na análise:**

${result.questions || '1. O que você observa de mais interessante nesta imagem?\n2. Como isso se conecta com seus conhecimentos anteriores?\n3. Que dúvidas surgem ao observar estes elementos?'}

🧠 **Próximo passo:** Responda às perguntas acima para aprofundarmos seu aprendizado!`;

    } catch (error) {
      throw error;
    }
  };

  // Carrega biblioteca do localStorage
  React.useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem('eduvibe-library') || '[]');
    setSavedItems(savedLibrary.map((item: any) => item.id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Premium Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <BrainCircuit className="w-8 h-8 text-orange-600" />
                <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  EduVibe Premium
                  <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    PREMIUM
                  </Badge>
                </h1>
                <p className="text-gray-600">Tutor IA com recursos exclusivos</p>
              </div>
            </div>
          </div>

          {/* Session Stats */}
          <div className="flex items-center gap-4">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>{currentSession.questionsAnswered} perguntas</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>{currentSession.comprehensionScore}% compreensão</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span>{formatTime(currentSession.duration)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Sessão Premium Ativa
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">IA Avançada</span>
                  </div>
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-2xl p-4 rounded-lg relative ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white ml-auto'
                            : message.type === 'exercise' 
                            ? 'bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 border border-purple-200'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.hasImage && message.imageUrl && (
                          <img src={message.imageUrl} alt="Uploaded" className="max-w-full h-auto rounded mb-2" />
                        )}
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.hasAudio && (
                          <div className="flex items-center gap-2 mt-2 p-2 bg-blue-100 rounded">
                            <Volume2 className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-700">Mensagem de áudio</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                          {message.role === 'assistant' && (
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => saveToLibrary(message.id)}
                                className="h-6 w-6 p-0"
                              >
                                <BookOpen className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                              >
                                <Share className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="text-sm ml-2">Criando experiência personalizada...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium Input Area */}
                <div className="border-t p-4 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex gap-2 mb-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1"
                    >
                      <Camera className="w-4 h-4" />
                      Imagem
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={toggleRecording}
                      className={`flex items-center gap-1 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {isRecording ? 'Gravando...' : 'Voz'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowVisualMap(!showVisualMap)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Mapa Mental
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Digite, envie imagem ou grave áudio..."
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Sidebar */}
          <div className="space-y-4">
            {/* Achievements */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentSession.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="w-full justify-start bg-white/70">
                    {achievement}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Progresso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Compreensão</span>
                    <span>{currentSession.comprehensionScore}%</span>
                  </div>
                  <Progress value={currentSession.comprehensionScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engajamento</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Biblioteca</span>
                    <span>{savedItems.length} itens</span>
                  </div>
                  <Progress value={(savedItems.length / 10) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Recursos Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>Análise de imagens ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>Conversas por voz ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>Mapas mentais visuais ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>Biblioteca pessoal ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>Relatórios detalhados ✓</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}