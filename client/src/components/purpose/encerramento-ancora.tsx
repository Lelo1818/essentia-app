import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Anchor, 
  Star,
  Heart,
  Download,
  Share,
  BookOpen,
  Sparkles,
  Crown,
  Gem,
  Sun,
  Moon,
  Feather,
  TreePine,
  Eye,
  Hand
} from "lucide-react";

export default function EncerramentoAncora() {
  const [intencaoFinal, setIntencaoFinal] = useState("");
  const [ancoraEscolhida, setAncoraEscolhida] = useState(null);
  const [rituConcluido, setRitualConcluido] = useState(false);

  const ancoras = [
    {
      id: "mantra_pessoal",
      titulo: "Mantra Pessoal",
      descricao: "Frase sagrada que carrega sua essência",
      simbolo: Star,
      cor: "from-purple-200 to-indigo-200",
      textColor: "text-purple-800",
      exemplo: "Sou amor, sou propósito, sou luz que ilumina o mundo",
      uso: "Repita sempre que precisar se reconectar com sua essência"
    },
    {
      id: "simbolo_poder",
      titulo: "Símbolo de Poder",
      descricao: "Imagem visual que representa sua força interior",
      simbolo: Crown,
      cor: "from-amber-200 to-yellow-200", 
      textColor: "text-amber-800",
      exemplo: "Uma árvore dourada com raízes profundas e copa luminosa",
      uso: "Visualize sempre que precisar de força e estabilidade"
    },
    {
      id: "gesto_sagrado",
      titulo: "Gesto Sagrado",
      descricao: "Movimento corporal que ativa sua energia",
      simbolo: Hand,
      cor: "from-rose-200 to-pink-200",
      textColor: "text-rose-800",
      exemplo: "Mãos no coração, respiração profunda e sorriso interno",
      uso: "Pratique sempre que quiser se centrar rapidamente"
    },
    {
      id: "palavra_poder",
      titulo: "Palavra de Poder",
      descricao: "Palavra única que desperta sua força",
      simbolo: Gem,
      cor: "from-emerald-200 to-green-200",
      textColor: "text-emerald-800",
      exemplo: "FLORESCER",
      uso: "Pronuncie mentalmente em momentos de decisão"
    },
    {
      id: "ritual_diario",
      titulo: "Ritual Diário",
      descricao: "Prática simples para manter conexão",
      simbolo: Sun,
      cor: "from-orange-200 to-yellow-200",
      textColor: "text-orange-800",
      exemplo: "3 respirações conscientes + gratidão ao despertar",
      uso: "Pratique todos os dias para manter sua energia alinhada"
    },
    {
      id: "intencao_lunar",
      titulo: "Intenção Lunar",
      descricao: "Propósito renovado a cada ciclo da lua",
      simbolo: Moon,
      cor: "from-indigo-200 to-purple-200",
      textColor: "text-indigo-800",
      exemplo: "A cada lua nova, planto uma nova semente de propósito",
      uso: "Revisite e renove sua intenção mensalmente"
    }
  ];

  const mantrasFinais = [
    "Eu sou a mudança que quero ver no mundo",
    "Meu propósito flui através de cada respiração",
    "Carrego luz e espalho amor por onde passo",
    "Sou corajoso, sou autêntico, sou suficiente",
    "Minha alma conhece o caminho, eu apenas sigo",
    "Transformo desafios em oportunidades de crescimento",
    "Sou grato por esta jornada única que é minha vida",
    "Minha presença é um presente para o mundo"
  ];

  const ancoraEscolhidaData = ancoras.find(a => a.id === ancoraEscolhida);

  const finalizarJornada = () => {
    setRitualConcluido(true);
  };

  const downloadMantra = () => {
    const conteudo = `
🌟 ÂNCORA SAGRADA - ${ancoraEscolhidaData?.titulo}

${ancoraEscolhidaData?.descricao}

📿 MINHA ÂNCORA:
"${intencaoFinal}"

💫 COMO USAR:
${ancoraEscolhidaData?.uso}

✨ EXEMPLO INSPIRADOR:
${ancoraEscolhidaData?.exemplo}

🗓️ CRIADO EM: ${new Date().toLocaleDateString('pt-BR')}

💝 Esta é sua âncora sagrada. Carregue-a sempre no coração.
Ela é o fio dourado que te conecta com sua essência mais pura.

Com amor e gratidão pela sua jornada,
Desperte Seu Propósito 🌱
    `;
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minha-ancora-sagrada.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (rituConcluido) {
    return (
      <div className="space-y-6">
        {/* Celebração Final */}
        <Card className="border-l-4 border-l-gold-500 bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-amber-800 mb-2">
                  Jornada Concluída! 
                </h2>
                <p className="text-xl text-amber-700">
                  Você despertou seu propósito e criou sua âncora sagrada
                </p>
              </div>

              <div className="p-6 bg-white/50 rounded-lg border border-amber-200">
                <h4 className="text-lg font-bold text-amber-800 mb-3">
                  Sua Âncora Sagrada:
                </h4>
                <blockquote className="text-xl italic text-amber-700 mb-4">
                  "{intencaoFinal}"
                </blockquote>
                <p className="text-sm text-amber-600">
                  {ancoraEscolhidaData?.titulo} - {ancoraEscolhidaData?.descricao}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/30 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">8</div>
                  <div className="text-sm text-amber-700">Fases Completas</div>
                </div>
                <div className="p-4 bg-white/30 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">∞</div>
                  <div className="text-sm text-amber-700">Possibilidades</div>
                </div>
                <div className="p-4 bg-white/30 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">🌟</div>
                  <div className="text-sm text-amber-700">Nova Você</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={downloadMantra} className="bg-amber-600 hover:bg-amber-700">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Âncora
                </Button>
                
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                
                <Button variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Meu Diário
                </Button>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                <h5 className="font-bold text-purple-800 mb-3">🎭 Mensagem Final</h5>
                <p className="text-purple-700 leading-relaxed">
                  Você não é mais quem era quando começou esta jornada. 
                  Carregue sua âncora sagrada como um tesouro no coração. 
                  Ela é sua bússola nos momentos de dúvida, sua força nos desafios, 
                  sua luz nos momentos escuros. 
                  
                  Você despertou. Agora vá e seja a mudança que o mundo precisa ver.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (ancoraEscolhida && !rituConcluido) {
    const IconeAncora = ancoraEscolhidaData.simbolo;
    
    return (
      <div className="space-y-6">
        {/* Header da Âncora */}
        <Card className={`border-l-4 border-l-purple-500 bg-gradient-to-r ${ancoraEscolhidaData.cor}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconeAncora className={`w-8 h-8 ${ancoraEscolhidaData.textColor}`} />
                <div>
                  <CardTitle className={`text-2xl ${ancoraEscolhidaData.textColor}`}>
                    {ancoraEscolhidaData.titulo}
                  </CardTitle>
                  <p className={`${ancoraEscolhidaData.textColor} opacity-75`}>
                    {ancoraEscolhidaData.descricao}
                  </p>
                </div>
              </div>
              <Badge className={`${ancoraEscolhidaData.textColor} bg-white/50`}>
                Sua Âncora
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Criação da Âncora */}
        <Card>
          <CardHeader>
            <CardTitle>Crie Sua Âncora Sagrada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Exemplo Inspirador */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">✨ Exemplo Inspirador:</h5>
                <p className="text-blue-700 italic">"{ancoraEscolhidaData.exemplo}"</p>
              </div>

              {/* Campo de Criação */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800">
                  Agora crie sua própria {ancoraEscolhidaData.titulo.toLowerCase()}:
                </h5>
                
                <Textarea
                  placeholder={`Escreva sua ${ancoraEscolhidaData.titulo.toLowerCase()} única e pessoal... Deixe fluir do coração...`}
                  className="min-h-[120px] resize-none"
                  value={intencaoFinal}
                  onChange={(e) => setIntencaoFinal(e.target.value)}
                />
                
                <div className="text-xs text-gray-500">
                  💡 Dica: Não pense muito, deixe fluir naturalmente do seu coração
                </div>
              </div>

              {/* Como Usar */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">🎯 Como usar sua âncora:</h5>
                <p className="text-green-700">{ancoraEscolhidaData.uso}</p>
              </div>

              {/* Ações */}
              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setAncoraEscolhida(null)}
                >
                  Escolher Outra Âncora
                </Button>
                
                <Button 
                  onClick={finalizarJornada}
                  disabled={!intencaoFinal.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Anchor className="w-4 h-4 mr-2" />
                  Levo Comigo
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
      <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-amber-800">
            <Anchor className="w-6 h-6 mr-3" />
            Encerramento com Âncora
          </CardTitle>
          <p className="text-amber-700">
            Ritual de intenção final e criação de sua âncora sagrada
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-amber-600">{ancoras.length}</div>
              <div className="text-sm text-gray-600">Tipos de Âncora</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div className="text-sm text-gray-600">Sua Escolha</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-sm text-gray-600">Usos</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">⚓</div>
              <div className="text-sm text-gray-600">Força</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Celebração da Jornada */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">🎉 Parabéns pela Jornada!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-purple-700">
              Você completou uma jornada profunda de autoconhecimento e despertar. 
              Agora é hora de criar uma âncora sagrada que vai te conectar com toda 
              essa sabedoria conquistada.
            </p>
            
            <div className="p-4 bg-white/50 rounded border border-purple-200">
              <h6 className="font-medium text-purple-800 mb-2">✨ O que você conquistou:</h6>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Conectou com sua clareira interior</li>
                <li>• Ouviu o chamado profundo da alma</li>
                <li>• Praticou respiração consciente com intenção</li>
                <li>• Navegou pelos portais de inspiração</li>
                <li>• Realizou rituais simbólicos transformadores</li>
                <li>• Compreendeu os ciclos de renovação</li>
                <li>• Expandiu seu bem-estar integral</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Âncora */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ancoras.map((ancora) => {
          const IconeAncora = ancora.simbolo;
          
          return (
            <Card 
              key={ancora.id}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setAncoraEscolhida(ancora.id)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${ancora.cor} flex items-center justify-center`}>
                    <IconeAncora className={`w-8 h-8 ${ancora.textColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{ancora.titulo}</h4>
                    <p className="text-sm text-gray-600 mb-4">{ancora.descricao}</p>
                    
                    <div className="p-3 bg-gray-50 rounded text-xs text-gray-600 mb-4">
                      <strong>Exemplo:</strong> {ancora.exemplo}
                    </div>
                    
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Escolher Esta Âncora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mantras Inspiradores */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-800">Mantras Inspiradores</CardTitle>
          <p className="text-indigo-600 text-sm">
            Para inspirar sua criação pessoal
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mantrasFinais.map((mantra, i) => (
              <div key={i} className="p-3 bg-white/50 rounded border border-indigo-200">
                <p className="text-indigo-700 italic text-sm">"{mantra}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}