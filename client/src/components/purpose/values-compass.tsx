import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Star, 
  Compass, 
  Target,
  Lightbulb,
  Users,
  Zap,
  Globe,
  Book,
  ArrowRight
} from "lucide-react";

export default function ValuesCompass() {
  const [selectedValue, setSelectedValue] = useState(null);

  const coreValues = [
    {
      id: 1,
      name: "Autenticidade",
      description: "Ser verdadeiro consigo mesmo e com os outros",
      strength: 95,
      manifestations: [
        "Não compromete valores por conveniência",
        "Expressa opiniões genuínas mesmo quando impopulares",
        "Vive de acordo com princípios internos"
      ],
      challenges: [
        "Às vezes brutal demais na honestidade",
        "Dificuldade em 'jogar o jogo social'"
      ],
      actions: [
        "Praticar honestidade compassiva",
        "Encontrar formas gentis de expressar verdades"
      ],
      icon: Heart,
      color: "text-red-500 bg-red-50 border-red-200"
    },
    {
      id: 2,
      name: "Impacto Social", 
      description: "Contribuir positivamente para a sociedade",
      strength: 88,
      manifestations: [
        "Busca sempre como ajudar outras pessoas",
        "Prioriza projetos com benefício coletivo",
        "Sente responsabilidade social"
      ],
      challenges: [
        "Pode se sobrecarregar tentando ajudar todos",
        "Frustra-se com injustiças do mundo"
      ],
      actions: [
        "Focar em impacto escalável via tecnologia",
        "Aceitar que mudança leva tempo"
      ],
      icon: Globe,
      color: "text-green-500 bg-green-50 border-green-200"
    },
    {
      id: 3,
      name: "Crescimento Contínuo",
      description: "Buscar sempre evoluir e aprender",
      strength: 92,
      manifestations: [
        "Constantemente questiona e aprende",
        "Vê falhas como oportunidades de crescimento",
        "Investe tempo e energia em desenvolvimento"
      ],
      challenges: [
        "Pode ser impaciente consigo mesmo",
        "Às vezes negligencia celebrar conquistas"
      ],
      actions: [
        "Estabelecer marcos de progresso",
        "Praticar autocompaixão no processo"
      ],
      icon: TrendingUp,
      color: "text-blue-500 bg-blue-50 border-blue-200"
    },
    {
      id: 4,
      name: "Liberdade",
      description: "Autonomia para escolher o próprio caminho",
      strength: 85,
      manifestations: [
        "Valoriza flexibilidade e independência",
        "Resiste a microgerenciamento",
        "Prefere criar próprias regras"
      ],
      challenges: [
        "Pode evitar compromissos necessários",
        "Dificuldade com estruturas rígidas"
      ],
      actions: [
        "Encontrar estruturas que dão autonomia",
        "Balancear liberdade com responsabilidade"
      ],
      icon: Zap,
      color: "text-yellow-500 bg-yellow-50 border-yellow-200"
    },
    {
      id: 5,
      name: "Conexão Genuína",
      description: "Relacionamentos profundos e significativos",
      strength: 78,
      manifestations: [
        "Prefere conversas profundas a small talk",
        "Valoriza qualidade sobre quantidade em amizades",
        "Busca entender e ser entendido"
      ],
      challenges: [
        "Às vezes demora para se abrir",
        "Pode ser seletivo demais com pessoas"
      ],
      actions: [
        "Praticar vulnerabilidade controlada",
        "Dar mais chances para conexões"
      ],
      icon: Users,
      color: "text-purple-500 bg-purple-50 border-purple-200"
    }
  ];

  const getStrengthLabel = (strength: number) => {
    if (strength >= 90) return "Valor Central";
    if (strength >= 80) return "Importante";
    if (strength >= 70) return "Significativo";
    return "Em Desenvolvimento";
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 90) return "text-green-600";
    if (strength >= 80) return "text-blue-600";
    if (strength >= 70) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <Card className="border-l-4 border-l-red-500">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Compass className="w-5 h-5 mr-2 text-red-600" />
          Bússola de Valores
        </CardTitle>
        <p className="text-sm text-gray-600">
          Seus 5 valores centrais que guiam decisões e definem quem você é
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Values Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {coreValues.map((value) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedValue === value.id 
                      ? value.color 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedValue(selectedValue === value.id ? null : value.id)}
                >
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-8 h-8 rounded-full bg-white/70 flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="font-medium text-sm">{value.name}</h4>
                    <div className="space-y-1">
                      <Progress value={value.strength} className="h-2" />
                      <Badge variant="secondary" className="text-xs">
                        {value.strength}%
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Value View */}
          {selectedValue && (
            <div className="space-y-4">
              {coreValues
                .filter(value => value.id === selectedValue)
                .map(value => {
                  const IconComponent = value.icon;
                  return (
                    <div key={value.id} className={`p-6 rounded-lg border-2 ${value.color}`}>
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-white/70 rounded-full">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold">{value.name}</h3>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${getStrengthColor(value.strength)}`}>
                                  {value.strength}%
                                </div>
                                <div className="text-sm text-gray-600">
                                  {getStrengthLabel(value.strength)}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{value.description}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Como se manifesta */}
                            <div className="space-y-2">
                              <h5 className="font-semibold text-sm flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                Como se manifesta:
                              </h5>
                              <ul className="space-y-1 text-sm">
                                {value.manifestations.map((manifestation, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {manifestation}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Desafios */}
                            <div className="space-y-2">
                              <h5 className="font-semibold text-sm flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                Desafios:
                              </h5>
                              <ul className="space-y-1 text-sm">
                                {value.challenges.map((challenge, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {challenge}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Ações */}
                            <div className="space-y-2">
                              <h5 className="font-semibold text-sm flex items-center">
                                <Lightbulb className="w-4 h-4 mr-1" />
                                Ações para fortalecer:
                              </h5>
                              <ul className="space-y-1 text-sm">
                                {value.actions.map((action, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Values Integration */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Integração dos Valores na Vida</h5>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Missão Atual:</strong> Democratizar educação através de tecnologia que respeita a 
                autenticidade individual, promove crescimento contínuo e gera impacto social positivo.
              </p>
              <p>
                <strong>Como seus valores se alinham:</strong> Seu projeto educacional permite exercer 
                liberdade criativa, construir conexões genuínas com estudantes e viver autenticamente 
                seus princípios de transformação social.
              </p>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium text-green-600">Alinhamento: 89%</span>
                <span className="text-gray-500 ml-2">Seus valores estão bem alinhados com suas ações</span>
              </div>
              <Button size="sm" variant="outline">
                <ArrowRight className="w-4 h-4 mr-1" />
                Plano de Ação
              </Button>
            </div>
          </div>

          {/* Daily Values Check */}
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h6 className="font-medium text-purple-800 mb-2">Reflexão Diária</h6>
            <p className="text-sm text-purple-700 mb-3">
              "Minhas decisões de hoje honraram meus valores?"
            </p>
            <div className="flex justify-center space-x-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Refletir Agora
              </Button>
              <Button size="sm" variant="outline" className="border-purple-600 text-purple-600">
                Ver Histórico
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}