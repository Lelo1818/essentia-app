import { Link, useLocation } from "wouter";
import { 
  Home, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  Plane, 
  Receipt 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { 
      path: "/", 
      icon: Home, 
      label: "Home",
      activePattern: /^\/$/
    },
    { 
      path: "/fluxo-caixa", 
      icon: TrendingUp, 
      label: "Flow",
      activePattern: /^\/fluxo-caixa$/
    },
    { 
      path: "/flow/cartoes", 
      icon: CreditCard, 
      label: "Cartões",
      activePattern: /^\/flow\/cartoes$/
    },
    { 
      path: "/flow/seguros", 
      icon: Shield, 
      label: "Seguros",
      activePattern: /^\/flow\/seguros$/
    },
    { 
      path: "/flow/milhas", 
      icon: Plane, 
      label: "Milhas",
      activePattern: /^\/flow\/milhas$/
    },
    { 
      path: "/flow/impostos", 
      icon: Receipt, 
      label: "Impostos",
      activePattern: /^\/flow\/impostos$/
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 pb-safe">
      <div className="grid grid-cols-6 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.activePattern.test(location);
          
          return (
            <Link key={item.path} href={item.path}>
              <a className={cn(
                "flex flex-col items-center py-2 px-1 transition-all duration-200 rounded-lg mx-1 my-1",
                isActive 
                  ? "text-purple-600 bg-purple-50 shadow-sm" 
                  : "text-gray-500 hover:text-purple-600 hover:bg-gray-50 active:bg-gray-100"
              )}>
                <Icon className={cn(
                  "w-5 h-5 mb-1 transition-transform",
                  isActive && "scale-110"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-purple-700" : "text-gray-600"
                )}>
                  {item.label}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}