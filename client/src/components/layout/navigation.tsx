import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/income", label: "Renda" },
    { path: "/expenses", label: "Gastos" },
    { path: "/dividas", label: "Dívidas" },
    { path: "/planning", label: "Planejamento" },
    { path: "/goals", label: "Metas" },
    { path: "/cupons", label: "Cupons" },
    { path: "/milhas", label: "Milhas" },
    { path: "/educacao", label: "Educação" },
    { path: "/feedback-ia", label: "IA Insights" },
    { path: "/ofertas", label: "Ofertas" }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gradient cursor-pointer">Flow</h1>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    location === item.path
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/profile">
              <Button variant="default" className="gradient-primary">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
