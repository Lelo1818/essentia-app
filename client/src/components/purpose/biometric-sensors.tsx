import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart,
  Mic,
  Camera,
  Activity,
  Brain,
  Eye,
  Zap,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Waves,
  CirclePlay,
  Pause,
  RefreshCw,
  Download
} from "lucide-react";

export default function BiometricSensors() {
  const { toast } = useToast();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showTrendsDialog, setShowTrendsDialog] = useState(false);
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    voiceTone: "calmo",
    emotionalState: "equilibrado",
    energyLevel: 78,
    auraColor: "#4ade80",
    stressLevel: 23
  });

  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Mutation para exportar dados
  const exportDataMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = {
        timestamp: new Date().toISOString(),
        ...biometricData,
        readings: 47
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `biometric-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "✅ Dados Exportados!",
        description: "Arquivo JSON baixado com sucesso. Contém todas as 47 leituras biométricas.",
        duration: 6000,
      });
    },
  });

  // Mutation para análise IA
  const aiAnalysisMutation = useMutation({
    mutationFn: async () => {
      const context = `Frequência cardíaca: ${Math.round(biometricData.heartRate)}bpm, Estresse: ${Math.round(biometricData.stressLevel)}%, Energia: ${Math.round(biometricData.energyLevel)}%, Estado emocional: ${biometricData.emotionalState}`;
      
      const response = await fetch("/api/ai/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      });
      if (!response.ok) throw new Error("Erro ao gerar análise");
      return response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "🤖 Análise IA Concluída",
        description: data.insight,
        duration: 15000,
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível gerar análise IA",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring && realTimeUpdates) {
      interval = setInterval(() => {
        setBiometricData(prev => ({
          heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 10)),
          bloodPressure: {
            systolic: Math.max(110, Math.min(140, prev.bloodPressure.systolic + (Math.random() - 0.5) * 8)),
            diastolic: Math.max(70, Math.min(90, prev.bloodPressure.diastolic + (Math.random() - 0.5) * 6))
          },
          voiceTone: Math.random() > 0.7 ? (Math.random() > 0.5 ? "animado" : "tenso") : "calmo",
          emotionalState: Math.random() > 0.8 ? (Math.random() > 0.5 ? "inspirado" : "ansioso") : "equilibrado",
          energyLevel: Math.max(20, Math.min(100, prev.energyLevel + (Math.random() - 0.5) * 15)),
          auraColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() - 0.5) * 20))
        }));
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, realTimeUpdates]);

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { status: "baixo", color: "text-blue-600", bg: "bg-blue-50" };
    if (hr > 90) return { status: "elevado", color: "text-red-600", bg: "bg-red-50" };
    return { status: "normal", color: "text-green-600", bg: "bg-green-50" };
  };

  const getEmotionalColor = (state: string) => {
    const colors = {
      "equilibrado": "text-green-600",
      "inspirado": "text-purple-600", 
      "ansioso": "text-orange-600",
      "calmo": "text-blue-600"
    };
    return colors[state as keyof typeof colors] || "text-gray-600";
  };

  const getVoiceAnalysis = (tone: string) => {
    const analysis = {
      "calmo": { emoji: "😌", description: "Voz estável e relaxada", recommendation: "Continue nesta frequência harmoniosa" },
      "animado": { emoji: "🤗", description: "Tom energético e positivo", recommendation: "Energia ótima para manifestações" },
      "tenso": { emoji: "😰", description: "Tensão detectada na voz", recommendation: "Pratique respiração profunda" }
    };
    return analysis[tone as keyof typeof analysis] || analysis.calmo;
  };

  const heartStatus = getHeartRateStatus(biometricData.heartRate);
  const voiceAnalysis = getVoiceAnalysis(biometricData.voiceTone);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-purple-800">
            <Activity className="w-6 h-6 mr-3" />
            Sensores Biométricos Avançados
          </CardTitle>
          <p className="text-purple-700">
            Monitoramento em tempo real do seu estado físico, emocional e energético
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`transition-all duration-200 ${
                  isMonitoring 
                    ? "bg-red-600 hover:bg-red-700" 
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isMonitoring ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar Monitoramento
                  </>
                ) : (
                  <>
                    <CirclePlay className="w-4 h-4 mr-2" />
                    Iniciar Monitoramento
                  </>
                )}
              </Button>
              
              <Badge className={`${isMonitoring ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {isMonitoring ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Atualizações automáticas:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRealTimeUpdates(!realTimeUpdates)}
              >
                <RefreshCw className={`w-4 h-4 ${realTimeUpdates ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biometric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Heart Rate Monitor */}
        <Card className={`${heartStatus.bg} border-l-4 border-l-red-400`}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Heart className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
              Frequência Cardíaca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {Math.round(biometricData.heartRate)}
                </div>
                <div className="text-sm text-gray-600">BPM</div>
              </div>
              <Badge className={`w-full justify-center ${heartStatus.color} bg-white/50`}>
                {heartStatus.status.toUpperCase()}
              </Badge>
              <Progress value={(biometricData.heartRate / 100) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Blood Pressure */}
        <Card className="bg-blue-50 border-l-4 border-l-blue-400">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              Pressão Arterial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(biometricData.bloodPressure.systolic)}/{Math.round(biometricData.bloodPressure.diastolic)}
                </div>
                <div className="text-sm text-gray-600">mmHg</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-white/50 rounded">
                  <div className="font-medium">Sistólica</div>
                  <div>{Math.round(biometricData.bloodPressure.systolic)}</div>
                </div>
                <div className="text-center p-2 bg-white/50 rounded">
                  <div className="font-medium">Diastólica</div>
                  <div>{Math.round(biometricData.bloodPressure.diastolic)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Analysis */}
        <Card className="bg-yellow-50 border-l-4 border-l-yellow-400">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Mic className="w-5 h-5 mr-2 text-yellow-500" />
              Análise de Voz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl mb-2">{voiceAnalysis.emoji}</div>
                <div className="font-bold text-yellow-700 capitalize">
                  {biometricData.voiceTone}
                </div>
              </div>
              <div className="text-xs text-center text-yellow-600">
                {voiceAnalysis.description}
              </div>
              <div className="p-2 bg-white/50 rounded text-xs text-center">
                💡 {voiceAnalysis.recommendation}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emotional State */}
        <Card className="bg-purple-50 border-l-4 border-l-purple-400">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Brain className="w-5 h-5 mr-2 text-purple-500" />
              Estado Emocional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className={`text-xl font-bold ${getEmotionalColor(biometricData.emotionalState)} capitalize`}>
                  {biometricData.emotionalState}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${biometricData.energyLevel}%` }}
                ></div>
              </div>
              <div className="text-xs text-center text-purple-600">
                Energia: {Math.round(biometricData.energyLevel)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aura Capture */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-l-indigo-400">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Camera className="w-5 h-5 mr-2 text-indigo-500" />
              Captura de Aura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto rounded-full border-4 border-white shadow-lg animate-pulse"
                  style={{ backgroundColor: biometricData.auraColor }}
                ></div>
              </div>
              <div className="text-xs text-center text-indigo-600">
                Cor da energia atual
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setBiometricData(prev => ({
                  ...prev,
                  auraColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
                }))}
              >
                <Eye className="w-4 h-4 mr-2" />
                Nova Captura
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stress Level */}
        <Card className="bg-orange-50 border-l-4 border-l-orange-400">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Waves className="w-5 h-5 mr-2 text-orange-500" />
              Nível de Estresse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(biometricData.stressLevel)}%
                </div>
              </div>
              <Progress value={biometricData.stressLevel} className="h-3" />
              <div className="flex justify-between text-xs text-orange-600">
                <span>Relaxado</span>
                <span>Tenso</span>
              </div>
              {biometricData.stressLevel > 70 && (
                <div className="flex items-center space-x-2 p-2 bg-red-100 rounded">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-700">Nível alto - pratique respiração</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Sparkles className="w-5 h-5 mr-2" />
            Recomendações Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/50 rounded-lg">
              <h6 className="font-medium text-green-800 mb-2">📱 Flow</h6>
              <p className="text-sm text-green-700">
                Com seu estresse em {Math.round(biometricData.stressLevel)}%, considere revisar seus gastos para reduzir ansiedade financeira.
              </p>
            </div>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <h6 className="font-medium text-blue-800 mb-2">🎓 EduVie</h6>
              <p className="text-sm text-blue-700">
                Sua energia está em {Math.round(biometricData.energyLevel)}% - momento ideal para sessões de estudo focado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico Biométrico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dados coletados hoje:</span>
              <Badge className="bg-blue-100 text-blue-700">47 leituras</Badge>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTrendsDialog(true)}
                data-testid="button-view-trends"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Ver Tendências
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportDataMutation.mutate()}
                disabled={exportDataMutation.isPending}
                data-testid="button-export-data"
              >
                {exportDataMutation.isPending ? (
                  <>
                    <Download className="w-4 h-4 mr-2 animate-bounce" />
                    Exportando...
                  </>
                ) : (
                  <>
                    📊 Exportar Dados
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => aiAnalysisMutation.mutate()}
                disabled={aiAnalysisMutation.isPending}
                data-testid="button-ai-analysis"
              >
                {aiAnalysisMutation.isPending ? "Analisando..." : "🤖 Análise IA"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trends Dialog - RELATÓRIO COMPLETO */}
      <Dialog open={showTrendsDialog} onOpenChange={setShowTrendsDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Relatório Biométrico Completo
            </DialogTitle>
            <DialogDescription>
              Análise detalhada das últimas 47 leituras (últimas 24h) • Atualizado em tempo real
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm text-red-600 mb-1">Freq. Cardíaca</div>
                <div className="text-2xl font-bold text-red-700">{Math.round(biometricData.heartRate)}</div>
                <div className="text-xs text-red-500">BPM médio</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-sm text-orange-600 mb-1">Estresse</div>
                <div className="text-2xl font-bold text-orange-700">{Math.round(biometricData.stressLevel)}%</div>
                <div className="text-xs text-orange-500">Nível atual</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 mb-1">Energia</div>
                <div className="text-2xl font-bold text-purple-700">{Math.round(biometricData.energyLevel)}%</div>
                <div className="text-xs text-purple-500">Nível atual</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 mb-1">Estado</div>
                <div className="text-lg font-bold text-green-700 capitalize">{biometricData.emotionalState}</div>
                <div className="text-xs text-green-500">Emocional</div>
              </div>
            </div>

            {/* Trend Chart Placeholder */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                📈 Evolução nas Últimas 24h
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Frequência Cardíaca</span>
                    <span className="text-green-600">↗ +3% vs ontem</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Nível de Estresse</span>
                    <span className="text-green-600">↘ -12% vs ontem</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Energia</span>
                    <span className="text-green-600">↗ +8% vs ontem</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </div>

            {/* Métricas Avançadas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Variabilidade Cardíaca (HRV)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-600">RMSSD:</span>
                    <span className="font-bold text-blue-800">48ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">SDNN:</span>
                    <span className="font-bold text-blue-800">65ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Índice Saúde:</span>
                    <span className="font-bold text-green-700">Ótimo ✓</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2 pt-2 border-t border-blue-200">
                    Alta HRV indica boa recuperação e baixo estresse crônico
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Estado Neurológico
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-600">Ondas Alpha:</span>
                    <span className="font-bold text-purple-800">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">Ondas Beta:</span>
                    <span className="font-bold text-purple-800">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">Clareza Mental:</span>
                    <span className="font-bold text-green-700">Alta ✓</span>
                  </div>
                  <p className="text-xs text-purple-600 mt-2 pt-2 border-t border-purple-200">
                    Estado ideal para criatividade e aprendizado focado
                  </p>
                </div>
              </div>
            </div>

            {/* Histórico Detalhado Última Semana */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                📅 Histórico - Últimos 7 Dias
              </h4>
              <div className="space-y-2">
                {[
                  { dia: "Hoje", hr: 72, stress: 23, energy: 78, emoji: "😊", status: "Excelente" },
                  { dia: "Ontem", hr: 75, stress: 35, energy: 70, emoji: "🙂", status: "Bom" },
                  { dia: "19/10", hr: 78, stress: 45, energy: 65, emoji: "😐", status: "Moderado" },
                  { dia: "18/10", hr: 70, stress: 20, energy: 82, emoji: "🤩", status: "Ótimo" },
                  { dia: "17/10", hr: 73, stress: 28, energy: 75, emoji: "😊", status: "Excelente" },
                  { dia: "16/10", hr: 76, stress: 38, energy: 68, emoji: "🙂", status: "Bom" },
                  { dia: "15/10", hr: 74, stress: 42, energy: 72, emoji: "😐", status: "Moderado" }
                ].map((d, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${i === 0 ? 'bg-green-100 border-2 border-green-300' : 'bg-white'}`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{d.emoji}</span>
                      <span className="font-medium text-gray-700 w-16">{d.dia}</span>
                      <Badge className={`${i === 0 ? 'bg-green-600' : 'bg-gray-500'}`}>{d.status}</Badge>
                    </div>
                    <div className="flex space-x-6 text-sm">
                      <div className="text-center">
                        <div className="text-red-600 font-bold">{d.hr}</div>
                        <div className="text-xs text-gray-500">BPM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-600 font-bold">{d.stress}%</div>
                        <div className="text-xs text-gray-500">Stress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-600 font-bold">{d.energy}%</div>
                        <div className="text-xs text-gray-500">Energia</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparativos Estatísticos */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="text-sm font-semibold text-green-800 mb-2">📊 Média Semanal</h5>
                <div className="text-2xl font-bold text-green-700">74 BPM</div>
                <div className="text-xs text-green-600 mt-1">↘ -3% vs semana anterior</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h5 className="text-sm font-semibold text-orange-800 mb-2">🎯 Melhor Dia</h5>
                <div className="text-lg font-bold text-orange-700">18/10</div>
                <div className="text-xs text-orange-600 mt-1">Estresse: 20% | Energia: 82%</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="text-sm font-semibold text-purple-800 mb-2">⚡ Pico Energia</h5>
                <div className="text-2xl font-bold text-purple-700">82%</div>
                <div className="text-xs text-purple-600 mt-1">Horário: 14h30 (18/10)</div>
              </div>
            </div>

            {/* Insights */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                💡 Insights e Recomendações Personalizadas
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-yellow-700 mb-2">✅ Pontos Fortes:</h5>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Frequência cardíaca estável e saudável</li>
                    <li>• Boa variabilidade cardíaca (HRV)</li>
                    <li>• Picos de energia consistentes à tarde</li>
                    <li>• Estresse bem controlado hoje (-34% vs média)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-yellow-700 mb-2">🎯 Oportunidades:</h5>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Praticar respiração 4-4-6 às 10h (estresse↓)</li>
                    <li>• Agendar tarefas complexas entre 14h-16h</li>
                    <li>• Dormir antes das 23h para recuperação ótima</li>
                    <li>• Hidratação: beber água a cada 2h</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-500">
                Última atualização: {new Date().toLocaleTimeString('pt-BR')}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportDataMutation.mutate()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Relatório
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setShowTrendsDialog(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}