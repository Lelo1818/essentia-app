import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Lightbulb, 
  Target, 
  Clock, 
  Brain, 
  Star,
  Zap,
  TrendingUp,
  Users,
  BookOpen,
  Trophy,
  Heart,
  CheckCircle,
  ArrowRight,
  Eye
} from "lucide-react";

export default function SmartSuggestions() {
  const [activeFilter, setActiveFilter] = useState("all");

  const suggestions = [
    {
      id: 1,
      type: "skill",
      priority: "high",
      title: "Desenvolva Habilidades de Liderança",
      description: "Baseado no seu progresso em comunicação, sugerimos avançar para liderança de equipes",
      reason: "Progresso em Comunicação: 85%",
      estimatedTime: "3 semanas",
      difficulty: "Intermediário",
      xp: 500,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      tags: ["Liderança", "Soft Skills", "Carreira"]
    },
    {
      id: 2,
      type: "knowledge",
      priority: "medium",
      title: "Aprenda Python para Análise de Dados",
      description: "Com base no seu interesse em tecnologia, Python seria perfeito para seu próximo passo",
      reason: "Interesse demonstrado em Tech",
      estimatedTime: "6 semanas",
      difficulty: "Intermediário",
      xp: 800,
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
      tags: ["Python", "Data Science", "Programação"]
    },
    {
      id: 3,
      type: "habit",
      priority: "high",
      title: "Estabeleça Rotina de Estudos Matinal",
      description: "Estudos mostram 40% mais retenção ao estudar pela manhã. Que tal tentar?",
      reason: "Otimização de aprendizado",
      estimatedTime: "2 semanas",
      difficulty: "Fácil",
      xp: 200,
      icon: Clock,
      color: "from-green-500 to-emerald-500",
      tags: ["Hábitos", "Produtividade", "Rotina"]
    },
    {
      id: 4,
      type: "social",
      priority: "medium",
      title: "Participe de Grupos de Estudo",
      description: "Encontramos 12 pessoas estudando temas similares na sua região",
      reason: "Aprendizado colaborativo",
      estimatedTime: "Contínuo",
      difficulty: "Fácil",
      xp: 150,
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      tags: ["Social", "Grupos", "Networking"]
    },
    {
      id: 5,
      type: "challenge",
      priority: "high",
      title: "Desafio: Projeto Real em 30 dias",
      description: "Aplique seus conhecimentos criando um projeto real com mentoria personalizada",
      reason: "Consolidação de conhecimento",
      estimatedTime: "30 dias",
      difficulty: "Avançado",
      xp: 1000,
      icon: Target,
      color: "from-orange-500 to-red-500",
      tags: ["Projeto", "Prática", "Mentoria"]
    },
    {
      id: 6,
      type: "skill",
      priority: "low",
      title: "Melhore sua Comunicação Escrita",
      description: "Pequenos ajustes na escrita podem potencializar sua carreira profissional",
      reason: "Análise de exercícios anteriores",
      estimatedTime: "4 semanas",
      difficulty: "Fácil",
      xp: 300,
      icon: BookOpen,
      color: "from-teal-500 to-cyan-500",
      tags: ["Comunicação", "Escrita", "Profissional"]
    }
  ];

  const filters = [
    { key: "all", label: "Todas", icon: Lightbulb },
    { key: "skill", label: "Habilidades", icon: Brain },
    { key: "habit", label: "Hábitos", icon: Clock },
    { key: "social", label: "Social", icon: Users },
    { key: "challenge", label: "Desafios", icon: Target }
  ];

  const filteredSuggestions = activeFilter === "all" 
    ? suggestions 
    : suggestions.filter(s => s.type === activeFilter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            💡 Sugestões Inteligentes
          </h2>
          <p className="text-muted-foreground">
            Recomendações personalizadas baseadas no seu progresso e objetivos
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            IA Ativa
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {filteredSuggestions.length} sugestões
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const IconComponent = filter.icon;
          return (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Suggestions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSuggestions.map((suggestion) => {
          const IconComponent = suggestion.icon;
          
          return (
            <Card key={suggestion.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-l-4 border-l-transparent hover:border-l-purple-500">
              <CardHeader className={`bg-gradient-to-r ${suggestion.color} text-white rounded-t-lg`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-6 h-6" />
                    <div className="flex-1">
                      <CardTitle className="text-lg text-white leading-tight">
                        {suggestion.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          variant="secondary" 
                          className={`${getPriorityColor(suggestion.priority)} text-xs`}
                        >
                          {suggestion.priority === 'high' ? 'Alta' : 
                           suggestion.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {suggestion.description}
                </p>
                
                <div className="space-y-3">
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
                    <strong>Por quê:</strong> {suggestion.reason}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{suggestion.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{suggestion.xp} XP</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={getDifficultyColor(suggestion.difficulty)}
                    >
                      {suggestion.difficulty}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {suggestion.tags.length} tags
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {suggestion.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {suggestion.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{suggestion.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      <Zap className="w-4 h-4 mr-2" />
                      Aceitar Sugestão
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Mais Info
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Mais Tarde
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Smart Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Insights da IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Progresso Acelerado</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Você está aprendendo 23% mais rápido que a média
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Melhor Horário</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Você é mais produtivo entre 9h-11h da manhã
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Próxima Meta</span>
              </div>
              <p className="text-sm text-muted-foreground">
                89% para alcançar nível Expert em Comunicação
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}