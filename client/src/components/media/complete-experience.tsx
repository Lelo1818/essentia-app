import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioSystem } from "./audio-system";
import { TextReader } from "./text-reader";
import { CoverGallery, EmotionalCover } from "./image-system";
import { inspirationalTexts, getTextsByPhase } from "@/data/inspirational-texts";
import { cn } from "@/lib/utils";
import { 
  Play, 
  Pause, 
  Volume2, 
  BookOpen, 
  Image, 
  Settings,
  Headphones,
  Eye,
  Heart,
  Sparkles,
  Quote,
  Timer,
  RotateCcw,
  Share,
  Bookmark
} from "lucide-react";

interface CompleteExperienceProps {
  phase: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CompleteExperience({ 
  phase, 
  title, 
  children, 
  className 
}: CompleteExperienceProps) {
  const [currentMode, setCurrentMode] = useState<"content" | "immersive" | "audio-only" | "reading">("content");
  const [isImmersiveActive, setIsImmersiveActive] = useState(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [experienceSettings, setExperienceSettings] = useState({
    autoStartAudio: false,
    showCaptions: true,
    ambientVolume: 0.3,
    narrationVolume: 0.7,
    immersiveMode: false
  });

  const phaseTexts = getTextsByPhase(phase);

  useEffect(() => {
    if (phaseTexts.length > 0 && !selectedText) {
      setSelectedText(phaseTexts[0].id);
    }
  }, [phaseTexts, selectedText]);

  const startImmersiveExperience = () => {
    setIsImmersiveActive(true);
    setCurrentMode("immersive");
    if (experienceSettings.autoStartAudio) {
      // Trigger audio start
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Experience Header */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center text-2xl text-purple-800">
                <Sparkles className="w-6 h-6 mr-3" />
                {title}
              </CardTitle>
              <p className="text-purple-700">
                Experiência audiovisual completa de transformação interior
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-purple-100 text-purple-700">
                {phaseTexts.length} textos
              </Badge>
              <Button
                onClick={startImmersiveExperience}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
              >
                <Play className="w-4 h-4 mr-2" />
                Experiência Completa
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Experience Modes */}
      <Tabs value={currentMode} onValueChange={(value) => setCurrentMode(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Conteúdo</span>
          </TabsTrigger>
          <TabsTrigger value="immersive" className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Imersivo</span>
          </TabsTrigger>
          <TabsTrigger value="audio-only" className="flex items-center space-x-1">
            <Headphones className="w-4 h-4" />
            <span className="hidden sm:inline">Só Áudio</span>
          </TabsTrigger>
          <TabsTrigger value="reading" className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Leitura</span>
          </TabsTrigger>
        </TabsList>

        {/* Content Mode - Normal Interface */}
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Immersive Mode - Full Multimedia Experience */}
        <TabsContent value="immersive" className="mt-6">
          <div className="space-y-6">
            {/* Immersive Cover */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <EmotionalCover phase={phase} className="w-full h-full" />
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
                  <p className="text-xl text-white/90 mb-6">
                    Mergulhe em uma jornada transformadora
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      size="lg"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Iniciar Experiência
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Personalizar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Immersive Content */}
            {selectedText && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-fit">
                  <CardContent className="p-6">
                    <TextReader 
                      textId={selectedText}
                      autoStart={experienceSettings.autoStartAudio}
                      showControls={true}
                    />
                  </CardContent>
                </Card>
                
                <Card className="h-fit">
                  <CardContent className="p-6">
                    <AudioSystem
                      tracks={[
                        {
                          id: `${phase}-ambient`,
                          title: "Ambiente da Fase",
                          type: "ambient",
                          src: `[ÁUDIO_AMBIENTE_${phase.toUpperCase()}]`,
                          loop: true,
                          duration: 600
                        },
                        {
                          id: `${phase}-narration`,
                          title: "Narração Guiada",
                          type: "narration", 
                          src: `[NARRAÇÃO_${phase.toUpperCase()}]`,
                          duration: 180
                        }
                      ]}
                      autoPlay={experienceSettings.autoStartAudio}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Audio-Only Mode */}
        <TabsContent value="audio-only" className="mt-6">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Headphones className="w-5 h-5 mr-2" />
                  Experiência Sonora Pura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-6">
                  Feche os olhos e permita-se ser guiado apenas pelo som. 
                  Uma jornada introspectiva através da narração e música ambiente.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Timer className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h6 className="font-medium text-blue-800">15-20 min</h6>
                    <p className="text-sm text-blue-600">Duração média</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Volume2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h6 className="font-medium text-blue-800">Fones recomendados</h6>
                    <p className="text-sm text-blue-600">Melhor experiência</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Eye className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h6 className="font-medium text-blue-800">Olhos fechados</h6>
                    <p className="text-sm text-blue-600">Concentração total</p>
                  </div>
                </div>

                <AudioSystem
                  tracks={[
                    {
                      id: `full-${phase}`,
                      title: `Jornada Completa - ${title}`,
                      type: "meditation",
                      src: `[ÁUDIO_COMPLETO_${phase.toUpperCase()}]`,
                      description: "Experiência guiada completa com narração e ambiente",
                      duration: 1200
                    }
                  ]}
                  autoPlay={false}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reading Mode */}
        <TabsContent value="reading" className="mt-6">
          <div className="space-y-6">
            {/* Text Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Quote className="w-5 h-5 mr-2 text-green-600" />
                  Biblioteca de Textos Inspiracionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phaseTexts.map((text) => (
                    <Card
                      key={text.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-lg",
                        selectedText === text.id && "ring-2 ring-blue-500 bg-blue-50"
                      )}
                      onClick={() => setSelectedText(text.id)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h6 className="font-medium text-gray-800">{text.title}</h6>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {text.keyQuotes[0]}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {text.estimatedReadTime} min
                            </Badge>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Share functionality
                                }}
                              >
                                <Share className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Bookmark functionality
                                }}
                              >
                                <Bookmark className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Text Reader */}
            {selectedText && (
              <TextReader 
                textId={selectedText}
                showControls={true}
                autoStart={false}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Experience Settings */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800">
            <Settings className="w-5 h-5 mr-2" />
            Configurações da Experiência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h6 className="font-medium text-gray-800">Áudio</h6>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={experienceSettings.autoStartAudio}
                    onChange={(e) => setExperienceSettings(prev => ({
                      ...prev,
                      autoStartAudio: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <span className="text-sm">Iniciar áudio automaticamente</span>
                </label>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Volume da narração: {Math.round(experienceSettings.narrationVolume * 100)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={experienceSettings.narrationVolume}
                    onChange={(e) => setExperienceSettings(prev => ({
                      ...prev,
                      narrationVolume: parseFloat(e.target.value)
                    }))}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Volume ambiente: {Math.round(experienceSettings.ambientVolume * 100)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={experienceSettings.ambientVolume}
                    onChange={(e) => setExperienceSettings(prev => ({
                      ...prev,
                      ambientVolume: parseFloat(e.target.value)
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="font-medium text-gray-800">Visual</h6>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={experienceSettings.showCaptions}
                    onChange={(e) => setExperienceSettings(prev => ({
                      ...prev,
                      showCaptions: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <span className="text-sm">Mostrar legendas durante áudio</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={experienceSettings.immersiveMode}
                    onChange={(e) => setExperienceSettings(prev => ({
                      ...prev,
                      immersiveMode: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <span className="text-sm">Modo imersivo por padrão</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente para integração rápida nas fases
export function PhaseExperience({ 
  phase, 
  title, 
  children 
}: { 
  phase: string; 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <CompleteExperience phase={phase} title={title}>
      {children}
    </CompleteExperience>
  );
}