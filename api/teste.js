export default function handler(req, res) {
  res.status(200).json({
    status: "ativo",
    message: "Motor Essentia respondendo no Vercel 🚀"
  });
}
