import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Baby, 
  Users, 
  GraduationCap,
  Briefcase,
  Heart,
  Volume2,
  Gamepad2,
  BookOpen,
  Clock,
  Star,
  Zap,
  Settings
} from "lucide-react";

export default function AgeBasedLearning() {
  const [selectedAge, setSelectedAge] = useState("adulto");

  const ageGroups = {
    infantil: {
      range: "3-6 anos",
      icon: Baby,
      color: "bg-pink-100 text-pink-600 border-pink-300",
      characteristics: [
        "Aprendizado através de brincadeiras",
        "Histórias e personagens",
        "Repetição e música",
        "Estímulos visuais coloridos"
      ],
      methods: [
        "🎵 Músicas educativas",
        "🎨 Desenhos animados",
        "🧩 Jogos simples",
        "📚 Histórias contadas"
      ],
      content: [
        {
          title: "ABC da Fazenda",
          type: "Música Interativa",
          duration: "15 min",
          description: "Aprenda as letras com animais da fazenda cantando",
          features: ["Música", "Animação", "Interação"]
        },
        {
          title: "Números Mágicos",
          type: "Jogo Educativo",
          duration: "20 min", 
          description: "Conte até 10 com personagens divertidos",
          features: ["Gamificação", "Recompensas", "Áudio"]
        },
        {
          title: "Cores do Arco-íris",
          type: "História Animada",
          duration: "12 min",
          description: "Aventura colorida para aprender cores primárias",
          features: ["Narrativa", "Visual", "Música"]
        }
      ]
    },
    crianca: {
      range: "7-12 anos",
      icon: Users,
      color: "bg-blue-100 text-blue-600 border-blue-300",
      characteristics: [
        "Curiosidade natural",
        "Gosta de desafios graduais",
        "Aprende melhor com exemplos",
        "Motivação por conquistas"
      ],
      methods: [
        "🎮 Jogos educativos",
        "🏆 Sistema de pontos",
        "👥 Atividades em grupo",
        "🔬 Experimentos simples"
      ],
      content: [
        {
          title: "Tabuada do Tesouro",
          type: "Jogo RPG",
          duration: "30 min",
          description: "Aventura pirata para dominar multiplicação",
          features: ["RPG", "Progressão", "Multiplayer"]
        },
        {
          title: "Ciências da Natureza",
          type: "Experimentos",
          duration: "45 min",
          description: "Experiências seguras para entender o mundo",
          features: ["Prática", "Vídeos", "Quizzes"]
        },
        {
          title: "Geografia Mundial",
          type: "Exploração Virtual",
          duration: "25 min",
          description: "Viaje pelo mundo aprendendo países e culturas",
          features: ["3D", "Interativo", "Cultural"]
        }
      ]
    },
    adolescente: {
      range: "13-17 anos",
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-600 border-purple-300",
      characteristics: [
        "Busca independência",
        "Aprende com peer learning",
        "Motivado por relevância",
        "Gosta de tecnologia"
      ],
      methods: [
        "📱 Apps móveis",
        "👥 Grupos de estudo",
        "🎯 Projetos práticos",
        "🌐 Conteúdo online"
      ],
      content: [
        {
          title: "ENEM Master",
          type: "Preparatório Completo",
          duration: "2h/dia",
          description: "Trilha personalizada para arrasar no ENEM",
          features: ["IA Adaptativa", "Simulados", "Ranking"]
        },
        {
          title: "Programação Teen",
          type: "Curso Prático",
          duration: "1h",
          description: "Crie seus próprios apps e jogos",
          features: ["Projetos", "Mentoria", "Portfolio"]
        },
        {
          title: "Inglês Fluente",
          type: "Conversação IA",
          duration: "30 min",
          description: "Pratique inglês com IA conversacional",
          features: ["Speaking", "Real-time", "Correção"]
        }
      ]
    },
    adulto: {
      range: "18-59 anos",
      icon: Briefcase,
      color: "bg-green-100 text-green-600 border-green-300",
      characteristics: [
        "Aprendizado orientado a objetivos",
        "Tempo limitado",
        "Experiência prévia",
        "Aplicação prática"
      ],
      methods: [
        "📊 Microlearning",
        "🎯 Just-in-time",
        "💼 Case studies",
        "🤝 Networking"
      ],
      content: [
        {
          title: "Excel Avançado",
          type: "Curso Profissional",
          duration: "45 min",
          description: "Domine planilhas para destacar no trabalho",
          features: ["Certificado", "Casos Reais", "Templates"]
        },
        {
          title: "Liderança 4.0",
          type: "MBA Módulo",
          duration: "1.5h",
          description: "Habilidades de liderança para era digital",
          features: ["Teoria+Prática", "Feedback 360°", "Mentoria"]
        },
        {
          title: "Investimentos Inteligentes",
          type: "Workshop Prático",
          duration: "1h",
          description: "Estratégias reais para multiplicar patrimônio",
          features: ["Simulador", "Dados Reais", "ROI Calculator"]
        }
      ]
    },
    idoso: {
      range: "60+ anos",
      icon: Heart,
      color: "bg-orange-100 text-orange-600 border-orange-300",
      characteristics: [
        "Ritmo próprio",
        "Valoriza experiência",
        "Prefere explicações detalhadas",
        "Motivado por bem-estar"
      ],
      methods: [
        "🗣️ Áudio predominante",
        "🔄 Repetição amigável",
        "👨‍🏫 Tutor pessoal",
        "📞 Suporte humano"
      ],
      content: [
        {
          title: "Tecnologia Sem Mistério",
          type: "Tutorial Guiado",
          duration: "Sem pressa",
          description: "Domine celular e apps no seu ritmo",
          features: ["Passo-a-passo", "Suporte 24h", "Sem julgamento"]
        },
        {
          title: "Saúde e Bem-estar",
          type: "Curso Completo",
          duration: "30 min",
          description: "Exercícios e nutrição para longevidade",
          features: ["Médico Virtual", "Lembretes", "Família Conectada"]
        },
        {
          title: "História e Cultura",
          type: "Documentários",
          duration: "1h",
          description: "Reviva momentos históricos com profundidade",
          features: ["Narração Clara", "Legendas", "Pausa Livre"]
        }
      ]
    }
  };

  const currentAge = ageGroups[selectedAge];
  const IconComponent = currentAge.icon;

  return (
    <div className="space-y-6">
      {/* Age Selection */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            Aprendizado por Faixa Etária
          </CardTitle>
          <p className="text-sm text-gray-600">
            Metodologias e conteúdos adaptados para cada fase da vida
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(ageGroups).map(([key, group]) => {
              const GroupIcon = group.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAge(key)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    selectedAge === key ? group.color : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <GroupIcon className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium text-sm capitalize">{key}</div>
                  <div className="text-xs text-gray-500">{group.range}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Age Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Characteristics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <IconComponent className="w-5 h-5 mr-2" />
              {selectedAge.charAt(0).toUpperCase() + selectedAge.slice(1)} ({currentAge.range})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Características</h5>
                <ul className="space-y-1 text-sm">
                  {currentAge.characteristics.map((char, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-gray-700 mb-2">Métodos Ideais</h5>
                <div className="space-y-2">
                  {currentAge.methods.map((method, i) => (
                    <div key={i} className="text-sm bg-gray-50 p-2 rounded">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Examples */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conteúdos Personalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentAge.content.map((content, i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{content.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Badge variant="secondary">{content.type}</Badge>
                        <span>⏱️ {content.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {content.features.map((feature, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm">
                      {selectedAge === 'infantil' || selectedAge === 'crianca' ? '🎮 Brincar' : 
                       selectedAge === 'adolescente' ? '📚 Estudar' :
                       selectedAge === 'adulto' ? '💼 Começar' : '👂 Ouvir'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age-Specific Features */}
      <Card className={`border-2 ${currentAge.color.replace('text-', 'border-').replace('100', '200')}`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Recursos Especiais para {selectedAge.charAt(0).toUpperCase() + selectedAge.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedAge === 'infantil' && (
              <>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <Gamepad2 className="w-8 h-8 mx-auto text-pink-600 mb-2" />
                  <h4 className="font-medium text-pink-800">Jogos Lúdicos</h4>
                  <p className="text-sm text-pink-600">Aprender brincando sempre</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <Volume2 className="w-8 h-8 mx-auto text-pink-600 mb-2" />
                  <h4 className="font-medium text-pink-800">Só Áudio</h4>
                  <p className="text-sm text-pink-600">Não precisa saber ler</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <Star className="w-8 h-8 mx-auto text-pink-600 mb-2" />
                  <h4 className="font-medium text-pink-800">Recompensas</h4>
                  <p className="text-sm text-pink-600">Estrelinhas e aplausos</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <Heart className="w-8 h-8 mx-auto text-pink-600 mb-2" />
                  <h4 className="font-medium text-pink-800">Controle Parental</h4>
                  <p className="text-sm text-pink-600">Pais acompanham tudo</p>
                </div>
              </>
            )}

            {selectedAge === 'crianca' && (
              <>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Gamepad2 className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800">Gamificação</h4>
                  <p className="text-sm text-blue-600">Níveis, pontos e rankings</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800">Turma Virtual</h4>
                  <p className="text-sm text-blue-600">Aprenda com colegas</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800">Leitura Assistida</h4>
                  <p className="text-sm text-blue-600">IA ajuda na pronúncia</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Star className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800">Medalhas</h4>
                  <p className="text-sm text-blue-600">Conquistas especiais</p>
                </div>
              </>
            )}

            {selectedAge === 'adolescente' && (
              <>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <GraduationCap className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <h4 className="font-medium text-purple-800">ENEM Focus</h4>
                  <p className="text-sm text-purple-600">Preparação específica</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <h4 className="font-medium text-purple-800">Study Groups</h4>
                  <p className="text-sm text-purple-600">Grupos de estudo online</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Briefcase className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <h4 className="font-medium text-purple-800">Orientação Vocacional</h4>
                  <p className="text-sm text-purple-600">Descubra sua vocação</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Zap className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <h4 className="font-medium text-purple-800">Speed Learning</h4>
                  <p className="text-sm text-purple-600">Técnicas de estudo</p>
                </div>
              </>
            )}

            {selectedAge === 'adulto' && (
              <>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <h4 className="font-medium text-green-800">Microlearning</h4>
                  <p className="text-sm text-green-600">15 min por dia</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Briefcase className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <h4 className="font-medium text-green-800">Aplicação Prática</h4>
                  <p className="text-sm text-green-600">Use no trabalho hoje</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <GraduationCap className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <h4 className="font-medium text-green-800">Certificações</h4>
                  <p className="text-sm text-green-600">Validadas pelo mercado</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <h4 className="font-medium text-green-800">Networking</h4>
                  <p className="text-sm text-green-600">Conecte com profissionais</p>
                </div>
              </>
            )}

            {selectedAge === 'idoso' && (
              <>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Volume2 className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                  <h4 className="font-medium text-orange-800">Áudio Premium</h4>
                  <p className="text-sm text-orange-600">Narração clara e pausada</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Heart className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                  <h4 className="font-medium text-orange-800">Suporte Humano</h4>
                  <p className="text-sm text-orange-600">Atendimento pessoal</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Settings className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                  <h4 className="font-medium text-orange-800">Interface Simples</h4>
                  <p className="text-sm text-orange-600">Botões grandes e claros</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                  <h4 className="font-medium text-orange-800">Família Conectada</h4>
                  <p className="text-sm text-orange-600">Filhos acompanham progresso</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-indigo-800 mb-2">
            Pronto para começar sua jornada de aprendizado?
          </h3>
          <p className="text-indigo-600 mb-4">
            Metodologia personalizada para {currentAge.range} com resultado garantido
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Zap className="w-4 h-4 mr-2" />
            Começar Agora - {selectedAge.charAt(0).toUpperCase() + selectedAge.slice(1)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}