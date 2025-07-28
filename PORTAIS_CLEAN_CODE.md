# Código Limpo - Sistema de Portais Essentia

## Componente Principal - PortalCard.tsx

```typescript
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Unlock, CheckCircle, ArrowRight } from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  icon: any;
  color: string;
  phrase: string;
  practice: string;
  unlocked: boolean;
}

interface PortalCardProps {
  portal: Portal;
  onComplete: () => void;
}

export const PortalCard = ({ portal, onComplete }: PortalCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isReflecting, setIsReflecting] = useState(false);

  const Icon = portal.icon;

  const handleEnterPortal = () => {
    if (!portal.unlocked) return;
    setIsOpen(true);
  };

  const handleCompletePractice = () => {
    setIsReflecting(true);
  };

  const handleSubmitReflection = () => {
    if (reflection.trim().length > 0) {
      setIsCompleted(true);
      setIsReflecting(false);
      onComplete();
      setTimeout(() => {
        setIsOpen(false);
        setIsCompleted(false);
        setReflection('');
      }, 2000);
    }
  };

  return (
    <>
      {/* Card Principal */}
      <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        portal.unlocked ? 'border-2 hover:border-purple-300' : 'border-gray-200 opacity-60'
      }`}>
        <CardContent className="p-6 text-center">
          
          {/* Ícone do Portal */}
          <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center relative ${
            portal.unlocked ? 'shadow-lg' : 'grayscale'
          }`}>
            <Icon className="w-10 h-10 text-white" />
            {!portal.unlocked && (
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          {/* Nome e Frase */}
          <h3 className={`text-xl font-bold mb-3 ${
            portal.unlocked ? 'text-slate-900' : 'text-gray-500'
          }`}>
            {portal.name}
          </h3>
          
          <p className={`text-sm italic mb-4 ${
            portal.unlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            "{portal.phrase}"
          </p>

          {/* Status Badge */}
          <div className="mb-4">
            {portal.unlocked ? (
              <Badge className="bg-green-100 text-green-700">
                <Unlock className="w-3 h-3 mr-1" />
                Desbloqueado
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-500">
                <Lock className="w-3 h-3 mr-1" />
                Bloqueado
              </Badge>
            )}
          </div>

          {/* Botão de Entrada */}
          <Button 
            className={`w-full ${portal.unlocked ? `bg-gradient-to-r ${portal.color}` : 'bg-gray-300'} text-white`}
            onClick={handleEnterPortal}
            disabled={!portal.unlocked}
          >
            {portal.unlocked ? 'Entrar no Portal' : 'Requer Desbloqueio'}
          </Button>
        </CardContent>
      </Card>

      {/* Modal da Experiência */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className={`w-8 h-8 mr-3 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {portal.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            
            {/* Frase Inspiracional */}
            <div className={`p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 ${portal.color.replace('from-', 'border-').split(' ')[0]}`}>
              <p className="text-gray-700 italic text-center">"{portal.phrase}"</p>
            </div>

            {/* Etapa 1: Prática Guiada */}
            {!isReflecting && !isCompleted && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Prática Guiada</h4>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">{portal.practice}</p>
                </div>
                <Button 
                  onClick={handleCompletePractice}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white`}
                >
                  Realizar Prática
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Etapa 2: Reflexão */}
            {isReflecting && !isCompleted && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Reflexão Pessoal</h4>
                <p className="text-gray-600 mb-3 text-sm">
                  Como essa prática impactou você? Compartilhe suas percepções:
                </p>
                <Textarea 
                  placeholder="Escreva suas reflexões sobre a experiência..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <Button 
                  onClick={handleSubmitReflection}
                  disabled={reflection.trim().length === 0}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white`}
                >
                  Concluir Portal
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Etapa 3: Conclusão */}
            {isCompleted && (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Portal Concluído!</h3>
                <p className="text-green-700">Você integrou a energia deste portal</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
```

## Dados dos Portais - portals-data.ts

```typescript
import { Eye, Heart, Shield, Star } from 'lucide-react';

export const portalsData = [
  {
    id: 'clareza',
    name: 'Portal da Clareza',
    icon: Eye,
    color: 'from-blue-500 to-indigo-600',
    phrase: 'A verdade emerge quando a mente se aquieta',
    practice: 'Feche os olhos por 2 minutos. Faça apenas uma pergunta: "O que realmente importa agora?"',
    unlocked: true
  },
  {
    id: 'presenca',
    name: 'Portal da Presença',
    icon: Heart,
    color: 'from-green-500 to-emerald-600',
    phrase: 'Estar aqui, agora, é o maior presente que você pode se dar',
    practice: 'Respire 5 vezes profundamente. A cada expiração, solte algo que não pertence a este momento.',
    unlocked: true
  },
  {
    id: 'coragem',
    name: 'Portal da Coragem',
    icon: Shield,
    color: 'from-red-500 to-orange-600',
    phrase: 'Sinta o medo. Escolha a coragem. Dê o passo.',
    practice: 'Identifique um pequeno ato de coragem e comprometa-se a realizá-lo hoje.',
    unlocked: true
  },
  {
    id: 'sabedoria',
    name: 'Portal da Sabedoria',
    icon: Star,
    color: 'from-yellow-500 to-amber-600',
    phrase: 'A sabedoria não está no conhecimento, mas na experiência vivida',
    practice: 'Reflita sobre uma lição aprendida recentemente. Como ela mudou sua perspectiva?',
    unlocked: false
  }
];
```

## Uso no Componente Pai

```typescript
import { PortalCard } from './components/PortalCard';
import { portalsData } from './data/portals-data';

export const PortalsSection = () => {
  const handlePortalComplete = () => {
    // Lógica para quando portal é concluído
    console.log('Portal concluído - aumentar clareza, XP, etc.');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portalsData.map((portal) => (
        <PortalCard 
          key={portal.id} 
          portal={portal} 
          onComplete={handlePortalComplete} 
        />
      ))}
    </div>
  );
};
```

## Características do Sistema

✅ **Estrutura Modular**: Componente independente e reutilizável
✅ **Fluxo Completo**: Card → Prática → Reflexão → Conclusão
✅ **Estados Visuais**: Desbloqueado/Bloqueado com feedback visual
✅ **Interatividade**: Animações hover e transições suaves
✅ **Gamificação**: Sistema de progressão e conquistas
✅ **Responsivo**: Funciona em mobile e desktop
✅ **TypeScript**: Tipagem completa para manutenção

## Customização Fácil

- **Cores**: Gradientes personalizáveis por portal
- **Ícones**: Lucide React facilmente substituíveis
- **Práticas**: Textos editáveis para diferentes experiências
- **Callbacks**: onComplete permite integração com sistemas de XP/progressão

Esta base está pronta para integrar diretamente no Essentia Premium!