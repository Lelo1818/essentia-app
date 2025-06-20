import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Heart, 
  ArrowRight,
  ArrowLeft,
  Star,
  Lightbulb,
  Compass,
  Feather,
  Sun,
  Moon,
  Wind,
  Flame,
  Bookmark,
  Share,
  RefreshCw
} from "lucide-react";

export default function PortaisInspiracao() {
  const [portalAtual, setPortalAtual] = useState(0);
  const [favoritos, setFavoritos] = useState([]);
  const [categoria, setCategoria] = useState("todos");

  const portais = [
    {
      id: 1,
      categoria: "propósito",
      titulo: "A Semente do Infinito",
      frase: "Você carrega dentro de si uma semente única, que apenas você pode fazer florescer no jardim da humanidade.",
      metafora: "Como uma semente que contém a memória da árvore inteira, você possui em sua essência tudo o que precisa para se tornar quem veio ser.",
      reflexao: "Que árvore majestosa você sente que está destinado a ser?",
      simbolo: Star,
      cor: "from-amber-200 to-yellow-200",
      textColor: "text-amber-800"
    },
    {
      id: 2,
      categoria: "coragem",
      titulo: "O Guerreiro Silencioso",
      frase: "A maior coragem não está em não ter medo, mas em dançar com ele até que se torne seu aliado.",
      metafora: "Como um guerreiro antigo que descobriu que sua maior força não estava na espada, mas na capacidade de transformar inimigos em mestres.",
      reflexao: "Que medo em sua vida está pedindo para ser transformado em coragem?",
      simbolo: Flame,
      cor: "from-red-200 to-orange-200",
      textColor: "text-red-800"
    },
    {
      id: 3,
      categoria: "amor",
      titulo: "O Espelho Sagrado",
      frase: "O amor que você busca no mundo é apenas o reflexo do amor que você precisa dar a si mesmo primeiro.",
      metafora: "Como um espelho que só pode refletir a luz quando está limpo, você só pode irradiar amor quando se reconcilia com sua própria essência.",
      reflexao: "Como você pode ser mais gentil e amoroso consigo mesmo hoje?",
      simbolo: Heart,
      cor: "from-rose-200 to-pink-200",
      textColor: "text-rose-800"
    },
    {
      id: 4,
      categoria: "transformação",
      titulo: "A Borboleta Dourada",
      frase: "Você não está se transformando em algo novo - está lembrando de quem sempre foi sob as camadas do mundo.",
      metafora: "Como a borboleta que sempre existiu dentro da lagarta, sua verdadeira natureza nunca mudou, apenas esperava o momento certo para voar.",
      reflexao: "Que aspectos da sua verdadeira natureza estão prontos para voar?",
      simbolo: Wind,
      cor: "from-purple-200 to-indigo-200",
      textColor: "text-purple-800"
    },
    {
      id: 5,
      categoria: "sabedoria",
      titulo: "O Oráculo Interior",
      frase: "Todas as respostas que você procura já estão escritas na linguagem silenciosa do seu coração.",
      metafora: "Como um oráculo antigo que sempre soube a verdade, sua alma carrega a sabedoria de todas as eras.",
      reflexao: "Se você confiasse completamente na sua sabedoria interior, que decisão tomaria agora?",
      simbolo: Lightbulb,
      cor: "from-blue-200 to-cyan-200",
      textColor: "text-blue-800"
    },
    {
      id: 6,
      categoria: "liberdade",
      titulo: "O Pássaro de Luz",
      frase: "A liberdade verdadeira não está em voar para longe de tudo, mas em descobrir que você sempre teve asas.",
      metafora: "Como um pássaro que nasceu em uma gaiola e descobriu que a porta sempre esteve aberta, você é mais livre do que imagina.",
      reflexao: "Que gaiola imaginária você está pronto para deixar para trás?",
      simbolo: Feather,
      cor: "from-green-200 to-emerald-200",
      textColor: "text-green-800"
    },
    {
      id: 7,
      categoria: "presença",
      titulo: "O Momento Eterno",
      frase: "Este momento carrega toda a eternidade dentro dele - você só precisa parar para perceber.",
      metafora: "Como um diamante que contém infinitas facetas de luz, cada momento presente é um portal para o infinito.",
      reflexao: "O que este momento exato está tentando te ensinar sobre a vida?",
      simbolo: Sun,
      cor: "from-orange-200 to-yellow-200",
      textColor: "text-orange-800"
    },
    {
      id: 8,
      categoria: "mistério",
      titulo: "A Dança do Mistério",
      frase: "Nem tudo precisa ser compreendido para ser vivido plenamente - algumas verdades só podem ser dançadas.",
      metafora: "Como um dançarino que se entrega à música sem precisar entender cada nota, você pode confiar no ritmo da vida.",
      reflexao: "Com que mistério da vida você pode fazer as pazes hoje?",
      simbolo: Moon,
      cor: "from-indigo-200 to-purple-200",
      textColor: "text-indigo-800"
    }
  ];

  const categorias = [
    { id: "todos", nome: "Todos", icon: Sparkles },
    { id: "propósito", nome: "Propósito", icon: Compass },
    { id: "coragem", nome: "Coragem", icon: Flame },
    { id: "amor", nome: "Amor", icon: Heart },
    { id: "transformação", nome: "Transformação", icon: Wind },
    { id: "sabedoria", nome: "Sabedoria", icon: Lightbulb },
    { id: "liberdade", nome: "Liberdade", icon: Feather },
    { id: "presença", nome: "Presença", icon: Sun },
    { id: "mistério", nome: "Mistério", icon: Moon }
  ];

  const portaisFiltrados = categoria === "todos" 
    ? portais 
    : portais.filter(p => p.categoria === categoria);

  const portalAtualData = portaisFiltrados[portalAtual] || portais[0];
  const IconePortal = portalAtualData.simbolo;

  const proximoPortal = () => {
    setPortalAtual((prev) => 
      prev >= portaisFiltrados.length - 1 ? 0 : prev + 1
    );
  };

  const portalAnterior = () => {
    setPortalAtual((prev) => 
      prev <= 0 ? portaisFiltrados.length - 1 : prev - 1
    );
  };

  const toggleFavorito = (id) => {
    setFavoritos(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const portalAleatorio = () => {
    const indiceAleatorio = Math.floor(Math.random() * portaisFiltrados.length);
    setPortalAtual(indiceAleatorio);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-purple-800">
            <Sparkles className="w-6 h-6 mr-3" />
            Portais de Inspiração
          </CardTitle>
          <p className="text-purple-700">
            Frases, metáforas e reflexões que abrem janelas para sua alma
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">{portais.length}</div>
              <div className="text-sm text-gray-600">Portais</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-pink-600">{favoritos.length}</div>
              <div className="text-sm text-gray-600">Favoritos</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-indigo-600">{categorias.length - 1}</div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl">✨</div>
              <div className="text-sm text-gray-600">Infinitas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seletor de Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Jornadas Temáticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => {
              const IconeCat = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={categoria === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCategoria(cat.id);
                    setPortalAtual(0);
                  }}
                  className="flex items-center space-x-1"
                >
                  <IconeCat className="w-4 h-4" />
                  <span>{cat.nome}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Portal Principal */}
      <Card className={`bg-gradient-to-r ${portalAtualData.cor} border-2`}>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Ícone e Título */}
            <div className="space-y-4">
              <div className={`w-20 h-20 mx-auto rounded-full bg-white/30 flex items-center justify-center`}>
                <IconePortal className={`w-10 h-10 ${portalAtualData.textColor}`} />
              </div>
              
              <div>
                <Badge className={`${portalAtualData.textColor} bg-white/50 mb-3`}>
                  {portalAtualData.categoria}
                </Badge>
                <h3 className={`text-2xl font-bold ${portalAtualData.textColor} mb-2`}>
                  {portalAtualData.titulo}
                </h3>
              </div>
            </div>

            {/* Frase Principal */}
            <blockquote className={`text-xl italic ${portalAtualData.textColor} leading-relaxed`}>
              "{portalAtualData.frase}"
            </blockquote>

            {/* Metáfora */}
            <div className="p-6 bg-white/30 rounded-lg">
              <h5 className={`font-medium ${portalAtualData.textColor} mb-3`}>
                🌟 Metáfora Simbólica
              </h5>
              <p className={`${portalAtualData.textColor} opacity-90`}>
                {portalAtualData.metafora}
              </p>
            </div>

            {/* Reflexão */}
            <div className="p-6 bg-white/30 rounded-lg">
              <h5 className={`font-medium ${portalAtualData.textColor} mb-3`}>
                💭 Reflexão Profunda
              </h5>
              <p className={`text-lg ${portalAtualData.textColor} font-medium`}>
                {portalAtualData.reflexao}
              </p>
            </div>

            {/* Ações do Portal */}
            <div className="flex justify-center space-x-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFavorito(portalAtualData.id)}
                className={favoritos.includes(portalAtualData.id) ? 'bg-white text-yellow-600' : ''}
              >
                <Bookmark className="w-4 h-4 mr-1" />
                {favoritos.includes(portalAtualData.id) ? 'Favoritado' : 'Favoritar'}
              </Button>
              
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-1" />
                Compartilhar
              </Button>
              
              <Button variant="outline" size="sm" onClick={portalAleatorio}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Surpresa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navegação */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={portalAnterior}
              disabled={portaisFiltrados.length <= 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">
                Portal {portalAtual + 1} de {portaisFiltrados.length}
              </div>
              <div className="flex space-x-1">
                {portaisFiltrados.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPortalAtual(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === portalAtual ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={proximoPortal}
              disabled={portaisFiltrados.length <= 1}
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Favoritos */}
      {favoritos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bookmark className="w-5 h-5 mr-2 text-yellow-600" />
              Seus Portais Favoritos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portais
                .filter(p => favoritos.includes(p.id))
                .map((portal) => {
                  const IconeFav = portal.simbolo;
                  return (
                    <div 
                      key={portal.id}
                      className={`p-4 rounded-lg bg-gradient-to-r ${portal.cor} cursor-pointer hover:scale-105 transition-transform`}
                      onClick={() => {
                        const index = portaisFiltrados.findIndex(p => p.id === portal.id);
                        if (index !== -1) setPortalAtual(index);
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <IconeFav className={`w-6 h-6 ${portal.textColor} flex-shrink-0 mt-1`} />
                        <div>
                          <h5 className={`font-medium ${portal.textColor} mb-1`}>
                            {portal.titulo}
                          </h5>
                          <p className={`text-sm ${portal.textColor} opacity-90`}>
                            "{portal.frase.substring(0, 100)}..."
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reflexão Diária */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-800">Reflexão do Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-indigo-700">
              Como a reflexão deste portal ressoa em sua vida hoje?
            </p>
            
            <textarea
              className="w-full p-4 border border-indigo-200 rounded-lg resize-none"
              rows={4}
              placeholder="Escreva suas reflexões sobre este portal... Como ele se conecta com sua jornada atual?"
            />
            
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Heart className="w-4 h-4 mr-2" />
              Salvar Reflexão
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}