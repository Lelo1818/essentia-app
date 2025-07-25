import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Compass, Heart, Target, TrendingUp, Users, Lightbulb, Brain, Star, User, Sparkles,
  Play, Pause, RotateCcw, Eye, Shield, Mountain, ArrowRight, Zap, 
  BookOpen, Home, Calendar, LifeBuoy, Moon, Sun, TreePine, Waves
} from 'lucide-react';

export default function EssentiaOficialDemo() {
  const [currentDemo, setCurrentDemo] = useState('overview');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  // Dados reais do sistema Essentia
  const userData = {
    name: "Lelão",
    role: "Explorador Interior",
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

  const realPortals = [
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
    }
  ];

  const aiPersonalities = [
    { 
      id: 'sofia', 
      name: 'Sofia', 
      focus: 'Suporte & Cuidado', 
      color: 'from-pink-500 to-rose-600',
      phrase: 'Vejo que você está enfrentando desafios. Lembre-se: cada passo corajoso que você dá planta uma semente de transformação.',
      specialty: 'Momentos de dificuldade e necessidade de acolhimento'
    },
    { 
      id: 'marcos', 
      name: 'Marcos', 
      focus: 'Foco & Ação', 
      color: 'from-blue-500 to-indigo-600',
      phrase: 'Hora de transformar reflexão em ação! Qual é o próximo passo concreto que você pode dar hoje?',
      specialty: 'Motivação e direcionamento para ações práticas'
    },
    { 
      id: 'luna', 
      name: 'Luna', 
      focus: 'Reflexão & Calma', 
      color: 'from-purple-500 to-violet-600',
      phrase: 'Que a tranquilidade da noite traga clareza. Respire fundo e conecte-se com sua sabedoria interior.',
      specialty: 'Momentos de introspecção e reflexão profunda'
    },
    { 
      id: 'leo', 
      name: 'Léo', 
      focus: 'Motivação & Energia', 
      color: 'from-yellow-500 to-orange-600',
      phrase: 'Bom dia, campeão! Sua energia matinal está vibrante. Vamos canalizar essa força em conquistas reais!',
      specialty: 'Energia, clareza e direcionamento matinal'
    }
  ];

  const realFeatures = [
    {
      name: 'Jornada de Propósito',
      description: 'Sistema de 6 estágios evolutivos com progresso personalizado',
      implemented: true,
      component: 'journey-phases'
    },
    {
      name: 'Avatar 3D Evolutivo',
      description: 'Canvas HTML5 com 5 ambientes que evoluem conforme clareza',
      implemented: true,
      component: 'avatar-3d-display'
    },
    {
      name: 'Respiração Guiada',
      description: '3 técnicas de respiração com timer e fases automáticas',
      implemented: true,
      component: 'guided-breathing'
    },
    {
      name: 'Rituais Diários',
      description: 'Práticas de abertura e fechamento personalizadas',
      implemented: true,
      component: 'daily-rituals'
    },
    {
      name: 'Coach de IA',
      description: 'IA que analisa padrões e oferece insights personalizados',
      implemented: true,
      component: 'ai-coach'
    },
    {
      name: 'Portais Temáticos',
      description: 'Experiências imersivas para diferentes aspectos do crescimento',
      implemented: true,
      component: 'portais'
    },
    {
      name: 'Janelas Essentia',
      description: 'Momentos contemplativos que surgem durante atividades',
      implemented: true,
      component: 'essentia-window'
    },
    {
      name: 'Terapeuta de IA',
      description: 'Conversas terapêuticas profundas com IA especializada',
      implemented: true,
      component: 'ai-therapist'
    }
  ];

  const demoSteps = [
    { id: 'overview', title: 'Visão Geral', duration: 4000 },
    { id: 'dashboard', title: 'Dashboard Principal', duration: 5000 },
    { id: 'avatar3d', title: 'Avatar 3D', duration: 4000 },
    { id: 'breathing', title: 'Respiração Guiada', duration: 5000 },
    { id: 'portals', title: 'Portais', duration: 4000 },
    { id: 'ai-personalities', title: 'IAs Personalizadas', duration: 5000 },
    { id: 'features', title: 'Funcionalidades', duration: 3000 }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const currentStepIndex = demoSteps.findIndex(step => step.id === currentDemo);
      const currentStepDuration = demoSteps[currentStepIndex]?.duration || 4000;
      
      const timer = setTimeout(() => {
        const nextIndex = (currentStepIndex + 1) % demoSteps.length;
        setCurrentDemo(demoSteps[nextIndex].id);
        setDemoProgress(((nextIndex + 1) / demoSteps.length) * 100);
      }, currentStepDuration);

      return () => clearTimeout(timer);
    }
  }, [currentDemo, isAutoPlaying]);

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  <Compass className="w-8 h-8 mx-auto mb-4 text-purple-600" />
                  Essentia - Sistema Oficial
                </CardTitle>
                <p className="text-center text-lg text-gray-700">
                  Plataforma completa de desenvolvimento pessoal e descoberta de propósito
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{userData.daysActive}</div>
                    <div className="text-sm text-gray-600">Dias Ativos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{userData.clarity}%</div>
                    <div className="text-sm text-gray-600">Clareza</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">{userData.achievements}</div>
                    <div className="text-sm text-gray-600">Conquistas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">8</div>
                    <div className="text-sm text-gray-600">Módulos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Compass className="w-6 h-6 mr-3 text-purple-600" />
                  Jornada de Propósito - {userData.name}
                </CardTitle>
                <p className="text-gray-600">
                  Sua clareza sobre propósito cresceu {userData.clarity}% em {userData.daysActive} dias.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{userData.clarity}%</div>
                    <div className="text-sm text-gray-600">Clareza de Propósito</div>
                    <Progress value={userData.clarity} className="h-2 mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{userData.daysActive}</div>
                    <div className="text-sm text-gray-600">Dias Consecutivos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{userData.achievements}</div>
                    <div className="text-sm text-gray-600">Marcos Alcançados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">3/6</div>
                    <div className="text-sm text-gray-600">Estágios Completos</div>
                  </div>
                </div>

                <Badge className="bg-purple-100 text-purple-700 px-4 py-2 mb-4">
                  Estágio Atual: {userData.stage}
                </Badge>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {journeyStages.slice(0, 4).map((stage) => (
                    <div key={stage.id} className={`p-4 rounded-lg border ${
                      stage.completed ? 'bg-green-50 border-green-200' :
                      stage.current ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center">
                        {stage.completed && <div className="w-4 h-4 bg-green-500 rounded-full mr-3" />}
                        {stage.current && <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 animate-pulse" />}
                        {!stage.completed && !stage.current && <div className="w-4 h-4 bg-gray-300 rounded-full mr-3" />}
                        <span className={`font-medium ${stage.current ? 'text-blue-700' : 'text-gray-700'}`}>
                          {stage.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'avatar3d':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Avatar 3D em Tempo Real
                  <Badge className="bg-green-600 text-white animate-pulse">
                    Live Canvas
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="relative w-64 h-64 mx-auto bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-pulse">
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-24 h-24 text-white animate-bounce" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ping"></div>
                  </div>
                  <p className="mt-4 text-gray-600">Ambiente: Pico da Clareza • Clareza: {userData.clarity}%</p>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  {[
                    { name: 'Caverna', emoji: '🕳️', color: 'from-gray-800 to-stone-900' },
                    { name: 'Floresta', emoji: '🌲', color: 'from-green-600 to-emerald-800' },
                    { name: 'Montanha', emoji: '⛰️', color: 'from-blue-600 to-indigo-800' },
                    { name: 'Oceano', emoji: '🌊', color: 'from-cyan-600 to-blue-900' },
                    { name: 'Cosmos', emoji: '🌌', color: 'from-purple-600 to-pink-900' }
                  ].map((env, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={index === 2 ? "default" : "outline"}
                      className="text-xs flex flex-col py-3"
                    >
                      <span className="text-lg mb-1">{env.emoji}</span>
                      {env.name}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nível de Clareza</span>
                    <span>{userData.clarity}%</span>
                  </div>
                  <Progress value={userData.clarity} className="h-3" />
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Avatar 3D Features:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Canvas HTML5 com animações em tempo real</li>
                    <li>• 5 ambientes evolutivos interativos</li>
                    <li>• Sistema de partículas dinâmicas</li>
                    <li>• Aura que evolui com o nível de clareza</li>
                    <li>• Rotação e respiração contínuas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'breathing':
        return (
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-blue-600" />
                  Respiração Guiada - Clareza Mental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <div className="text-2xl font-bold text-blue-600 animate-bounce">
                        Inspire
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-blue-700 font-medium">
                    "Inspire pela clareza, expire a confusão"
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progresso do Ciclo</span>
                    <span className="text-sm text-gray-600">Ciclo 3 de 5</span>
                  </div>
                  <Progress value={60} className="h-3" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <div className="font-bold text-blue-600">4s</div>
                      <div className="text-sm text-blue-600">Inspire</div>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <div className="font-bold text-yellow-600">4s</div>
                      <div className="text-sm text-yellow-600">Segure</div>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <div className="font-bold text-green-600">6s</div>
                      <div className="text-sm text-green-600">Expire</div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </Button>
                    <Button variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </Button>
                    <Button variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'portals':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Portais da Jornada</CardTitle>
                <p className="text-center text-gray-600">
                  Experiências imersivas para diferentes aspectos do crescimento
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {realPortals.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <Card key={portal.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{portal.name}</h3>
                          <p className="text-sm text-gray-600 italic mb-4">"{portal.phrase}"</p>
                          <div className="text-xs text-gray-500 mb-4">
                            {portal.practice}
                          </div>
                          <Button className={`bg-gradient-to-r ${portal.color} text-white w-full`}>
                            Entrar no Portal
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'ai-personalities':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Guias de IA Personalizados</CardTitle>
                <p className="text-center text-gray-600">
                  4 personalidades especializadas que se adaptam às suas necessidades
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiPersonalities.map((ai) => (
                    <Card key={ai.id} className="border-2 hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${ai.color} rounded-full flex items-center justify-center`}>
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{ai.name}</CardTitle>
                            <p className="text-sm text-gray-600">{ai.focus}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className={`p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl mb-4 border-l-4 ${ai.color.replace('from-', 'border-').split(' ')[0]}`}>
                          <p className="text-gray-700 italic text-sm">"{ai.phrase}"</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                          <strong>Especialidade:</strong> {ai.specialty}
                        </p>
                        <Button size="sm" className={`bg-gradient-to-r ${ai.color} text-white w-full`}>
                          Conversar com {ai.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Funcionalidades Implementadas</CardTitle>
                <p className="text-center text-gray-600">
                  Sistema completo de desenvolvimento pessoal
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {realFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">{feature.name}</h4>
                        <p className="text-sm text-green-700">{feature.description}</p>
                        <Badge className="mt-2 bg-green-600 text-white text-xs">
                          Implementado
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Acesso ao Sistema Completo:</h4>
                  <div className="flex space-x-4">
                    <Button onClick={() => window.location.href = '/purpose'} className="bg-purple-600 hover:bg-purple-700">
                      <Compass className="w-4 h-4 mr-2" />
                      Essentia Principal
                    </Button>
                    <Button onClick={() => window.location.href = '/portais'} variant="outline" className="border-purple-300 text-purple-700">
                      <Shield className="w-4 h-4 mr-2" />
                      Portais Interativos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Demo não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95 w-80">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-900">Demo Essentia Oficial</CardTitle>
              <Badge className="bg-purple-500 text-white">
                {demoSteps.findIndex(s => s.id === currentDemo) + 1}/{demoSteps.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">
                {demoSteps.find(s => s.id === currentDemo)?.title}
              </h4>
              <p className="text-sm text-slate-600">
                Sistema real implementado e funcionando
              </p>
            </div>

            <Progress value={demoProgress} className="w-full" />

            <div className="flex space-x-2">
              <Button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)} 
                size="sm" 
                className={isAutoPlaying ? "bg-red-500 text-white" : "bg-green-500 text-white"}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isAutoPlaying ? 'Pausar' : 'Auto-Play'}
              </Button>
              
              <Button 
                onClick={() => {
                  const currentIndex = demoSteps.findIndex(s => s.id === currentDemo);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : demoSteps.length - 1;
                  setCurrentDemo(demoSteps[prevIndex].id);
                }}
                size="sm" 
                variant="outline"
              >
                ←
              </Button>
              
              <Button 
                onClick={() => {
                  const currentIndex = demoSteps.findIndex(s => s.id === currentDemo);
                  const nextIndex = (currentIndex + 1) % demoSteps.length;
                  setCurrentDemo(demoSteps[nextIndex].id);
                }}
                size="sm" 
                variant="outline"
              >
                →
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {demoSteps.map((step, index) => (
                <Button
                  key={step.id}
                  onClick={() => {
                    setCurrentDemo(step.id);
                    setIsAutoPlaying(false);
                  }}
                  size="sm"
                  variant={currentDemo === step.id ? "default" : "outline"}
                  className="px-2 py-1 text-xs"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Content */}
      <div className="max-w-6xl mx-auto">
        {renderCurrentDemo()}
      </div>
    </div>
  );
}