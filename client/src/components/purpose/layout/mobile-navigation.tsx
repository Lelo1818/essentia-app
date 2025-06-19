import { Link, useLocation } from "wouter";
import { Home, Map, BookOpen, Compass, Sparkles } from "lucide-react";

export default function PurposeMobileNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/jornada", icon: Compass, label: "Jornada" },
    { path: "/diario", icon: BookOpen, label: "Diário" },
    { path: "/mapa", icon: Map, label: "Mapa" },
    { path: "/inspiracao", icon: Sparkles, label: "Inspiração" }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-100 z-50">
      <div className="grid grid-cols-5 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActive ? "text-purple-600" : "text-gray-400"
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