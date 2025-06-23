// Script para validar se o botão está presente no DOM
const fs = require('fs');

try {
  const html = fs.readFileSync('/tmp/homepage.html', 'utf8');
  
  console.log('=== VALIDAÇÃO DO BOTÃO ===');
  
  // Procurar por Investimentos
  const hasInvestimentos = html.includes('Investimentos');
  console.log('✓ Card "Investimentos" encontrado:', hasInvestimentos);
  
  // Procurar por R$ 8.750
  const hasValue = html.includes('8.750') || html.includes('8750');
  console.log('✓ Valor R$ 8.750 encontrado:', hasValue);
  
  // Procurar pelo botão
  const hasButton = html.includes('Ver Detalhes');
  console.log('✓ Botão "Ver Detalhes" encontrado:', hasButton);
  
  // Procurar por elementos do botão
  const hasPurpleButton = html.includes('bg-purple-600');
  console.log('✓ Estilo roxo do botão encontrado:', hasPurpleButton);
  
  if (hasInvestimentos && hasValue && hasButton && hasPurpleButton) {
    console.log('\n🎉 SUCESSO: Botão implementado corretamente!');
  } else {
    console.log('\n❌ PROBLEMA: Botão não está presente no HTML');
  }
  
} catch (error) {
  console.error('Erro ao validar:', error.message);
}