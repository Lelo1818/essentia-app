import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.css";

// Pages
import Purpose from "./pages/purpose";
import EssentiaDemo90s from "./pages/essentia-demo-90s";
import EssentiaMega from "./pages/essentia-mega";

// Simple hash router
function useHashPath(defaultPath: string = "/purpose") {
  const [path, setPath] = useState(() => {
    const hash = window.location.hash.slice(1) || defaultPath;
    return hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.slice(1) || defaultPath);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [defaultPath]);

  return path;
}

function App() {
  // Check for pitch mode
  const isPitch = new URLSearchParams(window.location.search).has("pitch");
  const path = useHashPath(isPitch ? "/demo-90s" : "/purpose");

  // Simple router
  if (path === "/purpose" || path === "/") {
    return <Purpose />;
  }
  
  if (path === "/demo-90s") {
    return <EssentiaDemo90s />;
  }
  
  if (path === "/mega") {
    return <EssentiaMega />;
  }

  // 404
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-6">Página não encontrada</p>
        <div className="space-y-2">
          <a href="#/purpose" className="block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Purpose
          </a>
          <a href="#/demo-90s" className="block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
            Demo 90s
          </a>
          <a href="#/mega" className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Mega
          </a>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(<App />);
