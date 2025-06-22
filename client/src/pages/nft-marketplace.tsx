import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, TrendingUp, Eye, Heart, ShoppingCart, Star, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function NFTMarketplace() {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroPreco, setFiltroPreco] = useState("todos");
  const { toast } = useToast();

  // NFTs exclusivos do ecossistema Flow
  const nftsFlow = [
    {
      id: 1,
      nome: "Guardião da Prosperidade",
      descricao: "NFT exclusivo para usuários que mantiveram saldo positivo por 6 meses",
      preco: 0.05, // ETH
      precoReal: 850,
      categoria: "conquista",
      raridade: "épico",
      imagem: "/api/placeholder/300/300",
      autor: "Flow Ecosystem",
      vendas: 147,
      curtidas: 892,
      desbloqueavel: true,
      requisito: "6 meses de saldo positivo"
    },
    {
      id: 2,
      nome: "Mestre das Metas",
      descricao: "Para quem completou 5 metas financeiras",
      preco: 0.08,
      precoReal: 1360,
      categoria: "conquista",
      raridade: "lendário",
      imagem: "/api/placeholder/300/300",
      autor: "Flow Ecosystem",
      vendas: 89,
      curtidas: 1247,
      desbloqueavel: false,
      requisito: "Completar 5 metas"
    },
    {
      id: 3,
      nome: "Avatar Digital Personalizado",
      descricao: "Seu avatar único baseado no seu perfil financeiro",
      preco: 0.03,
      precoReal: 510,
      categoria: "avatar",
      raridade: "comum",
      imagem: "/api/placeholder/300/300",
      autor: "Flow Studio",
      vendas: 324,
      curtidas: 567,
      desbloqueavel: true,
      requisito: "Usar app por 30 dias"
    },
    {
      id: 4,
      nome: "Certificado de Educação Financeira",
      descricao: "NFT que comprova conclusão do programa de educação",
      preco: 0.02,
      precoReal: 340,
      categoria: "educacao",
      raridade: "comum",
      imagem: "/api/placeholder/300/300",
      autor: "EduVie Academy",
      vendas: 892,
      curtidas: 2341,
      desbloqueavel: true,
      requisito: "Completar curso básico"
    },
    {
      id: 5,
      nome: "Símbolo de Liberdade Financeira",
      descricao: "Para quem alcançou independência financeira no app",
      preco: 0.15,
      precoReal: 2550,
      categoria: "conquista",
      raridade: "mítico",
      imagem: "/api/placeholder/300/300",
      autor: "Flow Legends",
      vendas: 23,
      curtidas: 3457,
      desbloqueavel: false,
      requisito: "Patrimônio líquido > R$ 100k"
    },
    {
      id: 6,
      nome: "Família Flow",
      descricao: "NFT especial para famílias que usam Flow Kids",
      preco: 0.04,
      precoReal: 680,
      categoria: "familia",
      raridade: "raro",
      imagem: "/api/placeholder/300/300",
      autor: "Flow Kids",
      vendas: 156,
      curtidas: 789,
      desbloqueavel: true,
      requisito: "Conta família ativa"
    }
  ];

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const nftsFiltrados = nftsFlow.filter(nft => {
    if (filtroCategoria !== "todos" && nft.categoria !== filtroCategoria) {
      return false;
    }
    if (filtroPreco === "baixo" && nft.precoReal > 500) return false;
    if (filtroPreco === "medio" && (nft.precoReal <= 500 || nft.precoReal > 1500)) return false;
    if (filtroPreco === "alto" && nft.precoReal <= 1500) return false;
    return true;
  });

  const getRaridadeColor = (raridade: string) => {
    switch (raridade) {
      case "comum": return "bg-gray-100 text-gray-800";
      case "raro": return "bg-blue-100 text-blue-800";
      case "épico": return "bg-purple-100 text-purple-800";
      case "lendário": return "bg-orange-100 text-orange-800";
      case "mítico": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const comprarNFT = (nft: any) => {
    toast({
      title: "Compra Iniciada",
      description: `Preparando compra de "${nft.nome}" por ${formatCurrency(nft.precoReal)}`,
    });
  };

  const curtirNFT = (id: number) => {
    toast({
      title: "❤️ Curtido!",
      description: "NFT adicionado aos seus favoritos",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🎨 NFT Marketplace</h1>
          <p className="text-gray-600">Colecione NFTs exclusivos do ecossistema Flow</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Coins className="w-4 h-4 mr-2" />
            Minha Carteira
          </Button>
          <Button>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Meus NFTs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">NFTs Disponíveis</p>
                <p className="text-2xl font-bold text-blue-600">{nftsFlow.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">NFTs Desbloqueáveis</p>
                <p className="text-2xl font-bold text-green-600">
                  {nftsFlow.filter(n => n.desbloqueavel).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Volume Total</p>
                <p className="text-2xl font-bold text-purple-600">0.37 ETH</p>
                <p className="text-xs text-gray-500 mt-1">≈ R$ 6.290</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Seus NFTs</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
                <p className="text-xs text-gray-500 mt-1">Valor: R$ 1.890</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Heart className="w-6 h-6 text-yellow-600" />
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
                  <SelectItem value="conquista">Conquistas</SelectItem>
                  <SelectItem value="avatar">Avatares</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="familia">Família</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Faixa de Preço</label>
              <Select value={filtroPreco} onValueChange={setFiltroPreco}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os preços</SelectItem>
                  <SelectItem value="baixo">Até R$ 500</SelectItem>
                  <SelectItem value="medio">R$ 500 - R$ 1.500</SelectItem>
                  <SelectItem value="alto">Acima de R$ 1.500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Buscar</label>
              <Input placeholder="Nome do NFT..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de NFTs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nftsFiltrados.map((nft) => (
          <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {nft.categoria === 'conquista' && '🏆'}
                {nft.categoria === 'avatar' && '🎭'}
                {nft.categoria === 'educacao' && '📚'}
                {nft.categoria === 'familia' && '👨‍👩‍👧‍👦'}
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={getRaridadeColor(nft.raridade)}>
                  {nft.raridade}
                </Badge>
              </div>
              {nft.desbloqueavel && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-100 text-green-800">
                    Desbloqueável
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{nft.nome}</h3>
                  <p className="text-sm text-gray-600">por {nft.autor}</p>
                </div>
                
                <p className="text-sm text-gray-600">{nft.descricao}</p>
                
                {nft.requisito && (
                  <div className="p-2 bg-blue-50 rounded text-sm">
                    <span className="font-medium">Requisito:</span> {nft.requisito}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">{formatCurrency(nft.precoReal)}</div>
                    <div className="text-sm text-gray-600">{nft.preco} ETH</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{nft.vendas}</span>
                    <Heart className="w-4 h-4" />
                    <span>{nft.curtidas}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => comprarNFT(nft)}
                    disabled={!nft.desbloqueavel}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {nft.desbloqueavel ? 'Comprar' : 'Bloqueado'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => curtirNFT(nft.id)}
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