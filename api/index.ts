import express, { Request, Response } from "express";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota principal
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("✅ Essentia backend is alive and running on Vercel!");
});

// Rota de teste
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    message: "pong",
    time: new Date().toISOString(),
  });
});

// Exporta para Vercel
export default app;
export const handler = serverless(app);
