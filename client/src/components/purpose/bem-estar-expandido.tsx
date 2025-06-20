import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  Brain, 
  TreePine,
  Sun,
  Footprints,
  Wind,
  Sparkles,
  Eye,
  Ear,
  Hand,
  Smile,
  CheckCircle,
  Clock
} from "lucide-react";

export default function BemEstarExpandido() {
  const [praticaAtiva, setPraticaAtiva] = useState(null);
  const [checklistDia, setChecklistDia] = useState({});
  const [registroCorpo, setRegistroCorpo] = useState({});

  const praticasBemEstar = [
    {
      id: "respiracao_presenca",
      titulo: "Respiração da Presença",
      descricao: "Ancoragem no momento presente através da respiração consciente",
      simbolo: Wind,
      cor: "from-blue-200 to-cyan-200",
      textColor: "text-blue-800",
      duracao: "5-10 min",
      tipo: "respiração",
      instrucoes: [
        "Sente-se confortavelmente com a coluna ereta",
        "Feche os olhos e respire naturalmente por 1 minuto",
        "Comece a contar suas respirações: 1 na inspiração, 2 na expiração",
        "Continue até 10, depois recomece do 1",
        "Quando a mente divagar, gentilmente volte para a contagem",
        "Termine respirando naturalmente por mais 1 minuto"
      ],
      beneficios: ["Reduz ansiedade", "Aumenta foco", "Acalma sistema nervoso"]
    },
    {
      id: "caminhada_consciente",
      titulo: "Caminhada Consciente",
      descricao: "Meditação em movimento conectando com a Terra",
      simbolo: Footprints,
      cor: "from-green-200 to-emerald-200",
      textColor: "text-green-800",
      duracao: "15-30 min",
      tipo: "movimento",
      instrucoes: [
        "Escolha um local onde possa caminhar tranquilamente",
        "Comece caminhando mais devagar que o normal",
        "Sinta seus pés tocando o chão a cada passo",
        "Observe sua respiração enquanto caminha",
        "Conecte-se com os sons, cheiros e sensações ao redor",
        "Caminhe como se fosse uma meditação em movimento"
      ],
      beneficios: ["Conecta com natureza", "Clareia mente", "Energiza corpo"]
    },
    {
      id: "escanear_corpo",
      titulo: "Escaneamento Corporal",
      descricao: "Jornada de consciência através do corpo físico",
      simbolo: Eye,
      cor: "from-purple-200 to-indigo-200",
      textColor: "text-purple-800",
      duracao: "10-20 min",
      tipo: "consciência",
      instrucoes: [
        "Deite-se confortavelmente ou sente-se relaxado",
        "Comece focando atenção nos dedos dos pés",
        "Lentamente mova a atenção subindo pelas pernas",
        "Continue pelo tronco, braços, pescoço e cabeça",
        "Em cada parte, observe sensações sem julgar",
        "Termine enviando gratidão para todo o corpo"
      ],
      beneficios: ["Aumenta consciência corporal", "Relaxa tensões", "Melhora conexão mente-corpo"]
    },
    {
      id: "sons_silencio",
      titulo: "Escuta do Silêncio",
      descricao: "Prática de escuta profunda e presença auditiva",
      simbolo: Ear,
      cor: "from-amber-200 to-orange-200",
      textColor: "text-amber-800",
      duracao: "8-15 min",
      tipo: "escuta",
      instrucoes: [
        "Sente-se em silêncio com olhos fechados",
        "Comece ouvindo os sons mais próximos",
        "Gradualmente expanda para sons mais distantes",
        "Escute sem nomear ou julgar os sons",
        "Perceba os espaços de silêncio entre os sons",
        "Termine ouvindo o 'som do silêncio' dentro de você"
      ],
      beneficios: ["Acalma mente", "Desenvolve presença", "Conecta com momento"]
    },
    {
      id: "toque_consciente",
      titulo: "Toque Consciente",
      descricao: "Despertar sensibilidade através do tato consciente",
      simbolo: Hand,
      cor: "from-rose-200 to-pink-200",
      textColor: "text-rose-800",
      duracao: "5-12 min",
      tipo: "sensorial",
      instrucoes: [
        "Esfregue as palmas das mãos até ficarem aquecidas",
        "Coloque uma mão no coração, outra no abdômen",
        "Sinta o calor e a energia das suas mãos",
        "Mova as mãos para outras partes do corpo",
        "Toque objetos ao redor com plena atenção",
        "Termine agradecendo às suas mãos e sensibilidade"
      ],
      beneficios: ["Desenvolve sensibilidade", "Acalma sistema nervoso", "Conecta com corpo"]
    },
    {
      id: "gratidao_corpo",
      titulo: "Gratidão ao Corpo",
      descricao: "Prática de reconhecimento e amor pelo corpo físico",
      simbolo: Heart,
      cor: "from-pink-200 to-rose-200",
      textColor: "text-pink-800",
      duracao: "8-12 min",
      tipo: "gratidão",
      instrucoes: [
        "Coloque as mãos no coração e respire profundamente",
        "Agradeça ao seu coração por nunca parar de bater",
        "Agradeça aos seus pulmões por te dar vida",
        "Continue agradecendo a cada parte do corpo",
        "Sinta amor e gratidão fluindo pelo corpo inteiro",
        "Termine com um abraço carinhoso em si mesmo"
      ],
      beneficios: ["Melhora autoestima", "Reduz autocrítica", "Cultiva amor próprio"]
    }
  ];

  const checklistBemEstar = [
    { id: "agua", label: "Bebi água suficiente (2L+)", icon: "💧" },
    { id: "movimento", label: "Movi meu corpo (exercício/caminhada)", icon: "🚶‍♀️" },
    { id: "respiracao", label: "Pratiquei respiração consciente", icon: "🫁" },
    { id: "natureza", label: "Conectei com a natureza", icon: "🌿" },
    { id: "pausa", label: "Fiz pausas durante o dia", icon: "⏸️" },
    { id: "sono", label: "Dormi bem (7-8h)", icon: "😴" },
    { id: "nutricao", label: "Alimentei-me conscientemente", icon: "🥗" },
    { id: "gratidao", label: "Pratiquei gratidão", icon: "🙏" }
  ];

  const registrosCorpo = [
    { 
      id: "energia", 
      label: "Nível de Energia", 
      escala: ["Muito baixa", "Baixa", "Moderada", "Alta", "Muito alta"],
      cor: "text-orange-600"
    },
    { 
      id: "tensao", 
      label: "Tensão Corporal", 
      escala: ["Muito tensa", "Tensa", "Neutra", "Relaxada", "Muito relaxada"],
      cor: "text-blue-600"
    },
    { 
      id: "humor", 
      label: "Estado Emocional", 
      escala: ["Muito baixo", "Baixo", "Neutro", "Alto", "Muito alto"],
      cor: "text-green-600"
    },
    { 
      id: "clareza", 
      label: "Clareza Mental", 
      escala: ["Muito confusa", "Confusa", "Neutra", "Clara", "Muito clara"],
      cor: "text-purple-600"
    }
  ];

  const praticaEscolhida = praticasBemEstar.find(p => p.id === praticaAtiva);

  const toggleCheckItem = (itemId) => {
    setChecklistDia({
      ...checklistDia,
      [itemId]: !checklistDia[itemId]
    });
  };

  const setRegistro = (registroId, valor) => {
    setRegistroCorpo({
      ...registroCorpo,
      [registroId]: valor
    });
  };

  const checklistCompletos = Object.values(checklistDia).filter(Boolean).length;
  const progressoChecklist = (checklistCompletos / checklistBemEstar.length) * 100;

  if (praticaEscolhida) {
    const IconePratica = praticaEscolhida.simbolo;
    
    return (
      <div className="space-y-6">
        {/* Header da Prática */}
        <Card className={`border-l-4 border-l-green-500 bg-gradient-to-r ${praticaEscolhida.cor}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconePratica className={`w-8 h-8 ${praticaEscolhida.textColor}`} />
                <div>
                  <CardTitle className={`text-2xl ${praticaEscolhida.textColor}`}>
                    {praticaEscolhida.titulo}
                  </CardTitle>
                  <p className={`${praticaEscolhida.textColor} opacity-75`}>
                    {praticaEscolhida.descricao}
                  </p>
                </div>
              </div>
              <Badge className={`${praticaEscolhida.textColor} bg-white/50`}>
                {praticaEscolhida.duracao}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Instruções da Prática */}
        <Card>
          <CardHeader>
            <CardTitle>Guia da Prática</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {praticaEscolhida.beneficios.map((beneficio, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {beneficio}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                {praticaEscolhida.instrucoes.map((instrucao, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${praticaEscolhida.cor} flex items-center justify-center font-bold ${praticaEscolhida.textColor} text-sm`}>
                      {i + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{instrucao}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setPraticaAtiva(null)}
                >
                  Voltar às Práticas
                </Button>
                
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Prática Concluída
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-green-800">
            <Heart className="w-6 h-6 mr-3" />
            Bem-estar Expandido
          </CardTitle>
          <p className="text-green-700">
            Práticas de presença, consciência corporal e cuidado integral
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">{praticasBemEstar.length}</div>
              <div className="text-sm text-gray-600">Práticas</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">{checklistCompletos}</div>
              <div className="text-sm text-gray-600">Check Hoje</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">🧘‍♀️</div>
              <div className="text-sm text-gray-600">Presença</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-orange-600">💫</div>
              <div className="text-sm text-gray-600">Bem-estar</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Diário */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Checklist de Bem-estar
            </CardTitle>
            <Badge className={`${progressoChecklist === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {checklistCompletos}/{checklistBemEstar.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progresso do dia</span>
              <span className="text-sm text-gray-600">{Math.round(progressoChecklist)}%</span>
            </div>
            <Progress value={progressoChecklist} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklistBemEstar.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={item.id}
                    checked={checklistDia[item.id] || false}
                    onCheckedChange={() => toggleCheckItem(item.id)}
                  />
                  <label htmlFor={item.id} className="flex items-center space-x-2 cursor-pointer flex-1">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registro do Corpo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Registro Corporal
          </CardTitle>
          <p className="text-sm text-gray-600">
            Como você está se sentindo fisicamente e emocionalmente agora?
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {registrosCorpo.map((registro) => (
              <div key={registro.id} className="space-y-3">
                <h5 className={`font-medium ${registro.cor}`}>{registro.label}</h5>
                <div className="flex space-x-2">
                  {registro.escala.map((opcao, i) => (
                    <Button
                      key={i}
                      variant={registroCorpo[registro.id] === i ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRegistro(registro.id, i)}
                      className="flex-1 text-xs"
                    >
                      {opcao}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            {Object.keys(registroCorpo).length > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h6 className="font-medium text-blue-800 mb-2">Resumo do seu estado atual:</h6>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {registrosCorpo.map((registro) => (
                    registroCorpo[registro.id] !== undefined && (
                      <div key={registro.id} className="flex justify-between">
                        <span className="text-blue-700">{registro.label}:</span>
                        <span className={`font-medium ${registro.cor}`}>
                          {registro.escala[registroCorpo[registro.id]]}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Práticas de Bem-estar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {praticasBemEstar.map((pratica) => {
          const IconePratica = pratica.simbolo;
          
          return (
            <Card 
              key={pratica.id}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setPraticaAtiva(pratica.id)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${pratica.cor} flex items-center justify-center`}>
                    <IconePratica className={`w-8 h-8 ${pratica.textColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{pratica.titulo}</h4>
                    <p className="text-sm text-gray-600 mb-3">{pratica.descricao}</p>
                    
                    <div className="flex justify-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {pratica.duracao}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {pratica.tipo}
                      </Badge>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Iniciar Prática
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights do Bem-estar */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-800">Sabedoria do Bem-estar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-teal-700">
              O bem-estar verdadeiro não é um destino, mas uma prática diária de presença e cuidado consigo mesmo. 
              Cada momento de consciência é um presente que você dá para sua alma.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 rounded border border-teal-200">
                <h6 className="font-medium text-teal-800 mb-2">🌱 Presença no Corpo</h6>
                <p className="text-sm text-teal-700">
                  Seu corpo é seu templo sagrado. Habite-o com consciência, gratidão e amor.
                </p>
              </div>
              
              <div className="p-4 bg-white/50 rounded border border-teal-200">
                <h6 className="font-medium text-teal-800 mb-2">💚 Cuidado Integral</h6>
                <p className="text-sm text-teal-700">
                  Bem-estar é cuidar de si em todas as dimensões: física, emocional, mental e espiritual.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}