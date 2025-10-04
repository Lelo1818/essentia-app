# ⏱️ DEMO 90 SEGUNDOS

## 📁 Arquivos Incluídos

```
demo-90s/
├── essentia-demo-90s.tsx   # Componente principal
├── ESSENTIA_HANDOVER.md   # Especificações técnicas
└── README_DEMO_90S.md     # Este arquivo
```

## 🎯 Descrição

Demo AUTO-PLAY de **90 segundos** mostrando:
- 15 telas com transições automáticas
- Timer visual e controles
- Todos os recursos consolidados
- Preview completo do Essentia

## 🔧 Como Usar

### **1. Integração no Projeto**

```typescript
// Em App.tsx ou router
import EssentiaDemo90s from './pages/essentia-demo-90s';

<Route path="/essentia-demo-90s" component={EssentiaDemo90s} />
```

### **2. Dependências Necessárias**

Já incluídas no `shared.zip`:
- React 18.x (useState, useEffect)
- Lucide React (ícones)
- Tailwind CSS
- Shadcn UI (Card, Button, Progress, Badge)

### **3. Executar**

```bash
# Com o projeto completo
npm run dev

# Acessar
http://localhost:5000/essentia-demo-90s
```

## ⏱️ Timeline Exata (90s)

```javascript
0-3s:   Intro
3-8s:   Onboarding
8-14s:  Roda da Vida
14-19s: Tríade
19-24s: Check-in
24-30s: Dashboard
30-36s: Jornada 6 Estágios
36-44s: 7 Portais
44-52s: Portal Imersivo (Canvas)
52-60s: Respiração 174Hz
60-68s: Rituais
68-76s: Diário + IA
76-84s: Chat IA (4 Personas)
84-90s: Comunidade + Finale
```

## 🎮 Controles

### **Botões**
- **Play/Pause:** Controla execução
- **Timer:** Mostra progresso (0s → 90s)
- **Barra:** Progress visual
- **Replay:** Reinicia demo

### **Estados**
```typescript
type DemoStep = 
  | 'intro' | 'onboarding' | 'wheel' | 'triad'
  | 'checkin' | 'dashboard' | 'journey' | 'portals'
  | 'portal-immersive' | 'breathing' | 'rituals'
  | 'journal' | 'ai-chat' | 'community' | 'finale';
```

## 🎨 Características Visuais

### **Animações**
```css
Fade in: 0.5s ease-out
Auto-advance: Baseado em STEP_DURATIONS
Pulse: Avatar e elementos reativos
Spin: Portal Canvas (8s)
```

### **Cores**
- Mesmo esquema do Mega
- Gradientes em todos os cards
- Avatar reativo por estado

## 🎭 Avatar

Aparece em todas as telas:
- **Intro:** Grateful (🙏)
- **Onboarding/Dashboard:** Calm (🧘)
- **Portais/Breathing:** Attentive (👁️)
- **Finale:** Grateful (🙏)

## ✅ Checklist

- [ ] Tela de intro aparece
- [ ] Botão "Iniciar Demo" funciona
- [ ] Timer conta 90 segundos
- [ ] 15 telas aparecem em sequência
- [ ] Play/Pause funciona
- [ ] Avatar muda de estado
- [ ] Finale exibe estatísticas
- [ ] Botão "Assistir Novamente" funciona

## 📝 Notas

- **Standalone:** Funciona sem backend
- **Sem persistência:** Dados não salvam
- **Demo pura:** Para apresentação
- **Mobile friendly:** Responsivo
- **Auto-play:** Não requer interação (após iniciar)

## 🎯 Uso Recomendado

- Apresentações para investidores
- Onboarding de novos usuários
- Preview de funcionalidades
- Marketing e demos comerciais
