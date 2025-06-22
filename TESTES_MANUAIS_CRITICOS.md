# TESTES MANUAIS CRÍTICOS - EXECUÇÃO OBRIGATÓRIA

## Status: ⏳ AGUARDANDO EXECUÇÃO MANUAL

### 🎯 JORNADAS CEO (5 testes críticos)

#### ✅ TESTE 1: Meta Impossível → Ajuste Inteligente
**APROVADO AUTOMATICAMENTE**
- Input: R$ 50.000 em 2 meses
- Output: Sistema rejeitou corretamente
- Evidência: API response validada

#### ⏳ TESTE 2: Comportamento → Recompensa Real
**AGUARDANDO EXECUÇÃO MANUAL**
- [ ] Acessar `/cashback-merit`
- [ ] Simular 3 dias de economia consistente
- [ ] Verificar XP adicionado
- [ ] Confirmar conquista desbloqueada
- [ ] Ver oferta específica liberada
- **Evidência necessária**: Screenshot do fluxo completo

#### ⏳ TESTE 3: Navegação Completa sem Quebras
**AGUARDANDO EXECUÇÃO MANUAL**
- [ ] Clicar em TODAS as abas do menu principal
- [ ] Verificar carregamento sem erro 404
- [ ] Testar em mobile (responsive)
- [ ] Cronometrar carregamento < 3s
- **Evidência necessária**: Vídeo de 1 min navegando

#### ⏳ TESTE 4: APIs em Tempo Real (Mobile)
**AGUARDANDO EXECUÇÃO MANUAL**
- [ ] Abrir app em dispositivo mobile
- [ ] Testar carregamento dashboard
- [ ] Verificar metas, ofertas, cashback
- [ ] Confirmar touch responsivo
- **Evidência necessária**: Screenshots mobile funcionando

#### ⏳ TESTE 5: Sincronização entre Módulos
**AGUARDANDO EXECUÇÃO MANUAL**
- [ ] Criar nova meta no `/goals`
- [ ] Verificar se aparece no dashboard
- [ ] Alterar progresso de meta
- [ ] Confirmar atualização em tempo real
- **Evidência necessária**: Before/after screenshots

---

## 🔧 TESTES FUNCIONAIS CORE (8 testes)

#### ⏳ NAVEGAÇÃO: Menu Responsivo
- [ ] Desktop: Todos os links funcionam
- [ ] Mobile: Menu hambúrguer abre/fecha
- [ ] Tablet: Layout adapta corretamente
- **Evidência**: Screenshots 3 dispositivos

#### ⏳ METAS: CRUD Completo
- [ ] Criar meta válida → salvamento OK
- [ ] Editar meta existente → atualização OK
- [ ] Deletar meta → remoção OK
- [ ] Progresso meta → cálculo correto
- **Evidência**: Screenshots de cada operação

#### ⏳ OFERTAS: Sistema Real
- [ ] Página `/ofertas` carrega ofertas
- [ ] Cupons são copiáveis
- [ ] Redirecionamento para lojas funciona
- [ ] Cashback por mérito visível
- **Evidência**: Screenshot + teste de cupom

#### ⏳ CONQUISTAS: Gamificação
- [ ] Ação gera XP visível
- [ ] Nível sobe automaticamente
- [ ] Badge/conquista aparece
- [ ] Notificação é exibida
- **Evidência**: Screenshots XP antes/depois

#### ⏳ CASHBACK: Sistema de Mérito
- [ ] Página `/cashback-merit` carrega
- [ ] Nível atual correto
- [ ] Taxa de cashback visível
- [ ] Desafios semanais funcionam
- **Evidência**: Screenshot página completa

#### ⏳ PERFORMANCE: Tempo Real
- [ ] Dashboard < 2 segundos
- [ ] Metas < 2 segundos
- [ ] Ofertas < 3 segundos
- [ ] Sem erros no console
- **Evidência**: DevTools Network tab

#### ⏳ DADOS: Consistência
- [ ] Saldo matemática correta
- [ ] Metas progresso coerente
- [ ] Datas formatadas correctly
- [ ] Valores monetários OK
- **Evidência**: Screenshots com valores

#### ⏳ MOBILE: Touch Interface
- [ ] Botões min 44px (touch-friendly)
- [ ] Scroll suave
- [ ] Zoom controlado
- [ ] Orientação portrait/landscape
- **Evidência**: Vídeo mobile usage

---

## 📋 CHECKLIST DE EVIDÊNCIAS OBRIGATÓRIAS

### Screenshots Necessários (12 total)
- [ ] Dashboard desktop completo
- [ ] Dashboard mobile completo
- [ ] Página metas com 6 metas visíveis
- [ ] Página ofertas carregada
- [ ] Página cashback-merit completa
- [ ] Sistema de conquistas ativo
- [ ] Menu responsivo (3 devices)
- [ ] DevTools performance tab
- [ ] Console sem erros críticos
- [ ] Meta sendo criada (before/after)
- [ ] XP sendo adicionado (before/after)
- [ ] Cupom sendo copiado

### Vídeos Necessários (3 total)
- [ ] Navegação completa (1 min)
- [ ] Fluxo meta → conquista → oferta (2 min)
- [ ] Mobile touch interface (30s)

---

## 🚨 BLOQUEADORES CRÍTICOS

### Se qualquer teste falhar:
1. **PARAR execução imediatamente**
2. **Documentar problema específico**
3. **Estimar tempo correção**
4. **Corrigir antes de prosseguir**

### Testes que NÃO PODEM falhar:
- Navegação básica (404s, broken links)
- APIs principais (dashboard, metas)
- Mobile básico (responsive, touch)
- Performance < 5s qualquer tela

---

## ✅ CRITÉRIO FINAL DE APROVAÇÃO

- **100% testes críticos CEO** passando
- **90% testes funcionais** passando
- **Todas evidências** coletadas
- **Zero bloqueadores** ativos

**Só então: SISTEMA LIBERADO PARA DEMONSTRAÇÃO**