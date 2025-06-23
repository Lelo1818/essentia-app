import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppLogo, AppName } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser } from "@/data/mock-users";
import { mockEduData } from "@/data/mock-edu-data";
import { mockPurposeData } from "@/data/mock-purpose-data";
import { SwipeableCard } from "@/components/enhanced/gesture-interactions";
import { GlowEffect, CounterAnimation, SparkleEffect } from "@/components/enhanced/micro-interactions";
import { InteractiveButton } from "@/components/enhanced/interactive-buttons";
import { 
  ArrowRight,
  Clock,
  Star,
  Trophy,
  Target,
  Zap
} from "lucide-react";

export default function AppShowcase() {
  const currentUser = getCurrentUser();
  const [sparkleStates, setSparkleStates] = useState([false, false, false]);

  const showcaseData = [
    {
      app: "flow",
      name: "Flow",
      tagline: "Fintech Inteligente",
      description: "Gestão financeira revolucionária com OCR automático e IA preditiva",
      stats: {
        balance: currentUser.stats.flow.balance,
        savings: currentUser.stats.flow.savings,
        investments: currentUser.stats.flow.investments
      },
      features: ["OCR Documentos", "Metas Inteligentes", "Investimentos", "Relatórios IA"],
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      app: "edu",
      name: "EduVie", 
      tagline: "Educação com IA",
      description: "Plataforma híbrida com Curva de Ebbinghaus e reconhecimento emocional",
      stats: {
        courses: currentUser.stats.edu.coursesCompleted,
        hours: currentUser.stats.edu.hoursStudied,
        streak: currentUser.stats.edu.streak
      },
      features: ["OCR 50+ Idiomas", "IA Emocional", "Ebbinghaus", "AR Educacional"],
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      app: "purpose",
      name: "Essentia",
      tagline: "Transformação Interior", 
      description: "Jornada simbólica de autoconhecimento com rituais e práticas profundas",
      stats: {
        progress: mockPurposeData.userJourney.overallProgress,
        rituals: mockPurposeData.userJourney.phasesCompleted,
        insights: 28
      },
      features: ["8 Fases Jornada", "Rituais Elementos", "Portais Inspiração", "Âncora Sagrada"],
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <UserAvatar user={currentUser} size="lg" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Seu Ecossistema {currentUser.name.split(' ')[0]}
            </h2>
            <p className="text-gray-600">
              3 aplicativos integrados transformando sua vida
            </p>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {showcaseData.map((appData, i) => (
          <SwipeableCard
            key={i}
            onSwipeRight={() => window.location.href = `/${appData.app}`}
            onSwipeLeft={() => setSparkleStates(prev => prev.map((state, index) => index === i ? true : state))}
          >
            <GlowEffect glowColor={appData.app === "flow" ? "green" : appData.app === "edu" ? "blue" : "purple"}>
              <SparkleEffect trigger={sparkleStates[i]} className="h-full">
                <Card className={`bg-gradient-to-br ${appData.bgGradient} border-l-4 hover:shadow-xl transition-all h-full`}>
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <AppLogo app={appData.app as "flow" | "edu" | "purpose"} size="xl" />
                    </div>
                    <CardTitle className="text-2xl text-gray-800">
                      <AppName app={appData.app as "flow" | "edu" | "purpose"} />
                    </CardTitle>
                    <Badge className="bg-white/50 text-gray-700 mx-auto">
                      {appData.tagline}
                    </Badge>
                  </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-gray-700 text-center leading-relaxed">
                {appData.description}
              </p>

              {/* Stats Específicas */}
              <div className="grid grid-cols-2 gap-3">
                {appData.app === "flow" && (
                  <>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        R$ <CounterAnimation value={1200} />
                      </div>
                      <div className="text-xs text-gray-600">Saldo</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        R$ <CounterAnimation value={8750} />
                      </div>
                      <div className="text-xs text-gray-600">Investimentos</div>
                    </div>
                  </>
                )}
                
                {appData.app === "edu" && (
                  <>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        <CounterAnimation value={appData.stats.courses} />
                      </div>
                      <div className="text-xs text-gray-600">Cursos</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        <CounterAnimation value={appData.stats.streak} />
                      </div>
                      <div className="text-xs text-gray-600">Dias</div>
                    </div>
                  </>
                )}
                
                {appData.app === "purpose" && (
                  <>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {appData.stats.progress}%
                      </div>
                      <div className="text-xs text-gray-600">Jornada</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {appData.stats.rituals}
                      </div>
                      <div className="text-xs text-gray-600">Rituais</div>
                    </div>
                  </>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h6 className="font-medium text-gray-800 text-sm">Recursos Principais:</h6>
                <div className="flex flex-wrap gap-1">
                  {appData.features.map((feature, j) => (
                    <Badge key={j} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <InteractiveButton
                gradient
                className={`w-full bg-gradient-to-r ${appData.color} text-white`}
                onClick={() => window.location.href = `/${appData.app}`}
                icon={ArrowRight}
              >
                Abrir {appData.name}
              </InteractiveButton>
            </CardContent>
                </Card>
              </SparkleEffect>
            </GlowEffect>
          </SwipeableCard>
        ))}
      </div>

      {/* Ecosystem Benefits */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-center text-indigo-800">
            Benefícios do Ecossistema Integrado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-medium text-gray-800">Sincronização Total</h5>
              <p className="text-sm text-gray-600">
                Dados compartilhados entre apps para experiência unificada
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-medium text-gray-800">IA Cross-Platform</h5>
              <p className="text-sm text-gray-600">
                Inteligência artificial que aprende através dos 3 aplicativos
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-medium text-gray-800">Crescimento Holístico</h5>
              <p className="text-sm text-gray-600">
                Desenvolvimento financeiro, intelectual e espiritual integrado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}