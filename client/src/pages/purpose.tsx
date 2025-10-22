import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AppLogo, AppName } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { getCurrentUser } from "@/data/mock-users";
import { mockPurposeData } from "@/data/mock-purpose-data";
import { trackPageView, trackPortal } from "@/lib/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementsGallery } from "@/components/purpose/achievements-gallery";
import { ACHIEVEMENTS, getNextAchievement } from "@shared/achievements-config";
import type { Achievement } from "@shared/schema";
import LifeWheel from "@/components/purpose/life-wheel";
import InspirationHub from "@/components/purpose/inspiration-hub";
import ActionPlanner from "@/components/purpose/action-planner";
import CommunityConnect from "@/components/purpose/community-connect";
import AICoach from "@/components/purpose/ai-coach";
import JourneyPhases from "@/pages/purpose/journey-phases";
import { TransitionJourney } from "@/components/purpose/transition-journey";
import { AvatarJourney } from "@/components/purpose/avatar-journey";
import { Avatar3DDisplay } from "@/components/purpose/avatar-3d-display";
import ShamanAvatar from "@/components/purpose/shaman-avatar";
import QuickNavButton from "@/components/shared/quick-nav-button";
import { GuidedBreathingComponent } from "@/components/purpose/guided-breathing";
import { DailyRitualsComponent } from "@/components/purpose/daily-rituals";
import { EssentiaWindowComponent, useEssentiaWindows } from "@/components/purpose/essentia-window";
import JourneyContinuity from "@/components/purpose/journey-continuity";
import AdaptiveCompanion from "@/components/purpose/adaptive-companion";
import MagicalInteractions from "@/components/purpose/magical-interactions";
import LivingReactions from "@/components/purpose/living-reactions";
import BiometricSensors from "@/components/purpose/biometric-sensors";
import AITherapist from "@/components/purpose/ai-therapist";
import { VideoPortal } from "@/components/purpose/video-portal";
import { FEMECompass } from "@/components/feme/FEMECompass";
import { MegaOnboarding, useMegaOnboarding } from "@/components/purpose/mega-onboarding";
import { SuggestionsHistory } from "@/components/purpose/suggestions-history";
import { AuditOverlay } from "@/components/purpose/audit-overlay";
import { 
  Compass, 
  Heart, 
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  Brain,
  Star,
  User,
  Trophy as Award,
  Sparkles
} from "lucide-react";

import despertarInteriorVideo from "@assets/Despertar Interior_1760814881524.mp4";

// Componente dinâmico de conquistas
function AchievementsSection() {
  // Buscar conquistas do usuário
  const { data: userAchievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
  });

  // Buscar dados para calcular próximas conquistas
  const { data: femeCheckins = [] } = useQuery<any[]>({
    queryKey: ['/api/feme/checkins'],
  });

  const { data: breathSessions = [] } = useQuery<any[]>({
    queryKey: ['/api/breath/sessions'],
  });

  const { data: userProgress } = useQuery<{ points?: number; dailyStreak?: number }>({
    queryKey: ['/api/progress'],
  });

  // Últimas 4 conquistas desbloqueadas
  const recentAchievements = [...userAchievements]
    .sort((a, b) => new Date(b.earnedAt || 0).getTime() - new Date(a.earnedAt || 0).getTime())
    .slice(0, 4);

  // Calcular próxima conquista
  const nextCheckinAchievement = getNextAchievement('checkin', femeCheckins.length);
  const nextBreathAchievement = getNextAchievement('breath', breathSessions.length);
  const nextPointsAchievement = getNextAchievement('points', userProgress?.points || 0);

  const nextAchievements = [nextCheckinAchievement, nextBreathAchievement, nextPointsAchievement].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">🏆 Conquistas Recentes</h3>
        <AchievementsGallery
          trigger={
            <Button variant="outline" size="sm" data-testid="button-view-all-achievements">
              {isLoading ? 'Carregando...' : `Ver Todas (${userAchievements.length})`}
            </Button>
          }
        />
      </div>

      {/* Últimas conquistas desbloqueadas */}
      {recentAchievements.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentAchievements.map((achievement) => {
            const config = ACHIEVEMENTS[achievement.achievementType || ''];
            const metadata = achievement.metadata as any;
            return (
              <div
                key={achievement.id}
                className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200"
                data-testid={`achievement-badge-${achievement.achievementType}`}
              >
                <div className="text-2xl mb-2">{config?.icon || '🏆'}</div>
                <div className="text-xs font-medium">{achievement.title}</div>
                {metadata?.pointsEarned && (
                  <Badge className="mt-1 bg-green-100 text-green-700 text-xs">
                    +{metadata.pointsEarned}pts
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
          <Award className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">Nenhuma conquista desbloqueada ainda</p>
          <p className="text-xs text-gray-500 mt-1">Complete atividades para desbloquear conquistas!</p>
        </div>
      )}

      {/* CTAs para próximas conquistas */}
      {nextAchievements.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="text-sm font-semibold text-purple-800 mb-2">🎯 Próximas Conquistas</h4>
          <div className="space-y-2">
            {nextAchievements.slice(0, 2).map((achievement) => {
              if (!achievement) return null;
              
              let currentValue = 0;
              let actionText = '';
              
              if (achievement.category === 'checkin') {
                currentValue = femeCheckins.length;
                actionText = 'check-ins FEME';
              } else if (achievement.category === 'breath') {
                currentValue = breathSessions.length;
                actionText = 'sessões de respiração';
              } else if (achievement.category === 'points') {
                currentValue = userProgress?.points || 0;
                actionText = 'pontos';
              }
              
              const remaining = achievement.target - currentValue;
              
              return (
                <div
                  key={achievement.key}
                  className="flex items-center justify-between text-sm"
                  data-testid={`next-achievement-${achievement.key}`}
                >
                  <span className="text-gray-700">
                    {achievement.icon} Falta{remaining > 1 ? 'm' : ''} {remaining} {actionText} para <strong>{achievement.title}</strong>
                  </span>
                  <Badge variant="outline" className="text-xs">
                    +{achievement.points}pts
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Purpose() {
  const [activeTab, setActiveTab] = useState("journey");
  const [, setLocation] = useLocation();
  const { activeWindow, openWindow, closeWindow } = useEssentiaWindows();
  const [showVideo, setShowVideo] = useState(false);
  const { isCompleted, markCompleted } = useMegaOnboarding();
  
  useEffect(() => {
    trackPageView('/purpose');
  }, []);
  
  // Mostrar onboarding se não foi completado
  if (isCompleted === null) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-600">Carregando...</p>
    </div>;
  }
  
  if (!isCompleted) {
    return <MegaOnboarding onComplete={markCompleted} />;
  }
  
  const user = {
    id: 1,
    name: "Lelão", 
    email: "lelao@flow.com",
    role: "Explorador Interior"
  };

  const userJourney = {
    stage: "Descoberta de Paixões",
    progress: 67,
    daysActive: 89,
    clarity: 72,
    nextMilestone: "Definir Missão Pessoal",
    achievements: 12
  };

  const journeyStages = [
    { id: 1, name: "Despertar Interior", completed: true, current: false },
    { id: 2, name: "Autoconhecimento Profundo", completed: true, current: false },
    { id: 3, name: "Descoberta de Paixões", completed: false, current: true },
    { id: 4, name: "Relacionamentos Significativos", completed: false, current: false },
    { id: 5, name: "Missão e Contribuição", completed: false, current: false },
    { id: 6, name: "Vida com Propósito", completed: false, current: false }
  ];

  const weeklyInsights = [
    {
      type: "breakthrough",
      title: "Clareza sobre Valores",
      description: "Identificou autenticidade e impacto como valores centrais",
      impact: "Alto",
      date: "2 dias atrás"
    },
    {
      type: "challenge",
      title: "Resistência à Vulnerabilidade",
      description: "Dificuldade em compartilhar sonhos com pessoas próximas",
      impact: "Médio",
      date: "5 dias atrás"
    },
    {
      type: "growth",
      title: "Conexão Propósito-Trabalho",
      description: "Vislumbrou como unir tecnologia e educação",
      impact: "Alto",
      date: "1 semana atrás"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Audit Overlay - só em desenvolvimento */}
      {import.meta.env.DEV && <AuditOverlay />}
      
      <QuickNavButton />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Compass className="w-6 h-6 mr-3 text-purple-600" />
                Jornada de Propósito
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Bem-vindo de volta, Lelão. Sua clareza sobre propósito cresceu {userJourney.clarity}% em {userJourney.daysActive} dias.
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 px-4 py-2">
              {userJourney.stage}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{userJourney.clarity}%</div>
              <div className="text-sm text-gray-600">Clareza de Propósito</div>
              <Progress value={userJourney.clarity} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{userJourney.daysActive}</div>
              <div className="text-sm text-gray-600">Dias na Jornada</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{userJourney.achievements}</div>
              <div className="text-sm text-gray-600">Conquistas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl">🎯</div>
              <div className="text-sm text-gray-600">{userJourney.nextMilestone}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FEME COMPASS - BÚSSOLA DE AUTOCONHECIMENTO */}
      <FEMECompass
        values={{ 
          fisico: 7, 
          energetico: 6, 
          mental: 5, 
          espiritual: 7 
        }}
        coherence={68}
        onHarmonize={() => setLocation('/breathing-446')}
      />

      {/* PORTAL UAU - DESTAQUE */}
      <Card 
        className="relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group border-2 border-yellow-400"
        onClick={() => {
          trackPortal('open', 'uau');
          setLocation('/journey');
        }}
        style={{
          backgroundImage: 'url(/placeholders/portal.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="card-portal-uau"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/85 to-transparent" />
        <CardContent className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">Portal UAU</h3>
              </div>
              <p className="text-purple-100 text-lg">
                Uma pergunta profunda te espera hoje. Descubra sua resposta interior.
              </p>
            </div>
            <Button 
              className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold px-6 py-3 shadow-lg"
              data-testid="button-open-portal"
            >
              Entrar →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MENU NAVEGAÇÃO - LIMPO E DESTACADO */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg border-2 border-purple-400 p-5">
        <TabsList className="w-full h-auto flex flex-wrap gap-3 bg-transparent p-0">
          <TabsTrigger 
            value="journey" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-purple-100 border-2 border-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Compass className="w-5 h-5" />
            <span>Jornada</span>
          </TabsTrigger>
          <TabsTrigger 
            value="transition" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-purple-100 border-2 border-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Transição</span>
          </TabsTrigger>
          <TabsTrigger 
            value="avatar" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-purple-100 border-2 border-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <User className="w-5 h-5" />
            <span>Avatar 3D</span>
          </TabsTrigger>
          <TabsTrigger 
            value="breathing" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-green-100 border-2 border-green-300 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-green-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Brain className="w-5 h-5" />
            <span>Respiração</span>
          </TabsTrigger>
          <TabsTrigger 
            value="rituals" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-yellow-100 border-2 border-yellow-300 data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:border-yellow-500 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Star className="w-5 h-5" />
            <span>Rituais</span>
          </TabsTrigger>
          <TabsTrigger 
            value="wheel" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-purple-100 border-2 border-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Target className="w-5 h-5" />
            <span>Roda</span>
          </TabsTrigger>
          <TabsTrigger 
            value="inspiration" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-pink-100 border-2 border-pink-200 data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:border-pink-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Heart className="w-5 h-5" />
            <span>Inspiração</span>
          </TabsTrigger>
          <TabsTrigger 
            value="community" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-blue-100 border-2 border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Users className="w-5 h-5" />
            <span>Comunidade</span>
          </TabsTrigger>
          <TabsTrigger 
            value="biometric" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-red-100 border-2 border-red-200 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:border-red-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Brain className="w-5 h-5" />
            <span>Biometria</span>
          </TabsTrigger>
          <TabsTrigger 
            value="therapist" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-purple-100 border-2 border-purple-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:border-purple-600 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <Heart className="w-5 h-5" />
            <span>Terapeuta IA</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/80 hover:bg-gray-100 border-2 border-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:border-gray-700 font-semibold text-gray-800 data-[state=active]:shadow-md transition-all"
          >
            <User className="w-5 h-5" />
            <span>Sobre Mim</span>
          </TabsTrigger>
        </TabsList>
      </div>

        {/* Tab Contents */}
        <TabsContent value="journey" className="mt-6">
          {/* Journey Progress */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Progresso na Jornada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Etapa {journeyStages.findIndex(s => s.current) + 1} de {journeyStages.length}</span>
                  <span className="text-sm text-gray-600">{userJourney.progress}% concluído</span>
                </div>
                <Progress value={userJourney.progress} className="h-3" />
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                  {journeyStages.map((stage) => {
                    const getStageAction = () => {
                      switch(stage.name) {
                        case "Despertar Interior":
                          return () => setLocation('/journey');
                        case "Autoconhecimento Profundo":
                          return () => setActiveTab('feme');
                        case "Descoberta de Paixões":
                          return () => setActiveTab('therapist');
                        case "Relacionamentos Significativos":
                          return () => setActiveTab('community');
                        case "Missão e Contribuição":
                          return () => setActiveTab('wheel');
                        case "Vida com Propósito":
                          return () => setLocation('/points');
                        default:
                          return () => {};
                      }
                    };

                    const getStageLabel = () => {
                      switch(stage.name) {
                        case "Despertar Interior":
                          return "📊 Portal UAU";
                        case "Autoconhecimento Profundo":
                          return "🔮 FEME Compass";
                        case "Descoberta de Paixões":
                          return "💬 Terapeuta IA";
                        case "Relacionamentos Significativos":
                          return "💝 Comunidade";
                        case "Missão e Contribuição":
                          return "🎯 Roda da Vida";
                        case "Vida com Propósito":
                          return "⭐ Conquistas";
                        default:
                          return "";
                      }
                    };

                    return (
                      <div
                        key={stage.id}
                        onClick={getStageAction()}
                        className="p-3 rounded-lg border-2 text-center transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                        style={{
                          borderColor: stage.completed ? '#10b981' : stage.current ? '#3b82f6' : '#d1d5db',
                          backgroundColor: stage.completed ? '#f0fdf4' : stage.current ? '#eff6ff' : '#f9fafb'
                        }}
                        data-testid={`card-journey-stage-${stage.id}`}
                      >
                        <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          stage.completed
                            ? 'bg-green-500 text-white'
                            : stage.current
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                        }`}>
                          {stage.completed ? '✓' : stage.id}
                        </div>
                        <div className="text-sm font-medium">{stage.name}</div>
                        <div className="text-xs text-purple-600 mt-1">{getStageLabel()}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CONQUISTAS - SEÇÃO DESTACADA */}
          <Card className="mb-6 border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="flex items-center text-yellow-900">
                <Award className="w-6 h-6 mr-2" />
                🏆 Conquistas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <AchievementsSection />
            </CardContent>
          </Card>

          {/* Weekly Insights */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Insights da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      insight.type === 'breakthrough'
                        ? 'border-green-500 bg-green-50'
                        : insight.type === 'challenge'
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{insight.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            insight.impact === 'Alto'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }
                        >
                          {insight.impact}
                        </Badge>
                        <span className="text-xs text-gray-500">{insight.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <JourneyContinuity 
                userId={user?.id || 1}
                currentPhase="exploration"
                progress={75}
              />
            </div>
            <div className="space-y-4">
              <AdaptiveCompanion
                userName={user?.name || "Explorer"}
                recentActivity={["meditation", "reflection", "insight"]}
                mood="contemplative"
                timeOfDay={
                  new Date().getHours() < 12 ? 'morning' :
                  new Date().getHours() < 18 ? 'afternoon' :
                  new Date().getHours() < 22 ? 'evening' : 'night'
                }
              />
              
              {/* Histórico de Sugestões IA */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Arquivo IA
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Todas as sugestões e insights gerados pela IA
                  </p>
                </CardHeader>
                <CardContent>
                  <SuggestionsHistory />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transition" className="mt-6">
          <TransitionJourney />
        </TabsContent>

        <TabsContent value="avatar" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Avatar Místico Original</h3>
              <Avatar3DDisplay />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">Xamã Ancestral - Guia Espiritual</h3>
              <ShamanAvatar isChanneling={activeTab === "avatar"} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="breathing" className="mt-6">
          <GuidedBreathingComponent />
        </TabsContent>

        <TabsContent value="rituals" className="mt-6">
          <DailyRitualsComponent />
        </TabsContent>

        <TabsContent value="wheel" className="mt-6">
          <LifeWheel />
        </TabsContent>

        <TabsContent value="biometric" className="mt-6">
          <BiometricSensors />
        </TabsContent>

        <TabsContent value="therapist" className="mt-6">
          <AITherapist />
        </TabsContent>

        <TabsContent value="inspiration" className="mt-6">
          <InspirationHub />
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <CommunityConnect />
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Sobre Mim - {user.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Perfil Pessoal</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Nome:</span> {user.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {user.email}
                    </div>
                    <div>
                      <span className="font-medium">Jornada:</span> 75% completa
                    </div>
                    <div>
                      <span className="font-medium">Foco Atual:</span> {user.role}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Progresso na Jornada</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Clareza de Propósito:</span>
                      <span className="font-semibold text-purple-600">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cursos Completados:</span>
                      <span className="font-semibold text-blue-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sequência de Estudos:</span>
                      <span className="font-semibold text-green-600">12 dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rituais Completados:</span>
                      <span className="font-semibold text-indigo-600">28</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-800">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => openWindow("study_start")}
            >
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-sm">Janela Essentia</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setActiveTab("breathing")}
            >
              <Target className="w-6 h-6 text-green-600" />
              <span className="text-sm">Respiração Guiada</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setActiveTab("rituals")}
            >
              <Heart className="w-6 h-6 text-red-600" />
              <span className="text-sm">Rituais Diários</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setActiveTab("community")}
            >
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-sm">Conectar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Essentia Window */}
      {activeWindow && (
        <EssentiaWindowComponent
          trigger={activeWindow}
          onClose={closeWindow}
          autoClose={true}
        />
      )}

      {/* Video Portal - Despertar Interior */}
      {showVideo && (
        <VideoPortal
          videoSrc={despertarInteriorVideo}
          title="Despertar Interior"
          onClose={() => setShowVideo(false)}
        />
      )}
      </div>
      </Tabs>
    </div>
  );
}