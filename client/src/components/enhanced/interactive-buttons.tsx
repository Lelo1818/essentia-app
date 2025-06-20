import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  gradient?: boolean;
  pulse?: boolean;
}

export function InteractiveButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  icon: Icon,
  loading = false,
  disabled = false,
  href,
  gradient = false,
  pulse = false,
  ...props
}: InteractiveButtonProps) {
  const baseClasses = cn(
    "transition-all duration-200 transform hover:scale-105",
    "shadow-lg hover:shadow-xl",
    gradient && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none",
    pulse && "animate-pulse",
    className
  );

  const handleClick = () => {
    if (href) {
      window.location.href = href;
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant={gradient ? "default" : variant}
      size={size}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2" />
      ) : null}
      {children}
    </Button>
  );
}

export function FloatingActionButton({
  icon: Icon,
  onClick,
  className,
  ...props
}: {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600",
        "rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200",
        "flex items-center justify-center text-white z-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}