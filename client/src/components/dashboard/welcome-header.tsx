import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Target, Sparkles, Crown, Zap } from "lucide-react";

interface WelcomeHeaderProps {
  userName: string;
  level: number;
  progress: number;
}

export default function WelcomeHeader({ userName, level, progress }: WelcomeHeaderProps) {
  const getCurrentHour = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getLevelTitle = (level: number) => {
    switch (level) {
      case 1: return "Explorador Financeiro";
      case 2: return "Poupador Estratégico";
      case 3: return "Investidor Inteligente";
      case 4: return "Mestre das Finanças";
      case 5: return "Magnata Digital";
      default: return "Guru Financeiro";
    }
  };

  return (
    <div className="relative mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
      
      <div className="absolute top-4 right-20 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-6 left-20 w-12 h-12 bg-yellow-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      
      <Card className="relative bg-transparent border-0 text-white shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                    {getCurrentHour()}, {userName}!
                  </CardTitle>
                  <p className="text-blue-100 text-lg">
                    Sua jornada financeira aguarda
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-4 py-2 text-sm font-bold">
                <Sparkles className="w-4 h-4 mr-1" />
                Nível {level} - {getLevelTitle(level)}
              </Badge>
              <div className="flex items-center space-x-3 text-right">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">1,250 XP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Progresso Mensal</span>
                <span className="text-2xl font-bold text-green-300">{progress.toFixed(1)}%</span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-4 bg-white/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-70" 
                     style={{width: `${progress}%`}}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <span>Meta: R$ 2.500 economizados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-yellow-300" />
                  <span>Faltam R$ 650</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-sm text-blue-100">Economia este mês</div>
                <div className="text-2xl font-bold text-green-300">R$ 1.850</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-sm text-blue-100">Próxima conquista</div>
                <div className="text-lg font-semibold">Poupador Expert</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
