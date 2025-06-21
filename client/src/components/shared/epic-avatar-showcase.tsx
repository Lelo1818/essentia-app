import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BearAvatar from '@/components/edu/bear-avatar';
import ShamanAvatar from '@/components/purpose/shaman-avatar';
import { Volume2, Crown, Zap, Sparkles, Award, Target } from 'lucide-react';

export default function EpicAvatarShowcase() {
  const [activeDemo, setActiveDemo] = useState<'bear' | 'shaman' | 'sync'>('bear');
  const [isRoaring, setIsRoaring] = useState(false);
  const [isChanneling, setIsChanneling] = useState(false);
  const [autoDemo, setAutoDemo] = useState(false);

  useEffect(() => {
    if (!autoDemo) return;
    
    const interval = setInterval(() => {
      if (activeDemo === 'bear') {
        setIsRoaring(true);
        setTimeout(() => setIsRoaring(false), 2000);
      } else if (activeDemo === 'shaman') {
        setIsChanneling(true);
        setTimeout(() => setIsChanneling(false), 3000);
      } else if (activeDemo === 'sync') {
        setIsRoaring(true);
        setIsChanneling(true);
        setTimeout(() => {
          setIsRoaring(false);
          setIsChanneling(false);
        }, 2500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoDemo, activeDemo]);

  const triggerAction = () => {
    if (activeDemo === 'bear' || activeDemo === 'sync') {
      setIsRoaring(true);
      setTimeout(() => setIsRoaring(false), 2000);
    }
    if (activeDemo === 'shaman' || activeDemo === 'sync') {
      setIsChanneling(true);
      setTimeout(() => setIsChanneling(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Épico */}
      <Card className="bg-gradient-to-r from-amber-900 via-purple-900 to-blue-900 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            Sistema de Avatares Evolutivos
            <Crown className="w-8 h-8 text-yellow-400" />
          </CardTitle>
          <p className="text-lg opacity-90">
            Tecnologia de Ponta: IA Emocional + Canvas 3D + Biometria Integrada
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-white border-white">
              <Zap className="w-4 h-4 mr-1" />
              Tempo Real
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              <Sparkles className="w-4 h-4 mr-1" />
              Responsivo
            </Badge>
            <Badge variant="outline" className="text-white border-white">
              <Target className="w-4 h-4 mr-1" />
              Personalizado
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Controles de Demonstração */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Demonstração Interativa</span>
            <div className="flex gap-2">
              <Button
                variant={autoDemo ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoDemo(!autoDemo)}
              >
                {autoDemo ? "Demo Automática ON" : "Demo Manual"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeDemo === 'bear' ? "default" : "outline"}
              onClick={() => setActiveDemo('bear')}
              className="flex-1"
            >
              🐻 Urso Alpha
            </Button>
            <Button
              variant={activeDemo === 'shaman' ? "default" : "outline"}
              onClick={() => setActiveDemo('shaman')}
              className="flex-1"
            >
              🔮 Arqui-Xamã
            </Button>
            <Button
              variant={activeDemo === 'sync' ? "default" : "outline"}
              onClick={() => setActiveDemo('sync')}
              className="flex-1"
            >
              ⚡ Sincronia
            </Button>
          </div>

          <Button
            onClick={triggerAction}
            className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-3 text-lg"
            disabled={autoDemo}
          >
            <Volume2 className="w-5 h-5 mr-2" />
            {activeDemo === 'bear' ? 'RUGIDO ÉPICO!' : 
             activeDemo === 'shaman' ? 'CANALIZAÇÃO CÓSMICA!' : 
             'SINERGIA TOTAL!'}
          </Button>
        </CardContent>
      </Card>

      {/* Showcase dos Avatares */}
      <div className="grid gap-6">
        {activeDemo === 'bear' && (
          <Card className="border-4 border-amber-500">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <CardTitle className="text-center text-2xl">
                🐻 URSO ALPHA - Mentor Supremo de Conhecimento
              </CardTitle>
              <p className="text-center">
                Guardião da Sabedoria Ancestral • Força & Proteção • Rugido Motivacional
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex justify-center">
                <BearAvatar isRoaring={isRoaring} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-600">95%</div>
                  <div className="text-sm">Engajamento</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">+180%</div>
                  <div className="text-sm">Retenção</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">2.3x</div>
                  <div className="text-sm">Velocidade</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeDemo === 'shaman' && (
          <Card className="border-4 border-purple-500">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardTitle className="text-center text-2xl">
                🔮 ARQUI-XAMÃ - Mestre dos Portais Dimensionais
              </CardTitle>
              <p className="text-center">
                Sabedoria Cósmica • Transformação Interior • Portal da Consciência
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex justify-center">
                <ShamanAvatar isChanneling={isChanneling} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                  <div className="text-sm">Clareza Mental</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">+150%</div>
                  <div className="text-sm">Autoconhecimento</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">3.1x</div>
                  <div className="text-sm">Propósito</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeDemo === 'sync' && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-4 border-gradient-to-r from-amber-500 to-purple-500">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-purple-600 text-white">
                <CardTitle className="text-center">SINERGIA ÉPICA</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-center">
                  <BearAvatar isRoaring={isRoaring} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-gradient-to-r from-purple-500 to-amber-500">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-amber-600 text-white">
                <CardTitle className="text-center">HARMONIA TOTAL</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-center">
                  <ShamanAvatar isChanneling={isChanneling} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Impacto para Investidores */}
      <Card className="bg-gradient-to-r from-green-800 to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            <Award className="w-6 h-6 inline mr-2" />
            Diferencial Competitivo Único
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-sm">Competidores com esta tecnologia no Brasil</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">R$ 8.7B</div>
              <div className="text-sm">TAM do mercado brasileiro</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15%</div>
              <div className="text-sm">Crescimento anual do setor</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">
              Somos pioneiros na integração de Avatar 3D + IA Emocional + Biometria no Brasil
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}