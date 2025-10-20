import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface PortalUauProps {
  videoSrc: string;
  question: string;
  answer: string;
  cta?: string;
  onDone?: () => void;
}

export function PortalUau({ 
  videoSrc, 
  question, 
  answer, 
  cta = "Começar", 
  onDone 
}: PortalUauProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(err => {
      console.log('Autoplay prevented:', err);
    });
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 min-h-[600px]">
      <div className="grid md:grid-cols-2 h-full">
        {/* Video Section */}
        <div className="relative overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            data-testid="portal-video"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/20 to-purple-900/60" />
        </div>

        {/* Content Section */}
        <div className="relative flex flex-col justify-center p-8 md:p-12 text-white">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Portal UAU</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" data-testid="portal-question">
            {question}
          </h2>

          {showAnswer ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-lg md:text-xl text-purple-100 leading-relaxed" data-testid="portal-answer">
                {answer}
              </p>
              
              {onDone && (
                <Button
                  onClick={onDone}
                  className="bg-white text-purple-900 hover:bg-purple-100 font-semibold px-8 py-6 text-lg shadow-xl"
                  size="lg"
                  data-testid="button-portal-cta"
                >
                  {cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setShowAnswer(true)}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-8 py-6 text-lg self-start"
              size="lg"
              data-testid="button-reveal-answer"
            >
              Revelar resposta
            </Button>
          )}

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
}
