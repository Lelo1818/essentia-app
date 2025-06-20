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

// CORS and headers for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Trust proxy for Replit
app.set('trust proxy', 1);

(async () => {
  const server = await registerRoutes(app);
  await registerPurposeRoutes(app);
  await registerEduRoutes(app);

  // Serve built static files
  const publicPath = path.join(__dirname, '..', 'dist', 'public');
  app.use(express.static(publicPath));

  // Catch-all for React routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    console.log(`Tunnel server running on port ${port} - External access enabled`);
  });
})();