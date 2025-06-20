import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  BookOpen, 
  Volume2,
  Brain,
  Zap,
  Eye,
  Search,
  Download,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Settings
} from "lucide-react";

export default function SmartContentDetection() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedContent, setDetectedContent] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const detectContent = async () => {
    setIsDetecting(true);
    
    // Simular detecção inteligente
    setTimeout(() => {
      setDetectedContent({
        type: "book",
        title: "Sapiens: Uma Breve História da Humanidade",
        author: "Yuval Noah Harari",
        isbn: "978-8535920195",
        confidence: 94,
        summary: "Uma análise fascinante da evolução humana desde os primórdios até a era moderna, explorando como o Homo sapiens se tornou a espécie dominante do planeta.",
        topics: ["História", "Antropologia", "Evolução", "Sociedade"],
        difficulty: "Intermediário",
        readingTime: "12 horas",
        pages: 464,
        language: "Português",
        available: true,
        formats: ["PDF", "Áudio", "Resumo IA"],
        rating: 4.8,
        reviews: 15420
      });
      setIsDetecting(false);
    }, 3000);
  };

  const startAudioReading = () => {
    setIsReading(true);
    // Simular progresso do áudio
    const interval = setInterval(() => {
      setAudioProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReading(false);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
  };

  const suggestedContent = [
    {
      title: "Inteligência Artificial para Leigos",
      author: "John Smith",
      type: "Livro",
      difficulty: "Iniciante",
      relevance: 95,
      reason: "Baseado em seu interesse por tecnologia"
    },
    {
      title: "Curso MIT: Machine Learning",
      author: "MIT OpenCourseWare",
      type: "Curso",
      difficulty: "Avançado",
      relevance: 89,
      reason: "Continuação natural dos seus estudos"
    },
    {
      title: "Documentário: AlphaGo",
      author: "Netflix",
      type: "Vídeo",
      difficulty: "Intermediário",
      relevance: 87,
      reason: "Complementa teoria com casos práticos"
    },
    {
      title: "Podcast: Lex Fridman sobre IA",
      author: "Lex Fridman",
      type: "Áudio",
      difficulty: "Intermediário",
      relevance: 85,
      reason: "Formato ideal para seus horários de estudo"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Smart Camera Detection */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-green-600" />
            Detecção Inteligente de Conteúdo
          </CardTitle>
          <p className="text-sm text-gray-600">
            Tire uma foto de qualquer livro, artigo ou documento e o EDU criará uma trilha personalizada
          </p>
        </CardHeader>
        <CardContent>
          {!detectedContent ? (
            <div className="space-y-4">
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Aponte a câmera para qualquer conteúdo
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Livros, artigos, anotações, slides - a IA reconhece tudo
                </p>
                
                {isDetecting ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
                      <span className="text-blue-600">Analisando conteúdo...</span>
                    </div>
                    <Progress value={66} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Reconhecendo texto • Identificando tema • Buscando conteúdo completo
                    </p>
                  </div>
                ) : (
                  <Button onClick={detectContent} className="bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Detectar Conteúdo
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                  <div className="text-sm font-medium">Livros</div>
                  <div className="text-xs text-gray-500">ISBN + Resumo</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Search className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                  <div className="text-sm font-medium">Artigos</div>
                  <div className="text-xs text-gray-500">PDF + Links</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Volume2 className="w-6 h-6 mx-auto text-green-600 mb-1" />
                  <div className="text-sm font-medium">Áudio</div>
                  <div className="text-xs text-gray-500">Narração IA</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Zap className="w-6 h-6 mx-auto text-orange-600 mb-1" />
                  <div className="text-sm font-medium">Trilha IA</div>
                  <div className="text-xs text-gray-500">Personalizada</div>
                </div>
              </div>
            </div>
          ) : (
            /* Detected Content */
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-28 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{detectedContent.title}</h3>
                    <Badge className="bg-green-100 text-green-700">
                      {detectedContent.confidence}% confiança
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">por {detectedContent.author}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Páginas:</span>
                      <span className="ml-1 font-medium">{detectedContent.pages}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tempo:</span>
                      <span className="ml-1 font-medium">{detectedContent.readingTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Nível:</span>
                      <span className="ml-1 font-medium">{detectedContent.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Avaliação:</span>
                      <span className="ml-1 font-medium">⭐ {detectedContent.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Summary */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Resumo Inteligente</h5>
                <p className="text-sm text-blue-700">{detectedContent.summary}</p>
              </div>

              {/* Topics */}
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Tópicos Principais</h5>
                <div className="flex flex-wrap gap-2">
                  {detectedContent.topics.map((topic, i) => (
                    <Badge key={i} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </div>

              {/* Available Formats */}
              <div>
                <h5 className="font-medium text-gray-700 mb-3">Formatos Disponíveis</h5>
                <div className="grid grid-cols-3 gap-3">
                  {detectedContent.formats.map((format, i) => (
                    <Button key={i} variant="outline" className="h-auto p-3 flex-col space-y-1">
                      {format === "PDF" && <BookOpen className="w-5 h-5" />}
                      {format === "Áudio" && <Volume2 className="w-5 h-5" />}
                      {format === "Resumo IA" && <Brain className="w-5 h-5" />}
                      <span className="text-sm">{format}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Audio Player */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-purple-800">Narração por IA</h5>
                    <Badge className="bg-purple-100 text-purple-700">Beta</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <Button 
                        size="sm" 
                        onClick={isReading ? () => setIsReading(false) : startAudioReading}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isReading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      
                      <div className="flex-1">
                        <Progress value={audioProgress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Capítulo 1: A Revolução Cognitiva</span>
                          <span>{Math.round(audioProgress)}%</span>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <Button size="sm" variant="ghost">
                        <SkipBack className="w-4 h-4 mr-1" />
                        -30s
                      </Button>
                      <span>Velocidade: 1.2x</span>
                      <Button size="sm" variant="ghost">
                        +30s
                        <SkipForward className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Criar Trilha de Estudo
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button variant="outline" onClick={() => setDetectedContent(null)}>
                  Nova Busca
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Content Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Sugestões Inteligentes para Você
          </CardTitle>
          <p className="text-sm text-gray-600">
            Baseado no seu perfil de aprendizado e interesses
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestedContent.map((content, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {content.type === "Livro" && <BookOpen className="w-6 h-6 text-white" />}
                  {content.type === "Curso" && <Brain className="w-6 h-6 text-white" />}
                  {content.type === "Vídeo" && <Play className="w-6 h-6 text-white" />}
                  {content.type === "Áudio" && <Volume2 className="w-6 h-6 text-white" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-gray-800">{content.title}</h5>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      {content.relevance}% relevante
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">por {content.author}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>📚 {content.type}</span>
                    <span>📊 {content.difficulty}</span>
                    <span>💡 {content.reason}</span>
                  </div>
                </div>
                
                <Button size="sm">
                  <Camera className="w-4 h-4 mr-1" />
                  Detectar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Content Search */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Busca Inteligente por Tema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-green-700">
              Digite qualquer tema, matéria ou assunto que queira aprender e a IA encontrará o melhor conteúdo
            </p>
            
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Ex: Python para iniciantes, História do Brasil, Física Quântica..."
                className="flex-1 p-3 border rounded-lg"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["Python", "História", "Matemática", "Inglês", "Marketing", "Design"].map(topic => (
                <Button key={topic} size="sm" variant="outline" className="text-xs">
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}