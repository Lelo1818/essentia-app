import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FEMEValues {
  fisico: number;
  energetico: number;
  mental: number;
  espiritual: number;
}

interface FEMECompassProps {
  values?: FEMEValues;
  coherence?: number;
  onChange?: (values: Partial<FEMEValues>) => void;
  onHarmonize?: () => void;
}

interface Microcopy {
  fisico: string[];
  energetico: string[];
  mental: string[];
  espiritual: string[];
}

export function FEMECompass({
  values = { fisico: 6, energetico: 7, mental: 5, espiritual: 6 },
  coherence = 68,
  onChange,
  onHarmonize
}: FEMECompassProps) {
  const [microcopy, setMicrocopy] = useState<Microcopy | null>(null);

  useEffect(() => {
    fetch('/data/feme_microcopy.json')
      .then(res => res.json())
      .then(data => setMicrocopy(data))
      .catch(err => console.error('Error loading FEME microcopy:', err));
  }, []);

  const getRandomTip = (category: keyof Microcopy): string => {
    if (!microcopy) return '';
    const tips = microcopy[category];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const scale = (n: number) => Math.max(0, Math.min(1, n / 10));
  const s = {
    "--kFisico": String(0.8 + 0.4 * scale(values.fisico)),
    "--kEnergetico": String(0.8 + 0.4 * scale(values.energetico)),
    "--kMental": String(0.8 + 0.4 * scale(values.mental)),
    "--kEspiritual": String(0.8 + 0.4 * scale(values.espiritual)),
  } as React.CSSProperties;

  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-3 md:p-4 shadow-lg">
      <div className="relative grid md:grid-cols-2 gap-4 md:gap-6 items-stretch">
        <div className="relative min-h-[280px] md:min-h-[320px]">
          <TooltipProvider>
            <Petals style={s} microcopy={microcopy} getRandomTip={getRandomTip} />
          </TooltipProvider>
          <CenterSeal value={coherence} onHarmonize={onHarmonize} />
          <Labels />
        </div>
        <div className="p-3 md:p-6 flex flex-col justify-center gap-3 md:gap-4">
          <h3 className="text-xl md:text-3xl font-bold text-purple-900">
            Minha Bússola Hoje
          </h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3 text-sm">
            <Meter label="Físico" value={values.fisico} color="emerald" />
            <Meter label="Energético" value={values.energetico} color="amber" />
            <Meter label="Mental" value={values.mental} color="blue" />
            <Meter label="Espiritual" value={values.espiritual} color="purple" />
          </div>
          <div className="text-xs md:text-sm text-gray-700 bg-white/60 p-2 md:p-3 rounded-lg">
            <span className="font-semibold">Selo de Coerência: </span>
            <span className="text-purple-600 font-bold">{coherence}%</span>
            {coherence < 70 && (
              <span className="italic text-gray-600 block md:inline"> — a emoção ainda não acompanhou a intenção</span>
            )}
            {coherence >= 70 && coherence < 85 && (
              <span className="italic text-gray-600 block md:inline"> — você está no caminho do alinhamento</span>
            )}
            {coherence >= 85 && (
              <span className="italic text-gray-600 block md:inline"> — harmonia profunda alcançada</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="p-2 md:p-3 rounded-lg border border-gray-200 bg-white/80 shadow-sm" data-testid={`meter-${label.toLowerCase()}`}>
      <div className="flex justify-between mb-1 md:mb-2">
        <span className="font-medium text-gray-700 text-xs md:text-sm">{label}</span>
        <span className="font-bold text-gray-900 text-xs md:text-sm">{value}/10</span>
      </div>
      <div className="h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-1.5 md:h-2 ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-500`}
          style={{ width: `${Math.max(0, Math.min(10, value)) * 10}%` }}
        />
      </div>
    </div>
  );
}

function Labels() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none text-gray-800 font-medium">
      <div className="absolute left-1/2 -translate-x-1/2 top-2 text-sm">Físico</div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">Energético</div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-sm">Mental</div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">Espiritual</div>
    </div>
  );
}

function CenterSeal({ value, onHarmonize }: { value: number; onHarmonize?: () => void }) {
  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-purple-300 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center shadow-xl"
      data-testid="feme-center-seal"
    >
      <div className="text-xs md:text-sm text-gray-600 font-medium">Coerência</div>
      <div className="text-2xl md:text-3xl font-bold text-purple-600">{value}%</div>
      {onHarmonize && (
        <Button
          onClick={onHarmonize}
          className="mt-1 md:mt-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-[10px] md:text-xs px-2 py-1 md:px-4 md:py-2 shadow-md"
          size="sm"
          data-testid="button-harmonize"
        >
          Harmonizar
        </Button>
      )}
    </div>
  );
}

function Petals({ 
  style, 
  microcopy, 
  getRandomTip 
}: { 
  style?: React.CSSProperties; 
  microcopy: Microcopy | null;
  getRandomTip: (category: keyof Microcopy) => string;
}) {
  const petals = [
    { name: 'fisico', rotation: 0, color: '#10b981', label: 'Físico' },
    { name: 'energetico', rotation: 90, color: '#f59e0b', label: 'Energético' },
    { name: 'mental', rotation: 180, color: '#3b82f6', label: 'Mental' },
    { name: 'espiritual', rotation: 270, color: '#8b5cf6', label: 'Espiritual' }
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" style={style} aria-hidden>
        <defs>
          <radialGradient id="gFisico" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </radialGradient>
          <radialGradient id="gEnergetico" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>
          <radialGradient id="gMental" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </radialGradient>
          <radialGradient id="gEspiritual" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>
        </defs>
        <g transform="translate(300,300)">
          <g opacity="0.8">
            {petals.map((petal, idx) => (
              <g 
                key={petal.name} 
                transform={`rotate(${petal.rotation}) scale(var(--k${petal.name.charAt(0).toUpperCase() + petal.name.slice(1)},1))`}
              >
                <path
                  d={idx % 2 === 0 
                    ? "M0,-160 C55,-160 100,-115 100,-62 C100,0 55,34 0,34 C-55,34 -100,0 -100,-62 C-100,-115 -55,-160 0,-160 Z"
                    : "M160,0 C160,-55 115,-100 62,-100 C0,-100 -34,-55 -34,0 C-34,55 0,100 62,100 C115,100 160,55 160,0 Z"
                  }
                  fill={`url(#g${petal.name.charAt(0).toUpperCase() + petal.name.slice(1)})`}
                  fillOpacity="0.3"
                  stroke={petal.color}
                  strokeOpacity="0.5"
                  strokeWidth="2"
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
      
      {/* Interactive tooltip areas */}
      {petals.map((petal) => {
        const positions = {
          fisico: { top: '5%', left: '50%', transform: 'translateX(-50%)' },
          energetico: { top: '50%', right: '5%', transform: 'translateY(-50%)' },
          mental: { bottom: '5%', left: '50%', transform: 'translateX(-50%)' },
          espiritual: { top: '50%', left: '5%', transform: 'translateY(-50%)' }
        };
        
        const position = positions[petal.name as keyof typeof positions];
        
        return (
          <Tooltip key={petal.name}>
            <TooltipTrigger asChild>
              <div
                className="absolute w-16 h-16 rounded-full cursor-help hover:bg-white/10 transition-colors flex items-center justify-center"
                style={position}
                data-testid={`tooltip-trigger-${petal.name}`}
              >
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-purple-900 text-white border-purple-600 max-w-xs"
              data-testid={`tooltip-content-${petal.name}`}
            >
              <p className="font-medium mb-1">{petal.label}</p>
              <p className="text-sm text-purple-100">
                {microcopy ? getRandomTip(petal.name as keyof Microcopy) : `Dica de ${petal.label}`}
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
