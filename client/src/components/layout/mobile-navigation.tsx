import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Plus, Camera, PieChart, Trophy, Gift, CreditCard, BookOpen, Percent, Plane, Brain, Baby, TrendingUp, Shield, Receipt, Clock, Menu, X, Heart, Users, Zap } from "lucide-react";

export default function MobileNavigation() {
  const [location] = useLocation();
  const [showMore, setShowMore] = useState(false);

  const mainNavItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/cashback-marketplace", icon: Gift, label: "Cashback" },
    { path: "/cupons", icon: Percent, label: "Cupons" },
    { path: "/milhas", icon: Plane, label: "Milhas" },
    { path: "/educacao", icon: BookOpen, label: "Educação" }
  ];

  const moreNavItems = [
    { path: "/flow-kids", icon: Baby, label: "Flow Kids" },
    { path: "/feedback-ia", icon: Brain, label: "IA Insights" },
    { path: "/familias", icon: Users, label: "Família" },
    { path: "/ofertas", icon: Trophy, label: "Ofertas" },
    { path: "/investments", icon: TrendingUp, label: "Investimentos" },
    { path: "/pix", icon: Zap, label: "PIX" },
    { path: "/profile", icon: Shield, label: "Perfil" }
  ];

  return (
    <>
      {/* Overlay expandido */}
      {showMore && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMore(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-4 pb-6 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Todas as Funcionalidades</h3>
              <button 
                onClick={() => setShowMore(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <Link key={item.path} href={item.path}>
                    <div 
                      className={`flex flex-col items-center p-4 rounded-lg transition-colors cursor-pointer ${
                        isActive ? "text-purple-600 bg-purple-50" : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setShowMore(false)}
                    >
                      <Icon className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium text-center">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navegação inferior principal */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
        <div className="grid grid-cols-6 py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
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
          
          {/* Botão "Mais" */}
          <button
            onClick={() => setShowMore(true)}
            className="flex flex-col items-center py-2 px-1 transition-colors cursor-pointer text-gray-500 hover:text-purple-600"
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Mais</span>
          </button>
        </div>
      </div>
    </>
  );
}
