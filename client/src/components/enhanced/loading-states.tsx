import { cn } from "@/lib/utils";
import { Loader2, Sparkles, TrendingUp, GraduationCap, Heart } from "lucide-react";

interface LoadingStateProps {
  type?: "default" | "financial" | "educational" | "spiritual";
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function LoadingState({ 
  type = "default", 
  size = "md", 
  message, 
  className 
}: LoadingStateProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const icons = {
    default: Loader2,
    financial: TrendingUp,
    educational: GraduationCap,
    spiritual: Heart
  };

  const Icon = icons[type];

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      <div className="relative">
        <Icon className={cn(
          "animate-spin text-blue-600",
          sizes[size]
        )} />
        {type !== "default" && (
          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 animate-pulse" />
        )}
      </div>
      {message && (
        <p className="text-sm text-gray-600 animate-pulse">{message}</p>
      )}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4 animate-pulse", className)}>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}

export function ProgressSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 animate-pulse", className)}>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-blue-300 rounded-full w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
}