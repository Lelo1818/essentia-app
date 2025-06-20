import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, ArrowLeft, Users, TrendingUp, DollarSign, 
  Target, Award, Lightbulb, Shield, Globe, Smartphone,
  BarChart3, PieChart, Calendar, Clock, Star
} from "lucide-react";
import flowLogo from "@assets/image_1750383244339.png";
import essentiaLogo from "@assets/image_1750383794230.png";
import eduvibeLogo from "@assets/image_1750383852695.png";

type SlideType = 
  | "intro" 
  | "problema" 
  | "solucao" 
  | "apps" 
  | "mercado" 
  | "tecnologia" 
  | "modelo" 
  | "financeiro" 
  | "parceria" 
  | "roadmap" 
  | "contato";

const slides: { id: SlideType; title: string; subtitle?: string }[] = [
  { id: "intro", title: "Portfólio Estratégico", subtitle: "Três Apps • Três Mercados • Uma Oportunidade" },
  { id: "problema", title: "O Problema", subtitle: "Lacunas no Mercado Digital Brasileiro" },
  { id: "solucao", title: "Nossa Solução", subtitle: "Três Apps Complementares e Validados" },
  { id: "apps", title: "Demonstração", subtitle: "Produtos Funcionais e Prontos" },
  { id: "mercado", title: "Mercado & Oportunidade", subtitle: "Mercados Bilionários em Crescimento" },
  { id: "tecnologia", title: "Tecnologia", subtitle: "Stack Moderno e Escalável" },
  { id: "modelo", title: "Modelo de Negócio", subtitle: "Múltiplas Fontes de Receita" },
  { id: "financeiro", title: "Projeções Financeiras", subtitle: "ROI Atrativo e Sustentável" },
  { id: "parceria", title: "Parceria Proposta", subtitle: "55% Desenvolvedor • 45% Parceiro" },
  { id: "roadmap", title: "Roadmap", subtitle: "Estratégia de Crescimento 36 Meses" },
  { id: "contato", title: "Próximos Passos", subtitle: "Vamos Transformar Juntos" }
];

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState<SlideType>("intro");
  const currentIndex = slides.findIndex(s => s.id === currentSlide);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentSlide(slides[currentIndex + 1].id);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentSlide(slides[currentIndex - 1].id);
    }
  };

  const goToSlide = (slideId: SlideType) => {
    setCurrentSlide(slideId);
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case "intro":
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Portfólio Estratégico
              </h1>
              <p className="text-2xl text-gray-600">
                Três Soluções Digitais • Três Mercados • Uma Oportunidade
              </p>
            </div>
            
            <div className="flex justify-center space-x-8">
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-white shadow-lg">
                  <img src={flowLogo} alt="Flow" className="w-full h-full object-contain" />
                </div>
                <p className="font-medium">Flow</p>
                <p className="text-sm text-gray-500">Fintech</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-white shadow-lg">
                  <img src={essentiaLogo} alt="Essentia" className="w-full h-full object-contain" />
                </div>
                <p className="font-medium">Essentia</p>
                <p className="text-sm text-gray-500">Bem-estar</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-white shadow-lg">
                  <img src={eduvibeLogo} alt="EduVibe" className="w-full h-full object-contain" />
                </div>
                <p className="font-medium">EduVibe</p>
                <p className="text-sm text-gray-500">EdTech</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <p className="text-lg text-gray-700">
                <strong>Proposta de Parceria:</strong> 55% Desenvolvedor • 45% Parceiro Empresarial
              </p>
            </div>
          </div>
        );

      case "problema":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Lacunas no Mercado Digital Brasileiro
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2" />
                    Gestão Financeira
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-red-600">
                  <ul className="space-y-2">
                    <li>• Apps complexos e genéricos</li>
                    <li>• Sem contexto fiscal brasileiro</li>
                    <li>• Falta de gamificação eficaz</li>
                    <li>• Interfaces pouco intuitivas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2" />
                    Desenvolvimento Pessoal
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-red-600">
                  <ul className="space-y-2">
                    <li>• Soluções superficiais</li>
                    <li>• Sem metodologia científica</li>
                    <li>• Conteúdo importado</li>
                    <li>• Falta de acompanhamento</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Educação Inclusiva
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-red-600">
                  <ul className="space-y-2">
                    <li>• Falta suporte neurodiversidade</li>
                    <li>• Educação padronizada</li>
                    <li>• Sem personalização real</li>
                    <li>• Ferramentas inacessíveis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center bg-gray-100 p-6 rounded-xl">
              <p className="text-xl font-semibold text-gray-800">
                <strong>200+ milhões de brasileiros</strong> precisam de soluções digitais acessíveis e eficazes
              </p>
            </div>
          </div>
        );

      case "solucao":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Nossa Solução: Três Apps Complementares
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto overflow-hidden bg-white shadow-lg mb-4">
                    <img src={flowLogo} alt="Flow" className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="text-blue-700">Flow - Fintech Pessoal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-blue-600">
                    <Target className="w-4 h-4 mr-2" />
                    OCR para notas fiscais
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Otimização de dívidas
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Award className="w-4 h-4 mr-2" />
                    Gamificação financeira
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Shield className="w-4 h-4 mr-2" />
                    Contexto fiscal brasileiro
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto overflow-hidden bg-white shadow-lg mb-4">
                    <img src={essentiaLogo} alt="Essentia" className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="text-purple-700">Essentia - Bem-estar Digital</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-purple-600">
                    <Target className="w-4 h-4 mr-2" />
                    Jornada de autoconhecimento
                  </div>
                  <div className="flex items-center text-sm text-purple-600">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Metodologia científica
                  </div>
                  <div className="flex items-center text-sm text-purple-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Acompanhamento emocional
                  </div>
                  <div className="flex items-center text-sm text-purple-600">
                    <Star className="w-4 h-4 mr-2" />
                    Conteúdo inspiracional
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto overflow-hidden bg-white shadow-lg mb-4">
                    <img src={eduvibeLogo} alt="EduVibe" className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="text-green-700">EduVibe - EdTech Inclusiva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-green-600">
                    <Users className="w-4 h-4 mr-2" />
                    Aprendizado personalizado
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <Shield className="w-4 h-4 mr-2" />
                    Suporte TDAH/Dislexia
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <Award className="w-4 h-4 mr-2" />
                    Gamificação educacional
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics de progresso
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "apps":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Demonstração: Produtos Funcionais e Validados
            </h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🔗 Acesso à Demonstração Completa
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Todos os aplicativos estão funcionais e podem ser testados
              </p>
              <div className="bg-white p-4 rounded-lg shadow-inner inline-block">
                <p className="text-sm text-gray-500 mb-2">Link de Demonstração:</p>
                <p className="font-mono text-blue-600 text-sm break-all">
                  https://419a61c3-e864-45d3-b12f-7c82749a509b-00-257d51k0bcjei.kirk.replit.dev
                </p>
                <p className="text-sm text-gray-500 mt-2">Senha: <span className="font-mono bg-gray-100 px-2 py-1 rounded">123456</span></p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    Características Validadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-green-600">
                    ✅ Interface completa e responsiva
                  </div>
                  <div className="flex items-center text-green-600">
                    ✅ Funcionalidades operacionais
                  </div>
                  <div className="flex items-center text-green-600">
                    ✅ Design profissional aplicado
                  </div>
                  <div className="flex items-center text-green-600">
                    ✅ Experiência do usuário otimizada
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center">
                    <Smartphone className="w-6 h-6 mr-2" />
                    Tecnologia Aplicada
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-blue-600">
                    🚀 React + TypeScript moderno
                  </div>
                  <div className="flex items-center text-blue-600">
                    🎨 Design system escalável
                  </div>
                  <div className="flex items-center text-blue-600">
                    🔒 Sistema de autenticação
                  </div>
                  <div className="flex items-center text-blue-600">
                    📱 Responsivo para todos dispositivos
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "mercado":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Mercados Bilionários em Crescimento
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-blue-700">Fintech Brasil</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">R$ 40bi</div>
                  <p className="text-sm text-blue-500">Crescimento 25% a.a.</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-blue-600">
                  <div>• 80M pessoas classe média</div>
                  <div>• 15% taxa penetração atual</div>
                  <div>• Amplo espaço crescimento</div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-purple-700">Bem-estar Digital</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">R$ 2,8bi</div>
                  <p className="text-sm text-purple-500">Crescimento 15% até 2027</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-purple-600">
                  <div>• 60M pessoas interessadas</div>
                  <div>• 70% empresas buscam soluções</div>
                  <div>• Mercado B2B + B2C</div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-green-700">EdTech Global</CardTitle>
                  <div className="text-3xl font-bold text-green-600">US$ 340bi</div>
                  <p className="text-sm text-green-500">Crescimento 20% a.a.</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-green-600">
                  <div>• 50M estudantes + famílias</div>
                  <div>• 180k escolas privadas</div>
                  <div>• Educação inclusiva crescente</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                Oportunidade Total de Mercado
              </h3>
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">R$ 45+ bilhões</div>
                  <p className="text-sm text-gray-500">Mercado Endereçável</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700">190M pessoas</div>
                  <p className="text-sm text-gray-500">Público Potencial</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "modelo":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Modelo de Negócio: Múltiplas Fontes de Receita
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Estratégias de Monetização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-medium">Freemium</span>
                    </div>
                    <span className="text-blue-600">Base gratuita</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-green-600" />
                      <span className="font-medium">Premium</span>
                    </div>
                    <span className="text-green-600">R$ 19,90/mês</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-purple-600" />
                      <span className="font-medium">B2B</span>
                    </div>
                    <span className="text-purple-600">Licenciamento</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="font-medium">Marketplace</span>
                    </div>
                    <span className="text-orange-600">Comissões</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Projeção Ano 3</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium">Flow</span>
                      <span className="text-lg font-bold">R$ 2,4M</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    <p className="text-xs text-gray-500">10k usuários premium</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-medium">Essentia</span>
                      <span className="text-lg font-bold">R$ 1,8M</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    <p className="text-xs text-gray-500">7,5k usuários premium</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-medium">EduVibe</span>
                      <span className="text-lg font-bold">R$ 3,6M</span>
                    </div>
                    <Progress value={47} className="h-2" />
                    <p className="text-xs text-gray-500">15k usuários premium</p>
                  </div>

                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total ARR</span>
                      <span className="text-green-600">R$ 7,8M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "financeiro":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Projeções Financeiras: ROI Atrativo e Sustentável
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700">Investimento Necessário</CardTitle>
                  <p className="text-red-500">18 meses para consolidação</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Infraestrutura</span>
                    <span className="font-bold">R$ 200k</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Marketing</span>
                    <span className="font-bold">R$ 500k</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Equipe</span>
                    <span className="font-bold">R$ 800k</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-red-600">R$ 1,5M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Retorno Projetado</CardTitle>
                  <p className="text-green-500">3 anos de operação</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Break-even</span>
                    <span className="font-bold">Mês 18</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">ROI 3 anos</span>
                    <span className="font-bold">400%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Valor estimado</span>
                    <span className="font-bold">R$ 25-50M</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>ARR Ano 3</span>
                      <span className="text-green-600">R$ 7,8M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                Cronograma de Marcos Financeiros
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-lg font-bold text-blue-600">Mês 6</div>
                  <p className="text-sm text-gray-600">Primeiros R$ 50k MRR</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-bold text-green-600">Mês 12</div>
                  <p className="text-sm text-gray-600">R$ 200k MRR</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-bold text-purple-600">Mês 18</div>
                  <p className="text-sm text-gray-600">Break-even</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-bold text-orange-600">Mês 36</div>
                  <p className="text-sm text-gray-600">R$ 650k MRR</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "parceria":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Parceria Proposta: 55% • 45%
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700 text-center">
                    Desenvolvedor Original (55%)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold text-blue-800">Responsabilidades:</h4>
                  <div className="space-y-2 text-sm text-blue-600">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Manutenção e evolução técnica
                    </div>
                    <div className="flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Desenvolvimento de novas funcionalidades
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Supervisão da arquitetura e qualidade
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Suporte técnico e otimizações
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-blue-800 pt-4">Vantagens:</h4>
                  <div className="space-y-2 text-sm text-blue-600">
                    <div>• Controle sobre direção técnica</div>
                    <div>• Propriedade intelectual preservada</div>
                    <div>• Visão de produto mantida</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700 text-center">
                    Parceiro Empresarial (45%)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold text-green-800">Responsabilidades:</h4>
                  <div className="space-y-2 text-sm text-green-600">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Marketing e aquisição de usuários
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Estratégias de monetização
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Gestão comercial e vendas
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Recursos para expansão
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-green-800 pt-4">Vantagens:</h4>
                  <div className="space-y-2 text-sm text-green-600">
                    <div>• Produtos já validados e funcionais</div>
                    <div>• Zero risco de desenvolvimento</div>
                    <div>• Mercados com potencial comprovado</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                Por que Esta Estrutura?
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Award className="w-8 h-8 mx-auto text-blue-600" />
                  <h4 className="font-semibold">Expertise Preservada</h4>
                  <p className="text-sm text-gray-600">Desenvolvedor mantém controle técnico</p>
                </div>
                <div className="space-y-2">
                  <TrendingUp className="w-8 h-8 mx-auto text-green-600" />
                  <h4 className="font-semibold">Escalabilidade</h4>
                  <p className="text-sm text-gray-600">Parceiro aporta recursos para crescimento</p>
                </div>
                <div className="space-y-2">
                  <Target className="w-8 h-8 mx-auto text-purple-600" />
                  <h4 className="font-semibold">Alinhamento</h4>
                  <p className="text-sm text-gray-600">Incentivos balanceados para ambos</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "roadmap":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Roadmap de Crescimento: 36 Meses
            </h2>
            
            <div className="space-y-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center">
                    <Calendar className="w-6 h-6 mr-2" />
                    Fase 1: Validação e Tração (0-12 meses)
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Objetivos:</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Lançamento comercial dos 3 apps</li>
                      <li>• Aquisição dos primeiros 1.000 usuários</li>
                      <li>• Validação do modelo freemium</li>
                      <li>• Estabelecimento de métricas base</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Investimento:</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• R$ 600k em marketing inicial</li>
                      <li>• Equipe de 5 pessoas</li>
                      <li>• Infraestrutura escalável</li>
                      <li>• Primeira versão mobile</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2" />
                    Fase 2: Expansão (12-24 meses)
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Objetivos:</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Expansão de funcionalidades premium</li>
                      <li>• Parcerias estratégicas B2B</li>
                      <li>• Apps mobile nativos completos</li>
                      <li>• 10k usuários pagantes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Desenvolvimentos:</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Integração APIs bancárias (Flow)</li>
                      <li>• Marketplace de conteúdo (Essentia)</li>
                      <li>• Sistema de videoaulas (EduVibe)</li>
                      <li>• IA para personalização avançada</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-700 flex items-center">
                    <Globe className="w-6 h-6 mr-2" />
                    Fase 3: Escalabilidade (24-36 meses)
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Objetivos:</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Expansão América Latina</li>
                      <li>• Integração com grandes players</li>
                      <li>• Preparação para exit strategy</li>
                      <li>• 50k usuários pagantes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Oportunidades:</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• IPO ou aquisição estratégica</li>
                      <li>• Licenciamento internacional</li>
                      <li>• Franchise do modelo</li>
                      <li>• Spin-offs especializados</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "contato":
        return (
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Vamos Transformar Juntos?
            </h1>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Uma Oportunidade Única
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Três produtos validados • Mercados bilionários • Parceria estruturada
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">✅</div>
                  <p className="text-sm text-gray-600 mt-2">Produtos Prontos</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">🚀</div>
                  <p className="text-sm text-gray-600 mt-2">Mercado Aquecido</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">💰</div>
                  <p className="text-sm text-gray-600 mt-2">ROI Atrativo</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Acesso Completo para Avaliação</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Demonstração Funcional:</p>
                  <p className="font-mono text-blue-600 text-sm break-all">
                    https://419a61c3-e864-45d3-b12f-7c82749a509b-00-257d51k0bcjei.kirk.replit.dev
                  </p>
                  <p className="text-sm text-gray-500">Senha: <span className="font-mono bg-gray-100 px-2 py-1 rounded">123456</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-700">
                <strong>Estamos abertos a discutir parcerias estratégicas para levar essas soluções ao próximo nível.</strong>
              </p>
              
              <div className="bg-gray-100 p-6 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">Próximos Passos Sugeridos:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>1. Due diligence técnica e comercial detalhada</div>
                  <div>2. Validação de mercado com usuários piloto</div>
                  <div>3. Estruturação legal da parceria</div>
                  <div>4. Desenvolvimento do plano de go-to-market</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      {/* Header com navegação */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pitch Deck Interativo
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {slides.length}
              </span>
              <Progress value={((currentIndex + 1) / slides.length) * 100} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Navegação de slides */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {slides.map((slide, index) => (
              <Button
                key={slide.id}
                variant={currentSlide === slide.id ? "default" : "ghost"}
                size="sm"
                onClick={() => goToSlide(slide.id)}
                className="text-xs"
              >
                {index + 1}. {slide.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo do slide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {slides[currentIndex].title}
          </h1>
          {slides[currentIndex].subtitle && (
            <p className="text-xl text-gray-600">
              {slides[currentIndex].subtitle}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
          {renderSlide()}
        </div>
      </div>

      {/* Controles de navegação */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm font-medium px-4">
            {slides[currentIndex].title}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className="rounded-full"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}