import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Users, 
  Smartphone,
  Brain,
  Heart,
  Target,
  Zap,
  Globe,
  Star,
  Play,
  ArrowRight,
  DollarSign,
  BookOpen,
  Compass,
  Sparkles
} from "lucide-react";

export default function InvestorDemo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const marketData = {
    wellness: "R$ 4.2 bi",
    fintech: "R$ 12.8 bi", 
    edtech: "R$ 3.7 bi",
    totalTam: "R$ 20.7 bi",
    userBase: "150M+ brasileiros",
    growth: "+127% ao ano"
  };

  const competitiveAdvantages = [
    {
      title: "Ecossistema Integrado",
      description: "Primeiro no Brasil a unir fintech + edtech + wellness",
      icon: Globe,
      impact: "Alto"
    },
    {
      title: "Avatar Biométrico 3D",
      description: "Tecnologia única que visualiza estado emocional",
      icon: Brain,
      impact: "Revolucionário"
    },
    {
      title: "IA Empática",
      description: "Sistema que reconhece padrões emocionais e adapta experiência",
      icon: Heart,
      impact: "Alto"
    },
    {
      title: "Rituais Digitais",
      description: "Práticas simbólicas que criam engajamento profundo",
      icon: Sparkles,
      impact: "Diferencial"
    }
  ];

  const traction = [
    { metric: "MVP Funcional", value: "100%", description: "3 apps integrados funcionando" },
    { metric: "Market Research", value: "Completa", description: "TAM de R$ 20.7 bi validado" },
    { metric: "Content Library", value: "24 textos", description: "+ rituais e práticas" },
    { metric: "Tech Stack", value: "Moderna", description: "React, IA, Biometria ready" }
  ];

  const financials = {
    year1: { revenue: "R$ 500K", users: "5K", arr: "R$ 1.2M" },
    year2: { revenue: "R$ 2.1M", users: "25K", arr: "R$ 5.8M" },
    year3: { revenue: "R$ 8.4M", users: "75K", arr: "R$ 18.2M" },
    investment: "R$ 3-5M",
    equity: "20-30%",
    valuation: "R$ 15-20M"
  };

  const slides = [
    "Problema",
    "Solução", 
    "Mercado",
    "Produto",
    "Diferencial",
    "Tração",
    "Financeiro",
    "Equipe",
    "Investimento"
  ];

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold mb-2">
                  Flow Ecosystem
                </CardTitle>
                <p className="text-blue-100 text-lg">
                  Revolucionando bem-estar digital no Brasil
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-200">Apresentação para</div>
                <div className="text-xl font-bold">Daniel Allegri</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Slide Navigation */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={prevSlide} variant="outline" size="sm">
                  ←
                </Button>
                <div className="text-sm font-medium">
                  {currentSlide + 1} / {slides.length}: {slides[currentSlide]}
                </div>
                <Button onClick={nextSlide} variant="outline" size="sm">
                  →
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setAutoPlay(!autoPlay)}
                  variant={autoPlay ? "default" : "outline"}
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Auto
                </Button>
                <Progress value={((currentSlide + 1) / slides.length) * 100} className="w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slide Content */}
        <div className="space-y-6">
          {/* Slide 0: Problema */}
          {currentSlide === 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 text-2xl">
                  O Problema: Fragmentação Digital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-red-700">Brasileiros usam em média:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-red-600" />
                        <span>3-4 apps financeiros (Nubank, PicPay, etc.)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-red-600" />
                        <span>2-3 apps educacionais (Duolingo, Coursera, etc.)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-red-600" />
                        <span>2-3 apps de bem-estar (Calm, Headspace, etc.)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-red-700">Resultado:</h3>
                    <div className="p-4 bg-red-100 rounded-lg">
                      <ul className="space-y-2 text-red-800">
                        <li>• Experiência fragmentada</li>
                        <li>• Dados não conectados</li>
                        <li>• Progressão lenta</li>
                        <li>• Abandono alto (70%+ em 30 dias)</li>
                        <li>• Superficialidade nas práticas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 1: Solução */}
          {currentSlide === 1 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 text-2xl">
                  Nossa Solução: Ecossistema Integrado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-blue-300 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Flow
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-600">Gestão financeira consciente com IA emocional</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-300 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        EduVie
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-600">Educação personalizada com sínteses cinematográficas</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-pink-300 bg-pink-50">
                    <CardHeader>
                      <CardTitle className="text-pink-700 flex items-center">
                        <Compass className="w-5 h-5 mr-2" />
                        Essentia
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-pink-600">Desenvolvimento pessoal com avatar biométrico 3D</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Integração Única:</h3>
                  <p className="text-green-700">
                    Dados fluem entre apps, IA aprende padrões holísticos, usuário evolui em todas as dimensões da vida.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 2: Mercado */}
          {currentSlide === 2 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 text-2xl">
                  Mercado: R$ 20.7 Bilhões TAM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-100 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{marketData.fintech}</div>
                        <div className="text-sm text-blue-600">Fintech</div>
                      </div>
                      <div className="text-center p-4 bg-purple-100 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">{marketData.wellness}</div>
                        <div className="text-sm text-purple-600">Wellness</div>
                      </div>
                      <div className="text-center p-4 bg-pink-100 rounded-lg">
                        <div className="text-2xl font-bold text-pink-700">{marketData.edtech}</div>
                        <div className="text-sm text-pink-600">Edtech</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-blue-300">
                      <div className="text-3xl font-bold text-blue-700">{marketData.totalTam}</div>
                      <div className="text-blue-600">Total Addressable Market</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-blue-700">Crescimento:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-100 rounded">
                        <span>Usuários Potenciais</span>
                        <span className="font-bold">{marketData.userBase}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-100 rounded">
                        <span>Crescimento Anual</span>
                        <span className="font-bold text-green-600">{marketData.growth}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-100 rounded">
                        <span>Concorrência Direta</span>
                        <span className="font-bold text-red-600">0 players</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 3: Produto Demo */}
          {currentSlide === 3 && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800 text-2xl">
                  Produto: MVP Funcional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="p-6 bg-white rounded-lg border-2 border-purple-300">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                      Demonstração ao Vivo
                    </h3>
                    <p className="text-purple-600 mb-4">
                      Clique abaixo para navegar pelo app funcionando
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button 
                        onClick={() => window.open('/purpose', '_blank')}
                        className="h-auto p-4 flex-col space-y-2 bg-pink-600 hover:bg-pink-700"
                      >
                        <Compass className="w-6 h-6" />
                        <span>Essentia Demo</span>
                      </Button>
                      <Button 
                        onClick={() => window.open('/edu', '_blank')}
                        className="h-auto p-4 flex-col space-y-2 bg-purple-600 hover:bg-purple-700"
                      >
                        <BookOpen className="w-6 h-6" />
                        <span>EduVie Demo</span>
                      </Button>
                      <Button 
                        onClick={() => window.open('/', '_blank')}
                        className="h-auto p-4 flex-col space-y-2 bg-blue-600 hover:bg-blue-700"
                      >
                        <DollarSign className="w-6 h-6" />
                        <span>Flow Demo</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-white rounded border border-purple-200">
                      <h4 className="font-semibold mb-2">✅ Funcionalidades Prontas:</h4>
                      <ul className="text-left space-y-1">
                        <li>• Avatar 3D evolutivo</li>
                        <li>• 18 fases de jornada</li>
                        <li>• Respirações guiadas</li>
                        <li>• Rituais digitais</li>
                        <li>• Sistema Essentia</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded border border-purple-200">
                      <h4 className="font-semibold mb-2">🚀 Próximos 90 dias:</h4>
                      <ul className="text-left space-y-1">
                        <li>• Integração biométrica</li>
                        <li>• IA empática</li>
                        <li>• Comunidades</li>
                        <li>• Gamificação</li>
                        <li>• Beta testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 4: Diferencial */}
          {currentSlide === 4 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 text-2xl">
                  Diferencial Competitivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {competitiveAdvantages.map((advantage, index) => {
                    const Icon = advantage.icon;
                    return (
                      <Card key={index} className="border-2 border-yellow-300 bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                              <Icon className="w-6 h-6 text-yellow-700" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-yellow-800">{advantage.title}</h3>
                              <p className="text-yellow-700 text-sm mt-1">{advantage.description}</p>
                              <Badge className="mt-2 bg-yellow-200 text-yellow-800">
                                {advantage.impact}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 5: Tração */}
          {currentSlide === 5 && (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-800 text-2xl">
                  Tração & Validação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {traction.map((item, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-emerald-800">{item.metric}</h3>
                        <span className="text-emerald-600 font-bold">{item.value}</span>
                      </div>
                      <p className="text-emerald-700 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 6: Financeiro */}
          {currentSlide === 6 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 text-2xl">
                  Projeções Financeiras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded border border-green-200">
                    <div className="text-lg font-bold text-green-700">Ano 1</div>
                    <div className="text-2xl font-bold text-green-800">{financials.year1.revenue}</div>
                    <div className="text-sm text-green-600">{financials.year1.users} usuários</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded border border-green-200">
                    <div className="text-lg font-bold text-green-700">Ano 2</div>
                    <div className="text-2xl font-bold text-green-800">{financials.year2.revenue}</div>
                    <div className="text-sm text-green-600">{financials.year2.users} usuários</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded border border-green-200">
                    <div className="text-lg font-bold text-green-700">Ano 3</div>
                    <div className="text-2xl font-bold text-green-800">{financials.year3.revenue}</div>
                    <div className="text-sm text-green-600">{financials.year3.users} usuários</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded border-2 border-green-300">
                    <div className="text-lg font-bold text-green-700">Investimento</div>
                    <div className="text-2xl font-bold text-green-800">{financials.investment}</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded border-2 border-green-300">
                    <div className="text-lg font-bold text-green-700">Equity</div>
                    <div className="text-2xl font-bold text-green-800">{financials.equity}</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded border-2 border-green-300">
                    <div className="text-lg font-bold text-green-700">Valuation</div>
                    <div className="text-2xl font-bold text-green-800">{financials.valuation}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 7: Equipe */}
          {currentSlide === 7 && (
            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-indigo-800 text-2xl">
                  Equipe & Execução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-indigo-700">Fundador:</h3>
                    <div className="p-4 bg-white rounded border border-indigo-200">
                      <h4 className="font-semibold">Rômulo Melo (Lelão)</h4>
                      <ul className="text-sm text-indigo-700 mt-2 space-y-1">
                        <li>• Visionário em bem-estar digital</li>
                        <li>• Background em desenvolvimento pessoal</li>
                        <li>• Experiência em conteúdo transformacional</li>
                        <li>• Network no mercado wellness</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-indigo-700">Próximas Contratações:</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded border border-indigo-200">
                        <strong>CTO Senior</strong> - React Native, IA, Biometria
                      </div>
                      <div className="p-3 bg-white rounded border border-indigo-200">
                        <strong>Head de Produto</strong> - UX/UI, Wellness
                      </div>
                      <div className="p-3 bg-white rounded border border-indigo-200">
                        <strong>Data Scientist</strong> - ML, Análise Comportamental
                      </div>
                      <div className="p-3 bg-white rounded border border-indigo-200">
                        <strong>Head de Growth</strong> - Marketing Digital, Acquisition
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide 8: Investimento */}
          {currentSlide === 8 && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800 text-2xl">
                  Proposta de Investimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-purple-700 text-lg">O que oferecemos:</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white rounded border border-purple-200">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Ecossistema Completo</span>
                          <Badge className="bg-purple-100 text-purple-700">3 Apps</Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded border border-purple-200">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Mercado Único</span>
                          <Badge className="bg-purple-100 text-purple-700">R$ 20.7bi</Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded border border-purple-200">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Tecnologia Diferenciada</span>
                          <Badge className="bg-purple-100 text-purple-700">Avatar 3D + IA</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-purple-700 text-lg">Próximos passos:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded border border-purple-200">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">1</div>
                        <span>Due diligence (2 semanas)</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded border border-purple-200">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">2</div>
                        <span>Definição de termos</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded border border-purple-200">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">3</div>
                        <span>Contratação da equipe</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded border border-purple-200">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">4</div>
                        <span>Beta launch em 90 dias</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border-2 border-purple-300">
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">
                      Vamos revolucionar o bem-estar digital juntos?
                    </h3>
                    <p className="text-purple-700">
                      Esta é sua chance de investir no futuro do desenvolvimento humano no Brasil
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Navigation */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {slides.map((slide, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  variant={currentSlide === index ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {index + 1}. {slide}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}