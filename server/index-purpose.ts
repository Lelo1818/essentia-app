import express, { type Request, Response, NextFunction } from "express";
import { registerPurposeRoutes } from "./routes-purpose";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    log(`${req.method} ${req.url} ${res.statusCode} in ${duration}ms :: ${JSON.stringify(body).slice(0, 100)}...`);
    return originalSend.call(this, body);
  };
  next();
});

(async () => {
  const server = await registerPurposeRoutes(app);
  
  // In production, serve static files
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    // In development, set up Vite middleware for hot reloading
    await setupVite(app, server);
  }

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    log(`Error ${status}: ${message}`);
    res.status(status).json({ message });
  });

  const PORT = Number(process.env.PORT) || 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();