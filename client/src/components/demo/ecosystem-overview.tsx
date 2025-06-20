import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppLogo, AppName } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { mockUsers, getCurrentUser } from "@/data/mock-users";
import { 
  TrendingUp, 
  GraduationCap, 
  Heart,
  Sparkles,
  Crown,
  Zap,
  Target,
  Globe,
  Brain,
  Smartphone
} from "lucide-react";

export default function EcosystemOverview() {
  const currentUser = getCurrentUser();
  
  const apps = [
    {
      id: "flow",
      name: "Flow",
      description: "Fintech revolucionário com OCR e IA",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      features: [
        "OCR de documentos financeiros",
        "Gestão completa de renda/gastos",
        "Sistema de investimentos",
        "Metas financeiras inteligentes",
        "Relatórios avançados"
      ],
      stats: {
        screens: 12,
        components: 35,
        completion: 95
      }
    },
    {
      id: "edu",
      name: "EduVie",
      description: "Plataforma educacional híbrida com IA",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      features: [
        "Curva de Ebbinghaus científica",
        "OCR multilíngue (50+ idiomas)",
        "IA que lê emoções",
        "5 faixas etárias (3-60+ anos)",
        "Realidade Aumentada educacional"
      ],
      stats: {
        screens: 8,
        components: 28,
        completion: 90
      }
    },
    {
      id: "purpose",
      name: "Essentia",
      description: "Jornada de autoconhecimento simbólica",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
      features: [
        "8 fases de transformação",
        "Rituais dos 4 elementos",
        "Portais de inspiração",
        "Respiração consciente",
        "Âncora sagrada personalizada"
      ],
      stats: {
        screens: 8,
        components: 32,
        completion: 100
      }
    }
  ];

  const totalStats = {
    apps: apps.length,
    screens: apps.reduce((sum, app) => sum + app.stats.screens, 0),
    components: apps.reduce((sum, app) => sum + app.stats.components, 0),
    avgCompletion: Math.round(apps.reduce((sum, app) => sum + app.stats.completion, 0) / apps.length)
  };

  const differentials = [
    {
      title: "OCR Multilíngue Avançado",
      description: "50+ idiomas, 94% precisão, único no Brasil",
      icon: Globe,
      color: "text-green-600"
    },
    {
      title: "IA Emocional Adaptativa",
      description: "Análise facial real-time, ajuste automático",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "Ciência Cognitiva Aplicada",
      description: "Curva de Ebbinghaus, retenção 95%",
      icon: Zap,
      color: "text-purple-600"
    },
    {
      title: "Transformação Simbólica",
      description: "Jornada única de autoconhecimento",
      icon: Sparkles,
      color: "text-pink-600"
    }
  ];

  const techStack = [
    { category: "Frontend", tech: "React + TypeScript + Tailwind" },
    { category: "Backend", tech: "Node.js + Express + PostgreSQL" },
    { category: "Mobile", tech: "React Native / Flutter Ready" },
    { category: "IA", tech: "Anthropic + Google Vision + TensorFlow" },
    { category: "Deploy", tech: "Replit Deployments" }
  ];

  return (
    <div className="space-y-8">
      {/* Header do Ecossistema */}
      <Card className="border-l-4 border-l-gold-500 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="w-8 h-8 text-amber-600" />
              <div>
                <CardTitle className="text-3xl text-amber-800">
                  Flow Ecosystem
                </CardTitle>
                <p className="text-amber-700 text-lg">
                  3 aplicativos revolucionários em 1 ecossistema completo
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {mockUsers.slice(0, 3).map((user) => (
                  <UserAvatar key={user.id} user={user} size="md" className="border-2 border-white" />
                ))}
              </div>
              <Badge className="bg-amber-100 text-amber-800 text-lg px-4 py-2">
                +{mockUsers.length} usuários ativos
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-amber-600">{totalStats.apps}</div>
              <div className="text-amber-700">Aplicativos</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-amber-600">{totalStats.screens}</div>
              <div className="text-amber-700">Telas</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-amber-600">{totalStats.components}</div>
              <div className="text-amber-700">Componentes</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-3xl font-bold text-amber-600">{totalStats.avgCompletion}%</div>
              <div className="text-amber-700">Completo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Apps do Ecossistema */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {apps.map((app) => {
          const AppIcon = app.icon;
          return (
            <Card key={app.id} className={`${app.bgColor} border-l-4`} style={{ borderLeftColor: `var(--${app.color.split('-')[1]}-500)` }}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${app.color} flex items-center justify-center`}>
                    <AppIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-xl ${app.textColor}`}>
                      {app.name}
                    </CardTitle>
                    <p className={`text-sm ${app.textColor} opacity-75`}>
                      {app.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progresso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={app.textColor}>Desenvolvimento</span>
                      <span className={app.textColor}>{app.stats.completion}%</span>
                    </div>
                    <Progress value={app.stats.completion} className="h-2" />
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h6 className={`font-medium ${app.textColor}`}>Principais recursos:</h6>
                    <ul className="space-y-1">
                      {app.features.map((feature, i) => (
                        <li key={i} className={`text-xs ${app.textColor} opacity-75`}>
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="text-center p-2 bg-white/50 rounded">
                      <div className={`text-lg font-bold ${app.textColor}`}>{app.stats.screens}</div>
                      <div className={`text-xs ${app.textColor} opacity-75`}>Telas</div>
                    </div>
                    <div className="text-center p-2 bg-white/50 rounded">
                      <div className={`text-lg font-bold ${app.textColor}`}>{app.stats.components}</div>
                      <div className={`text-xs ${app.textColor} opacity-75`}>Componentes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Diferenciais Competitivos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-6 h-6 mr-2 text-indigo-600" />
            Diferenciais Competitivos
          </CardTitle>
          <p className="text-gray-600">
            Recursos únicos que nos posicionam à frente da concorrência
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentials.map((diff, i) => {
              const DiffIcon = diff.icon;
              return (
                <div key={i} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <DiffIcon className={`w-8 h-8 ${diff.color} flex-shrink-0 mt-1`} />
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">{diff.title}</h5>
                    <p className="text-sm text-gray-600">{diff.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stack Tecnológico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-6 h-6 mr-2 text-purple-600" />
            Stack Tecnológico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {techStack.map((stack, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg text-center">
                <h6 className="font-medium text-gray-800 mb-2">{stack.category}</h6>
                <p className="text-sm text-gray-600">{stack.tech}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline de Desenvolvimento */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Timeline de 3 Semanas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/50 rounded border border-green-200">
                <h6 className="font-bold text-green-800 mb-2">Semana 1</h6>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ Conceito e arquitetura</li>
                  <li>✅ Flow MVP funcional</li>
                  <li>✅ OCR integrado</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white/50 rounded border border-blue-200">
                <h6 className="font-bold text-blue-800 mb-2">Semana 2</h6>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ EDU com IA avançada</li>
                  <li>✅ Purpose jornada completa</li>
                  <li>✅ Integração entre apps</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white/50 rounded border border-purple-200">
                <h6 className="font-bold text-purple-800 mb-2">Semana 3</h6>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>✅ Briefings técnicos</li>
                  <li>✅ Documentação completa</li>
                  <li>✅ Pronto para investimento</li>
                </ul>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg">
              <h5 className="text-xl font-bold text-amber-800 mb-2">
                🏆 Resultado: Ecossistema Completo em Tempo Record
              </h5>
              <p className="text-amber-700">
                3 aplicativos revolucionários, stack profissional, 
                diferenciais únicos - tudo pronto para apresentação ao investidor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">
            Pronto para Mudar o Mundo
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Ecossistema completo aguardando investimento para expansão global
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => window.location.href = '/dashboard'}
            >
              Ver Demonstração Ao Vivo
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 transition-all duration-200"
              onClick={() => window.open('/pitch-deck.pdf', '_blank')}
            >
              Baixar Pitch Deck
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}