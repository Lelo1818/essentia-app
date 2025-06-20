import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
        glassmorphism: "bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 hover:bg-white/30 shadow-lg",
        glow: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl",
        premium: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 hover:from-yellow-500 hover:to-yellow-700 shadow-lg hover:shadow-yellow-500/25"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        shimmer: "shimmer-effect",
        float: "hover:animate-float"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none"
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  ripple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation,
    asChild = false, 
    loading = false,
    icon,
    iconPosition = "left",
    ripple = false,
    children,
    onClick,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !loading) {
        const rect = e.currentTarget.getBoundingClientRect();
        const newRipple = {
          id: Date.now(),
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
      
      if (onClick && !loading) {
        onClick(e);
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        onClick={handleClick}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Ripple Effect */}
        {ripple && ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Content */}
        <div className={cn("flex items-center space-x-2", loading && "invisible")}>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </div>

        {/* Shimmer Effect for Premium Variants */}
        {variant === "premium" && (
          <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };