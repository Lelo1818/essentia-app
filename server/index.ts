import express, { Request, Response } from "express";
import serverless from "serverless-http";

import { registerEcosystemRoutes } from "./routes-ecosystem";
import { registerPurposeRoutes } from "./routes-purpose";
import { registerEduRoutes } from "./routes-edu";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Configurações do Vite e rotas
setupVite(app);
serveStatic(app);
log(app);

registerEcosystemRoutes(app);
registerPurposeRoutes(app);
registerEduRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("✅ Essentia backend is alive!");
});

// Exporta o handler serverless
export default app;
export const handler = serverless(app);
