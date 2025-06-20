import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AudioSystem } from "./audio-system";
import { OptimizedImage, TexturedBackground } from "./image-system";
import { InspirationalText, inspirationalTexts, getTextsByPhase } from "@/data/inspirational-texts";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  Eye, 
  Heart, 
  Share, 
  Bookmark,
  MoreHorizontal,
  Clock,
  Quote,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface TextReaderProps {
  textId?: string;
  phase?: string;
  autoStart?: boolean;
  showControls?: boolean;
  className?: string;
}

export function TextReader({ 
  textId, 
  phase, 
  autoStart = false, 
  showControls = true,
  className 
}: TextReaderProps) {
  const [currentText, setCurrentText] = useState<InspirationalText | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [showAudio, setShowAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (textId) {
      const text = inspirationalTexts.find(t => t.id === textId);
      setCurrentText(text || null);
    } else if (phase) {
      const phaseTexts = getTextsByPhase(phase);
      if (phaseTexts.length > 0) {
        setCurrentText(phaseTexts[0]);
      }
    } else {
      setCurrentText(inspirationalTexts[0]);
    }
  }, [textId, phase]);

  useEffect(() => {
    if (autoStart && currentText) {
      setIsReading(true);
    }
  }, [autoStart, currentText]);

  const getThemeColor = (theme: string) => {
    const colors = {
      recovery: "bg-green-500",
      growth: "bg-blue-500", 
      purpose: "bg-purple-500",
      courage: "bg-red-500",
      transformation: "bg-orange-500",
      wisdom: "bg-indigo-500"
    };
    return colors[theme as keyof typeof colors] || "bg-gray-500";
  };

  const getMoodIcon = (mood: string) => {
    const icons = {
      reflective: "🤔",
      uplifting: "✨",
      motivational: "🔥",
      peaceful: "🕊️",
      empowering: "💪"
    };
    return icons[mood as keyof typeof icons] || "📖";
  };

  const handleShare = () => {
    if (currentText) {
      navigator.share?.({
        title: currentText.title,
        text: currentText.keyQuotes[0],
        url: window.location.href
      });
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Aqui seria salvo no localStorage ou backend
  };

  if (!currentText) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <BookOpen className="w-8 h-8 mr-2" />
        <span>Carregando texto inspiracional...</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className={getThemeColor(currentText.theme)}>
                  {currentText.theme}
                </Badge>
                <Badge variant="outline">
                  {getMoodIcon(currentText.mood)} {currentText.mood}
                </Badge>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentText.estimatedReadTime} min
                </Badge>
              </div>
              <CardTitle className="text-xl">{currentText.title}</CardTitle>
            </div>
            
            {showControls && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleBookmark}
                  className={isBookmarked ? "text-yellow-600" : "text-gray-400"}
                >
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAudio(!showAudio)}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Reading Area */}
      <Card className="relative overflow-hidden">
        <TexturedBackground texture="paper" opacity={0.03} />
        
        <CardContent className="p-8">
          <div 
            className="prose prose-lg max-w-none leading-relaxed text-gray-800"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          >
            {currentText.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>

        {/* Reading Progress */}
        {isReading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        )}
      </Card>

      {/* Key Quotes */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <h4 className="flex items-center font-medium text-purple-800 mb-4">
            <Quote className="w-4 h-4 mr-2" />
            Frases Inspiradoras
          </h4>
          <div className="space-y-3">
            {currentText.keyQuotes.map((quote, index) => (
              <blockquote 
                key={index}
                className="border-l-4 border-purple-300 pl-4 italic text-purple-700 cursor-pointer hover:bg-white/50 p-2 rounded transition-colors"
                onClick={() => navigator.clipboard?.writeText(quote)}
              >
                "{quote}"
              </blockquote>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audio Player */}
      {showAudio && currentText.audioNarration && (
        <AudioSystem
          tracks={[
            {
              id: `narration-${currentText.id}`,
              title: `Narração: ${currentText.title}`,
              type: "narration",
              src: currentText.audioNarration,
              description: "Narração suave do texto completo",
              duration: currentText.estimatedReadTime * 60
            },
            ...(currentText.backgroundMusic ? [{
              id: `music-${currentText.id}`,
              title: "Música de Fundo",
              type: "ambient" as const,
              src: currentText.backgroundMusic,
              description: "Música instrumental relaxante",
              loop: true,
              duration: 600
            }] : [])
          ]}
          autoPlay={autoStart}
        />
      )}

      {/* Reading Controls */}
      {showControls && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant={isReading ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsReading(!isReading)}
                >
                  {isReading ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isReading ? "Pausar" : "Ler"}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Tamanho:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  >
                    A-
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  >
                    A+
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const randomText = inspirationalTexts[Math.floor(Math.random() * inspirationalTexts.length)];
                    setCurrentText(randomText);
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Outro Texto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Texts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Textos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inspirationalTexts
              .filter(text => 
                text.id !== currentText.id && 
                (text.theme === currentText.theme || text.mood === currentText.mood)
              )
              .slice(0, 4)
              .map((text) => (
                <div
                  key={text.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setCurrentText(text)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-800 text-sm">{text.title}</h5>
                    <Badge variant="outline" className="text-xs">
                      {text.estimatedReadTime}min
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {text.keyQuotes[0]}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getThemeColor(text.theme)} text-xs`}>
                      {text.theme}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {getMoodIcon(text.mood)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente específico para integração com as fases
export function PhaseTextReader({ phase }: { phase: string }) {
  const phaseTexts = getTextsByPhase(phase);
  
  if (phaseTexts.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <TextReader 
        textId={phaseTexts[0].id}
        phase={phase}
        autoStart={false}
        showControls={true}
      />
    </div>
  );
}