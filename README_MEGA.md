# 🚀 MEGA CONSOLIDADO

## 📁 Arquivos Incluídos

```
mega/
├── essentia-mega.tsx       # Frontend completo
├── routes-clean.ts         # Backend API routes
├── ESSENTIA_HANDOVER.md   # Especificações técnicas
└── README_MEGA.md         # Este arquivo
```

## 🎯 Descrição

Versão **MEGA CONSOLIDADA** com todos os recursos:
- ✅ Onboarding completo (12 perguntas)
- ✅ Roda da Vida (8 áreas)
- ✅ Tríade Essentia
- ✅ Check-in emocional
- ✅ Dashboard com avatar reativo
- ✅ Jornada 6 estágios clicáveis
- ✅ 7 Portais imersivos
- ✅ Respiração 174Hz com som
- ✅ Rituais matinais/noturnos
- ✅ Diário com insights IA
- ✅ Chat IA (4 personas)
- ✅ Comunidade

## 🔧 Como Usar

### **1. Integração Frontend**

```typescript
// Em App.tsx
import EssentiaMega from './pages/essentia-mega';

<Route path="/essentia-mega" component={EssentiaMega} />
```

### **2. Integração Backend**

```typescript
// Em server/index.ts
import { cleanRoutes } from './routes-clean';

app.use('/api', cleanRoutes);
```

### **3. Dependências Necessárias**

**Frontend** (já no shared.zip):
- React 18.x
- Lucide React
- Tailwind CSS
- Shadcn UI
- @tanstack/react-query

**Backend** (já no shared.zip):
- Express
- @anthropic-ai/sdk (opcional)

### **4. Variáveis de Ambiente**

```bash
# .env
NODE_ENV=development
PORT=5000

# Opcional - Chat IA real
ANTHROPIC_API_KEY=sk-ant-api03-...

# Opcional - Persistência database
DATABASE_URL=postgresql://...
```

### **5. Executar**

```bash
# Instalar
npm install

# Desenvolvimento
npm run dev

# Acessar
http://localhost:5000/essentia-mega
```

## 🗂️ Estrutura de Dados

### **UserProfile (LocalStorage)**

```typescript
interface UserProfile {
  id: string;
  name: string;
  
  // Roda da Vida
  lifeWheel: {
    relacionamentos: number;
    carreira: number;
    saude: number;
    crescimento: number;
    financas: number;
    lazer: number;
    ambiente: number;
    contribuicao: number;
  };
  
  // Tríade
  triadScores: {
    consciencia: number;
    energia: number;
    coerencia: number;
  };
  
  // Progresso
  streak: number;
  totalPractices: number;
  clarity: number;
  journeyStage: number; // 1-6
  
  // Check-ins
  dailyCheckIns: Array<{
    date: string;
    mood: number;
    energy: number;
  }>;
  
  // Diário
  journal: Array<{
    date: string;
    entry: string;
    aiInsight?: string;
  }>;
  
  // Portais
  completedPortals: string[];
  
  // Rituais
  rituals: {
    morning: boolean;
    evening: boolean;
  };
}
```

### **LocalStorage Key**
```javascript
localStorage.getItem('essentia-mega-user')
```

## 🎨 Fluxo Completo

### **1. First-time User**
```
Intro → Onboarding (nome) → Roda da Vida (8 áreas) → 
Tríade (3 scores) → Check-in → Dashboard
```

### **2. Returning User**
```
Check-in emocional → Dashboard → [Escolhe atividade]
```

### **3. Atividades Disponíveis**
- **Jornada:** Ver/navegar 6 estágios
- **Portais:** Explorar 7 portais
- **Práticas:** Respiração, Rituais, Diário, Chat IA
- **Comunidade:** Ver posts, conectar

## 🎭 Avatar System

### **Estados**
```javascript
'calm':      🧘 (purple)  - Respiração, meditação
'attentive': 👁️ (amber)   - Portais, atividades
'grateful':  🙏 (green)   - Completar práticas
```

### **Aparece em:**
- Header Dashboard
- Aba Jornada
- Aba Portais
- Diário
- Chat IA
- Rituais
- Respiração

## 🔊 Sistema de Som

### **Web Audio API**
```javascript
// 174Hz sine wave
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.frequency.setValueAtTime(174, audioContext.currentTime);
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
```

### **Triggers**
- **Inicia:** Ao clicar "Respiração Guiada"
- **Para:** Ao completar ou sair
- **Indicador:** 🔊 visível quando ativo

## 🤖 Sistema de IA (4 Personas)

### **Endpoint**
```
POST /api/ai-coach
Content-Type: application/json

{
  "message": "Como lidar com ansiedade?",
  "persona": "SOFIA",
  "context": {
    "triad": { consciencia: 75, energia: 82, coerencia: 68 },
    "mood": 3
  }
}
```

### **Fallback**
Se `ANTHROPIC_API_KEY` não configurada:
- Sistema usa respostas pré-definidas
- Contextualizadas por persona
- Funcionamento garantido

### **Personas**
```javascript
SOFIA:  🌸 Empatia & Acolhimento
MARCUS: 🎯 Estratégia & Ação
LUNA:   🌙 Intuição & Reflexão
LEO:    🦁 Energia & Motivação
```

## 🌀 7 Portais

```javascript
1. Clareza (👁️)    - from-blue-500 to-cyan-500
2. Presença (💚)    - from-green-500 to-emerald-500
3. Coragem (🛡️)     - from-red-500 to-orange-500
4. Sabedoria (📚)   - from-purple-500 to-pink-500
5. Intuição (🌙)    - from-pink-500 to-rose-500
6. Propósito (🎯)   - from-orange-500 to-amber-500
7. Conexão (👥)     - from-cyan-500 to-teal-500

Duração: 50s cada
Progress: 0-100% (200ms steps)
```

## 🚀 Jornada 6 Estágios

```javascript
Estágio 1: 🌅 Despertar Interior
Estágio 2: 🧠 Autoconhecimento
Estágio 3: ✨ Descoberta de Paixões
Estágio 4: 💫 Relacionamentos
Estágio 5: 🎯 Missão
Estágio 6: 👑 Vida com Propósito

Progressão: +1 a cada 10 práticas
Clicáveis: Sim (navegam para atividade)
```

## 🌅 Rituais

### **Matinal** (< 12h)
1. 3 Gratidões
2. Intenção do Dia
3. 3 Respirações

### **Noturno** (>= 18h)
1. 3 Aprendizados
2. Reflexão
3. 3 Respirações

## ✅ Checklist Funcional

- [ ] Onboarding completa
- [ ] Roda da Vida salva 8 áreas
- [ ] Tríade calcula corretamente
- [ ] Check-in registra humor/energia
- [ ] Dashboard exibe estatísticas
- [ ] Avatar muda de estado
- [ ] Som 174Hz toca
- [ ] Portais progridem
- [ ] Jornada avança
- [ ] Rituais só no horário correto
- [ ] Diário salva entradas
- [ ] IA responde (ou fallback)
- [ ] Comunidade exibe posts
- [ ] LocalStorage persiste

## 🐛 Troubleshooting

### **Som não toca**
- Navegador bloqueia sem interação
- Solução: Já implementado `audioContext.resume()`
- Teste: Clique em "Respiração Guiada"

### **IA não responde**
- ANTHROPIC_API_KEY não configurada
- Solução: Fallback automático funciona
- Teste: Chat continua funcional

### **Dados não persistem**
- LocalStorage bloqueado
- Solução: Navegador modo normal
- Teste: `localStorage.getItem('essentia-mega-user')`

## 📝 Notas Importantes

- **Completo:** Todas as funcionalidades
- **Persistência:** LocalStorage (client-side)
- **Backend:** Express API (opcional para IA)
- **Mobile:** Totalmente responsivo
- **Offline:** Funciona sem internet (sem IA)

## 🎯 Próximos Passos

1. Integrar frontend + backend
2. Configurar variáveis ambiente
3. Testar fluxo completo
4. Verificar persistência
5. Testar em mobile
6. Deploy produção
