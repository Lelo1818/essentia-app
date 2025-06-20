import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Eye } from "lucide-react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  placeholder?: "blur" | "empty";
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  overlay?: boolean;
  gradient?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  placeholder = "empty",
  quality = 85,
  onLoad,
  overlay = false,
  gradient
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Placeholder durante desenvolvimento - será substituído por imagens reais
  const placeholderSrc = src.startsWith('[') ? generatePlaceholder(src) : src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Imagem será adicionada</p>
          </div>
        </div>
      ) : (
        <img
          src={placeholderSrc}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            fill ? "w-full h-full object-cover" : "max-w-full h-auto",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
        />
      )}

      {overlay && (
        <div className={cn(
          "absolute inset-0",
          gradient || "bg-gradient-to-t from-black/60 via-transparent to-transparent"
        )} />
      )}
    </div>
  );
}

// Componente para capas emocionais das fases
export function EmotionalCover({ 
  phase, 
  className 
}: { 
  phase: string; 
  className?: string;
}) {
  const covers: Record<string, { src: string; alt: string; gradient: string }> = {
    clareira: {
      src: "[IMAGEM_TRILHA_FLORESTA]",
      alt: "Trilha serena na floresta",
      gradient: "bg-gradient-to-t from-green-900/80 via-green-600/40 to-transparent"
    },
    respiracao: {
      src: "[IMAGEM_AMANHECER_MONTANHA]",
      alt: "Amanhecer nas montanhas",
      gradient: "bg-gradient-to-t from-orange-900/80 via-orange-600/40 to-transparent"
    },
    rituais: {
      src: "[IMAGEM_FOGUEIRA_NOITE]",
      alt: "Fogueira sob estrelas",
      gradient: "bg-gradient-to-t from-amber-900/80 via-amber-600/40 to-transparent"
    },
    portais: {
      src: "[IMAGEM_PORTAL_LUZ]",
      alt: "Portal de luz místico",
      gradient: "bg-gradient-to-t from-purple-900/80 via-purple-600/40 to-transparent"
    },
    chamado: {
      src: "[IMAGEM_CORACAO_NATUREZA]",
      alt: "Coração da natureza",
      gradient: "bg-gradient-to-t from-pink-900/80 via-pink-600/40 to-transparent"
    },
    transicao: {
      src: "[IMAGEM_METAMORFOSE]",
      alt: "Borboleta em transformação",
      gradient: "bg-gradient-to-t from-blue-900/80 via-blue-600/40 to-transparent"
    },
    bemestar: {
      src: "[IMAGEM_EQUILIBRIO_ZEN]",
      alt: "Pedras em equilíbrio zen",
      gradient: "bg-gradient-to-t from-teal-900/80 via-teal-600/40 to-transparent"
    },
    encerramento: {
      src: "[IMAGEM_ANCORA_DOURADA]",
      alt: "Âncora dourada brilhante",
      gradient: "bg-gradient-to-t from-amber-900/80 via-amber-600/40 to-transparent"
    }
  };

  const cover = covers[phase] || covers.clareira;

  return (
    <OptimizedImage
      src={cover.src}
      alt={cover.alt}
      className={cn("rounded-lg", className)}
      fill
      overlay
      gradient={cover.gradient}
      priority
    />
  );
}

// Componente para ícones suaves
export function SoftIcon({ 
  type, 
  size = "md" 
}: { 
  type: string; 
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const icons: Record<string, string> = {
    heart: "[ICONE_CORACAO_SUAVE]",
    tree: "[ICONE_ARVORE_SUAVE]", 
    flame: "[ICONE_CHAMA_SUAVE]",
    water: "[ICONE_AGUA_SUAVE]",
    air: "[ICONE_AR_SUAVE]",
    earth: "[ICONE_TERRA_SUAVE]",
    star: "[ICONE_ESTRELA_SUAVE]",
    moon: "[ICONE_LUA_SUAVE]"
  };

  return (
    <OptimizedImage
      src={icons[type] || icons.heart}
      alt={`Ícone ${type}`}
      className={sizes[size]}
    />
  );
}

// Componente para fundos texturizados
export function TexturedBackground({ 
  texture = "paper", 
  opacity = 0.05,
  className 
}: { 
  texture?: string; 
  opacity?: number;
  className?: string;
}) {
  const textures: Record<string, string> = {
    paper: "[TEXTURA_PAPEL_ANTIGO]",
    fabric: "[TEXTURA_TECIDO_SUAVE]",
    water: "[TEXTURA_AGUA_ONDAS]",
    smoke: "[TEXTURA_FUMACA_SUTIL]",
    wood: "[TEXTURA_MADEIRA_CLARA]",
    stone: "[TEXTURA_PEDRA_LISA]"
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <OptimizedImage
        src={textures[texture] || textures.paper}
        alt="Textura de fundo"
        fill
        className="opacity-5"
        style={{ opacity }}
      />
    </div>
  );
}

// Sistema de galeria inspiracional
export function InspirationGallery({ 
  category = "nature" 
}: { 
  category?: string;
}) {
  const galleries: Record<string, Array<{ src: string; alt: string; quote?: string }>> = {
    nature: [
      {
        src: "[GALERIA_NATUREZA_1]",
        alt: "Floresta sagrada",
        quote: "A natureza é o templo onde encontramos nossa essência"
      },
      {
        src: "[GALERIA_NATUREZA_2]", 
        alt: "Rio cristalino",
        quote: "Como a água, fluímos em direção ao nosso destino"
      },
      {
        src: "[GALERIA_NATUREZA_3]",
        alt: "Céu estrelado",
        quote: "Somos feitos da mesma matéria das estrelas"
      }
    ],
    growth: [
      {
        src: "[GALERIA_CRESCIMENTO_1]",
        alt: "Semente germinando",
        quote: "Todo grande carvalho foi um dia uma pequena semente"
      },
      {
        src: "[GALERIA_CRESCIMENTO_2]",
        alt: "Borboleta emergindo",
        quote: "A transformação acontece quando decidimos voar"
      }
    ],
    wisdom: [
      {
        src: "[GALERIA_SABEDORIA_1]",
        alt: "Biblioteca antiga",
        quote: "Sabedoria é saber que sempre há mais para aprender"
      },
      {
        src: "[GALERIA_SABEDORIA_2]",
        alt: "Sábio meditando",
        quote: "As respostas que procuramos já estão dentro de nós"
      }
    ]
  };

  const images = galleries[category] || galleries.nature;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative group cursor-pointer">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            className="aspect-video rounded-lg group-hover:scale-105 transition-transform duration-300"
            fill
            overlay
          />
          {image.quote && (
            <div className="absolute inset-0 flex items-end p-4">
              <p className="text-white text-sm font-medium italic">
                "{image.quote}"
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Função helper para gerar placeholders durante desenvolvimento
function generatePlaceholder(placeholder: string): string {
  // Converte placeholders em URLs de imagens temporárias
  const placeholderMap: Record<string, string> = {
    "[IMAGEM_TRILHA_FLORESTA]": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    "[IMAGEM_AMANHECER_MONTANHA]": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "[IMAGEM_FOGUEIRA_NOITE]": "https://images.unsplash.com/photo-1507833423370-a126b89d394b?w=800&h=600&fit=crop",
    "[IMAGEM_PORTAL_LUZ]": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
    "[IMAGEM_CORACAO_NATUREZA]": "https://images.unsplash.com/photo-1502780402662-acc01917400e?w=800&h=600&fit=crop",
    "[IMAGEM_METAMORFOSE]": "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=800&h=600&fit=crop",
    "[IMAGEM_EQUILIBRIO_ZEN]": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "[IMAGEM_ANCORA_DOURADA]": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
  };

  return placeholderMap[placeholder] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";
}