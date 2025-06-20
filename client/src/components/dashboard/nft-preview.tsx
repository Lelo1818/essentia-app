import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function NFTPreview() {
  const recentNFTs = [
    {
      id: "nft-001",
      title: "Primeiro R$ 1.000",
      rarity: "common",
      date: "Hoje",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: "nft-002", 
      title: "Meta Alcançada",
      rarity: "rare",
      date: "Ontem",
      color: "from-blue-400 to-blue-600"
    }
  ];

  const availableAchievements = [
    {
      title: "Livre de Dívidas",
      progress: 85,
      requirement: "Quite todas as dívidas pendentes",
      rarity: "epic"
    },
    {
      title: "Reserva de Emergência",
      progress: 60,
      requirement: "Economize 6 meses de gastos",
      rarity: "legendary"
    }
  ];

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-800">
          <Award className="w-5 h-5 mr-2" />
          NFT de Conquistas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent NFTs */}
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">NFTs Recentes</h4>
            <div className="space-y-2">
              {recentNFTs.map((nft) => (
                <div key={nft.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${nft.color} rounded-full flex items-center justify-center`}>
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{nft.title}</div>
                      <div className="text-xs text-gray-500">{nft.date}</div>
                    </div>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      nft.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                      nft.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {nft.rarity.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Available Achievements */}
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Próximas Conquistas</h4>
            <div className="space-y-3">
              {availableAchievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{achievement.title}</span>
                    <Star className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{achievement.requirement}</span>
                    <span className="text-xs font-bold text-purple-600">{achievement.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/nft-achievements">
            <InteractiveButton className="w-full mt-4" variant="outline" soundType="click">
              <Award className="w-4 h-4 mr-2" />
              Ver Todos os NFTs
              <ArrowRight className="w-4 h-4 ml-2" />
            </InteractiveButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}