# 📦 ESSENTIA - HANDOVER TÉCNICO COMPLETO

## 🎯 Versões para Consolidação

### 1. **Purpose (Clássico)** - `/purpose`
**Arquivo:** `client/src/pages/purpose.tsx`
- Canvas 3D com avatar interativo
- Respiração guiada com ciclos 4-4-6 (inspirar-segurar-expirar)
- 7 Portais temáticos com animações
- Sistema de jornada progressiva

### 2. **Demo 90s (AUTO-PLAY)** - `/essentia-demo-90s`
**Arquivo:** `client/src/pages/essentia-demo-90s.tsx`
- Demo automática de 90 segundos
- 15 telas com transições suaves
- Timer e controles play/pause
- Todos os recursos consolidados

### 3. **Mega (Consolidado)** - `/essentia-mega`
**Arquivo:** `client/src/pages/essentia-mega.tsx`
- Sistema completo com 12 funcionalidades
- Onboarding + Roda da Vida + Tríade
- 7 Portais + Respiração 174Hz
- 4 Personas IA (Sofia, Marcus, Luna, Leo)
- Rituais matinais/noturnos
- Diário com insights IA
- Comunidade

---

## 📂 Estrutura de Arquivos

```
project-root/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── purpose.tsx              # Purpose clássico
│   │   │   ├── essentia-demo-90s.tsx    # Demo 90s
│   │   │   └── essentia-mega.tsx        # Mega consolidado
│   │   ├── components/
│   │   │   └── ui/                      # Shadcn components
│   │   ├── lib/
│   │   │   └── queryClient.ts
│   │   ├── index.css                    # Estilos globais + animações
│   │   └── App.tsx                      # Rotas
│   └── public/
│       └── attached_assets/             # Assets se houver
├── server/
│   ├── routes-clean.ts                  # API routes (incluindo /api/ai-coach)
│   ├── index.ts                         # Express server
│   └── anthropic.ts                     # Integração Claude AI
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🎨 Especificações de Design

### **Cores Principais**
```css
/* Gradientes */
Purple-Pink: from-purple-600 to-pink-600
Green-Teal: from-green-600 to-teal-600
Orange-Yellow: from-orange-600 to-yellow-600

/* Portais */
Clareza: from-blue-500 to-cyan-500
Presença: from-green-500 to-emerald-500
Coragem: from-red-500 to-orange-500
Sabedoria: from-purple-500 to-pink-500
Intuição: from-pink-500 to-rose-500
Propósito: from-orange-500 to-amber-500
Conexão: from-cyan-500 to-teal-500
```

### **Fontes**
```css
Font-family: 'Inter', sans-serif
Pesos: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
Import: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### **Emojis Principais**
- Avatar Calmo: 🧘
- Avatar Atento: 👁️
- Avatar Grato: 🙏
- Jornada: 🌅🧠✨💫🎯👑
- Portais: 👁️💚🛡️📚🌙🎯👥

---

## ⏱️ Timings de Animação

### **Respiração Guiada**
```javascript
// Ciclo 4-4-6 segundos
Inspirar: 4000ms
Segurar: 4000ms
Expirar: 6000ms
Total ciclo: 14000ms

// Frequência sonora
Som: 174Hz (Web Audio API)
Volume: 0.3 (30%)
Tipo: sine wave
```

### **Demo 90s - Duração por Tela**
```javascript
Intro: 3s
Onboarding: 5s
Roda da Vida: 6s
Tríade: 5s
Check-in: 5s
Dashboard: 6s
Jornada: 6s
Portais: 8s
Portal Imersivo: 8s
Respiração: 8s
Rituais: 8s
Diário: 8s
Chat IA: 8s
Comunidade: 6s
Finale: 4s
TOTAL: 90s
```

### **Transições**
```css
Fade-in: 0.5s ease-out
Scale: 0.5s ease-out
Hover scale: 1.02 (0.3s)
Portal progress: 200ms interval
Avatar pulse: 2s infinite
```

---

## 🔧 Instruções de Build

### **Dependências Principais**
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "wouter": "routing",
    "@tanstack/react-query": "state management",
    "lucide-react": "ícones",
    "@radix-ui/*": "componentes UI",
    "tailwindcss": "estilização",
    "vite": "build tool",
    "typescript": "linguagem",
    "@anthropic-ai/sdk": "IA (opcional)"
  }
}
```

### **Comandos**
```bash
# Instalação
npm install

# Desenvolvimento (localhost:5000)
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### **Variáveis de Ambiente**
```bash
# Necessário para IA funcionar (opcional)
ANTHROPIC_API_KEY=sk-ant-...

# Database (opcional - se usar persistência)
DATABASE_URL=postgresql://...
```

---

## 🎭 Avatar States

### **Estados do Avatar**
```typescript
type AvatarState = 'calm' | 'attentive' | 'grateful';

// Configurações
calm: {
  emoji: '🧘',
  color: '#8b5cf6' (purple),
  uso: 'Respiração, meditação, relaxamento'
}

attentive: {
  emoji: '👁️',
  color: '#f59e0b' (amber),
  uso: 'Portais, atividades, foco'
}

grateful: {
  emoji: '🙏',
  color: '#10b981' (green),
  uso: 'Completar práticas, agradecimento'
}
```

---

## 🧘 Sistema de Respiração

### **Implementação Web Audio API**
```javascript
// Criar contexto de áudio
const audioContext = new AudioContext();

// Criar oscilador 174Hz
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(174, audioContext.currentTime);

// Controle de volume
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

// Conectar e iniciar
oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);
oscillator.start();

// Parar
oscillator.stop();
```

---

## 🤖 Sistema de IA (4 Personas)

### **Endpoint API**
```
POST /api/ai-coach
Content-Type: application/json

{
  "message": "string",
  "persona": "SOFIA" | "MARCUS" | "LUNA" | "LEO",
  "context": {
    "triad": { 
      "consciencia": number,
      "energia": number,
      "coerencia": number 
    },
    "mood": number (1-5)
  }
}
```

### **Personas**
```javascript
SOFIA: {
  emoji: '🌸',
  foco: 'Empatia & Acolhimento',
  tom: 'Caloroso, empático, encorajador'
}

MARCUS: {
  emoji: '🎯',
  foco: 'Estratégia & Ação',
  tom: 'Direto, prático, orientado a resultados'
}

LUNA: {
  emoji: '🌙',
  foco: 'Intuição & Reflexão',
  tom: 'Contemplativo, profundo, filosófico'
}

LEO: {
  emoji: '🦁',
  foco: 'Energia & Motivação',
  tom: 'Energético, motivador, entusiasta'
}
```

---

## 📊 Estrutura de Dados

### **User Profile (LocalStorage)**
```typescript
interface UserProfile {
  id: string;
  name: string;
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
  triadScores: {
    consciencia: number;
    energia: number;
    coerencia: number;
  };
  streak: number;
  totalPractices: number;
  clarity: number;
  journeyStage: number; // 1-6
  dailyCheckIns: Array<{
    date: string;
    mood: number;
    energy: number;
  }>;
  journal: Array<{
    date: string;
    entry: string;
    aiInsight?: string;
  }>;
  completedPortals: string[];
  rituals: {
    morning: boolean;
    evening: boolean;
  };
}
```

### **LocalStorage Keys**
```javascript
'essentia-mega-user' // User data do Mega
'essentia-demo-user' // User data do Demo (se houver)
```

---

## 🌀 Portais - Configuração

### **7 Portais**
```javascript
const portals = [
  { id: 'clareza', name: 'Clareza', icon: Eye, color: 'blue' },
  { id: 'presenca', name: 'Presença', icon: Heart, color: 'green' },
  { id: 'coragem', name: 'Coragem', icon: Shield, color: 'red' },
  { id: 'sabedoria', name: 'Sabedoria', icon: Book, color: 'purple' },
  { id: 'intuicao', name: 'Intuição', icon: Moon, color: 'pink' },
  { id: 'proposito', name: 'Propósito', icon: Target, color: 'orange' },
  { id: 'conexao', name: 'Conexão', icon: Users, color: 'cyan' }
];

// Duração de cada portal
Duração: 50 segundos (progress 0-100%)
Atualização: 200ms interval (50s / 200ms = 250 steps)
Incremento: 100/250 = 0.4% por step
```

---

## 🚀 Jornada de 6 Estágios

```javascript
const journeyStages = [
  { 
    id: 1, 
    name: 'Despertar Interior', 
    icon: Sunrise, 
    emoji: '🌅',
    description: 'Primeiros passos no autoconhecimento'
  },
  { 
    id: 2, 
    name: 'Autoconhecimento Profundo', 
    icon: Brain, 
    emoji: '🧠',
    description: 'Compreender padrões e crenças'
  },
  { 
    id: 3, 
    name: 'Descoberta de Paixões', 
    icon: Sparkles, 
    emoji: '✨',
    description: 'Encontrar o que te move'
  },
  { 
    id: 4, 
    name: 'Relacionamentos Significativos', 
    icon: Heart, 
    emoji: '💫',
    description: 'Conexões autênticas'
  },
  { 
    id: 5, 
    name: 'Missão e Contribuição', 
    icon: Compass, 
    emoji: '🎯',
    description: 'Impactar o mundo'
  },
  { 
    id: 6, 
    name: 'Vida com Propósito', 
    icon: Crown, 
    emoji: '👑',
    description: 'Plenitude e realização'
  }
];

// Progressão
Avança: A cada 10 práticas completas
Máximo: Estágio 6
```

---

## 🌅 Rituais

### **Ritual Matinal** (antes do meio-dia)
```javascript
1. 3 Gratidões (texto livre)
2. Intenção do Dia (texto livre)
3. 3 Respirações Conscientes (automático)

Horário: new Date().getHours() < 12
Marca: rituals.morning = true
```

### **Ritual Noturno** (depois das 18h)
```javascript
1. 3 Aprendizados do Dia (texto livre)
2. Reflexão (texto livre)
3. 3 Respirações (automático)

Horário: new Date().getHours() >= 18
Marca: rituals.evening = true
```

---

## 🔒 Permissões

✅ **Código-fonte**: Permissão total para uso e modificação interna
✅ **Consolidação**: Autorizado combinar versões
✅ **Arquitetura**: Pode reestruturar conforme necessário
✅ **APIs**: Integração Anthropic Claude (requer chave própria)
✅ **Assets**: Emojis são Unicode (sem restrições)

---

## 📦 Arquivos para Exportar

### **ZIP 1: Purpose Clássico**
```
purpose-classic/
├── purpose.tsx
├── assets/ (se houver Canvas assets)
└── README_PURPOSE.md
```

### **ZIP 2: Demo 90s**
```
demo-90s/
├── essentia-demo-90s.tsx
├── animações.css (extraído do index.css)
└── README_DEMO.md
```

### **ZIP 3: Mega Consolidado**
```
mega-consolidated/
├── essentia-mega.tsx
├── routes-clean.ts (API /api/ai-coach)
├── anthropic.ts (IA backend)
├── components/ (se houver componentes compartilhados)
└── README_MEGA.md
```

### **ZIP 4: Arquivos Compartilhados**
```
shared/
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── index.css (estilos globais)
└── App.tsx (rotas)
```

---

## 🧪 Testes Recomendados

### **Checklist Funcional**
- [ ] Onboarding completa corretamente
- [ ] Roda da Vida salva 8 áreas
- [ ] Tríade calcula média corretamente
- [ ] Check-in registra humor/energia
- [ ] Avatar muda de estado
- [ ] Som 174Hz toca na respiração
- [ ] Portais progridem até 100%
- [ ] Jornada avança a cada 10 práticas
- [ ] Rituais só aparecem no horário correto
- [ ] Diário salva entradas
- [ ] IA responde (se configurada)
- [ ] Comunidade exibe posts
- [ ] LocalStorage persiste dados

---

## 🔗 Links Funcionais

**Desenvolvimento (localhost:5000):**
- http://localhost:5000/purpose
- http://localhost:5000/essentia-demo-90s
- http://localhost:5000/essentia-mega

**Produção (quando publicado):**
- https://[seu-dominio]/purpose
- https://[seu-dominio]/essentia-demo-90s
- https://[seu-dominio]/essentia-mega

---

## 📞 Contato Técnico

Para dúvidas técnicas sobre implementação:
- **Estrutura**: TypeScript + React + Vite
- **UI**: Tailwind CSS + Shadcn
- **Estado**: React Query + LocalStorage
- **IA**: Anthropic Claude API
- **Som**: Web Audio API (174Hz)

---

## ✅ Checklist de Entrega

- [ ] ZIP Purpose Clássico
- [ ] ZIP Demo 90s
- [ ] ZIP Mega Consolidado
- [ ] ZIP Arquivos Compartilhados
- [ ] package.json + lockfile
- [ ] Documentação de cores/fontes
- [ ] Timings de animação documentados
- [ ] Instruções de build
- [ ] Confirmação de permissões

---

**Data de criação:** 3 de Outubro de 2025
**Versão:** 1.0
**Status:** Pronto para handover ✅
