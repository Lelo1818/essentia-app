import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage, TexturedBackground } from "./image-system";
import { cn } from "@/lib/utils";
import { 
  TreePine, 
  Mountain, 
  Sun, 
  Wind, 
  Coffee, 
  BookOpen, 
  Heart, 
  Search,
  Sparkles,
  Eye
} from "lucide-react";

interface CoverTheme {
  id: string;
  title: string;
  description: string;
  category: "nature" | "cozy" | "symbolic";
  ageGroup: "universal" | "child" | "youth" | "adult";
  mood: string;
  src: string;
  alt: string;
  gradient: string;
  quote?: string;
}

export function CoverGallery({ onSelect }: { onSelect?: (cover: CoverTheme) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCover, setSelectedCover] = useState<string | null>(null);

  const coverThemes: CoverTheme[] = [
    // Natureza Viva
    {
      id: "forest-path",
      title: "Caminho na Floresta",
      description: "Trilha suave entre árvores douradas",
      category: "nature",
      ageGroup: "universal",
      mood: "contemplativo",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=85",
      alt: "Caminho sereno entre árvores com luz dourada",
      gradient: "bg-gradient-to-t from-green-900/70 via-green-600/30 to-amber-400/20",
      quote: "Cada passo revela uma nova descoberta"
    },
    {
      id: "mountain-sunrise",
      title: "Amanhecer nas Montanhas",
      description: "Picos iluminados pela primeira luz",
      category: "nature",
      ageGroup: "universal", 
      mood: "inspirador",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=85",
      alt: "Montanhas majestosas ao amanhecer",
      gradient: "bg-gradient-to-t from-orange-900/70 via-orange-500/30 to-yellow-300/20",
      quote: "Novos horizontes se abrem a cada amanhecer"
    },
    {
      id: "gentle-wind",
      title: "Vento Suave",
      description: "Campo de trigo dançando ao vento",
      category: "nature",
      ageGroup: "universal",
      mood: "tranquilo",
      src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&h=800&fit=crop&q=85",
      alt: "Campo dourado movendo-se com o vento",
      gradient: "bg-gradient-to-t from-amber-900/70 via-amber-500/30 to-yellow-200/20",
      quote: "O vento carrega sussurros de sabedoria"
    },
    {
      id: "sacred-tree",
      title: "Árvore Sagrada",
      description: "Carvalho centenário em luz mística",
      category: "nature",
      ageGroup: "universal",
      mood: "reverente",
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop&q=85",
      alt: "Árvore majestosa com luz filtrada",
      gradient: "bg-gradient-to-t from-emerald-900/70 via-emerald-600/30 to-lime-300/20",
      quote: "Raízes profundas, galhos que tocam o céu"
    },

    // Ambientes Acolhedores
    {
      id: "study-corner",
      title: "Cantinho de Estudos",
      description: "Mesa com livros, café e luz natural",
      category: "cozy",
      ageGroup: "universal",
      mood: "concentração",
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&q=85",
      alt: "Mesa de estudos aconchegante com livros e café",
      gradient: "bg-gradient-to-t from-amber-900/70 via-amber-600/30 to-orange-200/20",
      quote: "Conhecimento floresce em ambientes acolhedores"
    },
    {
      id: "library-nook",
      title: "Recanto da Biblioteca",
      description: "Poltrona confortável entre estantes",
      category: "cozy",
      ageGroup: "universal",
      mood: "contemplativo",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=85",
      alt: "Biblioteca aconchegante com poltrona e luz suave",
      gradient: "bg-gradient-to-t from-brown-900/70 via-brown-600/30 to-amber-200/20",
      quote: "Entre livros, encontramos mundos infinitos"
    },
    {
      id: "journal-table",
      title: "Mesa do Diário",
      description: "Caderno aberto com caneta e flores",
      category: "cozy",
      ageGroup: "universal",
      mood: "reflexivo",
      src: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=1200&h=800&fit=crop&q=85",
      alt: "Mesa com diário aberto e elementos delicados",
      gradient: "bg-gradient-to-t from-rose-900/70 via-rose-600/30 to-pink-200/20",
      quote: "Páginas em branco aguardam suas descobertas"
    },
    {
      id: "window-reading",
      title: "Leitura na Janela",
      description: "Pessoa lendo próxima à janela com luz natural",
      category: "cozy",
      ageGroup: "universal",
      mood: "sereno",
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&q=85",
      alt: "Momento de leitura junto à janela",
      gradient: "bg-gradient-to-t from-blue-900/70 via-blue-600/30 to-sky-200/20",
      quote: "A luz da janela ilumina novos entendimentos"
    },

    // Cenas Simbólicas Universais
    {
      id: "explorer-path",
      title: "Explorador do Caminho",
      description: "Figura contemplando trilha à frente",
      category: "symbolic",
      ageGroup: "universal",
      mood: "aventureiro",
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=85",
      alt: "Silhueta observando caminho que se estende",
      gradient: "bg-gradient-to-t from-purple-900/70 via-purple-600/30 to-violet-200/20",
      quote: "Cada jornada começa com um primeiro passo"
    },
    {
      id: "discovery-moment",
      title: "Momento de Descoberta",
      description: "Pessoa jovem em gesto de eureka",
      category: "symbolic",
      ageGroup: "universal",
      mood: "inspiração",
      src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=800&fit=crop&q=85",
      alt: "Momento de insight e descoberta",
      gradient: "bg-gradient-to-t from-indigo-900/70 via-indigo-600/30 to-blue-200/20",
      quote: "A descoberta transforma quem somos"
    },
    {
      id: "concentration-flow",
      title: "Estado de Flow",
      description: "Pessoa concentrada em atividade criativa",
      category: "symbolic",
      ageGroup: "universal",
      mood: "foco",
      src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&q=85",
      alt: "Estado profundo de concentração criativa",
      gradient: "bg-gradient-to-t from-teal-900/70 via-teal-600/30 to-cyan-200/20",
      quote: "No foco profundo, encontramos nossa essência"
    },
    {
      id: "growth-emergence",
      title: "Emergência do Crescimento",
      description: "Planta brotando entre pedras",
      category: "symbolic",
      ageGroup: "universal",
      mood: "crescimento",
      src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&q=85",
      alt: "Vida emergindo através de obstáculos",
      gradient: "bg-gradient-to-t from-emerald-900/70 via-emerald-600/30 to-green-200/20",
      quote: "A vida sempre encontra um caminho"
    }
  ];

  const categories = [
    { id: "all", label: "Todas", icon: Eye },
    { id: "nature", label: "Natureza", icon: TreePine },
    { id: "cozy", label: "Acolhedor", icon: Coffee },
    { id: "symbolic", label: "Simbólico", icon: Sparkles }
  ];

  const filteredCovers = selectedCategory === "all" 
    ? coverThemes 
    : coverThemes.filter(cover => cover.category === selectedCategory);

  const handleCoverSelect = (cover: CoverTheme) => {
    setSelectedCover(cover.id);
    onSelect?.(cover);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Covers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCovers.map((cover) => (
          <Card
            key={cover.id}
            className={cn(
              "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl",
              selectedCover === cover.id && "ring-2 ring-blue-500 shadow-lg"
            )}
            onClick={() => handleCoverSelect(cover)}
          >
            <div className="relative aspect-video">
              <OptimizedImage
                src={cover.src}
                alt={cover.alt}
                fill
                className="group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Gradient Overlay */}
              <div className={cn("absolute inset-0", cover.gradient)} />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">
                    {cover.category === "nature" ? "Natureza" : 
                     cover.category === "cozy" ? "Acolhedor" : "Simbólico"}
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    Universal
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-lg">{cover.title}</h3>
                  <p className="text-white/90 text-sm">{cover.description}</p>
                  {cover.quote && (
                    <p className="text-white/80 text-xs italic">"{cover.quote}"</p>
                  )}
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedCover === cover.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Mood:</span>
                    <Badge variant="secondary" className="text-xs">
                      {cover.mood}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant={selectedCover === cover.id ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCoverSelect(cover);
                  }}
                >
                  {selectedCover === cover.id ? "Selecionada" : "Selecionar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Section */}
      {selectedCover && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h4 className="text-lg font-semibold text-blue-800">Capa Selecionada</h4>
              {(() => {
                const cover = coverThemes.find(c => c.id === selectedCover);
                return cover ? (
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-800">{cover.title}</h5>
                    <p className="text-sm text-gray-600">{cover.description}</p>
                    {cover.quote && (
                      <p className="text-sm italic text-blue-700">"{cover.quote}"</p>
                    )}
                    <div className="flex justify-center space-x-4 text-xs">
                      <span className="bg-white px-2 py-1 rounded">
                        {cover.category === "nature" ? "🌿 Natureza" : 
                         cover.category === "cozy" ? "☕ Acolhedor" : "✨ Simbólico"}
                      </span>
                      <span className="bg-white px-2 py-1 rounded">
                        🎭 {cover.mood}
                      </span>
                      <span className="bg-white px-2 py-1 rounded">
                        👥 Universal
                      </span>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Componente para integração com as fases do Purpose
export function PhaseCover({ 
  phase, 
  customCover 
}: { 
  phase: string; 
  customCover?: CoverTheme;
}) {
  const defaultCovers: Record<string, string> = {
    clareira: "forest-path",
    respiracao: "mountain-sunrise", 
    rituais: "sacred-tree",
    portais: "discovery-moment",
    chamado: "growth-emergence",
    transicao: "explorer-path",
    bemestar: "concentration-flow",
    encerramento: "window-reading",
    sensores: "study-corner",
    engajamento: "library-nook"
  };

  const coverThemes: CoverTheme[] = [
    {
      id: "forest-path",
      title: "Caminho na Floresta",
      description: "Trilha suave entre árvores douradas",
      category: "nature",
      ageGroup: "universal",
      mood: "contemplativo",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=85",
      alt: "Caminho sereno entre árvores com luz dourada",
      gradient: "bg-gradient-to-t from-green-900/70 via-green-600/30 to-amber-400/20",
      quote: "Cada passo revela uma nova descoberta"
    }
    // ... outros covers já definidos acima
  ];

  const cover = customCover || coverThemes.find(c => c.id === defaultCovers[phase]) || coverThemes[0];

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
      <OptimizedImage
        src={cover.src}
        alt={cover.alt}
        fill
        priority
      />
      <div className={cn("absolute inset-0", cover.gradient)} />
      <TexturedBackground texture="paper" opacity={0.1} />
      
      <div className="absolute inset-0 p-6 flex items-end">
        <div className="space-y-2">
          <h2 className="text-white text-2xl font-bold">{cover.title}</h2>
          <p className="text-white/90">{cover.description}</p>
          {cover.quote && (
            <p className="text-white/80 italic text-sm">"{cover.quote}"</p>
          )}
        </div>
      </div>
    </div>
  );
}