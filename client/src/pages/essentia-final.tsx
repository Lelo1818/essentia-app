import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Sparkles, Crown, Trophy, Star, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { PortalCardFinal } from '../components/essentia-final/PortalCardFinal';
import { portalsData, unlockRequirements, portalRewards } from '../data/portals-final';

export default function EssentiaFinal() {
  const [userClarity, setUserClarity] = useState(45);
  const [userXP, setUserXP] = useState(280);
  const [completedPortals, setCompletedPortals] = useState<string[]>([]);
  const [unlockedPortals, setUnlockedPortals] = useState<string[]>(['clareza', 'presenca', 'coragem']);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Verificar desbloqueios quando clareza ou portais completados mudarem
  useEffect(() => {
    const newUnlocked = [...unlockedPortals];
    
    Object.entries(unlockRequirements).forEach(([portalId, requirements]) => {
      if (!newUnlocked.includes(portalId)) {
        const clarityMet = userClarity >= requirements.requiredClarity;
        const portalsMet = requirements.requiredPortals.every(reqPortal => 
          completedPortals.includes(reqPortal)
        );
        
        if (clarityMet && portalsMet) {
          newUnlocked.push(portalId);
        }
      }
    });
    
    setUnlockedPortals(newUnlocked);
  }, [userClarity, completedPortals]);

  const handlePortalComplete = (portalId: string, reflection: string) => {
    if (!completedPortals.includes(portalId)) {
      setCompletedPortals(prev => [...prev, portalId]);
      
      const reward = portalRewards[portalId as keyof typeof portalRewards];
      if (reward) {
        setUserClarity(prev => Math.min(100, prev + reward.clarityIncrease));
        setUserXP(prev => prev + reward.xp);
        
        // Adicionar conquista
        if (!achievements.includes(reward.badge)) {
          setAchievements(prev => [...prev, reward.badge]);
        }
      }
    }
  };

  const handleProgress = (portalId: string, progress: number) => {
    // Tracking de progresso se necessário
    console.log(`Portal ${portalId}: ${progress}% completo`);
  };

  // Atualizar status dos portais com dados dinâmicos
  const portalsWithStatus = portalsData.map(portal => ({
    ...portal,
    unlocked: unlockedPortals.includes(portal.id),
    completed: completedPortals.includes(portal.id)
  }));

  const availablePortals = portalsWithStatus.filter(p => p.unlocked);
  const completionRate = availablePortals.length > 0 ? (completedPortals.length / availablePortals.length) * 100 : 0;
  const totalPortals = portalsData.length;
  const nextLevel = Math.floor(userXP / 500) + 1;
  const xpToNextLevel = (nextLevel * 500) - userXP;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Essentia Final • Nível {Math.floor(userXP / 500) + 1}
            </Badge>
          </div>

          {/* Status do Usuário */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            
            {/* Clareza */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userClarity}%</div>
                <div className="text-sm text-gray-600 mb-3">Clareza de Propósito</div>
                <Progress value={userClarity} className="h-2" />
              </CardContent>
            </Card>

            {/* Experiência */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{userXP}</div>
                <div className="text-sm text-gray-600 mb-3">Pontos de Experiência</div>
                <div className="text-xs text-gray-500">{xpToNextLevel} XP para próximo nível</div>
              </CardContent>
            </Card>

            {/* Portais */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {completedPortals.length}/{availablePortals.length}
                </div>
                <div className="text-sm text-gray-600 mb-3">Portais Concluídos</div>
                <Progress value={completionRate} className="h-2" />
              </CardContent>
            </Card>

            {/* Conquistas */}
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">{achievements.length}</div>
                <div className="text-sm text-gray-600 mb-3">Conquistas Desbloqueadas</div>
                <div className="flex justify-center">
                  <Trophy className="w-5 h-5 text-amber-600" />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Welcome Section */}
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0">
            <CardHeader>
              <CardTitle className="text-3xl text-center flex items-center justify-center">
                <Sparkles className="w-10 h-10 mr-4" />
                Jornada de Transformação Essentia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg opacity-90">
                  Uma experiência completa de autoconhecimento com {totalPortals} portais únicos de transformação
                </p>
                <p className="text-base opacity-80">
                  Cada portal oferece práticas guiadas, reflexões profundas e insights personalizados para sua evolução
                </p>
                
                {/* Próximo Desbloqueio */}
                {userClarity < 100 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Próximo portal disponível aos {userClarity + 10}% de clareza</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de Portais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {portalsWithStatus.map((portal) => (
            <PortalCardFinal 
              key={portal.id} 
              portal={portal} 
              onComplete={handlePortalComplete}
              onProgress={handleProgress}
            />
          ))}
        </div>

        {/* Seção de Conquistas */}
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-amber-600" />
              Suas Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {achievements.map((achievement, index) => (
                  <Badge key={index} className="bg-amber-100 text-amber-800 px-3 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">
                Complete portais para desbloquear conquistas especiais!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Estatísticas Detalhadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progresso Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Portais Disponíveis</span>
                  <span className="font-semibold">{availablePortals.length}/{totalPortals}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Conclusão</span>
                  <span className="font-semibold">{Math.round(completionRate)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Nível Atual</span>
                  <span className="font-semibold">Nível {nextLevel}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximos Marcos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {userClarity < 50 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Portal da Sabedoria aos 50% de clareza</span>
                  </div>
                )}
                {userClarity < 70 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Portal do Propósito aos 70% de clareza</span>
                  </div>
                )}
                {userClarity < 90 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Portal da Transcendência aos 90% de clareza</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insights Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Sua jornada de clareza está evoluindo constantemente</p>
                <p>• Cada portal concluído aumenta sua autoconsciência</p>
                <p>• Continue praticando para desbloquear novos níveis</p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Essentia Final - Sistema completo de transformação pessoal e autoconhecimento
          </p>
        </div>

      </div>
    </div>
  );
}