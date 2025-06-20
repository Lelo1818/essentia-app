import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Heart, 
  Star, 
  Target,
  TrendingUp,
  Clock,
  Zap,
  Eye,
  Book,
  Users,
  Paintbrush,
  Code,
  Mic,
  Camera
} from "lucide-react";

export default function PassionDiscovery() {
  const [selectedPassion, setSelectedPassion] = useState(null);

  const passions = [
    {
      id: 1,
      name: "Tecnologia & Inovação",
      description: "Criar soluções que transformam vidas através da tecnologia",
      intensity: 95,
      development: 88,
      timeInvested: "8+ anos",
      evidences: [
        "Passa horas programando sem sentir cansaço",
        "Sempre pesquisando novas tecnologias",
        "Fica animado discutindo inovações",
        "Sonha em criar produtos que impactem milhões"
      ],
      manifestations: [
        "Projetos de código aberto",
        "Apps que resolvem problemas reais", 
        "Mentoria para outros desenvolvedores",
        "Palestras sobre tecnologia e sociedade"
      ],
      blocks: [
        "Síndrome do impostor em tecnologia",
        "Perfeccionismo que paralisa projetos"
      ],
      nextSteps: [
        "Lançar projeto de impacto social",
        "Participar de hackathons de educação",
        "Criar curso online de programação"
      ],
      icon: Code,
      color: "text-blue-500 bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      name: "Educação Transformadora",
      description: "Democratizar conhecimento e despertar potencial humano",
      intensity: 92,
      development: 75,
      timeInvested: "5+ anos",
      evidences: [
        "Sente energia ao ensinar alguém",
        "Frustra-se com sistema educacional tradicional",
        "Busca métodos inovadores de aprendizagem",
        "Acredita que educação muda o mundo"
      ],
      manifestations: [
        "Tutoria voluntária para jovens",
        "Criação de conteúdo educacional",
        "Desenvolvimento de metodologias próprias",
        "Advocacy por educação de qualidade"
      ],
      blocks: [
        "Falta de experiência formal em educação",
        "Dúvidas sobre capacidade pedagógica"
      ],
      nextSteps: [
        "Fazer curso de pedagogia moderna",
        "Testar metodologias com grupos piloto",
        "Criar plataforma educacional"
      ],
      icon: Book,
      color: "text-green-500 bg-green-50 border-green-200"
    },
    {
      id: 3,
      name: "Impacto Social",
      description: "Resolver problemas sistêmicos que afetam comunidades",
      intensity: 89,
      development: 65,
      timeInvested: "3+ anos",
      evidences: [
        "Se emociona com injustiças sociais",
        "Busca sempre o bem coletivo",
        "Pensa em escalabilidade de soluções",
        "Quer deixar legado positivo"
      ],
      manifestations: [
        "Voluntariado em ONGs",
        "Projetos pro bono para causas sociais",
        "Advocacy em redes sociais",
        "Doações regulares para caridade"
      ],
      blocks: [
        "Sentimento de impotência diante de problemas grandes",
        "Dificuldade em escolher uma causa específica"
      ],
      nextSteps: [
        "Definir causa específica de atuação",
        "Conectar-se com líderes sociais",
        "Criar organização própria"
      ],
      icon: Users,
      color: "text-purple-500 bg-purple-50 border-purple-200"
    },
    {
      id: 4,
      name: "Criatividade & Arte",
      description: "Expressar ideias e emoções através de criações artísticas",
      intensity: 78,
      development: 45,
      timeInvested: "2+ anos",
      evidences: [
        "Aprecia design e estética",
        "Gosta de criar conteúdo visual",
        "Se inspira com arte e música",
        "Tem ideias criativas constantemente"
      ],
      manifestations: [
        "Design de interfaces",
        "Fotografia ocasional",
        "Criação de apresentações visuais",
        "Decoração de espaços"
      ],
      blocks: [
        "Autocrítica excessiva com trabalhos criativos",
        "Falta de técnica formal em artes"
      ],
      nextSteps: [
        "Fazer curso de design",
        "Praticar arte regularmente",
        "Compartilhar criações publicamente"
      ],
      icon: Paintbrush,
      color: "text-pink-500 bg-pink-50 border-pink-200"
    },
    {
      id: 5,
      name: "Comunicação & Inspiração",
      description: "Inspirar e motivar pessoas através de palavras e ideias",
      intensity: 72,
      development: 55,
      timeInvested: "4+ anos",
      evidences: [
        "Gosta de falar em público",
        "Escreve reflexões profundas",
        "Pessoas procuram seus conselhos",
        "Quer compartilhar aprendizados"
      ],
      manifestations: [
        "Posts reflexivos em redes sociais",
        "Conversas inspiradoras com amigos",
        "Palestras ocasionais",
        "Escrita pessoal regular"
      ],
      blocks: [
        "Medo de julgamento público",
        "Dúvidas sobre autoridade para falar"
      ],
      nextSteps: [
        "Criar blog pessoal",
        "Participar de eventos como speaker",
        "Desenvolver curso online"
      ],
      icon: Mic,
      color: "text-orange-500 bg-orange-50 border-orange-200"
    }
  ];

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 90) return "Paixão Ardente";
    if (intensity >= 80) return "Forte Interesse"; 
    if (intensity >= 70) return "Interesse Genuíno";
    if (intensity >= 60) return "Curiosidade";
    return "Interesse Casual";
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 90) return "text-red-600";
    if (intensity >= 80) return "text-orange-600";
    if (intensity >= 70) return "text-yellow-600";
    if (intensity >= 60) return "text-blue-600";
    return "text-gray-600";
  };

  const passionSynergy = [
    {
      combination: "Tecnologia + Educação",
      synergy: 95,
      description: "Criar plataformas educacionais inovadoras",
      opportunity: "EdTech para educação brasileira",
      examples: ["App de aprendizagem personalizada", "IA para tutoria", "Realidade virtual educacional"]
    },
    {
      combination: "Educação + Impacto Social", 
      synergy: 88,
      description: "Democratizar educação de qualidade",
      opportunity: "ONG educacional tecnológica",
      examples: ["Escola para periferias", "Bolsas para programação", "Cursos gratuitos online"]
    },
    {
      combination: "Tecnologia + Impacto Social",
      synergy: 92,
      description: "Usar tecnologia para resolver problemas sociais",
      opportunity: "Startup de impacto social",
      examples: ["App para doações", "Plataforma de voluntariado", "IA para inclusão"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-red-600" />
            Descoberta de Paixões
          </CardTitle>
          <p className="text-sm text-gray-600">
            Explore seus interesses mais profundos e descubra como transformá-los em propósito
          </p>
        </CardHeader>
      </Card>

      {/* Passion Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {passions.map((passion) => {
          const IconComponent = passion.icon;
          return (
            <div
              key={passion.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPassion === passion.id 
                  ? passion.color 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPassion(selectedPassion === passion.id ? null : passion.id)}
            >
              <div className="text-center space-y-3">
                <div className="mx-auto w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">{passion.name}</h4>
                  <div className="space-y-2">
                    <Progress value={passion.intensity} className="h-2" />
                    <div className={`text-xs font-medium ${getIntensityColor(passion.intensity)}`}>
                      {passion.intensity}% - {getIntensityLabel(passion.intensity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Passion View */}
      {selectedPassion && (
        <Card>
          <CardContent className="p-6">
            {passions
              .filter(passion => passion.id === selectedPassion)
              .map(passion => {
                const IconComponent = passion.icon;
                return (
                  <div key={passion.id} className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-full ${passion.color}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{passion.name}</h3>
                            <p className="text-gray-600">{passion.description}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getIntensityColor(passion.intensity)}`}>
                              {passion.intensity}%
                            </div>
                            <div className="text-sm text-gray-500">intensidade</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Desenvolvimento</div>
                            <Progress value={passion.development} className="h-3" />
                            <div className="text-xs text-gray-600 mt-1">{passion.development}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Tempo Investido</div>
                            <div className="text-lg font-semibold text-gray-700">{passion.timeInvested}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Evidências */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          Evidências
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {passion.evidences.map((evidence, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Manifestações */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Como se manifesta
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {passion.manifestations.map((manifestation, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {manifestation}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bloqueios */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          Bloqueios atuais
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {passion.blocks.map((block, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {block}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Próximos Passos */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Próximos passos
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {passion.nextSteps.map((step, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      )}

      {/* Passion Synergies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            Sinergias de Paixões
          </CardTitle>
          <p className="text-sm text-gray-600">
            Quando você combina suas paixões, cria oportunidades únicas
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {passionSynergy.map((synergy, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{synergy.combination}</h4>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    {synergy.synergy}% sinergia
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-3">{synergy.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-sm text-gray-700 mb-2">Oportunidade:</h6>
                    <p className="text-sm text-gray-600">{synergy.opportunity}</p>
                  </div>
                  <div>
                    <h6 className="font-medium text-sm text-gray-700 mb-2">Exemplos:</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {synergy.examples.map((example, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Plan */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Plano de Ação - Próximos 30 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700">Lançar primeiro protótipo da plataforma educacional</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700">Validar conceito com 50 estudantes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700">Participar de hackathon de educação</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700">Conectar-se com 3 educadores inovadores</span>
            </div>
          </div>
          
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
            Criar Cronograma Detalhado
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}