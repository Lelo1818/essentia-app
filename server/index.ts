import express, { Request, Response } from "express";
import serverless from "serverless-http";

import { registerEcosystemRoutes } from "./routes-ecosystem";
import { registerPurposeRoutes } from "./routes-purpose";
import { registerEduRoutes } from "./routes-edu";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

setupVite(app);
serveStatic(app);
log(app);

registerEcosystemRoutes(app);
registerPurposeRoutes(app);
registerEduRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("✅ Essentia Server is running.");
});

// 🔹 ESSENCIAL: converte o app Express para formato Serverless
import serverless from "serverless-http";
import express, { Request, Response } from "express";
import { registerEcosystemRoutes } from "./routes-ecosystem";
import { registerPurposeRoutes } from "./routes-purpose";
import { registerEduRoutes } from "./routes-edu";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

setupVite(app);
serveStatic(app);
log(app);

registerEcosystemRoutes(app);
registerPurposeRoutes(app);
registerEduRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("✅ Essentia backend is alive!");
});

// ✅ ESSENCIAL: transforma o Express em função serverless
export const handler = serverless(app);
