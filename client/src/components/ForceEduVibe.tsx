import { useEffect } from "react";

export default function ForceEduVibe() {
  useEffect(() => {
    // FORÇA LIMPEZA RADICAL
    localStorage.clear();
    sessionStorage.clear();
    
    // DESABILITADO - Não força mais redirecionamento
    console.log('ForceEduVibe - DESABILITADO');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-purple-800 mb-2">Carregando EduVibe</h1>
        <p className="text-purple-600">Sistema educacional iniciando...</p>
      </div>
    </div>
  );
}