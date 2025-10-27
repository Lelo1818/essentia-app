// Arquivo temporário para forçar Vercel a detectar função Node
export default function handler(req, res) {
  return res.status(200).json({ message: "Build test active" });
}

