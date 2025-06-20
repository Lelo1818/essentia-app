import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, BookOpen, PlayCircle, CheckCircle, Clock, 
  Brain, Target, Lightbulb, Award, RotateCcw, ArrowRight
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { LearningPath, LearningSession } from "../../../../../../shared/schema-edu";

export default function Study() {
  const { pathId } = useParams();
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const { toast } = useToast();

  const { data: path } = useQuery<LearningPath>({
    queryKey: ["/api/edu/learning-paths", pathId],
    enabled: !!pathId,
  });

  const { data: sessions = [] } = useQuery<LearningSession[]>({
    queryKey: ["/api/edu/learning-sessions", pathId],
    enabled: !!pathId,
  });

  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await apiRequest("POST", "/api/edu/learning-sessions", sessionData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-sessions", pathId] });
      queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-paths"] });
    }
  });

  const updateSessionMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PUT", `/api/edu/learning-sessions/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-sessions", pathId] });
      queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-paths"] });
    }
  });

  // Generate study sessions based on path configuration
  const generateSessions = () => {
    if (!path) return [];

    const sessionTypes = ["reading", "flashcard", "quiz", "practice", "video"];
    const generatedSessions = [];

    // Generate different types of learning sessions
    for (let i = 0; i < 5; i++) {
      const type = sessionTypes[i % sessionTypes.length];
      const session = {
        userId: 1,
        pathId: path.id,
        type,
        content: generateSessionContent(type, path.subject, i + 1),
        duration: 15,
        score: null,
        completed: false,
      };
      generatedSessions.push(session);
    }

    return generatedSessions;
  };

  const generateSessionContent = (type: string, subject: string, sessionNumber: number) => {
    const baseContent = {
      title: `${subject} - Sessão ${sessionNumber}`,
      sessionNumber,
    };

    switch (type) {
      case "reading":
        return {
          ...baseContent,
          type: "reading",
          content: `Bem-vindo à sessão ${sessionNumber} de ${subject}. Nesta etapa, vamos explorar os conceitos fundamentais e construir uma base sólida de conhecimento.`,
          questions: [
            `Qual é o conceito mais importante que você aprendeu sobre ${subject} até agora?`,
            `Como você pode aplicar esse conhecimento na prática?`,
          ]
        };

      case "flashcard":
        return {
          ...baseContent,
          type: "flashcard",
          cards: [
            { front: `Conceito fundamental de ${subject}`, back: `Definição e explicação do conceito básico` },
            { front: `Aplicação prática`, back: `Como usar este conhecimento no dia a dia` },
            { front: `Benefícios`, back: `Vantagens de dominar este assunto` },
          ]
        };

      case "quiz":
        return {
          ...baseContent,
          type: "quiz",
          questions: [
            {
              question: `Qual é a importância de estudar ${subject}?`,
              options: [
                "Desenvolvimento pessoal",
                "Crescimento profissional",
                "Ampliação de conhecimento",
                "Todas as alternativas"
              ],
              correct: 3
            }
          ]
        };

      case "practice":
        return {
          ...baseContent,
          type: "practice",
          exercise: `Exercício prático: Aplique os conceitos aprendidos sobre ${subject} em uma situação real.`,
          instructions: [
            "Identifique uma situação onde você pode aplicar este conhecimento",
            "Descreva como você usaria o que aprendeu",
            "Reflita sobre os resultados esperados"
          ]
        };

      case "video":
        return {
          ...baseContent,
          type: "video",
          title: `Conceitos visuais de ${subject}`,
          description: "Conteúdo audiovisual que reforça o aprendizado através de diferentes sentidos",
          transcript: `Resumo visual dos principais conceitos abordados em ${subject}.`
        };

      default:
        return baseContent;
    }
  };

  // Initialize sessions if none exist
  useEffect(() => {
    if (path && sessions.length === 0) {
      const generatedSessions = generateSessions();
      generatedSessions.forEach(session => {
        createSessionMutation.mutate(session);
      });
    }
  }, [path, sessions.length]);

  const currentSession = sessions[currentSessionIndex];

  const handleCompleteSession = (score?: number) => {
    if (!currentSession) return;

    updateSessionMutation.mutate({
      id: currentSession.id,
      updates: {
        completed: true,
        score: score || 100,
      }
    });

    setSessionCompleted(true);
    toast({ 
      title: "Sessão concluída!", 
      description: "Parabéns! Continue para a próxima etapa." 
    });
  };

  const handleNextSession = () => {
    if (currentSessionIndex < sessions.length - 1) {
      setCurrentSessionIndex(currentSessionIndex + 1);
      setUserAnswer("");
      setShowResult(false);
      setSessionCompleted(false);
    } else {
      // Update path completion
      if (path) {
        const newProgress = Math.min(100, path.progress + 20);
        queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-paths"] });
        toast({ 
          title: "Módulo concluído!", 
          description: "Você completou mais uma etapa da sua trilha!" 
        });
      }
    }
  };

  const renderSessionContent = () => {
    if (!currentSession?.content) return null;

    const content = currentSession.content as any;

    switch (content.type) {
      case "reading":
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {content.content}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                Reflexão
              </h4>
              <div className="space-y-4">
                {content.questions?.map((question: string, index: number) => (
                  <div key={index}>
                    <p className="text-gray-700 mb-2">{question}</p>
                    <Textarea
                      placeholder="Escreva sua reflexão..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>

            {!sessionCompleted && (
              <Button 
                onClick={() => handleCompleteSession()}
                className="w-full"
                disabled={!userAnswer.trim()}
              >
                Concluir Leitura
              </Button>
            )}
          </div>
        );

      case "quiz":
        return (
          <div className="space-y-6">
            {content.questions?.map((q: any, index: number) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">{q.question}</h4>
                <div className="space-y-2">
                  {q.options?.map((option: string, optIndex: number) => (
                    <Button
                      key={optIndex}
                      variant={showResult ? (optIndex === q.correct ? "default" : "outline") : "outline"}
                      className="w-full text-left justify-start"
                      onClick={() => {
                        setShowResult(true);
                        const isCorrect = optIndex === q.correct;
                        handleCompleteSession(isCorrect ? 100 : 60);
                      }}
                      disabled={showResult}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "practice":
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">{content.exercise}</h4>
              <div className="space-y-2">
                {content.instructions?.map((instruction: string, index: number) => (
                  <p key={index} className="text-gray-700">
                    {index + 1}. {instruction}
                  </p>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Descreva como você aplicaria esse conhecimento..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              rows={6}
            />

            {!sessionCompleted && (
              <Button 
                onClick={() => handleCompleteSession()}
                className="w-full"
                disabled={!userAnswer.trim()}
              >
                Enviar Exercício
              </Button>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Conteúdo da sessão será carregado aqui</p>
            {!sessionCompleted && (
              <Button 
                onClick={() => handleCompleteSession()}
                className="mt-4"
              >
                Marcar como Concluído
              </Button>
            )}
          </div>
        );
    }
  };

  if (!path || !pathId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Trilha não encontrada</h3>
            <Link href="/trilhas">
              <Button>Voltar às trilhas</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/trilhas">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Trilhas
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{path.title}</h1>
                <p className="text-sm text-gray-600">
                  Sessão {currentSessionIndex + 1} de {sessions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Progresso geral</p>
                <p className="font-medium">{path.progress}%</p>
              </div>
              <div className="w-24">
                <Progress value={path.progress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {currentSession?.content?.title || `Sessão ${currentSessionIndex + 1}`}
            </h2>
            <Badge className="bg-blue-100 text-blue-800">
              {currentSession?.type || "Estudo"}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Progress value={((currentSessionIndex + 1) / sessions.length) * 100} className="flex-1" />
            <span className="text-sm text-gray-600">
              {currentSessionIndex + 1}/{sessions.length}
            </span>
          </div>
        </div>

        {/* Session Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderSessionContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {sessionCompleted && (
          <div className="flex justify-center">
            {currentSessionIndex < sessions.length - 1 ? (
              <Button onClick={handleNextSession} size="lg">
                Próxima Sessão
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Parabéns! Módulo concluído!
                  </h3>
                  <p className="text-gray-600">
                    Você completou mais uma etapa da sua jornada de aprendizado.
                  </p>
                </div>
                <div className="flex space-x-4 justify-center">
                  <Link href="/trilhas">
                    <Button variant="outline">Ver todas as trilhas</Button>
                  </Link>
                  <Link href="/">
                    <Button>Voltar ao dashboard</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}