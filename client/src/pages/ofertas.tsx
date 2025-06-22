import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Percent, Star, Clock, Filter, Heart, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function Ofertas() {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroDesconto, setFiltroDesconto] = useState("todos");
  const { toast } = useToast();

  // Ofertas exclusivas para usuários do Flow
  const ofertas = [
    {
      id: 1,
      titulo: "iPhone 15 Pro com Cashback",
      descricao: "Cashback de 15% para usuários Flow Premium",
      precoOriginal: 8999.00,
      precoDesconto: 7649.15,
      desconto: 15,
      categoria: "tecnologia",
      loja: "iPlace",
      cashback: 1149.87,
      validadeHoras: 48,
      rating: 4.8,
      vendidos: 247,
      imagem: "📱",
      tags: ["premium", "tech", "cashback alto"]
    },
    {
      id: 2,
      titulo: "Curso de Investimentos Premium",
      descricao: "20% off para usuários que completaram 3 metas",
      precoOriginal: 497.00,
      precoDesconto: 397.60,
      desconto: 20,
      categoria: "educacao",
      loja: "EduVie Academy",
      cashback: 39.76,
      validadeHoras: 72,
      rating: 4.9,
      vendidos: 1834,
      imagem: "📚",
      tags: ["educacao", "investimentos", "meta reward"]
    },
    {
      id: 3,
      titulo: "Notebook Dell Inspiron",
      descricao: "Parcelamento especial Flow em 24x sem juros",
      precoOriginal: 3499.00,
      precoDesconto: 2799.20,
      desconto: 20,
      categoria: "tecnologia",
      loja: "Dell Store",
      cashback: 279.92,
      validadeHoras: 24,
      rating: 4.6,
      vendidos: 89,
      imagem: "💻",
      tags: ["parcelamento", "sem juros", "tech"]
    },
    {
      id: 4,
      titulo: "Plano de Saúde Unimed",
      descricao: "3 meses grátis para novos usuários Flow",
      precoOriginal: 450.00,
      precoDesconto: 0.00,
      desconto: 100,
      categoria: "saude",
      loja: "Unimed",
      cashback: 0,
      validadeHoras: 168,
      rating: 4.7,
      vendidos: 456,
      imagem: "🏥",
      tags: ["saude", "promocao especial", "gratuito"]
    },
    {
      id: 5,
      titulo: "Viagem Europa - 15 dias",
      descricao: "40% off + milhas dobradas para usuários nível 5+",
      precoOriginal: 8500.00,
      precoDesconto: 5100.00,
      desconto: 40,
      categoria: "viagem",
      loja: "CVC Turismo",
      cashback: 510.00,
      validadeHoras: 96,
      rating: 4.9,
      vendidos: 23,
      imagem: "✈️",
      tags: ["viagem", "milhas", "nivel alto"]
    },
    {
      id: 6,
      titulo: "Tesla Model 3 - Financiamento",
      descricao: "Taxa especial 0,5% a.m. para usuários Flow Platinum",
      precoOriginal: 320000.00,
      precoDesconto: 304000.00,
      desconto: 5,
      categoria: "automotivo",
      loja: "Tesla Brasil",
      cashback: 15200.00,
      validadeHoras: 240,
      rating: 5.0,
      vendidos: 7,
      imagem: "🚗",
      tags: ["automotivo", "eletrico", "financiamento"]
    }
  ];

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const ofertasFiltradas = ofertas.filter(oferta => {
    if (filtroCategoria !== "todos" && oferta.categoria !== filtroCategoria) {
      return false;
    }
    if (filtroDesconto === "baixo" && oferta.desconto < 10) return false;
    if (filtroDesconto === "medio" && (oferta.desconto < 10 || oferta.desconto > 30)) return false;
    if (filtroDesconto === "alto" && oferta.desconto <= 30) return false;
    return true;
  });

  const totalEconomia = ofertasFiltradas.reduce((sum, oferta) => 
    sum + (oferta.precoOriginal - oferta.precoDesconto), 0);

  const totalCashback = ofertasFiltradas.reduce((sum, oferta) => sum + oferta.cashback, 0);

  const comprarOferta = (oferta: any) => {
    toast({
      title: "Redirecionando para parceiro",
      description: `Você será direcionado para ${oferta.loja} para finalizar a compra com desconto Flow`,
    });
  };

  const curtirOferta = (id: number) => {
    toast({
      title: "❤️ Oferta favoritada!",
      description: "Você receberá alertas quando houver ofertas similares",
    });
  };

  const getTempoRestante = (horas: number) => {
    if (horas >= 24) {
      const dias = Math.floor(horas / 24);
      return `${dias} dia${dias > 1 ? 's' : ''}`;
    }
    return `${horas}h`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🛍️ Ofertas Exclusivas</h1>
          <p className="text-gray-600">Descontos especiais para usuários Flow</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Heart className="w-4 h-4 mr-2" />
            Favoritas
          </Button>
          <Button>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Minhas Compras
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ofertas Ativas</p>
                <p className="text-2xl font-bold text-blue-600">{ofertas.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Economia Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalEconomia)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cashback Total</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalCashback)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Seu Nível</p>
                <p className="text-2xl font-bold text-yellow-600">Premium</p>
                <p className="text-xs text-gray-500 mt-1">Descontos até 40%</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Categoria</label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as categorias</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="viagem">Viagem</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="automotivo">Automotivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Desconto</label>
              <Select value={filtroDesconto} onValueChange={setFiltroDesconto}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os descontos</SelectItem>
                  <SelectItem value="baixo">Até 10%</SelectItem>
                  <SelectItem value="medio">10% - 30%</SelectItem>
                  <SelectItem value="alto">Acima de 30%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Buscar</label>
              <Input placeholder="Nome do produto..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Ofertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ofertasFiltradas.map((oferta) => (
          <Card key={oferta.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {oferta.imagem}
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-100 text-red-800">
                  -{oferta.desconto}%
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge className="bg-orange-100 text-orange-800">
                  <Clock className="w-3 h-3 mr-1" />
                  {getTempoRestante(oferta.validadeHoras)}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{oferta.titulo}</h3>
                  <p className="text-sm text-gray-600">por {oferta.loja}</p>
                </div>
                
                <p className="text-sm text-gray-600">{oferta.descricao}</p>
                
                <div className="flex flex-wrap gap-1">
                  {oferta.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 line-through">
                        {formatCurrency(oferta.precoOriginal)}
                      </div>
                      <div className="font-bold text-xl text-green-600">
                        {oferta.precoDesconto > 0 ? formatCurrency(oferta.precoDesconto) : "GRÁTIS"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-600">
                        Cashback: {formatCurrency(oferta.cashback)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span>{oferta.rating}</span>
                        <span>({oferta.vendidos} vendidos)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => comprarOferta(oferta)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Comprar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => curtirOferta(oferta.id)}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}