import { Link, useLocation } from "wouter";
import { Home, Plus, Camera, PieChart, Trophy, Gift, CreditCard, BookOpen, Percent, Plane, Brain, Baby, TrendingUp } from "lucide-react";

export default function MobileNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/flow", icon: TrendingUp, label: "Flow" },
    { path: "/kids", icon: Baby, label: "Kids" },
    { path: "/expenses", icon: Camera, label: "Gastos" },
    { path: "/goals", icon: Trophy, label: "Metas" },
    { path: "/cupons", icon: Percent, label: "Cupons" }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-6 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActive ? "text-primary-600" : "text-gray-400"
              }`}>
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
