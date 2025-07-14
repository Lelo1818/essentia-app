import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Dashboard carregando...");

// Teste se o React está funcionando
setTimeout(() => {
  const root = document.getElementById("root");
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 40px 0;">
          <div style="text-align: center; margin-bottom: 60px;">
            <h1 style="color: white; font-size: 3.5rem; font-weight: 700; margin-bottom: 16px; text-shadow: 0 4px 12px rgba(0,0,0,0.3);">Ecossistema Digital</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 1.25rem; font-weight: 400;">Bem-vindo, Lelão! Escolha seu aplicativo</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin-bottom: 40px;">
            <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 28px;">💰</span>
              </div>
              <h3 style="font-size: 1.5rem; color: #111827; font-weight: 700; margin-bottom: 8px;">Flow</h3>
              <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5;">Gestão financeira inteligente com IA integrada</p>
              <button onclick="window.location.href='/flow'" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='linear-gradient(135deg, #059669, #047857)'" onmouseout="this.style.background='linear-gradient(135deg, #10b981, #059669)'">Acessar Flow</button>
            </div>
            
            <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 28px;">📚</span>
              </div>
              <h3 style="font-size: 1.5rem; color: #111827; font-weight: 700; margin-bottom: 8px;">EduVibe</h3>
              <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5;">Plataforma educacional com análise de conteúdo</p>
              <button onclick="window.location.href='/eduvibe'" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='linear-gradient(135deg, #1d4ed8, #1e40af)'" onmouseout="this.style.background='linear-gradient(135deg, #3b82f6, #1d4ed8)'">Acessar EduVibe</button>
            </div>
            
            <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 28px;">💜</span>
              </div>
              <h3 style="font-size: 1.5rem; color: #111827; font-weight: 700; margin-bottom: 8px;">Essentia</h3>
              <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5;">Jornada de autoconhecimento e desenvolvimento</p>
              <button onclick="window.location.href='/purpose'" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='linear-gradient(135deg, #7c3aed, #6d28d9)'" onmouseout="this.style.background='linear-gradient(135deg, #8b5cf6, #7c3aed)'">Acessar Essentia</button>
            </div>
            
            <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #ec4899, #db2777); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 28px;">👨‍👩‍👧‍👦</span>
              </div>
              <h3 style="font-size: 1.5rem; color: #111827; font-weight: 700; margin-bottom: 8px;">Flow Kids</h3>
              <p style="color: #6b7280; font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5;">Educação financeira gamificada para crianças</p>
              <button onclick="window.location.href='/kids-standalone'" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #ec4899, #db2777); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='linear-gradient(135deg, #db2777, #be185d)'" onmouseout="this.style.background='linear-gradient(135deg, #ec4899, #db2777)'">Acessar Flow Kids</button>
            </div>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 32px; text-align: center;">
            <h3 style="color: white; font-size: 1.25rem; font-weight: 600; margin-bottom: 24px;">Status do Sistema</h3>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
              <div style="text-align: center;">
                <div style="font-size: 2rem; color: #10b981; font-weight: 700; margin-bottom: 8px;">100%</div>
                <div style="color: rgba(255,255,255,0.8); font-size: 0.875rem;">Operacional</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2rem; color: #3b82f6; font-weight: 700; margin-bottom: 8px;">4</div>
                <div style="color: rgba(255,255,255,0.8); font-size: 0.875rem;">Apps Ativos</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2rem; color: #8b5cf6; font-weight: 700; margin-bottom: 8px;">24/7</div>
                <div style="color: rgba(255,255,255,0.8); font-size: 0.875rem;">Disponível</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2rem; color: #ec4899; font-weight: 700; margin-bottom: 8px;">✓</div>
                <div style="color: rgba(255,255,255,0.8); font-size: 0.875rem;">Pronto</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}, 2000);

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(<App />);
