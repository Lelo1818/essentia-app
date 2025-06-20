import { cn } from "@/lib/utils";

interface AppLogoProps {
  app: "flow" | "edu" | "purpose";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function AppLogo({ app, size = "md", className }: AppLogoProps) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm", 
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg"
  };

  const logos = {
    flow: {
      gradient: "from-green-500 to-emerald-500",
      icon: "₣",
      name: "Flow"
    },
    edu: {
      gradient: "from-blue-500 to-cyan-500", 
      icon: "Ξ",
      name: "EduVie"
    },
    purpose: {
      gradient: "from-purple-500 to-pink-500",
      icon: "◈",
      name: "Essentia"
    }
  };

  const logo = logos[app];

  return (
    <div className={cn(
      "rounded-lg bg-gradient-to-r flex items-center justify-center font-bold text-white shadow-sm",
      logo.gradient,
      sizes[size],
      className
    )}>
      {logo.icon}
    </div>
  );
}

function AppName({ app }: { app: "flow" | "edu" | "purpose" }) {
  const names = {
    flow: "Flow",
    edu: "EduVie", 
    purpose: "Essentia"
  };

  return <span className="font-semibold">{names[app]}</span>;
}

export { AppLogo, AppName };
export default AppLogo;