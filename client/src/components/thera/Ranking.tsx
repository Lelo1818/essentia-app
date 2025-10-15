import { Trophy, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

// Dados mockados de traders
const mockRankingData = [
  { 
    id: 1, 
    name: "Lucas Silva", 
    pnl: 45280, 
    winRate: 78, 
    trades: 124,
    level: "Elite"
  },
  { 
    id: 2, 
    name: "Marina Costa", 
    pnl: 38450, 
    winRate: 72, 
    trades: 98,
    level: "Pro"
  },
  { 
    id: 3, 
    name: "Rafael Mendes", 
    pnl: 32100, 
    winRate: 69, 
    trades: 115,
    level: "Pro"
  },
  { 
    id: 4, 
    name: "Ana Paula", 
    pnl: 28900, 
    winRate: 65, 
    trades: 87,
    level: "Advanced"
  },
  { 
    id: 5, 
    name: "Carlos Eduardo", 
    pnl: 24750, 
    winRate: 61, 
    trades: 103,
    level: "Advanced"
  },
  { 
    id: 6, 
    name: "Juliana Reis", 
    pnl: 21300, 
    winRate: 58, 
    trades: 76,
    level: "Intermediate"
  },
  { 
    id: 7, 
    name: "Pedro Santos", 
    pnl: 18200, 
    winRate: 55, 
    trades: 92,
    level: "Intermediate"
  },
  { 
    id: 8, 
    name: "Fernanda Lima", 
    pnl: 15600, 
    winRate: 52, 
    trades: 68,
    level: "Beginner"
  }
];

export default function Ranking() {
  const getMedalIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-5 h-5 text-[#c6a86b]" />;
    if (position === 2) return <Award className="w-5 h-5 text-gray-400" />;
    if (position === 3) return <Award className="w-5 h-5 text-[#cd7f32]" />;
    return <span className="text-sm text-gray-500">#{position}</span>;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Elite": return "bg-[#c6a86b]/20 text-[#c6a86b]";
      case "Pro": return "bg-blue-500/20 text-blue-400";
      case "Advanced": return "bg-purple-500/20 text-purple-400";
      case "Intermediate": return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Card className="bg-[#1a2332]/80 backdrop-blur-sm border-[#c6a86b]/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#c6a86b]/10 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-[#c6a86b]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Ranking de Traders</h3>
          <p className="text-sm text-gray-400">Top performers do mês</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockRankingData.map((trader, index) => (
          <div
            key={trader.id}
            className="flex items-center justify-between p-3 bg-[#0f1a2a]/50 rounded-lg border border-[#c6a86b]/10 hover:border-[#c6a86b]/30 transition-all"
            data-testid={`ranking-item-${trader.id}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 flex justify-center">
                {getMedalIcon(index + 1)}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{trader.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getLevelColor(trader.level)}`}>
                    {trader.level}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>{trader.trades} trades</span>
                  <span>•</span>
                  <span>{trader.winRate}% win rate</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className={`font-semibold ${trader.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trader.pnl >= 0 ? '+' : ''}R$ {trader.pnl.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-gray-500">P&L</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#c6a86b]/5 border border-[#c6a86b]/20 rounded-lg">
        <p className="text-sm text-gray-300 text-center">
          🏆 <span className="text-[#c6a86b] font-medium">Dados em tempo real</span> atualizados a cada 5 minutos
        </p>
      </div>
    </Card>
  );
}
