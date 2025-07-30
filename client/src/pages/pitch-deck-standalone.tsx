import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Essentia",
    subtitle: "Transformando o Bem-Estar Digital no Brasil",
    content: (
      <div className="text-center">
        <div className="bg-white/20 rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-2xl mb-4">Pitch Deck para Investidores</p>
          <p className="text-xl">Rodada Seed - R$ 8M</p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "A Crise do Bem-Estar no Brasil",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
          <div className="text-6xl font-bold text-blue-600 mb-4">70%</div>
          <div className="text-lg">dos brasileiros sofrem com ansiedade</div>
        </div>
        <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
          <div className="text-6xl font-bold text-purple-600 mb-4">71%</div>
          <div className="text-lg">relatam impacto na produtividade</div>
        </div>
        <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
          <div className="text-6xl font-bold text-red-600 mb-4">3,3%</div>
          <div className="text-lg">buscam ajuda profissional</div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Oportunidade de Mercado Bilionária",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
        <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
          <h3 className="text-2xl font-bold mb-6">Mercado Brasileiro 2024</h3>
          <div className="text-5xl font-bold text-blue-600 mb-4">US$ 543,5M</div>
          <div className="text-xl">Wellness Digital</div>
        </div>
        <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
          <h3 className="text-2xl font-bold mb-6">Projeção 2030</h3>
          <div className="text-5xl font-bold text-green-600 mb-4">US$ 1,28B</div>
          <div className="text-xl">CAGR 15%</div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "Essentia: IA + Gamificação + Cultura Brasileira",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        <div className="bg-white/90 rounded-xl p-6 text-gray-800">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-xl font-bold mb-3">Avaliação Holística</h3>
          <p>Roda da Vida digital com análise de IA personalizada para a realidade brasileira</p>
        </div>
        <div className="bg-white/90 rounded-xl p-6 text-gray-800">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-xl font-bold mb-3">Gamificação Inteligente</h3>
          <p>Sistema de conquistas, rituais e avatar 3D que evolui com o progresso do usuário</p>
        </div>
        <div className="bg-white/90 rounded-xl p-6 text-gray-800">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-3">IA Comportamental</h3>
          <p>Algoritmos proprietários que se adaptam aos padrões culturais e comportamentais únicos do Brasil</p>
        </div>
        <div className="bg-white/90 rounded-xl p-6 text-gray-800">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-3">Experiência Mobile-First</h3>
          <p>Interface otimizada para o uso brasileiro, com foco em simplicidade e engajamento</p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    id: 5,
    title: "3 Pilares de Diferenciação",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-white/90 rounded-xl p-8 text-gray-800">
          <div className="text-4xl mb-4">🇧🇷</div>
          <h3 className="text-xl font-bold mb-4">Cultura Brasileira</h3>
          <ul className="space-y-2 text-left">
            <li>• Adaptado ao jeitinho brasileiro</li>
            <li>• Linguagem e contexto locais</li>
            <li>• Padrões comportamentais únicos</li>
          </ul>
        </div>
        <div className="bg-white/90 rounded-xl p-8 text-gray-800">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-4">IA Proprietária</h3>
          <ul className="space-y-2 text-left">
            <li>• Algoritmos desenvolvidos internamente</li>
            <li>• Personalização avançada</li>
            <li>• Aprendizado contínuo</li>
          </ul>
        </div>
        <div className="bg-white/90 rounded-xl p-8 text-gray-800">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-4">Gamificação Científica</h3>
          <ul className="space-y-2 text-left">
            <li>• Base em neurociência</li>
            <li>• Engajamento sustentável</li>
            <li>• Resultados mensuráveis</li>
          </ul>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    title: "Projeções Financeiras (3 Anos)",
    content: (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mb-8">
          <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
            <div className="text-4xl font-bold text-blue-600 mb-4">2025</div>
            <div className="text-lg mb-2">50K-100K usuários</div>
            <div className="text-2xl font-bold text-green-600">R$ 2M-5M</div>
          </div>
          <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
            <div className="text-4xl font-bold text-purple-600 mb-4">2026</div>
            <div className="text-lg mb-2">300K-500K usuários</div>
            <div className="text-2xl font-bold text-green-600">R$ 15M-25M</div>
          </div>
          <div className="bg-white/90 rounded-xl p-8 text-center text-gray-800">
            <div className="text-4xl font-bold text-orange-600 mb-4">2027</div>
            <div className="text-lg mb-2">1M+ usuários</div>
            <div className="text-2xl font-bold text-green-600">R$ 50M-80M</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Valuation Projetada 2027: R$ 400M-960M</h3>
          <p className="text-lg">Revenue Multiple (Health Tech): 8-12x</p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 7,
    title: "Marcelo \"Lelo\" Rymer – Fundador & Visionário",
    content: (
      <div className="max-w-5xl">
        <div className="bg-white/90 rounded-xl p-8 text-gray-800 mb-8">
          <h3 className="text-2xl font-bold mb-4">Especialista em bem-estar digital e comportamento humano</h3>
          <div className="space-y-4 text-lg">
            <p><strong>20+ anos de experiência</strong> como empresário em tecnologia, educação e mercado financeiro</p>
            <p><strong>Trajetória pessoal de autoconhecimento</strong> que deu origem à Essentia</p>
            <p><strong>Capacidade comprovada</strong> de construir negócios do zero e liderar equipes multidisciplinares</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/90 rounded-xl p-6 text-gray-800">
            <h4 className="text-xl font-bold mb-4">Rede Estratégica</h4>
            <ul className="space-y-2">
              <li>• Psicólogos clínicos</li>
              <li>• Neurocientistas</li>
              <li>• Especialistas em IA e gamificação</li>
              <li>• Designers UX/UI</li>
            </ul>
          </div>
          <div className="bg-white/90 rounded-xl p-6 text-gray-800">
            <h4 className="text-xl font-bold mb-4">Parcerias Acadêmicas</h4>
            <ul className="space-y-2">
              <li>• USP - Validação científica</li>
              <li>• Hospital Albert Einstein</li>
              <li>• Centros de pesquisa</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 8,
    title: "Rodada Seed: R$ 8M",
    content: (
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/90 rounded-xl p-8 text-gray-800">
            <h3 className="text-2xl font-bold mb-6">Uso dos Recursos</h3>
            <ul className="space-y-3 text-lg">
              <li>• Equipe (40%) - R$ 3.2M</li>
              <li>• Marketing (30%) - R$ 2.4M</li>
              <li>• Produto & IA (20%) - R$ 1.6M</li>
              <li>• Operações (10%) - R$ 800K</li>
            </ul>
          </div>
          <div className="bg-white/90 rounded-xl p-8 text-gray-800">
            <h3 className="text-2xl font-bold mb-6">Milestones 18 Meses</h3>
            <ul className="space-y-3 text-lg">
              <li>• Q1-Q2 2025: 50K usuários</li>
              <li>• Q3-Q4 2025: 200K usuários</li>
              <li>• Q1-Q2 2026: 500K usuários</li>
              <li>• Preparação Série A: R$ 20M</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Por que investir agora?</h3>
          <p className="text-lg">Mercado em Crescimento (15% CAGR) • MVP Validado • Diferenciação Clara</p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    id: 9,
    title: "Obrigado!",
    subtitle: "Vamos transformar o bem-estar digital juntos?",
    content: (
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/90 rounded-xl p-8 text-gray-800">
            <h3 className="text-2xl font-bold mb-6">Contato</h3>
            <ul className="space-y-3 text-lg">
              <li>📧 contato@essentia.app</li>
              <li>💼 LinkedIn: /company/essentia-wellness</li>
              <li>🌐 www.essentia.app</li>
            </ul>
          </div>
          <div className="bg-white/90 rounded-xl p-8 text-gray-800">
            <h3 className="text-2xl font-bold mb-6">Próximos Passos</h3>
            <ul className="space-y-3 text-lg">
              <li>✓ Demo personalizada</li>
              <li>✓ Due diligence técnica</li>
              <li>✓ Reunião com equipe</li>
            </ul>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-6 text-center">
          <strong className="text-xl">R$ 8M Rodada Seed • 18 meses Break-even • 500K+ Usuários meta</strong>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  }
];

export default function PitchDeckStandalone() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center text-white p-8"
      style={{ background: slide.bg }}
    >
      {/* Navigation */}
      <div className="absolute top-4 right-4 bg-black/20 rounded-lg px-4 py-2">
        {currentSlide + 1} / {slides.length}
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="bg-black/20 hover:bg-black/30 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="bg-black/20 hover:bg-black/30 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Content */}
      <div className="text-center max-w-7xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
        {slide.subtitle && (
          <h2 className="text-2xl md:text-3xl mb-8 opacity-90">{slide.subtitle}</h2>
        )}
        <div className="flex justify-center">
          {slide.content}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm opacity-70">Use as setas do teclado ou os botões para navegar</p>
      </div>
    </div>
  );
}