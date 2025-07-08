import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Book, 
  Brain, 
  Target, 
  MessageCircle, 
  CheckCircle, 
  Video,
  FileText,
  Users,
  ArrowRight,
  Star,
  Award,
  Lightbulb
} from "lucide-react";

interface LearningPath {
  id: number;
  title: string;
  description: string;
  progress: number;
  modules: Module[];
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  estimatedTime: string;
}

interface Module {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  completed: boolean;
  content?: string;
  questions?: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function EduVibeFunctional() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [userName, setUserName] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'ai', message: string}>>([]);
  const [userInput, setUserInput] = useState("");

  // Dados de exemplo realistas
  const learningTopics = [
    { id: 'financas', title: 'Educação Financeira', icon: '💰', desc: 'Aprenda a organizar sua vida financeira' },
    { id: 'tech', title: 'Tecnologia', icon: '💻', desc: 'Programação e tecnologia para iniciantes' },
    { id: 'marketing', title: 'Marketing Digital', icon: '📱', desc: 'Estratégias de marketing online' },
    { id: 'mindset', title: 'Desenvolvimento Pessoal', icon: '🧠', desc: 'Crescimento pessoal e profissional' }
  ];

  const samplePath: LearningPath = {
    id: 1,
    title: "Fundamentos de Educação Financeira",
    description: "Uma jornada completa para organizar sua vida financeira",
    progress: 25,
    difficulty: 'Iniciante',
    estimatedTime: "2 semanas",
    modules: [
      {
        id: 1,
        title: "Entendendo o Dinheiro",
        type: 'video',
        completed: true,
        content: "O dinheiro é uma ferramenta, não um objetivo. Neste módulo você aprenderá sobre a psicologia do dinheiro e como ele funciona na sua vida."
      },
      {
        id: 2,
        title: "Criando seu Primeiro Orçamento",
        type: 'interactive',
        completed: false,
        content: "Vamos criar juntos seu primeiro orçamento pessoal. Você aprenderá a categorizar gastos e identificar oportunidades de economia."
      },
      {
        id: 3,
        title: "Quiz: Conhecimentos Básicos",
        type: 'quiz',
        completed: false,
        questions: [
          {
            id: 1,
            question: "Qual é a regra básica para um orçamento saudável?",
            options: [
              "Gastar tudo que ganha",
              "Gastar menos do que ganha",
              "Gastar apenas o necessário",
              "Não fazer orçamento"
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "O que é uma reserva de emergência?",
            options: [
              "Dinheiro para compras extras",
              "Investimento de alto risco",
              "Valor guardado para imprevistos",
              "Dinheiro para férias"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 4,
        title: "Resumo em Vídeo Personalizado",
        type: 'video',
        completed: false,
        content: "Um resumo personalizado criado pela IA baseado no seu progresso e perfil de aprendizagem."
      }
    ]
  };

  // Tela 1: Boas-vindas
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">EduVibe</h1>
            <p className="text-gray-600">Onde aprender não é tarefa, é experiência</p>
          </div>
          
          <div className="space-y-4">
            <Input
              placeholder="Como você gostaria de ser chamado?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-center"
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                if (userName.trim()) {
                  setCurrentStep(2);
                  toast({
                    title: `Bem-vindo, ${userName}!`,
                    description: "Vamos descobrir o que você quer aprender"
                  });
                } else {
                  toast({
                    title: "Nome necessário",
                    description: "Digite seu nome para continuar",
                    variant: "destructive"
                  });
                }
              }}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Começar Minha Jornada
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tela 2: Escolha de Tema
  const TopicSelectionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Olá, {userName}! O que você quer aprender?
          </h2>
          <p className="text-blue-100">Escolha um tema e criaremos uma trilha personalizada para você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningTopics.map((topic) => (
            <Card 
              key={topic.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedTopic === topic.id ? 'ring-4 ring-yellow-400 bg-yellow-50' : 'bg-white'
              }`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.desc}</p>
                {selectedTopic === topic.id && (
                  <Badge className="bg-yellow-500 text-white">Selecionado</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTopic && (
          <div className="text-center mt-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              onClick={() => {
                setCurrentPath(samplePath);
                setCurrentStep(3);
                toast({
                  title: "Trilha Criada!",
                  description: "IA criou uma trilha personalizada para você"
                });
              }}
            >
              <Brain className="w-5 h-5 mr-2" />
              Criar Minha Trilha com IA
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Tela 3: Trilha Personalizada
  const PersonalizedPathScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-600 to-blue-600 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Sua Trilha Está Pronta!</h2>
          <p className="text-green-100">A IA criou um caminho personalizado baseado no seu perfil</p>
        </div>

        {currentPath && (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-800">{currentPath.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{currentPath.description}</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  {currentPath.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm text-gray-600">Progresso:</span>
                <Progress value={currentPath.progress} className="flex-1" />
                <span className="text-sm font-medium">{currentPath.progress}%</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {currentPath.modules.map((module, index) => (
                <div 
                  key={module.id}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    module.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    setCurrentModule(module);
                    setCurrentStep(module.type === 'quiz' ? 7 : module.type === 'video' ? 8 : 5);
                  }}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      module.completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {module.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800">{module.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">{module.type}</p>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}

              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                onClick={() => setCurrentStep(4)}
              >
                <Target className="w-4 h-4 mr-2" />
                Ver Dashboard de Progresso
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  // Tela 4: Dashboard
  const DashboardScreen = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Seu Dashboard, {userName}</h2>
          <p className="text-gray-600">Acompanhe seu progresso e continue aprendendo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">3</h3>
              <p className="text-gray-600">Módulos Completados</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">87%</h3>
              <p className="text-gray-600">Taxa de Acerto</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">12h</h3>
              <p className="text-gray-600">Tempo de Estudo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Continue Aprendendo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => setCurrentStep(5)}
                >
                  <Book className="w-4 h-4 mr-2" />
                  Biblioteca de Conteúdos
                </Button>
                
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => setCurrentStep(6)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat com Mentor IA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Completar Quiz de Finanças</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  <span className="text-sm">Assistir vídeo personalizado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Tela 5: Biblioteca de Conteúdos
  const LibraryScreen = () => (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Biblioteca de Conteúdos</h2>
          <p className="text-gray-600">Explore materiais criados especialmente para você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            toast({ title: "Carregando conteúdo...", description: "Abrindo material de estudo" });
          }}>
            <CardContent className="p-6">
              <FileText className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Guia Completo: Orçamento Pessoal</h3>
              <p className="text-gray-600 mb-4">Um guia passo a passo para criar e manter seu orçamento</p>
              <Badge className="bg-blue-100 text-blue-700">PDF • 15 páginas</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            toast({ title: "Reproduzindo vídeo...", description: "Iniciando aula em vídeo" });
          }}>
            <CardContent className="p-6">
              <Video className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Aula: Psicologia do Dinheiro</h3>
              <p className="text-gray-600 mb-4">Entenda sua relação emocional com o dinheiro</p>
              <Badge className="bg-red-100 text-red-700">Vídeo • 25 min</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            toast({ title: "Abrindo exercício...", description: "Carregando atividade prática" });
          }}>
            <CardContent className="p-6">
              <Target className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Exercício: Metas Financeiras</h3>
              <p className="text-gray-600 mb-4">Defina e organize suas metas de forma inteligente</p>
              <Badge className="bg-green-100 text-green-700">Interativo • 10 min</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            toast({ title: "Iniciando chat...", description: "Conectando com mentor IA" });
          }}>
            <CardContent className="p-6">
              <Brain className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Análise IA Personalizada</h3>
              <p className="text-gray-600 mb-4">Insights baseados no seu perfil de aprendizagem</p>
              <Badge className="bg-purple-100 text-purple-700">IA • Personalizado</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button onClick={() => setCurrentStep(4)}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );

  // Tela 6: Chat com Mentor IA
  const MentorChatScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              Mentor IA - EduVibe
            </CardTitle>
            <p className="text-gray-600">Seu assistente inteligente para aprendizagem personalizada</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                  <p>Olá, {userName}! Sou seu mentor IA.</p>
                  <p>Pergunte qualquer coisa sobre seus estudos!</p>
                </div>
              )}

              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && userInput.trim()) {
                    const newMessages = [
                      ...chatMessages,
                      { sender: 'user' as const, message: userInput },
                      { sender: 'ai' as const, message: `Ótima pergunta sobre "${userInput}"! Como mentor IA, posso te ajudar com isso. Baseado no seu progresso, recomendo focar em exercícios práticos.` }
                    ];
                    setChatMessages(newMessages);
                    setUserInput("");
                  }
                }}
              />
              <Button onClick={() => {
                if (userInput.trim()) {
                  const newMessages = [
                    ...chatMessages,
                    { sender: 'user' as const, message: userInput },
                    { sender: 'ai' as const, message: `Excelente pergunta! Baseado no seu perfil, recomendo: 1) Praticar com exemplos reais, 2) Revisar o módulo anterior, 3) Fazer o quiz para fixar o conhecimento.` }
                  ];
                  setChatMessages(newMessages);
                  setUserInput("");
                }
              }}>
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button onClick={() => setCurrentStep(4)} variant="outline">
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );

  // Tela 7: Quiz Interativo
  const QuizScreen = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = currentModule?.questions || samplePath.modules[2].questions || [];

    const handleAnswer = () => {
      if (selectedAnswer !== null) {
        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
        if (isCorrect) setScore(score + 1);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowResult(true);
        }
      }
    };

    if (showResult) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Quiz Concluído!</h2>
              <p className="text-gray-600 mb-6">
                Você acertou {score} de {questions.length} questões
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={() => {
                    setCurrentStep(8);
                    toast({
                      title: "Parabéns!",
                      description: `Score: ${(score/questions.length*100).toFixed(0)}%`
                    });
                  }}
                >
                  Ver Vídeo Resumo Personalizado
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(4)}>
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Quiz Interativo</CardTitle>
                <Badge variant="outline">
                  {currentQuestion + 1} de {questions.length}
                </Badge>
              </div>
              <Progress value={(currentQuestion / questions.length) * 100} />
            </CardHeader>

            <CardContent className="space-y-6">
              <h3 className="text-xl font-semibold">{questions[currentQuestion]?.question}</h3>
              
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => setSelectedAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <Button 
                className="w-full"
                disabled={selectedAnswer === null}
                onClick={handleAnswer}
              >
                {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Tela 8: Resumo em Vídeo
  const VideoSummaryScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-red-500 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Seu Vídeo Resumo Personalizado</CardTitle>
            <p className="text-center text-gray-600">
              Criado pela IA baseado no seu progresso e estilo de aprendizagem
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Simulação de player de vídeo */}
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Resumo: Educação Financeira</h3>
                <p className="text-gray-300 mb-4">Personalizado para {userName}</p>
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    toast({
                      title: "Reproduzindo vídeo...",
                      description: "Seu resumo personalizado está sendo reproduzido"
                    });
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Assistir Agora
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Seus Pontos Fortes</h4>
                  <p className="text-sm text-gray-600">Organização e planejamento</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Lightbulb className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Áreas de Melhoria</h4>
                  <p className="text-sm text-gray-600">Controle de gastos impulsivos</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Próximo Nível</h4>
                  <p className="text-sm text-gray-600">Investimentos básicos</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-3">
              <Button 
                size="lg"
                onClick={() => {
                  setCurrentStep(4);
                  toast({
                    title: "Parabéns!",
                    description: "Módulo completo! Continue sua jornada"
                  });
                }}
              >
                Completar Módulo
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Começar Nova Trilha
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Renderização baseada no step atual
  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 1: return <WelcomeScreen />;
      case 2: return <TopicSelectionScreen />;
      case 3: return <PersonalizedPathScreen />;
      case 4: return <DashboardScreen />;
      case 5: return <LibraryScreen />;
      case 6: return <MentorChatScreen />;
      case 7: return <QuizScreen />;
      case 8: return <VideoSummaryScreen />;
      default: return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentScreen()}
      
      {/* Indicador de progresso (floating) */}
      {currentStep > 1 && (
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
          <div className="text-xs text-center">
            <div className="font-semibold">Etapa {currentStep}/8</div>
            <div className="text-gray-600">EduVibe</div>
          </div>
        </div>
      )}
    </div>
  );
}