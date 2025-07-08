import { useEffect } from "react";

interface EduVibeRedirectProps {
  fromPath?: string;
}

export default function EduVibeRedirect({ fromPath }: EduVibeRedirectProps) {
  useEffect(() => {
    // Força o redirecionamento imediato
    console.log(`Redirecionando de ${fromPath || 'página'} para /eduvibe-enhanced`);
    // Limpa cache antes de redirecionar
    localStorage.removeItem('eduvibe-cache');
    localStorage.removeItem('eduvibe-version');
    // Usa replace para evitar loop de história
    window.location.replace('/eduvibe-enhanced?force=true');
  }, [fromPath]);

  // Exibe uma mensagem de carregamento enquanto redireciona
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Carregando EduVibe...</h2>
        <p className="text-gray-600">Redirecionando para a versão completa...</p>
      </div>
    </div>
  );
}