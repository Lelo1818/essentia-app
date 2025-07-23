import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, Play, Mountain, Eye, Shield, Target, Flame, ArrowRight, 
  BookOpen, Calendar, LifeBuoy, Home, Compass, Moon, Sun, Heart,
  Zap, User, Settings, Volume2
} from 'lucide-react';

export default function EssentiaDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Demo steps configuration
  const demoSteps = [
    {
      id: 'welcome',
      title: 'Tela de Boas-vindas',
      description: 'Primeira impressão do usuário ao acessar o Essentia',
      duration: 3000
    },
    {
      id: 'questionnaire',
      title: 'Questionário Personalizado',
      description: 'Sistema de perguntas para descobrir perfil do usuário',
      duration: 4000
    },
    {
      id: 'journey',
      title: 'Jornada Principal - Portais',
      description: 'Hub central com os 7 portais temáticos',
      duration: 4000
    },
    {
      id: 'portal-coragem',
      title: 'Portal da Coragem - Interativo',
      description: 'Experiência completa do portal mais desenvolvido',
      duration: 5000
    },
    {
      id: 'diary',
      title: 'Diário Pessoal',
      description: 'Sistema de reflexões e acompanhamento',
      duration: 3000
    },
    {
      id: 'ai-interactions',
      title: 'Guias de IA - Sofia, Marcos, Luna, Léo',
      description: 'Demonstração das personalidades de IA',
      duration: 4000
    },
    {
      id: 'final',
      title: 'Visão Completa do Sistema',
      description: 'Resumo das funcionalidades implementadas',
      duration: 2000
    }
  ];

  // Auto-advance functionality
  useEffect(() => {
    if (autoAdvance && isPlaying && currentStep < demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, demoSteps[currentStep].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep, autoAdvance, isPlaying, demoSteps]);

  const startDemo = () => {
    setIsPlaying(true);
    setAutoAdvance(true);
    setCurrentStep(0);
  };

  const pauseDemo = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
    setAutoAdvance(false);
  };

  // Render current demo step
  const renderCurrentStep = () => {
    const step = demoSteps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
            <div className="flex items-center justify-center p-6 min-h-screen">
              <Card className="max-w-2xl w-full shadow-2xl border-0 backdrop-blur-sm bg-white/95">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-5xl font-bold text-slate-900 mb-4">
                    Essentia
                  </CardTitle>
                  <p className="text-xl text-slate-600 mb-8">
                    Desvende sua essência um símbolo de cada vez
                  </p>
                  
                  <div className="space-y-4">
                    <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 text-lg font-semibold rounded-xl w-full">
                      <Play className="w-5 h-5 mr-2" />
                      Começar Minha Jornada
                    </Button>
                    
                    <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl w-full">
                      <Mountain className="w-5 h-5 mr-2" />
                      Explorar Trilhas Temáticas
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );

      case 'questionnaire':
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
                <CardHeader className="text-center pb-6">
                  <Progress value={60} className="w-full mb-4" />
                  <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                    Questão 3 de 5
                  </CardTitle>
                  <p className="text-xl text-slate-700">
                    O que mais te motiva no dia a dia?
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Button variant="outline" size="lg" className="p-4 text-lg font-medium hover:bg-purple-50">
                      Resolver problemas complexos
                    </Button>
                    <Button variant="outline" size="lg" className="p-4 text-lg font-medium hover:bg-purple-50">
                      Ajudar outras pessoas
                    </Button>
                    <Button variant="outline" size="lg" className="p-4 text-lg font-medium hover:bg-purple-50">
                      Criar algo novo
                    </Button>
                    <Button variant="outline" size="lg" className="p-4 text-lg font-medium hover:bg-purple-50">
                      Superar meus limites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'journey':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-20">
            <div className="p-6">
              <div className="max-w-4xl mx-auto mb-6">
                <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Sua Jornada Essentia</CardTitle>
                    <p className="text-slate-600 mt-2">Explore os portais para descobrir diferentes aspectos de si mesmo</p>
                  </CardHeader>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                {[
                  { name: 'Portal da Coragem', icon: Shield, color: 'from-red-500 to-orange-600', completed: true },
                  { name: 'Portal da Clareza', icon: Eye, color: 'from-blue-500 to-cyan-600', completed: false },
                  { name: 'Portal da Presença', icon: Target, color: 'from-green-500 to-emerald-600', completed: false },
                  { name: 'Portal da Gratidão', icon: Heart, color: 'from-pink-500 to-rose-600', completed: false },
                  { name: 'Portal da Criatividade', icon: Sparkles, color: 'from-purple-500 to-violet-600', completed: false },
                  { name: 'Portal da Conexão', icon: Settings, color: 'from-indigo-500 to-blue-600', completed: false }
                ].map((portal, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                            <portal.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{portal.name}</h3>
                            {portal.completed && (
                              <Badge className="bg-green-500 text-white mt-1">Concluído ✓</Badge>
                            )}
                          </div>
                        </div>
                        
                        <Button className={`bg-gradient-to-r ${portal.color} text-white`}>
                          {portal.completed ? 'Revisitar' : 'Entrar'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'portal-coragem':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 p-6">
            <div className="flex items-center justify-center min-h-screen">
              <Card className="max-w-3xl w-full shadow-2xl border-0 backdrop-blur-sm bg-white/95">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-5xl font-bold text-slate-900 mb-6">
                    Portal da Coragem
                  </CardTitle>
                  <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
                    <span className="font-semibold text-red-600">Sinta o medo. Escolha a coragem. Dê o passo.</span>
                  </p>
                </CardHeader>

                <CardContent className="text-center space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
                      <Mountain className="w-8 h-8 text-red-600 mx-auto mb-3" />
                      <h3 className="font-bold text-slate-800 mb-2">Supere Obstáculos</h3>
                      <p className="text-sm text-slate-600">Transforme hesitação em movimento</p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl">
                      <Target className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <h3 className="font-bold text-slate-800 mb-2">Tome Decisões</h3>
                      <p className="text-sm text-slate-600">Converta intenção em atitude</p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl">
                      <Flame className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <h3 className="font-bold text-slate-800 mb-2">Inicie Ciclos</h3>
                      <p className="text-sm text-slate-600">Dê o primeiro passo com confiança</p>
                    </div>
                  </div>

                  <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-12 py-6 text-xl font-bold rounded-2xl">
                    <Eye className="w-6 h-6 mr-3" />
                    Despertar Minha Coragem
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'diary':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
            <div className="p-6">
              <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 mb-6 max-w-4xl mx-auto">
                <CardHeader className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <CardTitle className="text-2xl font-bold text-slate-900">Diário Essentia</CardTitle>
                  <div className="mt-4 p-3 bg-green-50 rounded-xl">
                    <p className="text-green-800 font-semibold">🌱 7 dias consecutivos de escrita</p>
                  </div>
                </CardHeader>
              </Card>

              <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95 mb-6 max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <label className="text-lg font-semibold text-slate-800 block">
                      Como foi seu dia? O que você descobriu sobre si?
                    </label>
                    <Textarea
                      placeholder="Hoje enfrentei meus medos sobre aquela apresentação. Percebi que a coragem não é ausência de medo, mas agir mesmo com ele presente..."
                      className="min-h-[200px] text-lg p-4 border-2 border-purple-200 rounded-xl"
                      value="Hoje enfrentei meus medos sobre aquela apresentação. Percebi que a coragem não é ausência de medo, mas agir mesmo com ele presente..."
                      readOnly
                    />
                    
                    <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white w-full">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Salvar Reflexão
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'ai-interactions':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
            <div className="max-w-6xl mx-auto">
              <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-slate-900 mb-4">Guias de IA Personalalizados</CardTitle>
                  <p className="text-lg text-slate-600">Cada personalidade oferece suporte único em sua jornada</p>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Sofia',
                    role: 'Suporte & Cuidado',
                    icon: Heart,
                    color: 'from-pink-500 to-rose-600',
                    message: 'Vejo que você está enfrentando desafios. Lembre-se: cada passo corajoso que você dá planta uma semente de transformação.',
                    bgColor: 'from-pink-50 to-rose-50'
                  },
                  {
                    name: 'Marcos',
                    role: 'Foco & Ação',
                    icon: Compass,
                    color: 'from-blue-500 to-indigo-600',
                    message: 'Hora de transformar reflexão em ação! Qual é o próximo passo concreto que você pode dar hoje?',
                    bgColor: 'from-blue-50 to-indigo-50'
                  },
                  {
                    name: 'Luna',
                    role: 'Reflexão & Calma',
                    icon: Moon,
                    color: 'from-purple-500 to-violet-600',
                    message: 'Que a tranquilidade da noite traga clareza. Respire fundo e conecte-se com sua sabedoria interior.',
                    bgColor: 'from-purple-50 to-violet-50'
                  },
                  {
                    name: 'Léo',
                    role: 'Motivação & Energia',
                    icon: Sun,
                    color: 'from-yellow-500 to-orange-600',
                    message: 'Bom dia, campeão! Sua energia matinal está vibrante. Vamos canalizar essa força em conquistas reais!',
                    bgColor: 'from-yellow-50 to-orange-50'
                  }
                ].map((ai, index) => (
                  <Card key={index} className="shadow-lg border-0 backdrop-blur-sm bg-white/95">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${ai.color} rounded-full flex items-center justify-center`}>
                          <ai.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900">{ai.name}</CardTitle>
                          <p className="text-sm text-slate-600">{ai.role}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className={`p-4 bg-gradient-to-r ${ai.bgColor} rounded-xl mb-4`}>
                        <p className="text-slate-700 italic">"{ai.message}"</p>
                      </div>
                      <Button size="sm" className={`bg-gradient-to-r ${ai.color} text-white`}>
                        Conversar com {ai.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'final':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
                <CardHeader className="text-center pb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-slate-900 mb-4">
                    Essentia Demo Completa
                  </CardTitle>
                  <p className="text-xl text-slate-600 mb-8">
                    Funcionalidades implementadas e funcionando
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { feature: 'Sistema de Boas-vindas', status: '✅ Completo' },
                      { feature: 'Questionário Personalizado', status: '✅ Completo' },
                      { feature: '7 Portais Temáticos', status: '✅ Completo' },
                      { feature: 'Portal da Coragem Interativo', status: '✅ Completo' },
                      { feature: 'Sistema de Diário', status: '✅ Completo' },
                      { feature: '4 Personalidades de IA', status: '✅ Completo' },
                      { feature: 'Navegação Responsiva', status: '✅ Completo' },
                      { feature: 'Avatar 3D Evolutivo', status: '✅ Completo' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-slate-800">{item.feature}</span>
                        <Badge className="bg-green-500 text-white">{item.status}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-6">
                    <p className="text-lg text-slate-700 mb-4">
                      <strong>MVP Essentia:</strong> Sistema completo de autoconhecimento com IA personalizada
                    </p>
                    <Button onClick={() => window.location.href = '/purpose'} size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4">
                      Acessar Essentia Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Etapa não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Demo Control Panel */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95 w-80">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-900">Demo Essentia</CardTitle>
              <Badge className="bg-purple-500 text-white">
                {currentStep + 1}/{demoSteps.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">{demoSteps[currentStep].title}</h4>
              <p className="text-sm text-slate-600">{demoSteps[currentStep].description}</p>
            </div>

            <Progress value={((currentStep + 1) / demoSteps.length) * 100} className="w-full" />

            <div className="flex space-x-2">
              {!isPlaying ? (
                <Button onClick={startDemo} size="sm" className="bg-green-500 text-white">
                  <Play className="w-4 h-4 mr-1" />
                  {currentStep === 0 ? 'Iniciar' : 'Continuar'}
                </Button>
              ) : (
                <Button onClick={pauseDemo} size="sm" variant="outline">
                  <Volume2 className="w-4 h-4 mr-1" />
                  Pausar
                </Button>
              )}
              
              <Button onClick={prevStep} disabled={currentStep === 0} size="sm" variant="outline">
                ←
              </Button>
              
              <Button onClick={nextStep} disabled={currentStep === demoSteps.length - 1} size="sm" variant="outline">
                →
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {demoSteps.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => goToStep(index)}
                  size="sm"
                  variant={currentStep === index ? "default" : "outline"}
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
      {renderCurrentStep()}
    </div>
  );
}