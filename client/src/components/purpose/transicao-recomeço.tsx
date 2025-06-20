import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  RotateCcw, 
  Sunrise, 
  Moon,
  Flower2,
  Butterfly,
  TreePine,
  Waves,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  Heart,
  Star
} from "lucide-react";

export default function TransicaoRecomeço() {
  const [cicloAtivo, setCicloAtivo] = useState(null);
  const [audioTocando, setAudioTocando] = useState(false);
  const [reflexaoAberta, setReflexaoAberta] = useState(false);
  const [reflexoes, setReflexoes] = useState({});

  const ciclosVida = [
    {
      id: "morte_simbolica",
      titulo: "Morte Simbólica",
      subtitulo: "Liberando o que não serve mais",
      simbolo: Moon,
      cor: "from-indigo-200 to-purple-200",
      textColor: "text-indigo-800",
      audio: "transicao_morte_simbolica.mp3",
      duracao: "12 min",
      conteudo: {
        reflexao: "Toda transformação verdadeira começa com uma morte simbólica - a coragem de deixar morrer aquilo que fomos para dar espaço ao que estamos nos tornando.",
        meditacao: "Imagine-se como uma árvore no outono, soltando folhas douradas ao vento. Cada folha que cai carrega um padrão, um medo, uma limitação que não precisa mais. Você não está perdendo nada essencial - está fazendo espaço para o novo crescimento.",
        perguntasReflexao: [
          "Que aspectos da minha personalidade ou vida eu preciso deixar 'morrer' para crescer?",
          "Que medos ou limitações estou pronto para soltar agora?",
          "Como posso honrar o que foi, enquanto me abro para o que está vindo?"
        ]
      }
    },
    {
      id: "vazio_fertilizacao",
      titulo: "Vazio Fértil",
      subtitulo: "O espaço sagrado entre ciclos",
      simbolo: Waves,
      cor: "from-blue-200 to-cyan-200",
      textColor: "text-blue-800",
      audio: "transicao_vazio_fertil.mp3",
      duracao: "10 min",
      conteudo: {
        reflexao: "O vazio não é ausência - é presença pura, o campo fértil onde todas as possibilidades dançam antes de tomar forma. Neste espaço sagrado, você não precisa ser nada além de potencial infinito.",
        meditacao: "Visualize-se flutuando em um oceano cósmico de possibilidades. Não há pressa, não há pressão para se tornar algo específico. Você é o espaço onde milagres nascem, a quietude que contém todas as músicas não cantadas.",
        perguntasReflexao: [
          "Como posso me sentir confortável com a incerteza desta transição?",
          "Que possibilidades estou sentindo germinar neste momento de vazio?",
          "O que minha alma quer criar neste espaço de pura potencialidade?"
        ]
      }
    },
    {
      id: "germinacao",
      titulo: "Germinação",
      subtitulo: "Primeiros sinais do novo ser",
      simbolo: Flower2,
      cor: "from-green-200 to-emerald-200",
      textColor: "text-green-800",
      audio: "transicao_germinacao.mp3",
      duracao: "8 min",
      conteudo: {
        reflexao: "Como uma semente que rompe sua casca no escuro da terra, você está começando a sentir os primeiros impulsos do seu novo eu. Confie nestes sinais delicados - eles sabem o caminho para a luz.",
        meditacao: "Sinta-se como uma semente no solo fértil de sua própria consciência. Pequenos brotos de insight e inspiração estão começando a emergir. Você não pode forçar este processo, apenas nutrilo com paciência e amor.",
        perguntasReflexao: [
          "Que novos insights ou inspirações estão surgindo em minha vida?",
          "Como posso nutrir estes primeiros sinais de transformação?",
          "O que está querendo nascer através de mim neste momento?"
        ]
      }
    },
    {
      id: "crescimento",
      titulo: "Crescimento",
      subtitulo: "Expandindo na nova direção",
      simbolo: TreePine,
      cor: "from-green-200 to-lime-200",
      textColor: "text-green-800",
      audio: "transicao_crescimento.mp3",
      duracao: "9 min",
      conteudo: {
        reflexao: "Você está crescendo, expandindo, tomando forma. Como uma planta que busca a luz, você está naturalmente se movendo em direção à sua expressão mais autêntica. Cada dia traz novo desenvolvimento.",
        meditacao: "Visualize-se como uma árvore jovem, forte e flexível. Suas raízes se aprofundam na sabedoria interior enquanto seus galhos se estendem em direção aos sonhos. Você está encontrando seu lugar único no jardim da vida.",
        perguntasReflexao: [
          "Em que direção sinto que estou crescendo naturalmente?",
          "Que novos aspectos de mim mesmo estou descobrindo?",
          "Como posso apoiar este crescimento com ações concretas?"
        ]
      }
    },
    {
      id: "florescimento",
      titulo: "Florescimento",
      subtitulo: "Expressão plena do novo ser",
      simbolo: Butterfly,
      cor: "from-pink-200 to-rose-200",
      textColor: "text-pink-800",
      audio: "transicao_florescimento.mp3",
      duracao: "11 min",
      conteudo: {
        reflexao: "Você emergiu transformado, como uma borboleta que descobriu suas asas. Este não é o fim da jornada, mas uma celebração de sua capacidade infinita de renascer. Você é a prova viva de que a transformação é possível.",
        meditacao: "Sinta-se voando livre, expressando plenamente quem você se tornou. Suas cores são únicas, seu voo é singular. Você contribui com algo especial para o mundo simplesmente sendo quem você é autenticamente.",
        perguntasReflexao: [
          "Como posso expressar plenamente esta nova versão de mim mesmo?",
          "Que dons únicos estou pronto para compartilhar com o mundo?",
          "Como posso viver de forma que honre esta transformação?"
        ]
      }
    },
    {
      id: "integracao",
      titulo: "Integração",
      subtitulo: "Ancorando a transformação no cotidiano",
      simbolo: Sunrise,
      cor: "from-orange-200 to-yellow-200",
      textColor: "text-orange-800",
      audio: "transicao_integracao.mp3",
      duracao: "10 min",
      conteudo: {
        reflexao: "A verdadeira transformação acontece quando você consegue levar sua nova consciência para cada momento da vida cotidiana. Você não é mais quem era, e isto se reflete em cada escolha, cada palavra, cada respiração.",
        meditacao: "Veja-se vivendo seu dia a dia a partir desta nova perspectiva. Como você interage com as pessoas? Como toma decisões? Como se relaciona com desafios? Você carrega sua transformação como uma luz interna que ilumina tudo ao seu redor.",
        perguntasReflexao: [
          "Como posso integrar esta transformação em minha vida diária?",
          "Que mudanças práticas preciso fazer para honrar quem me tornei?",
          "Como posso manter viva esta nova consciência no cotidiano?"
        ]
      }
    }
  ];

  const cicloEscolhido = ciclosVida.find(c => c.id === cicloAtivo);

  const iniciarCiclo = (cicloId) => {
    setCicloAtivo(cicloId);
    setReflexaoAberta(false);
  };

  const salvarReflexao = (pergunta, resposta) => {
    setReflexoes({
      ...reflexoes,
      [`${cicloAtivo}_${pergunta}`]: resposta
    });
  };

  if (cicloEscolhido) {
    const IconeCiclo = cicloEscolhido.simbolo;
    
    return (
      <div className="space-y-6">
        {/* Header do Ciclo */}
        <Card className={`border-l-4 border-l-purple-500 bg-gradient-to-r ${cicloEscolhido.cor}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconeCiclo className={`w-8 h-8 ${cicloEscolhido.textColor}`} />
                <div>
                  <CardTitle className={`text-2xl ${cicloEscolhido.textColor}`}>
                    {cicloEscolhido.titulo}
                  </CardTitle>
                  <p className={`${cicloEscolhido.textColor} opacity-75`}>
                    {cicloEscolhido.subtitulo}
                  </p>
                </div>
              </div>
              <Badge className={`${cicloEscolhido.textColor} bg-white/50`}>
                {cicloEscolhido.duracao}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Player de Áudio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
              Áudio Reflexivo
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
                  {cicloEscolhido.audio}
                </div>
                <div className="text-xs text-blue-600">
                  Meditação guiada sobre {cicloEscolhido.titulo.toLowerCase()}
                </div>
                {audioTocando && (
                  <Progress value={45} className="h-1 mt-2" />
                )}
              </div>
              
              <Button variant="outline" size="sm">
                {audioTocando ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Reflexivo */}
        <Card>
          <CardHeader>
            <CardTitle>Reflexão sobre {cicloEscolhido.titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Reflexão Principal */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-l-4 border-l-purple-500 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-3">🌟 Compreensão do Ciclo</h5>
                <p className="text-gray-700 leading-relaxed">
                  {cicloEscolhido.conteudo.reflexao}
                </p>
              </div>

              {/* Meditação Guiada */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-3">🧘‍♀️ Visualização</h5>
                <p className="text-blue-700 leading-relaxed italic">
                  {cicloEscolhido.conteudo.meditacao}
                </p>
              </div>

              {/* Perguntas de Reflexão */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Perguntas para Reflexão Profunda
                </h5>
                
                {cicloEscolhido.conteudo.perguntasReflexao.map((pergunta, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h6 className="font-medium text-gray-800 mb-3">
                      {i + 1}. {pergunta}
                    </h6>
                    <Textarea
                      placeholder="Permita que sua alma responda... Escreva o que surge naturalmente..."
                      className="min-h-[100px] resize-none"
                      onChange={(e) => salvarReflexao(pergunta, e.target.value)}
                      defaultValue={reflexoes[`${cicloAtivo}_${pergunta}`] || ""}
                    />
                  </div>
                ))}
              </div>

              {/* Ações */}
              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCicloAtivo(null)}
                >
                  Voltar aos Ciclos
                </Button>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => setReflexaoAberta(!reflexaoAberta)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Meu Diário
                  </Button>
                  
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Salvar Reflexões
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diário de Reflexões */}
        {reflexaoAberta && (
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">Diário de Transformação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-amber-700">
                  Suas reflexões sobre os ciclos de transformação:
                </p>
                
                {Object.entries(reflexoes).map(([key, value]) => {
                  if (value && key.startsWith(cicloAtivo)) {
                    const pergunta = key.split('_').slice(2).join('_');
                    return (
                      <div key={key} className="p-3 bg-white/50 rounded border border-amber-200">
                        <h6 className="font-medium text-amber-800 mb-2">{pergunta}</h6>
                        <p className="text-amber-700 text-sm italic">"{value}"</p>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {Object.keys(reflexoes).filter(k => k.startsWith(cicloAtivo) && reflexoes[k]).length === 0 && (
                  <p className="text-amber-600 text-center italic">
                    Suas reflexões aparecerão aqui conforme você escreve...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-purple-800">
            <RotateCcw className="w-6 h-6 mr-3" />
            Transição e Recomeço
          </CardTitle>
          <p className="text-purple-700">
            Jornada pelos ciclos naturais de morte, renascimento e transformação
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">{ciclosVida.length}</div>
              <div className="text-sm text-gray-600">Ciclos</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-indigo-600">∞</div>
              <div className="text-sm text-gray-600">Renovação</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">🔄</div>
              <div className="text-sm text-gray-600">Transformação</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">🦋</div>
              <div className="text-sm text-gray-600">Renascimento</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ciclos da Transformação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ciclosVida.map((ciclo, index) => {
          const IconeCiclo = ciclo.simbolo;
          
          return (
            <Card 
              key={ciclo.id}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => iniciarCiclo(ciclo.id)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${ciclo.cor} flex items-center justify-center`}>
                      <IconeCiclo className={`w-8 h-8 ${ciclo.textColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{ciclo.titulo}</h4>
                    <p className="text-sm text-gray-600 mb-3">{ciclo.subtitulo}</p>
                    
                    <Badge variant="outline" className="text-xs mb-3">
                      {ciclo.duracao}
                    </Badge>
                    
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Explorar Ciclo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sabedoria dos Ciclos */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800">Sabedoria dos Ciclos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-emerald-700">
              A vida é feita de ciclos eternos de morte e renascimento. Cada fim é um novo começo, 
              cada término é uma gestação. Você não está perdendo nada - está se transformando.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 rounded border border-emerald-200">
                <h6 className="font-medium text-emerald-800 mb-2">🌙 Sabedoria da Morte Simbólica</h6>
                <p className="text-sm text-emerald-700">
                  Soltar não é perder, é criar espaço para o novo. Como a lua que morre para renascer, 
                  você precisa deixir ir para receber.
                </p>
              </div>
              
              <div className="p-4 bg-white/50 rounded border border-emerald-200">
                <h6 className="font-medium text-emerald-800 mb-2">🌅 Sabedoria do Renascimento</h6>
                <p className="text-sm text-emerald-700">
                  Cada amanhecer é prova de que você pode começar de novo. A transformação é sua 
                  natureza mais essencial.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}