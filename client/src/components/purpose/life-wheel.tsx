import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  TrendingUp, 
  Heart, 
  Users,
  Target,
  Brain,
  Dumbbell,
  DollarSign,
  Briefcase,
  Home,
  Star,
  RotateCcw
} from "lucide-react";

export default function LifeWheel() {
  const [selectedArea, setSelectedArea] = useState(null);

  const lifeAreas = [
    {
      id: 1,
      name: "Relacionamentos",
      description: "Família, amigos, parceiro amoroso",
      currentScore: 7,
      desiredScore: 9,
      lastUpdated: "2 dias atrás",
      trend: "up",
      insights: [
        "Melhorou comunicação com família",
        "Criou vínculos mais profundos com amigos",
        "Precisa investir mais em relacionamento amoroso"
      ],
      actions: [
        "Jantar semanal com família",
        "Encontros regulares com amigos próximos",
        "Date night quinzenal"
      ],
      icon: Heart,
      color: "text-red-500 bg-red-50 border-red-200"
    },
    {
      id: 2,
      name: "Carreira/Propósito",
      description: "Trabalho, missão de vida, contribuição",
      currentScore: 8,
      desiredScore: 10,
      lastUpdated: "1 dia atrás",
      trend: "up",
      insights: [
        "Clareza sobre missão aumentou significativamente",
        "Projetos alinhados com valores",
        "Falta implementar plano de ação concreto"
      ],
      actions: [
        "Lançar projeto educacional em 30 dias",
        "Buscar mentores na área",
        "Definir métricas de impacto"
      ],
      icon: Target,
      color: "text-blue-500 bg-blue-50 border-blue-200"
    },
    {
      id: 3,
      name: "Saúde Física",
      description: "Exercícios, alimentação, energia",
      currentScore: 6,
      desiredScore: 8,
      lastUpdated: "3 dias atrás",
      trend: "stable",
      insights: [
        "Energia tem melhorado com exercícios",
        "Alimentação ainda inconsistente",
        "Sono de qualidade 70% das noites"
      ],
      actions: [
        "Academia 3x por semana",
        "Meal prep aos domingos",
        "Dormir antes das 23h"
      ],
      icon: Dumbbell,
      color: "text-green-500 bg-green-50 border-green-200"
    },
    {
      id: 4,
      name: "Crescimento Pessoal",
      description: "Aprendizado, autoconhecimento, espiritualidade",
      currentScore: 9,
      desiredScore: 9,
      lastUpdated: "Hoje",
      trend: "up",
      insights: [
        "Reflexões diárias têm sido transformadoras",
        "Autoconhecimento em nível alto",
        "Práticas espirituais regulares"
      ],
      actions: [
        "Manter rotina de reflexão",
        "Estudar filosofia estoica",
        "Meditação matinal"
      ],
      icon: Brain,
      color: "text-purple-500 bg-purple-50 border-purple-200"
    },
    {
      id: 5,
      name: "Finanças",
      description: "Estabilidade, investimentos, liberdade",
      currentScore: 7,
      desiredScore: 8,
      lastUpdated: "1 semana atrás",
      trend: "up",
      insights: [
        "Controle financeiro melhorou muito",
        "Investimentos crescendo consistentemente",
        "Falta diversificar fontes de renda"
      ],
      actions: [
        "Aumentar aportes mensais em 20%",
        "Criar segunda fonte de renda",
        "Estudar mais sobre investimentos"
      ],
      icon: DollarSign,
      color: "text-yellow-500 bg-yellow-50 border-yellow-200"
    },
    {
      id: 6,
      name: "Lazer e Diversão",
      description: "Hobbies, viagens, momentos de prazer",
      currentScore: 5,
      desiredScore: 7,
      lastUpdated: "1 semana atrás",
      trend: "down",
      insights: [
        "Tem negligenciado momentos de lazer",
        "Muita foco no trabalho/crescimento",
        "Precisa equilibrar produtividade com diversão"
      ],
      actions: [
        "Agendar 1 atividade de lazer por semana",
        "Planejar viagem trimestral",
        "Retomar hobbies antigos"
      ],
      icon: Star,
      color: "text-pink-500 bg-pink-50 border-pink-200"
    },
    {
      id: 7,
      name: "Ambiente/Casa",
      description: "Espaço físico, organização, conforto",
      currentScore: 6,
      desiredScore: 8,
      lastUpdated: "5 dias atrás",
      trend: "stable",
      insights: [
        "Casa mais organizada que antes",
        "Ambiente de trabalho funcional",
        "Falta criar espaços mais inspiradores"
      ],
      actions: [
        "Decorar escritório para inspirar criatividade",
        "Organizar sistema de arquivos",
        "Criar canto de meditação"
      ],
      icon: Home,
      color: "text-indigo-500 bg-indigo-50 border-indigo-200"
    },
    {
      id: 8,
      name: "Contribuição Social",
      description: "Voluntariado, impacto na comunidade",
      currentScore: 4,
      desiredScore: 8,
      lastUpdated: "2 semanas atrás",
      trend: "stable",
      insights: [
        "Forte desejo de contribuir mais",
        "Falta tempo estruturado para voluntariado",
        "Muitas ideias, pouca execução"
      ],
      actions: [
        "Escolher 1 causa específica para focar",
        "Dedicar 4h por semana ao voluntariado",
        "Usar habilidades tech para causas sociais"
      ],
      icon: Users,
      color: "text-orange-500 bg-orange-50 border-orange-200"
    }
  ];

  const calculateOverallBalance = () => {
    const total = lifeAreas.reduce((sum, area) => sum + area.currentScore, 0);
    return Math.round(total / lifeAreas.length * 10);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    if (score >= 4) return "text-orange-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getGapAnalysis = () => {
    return lifeAreas
      .map(area => ({
        ...area,
        gap: area.desiredScore - area.currentScore
      }))
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3);
  };

  const overallBalance = calculateOverallBalance();
  const topGaps = getGapAnalysis();

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Roda da Vida
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-700">
                Equilíbrio: {overallBalance}%
              </Badge>
              <Button size="sm" variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" />
                Atualizar
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Avalie cada área da sua vida em uma escala de 1-10 e veja onde focar sua energia
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifeAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <div
                  key={area.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedArea === area.id 
                      ? area.color 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                >
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{area.name}</h4>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getScoreColor(area.currentScore)}`}>
                          {area.currentScore}/10
                        </div>
                        <Progress value={area.currentScore * 10} className="h-2" />
                        <div className="flex items-center justify-center space-x-1 text-xs">
                          <span>Meta: {area.desiredScore}</span>
                          <span>{getTrendIcon(area.trend)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Area View */}
      {selectedArea && (
        <Card>
          <CardContent className="p-6">
            {lifeAreas
              .filter(area => area.id === selectedArea)
              .map(area => {
                const IconComponent = area.icon;
                const gap = area.desiredScore - area.currentScore;
                
                return (
                  <div key={area.id} className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-full ${area.color}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{area.name}</h3>
                            <p className="text-gray-600">{area.description}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-3xl font-bold ${getScoreColor(area.currentScore)}`}>
                              {area.currentScore}/10
                            </div>
                            <div className="text-sm text-gray-500">
                              Meta: {area.desiredScore} {getTrendIcon(area.trend)}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-gray-500 mb-2">Progresso Atual</div>
                            <Progress value={area.currentScore * 10} className="h-4 mb-1" />
                            <div className="text-xs text-gray-600">Última atualização: {area.lastUpdated}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-2">Gap para Meta</div>
                            <div className="flex items-center space-x-2">
                              <div className={`text-lg font-semibold ${gap > 2 ? 'text-red-600' : gap > 1 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {gap > 0 ? `+${gap} pontos` : 'Meta alcançada!'}
                              </div>
                              {gap > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {gap > 2 ? 'Alta prioridade' : gap > 1 ? 'Média prioridade' : 'Baixa prioridade'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Insights */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Insights e Observações
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {area.insights.map((insight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          Ações para Melhorar
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {area.actions.map((action, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Atualizar Pontuação
                      </Button>
                      <Button size="sm" variant="outline">
                        Criar Plano de Ação
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Histórico
                      </Button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      )}

      {/* Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-600" />
            Análise de Prioridades
          </CardTitle>
          <p className="text-sm text-gray-600">
            Áreas com maior diferença entre situação atual e desejada
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topGaps.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={area.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                  
                  <div className={`p-2 rounded-full ${area.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{area.name}</h4>
                      <Badge className={area.gap > 2 ? 'bg-red-100 text-red-700' : area.gap > 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                        Gap: +{area.gap} pontos
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Atual:</span>
                        <span className={`ml-1 font-medium ${getScoreColor(area.currentScore)}`}>
                          {area.currentScore}/10
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Meta:</span>
                        <span className="ml-1 font-medium text-gray-700">{area.desiredScore}/10</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Progresso:</span>
                        <span className="ml-1 font-medium text-blue-600">
                          {Math.round((area.currentScore / area.desiredScore) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" onClick={() => setSelectedArea(area.id)}>
                    Focar Aqui
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Life Balance Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Insights de Equilíbrio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{overallBalance}%</div>
                <div className="text-sm text-blue-700">Equilíbrio Geral</div>
              </div>
              
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {lifeAreas.filter(a => a.currentScore >= 7).length}
                </div>
                <div className="text-sm text-green-700">Áreas Saudáveis</div>
              </div>
              
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {lifeAreas.filter(a => a.gap > 1).length}
                </div>
                <div className="text-sm text-orange-700">Precisam Atenção</div>
              </div>
            </div>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <h6 className="font-medium text-blue-800 mb-2">Recomendação da Semana</h6>
              <p className="text-sm text-blue-700">
                Com base na sua análise, recomendamos focar em <strong>Contribuição Social</strong> esta semana. 
                Dedicar apenas 2-3 horas pode aumentar significativamente sua satisfação geral.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}