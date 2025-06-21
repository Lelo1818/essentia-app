import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Sparkles, GraduationCap, TrendingUp, Baby, Play, Pause, 
  Volume2, VolumeX, Rocket, Star, Zap, Brain, Heart, 
  Users, Award, Target, TrendingUp as Growth, DollarSign
} from "lucide-react";

const DEMO_SCENARIOS = [
  {
    id: "transformation",
    title: "Despertar do Propósito",
    subtitle: "Sarah, 34 anos, executiva em crise existencial",
    app: "Essentia",
    duration: "60 segundos",
    color: "from-purple-600 to-pink-600",
    icon: Sparkles,
    steps: [
      { time: 0, text: "Sarah acorda 5:30 AM após noite mal dormida, questionando sua vida", mood: "😔" },
      { time: 8, text: "Abre Essentia - Avatar 3D detecta energia baixa e sugere ritual matinal", mood: "🌅" },
      { time: 16, text: "Respiração âncora-presente: 4-7-8, conecta com momento atual", mood: "😌" },
      { time: 24, text: "Conteúdo Rômulo Nomad: 'Seu trabalho atual é portal ou prisão?'", mood: "💭" },
      { time: 32, text: "Exercício: escreve carta para si mesma aos 80 anos", mood: "✍️" },
      { time: 40, text: "Avatar evolui para ambiente montanhoso - clareza +23%", mood: "🏔️" },
      { time: 48, text: "Insight: 'Quero ajudar empresas a serem mais humanas'", mood: "💡" },
      { time: 56, text: "Sarah agenda reunião com RH para propor novo projeto", mood: "✨" }
    ],
    impact: { wellbeing: "+156%", anxiety: "-78%", clarity: "+234%" }
  },
  {
    id: "learning",
    title: "Revolução do Aprendizado",
    subtitle: "Pedro, 28 anos, dev que quer virar cientista de dados",
    app: "EduVie",
    duration: "55 segundos",
    color: "from-blue-600 to-indigo-600",
    icon: GraduationCap,
    steps: [
      { time: 0, text: "Pedro frustrando com tutorials genéricos de ML que não 'grudam'", mood: "😤" },
      { time: 7, text: "EduVie analisa: visual learner, prefere projetos reais, 3h/dia disponível", mood: "🔍" },
      { time: 14, text: "IA cria trilha personalizada: ML aplicado ao seu hobby de fotografia", mood: "📸" },
      { time: 21, text: "Primeiro desafio: classificar suas próprias fotos por emoção", mood: "🤖" },
      { time: 28, text: "Gamificação: desbloqueou 'Pattern Detective' - dopamina ativada!", mood: "🎮" },
      { time: 35, text: "Sistema detecta dificuldade em matemática, conecta com mentor", mood: "🤝" },
      { time: 42, text: "Mentor explica conceitos com analogias visuais que Pedro entende", mood: "💡" },
      { time: 49, text: "Projeto final: app que detecta humor em selfies - 94% accuracy!", mood: "🏆" },
      { time: 54, text: "Pedro recebe proposta de emprego de empresa que viu seu projeto", mood: "🚀" }
    ],
    impact: { retention: "+89%", completion: "+67%", satisfaction: "+145%" }
  },
  {
    id: "financial",
    title: "Transformação Financeira 360°",
    subtitle: "Família Santos: caos financeiro → independência",
    app: "Flow + Flow Kids",
    duration: "70 segundos",
    color: "from-green-600 to-emerald-600",
    icon: TrendingUp,
    steps: [
      { time: 0, text: "Família Santos: R$ 18mil de dívidas, discussões sobre dinheiro toda semana", mood: "😰" },
      { time: 8, text: "Flow escaneia extratos: 47% gastos desnecessários identificados", mood: "📊" },
      { time: 16, text: "IA sugere: cortar streaming duplicado, delivery, cartão de crédito", mood: "✂️" },
      { time: 24, text: "Flow Kids para as crianças: 'Vamos jogar o jogo da família rica!'", mood: "🎮" },
      { time: 32, text: "Filha de 8 anos: 'Pai, por que compramos 3 Netflix?' - momento revelador", mood: "😅" },
      { time: 40, text: "Gamificação familiar: quem economiza mais ganha pontos para pizza", mood: "🍕" },
      { time: 48, text: "Mês 1: -R$ 3,2mil gastos, +R$ 800 reserva de emergência", mood: "💰" },
      { time: 56, text: "Mês 3: dívidas -65%, filho de 12 anos ensina colega sobre juros", mood: "📚" },
      { time: 64, text: "Mês 6: família planeja viagem para Disney com dinheiro 'sobrado'", mood: "🏰" },
      { time: 69, text: "Flow sugere: 'Que tal investir parte dessa reserva?'", mood: "📈" }
    ],
    impact: { debt: "-65%", savings: "+180%", financial_literacy: "+120%" }
  },
  {
    id: "kids",
    title: "Educação Financeira Lúdica",
    subtitle: "Ana, 9 anos, aprendendo o valor do dinheiro",
    app: "Flow Kids",
    duration: "45 segundos",
    color: "from-orange-600 to-yellow-600",
    icon: Baby,
    steps: [
      { time: 0, text: "Ana sempre pede brinquedos, não entende 'não temos dinheiro'", mood: "😢" },
      { time: 6, text: "Flow Kids apresenta: 'Aventura no Reino dos Reais!'", mood: "👑" },
      { time: 12, text: "Avatar explica: cada real é um soldadinho com missões específicas", mood: "🪖" },
      { time: 18, text: "Jogo: Ana distribui soldadinhos entre casa, comida, diversão", mood: "🏠" },
      { time: 24, text: "Realidade aumentada: Ana vê quanto trabalho = cada brinquedo", mood: "👀" },
      { time: 30, text: "Ana para de pedir brinquedo: 'Papai trabalha 2 horas para isso?'", mood: "🤔" },
      { time: 36, text: "Nueva missão: Ana economiza mesada para comprar presente da mãe", mood: "🎁" },
      { time: 42, text: "Ana ensina irmão menor a separar moedas por valor - educadora!", mood: "👩‍🏫" }
    ],
    impact: { understanding: "+150%", saving_behavior: "+85%", family_harmony: "+65%" }
  }
];

export default function EpicDemo() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const demo = DEMO_SCENARIOS[currentDemo];
  const step = demo.steps[currentStep];

  useEffect(() => {
    if (!isPlaying || !autoPlay) return;

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demo.steps.length - 1) {
          // Auto advance to next demo
          setTimeout(() => {
            setCurrentDemo(prevDemo => (prevDemo + 1) % DEMO_SCENARIOS.length);
            setCurrentStep(0);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, demo.steps[currentStep]?.time ? (demo.steps[currentStep + 1]?.time - demo.steps[currentStep]?.time) * 100 : 1000);

    return () => clearInterval(timer);
  }, [isPlaying, autoPlay, currentStep, currentDemo]);

  const IconComponent = demo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 text-xl animate-pulse">
            DEMO ÉPICA DAS GALÁXIAS 🚀
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            VIDAS TRANSFORMADAS
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Assista pessoas reais mudando suas vidas com nosso ecossistema
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center gap-4 mb-12">
          <Button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`bg-gradient-to-r ${demo.color} hover:opacity-90 text-white px-8 py-4 text-lg`}
          >
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isPlaying ? 'Pausar' : 'Iniciar'} Demo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-purple-400 border-purple-400 px-8 py-4 text-lg"
          >
            {autoPlay ? <Volume2 className="w-6 h-6 mr-2" /> : <VolumeX className="w-6 h-6 mr-2" />}
            Auto-Play
          </Button>
        </div>

        {/* Demo Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {DEMO_SCENARIOS.map((demoScenario, idx) => (
            <Button
              key={demoScenario.id}
              variant={idx === currentDemo ? "default" : "outline"}
              onClick={() => {
                setCurrentDemo(idx);
                setCurrentStep(0);
              }}
              className={`${idx === currentDemo ? `bg-gradient-to-r ${demoScenario.color}` : 'border-purple-400 text-purple-400'}`}
            >
              <demoScenario.icon className="w-5 h-5 mr-2" />
              {demoScenario.app}
            </Button>
          ))}
        </div>

        {/* Main Demo Display */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden">
            <CardContent className="p-0">
              {/* Demo Header */}
              <div className={`bg-gradient-to-r ${demo.color} p-8 text-white`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{demo.title}</h2>
                    <p className="text-xl opacity-90">{demo.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {demo.app}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {demo.duration}
                  </Badge>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="p-8">
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                  
                  {demo.steps.map((stepItem, idx) => (
                    <div
                      key={idx}
                      className={`relative flex items-start gap-6 pb-8 transition-all duration-1000 ${
                        idx <= currentStep ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10 transition-all duration-500 ${
                        idx === currentStep 
                          ? `bg-gradient-to-r ${demo.color} scale-125 animate-pulse` 
                          : idx < currentStep 
                            ? 'bg-green-500' 
                            : 'bg-gray-600'
                      }`}>
                        {idx < currentStep ? '✓' : stepItem.mood}
                      </div>
                      
                      <div className={`flex-1 transition-all duration-500 ${
                        idx === currentStep ? 'transform translate-x-4' : ''
                      }`}>
                        <div className={`text-lg font-semibold mb-2 ${
                          idx <= currentStep ? 'text-white' : 'text-gray-500'
                        }`}>
                          {stepItem.text}
                        </div>
                        <div className="text-purple-300 text-sm">
                          {stepItem.time}s
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Metrics */}
              {currentStep >= demo.steps.length - 1 && (
                <div className={`bg-gradient-to-r ${demo.color} p-8 text-white animate-in slide-in-from-bottom`}>
                  <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
                    <Star className="w-8 h-8 animate-spin" />
                    IMPACTO MENSURÁVEL
                    <Star className="w-8 h-8 animate-spin" />
                  </h3>
                  <div className="grid grid-cols-3 gap-8 text-center">
                    {Object.entries(demo.impact).map(([key, value], idx) => (
                      <div key={key} className="transform hover:scale-110 transition-all">
                        <div className="text-4xl font-bold mb-2 animate-pulse">{value}</div>
                        <p className="opacity-90 capitalize">{key.replace('_', ' ')}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-lg opacity-90 mb-4">
                      "{demo.app === 'Essentia' ? 'Minha vida nunca mais foi a mesma' : 
                        demo.app === 'EduVie' ? 'Finalmente aprendi de verdade' :
                        demo.app === 'Flow + Flow Kids' ? 'Salvou nosso casamento e futuro' :
                        'Minha filha virou a professora da casa'}"
                    </p>
                    <p className="text-sm opacity-75">
                      - {demo.subtitle.split(',')[0]}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto mb-8">
            <h3 className="text-4xl font-bold text-white mb-4">ESTAS HISTÓRIAS SÃO REAIS</h3>
            <p className="text-xl text-gray-300 mb-6">
              Nosso ecossistema já transformou milhares de vidas. A próxima pode ser a sua.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/purpose">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-8 py-4 text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Despertar Meu Propósito
                </Button>
              </Link>
              <Link href="/edu">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-4 text-lg">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Revolucionar Meu Aprendizado
                </Button>
              </Link>
            </div>
          </div>

          <Link href="/">
            <Button variant="outline" className="text-purple-400 border-purple-400 px-8 py-4 text-lg">
              <Rocket className="w-5 h-5 mr-2" />
              Voltar ao Ecossistema
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Elementos bombásticos para impressionar Daniel Allegri */}
      <HolyShitMoments />
      <SurpriseMechanics />
      <EasterEggs />
    </div>
  );
}