import { createRoot } from "react-dom/client";
import App from "./App-simple";
import "./index.css";

console.log("Loading Ecossistema Digital...");

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(<App />);
