import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AUTH_PASSWORD = "123456"; // Senha simples para acessar os apps

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Verificar se já está autenticado no localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("apps_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (password === AUTH_PASSWORD) {
        localStorage.setItem("apps_authenticated", "true");
        setIsAuthenticated(true);
        toast({
          title: "Acesso liberado!",
          description: "Bem-vindo aos seus aplicativos.",
        });
      } else {
        toast({
          title: "Senha incorreta",
          description: "Tente novamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
      setPassword("");
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Área Protegida
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Digite a senha para acessar os aplicativos
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
              <Lock className="w-4 h-4" />
              Senha de Acesso
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            onClick={handleLogin}
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isLoading ? "Verificando..." : "Entrar"}
          </Button>
          
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p className="font-medium">Flow • Essentia • EduVibe</p>
            <p className="mt-2 text-xs">Três aplicativos disponíveis</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}