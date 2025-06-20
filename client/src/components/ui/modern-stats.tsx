import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Award, Users } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<any>;
  gradient: string;
}

function StatsCard({ title, value, change, trend, icon: Icon, gradient }: StatsCardProps) {
  const trendColor = {
    up: "text-green-400",
    down: "text-red-400", 
    neutral: "text-gray-400"
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`text-sm font-bold ${trendColor[trend]}`}>
            {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {change}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ModernStats() {
  const stats = [
    {
      title: "Usuários Ativos",
      value: "12.5k",
      change: "+23%",
      trend: "up" as const,
      icon: Users,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Taxa de Sucesso",
      value: "94%",
      change: "+12%", 
      trend: "up" as const,
      icon: Award,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Performance",
      value: "99.9%",
      change: "+0.1%",
      trend: "up" as const,
      icon: Zap,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      title: "Crescimento",
      value: "340%",
      change: "+89%",
      trend: "up" as const,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}