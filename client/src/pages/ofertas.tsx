import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, Gift, Crown, Zap, Clock, Star } from "lucide-react";

export default function Ofertas() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ofertas Especiais</h1>
          <p className="text-gray-600">Aproveite promoções exclusivas e acelere seus objetivos</p>
        </div>
        <Badge variant="destructive" className="animate-pulse">
          <Clock className="w-4 h-4 mr-1" />
          Tempo limitado
        </Badge>
      </div>

      {/* Oferta Premium em Destaque */}
      <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-sm font-bold transform rotate-12 translate-x-4 translate-y-2">
          50% OFF
        </div>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-600" />
            <CardTitle className="text-2xl text-yellow-800">Flow Premium - Oferta Especial</CardTitle>
          </div>
          <p className="text-yellow-700">Desbloqueie todo o potencial da sua gestão financeira</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Recursos Premium:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-2" />OCR ilimitado para notas fiscais</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-2" />Análise preditiva avançada por IA</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-2" />Relatórios personalizados</li>
                <li className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-2" />Suporte prioritário</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-center">
                <div className="text-sm text-gray-500 line-through">De R$ 39,90/mês</div>
                <div className="text-3xl font-bold text-green-600">R$ 19,90/mês</div>
                <div className="text-sm text-gray-600">Primeiros 3 meses</div>
              </div>
              <Button className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700">
                Ativar Premium
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Ofertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Consultoria Gratuita */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Gift className="w-8 h-8 text-green-600" />
              <Badge variant="secondary" className="bg-green-200 text-green-800">GRÁTIS</Badge>
            </div>
            <CardTitle className="text-green-800">Consultoria Financeira</CardTitle>
            <p className="text-green-700 text-sm">30 minutos com especialista</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-green-700 mb-4">
              <li>• Análise do seu perfil financeiro</li>
              <li>• Estratégias personalizadas</li>
              <li>• Plano de ação imediato</li>
            </ul>
            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Agendar Grátis
            </Button>
          </CardContent>
        </Card>

        {/* Curso de Investimentos */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Zap className="w-8 h-8 text-blue-600" />
              <Badge variant="destructive">70% OFF</Badge>
            </div>
            <CardTitle className="text-blue-800">Curso de Investimentos</CardTitle>
            <p className="text-blue-700 text-sm">Do básico ao avançado</p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 line-through">R$ 297</div>
              <div className="text-2xl font-bold text-blue-600">R$ 97</div>
            </div>
            <ul className="space-y-1 text-sm text-blue-700 mb-4">
              <li>• 20 módulos em vídeo</li>
              <li>• Simuladores práticos</li>
              <li>• Certificado de conclusão</li>
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Comprar Agora
            </Button>
          </CardContent>
        </Card>

        {/* Clube VIP */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Crown className="w-8 h-8 text-purple-600" />
              <Badge className="bg-purple-600">VIP</Badge>
            </div>
            <CardTitle className="text-purple-800">Clube Flow VIP</CardTitle>
            <p className="text-purple-700 text-sm">Comunidade exclusiva</p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-purple-600">R$ 97/mês</div>
            </div>
            <ul className="space-y-1 text-sm text-purple-700 mb-4">
              <li>• Lives semanais exclusivas</li>
              <li>• Grupo no Telegram</li>
              <li>• Análises de mercado</li>
              <li>• Desconto em produtos</li>
            </ul>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Entrar no VIP
            </Button>
          </CardContent>
        </Card>

        {/* E-book Gratuito */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Gift className="w-8 h-8 text-orange-600" />
              <Badge variant="secondary" className="bg-orange-200 text-orange-800">GRÁTIS</Badge>
            </div>
            <CardTitle className="text-orange-800">E-book: 7 Passos</CardTitle>
            <p className="text-orange-700 text-sm">Para organizar suas finanças</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-orange-700 mb-4">
              <li>• Método comprovado</li>
              <li>• Planilhas exclusivas</li>
              <li>• Dicas práticas</li>
            </ul>
            <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              Download Grátis
            </Button>
          </CardContent>
        </Card>

        {/* Planilha Premium */}
        <Card className="border-teal-200 bg-teal-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Percent className="w-8 h-8 text-teal-600" />
              <Badge variant="destructive">ÚLTIMA SEMANA</Badge>
            </div>
            <CardTitle className="text-teal-800">Planilha Mágica</CardTitle>
            <p className="text-teal-700 text-sm">Controle total automatizado</p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 line-through">R$ 67</div>
              <div className="text-2xl font-bold text-teal-600">R$ 27</div>
            </div>
            <ul className="space-y-1 text-sm text-teal-700 mb-4">
              <li>• 12 abas integradas</li>
              <li>• Gráficos automáticos</li>
              <li>• Vídeo explicativo</li>
            </ul>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Comprar R$ 27
            </Button>
          </CardContent>
        </Card>

        {/* Mentoria Individual */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Zap className="w-8 h-8 text-red-600" />
              <Badge className="bg-red-600">EXCLUSIVO</Badge>
            </div>
            <CardTitle className="text-red-800">Mentoria 1:1</CardTitle>
            <p className="text-red-700 text-sm">Acompanhamento personalizado</p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-red-600">R$ 497</div>
              <div className="text-sm text-gray-600">3 sessões de 1h</div>
            </div>
            <ul className="space-y-1 text-sm text-red-700 mb-4">
              <li>• Diagnóstico completo</li>
              <li>• Plano personalizado</li>
              <li>• Suporte via WhatsApp</li>
            </ul>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Quero Mentoria
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Banner Promocional */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">🎯 Oferta Combo Especial</h3>
          <p className="text-blue-100 mb-4">Premium + Curso + E-book por apenas</p>
          <div className="text-4xl font-bold mb-4">R$ 97/mês</div>
          <p className="text-sm text-blue-200 mb-6">Economia de R$ 239 • Cancele quando quiser</p>
          <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
            QUERO O COMBO AGORA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}