import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/income", label: "Renda" },
    { path: "/expenses", label: "Gastos" },
    { path: "/investments", label: "Investimentos" },
    { path: "/dividas", label: "Dívidas" },
    { path: "/planning", label: "Planejamento" },
    { path: "/goals", label: "Metas" },
    { path: "/nft-achievements", label: "NFT Conquistas" },
    { path: "/mood-analysis", label: "Análise Humor" },
    { path: "/cashback-marketplace", label: "Cashback" },
    { path: "/cupons", label: "Cupons" },
    { path: "/milhas", label: "Milhas" },
    { path: "/educacao", label: "Educação" },
    { path: "/flow-kids", label: "Flow Kids" },
    { path: "/feedback-ia", label: "IA Insights" },
    { path: "/familias", label: "Família" },
    { path: "/ocr-avancado", label: "OCR Foto" },
    { path: "/ofertas", label: "Ofertas" }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">F</span>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Flow</h1>
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
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Profile removed to avoid navigation interference */}
          </div>
        </div>
      </div>
    </nav>
  );
}
