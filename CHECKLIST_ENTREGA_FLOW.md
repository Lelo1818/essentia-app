# Checklist de Entrega - Flow Sistema Financeiro

## Validação por Blocos com Prova Visual

### Bloco 1: Dashboard Principal
**O que precisa funcionar:**
- [ ] Saldo atual exibido corretamente
- [ ] Cards de receita e gastos com valores reais  
- [ ] Progresso das metas principais
- [ ] Navegação entre módulos sem erro

**Prova necessária:**
- [ ] Print do dashboard carregado
- [ ] Vídeo navegando entre as seções
- [ ] Console log sem erros críticos

---

### Bloco 2: Metas Inteligentes  
**O que precisa funcionar:**
- [ ] Criação de nova meta
- [ ] Cálculo automático de progresso
- [ ] Simulação de prazo/valor
- [ ] Validação de metas impossíveis

**Prova necessária:**
- [ ] Print de meta sendo criada
- [ ] Tela mostrando progresso real
- [ ] Teste de meta impossível rejeitada

---

### Bloco 3: Conquistas + XP
**O que precisa funcionar:**
- [ ] Ação gera XP automaticamente
- [ ] Conquista é desbloqueada
- [ ] Nível sobe quando aplicável
- [ ] Notificação aparece

**Prova necessária:**
- [ ] Print de conquista desbloqueada
- [ ] XP sendo adicionado na tela
- [ ] Mudança de nível visível

---

### Bloco 4: Ofertas & Cupons
**O que precisa funcionar:**
- [ ] Ofertas carregam da API
- [ ] Desbloqueio por mérito/nível
- [ ] Cupom pode ser copiado
- [ ] Redirecionamento funciona

**Prova necessária:**
- [ ] Print das ofertas carregadas
- [ ] Cupom sendo copiado
- [ ] Oferta desbloqueada após ação

---

### Bloco 5: Notificações Inteligentes
**O que precisa funcionar:**
- [ ] Pop-up aparece no momento certo
- [ ] Mensagem relevante ao contexto
- [ ] Ação leva à tela correta
- [ ] Não é intrusivo demais

**Prova necessária:**
- [ ] Print de notificação aparecendo
- [ ] Contexto correto da mensagem
- [ ] Fluxo de ação funcionando

---

### Bloco 6: Navegação Geral
**O que precisa funcionar:**
- [ ] Menu lateral responsivo
- [ ] URLs diretas funcionam
- [ ] Mobile/desktop adaptáveis
- [ ] Sem bugs visuais críticos

**Prova necessária:**
- [ ] Vídeo navegando todas as telas
- [ ] Teste em mobile
- [ ] Sem erros no console

---

## Critério de Aprovação

**Para cada bloco:**
✅ **APROVADO** = Funciona conforme especificado + prova visual  
⚠️ **REVISAR** = Funciona parcialmente, precisa ajuste  
❌ **REPROVAR** = Não funciona ou tem erro crítico

**Para liberação final:**
- Mínimo 5 dos 6 blocos aprovados
- Nenhum bloco reprovado
- Navegação geral funcionando

## Template de Feedback

```
BLOCO [X]: [NOME]
Status: [✅/⚠️/❌]
Observações: [O que funcionou/não funcionou]
Prova anexada: [Sim/Não]
Próximo passo: [Se necessário]
```