import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

interface AruanGuidanceProps {
  message: string;
  nextStepLabel: string;
  nextStepPath: string;
  onClose?: () => void;
}

export function AruanGuidance({ 
  message, 
  nextStepLabel, 
  nextStepPath,
  onClose 
}: AruanGuidanceProps) {
  const handleNextStep = () => {
    window.location.href = nextStepPath;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      <Card className="max-w-md w-full bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-purple-500/30 shadow-2xl">
        <CardContent className="p-6 space-y-6">
          {/* Aruan Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-amber-400/30 blur-xl animate-pulse" />
            </div>
          </div>

          {/* Nome do Aruan */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-400 mb-1">Aruan</h3>
            <p className="text-sm text-purple-200">Guia Ancestral</p>
          </div>

          {/* Mensagem */}
          <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
            <p className="text-white text-center leading-relaxed">
              {message}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleNextStep}
              size="lg"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg"
              data-testid="button-next-step"
            >
              {nextStepLabel}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            {onClose && (
              <Button
                onClick={onClose}
                size="lg"
                variant="ghost"
                className="w-full text-purple-200 hover:text-white hover:bg-white/10"
                data-testid="button-close-guidance"
              >
                Continuar sozinho
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
