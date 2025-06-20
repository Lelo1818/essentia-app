import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Zap, Award, Target, Brain, Heart, 
  Sparkles, Crown, Star, Rocket, Diamond
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  trend?: string;
  icon: React.ComponentType<any>;
  gradient: string;
  glowColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export function EnhancedCard({ 
  title, 
  subtitle, 
  value, 
  trend, 
  icon: Icon, 
  gradient, 
  glowColor,
  children,
  className 
}: EnhancedCardProps) {
  return (
    <Card className={cn(
      "group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]",
      "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20",
      glowColor && `hover:shadow-${glowColor}-500/25`,
      className
    )}>
      <CardContent className="p-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
              <Badge className={cn(
                "bg-green-100 text-green-800 font-bold",
                trend.includes("-") && "bg-red-100 text-red-800"
              )}>
                {trend}
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {value}
            </p>
          </div>
          
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

interface FeatureHighlightProps {
  features: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    badge?: string;
  }>;
  title: string;
  className?: string;
}

export function FeatureHighlight({ features, title, className }: FeatureHighlightProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="group p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    {feature.badge && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2000, suffix = "", className }: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = React.useState(0);
  
  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      setCurrentValue(Math.floor(value * easedProgress));
      
      if (now < endTime) {
        requestAnimationFrame(updateValue);
      }
    };
    
    updateValue();
  }, [value, duration]);
  
  return (
    <span className={className}>
      {currentValue.toLocaleString()}{suffix}
    </span>
  );
}