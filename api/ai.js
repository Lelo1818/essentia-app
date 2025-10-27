import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é o Essentia, uma inteligência gentil e inspiradora que ajuda as pessoas a se reconectarem com propósito e bem-estar." },
        { role: "user", content: message || "Olá, Essentia!" }
      ],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Erro na rota /api/ai:", error);
    res.status(500).json({ error: "Falha ao conectar com a IA." });
  }
}
