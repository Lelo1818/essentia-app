import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, 
  Droplets, 
  TreePine, 
  Feather,
  Sun,
  Moon,
  Pen,
  Play,
  CheckCircle,
  Clock,
  Heart,
  Star
} from "lucide-react";

export default function RituaisSimbolicos() {
  const [ritualAtivo, setRitualAtivo] = useState(null);
  const [rituaisCompletos, setRituaisCompletos] = useState([]);
  const [emAndamento, setEmAndamento] = useState(false);

  const rituais = [
    {
      id: "fogo",
      titulo: "Ritual do Fogo Sagrado",
      simbolo: Flame,
      cor: "from-orange-200 to-red-200",
      textColor: "text-orange-800",
      duracao: "15-20 min",
      elementos: ["Vela", "Papel", "Caneta"],
      proposito: "Transformar medos em coragem, libertar o que não serve mais",
      passos: [
        {
          titulo: "Preparação do Espaço",
          instrucao: "Encontre um local tranquilo. Acenda uma vela em um local seguro. Sente-se confortavelmente diante dela.",
          simbolismo: "O fogo representa a força transformadora que existe dentro de você"
        },
        {
          titulo: "Escrita Libertadora", 
          instrucao: "Em um papel, escreva tudo que você quer liberar: medos, limitações, padrões que não te servem mais.",
          simbolismo: "Dar forma às palavras é o primeiro passo para transformar a energia"
        },
        {
          titulo: "Contemplação",
          instrucao: "Olhe para a chama da vela por alguns minutos. Sinta sua força interior se alinhando com essa energia transformadora.",
          simbolismo: "A chama externa desperta a chama interna da sua coragem"
        },
        {
          titulo: "Transformação Simbólica",
          instrucao: "Com cuidado, queime o papel na chama (ou apenas imagine se não for seguro). Veja suas limitações se transformando em luz.",
          simbolismo: "O que não serve mais vira energia para seu renascimento"
        },
        {
          titulo: "Ancoragem",
          instrucao: "Apague a vela conscientemente. Sinta-se renovado, corajoso, livre. Carregue essa sensação no coração.",
          simbolismo: "Você leva o fogo sagrado dentro de si para sempre"
        }
      ],
      mantra: "Sou coragem, sou transformação, sou fogo sagrado que renova."
    },
    {
      id: "agua",
      titulo: "Ritual das Águas Purificadoras",
      simbolo: Droplets,
      cor: "from-blue-200 to-cyan-200",
      textColor: "text-blue-800",
      duracao: "20-25 min",
      elementos: ["Água", "Sal", "Bacia ou banheira"],
      proposito: "Purificar energias, renovar emoções, conectar com a fluidez da vida",
      passos: [
        {
          titulo: "Preparação da Água Sagrada",
          instrucao: "Prepare uma bacia com água morna. Adicione uma pitada de sal marinho, visualizando propriedades purificadoras.",
          simbolismo: "A água é o elemento da renovação emocional e da vida"
        },
        {
          titulo: "Banho Energético",
          instrucao: "Molhe suas mãos na água. Passe delicadamente nos pulsos, testa, coração. Sinta a purificação acontecendo.",
          simbolismo: "Cada gota leva embora energias pesadas, traz leveza"
        },
        {
          titulo: "Reflexão Fluida",
          instrucao: "Observe a água. Reflita sobre a fluidez que você quer trazer para sua vida. Onde você precisa de mais flexibilidade?",
          simbolismo: "Como a água, você pode contornar obstáculos e encontrar seu caminho"
        },
        {
          titulo: "Intenção de Fluidez",
          instrucao: "Mergulhe as duas mãos na água. Mentalize-se fluindo através dos desafios com graça e sabedoria.",
          simbolismo: "Você se torna como a água: forte, mas flexível"
        },
        {
          titulo: "Gratidão às Águas",
          instrucao: "Agradeça à água por sua purificação. Derrame-a na terra ou plantas, devolvendo o presente ao ciclo da vida.",
          simbolismo: "O que você libera volta para a terra, nutriziente"
        }
      ],
      mantra: "Sou fluidez, sou renovação, sou águas que purificam e nutrem."
    },
    {
      id: "terra",
      titulo: "Ritual do Enraizamento",
      simbolo: TreePine,
      cor: "from-green-200 to-emerald-200", 
      textColor: "text-green-800",
      duracao: "25-30 min",
      elementos: ["Local com terra/grama", "Semente", "Água"],
      proposito: "Conectar com propósito, plantar intenções, sentir estabilidade",
      passos: [
        {
          titulo: "Conexão com a Terra",
          instrucao: "Se possível, tire os sapatos. Sinta a terra sob seus pés. Se estiver em casa, toque uma planta ou terra em vaso.",
          simbolismo: "A terra te conecta com sua força ancestral e estabilidade"
        },
        {
          titulo: "Plantio Simbólico",
          instrucao: "Plante uma semente na terra (ou em um vaso). Enquanto faz isso, visualize plantando suas intenções e sonhos.",
          simbolismo: "Seus sonhos são sementes que precisam de cuidado para crescer"
        },
        {
          titulo: "Nutrição da Intenção",
          instrucao: "Regue delicadamente a semente. Cada gota de água representa seu cuidado e dedicação aos seus objetivos.",
          simbolismo: "Seus sonhos precisam de atenção diária para florescer"
        },
        {
          titulo: "Meditação de Raízes",
          instrucao: "Sente-se próximo à terra. Imagine raízes crescendo dos seus pés, te conectando com toda sabedoria terrestre.",
          simbolismo: "Você está enraizado, mas pode crescer infinitamente"
        },
        {
          titulo: "Compromisso com o Crescimento",
          instrucao: "Faça uma promessa de cuidar dessa semente e de seus sonhos. Comprometa-se com seu próprio crescimento.",
          simbolismo: "Você é jardineiro da sua própria vida"
        }
      ],
      mantra: "Sou raiz, sou crescimento, sou terra fértil que gera abundância."
    },
    {
      id: "ar",
      titulo: "Ritual do Vento Libertador",
      simbolo: Feather,
      cor: "from-gray-200 to-blue-200",
      textColor: "text-gray-800",
      duracao: "15-20 min", 
      elementos: ["Local aberto", "Pena ou papel leve", "Respiração"],
      proposito: "Liberar limitações, conectar com liberdade, expandir perspectivas",
      passos: [
        {
          titulo: "Respiração Consciente",
          instrucao: "Vá para um local aberto ou próximo a uma janela. Respire profundamente, sentindo o ar preenchendo seus pulmões.",
          simbolismo: "O ar é a força da vida, da liberdade e da expansão"
        },
        {
          titulo: "Escrita no Vento",
          instrucao: "Escreva em um papel leve algo que você quer liberar ou uma mensagem para o universo.",
          simbolismo: "Suas palavras ganham asas para alcançar onde precisam chegar"
        },
        {
          titulo: "Entrega ao Vento",
          instrucao: "Solte o papel ao vento (de forma responsável) ou apenas segure uma pena e sinta o vento através dela.",
          simbolismo: "Você confia no movimento natural da vida"
        },
        {
          titulo: "Dança da Liberdade",
          instrucao: "Mova-se livremente, deixando o vento tocar seu corpo. Sinta-se leve, livre, sem amarras.",
          simbolismo: "Você é livre como o vento, pode ir onde seu coração desejar"
        },
        {
          titulo: "Expansão da Consciência",
          instrucao: "Pare e sinta-se parte de algo maior. Você, o vento, o céu, tudo conectado em movimento.",
          simbolismo: "Sua consciência se expande além de qualquer limitação"
        }
      ],
      mantra: "Sou liberdade, sou expansão, sou vento que move mundos."
    },
    {
      id: "escrita",
      titulo: "Ritual da Escrita Sagrada",
      simbolo: Pen,
      cor: "from-purple-200 to-indigo-200",
      textColor: "text-purple-800",
      duracao: "30-40 min",
      elementos: ["Caderno especial", "Caneta", "Silêncio"],
      proposito: "Conectar com sabedoria interior, receber insights, dialogar com a alma",
      passos: [
        {
          titulo: "Criação do Espaço Sagrado",
          instrucao: "Prepare um local especial para escrita. Desligue dispositivos. Acenda uma vela se quiser. Crie silêncio.",
          simbolismo: "O silêncio é o portal para sua sabedoria interior"
        },
        {
          titulo: "Invocação da Sabedoria",
          instrucao: "Feche os olhos. Conecte-se com sua sabedoria interior. Peça para receber o que precisa saber neste momento.",
          simbolismo: "Você tem acesso a uma fonte infinita de conhecimento interno"
        },
        {
          titulo: "Escrita Automática",
          instrucao: "Comece a escrever sem pensar, deixando fluir. Não julgue, não corrija. Apenas permita que as palavras venham.",
          simbolismo: "Sua alma tem mensagens importantes para você"
        },
        {
          titulo: "Diálogo Interior",
          instrucao: "Faça perguntas para sua sabedoria interior e continue escrevendo as respostas que surgirem naturalmente.",
          simbolismo: "Você pode conversar com a parte mais sábia de si mesmo"
        },
        {
          titulo: "Integração dos Insights",
          instrucao: "Releia o que escreveu. Sublinhe insights importantes. Agradeça por essa comunicação sagrada.",
          simbolismo: "Você recebeu orientação direta de sua alma"
        }
      ],
      mantra: "Sou sabedoria, sou insight, sou canal da verdade que flui."
    }
  ];

  const ritualSelecionado = rituais.find(r => r.id === ritualAtivo);

  const iniciarRitual = (ritualId) => {
    setRitualAtivo(ritualId);
    setEmAndamento(true);
  };

  const completarRitual = () => {
    if (ritualAtivo && !rituaisCompletos.includes(ritualAtivo)) {
      setRituaisCompletos([...rituaisCompletos, ritualAtivo]);
    }
    setEmAndamento(false);
    setRitualAtivo(null);
  };

  if (ritualSelecionado && emAndamento) {
    const IconeRitual = ritualSelecionado.simbolo;
    
    return (
      <div className="space-y-6">
        {/* Header do Ritual */}
        <Card className={`border-l-4 border-l-orange-500 bg-gradient-to-r ${ritualSelecionado.cor}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconeRitual className={`w-8 h-8 ${ritualSelecionado.textColor}`} />
                <div>
                  <CardTitle className={`text-2xl ${ritualSelecionado.textColor}`}>
                    {ritualSelecionado.titulo}
                  </CardTitle>
                  <p className={`${ritualSelecionado.textColor} opacity-75`}>
                    {ritualSelecionado.proposito}
                  </p>
                </div>
              </div>
              <Badge className={`${ritualSelecionado.textColor} bg-white/50`}>
                {ritualSelecionado.duracao}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Elementos Necessários */}
        <Card>
          <CardHeader>
            <CardTitle>Elementos Sagrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {ritualSelecionado.elementos.map((elemento, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  {elemento}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600">
              Reúna estes elementos antes de começar. Eles são pontes entre o físico e o sagrado.
            </p>
          </CardContent>
        </Card>

        {/* Passos do Ritual */}
        <div className="space-y-4">
          {ritualSelecionado.passos.map((passo, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${ritualSelecionado.cor} flex items-center justify-center font-bold ${ritualSelecionado.textColor}`}>
                    {i + 1}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {passo.titulo}
                    </h4>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-l-blue-500">
                      <p className="text-gray-700 mb-3">
                        <strong>Prática:</strong> {passo.instrucao}
                      </p>
                      <p className="text-blue-700 italic text-sm">
                        <strong>Simbolismo:</strong> {passo.simbolismo}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mantra Final */}
        <Card className={`bg-gradient-to-r ${ritualSelecionado.cor} border-2`}>
          <CardContent className="p-6 text-center">
            <h4 className={`text-xl font-bold ${ritualSelecionado.textColor} mb-4`}>
              Mantra de Ancoragem
            </h4>
            <blockquote className={`text-lg italic ${ritualSelecionado.textColor}`}>
              "{ritualSelecionado.mantra}"
            </blockquote>
            <p className={`text-sm ${ritualSelecionado.textColor} opacity-75 mt-3`}>
              Repita este mantra sempre que quiser reconectar com a energia deste ritual
            </p>
          </CardContent>
        </Card>

        {/* Finalização */}
        <Card>
          <CardContent className="p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Ritual Concluído
            </h4>
            <p className="text-gray-600 mb-6">
              Você realizou algo sagrado. Carregue essa energia transformadora em seu coração.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={completarRitual} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Fiz com o Coração
              </Button>
              <Button variant="outline" onClick={() => setEmAndamento(false)}>
                Voltar aos Rituais
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-amber-800">
            <Star className="w-6 h-6 mr-3" />
            Rituais Simbólicos
          </CardTitle>
          <p className="text-amber-700">
            Práticas sagradas para conectar com diferentes aspectos da sua essência
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-amber-600">{rituais.length}</div>
              <div className="text-sm text-gray-600">Rituais</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">{rituaisCompletos.length}</div>
              <div className="text-sm text-gray-600">Completos</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Elementos</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Transformação</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-rose-600">🕊️</div>
              <div className="text-sm text-gray-600">Liberdade</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Rituais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituais.map((ritual) => {
          const IconeRitual = ritual.simbolo;
          const completo = rituaisCompletos.includes(ritual.id);
          
          return (
            <Card 
              key={ritual.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                completo ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}
              onClick={() => iniciarRitual(ritual.id)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${ritual.cor} flex items-center justify-center`}>
                    <IconeRitual className={`w-8 h-8 ${ritual.textColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{ritual.titulo}</h4>
                    <p className="text-sm text-gray-600 mb-3">{ritual.proposito}</p>
                    
                    <div className="flex justify-center space-x-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {ritual.duracao}
                      </Badge>
                      {completo && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completo
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className={`w-full ${completo ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'}`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {completo ? 'Refazer Ritual' : 'Iniciar Ritual'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progresso Geral */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Jornada dos Elementos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-purple-700">
                {rituaisCompletos.length} de {rituais.length} rituais completos
              </span>
              <span className="text-sm text-purple-600">
                {Math.round((rituaisCompletos.length / rituais.length) * 100)}%
              </span>
            </div>
            <Progress value={(rituaisCompletos.length / rituais.length) * 100} className="h-3" />
            
            <p className="text-sm text-purple-700 text-center">
              Cada ritual desperta uma faceta diferente da sua alma. 
              Quando completar todos, você terá conectado com os quatro elementos sagrados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}