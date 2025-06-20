import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Wind, 
  Heart, 
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Flower2,
  Star,
  Sun
} from "lucide-react";

export default function RespiracaoIntencao() {
  const [tecnicaAtiva, setTecnicaAtiva] = useState(null);
  const [respirando, setRespirando] = useState(false);
  const [cicloAtual, setCicloAtual] = useState(0);
  const [fase, setFase] = useState("preparacao"); // preparacao, inspire, segure, expire
  const [contador, setContador] = useState(0);
  const [audioAtivo, setAudioAtivo] = useState(true);

  const tecnicasRespiracao = [
    {
      id: "quadrada",
      titulo: "Respiração Quadrada",
      descricao: "Técnica de equilíbrio e centramento",
      simbolo: Star,
      cor: "from-blue-200 to-cyan-200",
      textColor: "text-blue-800",
      duracao: "5-10 minutos",
      beneficios: ["Reduz ansiedade", "Melhora foco", "Equilibra sistema nervoso"],
      ciclos: {
        inspire: 4,
        segure1: 4,
        expire: 4,
        segure2: 4
      },
      intencao: "Equilibro minha energia interna e encontro meu centro",
      audio: "respiracao_quadrada.mp3"
    },
    {
      id: "coração",
      titulo: "Respiração do Coração",
      descricao: "Técnica para amor próprio e compaixão",
      simbolo: Heart,
      cor: "from-rose-200 to-pink-200",
      textColor: "text-rose-800",
      duracao: "8-12 minutos",
      beneficios: ["Cultiva amor próprio", "Reduz autocrítica", "Expande compaixão"],
      ciclos: {
        inspire: 5,
        segure1: 2,
        expire: 7,
        segure2: 1
      },
      intencao: "Respiro amor e compaixão para dentro do meu coração",
      audio: "respiracao_coracao.mp3"
    },
    {
      id: "ancoramento",
      titulo: "Respiração de Ancoramento",
      descricao: "Técnica para presença e conexão terrestre",
      simbolo: Flower2,
      cor: "from-green-200 to-emerald-200",
      textColor: "text-green-800",
      duracao: "6-8 minutos",
      beneficios: ["Aumenta presença", "Conecta com corpo", "Traz estabilidade"],
      ciclos: {
        inspire: 6,
        segure1: 2,
        expire: 8,
        segure2: 2
      },
      intencao: "Me ancoro no momento presente e sinto minha força interior",
      audio: "respiracao_ancoramento.mp3"
    },
    {
      id: "energia",
      titulo: "Respiração de Energia",
      descricao: "Técnica para vitalidade e motivação",
      simbolo: Sun,
      cor: "from-orange-200 to-yellow-200",
      textColor: "text-orange-800",
      duracao: "4-6 minutos",
      beneficios: ["Aumenta energia", "Desperta vitalidade", "Motiva ação"],
      ciclos: {
        inspire: 3,
        segure1: 1,
        expire: 4,
        segure2: 1
      },
      intencao: "Respiro energia vital e desperto minha força criadora",
      audio: "respiracao_energia.mp3"
    }
  ];

  const tecnicaEscolhida = tecnicasRespiracao.find(t => t.id === tecnicaAtiva);

  useEffect(() => {
    let intervalId;
    
    if (respirando && tecnicaEscolhida) {
      const fases = [
        { nome: "inspire", duracao: tecnicaEscolhida.ciclos.inspire },
        { nome: "segure", duracao: tecnicaEscolhida.ciclos.segure1 },
        { nome: "expire", duracao: tecnicaEscolhida.ciclos.expire },
        { nome: "segure", duracao: tecnicaEscolhida.ciclos.segure2 }
      ];
      
      let faseAtual = 0;
      let contadorFase = 0;
      
      intervalId = setInterval(() => {
        contadorFase++;
        setContador(contadorFase);
        
        const faseAtualObj = fases[faseAtual];
        setFase(faseAtualObj.nome);
        
        if (contadorFase >= faseAtualObj.duracao) {
          faseAtual = (faseAtual + 1) % fases.length;
          contadorFase = 0;
          
          if (faseAtual === 0) {
            setCicloAtual(prev => prev + 1);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [respirando, tecnicaEscolhida]);

  const iniciarRespiracao = (tecnicaId) => {
    setTecnicaAtiva(tecnicaId);
    setRespirando(true);
    setCicloAtual(0);
    setContador(0);
    setFase("inspire");
  };

  const pausarRespiracao = () => {
    setRespirando(false);
  };

  const reiniciarRespiracao = () => {
    setRespirando(false);
    setCicloAtual(0);
    setContador(0);
    setFase("preparacao");
  };

  const getFaseTexto = (fase) => {
    switch (fase) {
      case "inspire": return "Inspire profundamente...";
      case "segure": return "Segure com consciência...";
      case "expire": return "Expire lentamente...";
      default: return "Prepare-se para respirar...";
    }
  };

  const getFaseCor = (fase) => {
    switch (fase) {
      case "inspire": return "from-blue-400 to-cyan-400";
      case "segure": return "from-purple-400 to-indigo-400";
      case "expire": return "from-green-400 to-emerald-400";
      default: return "from-gray-400 to-gray-500";
    }
  };

  if (tecnicaEscolhida && respirando) {
    const IconeTecnica = tecnicaEscolhida.simbolo;
    
    return (
      <div className="space-y-6">
        {/* Header da Sessão */}
        <Card className={`border-l-4 border-l-blue-500 bg-gradient-to-r ${tecnicaEscolhida.cor}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconeTecnica className={`w-8 h-8 ${tecnicaEscolhida.textColor}`} />
                <div>
                  <CardTitle className={`text-2xl ${tecnicaEscolhida.textColor}`}>
                    {tecnicaEscolhida.titulo}
                  </CardTitle>
                  <p className={`${tecnicaEscolhida.textColor} opacity-75`}>
                    Sessão em andamento
                  </p>
                </div>
              </div>
              <Badge className={`${tecnicaEscolhida.textColor} bg-white/50`}>
                Ciclo {cicloAtual + 1}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Círculo de Respiração */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-8">
              <div className={`w-64 h-64 mx-auto rounded-full bg-gradient-to-r ${getFaseCor(fase)} flex items-center justify-center transition-all duration-1000 ${
                fase === "inspire" ? "scale-110" : fase === "expire" ? "scale-90" : "scale-100"
              }`}>
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">{contador}</div>
                  <div className="text-xl">{getFaseTexto(fase)}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-gray-800">
                  {getFaseTexto(fase)}
                </h4>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 italic">
                    "{tecnicaEscolhida.intencao}"
                  </p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button onClick={pausarRespiracao} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                  
                  <Button onClick={reiniciarRespiracao} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setAudioAtivo(!audioAtivo)}
                  >
                    {audioAtivo ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progresso da Sessão */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progresso da Sessão</span>
                <span className="text-sm text-gray-600">{cicloAtual} ciclos completos</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">{cicloAtual}</div>
                  <div className="text-xs text-blue-700">Ciclos</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">{Math.floor(cicloAtual * 0.5)}</div>
                  <div className="text-xs text-green-700">Minutos</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">{fase}</div>
                  <div className="text-xs text-purple-700">Fase Atual</div>
                </div>
                <div className="p-3 bg-orange-50 rounded">
                  <div className="text-lg font-bold text-orange-600">∞</div>
                  <div className="text-xs text-orange-700">Benefícios</div>
                </div>
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
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-blue-800">
            <Wind className="w-6 h-6 mr-3" />
            Respiração com Intenção
          </CardTitle>
          <p className="text-blue-700">
            Técnicas guiadas para conectar respiração com propósito interior
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">{tecnicasRespiracao.length}</div>
              <div className="text-sm text-gray-600">Técnicas</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-sm text-gray-600">Benefícios</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">🫁</div>
              <div className="text-sm text-gray-600">Consciência</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-orange-600">🕯️</div>
              <div className="text-sm text-gray-600">Intenção</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Técnicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tecnicasRespiracao.map((tecnica) => {
          const IconeTecnica = tecnica.simbolo;
          
          return (
            <Card 
              key={tecnica.id}
              className="cursor-pointer hover:shadow-lg transition-all"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header da Técnica */}
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tecnica.cor} flex items-center justify-center`}>
                      <IconeTecnica className={`w-6 h-6 ${tecnica.textColor}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{tecnica.titulo}</h4>
                      <p className="text-sm text-gray-600">{tecnica.descricao}</p>
                    </div>
                  </div>

                  {/* Benefícios */}
                  <div className="space-y-2">
                    <h6 className="font-medium text-gray-700">Benefícios:</h6>
                    <div className="flex flex-wrap gap-1">
                      {tecnica.beneficios.map((beneficio, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {beneficio}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Intenção */}
                  <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-l-blue-500">
                    <h6 className="font-medium text-gray-700 mb-1">Intenção:</h6>
                    <p className="text-sm text-gray-600 italic">"{tecnica.intencao}"</p>
                  </div>

                  {/* Padrão de Respiração */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{tecnica.ciclos.inspire}s</div>
                      <div className="text-blue-700">Inspire</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600">{tecnica.ciclos.segure1}s</div>
                      <div className="text-purple-700">Segure</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{tecnica.ciclos.expire}s</div>
                      <div className="text-green-700">Expire</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-bold text-gray-600">{tecnica.ciclos.segure2}s</div>
                      <div className="text-gray-700">Pausa</div>
                    </div>
                  </div>

                  {/* Ação */}
                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="outline" className="text-xs">
                      {tecnica.duracao}
                    </Badge>
                    <Button 
                      onClick={() => iniciarRespiracao(tecnica.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dicas de Respiração */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Dicas para Respiração Consciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h5 className="font-medium text-green-800">Antes de Começar:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Encontre um local tranquilo e confortável</li>
                <li>• Sente-se com a coluna ereta, mas relaxada</li>
                <li>• Feche os olhos ou mantenha olhar suave</li>
                <li>• Conecte-se com sua intenção para a prática</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-green-800">Durante a Prática:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Respire sempre pelo nariz, se possível</li>
                <li>• Não force, deixe fluir naturalmente</li>
                <li>• Se perder o ritmo, apenas recomece</li>
                <li>• Mantenha a intenção viva no coração</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}