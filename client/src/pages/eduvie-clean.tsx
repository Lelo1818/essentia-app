import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  Clock, 
  Play, 
  Upload, 
  FileText, 
  Headphones, 
  Video, 
  Zap,
  Plus,
  Star,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  Lightbulb,
  Sparkles
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  estimatedTime: string;
  instructor: string;
  rating: number;
  enrolled: number;
}

interface StudySession {
  id: number;
  courseId: number;
  title: string;
  type: 'video' | 'audio' | 'text' | 'quiz' | 'flashcard' | 'interactive';
  duration: number;
  completed: boolean;
  score?: number;
  aiGenerated: boolean;
}

interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  studyStreak: number;
  totalStudyTime: number;
  avgScore: number;
  monthlyGoal: number;
  currentMonth: number;
}

export default function EduVieClean() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [todaysSessions, setTodaysSessions] = useState<StudySession[]>([]);
  const [stats, setStats] = useState<LearningStats>({
    totalCourses: 0,
    completedCourses: 0,
    studyStreak: 0,
    totalStudyTime: 0,
    avgScore: 0,
    monthlyGoal: 0,
    currentMonth: 0
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    type: "pdf",
    file: null
  });

  useEffect(() => {
    // Carregar dados realistas do sistema educacional
    const mockCourses: Course[] = [
      {
        id: 1,
        title: "JavaScript Moderno e ES6+",
        description: "Domine as funcionalidades mais recentes do JavaScript para desenvolvimento web profissional",
        progress: 68,
        totalLessons: 32,
        completedLessons: 22,
        category: "Programação",
        difficulty: "Avançado",
        estimatedTime: "12 semanas",
        instructor: "Ana Silva",
        rating: 4.9,
        enrolled: 2847
      },
      {
        id: 2,
        title: "Design UX/UI Centrado no Usuário",
        description: "Aprenda a criar experiências digitais que realmente importam para os usuários",
        progress: 45,
        totalLessons: 28,
        completedLessons: 13,
        category: "Design",
        difficulty: "Intermediário",
        estimatedTime: "10 semanas",
        instructor: "Carlos Mendes",
        rating: 4.8,
        enrolled: 1923
      },
      {
        id: 3,
        title: "Gestão Financeira e Investimentos",
        description: "Construa sua independência financeira com estratégias comprovadas",
        progress: 92,
        totalLessons: 18,
        completedLessons: 17,
        category: "Finanças",
        difficulty: "Iniciante",
        estimatedTime: "6 semanas",
        instructor: "Marina Costa",
        rating: 4.9,
        enrolled: 3651
      },
      {
        id: 4,
        title: "Marketing Digital e Growth Hacking",
        description: "Estratégias avançadas para crescimento acelerado de negócios digitais",
        progress: 34,
        totalLessons: 25,
        completedLessons: 8,
        category: "Marketing",
        difficulty: "Avançado",
        estimatedTime: "14 semanas",
        instructor: "Pedro Santos",
        rating: 4.7,
        enrolled: 1534
      },
      {
        id: 5,
        title: "Inglês para Negócios",
        description: "Desenvolva fluência em inglês corporativo e apresentações profissionais",
        progress: 78,
        totalLessons: 24,
        completedLessons: 19,
        category: "Idiomas",
        difficulty: "Intermediário",
        estimatedTime: "16 semanas",
        instructor: "Jennifer Wilson",
        rating: 4.8,
        enrolled: 2198
      }
    ];

    const mockSessions: StudySession[] = [
      {
        id: 1,
        courseId: 1,
        title: "Async/Await e Promises Avançado",
        type: "video",
        duration: 28,
        completed: false,
        aiGenerated: true
      },
      {
        id: 2,
        courseId: 2,
        title: "Princípios de Usabilidade e Acessibilidade",
        type: "interactive",
        duration: 22,
        completed: true,
        score: 94,
        aiGenerated: false
      },
      {
        id: 3,
        courseId: 1,
        title: "Quiz: Funcionalidades ES6+",
        type: "quiz",
        duration: 15,
        completed: false,
        aiGenerated: true
      },
      {
        id: 4,
        courseId: 4,
        title: "Análise de Métricas e KPIs",
        type: "audio",
        duration: 35,
        completed: false,
        aiGenerated: false
      },
      {
        id: 5,
        courseId: 5,
        title: "Apresentações Executivas em Inglês",
        type: "video",
        duration: 42,
        completed: true,
        score: 88,
        aiGenerated: false
      }
    ];

    setCourses(mockCourses);
    setTodaysSessions(mockSessions);
    setStats({
      totalCourses: 18,
      completedCourses: 5,
      studyStreak: 12,
      totalStudyTime: 127,
      avgScore: 89,
      monthlyGoal: 40,
      currentMonth: 32
    });
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-600" />;
      case 'audio': return <Headphones className="w-4 h-4 text-green-600" />;
      case 'text': return <FileText className="w-4 h-4 text-gray-600" />;
      case 'quiz': return <Brain className="w-4 h-4 text-purple-600" />;
      case 'flashcard': return <Zap className="w-4 h-4 text-yellow-600" />;
      case 'interactive': return <Lightbulb className="w-4 h-4 text-orange-600" />;
      default: return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Hide ALL Flow elements when EduVie loads
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide Flow navigation and interfering elements */
      .min-h-screen.bg-gray-50 nav,
      .max-w-7xl.mx-auto,
      .fixed.bottom-0,
      div[class*="mobile-navigation"],
      div[class*="navigation"] {
        display: none !important;
      }
      /* Reset body completely */
      body {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
      }
      /* EduVie full control */
      #eduvie-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 9999 !important;
        background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #f3e8ff 100%) !important;
        overflow-y: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div id="eduvie-container" className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header EduVie próprio */}
      <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduVie Pro
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-600 hidden md:inline">Lelão</span>
          </div>
        </div>
      </div>

      <div className="pt-16 px-4 md:px-6 pb-6">
        {/* Header Principal */}
        <div className="mb-6 md:mb-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                Dashboard de Aprendizado
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Plataforma Inteligente de Aprendizado Personalizado
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs md:text-sm text-gray-500 mb-2">Meta Mensal</p>
              <div className="flex items-center md:justify-end gap-3">
                <Progress value={(stats.currentMonth / stats.monthlyGoal) * 100} className="w-24 md:w-32 h-2 md:h-3" />
                <span className="text-xs md:text-sm font-bold text-gray-800">
                  {stats.currentMonth}/{stats.monthlyGoal}h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8 animate-fade-in">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                <div className="p-2 md:p-3 bg-blue-100 rounded-xl mb-2 md:mb-0">
                  <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Cursos Ativos</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Certificados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
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

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horas Totais</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudyTime}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navegação Principal */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-1 md:p-2 overflow-x-auto border border-gray-200">
            <TabsTrigger value="dashboard" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm">
              <Target className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Meus Cursos</span>
              <span className="sm:hidden">Cursos</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm">
              <Brain className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Estudar Hoje</span>
              <span className="sm:hidden">Estudar</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm lg:hidden">
              <Upload className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Criar Conteúdo</span>
              <span className="sm:hidden">Criar</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm lg:hidden">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            {/* Tabs extras só no desktop */}
            <TabsTrigger value="create" className="hidden lg:flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-3 transition-all duration-200">
              <Upload className="w-4 h-4" />
              Criar Conteúdo
            </TabsTrigger>
            <TabsTrigger value="analytics" className="hidden lg:flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-3 transition-all duration-200">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Principal */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Plano de Estudos de Hoje */}
              <div className="lg:col-span-2">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Plano de Estudos - Hoje
                    </CardTitle>
                    <p className="text-gray-600">Sessões personalizadas pela IA baseadas no seu perfil</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todaysSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          {getTypeIcon(session.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{session.title}</h4>
                            {session.aiGenerated && (
                              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                <Sparkles className="w-3 h-3 mr-1" />
                                IA
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.duration} min
                            </span>
                            <span>Curso #{session.courseId}</span>
                          </div>
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
                            className={session.completed ? "border-green-300 text-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"}
                          >
                            {session.completed ? (
                              <><CheckCircle className="w-4 h-4 mr-1" /> Concluído</>
                            ) : (
                              <><Play className="w-4 h-4 mr-1" /> Iniciar</>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Progresso e Conquistas */}
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-gold-600" />
                      Progresso Semanal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courses.slice(0, 3).map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-900 text-sm">{course.title}</p>
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-gray-500">
                          {course.completedLessons}/{course.totalLessons} aulas • {course.estimatedTime}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6" />
                      <h3 className="font-bold">IA Personalizada</h3>
                    </div>
                    <p className="text-blue-100 text-sm mb-4">
                      Nossa IA adaptou seu plano de estudos baseado na sua performance em JavaScript.
                    </p>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      Ver Recomendações
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Meus Cursos */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`${getDifficultyColor(course.difficulty)} border text-xs`}>
                        {course.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(course.rating)}
                        <span className="text-xs text-gray-600 ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{course.enrolled.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-gray-600">Instrutor: <span className="font-medium text-gray-900">{course.instructor}</span></p>
                      <p className="text-gray-600">{course.completedLessons}/{course.totalLessons} aulas • {course.category}</p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress > 0 ? 'Continuar' : 'Começar'} Curso
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Estudar Hoje */}
          <TabsContent value="study">
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Sessão de Estudo Personalizada</h2>
                      <p className="text-indigo-100">Baseada no seu perfil de aprendizagem e objetivos semanais</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{todaysSessions.filter(s => !s.completed).length}</div>
                      <div className="text-indigo-100">sessões restantes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todaysSessions.map((session) => (
                  <Card key={session.id} className={`${session.completed ? 'bg-green-50 border-green-200' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 ${!session.completed && 'hover:scale-105'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl shadow-sm ${session.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                          {getTypeIcon(session.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{session.title}</h4>
                          <p className="text-sm text-gray-600">{session.duration} minutos</p>
                        </div>
                        {session.aiGenerated && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            IA
                          </Badge>
                        )}
                      </div>
                      
                      {session.completed && session.score && (
                        <div className="mb-4 p-3 bg-green-100 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-700">Performance</span>
                            <span className="font-bold text-green-800">{session.score}%</span>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        className={`w-full ${session.completed 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                        }`}
                        disabled={session.completed}
                      >
                        {session.completed ? (
                          <><CheckCircle className="w-4 h-4 mr-2" /> Concluído</>
                        ) : (
                          <><Play className="w-4 h-4 mr-2" /> Iniciar Sessão</>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Criar Conteúdo */}
          <TabsContent value="create">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Criador de Conteúdo Inteligente
                  </CardTitle>
                  <p className="text-gray-600">
                    Transforme qualquer material em uma experiência de aprendizado personalizada com IA
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-32 flex-col gap-3 border-dashed border-2 hover:border-blue-400 hover:bg-blue-50">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <span className="font-medium">Upload PDF</span>
                      <span className="text-xs text-gray-500">Documentos, livros, artigos</span>
                    </Button>
                    
                    <Button variant="outline" className="h-32 flex-col gap-3 border-dashed border-2 hover:border-red-400 hover:bg-red-50">
                      <Video className="w-8 h-8 text-red-600" />
                      <span className="font-medium">Link YouTube</span>
                      <span className="text-xs text-gray-500">Vídeos educacionais</span>
                    </Button>
                    
                    <Button variant="outline" className="h-32 flex-col gap-3 border-dashed border-2 hover:border-green-400 hover:bg-green-50">
                      <BookOpen className="w-8 h-8 text-green-600" />
                      <span className="font-medium">Texto/Artigo</span>
                      <span className="text-xs text-gray-500">Cole ou digite conteúdo</span>
                    </Button>
                    
                    <Button variant="outline" className="h-32 flex-col gap-3 border-dashed border-2 hover:border-purple-400 hover:bg-purple-50">
                      <Upload className="w-8 h-8 text-purple-600" />
                      <span className="font-medium">Imagem/Slide</span>
                      <span className="text-xs text-gray-500">Fotos de anotações, slides</span>
                    </Button>
                  </div>

                  {/* Manual Content Creation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Criar Conteúdo Manualmente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título do Curso
                        </label>
                        <Input 
                          placeholder="Ex: Fundamentos de React"
                          value={newContent.title}
                          onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Programação</option>
                          <option>Design</option>
                          <option>Marketing</option>
                          <option>Finanças</option>
                          <option>Idiomas</option>
                          <option>Outros</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <Textarea 
                        placeholder="Descreva o que será abordado no curso..."
                        rows={3}
                        value={newContent.description}
                        onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar com IA
                    </Button>
                  </div>

                  {/* AI Features */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Como a IA Personaliza Seu Conteúdo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Analisa seu estilo de aprendizagem
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Cria trilha otimizada por objetivos
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Gera resumos, quizzes e flashcards
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Adapta dificuldade em tempo real
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Suporte para TDAH/Dislexia
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Tracking inteligente de progresso
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Performance de Aprendizagem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Gráfico de Performance (Chart.js)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Histórico de Atividades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Completou: JavaScript ES6+ - Módulo {i}</p>
                            <p className="text-sm text-gray-600">Há {i} horas • Score: {90 + i}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Estatísticas Detalhadas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tempo médio/sessão</span>
                      <span className="font-bold">28 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Melhor performance</span>
                      <span className="font-bold">96%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Área forte</span>
                      <span className="font-bold">Programação</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Próxima meta</span>
                      <span className="font-bold">40h/mês</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Trophy className="w-6 h-6" />
                      <h3 className="font-bold">Conquista Desbloqueada!</h3>
                    </div>
                    <p className="text-green-100 text-sm mb-4">
                      Estudante Consistente - 12 dias seguidos de estudo
                    </p>
                    <Badge className="bg-white/20 text-white">
                      +50 XP
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}