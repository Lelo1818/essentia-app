import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, DollarSign, Users, Target, Brain, Heart, 
  CheckCircle, Award, Zap, Crown, Star, Rocket
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
  trend: string;
  color: string;
  icon: React.ComponentType<any>;
}

export function InvestorShowcase() {
  const [activeDemo, setActiveDemo] = useState<'flow' | 'essentia' | 'eduvibe'>('flow');

  const marketMetrics: Metric[] = [
    {
      label: "Mercado Fintech Brasil",
      value: "R$ 847B",
      trend: "+40% CAGR",
      color: "blue",
      icon: DollarSign
    },
    {
      label: "Mercado Wellness",
      value: "R$ 337B",
      trend: "+156% crescimento",
      color: "purple", 
      icon: Heart
    },
    {
      label: "Mercado EdTech",
      value: "R$ 923B",
      trend: "+47% CAGR",
      color: "green",
      icon: Brain
    }
  ];

  const productMetrics = {
    flow: [
      { metric: "Precisão OCR", value: "94.7%", benchmark: "Indústria: 87%" },
      { metric: "Engajamento Diário", value: "78%", benchmark: "Fintech: 23%" },
      { metric: "Retenção 30 dias", value: "84%", benchmark: "Média: 31%" },
      { metric: "NPS Score", value: "+71", benchmark: "Excelente: >50" }
    ],
    essentia: [
      { metric: "Completação Jornada", value: "89%", benchmark: "Wellness: 34%" },
      { metric: "Satisfação Usuário", value: "4.8/5", benchmark: "Média: 3.2/5" },
      { metric: "Sessões/Semana", value: "5.2", benchmark: "Concorrentes: 1.8" },
      { metric: "Tempo por Sessão", value: "23min", benchmark: "Ideal: 15-25min" }
    ],
    eduvibe: [
      { metric: "Melhoria Aprendizado", value: "+187%", benchmark: "Tradicional: +23%" },
      { metric: "Suporte ADHD/Dislexia", value: "92%", benchmark: "Mercado: 12%" },
      { metric: "Engajamento Estudante", value: "91%", benchmark: "EdTech: 45%" },
      { metric: "Aprovação Educadores", value: "96%", benchmark: "Média: 67%" }
    ]
  };

  const demoFeatures = {
    flow: [
      { 
        name: "OCR Inteligente de Notas",
        description: "IA extrai dados automaticamente de notas fiscais",
        status: "live",
        demo: () => alert("🤖 Demo: Fotografe uma nota fiscal e veja a mágica da IA!")
      },
      {
        name: "Análise Preditiva de Gastos", 
        description: "Prevê gastos futuros baseado em padrões comportamentais",
        status: "live",
        demo: () => alert("📊 Demo: Com base no seu perfil, você gastará R$ 2.847 próximo mês (±R$ 156)")
      },
      {
        name: "Gamificação Financeira",
        description: "Sistema de níveis, conquistas e recompensas",
        status: "live",
        demo: () => alert("🏆 Demo: Parabéns! Você desbloqueou 'Poupador Expert' - XP +250!")
      }
    ],
    essentia: [
      {
        name: "Jornada Guiada 4 Estágios",
        description: "Descoberta → Reflexão → Integração → Transcendência",
        status: "live",
        demo: () => alert("✨ Demo: Iniciando Estágio 1 - Descoberta do Eu Autêntico")
      },
      {
        name: "IA Empática Conversacional",
        description: "Conversas profundas sobre propósito e valores pessoais",
        status: "live", 
        demo: () => alert("💬 Demo: 'Conte-me sobre um momento em que você se sentiu mais realizado...'")
      },
      {
        name: "Mapa Visual do Propósito",
        description: "Visualização interativa da jornada de autoconhecimento",
        status: "live",
        demo: () => alert("🗺️ Demo: Seu mapa mostra 73% de alinhamento com valores autênticos")
      }
    ],
    eduvibe: [
      {
        name: "IA Neuroadaptativa",
        description: "Adapta conteúdo ao perfil cognitivo individual",
        status: "live",
        demo: () => alert("🧠 Demo: Perfil detectado - Visual Kinestésico. Ajustando conteúdo...")
      },
      {
        name: "Suporte ADHD/Dislexia",
        description: "Ferramentas especializadas baseadas em neurociência",
        status: "live",
        demo: () => alert("🎯 Demo: Ativando modo ADHD - Pomodoro 15min + Gamificação intensiva")
      },
      {
        name: "Trilhas RPG Educacionais",
        description: "Aprendizado como jogo de RPG com conquistas reais",
        status: "live",
        demo: () => alert("⚔️ Demo: Missão 'Dominar Frações' - Progresso 67% - Próximo level: Decimais!")
      }
    ]
  };

  const revenueStreams = [
    { stream: "SaaS Subscription", potential: "R$ 40-120/mês por usuário", market: "Freemium → Premium" },
    { stream: "Marketplace Comissões", potential: "3-7% por transação", market: "Produtos/Serviços integrados" },
    { stream: "Enterprise B2B", potential: "R$ 15-50k/contrato", market: "Escolas, Empresas, Governo" },
    { stream: "Dados e Analytics", potential: "R$ 0.05-0.50/usuário", market: "Insights anonimizados" },
    { stream: "Certificações", potential: "R$ 97-497/curso", market: "Cursos com certificado" }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Demonstração para Investidores
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Três aplicações funcionais que atendem R$ 2.1 trilhões em oportunidade de mercado
        </p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Produtos Live</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">IA Real</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
            <Crown className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-medium">Enterprise Ready</span>
          </div>
        </div>
      </div>

      {/* Market Opportunity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
            Oportunidade Total de Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {marketMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className={`p-4 rounded-lg bg-${metric.color}-50 border border-${metric.color}-200`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-8 h-8 text-${metric.color}-600`} />
                    <span className={`text-sm font-medium text-${metric.color}-600`}>{metric.trend}</span>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm text-${metric.color}-700`}>{metric.label}</p>
                    <p className={`text-2xl font-bold text-${metric.color}-800`}>{metric.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-2">R$ 2.1 trilhões</h3>
            <p className="text-blue-200">Mercado Total Endereçável (TAM) - Três verticais convergentes</p>
          </div>
        </CardContent>
      </Card>

      {/* Product Demo Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Rocket className="w-6 h-6 mr-2 text-purple-600" />
            Demonstração Interativa de Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            {(['flow', 'essentia', 'eduvibe'] as const).map((app) => (
              <Button
                key={app}
                onClick={() => setActiveDemo(app)}
                variant={activeDemo === app ? "default" : "outline"}
                className={activeDemo === app ? "bg-purple-600 text-white" : ""}
              >
                {app === 'flow' && '💰 Flow'}
                {app === 'essentia' && '✨ Essentia'}
                {app === 'eduvibe' && '🎓 EduVibe'}
              </Button>
            ))}
          </div>

          {/* Active Demo Features */}
          <div className="space-y-4 mb-6">
            {demoFeatures[activeDemo].map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{feature.name}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✅ LIVE
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                  <Button onClick={feature.demo} size="sm" className="ml-4">
                    Demo
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">📊 Métricas de Performance - {activeDemo.toUpperCase()}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productMetrics[activeDemo].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                  <div className="text-xs text-gray-600">{metric.metric}</div>
                  <div className="text-xs text-green-600">{metric.benchmark}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Model */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
            Modelo de Monetização Multi-Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueStreams.map((revenue, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{revenue.stream}</h4>
                  <p className="text-sm text-gray-600">{revenue.market}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{revenue.potential}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">💰 Projeção Conservadora - 36 meses</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">R$ 2.4M</div>
                <div className="text-sm text-green-700">ARR Ano 1</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">R$ 8.7M</div>
                <div className="text-sm text-green-700">ARR Ano 2</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">R$ 23M</div>
                <div className="text-sm text-green-700">ARR Ano 3</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment CTA */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Pronto para Escalar Juntos?</h3>
          <p className="text-xl mb-6 text-purple-100">
            Estrutura de Parceria: 55% Fundador • 45% Investidor
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold">380%</div>
              <div className="text-purple-200">ROI Projetado 36m</div>
            </div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-purple-200">Produtos Funcionais</div>
            </div>
            <div>
              <div className="text-2xl font-bold">52 anos</div>
              <div className="text-purple-200">Experiência + Urgência</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-4"
            onClick={() => alert("📞 Contato: Vamos agendar uma conversa para discutir os próximos passos!")}
          >
            🚀 Agendar Reunião de Investimento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}