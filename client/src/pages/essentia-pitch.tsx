import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Play, Pause, Brain, Target, Users, Smartphone, TrendingUp, Shield, CheckCircle, Star, Trophy, DollarSign, BarChart3, Heart, Zap } from 'lucide-react';
import logoPath from '@assets/image_1753836731720.png';
import founderPhotoPath from '@assets/Lelo_rosto_melhorado_pitch_1753874485532.jpg';

/**
 * ESSENTIA PITCH - SLIDE INTERATIVO
 * 
 * Slide 1: Capa com design gradiente, elementos neurais/orgânicos
 * e silhueta humana em meditação conforme especificações
 */

export default function EssentiaPitch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  
  const totalSlides = 15;
  
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

  // Slide 6 - Como Funciona (Fluxo do Usuário)
  const renderSlide6 = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">A Jornada Essentia: Seu Caminho Personalizado</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Avaliação Holística</h3>
              <p className="text-gray-600">Roda da Vida digital + análise por IA</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Jornada Adaptativa</h3>
              <p className="text-gray-600">Plano de autocuidado ajustado pela IA</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Engajamento Gamificado</h3>
              <p className="text-gray-600">Desafios, rituais, avatar em evolução</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">4. Acompanhamento Contínuo</h3>
              <p className="text-gray-600">Insights, rastreamento, feedback da IA</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 7 - Mercado-Alvo
  const renderSlide7 = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Estratégia de Mercado: Múltiplas Vias</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-blue-200">
            <CardContent className="p-8 text-center">
              <Users className="w-20 h-20 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-blue-800">B2C</h3>
              <p className="text-gray-700 mb-4">Usuários finais</p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-blue-800">Modelo de Assinaturas</p>
                <p className="text-gray-600">R$ 9,90 - R$ 29,90/mês</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <div className="text-green-600 text-3xl font-bold">B</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-800">B2B</h3>
              <p className="text-gray-700 mb-4">Empresas (programas corporativos)</p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-semibold text-green-800">Mercado 2024</p>
                <p className="text-xl font-bold text-green-600">US$ 1,53B</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-8 text-center">
              <Shield className="w-20 h-20 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-purple-800">B2B2C</h3>
              <p className="text-gray-700 mb-4">Planos de saúde</p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold text-purple-800">Benefício Integrado</p>
                <p className="text-gray-600">Licenciamento</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Slide 8 - Estratégia Go-To-Market
  const renderSlide8 = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Canais de Aquisição Eficientes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8 text-orange-600" />
                <h3 className="font-bold text-lg">Influenciadores Digitais</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">CPI na LatAm</p>
                <p className="text-xl font-bold text-orange-600">US$ 0,50 - US$ 2,00</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold">B2B</span>
                </div>
                <h3 className="font-bold text-lg">Vendas B2B Corporativo</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">LTV alto, CAC baixo</p>
                <p className="text-green-600 font-semibold">✓ Potencial elevado</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-lg">Parcerias B2B2C</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Redução drástica do CAC</p>
                <p className="text-purple-600 font-semibold">✓ Escala rápida</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 text-green-600">🔍</div>
                <h3 className="font-bold text-lg">Orgânico (ASO/SEO)</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">CAC zero, LTV elevado</p>
                <p className="text-green-600 font-semibold">✓ Sustentável</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-red-600" />
                <h3 className="font-bold text-lg">Mídia Paga Otimizada</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">iOS Brasil</p>
                  <p className="text-xl font-bold text-red-600">US$ 0,22</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Android Brasil</p>
                  <p className="text-xl font-bold text-red-600">US$ 0,44</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Slide 9 - Tração e Roadmap
  const renderSlide9 = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Roadmap de Crescimento (24 Meses)</h1>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">Q1-Q2</div>
                  <h3 className="font-bold text-lg">2025</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• MVP, validação com 10k-20k usuários</li>
                  <li>• Retenção Dia 30 &gt; 25%</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">Q3-Q4</div>
                  <h3 className="font-bold text-lg">2025</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Otimização monetização (conversão 5%)</li>
                  <li>• 50k-100k usuários</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2026</div>
                  <h3 className="font-bold text-lg">Escala Brasil</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• 200k-500k usuários</li>
                  <li>• Início de ensaios clínicos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">2027+</div>
                  <h3 className="font-bold text-lg">Expansão LatAm</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Argentina, México</li>
                  <li>• Certificações</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 10 - Modelo de Negócio
  const renderSlide10 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Modelo: Diversificado e Escalável</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded mr-3 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                Freemium
              </h3>
              <p className="text-gray-600 mb-4">Atração e engajamento</p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold">Estratégia de conversão</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                Assinaturas Premium (B2C)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Básico</span>
                  <span className="font-bold text-green-600">R$ 9,90</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Plus</span>
                  <span className="font-bold text-green-600">R$ 19,90</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Premium</span>
                  <span className="font-bold text-green-600">R$ 29,90</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 mt-4">
                  <p className="font-semibold">ARPU Anual Alvo: US$ 60 - US$ 80</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded mr-3 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">B2B</span>
                </div>
                Planos Corporativos
              </h3>
              <p className="text-gray-600 mb-4">Assinaturas anuais para empresas</p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold">LTV alto, CAC baixo</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <Shield className="w-8 h-8 text-orange-600 mr-3" />
                Parcerias com Planos de Saúde
              </h3>
              <p className="text-gray-600 mb-4">Licenciamento/comissionamento</p>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="font-semibold">Escala através de parcerias</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Slide 11 - Projeções Financeiras
  const renderSlide11 = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Projeções Financeiras (3 Anos)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2025</div>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600">Usuários</p>
                  <p className="font-bold">50K-100K</p>
                </div>
                <div>
                  <p className="text-gray-600">Receita</p>
                  <p className="font-bold text-blue-600">R$ 2M-5M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2026</div>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600">Usuários</p>
                  <p className="font-bold">300K-500K</p>
                </div>
                <div>
                  <p className="text-gray-600">Receita</p>
                  <p className="font-bold text-green-600">R$ 15M-25M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2027</div>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600">Usuários</p>
                  <p className="font-bold">1M+</p>
                </div>
                <div>
                  <p className="text-gray-600">Receita</p>
                  <p className="font-bold text-purple-600">R$ 50M-80M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Múltiplos de Mercado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Revenue Multiple (Health Tech)</p>
              <p className="text-3xl font-bold text-blue-600">8-12x</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Valuation Projetada 2027</p>
              <p className="text-3xl font-bold text-purple-600">R$ 400M-960M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 12 - Nossa Liderança & A Rede de Execução
  const renderSlide12 = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Nossa Liderança &amp; A Rede de Execução</h1>
        
        {/* Fundador em Destaque */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="border-blue-200 h-full">
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={founderPhotoPath} 
                    alt="Lélio - Fundador Essentia" 
                    className="w-48 h-48 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-blue-800">Lélio: Fundador &amp; Visionário da Essentia</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="text-lg">
                      <span className="font-semibold">Paixão inabalável</span> por bem-estar digital e profundo entendimento do problema no Brasil.
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Visão clara</span> para transformar o autocuidado através de tecnologia e ciência.
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Expertise em</span> comportamento humano, IA aplicada ao wellness e gamificação.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crescimento do Time - Gráfico Visual */}
          <div className="lg:col-span-1">
            <Card className="border-green-200 h-full">
              <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-6 text-green-800">Crescimento do Time</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2025</span>
                    <div className="flex space-x-1">
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2026</span>
                    <div className="flex space-x-1">
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2027</span>
                    <div className="flex space-x-1">
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-800">Escalando o time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rede Estratégica de Especialistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-purple-800 flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                Rede Estratégica de Especialistas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Brain className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Psicólogos Clínicos</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Zap className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Neurocientistas</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Gamificação &amp; IA</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Target className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Designers UX/UI</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                Parcerias Acadêmicas
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">USP</span>
                  </div>
                  <div>
                    <p className="font-semibold">Universidade de São Paulo</p>
                    <p className="text-sm text-gray-600">Validação científica &amp; pesquisa</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Hospital Albert Einstein</p>
                    <p className="text-sm text-gray-600">Validação clínica &amp; testes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plano de Atração de Talentos */}
        <Card className="border-orange-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-orange-800 text-center flex items-center justify-center">
              <Users className="w-8 h-8 mr-3" />
              Plano de Atração de Talentos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">CTO Experiente</h4>
                <p className="text-gray-600">Especialista em IA e arquitetura de sistemas escaláveis</p>
                <div className="mt-3 px-4 py-2 bg-orange-50 rounded-lg">
                  <p className="text-sm font-semibold text-orange-800">Buscando ativamente</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">CMO Growth</h4>
                <p className="text-gray-600">Especialista em crescimento e aquisição de usuários</p>
                <div className="mt-3 px-4 py-2 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">Em processo seletivo</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Slide 13 - Validação e Tração
  const renderSlide13 = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Validação: Primeiros Resultados</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-green-200">
            <CardContent className="p-8">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">MVP Validado</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">1.2K</p>
                    <p className="text-gray-700">Beta testers ativos</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">68%</p>
                    <p className="text-gray-700">Retenção 7 dias</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-8">
              <div className="text-center">
                <Star className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Feedback dos Usuários</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">4.7/5</p>
                    <p className="text-gray-700">Rating médio</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">89%</p>
                    <p className="text-gray-700">Recomendam o app</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-purple-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Depoimentos de Beta Testers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="italic mb-4">"Finalmente um app que entende minha rotina brasileira. A IA realmente personaliza as sugestões."</p>
                <p className="font-semibold text-purple-700">- Maria, 34, São Paulo</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="italic mb-4">"A gamificação me mantém engajada. Já são 45 dias consecutivos usando!"</p>
                <p className="font-semibold text-blue-700">- Carlos, 28, Rio</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <p className="italic mb-4">"A Roda da Vida me ajudou a ver onde preciso melhorar. Interface muito intuitiva."</p>
                <p className="font-semibold text-green-700">- Ana, 41, Brasília</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Slide 14 - Pedido de Investimento
  const renderSlide14 = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">Rodada Seed: R$ 8M</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="border-orange-200">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 text-orange-800">Uso dos Recursos</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <span>Equipe (40%)</span>
                  </div>
                  <span className="font-bold">R$ 3.2M</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-8 h-8 text-yellow-600" />
                    <span>Marketing (30%)</span>
                  </div>
                  <span className="font-bold">R$ 2.4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-8 h-8 text-purple-600" />
                    <span>Produto &amp; IA (20%)</span>
                  </div>
                  <span className="font-bold">R$ 1.6M</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    <span>Operações (10%)</span>
                  </div>
                  <span className="font-bold">R$ 800K</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 text-green-800">Milestones 18 Meses</h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-bold text-green-800">Q1-Q2 2025</p>
                  <p className="text-gray-700">50K usuários ativos, MVP otimizado</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-bold text-blue-800">Q3-Q4 2025</p>
                  <p className="text-gray-700">200K usuários, receita R$ 2M</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="font-bold text-purple-800">Q1-Q2 2026</p>
                  <p className="text-gray-700">500K usuários, break-even</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="font-bold text-orange-800">Preparação Série A</p>
                  <p className="text-gray-700">Expansão LatAm, R$ 20M rodada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-8">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Por que investir agora?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="font-semibold">Mercado em Crescimento</p>
                <p className="text-sm text-gray-600">15% CAGR até 2030</p>
              </div>
              <div>
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold">MVP Validado</p>
                <p className="text-sm text-gray-600">Tração comprovada</p>
              </div>
              <div>
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <p className="font-semibold">Diferenciação Clara</p>
                <p className="text-sm text-gray-600">IA + Cultura brasileira</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 15 - Obrigado/Contato
  const renderSlide15 = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-8">
        <img src={logoPath} alt="Essentia Logo" className="w-48 h-auto mx-auto mb-8" />
        
        <h1 className="text-6xl font-bold text-gray-800 mb-6">Obrigado!</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Vamos transformar o bem-estar digital juntos?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-800">Contato</h3>
              <div className="space-y-2 text-gray-700">
                <p>📧 contato@essentia.app</p>
                <p>💼 LinkedIn: /company/essentia-wellness</p>
                <p>🌐 www.essentia.app</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-800">Próximos Passos</h3>
              <div className="space-y-2 text-gray-700">
                <p>✓ Demo personalizada</p>
                <p>✓ Due diligence técnica</p>
                <p>✓ Reunião com equipe</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-purple-600">R$ 8M</p>
              <p className="text-gray-600">Rodada Seed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-blue-600">18 meses</p>
              <p className="text-gray-600">Break-even</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-green-600">500K+</p>
              <p className="text-gray-600">Usuários meta</p>
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
      case 5: return renderSlide6();
      case 6: return renderSlide7();
      case 7: return renderSlide8();
      case 8: return renderSlide9();
      case 9: return renderSlide10();
      case 10: return renderSlide11();
      case 11: return renderSlide12();
      case 12: return renderSlide13();
      case 13: return renderSlide14();
      case 14: return renderSlide15();
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