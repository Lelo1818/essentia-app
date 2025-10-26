import express from "express";

const app = express();
app.use(express.json());

// rota base de teste
app.get("/api/hello", (req, res) => {
  res.json({ message: "✅ Motor Essentia ativo no Vercel!" });
});

// adaptador serverless (Vercel executa essa função)
export default function handler(req, res) {
  return app(req, res);
}
