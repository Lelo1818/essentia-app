import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Star, Clock, TrendingUp, Target } from "lucide-react";
import { FeedbackUtils } from "@/utils/feedbackUtils";

interface OpportunitiesModalProps {
  onClose: () => void;
}

export function OpportunitiesModal({ onClose }: OpportunitiesModalProps) {
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [incomeGoal, setIncomeGoal] = useState(500);

  const opportunities = [
    {
      id: "consultoria",
      title: "💼 Consultoria Financeira",
      income: "R$ 400-800/mês",
      rating: "Alta compatibilidade",
      description: "Ajude pessoas a organizarem suas finanças usando o conhecimento que você já tem.",
      details: ["⏰ 3-5h/semana", "📈 Demanda alta", "🎯 Baixa barreira entrada"],
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800"
    },
    {
      id: "cursos",
      title: "🎓 Criação de Cursos Online",
      income: "R$ 600-1200/mês",
      rating: "Potencial escalável",
      description: "Ensine educação financeira criando cursos na Udemy, Hotmart ou plataforma própria.",
      details: ["⏰ 8-12h/semana", "📈 Renda passiva", "🎯 Investimento inicial baixo"],
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800"
    },
    {
      id: "afiliados",
      title: "🤝 Marketing de Afiliados",
      income: "R$ 200-600/mês",
      rating: "Rápido para começar",
      description: "Promova produtos financeiros que você já usa e recomendaria para amigos.",
      details: ["⏰ 2-4h/semana", "📈 Comissões recorrentes", "🎯 Zero investimento"],
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-800"
    }
  ];

  const actionPlans = {
    consultoria: {
      title: "Plano de Ação - Consultoria Financeira",
      phases: [
        {
          title: "Primeiros Passos (Semana 1-2):",
          tasks: [
            "Criar perfil no LinkedIn como consultor financeiro",
            "Desenvolver 3 casos de sucesso (pode usar exemplos do app)",
            "Definir pacotes: básico (R$ 100), intermediário (R$ 200), avançado (R$ 350)"
          ]
        },
        {
          title: "Execução (Semana 3-4):",
          tasks: [
            "Oferecer 3 consultorias gratuitas para conseguir depoimentos",
            "Criar conteúdo no Instagram/TikTok sobre dicas financeiras",
            "Começar a cobrar pelos serviços"
          ]
        }
      ]
    },
    cursos: {
      title: "Plano de Ação - Cursos Online",
      phases: [
        {
          title: "Preparação (Semana 1-3):",
          tasks: [
            "Definir nicho: iniciantes, investimentos, ou negócios",
            "Criar outline de 10-15 aulas de 10-15min cada",
            "Gravar aulas piloto e teste com amigos"
          ]
        },
        {
          title: "Lançamento (Semana 4-6):",
          tasks: [
            "Upload na Udemy ou Hotmart (R$ 47-97)",
            "Criar material bônus (planilhas, checklists)",
            "Promover em redes sociais e grupos"
          ]
        }
      ]
    },
    afiliados: {
      title: "Plano de Ação - Marketing de Afiliados",
      phases: [
        {
          title: "Setup Inicial (Semana 1):",
          tasks: [
            "Escolher 3-5 produtos financeiros que você usa",
            "Aplicar para programas de afiliados (Nubank, C6, etc)",
            "Criar conteúdo autêntico sobre experiências"
          ]
        },
        {
          title: "Crescimento (Semana 2-4):",
          tasks: [
            "Posts diários com dicas e links nos stories",
            "Participar de grupos sobre finanças",
            "Acompanhar métricas e otimizar"
          ]
        }
      ]
    }
  };

  const handleOpportunitySelect = (opportunityId: string) => {
    FeedbackUtils.feedbackAction('interaction');
    setSelectedOpportunity(opportunityId);
  };

  const handleCreatePlan = () => {
    FeedbackUtils.feedbackAction('confirm');
    if (selectedOpportunity) {
      alert(`🚀 Plano de renda criado! Você receberá um guia passo-a-passo para ${selectedOpportunity} e acompanhamento semanal por IA.`);
    } else {
      alert('📝 Análise salva! Explore as oportunidades e volte quando estiver pronto para começar.');
    }
    onClose();
  };

  const yearlyExtra = incomeGoal * 12;
  const goalAcceleration = Math.round((incomeGoal / 500) * 40);
  const investmentPotential = Math.round(incomeGoal * 0.4 * 12);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-purple-600">🚀 Oportunidades de Renda Personalizadas</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                FeedbackUtils.feedbackAction('interaction');
                onClose();
              }}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Análise de Perfil */}
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-800 mb-3">👤 Análise do Seu Perfil</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-purple-700">💼 Disciplinado</div>
                    <div className="text-purple-600">95% de consistência</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-700">📊 Analítico</div>
                    <div className="text-purple-600">Bom com números</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-700">💰 Investidor</div>
                    <div className="text-purple-600">R$ 8.750 aplicados</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-700">🎯 Focado</div>
                    <div className="text-purple-600">Metas claras</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Oportunidades */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">🏆 Top 3 Oportunidades Para Você</h4>
              
              {opportunities.map((opp) => (
                <Card 
                  key={opp.id}
                  className={`${opp.bgColor} ${opp.borderColor} cursor-pointer hover:shadow-md transition-all duration-200 active:scale-98 ${
                    selectedOpportunity === opp.id ? 'ring-2 ring-purple-400' : ''
                  }`}
                  onClick={() => handleOpportunitySelect(opp.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className={`font-semibold ${opp.textColor}`}>{opp.title}</h5>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${opp.textColor.replace('800', '700')}`}>{opp.income}</div>
                        <div className={`text-xs ${opp.textColor.replace('800', '600')} flex items-center gap-1`}>
                          <Star className="w-3 h-3" />
                          {opp.rating}
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm ${opp.textColor.replace('800', '700')} mb-3`}>{opp.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex space-x-4">
                        {opp.details.map((detail, idx) => (
                          <span key={idx}>{detail}</span>
                        ))}
                      </div>
                      <input 
                        type="radio" 
                        name="opportunity" 
                        value={opp.id}
                        checked={selectedOpportunity === opp.id}
                        onChange={() => {}}
                        className="ml-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Plano de Ação */}
            {selectedOpportunity && actionPlans[selectedOpportunity] && (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Plano de Ação Personalizado</h4>
                  <div className="space-y-4">
                    {actionPlans[selectedOpportunity].phases.map((phase, idx) => (
                      <div key={idx}>
                        <h5 className="font-semibold text-sm mb-2">{phase.title}</h5>
                        <ul className="space-y-1 text-sm text-gray-700 ml-4">
                          {phase.tasks.map((task, taskIdx) => (
                            <li key={taskIdx}>• {task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Simulador de Impacto */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">📊 Simulador de Impacto Financeiro</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Renda extra mensal desejada:</label>
                    <input 
                      type="range" 
                      min="200" 
                      max="1500" 
                      value={incomeGoal}
                      onChange={(e) => setIncomeGoal(Number(e.target.value))}
                      className="w-full" 
                    />
                    <div className="flex justify-between text-xs text-yellow-600">
                      <span>R$ 200</span>
                      <span className="font-semibold">R$ {incomeGoal}</span>
                      <span>R$ 1.500</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="bg-white p-2 rounded">
                      <div className="font-semibold text-green-600">R$ {yearlyExtra.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Extra/ano</div>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <div className="font-semibold text-blue-600">{goalAcceleration}%</div>
                      <div className="text-xs text-gray-600">Aceleração metas</div>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <div className="font-semibold text-purple-600">R$ {investmentPotential.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Para investir</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleCreatePlan}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold"
            >
              🎯 Criar Plano de Renda
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                FeedbackUtils.feedbackAction('interaction');
                onClose();
              }}
              className="flex-1"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}