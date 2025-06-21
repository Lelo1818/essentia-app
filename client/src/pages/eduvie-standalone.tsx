import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target,
  Brain,
  Upload,
  Play,
  CheckCircle,
  Star,
  Trophy,
  Sparkles,
  Plus,
  FileText,
  Image,
  Video,
  BarChart3,
  Users,
  Lightbulb
} from "lucide-react";

export default function EduVieStandalone() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const stats = {
    totalCourses: 18,
    certificates: 5,
    currentStreak: 12,
    totalHours: 127,
    performance: 89,
    currentMonth: 32,
    monthlyGoal: 40
  };

  const courses = [
    {
      id: 1,
      title: "JavaScript Moderno e ES6+",
      description: "Domine as funcionalidades mais recentes do JavaScript",
      instructor: "Carlos Silva",
      rating: 4.8,
      enrolled: 2340,
      progress: 68,
      difficulty: "Intermediário",
      completedLessons: 8,
      totalLessons: 12,
      estimatedTime: "2h restantes"
    },
    {
      id: 2,
      title: "Design UX/UI Centrado no Usuário",
      description: "Crie interfaces incríveis e funcionais",
      instructor: "Ana Costa",
      rating: 4.9,
      enrolled: 1890,
      progress: 45,
      difficulty: "Iniciante",
      completedLessons: 5,
      totalLessons: 10,
      estimatedTime: "3h restantes"
    },
    {
      id: 3,
      title: "Gestão Financeira e Investimentos",
      description: "Aprenda a gerenciar suas finanças como um profissional",
      instructor: "Roberto Martins",
      rating: 4.7,
      enrolled: 3120,
      progress: 92,
      difficulty: "Avançado",
      completedLessons: 11,
      totalLessons: 12,
      estimatedTime: "30min restantes"
    },
    {
      id: 4,
      title: "Programação Python para Data Science",
      description: "Análise de dados e machine learning com Python",
      instructor: "Dra. Fernanda Lima",
      rating: 4.9,
      enrolled: 2780,
      progress: 23,
      difficulty: "Avançado",
      completedLessons: 3,
      totalLessons: 15,
      estimatedTime: "8h restantes"
    },
    {
      id: 5,
      title: "Apresentações Executivas em Inglês",
      description: "Comunique-se com confiança em ambiente corporativo",
      instructor: "Michael Johnson",
      rating: 4.6,
      enrolled: 1560,
      progress: 78,
      difficulty: "Intermediário",
      completedLessons: 7,
      totalLessons: 9,
      estimatedTime: "1.5h restantes"
    }
  ];

  const todaysSessions = [
    {
      id: 1,
      title: "Quiz: Funcionalidades ES6+",
      type: "quiz",
      duration: 15,
      courseId: 1,
      completed: false,
      aiGenerated: true
    },
    {
      id: 2,
      title: "Async/Await vs Promises Avançado",
      type: "video",
      duration: 28,
      courseId: 1,
      completed: true,
      score: 94,
      aiGenerated: false
    },
    {
      id: 3,
      title: "Princípios de Usabilidade e Acessibilidade",
      type: "reading",
      duration: 22,
      courseId: 2,
      completed: true,
      score: 88,
      aiGenerated: false
    },
    {
      id: 4,
      title: "Análise de Métricas e KPIs",
      type: "interactive",
      duration: 35,
      courseId: 4,
      completed: false,
      aiGenerated: true
    }
  ];

  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    type: "video",
    category: ""
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz": return <Trophy className="w-5 h-5 text-yellow-600" />;
      case "video": return <Play className="w-5 h-5 text-blue-600" />;
      case "reading": return <BookOpen className="w-5 h-5 text-green-600" />;
      case "interactive": return <Lightbulb className="w-5 h-5 text-purple-600" />;
      default: return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EduVie Pro - Plataforma de Aprendizado</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </head>
      <body className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduVie Pro
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span className="text-sm text-gray-600 hidden md:inline">Lelão</span>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 py-6">
          {/* Header Principal */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                  Dashboard de Aprendizado
                </h2>
                <p className="text-sm md:text-lg text-gray-600 mt-2">
                  Plataforma Inteligente de Aprendizado Personalizado
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs md:text-sm text-gray-500 mb-2">Meta Mensal</p>
                <div className="flex items-center md:justify-end gap-3">
                  <div className="w-24 md:w-32 h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.currentMonth / stats.monthlyGoal) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-gray-800">
                    {stats.currentMonth}/{stats.monthlyGoal}h
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
              <div className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                  <div className="p-2 md:p-3 bg-blue-100 rounded-xl mb-2 md:mb-0">
                    <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Cursos Ativos</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
              <div className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                  <div className="p-2 md:p-3 bg-green-100 rounded-xl mb-2 md:mb-0">
                    <Award className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Certificados</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.certificates}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
              <div className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                  <div className="p-2 md:p-3 bg-orange-100 rounded-xl mb-2 md:mb-0">
                    <Calendar className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Sequência Atual</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.currentStreak} dias</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
              <div className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                  <div className="p-2 md:p-3 bg-purple-100 rounded-xl mb-2 md:mb-0">
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Horas Totais</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
              <div className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                  <div className="p-2 md:p-3 bg-indigo-100 rounded-xl mb-2 md:mb-0">
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Performance</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.performance}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação Principal */}
          <div className="space-y-8">
            <div className="grid w-full grid-cols-3 md:grid-cols-5 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-1 md:p-2 border border-gray-200">
              <button 
                className={`flex items-center justify-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm ${
                  activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <Target className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Home</span>
              </button>
              
              <button 
                className={`flex items-center justify-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm ${
                  activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('courses')}
              >
                <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Meus Cursos</span>
                <span className="sm:hidden">Cursos</span>
              </button>
              
              <button 
                className={`flex items-center justify-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm ${
                  activeTab === 'study' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('study')}
              >
                <Brain className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Estudar Hoje</span>
                <span className="sm:hidden">Estudar</span>
              </button>
              
              <button 
                className={`hidden lg:flex items-center justify-center gap-2 rounded-lg px-4 py-3 transition-all duration-200 ${
                  activeTab === 'create' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('create')}
              >
                <Upload className="w-4 h-4" />
                Criar Conteúdo
              </button>
              
              <button 
                className={`hidden lg:flex items-center justify-center gap-2 rounded-lg px-4 py-3 transition-all duration-200 ${
                  activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                <TrendingUp className="w-4 h-4" />
                Analytics
              </button>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Plano de Estudos de Hoje */}
                <div className="lg:col-span-2">
                  <div className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Plano de Estudos - Hoje</h3>
                      </div>
                      <p className="text-gray-600 mb-6">Sessões personalizadas pela IA baseadas no seu perfil</p>
                      
                      <div className="space-y-4">
                        {todaysSessions.map((session) => (
                          <div key={session.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              {getTypeIcon(session.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{session.title}</h4>
                                {session.aiGenerated && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    <Sparkles className="w-3 h-3 inline mr-1" />
                                    IA
                                  </span>
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
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  {session.score}%
                                </span>
                              )}
                              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                session.completed ? 
                                'border border-green-300 text-green-700 hover:bg-green-50' : 
                                'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}>
                                {session.completed ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 inline mr-1" /> 
                                    Concluído
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 inline mr-1" /> 
                                    Iniciar
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progresso Lateral */}
                <div className="space-y-6">
                  <div className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-semibold">Progresso Semanal</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {courses.slice(0, 3).map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-gray-900 text-sm">{course.title}</p>
                              <span className="text-sm text-gray-600">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500">
                              {course.completedLessons}/{course.totalLessons} aulas • {course.estimatedTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="w-6 h-6" />
                        <h3 className="font-bold">IA Personalizada</h3>
                      </div>
                      <p className="text-blue-100 text-sm mb-4">
                        Nossa IA adaptou seu plano de estudos baseado na sua performance em JavaScript.
                      </p>
                      <button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                        Ver Recomendações
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`${getDifficultyColor(course.difficulty)} border text-xs px-2 py-1 rounded`}>
                          {course.difficulty}
                        </span>
                        <div className="flex items-center gap-1">
                          {renderStars(course.rating)}
                          <span className="text-xs text-gray-600 ml-1">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold leading-tight mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progresso</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Por {course.instructor}</span>
                          <span>{course.enrolled.toLocaleString()} alunos</span>
                        </div>
                        
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                          <Play className="w-4 h-4" />
                          {course.progress > 0 ? 'Continuar' : 'Começar'} Curso
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Study Tab */}
            {activeTab === 'study' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Sessão de Estudo Personalizada</h2>
                        <p className="text-indigo-100">Baseada no seu perfil de aprendizagem e objetivos semanais</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{todaysSessions.filter(s => !s.completed).length}</div>
                        <p className="text-indigo-200 text-sm">atividades pendentes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {todaysSessions.map((session) => (
                    <div key={session.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          {getTypeIcon(session.type)}
                          <div>
                            <h3 className="font-semibold">{session.title}</h3>
                            <p className="text-sm text-gray-600">Curso #{session.courseId} • {session.duration} min</p>
                          </div>
                        </div>
                        
                        {session.aiGenerated && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-800 font-medium">Personalizado por IA</span>
                            </div>
                            <p className="text-xs text-blue-700 mt-1">
                              Adaptado ao seu ritmo de aprendizagem
                            </p>
                          </div>
                        )}
                        
                        <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                          session.completed ? 
                          'bg-green-100 text-green-800 border border-green-300' : 
                          'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}>
                          {session.completed ? (
                            <>
                              <CheckCircle className="w-4 h-4 inline mr-2" />
                              Concluído ({session.score}%)
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 inline mr-2" />
                              Iniciar Sessão
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Tab */}
            {activeTab === 'create' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-semibold">Criador de Conteúdo Inteligente</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Transforme qualquer material em uma experiência de aprendizado personalizada com IA
                    </p>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <Video className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900">Upload de Vídeo</h4>
                          <p className="text-sm text-gray-600 mt-1">MP4, AVI, MOV até 500MB</p>
                        </button>
                        
                        <button className="p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors">
                          <FileText className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900">Documento</h4>
                          <p className="text-sm text-gray-600 mt-1">PDF, DOC, TXT até 50MB</p>
                        </button>
                        
                        <button className="p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors">
                          <Image className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900">Imagens</h4>
                          <p className="text-sm text-gray-600 mt-1">JPG, PNG, SVG até 10MB</p>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título do Conteúdo
                          </label>
                          <input 
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: Introdução ao React Hooks"
                            value={newContent.title}
                            onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoria
                          </label>
                          <select 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={newContent.category}
                            onChange={(e) => setNewContent({...newContent, category: e.target.value})}
                          >
                            <option value="">Selecione uma categoria</option>
                            <option>Tecnologia</option>
                            <option>Negócios</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Idiomas</option>
                            <option>Outros</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrição
                        </label>
                        <textarea 
                          placeholder="Descreva o que será abordado no curso..."
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={newContent.description}
                          onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                        />
                      </div>
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <Plus className="w-4 h-4 inline mr-2" />
                        Criar com IA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Performance de Aprendizagem</h3>
                      </div>
                      <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Gráfico de Performance (Chart.js)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Estatísticas Detalhadas</h3>
                      <div className="space-y-4">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}