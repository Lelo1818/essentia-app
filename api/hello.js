export default async function handler(req, res) {
  return res.status(200).json({
    status: "ativo",
    message: "✅ Motor Essentia reconhecido e rodando como função serverless no Vercel!"
  });
}
