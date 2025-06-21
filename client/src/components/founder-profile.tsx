import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Building, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Heart,
  GraduationCap,
  Zap,
  Star,
  Award,
  Globe,
  Users
} from "lucide-react";

export function FounderProfile() {
  const achievements = [
    { icon: Building, text: "20+ anos em mercados diversos", color: "text-blue-600" },
    { icon: Globe, text: "Importação, finanças, logística", color: "text-green-600" },
    { icon: Zap, text: "Tecnologia com propósito", color: "text-purple-600" },
    { icon: Heart, text: "Experiências com alma", color: "text-red-600" }
  ];

  const projects = [
    {
      name: "Essentia (Desperte Seu Propósito)",
      description: "Jornada digital de reconexão interior com espiritualidade simbólica",
      tagline: "Mais que um app. Um espelho com alma.",
      color: "from-purple-600 to-indigo-600"
    },
    {
      name: "EduVie (APP EDU)",
      description: "Mentor digital que transforma conteúdo em trilhas de aprendizado eficientes",
      tagline: "Onde aprender não é tarefa, é experiência.",
      color: "from-blue-600 to-cyan-600"
    }
  ];

  const differentials = [
    "Usabilidade moderna com profundidade simbólica",
    "Modelos de negócio claros e acessíveis",
    "Parcerias com escolas, empresas e terapeutas",
    "Tecnologia mapeada e briefings prontos",
    "Validação emocional com usuários reais"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-slate-900 to-purple-900 text-white border-purple-500">
        <CardHeader className="text-center pb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
            Fundador e Visionário
          </Badge>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
            Marcelo Rymer (Lelão)
          </CardTitle>
          <p className="text-xl text-purple-200">
            Criador de Experiências com Alma
          </p>
        </CardHeader>
      </Card>

      {/* Who I Am */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Target className="w-6 h-6 mr-2 text-purple-600" />
            Quem Sou
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg mb-6">
            Empreendedor com mais de 20 anos de atuação em diferentes mercados — importação, finanças, 
            logística e tecnologia — agora dedicado integralmente à criação de plataformas que integram 
            bem-estar, educação e propósito.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                <span className="text-sm font-medium">{achievement.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What I'm Building */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Lightbulb className="w-6 h-6 mr-2 text-blue-600" />
            O Que Estou Construindo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">
            Dois produtos digitais com alma, base técnica sólida e diferencial claro no mercado:
          </p>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className={`p-6 rounded-xl bg-gradient-to-r ${project.color} text-white`}>
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="mb-3 opacity-90">{project.description}</p>
                <blockquote className="italic text-lg font-medium border-l-4 border-white/50 pl-4">
                  "{project.tagline}"
                </blockquote>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Differentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Star className="w-6 h-6 mr-2 text-yellow-600" />
            Diferenciais dos Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {differentials.map((differential, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Award className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <span className="text-gray-700">{differential}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What I Seek */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-green-800">
            <Users className="w-6 h-6 mr-2" />
            O Que Busco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800">Investimento Estratégico</h4>
                <p className="text-green-700">Investimento-anjo ou parceiro para desenvolvimento inicial e validação</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800">Redes de Distribuição</h4>
                <p className="text-blue-700">Acesso a escolas, aceleradoras e plataformas complementares</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-800">Visão Compartilhada</h4>
                <p className="text-purple-700">Pessoas que acreditam que tecnologia pode servir à alma</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Closing Statement */}
      <Card className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <CardContent className="text-center py-12">
          <div className="text-4xl mb-4">✨</div>
          <blockquote className="text-2xl font-bold italic mb-4">
            "Esses não são apenas aplicativos.<br />
            São convites para o humano florescer<br />
            com tecnologia que toca."
          </blockquote>
          <p className="text-purple-200">— Marcelo Rymer (Lelão)</p>
        </CardContent>
      </Card>
    </div>
  );
}