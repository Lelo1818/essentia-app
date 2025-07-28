import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PortalCard } from './PortalCard';
import { portalsData } from '../../data/portals-premium';
import { Sparkles, Trophy, Star } from 'lucide-react';

interface PortalsSectionProps {
  userClarity: number;
  onClarityIncrease: (amount: number) => void;
}

export const PortalsSection = ({ userClarity, onClarityIncrease }: PortalsSectionProps) => {
  const [completedPortals, setCompletedPortals] = useState<string[]>([]);

  const handlePortalComplete = () => {
    // Aumenta clareza em 5% a cada portal concluído
    onClarityIncrease(5);
    
    // Feedback visual de conquista
    console.log('Portal concluído! Clareza aumentada!');
  };

  const unlockedPortals = portalsData.filter(portal => portal.unlocked);
  const completionRate = (completedPortals.length / unlockedPortals.length) * 100;

  return (
    <div className="space-y-8">
      
      {/* Header com Progresso */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 mr-3 text-purple-600" />
            Portais de Transformação
          </CardTitle>
          
          <div className="space-y-4">
            {/* Clareza Atual */}
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{userClarity}%</div>
              <div className="text-gray-600 mb-3">Clareza de Propósito</div>
              <Progress value={userClarity} className="w-full max-w-md mx-auto h-3" />
            </div>
            
            {/* Taxa de Conclusão */}
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg text-blue-600">{completedPortals.length}</div>
                <div className="text-gray-600">Portais Concluídos</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-green-600">{unlockedPortals.length}</div>
                <div className="text-gray-600">Portais Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-amber-600">{Math.round(completionRate)}%</div>
                <div className="text-gray-600">Taxa de Conclusão</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Grid de Portais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portalsData.map((portal) => (
          <PortalCard 
            key={portal.id} 
            portal={portal} 
            onComplete={handlePortalComplete} 
          />
        ))}
      </div>

      {/* Seção de Conquistas */}
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-amber-600" />
            Conquistas dos Portais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className={`p-4 rounded-lg border-2 transition-all ${
              completedPortals.length >= 1 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <Star className={`w-5 h-5 mr-2 ${completedPortals.length >= 1 ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="font-semibold">Primeiro Portal</span>
              </div>
              <p className="text-sm text-gray-600">Complete seu primeiro portal de transformação</p>
              {completedPortals.length >= 1 && (
                <Badge className="mt-2 bg-green-100 text-green-700">Conquistado!</Badge>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              completedPortals.length >= 3 ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <Star className={`w-5 h-5 mr-2 ${completedPortals.length >= 3 ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-semibold">Explorador</span>
              </div>
              <p className="text-sm text-gray-600">Complete 3 portais diferentes</p>
              {completedPortals.length >= 3 && (
                <Badge className="mt-2 bg-blue-100 text-blue-700">Conquistado!</Badge>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              userClarity >= 80 ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <Star className={`w-5 h-5 mr-2 ${userClarity >= 80 ? 'text-purple-600' : 'text-gray-400'}`} />
                <span className="font-semibold">Clareza Máxima</span>
              </div>
              <p className="text-sm text-gray-600">Atinja 80% de clareza de propósito</p>
              {userClarity >= 80 && (
                <Badge className="mt-2 bg-purple-100 text-purple-700">Conquistado!</Badge>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      {userClarity < 100 && (
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center">Continue Sua Jornada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                Cada portal completado aumenta sua clareza de propósito. Continue explorando 
                para descobrir mais sobre si mesmo e seu caminho de transformação.
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Próximo Portal
                </Button>
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                  Ver Insights da IA
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
};