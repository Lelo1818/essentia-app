import * as React from "react";
import { cn } from "@/lib/utils";

interface SmartLoadingProps {
  type?: "financial" | "educational" | "spiritual" | "general";
  message?: string;
  progress?: number;
  className?: string;
}

const loadingConfigs = {
  financial: {
    gradient: "from-blue-400 via-green-400 to-emerald-400",
    icon: "💰",
    messages: [
      "Analisando seus padrões financeiros...",
      "Identificando oportunidades de economia...",
      "Calculando projeções inteligentes...",
      "Sincronizando dados bancários..."
    ]
  },
  educational: {
    gradient: "from-blue-400 via-purple-400 to-indigo-400",
    icon: "🎓",
    messages: [
      "Personalizando trilhas de aprendizado...",
      "Adaptando conteúdo ao seu perfil...",
      "Carregando recursos educacionais...",
      "Preparando experiência imersiva..."
    ]
  },
  spiritual: {
    gradient: "from-purple-400 via-pink-400 to-violet-400",
    icon: "✨",
    messages: [
      "Conectando com sua essência interior...",
      "Preparando jornada de autoconhecimento...",
      "Sincronizando momentos de reflexão...",
      "Carregando sabedoria personalizada..."
    ]
  },
  general: {
    gradient: "from-gray-400 via-blue-400 to-purple-400",
    icon: "⚡",
    messages: [
      "Preparando experiência...",
      "Carregando componentes...",
      "Sincronizando dados...",
      "Finalizando configurações..."
    ]
  }
};

export function SmartLoading({ 
  type = "general", 
  message, 
  progress,
  className 
}: SmartLoadingProps) {
  const config = loadingConfigs[type];
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
  const [displayMessage, setDisplayMessage] = React.useState(message || config.messages[0]);

  React.useEffect(() => {
    if (!message) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % config.messages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [message, config.messages.length]);

  React.useEffect(() => {
    if (!message) {
      setDisplayMessage(config.messages[currentMessageIndex]);
    }
  }, [currentMessageIndex, message, config.messages]);

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-20 h-20 rounded-full border-4 border-gray-200 animate-spin">
          <div className={`w-full h-full rounded-full border-t-4 bg-gradient-to-r ${config.gradient} border-transparent`}></div>
        </div>
        
        {/* Inner Glow */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} opacity-20 blur-xl animate-pulse`}></div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-bounce">{config.icon}</span>
        </div>
      </div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${config.gradient} transition-all duration-500 ease-out`}
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          ></div>
        </div>
      )}

      {/* Message */}
      <div className="text-center max-w-md">
        <p className="text-lg font-medium text-gray-700 mb-2 transition-opacity duration-500">
          {displayMessage}
        </p>
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient} animate-pulse`}
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}