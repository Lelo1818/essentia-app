import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Dashboard carregando...");

// Teste se o React está funcionando
setTimeout(() => {
  const root = document.getElementById("root");
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `
      <div style="padding: 40px; font-family: Arial; text-align: center;">
        <h1 style="color: #333; font-size: 48px;">Ecossistema Digital - Lelão</h1>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; max-width: 800px; margin: 40px auto;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 3px solid #10b981;">
            <div style="font-size: 32px; margin-bottom: 15px;">💰</div>
            <h3 style="font-size: 24px; color: #333;">Flow</h3>
            <button onclick="window.location.href='/flow'" style="width: 100%; padding: 15px; background: #10b981; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">Acessar Flow</button>
          </div>
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 3px solid #3b82f6;">
            <div style="font-size: 32px; margin-bottom: 15px;">📚</div>
            <h3 style="font-size: 24px; color: #333;">EduVibe</h3>
            <button onclick="window.location.href='/eduvibe'" style="width: 100%; padding: 15px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">Acessar EduVibe</button>
          </div>
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 3px solid #8b5cf6;">
            <div style="font-size: 32px; margin-bottom: 15px;">💜</div>
            <h3 style="font-size: 24px; color: #333;">Essentia</h3>
            <button onclick="window.location.href='/purpose'" style="width: 100%; padding: 15px; background: #8b5cf6; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">Acessar Essentia</button>
          </div>
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 3px solid #ec4899;">
            <div style="font-size: 32px; margin-bottom: 15px;">👨‍👩‍👧‍👦</div>
            <h3 style="font-size: 24px; color: #333;">Flow Kids</h3>
            <button onclick="window.location.href='/kids-standalone'" style="width: 100%; padding: 15px; background: #ec4899; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">Acessar Flow Kids</button>
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
