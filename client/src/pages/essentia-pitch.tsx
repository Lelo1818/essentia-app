import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Play, Pause, Brain, Target, Users, Smartphone, TrendingUp, Shield, CheckCircle, Star, Trophy, DollarSign, BarChart3, Heart, Zap } from 'lucide-react';
import logoPath from '@assets/image_1753836731720.png';

/**
 * ESSENTIA PITCH - SLIDE INTERATIVO
 * 
 * Slide 1: Capa com design gradiente, elementos neurais/orgânicos
 * e silhueta humana em meditação conforme especificações
 */

export default function EssentiaPitch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  
  const totalSlides = 5;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Slide 1 - Capa
  const renderSlide1 = () => (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-8">
        <div className="mb-8">
          <img src={logoPath} alt="Essentia Logo" className="w-64 h-auto mx-auto mb-8" />
          <h1 className="text-6xl font-bold text-gray-800 mb-4">Essentia</h1>
          <h2 className="text-2xl text-gray-600 font-light">
            IA, Gamificação e Ciência para o Bem-Estar Holístico
          </h2>
        </div>
      </div>
    </div>
  );

  // Slide 2 - O Problema
  const renderSlide2 = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">A Crise do Bem-Estar no Brasil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-4">70%</div>
                <p className="text-xl text-gray-700">dos brasileiros com ansiedade/estresse crônico</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-4">71%</div>
                <p className="text-xl text-gray-700">abandonam apps genéricos em 90 dias</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-4">3,3%</div>
                <p className="text-xl text-gray-700">retenção de apps de saúde mental em 30 dias</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-xl text-gray-700">Falta de soluções personalizadas e culturalmente relevantes</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Slide 3 - Oportunidade
  const renderSlide3 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Mercado Bilionário e em Ascensão</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <TrendingUp className="w-16 h-16 text-green-600 mx-auto" />
                <div className="space-y-2">
                  <p className="text-gray-600">Mercado Brasil 2024</p>
                  <div className="text-4xl font-bold text-green-600">US$ 543,5M</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <Target className="w-16 h-16 text-blue-600 mx-auto" />
                <div className="space-y-2">
                  <p className="text-gray-600">Projeção 2030</p>
                  <div className="text-4xl font-bold text-blue-600">US$ 1,28B</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15,0%</div>
              <p className="text-gray-700">CAGR</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-blue-600 mb-2">185,4M</div>
              <p className="text-gray-700">usuários mobile até 2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">+5h</div>
              <p className="text-gray-700">brasileiros/dia em smartphones</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Slide 4 - A Solução
  const renderSlide4 = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Essentia: Revolução do Autocuidado Digital</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-lg">IA Adaptativa</h3>
                    <p className="text-gray-600">Personalização profunda baseada em comportamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h3 className="font-bold text-lg">Gamificação Inteligente</h3>
                    <p className="text-gray-600">Engajamento sustentável e motivação contínua</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Target className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg">Abordagem Holística</h3>
                    <p className="text-gray-600">Mente + Corpo + Propósito integrados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-3xl p-8 w-80 h-96 flex items-center justify-center">
              <div className="bg-white rounded-2xl w-64 h-80 flex items-center justify-center">
                <img src={logoPath} alt="App Mockup" className="w-32 h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 5 - Diferenciais Únicos
  const renderSlide5 = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Nossos Pilares: Inovação e Impacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-blue-200">
            <CardContent className="p-8 text-center">
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-blue-800">IA Preditiva e Adaptativa</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Jornadas dinamicamente personalizadas</li>
                <li>• Guias virtuais com IAs de personalidade</li>
                <li>• Análise comportamental avançada</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-yellow-800">Gamificação Inteligente</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Desafios e rituais personalizados</li>
                <li>• Avatares que evoluem com o usuário</li>
                <li>• Sistema de recompensas adaptativo</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 text-green-800">Abordagem Holística e Cultural</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Integração mente, físico, espiritual</li>
                <li>• Roda da Vida para autoconhecimento</li>
                <li>• Rituais conectados à cultura brasileira</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Função principal de renderização baseada no slide atual
  const renderCurrentSlide = () => {
    switch (currentSlide) {
      case 0: return renderSlide1();
      case 1: return renderSlide2();
      case 2: return renderSlide3();
      case 3: return renderSlide4();
      case 4: return renderSlide5();
      default: return renderSlide1();
    }
  };

  return (
    <div className="min-h-screen relative">
      {renderCurrentSlide()}
      
      {/* Controles de Navegação */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Indicador de Slide */}
      <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
        <span className="text-sm text-gray-600">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>

      {/* Botão de volta */}
      <div className="fixed top-4 left-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.location.href = '/dashboard-unificado'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}