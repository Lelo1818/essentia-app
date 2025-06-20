import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PerformanceMonitor } from "@/components/enhanced/performance-monitor";
import { NotificationProvider } from "@/components/enhanced/notification-system";
import { AccessibilityManager } from "@/components/enhanced/accessibility-manager";
import { ArrowRight } from "lucide-react";
import { AuthGuard } from "@/components/auth-guard";
import flowLogo from "@assets/image_1750383244339.png";
import essentiaLogo from "@assets/image_1750383794230.png";
import eduvibeLogo from "@assets/image_1750383852695.png";
import { ModernStats } from "@/components/ui/modern-stats";
import FlowApp from "./App";
import PurposeApp from "./App-purpose";
import EduApp from "./App-edu";
import PresentationApp from "./App-presentation";

type AppType = "selector" | "flow" | "purpose" | "edu" | "presentation";

function AppSelector({ onSelectApp }: { onSelectApp: (app: AppType) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">Sistema Online • Pronto para Deploy</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
            Ecossistema Digital
            <br />
            <span className="text-4xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              de Próxima Geração
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Três aplicações revolucionárias que combinam <span className="text-blue-400 font-semibold">inteligência artificial</span>, 
            <span className="text-purple-400 font-semibold"> gamificação avançada</span> e 
            <span className="text-pink-400 font-semibold"> design de nível mundial</span> para transformar completamente sua experiência digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flow App */}
          <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br from-slate-800/50 to-blue-900/50 border border-blue-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-blue-900/90 rounded-lg"></div>
            
            <CardHeader className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                <img src={flowLogo} alt="Flow Logo" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Flow
              </CardTitle>
              <p className="text-blue-300 font-semibold text-lg">Seu Caminho para a Prosperidade</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Motor de IA que analisa padrões, prediz gastos e otimiza investimentos. 
                <strong className="text-cyan-400"> OCR inteligente</strong> digitaliza notas fiscais instantaneamente. 
                <strong className="text-purple-400">Sistema de conquistas</strong> torna finanças um jogo viciante.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-300 bg-blue-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>Análise Preditiva:</strong> IA prevê seus gastos futuros
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-cyan-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>OCR Avançado:</strong> Fotografe e digitalize notas instantaneamente
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-purple-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>Gamificação Total:</strong> Níveis, conquistas e recompensas
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => onSelectApp("flow")}>
                Abrir Flow
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Purpose App */}
          <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-purple-900/90 rounded-lg"></div>
            
            <CardHeader className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                <img src={essentiaLogo} alt="Essentia Logo" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Essentia
              </CardTitle>
              <p className="text-purple-300 font-semibold text-lg">Desperte seu Propósito</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                <strong className="text-purple-400">Jornada transformadora</strong> em 4 dimensões sagradas. 
                <strong className="text-pink-400">IA empática</strong> como guia espiritual pessoal. 
                <strong className="text-violet-400">Mapa do propósito</strong> revela sua missão de vida única.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-300 bg-purple-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>4 Estágios Sagrados:</strong> Descoberta → Reflexão → Integração → Transcendência
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-pink-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>Guia IA Empático:</strong> Conversas profundas sobre propósito e valores
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-indigo-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>Mapa do Propósito:</strong> Visualização interativa da sua jornada
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => onSelectApp("purpose")}>
                Abrir Essentia
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          {/* EDU App */}
          <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br from-slate-800/50 to-green-900/50 border border-green-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/50 via-blue-500/50 to-green-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-green-900/90 rounded-lg"></div>
            
            <CardHeader className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-500 via-blue-500 to-teal-600 p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                <img src={eduvibeLogo} alt="EduVibe Logo" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                EduVibe
              </CardTitle>
              <p className="text-green-300 font-semibold text-lg">Onde aprender não é tarefa, é experiência</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                <strong className="text-green-400">IA neuroadaptativa</strong> que mapeia como você aprende melhor. 
                <strong className="text-blue-400">Suporte especializado</strong> para ADHD/Dislexia com técnicas comprovadas. 
                <strong className="text-teal-400">Gamificação educacional</strong> viciante e recompensadora.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-300 bg-green-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>IA Neuroadaptativa:</strong> Adapta conteúdo ao seu perfil cognitivo único
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-blue-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>Inclusão Total:</strong> Ferramentas especializadas ADHD/Dislexia
                </div>
                <div className="flex items-center text-sm text-gray-300 bg-teal-500/10 rounded-lg p-2">
                  <span className="w-3 h-3 bg-gradient-to-r from-teal-400 to-green-500 rounded-full mr-3 animate-pulse"></span>
                  <strong>Trilhas Épicas:</strong> Aprendizado como RPG com conquistas reais
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => onSelectApp("edu")}>
                Abrir EduVibe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 space-y-12">
          <ModernStats />
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-slate-800/80 to-gray-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                Pitch Deck Interativo
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Apresentação completa com métricas, roadmap, análise de mercado e proposta de investimento
              </p>
              <Button 
                onClick={() => onSelectApp("presentation")}
                className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-500 hover:to-red-500 text-white px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              >
                Ver Pitch Deck Completo
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Funcional e Responsivo</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">3</div>
              <div className="text-gray-300">Apps Enterprise-Ready</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-300">Potencial de Escala</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContainer() {
  const [currentApp, setCurrentApp] = useState<AppType>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const appParam = urlParams.get('app');
    if (appParam && ['flow', 'purpose', 'edu', 'presentation'].includes(appParam)) {
      return appParam as AppType;
    }
    return "selector";
  });

  // Update URL when app changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentApp === "selector") {
      url.searchParams.delete('app');
    } else {
      url.searchParams.set('app', currentApp);
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentApp]);

  if (currentApp === "flow") {
    return (
      <NotificationProvider>
        <AuthGuard>
          <div>
            <div className="absolute top-4 right-4 z-50">
              <Button 
                onClick={() => setCurrentApp("selector")}
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm shadow-lg"
              >
                ← Voltar aos Apps
              </Button>
            </div>
            <FlowApp />
            <PerformanceMonitor />
          </div>
        </AuthGuard>
      </NotificationProvider>
    );
  }

  if (currentApp === "purpose") {
    return (
      <NotificationProvider>
        <AuthGuard>
          <div>
            <div className="absolute top-4 right-4 z-50">
              <Button 
                onClick={() => setCurrentApp("selector")}
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm shadow-lg"
              >
                ← Voltar aos Apps
              </Button>
            </div>
            <PurposeApp />
            <PerformanceMonitor />
          </div>
        </AuthGuard>
      </NotificationProvider>
    );
  }

  if (currentApp === "edu") {
    return (
      <NotificationProvider>
        <AuthGuard>
          <div>
            <div className="absolute top-4 right-4 z-50">
              <Button 
                onClick={() => setCurrentApp("selector")}
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm shadow-lg"
              >
                ← Voltar aos Apps
              </Button>
            </div>
            <EduApp />
            <PerformanceMonitor />
          </div>
        </AuthGuard>
      </NotificationProvider>
    );
  }

  if (currentApp === "presentation") {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentApp("selector")}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            ← Voltar aos Apps
          </Button>
        </div>
        <PresentationApp />
      </div>
    );
  }

  return (
    <NotificationProvider>
      <AuthGuard>
        <AppSelector onSelectApp={setCurrentApp} />
        <PerformanceMonitor />
        <AccessibilityManager />
      </AuthGuard>
    </NotificationProvider>
  );
}

export default AppContainer;