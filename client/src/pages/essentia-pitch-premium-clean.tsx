import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Users, Building, Target, DollarSign, TrendingUp, BarChart3, Star, Rocket, ArrowUp, Heart, Brain, Globe } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "🌱 ESSENTIA",
    subtitle: "Pitch Profissional com os Pés no Chão",
    content: (
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative text-8xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-black">
            🌱 ESSENTIA
          </div>
        </div>
        <p className="text-2xl text-white/90 font-medium">
          Reconectando pessoas com seu propósito através de práticas simbólicas e tecnologia sensível
        </p>
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Marcelo Rymer</h3>
          <p className="text-white/90">Ex-empresário, Construtor Simbólico</p>
          <p className="text-white/80 text-sm mt-2">1 ano de dedicação solo total</p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "📍 O Problema",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">A Realidade que Vivemos</h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p className="font-medium">Vivemos uma era de <strong>excesso de informação</strong>, <strong>burnout silencioso</strong> e <strong>desconexão profunda</strong> de nós mesmos.</p>
            <p>As pessoas não sabem mais por onde começar a se escutar.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-red-50 rounded-3xl p-6">
            <h4 className="text-xl font-bold text-red-800 mb-4">O que está faltando</h4>
            <ul className="space-y-3 text-red-700">
              <li>• Ferramentas simples e simbólicas</li>
              <li>• Reconexão com propósito real</li>
              <li>• Espaço para se escutar de verdade</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-3xl p-6">
            <h4 className="text-xl font-bold text-orange-800 mb-4">Apps genéricos falham</h4>
            <ul className="space-y-3 text-orange-700">
              <li>• Não tocam o que realmente importa</li>
              <li>• Falta de profundidade simbólica</li>
              <li>• Experiência funcional, não emocional</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  {
    id: 3,
    title: "🌿 A Solução",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Essentia convida o usuário a sair do automático</h3>
          <p className="text-lg text-gray-700 mb-6">
            Um app que reconecta propósito, bem-estar e ação através de um espaço íntimo de despertar
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-green-800 mb-4">Práticas Simbólicas</h4>
            <p className="text-green-700">Rituais, respiração e caminhadas conscientes</p>
          </div>
          <div className="bg-blue-50 rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-blue-800 mb-4">Trilhas Reflexivas</h4>
            <p className="text-blue-700">Jornadas guiadas e personalizadas</p>
          </div>
          <div className="bg-purple-50 rounded-3xl p-6 text-center">
            <h4 className="text-xl font-bold text-purple-800 mb-4">Microações</h4>
            <p className="text-purple-700">Com significado real e impacto duradouro</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Não é terapia nem autoajuda rápida</h3>
          <p className="text-white/90 text-lg">
            Integra sabedoria da natureza, conexão humana e tecnologia com sensibilidade
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    id: 4,
    title: "📊 Mercado",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Mercado de Bem-Estar Mental no Brasil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600">US$ 2.7B</div>
              <div className="text-gray-600">Mercado atual (2022)</div>
              <div className="text-sm text-gray-500">Global Wellness Institute</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">US$ 1.28B</div>
              <div className="text-gray-600">Bem-estar digital - Projeção 2030</div>
              <div className="text-sm text-gray-500">Apps meditação, saúde mental</div>
            </div>
          </div>
          <p className="text-gray-700 mt-4">Apps de meditação, propósito e autocuidado estão entre os mais baixados (25-45 anos)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">🥊 Concorrência</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Zenklub, Vittude</span>
                <span className="text-sm text-gray-500">Terapia online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cíngulo</span>
                <span className="text-sm text-gray-500">Meditação guiada</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Zen App</span>
                <span className="text-sm text-gray-500">Mindfulness</span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-3xl p-6">
            <h4 className="text-xl font-bold text-green-800 mb-4">🌱 Nossos Diferenciais</h4>
            <ul className="space-y-2 text-green-700">
              <li>• Integração real propósito + bem-estar</li>
              <li>• Trilha simbólica viva e personalizada</li>
              <li>• Rituais, respiração, caminhadas conscientes</li>
              <li>• Diários e frases essenciais</li>
              <li>• Estética sensível, leve, profunda</li>
              <li>• Experiência emocional, não só funcional</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
  },
  {
    id: 5,
    title: "💰 Monetização & MVP",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Estratégia de Lançamento</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-bold text-green-800">📱 Versão Gratuita Rica</h4>
                <p className="text-green-700 text-sm">Diário, frases, trilha inicial, rituais simples</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-bold text-blue-800">🔐 Upgrade Opcional</h4>
                <p className="text-blue-700 text-sm">R$ 9,90/mês → recursos extras desbloqueados</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-bold text-purple-800">💎 Futuro Premium</h4>
                <p className="text-purple-700 text-sm">R$ 19,90-29,90, comunidade, mentorias, IA simbólica avançada</p>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📈 Projeções Realistas (1º ano)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Usuários ativos</span>
                <span className="text-xl font-bold text-blue-600">5.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pagantes (~20%)</span>
                <span className="text-xl font-bold text-green-600">1.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ticket médio</span>
                <span className="text-xl font-bold text-purple-600">R$ 15/mês</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-gray-800 font-bold">Receita estimada</span>
                <span className="text-2xl font-bold text-green-600">R$ 15K/mês</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-6 text-center">
          <h4 className="text-xl font-bold text-white mb-2">🔑 Nosso Trunfo</h4>
          <p className="text-white/90">Abordagem simbólica + IA personalizada contra abandono precoce</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white/90 text-sm">Retenção-alvo (dia 30)</p>
              <p className="text-white font-bold">25-30%</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white/90 text-sm">vs. média mercado</p>
              <p className="text-white font-bold">~3,3%</p>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    title: "👤 Quem sou eu",
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
                    alt="Marcelo Rymer"
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
            <h3 className="text-3xl font-bold text-white mt-6">Marcelo Rymer</h3>
            <p className="text-xl text-gray-200">Ex-empresário, Construtor Simbólico</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">A Jornada Real</h4>
            <div className="space-y-4 text-gray-700">
              <p><strong>Ex-empresário</strong> (importação, mercado financeiro)</p>
              <p><strong>Sem background em tech</strong>, mas com alma de construtor simbólico</p>
              <p className="bg-blue-50 rounded-lg p-3">
                <strong>Criei o Essentia após um colapso pessoal de sentido.</strong>
              </p>
              <div className="space-y-2">
                <p>• Pesquisei, escrevi, testei — sozinho, por 1 ano</p>
                <p>• Fiz mockups, contratei dev, perdi dinheiro — e insisti</p>
                <p className="font-medium text-green-700">O Essentia é meu chamado.</p>
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
    title: "🧱 O que já está feito",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">1 Ano de Dedicação Total</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-800"><strong>100+ páginas</strong> de conteúdo autoral simbólico prontas</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-800"><strong>3 versões</strong> de mockups navegáveis (Replit)</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-800"><strong>Roteiro funcional completo</strong> de jornadas e features</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-800"><strong>Validação informal</strong> com +20 pessoas (feedback positivo)</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-800"><strong>Dossiê de documentação</strong> organizado e estruturado</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-800"><strong>1 ano de dedicação solo total</strong> (conteúdo, design, estratégia)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Tudo pronto para validação e MVP real</h3>
          <p className="text-white/90 text-lg">
            Base sólida construída — agora preciso de parceiro para escalar
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 8,
    title: "🤝 O que estou buscando",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Busco um co-founder ou small builder</h3>
          <p className="text-lg text-gray-700 mb-6">
            Com visão, sensibilidade e energia de execução
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-3xl p-6">
            <h4 className="text-xl font-bold text-blue-800 mb-4">O Que Quero</h4>
            <ul className="space-y-3 text-blue-700">
              <li>• Que entre agora</li>
              <li>• Ajude a moldar o MVP real</li>
              <li>• Valide com usuários</li>
              <li>• Pense grande</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-3xl p-6">
            <h4 className="text-xl font-bold text-green-800 mb-4">Perfil Ideal</h4>
            <ul className="space-y-3 text-green-700">
              <li>• Alguém dentro, não só prestando serviço</li>
              <li>• Zero ego, muito propósito</li>
              <li>• Visão de impacto real</li>
              <li>• Sensibilidade e energia de execução</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-3xl p-6">
            <h4 className="text-xl font-bold text-purple-800 mb-4">Ofereço</h4>
            <ul className="space-y-3 text-purple-700">
              <li>• Equity aberta</li>
              <li>• Base sólida construída</li>
              <li>• Projeto vivo</li>
              <li>• Parceria verdadeira</li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Projeto Vivo</h3>
          <p className="text-white/90 text-lg">
            Não é só um app — é um movimento para reconectar pessoas com seu propósito
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)"
  },
  {
    id: 9,
    title: "Demonstração Disponível",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Mockups Navegáveis Prontos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="font-bold text-green-800 mb-2">Práticas Simbólicas</h4>
              <p className="text-green-700 text-sm">Rituais, respiração, caminhadas conscientes</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-4xl mb-4">🧠</div>
              <h4 className="font-bold text-blue-800 mb-2">IA Personalizada</h4>
              <p className="text-blue-700 text-sm">4 personalidades adaptáveis em tempo real</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="text-4xl mb-4">📖</div>
              <h4 className="font-bold text-purple-800 mb-2">Diário & Trilhas</h4>
              <p className="text-purple-700 text-sm">Jornadas reflexivas e autoconhecimento</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">3 Versões Funcionais</h3>
          <p className="text-white/90 text-lg mb-4">
            Protótipos navegáveis com conteúdo real e fluxos completos
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
            <p className="text-white/90 text-sm">
              Acesse agora: <strong>/essentia-pro</strong> • <strong>/purpose</strong> • <strong>/essentia-demo</strong>
            </p>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 10,
    title: "Vamos conversar?",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-8">Se algo aqui mexeu com você</h3>
          <p className="text-2xl text-gray-700 mb-8">Me chama. Vamos conversar.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-800 mb-3">O que eu ofereço</h4>
              <div className="text-blue-700 space-y-2 text-sm">
                <p>• 1 ano de dedicação integral</p>
                <p>• 100+ páginas de conteúdo autoral</p>
                <p>• 3 protótipos funcionais</p>
                <p>• Validação com 20+ pessoas</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-green-800 mb-3">O que eu busco</h4>
              <div className="text-green-700 space-y-2 text-sm">
                <p>• Co-founder que acredite na visão</p>
                <p>• Alguém com energia de execução</p>
                <p>• Zero ego, muito propósito</p>
                <p>• Parceiro(a) para escalar junto</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-purple-800 mb-3">Como funciona</h4>
              <div className="text-purple-700 space-y-2 text-sm">
                <p>• Equity aberta</p>
                <p>• Projeto vivo</p>
                <p>• Base sólida construída</p>
                <p>• Pronto para MVP real</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Marcelo Rymer</h3>
          <p className="text-white/80 mb-6">Ex-empresário que encontrou seu propósito</p>
          
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
          
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white/90 text-xl italic">
              "O Essentia é meu chamado.<br/>
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


    </div>
  );
}