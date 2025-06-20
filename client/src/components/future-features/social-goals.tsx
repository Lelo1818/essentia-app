import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Heart, MessageCircle } from "lucide-react";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SocialGoals() {
  const friends = [
    { name: "Ana Silva", goal: "Casa Própria", progress: 78, avatar: "AS" },
    { name: "João Santos", goal: "Viagem Europa", progress: 45, avatar: "JS" },
    { name: "Maria Costa", goal: "Curso MBA", progress: 92, avatar: "MC" }
  ];

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-800">
          <Users className="w-5 h-5 mr-2" />
          Comunidade de Metas (FUTURO)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-blue-700 mb-3">
            Acompanhe o progresso dos seus amigos e celebrem juntos as conquistas!
          </div>
          
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">{friend.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-sm">{friend.name}</div>
                <div className="text-xs text-gray-600">{friend.goal}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${friend.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-600">{friend.progress}%</div>
                <div className="flex space-x-1 mt-1">
                  <InteractiveButton size="sm" variant="ghost" className="p-1 h-6 w-6" soundType="click">
                    <Heart className="w-3 h-3 text-red-500" />
                  </InteractiveButton>
                  <InteractiveButton size="sm" variant="ghost" className="p-1 h-6 w-6" soundType="click">
                    <MessageCircle className="w-3 h-3 text-blue-500" />
                  </InteractiveButton>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-2">
            <InteractiveButton className="w-full" variant="outline" soundType="notification">
              <Trophy className="w-4 h-4 mr-2" />
              Ver Ranking Nacional (Em Breve)
            </InteractiveButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}