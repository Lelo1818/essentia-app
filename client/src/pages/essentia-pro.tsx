import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Compass, User, Heart, Sparkles, Eye, Sun, BookOpen } from 'lucide-react';

// Components
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

export default function EssentiaPro() {
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

  const [activeTab, setActiveTab] = useState('journey');

  const handleStageClick = (stageId: number) => {
    console.log('Stage clicked:', stageId);
    // Navigate to appropriate sections based on stage
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
  const [unlockedPortals, setUnlockedPortals] = useState<string[]>(['clareza', 'presenca', 'coragem', 'conexao']);
  const [userXP, setUserXP] = useState(280);

  const handlePortalComplete = (portalId: string, reflection: string) => {
    if (!completedPortals.includes(portalId)) {
      setCompletedPortals(prev => [...prev, portalId]);
      
      // Adicionar recompensas
      const rewards = {
        'clareza': { clarityIncrease: 10, xp: 100 },
        'presenca': { clarityIncrease: 8, xp: 90 },
        'coragem': { clarityIncrease: 12, xp: 120 },
        'sabedoria': { clarityIncrease: 15, xp: 150 },
        'intuicao': { clarityIncrease: 8, xp: 130 },
        'proposito': { clarityIncrease: 20, xp: 200 },
        'conexao': { clarityIncrease: 25, xp: 300 }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Essentia Pro
                </h1>
                <p className="text-gray-600">Versão Avançada • Jornada de Autoconhecimento</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-600 text-white px-4 py-2">
                Clareza: {user.clarity}%
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700">
                {user.daysActive} dias ativos
              </Badge>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation */}
          <div className="mb-8">
            <TabsList className="grid w-full grid-cols-7 h-14 bg-white/60 backdrop-blur-sm">
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
              <TabsTrigger value="rituals" className="flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <span className="hidden md:inline">Rituais</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Diário</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
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

            {/* Status dos Portais */}
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

            {/* Grid de Portais */}
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

          <TabsContent value="rituals" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <DailyRitualsPro onComplete={completeDaily} />
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

        {/* Quick Stats Footer */}
        <Card className="mt-12 bg-white/60 backdrop-blur-sm border-purple-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{user.clarity}%</div>
                <div className="text-sm text-gray-600">Clareza Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{user.daysActive}</div>
                <div className="text-sm text-gray-600">Dias Ativos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{user.achievements}</div>
                <div className="text-sm text-gray-600">Conquistas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">3/6</div>
                <div className="text-sm text-gray-600">Estágios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">{portals.filter(p => p.unlocked).length}/4</div>
                <div className="text-sm text-gray-600">Portais</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}