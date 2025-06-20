import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from "@/components/auth/login-form";
import Purpose from "@/pages/purpose";

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

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Purpose />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;