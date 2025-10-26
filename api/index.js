// @ts-nocheck
// Vercel Serverless Handler for Express App
import express from "express";
import { storage } from "../server/storage.js";
import { db } from "../server/db.js";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files
const distPath = path.resolve(__dirname, '..', 'dist', 'public');
app.use(express.static(distPath));

// Import and register all routes
let routesRegistered = false;

async function ensureRoutes() {
  if (routesRegistered) return;
  
  try {
    // Import routes dynamically
    const { registerRoutes } = await import("../server/routes-clean.js");
    await registerRoutes(app);
    
    const { registerEcosystemRoutes } = await import("../server/routes-ecosystem.js");
    await registerEcosystemRoutes(app);
    
    const { registerPurposeRoutes } = await import("../server/routes-purpose.js");
    await registerPurposeRoutes(app);
    
    const { registerEduRoutes } = await import("../server/routes-edu.js");
    await registerEduRoutes(app);
    
    routesRegistered = true;
  } catch (error) {
    console.error('Failed to register routes:', error);
  }
}

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message, error: process.env.NODE_ENV === 'development' ? err.stack : undefined });
});

// Catch-all for frontend routes
app.use('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

// Export handler for Vercel
export default async function handler(req, res) {
  await ensureRoutes();
  return app(req, res);
}
