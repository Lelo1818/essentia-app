import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Brain, 
  Smartphone,
  Globe,
  Building,
  Baby,
  Award,
  Mic,
  Scan,
  Banknote,
  Target,
  Zap,
  Rocket
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  impact: string;
  timeline: string;
  market: string;
  icon: any;
  revenue: string;
  complexity: number;
}

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const futureFeatures: Feature[] = [
    {
      title: "Open Banking + IA Avançada",
      description: "Conexão direta com todos os bancos brasileiros para análise automática e investimentos inteligentes",
      impact: "Revoluciona gestão financeira pessoal no Brasil",
      timeline: "6-12 meses",
      market: "50+ milhões de usuários bancários",
      icon: Banknote,
      revenue: "R$ 2-5 por usuário/mês",
      complexity: 8
    },
    {
      title: "Comunidade Social Financeira",
      description: "Primeira rede social focada em conquistas financeiras com mentoria P2P e challenges nacionais",
      impact: "Cria movimento nacional de educação financeira",
      timeline: "3-6 meses",
      market: "100+ milhões brasileiros sem educação financeira",
      icon: Users,
      revenue: "Freemium + parcerias",
      complexity: 6
    },
    {
      title: "Coach IA 24/7 Emocional",
      description: "Primeiro assistente que detecta padrões emocionais de gastos e oferece terapia financeira",
      impact: "Combate vícios de consumo e ansiedade financeira",
      timeline: "12-18 meses",
      market: "Mercado de wellness + finanças",
      icon: Brain,
      revenue: "R$ 29/mês premium",
      complexity: 9
    },
    {
      title: "Flow Business (B2B)",
      description: "Versão empresarial para MEI, pequenas e médias empresas com gestão completa",
      impact: "Digitaliza finanças de 17+ milhões de MEIs",
      timeline: "6-9 meses",
      market: "17 milhões MEI + 6 milhões PMEs",
      icon: Building,
      revenue: "R$ 99-499/mês por empresa",
      complexity: 7
    },
    {
      title: "Flow Kids & Teen",
      description: "Educação financeira gamificada para crianças e adolescentes com aprovação dos pais",
      impact: "Forma nova geração financeiramente educada",
      timeline: "9-12 meses",
      market: "40+ milhões crianças/teens",
      icon: Baby,
      revenue: "R$ 19/mês por família",
      complexity: 5
    },
    {
      title: "NFTs de Conquistas",
      description: "Certificados digitais únicos para grandes vitórias financeiras, criando valor e status",
      impact: "Gamificação total + mercado NFT brasileiro",
      timeline: "12-15 meses",
      market: "Mercado NFT + gamificação",
      icon: Award,
      revenue: "% vendas NFT + royalties",
      complexity: 7
    },
    {
      title: "Assistente por Voz",
      description: "'Alexa do Flow' para registro por voz e análises conversacionais avançadas",
      impact: "Elimina completamente atrito de uso",
      timeline: "15-18 meses",
      market: "Usuários de assistentes (50M+)",
      icon: Mic,
      revenue: "Integrado ao premium",
      complexity: 8
    },
    {
      title: "Realidade Aumentada Shopping",
      description: "Scan de produtos para comparação de preços e cashback em tempo real",
      impact: "Transforma experiência de compra no Brasil",
      timeline: "18-24 meses",
      market: "E-commerce + varejo físico",
      icon: Scan,
      revenue: "% cashback + parcerias",
      complexity: 9
    },
    {
      title: "Expansão Internacional",
      description: "Flow para mercados latino-americanos e brasileiros no exterior",
      impact: "Primeiro super-app financeiro da América Latina",
      timeline: "24-36 meses",
      market: "América Latina + brasileiros exterior",
      icon: Globe,
      revenue: "Receita multiplicada por 10x",
      complexity: 10
    }
  ];

  const slides = [
    {
      title: "Flow: Visão Estratégica de Futuro",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Roadmap de Inovação 2024-2027
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              O Flow não é apenas um app financeiro. É o primeiro <strong>Super-App Brasileiro</strong> que 
              combinará finanças, educação, tecnologia e impacto social em um ecossistema revolucionário.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Rocket className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-blue-800">FASE 1: Foundation</h3>
                <p className="text-blue-700">Apps Core + Comunidade</p>
                <Badge className="mt-2 bg-blue-600">2024</Badge>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-purple-800">FASE 2: Intelligence</h3>
                <p className="text-purple-700">IA Avançada + Open Banking</p>
                <Badge className="mt-2 bg-purple-600">2025</Badge>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-green-800">FASE 3: Expansion</h3>
                <p className="text-green-700">Internacional + Super-App</p>
                <Badge className="mt-2 bg-green-600">2026-2027</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Pipeline de Inovação",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8">Funcionalidades Revolucionárias</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {futureFeatures.slice(0, 6).map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <div className="flex space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">{feature.timeline}</Badge>
                        <Badge className="text-xs bg-green-100 text-green-800">{feature.revenue}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Impacto de Mercado:</span>
                      <span className="font-medium">Alto</span>
                    </div>
                    <Progress value={feature.complexity * 10} className="h-2" />
                    <div className="text-xs text-blue-600 font-medium">{feature.impact}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Potencial de Mercado",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Oportunidade de Mercado Único</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              O Flow se posiciona na intersecção de 5 mercados bilionários em crescimento exponencial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Mercados Primários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Fintech Brasil</span>
                    <strong className="text-green-600">R$ 50B+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>EdTech Nacional</span>
                    <strong className="text-green-600">R$ 15B+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketplace/E-commerce</span>
                    <strong className="text-green-600">R$ 200B+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Wellness Digital</span>
                    <strong className="text-green-600">R$ 8B+</strong>
                  </div>
                  <hr className="border-green-300" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Mercado Total Endereçável</span>
                    <strong className="text-green-700">R$ 273B+</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Usuários Potenciais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Brasileiros bancarizados</span>
                    <strong className="text-blue-600">150M+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>MEI + Pequenas Empresas</span>
                    <strong className="text-blue-600">23M+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Crianças/Teens (Flow Kids)</span>
                    <strong className="text-blue-600">40M+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>América Latina (futuro)</span>
                    <strong className="text-blue-600">400M+</strong>
                  </div>
                  <hr className="border-blue-300" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Base Total Potencial</span>
                    <strong className="text-blue-700">613M+ usuários</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-purple-800 mb-3">Projeção Financeira Conservadora</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">R$ 500M</div>
                <div className="text-sm text-purple-700">Receita Ano 3</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10M+</div>
                <div className="text-sm text-blue-700">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">R$ 5B+</div>
                <div className="text-sm text-green-700">Valuation Potencial</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <div className="text-white/80 text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Slide Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 min-h-[80vh]">
          {slides[currentSlide].content}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <InteractiveButton
            variant="outline"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="bg-white/20 text-white border-white/30"
            soundType="click"
          >
            Anterior
          </InteractiveButton>
          
          <div className="text-white text-center">
            <div className="text-sm opacity-80">Demonstração para Investidores</div>
            <div className="font-bold">Flow: Ecossistema do Futuro</div>
          </div>
          
          <InteractiveButton
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            soundType="success"
          >
            Próximo
            <ArrowRight className="w-4 h-4 ml-2" />
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
}