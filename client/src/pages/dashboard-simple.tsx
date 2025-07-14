import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  BookOpen, 
  Heart, 
  Users, 
  ArrowRight,
  Star
} from "lucide-react";

export default function DashboardSimple() {
  const userData = {
    name: "Lelão",
    totalBalance: 15420.50,
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
      trend: "+12%"
    },
    {
      title: "Cursos Concluídos",
      value: userData.completedCourses,
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50", 
      trend: "+3 esta semana"
    },
    {
      title: "Clareza de Propósito",
      value: `${userData.purposeClarity}%`,
      icon: Heart,
      color: "text-purple-600 bg-purple-50",
      trend: "+8% este mês"
    },
    {
      title: "Progresso Kids",
      value: `${userData.kidsProgress}%`,
      icon: Users,
      color: "text-pink-600 bg-pink-50",
      trend: "+15% esta semana"
    }
  ];

  const apps = [
    {
      id: "flow",
      title: "Flow",
      subtitle: "Gestão Financeira",
      description: "Controle completo das suas finanças com IA integrada",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      route: "/flow",
      status: "Ativo"
    },
    {
      id: "eduvibe",
      title: "EduVibe",
      subtitle: "Plataforma Educacional",
      description: "Aprendizado personalizado com análise de conteúdo",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-600",
      route: "/eduvibe",
      status: "Ativo"
    },
    {
      id: "essentia",
      title: "Essentia",
      subtitle: "Desenvolvimento Pessoal",
      description: "Jornada de autoconhecimento e propósito",
      icon: Heart,
      color: "from-purple-500 to-violet-600",
      route: "/purpose",
      status: "Ativo"
    },
    {
      id: "kids",
      title: "Flow Kids",
      subtitle: "Educação Financeira",
      description: "Ensino financeiro gamificado para crianças",
      icon: Users,
      color: "from-pink-500 to-rose-600",
      route: "/kids-standalone",
      status: "Ativo"
    }
  ];

  const navigateToApp = (route: string) => {
    window.location.href = route;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Ecossistema Digital
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Bem-vindo, {userData.name}! Seu hub de transformação pessoal e financeira.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 shadow-md">
                <Star className="w-4 h-4 mr-1" />
                Todos os sistemas ativos
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/85 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm font-semibold text-green-600">{stat.trend}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {apps.map((app) => (
              <Card key={app.id} className="cursor-pointer hover:shadow-2xl transition-all duration-500 bg-white border-0 shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${app.color}`}></div>
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${app.color} p-4`}>
                        <app.icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">{app.title}</CardTitle>
                        <p className="text-purple-600 font-semibold">{app.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-2">{app.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <Button 
                    onClick={() => navigateToApp(app.route)}
                    className={`w-full bg-gradient-to-r ${app.color} text-white hover:shadow-lg transition-all`}
                  >
                    Acessar {app.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Status Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-sm text-green-700">Sistema Operacional</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
                  <div className="text-sm text-blue-700">Apps Disponíveis</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-purple-700">Disponibilidade</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600 mb-1">∞</div>
                  <div className="text-sm text-pink-700">Possibilidades</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}