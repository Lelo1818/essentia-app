import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { registerPurposeRoutes } from "./routes-purpose";
import { registerEduRoutes } from "./routes-edu";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for external access
app.set('trust proxy', 1);

// Register API routes first
(async () => {
  const server = await registerRoutes(app);
  await registerPurposeRoutes(app);
  await registerEduRoutes(app);

  // Serve static files from dist/public
  const publicPath = path.join(__dirname, '..', 'dist', 'public');
  app.use(express.static(publicPath));

  // Catch-all handler: send back React's index.html file for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    console.log(`[${new Date().toISOString()}] Server running on port ${port}`);
  });
})();