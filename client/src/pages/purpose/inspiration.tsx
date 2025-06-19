import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Quote, Play, Pause, RotateCcw, Heart, Share2 } from "lucide-react";
import type { InspirationContent } from "@/types/purpose";

export default function Inspiration() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isPlayingMeditation, setIsPlayingMeditation] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState(0);

  const { data: inspirations = [], isLoading } = useQuery<InspirationContent[]>({
    queryKey: ["/api/purpose/inspiration"],
  });

  const quotes = inspirations.filter(item => item.type === "quote");
  const meditations = inspirations.filter(item => item.type === "meditation");
  const videos = inspirations.filter(item => item.type === "video");

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const startMeditation = () => {
    setIsPlayingMeditation(true);
    setMeditationTimer(300); // 5 minutes
  };

  const pauseMeditation = () => {
    setIsPlayingMeditation(false);
  };

  const resetMeditation = () => {
    setIsPlayingMeditation(false);
    setMeditationTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando inspirações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fonte de Inspiração</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Alimente sua alma com sabedoria, reflexões profundas e práticas transformadoras.
        </p>
      </div>

      <Tabs defaultValue="quotes" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="quotes" className="flex items-center">
            <Quote className="w-4 h-4 mr-2" />
            Citações
          </TabsTrigger>
          <TabsTrigger value="meditations" className="flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Meditações
          </TabsTrigger>
          <TabsTrigger value="reflections" className="flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Reflexões
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="space-y-6">
          {quotes.length > 0 && (
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <blockquote className="text-2xl font-light text-gray-700 italic mb-6 leading-relaxed">
                  "{quotes[currentQuote]?.content}"
                </blockquote>
                {quotes[currentQuote]?.author && (
                  <p className="text-lg text-gray-500 mb-6">
                    — {quotes[currentQuote].author}
                  </p>
                )}
                <div className="flex justify-center gap-4">
                  <Button onClick={nextQuote} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Nova Inspiração
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.slice(1).map((quote, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentQuote(index + 1)}>
                <CardContent className="p-6">
                  <blockquote className="text-gray-700 italic mb-4 line-clamp-4">
                    "{quote.content}"
                  </blockquote>
                  {quote.author && (
                    <p className="text-sm text-gray-500">— {quote.author}</p>
                  )}
                  <Badge variant="secondary" className="mt-3">
                    {quote.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meditations" className="space-y-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                Meditação Guiada
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <div className="text-white text-2xl font-light">
                  {formatTime(meditationTimer)}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900">Respiração para Clareza</h3>
                <p className="text-gray-600">
                  Uma prática simples de respiração consciente para conectar-se com sua essência interior.
                </p>
              </div>
              
              <div className="flex justify-center gap-4">
                {!isPlayingMeditation ? (
                  <Button onClick={startMeditation} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Meditação
                  </Button>
                ) : (
                  <Button onClick={pauseMeditation} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                )}
                <Button onClick={resetMeditation} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meditations.map((meditation, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    {meditation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{meditation.content}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{meditation.category}</Badge>
                    <Button size="sm" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      <Play className="w-3 h-3 mr-1" />
                      Praticar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reflections" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Pergunta do Dia",
                question: "O que meu coração está tentando me dizer hoje?",
                category: "Autoconhecimento"
              },
              {
                title: "Reflexão Profunda",
                question: "Se eu pudesse conversar com meu eu de 10 anos atrás, que sabedoria compartilharia?",
                category: "Sabedoria"
              },
              {
                title: "Propósito Diário",
                question: "Como posso viver meus valores de forma mais autêntica hoje?",
                category: "Propósito"
              },
              {
                title: "Gratidão Profunda",
                question: "Por quais desafios da minha vida posso ser grata, pois me fizeram crescer?",
                category: "Gratidão"
              },
              {
                title: "Visão Futura",
                question: "Que legado emocional e espiritual quero deixar para o mundo?",
                category: "Visão"
              },
              {
                title: "Conexão Interior",
                question: "Quando me sinto mais conectada com minha essência verdadeira?",
                category: "Espiritualidade"
              }
            ].map((reflection, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{reflection.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {reflection.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    "{reflection.question}"
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Refletir no Diário
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Crie um Ritual Diário de Inspiração
          </h3>
          <p className="text-gray-600 mb-4">
            Reserve alguns minutos todo dia para nutrir sua alma com conteúdo inspirador. 
            Pequenos momentos de reflexão podem transformar toda sua perspectiva.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Definir Lembrete Diário
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}