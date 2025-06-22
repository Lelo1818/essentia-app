# PROTOCOLO DE VALIDAÇÃO PROFISSIONAL - FLOW

## 🎯 JORNADAS CRÍTICAS PARA CEO (Lelão)

### 1. JORNADA: Meta Impossível → Ajuste Inteligente
**Tempo estimado**: 3 minutos
**O que testar**:
- Criar meta de R$ 50.000 em 2 meses
- Sistema deve REJEITAR e sugerir alternativa
- Verificar se sugestão é coerente com renda atual

**Resultado esperado**: Sistema bloqueia + oferece meta viável

---

### 2. JORNADA: Comportamento → Recompensa Real
**Tempo estimado**: 5 minutos
**O que testar**:
- Simular ação positiva (ex: economizar por 3 dias)
- Verificar se XP é adicionado
- Ver se conquista desbloqueia oferta real

**Resultado esperado**: Ação → XP → Conquista → Oferta tangível

---

### 3. JORNADA: Navegação Completa sem Quebras
**Tempo estimado**: 4 minutos
**O que testar**:
- Clicar em todas as abas do menu
- Verificar se todas carregam sem erro
- Testar em mobile e desktop

**Resultado esperado**: Zero erros, navegação fluida

---

### 4. JORNADA: APIs Respondem em Tempo Real
**Tempo estimado**: 2 minutos
**O que testar**:
- Acessar ofertas, cashback, metas
- Cronometrar tempo de carregamento
- Verificar se dados são consistentes

**Resultado esperado**: < 3 segundos para qualquer tela

---

### 5. JORNADA: Sincronização entre Módulos
**Tempo estimado**: 3 minutos
**O que testar**:
- Alterar algo no dashboard
- Verificar se reflete em outras telas
- Testar persistência ao navegar

**Resultado esperado**: Dados sincronizados em tempo real

---

## 🔧 PROTOCOLO TÉCNICO COMPLETO (Dev)

### FASE 1: Navegação e Interface (30 testes)

#### Teste 1.1: Menu Principal
- [ ] Clicar em cada item do menu
- [ ] Verificar se URL muda corretamente
- [ ] Confirmar que página carrega sem erro
- [ ] **EVIDÊNCIA**: Screenshot de cada tela carregada

#### Teste 1.2: Responsividade Mobile
- [ ] Abrir em dispositivo mobile/tablet
- [ ] Testar todos os botões (tamanho mínimo 44px)
- [ ] Verificar scrolling e zoom
- [ ] **EVIDÊNCIA**: Vídeo de 30s navegando no mobile

#### Teste 1.3: Performance de Carregamento
- [ ] Cronometrar cada tela principal
- [ ] Verificar console sem erros críticos
- [ ] Testar com internet lenta
- [ ] **EVIDÊNCIA**: Screenshot do DevTools com timings

---

### FASE 2: Funcionalidades Core (45 testes)

#### Teste 2.1: Sistema de Metas
- [ ] Criar meta válida → confirmar salvamento
- [ ] Criar meta impossível → confirmar rejeição
- [ ] Editar meta existente → verificar atualização
- [ ] Deletar meta → confirmar remoção
- [ ] **EVIDÊNCIA**: Vídeo do fluxo completo (2 min)

#### Teste 2.2: Sistema de Conquistas
- [ ] Simular ação que gera XP
- [ ] Verificar se XP aparece na interface
- [ ] Confirmar se nível sobe quando aplicável
- [ ] Testar notificação de conquista
- [ ] **EVIDÊNCIA**: Screenshots antes/depois + notificação

#### Teste 2.3: Sistema de Ofertas
- [ ] Acessar página de ofertas
- [ ] Verificar se carregam ofertas reais
- [ ] Testar cópia de cupons
- [ ] Verificar redirecionamento para loja
- [ ] **EVIDÊNCIA**: Vídeo copiando cupom e acessando loja

#### Teste 2.4: Cashback por Mérito
- [ ] Acessar página de cashback-merit
- [ ] Verificar se mostra nível atual
- [ ] Conferir taxa de cashback correta
- [ ] Testar desafios semanais
- [ ] **EVIDÊNCIA**: Screenshot completo da tela

---

### FASE 3: Integrações e APIs (25 testes)

#### Teste 3.1: APIs de Dados Financeiros
- [ ] `/api/financial-summary` → verificar resposta
- [ ] `/api/goals` → confirmar lista de metas
- [ ] `/api/real-offers` → validar ofertas reais
- [ ] Cronometrar tempo de resposta de cada API
- [ ] **EVIDÊNCIA**: Console logs com timing das APIs

#### Teste 3.2: APIs de Validação
- [ ] `/api/goals/validate` → testar meta impossível
- [ ] `/api/achievements/unlock` → simular conquista
- [ ] `/api/sync-test` → verificar sincronização
- [ ] Confirmar responses com status 200
- [ ] **EVIDÊNCIA**: Screenshots do Postman/DevTools

#### Teste 3.3: APIs Comportamentais
- [ ] `/api/cashback-merit` → verificar níveis
- [ ] `/api/weekly-challenges` → listar desafios
- [ ] `/api/behavior-patterns` → análise funcionando
- [ ] `/api/smart-suggestions` → sugestões geradas
- [ ] **EVIDÊNCIA**: JSON responses válidos

---

### FASE 4: Fluxos Comportamentais (20 testes)

#### Teste 4.1: Fluxo Meta → Conquista → Oferta
- [ ] Criar meta realista
- [ ] Simular progresso até 100%
- [ ] Verificar conquista desbloqueada
- [ ] Confirmar oferta relacionada aparece
- [ ] **EVIDÊNCIA**: Vídeo do fluxo completo

#### Teste 4.2: Fluxo Nível → Benefícios
- [ ] Verificar nível atual do usuário
- [ ] Simular ações para subir nível
- [ ] Confirmar benefícios desbloqueados
- [ ] Testar acesso a ofertas premium
- [ ] **EVIDÊNCIA**: Screenshots antes/depois mudança nível

---

## 📋 CHECKLIST FINAL DE ENTREGA

### Critérios de Aprovação
- [ ] **100% dos testes de navegação** passando
- [ ] **95% dos testes funcionais** passando
- [ ] **100% das APIs principais** respondendo < 3s
- [ ] **Todas as evidências** coletadas e organizadas
- [ ] **Zero erros críticos** no console
- [ ] **Mobile 100% funcional**

### Evidências Obrigatórias
1. **Pasta de Screenshots**: Todas as telas principais
2. **Vídeos de Fluxo**: Jornadas críticas funcionando
3. **Logs de Performance**: APIs e carregamento
4. **Relatório de Bugs**: Lista de problemas encontrados
5. **Checklist Preenchido**: Cada teste marcado ✅/❌

---

## 🚨 PROTOCOLO DE BLOQUEIO

### Se qualquer teste CRÍTICO falhar:
1. **Parar entrega imediatamente**
2. **Documentar o problema com evidência**
3. **Estimar tempo de correção**
4. **Só prosseguir após correção + re-teste**

### Testes considerados CRÍTICOS:
- Navegação básica funcionando
- APIs principais respondendo
- Sistema de metas salvando corretamente
- Mobile não quebrado

**Sem exceções. Qualidade não se negocia.**