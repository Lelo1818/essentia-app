import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface WelcomeHeaderProps {
  userName: string;
  level: number;
  progress: number;
}

export default function WelcomeHeader({ userName, level, progress }: WelcomeHeaderProps) {
  const getLevelTitle = (level: number) => {
    if (level <= 2) return "Iniciante Financeiro";
    if (level <= 4) return "Organizador Expert";
    if (level <= 6) return "Mestre Financeiro";
    return "Guru das Finanças";
  };

  return (
    <div className="mb-8">
      <div className="gradient-primary rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Olá, {userName}! 👋</h2>
            <p className="text-purple-100">Vamos organizar suas finanças hoje?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-yellow-300 mr-1 fill-current" />
              <span className="font-semibold">Nível {level}</span>
            </div>
            <div className="text-sm text-purple-100">{getLevelTitle(level)}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso do mês</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-purple-400" />
        </div>
      </div>
    </div>
  );
}
