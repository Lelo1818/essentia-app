import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface VideoAvatarProps {
  videoUrl?: string;
  fallbackImage?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  onComplete?: () => void;
  aspectRatio?: "1:1" | "9:16" | "16:9" | "4:3";
}

export function VideoAvatar({
  videoUrl,
  fallbackImage,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  className = "",
  onComplete,
  aspectRatio = "1:1"
}: VideoAvatarProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectRatioClasses = {
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]"
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      // Toca tambor tribal quando avatar carrega
      soundManager.play('tribal_drum');
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Se não tem vídeo, mostra fallback
  if (!videoUrl) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]} ${className}`}>
        {fallbackImage ? (
          <img 
            src={fallbackImage} 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <div className="text-white text-4xl font-bold">🧘</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${aspectRatioClasses[aspectRatio]} ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        className="w-full h-full object-cover"
        data-testid="video-avatar"
      />

      {/* Play/Pause overlay (se não tem controls nativos) */}
      {!controls && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
          data-testid="button-toggle-play"
        >
          <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-gray-900" />
            ) : (
              <Play className="w-6 h-6 text-gray-900" />
            )}
          </div>
        </button>
      )}
    </div>
  );
}

// Componente específico para Avatar de Boas-vindas
export function WelcomeAvatar({ 
  videoUrl, 
  fallbackImage 
}: { 
  videoUrl?: string; 
  fallbackImage?: string; 
}) {
  return (
    <VideoAvatar
      videoUrl={videoUrl}
      fallbackImage={fallbackImage}
      autoplay={false}
      loop={false}
      muted={false}
      controls={false}
      aspectRatio="1:1"
      className="w-32 h-32 mx-auto shadow-2xl border-4 border-purple-500"
    />
  );
}

// Componente específico para AI Coach Avatar
export function CoachAvatar({ 
  videoUrl, 
  fallbackImage,
  isCompact = false
}: { 
  videoUrl?: string; 
  fallbackImage?: string;
  isCompact?: boolean;
}) {
  return (
    <VideoAvatar
      videoUrl={videoUrl}
      fallbackImage={fallbackImage}
      autoplay={false}
      loop={true}
      muted={true}
      controls={false}
      aspectRatio="1:1"
      className={`${isCompact ? 'w-16 h-16' : 'w-24 h-24'} shadow-lg border-2 border-purple-300`}
    />
  );
}

// Componente específico para introdução do Portal UAU
export function PortalIntroAvatar({ 
  videoUrl, 
  fallbackImage,
  onComplete
}: { 
  videoUrl?: string; 
  fallbackImage?: string;
  onComplete?: () => void;
}) {
  return (
    <VideoAvatar
      videoUrl={videoUrl}
      fallbackImage={fallbackImage}
      autoplay={true}
      loop={false}
      muted={false}
      controls={true}
      aspectRatio="16:9"
      className="w-full max-w-2xl mx-auto shadow-2xl"
      onComplete={onComplete}
    />
  );
}
