import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowRight, Star, TrendingUp } from "lucide-react";

interface InteractiveCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string | number;
  progress?: number;
  stats?: Array<{ label: string; value: string | number; color?: string }>;
  actions?: Array<{ label: string; onClick: () => void; variant?: "default" | "outline" | "secondary" }>;
  onClick?: () => void;
  gradient?: string;
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
}

export function InteractiveCard({
  title,
  description,
  icon: Icon,
  badge,
  progress,
  stats,
  actions,
  onClick,
  gradient,
  className,
  children,
  hover = true
}: InteractiveCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer",
        hover && "hover:shadow-lg hover:scale-105 transform",
        gradient && `bg-gradient-to-br ${gradient}`,
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
          {badge && (
            <Badge className="bg-green-100 text-green-700">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={cn(
                  "text-lg font-bold",
                  stat.color || "text-gray-800"
                )}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {children}

        {actions && (
          <div className="flex space-x-2 pt-2">
            {actions.map((action, i) => (
              <Button
                key={i}
                variant={action.variant || "default"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className="flex-1"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
  className
}: {
  title: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600", 
    neutral: "text-gray-600"
  };

  return (
    <Card className={cn("hover:shadow-md transition-all duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={cn("text-sm flex items-center space-x-1", trendColors[trend])}>
                <TrendingUp className="w-3 h-3" />
                <span>{change}</span>
              </p>
            )}
          </div>
          {Icon && (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ActionCard({
  title,
  description,
  action,
  icon: Icon,
  urgent = false,
  className
}: {
  title: string;
  description: string;
  action: { label: string; onClick: () => void };
  icon?: LucideIcon;
  urgent?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-200 transform hover:scale-105",
      urgent && "border-orange-200 bg-orange-50",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {Icon && (
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              urgent ? "bg-orange-200 text-orange-600" : "bg-blue-100 text-blue-600"
            )}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <Button 
              size="sm"
              onClick={action.onClick}
              className={cn(
                "transition-all duration-200",
                urgent && "bg-orange-600 hover:bg-orange-700"
              )}
            >
              {action.label}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}