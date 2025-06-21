import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from "@/components/auth/login-form";
import { Switch, Route } from "wouter";
import EcosystemSelector from "@/pages/ecosystem-selector";
import Purpose from "@/pages/purpose";
import EduPage from "@/pages/edu";
import InvestorDemo from "@/pages/investor-demo";
import EpicDemo from "@/pages/epic-demo";
import { TrendingUp, Baby } from "lucide-react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Senhas para acesso (você pode alterar conforme necessário)
  const validPasswords = [
    "danielallegri2025",
    "investor-demo",
    "desperte-proposito",
    "flow-ecosystem"
  ];

  const handleLogin = (password: string) => {
    if (validPasswords.includes(password.toLowerCase())) {
      setIsAuthenticated(true);
      setLoginError("");
      // Salvar no sessionStorage para manter logado durante a sessão
      sessionStorage.setItem("ecosystem-auth", "true");
    } else {
      setLoginError("Senha incorreta. Verifique com o administrador do sistema.");
    }
  };

  // Verificar se já está autenticado na sessão
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("ecosystem-auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen">
          {!isAuthenticated ? (
            <LoginForm onLogin={handleLogin} error={loginError} />
          ) : (
            <Switch>
              <Route path="/" component={EcosystemSelector} />
              <Route path="/purpose" component={Purpose} />
              <Route path="/edu" component={EduPage} />
              <Route path="/investor-demo" component={InvestorDemo} />
              <Route path="/epic-demo" component={EpicDemo} />
              <Route path="/flow">
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 to-emerald-900 px-4">
                  <div className="text-center text-white max-w-4xl">
                    <img 
                      src="/attached_assets/image_1750461970564.png" 
                      alt="Logo Flow"
                      className="w-32 h-32 mx-auto mb-8 rounded-full object-cover shadow-2xl"
                    />
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Flow - Gestão Financeira Inteligente</h1>
                    <p className="text-lg md:text-xl mb-6">Sistema revolucionário com IA preditiva e automação completa</p>
                    <div className="bg-green-800/30 rounded-xl p-6 mb-8">
                      <h3 className="text-xl font-bold mb-4">Lançamento Q3 2025</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>✓ Análise preditiva de gastos</div>
                        <div>✓ Automação de investimentos</div>
                        <div>✓ Metas financeiras gamificadas</div>
                        <div>✓ Avatar 3D de progresso</div>
                      </div>
                    </div>
                    <a href="/" className="text-green-300 underline text-lg">← Voltar ao Ecossistema</a>
                  </div>
                </div>
              </Route>
              <Route path="/flow-kids">
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-900 to-yellow-900 px-4">
                  <div className="text-center text-white max-w-4xl">
                    <img 
                      src="/attached_assets/image_1750462839381.png" 
                      alt="Logo Flow Kids"
                      className="w-32 h-32 mx-auto mb-8 rounded-full object-cover shadow-2xl"
                    />
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Flow Kids - Educação Financeira Infantil</h1>
                    <p className="text-lg md:text-xl mb-6">Gamificação total para ensinar crianças sobre dinheiro</p>
                    <div className="bg-orange-800/30 rounded-xl p-6 mb-8">
                      <h3 className="text-xl font-bold mb-4">Conceito Revolucionário</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>🎮 Realidade aumentada</div>
                        <div>👨‍👩‍👧‍👦 Missões em família</div>
                        <div>🏆 Sistema de conquistas</div>
                        <div>🧠 Avatar 3D evolutivo</div>
                      </div>
                    </div>
                    <a href="/" className="text-orange-300 underline text-lg">← Voltar ao Ecossistema</a>
                  </div>
                </div>
              </Route>
              <Route>
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
                  <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
                    <p className="text-xl mb-8">Esta página não existe no sistema.</p>
                    <a href="/" className="text-purple-300 underline">← Voltar ao Ecossistema</a>
                  </div>
                </div>
              </Route>
            </Switch>
          )}
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;