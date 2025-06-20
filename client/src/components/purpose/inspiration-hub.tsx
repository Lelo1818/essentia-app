import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  BookOpen, 
  Play, 
  Users,
  Quote,
  Star,
  Heart,
  Brain,
  Target,
  Rocket,
  Share,
  Bookmark
} from "lucide-react";

export default function InspirationHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarked, setBookmarked] = useState([]);

  const categories = [
    { id: "all", name: "Todos", icon: Star },
    { id: "quotes", name: "Citações", icon: Quote },
    { id: "books", name: "Livros", icon: BookOpen },
    { id: "videos", name: "Vídeos", icon: Play },
    { id: "people", name: "Pessoas", icon: Users }
  ];

  const inspirationContent = [
    {
      id: 1,
      type: "quote",
      category: "quotes",
      title: "Viktor Frankl sobre Propósito",
      content: "Aqueles que têm um 'porquê' para viver, podem suportar quase qualquer 'como'.",
      author: "Viktor Frankl",
      source: "Em Busca de Sentido",
      relevance: 95,
      personalNote: "Esta citação me ajudou durante momentos difíceis de transição de carreira. Lembra que ter clareza sobre o propósito torna os desafios suportáveis.",
      tags: ["propósito", "resiliência", "sentido"],
      dateAdded: "3 dias atrás",
      reflection: "Conecta com minha busca por significado no trabalho"
    },
    {
      id: 2,
      type: "book",
      category: "books", 
      title: "Atomic Habits",
      content: "Pequenas mudanças, resultados notáveis. Como os hábitos minúsculos podem transformar sua vida.",
      author: "James Clear",
      relevance: 88,
      personalNote: "Aplicando os conceitos para criar rotina de reflexão diária e exercícios. Os 1% de melhoria diária fazem diferença real.",
      tags: ["hábitos", "crescimento", "transformação"],
      dateAdded: "1 semana atrás",
      progress: "Página 180/320",
      keyInsights: [
        "Lei dos 1% de melhoria",
        "Stack de hábitos",
        "Ambiente molda comportamento"
      ]
    },
    {
      id: 3,
      type: "video",
      category: "videos",
      title: "The puzzle of motivation",
      content: "Dan Pink revela a ciência por trás da motivação e como autonomia, maestria e propósito são os verdadeiros motivadores.",
      author: "Dan Pink - TED Talk",
      duration: "18 min",
      relevance: 92,
      personalNote: "Confirma minha intuição sobre trabalho com propósito vs. apenas dinheiro. Autonomia é crucial para mim.",
      tags: ["motivação", "autonomia", "maestria"],
      dateAdded: "5 dias atrás",
      keyMoments: [
        "3:20 - Motivação extrínseca vs intrínseca",
        "11:45 - Os 3 pilares da motivação real",
        "16:30 - Aplicação prática no trabalho"
      ]
    },
    {
      id: 4,
      type: "person",
      category: "people",
      title: "Naval Ravikant",
      content: "Empreendedor e filósofo moderno, conhecido por insights sobre riqueza, felicidade e vida com propósito.",
      relevance: 85,
      personalNote: "Sua abordagem racional sobre felicidade e propósito ressoa comigo. A ideia de 'escolher desejos cuidadosamente' é poderosa.",
      tags: ["filosofia", "empreendedorismo", "felicidade"],
      dateAdded: "2 semanas atrás",
      keyIdeas: [
        "Riqueza é ativos que geram renda enquanto você dorme",
        "Felicidade é uma habilidade que pode ser desenvolvida",
        "Escolha ser você mesmo, autenticamente"
      ],
      resources: [
        "Podcast: Naval Episode on Joe Rogan",
        "Livro: The Almanack of Naval Ravikant",
        "Twitter: @naval"
      ]
    },
    {
      id: 5,
      type: "quote",
      category: "quotes",
      title: "Steve Jobs sobre Conexão",
      content: "Você não pode conectar os pontos olhando para frente; só pode conectá-los olhando para trás. Então você tem que confiar que os pontos se conectarão de alguma forma no seu futuro.",
      author: "Steve Jobs",
      source: "Discurso em Stanford",
      relevance: 90,
      personalNote: "Me conforta nos momentos de incerteza. Cada experiência tem valor, mesmo que não seja claro agora.",
      tags: ["confiança", "futuro", "jornada"],
      dateAdded: "1 dia atrás",
      reflection: "Aplico isso à minha transição de carreira"
    },
    {
      id: 6,
      type: "book",
      category: "books",
      title: "Man's Search for Meaning",
      content: "Relato de Viktor Frankl sobre sobrevivência nos campos de concentração e desenvolvimento da logoterapia.",
      author: "Viktor Frankl",
      relevance: 96,
      personalNote: "Livro transformador sobre encontrar sentido mesmo nas piores circunstâncias. Base para minha filosofia de vida.",
      tags: ["sentido", "resiliência", "psicologia"],
      dateAdded: "1 mês atrás",
      status: "Relido 3 vezes",
      keyInsights: [
        "O último dos direitos humanos é escolher nossa atitude",
        "Sofrimento sem sentido é insuportável",
        "Responsabilidade dá significado à liberdade"
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quote': return Quote;
      case 'book': return BookOpen;
      case 'video': return Play;
      case 'person': return Users;
      default: return Lightbulb;
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return "text-green-600 bg-green-100";
    if (relevance >= 80) return "text-blue-600 bg-blue-100";
    if (relevance >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
  };

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredContent = selectedCategory === "all" 
    ? inspirationContent 
    : inspirationContent.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Hub de Inspiração
          </CardTitle>
          <p className="text-sm text-gray-600">
            Conteúdos, citações e recursos que alimentam sua jornada de propósito
          </p>
        </CardHeader>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-1"
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContent.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          const isBookmarked = bookmarked.includes(item.id);
          
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <TypeIcon className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-600">por {item.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getRelevanceColor(item.relevance)}`}>
                      {item.relevance}% relevante
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleBookmark(item.id)}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-yellow-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Content */}
                  <blockquote className="text-gray-700 italic border-l-4 border-yellow-200 pl-4">
                    "{item.content}"
                  </blockquote>
                  
                  {/* Personal Note */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h6 className="font-medium text-blue-800 mb-1 flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      Nota Pessoal
                    </h6>
                    <p className="text-sm text-blue-700">{item.personalNote}</p>
                  </div>
                  
                  {/* Key Insights/Moments */}
                  {item.keyInsights && (
                    <div className="space-y-2">
                      <h6 className="font-medium text-gray-700 flex items-center">
                        <Brain className="w-4 h-4 mr-1" />
                        Insights Principais
                      </h6>
                      <ul className="space-y-1 text-sm">
                        {item.keyInsights.map((insight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {item.keyMoments && (
                    <div className="space-y-2">
                      <h6 className="font-medium text-gray-700 flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        Momentos-Chave
                      </h6>
                      <ul className="space-y-1 text-sm">
                        {item.keyMoments.map((moment, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {moment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {item.keyIdeas && (
                    <div className="space-y-2">
                      <h6 className="font-medium text-gray-700 flex items-center">
                        <Rocket className="w-4 h-4 mr-1" />
                        Ideias Principais
                      </h6>
                      <ul className="space-y-1 text-sm">
                        {item.keyIdeas.map((idea, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                    <span>Adicionado {item.dateAdded}</span>
                    <div className="flex space-x-2">
                      {item.duration && <span>⏱️ {item.duration}</span>}
                      {item.progress && <span>📖 {item.progress}</span>}
                      {item.status && <span>✅ {item.status}</span>}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share className="w-4 h-4 mr-1" />
                      Compartilhar
                    </Button>
                    <Button size="sm" variant="outline">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add New Content */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-6 text-center">
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Adicionar Nova Inspiração</h4>
              <p className="text-sm text-gray-500">
                Encontrou algo que te inspirou? Adicione aqui para não esquecer
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              <Button size="sm" variant="outline">
                <Quote className="w-4 h-4 mr-1" />
                Citação
              </Button>
              <Button size="sm" variant="outline">
                <BookOpen className="w-4 h-4 mr-1" />
                Livro
              </Button>
              <Button size="sm" variant="outline">
                <Play className="w-4 h-4 mr-1" />
                Vídeo
              </Button>
              <Button size="sm" variant="outline">
                <Users className="w-4 h-4 mr-1" />
                Pessoa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Inspiration */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Inspiração da Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <blockquote className="text-lg italic text-purple-700 border-l-4 border-purple-300 pl-4">
              "O significado da vida é encontrar seu dom. O propósito da vida é dá-lo."
            </blockquote>
            <div className="text-sm text-purple-600">— Pablo Picasso</div>
            
            <div className="p-3 bg-white/50 rounded-lg">
              <h6 className="font-medium text-purple-800 mb-1">Reflexão Semanal</h6>
              <p className="text-sm text-purple-700">
                Esta semana, reflita sobre como você está usando seus dons únicos para contribuir com o mundo. 
                Que pequena ação você pode tomar hoje para compartilhar seu presente?
              </p>
            </div>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              Escrever Reflexão
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}