import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Baby, Play, Users, Award, Zap, Brain, Heart } from "lucide-react";

export default function ContaFamilia() {
  const apps = [
    {
      id: "essentia",
      name: "Essentia",
      subtitle: "Desperte Seu Propósito", 
      description: "Jornada de autodescoberta com rituais, respiração e transformação pessoal.",
      features: ["Avatar 3D Evolutivo", "18 Módulos Simbólicos", "Conteúdo Rômulo Nomad", "Rituais Interativos"],
      metrics: "72% clareza | 89 dias | 12 conquistas",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      route: "/purpose",
      status: "Completo",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: "flow-kids", 
      name: "Flow Kids",
      subtitle: "Educação Financeira Infantil",
      description: "Ensino lúdico de finanças para crianças com jogos e atividades interativas.",
      features: ["Gamificação Total", "Realidade Aumentada", "Pais & Filhos", "Certificação Digital"],
      metrics: "Conceito validado | Protótipo Q4 2025",
      icon: Baby,
      color: "from-orange-600 to-yellow-600", 
      route: "/kids",
      status: "Completo",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 text-lg">
            Conta Família - Bem-estar & Educação Infantil
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
            Família Digital
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto px-4">
            Autoconhecimento para pais e educação financeira para crianças
          </p>
          <p className="text-lg text-purple-300 mb-4">
            Ecossistema de bem-estar familiar e desenvolvimento pessoal
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <Heart className="w-8 h-8 text-pink-400" />
                89%
              </div>
              <p className="text-gray-400">Bem-estar Familiar</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <Baby className="w-8 h-8 text-yellow-400" />
                6-14
              </div>
              <p className="text-gray-400">Faixa Etária Kids</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-purple-400" />
                18
              </div>
              <p className="text-gray-400">Módulos Essentia</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Link href="/epic-demo">
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Demo Família Premium
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900 px-8 py-4 text-lg">
                Voltar ao Ecossistema
              </Button>
            </Link>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {apps.map((app) => {
            const IconComponent = app.icon;
            return (
              <Card key={app.id} className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:scale-105">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${app.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${app.color} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-green-500/30 text-green-100">
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{app.name}</h3>
                    <h4 className="text-lg text-purple-300 mb-3">{app.subtitle}</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">{app.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Funcionalidades
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {app.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-white/10 text-gray-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Métricas
                    </h5>
                    <p className="text-purple-300 text-sm">{app.metrics}</p>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Link href={app.route}>
                      <Button className={`bg-gradient-to-r ${app.color} hover:opacity-90 text-white w-full py-3 text-lg font-semibold group-hover:scale-105 transition-transform duration-300`}>
                        <Play className="w-5 h-5 mr-2" />
                        Explorar {app.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/30 to-purple-900/30 border border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Transformação Familiar Completa</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Da jornada de autoconhecimento dos pais à educação financeira das crianças, 
                nosso ecossistema cobre toda a família com tecnologia e alma.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-purple-500/20 text-purple-200 px-4 py-2">
                  Rituais Interativos
                </Badge>
                <Badge className="bg-pink-500/20 text-pink-200 px-4 py-2">
                  Avatar 3D Evolutivo
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-200 px-4 py-2">
                  Gamificação Infantil
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}