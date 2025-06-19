import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { User, Heart } from "lucide-react";

export default function PurposeNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Início" },
    { path: "/jornada", label: "Jornada" },
    { path: "/diario", label: "Diário" },
    { path: "/mapa", label: "Mapa do Propósito" },
    { path: "/inspiracao", label: "Inspiração" }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Heart className="w-8 h-8 text-purple-600 mr-2" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Desperte Seu Propósito
                  </h1>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    location === item.path
                      ? "text-purple-700 bg-purple-100"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <Button variant="default" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}