import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Heart, 
  Star, 
  Lightbulb,
  Target,
  Calendar,
  TrendingUp,
  Sparkles,
  Save,
  Send
} from "lucide-react";

export default function DailyReflection() {
  const [currentReflection, setCurrentReflection] = useState("");
  const [reflectionStep, setReflectionStep] = useState(0);

  const reflectionPrompts = [
    {
      title: "Gratidão e Presença",
      icon: Heart,
      color: "text-pink-600 bg-pink-50",
      questions: [
        "Por quais 3 coisas você é grato hoje?",
        "Qual momento hoje você se sentiu mais presente?",
        "Como você nutriu seu bem-estar hoje?"
      ]
    },
    {
      title: "Crescimento e Aprendizado",
      icon: Lightbulb,
      color: "text-yellow-600 bg-yellow-50", 
      questions: [
        "O que você aprendeu sobre si mesmo hoje?",
        "Qual desafio te fez crescer?",
        "Como você saiu da zona de conforto?"
      ]
    },
    {
      title: "Valores e Autenticidade",
      icon: Star,
      color: "text-purple-600 bg-purple-50",
      questions: [
        "Suas ações hoje refletiram seus valores?",
        "Em que momento você foi mais autêntico?",
        "O que você faria diferente para honrar seus valores?"
      ]
    },
    {
      title: "Propósito e Missão",
      icon: Target,
      color: "text-blue-600 bg-blue-50",
      questions: [
        "Como você contribuiu para sua missão hoje?",
        "Que progresso fez em direção aos seus sonhos?",
        "Como impactou positivamente alguém?"
      ]
    }
  ];

  const recentReflections = [
    {
      date: "Hoje",
      title: "Descobrindo minha coragem",
      excerpt: "Hoje percebi que minha maior força não é nunca ter medo, mas sim agir mesmo quando tenho medo. A conversa com meu pai sobre meus sonhos...",
      mood: "inspired",
      insights: 3,
      values: ["Autenticidade", "Coragem"]
    },
    {
      date: "Ontem", 
      title: "O poder da vulnerabilidade",
      excerpt: "Compartilhei uma insegurança com um amigo e isso criou uma conexão mais profunda. Vulnerabilidade é força, não fraqueza...",
      mood: "grateful",
      insights: 2,
      values: ["Conexão", "Autenticidade"]
    },
    {
      date: "2 dias atrás",
      title: "Alinhando ações com valores",
      excerpt: "Recusei um projeto que pagava bem mas não estava alinhado com meus valores. Senti uma paz interior que confirmou a decisão certa...",
      mood: "peaceful",
      insights: 4,
      values: ["Integridade", "Propósito"]
    }
  ];

  const stats = {
    streak: 23,
    totalReflections: 156,
    insightsGenerated: 342,
    averageMood: "inspired",
    topValues: ["Autenticidade", "Crescimento", "Impacto"]
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      inspired: "text-purple-600 bg-purple-100",
      grateful: "text-green-600 bg-green-100", 
      peaceful: "text-blue-600 bg-blue-100",
      excited: "text-orange-600 bg-orange-100",
      reflective: "text-gray-600 bg-gray-100"
    };
    return colors[mood] || colors.reflective;
  };

  const getMoodEmoji = (mood: string) => {
    const emojis = {
      inspired: "✨",
      grateful: "🙏",
      peaceful: "☮️", 
      excited: "🚀",
      reflective: "🤔"
    };
    return emojis[mood] || "💭";
  };

  return (
    <div className="space-y-6">
      {/* Reflection Stats */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
              Jornada de Reflexão
            </CardTitle>
            <Badge className="bg-purple-100 text-purple-700">
              🔥 {stats.streak} dias consecutivos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalReflections}</div>
              <div className="text-sm text-gray-600">Reflexões</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.insightsGenerated}</div>
              <div className="text-sm text-gray-600">Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.streak}</div>
              <div className="text-sm text-gray-600">Dias Seguidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{getMoodEmoji(stats.averageMood)}</div>
              <div className="text-sm text-gray-600">Humor Médio</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Reflection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-600" />
              Reflexão de Hoje
            </CardTitle>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Reflection Prompts */}
              <div className="grid grid-cols-2 gap-3">
                {reflectionPrompts.map((prompt, index) => {
                  const IconComponent = prompt.icon;
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        reflectionStep === index 
                          ? prompt.color + " border-current" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setReflectionStep(index)}
                    >
                      <div className="text-center">
                        <IconComponent className="w-5 h-5 mx-auto mb-2" />
                        <div className="text-sm font-medium">{prompt.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Current Prompt */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">
                  {reflectionPrompts[reflectionStep].title}
                </h4>
                <div className="space-y-2">
                  {reflectionPrompts[reflectionStep].questions.map((question, i) => (
                    <div key={i} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                      💭 {question}
                    </div>
                  ))}
                </div>

                <Textarea
                  value={currentReflection}
                  onChange={(e) => setCurrentReflection(e.target.value)}
                  placeholder="Escreva sua reflexão aqui... Seja honesto e compassivo consigo mesmo."
                  className="min-h-[120px]"
                />

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <Save className="w-4 h-4 mr-1" />
                    Salvar Rascunho
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Send className="w-4 h-4 mr-1" />
                    Concluir Reflexão
                  </Button>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center space-x-2">
                {reflectionPrompts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === reflectionStep ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reflections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Reflexões Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReflections.map((reflection, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{reflection.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{reflection.date}</span>
                        <Badge className={`text-xs ${getMoodColor(reflection.mood)}`}>
                          {getMoodEmoji(reflection.mood)} {reflection.mood}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {reflection.insights} insights
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{reflection.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {reflection.values.map((value, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Reflexões
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Insights Gerados */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-800">
            <Lightbulb className="w-5 h-5 mr-2" />
            Insights da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white/50 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-1">Padrão Identificado</h5>
              <p className="text-sm text-yellow-700">
                Você tem mais energia criativa pela manhã. Suas melhores reflexões acontecem entre 6h-9h.
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-1">Crescimento Observado</h5>
              <p className="text-sm text-yellow-700">
                Sua capacidade de vulnerabilidade aumentou 40% nas últimas 3 semanas. Continue se abrindo.
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-1">Sugestão da IA</h5>
              <p className="text-sm text-yellow-700">
                Considere explorar mais o valor "Liberdade" - aparece pouco em suas reflexões mas é central para você.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}