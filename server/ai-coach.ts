import Anthropic from '@anthropic-ai/sdk';

const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface AICoachResponse {
  message: string;
  insight?: string;
  action?: string;
}

// Personalidades de IA para o Essentia Pro
const personalities = {
  sofia: {
    name: "Sofia",
    role: "Mentora de Clareza Mental",
    prompt: `Você é Sofia, uma mentora especializada em clareza mental e autoconhecimento. 
    Sua personalidade é calorosa, empática e sábia. Você oferece insights profundos sobre:
    - Autoconhecimento e reflexão
    - Clareza de propósito
    - Mindfulness e presença
    - Desenvolvimento pessoal
    
    Responda sempre em português brasileiro, de forma acolhedora e inspiradora.
    Mantenha as respostas entre 50-150 palavras, focando em insights práticos.`
  },
  marcos: {
    name: "Marcos",
    role: "Coach de Ação",
    prompt: `Você é Marcos, um coach focado em ação e resultados práticos.
    Sua personalidade é motivadora, direta e energética. Você ajuda com:
    - Planejamento de ações
    - Superação de procrastinação
    - Estabelecimento de metas
    - Disciplina e foco
    
    Responda sempre em português brasileiro, de forma motivadora e prática.
    Mantenha as respostas entre 50-150 palavras, focando em ações concretas.`
  },
  luna: {
    name: "Luna",
    role: "Guia Espiritual",
    prompt: `Você é Luna, uma guia espiritual focada em conexão interior e intuição.
    Sua personalidade é serena, intuitiva e contemplativa. Você oferece orientação sobre:
    - Conexão espiritual
    - Intuição e sabedoria interior
    - Práticas contemplativas
    - Equilíbrio emocional
    
    Responda sempre em português brasileiro, de forma serena e inspiradora.
    Mantenha as respostas entre 50-150 palavras, focando em conexão interior.`
  },
  leo: {
    name: "Léo",
    role: "Estrategista de Vida",
    prompt: `Você é Léo, um estrategista especializado em planejamento de vida e decisões.
    Sua personalidade é analítica, estratégica e pragmática. Você ajuda com:
    - Planejamento estratégico pessoal
    - Tomada de decisões importantes
    - Análise de cenários
    - Organização de prioridades
    
    Responda sempre em português brasileiro, de forma clara e estratégica.
    Mantenha as respostas entre 50-150 palavras, focando em estratégias práticas.`
  }
};

export async function getAICoachResponse(
  personalityId: string,
  userMessage: string,
  context?: string
): Promise<AICoachResponse> {
  try {
    const personality = personalities[personalityId as keyof typeof personalities];
    if (!personality) {
      throw new Error('Personalidade não encontrada');
    }

    const systemPrompt = `${personality.prompt}
    
    Contexto adicional: O usuário está em uma jornada de autoconhecimento no app Essentia.
    ${context ? `Contexto específico: ${context}` : ''}`;

    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      max_tokens: 300,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    const aiMessage = response.content[0].type === 'text' ? response.content[0].text : '';
    
    // Extrair insight e ação da resposta se possível
    const lines = aiMessage.split('\n').filter(line => line.trim());
    const message = lines[0] || aiMessage;
    
    return {
      message: aiMessage,
      insight: lines.find(line => line.toLowerCase().includes('insight'))?.replace(/insight:?/i, '').trim(),
      action: lines.find(line => line.toLowerCase().includes('ação') || line.toLowerCase().includes('próximo'))?.replace(/ação:?|próximo:?/i, '').trim()
    };

  } catch (error) {
    console.error('Erro na IA Coach:', error);
    
    // Fallback response personalizada
    const fallbacks = {
      sofia: "Olá! Sou a Sofia. Estou aqui para te ajudar na sua jornada de autoconhecimento. Como posso te apoiar hoje?",
      marcos: "E aí! Sou o Marcos. Vamos colocar as ideias em ação? Me conta o que você quer alcançar!",
      luna: "Olá, querido(a). Sou a Luna. Estou aqui para te guiar na sua conexão interior. O que seu coração está te dizendo?",
      leo: "Oi! Sou o Léo. Vamos organizar seus planos? Me fala sobre o que você quer estrategizar na sua vida."
    };
    
    return {
      message: fallbacks[personalityId as keyof typeof fallbacks] || "Olá! Como posso te ajudar hoje?"
    };
  }
}

export async function generatePersonalizedInsight(
  clarity: number,
  daysActive: number,
  currentStage: string
): Promise<string> {
  try {
    const prompt = `Baseado no progresso do usuário:
    - Clareza atual: ${clarity}%
    - Dias ativos: ${daysActive}
    - Estágio atual: ${currentStage}
    
    Gere um insight personalizado e motivador em português brasileiro sobre a jornada de autoconhecimento.
    Mantenha entre 30-80 palavras, focando no progresso e próximos passos.`;

    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0].type === 'text' ? response.content[0].text : 
      `Com ${clarity}% de clareza em ${daysActive} dias, você está no caminho certo! Continue explorando o estágio "${currentStage}".`;

  } catch (error) {
    console.error('Erro ao gerar insight:', error);
    return `Sua jornada está progredindo! Com ${clarity}% de clareza, continue explorando novas possibilidades.`;
  }
}