import { useEffect, useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
  show: boolean;
  title: string;
  description?: string;
  onComplete?: () => void;
}

export function SuccessAnimation({ show, title, description, onComplete }: SuccessAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (show) {
      setStage(1);
      
      const timer1 = setTimeout(() => setStage(2), 300);
      const timer2 = setTimeout(() => setStage(3), 800);
      const timer3 = setTimeout(() => {
        setStage(0);
        onComplete?.();
      }, 2500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [show, onComplete]);

  if (!show || stage === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
        <div className="relative mb-6">
          {/* Success checkmark with animation */}
          <div className={cn(
            "relative mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center transition-all duration-500",
            stage >= 2 ? "scale-100" : "scale-0"
          )}>
            <CheckCircle className={cn(
              "w-12 h-12 text-green-600 transition-all duration-300",
              stage >= 2 ? "scale-100" : "scale-0"
            )} />
          </div>

          {/* Sparkles animation */}
          {stage >= 3 && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={cn(
                    "absolute w-4 h-4 text-yellow-400 animate-ping",
                    i === 0 && "top-2 left-2",
                    i === 1 && "top-4 right-4",
                    i === 2 && "bottom-8 left-6",
                    i === 3 && "bottom-4 right-2",
                    i === 4 && "top-8 left-12",
                    i === 5 && "bottom-12 right-8"
                  )}
                  style={{
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <h3 className={cn(
          "text-xl font-bold text-gray-900 mb-2 transition-all duration-500",
          stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {title}
        </h3>

        {description && (
          <p className={cn(
            "text-gray-600 transition-all duration-500 delay-100",
            stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// Componente específico para sucesso de OCR
export function OCRSuccessAnimation({ show, extractedData, onComplete }: {
  show: boolean;
  extractedData: any;
  onComplete: () => void;
}) {
  return (
    <SuccessAnimation
      show={show}
      title="Documento Processado!"
      description={`${Object.keys(extractedData || {}).length} campos identificados com sucesso`}
      onComplete={onComplete}
    />
  );
}

// Componente para sucesso de salvamento
export function SaveSuccessAnimation({ show, amount, type, onComplete }: {
  show: boolean;
  amount?: number;
  type: string;
  onComplete: () => void;
}) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <SuccessAnimation
      show={show}
      title={`${type} Salvo!`}
      description={amount ? `${formatCurrency(amount)} adicionado com sucesso` : undefined}
      onComplete={onComplete}
    />
  );
}