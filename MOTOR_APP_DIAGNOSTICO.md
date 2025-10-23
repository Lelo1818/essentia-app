# 🔧 DIAGNÓSTICO: Motor do App Essentia

## 🎯 PROBLEMA CENTRAL
**Os módulos estão funcionando separados mas NÃO compartilham estado**

- ✅ FEME funciona (salva check-ins)
- ✅ Guru funciona (gera respostas IA)
- ✅ Portais funcionam (salvam reflexões)
- ❌ **Mas não se comunicam entre si**
- ❌ **Dados não persistem entre telas**
- ❌ **Coerência não é calculada/atualizada**

---

## 📊 TABELAS EXISTENTES (PostgreSQL)

### 1. `feme_checkins` - Check-ins FEME
```sql
- id (serial)
- userId (integer)
- fisico (integer 0-10)
- energetico (integer 0-10)
- mental (integer 0-10)
- espiritual (integer 0-10)
- coerencia (decimal 0.00-1.00) ⚠️ NÃO ESTÁ SENDO CALCULADO
- intention (text)
- meta (jsonb)
- createdAt (timestamp)
```
**STATUS**: Salva dados mas **coerência não é calculada** no backend

---

### 2. `chat_messages` - Histórico do Guru
```sql
- id (serial)
- userId (integer)
- role (varchar) - 'user' ou 'assistant'
- content (text)
- sessionId (varchar) - Para agrupar conversas
- createdAt (timestamp)
```
**STATUS**: Backend 100% implementado, mas **frontend NÃO integrado**

**Endpoints funcionando:**
- `POST /api/guru/messages` - Salva mensagem
- `GET /api/guru/messages?sessionId=X` - Busca histórico
- `GET /api/guru/sessions` - Lista sessões recentes

**Problema:** AI Therapist (`client/src/components/purpose/ai-therapist.tsx`) não usa esses endpoints

---

### 3. `portal_reflections` - Reflexões dos Portais
```sql
- id (serial)
- userId (integer)
- portalType (varchar) - 'intuicao', 'clareza', 'gratidao', 'recomeco'
- content (text)
- createdAt (timestamp)
```
**STATUS**: Salva reflexões mas **não afeta FEME nem Guru**

---

### 4. `user_progress` - Gamificação
```sql
- id (serial)
- userId (integer)
- points (integer) ⚠️ NÃO ATUALIZA CORRETAMENTE
- level (integer)
- breathSessionsCompleted (integer)
- femeCheckinsCompleted (integer) ⚠️ NÃO SINCRONIZA
- aiSessionsCompleted (integer)
- dailyStreak (integer)
- lastActivityAt (timestamp)
```
**STATUS**: Existe mas **não sincroniza** com feme_checkins, chat_messages, portal_reflections

---

### 5. `ai_suggestions` - Sugestões da IA
```sql
- id (serial)
- userId (integer)
- suggestionType (varchar) - 'biometric_insight', 'therapist_advice', etc
- content (text)
- source (varchar) - 'biometric', 'sofia', 'system'
- metadata (jsonb)
- createdAt (timestamp)
```
**STATUS**: Existe mas **não é usado** para persistir insights do Guru

---

## 🔴 GAPS CRÍTICOS DE INTEGRAÇÃO

### GAP #1: FEME não alimenta o Guru
**Problema**: Guru não tem contexto do estado FEME do usuário

**O que falta:**
```typescript
// Quando Guru inicia conversa, deve buscar:
const latestFeme = await storage.getFemeCheckinsByUserId(userId);
const coherence = await storage.getFemeCoherence(userId); // ⚠️ NÃO EXISTE

// Passar pro prompt da IA:
const context = `
Último check-in FEME:
- Físico: ${latestFeme.fisico}/10
- Energético: ${latestFeme.energetico}/10
- Mental: ${latestFeme.mental}/10
- Espiritual: ${latestFeme.espiritual}/10
- Coerência: ${coherence}%
`;
```

---

### GAP #2: Coerência não é calculada
**Problema**: Campo `coerencia` existe em `feme_checkins` mas sempre null

**O que existe:**
- ✅ Motor científico em `server/feme-coherence.ts`
- ✅ Endpoint `GET /api/feme/coherence`
- ❌ **NÃO é executado** quando usuário faz check-in

**O que falta:**
```typescript
// Quando salva check-in FEME:
POST /api/feme/checkins
  ↓
  1. Salvar check-in
  2. ⚠️ CALCULAR COERÊNCIA (não está acontecendo)
  3. ⚠️ ATUALIZAR campo coerencia (não está acontecendo)
  4. Retornar check-in COM coerência
```

**Arquivo que precisa modificar:**
`server/routes-clean.ts` - Endpoint `POST /api/feme/checkins`

---

### GAP #3: Guru não salva histórico
**Problema**: AI Therapist gera respostas mas não persiste no banco

**Backend pronto:**
- ✅ Tabela `chat_messages` criada
- ✅ Endpoints funcionando
- ✅ Storage methods implementados

**Frontend quebrado:**
```typescript
// client/src/components/purpose/ai-therapist.tsx
// Atualmente NÃO salva no banco, só exibe na UI

// O que falta:
const handleSend = async () => {
  // 1. Salvar mensagem do usuário
  await apiRequest('POST', '/api/guru/messages', {
    role: 'user',
    content: userMessage,
    sessionId: currentSessionId
  });
  
  // 2. Chamar IA
  const response = await callAI(userMessage);
  
  // 3. Salvar resposta da IA
  await apiRequest('POST', '/api/guru/messages', {
    role: 'assistant',
    content: response,
    sessionId: currentSessionId
  });
};
```

---

### GAP #4: Portais não afetam estado
**Problema**: Reflexões salvas mas não conectam com FEME/Guru

**O que falta:**
```typescript
// Quando completa portal:
POST /api/reflections
  ↓
  1. Salvar reflexão
  2. ⚠️ ATUALIZAR userProgress (não acontece)
  3. ⚠️ GERAR ai_suggestion baseada na reflexão (não acontece)
  4. ⚠️ Guru deveria ter acesso a essas reflexões (não tem)
```

---

### GAP #5: userProgress não sincroniza
**Problema**: Contadores não atualizam quando ações acontecem

**Fluxo quebrado:**
```
User faz check-in FEME
  ↓
  femeCheckins table ✅ (salva)
  ↓
  userProgress.femeCheckinsCompleted ❌ (NÃO incrementa)
  ↓
  userProgress.points ❌ (NÃO aumenta)

User completa respiração
  ↓
  breathSessions table ✅ (salva)
  ↓
  userProgress.breathSessionsCompleted ❌ (NÃO incrementa)

User conversa com Guru
  ↓
  chatMessages table ✅ (deveria salvar, mas frontend não integrado)
  ↓
  userProgress.aiSessionsCompleted ❌ (NÃO incrementa)
```

---

## 🔧 SOLUÇÃO: Arquitetura de Integração

### MOTOR CENTRAL: `server/integration-engine.ts` (NÃO EXISTE - PRECISA CRIAR)

```typescript
export class IntegrationEngine {
  
  // Executado após CADA check-in FEME
  async afterFemeCheckin(userId: number, checkinId: number) {
    // 1. Calcular coerência
    const coherence = await calculateCoherence(userId);
    
    // 2. Atualizar check-in com coerência
    await updateCheckinCoherence(checkinId, coherence);
    
    // 3. Incrementar progresso
    await incrementProgress(userId, 'femeCheckinsCompleted');
    
    // 4. Adicionar pontos
    await addPoints(userId, 25, 'feme_checkin');
    
    // 5. Gerar insight IA (se coerência baixa)
    if (coherence.overall < 0.5) {
      await generateBiometricInsight(userId, coherence);
    }
  }
  
  // Executado após conversa com Guru
  async afterGuruMessage(userId: number, messageId: number) {
    // 1. Incrementar aiSessionsCompleted
    await incrementProgress(userId, 'aiSessionsCompleted');
    
    // 2. Salvar insight como ai_suggestion
    const message = await getMessage(messageId);
    if (message.role === 'assistant') {
      await saveAsSuggestion(userId, message.content, 'guru');
    }
  }
  
  // Executado após reflexão de portal
  async afterPortalReflection(userId: number, reflectionId: number) {
    // 1. Adicionar pontos
    await addPoints(userId, 75, 'portal_reflection');
    
    // 2. Gerar insight conectado
    const reflection = await getReflection(reflectionId);
    await generatePortalInsight(userId, reflection);
    
    // 3. Atualizar última atividade
    await updateLastActivity(userId);
  }
}
```

---

## 📝 PRÓXIMOS PASSOS (Para o GPT)

### PRIORIDADE 1: Conectar Coerência
1. Modificar `POST /api/feme/checkins` para calcular coerência após salvar
2. Usar motor `server/feme-coherence.ts` que já existe
3. Persistir coerência no campo `coerencia` da tabela

**Arquivo**: `server/routes-clean.ts` linha ~780

---

### PRIORIDADE 2: Integrar Guru com banco
1. Modificar `client/src/components/purpose/ai-therapist.tsx`
2. Salvar mensagens antes/depois de chamar IA
3. Buscar histórico ao abrir Guru
4. Incrementar `userProgress.aiSessionsCompleted`

**Arquivos**:
- `client/src/components/purpose/ai-therapist.tsx`
- Usar endpoints que já existem em `server/routes-clean.ts`

---

### PRIORIDADE 3: Criar Integration Engine
1. Criar `server/integration-engine.ts`
2. Importar nos endpoints de FEME, Guru, Portais
3. Chamar `engine.after*()` após cada ação
4. Sincronizar `userProgress` automaticamente

---

### PRIORIDADE 4: Passar contexto FEME pro Guru
1. Quando Guru abre, buscar último FEME + coerência
2. Incluir no prompt do Claude:
```
Contexto do usuário:
- Estado físico atual: X/10
- Coerência energética: Y%
- Última intenção: "..."
```

---

## 🎯 RESULTADO ESPERADO

**Antes (agora):**
- User faz FEME → salva → fim
- User fala com Guru → responde → fim
- User completa Portal → salva → fim
- **Nenhum dado cruza entre módulos**

**Depois (integrado):**
- User faz FEME → 
  - ✅ Calcula coerência
  - ✅ Atualiza progresso (+25 pts)
  - ✅ Guru tem acesso a esse estado
  - ✅ Se baixo, gera insight automático

- User fala com Guru →
  - ✅ Guru vê estado FEME + reflexões
  - ✅ Histórico salvo no banco
  - ✅ Progresso incrementa
  - ✅ Insights viram suggestions

- User completa Portal →
  - ✅ Reflexão salva
  - ✅ Progresso atualiza (+75 pts)
  - ✅ Guru pode referenciar reflexão
  - ✅ FEME influenciado por reflexão

---

## 📦 CÓDIGO EXEMPLO PARA INTEGRATION ENGINE

```typescript
// server/integration-engine.ts

import { storage } from './storage';
import { calculateFemeCoherence } from './feme-coherence';

export async function afterFemeCheckin(userId: number, checkinId: number) {
  // 1. Buscar check-in recém salvo
  const checkins = await storage.getFemeCheckinsByUserId(userId);
  const latest = checkins[0];
  
  // 2. Calcular coerência usando motor existente
  const coherenceData = await calculateFemeCoherence(latest);
  
  // 3. Atualizar campo coerencia no check-in
  await db.update(femeCheckins)
    .set({ coerencia: coherenceData.overall })
    .where(eq(femeCheckins.id, checkinId));
  
  // 4. Atualizar progresso do usuário
  await storage.updateUserProgress(userId, 25, 'feme_checkin');
  
  // 5. Se coerência baixa, gerar insight
  if (coherenceData.overall < 0.5) {
    await storage.createAiSuggestion({
      userId,
      suggestionType: 'biometric_insight',
      content: `Sua coerência está em ${Math.round(coherenceData.overall * 100)}%. ${coherenceData.recommendations[0]}`,
      source: 'biometric',
      metadata: { coherence: coherenceData }
    });
  }
  
  return { success: true, coherence: coherenceData.overall };
}

export async function afterGuruMessage(
  userId: number, 
  role: 'user' | 'assistant',
  content: string,
  sessionId: string
) {
  // 1. Salvar mensagem no banco
  const message = await storage.createChatMessage({
    userId,
    role,
    content,
    sessionId
  });
  
  // 2. Se é resposta do assistente, incrementar contador
  if (role === 'assistant') {
    await storage.updateUserProgress(userId, 10, 'guru_session');
    
    // 3. Salvar como suggestion para histórico
    await storage.createAiSuggestion({
      userId,
      suggestionType: 'therapist_advice',
      content,
      source: 'sofia',
      metadata: { sessionId }
    });
  }
  
  return message;
}

export async function afterPortalReflection(
  userId: number,
  portalType: string,
  content: string
) {
  // 1. Salvar reflexão
  const reflection = await storage.createPortalReflection({
    userId,
    portalType,
    content
  });
  
  // 2. Adicionar pontos significativos
  await storage.updateUserProgress(userId, 75, `portal_${portalType}`);
  
  // 3. Gerar insight conectado
  await storage.createAiSuggestion({
    userId,
    suggestionType: 'portal_insight',
    content: `Reflexão capturada: "${content.substring(0, 100)}..."`,
    source: 'system',
    metadata: { portalType, reflectionId: reflection.id }
  });
  
  return reflection;
}
```

---

## 🔍 ONDE MODIFICAR

### 1. `server/routes-clean.ts`

**Linha ~780** - Endpoint POST /api/feme/checkins:
```typescript
// ANTES:
app.post("/api/feme/checkins", async (req, res) => {
  // ... validação
  const checkin = await storage.createFemeCheckin(validatedData);
  res.json(checkin); // ❌ Sem integração
});

// DEPOIS:
app.post("/api/feme/checkins", async (req, res) => {
  // ... validação
  const checkin = await storage.createFemeCheckin(validatedData);
  
  // ✅ Integração
  await afterFemeCheckin(req.user!.id, checkin.id);
  
  res.json(checkin);
});
```

---

### 2. `client/src/components/purpose/ai-therapist.tsx`

**Precisa modificar o fluxo completo:**
```typescript
// ANTES (aproximado):
const handleSend = async () => {
  const response = await callAI(message);
  setMessages([...messages, userMsg, aiMsg]); // ❌ Só UI
};

// DEPOIS:
const handleSend = async () => {
  // 1. Salvar mensagem user
  await apiRequest('POST', '/api/guru/messages', {
    role: 'user',
    content: message,
    sessionId
  });
  
  // 2. Buscar contexto FEME
  const femeContext = await apiRequest('GET', '/api/feme/coherence');
  
  // 3. Chamar IA com contexto
  const response = await callAI(message, femeContext);
  
  // 4. Salvar resposta IA
  await apiRequest('POST', '/api/guru/messages', {
    role: 'assistant',
    content: response,
    sessionId
  });
  
  // 5. Atualizar UI
  setMessages([...messages, userMsg, aiMsg]);
};
```

---

## ✅ VALIDAÇÃO

Para confirmar que integração funciona:

```typescript
// TEST 1: FEME → Coerência
const checkin = await POST('/api/feme/checkins', { fisico: 8, ... });
assert(checkin.coerencia !== null); // ✅ Coerência calculada
const progress = await GET('/api/progress');
assert(progress.femeCheckinsCompleted === 1); // ✅ Contador incrementado
assert(progress.points >= 25); // ✅ Pontos adicionados

// TEST 2: Guru → Histórico
await POST('/api/guru/messages', { role: 'user', content: 'Oi' });
const messages = await GET('/api/guru/messages');
assert(messages.length > 0); // ✅ Mensagem salva
const progress2 = await GET('/api/progress');
assert(progress2.aiSessionsCompleted === 1); // ✅ Contador incrementado

// TEST 3: Portal → Integração
await POST('/api/reflections', { portalType: 'intuicao', content: '...' });
const progress3 = await GET('/api/progress');
assert(progress3.points >= 75); // ✅ Pontos de portal adicionados
```

---

## 🎯 RESUMO EXECUTIVO

**Problema**: Módulos isolados, dados não compartilham

**Solução**: Integration Engine que conecta tudo

**Impacto**:
- ✅ FEME alimenta Guru com contexto
- ✅ Coerência calculada e persistida
- ✅ Portais influenciam estado
- ✅ Progresso sincronizado
- ✅ IA tem visão holística do usuário

**Prioridades**:
1. Coerência (1 arquivo)
2. Guru histórico (1 arquivo)
3. Integration Engine (1 arquivo novo)
4. Contexto FEME→Guru (modificar prompt)

---

*Documento gerado: 23/10/2025*
*Stack: PostgreSQL + Drizzle + Express + React + Anthropic Claude*
