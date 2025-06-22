# Roteiro de Teste - Sistema de Ofertas Real

## 🎯 Objetivo do Teste
Validar o fluxo completo de ofertas inteligentes baseadas no comportamento financeiro real do usuário.

## 🧪 Cenários de Teste

### Cenário 1: Meta Alcançada → Desbloqueio de Oferta
**Ação:** Usuário completa uma meta financeira
**Resultado Esperado:**
- Pop-up de parabéns aparece
- Oferta educacional é desbloqueada (ex: Udemy 80% OFF)
- Card aparece na página /ofertas
- Cupom fica disponível para cópia

**Como Testar:**
1. Navegue para /metas
2. Complete uma meta (simule atingindo 100%)
3. Volte ao dashboard - deve aparecer notificação
4. Verifique se nova oferta apareceu em /ofertas

### Cenário 2: Nível Up → Ofertas Premium
**Ação:** Usuário sobe de nível no sistema de conquistas
**Resultado Esperado:**
- Ofertas premium são desbloqueadas
- Cashback maior fica disponível
- Produtos de maior valor aparecem

**Como Testar:**
1. Navegue para /conquistas
2. Complete ações para subir de nível
3. Verifique novas ofertas em /ofertas
4. Confirme se ofertas premium estão visíveis

### Cenário 3: Saldo Alto → Ofertas de Investimento
**Ação:** Usuário mantém saldo alto por período
**Resultado Esperado:**
- Ofertas de investimento aparecem
- Produtos de maior ticket médio
- Cashback em categorias premium

**Como Testar:**
1. Simule saldo alto no dashboard
2. Aguarde trigger automático
3. Verifique ofertas de investimento
4. Teste clique e redirecionamento

## 🔗 Fluxo de Integração com Parceiros

### Estrutura de Dados Real
```json
{
  "id": "partner_123",
  "partner": "Méliuz",
  "title": "Amazon - 4% Cashback",
  "description": "Cashback em todas as compras",
  "discount": 0,
  "cashback": 4.0,
  "category": "marketplace",
  "couponCode": "FLOW4PCT",
  "requirements": "Saldo positivo por 30 dias",
  "validUntil": "2025-12-31",
  "affiliateUrl": "https://meliuz.com.br/amazon?ref=flow",
  "apiSource": "meliuz_real"
}
```

### Parceiros Simulados (Prontos para Real)
1. **Méliuz** - Cashback em marketplace
2. **Promobit** - Descontos em eletrônicos
3. **Cuponeria** - Cupons educacionais
4. **Ame Digital** - Cashback supermercado/combustível

## 🎮 Roteiro de Demonstração (5 minutos)

### Minuto 1: Entrada no Sistema
- Login/Dashboard principal
- Mostrar saldo atual e metas

### Minuto 2: Completar Meta
- Simular atingir meta de economia
- Pop-up de parabéns aparece
- Oferta educacional é desbloqueada

### Minuto 3: Explorar Ofertas
- Navegar para página de ofertas
- Mostrar filtros e categorias
- Destacar ofertas baseadas no perfil

### Minuto 4: Usar Cupom
- Clicar em oferta desbloqueada
- Copiar código do cupom
- Simular redirecionamento para parceiro

### Minuto 5: Valor Demonstrado
- Mostrar economia potencial
- Explicar personalização por comportamento
- Revelar próximos parceiros reais

## 🧠 Lógica de Desbloqueio

### Condições Implementadas
- ✅ Meta completada = Oferta educacional
- ✅ Nível premium = Ofertas de maior valor
- ✅ Saldo alto = Produtos investimento
- ✅ Uso frequente = Cashback dobrado

### Rastreamento de Uso
```typescript
// Log de clique em oferta
{
  userId: "user_123",
  offerId: "partner_456",
  action: "clicked",
  timestamp: "2025-06-22T19:30:00Z",
  source: "offers_page"
}
```

## 💰 Monetização Simulada

### Receita por Categoria
- **Educação:** 15-30% comissão
- **Eletrônicos:** 2-5% comissão
- **Marketplace:** 3-8% cashback
- **Serviços:** R$ 10-50 por conversão

### Projeção Realista
- 1.000 usuários ativos
- 10% conversão em ofertas
- Ticket médio R$ 300
- Comissão média 5% = R$ 1.500/mês

## 🎯 Próximos Passos Reais

### Integração Imediata (Semana 1)
1. Contato com 1 parceiro real (ex: livraria online)
2. Teste de API simples
3. Validação de tracking

### Escala (Mês 1)
1. Parceria com Méliuz ou similar
2. API webhooks para atualização automática
3. Dashboard de conversões

### Expansão (Mês 3)
1. 5+ parceiros ativos
2. Machine learning para personalização
3. Sistema de afiliados próprio

## 🔧 Como Rodar os Testes

### Teste Local
```bash
# 1. Navegar para ofertas
curl http://localhost:5000/api/real-offers

# 2. Verificar cashback
curl http://localhost:5000/api/real-cashback

# 3. Simular desbloqueio
# (interagir com interface)
```

### Validação Visual
1. Abrir /ofertas
2. Verificar cards carregando
3. Testar filtros
4. Simular cliques
5. Confirmar pop-ups

## 📈 Métricas de Sucesso

### Engagement
- Cliques em ofertas > 15%
- Tempo na página > 2 min
- Retorno para ofertas > 30%

### Conversão
- Uso de cupons > 5%
- Completar compra > 2%
- Valor médio por usuário > R$ 50/mês

### Retenção
- Usuários ativos retornando para ofertas
- Crescimento em metas completadas
- Aumento no nível médio dos usuários