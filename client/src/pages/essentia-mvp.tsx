import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  Zap, 
  Calendar, 
  Target, 
  Book,
  CheckCircle,
  TrendingUp,
  Compass,
  Sparkles
} from 'lucide-react';
import { OnboardingTriad } from '../components/essentia-mvp/OnboardingTriad';
import { DailyCheckin } from '../components/essentia-mvp/DailyCheckin';
import { PortalRecommendation } from '../components/essentia-mvp/PortalRecommendation';
import { RitualExecution } from '../components/essentia-mvp/RitualExecution';
import { PresencaViva } from '../components/essentia-mvp/PresencaViva';
import { ProgressDashboard } from '../components/essentia-mvp/ProgressDashboard';
import { RealAICoach } from '../components/essentia-mvp/RealAICoach';
import { PersonalInsights } from '../components/essentia-mvp/PersonalInsights';
import { SmartRecommendations } from '../components/essentia-mvp/SmartRecommendations';
import { ContextualGuidance } from '../components/essentia-mvp/ContextualGuidance';
import { EnhancedPortals } from '../components/essentia-mvp/EnhancedPortals';
import { SmartOnboarding } from '../components/essentia-mvp/SmartOnboarding';

interface TriadScores {
  consciencia: number;  // 0-100
  energia: number;      // 0-100
  coerencia: number;    // 0-100
}

interface UserProfile {
  id: string;
  name: string;
  age?: number;
  interests?: string[];
  lifeGoals?: string[];
  currentChallenges?: string[];
  triadScores: TriadScores;
  personalityType?: 'reflexivo' | 'ativo' | 'equilibrado';
  preferredPortal?: 'proposito' | 'vitalidade' | 'harmonia';
  motivation?: string;
  streak: number;
  totalRitualsCompleted: number;
  lastPortalId?: string;
  lastCompletedAt?: Date;
  createdAt?: Date;
}

interface DailyMood {
  date: string;
  humor: number;    // 1-5
  energia: number;  // 1-5
  timestamp: Date;
}

export default function EssentiaMVP() {
  // Estados principais
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [dailyCheckinDone, setDailyCheckinDone] = useState(false);
  const [recommendedPortal, setRecommendedPortal] = useState<string | null>(null);
  const [activeRitual, setActiveRitual] = useState<string | null>(null);
  const [todayMood, setTodayMood] = useState<DailyMood | null>(null);
  
  // Controle de fluxo
  const [currentStep, setCurrentStep] = useState<'onboarding' | 'checkin' | 'portal' | 'ritual' | 'dashboard'>('onboarding');
  
  // Estados para os 4 sistemas de IA
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showGuidance, setShowGuidance] = useState(true);
  const [showEnhancedPortal, setShowEnhancedPortal] = useState(false);

  // Verificar se usuário já existe
  useEffect(() => {
    const savedUser = localStorage.getItem('essentia-mvp-user');
    const todayCheckin = localStorage.getItem('essentia-mvp-checkin-' + new Date().toISOString().split('T')[0]);
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsOnboarding(false);
      
      if (todayCheckin) {
        setTodayMood(JSON.parse(todayCheckin));
        setDailyCheckinDone(true);
        setCurrentStep('dashboard');
      } else {
        setCurrentStep('checkin');
      }
    }
  }, []);

  // Motor de Recomendação - Lógica baseada no documento
  const getRecommendedPortal = (triadScores: TriadScores, lastPortalId?: string): string => {
    const { consciencia, energia, coerencia } = triadScores;
    
    // 1. Escolha pelo menor medidor
    const scores = [
      { key: 'consciencia', value: consciencia, portal: 'proposito' },
      { key: 'energia', value: energia, portal: 'vitalidade' },
      { key: 'coerencia', value: coerencia, portal: 'harmonia' }
    ];
    
    scores.sort((a, b) => a.value - b.value);
    
    // 2. Cooldown: não repetir portal 2x seguidas
    let recommendedPortal = scores[0].portal;
    if (lastPortalId === recommendedPortal && scores[1]) {
      recommendedPortal = scores[1].portal;
    }
    
    return recommendedPortal;
  };

  // Aplicar reforço simbólico pós-conclusão
  const applySymbolicReinforcement = (portalId: string, completedTriadScores: TriadScores): TriadScores => {
    const newScores = { ...completedTriadScores };
    
    // Aumentar o medidor correspondente ao portal completado
    switch (portalId) {
      case 'proposito':
        newScores.consciencia = Math.min(100, newScores.consciencia + 5);
        break;
      case 'vitalidade':
        newScores.energia = Math.min(100, newScores.energia + 5);
        break;
      case 'harmonia':
        newScores.coerencia = Math.min(100, newScores.coerencia + 5);
        break;
    }
    
    return newScores;
  };

  // Handlers
  const handleOnboardingComplete = (userProfile: UserProfile) => {
    setUser(userProfile);
    localStorage.setItem('essentia-mvp-user', JSON.stringify(userProfile));
    setIsOnboarding(false);
    setCurrentStep('checkin');
  };

  const handleDailyCheckinComplete = (mood: DailyMood) => {
    setTodayMood(mood);
    setDailyCheckinDone(true);
    
    // Salvar check-in do dia
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`essentia-mvp-checkin-${today}`, JSON.stringify(mood));
    
    // Recomendar portal baseado na tríade atual
    if (user) {
      const portal = getRecommendedPortal(user.triadScores, user.lastPortalId);
      setRecommendedPortal(portal);
      setCurrentStep('portal');
    }
  };

  const handlePortalAccept = (portalId: string) => {
    setActiveRitual(portalId);
    setShowEnhancedPortal(true);
    // setCurrentStep('ritual'); // Comentado para usar portal aprimorado
  };

  const handleRitualComplete = (portalId: string) => {
    if (!user) return;
    
    // Aplicar reforço simbólico
    const newTriadScores = applySymbolicReinforcement(portalId, user.triadScores);
    
    // Atualizar usuário
    const updatedUser: UserProfile = {
      ...user,
      triadScores: newTriadScores,
      lastPortalId: portalId,
      lastCompletedAt: new Date(),
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-mvp-user', JSON.stringify(updatedUser));
    
    setActiveRitual(null);
    setCurrentStep('dashboard');
  };

  // Handler para portal aprimorado
  const handleEnhancedPortalComplete = (insights: string[]) => {
    if (!user || !activeRitual) return;
    
    // Aplicar reforço simbólico
    const newTriadScores = applySymbolicReinforcement(activeRitual, user.triadScores);
    
    // Atualizar usuário
    const updatedUser: UserProfile = {
      ...user,
      triadScores: newTriadScores,
      lastPortalId: activeRitual,
      lastCompletedAt: new Date(),
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-mvp-user', JSON.stringify(updatedUser));
    
    // Salvar insights se houver
    if (insights.length > 0) {
      const savedInsights = JSON.parse(localStorage.getItem('essentia-mvp-insights') || '[]');
      savedInsights.push({
        portalId: activeRitual,
        insights,
        date: new Date().toISOString(),
        userId: user.id
      });
      localStorage.setItem('essentia-mvp-insights', JSON.stringify(savedInsights));
    }
    
    setActiveRitual(null);
    setShowEnhancedPortal(false);
    setCurrentStep('dashboard');
  };

  const handleNewPortalRequest = () => {
    if (user) {
      const portal = getRecommendedPortal(user.triadScores, user.lastPortalId);
      setRecommendedPortal(portal);
      setCurrentStep('portal');
    }
  };

  // Handlers para os sistemas de IA
  const handleAIAction = (action: string) => {
    switch (action) {
      case 'accept-portal':
        if (recommendedPortal) {
          handlePortalAccept(recommendedPortal);
        }
        break;
      case 'start-ritual':
        if (activeRitual) {
          // Ritual já iniciado
        }
        break;
      case 'new-portal':
        handleNewPortalRequest();
        break;
      default:
        console.log('Ação IA:', action);
    }
  };

  // Renderização baseada no fluxo
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'onboarding':
        return (
          <OnboardingTriad 
            onComplete={handleOnboardingComplete}
          />
        );
        
      case 'checkin':
        return (
          <DailyCheckin 
            userName={user?.name || 'Usuário'}
            onComplete={handleDailyCheckinComplete}
          />
        );
        
      case 'portal':
        return (
          <PortalRecommendation 
            portalId={recommendedPortal!}
            triadScores={user?.triadScores!}
            onAccept={handlePortalAccept}
            onRequestNew={handleNewPortalRequest}
          />
        );
        
      case 'ritual':
        return (
          <RitualExecution 
            portalId={activeRitual!}
            onComplete={handleRitualComplete}
          />
        );
        
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Header com Tríade e Controles IA */}
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sua Tríade Essencial</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-white">
                      Dia {user?.streak || 0}
                    </Badge>
                    <Button
                      onClick={() => {
                      // Som de botão
                      try {
                        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                        oscillator.type = 'sine';
                        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
                        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                        oscillator.start();
                        oscillator.stop(audioContext.currentTime + 0.1);
                      } catch (error) {
                        // Silent fallback
                      }
                      setIsAICoachOpen(true);
                    }}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      💬 IA Coach
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm text-gray-600">Consciência</div>
                    <Progress value={user?.triadScores.consciencia || 0} className="mt-2" />
                    <div className="text-lg font-semibold mt-1">{user?.triadScores.consciencia || 0}%</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-sm text-gray-600">Energia</div>
                    <Progress value={user?.triadScores.energia || 0} className="mt-2" />
                    <div className="text-lg font-semibold mt-1">{user?.triadScores.energia || 0}%</div>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-sm text-gray-600">Coerência</div>
                    <Progress value={user?.triadScores.coerencia || 0} className="mt-2" />
                    <div className="text-lg font-semibold mt-1">{user?.triadScores.coerencia || 0}%</div>
                  </div>
                </div>
                
                {/* Controles dos 4 Sistemas de IA */}
                <div className="flex justify-center space-x-2 mt-4">
                  <Button
                    onClick={() => setShowGuidance(!showGuidance)}
                    variant={showGuidance ? "default" : "outline"}
                    size="sm"
                  >
                    🧭 Orientação
                  </Button>
                  <Button
                    onClick={() => setShowInsights(!showInsights)}
                    variant={showInsights ? "default" : "outline"}
                    size="sm"
                  >
                    📊 Insights
                  </Button>
                  <Button
                    onClick={() => setShowRecommendations(!showRecommendations)}
                    variant={showRecommendations ? "default" : "outline"}
                    size="sm"
                  >
                    🎯 Recomendações
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sistema 1: Orientação Contextual */}
            {showGuidance && (
              <ContextualGuidance
                triadScores={user?.triadScores!}
                currentStep={currentStep}
                streak={user?.streak || 0}
                totalRitualsCompleted={user?.totalRitualsCompleted || 0}
                onActionRequest={handleAIAction}
              />
            )}

            {/* Sistema 2: Insights Pessoais */}
            {showInsights && (
              <PersonalInsights
                user={user!}
                todayMood={todayMood || undefined}
              />
            )}

            {/* Sistema 3: Recomendações Inteligentes */}
            {showRecommendations && (
              <SmartRecommendations
                triadScores={user?.triadScores!}
                todayMood={todayMood || undefined}
                lastPortalId={user?.lastPortalId}
                streak={user?.streak || 0}
                onPortalRequest={handlePortalAccept}
              />
            )}

            {/* Presença Viva */}
            <PresencaViva 
              triadScores={user?.triadScores!}
              lastRitualCompleted={user?.lastCompletedAt}
            />

            {/* Dashboard de Progresso */}
            <ProgressDashboard 
              user={user!}
              todayMood={todayMood}
              onNewPortalRequest={handleNewPortalRequest}
              onDailyCheckin={() => setCurrentStep('checkin')}
            />

            {/* Sistema 4: IA Coach Real */}
            <RealAICoach
              triadScores={user?.triadScores!}
              isOpen={isAICoachOpen}
              onClose={() => setIsAICoachOpen(false)}
            />

            {/* Portal Aprimorado */}
            {showEnhancedPortal && activeRitual && (
              <EnhancedPortals
                portalId={activeRitual}
                onComplete={handleEnhancedPortalComplete}
                onClose={() => {
                  setShowEnhancedPortal(false);
                  setActiveRitual(null);
                }}
              />
            )}
          </div>
        );
        
      default:
        return <div>Estado inválido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header com navegação */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              {currentStep !== 'onboarding' && (
                <Button 
                  onClick={() => setCurrentStep('dashboard')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <span>← Dashboard</span>
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Essentia MVP
              </h1>
            </div>
            <div className="flex-1"></div>
          </div>
          <p className="text-gray-600">
            Sua jornada de crescimento pessoal baseada na Tríade Essencial
          </p>
        </div>

        {/* Indicador de Progresso */}
        {!isOnboarding && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-2 shadow-sm border">
              <div className={`w-3 h-3 rounded-full ${currentStep === 'checkin' ? 'bg-blue-500' : dailyCheckinDone ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Check-in</span>
              
              <div className={`w-3 h-3 rounded-full ${currentStep === 'portal' ? 'bg-blue-500' : recommendedPortal ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Portal</span>
              
              <div className={`w-3 h-3 rounded-full ${currentStep === 'ritual' ? 'bg-blue-500' : user?.lastCompletedAt ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Ritual</span>
              
              <div className={`w-3 h-3 rounded-full ${currentStep === 'dashboard' ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Dashboard</span>
            </div>
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="max-w-4xl mx-auto">
          {isOnboarding ? (
            <SmartOnboarding onComplete={handleOnboardingComplete} />
          ) : (
            renderCurrentStep()
          )}
        </div>
      </div>
    </div>
  );
}