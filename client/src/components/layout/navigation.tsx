import { Link, useLocation } from "wouter";
import { Home, ArrowLeft, DollarSign, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();

  const isHomePage = location === "/";

  const mainNavItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/income", label: "Renda", icon: DollarSign },
    { path: "/expenses", label: "Gastos", icon: TrendingUp },
    { path: "/investments", label: "Investimentos", icon: TrendingUp },
    { path: "/dividas", label: "Dívidas", icon: Target },
    { path: "/planning", label: "Planejamento", icon: Target },
    { path: "/goals", label: "Metas", icon: Target },
    { path: "/nft-achievements", label: "NFT", icon: Target },
    { path: "/mood-analysis", label: "Humor", icon: Target },
    { path: "/cashback-marketplace", label: "Cashback", icon: DollarSign },
    { path: "/cupons", label: "Cupons", icon: Target },
    { path: "/milhas", label: "Milhas", icon: Target },
    { path: "/educacao", label: "Educação", icon: Target },
    { path: "/flow-kids", label: "Flow Kids", icon: Target },
    { path: "/feedback-ia", label: "IA", icon: Target },
    { path: "/familias", label: "Família", icon: Target },
    { path: "/ocr-avancado", label: "OCR", icon: Target },
    { path: "/ofertas", label: "Ofertas", icon: Target }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Flow</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto max-w-3xl">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-1 whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile - Voltar e Home */}
          <div className="md:hidden flex items-center space-x-2">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            
            <Link href="/">
              <Button
                variant={isHomePage ? "default" : "ghost"}
                size="sm"
              >
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
