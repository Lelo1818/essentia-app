import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, Target, Trophy, Clock, Play, Upload, FileText, Headphones, Video, Zap } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  difficulty: string;
  estimatedTime: string;
  thumbnail: string;
}

interface StudySession {
  id: number;
  courseId: number;
  title: string;
  type: 'video' | 'audio' | 'text' | 'quiz' | 'flashcard';
  duration: number;
  completed: boolean;
  score?: number;
}

export default function EduVie() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [todaysSessions, setTodaysSessions] = useState<StudySession[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    studyStreak: 0,
    totalStudyTime: 0,
    avgScore: 0
  });

  useEffect(() => {
    // Load educational data
    const mockCourses: Course[] = [
      {
        id: 1,
        title: "JavaScript Avançado",
        description: "Domine conceitos avançados de JavaScript para desenvolvimento moderno",
        progress: 65,
        totalLessons: 24,
        completedLessons: 16,
        category: "Programação",
        difficulty: "Avançado",
        estimatedTime: "8 semanas",
        thumbnail: "/api/placeholder/course-js"
      },
      {
        id: 2,
        title: "Design UX/UI",
        description: "Princípios fundamentais de design centrado no usuário",
        progress: 30,
        totalLessons: 18,
        completedLessons: 5,
        category: "Design",
        difficulty: "Intermediário",
        estimatedTime: "6 semanas",
        thumbnail: "/api/placeholder/course-design"
      },
      {
        id: 3,
        title: "Finanças Pessoais",
        description: "Gestão inteligente do dinheiro e investimentos",
        progress: 90,
        totalLessons: 12,
        completedLessons: 11,
        category: "Finanças",
        difficulty: "Iniciante",
        estimatedTime: "4 semanas",
        thumbnail: "/api/placeholder/course-finance"
      },
      {
        id: 4,
        title: "Marketing Digital",
        description: "Estratégias modernas de marketing online",
        progress: 45,
        totalLessons: 20,
        completedLessons: 9,
        category: "Marketing",
        difficulty: "Intermediário",
        estimatedTime: "7 semanas",
        thumbnail: "/api/placeholder/course-marketing"
      }
    ];

    const mockSessions: StudySession[] = [
      {
        id: 1,
        courseId: 1,
        title: "Promises e Async/Await",
        type: "video",
        duration: 25,
        completed: false
      },
      {
        id: 2,
        courseId: 2,
        title: "Princípios de Usabilidade",
        type: "text",
        duration: 15,
        completed: true,
        score: 95
      },
      {
        id: 3,
        courseId: 1,
        title: "Quiz: JavaScript ES6+",
        type: "quiz",
        duration: 10,
        completed: false
      },
      {
        id: 4,
        courseId: 4,
        title: "SEO e Analytics",
        type: "audio",
        duration: 20,
        completed: false
      }
    ];

    setCourses(mockCourses);
    setTodaysSessions(mockSessions);
    setStats({
      totalCourses: 12,
      completedCourses: 3,
      studyStreak: 7,
      totalStudyTime: 48,
      avgScore: 87
    });
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'flashcard': return <Zap className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            EduVie - Aprendizado Inteligente
          </h1>
          <p className="text-lg text-gray-600">Sua jornada personalizada de conhecimento</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cursos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sequência</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.studyStreak} dias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horas Estudo</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudyTime}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nota Média</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="courses">Meus Cursos</TabsTrigger>
            <TabsTrigger value="study">Estudar Hoje</TabsTrigger>
            <TabsTrigger value="upload">Novo Conteúdo</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Study Plan */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Plano de Estudos - Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todaysSessions.map((session) => (
                    <div key={session.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        {getTypeIcon(session.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{session.title}</p>
                        <p className="text-sm text-gray-600">{session.duration} min</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.completed && session.score && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {session.score}%
                          </Badge>
                        )}
                        <Button 
                          size="sm" 
                          variant={session.completed ? "outline" : "default"}
                          className={session.completed ? "border-green-300" : "bg-purple-600 hover:bg-purple-700"}
                        >
                          {session.completed ? "Concluído" : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    Progresso dos Cursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.slice(0, 4).map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-gray-500">
                        {course.completedLessons}/{course.totalLessons} aulas
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{course.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                      <span>{course.estimatedTime}</span>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Continuar Estudando
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="study">
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Sessão de Estudo Personalizada
                  </CardTitle>
                  <p className="text-gray-600">Baseada no seu perfil de aprendizagem e objetivos</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {todaysSessions.map((session) => (
                      <Card key={session.id} className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                              {getTypeIcon(session.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{session.title}</h4>
                              <p className="text-sm text-gray-600">{session.duration} minutos</p>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={session.completed}
                          >
                            {session.completed ? "✓ Concluído" : "Iniciar Sessão"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  Adicionar Novo Conteúdo
                </CardTitle>
                <p className="text-gray-600">Transforme qualquer material em uma experiência de aprendizado personalizada</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2 border-dashed border-2">
                    <FileText className="w-8 h-8 text-purple-600" />
                    <span>Upload PDF</span>
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex-col gap-2 border-dashed border-2">
                    <Video className="w-8 h-8 text-purple-600" />
                    <span>Link YouTube</span>
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex-col gap-2 border-dashed border-2">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                    <span>Texto/Artigo</span>
                  </Button>
                  
                  <Button variant="outline" className="h-24 flex-col gap-2 border-dashed border-2">
                    <Upload className="w-8 h-8 text-purple-600" />
                    <span>Imagem/Slide</span>
                  </Button>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Como funciona a IA personalizada:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Analisa seu conteúdo e cria trilha de estudos otimizada</li>
                    <li>• Gera resumos, flashcards, quizzes e áudios automaticamente</li>
                    <li>• Adapta o ritmo baseado no seu perfil de aprendizagem</li>
                    <li>• Inclui modo acessível para TDAH e dislexia</li>
                    <li>• Tracking inteligente de progresso e retenção</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}