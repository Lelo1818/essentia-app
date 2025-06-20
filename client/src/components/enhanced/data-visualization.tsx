import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
  trend?: number;
}

interface ChartProps {
  data: DataPoint[];
  type: "bar" | "line" | "pie" | "area";
  title?: string;
  className?: string;
  height?: number;
  showTrend?: boolean;
  animated?: boolean;
}

export function SmartChart({ 
  data, 
  type, 
  title, 
  className, 
  height = 200, 
  showTrend = false,
  animated = true 
}: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card className={cn("w-full", className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div style={{ height }} className="relative">
          {type === "bar" && <BarChart data={data} maxValue={maxValue} animated={animated} />}
          {type === "line" && <LineChart data={data} maxValue={maxValue} animated={animated} />}
          {type === "pie" && <PieChart data={data} animated={animated} />}
          {type === "area" && <AreaChart data={data} maxValue={maxValue} animated={animated} />}
        </div>
        {showTrend && <TrendIndicators data={data} />}
      </CardContent>
    </Card>
  );
}

function BarChart({ data, maxValue, animated }: { data: DataPoint[]; maxValue: number; animated: boolean }) {
  return (
    <div className="flex items-end justify-between h-full space-x-2">
      {data.map((point, index) => {
        const height = (point.value / maxValue) * 100;
        return (
          <div key={point.label} className="flex-1 flex flex-col items-center">
            <div 
              className={cn(
                "w-full rounded-t-lg transition-all duration-1000 ease-out",
                point.color || "bg-gradient-to-t from-blue-500 to-blue-600"
              )}
              style={{ 
                height: animated ? `${height}%` : "0%",
                transitionDelay: `${index * 100}ms`
              }}
            />
            <span className="text-xs text-gray-600 mt-2 text-center">{point.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineChart({ data, maxValue, animated }: { data: DataPoint[]; maxValue: number; animated: boolean }) {
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (point.value / maxValue) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          points={points}
          className={animated ? "animate-draw-line" : ""}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {data.map(point => (
          <span key={point.label} className="text-xs text-gray-600">{point.label}</span>
        ))}
      </div>
    </div>
  );
}

function PieChart({ data, animated }: { data: DataPoint[]; animated: boolean }) {
  const total = data.reduce((sum, point) => sum + point.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {data.map((point, index) => {
            const percentage = point.value / total;
            const strokeDasharray = percentage * 314.159; // 2 * π * 50 (radius)
            const strokeDashoffset = animated ? 314.159 - strokeDasharray : 0;
            const rotation = currentAngle;
            currentAngle += percentage * 360;

            return (
              <circle
                key={point.label}
                cx="50"
                cy="50"
                r="50"
                fill="none"
                stroke={point.color || `hsl(${index * 60}, 70%, 50%)`}
                strokeWidth="10"
                strokeDasharray={`${strokeDasharray} 314.159`}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(${rotation} 50 50)`}
                className={animated ? "transition-all duration-1000 ease-out" : ""}
                style={{ transitionDelay: `${index * 200}ms` }}
              />
            );
          })}
        </svg>
      </div>
      <div className="ml-8 space-y-2">
        {data.map((point, index) => (
          <div key={point.label} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: point.color || `hsl(${index * 60}, 70%, 50%)` }}
            />
            <span className="text-sm">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AreaChart({ data, maxValue, animated }: { data: DataPoint[]; maxValue: number; animated: boolean }) {
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (point.value / maxValue) * 100;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="relative h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon
          fill="url(#areaGradient)"
          points={areaPoints}
          className={animated ? "animate-fill-area" : ""}
        />
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
          className={animated ? "animate-draw-line" : ""}
        />
      </svg>
    </div>
  );
}

function TrendIndicators({ data }: { data: DataPoint[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {data.filter(d => d.trend !== undefined).map(point => (
        <div key={point.label} className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{point.label}</span>
          <span className={cn(
            "text-sm font-medium",
            point.trend! > 0 ? "text-green-600" : point.trend! < 0 ? "text-red-600" : "text-gray-600"
          )}>
            {point.trend! > 0 ? "↗" : point.trend! < 0 ? "↘" : "→"} {Math.abs(point.trend!)}%
          </span>
        </div>
      ))}
    </div>
  );
}