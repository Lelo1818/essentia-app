import express, { Request, Response } from "express";
import serverless from "serverless-http";

import { registerEcosystemRoutes } from "./routes-ecosystem";
import { registerPurposeRoutes } from "./routes-purpose";
import { registerEduRoutes } from "./routes-edu";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Configuração do Vite + rotas
setupVite(app);
serveStatic(app);
log(app);

registerEcosystemRoutes(app);
registerPurposeRoutes(app);
registerEduRoutes(app);

// Rota de teste — confirma se o backend está vivo
app.get("/", (req: Request, res: Response) => {
  res.send("✅ Essentia backend is alive!");
});

// ESSENCIAL: transforma o Express em função serverless (para Vercel)
export const handler = serverless(app);
