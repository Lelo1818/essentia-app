import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Bitcoin, DollarSign } from "lucide-react";
import { InteractiveButton } from "@/components/ui/interactive-button";

export default function CryptoTracker() {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", price: 258430, change: 2.4, amount: 0.00234 },
    { name: "Ethereum", symbol: "ETH", price: 12670, change: -1.2, amount: 0.0456 },
    { name: "Solana", symbol: "SOL", price: 456, change: 5.8, amount: 2.34 }
  ];

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-800">
          <Bitcoin className="w-5 h-5 mr-2" />
          Crypto Portfolio (FUTURO)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cryptos.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-semibold">{crypto.name}</div>
                <div className="text-sm text-gray-600">{crypto.amount} {crypto.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">R$ {(crypto.price * crypto.amount).toFixed(0)}</div>
                <div className={`text-sm flex items-center ${crypto.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {crypto.change > 0 ? '+' : ''}{crypto.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <InteractiveButton className="w-full mt-4" variant="outline" soundType="notification">
          <DollarSign className="w-4 h-4 mr-2" />
          Investir em Crypto (Em Breve)
        </InteractiveButton>
      </CardContent>
    </Card>
  );
}