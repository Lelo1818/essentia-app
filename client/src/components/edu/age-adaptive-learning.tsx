import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Baby, 
  User, 
  Crown, 
  BookOpen, 
  Brain, 
  Target, 
  Star as Sparkles,
  Gamepad2 as GamepadIcon,
  Heart,
  Clock,
  Trophy,
  Star,
  Zap,
  Users,
  Eye,
  Lightbulb
} from "lucide-react";

export default function AgeAdaptiveLearning() {
  const [selectedAge, setSelectedAge] = useState("adult");
  const [learningMode, setLearningMode] = useState("interactive");

  const ageProfiles = {
    child: {
      icon: Baby,
      label: "Criança (6-12 anos)",
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
      features: [
        "Gamificação intensa",
        "Recompensas visuais",
        "Sessões curtas (15 min)",
        "Histórias e personagens",
        "Feedback positivo constante"
      ],
      courses: [
        {
          id: 1,
          title: "Aventura dos Números",
          description: "Aprenda matemática com personagens divertidos",
          difficulty: "Iniciante",
          duration: "15 min",
          xp: 50,
          icon: "🔢",
          color: "from-blue-400 to-blue-600"
        },
        {
          id: 2,
          title: "Mundo das Letras",
          description: "Descubra o alfabeto em uma jornada mágica",
          difficulty: "Iniciante",
          duration: "20 min",
          xp: 75,
          icon: "📚",
          color: "from-green-400 to-green-600"
        },
        {
          id: 3,
          title: "Ciências Divertidas",
          description: "Experimentos simples e descobertas incríveis",
          difficulty: "Iniciante",
          duration: "25 min",
          xp: 100,
          icon: "🔬",
          color: "from-purple-400 to-purple-600"
        }
      ]
    },
    teen: {
      icon: User,
      label: "Adolescente (13-17 anos)",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      features: [
        "Projetos práticos",
        "Competições e rankings",
        "Conteúdo relevante para o futuro",
        "Colaboração social",
        "Metas de longo prazo"
      ],
      courses: [
        {
          id: 4,
          title: "Programação para Iniciantes",
          description: "Crie seus primeiros jogos e aplicativos",
          difficulty: "Intermediário",
          duration: "45 min",
          xp: 200,
          icon: "💻",
          color: "from-indigo-400 to-indigo-600"
        },
        {
          id: 5,
          title: "Empreendedorismo Jovem",
          description: "Desenvolva ideias de negócio inovadoras",
          difficulty: "Intermediário",
          duration: "35 min",
          xp: 150,
          icon: "🚀",
          color: "from-orange-400 to-orange-600"
        },
        {
          id: 6,
          title: "Idiomas Modernos",
          description: "Aprenda línguas com tecnologia avançada",
          difficulty: "Intermediário",
          duration: "40 min",
          xp: 175,
          icon: "🌍",
          color: "from-emerald-400 to-emerald-600"
        }
      ]
    },
    adult: {
      icon: Crown,
      label: "Adulto (18+ anos)",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      features: [
        "Aprendizado autodirigido",
        "Aplicação profissional",
        "Flexibilidade de horários",
        "Conteúdo aprofundado",
        "Certificações reconhecidas"
      ],
      courses: [
        {
          id: 7,
          title: "Gestão Financeira Pessoal",
          description: "Domine investimentos e planejamento financeiro",
          difficulty: "Avançado",
          duration: "60 min",
          xp: 300,
          icon: "💰",
          color: "from-green-500 to-emerald-600"
        },
        {
          id: 8,
          title: "Liderança e Comunicação",
          description: "Desenvolva habilidades de liderança eficaz",
          difficulty: "Avançado",
          duration: "75 min",
          xp: 350,
          icon: "👥",
          color: "from-blue-500 to-cyan-600"
        },
        {
          id: 9,
          title: "Inteligência Artificial",
          description: "Entenda e aplique IA no seu trabalho",
          difficulty: "Avançado",
          duration: "90 min",
          xp: 400,
          icon: "🤖",
          color: "from-violet-500 to-purple-600"
        }
      ]
    }
  };

  const currentProfile = ageProfiles[selectedAge];
  const IconComponent = currentProfile.icon;

  const learningModes = {
    interactive: {
      name: "Interativo",
      description: "Exercícios práticos e simulações",
      icon: GamepadIcon,
      color: "text-blue-600"
    },
    visual: {
      name: "Visual",
      description: "Infográficos, vídeos e diagramas",
      icon: Eye,
      color: "text-purple-600"
    },
    practical: {
      name: "Prático",
      description: "Projetos reais e aplicação imediata",
      icon: Target,
      color: "text-green-600"
    }
  };

  const suggestions = {
    child: [
      "Use recompensas visuais frequentes",
      "Mantenha sessões curtas e dinâmicas",
      "Inclua elementos de storytelling",
      "Gamifique cada conquista"
    ],
    teen: [
      "Conecte o aprendizado com objetivos futuros",
      "Inclua elementos de competição saudável",
      "Permita colaboração com outros estudantes",
      "Ofereça projetos práticos relevantes"
    ],
    adult: [
      "Foque na aplicação profissional imediata",
      "Ofereça flexibilidade de horários",
      "Inclua estudos de caso reais",
      "Providencie certificações reconhecidas"
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎯 Aprendizado Adaptativo por Idade
          </h2>
          <p className="text-muted-foreground">
            Experiência personalizada baseada na faixa etária e estilo de aprendizado
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedAge} onValueChange={setSelectedAge}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ageProfiles).map(([key, profile]) => (
                <SelectItem key={key} value={key}>
                  {profile.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={learningMode} onValueChange={setLearningMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(learningModes).map(([key, mode]) => (
                <SelectItem key={key} value={key}>
                  {mode.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Age Profile Overview */}
      <Card className={`${currentProfile.color} text-white`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="w-8 h-8" />
              <div>
                <CardTitle className="text-white">{currentProfile.label}</CardTitle>
                <p className="text-white/80">Perfil de aprendizado otimizado</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Ativo
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
            {currentProfile.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white/80" />
                <span className="text-sm text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Courses */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Cursos Recomendados para {currentProfile.label}
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentProfile.courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader className={`bg-gradient-to-r ${course.color} text-white rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{course.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mt-1">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Duração: {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-600" />
                      {course.xp} XP
                    </span>
                  </div>
                  
                  <Progress value={Math.random() * 100} className="h-2" />
                  
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    Começar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Suggestions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Sugestões Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {suggestions[selectedAge].map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Features */}
      <Tabs value={learningMode} onValueChange={setLearningMode}>
        <TabsList className="grid w-full grid-cols-3">
          {Object.entries(learningModes).map(([key, mode]) => {
            const ModeIcon = mode.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <ModeIcon className="w-4 h-4" />
                {mode.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(learningModes).map(([key, mode]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <mode.icon className={`w-5 h-5 ${mode.color}`} />
                  Modo {mode.name}
                </CardTitle>
                <p className="text-muted-foreground">{mode.description}</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${currentProfile.color.replace('bg-gradient-to-r', '')} flex items-center justify-center mb-4`}>
                    <mode.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Experiência {mode.name} Ativada
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Conteúdo otimizado para o estilo {mode.name.toLowerCase()} de aprendizado
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Personalizar Ainda Mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}