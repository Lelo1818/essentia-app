import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inspirationalTexts } from "@/data/inspirational-texts";
import { 
  BookOpen, 
  Clock, 
  Quote, 
  User, 
  TrendingUp,
  Heart,
  Brain,
  Lightbulb,
  Compass,
  Zap,
  Eye
} from "lucide-react";

export function TextStats() {
  const stats = {
    total: inspirationalTexts.length,
    totalReadTime: inspirationalTexts.reduce((acc, text) => acc + text.estimatedReadTime, 0),
    themes: inspirationalTexts.reduce((acc, text) => {
      acc[text.theme] = (acc[text.theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    moods: inspirationalTexts.reduce((acc, text) => {
      acc[text.mood] = (acc[text.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    withAuthor: inspirationalTexts.filter(text => text.author).length,
    totalQuotes: inspirationalTexts.reduce((acc, text) => acc + text.keyQuotes.length, 0)
  };

  const getThemeIcon = (theme: string) => {
    const icons = {
      recovery: Heart,
      growth: TrendingUp,
      purpose: Compass,
      courage: Zap,
      transformation: Lightbulb,
      wisdom: Brain
    };
    return icons[theme as keyof typeof icons] || BookOpen;
  };

  const getThemeColor = (theme: string) => {
    const colors = {
      recovery: "bg-green-100 text-green-700",
      growth: "bg-blue-100 text-blue-700",
      purpose: "bg-purple-100 text-purple-700",
      courage: "bg-red-100 text-red-700",
      transformation: "bg-orange-100 text-orange-700",
      wisdom: "bg-indigo-100 text-indigo-700"
    };
    return colors[theme as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getMoodEmoji = (mood: string) => {
    const emojis = {
      reflective: "🤔",
      uplifting: "✨",
      motivational: "🔥",
      peaceful: "🕊️",
      empowering: "💪"
    };
    return emojis[mood as keyof typeof emojis] || "📖";
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Textos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{stats.totalReadTime}</div>
            <div className="text-sm text-gray-600">Min. leitura</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Quote className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-600">{stats.totalQuotes}</div>
            <div className="text-sm text-gray-600">Citações</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">{stats.withAuthor}</div>
            <div className="text-sm text-gray-600">Com autoria</div>
          </CardContent>
        </Card>
      </div>

      {/* Themes Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Compass className="w-5 h-5 mr-2" />
            Distribuição por Temas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(stats.themes).map(([theme, count]) => {
              const Icon = getThemeIcon(theme);
              return (
                <div key={theme} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium capitalize">{theme}</div>
                    <div className="text-sm text-gray-600">{count} textos</div>
                  </div>
                  <Badge className={getThemeColor(theme)}>
                    {count}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Moods Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Distribuição por Sentimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(stats.moods).map(([mood, count]) => (
              <div key={mood} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <span className="text-2xl">{getMoodEmoji(mood)}</span>
                <div className="flex-1">
                  <div className="font-medium capitalize">{mood}</div>
                  <div className="text-sm text-gray-600">{count} textos</div>
                </div>
                <Badge variant="outline">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collection Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Eye className="w-5 h-5 mr-2" />
            Visão Geral da Coleção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-purple-700">
              Uma biblioteca completa de <strong>{stats.total} textos inspiracionais</strong> com aproximadamente <strong>{stats.totalReadTime} minutos</strong> de conteúdo transformador.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <h6 className="font-medium text-purple-800 mb-2">🎯 Foco Principal</h6>
                <p className="text-sm text-purple-700">
                  Transformação pessoal através de reflexões profundas sobre propósito, coragem e sabedoria de vida.
                </p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h6 className="font-medium text-purple-800 mb-2">✨ Experiência Única</h6>
                <p className="text-sm text-purple-700">
                  Integração completa com sistema audiovisual imersivo para múltiplas formas de consumo.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white/50 rounded-lg">
              <h6 className="font-medium text-purple-800 mb-2">🌟 Destaques da Coleção</h6>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Conceitos únicos: Ma japonês, Economia da Intenção, História das Três Portas</li>
                <li>• Textos autorais de Paulo de Souza com créditos adequados</li>
                <li>• Integração com as fases do Purpose: Clareira, Respiração, Portais, etc.</li>
                <li>• Sistema de citações compartilháveis para redes sociais</li>
                <li>• Preparado para narração profissional e trilhas sonoras</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}