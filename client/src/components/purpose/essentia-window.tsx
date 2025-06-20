import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type EssentiaWindow, getEssentiaWindow } from "@/data/essentia-content";
import { cn } from "@/lib/utils";
import { 
  Wind, 
  Leaf, 
  Flame, 
  Droplets, 
  Volume2,
  VolumeX,
  X,
  Mountain,
  TreePine,
  Sunrise,
  Compass,
  Sparkles
} from "lucide-react";

interface EssentiaWindowProps {
  trigger: EssentiaWindow["trigger"];
  onClose?: () => void;
  autoClose?: boolean;
}

export function EssentiaWindowComponent({ trigger, onClose, autoClose = true }: EssentiaWindowProps) {
  const [window, setWindow] = useState<EssentiaWindow | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const essentiaWindow = getEssentiaWindow(trigger);
    if (essentiaWindow) {
      setWindow(essentiaWindow);
      setTimeRemaining(essentiaWindow.duration);
      setIsVisible(true);
    }
  }, [trigger]);

  useEffect(() => {
    if (!isVisible || !window || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (autoClose) {
            handleClose();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, window, timeRemaining, autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  if (!window || !isVisible) {
    return null;
  }

  const soundIcons = {
    wind: Wind,
    leaves: Leaf,
    fire: Flame,
    water: Droplets,
    silence: VolumeX
  };

  const imageIcons = {
    path: Compass,
    sky: Sunrise,
    seed: Sparkles,
    mountain: Mountain,
    forest: TreePine
  };

  const SoundIcon = soundIcons[window.sound];
  const ImageIcon = imageIcons[window.image];

  const backgroundGradients = {
    path: "bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50",
    sky: "bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-50",
    seed: "bg-gradient-to-br from-green-100 via-emerald-50 to-lime-50",
    mountain: "bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-50",
    forest: "bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50"
  };

  const progressValue = ((window.duration - timeRemaining) / window.duration) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className={cn(
        "w-full max-w-md mx-4 border-2 border-white/20 shadow-2xl transform transition-all duration-300",
        backgroundGradients[window.image],
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}>
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            {/* Close Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Visual Icon */}
            <div className="w-20 h-20 mx-auto bg-white/30 rounded-full flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-gray-700" />
            </div>

            {/* Phrase */}
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800 leading-relaxed italic">
                "{window.phrase}"
              </p>
            </div>

            {/* Sound Indicator */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
              >
                <SoundIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600 capitalize">
                  {window.sound === "silence" ? "Silêncio" : window.sound}
                </span>
                {soundEnabled ? (
                  <Volume2 className="w-3 h-3 text-gray-600" />
                ) : (
                  <VolumeX className="w-3 h-3 text-gray-600" />
                )}
              </button>
            </div>

            {/* Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Momento Essentia</span>
                <span>{timeRemaining}s</span>
              </div>
              <Progress 
                value={progressValue} 
                className="h-2 bg-white/30"
              />
            </div>

            {/* Action Button */}
            {!autoClose && (
              <Button
                onClick={handleClose}
                className="w-full bg-white/40 hover:bg-white/60 text-gray-800 border border-white/50"
                variant="outline"
              >
                Continuar
              </Button>
            )}

            {/* Breathing Cue */}
            <div className="text-xs text-gray-600 opacity-75">
              Respire profundamente e permita que este momento te toque
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook para gerenciar janelas Essentia
export function useEssentiaWindows() {
  const [activeWindow, setActiveWindow] = useState<EssentiaWindow["trigger"] | null>(null);

  const openWindow = (trigger: EssentiaWindow["trigger"]) => {
    setActiveWindow(trigger);
  };

  const closeWindow = () => {
    setActiveWindow(null);
  };

  return {
    activeWindow,
    openWindow,
    closeWindow
  };
}