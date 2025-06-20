import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingDown, AlertCircle, CheckCircle, Target, Lightbulb } from "lucide-react";

interface FeedbackIA {
  id: string;
  categoria: string;
  padrao: string;
  impacto: string;
  sugestao: string;
  economia: number;
  tipo: "alerta" | "oportunidade" | "parabens";
  urgencia: "alta" | "media" | "baixa";
}

export default function FeedbackIA() {
  const [feedbacks, setFeedbacks] = useState<FeedbackIA[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  useEffect(() => {
    const feedbacksExemplo: FeedbackIA[] = [
      {
        id: "1",
        categoria: "Delivery",
        padrao: "Seus gastos com delivery somaram R$ 380 esta semana (23% do orçamento semanal)",
        impacto: "Esse padrão representa R$ 1.520 por mês, equivalente a 18% da sua renda",
        sugestao: "Considere planejar refeições em casa 3x por semana. Economia estimada: R$ 600/mês",
        economia: 600,
        tipo: "alerta",
        urgencia: "alta"
      },
      {
        id: "2",
        categoria: "Assinaturas",
        padrao: "Identificamos 4 assinaturas ativas com uso baixo nos últimos 60 dias",
        impacto: "Netflix (3 acessos), Spotify Premium (12 músicas), Adobe (não usado), Gym (2 idas)",
        sugestao: "Cancelar assinaturas não utilizadas pode liberar R$ 180/mês para suas metas",
        economia: 180,
        tipo: "oportunidade",
        urgencia: "media"
      },
      {
        id: "3",
        categoria: "Combustível",
        padrao: "Você tem mantido gastos com combustível 15% abaixo da média mensal",
        impacto: "Economia de R$ 95 vs mês anterior, indicando otimização de rotas ou uso consciente",
        sugestao: "Continue com esse padrão excelente. Considere apps de carona para economizar mais",
        economia: 95,
        tipo: "parabens",
        urgencia: "baixa"
      },
      {
        id: "4",
        categoria: "Supermercado",
        padrao: "Compras impulsivas detectadas: itens não recorrentes somam R$ 150 semanais",
        impacto: "Produtos fora da lista habitual representam 30% dos gastos em supermercado",
        sugestao: "Use lista de compras no app. Modo 'foco' pode reduzir impulsos em 40%",
        economia: 240,
        tipo: "alerta",
        urgencia: "media"
      },
      {
        id: "5",
        categoria: "Investimentos",
        padrao: "Reserva de emergência atingiu 6 meses de gastos - parabéns!",
        impacto: "Segurança financeira consolidada. Próximo passo: diversificar investimentos",
        sugestao: "Hora de investir excedente em renda variável. Sugestão: 70% CDB, 30% ações",
        economia: 0,
        tipo: "parabens",
        urgencia: "baixa"
      }
    ];
    setFeedbacks(feedbacksExemplo);
  }, []);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "alerta": return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "oportunidade": return <Target className="w-5 h-5 text-blue-500" />;
      case "parabens": return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "alerta": return "border-red-200 bg-red-50";
      case "oportunidade": return "border-blue-200 bg-blue-50";
      case "parabens": return "border-green-200 bg-green-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta": return "text-red-600 bg-red-100";
      case "media": return "text-yellow-600 bg-yellow-100";
      case "baixa": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const feedbacksFiltrados = filtroTipo === "todos" 
    ? feedbacks 
    : feedbacks.filter(f => f.tipo === filtroTipo);

  const economiaTotal = feedbacks
    .filter(f => f.tipo !== "parabens")
    .reduce((acc, f) => acc + f.economia, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Inteligente</h1>
          <p className="text-gray-600">Análises objetivas para otimizar seus padrões financeiros</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">R$ {economiaTotal}</div>
          <div className="text-sm text-gray-600">Economia Potencial Identificada</div>
        </div>
      </div>

      {/* Resumo IA */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <CardTitle className="text-purple-800">Análise Semanal da IA</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">Alertas Identificados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">Oportunidades Detectadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">Comportamentos Positivos</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border">
            <p className="text-sm text-gray-700">
              <strong>Insight Principal:</strong> Seus padrões de consumo mostram oportunidade de economia de R$ 840/mês 
              focando em delivery e assinaturas não utilizadas. Comportamento financeiro geral está 73% otimizado.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <div className="flex space-x-2">
        <Button
          variant={filtroTipo === "todos" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo("todos")}
        >
          Todos
        </Button>
        <Button
          variant={filtroTipo === "alerta" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo("alerta")}
          className="text-red-600 border-red-300"
        >
          Alertas
        </Button>
        <Button
          variant={filtroTipo === "oportunidade" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo("oportunidade")}
          className="text-blue-600 border-blue-300"
        >
          Oportunidades
        </Button>
        <Button
          variant={filtroTipo === "parabens" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo("parabens")}
          className="text-green-600 border-green-300"
        >
          Parabéns
        </Button>
      </div>

      {/* Lista de Feedbacks */}
      <div className="space-y-4">
        {feedbacksFiltrados.map((feedback) => (
          <Card key={feedback.id} className={`${getTipoColor(feedback.tipo)} transition-all hover:shadow-lg`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getTipoIcon(feedback.tipo)}
                  <div>
                    <CardTitle className="text-lg">{feedback.categoria}</CardTitle>
                    <Badge className={`text-xs ${getUrgenciaColor(feedback.urgencia)} mt-1`}>
                      {feedback.urgencia === "alta" ? "Alta" : 
                       feedback.urgencia === "media" ? "Média" : "Baixa"} Prioridade
                    </Badge>
                  </div>
                </div>
                {feedback.economia > 0 && (
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">R$ {feedback.economia}</div>
                    <div className="text-xs text-gray-600">economia/mês</div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Padrão Identificado</h4>
                <p className="text-gray-700 text-sm">{feedback.padrao}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Impacto Analisado</h4>
                <p className="text-gray-600 text-sm">{feedback.impacto}</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                  Sugestão da IA
                </h4>
                <p className="text-gray-700 text-sm">{feedback.sugestao}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Aplicar Sugestão
                </Button>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Não se Aplica
                  </Button>
                  <Button size="sm" variant="outline">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progresso de Otimização */}
      <Card>
        <CardHeader>
          <CardTitle>Seu Nível de Otimização Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Otimização Geral</span>
              <span className="text-sm font-bold">73%</span>
            </div>
            <Progress value={73} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Controle de Gastos</span>
                  <span className="font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Aproveitamento de Ofertas</span>
                  <span className="font-semibold">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Consistência no Registro</span>
                  <span className="font-semibold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Objetivos de Poupança</span>
                  <span className="font-semibold">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}