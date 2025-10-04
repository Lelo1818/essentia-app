# 🧘 PURPOSE CLÁSSICO

## 📁 Arquivos Incluídos

```
purpose-classic/
├── purpose.tsx              # Componente principal
├── ESSENTIA_HANDOVER.md    # Especificações técnicas
└── README_PURPOSE.md       # Este arquivo
```

## 🎯 Descrição

Purpose é a **versão clássica** do Essentia, focada em:
- Canvas 3D com avatar interativo
- Respiração guiada com som 174Hz
- 7 Portais temáticos
- Sistema de jornada progressiva

## 🔧 Como Usar

### **1. Integração no Projeto**

```typescript
// Em App.tsx ou router
import Purpose from './pages/purpose';

<Route path="/purpose" component={Purpose} />
```

### **2. Dependências Necessárias**

Já incluídas no `shared.zip`:
- React 18.x
- Lucide React (ícones)
- Tailwind CSS
- Shadcn UI components

### **3. Executar**

```bash
# Com o projeto completo
npm run dev

# Acessar
http://localhost:5000/purpose
```

## 🎨 Características Visuais

### **Cores Principais**
- Fundo: `from-purple-50 to-blue-50`
- Avatar calmo: Purple (#8b5cf6)
- Avatar atento: Amber (#f59e0b)  
- Avatar grato: Green (#10b981)

### **Animações**
- Avatar pulse: 2s infinite
- Fade in: 0.5s ease-out
- Portal rotation: 8s linear infinite

## ⏱️ Timings

```javascript
Respiração: 4-4-6 segundos (inspirar-segurar-expirar)
Som: 174Hz contínuo
Portal: 50 segundos de duração
Transições: 0.5s ease-out
```

## 🎭 Avatar

Estados reativos:
- **Calm (🧘):** Respiração, meditação
- **Attentive (👁️):** Portais ativos
- **Grateful (🙏):** Práticas completadas

## ✅ Checklist

- [ ] Canvas renderiza corretamente
- [ ] Som 174Hz toca ao respirar
- [ ] Avatar muda de estado
- [ ] Portais progridem
- [ ] Jornada avança

## 📝 Notas

- Versão **standalone** - funciona independente
- Sem necessidade de backend
- LocalStorage para persistência (opcional)
- Web Audio API para som
