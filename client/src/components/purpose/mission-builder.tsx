import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Heart, 
  Globe, 
  Users,
  Lightbulb,
  Star,
  Rocket,
  Edit,
  Save,
  Check,
  ArrowRight
} from "lucide-react";

export default function MissionBuilder() {
  const [currentMission, setCurrentMission] = useState("");
  const [missionStep, setMissionStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const missionElements = [
    {
      title: "Seus Valores Centrais",
      icon: Heart,
      color: "text-red-500 bg-red-50",
      content: ["Autenticidade", "Impacto Social", "Crescimento Contínuo", "Liberdade", "Conexão Genuína"],
      description: "Os princípios que guiam todas as suas decisões"
    },
    {
      title: "Suas Paixões Principais", 
      icon: Star,
      color: "text-yellow-500 bg-yellow-50",
      content: ["Tecnologia & Inovação", "Educação Transformadora", "Impacto Social"],
      description: "O que te energiza e motiva profundamente"
    },
    {
      title: "Seus Talentos Únicos",
      icon: Lightbulb,
      color: "text-blue-500 bg-blue-50", 
      content: ["Visão sistêmica", "Capacidade de ensinar", "Solução criativa de problemas", "Liderança inspiradora"],
      description: "Suas habilidades naturais e desenvolvidas"
    },
    {
      title: "Problemas que te Tocam",
      icon: Globe,
      color: "text-green-500 bg-green-50",
      content: ["Desigualdade educacional", "Falta de oportunidades para jovens", "Desperdício de potencial humano", "Educação desatualizada"],
      description: "Questões que despertam sua indignação e compaixão"
    }
  ];

  const missionTemplates = [
    "Democratizar [ÁREA] através de [MEIO] para [PÚBLICO] alcançar [RESULTADO]",
    "Usar meus talentos em [TALENTO] para resolver [PROBLEMA] e criar [IMPACTO]", 
    "Inspirar [PÚBLICO] a [AÇÃO] através de [MÉTODO] baseado em [VALORES]",
    "Transformar [SISTEMA] criando [SOLUÇÃO] que permita [BENEFÍCIO] para [COMUNIDADE]"
  ];

  const currentMissionDraft = {
    version: "v3.2",
    text: "Democratizar educação de qualidade através de tecnologia inovadora para jovens brasileiros em situação de vulnerabilidade social alcançarem seu máximo potencial e transformarem suas comunidades.",
    clarity: 88,
    authenticity: 92,
    impact: 85,
    specificity: 78,
    actionability: 82
  };

  const missionEvolution = [
    {
      version: "v1.0 - Inicial",
      date: "45 dias atrás",
      text: "Quero ajudar pessoas com tecnologia",
      score: 35,
      feedback: "Muito vago e genérico"
    },
    {
      version: "v2.0 - Refinada", 
      date: "20 dias atrás",
      text: "Criar tecnologias educacionais para jovens carentes do Brasil",
      score: 65,
      feedback: "Melhor foco, mas falta profundidade"
    },
    {
      version: "v3.0 - Atual",
      date: "5 dias atrás", 
      text: "Democratizar educação de qualidade através de tecnologia inovadora para jovens brasileiros",
      score: 80,
      feedback: "Boa direção, mas pode ser mais específica sobre o impacto"
    },
    {
      version: "v3.2 - Refinada",
      date: "Hoje",
      text: currentMissionDraft.text,
      score: 85,
      feedback: "Excelente clareza e especificidade!"
    }
  ];

  const missionBreakdown = {
    who: "Jovens brasileiros em situação de vulnerabilidade social",
    what: "Democratizar educação de qualidade",
    how: "Através de tecnologia inovadora e acessível",
    why: "Para que alcancem seu máximo potencial",
    impact: "E transformem suas comunidades",
    timeline: "Próximos 10 anos",
    scale: "1 milhão de jovens impactados"
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 55) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excelente";
    if (score >= 70) return "Muito Bom";
    if (score >= 55) return "Bom";
    return "Precisa Melhorar";
  };

  return (
    <div className="space-y-6">
      {/* Current Mission */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Sua Declaração de Missão
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-700">
                {currentMissionDraft.version}
              </Badge>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Mission Text */}
            <div className="space-y-3">
              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={currentMission || currentMissionDraft.text}
                    onChange={(e) => setCurrentMission(e.target.value)}
                    className="min-h-[100px] text-lg"
                    placeholder="Escreva sua declaração de missão..."
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => setIsEditing(false)}>
                      <Save className="w-4 h-4 mr-1" />
                      Salvar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <blockquote className="text-lg font-medium text-gray-800 italic leading-relaxed">
                    "{currentMissionDraft.text}"
                  </blockquote>
                </div>
              )}
            </div>

            {/* Mission Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "Clareza", value: currentMissionDraft.clarity },
                { name: "Autenticidade", value: currentMissionDraft.authenticity },
                { name: "Impacto", value: currentMissionDraft.impact },
                { name: "Especificidade", value: currentMissionDraft.specificity },
                { name: "Acionabilidade", value: currentMissionDraft.actionability }
              ].map((metric, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className={`text-2xl font-bold ${getScoreColor(metric.value)}`}>
                    {metric.value}%
                  </div>
                  <div className="text-sm text-gray-600">{metric.name}</div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>

            {/* Mission Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Anatomia da Missão</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                      Q
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-700">Quem você serve:</div>
                      <div className="text-sm text-gray-600">{missionBreakdown.who}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-600">
                      O
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-700">O que você faz:</div>
                      <div className="text-sm text-gray-600">{missionBreakdown.what}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-600">
                      C
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-700">Como você faz:</div>
                      <div className="text-sm text-gray-600">{missionBreakdown.how}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-medium text-orange-600">
                      P
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-700">Por que importa:</div>
                      <div className="text-sm text-gray-600">{missionBreakdown.why}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Impacto Esperado</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800">Meta de Alcance</div>
                    <div className="text-green-700">{missionBreakdown.scale}</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-800">Prazo</div>
                    <div className="text-blue-700">{missionBreakdown.timeline}</div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="font-medium text-purple-800">Resultado Final</div>
                    <div className="text-purple-700">{missionBreakdown.impact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Elementos da Sua Missão
          </CardTitle>
          <p className="text-sm text-gray-600">
            Sua missão é construída a partir desses elementos fundamentais sobre você
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionElements.map((element, index) => {
              const IconComponent = element.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border-2 ${element.color}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-white/70 rounded-full">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{element.title}</h4>
                      <p className="text-sm text-gray-600">{element.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {element.content.map((item, i) => (
                      <Badge key={i} variant="secondary" className="mr-2 mb-1">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mission Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Rocket className="w-5 h-5 mr-2 text-green-600" />
            Evolução da Sua Missão
          </CardTitle>
          <p className="text-sm text-gray-600">
            Veja como sua compreensão do propósito tem evoluído
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {missionEvolution.map((version, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === missionEvolution.length - 1 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index === missionEvolution.length - 1 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-800">{version.version}</h5>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{version.date}</span>
                      <Badge className={`${getScoreColor(version.score)} text-xs`}>
                        {version.score}%
                      </Badge>
                    </div>
                  </div>
                  
                  <blockquote className="text-sm text-gray-700 italic mb-2 p-3 bg-gray-50 rounded border-l-4 border-gray-300">
                    "{version.text}"
                  </blockquote>
                  
                  <p className="text-xs text-gray-600">{version.feedback}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="font-medium text-green-800">Crescimento Total</h6>
                <p className="text-sm text-green-700">Sua clareza de propósito cresceu 143% em 45 dias!</p>
              </div>
              <div className="text-3xl font-bold text-green-600">+143%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Templates */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">Templates para Inspiração</CardTitle>
          <p className="text-sm text-yellow-700">
            Use estes modelos para experimentar diferentes formulações
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {missionTemplates.map((template, index) => (
              <div key={index} className="p-3 bg-white/50 rounded border border-yellow-200">
                <div className="font-mono text-sm text-gray-700">{template}</div>
              </div>
            ))}
          </div>
          
          <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">
            <ArrowRight className="w-4 h-4 mr-1" />
            Experimentar Novos Formatos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}