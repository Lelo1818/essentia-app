import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, Star, Heart, Zap } from "lucide-react";

interface PulseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  pulseColor?: string;
}

export function PulseButton({ children, onClick, className, pulseColor = "bg-blue-400" }: PulseButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);
    onClick?.();
  };

  return (
    <button
      className={cn(
        "relative overflow-hidden transition-all duration-200 transform hover:scale-105",
        className
      )}
      onClick={handleClick}
    >
      {isPulsing && (
        <div
          className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-75",
            pulseColor
          )}
        />
      )}
      {children}
    </button>
  );
}

interface CounterAnimationProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function CounterAnimation({ value, duration = 1000, className, prefix = "", suffix = "" }: CounterAnimationProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / 16));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({ text, speed = 50, className, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={cn("relative", className)}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

interface ShakeElementProps {
  children: React.ReactNode;
  trigger: boolean;
  className?: string;
}

export function ShakeElement({ children, trigger, className }: ShakeElementProps) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  }, [trigger]);

  return (
    <div className={cn(
      "transition-transform duration-100",
      isShaking && "animate-bounce",
      className
    )}>
      {children}
    </div>
  );
}

interface GlowEffectProps {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export function GlowEffect({ children, glowColor = "blue", intensity = "medium", className }: GlowEffectProps) {
  const glowIntensity = {
    low: "shadow-lg",
    medium: "shadow-xl", 
    high: "shadow-2xl"
  };

  const glowColors = {
    blue: "shadow-blue-500/25",
    green: "shadow-green-500/25",
    purple: "shadow-purple-500/25",
    pink: "shadow-pink-500/25",
    yellow: "shadow-yellow-500/25"
  };

  return (
    <div className={cn(
      "transition-all duration-300 hover:shadow-2xl",
      glowIntensity[intensity],
      glowColors[glowColor as keyof typeof glowColors],
      "hover:scale-105",
      className
    )}>
      {children}
    </div>
  );
}

interface FloatingIconProps {
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
  className?: string;
}

export function FloatingIcon({ icon: Icon, delay = 0, className }: FloatingIconProps) {
  return (
    <div
      className={cn(
        "absolute animate-bounce",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "2s"
      }}
    >
      <Icon className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
    </div>
  );
}

interface SuccessCheckmarkProps {
  visible: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SuccessCheckmark({ visible, size = "md", className }: SuccessCheckmarkProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  if (!visible) return null;

  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-green-500 text-white animate-bounce",
      sizes[size],
      className
    )}>
      <Check className={cn(sizes[size], "animate-pulse")} />
    </div>
  );
}

interface HeartBeatProps {
  active: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function HeartBeat({ active, children, className }: HeartBeatProps) {
  return (
    <div className={cn(
      "transition-transform duration-200",
      active && "animate-pulse scale-110",
      className
    )}>
      {children || <Heart className="w-6 h-6 text-red-500" />}
    </div>
  );
}

export function SparkleEffect({ trigger, children, className }: { trigger: boolean; children: React.ReactNode; className?: string }) {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }
  }, [trigger]);

  return (
    <div className={cn("relative", className)}>
      {children}
      {showSparkles && (
        <>
          <FloatingIcon icon={Star} delay={0} className="top-0 left-0" />
          <FloatingIcon icon={Zap} delay={200} className="top-0 right-0" />
          <FloatingIcon icon={Star} delay={400} className="bottom-0 left-0" />
          <FloatingIcon icon={Zap} delay={600} className="bottom-0 right-0" />
        </>
      )}
    </div>
  );
}