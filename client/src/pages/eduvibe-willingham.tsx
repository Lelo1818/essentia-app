import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Brain, Target, Calendar, Clock, FileText, 
  Upload, Camera, Youtube, Play, Pause, RotateCcw,
  CheckCircle, Star, Trophy, Zap, TrendingUp,
  User, Settings, LogOut, Home, GraduationCap,
  ChevronRight, Plus, Eye, EyeOff, AlertCircle,
  RefreshCw, Shuffle, Heart, Timer, Lightbulb,
  Volume2, ArrowRight, X, Send, BarChart3
} from 'lucide-react';
import { Link } from 'wouter';

// Interface para Flashcard do sistema Willingham
interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date;
  nextReview: Date;
  reviewCount: number;
  correctStreak: number;
  createdAt: Date;
}

// Interface para Revisão Espaçada
interface SpacedRepetitionItem {
  id: string;
  content: string;
  subject: string;
  interval: number; // dias
  easeFactor: number;
  nextReview: Date;
  lastReviewed: Date;
  quality: number; // 0-5
}

// Interface para Estudo Intercalado
interface InterleavingSession {
  id: string;
  subjects: string[];
  duration: number; // minutos
  currentSubject: number;
  completed: boolean;
  progress: number;
}

// Interface para Mitos do Aprendizado
interface LearningMyth {
  id: string;
  myth: string;
  truth: string;
  explanation: string;
  category: 'reading' | 'memory' | 'practice' | 'organization';
}

const EduVibeWillingham = () => {
  // Estados principais
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('myths');
  const [showInitialSetup, setShowInitialSetup] = useState(false);
  
  // Estados específicos dos pilares de Willingham
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [spacedItems, setSpacedItems] = useState<SpacedRepetitionItem[]>([]);
  const [activeFlashcard, setActiveFlashcard] = useState<Flashcard | null>(null);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);
  const [interleavingActive, setInterleavingActive] = useState(false);
  const [currentInterleaving, setCurrentInterleaving] = useState<InterleavingSession | null>(null);
  
  // Estados para Active Recall
  const [activeRecallMode, setActiveRecallMode] = useState(false);
  const [teachingMode, setTeachingMode] = useState(false);
  const [teachingTopic, setTeachingTopic] = useState('');
  const [teachingExplanation, setTeachingExplanation] = useState('');
  
  // Estados para aspectos emocionais
  const [focusMode, setFocusMode] = useState(false);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos em segundos
  const [breathingExercise, setBreathingExercise] = useState(false);

  // Mitos do aprendizado baseados em Willingham
  const learningMyths: LearningMyth[] = [
    {
      id: '1',
      myth: "Ler e reler é a melhor forma de estudar",
      truth: "Recuperação ativa é mais eficaz",
      explanation: "Seu cérebro não retém informação apenas lendo passivamente. Forçar-se a lembrar do conteúdo (sem olhar) cria conexões neurais mais fortes.",
      category: 'reading'
    },
    {
      id: '2', 
      myth: "Sublinhar tudo ajuda na memorização",
      truth: "Sublinhado seletivo + resumo próprio funciona melhor",
      explanation: "Sublinhar tudo não exige processamento mental profundo. Identifique apenas os pontos-chave e reescreva com suas próprias palavras.",
      category: 'reading'
    },
    {
      id: '3',
      myth: "Estudar a mesma matéria por horas é mais eficiente",
      truth: "Intercalar matérias fortalece o aprendizado",
      explanation: "O cérebro aprende melhor quando alterna entre diferentes tipos de problemas. Isso evita fadiga mental e melhora a transferência de conhecimento.",
      category: 'practice'
    },
    {
      id: '4',
      myth: "Se eu entendi na primeira vez, não preciso revisar",
      truth: "A curva do esquecimento é real e inevitável",
      explanation: "Sem revisão espaçada, você esquece 80% do que aprendeu em 24h. Revisões em intervalos crescentes mantêm o conhecimento na memória de longo prazo.",
      category: 'memory'
    }
  ];

  // Simulação de login
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setShowInitialSetup(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Timer Pomodoro
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      alert('🍅 Tempo de Pomodoro concluído! Faça uma pausa de 5 minutos.');
      setPomodoroTime(25 * 60);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroActive, pomodoroTime]);

  // Função para calcular próxima revisão (algoritmo de espaçamento)
  const calculateNextReview = (item: SpacedRepetitionItem, quality: number) => {
    let newInterval = item.interval;
    let newEaseFactor = item.easeFactor;
    
    if (quality < 3) {
      newInterval = 1;
    } else {
      newInterval = Math.ceil(item.interval * newEaseFactor);
      newEaseFactor = newEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    }
    
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);
    
    return { interval: newInterval, easeFactor: newEaseFactor, nextReview };
  };

  // Função para criar flashcard
  const createFlashcard = (front: string, back: string, subject: string) => {
    const newFlashcard: Flashcard = {
      id: Date.now().toString(),
      front,
      back,
      subject,
      difficulty: 'medium',
      lastReviewed: new Date(),
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // amanhã
      reviewCount: 0,
      correctStreak: 0,
      createdAt: new Date()
    };
    
    setFlashcards(prev => [...prev, newFlashcard]);
  };

  // Função para iniciar estudo intercalado
  const startInterleavedStudy = (subjects: string[], duration: number) => {
    const session: InterleavingSession = {
      id: Date.now().toString(),
      subjects,
      duration,
      currentSubject: 0,
      completed: false,
      progress: 0
    };
    
    setCurrentInterleaving(session);
    setInterleavingActive(true);
  };

  // Componente de Desmistificação
  const MythBusterComponent = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 px-6 py-3 rounded-full border border-red-200">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <span className="text-lg font-semibold text-red-700">
            🚨 ALERTA: Você pode estar estudando ERRADO!
          </span>
        </div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          A ciência cognitiva desmascarou mitos populares sobre aprendizado. 
          Descobra técnicas realmente eficazes baseadas em pesquisas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {learningMyths.map((myth) => (
          <Card key={myth.id} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-red-700 text-lg">MITO</CardTitle>
                  <CardDescription className="text-red-600 font-medium">
                    "{myth.myth}"
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-700">VERDADE</p>
                  <p className="text-green-600 font-medium">"{myth.truth}"</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-400">
                <p className="text-blue-800 text-sm">
                  <strong>Por que funciona:</strong> {myth.explanation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Pronto para aprender de verdade?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-4">
            Agora que você conhece a ciência por trás do aprendizado eficaz, 
            experimente nossas ferramentas baseadas em pesquisas comprovadas.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button 
              onClick={() => setActiveTab('active-recall')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              Recuperação Ativa
            </Button>
            <Button 
              onClick={() => setActiveTab('spaced-repetition')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Revisão Espaçada
            </Button>
            <Button 
              onClick={() => setActiveTab('interleaving')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Estudo Intercalado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente de Active Recall
  const ActiveRecallComponent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          🧠 Recuperação Ativa (Active Recall)
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Force seu cérebro a recuperar informações da memória. 
          Isso fortalece as conexões neurais de forma comprovada pela ciência.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quiz Rápido */}
        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quiz Rápido
            </CardTitle>
            <CardDescription>
              Perguntas abertas que exigem explicação com suas próprias palavras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Iniciar Quiz Aberto
            </Button>
          </CardContent>
        </Card>

        {/* Momento Flashcard */}
        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Momento Flashcard
            </CardTitle>
            <CardDescription>
              Sistema inteligente que aparece em intervalos estratégicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                if (flashcards.length > 0) {
                  setActiveFlashcard(flashcards[0]);
                  setShowFlashcardBack(false);
                } else {
                  // Criar flashcard de exemplo
                  createFlashcard(
                    "O que é recuperação ativa?",
                    "É o processo de forçar o cérebro a recuperar informações da memória sem consultar o material, fortalecendo as conexões neurais.",
                    "Aprendizado Eficaz"
                  );
                }
              }}
            >
              {flashcards.length > 0 ? 'Revisar Flashcards' : 'Criar Primeiro Flashcard'}
            </Button>
          </CardContent>
        </Card>

        {/* Jornada do Professor */}
        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Jornada do Professor
            </CardTitle>
            <CardDescription>
              Simule ensinar o que aprendeu para organizar o conhecimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setTeachingMode(true)}
            >
              Ser o Professor
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Flashcard */}
      {activeFlashcard && (
        <Dialog open={!!activeFlashcard} onOpenChange={() => setActiveFlashcard(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Flashcard - {activeFlashcard.subject}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Card className="min-h-[200px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="text-center">
                  <p className="text-lg font-medium text-blue-800">
                    {showFlashcardBack ? activeFlashcard.back : activeFlashcard.front}
                  </p>
                </CardContent>
              </Card>
              
              <div className="flex justify-center gap-4">
                {!showFlashcardBack ? (
                  <Button 
                    onClick={() => setShowFlashcardBack(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Mostrar Resposta
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-center text-gray-600">Como foi sua resposta?</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" className="border-red-300 text-red-600">
                        😅 Difícil
                      </Button>
                      <Button variant="outline" className="border-yellow-300 text-yellow-600">
                        🤔 Médio  
                      </Button>
                      <Button variant="outline" className="border-green-300 text-green-600">
                        😊 Fácil
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Jornada do Professor */}
      {teachingMode && (
        <Dialog open={teachingMode} onOpenChange={() => setTeachingMode(false)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Modo Professor: Ensine para Aprender
              </DialogTitle>
              <DialogDescription>
                Explique um conceito como se estivesse ensinando para alguém. 
                Isso força sua mente a organizar e consolidar o conhecimento.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Qual tópico você vai ensinar?</Label>
                <Input
                  id="topic"
                  value={teachingTopic}
                  onChange={(e) => setTeachingTopic(e.target.value)}
                  placeholder="Ex: Fotossíntese, Equações de 2º grau, Revolução Francesa..."
                />
              </div>
              <div>
                <Label htmlFor="explanation">Sua explicação (como se fosse para um amigo):</Label>
                <Textarea
                  id="explanation"
                  value={teachingExplanation}
                  onChange={(e) => setTeachingExplanation(e.target.value)}
                  placeholder="Explique o conceito com suas próprias palavras, use exemplos, analogias..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setTeachingMode(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!teachingTopic || !teachingExplanation}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Avaliar Minha Explicação
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  // Componente de Revisão Espaçada
  const SpacedRepetitionComponent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">
          🔄 Revisão Espaçada (Spaced Repetition)
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Combata a curva do esquecimento com revisões em intervalos cientificamente calculados.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-700 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximas Revisões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded border-l-4 border-l-red-400">
                <span className="text-sm font-medium">Matemática</span>
                <Badge variant="destructive">Hoje</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border-l-4 border-l-yellow-400">
                <span className="text-sm font-medium">História</span>
                <Badge variant="secondary">Amanhã</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border-l-4 border-l-green-400">
                <span className="text-sm font-medium">Química</span>
                <Badge variant="secondary">3 dias</Badge>
              </div>
            </div>
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
              Iniciar Revisão
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-700 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Curva do Esquecimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-red-600 mb-2">80%</div>
              <p className="text-sm text-gray-600 mb-4">
                você esquece em 24h sem revisão
              </p>
              <div className="space-y-2 text-left">
                <div className="text-sm">
                  ✅ <strong>1 dia:</strong> 1ª revisão
                </div>
                <div className="text-sm">
                  ✅ <strong>3 dias:</strong> 2ª revisão  
                </div>
                <div className="text-sm">
                  ⏳ <strong>7 dias:</strong> 3ª revisão
                </div>
                <div className="text-sm text-gray-500">
                  📅 <strong>15 dias:</strong> 4ª revisão
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-700 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Revisão Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Algoritmo adapta intervalos baseado no seu desempenho
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fácil:</span>
                <span className="text-green-600">+2 dias</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Médio:</span>
                <span className="text-yellow-600">+1 dia</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Difícil:</span>
                <span className="text-red-600">Amanhã</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 border-purple-600 text-purple-600">
              Ver Algoritmo
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">💡 Notificação Inteligente Ativada</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 mb-4">
            "Hora de revisar os conceitos de <strong>Física Quântica</strong> que você aprendeu há 3 dias! 
            Sua retenção está no ponto ideal para fortalecer a memória de longo prazo."
          </p>
          <div className="flex gap-3">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Revisar Agora
            </Button>
            <Button size="sm" variant="outline" className="border-purple-600 text-purple-600">
              Lembrar em 1h
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente de Estudo Intercalado
  const InterleavingComponent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-800 mb-2">
          🔀 Estudo Intercalado (Interleaving)
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Alterne entre diferentes matérias para evitar fadiga mental e fortalecer conexões neurais.
        </p>
      </div>

      {!interleavingActive ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <Shuffle className="w-5 h-5" />
                Trilhas Dinâmicas
              </CardTitle>
              <CardDescription>
                Configure sua sessão de estudo intercalado personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Selecione as matérias (3-5 recomendado):</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Matemática', 'História', 'Física', 'Literatura', 'Química', 'Biologia'].map(subject => (
                    <label key={subject} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Duração por matéria: 15 minutos</Label>
                <Slider
                  defaultValue={[15]}
                  max={30}
                  min={10}
                  step={5}
                  className="mt-2"
                />
              </div>

              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => startInterleavedStudy(['Matemática', 'História', 'Física'], 15)}
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Sessão Intercalada
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Desafio Misto
              </CardTitle>
              <CardDescription>
                Exercícios misturados de diferentes matérias que você está estudando
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Próximos Exercícios:</h4>
                <ul className="space-y-1 text-sm">
                  <li>📐 Geometria: Área de triângulos</li>
                  <li>⚗️ Química: Balanceamento de equações</li>
                  <li>📚 Literatura: Análise de poemas</li>
                  <li>🧮 Álgebra: Sistemas lineares</li>
                  <li>🔬 Física: Leis de Newton</li>
                </ul>
              </div>
              
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Iniciar Desafio Misto
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Sessão intercalada ativa
        currentInterleaving && (
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Sessão Intercalada Ativa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  {currentInterleaving.subjects[currentInterleaving.currentSubject]}
                </div>
                <p className="text-orange-600">Matéria atual - 15 minutos</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progresso da sessão</span>
                  <span className="text-sm text-orange-700 font-medium">
                    {currentInterleaving.currentSubject + 1}/{currentInterleaving.subjects.length}
                  </span>
                </div>
                <Progress 
                  value={(currentInterleaving.currentSubject + 1) / currentInterleaving.subjects.length * 100} 
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">12:34</div>
                  <div className="text-xs text-gray-500">Tempo restante</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">3/5</div>
                  <div className="text-xs text-gray-500">Matérias</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">45min</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="border-orange-600 text-orange-600">
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Próxima Matéria
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-600 text-red-600"
                  onClick={() => setInterleavingActive(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Finalizar
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      )}

      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">⚡ Por que o Intercalamento Funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">Estudo Tradicional (Bloqueado):</h4>
              <div className="space-y-1 text-sm">
                <div className="bg-blue-200 p-2 rounded">2h Matemática</div>
                <div className="bg-red-200 p-2 rounded">2h História</div>
                <div className="bg-green-200 p-2 rounded">2h Física</div>
              </div>
              <p className="text-xs text-gray-600 mt-2">❌ Fadiga mental, pouca transferência</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">Estudo Intercalado:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex gap-1">
                  <div className="bg-blue-200 p-2 rounded flex-1 text-center">Mat</div>
                  <div className="bg-red-200 p-2 rounded flex-1 text-center">Hist</div>
                  <div className="bg-green-200 p-2 rounded flex-1 text-center">Fís</div>
                </div>
                <div className="flex gap-1">
                  <div className="bg-green-200 p-2 rounded flex-1 text-center">Fís</div>
                  <div className="bg-blue-200 p-2 rounded flex-1 text-center">Mat</div>
                  <div className="bg-red-200 p-2 rounded flex-1 text-center">Hist</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">✅ Melhora discriminação e retenção</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente de Aspectos Emocionais
  const EmotionalAspectsComponent = () => {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            💚 Foco Essentia & Bem-Estar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combata ansiedade, procrastinação e desorganização com ferramentas integradas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Pomodoro Timer */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Foco Pomodoro
              </CardTitle>
              <CardDescription>
                25 min foco + 5 min pausa para combater procrastinação
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-red-600">
                {formatTime(pomodoroTime)}
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  onClick={() => setPomodoroActive(!pomodoroActive)}
                  className={pomodoroActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {pomodoroActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPomodoroTime(25 * 60);
                    setPomodoroActive(false);
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Respiração Guiada */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Respiração Anti-Ansiedade
              </CardTitle>
              <CardDescription>
                Exercício de 3 minutos para acalmar antes dos estudos
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">4 segundos inspire</p>
                <p className="text-sm text-gray-600">7 segundos segure</p>
                <p className="text-sm text-gray-600">8 segundos expire</p>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setBreathingExercise(true)}
              >
                Iniciar Respiração
              </Button>
            </CardContent>
          </Card>

          {/* Mapa Mental de Tarefas */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-700 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Mapa de Tarefas
              </CardTitle>
              <CardDescription>
                Organize visualmente seus estudos com drag & drop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-yellow-100 p-2 rounded text-sm border-l-4 border-l-yellow-400">
                  📚 Revisar Química - Cap 3
                </div>
                <div className="bg-blue-100 p-2 rounded text-sm border-l-4 border-l-blue-400">
                  ✏️ Exercícios de Matemática
                </div>
                <div className="bg-green-100 p-2 rounded text-sm border-l-4 border-l-green-400">
                  📖 Ler História - Revolução
                </div>
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Organizar Visualmente
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modo Foco Completo */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Modo Foco Essentia Ativado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <Volume2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Sons da Natureza</p>
                <p className="text-xs text-green-600">Chuva suave tocando</p>
              </div>
              <div className="text-center">
                <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Distrações Bloqueadas</p>
                <p className="text-xs text-green-600">Notificações pausadas</p>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Metas Claras</p>
                <p className="text-xs text-green-600">45 min de Física</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-3 justify-center">
              <Button variant="outline" className="border-green-600 text-green-600">
                Ajustar Som
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setFocusMode(!focusMode)}
              >
                {focusMode ? 'Sair do Foco' : 'Entrar em Foco'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Respiração */}
        {breathingExercise && (
          <Dialog open={breathingExercise} onOpenChange={() => setBreathingExercise(false)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-blue-600" />
                  Respiração 4-7-8
                </DialogTitle>
                <DialogDescription className="text-center">
                  Técnica comprovada para reduzir ansiedade e melhorar foco
                </DialogDescription>
              </DialogHeader>
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-16 h-16 text-blue-600" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-blue-800">Inspire (4s)</p>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>1. Inspire pelo nariz contando até 4</p>
                  <p>2. Segure a respiração contando até 7</p>
                  <p>3. Expire pela boca contando até 8</p>
                  <p>4. Repita 4 vezes</p>
                </div>
              </div>
              <DialogFooter className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setBreathingExercise(false)}>
                  Parar
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Continuar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  };

  // Modal de Setup Inicial
  const InitialSetupModal = () => (
    <Dialog open={showInitialSetup} onOpenChange={() => setShowInitialSetup(false)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-800">
            🎯 Bem-vindo ao EduVibe Científico!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Baseado nas pesquisas de Daniel Willingham sobre aprendizado eficaz
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Primeiro, uma pergunta importante:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                <strong>Você sabia que ler e reler é uma das formas MENOS eficazes de estudar?</strong>
              </p>
              <p className="text-gray-600 text-sm">
                A ciência cognitiva provou que técnicas populares como sublinhar tudo e reler múltiplas vezes 
                não funcionam. Aqui você vai aprender métodos realmente eficazes baseados em pesquisas.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-green-700 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Sim, quero aprender eficazmente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Descobrir técnicas comprovadas cientificamente
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-gray-700 text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Só quero dar uma olhada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Explorar sem compromisso
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setIsAuthenticated(true);
              setShowInitialSetup(false);
              setUser({ name: 'Estudante Cientíífico', email: 'aprender@eduvibe.com' });
            }}
          >
            <Brain className="w-4 h-4 mr-2" />
            Começar Jornada Científica
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              🧠 EduVibe Científico
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Aprendizado baseado em ciência cognitiva
            </p>
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
        <InitialSetupModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-800">EduVibe Científico</h1>
                <p className="text-xs text-gray-500">Baseado em Daniel Willingham</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">Cientista do Aprendizado</p>
              </div>
              <Link to="/dashboard-unificado">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-transparent">
              <TabsTrigger value="myths" className="flex items-center gap-2 data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Desmistificar</span>
              </TabsTrigger>
              <TabsTrigger value="active-recall" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Recuperação</span>
              </TabsTrigger>
              <TabsTrigger value="spaced-repetition" className="flex items-center gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Repetição</span>
              </TabsTrigger>
              <TabsTrigger value="interleaving" className="flex items-center gap-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
                <Shuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Intercalado</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Tab de Foco Essentia sempre visível */}
            <div className="mt-2">
              <TabsList className="w-full bg-transparent">
                <TabsTrigger value="emotional" className="flex items-center gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Foco Essentia</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="myths" className="mt-0">
            <MythBusterComponent />
          </TabsContent>
          
          <TabsContent value="active-recall" className="mt-0">
            <ActiveRecallComponent />
          </TabsContent>
          
          <TabsContent value="spaced-repetition" className="mt-0">
            <SpacedRepetitionComponent />
          </TabsContent>
          
          <TabsContent value="interleaving" className="mt-0">
            <InterleavingComponent />
          </TabsContent>
          
          <TabsContent value="emotional" className="mt-0">
            <EmotionalAspectsComponent />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer com informações científicas */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>Baseado na obra "Why Don't Students Like School?" de Daniel T. Willingham</strong>
            </p>
            <p>
              Técnicas validadas por pesquisas em ciência cognitiva • Universidade de Virginia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduVibeWillingham;