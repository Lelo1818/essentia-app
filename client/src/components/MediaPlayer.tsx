import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { soundManager } from '@/lib/sound';

interface MediaPlayerProps {
  assetKey: string;
  title?: string;
  posterUrl?: string;
  videoUrl?: string;
  onComplete?: () => void;
  onClose?: () => void;
}

export function MediaPlayer({ 
  assetKey, 
  title = 'Portal do Despertar',
  posterUrl = 'https://placehold.co/1280x720/6366f1/white?text=Portal+do+Despertar',
  videoUrl,
  onComplete,
  onClose
}: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasReportedQuartile, setHasReportedQuartile] = useState({
    q25: false,
    q50: false,
    q75: false,
    complete: false,
  });
  const [showCTA, setShowCTA] = useState(false);

  const trackEvent = (eventType: string, meta: Record<string, any> = {}) => {
    fetch('/api/media/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assetKey,
        eventType,
        meta: {
          ...meta,
          timestamp: Date.now(),
        },
      }),
    }).catch(err => console.debug('Media event tracking failed:', err));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      trackEvent('pause', { progress });
      soundManager.play('ui_click');
    } else {
      videoRef.current.play();
      trackEvent('play', { progress });
      soundManager.play('ui_click');
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    soundManager.play('ui_click');
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
    soundManager.play('ui_click');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);

      // Track quartiles
      if (currentProgress >= 25 && !hasReportedQuartile.q25) {
        trackEvent('quartile_25');
        setHasReportedQuartile(prev => ({ ...prev, q25: true }));
      }
      if (currentProgress >= 50 && !hasReportedQuartile.q50) {
        trackEvent('quartile_50');
        setHasReportedQuartile(prev => ({ ...prev, q50: true }));
      }
      if (currentProgress >= 75 && !hasReportedQuartile.q75) {
        trackEvent('quartile_75');
        setHasReportedQuartile(prev => ({ ...prev, q75: true }));
      }
    };

    const handleEnded = () => {
      if (!hasReportedQuartile.complete) {
        trackEvent('complete');
        setHasReportedQuartile(prev => ({ ...prev, complete: true }));
        soundManager.play('ui_success');
        setShowCTA(true);
        onComplete?.();
      }
    };

    const handleError = (e: Event) => {
      trackEvent('error', { error: (e as any).message || 'Unknown error' });
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [hasReportedQuartile, onComplete]);

  const handleCTAClick = (cta: string) => {
    trackEvent('cta_clicked', { cta, timeAfterComplete: Date.now() });
    soundManager.play('ui_click');
    
    if (cta === 'feme_checkin') {
      window.location.href = '/purpose';
    }
  };

  return (
    <div className="relative w-full lg:max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-contain"
        poster={posterUrl}
        src={videoUrl}
        playsInline
        data-testid="video-player"
      />

      {/* Close Button (Top Right) */}
      {onClose && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            data-testid="button-close-video"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={toggleMute}
              data-testid="button-mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <span className="text-white text-sm">
              {title}
            </span>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={toggleFullscreen}
            data-testid="button-fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* CTA Overlay (shown after video completes) */}
      {showCTA && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Experiência Concluída!
            </h3>
            <p className="text-gray-300 mb-6">
              Continue sua jornada fazendo um check-in FEME e ganhe pontos
            </p>
            <div className="flex flex-col space-y-3">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => handleCTAClick('feme_checkin')}
                data-testid="button-cta-feme"
              >
                Fazer Check-in FEME
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={() => setShowCTA(false)}
                data-testid="button-cta-close"
              >
                Assistir Novamente
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
