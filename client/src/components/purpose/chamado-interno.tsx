import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Compass, 
  Feather,
  Star,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  Book,
  Pen
} from "lucide-react";

export default function ChamadoInterno() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [audioTocando, setAudioTocando] = useState(false);
  const [contemplacao, setContemplacao] = useState(false);

  const perguntasReflexivas = [
    {
      id: 1,
      titulo: "O Sussurro da Alma",
      pergunta: "Se você pudesse ouvir a voz mais profunda do seu coração, o que ela estaria sussurrando sobre o que você veio fazer nesta vida?",
      contexto: "Feche os olhos. Respire fundo três vezes. Imagine que existe uma sabedoria antiga dentro de você que conhece todas as respostas.",
      trilhaSonora: "audio_chamado_interno_01.mp3",
      simbolo: Heart,
      cor: "from-rose-200 to-pink-200"
    },
    {
      id: 2,
      titulo: "O Mapa Perdido",
      pergunta: "Quando você era criança, antes que o mundo te ensinasse o que era 'realista', qual sonho brilhava mais forte em seus olhos?",
      contexto: "Viaje no tempo. Encontre aquela criança que você foi. Ela tem algo importante para te dizer sobre quem você realmente é.",
      trilhaSonora: "audio_chamado_interno_02.mp3", 
      simbolo: Compass,
      cor: "from-blue-200 to-cyan-200"
    },
    {
      id: 3,
      titulo: "O Legado do Coração",
      pergunta: "Quando sua jornada terrena se completar, que transformação você gostaria de ter causado na vida de outras pessoas?",
      contexto: "Imagine-se olhando para trás, não com arrependimento, mas com a certeza de que sua passagem por aqui fez diferença.",
      trilhaSonora: "audio_chamado_interno_03.mp3",
      simbolo: Feather,
      cor: "from-purple-200 to-indigo-200"
    },
    {
      id: 4,
      titulo: "O Fogo Sagrado",
      pergunta: "O que te faz sentir mais vivo, mais conectado com a essência do que é ser humano? Em que momentos você se sente mais 'você'?",
      contexto: "Pense nos momentos em que o tempo parou, em que você estava completamente presente, completamente desperto.",
      trilhaSonora: "audio_chamado_interno_04.mp3",
      simbolo: Star,
      cor: "from-orange-200 to-yellow-200"
    }
  ];

  const perguntaAtualData = perguntasReflexivas[perguntaAtual];
  const IconeAtual = perguntaAtualData.simbolo;
  const progress = ((perguntaAtual + 1) / perguntasReflexivas.length) * 100;

  const handleResposta = (resposta) => {
    setRespostas({
      ...respostas,
      [perguntaAtualData.id]: resposta
    });
  };

  const proximaPergunta = () => {
    if (perguntaAtual < perguntasReflexivas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      setContemplacao(true);
    }
  };

  const voltarPergunta = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
    }
  };

  if (contemplacao) {
    return (
      <div className="space-y-6">
        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Book className="w-6 h-6 mr-3" />
              Contemplação do Chamado
            </CardTitle>
            <p className="text-purple-600">
              Suas respostas revelam o mapa do seu propósito único
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {perguntasReflexivas.map((pergunta, i) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">{pergunta.titulo}</h5>
                  <p className="text-sm text-purple-600 mb-3">{pergunta.pergunta}</p>
                  <div className="p-3 bg-white rounded border">
                    <p className="text-gray-700 italic">
                      {respostas[pergunta.id] || "Ainda não respondida..."}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="text-center space-y-4">
                <h4 className="text-xl font-bold text-purple-800">
                  Seu Chamado Está se Revelando
                </h4>
                <p className="text-purple-700">
                  Essas respostas são sementes preciosas do seu propósito. 
                  Guarde-as no coração e deixe-as germinar.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Salvar no Diário Sagrado
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
      <Card className={`border-l-4 border-l-rose-500 bg-gradient-to-r ${perguntaAtualData.cor}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconeAtual className="w-8 h-8 text-rose-700" />
              <div>
                <CardTitle className="text-2xl text-rose-800">
                  Chamado Interno
                </CardTitle>
                <p className="text-rose-700">
                  {perguntaAtualData.titulo}
                </p>
              </div>
            </div>
            <Badge className="bg-white/50 text-rose-700">
              {perguntaAtual + 1} de {perguntasReflexivas.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <p className="text-rose-700 text-lg">
              Jornada de autoconhecimento profundo através de perguntas que despertam a alma
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Player de Trilha Sonora */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
            Trilha Sonora da Reflexão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Button 
              onClick={() => setAudioTocando(!audioTocando)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {audioTocando ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-800">
                {perguntaAtualData.trilhaSonora}
              </div>
              <div className="text-xs text-blue-600">
                Música contemplativa para aprofundar sua reflexão
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              {audioTocando ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pergunta Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <IconeAtual className="w-6 h-6 mr-2" />
            {perguntaAtualData.titulo}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Contexto */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h5 className="font-medium text-amber-800 mb-2">🌟 Prepare-se para a Reflexão</h5>
              <p className="text-amber-700 italic">
                {perguntaAtualData.contexto}
              </p>
            </div>

            {/* Pergunta Principal */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-l-4 border-l-rose-500 rounded-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Pergunta do Coração:
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                {perguntaAtualData.pergunta}
              </p>
            </div>

            {/* Área de Resposta */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Pen className="w-5 h-5 text-gray-600" />
                <h5 className="font-medium text-gray-700">
                  Escreva sua resposta do coração:
                </h5>
              </div>
              
              <Textarea
                placeholder="Permita que sua alma responda... Não julgue, apenas escreva o que surge naturalmente..."
                className="min-h-[120px] resize-none border-rose-200 focus:border-rose-400"
                value={respostas[perguntaAtualData.id] || ""}
                onChange={(e) => handleResposta(e.target.value)}
              />
              
              <div className="text-xs text-gray-500">
                💡 Dica: Não existe resposta certa ou errada. Deixe fluir o que vier do coração.
              </div>
            </div>

            {/* Navegação */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={voltarPergunta}
                disabled={perguntaAtual === 0}
              >
                Pergunta Anterior
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  Preciso de Pausa
                </Button>
                <Button 
                  onClick={proximaPergunta}
                  disabled={!respostas[perguntaAtualData.id]}
                  className="bg-rose-600 hover:bg-rose-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Respondi com o Coração
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso Emocional */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Jornada do Autoconhecimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{perguntaAtual + 1}</div>
              <div className="text-sm text-purple-700">Reflexão Atual</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-rose-600">
                {Object.keys(respostas).length}
              </div>
              <div className="text-sm text-rose-700">Respostas Dadas</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-blue-700">Jornada Completa</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-sm text-green-700">Possibilidades</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}