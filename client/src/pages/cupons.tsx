import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Percent, Star, Bell, Filter, Search, Zap } from "lucide-react";

interface Cupom {
  id: string;
  loja: string;
  descricao: string;
  desconto: string;
  categoria: string;
  distancia: string;
  validoAte: string;
  relevancia: number;
  logo: string;
  codigo?: string;
}

export default function Cupons() {
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    // Simulação de cupons baseados no perfil do usuário
    const cuponsPersonalizados: Cupom[] = [
      {
        id: "1",
        loja: "Pão de Açúcar",
        descricao: "20% OFF em produtos de limpeza - itens que você compra mensalmente",
        desconto: "20%",
        categoria: "supermercado",
        distancia: "850m",
        validoAte: "3 dias",
        relevancia: 95,
        logo: "🛒",
        codigo: "LIMPO20"
      },
      {
        id: "2", 
        loja: "Posto Shell",
        descricao: "R$ 0,15/litro de desconto - baseado na sua rota casa-trabalho",
        desconto: "R$ 0,15/L",
        categoria: "combustivel",
        distancia: "1.2km",
        validoAte: "Hoje",
        relevancia: 88,
        logo: "⛽"
      },
      {
        id: "3",
        loja: "Farmácia São Paulo",
        descricao: "30% OFF medicamentos - categoria com gastos recorrentes",
        desconto: "30%",
        categoria: "farmacia",
        distancia: "600m",
        validoAte: "5 dias",
        relevancia: 82,
        logo: "💊"
      },
      {
        id: "4",
        loja: "iFood",
        descricao: "Frete grátis + 25% OFF - você pede 3x/semana às terças",
        desconto: "25% + Frete",
        categoria: "delivery",
        distancia: "App",
        validoAte: "2 dias",
        relevancia: 76,
        logo: "🍕"
      },
      {
        id: "5",
        loja: "Casas Bahia",
        descricao: "12x sem juros em eletrodomésticos - meta: geladeira nova",
        desconto: "12x s/ juros",
        categoria: "eletronicos",
        distancia: "2.1km",
        validoAte: "7 dias",
        relevancia: 90,
        logo: "🏠"
      }
    ];
    setCupons(cuponsPersonalizados);
  }, []);

  const cupomsFiltrados = cupons
    .filter(cupom => filtroCategoria === "todos" || cupom.categoria === filtroCategoria)
    .filter(cupom => cupom.descricao.toLowerCase().includes(busca.toLowerCase()) || cupom.loja.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => b.relevancia - a.relevancia);

  const categorias = [
    { id: "todos", nome: "Todos", icon: "🎯" },
    { id: "supermercado", nome: "Supermercado", icon: "🛒" },
    { id: "combustivel", nome: "Combustível", icon: "⛽" },
    { id: "farmacia", nome: "Farmácia", icon: "💊" },
    { id: "delivery", nome: "Delivery", icon: "🍕" },
    { id: "eletronicos", nome: "Eletrônicos", icon: "🏠" }
  ];

  const getRelevanciaColor = (relevancia: number) => {
    if (relevancia >= 85) return "text-green-600 bg-green-100";
    if (relevancia >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cupons Inteligentes</h1>
          <p className="text-gray-600">IA personalizada baseada nos seus hábitos de compra</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Bell className="w-4 h-4 mr-2" />
          Configurar Alertas
        </Button>
      </div>

      {/* Insights IA */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">Insights da IA</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-blue-700">
              <strong>Economia Potencial:</strong> R$ 127 este mês com os cupons selecionados
            </div>
            <div className="text-blue-700">
              <strong>Padrão Identificado:</strong> Você economiza 23% mais com cupons de supermercado
            </div>
            <div className="text-blue-700">
              <strong>Próxima Compra:</strong> Terça-feira (18h) - 3 cupons relevantes disponíveis
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar cupons ou lojas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categorias.map((categoria) => (
            <Button
              key={categoria.id}
              variant={filtroCategoria === categoria.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroCategoria(categoria.id)}
              className="whitespace-nowrap"
            >
              <span className="mr-1">{categoria.icon}</span>
              {categoria.nome}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de Cupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cupomsFiltrados.map((cupom) => (
          <Card key={cupom.id} className="hover:shadow-lg transition-shadow relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{cupom.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{cupom.loja}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{cupom.distancia}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>Válido por {cupom.validoAte}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{cupom.desconto}</div>
                  <Badge className={`text-xs ${getRelevanciaColor(cupom.relevancia)}`}>
                    <Star className="w-3 h-3 mr-1" />
                    {cupom.relevancia}% relevante
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{cupom.descricao}</p>
              <div className="flex items-center justify-between">
                {cupom.codigo && (
                  <div className="bg-gray-100 px-3 py-1 rounded border-dashed border-2 border-gray-300">
                    <span className="text-sm font-mono">{cupom.codigo}</span>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Copiar Código
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Usar Agora
                  </Button>
                </div>
              </div>
            </CardContent>
            {cupom.relevancia >= 85 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                IA Recomenda
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Sua Performance de Economia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">R$ 347</div>
              <div className="text-sm text-gray-600">Economizado este mês</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Cupons utilizados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">87%</div>
              <div className="text-sm text-gray-600">Taxa de aproveitamento</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">R$ 127</div>
              <div className="text-sm text-gray-600">Economia potencial disponível</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}