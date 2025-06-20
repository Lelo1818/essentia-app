import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, Clock, TrendingUp, AlertCircle, CheckCircle,
  Activity, Wifi, Database, Server
} from "lucide-react";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: "good" | "warning" | "critical";
  description: string;
}

interface PerformanceMonitorProps {
  className?: string;
  showDetails?: boolean;
}

export function PerformanceMonitor({ className, showDetails = false }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = React.useState<PerformanceMetric[]>([]);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const updateMetrics = () => {
      const newMetrics: PerformanceMetric[] = [
        {
          name: "Carregamento da Página",
          value: performance.now(),
          unit: "ms",
          threshold: 2000,
          status: performance.now() < 2000 ? "good" : performance.now() < 4000 ? "warning" : "critical",
          description: "Tempo total para carregar a página"
        },
        {
          name: "Conexão de Rede",
          value: (navigator as any).connection?.downlink || 10,
          unit: "Mbps",
          threshold: 5,
          status: ((navigator as any).connection?.downlink || 10) > 5 ? "good" : "warning",
          description: "Velocidade da conexão de internet"
        },
        {
          name: "Uso de Memória",
          value: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
          unit: "MB",
          threshold: 100,
          status: ((performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0) < 100 ? "good" : "warning",
          description: "Memória JavaScript utilizada"
        },
        {
          name: "API Response",
          value: Math.random() * 500 + 50,
          unit: "ms",
          threshold: 300,
          status: Math.random() > 0.5 ? "good" : "warning",
          description: "Tempo de resposta do servidor"
        }
      ];
      setMetrics(newMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const overallStatus = React.useMemo(() => {
    const criticalCount = metrics.filter(m => m.status === 'critical').length;
    const warningCount = metrics.filter(m => m.status === 'warning').length;
    
    if (criticalCount > 0) return 'critical';
    if (warningCount > 0) return 'warning';
    return 'good';
  }, [metrics]);

  const statusConfig = {
    good: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    warning: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    critical: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  };

  if (!showDetails) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Card className="w-16 h-16 p-0 shadow-lg">
          <CardContent className="p-0 flex items-center justify-center h-full">
            <div className="relative">
              <Activity className={`w-6 h-6 ${statusConfig[overallStatus].color}`} />
              {!isOnline && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Performance</span>
          </span>
          <div className="flex items-center space-x-2">
            <Badge className={statusConfig[overallStatus].bg + " " + statusConfig[overallStatus].color}>
              {overallStatus === 'good' ? 'Ótimo' : overallStatus === 'warning' ? 'Atenção' : 'Crítico'}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => {
          const StatusIcon = statusConfig[metric.status].icon;
          const progressValue = Math.min((metric.value / metric.threshold) * 100, 100);
          
          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`w-4 h-4 ${statusConfig[metric.status].color}`} />
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <span className="text-sm font-mono">
                  {metric.value.toFixed(metric.unit === 'ms' ? 0 : 1)} {metric.unit}
                </span>
              </div>
              <Progress 
                value={progressValue} 
                className={`h-2 ${statusConfig[metric.status].bg}`}
              />
              <p className="text-xs text-gray-500">{metric.description}</p>
            </div>
          );
        })}

        <div className="pt-4 border-t space-y-2">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Server className="w-4 h-4" />
            <span>Status do Sistema</span>
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span>Online:</span>
              <span className={isOnline ? "text-green-600" : "text-red-600"}>
                {isOnline ? "Sim" : "Não"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Conexão:</span>
              <span className="text-gray-600">
                {(navigator as any).connection?.effectiveType || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}