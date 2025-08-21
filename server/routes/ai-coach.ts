import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

// Configurar Anthropic se a API key estiver disponível
let anthropic: Anthropic | null = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

// Endpoint para interações com IA no dashboard
router.post('/ai-coach', async (req, res) => {
  try {
    const { aiSystemId, userMessage, triadScores, context } = req.body;

    // Se Anthropic não estiver disponível, retornar resposta estruturada
    if (!anthropic) {
      return res.json({
        response: generateFallbackResponse(aiSystemId, userMessage, triadScores),
        recommendedPillar: determineRecommendedPillar(userMessage, triadScores),
        source: 'fallback'
      });
    }

    // Construir prompt baseado no sistema de IA
    const systemPrompt = buildSystemPrompt(aiSystemId, triadScores);
    const userPrompt = `Contexto: ${context}\nMensagem do usuário: ${userMessage}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
      ],
    });

    const aiResponse = response.content[0].type === 'text' ? response.content[0].text : '';
    const recommendedPillar = extractPillarRecommendation(aiResponse);

    res.json({
      response: aiResponse,
      recommendedPillar,
      source: 'anthropic'
    });

  } catch (error) {
    console.error('Erro na IA:', error);
    
    // Fallback em caso de erro
    res.json({
      response: generateFallbackResponse(req.body.aiSystemId, req.body.userMessage, req.body.triadScores),
      recommendedPillar: determineRecommendedPillar(req.body.userMessage, req.body.triadScores),
      source: 'fallback'
    });
  }
});

function buildSystemPrompt(aiSystemId: string, triadScores: any): string {
  const baseContext = `Você é um sistema de IA especializado em desenvolvimento pessoal e descoberta de propósito. 
  Scores atuais do usuário: Consciência ${triadScores.consciencia}%, Energia ${triadScores.energia}%, Coerência ${triadScores.coerencia}%.`;

  switch (aiSystemId) {
    case 'oracle':
      return `${baseContext} Você é o Oráculo da Sabedoria, focado em autoconhecimento profundo. 
      Faça perguntas reflexivas, ofereça insights sobre padrões internos e ajude na descoberta da identidade verdadeira.
      Se apropriado, recomende o pilar 'autoconhecimento'.`;
      
    case 'catalyst':
      return `${baseContext} Você é o Catalisador da Paixão, especializado em despertar entusiasmo e paixões verdadeiras.
      Ajude a identificar o que realmente move a pessoa, conecte com memórias de momentos de flow e vitalidade.
      Se apropriado, recomende o pilar 'paixao'.`;
      
    case 'navigator':
      return `${baseContext} Você é o Navegador do Propósito, focado em clarificar missão e direção de vida.
      Ajude a descobrir como a pessoa pode contribuir para o mundo, conecte talentos com problemas que ela se sente chamada a resolver.
      Se apropriado, recomende o pilar 'missao'.`;
      
    case 'amplifier':
      return `${baseContext} Você é o Amplificador de Talentos, especializado em identificar e desenvolver dons naturais.
      Ajude a reconhecer habilidades que vêm naturalmente, potencial inexplorado e formas de aplicar talentos na missão.
      Se apropriado, recomende o pilar 'talentos'.`;
      
    default:
      return `${baseContext} Forneça orientação personalizada baseada nos scores da tríade.`;
  }
}

function extractPillarRecommendation(aiResponse: string): string | null {
  const pillars = ['autoconhecimento', 'paixao', 'missao', 'talentos', 'conexao', 'lideranca'];
  
  for (const pillar of pillars) {
    if (aiResponse.toLowerCase().includes(`pilar ${pillar}`) || 
        aiResponse.toLowerCase().includes(`'${pillar}'`)) {
      return pillar;
    }
  }
  
  return null;
}

function generateFallbackResponse(aiSystemId: string, userMessage: string, triadScores: any): string {
  const lowerMessage = userMessage.toLowerCase();
  
  switch (aiSystemId) {
    case 'oracle':
      if (lowerMessage.includes('quem sou') || lowerMessage.includes('identidade')) {
        return `🔍 Sua pergunta sobre identidade é profunda. Com consciência em ${triadScores.consciencia}%, vejo potencial para maior autoconhecimento.\n\nReflita: Quando você se sente mais autêntico? Em que momentos você pensa "isso sou eu de verdade"?\n\nO pilar do Autoconhecimento pode aprofundar essa descoberta.`;
      }
      return `✨ Com sua consciência em ${triadScores.consciencia}%, você está buscando clareza interior. Sua reflexão mostra maturidade.\n\nPergunta para você: Se pudesse enviar uma mensagem para seu eu de 10 anos atrás, o que diria?`;
      
    case 'catalyst':
      if (lowerMessage.includes('paixão') || lowerMessage.includes('amor') || lowerMessage.includes('energia')) {
        return `🔥 Sinto a busca por paixão em suas palavras! Com energia em ${triadScores.energia}%, há potencial para despertar mais entusiasmo.\n\nLembre-se: paixão não é só prazer, é aquilo que você não consegue parar de pensar em melhorar.\n\nO pilar da Paixão oferece práticas específicas para essa descoberta.`;
      }
      return `💖 Energia em ${triadScores.energia}%... O que te fazia perder a noção do tempo quando era mais novo? Essas são pistas da sua paixão verdadeira.`;
      
    case 'navigator':
      if (lowerMessage.includes('propósito') || lowerMessage.includes('missão')) {
        return `🧭 Sua busca por propósito é nobre! Com seus scores atuais, você está se preparando para maior clareza de missão.\n\n"Se você pudesse resolver apenas um problema no mundo, qual seria?" A resposta pode revelar sua missão.\n\nO pilar da Missão oferece um caminho estruturado para essa descoberta.`;
      }
      return `🎯 Sobre sua reflexão: como isso se conecta com o impacto que você quer causar? Sua missão está na intersecção do que você ama, faz bem, o mundo precisa e pode te sustentar.`;
      
    case 'amplifier':
      if (lowerMessage.includes('talento') || lowerMessage.includes('habilidade')) {
        return `⚡ Talentos são presentes que você trouxe para compartilhar! Com energia em ${triadScores.energia}%, há força para desenvolvê-los.\n\n"Que atividade fluiu tão naturalmente que outros acharam impressionante, mas você achou normal?"\n\nO pilar dos Talentos pode polir esses diamantes brutos.`;
      }
      return `🌟 Sobre sua reflexão: que habilidades naturais você usa para lidar com situações assim? Talentos são como músculos - precisam ser exercitados.`;
      
    default:
      return `🤖 Interessante reflexão. Com sua tríade atual, vejo oportunidades de crescimento. Que aspecto você gostaria de explorar mais profundamente?`;
  }
}

function determineRecommendedPillar(userMessage: string, triadScores: any): string | null {
  const lowerMessage = userMessage.toLowerCase();
  
  // Baseado no conteúdo da mensagem
  if (lowerMessage.includes('quem sou') || lowerMessage.includes('identidade') || lowerMessage.includes('valores')) {
    return 'autoconhecimento';
  }
  if (lowerMessage.includes('paixão') || lowerMessage.includes('amor') || lowerMessage.includes('entusiasmo')) {
    return 'paixao';
  }
  if (lowerMessage.includes('propósito') || lowerMessage.includes('missão') || lowerMessage.includes('sentido')) {
    return 'missao';
  }
  if (lowerMessage.includes('talento') || lowerMessage.includes('habilidade') || lowerMessage.includes('dom')) {
    return 'talentos';
  }
  if (lowerMessage.includes('relacionamento') || lowerMessage.includes('conexão') || lowerMessage.includes('pessoas')) {
    return 'conexao';
  }
  if (lowerMessage.includes('liderança') || lowerMessage.includes('influência') || lowerMessage.includes('impacto')) {
    return 'lideranca';
  }
  
  // Baseado nos scores mais baixos
  const lowestScore = Math.min(triadScores.consciencia, triadScores.energia, triadScores.coerencia);
  
  if (triadScores.consciencia === lowestScore) {
    return Math.random() > 0.5 ? 'autoconhecimento' : 'missao';
  } else if (triadScores.energia === lowestScore) {
    return Math.random() > 0.5 ? 'paixao' : 'talentos';
  } else {
    return Math.random() > 0.5 ? 'conexao' : 'lideranca';
  }
}

export default router;