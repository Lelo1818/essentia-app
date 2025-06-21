import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BearAvatar from '@/components/edu/bear-avatar';
import ShamanAvatar from '@/components/purpose/shaman-avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AvatarSelector() {
  const [selectedAvatar, setSelectedAvatar] = useState<'bear' | 'shaman' | 'warrior'>('bear');
  const [isActive, setIsActive] = useState(false);

  const avatars = {
    bear: {
      name: "Urso Sábio",
      description: "Mentor de conhecimento e protetor da sabedoria ancestral",
      powers: ["Rugido Motivacional", "Sabedoria Antiga", "Força Interior"],
      element: "Terra"
    },
    shaman: {
      name: "Xamã Ancestral", 
      description: "Guia espiritual conectado aos mistérios do cosmos",
      powers: ["Canalização Espiritual", "Visão Cósmica", "Cura Energética"],
      element: "Espírito"
    },
    warrior: {
      name: "Guerreiro Águia",
      description: "Protetor corajoso com visão aguçada e determinação",
      powers: ["Voo Estratégico", "Visão Ampla", "Coragem Inabalável"],
      element: "Ar"
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-900 to-purple-900 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            🎭 Seletor de Avatar Espiritual
          </CardTitle>
          <p className="text-center text-sm opacity-90">
            Escolha seu guia para a jornada de autoconhecimento
          </p>
        </CardHeader>
      </Card>

      <Tabs value={selectedAvatar} onValueChange={(value) => setSelectedAvatar(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bear">🐻 Urso</TabsTrigger>
          <TabsTrigger value="shaman">🔮 Xamã</TabsTrigger>
          <TabsTrigger value="warrior">🦅 Águia</TabsTrigger>
        </TabsList>

        <TabsContent value="bear" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🐻 {avatars.bear.name}
                  <Badge variant="outline">{avatars.bear.element}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {avatars.bear.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Poderes Especiais:</h4>
                  <div className="flex flex-wrap gap-2">
                    {avatars.bear.powers.map((power, i) => (
                      <Badge key={i} variant="secondary">{power}</Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsActive(!isActive)}
                  className="w-full bg-amber-700 hover:bg-amber-600"
                >
                  {isActive ? "🔥 RUGINDO!" : "Ativar Rugido"}
                </Button>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <BearAvatar isRoaring={isActive} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shaman" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔮 {avatars.shaman.name}
                  <Badge variant="outline">{avatars.shaman.element}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {avatars.shaman.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Poderes Especiais:</h4>
                  <div className="flex flex-wrap gap-2">
                    {avatars.shaman.powers.map((power, i) => (
                      <Badge key={i} variant="secondary">{power}</Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsActive(!isActive)}
                  className="w-full bg-purple-700 hover:bg-purple-600"
                >
                  {isActive ? "⚡ CANALIZANDO!" : "Canalizar Energia"}
                </Button>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <ShamanAvatar isChanneling={isActive} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="warrior" className="space-y-4">
          <Card className="text-center p-8">
            <h3 className="text-2xl font-bold mb-4">🦅 Guerreiro Águia</h3>
            <p className="text-lg mb-4">Em desenvolvimento...</p>
            <p className="text-sm text-muted-foreground">
              Avatar em construção para a apresentação final
            </p>
            <div className="mt-6 text-6xl">🚧</div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Impacto na Experiência</h4>
            <p className="text-sm">
              Cada avatar oferece uma abordagem única para guiar sua jornada de autoconhecimento,
              adaptando-se ao seu perfil e necessidades pessoais.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}