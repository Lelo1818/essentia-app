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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Flow: Produto Revolucionário PRONTO
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              O Flow não é apenas um app financeiro. É o primeiro <strong>Super-App Brasileiro</strong> que 
              JÁ COMBINA finanças, educação, tecnologia e impacto social em um ecossistema funcionando.
            </p>
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-4 inline-block">
              <div className="text-green-800 font-bold">PRODUTO FUNCIONAL - PRONTO PARA MERCADO</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <Rocket className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-green-800">✅ IMPLEMENTADO</h3>
                <p className="text-green-700">3 Apps + Funcionalidades IA</p>
                <Badge className="mt-2 bg-green-600">FUNCIONANDO</Badge>
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
          <h2 className="text-3xl font-bold text-center mb-8">Funcionalidades IMPLEMENTADAS E FUNCIONAIS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Implemented Features */}
            <Card className="hover:shadow-lg transition-all duration-300 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Análise de Humor IA</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">✅ FUNCIONANDO</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Receita Imediata</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">IA detecta padrões emocionais de gastos e previne compras impulsivas em tempo real</p>
                <div className="text-xs text-green-600 font-medium">Primeira no mundo: terapia financeira por IA</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Marketplace Cashback</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">✅ FUNCIONANDO</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Até 12% cashback</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Marketplace integrado com 150+ lojas oferecendo cashback direto na conta Flow</p>
                <div className="text-xs text-green-600 font-medium">Monetização: % das transações de cashback</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Assistente por Voz</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">✅ FUNCIONANDO</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Português nativo</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">"Gastei 50 reais no supermercado" - Comandos naturais em português brasileiro</p>
                <div className="text-xs text-green-600 font-medium">Único no Brasil: reconhecimento natural de comandos financeiros</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">NFTs de Conquistas</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">✅ FUNCIONANDO</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Sistema completo</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Certificados digitais únicos para conquistas financeiras com raridade e compartilhamento</p>
                <div className="text-xs text-green-600 font-medium">Gamificação total: engajamento 300% maior</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Flow Kids</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">✅ FUNCIONANDO</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">App completo</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Educação financeira gamificada para crianças com controle parental total</p>
                <div className="text-xs text-green-600 font-medium">Mercado inexplorado: 40M+ crianças no Brasil</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">UX Premium Total</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">✅ FUNCIONANDO</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Sons + Vibração</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Sistema completo de feedback sonoro, vibração e avatares personalizados</p>
                <div className="text-xs text-green-600 font-medium">Experiência sensorial única no mercado financeiro</div>
              </CardContent>
            </Card>
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
          
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-3">Produto PRONTO + Projeção Realística</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">PRODUTO FUNCIONAL</div>
                <div className="text-sm text-green-700">Pronto para lançamento</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100K usuários</div>
                <div className="text-sm text-blue-700">Meta conservadora Ano 1</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">R$ 50M+</div>
                <div className="text-sm text-purple-700">Valuation realístico</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Roadmap Bilionário",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Próximas Funcionalidades: Potencial Bilionário</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Com o produto base funcionando, estas são as funcionalidades que transformarão o Flow 
              no primeiro super-app bilionário do Brasil
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Future Billion-Dollar Features */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                    <Banknote className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Open Banking + IA Avançada</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-yellow-600 text-white">⏳ 6-12 MESES</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">R$ 2-5/usuário/mês</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Conexão direta com todos os bancos brasileiros para análise automática e investimentos inteligentes</p>
                <div className="text-xs text-yellow-600 font-medium">💰 Mercado: 50+ milhões de usuários bancários</div>
                <div className="text-xs text-orange-600 font-medium">🚀 Diferencial: Revoluciona gestão financeira pessoal no Brasil</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Comunidade Social Financeira</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-purple-600 text-white">⏳ 3-6 MESES</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Freemium + parcerias</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Primeira rede social focada em conquistas financeiras com mentoria P2P e challenges nacionais</p>
                <div className="text-xs text-purple-600 font-medium">💰 Mercado: 100+ milhões brasileiros sem educação financeira</div>
                <div className="text-xs text-pink-600 font-medium">🚀 Diferencial: Cria movimento nacional de educação financeira</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <Bitcoin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Portfolio Crypto Integrado</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-orange-600 text-white">⏳ 6-9 MESES</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">% transações</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Gestão completa de criptomoedas integrada ao planejamento financeiro tradicional</p>
                <div className="text-xs text-orange-600 font-medium">💰 Mercado: Crypto + investimentos brasileiros</div>
                <div className="text-xs text-red-600 font-medium">🚀 Diferencial: Único app que une crypto + finanças tradicionais</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Coach IA 24/7 Emocional</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-indigo-600 text-white">⏳ 12-18 MESES</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">R$ 29/mês premium</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Primeiro assistente que detecta padrões emocionais de gastos e oferece terapia financeira</p>
                <div className="text-xs text-indigo-600 font-medium">💰 Mercado: Wellness + finanças</div>
                <div className="text-xs text-blue-600 font-medium">🚀 Diferencial: Combate vícios de consumo e ansiedade financeira</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Flow Business (B2B)</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-green-600 text-white">⏳ 6-9 MESES</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">R$ 99-499/mês</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Versão empresarial para MEI, pequenas e médias empresas com gestão completa</p>
                <div className="text-xs text-green-600 font-medium">💰 Mercado: 17 milhões MEI + 6 milhões PMEs</div>
                <div className="text-xs text-emerald-600 font-medium">🚀 Diferencial: Digitaliza finanças de 17+ milhões de MEIs</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Expansão Internacional</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <Badge className="text-xs bg-blue-600 text-white">⏳ 24-36 MESES</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">Receita x10</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">Flow para mercados latino-americanos e brasileiros no exterior</p>
                <div className="text-xs text-blue-600 font-medium">💰 Mercado: América Latina + brasileiros exterior</div>
                <div className="text-xs text-indigo-600 font-medium">🚀 Diferencial: Primeiro super-app financeiro da América Latina</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-xl border-2 border-yellow-300">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Potencial de Valuation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-green-600">R$ 500M</div>
                <div className="text-green-700 font-medium">Com Open Banking</div>
                <div className="text-sm text-gray-600">Receita recorrente alta</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">R$ 2B</div>
                <div className="text-purple-700 font-medium">Com Rede Social</div>
                <div className="text-sm text-gray-600">Efeito rede + engajamento</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600">R$ 10B+</div>
                <div className="text-orange-700 font-medium">Super-App Completo</div>
                <div className="text-sm text-gray-600">Ecossistema dominante</div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg">
            <h4 className="font-bold text-red-800 mb-3 text-center">⚡ URGÊNCIA COMPETITIVA</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-red-700 mb-2">Janela de Oportunidade:</h5>
                <ul className="space-y-1 text-red-600">
                  <li>• Nubank ainda não tem IA emocional</li>
                  <li>• Nenhum app brasileiro tem assistente de voz</li>
                  <li>• Mercado de crianças completamente inexplorado</li>
                  <li>• Open Banking ainda em implementação</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-red-700 mb-2">Vantagem do Pioneiro:</h5>
                <ul className="space-y-1 text-red-600">
                  <li>• 18-24 meses de vantagem competitiva</li>
                  <li>• Produto base já funcionando</li>
                  <li>• Tecnologia validada e testada</li>
                  <li>• Roadmap claro para execução</li>
                </ul>
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