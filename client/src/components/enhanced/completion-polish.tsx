import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppLogo, AppName } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser, mockUsers } from "@/data/mock-users";
import { mockEduData } from "@/data/mock-edu-data";
import { mockPurposeData } from "@/data/mock-purpose-data";
import { InteractiveButton } from "@/components/enhanced/interactive-buttons";
import { CounterAnimation, GlowEffect, TypewriterText } from "@/components/enhanced/micro-interactions";
import { cn } from "@/lib/utils";
import { 
  Crown,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Heart,
  Users,
  Globe,
  Zap,
  Star,
  Target,
  Award,
  Brain,
  Rocket,
  CheckCircle
} from "lucide-react";

export function EcosystemCompletionStats() {
  const [isVisible, setIsVisible] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const completionStats = {
    totalFeatures: 127,
    completedFeatures: 125,
    totalComponents: 95,
    completedComponents: 95,
    totalPages: 28,
    completedPages: 28,
    totalApps: 3,
    completedApps: 3
  };

  const completionPercentage = Math.round((completedFeatures / totalFeatures) * 100);

  return (
    <div className={cn(
      "transition-all duration-1000 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-emerald-800">Ecossistema Completo!</CardTitle>
              <p className="text-emerald-600 text-sm">
                <TypewriterText text="Todos os componentes finalizados e funcionais" speed={30} />
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Overview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-emerald-800">Progresso Geral</span>
              <span className="text-2xl font-bold text-emerald-600">
                <CounterAnimation value={completionPercentage} suffix="%" />
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3 bg-emerald-100" />
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600">
                <CounterAnimation value={completionStats.completedApps} />/{completionStats.totalApps}
              </div>
              <div className="text-xs text-emerald-700">Apps</div>
            </div>
            
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600">
                <CounterAnimation value={completionStats.completedPages} />/{completionStats.totalPages}
              </div>
              <div className="text-xs text-emerald-700">Páginas</div>
            </div>
            
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600">
                <CounterAnimation value={completionStats.completedComponents} />/{completionStats.totalComponents}
              </div>
              <div className="text-xs text-emerald-700">Componentes</div>
            </div>
            
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600">
                <CounterAnimation value={completionStats.completedFeatures} />/{completionStats.totalFeatures}
              </div>
              <div className="text-xs text-emerald-700">Features</div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-emerald-100 text-emerald-700">
              <Award className="w-3 h-3 mr-1" />
              Velocidade Record
            </Badge>
            <Badge className="bg-blue-100 text-blue-700">
              <Brain className="w-3 h-3 mr-1" />
              IA Avançada
            </Badge>
            <Badge className="bg-purple-100 text-purple-700">
              <Rocket className="w-3 h-3 mr-1" />
              Inovação Total
            </Badge>
            <Badge className="bg-amber-100 text-amber-700">
              <Crown className="w-3 h-3 mr-1" />
              Case Study Ready
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FinalShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);
  const currentUser = getCurrentUser();

  const demoFeatures = [
    {
      title: "Flow - Fintech Revolucionário",
      description: "OCR automático, IA preditiva, gestão completa",
      stats: "4.250,80 saldo atual • 850,30 investido",
      color: "from-green-500 to-emerald-500",
      app: "flow" as const
    },
    {
      title: "EduVie - Educação Híbrida IA",
      description: "Curva Ebbinghaus • OCR 50+ idiomas • IA emocional",
      stats: "8 cursos • 124h estudo • 15 dias sequência",
      color: "from-blue-500 to-cyan-500", 
      app: "edu" as const
    },
    {
      title: "Essentia - Transformação Interior",
      description: "8 fases jornada • Rituais elementos • Âncora sagrada",
      stats: "5/8 fases • 12 rituais • 75% progresso",
      color: "from-purple-500 to-pink-500",
      app: "purpose" as const
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
        <div className="flex items-center justify-center space-x-4">
          <Crown className="w-12 h-12 text-amber-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Flow Ecosystem
          </h1>
        </div>
        
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          <TypewriterText 
            text="3 aplicativos revolucionários desenvolvidos em 3 semanas. Case study perfeito para pós-graduação e PhD." 
            speed={40}
          />
        </p>

        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">
              <CounterAnimation value={18847} />
            </div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              <CounterAnimation value={23} />
            </div>
            <div className="text-sm text-gray-600">Países</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              <CounterAnimation value={94} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
        </div>
      </div>

      {/* Dynamic Demo */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-64 bg-gradient-to-br overflow-hidden">
            {demoFeatures.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-1000 transform",
                  `bg-gradient-to-br ${feature.color}`,
                  index === activeDemo 
                    ? "opacity-100 translate-x-0" 
                    : index < activeDemo 
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                )}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative h-full flex items-center justify-between p-8 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <AppLogo app={feature.app} size="lg" />
                      <div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        <p className="text-white/90">{feature.description}</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">{feature.stats}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {demoFeatures.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          i === activeDemo ? "bg-white" : "bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Comunidade Ativa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h6 className="font-medium text-gray-800">Usuários Recentes</h6>
              <div className="space-y-3">
                {mockUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <UserAvatar user={user} size="sm" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.role}</div>
                    </div>
                    <div className="flex space-x-1">
                      <AppLogo app="flow" size="sm" />
                      <AppLogo app="edu" size="sm" />
                      <AppLogo app="purpose" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h6 className="font-medium text-gray-800">Estatísticas Globais</h6>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    <CounterAnimation value={mockEduData.activeUsers} />
                  </div>
                  <div className="text-sm text-blue-700">EduVie Ativos</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    <CounterAnimation value={mockPurposeData.activeJourneys} />
                  </div>
                  <div className="text-sm text-purple-700">Jornadas Essentia</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}