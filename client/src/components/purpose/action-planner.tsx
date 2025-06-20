import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Users,
  BookOpen,
  Lightbulb
} from "lucide-react";

export default function ActionPlanner() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30days");
  const [newAction, setNewAction] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const timeframes = [
    { id: "7days", label: "Próximos 7 dias", icon: Clock },
    { id: "30days", label: "Próximos 30 dias", icon: Calendar },
    { id: "90days", label: "Próximos 90 dias", icon: Target },
    { id: "365days", label: "Próximo ano", icon: TrendingUp }
  ];

  const actionPlans = {
    "7days": [
      {
        id: 1,
        title: "Conversa profunda com pai",
        description: "Compartilhar meus sonhos sobre o projeto educacional e pedir apoio/conselhos",
        category: "relacionamentos",
        priority: "alta",
        status: "em_andamento",
        progress: 60,
        dueDate: "2025-06-23",
        estimatedTime: "2 horas",
        barriers: ["Medo de não ser levado a sério", "Ele pode estar muito ocupado"],
        steps: [
          { text: "Escolher momento certo (fim de semana)", done: true },
          { text: "Preparar pontos principais para conversar", done: true },
          { text: "Iniciar conversa de forma natural", done: false },
          { text: "Compartilhar visão do projeto", done: false },
          { text: "Pedir feedback e apoio", done: false }
        ],
        impact: "Fortalece relacionamento e ganha apoio familiar"
      },
      {
        id: 2,
        title: "Primeira versão do protótipo educacional",
        description: "Criar MVP básico da plataforma de educação personalizada",
        category: "carreira",
        priority: "alta",
        status: "planejado",
        progress: 15,
        dueDate: "2025-06-25",
        estimatedTime: "15 horas",
        barriers: ["Tempo limitado", "Dúvidas sobre tecnologia"],
        steps: [
          { text: "Definir funcionalidades mínimas", done: true },
          { text: "Criar wireframes básicos", done: false },
          { text: "Desenvolver interface inicial", done: false },
          { text: "Implementar lógica básica", done: false },
          { text: "Testar com 3 pessoas", done: false }
        ],
        impact: "Primeira validação real da ideia"
      },
      {
        id: 3,
        title: "Rotina de exercícios consistente",
        description: "Estabelecer rotina de 30min de exercícios 3x por semana",
        category: "saude",
        priority: "media",
        status: "em_andamento",
        progress: 40,
        dueDate: "2025-06-27",
        estimatedTime: "30 min/dia",
        barriers: ["Falta de motivação pela manhã", "Agenda corrida"],
        steps: [
          { text: "Escolher horário fixo (manhã)", done: true },
          { text: "Preparar roupas na noite anterior", done: false },
          { text: "Segunda: treino completo", done: false },
          { text: "Quarta: treino completo", done: false },
          { text: "Sexta: treino completo", done: false }
        ],
        impact: "Mais energia e foco para outras atividades"
      }
    ],
    "30days": [
      {
        id: 4,
        title: "Validar conceito educacional com 50 pessoas",
        description: "Testar hipóteses do projeto com público-alvo real",
        category: "carreira",
        priority: "alta",
        status: "planejado",
        progress: 5,
        dueDate: "2025-07-20",
        estimatedTime: "25 horas",
        barriers: ["Encontrar pessoas dispostas a testar", "Estruturar pesquisa"],
        steps: [
          { text: "Criar questionário de validação", done: false },
          { text: "Identificar 50 pessoas do público-alvo", done: false },
          { text: "Apresentar conceito individualmente", done: false },
          { text: "Coletar feedback estruturado", done: false },
          { text: "Analisar dados e insights", done: false }
        ],
        impact: "Validação ou pivot do conceito principal"
      },
      {
        id: 5,
        title: "Conectar com 5 educadores inovadores",
        description: "Networking com profissionais que pensam educação diferente",
        category: "rede",
        priority: "alta",
        status: "planejado",
        progress: 0,
        dueDate: "2025-07-15",
        estimatedTime: "10 horas",
        barriers: ["Não conheço pessoas da área", "Podem não ter tempo"],
        steps: [
          { text: "Pesquisar educadores inovadores no LinkedIn", done: false },
          { text: "Enviar mensagens personalizadas", done: false },
          { text: "Agendar conversas de 30min", done: false },
          { text: "Preparar perguntas inteligentes", done: false },
          { text: "Fazer follow-up pós-conversa", done: false }
        ],
        impact: "Insights valiosos e possíveis parcerias"
      },
      {
        id: 6,
        title: "Sistema de reflexão diária consolidado",
        description: "30 dias consecutivos de reflexão estruturada",
        category: "crescimento",
        priority: "media",
        status: "em_andamento",
        progress: 70,
        dueDate: "2025-07-20",
        estimatedTime: "15 min/dia",
        barriers: ["Alguns dias esqueço", "Às vezes falta inspiração"],
        steps: [
          { text: "Definir horário fixo (noite)", done: true },
          { text: "Semana 1: 7 dias consecutivos", done: true },
          { text: "Semana 2: 7 dias consecutivos", done: true },
          { text: "Semana 3: 7 dias consecutivos", done: false },
          { text: "Semana 4: 7 dias consecutivos", done: false }
        ],
        impact: "Autoconhecimento profundo e clareza mental"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-700 border-green-300';
      case 'em_andamento': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'planejado': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'atrasado': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluido': return CheckCircle;
      case 'em_andamento': return Play;
      case 'planejado': return Clock;
      case 'atrasado': return AlertCircle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-700';
      case 'media': return 'bg-yellow-100 text-yellow-700';
      case 'baixa': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'relacionamentos': return Users;
      case 'carreira': return Target;
      case 'saude': return Plus;
      case 'crescimento': return BookOpen;
      case 'rede': return Users;
      default: return Target;
    }
  };

  const currentActions = actionPlans[selectedTimeframe] || [];
  const completedActions = currentActions.filter(a => a.status === 'concluido').length;
  const totalActions = currentActions.length;
  const overallProgress = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Plano de Ação
            </CardTitle>
            <Button 
              size="sm" 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Nova Ação
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Transforme suas intenções em ações concretas com prazos e métricas
          </p>
        </CardHeader>
      </Card>

      {/* Timeframe Selector */}
      <div className="flex flex-wrap gap-2">
        {timeframes.map((timeframe) => {
          const IconComponent = timeframe.icon;
          return (
            <Button
              key={timeframe.id}
              variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe.id)}
              className="flex items-center space-x-1"
            >
              <IconComponent className="w-4 h-4" />
              <span>{timeframe.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral - {timeframes.find(t => t.id === selectedTimeframe)?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {completedActions} de {totalActions} ações concluídas
              </span>
              <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{completedActions}</div>
                <div className="text-sm text-gray-600">Concluídas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {currentActions.filter(a => a.status === 'em_andamento').length}
                </div>
                <div className="text-sm text-gray-600">Em Andamento</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {currentActions.filter(a => a.status === 'planejado').length}
                </div>
                <div className="text-sm text-gray-600">Planejadas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {currentActions.filter(a => a.status === 'atrasado').length}
                </div>
                <div className="text-sm text-gray-600">Atrasadas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Action Form */}
      {showAddForm && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Nova Ação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Título da ação..." />
              <Textarea placeholder="Descrição detalhada..." className="min-h-[80px]" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Categoria</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option value="carreira">Carreira</option>
                    <option value="relacionamentos">Relacionamentos</option>
                    <option value="saude">Saúde</option>
                    <option value="crescimento">Crescimento</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Prioridade</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Prazo</label>
                  <Input type="date" className="mt-1" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Tempo Estimado</label>
                  <Input placeholder="ex: 5 horas" className="mt-1" />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Criar Ação
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions List */}
      <div className="space-y-4">
        {currentActions.map((action) => {
          const StatusIcon = getStatusIcon(action.status);
          const CategoryIcon = getCategoryIcon(action.category);
          
          return (
            <Card key={action.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <CategoryIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(action.priority)}>
                        {action.priority}
                      </Badge>
                      <Badge className={`border-2 ${getStatusColor(action.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {action.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Progresso</span>
                      <span className="text-sm text-gray-600">{action.progress}%</span>
                    </div>
                    <Progress value={action.progress} className="h-2" />
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    <h6 className="font-medium text-gray-700">Etapas:</h6>
                    <div className="space-y-2">
                      {action.steps.map((step, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            step.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {step.done && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${step.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Prazo:</span> {new Date(action.dueDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <span className="font-medium">Tempo:</span> {action.estimatedTime}
                    </div>
                    <div>
                      <span className="font-medium">Categoria:</span> {action.category}
                    </div>
                  </div>

                  {/* Barriers */}
                  {action.barriers.length > 0 && (
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h6 className="font-medium text-yellow-800 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Possíveis Obstáculos:
                      </h6>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        {action.barriers.map((barrier, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {barrier}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Impact */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h6 className="font-medium text-blue-800 mb-1 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-1" />
                      Impacto Esperado:
                    </h6>
                    <p className="text-sm text-blue-700">{action.impact}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Iniciar
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reagendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Focus */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Foco desta Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h5 className="font-medium text-green-700">Ação Prioritária: Conversa com pai</h5>
            <p className="text-sm text-green-600">
              Esta conversa pode desbloquear muito apoio emocional e até recursos para seu projeto. 
              É o catalisador para outras ações importantes.
            </p>
            
            <div className="p-3 bg-white/50 rounded-lg">
              <h6 className="font-medium text-green-800 mb-2">Dica da Semana:</h6>
              <p className="text-sm text-green-700">
                Prepare 3 perguntas específicas para seu pai: "O que você faria no meu lugar?", 
                "Que riscos você vê que eu não estou vendo?" e "Como posso contar com seu apoio?"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}