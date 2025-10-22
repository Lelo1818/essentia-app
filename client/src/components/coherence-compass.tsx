import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Heart, Zap, Activity } from "lucide-react";

interface CoherenceAnalysis {
  coherenceIndex: number;
  dimensionalBalance: {
    physical_energy: number;
    energy_mental: number;
    mental_spiritual: number;
    spiritual_physical: number;
  };
  patterns: {
    type: 'balanced' | 'ascending' | 'descending' | 'chaotic' | 'polarized';
    description: string;
  };
  insights: string[];
  recommendations: string[];
  resonanceField: number;
  basedOnCheckin: {
    id: number;
    createdAt: string;
    dimensions: {
      fisico: number;
      energetico: number;
      mental: number;
      espiritual: number;
    };
  };
}

export function CoherenceCompass() {
  const { data, isLoading, error } = useQuery<CoherenceAnalysis>({
    queryKey: ['/api/feme/coherence'],
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Bússola de Coerência
          </CardTitle>
          <CardDescription>Analisando suas dimensões...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-20 bg-muted rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Bússola de Coerência
          </CardTitle>
          <CardDescription>Complete um check-in FEME para ver sua coerência</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Cor baseada no índice de coerência
  const getCoherenceColor = (index: number) => {
    if (index >= 80) return "text-green-500";
    if (index >= 60) return "text-blue-500";
    if (index >= 40) return "text-yellow-500";
    return "text-orange-500";
  };

  const getCoherenceGradient = (index: number) => {
    if (index >= 80) return "from-green-500 to-emerald-500";
    if (index >= 60) return "from-blue-500 to-cyan-500";
    if (index >= 40) return "from-yellow-500 to-amber-500";
    return "from-orange-500 to-red-500";
  };

  const getPatternIcon = (type: string) => {
    switch (type) {
      case 'balanced':
        return <Heart className="w-5 h-5 text-green-500" />;
      case 'ascending':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'descending':
        return <Activity className="w-5 h-5 text-orange-500" />;
      default:
        return <Brain className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-background to-muted/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Bússola de Coerência
        </CardTitle>
        <CardDescription>Análise científica das suas 4 dimensões FEME</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Índice de Coerência Principal */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted opacity-20"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#coherenceGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(data.coherenceIndex / 100) * 440} 440`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="coherenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className={`${getCoherenceGradient(data.coherenceIndex).split(' ')[0].replace('from-', 'text-')}`} stopOpacity="1" />
                    <stop offset="100%" className={`${getCoherenceGradient(data.coherenceIndex).split(' ')[1].replace('to-', 'text-')}`} stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getCoherenceColor(data.coherenceIndex)}`}>
                  {data.coherenceIndex}
                </span>
                <span className="text-sm text-muted-foreground">Coerência</span>
              </div>
            </div>
          </div>
          
          {/* Campo de Ressonância */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-muted-foreground">Campo de Ressonância</span>
            </div>
            <div className="text-2xl font-semibold mt-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {data.resonanceField}%
            </div>
          </div>
        </div>

        {/* Padrão Detectado */}
        <div className="p-4 rounded-lg bg-muted/30 border border-muted">
          <div className="flex items-start gap-3">
            {getPatternIcon(data.patterns.type)}
            <div className="flex-1">
              <h4 className="font-semibold capitalize text-sm mb-1">
                {data.patterns.type === 'balanced' ? 'Equilíbrio' : 
                 data.patterns.type === 'ascending' ? 'Ascendente' :
                 data.patterns.type === 'descending' ? 'Descendente' :
                 data.patterns.type === 'polarized' ? 'Polarizado' : 'Caótico'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {data.patterns.description}
              </p>
            </div>
          </div>
        </div>

        {/* Equilíbrio Dimensional */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Equilíbrio Dimensional</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Físico ↔ Energético</span>
                <span className="font-medium">{data.dimensionalBalance.physical_energy}%</span>
              </div>
              <Progress value={data.dimensionalBalance.physical_energy} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Energético ↔ Mental</span>
                <span className="font-medium">{data.dimensionalBalance.energy_mental}%</span>
              </div>
              <Progress value={data.dimensionalBalance.energy_mental} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Mental ↔ Espiritual</span>
                <span className="font-medium">{data.dimensionalBalance.mental_spiritual}%</span>
              </div>
              <Progress value={data.dimensionalBalance.mental_spiritual} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Espiritual ↔ Físico</span>
                <span className="font-medium">{data.dimensionalBalance.spiritual_physical}%</span>
              </div>
              <Progress value={data.dimensionalBalance.spiritual_physical} className="h-2" />
            </div>
          </div>
        </div>

        {/* Insights Científicos */}
        {data.insights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Insights Científicos
            </h4>
            <div className="space-y-2">
              {data.insights.map((insight, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-muted/20 border border-muted/40">
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendações */}
        {data.recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Recomendações
            </h4>
            <div className="space-y-1.5">
              {data.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-muted-foreground">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="pt-4 border-t border-muted/40 text-center">
          <p className="text-xs text-muted-foreground">
            Baseado no check-in de {new Date(data.basedOnCheckin.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
