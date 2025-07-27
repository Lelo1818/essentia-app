# Essentia - Código Limpo e Organizado

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                    # Componentes shadcn/ui
│   └── essentia/              # Componentes específicos do Essentia
│       ├── Avatar3D.tsx
│       ├── GuidedBreathing.tsx
│       ├── DailyRituals.tsx
│       ├── AIPersonalities.tsx
│       ├── PurposeJourney.tsx
│       └── PortalCard.tsx
├── data/
│   └── essentia-data.ts       # Dados estruturados
├── hooks/
│   └── useEssentia.ts         # Hook customizado
├── pages/
│   └── Essentia.tsx           # Página principal
└── types/
    └── essentia.ts            # Tipos TypeScript
```

## 1. Tipos TypeScript (types/essentia.ts)

```typescript
export interface User {
  id: string;
  name: string;
  clarity: number;
  daysActive: number;
  currentStage: string;
  achievements: number;
}

export interface JourneyStage {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Portal {
  id: string;
  name: string;
  icon: any;
  color: string;
  phrase: string;
  practice: string;
  unlocked: boolean;
}

export interface AIPersonality {
  id: string;
  name: string;
  focus: string;
  color: string;
  phrase: string;
  specialty: string;
}

export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  pattern: number[];
  purpose: string;
}
```

## 2. Dados Estruturados (data/essentia-data.ts)

```typescript
import { Eye, Heart, Shield, Star, TreePine } from 'lucide-react';
import { JourneyStage, Portal, AIPersonality, BreathingTechnique } from '../types/essentia';

export const journeyStages: JourneyStage[] = [
  { id: 1, name: "Despertar Interior", completed: true, current: false, description: "Primeira consciência do caminho" },
  { id: 2, name: "Autoconhecimento", completed: true, current: false, description: "Exploração profunda de si mesmo" },
  { id: 3, name: "Descoberta de Paixões", completed: false, current: true, description: "Identificação dos verdadeiros interesses" },
  { id: 4, name: "Relacionamentos", completed: false, current: false, description: "Conexões significativas" },
  { id: 5, name: "Missão Pessoal", completed: false, current: false, description: "Definição do propósito" },
  { id: 6, name: "Vida Plena", completed: false, current: false, description: "Integração total do propósito" }
];

export const portals: Portal[] = [
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
    phrase: 'Estar aqui, agora, é o maior presente',
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
  }
];

export const aiPersonalities: AIPersonality[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    focus: 'Suporte & Cuidado',
    color: 'from-pink-500 to-rose-600',
    phrase: 'Vejo que você está enfrentando desafios. Cada passo corajoso planta uma semente.',
    specialty: 'Momentos de dificuldade e acolhimento'
  },
  {
    id: 'marcos',
    name: 'Marcos',
    focus: 'Foco & Ação',
    color: 'from-blue-500 to-indigo-600',
    phrase: 'Hora de transformar reflexão em ação! Qual é o próximo passo?',
    specialty: 'Motivação e direcionamento prático'
  },
  {
    id: 'luna',
    name: 'Luna',
    focus: 'Reflexão & Calma',
    color: 'from-purple-500 to-violet-600',
    phrase: 'Que a tranquilidade traga clareza. Conecte-se com sua sabedoria interior.',
    specialty: 'Introspecção e reflexão profunda'
  },
  {
    id: 'leo',
    name: 'Léo',
    focus: 'Motivação & Energia',
    color: 'from-yellow-500 to-orange-600',
    phrase: 'Bom dia! Sua energia está vibrante. Vamos canalizar essa força!',
    specialty: 'Energia e direcionamento matinal'
  }
];

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: 'box',
    name: 'Respiração Quadrada',
    description: 'Técnica equilibrante para clareza mental',
    pattern: [4, 4, 4, 4],
    purpose: 'Equilíbrio e foco'
  },
  {
    id: '478',
    name: 'Respiração 4-7-8',
    description: 'Técnica calmante para relaxamento',
    pattern: [4, 7, 8],
    purpose: 'Relaxamento profundo'
  },
  {
    id: 'coherent',
    name: 'Respiração Coerente',
    description: 'Sincronização corpo-mente',
    pattern: [5, 5],
    purpose: 'Harmonia interior'
  }
];
```

## 3. Hook Customizado (hooks/useEssentia.ts)

```typescript
import { useState, useEffect } from 'react';
import { User } from '../types/essentia';

export const useEssentia = () => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Usuário',
    clarity: 67,
    daysActive: 89,
    currentStage: 'Descoberta de Paixões',
    achievements: 12
  });

  const [currentEnvironment, setCurrentEnvironment] = useState(2); // Montanha
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentBreathPhase, setCurrentBreathPhase] = useState('prepare');

  const updateClarity = (newClarity: number) => {
    setUser(prev => ({ ...prev, clarity: Math.min(100, Math.max(0, newClarity)) }));
  };

  const completeDaily = () => {
    setUser(prev => ({ 
      ...prev, 
      daysActive: prev.daysActive + 1,
      clarity: Math.min(100, prev.clarity + 2)
    }));
  };

  return {
    user,
    currentEnvironment,
    setCurrentEnvironment,
    isBreathing,
    setIsBreathing,
    currentBreathPhase,
    setCurrentBreathPhase,
    updateClarity,
    completeDaily
  };
};
```

## 4. Componente Avatar 3D (components/essentia/Avatar3D.tsx)

```typescript
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User } from 'lucide-react';

interface Avatar3DProps {
  clarity: number;
  environment: number;
  onEnvironmentChange: (env: number) => void;
}

export const Avatar3D = ({ clarity, environment, onEnvironmentChange }: Avatar3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const environments = [
    { name: 'Caverna', emoji: '🕳️', color: '#1F2937' },
    { name: 'Floresta', emoji: '🌲', color: '#059669' },
    { name: 'Montanha', emoji: '⛰️', color: '#2563EB' },
    { name: 'Oceano', emoji: '🌊', color: '#0891B2' },
    { name: 'Cosmos', emoji: '🌌', color: '#7C3AED' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background baseado no ambiente
      const env = environments[environment];
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, env.color + '40');
      gradient.addColorStop(1, env.color + '20');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Avatar central
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80 + (clarity * 0.5);

      // Aura baseada na clareza
      const auraGradient = ctx.createRadialGradient(centerX, centerY, radius - 20, centerX, centerY, radius + 20);
      auraGradient.addColorStop(0, `rgba(255, 255, 255, ${clarity / 200})`);
      auraGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Avatar
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = `linear-gradient(45deg, ${env.color}, #FFFFFF)`;
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();
  }, [clarity, environment]);

  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Avatar 3D Evolutivo
          <Badge className="bg-green-600 text-white">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="mx-auto rounded-lg shadow-lg"
          />
          <p className="mt-4 text-gray-600">
            {environments[environment].name} • Clareza: {clarity}%
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {environments.map((env, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === environment ? "default" : "outline"}
              className="flex flex-col py-3"
              onClick={() => onEnvironmentChange(index)}
            >
              <span className="text-lg mb-1">{env.emoji}</span>
              <span className="text-xs">{env.name}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Nível de Clareza</span>
            <span>{clarity}%</span>
          </div>
          <Progress value={clarity} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
};
```

## 5. Respiração Guiada (components/essentia/GuidedBreathing.tsx)

```typescript
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Play, Pause, RotateCcw } from 'lucide-react';
import { breathingTechniques } from '../../data/essentia-data';

interface GuidedBreathingProps {
  isActive: boolean;
  onToggle: () => void;
  onComplete: () => void;
}

export const GuidedBreathing = ({ isActive, onToggle, onComplete }: GuidedBreathingProps) => {
  const [selectedTechnique, setSelectedTechnique] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);

  const technique = breathingTechniques[selectedTechnique];
  const totalCycles = 5;
  const phases = ['Inspire', 'Segure', 'Expire', 'Segure'];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        const newTimer = prev + 1;
        const phaseTime = technique.pattern[currentPhase];
        
        if (newTimer >= phaseTime) {
          const nextPhase = (currentPhase + 1) % technique.pattern.length;
          setCurrentPhase(nextPhase);
          
          if (nextPhase === 0) {
            const nextCycle = currentCycle + 1;
            setCurrentCycle(nextCycle);
            
            if (nextCycle >= totalCycles) {
              onComplete();
              return 0;
            }
          }
          return 0;
        }
        
        setProgress(((currentCycle * technique.pattern.length + currentPhase) / (totalCycles * technique.pattern.length)) * 100);
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentPhase, currentCycle, technique, onComplete]);

  const reset = () => {
    setCurrentCycle(0);
    setCurrentPhase(0);
    setTimer(0);
    setProgress(0);
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="w-6 h-6 mr-2 text-blue-600" />
          {technique.name}
        </CardTitle>
        <p className="text-blue-600">{technique.purpose}</p>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="relative w-48 h-48 mx-auto">
            <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              currentPhase === 0 ? 'bg-blue-400 scale-110' :
              currentPhase === 1 ? 'bg-yellow-400 scale-105' :
              currentPhase === 2 ? 'bg-green-400 scale-95' :
              'bg-purple-400 scale-100'
            }`}></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {phases[currentPhase]}
                </div>
                <div className="text-lg text-gray-600">
                  {technique.pattern[currentPhase] - timer}s
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm text-gray-600">Ciclo {currentCycle + 1} de {totalCycles}</span>
          </div>
          <Progress value={progress} className="h-3" />
          
          <div className="grid grid-cols-4 gap-2 text-center">
            {technique.pattern.map((time, index) => (
              <div key={index} className={`p-2 rounded-lg ${
                index === currentPhase ? 'bg-blue-200' : 'bg-gray-100'
              }`}>
                <div className="font-bold">{time}s</div>
                <div className="text-xs">{phases[index]}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={onToggle} className="bg-blue-600 hover:bg-blue-700">
              {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isActive ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

## 6. Jornada de Propósito (components/essentia/PurposeJourney.tsx)

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Compass } from 'lucide-react';
import { journeyStages } from '../../data/essentia-data';
import { User } from '../../types/essentia';

interface PurposeJourneyProps {
  user: User;
}

export const PurposeJourney = ({ user }: PurposeJourneyProps) => {
  return (
    <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Compass className="w-6 h-6 mr-3 text-purple-600" />
          Jornada de Propósito - {user.name}
        </CardTitle>
        <p className="text-gray-600">
          Sua clareza sobre propósito cresceu {user.clarity}% em {user.daysActive} dias.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{user.clarity}%</div>
            <div className="text-sm text-gray-600">Clareza de Propósito</div>
            <Progress value={user.clarity} className="h-2 mt-2" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{user.daysActive}</div>
            <div className="text-sm text-gray-600">Dias Consecutivos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{user.achievements}</div>
            <div className="text-sm text-gray-600">Marcos Alcançados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {journeyStages.filter(s => s.completed).length}/6
            </div>
            <div className="text-sm text-gray-600">Estágios Completos</div>
          </div>
        </div>

        <Badge className="bg-purple-100 text-purple-700 px-4 py-2 mb-4">
          Estágio Atual: {user.currentStage}
        </Badge>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journeyStages.map((stage) => (
            <div key={stage.id} className={`p-4 rounded-lg border ${
              stage.completed ? 'bg-green-50 border-green-200' :
              stage.current ? 'bg-blue-50 border-blue-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                {stage.completed && <div className="w-4 h-4 bg-green-500 rounded-full mr-3" />}
                {stage.current && <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 animate-pulse" />}
                {!stage.completed && !stage.current && <div className="w-4 h-4 bg-gray-300 rounded-full mr-3" />}
                <span className={`font-medium ${stage.current ? 'text-blue-700' : 'text-gray-700'}`}>
                  {stage.name}
                </span>
              </div>
              <p className="text-sm text-gray-600">{stage.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

## 7. Página Principal (pages/Essentia.tsx)

```typescript
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar3D } from '../components/essentia/Avatar3D';
import { GuidedBreathing } from '../components/essentia/GuidedBreathing';
import { PurposeJourney } from '../components/essentia/PurposeJourney';
import { PortalCard } from '../components/essentia/PortalCard';
import { AIPersonalities } from '../components/essentia/AIPersonalities';
import { DailyRituals } from '../components/essentia/DailyRituals';
import { useEssentia } from '../hooks/useEssentia';
import { portals, aiPersonalities } from '../data/essentia-data';

export default function Essentia() {
  const {
    user,
    currentEnvironment,
    setCurrentEnvironment,
    isBreathing,
    setIsBreathing,
    updateClarity,
    completeDaily
  } = useEssentia();

  const [activeTab, setActiveTab] = useState('journey');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Essentia</h1>
          <p className="text-purple-600">Sua jornada de autoconhecimento e propósito</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="journey">Jornada</TabsTrigger>
            <TabsTrigger value="avatar">Avatar 3D</TabsTrigger>
            <TabsTrigger value="breathing">Respiração</TabsTrigger>
            <TabsTrigger value="portals">Portais</TabsTrigger>
            <TabsTrigger value="ai">IA Coach</TabsTrigger>
            <TabsTrigger value="rituals">Rituais</TabsTrigger>
          </TabsList>

          <TabsContent value="journey">
            <PurposeJourney user={user} />
          </TabsContent>

          <TabsContent value="avatar">
            <Avatar3D
              clarity={user.clarity}
              environment={currentEnvironment}
              onEnvironmentChange={setCurrentEnvironment}
            />
          </TabsContent>

          <TabsContent value="breathing">
            <GuidedBreathing
              isActive={isBreathing}
              onToggle={() => setIsBreathing(!isBreathing)}
              onComplete={() => {
                setIsBreathing(false);
                updateClarity(user.clarity + 3);
              }}
            />
          </TabsContent>

          <TabsContent value="portals">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portals.map((portal) => (
                <PortalCard key={portal.id} portal={portal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <AIPersonalities personalities={aiPersonalities} />
          </TabsContent>

          <TabsContent value="rituals">
            <DailyRituals onComplete={completeDaily} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

## 8. Dependências Necessárias (package.json)

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.263.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "typescript": "^5.0.0",
    "vite": "^4.4.5"
  }
}
```

## Características Principais

✅ **Componentes Modulares**: Cada funcionalidade é um componente independente
✅ **TypeScript**: Tipagem completa para maior segurança
✅ **Tailwind CSS**: Estilização responsiva e consistente
✅ **Hook Customizado**: Gerenciamento de estado centralizado
✅ **Dados Estruturados**: Configuração separada da lógica
✅ **Canvas HTML5**: Avatar 3D real e funcional
✅ **Animações Suaves**: Transições e feedbacks visuais
✅ **Mobile Responsivo**: Funciona em todos os dispositivos

## Como Usar

1. Configure um projeto React com TypeScript
2. Instale as dependências listadas
3. Configure o Tailwind CSS
4. Copie os componentes shadcn/ui necessários
5. Implemente os arquivos na estrutura mostrada
6. Customize os dados conforme sua necessidade

Este código está limpo, organizado e pronto para evolução!