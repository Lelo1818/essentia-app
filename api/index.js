import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Hello route
app.get("/api/hello", (req, res) => {
  res.json({
    message: "✅ Essentia ativo no Vercel!",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Root
app.get("/", (req, res) => {
  res.send("🔥 Essentia App Backend ativo!");
});

// ✅ Start server (for local dev)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Server running locally on http://localhost:${port}`)
  );
}

export default app;
