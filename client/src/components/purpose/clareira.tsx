import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Moon, 
  Wind,
  Flower2,
  TreePine,
  Sparkles,
  Heart,
  Eye,
  Clock,
  Play
} from "lucide-react";

export default function Clareira() {
  const [momento, setMomento] = useState("amanhecer");
  const [respiracao, setRespiracao] = useState(0);
  const [contemplacao, setContemplacao] = useState(false);

  const momentos = {
    amanhecer: {
      icon: Sun,
      color: "from-orange-200 to-yellow-200",
      textColor: "text-orange-800",
      title: "Despertar do Amanhecer",
      description: "Momento de renovação e possibilidades infinitas",
      mantra: "Cada amanhecer traz uma nova oportunidade de ser quem eu escolho ser",
      reflexao: "O que eu quero plantar neste novo dia da minha vida?"
    },
    meio_dia: {
      icon: Sun,
      color: "from-blue-200 to-cyan-200", 
      textColor: "text-blue-800",
      title: "Luz do Meio-Dia",
      description: "Momento de clareza e ação consciente",
      mantra: "Minha luz interior brilha com propósito e direção clara",
      reflexao: "Como posso honrar meu propósito neste momento presente?"
    },
    entardecer: {
      icon: Moon,
      color: "from-purple-200 to-pink-200",
      textColor: "text-purple-800", 
      title: "Serenidade do Entardecer",
      description: "Momento de gratidão e integração",
      mantra: "Sou grato por cada passo dado na jornada do meu crescimento",
      reflexao: "Que aprendizados este dia trouxe para minha alma?"
    },
    noite: {
      icon: Sparkles,
      color: "from-indigo-300 to-purple-300",
      textColor: "text-indigo-800",
      title: "Mistério da Noite",
      description: "Momento de conexão profunda e sabedoria interior",
      mantra: "Na quietude encontro as respostas que meu coração busca",
      reflexao: "O que minha alma quer me revelar neste silêncio?"
    }
  };

  const currentMomento = momentos[momento];
  const IconComponent = currentMomento.icon;

  const iniciarRespiracao = () => {
    setRespiracao(1);
    let count = 1;
    const interval = setInterval(() => {
      count++;
      setRespiracao(count);
      if (count >= 21) {
        clearInterval(interval);
        setContemplacao(true);
      }
    }, 2000);
  };

  const elementos = [
    { icon: TreePine, name: "Árvore da Sabedoria", ativo: momento === "amanhecer" },
    { icon: Flower2, name: "Flores da Gratidão", ativo: momento === "meio_dia" },
    { icon: Wind, name: "Vento da Transformação", ativo: momento === "entardecer" },
    { icon: Sparkles, name: "Estrelas da Intuição", ativo: momento === "noite" }
  ];

  return (
    <div className="min-h-screen space-y-6">
      {/* Header da Clareira */}
      <Card className={`border-l-4 border-l-orange-500 bg-gradient-to-r ${currentMomento.color}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className={`w-8 h-8 ${currentMomento.textColor}`} />
              <div>
                <CardTitle className={`text-2xl ${currentMomento.textColor}`}>
                  Clareira Sagrada
                </CardTitle>
                <p className={`${currentMomento.textColor} opacity-75`}>
                  {currentMomento.title}
                </p>
              </div>
            </div>
            <Badge className={`${currentMomento.textColor} bg-white/50`}>
              Momento de Conexão
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-lg ${currentMomento.textColor} mb-4`}>
            {currentMomento.description}
          </p>
          
          {/* Seletor de Momento */}
          <div className="flex space-x-2">
            {Object.keys(momentos).map((key) => (
              <Button
                key={key}
                variant={momento === key ? "default" : "outline"}
                size="sm"
                onClick={() => setMomento(key)}
                className="capitalize"
              >
                {key.replace("_", " ")}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Elementos da Clareira */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {elementos.map((elemento, i) => {
          const ElementoIcon = elemento.icon;
          return (
            <Card 
              key={i}
              className={`cursor-pointer transition-all duration-500 ${
                elemento.ativo 
                  ? 'ring-2 ring-green-500 bg-green-50 scale-105' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <CardContent className="p-6 text-center">
                <ElementoIcon className={`w-12 h-12 mx-auto mb-3 ${
                  elemento.ativo ? 'text-green-600 animate-pulse' : 'text-gray-400'
                }`} />
                <h4 className="font-medium text-gray-800">{elemento.name}</h4>
                {elemento.ativo && (
                  <Badge className="mt-2 bg-green-100 text-green-700">
                    Ativo agora
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ritual de Respiração */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wind className="w-5 h-5 mr-2 text-blue-600" />
            Respiração Consciente
          </CardTitle>
          <p className="text-sm text-gray-600">
            21 respirações para se conectar com o momento presente
          </p>
        </CardHeader>
        <CardContent>
          {respiracao === 0 ? (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                <Wind className="w-16 h-16 text-white" />
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Prepare-se para a Jornada Interior
                </h4>
                <p className="text-gray-600 mb-4">
                  Encontre uma posição confortável e permita-se estar presente
                </p>
                <Button onClick={iniciarRespiracao} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Respiração
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center transition-all duration-2000 ${
                respiracao % 2 === 0 
                  ? 'bg-gradient-to-r from-green-400 to-blue-400 scale-110' 
                  : 'bg-gradient-to-r from-blue-400 to-purple-400 scale-100'
              }`}>
                <div className="text-white text-center">
                  <div className="text-4xl font-bold">{respiracao}</div>
                  <div className="text-lg">
                    {respiracao % 2 === 0 ? 'Expire' : 'Inspire'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Progress value={(respiracao / 21) * 100} className="h-3" />
                <p className="text-gray-600">
                  {respiracao % 2 === 0 
                    ? 'Solte tudo que não te serve mais...' 
                    : 'Receba a energia do universo...'}
                </p>
              </div>
              
              {respiracao >= 21 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">🌟 Respiração Concluída</h5>
                  <p className="text-sm text-green-700">
                    Você está pronto para a contemplação profunda
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contemplação e Mantra */}
      {contemplacao && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">Momento de Contemplação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <Heart className="w-16 h-16 mx-auto text-purple-600 animate-pulse mb-4" />
                <h4 className="text-xl font-bold text-purple-800 mb-2">
                  {currentMomento.title}
                </h4>
                <p className="text-purple-700">
                  {currentMomento.description}
                </p>
              </div>

              <div className="p-6 bg-white/50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-3 text-center">
                  ✨ Mantra do Momento
                </h5>
                <blockquote className="text-lg italic text-purple-700 text-center">
                  "{currentMomento.mantra}"
                </blockquote>
              </div>

              <div className="p-6 bg-white/50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-3 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Reflexão Profunda
                </h5>
                <p className="text-purple-700 text-center mb-4">
                  {currentMomento.reflexao}
                </p>
                
                <textarea 
                  className="w-full p-4 border border-purple-200 rounded-lg resize-none"
                  rows={4}
                  placeholder="Permita que sua alma responda... Escreva livremente o que surge no seu coração."
                />
              </div>

              <div className="flex justify-center space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Salvar Reflexão
                </Button>
                <Button variant="outline" onClick={() => {setRespiracao(0); setContemplacao(false);}}>
                  <Clock className="w-4 h-4 mr-2" />
                  Nova Sessão
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Energia da Clareira */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Energia da Clareira</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-green-700">Dias na Jornada</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">67%</div>
              <div className="text-sm text-blue-700">Clareza Interior</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">127</div>
              <div className="text-sm text-purple-700">Reflexões</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">23</div>
              <div className="text-sm text-orange-700">Insights</div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </MediaIntegration>
  );
}