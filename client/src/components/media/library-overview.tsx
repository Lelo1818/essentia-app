import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { inspirationalTexts, getTextsByTheme } from "@/data/inspirational-texts";
import { contentSections } from "@/data/content-organization";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Quote, 
  User,
  Sparkles,
  Eye,
  Heart,
  Brain,
  Compass,
  Zap,
  TrendingUp,
  Lightbulb,
  Star,
  Target,
  Layers
} from "lucide-react";

export function LibraryOverview() {
  const stats = {
    totalTexts: inspirationalTexts.length,
    totalReadTime: inspirationalTexts.reduce((acc, text) => acc + text.estimatedReadTime, 0),
    authoredTexts: inspirationalTexts.filter(text => text.author).length,
    totalQuotes: inspirationalTexts.reduce((acc, text) => acc + text.keyQuotes.length, 0),
    totalSections: contentSections.length
  };

  const themeStats = inspirationalTexts.reduce((acc, text) => {
    acc[text.theme] = (acc[text.theme] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
      recovery: "from-green-500 to-emerald-600",
      growth: "from-blue-500 to-cyan-600",
      purpose: "from-purple-500 to-violet-600",
      courage: "from-red-500 to-rose-600",
      transformation: "from-orange-500 to-amber-600",
      wisdom: "from-indigo-500 to-blue-600"
    };
    return colors[theme as keyof typeof colors] || "from-gray-500 to-slate-600";
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <CardContent className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Biblioteca Inspiracional</h1>
              <p className="text-xl text-white/90">Textos transformadores para jornadas de autodescoberta</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{stats.totalTexts}</div>
              <div className="text-white/80">Textos únicos</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalReadTime}</div>
              <div className="text-sm text-white/80">Minutos de leitura</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Quote className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalQuotes}</div>
              <div className="text-sm text-white/80">Citações marcantes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <User className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.authoredTexts}</div>
              <div className="text-sm text-white/80">Textos autorais</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Layers className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalSections}</div>
              <div className="text-sm text-white/80">Seções organizadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Themes Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-6 h-6 mr-2" />
            Temas Abordados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(themeStats).map(([theme, count]) => {
              const Icon = getThemeIcon(theme);
              const colorClass = getThemeColor(theme);
              return (
                <Card key={theme} className={`bg-gradient-to-br ${colorClass} text-white`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-6 h-6" />
                      <Badge className="bg-white/20 text-white border-white/30">
                        {count}
                      </Badge>
                    </div>
                    <h3 className="font-semibold capitalize text-lg">{theme}</h3>
                    <p className="text-sm text-white/80">
                      {count} {count === 1 ? 'texto' : 'textos'}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="w-6 h-6 mr-2" />
            Organização de Conteúdo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentSections.map((section) => (
              <Card key={section.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg text-blue-800">{section.title}</h4>
                      <Badge variant="outline" className="mt-1">
                        {section.textIds.length} textos
                      </Badge>
                    </div>
                    <Badge className={
                      section.placement === "journey-opener" ? "bg-green-100 text-green-700" :
                      section.placement === "core-content" ? "bg-purple-100 text-purple-700" :
                      section.placement === "vivencias" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }>
                      {section.placement === "journey-opener" ? "Abertura" :
                       section.placement === "core-content" ? "Núcleo" :
                       section.placement === "vivencias" ? "Vivências" :
                       "Fases"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium mb-1">Propósito:</p>
                    <p className="text-xs text-gray-700">{section.purpose}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Highlights */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800">
            <Star className="w-6 h-6 mr-2" />
            Destaques da Coleção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/50 p-4 rounded-lg">
              <h6 className="font-semibold text-amber-800 mb-2">🎯 Conceitos Únicos</h6>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Ma - O Vazio Japonês</li>
                <li>• Economia da Intenção</li>
                <li>• História das Três Portas</li>
                <li>• Praticante do Impossível</li>
              </ul>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <h6 className="font-semibold text-amber-800 mb-2">✍️ Textos Autorais</h6>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Carta de Lelo (Daniel Allegri)</li>
                <li>• Reflexões de Paulo de Souza</li>
                <li>• Manifesto "A Hora é Agora"</li>
                <li>• 5 Verdades que nos Ancoram</li>
              </ul>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <h6 className="font-semibold text-amber-800 mb-2">🎧 Sistema Imersivo</h6>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 4 modos de experiência</li>
                <li>• Narração profissional</li>
                <li>• Trilhas sonoras ambiente</li>
                <li>• Galeria visual inspiracional</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Production Ready */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Eye className="w-6 h-6 mr-2" />
            Pronto para Produção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-green-700">
              A biblioteca está completamente estruturada e pronta para a próxima fase de produção audiovisual com Marcela.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h6 className="font-semibold text-green-800">🎙️ Próximos Passos - Áudio</h6>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Gravação de narrações profissionais</li>
                  <li>• Produção de trilhas sonoras ambiente</li>
                  <li>• Sincronização com texto e imagens</li>
                  <li>• Testes de qualidade sonora</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h6 className="font-semibold text-green-800">📸 Próximos Passos - Visual</h6>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Seleção de imagens exclusivas</li>
                  <li>• Criação de capas emocionais</li>
                  <li>• Galeria inspiracional curada</li>
                  <li>• Integração visual completa</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Status:</strong> Sistema técnico 100% implementado. Placeholders organizados para substituição por conteúdo real. 
                Pronto para apresentação de terça-feira com investidores.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}