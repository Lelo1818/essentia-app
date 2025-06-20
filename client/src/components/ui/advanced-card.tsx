import * as React from "react";
import { cn } from "@/lib/utils";
import { useMouseTracker, useIntersectionObserver } from "@/hooks/useAdvancedAnimations";

interface AdvancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "interactive";
  glow?: boolean;
  hover3d?: boolean;
}

const AdvancedCard = React.forwardRef<HTMLDivElement, AdvancedCardProps>(
  ({ className, variant = "default", glow = false, hover3d = false, children, ...props }, ref) => {
    const mouseRef = useMouseTracker();
    const intersectionRef = useIntersectionObserver();
    
    const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
      if (ref) {
        if (typeof ref === 'function') ref(node);
        else ref.current = node;
      }
      if (mouseRef.current !== node) {
        (mouseRef as any).current = node;
      }
      if (intersectionRef.current !== node) {
        (intersectionRef as any).current = node;
      }
    }, [ref, mouseRef, intersectionRef]);

    const variantStyles = {
      default: "bg-white border border-gray-200 shadow-sm",
      glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg",
      gradient: "bg-gradient-to-br from-white via-blue-50 to-indigo-50 border border-blue-200 shadow-lg",
      interactive: "bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    };

    const glowClass = glow ? "shadow-2xl shadow-blue-500/25" : "";
    const hover3dClass = hover3d ? "hover:rotate-1 hover:scale-[1.02] transition-transform duration-300" : "";

    return (
      <div
        ref={combinedRef}
        className={cn(
          "rounded-xl p-6 transition-all duration-300",
          variantStyles[variant],
          glowClass,
          hover3dClass,
          "opacity-0 translate-y-4 transition-opacity transition-transform duration-700",
          className
        )}
        style={{
          background: variant === "interactive" ? 
            "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1) 0%, transparent 50%)" : 
            undefined
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AdvancedCard.displayName = "AdvancedCard";

export { AdvancedCard };