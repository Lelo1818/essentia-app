import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Percent, 
  Star, 
  Search,
  Filter,
  ExternalLink,
  Gift,
  Zap,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CashbackOffer {
  id: string;
  store: string;
  logo: string;
  description: string;
  cashbackRate: number;
  category: string;
  minSpend?: number;
  validUntil: Date;
  featured: boolean;
  rating: number;
  totalUsers: number;
  estimatedCashback: number;
}

interface CashbackHistory {
  id: string;
  store: string;
  amount: number;
  cashbackEarned: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'paid';
}

export default function CashbackMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const offers: CashbackOffer[] = [
    {
      id: "1",
      store: "iFood",
      logo: "🍔",
      description: "Cashback em todos os pedidos",
      cashbackRate: 8,
      category: "alimentação",
      minSpend: 25,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      featured: true,
      rating: 4.8,
      totalUsers: 15420,
      estimatedCashback: 12.50
    },
    {
      id: "2",
      store: "Mercado Livre",
      logo: "🛒",
      description: "Cashback em eletrônicos e casa",
      cashbackRate: 5,
      category: "compras",
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      featured: true,
      rating: 4.9,
      totalUsers: 32500,
      estimatedCashback: 25.00
    },
    {
      id: "3",
      store: "Uber",
      logo: "🚗",
      description: "Cashback em corridas e delivery",
      cashbackRate: 6,
      category: "transporte",
      minSpend: 20,
      validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      featured: false,
      rating: 4.6,
      totalUsers: 8900,
      estimatedCashback: 8.30
    },
    {
      id: "4",
      store: "Netflix",
      logo: "🎬",
      description: "Cashback na assinatura mensal",
      cashbackRate: 12,
      category: "entretenimento",
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      featured: false,
      rating: 4.7,
      totalUsers: 5600,
      estimatedCashback: 6.00
    },
    {
      id: "5",
      store: "Farmácias Pacheco",
      logo: "💊",
      description: "Cashback em medicamentos e cosméticos",
      cashbackRate: 10,
      category: "saúde",
      minSpend: 50,
      validUntil: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      featured: true,
      rating: 4.5,
      totalUsers: 12300,
      estimatedCashback: 15.80
    }
  ];

  const recentCashback: CashbackHistory[] = [
    {
      id: "1",
      store: "iFood",
      amount: 85,
      cashbackEarned: 6.80,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'confirmed'
    },
    {
      id: "2", 
      store: "Mercado Livre",
      amount: 320,
      cashbackEarned: 16.00,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: "3",
      store: "Uber",
      amount: 45,
      cashbackEarned: 2.70,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'paid'
    }
  ];

  const categories = [
    { id: "all", label: "Todas", icon: "🏪" },
    { id: "alimentação", label: "Alimentação", icon: "🍽️" },
    { id: "compras", label: "Compras", icon: "🛍️" },
    { id: "transporte", label: "Transporte", icon: "🚗" },
    { id: "entretenimento", label: "Entretenimento", icon: "🎮" },
    { id: "saúde", label: "Saúde", icon: "🏥" }
  ];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCashbackEarned = recentCashback.reduce((sum, item) => sum + item.cashbackEarned, 0);

  const activateOffer = (offer: CashbackOffer) => {
    toast({
      title: "Oferta Ativada!",
      description: `Cashback de ${offer.cashbackRate}% ativo para ${offer.store}`,
      variant: "default"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'paid': return 'Pago';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">R$ {totalCashbackEarned.toFixed(2)}</div>
            <div className="text-green-600 text-sm">Cashback Total</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{offers.length}</div>
            <div className="text-blue-600 text-sm">Ofertas Ativas</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">12%</div>
            <div className="text-purple-600 text-sm">Maior Cashback</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-orange-600" />
            Marketplace de Cashback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar lojas ou produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <InteractiveButton variant="outline" soundType="click">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </InteractiveButton>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <InteractiveButton
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  soundType="click"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.label}
                </InteractiveButton>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Offers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-600" />
            Ofertas em Destaque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOffers.filter(offer => offer.featured).map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-all duration-300 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{offer.logo}</div>
                      <div>
                        <h4 className="font-semibold">{offer.store}</h4>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{offer.rating}</span>
                          <span>({offer.totalUsers.toLocaleString()})</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 font-bold">
                      {offer.cashbackRate}%
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                  
                  {offer.minSpend && (
                    <div className="text-xs text-gray-500 mb-2">
                      Compra mínima: R$ {offer.minSpend}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mb-3">
                    Válido até: {offer.validUntil.toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="text-sm font-medium text-green-600 mb-3">
                    Cashback estimado: R$ {offer.estimatedCashback.toFixed(2)}
                  </div>
                  
                  <InteractiveButton
                    onClick={() => activateOffer(offer)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    soundType="success"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Ativar Cashback
                  </InteractiveButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Offers */}
      <Card>
        <CardHeader>
          <CardTitle>Todas as Ofertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredOffers.filter(offer => !offer.featured).map((offer) => (
              <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="text-xl">{offer.logo}</div>
                  <div>
                    <h4 className="font-semibold">{offer.store}</h4>
                    <p className="text-sm text-gray-600">{offer.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>★ {offer.rating}</span>
                      <span>•</span>
                      <span>{offer.totalUsers.toLocaleString()} usuários</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className="bg-green-100 text-green-800">
                    {offer.cashbackRate}% cashback
                  </Badge>
                  <InteractiveButton
                    onClick={() => activateOffer(offer)}
                    size="sm"
                    soundType="click"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ativar
                  </InteractiveButton>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Cashback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Histórico de Cashback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCashback.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{item.store}</div>
                  <div className="text-sm text-gray-600">
                    Compra: R$ {item.amount.toFixed(2)} • {item.date.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    +R$ {item.cashbackEarned.toFixed(2)}
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusLabel(item.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}