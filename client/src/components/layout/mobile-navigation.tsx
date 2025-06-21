import { Link, useLocation } from "wouter";
import { Home, Plus, Camera, PieChart, Trophy, Gift, CreditCard, BookOpen, Percent, Plane, Brain, Baby, TrendingUp, Shield, Receipt } from "lucide-react";

export default function MobileNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/flow", icon: TrendingUp, label: "Flow" },
    { path: "/flow/cartoes", icon: CreditCard, label: "Cartões" },
    { path: "/flow/seguros", icon: Shield, label: "Seguros" },
    { path: "/flow/milhas", icon: Plane, label: "Milhas" },
    { path: "/flow/impostos", icon: Receipt, label: "Impostos" }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="grid grid-cols-6 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path || 
            (item.path === "/flow" && location.startsWith("/flow"));
          
          return (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center py-2 px-1 transition-colors cursor-pointer ${
                isActive ? "text-purple-600 bg-purple-50" : "text-gray-500 hover:text-purple-600"
              }`}>
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
