import serverless from "serverless-http";
import express, { Request, Response } from "express";
import { registerEcosystemRoutes } from "../server/routes-ecosystem";
import { registerPurposeRoutes } from "../server/routes-purpose";
import { registerEduRoutes } from "../server/routes-edu";
import { setupVite, serveStatic, log } from "../server/vite";

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

export const handler = serverless(app);
export default app;
