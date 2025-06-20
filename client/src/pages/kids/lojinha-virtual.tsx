import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Coins, ArrowLeft, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: string;
  isGoodChoice: boolean;
  reason: string;
}

export default function LojinhaVirtual({ onBack }: { onBack: () => void }) {
  const [coins, setCoins] = useState(1250);
  const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();

  const products: Product[] = [
    {
      id: "1",
      name: "Brinquedo Educativo",
      price: 50,
      emoji: "🧩",
      category: "Educação",
      isGoodChoice: true,
      reason: "Desenvolve o raciocínio e é durável!"
    },
    {
      id: "2", 
      name: "Doce Caro",
      price: 30,
      emoji: "🍭",
      category: "Doces",
      isGoodChoice: false,
      reason: "Muito caro para algo que acaba rápido"
    },
    {
      id: "3",
      name: "Livro Infantil",
      price: 25,
      emoji: "📚",
      category: "Educação", 
      isGoodChoice: true,
      reason: "Conhecimento dura para sempre!"
    },
    {
      id: "4",
      name: "Brinquedo da Moda",
      price: 100,
      emoji: "🎲",
      category: "Brinquedos",
      isGoodChoice: false,
      reason: "Muito caro e pode enjoar rápido"
    }
  ];

  const addToCart = (product: Product) => {
    if (coins >= product.price) {
      setCart([...cart, product]);
      setCoins(coins - product.price);
      
      toast({
        title: product.isGoodChoice ? "Boa escolha!" : "Pense melhor!",
        description: product.reason,
        variant: product.isGoodChoice ? "default" : "destructive"
      });
    } else {
      toast({
        title: "Dinheiro insuficiente!",
        description: "Você precisa economizar mais para comprar isso",
        variant: "destructive"
      });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const goodChoices = cart.filter(item => item.isGoodChoice).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">🏪 Lojinha Virtual</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">{coins}</div>
              <div className="text-yellow-600 text-sm">Flow Coins</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{cart.length}</div>
              <div className="text-blue-600 text-sm">Itens no Carrinho</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{goodChoices}</div>
              <div className="text-green-600 text-sm">Boas Escolhas</div>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-3">{product.emoji}</div>
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <Badge className={product.isGoodChoice ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {product.category}
                    </Badge>
                    <div className="text-2xl font-bold text-blue-600 my-3">
                      {product.price} coins
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={coins < product.price}
                      className="w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cart */}
        {cart.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Seu Carrinho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{item.emoji}</div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.category}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{item.price} coins</div>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>{cartTotal} coins</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Tips */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Dicas de Compra Inteligente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">✅ Boas Escolhas</h4>
                <ul className="space-y-1">
                  <li>• Produtos educativos</li>
                  <li>• Itens duráveis</li>
                  <li>• Coisas que você realmente precisa</li>
                  <li>• Produtos com bom custo-benefício</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">❌ Evite</h4>
                <ul className="space-y-1">
                  <li>• Compras por impulso</li>
                  <li>• Produtos muito caros</li>
                  <li>• Coisas que enjoam rápido</li>
                  <li>• Gastar todo o dinheiro de uma vez</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}