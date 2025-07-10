import Anthropic from '@anthropic-ai/sdk';

console.log('🔍 Testando API Anthropic...');

// Verifica se a API key está configurada
if (!process.env.ANTHROPIC_API_KEY) {
  console.log('❌ ANTHROPIC_API_KEY não encontrada');
  process.exit(1);
}

console.log('✅ API Key configurada');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function testAI() {
  try {
    console.log('🚀 Fazendo requisição para Anthropic...');
    
    const message = await anthropic.messages.create({
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Responda apenas: "API funcionando!"' }],
      model: "claude-sonnet-4-20250514",
    });

    console.log('✅ Resposta recebida:', message.content[0].text);
    console.log('🎉 API Anthropic funcionando perfeitamente!');
    
  } catch (error) {
    console.log('❌ Erro na API:', error.message);
    console.log('📝 Detalhes:', error);
  }
}

testAI();