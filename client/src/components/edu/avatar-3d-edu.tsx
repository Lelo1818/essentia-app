import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Avatar3DEduProps {
  knowledgeLevel: number; // 0-100
  environment: "library" | "laboratory" | "forest" | "space" | "quantum";
  isActive: boolean;
  className?: string;
}

export default function Avatar3DEdu({ knowledgeLevel, environment, isActive, className }: Avatar3DEduProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [time, setTime] = useState(0);

  const environments = {
    library: {
      bgColor: "#2d1810",
      accentColor: "#8b4513",
      particleColor: "#ffd700",
      description: "Biblioteca Ancestral"
    },
    laboratory: {
      bgColor: "#0f1419",
      accentColor: "#00bcd4",
      particleColor: "#4fc3f7",
      description: "Laboratório Científico"
    },
    forest: {
      bgColor: "#1a3328",
      accentColor: "#4caf50",
      particleColor: "#81c784",
      description: "Floresta do Conhecimento"
    },
    space: {
      bgColor: "#0a0a1a",
      accentColor: "#9c27b0",
      particleColor: "#e1bee7",
      description: "Cosmos Infinito"
    },
    quantum: {
      bgColor: "#1a0a2e",
      accentColor: "#ff6b35",
      particleColor: "#ffab91",
      description: "Dimensão Quântica"
    }
  };

  const currentEnv = environments[environment];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      setTime(prev => prev + 0.016);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, currentEnv.bgColor + "aa");
      gradient.addColorStop(1, currentEnv.bgColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 40;

      // Draw knowledge aura
      const auraIntensity = knowledgeLevel / 100;
      const auraRadius = baseRadius + 20 + Math.sin(time * 2) * 5;
      
      const auraGradient = ctx.createRadialGradient(
        centerX, centerY, baseRadius,
        centerX, centerY, auraRadius
      );
      auraGradient.addColorStop(0, currentEnv.accentColor + Math.floor(auraIntensity * 100).toString(16));
      auraGradient.addColorStop(1, currentEnv.accentColor + "00");
      
      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw main avatar sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = currentEnv.accentColor;
      ctx.fill();

      // Draw knowledge particles
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.5;
        const radius = baseRadius + 25 + Math.sin(time * 3 + i) * 10;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 3 + Math.sin(time * 2 + i) * 2, 0, Math.PI * 2);
        ctx.fillStyle = currentEnv.particleColor;
        ctx.fill();
      }

      // Draw knowledge symbols based on environment
      if (environment === "library") {
        // Draw books
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2 + time * 0.3;
          const radius = baseRadius + 35;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          ctx.fillStyle = "#8b4513";
          ctx.fillRect(x - 4, y - 6, 8, 12);
          ctx.fillStyle = "#ffd700";
          ctx.fillRect(x - 3, y - 5, 6, 2);
        }
      } else if (environment === "laboratory") {
        // Draw molecules
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + time * 0.4;
          const radius = baseRadius + 30;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#00bcd4";
          ctx.fill();
          
          // Connect with lines
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = "#4fc3f7";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Knowledge level indicator
      const levelText = `${Math.floor(knowledgeLevel)}%`;
      ctx.font = "14px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(levelText, centerX, centerY + 5);

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [knowledgeLevel, environment, isActive, currentEnv, time]);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="rounded-full border-2 border-blue-500/30"
      />
      
      {/* Environment indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="bg-gray-900/90 text-white px-3 py-1 rounded-full text-xs mt-2">
          {currentEnv.description}
        </div>
      </div>
      
      {/* Knowledge progress */}
      <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
        Nível {Math.floor(knowledgeLevel / 20) + 1}
      </div>
    </div>
  );
}