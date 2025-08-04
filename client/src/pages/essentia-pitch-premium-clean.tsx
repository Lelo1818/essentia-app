import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Users, Building, Target, DollarSign, TrendingUp, BarChart3, Star, Rocket, ArrowUp, Heart, Brain, Globe } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Essentia",
    subtitle: "Transformando o bem-estar através da tecnologia humanizada",
    content: (
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative text-8xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-black">
            ESSENTIA
          </div>
        </div>
        <p className="text-2xl text-white/90 font-medium">
          A revolução do autoconhecimento através de IA personalizada
        </p>
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Marcelo "Lelo" Rymer</h3>
          <p className="text-white/90">Fundador & Visionário</p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "O Problema: Uma Epidemia Silenciosa",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 rounded-3xl p-6 text-center">
            <div className="text-5xl font-bold text-red-600 mb-4">70%</div>
            <p className="text-red-800 font-medium">dos brasileiros sofrem de ansiedade</p>
          </div>
          <div className="bg-orange-50 rounded-3xl p-6 text-center">
            <div className="text-5xl font-bold text-orange-600 mb-4">86%</div>
            <p className="text-orange-800 font-medium">relatam estresse no trabalho</p>
          </div>
          <div className="bg-purple-50 rounded-3xl p-6 text-center">
            <div className="text-5xl font-bold text-purple-600 mb-4">R$ 210B</div>
            <p className="text-purple-800 font-medium">custo anual com saúde mental</p>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">A Realidade Brasileira</h3>
          <p className="text-gray-700 text-lg">
            Vivemos numa era de excesso de informação e falta de autoconhecimento. 
            As pessoas estão perdidas, ansiosas e buscando sentido e propósito.
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  {
    id: 3,
    title: "Nossa Solução: Essentia",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Brain className="text-purple-600 mr-3" size={32} />
              IA Personalizada
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>4 personalidades de IA distintas</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Adaptação em tempo real</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Análise comportamental avançada</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Heart className="text-red-600 mr-3" size={32} />
              Experiência Holística
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Avatar 3D evolutivo</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Práticas guiadas</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Gamificação integrada</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Diferenciais Únicos</h3>
          <p className="text-white/90 text-lg">
            Primeira plataforma brasileira que combina IA avançada, gamificação e 
            abordagem culturalmente adaptada para transformação pessoal.
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    id: 4,
    title: "Mercado e Oportunidade",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Mercado Global</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">TAM Mundial</span>
                <span className="text-2xl font-bold text-blue-600">US$ 5.6B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">SAM Brasil</span>
                <span className="text-2xl font-bold text-green-600">US$ 1.28B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Crescimento Anual</span>
                <span className="text-2xl font-bold text-purple-600">23.1%</span>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Competidores</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calm</span>
                <span className="text-sm text-gray-500">US$ 2B valuation</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Headspace</span>
                <span className="text-sm text-gray-500">US$ 3B valuation</span>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-800">Essentia</span>
                  <span className="text-sm text-green-600">Oportunidade única</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Nossa Vantagem</h3>
          <p className="text-white/90 text-lg">
            Primeiro no Brasil com IA personalizada + gamificação + abordagem cultural única
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
  },
  {
    id: 5,
    title: "Modelo de Negócio",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Básico</h4>
            <div className="text-3xl font-bold text-blue-600 mb-2">R$ 19,90</div>
            <div className="text-sm text-gray-600 mb-4">/mês</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• IA básica</li>
              <li>• Práticas guiadas</li>
              <li>• Avatar simples</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-6 text-center text-white">
            <h4 className="text-xl font-bold mb-4">Premium</h4>
            <div className="text-3xl font-bold mb-2">R$ 39,90</div>
            <div className="text-sm opacity-90 mb-4">/mês</div>
            <ul className="space-y-2 text-sm">
              <li>• IA avançada personalizada</li>
              <li>• Avatar 3D evolutivo</li>
              <li>• Análises profundas</li>
              <li>• Suporte prioritário</li>
            </ul>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Corporate</h4>
            <div className="text-3xl font-bold text-green-600 mb-2">R$ 99,90</div>
            <div className="text-sm text-gray-600 mb-4">/usuário/mês</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dashboard empresa</li>
              <li>• Relatórios executivos</li>
              <li>• Integração HR</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Projeção de Receita</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">2025</div>
              <div className="text-gray-600">R$ 2M ARR</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">2026</div>
              <div className="text-gray-600">R$ 8M ARR</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2027</div>
              <div className="text-gray-600">R$ 25M ARR</div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    title: "Fundador: Marcelo \"Lelo\" Rymer",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-green-400/30 rounded-full blur-2xl"></div>
              <div className="relative w-64 h-64 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/attached_assets/Lelo_rosto_melhorado_pitch_1753874485532.jpg"
                    alt="Marcelo Lelo Rymer"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const nextElement = img.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                        nextElement.classList.remove('hidden');
                      }
                    }}
                  />
                  <Users className="text-gray-500 hidden" size={80} />
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mt-6">Marcelo "Lelo" Rymer</h3>
            <p className="text-xl text-gray-200">Fundador & Visionário</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Experiência e Visão</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700"><strong>20+ anos</strong> como empresário em tecnologia e educação</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700"><strong>Transformação pessoal</strong> que originou a Essentia</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-purple-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700"><strong>Capacidade comprovada</strong> de execução e liderança</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 7,
    title: "Investimento e Projeções",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Rodada Seed</h3>
          <div className="text-6xl font-bold text-green-600 mb-4">R$ 8M</div>
          <p className="text-gray-600 text-lg">18 meses para break-even</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Usuários</h4>
            <div className="text-3xl font-bold text-blue-600">500K+</div>
            <div className="text-sm text-gray-600">meta em 24 meses</div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">ARR</h4>
            <div className="text-3xl font-bold text-green-600">R$ 25M</div>
            <div className="text-sm text-gray-600">projeção 2027</div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Valuation</h4>
            <div className="text-3xl font-bold text-purple-600">R$ 200M</div>
            <div className="text-sm text-gray-600">Série A target</div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 8,
    title: "Próximos Passos",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Roadmap 2025</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Q1: Beta público</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-blue-500" size={20} />
                <span>Q2: Lançamento oficial</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-purple-500" size={20} />
                <span>Q3: Expansão corporativa</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500" size={20} />
                <span>Q4: Série A</span>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Time Atual</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Desenvolvimento</span>
                <span className="text-green-600 font-bold">3 devs</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Design/UX</span>
                <span className="text-blue-600 font-bold">2 designers</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Psicologia</span>
                <span className="text-purple-600 font-bold">1 especialista</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Marketing</span>
                <span className="text-orange-600 font-bold">Em contratação</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Junte-se à Revolução</h3>
          <p className="text-white/90 text-lg">
            Transformar milhões de vidas enquanto construímos um negócio de impacto global
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)"
  },
  {
    id: 9,
    title: "Demonstração do Produto",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Prototype Funcional</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <Brain className="text-blue-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-blue-800 mb-2">IA Coach</h4>
              <p className="text-blue-700 text-sm">4 personalidades distintas com adaptação em tempo real</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <Users className="text-purple-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-purple-800 mb-2">Avatar 3D</h4>
              <p className="text-purple-700 text-sm">Representação visual evolutiva da jornada do usuário</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <Target className="text-green-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-green-800 mb-2">Gamificação</h4>
              <p className="text-green-700 text-sm">Sistema de conquistas e progressão personalizada</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Demo Disponível</h3>
          <p className="text-white/90 text-lg">
            Experimente o Essentia ao vivo - protótipo funcional com IA real integrada
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 10,
    title: "Contato - Se algo aqui mexeu com você",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-8">Não tenho todas as respostas,<br/>mas tenho o coração no jogo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-2xl font-bold text-purple-800 mb-4">Se algo aqui mexeu com você</h4>
                <p className="text-purple-700 text-lg">Me chama. Vamos conversar.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-3">O que eu acredito</h4>
                <div className="text-blue-700 space-y-2">
                  <p>• As pessoas precisam se reconectar consigo</p>
                  <p>• A tecnologia pode servir ao humano</p>
                  <p>• O Brasil merece soluções próprias</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-3">O que eu ofereço</h4>
                <div className="text-green-700 space-y-2">
                  <p>• 1 ano de dedicação integral</p>
                  <p>• 100+ páginas de conteúdo autoral</p>
                  <p>• 3 protótipos funcionais</p>
                  <p>• Validação com 20+ pessoas</p>
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-orange-800 mb-3">O que eu busco</h4>
                <div className="text-orange-700 space-y-2">
                  <p>• Parceiro(a) que acredite na visão</p>
                  <p>• Alguém com energia de execução</p>
                  <p>• Zero ego, muito propósito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Marcelo "Lelo" Rymer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">WhatsApp</h4>
              <p className="text-white/90">(11) 99999-9999</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Email</h4>
              <p className="text-white/90">lelo@essentia.app</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">LinkedIn</h4>
              <p className="text-white/90">/in/marcelo-rymer</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-white/90 text-xl italic">
              "O Essentia nasceu de uma transformação pessoal.<br/>
              Agora quero transformar outras vidas."
            </p>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  }
];

export default function EssentiaPitchPremium() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center text-white p-4 relative overflow-hidden"
      style={{ background: slide.bg }}
    >
      {/* Navigation */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium z-20">
        {currentSlide + 1} / {slides.length}
      </div>

      <div className="absolute top-6 left-6 flex gap-3 z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Content */}
      <div className="w-full max-w-7xl mx-auto z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-2xl">{slide.title}</h1>
          {slide.subtitle && (
            <h2 className="text-xl md:text-2xl opacity-90 font-medium drop-shadow-lg">{slide.subtitle}</h2>
          )}
        </div>
        <div className="flex justify-center">
          {slide.content}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20">
        <p className="text-sm opacity-80 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
          Use as setas do teclado ou os botões para navegar • Espaço para próximo slide
        </p>
      </div>
    </div>
  );
}