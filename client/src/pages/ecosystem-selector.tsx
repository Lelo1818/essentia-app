import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, GraduationCap, TrendingUp, Baby } from "lucide-react";

export default function EcosystemSelector() {
  const apps = [
    {
      id: "essentia",
      name: "Essentia",
      subtitle: "Desperte Seu Propósito",
      description: "Jornada de autodescoberta com rituais, respiração e transformação pessoal.",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      route: "/purpose",
      status: "Completo"
    },
    {
      id: "eduvie",
      name: "EduVie",
      subtitle: "Educação Personalizada",
      description: "Aprendizado adaptativo com IA, trilhas personalizadas e gamificação.",
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-600",
      route: "/edu",
      status: "Completo"
    },
    {
      id: "flow",
      name: "Flow",
      subtitle: "Gestão Financeira",
      description: "Controle financeiro inteligente com análise preditiva e metas automatizadas.",
      icon: TrendingUp,
      color: "from-green-600 to-emerald-600",
      route: "/flow",
      status: "Em desenvolvimento"
    },
    {
      id: "flow-kids",
      name: "Flow Kids",
      subtitle: "Educação Financeira Infantil",
      description: "Ensino lúdico de finanças para crianças com jogos e atividades interativas.",
      icon: Baby,
      color: "from-orange-600 to-yellow-600",
      route: "/flow-kids",
      status: "Conceito"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Ecossistema Digital
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Quatro aplicativos revolucionários para transformar vida, educação e finanças
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" className="text-purple-400 border-purple-400">
              <Link href="/investor-demo">Demo Investidor</Link>
            </Button>
            <Button variant="outline" className="text-purple-400 border-purple-400">
              Acesso: danielallegri2025
            </Button>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {apps.map((app) => {
            const IconComponent = app.icon;
            return (
              <Card key={app.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${app.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{app.name}</h3>
                    <h4 className="text-lg text-purple-300 mb-3">{app.subtitle}</h4>
                    <p className="text-gray-300 leading-relaxed">{app.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'Completo' ? 'bg-green-500/20 text-green-300' :
                      app.status === 'Em desenvolvimento' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {app.status}
                    </span>
                    
                    {app.status === 'Completo' ? (
                      <Link href={app.route}>
                        <Button className={`bg-gradient-to-r ${app.color} hover:opacity-90 text-white`}>
                          Acessar App
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="bg-gray-600 text-gray-400">
                        Em Breve
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Desenvolvido para a apresentação com Daniel Allegri
          </p>
          <p className="text-sm text-gray-500">
            Ecossistema completo de aplicativos revolucionários | Junho 2025
          </p>
        </div>
      </div>
    </div>
  );
}