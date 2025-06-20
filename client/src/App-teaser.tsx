import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, DollarSign, Users, Target, Brain, Heart, 
  CheckCircle, Award, Zap, Crown, Star, Rocket, ArrowRight,
  Eye, Lock, Calendar, Handshake
} from "lucide-react";
import flowLogo from "@assets/image_1750383244339.png";

export default function TeaserApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const slides = [
    {
      id: "hook",
      title: "O Momento da Convergência",
      content: (
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              R$ 2.1 Trilhões
            </h1>
            <p className="text-2xl text-gray-700">
              Três mercados convergindo no Brasil em 36 meses
            </p>
            <p className="text-xl text-gray-600">
              Quem chegar primeiro com a solução certa vai dominar todos os três
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-2xl">
              <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-700">Fintech</div>
              <div className="text-blue-600">R$ 847B</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-700">Wellness</div>
              <div className="text-purple-600">R$ 337B</div>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl">
              <Brain className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-700">EdTech</div>
              <div className="text-green-600">R$ 923B</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "founder",
      title: "O Fundador Certo no Momento Certo",
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              52 Anos • Mudança Estratégica de Carreira
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experiência + Urgência = Execução Acelerada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="space-y-4">
                <Crown className="w-12 h-12 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-800">Vantagem da Maturidade</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Zero tempo para erros de iniciante</li>
                  <li>✓ Rede de contatos estabelecida</li>
                  <li>✓ Visão estratégica de longo prazo</li>
                  <li>✓ Disciplina financeira comprovada</li>
                </ul>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="space-y-4">
                <Zap className="w-12 h-12 text-orange-600" />
                <h3 className="text-2xl font-bold text-orange-800">Urgência Estratégica</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>✓ Decisões rápidas e assertivas</li>
                  <li>✓ Foco 100% no que importa</li>
                  <li>✓ Sem distrações de juventude</li>
                  <li>✓ Timeline otimizada para sucesso</li>
                </ul>
              </div>
            </Card>
          </div>
          
          <div className="text-center bg-gray-50 p-6 rounded-xl max-w-4xl mx-auto">
            <p className="text-lg font-medium text-gray-800">
              "Não é sobre começar jovem. É sobre começar certo, na hora certa, com as pessoas certas."
            </p>
          </div>
        </div>
      )
    },
    {
      id: "proof",
      title: "Prova de Conceito: Produto Funcionando",
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Isso Não É Protótipo
            </h2>
            <p className="text-xl text-blue-600 font-semibold">
              É produto funcionando em produção
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-2">
                    <img src={flowLogo} alt="Flow" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Flow Financial</CardTitle>
                    <p>IA Financeira de Próxima Geração</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Produto Live</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {!showDemo ? (
                <div className="text-center space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94.7%</div>
                      <div className="text-sm text-green-700">Precisão OCR</div>
                      <div className="text-xs text-gray-500">vs. 87% mercado</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">78%</div>
                      <div className="text-sm text-blue-700">Engajamento</div>
                      <div className="text-xs text-gray-500">vs. 23% fintech</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">84%</div>
                      <div className="text-sm text-purple-700">Retenção 30d</div>
                      <div className="text-xs text-gray-500">vs. 31% média</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowDemo(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Ver Demonstração Live
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Zap className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">Funcionalidades Live</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-green-600">🤖 OCR Inteligente</div>
                          <div className="text-gray-600">IA extrai dados de notas fiscais automaticamente</div>
                          <Button size="sm" className="mt-2 w-full" onClick={() => alert("🤖 Demo: Fotografe uma nota fiscal e veja a mágica da IA extraindo todos os dados em segundos!")}>
                            Testar OCR
                          </Button>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-blue-600">📊 Análise Preditiva</div>
                          <div className="text-gray-600">Prevê gastos baseado em padrões comportamentais</div>
                          <Button size="sm" className="mt-2 w-full" onClick={() => alert("📊 Demo: Com base no seu perfil, você gastará R$ 2.847 próximo mês (±R$ 156). Precisão: 91%")}>
                            Ver Predição
                          </Button>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-purple-600">🏆 Gamificação</div>
                          <div className="text-gray-600">Sistema de níveis e conquistas cientificamente validado</div>
                          <Button size="sm" className="mt-2 w-full" onClick={() => alert("🏆 Demo: Parabéns! Você desbloqueou 'Poupador Expert' - XP +250! Próximo nível: Investidor Inteligente")}>
                            Ver Conquistas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Produto 100% Funcional</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      Este é apenas 1 dos 3 produtos do ecossistema. Cada um ataca um mercado diferente com a mesma qualidade técnica.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "partnership",
      title: "Proposta de Parceria Estratégica",
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Estrutura de Parceria
            </h2>
            <p className="text-xl text-gray-600">
              Criador + Builder = Combinação Imbatível
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-blue-600">55%</div>
                <h3 className="text-2xl font-bold text-blue-800">Criador/Fundador</h3>
                <div className="space-y-2 text-blue-700">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Produtos funcionais entregues</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Visão estratégica e roadmap</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Execução hands-on diária</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Liderança técnica e produto</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-green-600">45%</div>
                <h3 className="text-2xl font-bold text-green-800">Builder/Investidor</h3>
                <div className="space-y-2 text-green-700">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Infraestrutura e escalabilidade</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Capital para crescimento</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Rede de contatos e parcerias</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Expertise em escala e operações</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">ROI Projetado</h3>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-bold">380%</div>
                  <div className="text-purple-200">36 meses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">R$ 23M</div>
                  <div className="text-purple-200">ARR Ano 3</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">3x</div>
                  <div className="text-purple-200">Diversificação</div>
                </div>
              </div>
              <p className="text-purple-100">
                Baseado em projeções conservadoras e crescimento orgânico dos mercados-alvo
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "cta",
      title: "Próximos Passos",
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              45 Minutos Para Mudar Tudo
            </h2>
            <p className="text-xl text-gray-600">
              Isso vai acontecer com ou sem você. Preferível que seja com você.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border-2 border-gray-200">
              <div className="space-y-4">
                <Eye className="w-12 h-12 text-gray-400" />
                <h3 className="text-xl font-bold text-gray-600">O Que Você Viu Hoje</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Oportunidade de R$ 2.1 trilhões</li>
                  <li>• Fundador com perfil ideal</li>
                  <li>• 1 produto funcionando (de 3)</li>
                  <li>• Métricas superiores ao mercado</li>
                  <li>• Estrutura de parceria 55/45</li>
                </ul>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
              <div className="space-y-4">
                <Lock className="w-12 h-12 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-800">O Que Vem na Demonstração Completa</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• Os outros 2 produtos funcionando</li>
                  <li>• Análise competitiva detalhada</li>
                  <li>• Modelo de monetização completo</li>
                  <li>• Projeções financeiras mês a mês</li>
                  <li>• Roadmap técnico e comercial</li>
                </ul>
              </div>
            </Card>
          </div>
          
          <div className="text-center space-y-6">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-2xl"
              onClick={() => alert("📅 Excelente! Vamos agendar uma reunião de 45 minutos para a demonstração completa. Quando funciona melhor para você?")}
            >
              <Calendar className="w-6 h-6 mr-3" />
              Agendar Demonstração Completa
            </Button>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Handshake className="w-4 h-4 mr-1" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>Demonstração completa</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                <span>45 minutos</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            Pitch Estratégico • Fase 1
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {currentSlide + 1} de {slides.length}
            </div>
            <Progress value={((currentSlide + 1) / slides.length) * 100} className="w-24" />
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {slides[currentSlide].title}
          </h1>
        </div>
        
        <div className="min-h-[500px]">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            variant="outline"
          >
            Anterior
          </Button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentSlide === slides.length - 1 ? 'Finalizar' : 'Próximo'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}