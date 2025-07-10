import { useEffect } from "react";
import EduVibeEnhanced from "./eduvibe-enhanced";

export default function EduVibeDirect() {
  useEffect(() => {
    // FORÇA LIMPEZA TOTAL DE CACHE
    localStorage.clear();
    sessionStorage.clear();
    
    // FORÇA CONFIGURAÇÃO EDUVIBE
    localStorage.setItem('app-mode', 'eduvibe');
    localStorage.setItem('skip-intro', 'true');
    localStorage.setItem('force-eduvibe', 'true');
    
    console.log('EduVibe Direct - CARREGADO DIRETAMENTE NO PASSO 6');
  }, []);

  // Renderiza EduVibe direto sem roteamento
  return <EduVibeEnhanced />;
}