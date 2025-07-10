import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  BookOpen, 
  Heart, 
  Users, 
  TrendingUp,
  Target,
  Star,
  Zap,
  BarChart3,
  PiggyBank,
  Brain,
  Compass
} from "lucide-react";

export default function DashboardUnificado() {
  const userData = {
    name: "Lelão",
    totalBalance: 15420.50,
    monthlyGoals: 3,
    completedCourses: 12,
    purposeClarity: 78,
    kidsProgress: 85
  };

  const quickStats = [
    {
      title: "Saldo Total",
      value: `R$ ${userData.totalBalance.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: "text-green-600 bg-green-50",
      trend: "+12%",
      app: "flow"
    },
    {
      title: "Cursos Concluídos",
      value: userData.completedCourses,
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50", 
      trend: "+3 esta semana",
      app: "eduvie"
    },
    {
      title: "Clareza de Propósito",
      value: `${userData.purposeClarity}%`,
      icon: Heart,
      color: "text-purple-600 bg-purple-50",
      trend: "+8% este mês",
      app: "purpose"
    },
    {
      title: "Progresso Kids",
      value: `${userData.kidsProgress}%`,
      icon: Users,
      color: "text-pink-600 bg-pink-50",
      trend: "Nível 5",
      app: "flow-kids"
    }
  ];

  const appCards = [
    {
      id: "flow",
      title: "Flow",
      subtitle: "Controle Financeiro Inteligente",
      description: "OCR avançado, análise preditiva e gamificação para suas finanças",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      url: "/flow",
      status: "Ativo",
      lastAccess: "Hoje"
    },
    {
      id: "eduvibe",
      title: "EduVibe",
      subtitle: "Aprendizado Personalizado",
      description: "Plataforma educacional com IA adaptativa e múltiplos formatos",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-600",
      url: "/eduvibe",
      status: "Ativo",
      lastAccess: "2 horas atrás"
    },
    {
      id: "essentia",
      title: "Essentia",
      subtitle: "Jornada de Autoconhecimento",
      description: "Descubra seu propósito com rituals, respiração e coach de IA",
      icon: Compass,
      color: "from-purple-500 to-violet-600",
      url: "/purpose",
      status: "Ativo", 
      lastAccess: "1 dia atrás"
    },
    {
      id: "kids",
      title: "Flow Kids",
      subtitle: "Educação Financeira Infantil",
      description: "Interface lúdica e gamificada para ensinar crianças sobre dinheiro",
      icon: PiggyBank,
      color: "from-pink-500 to-rose-600",
      url: "/flow-kids",
      status: "Ativo",
      lastAccess: "3 dias atrás"
    }
  ];

  const recentActivity = [
    { app: "Flow", action: "Nova receita registrada", time: "5 min atrás", amount: "R$ 2.450" },
    { app: "EduVibe", action: "Curso 'JavaScript Avançado' concluído", time: "2 horas atrás", points: "150 pts" },
    { app: "Essentia", action: "Ritual de respiração completado", time: "1 dia atrás", progress: "Clareza +5%" },
    { app: "Flow Kids", action: "Sofia alcançou nível 5", time: "3 dias atrás", achievement: "Super Poupador" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <style>
        {`
          /* Dashboard isolation */
          #dashboard-unificado {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 9999 !important;
            background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #eef2ff 100%) !important;
            overflow-y: auto !important;
          }
        `}
      </style>

      <div id="dashboard-unificado" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        {/* Header Principal */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ecossistema Digital Flow
                </h1>
                <p className="text-gray-600 mt-1">Bem-vindo de volta, {userData.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-700 px-3 py-1">
                  <Zap className="w-4 h-4 mr-1" />
                  Todos os sistemas ativos
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Section - Temporarily disabled */}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {appCards.map((app) => (
              <Card key={app.id} className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden relative">
                {/* Background gradient for each app */}
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${app.color}`}></div>
                <div className={`h-2 bg-gradient-to-r ${app.color} relative z-10`}></div>
                <CardHeader className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${app.color} p-4 group-hover:scale-110 transition-transform`}>
                        <app.icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">{app.title}</CardTitle>
                        <p className="text-purple-600 font-semibold">{app.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-2">{app.status}</Badge>
                      <p className="text-xs text-gray-500">{app.lastAccess}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 relative z-10">
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <Button 
                    className={`w-full bg-gradient-to-r ${app.color} text-white hover:shadow-lg transition-all`}
                    onClick={() => window.location.href = app.url}
                  >
                    Acessar {app.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.app} • {activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount && <span className="text-green-600 font-semibold">{activity.amount}</span>}
                      {activity.points && <span className="text-blue-600 font-semibold">{activity.points}</span>}
                      {activity.progress && <span className="text-purple-600 font-semibold">{activity.progress}</span>}
                      {activity.achievement && <span className="text-pink-600 font-semibold">{activity.achievement}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="secondary" className="h-auto p-4 flex-col space-y-2 bg-white/20 hover:bg-white/30 text-white border-0">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-sm">Nova Receita</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex-col space-y-2 bg-white/20 hover:bg-white/30 text-white border-0">
                  <BookOpen className="w-6 h-6" />
                  <span className="text-sm">Continuar Curso</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex-col space-y-2 bg-white/20 hover:bg-white/30 text-white border-0">
                  <Heart className="w-6 h-6" />
                  <span className="text-sm">Ritual Diário</span>
                </Button>
                <Button variant="secondary" className="h-auto p-4 flex-col space-y-2 bg-white/20 hover:bg-white/30 text-white border-0">
                  <Users className="w-6 h-6" />
                  <span className="text-sm">Ver Progresso Kids</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
}