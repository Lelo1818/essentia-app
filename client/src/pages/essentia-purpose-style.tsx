import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Compass, User, Heart, Sparkles, Eye, Sun, BookOpen, Star, Trophy, Target, TrendingUp, Users, Brain } from 'lucide-react';

// Components (reusing Pro components with Purpose styling)
import { Avatar3DPro } from '../components/essentia-pro/Avatar3DPro';
import { GuidedBreathingPro } from '../components/essentia-pro/GuidedBreathingPro';
import { PurposeJourneyPro } from '../components/essentia-pro/PurposeJourneyPro';
import { PortalCardPro } from '../components/essentia-pro/PortalCardPro';
import { AIPersonalitiesPro } from '../components/essentia-pro/AIPersonalitiesPro';
import { DailyRitualsPro } from '../components/essentia-pro/DailyRitualsPro';
import { JournalingPro } from '../components/essentia-pro/JournalingPro';

// Data and hooks
import { useEssentiaPro } from '../hooks/useEssentiaPro';
import { portals, aiPersonalities } from '../data/essentia-pro-data';

export default function EssentiaPurposeStyle() {
  const {
    user,
    currentEnvironment,
    setCurrentEnvironment,
    isBreathing,
    setIsBreathing,
    selectedTechnique,
    setSelectedTechnique,
    avatarRotation,
    auraIntensity,
    startBreathing,
    completeBreathe,
    updateClarity,
    completeDaily
  } = useEssentiaPro();

  const [activeTab, setActiveTab] = useState('overview');

  const handleStageClick = (stageId: number) => {
    console.log('Stage clicked:', stageId);
    switch(stageId) {
      case 1:
      case 2:
        setActiveTab('journal');
        break;
      case 3:
        setActiveTab('portals');
        break;
      case 4:
        setActiveTab('ai');
        break;
      case 5:
        setActiveTab('rituals');
        break;
      case 6:
        setActiveTab('avatar');
        break;
      default:
        setActiveTab('journey');
    }
  };

  const [completedPortals, setCompletedPortals] = useState<string[]>([]);
  const [unlockedPortals, setUnlockedPortals] = useState<string[]>(['clareza', 'presenca', 'coragem']);
  const [userXP, setUserXP] = useState(280);

  const handlePortalComplete = (portalId: string, reflection: string) => {
    if (!completedPortals.includes(portalId)) {
      setCompletedPortals(prev => [...prev, portalId]);
      
      const rewards = {
        'clareza': { clarityIncrease: 10, xp: 100 },
        'presenca': { clarityIncrease: 8, xp: 90 },
        'coragem': { clarityIncrease: 12, xp: 120 },
        'sabedoria': { clarityIncrease: 15, xp: 150 },
        'intuicao': { clarityIncrease: 8, xp: 130 },
        'proposito': { clarityIncrease: 20, xp: 200 }
      };
      
      const reward = rewards[portalId as keyof typeof rewards];
      if (reward) {
        updateClarity(Math.min(100, user.clarity + reward.clarityIncrease));
        setUserXP(prev => prev + reward.xp);
      }
      
      completeDaily();
    }
  };

  const handlePortalProgress = (portalId: string, progress: number) => {
    console.log(`Portal ${portalId}: ${progress}% completo`);
  };

  const userJourney = {
    stage: "Descoberta de Paixões",
    progress: 67,
    daysActive: user.daysActive || 89,
    clarity: user.clarity,
    nextMilestone: "Definir Missão Pessoal",
    achievements: user.achievements || 12
  };

  const journeyStages = [
    { id: 1, name: "Despertar Interior", completed: true, current: false },
    { id: 2, name: "Autoconhecimento Profundo", completed: true, current: false },
    { id: 3, name: "Descoberta de Paixões", completed: false, current: true },
    { id: 4, name: "Relacionamentos Significativos", completed: false, current: false },
    { id: 5, name: "Missão e Contribuição", completed: false, current: false },
    { id: 6, name: "Vida com Propósito", completed: false, current: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header estilo Purpose */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/dashboard-unificado'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Essentia ✨ Jornada de Propósito
                </h1>
                <p className="text-gray-600">Descubra sua essência e transforme sua vida</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-600 text-white px-4 py-2">
                <Star className="w-4 h-4 mr-1" />
                Clareza: {user.clarity}%
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700">
                <Target className="w-4 h-4 mr-1" />
                {user.daysActive} dias
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Estilo Purpose Dashboard */}
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Overview inspirado no dashboard original */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Sua Jornada de Autoconhecimento
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Bem-vindo ao seu espaço de transformação pessoal. Cada passo nesta jornada é uma descoberta sobre quem você realmente é.
              </p>
            </div>

            {/* Progress Overview */}
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-2xl">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
                  {userJourney.stage}
                </CardTitle>
                <p className="text-gray-600">Estágio atual da sua jornada</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={userJourney.progress} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progresso: {userJourney.progress}%</span>
                    <span>Próximo: {userJourney.nextMilestone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journey Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{user.clarity}%</div>
                <div className="text-sm text-gray-600">Clareza Interior</div>
              </Card>

              <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{user.daysActive}</div>
                <div className="text-sm text-gray-600">Dias de Jornada</div>
              </Card>

              <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">{userJourney.achievements}</div>
                <div className="text-sm text-gray-600">Conquistas</div>
              </Card>

              <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">{userXP}</div>
                <div className="text-sm text-gray-600">Experiência</div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setActiveTab('journey')}>
                <CardContent className="p-6 text-center">
                  <Compass className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Continuar Jornada</h3>
                  <p className="text-sm text-gray-600">Explore os próximos estágios da sua evolução pessoal</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setActiveTab('portals')}>
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Portais Ativos</h3>
                  <p className="text-sm text-gray-600">Experiências imersivas de crescimento pessoal</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all group" onClick={() => setActiveTab('ai')}>
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-teal-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Mentores IA</h3>
                  <p className="text-sm text-gray-600">Conversas profundas com guias especializados</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8">
            <TabsList className="grid w-full grid-cols-7 h-14 bg-white/80 backdrop-blur-sm border border-purple-200">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span className="hidden md:inline">Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="journey" className="flex items-center space-x-2">
                <Compass className="w-4 h-4" />
                <span className="hidden md:inline">Jornada</span>
              </TabsTrigger>
              <TabsTrigger value="avatar" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Avatar 3D</span>
              </TabsTrigger>
              <TabsTrigger value="breathing" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span className="hidden md:inline">Respiração</span>
              </TabsTrigger>
              <TabsTrigger value="portals" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span className="hidden md:inline">Portais</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span className="hidden md:inline">IA Coach</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Diário</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents - Reusing Pro components */}
          <TabsContent value="journey" className="mt-0">
            <PurposeJourneyPro user={user} onStageClick={handleStageClick} />
          </TabsContent>

          <TabsContent value="avatar" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <Avatar3DPro
                clarity={user.clarity}
                environment={currentEnvironment}
                rotation={avatarRotation}
                auraIntensity={auraIntensity}
                onEnvironmentChange={setCurrentEnvironment}
              />
            </div>
          </TabsContent>

          <TabsContent value="breathing" className="mt-0">
            <div className="max-w-3xl mx-auto">
              <GuidedBreathingPro
                isActive={isBreathing}
                selectedTechnique={selectedTechnique}
                onTechniqueChange={setSelectedTechnique}
                onToggle={() => {
                  if (isBreathing) {
                    setIsBreathing(false);
                  } else {
                    startBreathing(selectedTechnique);
                  }
                }}
                onComplete={completeBreathe}
              />
            </div>
          </TabsContent>

          <TabsContent value="portals" className="mt-0 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Portais da Jornada</h2>
              <p className="text-gray-600">
                Experiências imersivas para diferentes aspectos do crescimento pessoal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedPortals.length}/{portals.length}</div>
                  <div className="text-sm text-gray-600">Portais Concluídos</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{userXP}</div>
                  <div className="text-sm text-gray-600">Pontos de Experiência</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{unlockedPortals.length}</div>
                  <div className="text-sm text-gray-600">Portais Disponíveis</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {portals.map((portal) => {
                const portalWithStatus = {
                  ...portal,
                  unlocked: unlockedPortals.includes(portal.id),
                  completed: completedPortals.includes(portal.id)
                };
                
                return (
                  <PortalCardPro 
                    key={portal.id} 
                    portal={portalWithStatus} 
                    onComplete={handlePortalComplete}
                    onProgress={handlePortalProgress}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-0">
            <div className="max-w-5xl mx-auto">
              <AIPersonalitiesPro personalities={aiPersonalities} />
            </div>
          </TabsContent>

          <TabsContent value="journal" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <JournalingPro 
                onComplete={() => {
                  completeDaily();
                  updateClarity(Math.min(100, user.clarity + 5));
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}