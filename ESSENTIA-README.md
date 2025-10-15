# 🌟 Essentia Unificado - Package Pronto para Deploy

## 📦 O QUE É ISSO?

Este é o **Essentia consolidado** com TODAS as funcionalidades em um único sistema:

✅ **Purpose.tsx** como baseline visual (cores, gradientes, "feeling do primeiro")  
✅ **Demo 90s** - Apresentação automática de 90 segundos  
✅ **Mega** - Versão consolidada com todas as features  
✅ **Pitch Mode** - Abre direto na demo para investidores  
✅ **10 Abas funcionais** no Purpose (Jornada, Transição, Avatar, Respiração, Rituais, Roda, Inspiração, Comunidade, Biometria, Terapeuta IA, Perfil)

---

## 🚀 COMO USAR

### 1️⃣ **Instalação**
```bash
npm install
```

### 2️⃣ **Desenvolvimento Local**
```bash
npm run dev
```

Abra no navegador:
- `http://localhost:5000/#/purpose` → Baseline visual (primeira versão)
- `http://localhost:5000/#/demo-90s` → Demo automática 90s
- `http://localhost:5000/#/mega` → Versão consolidada

### 3️⃣ **Build para Produção**
```bash
npm run build
```

Gera pasta `dist/` pronta para deploy.

---

## 🎯 MODO PITCH (Investidor)

Para abrir direto na demo de 90 segundos:

```
https://seu-dominio.com/?pitch
```

Ou local:
```
http://localhost:5000/?pitch
```

Automaticamente carrega `#/demo-90s` para apresentações.

---

## 🌐 DEPLOY RÁPIDO

### **Opção A - Netlify (Drag & Drop)**
1. Rode `npm run build`
2. Arraste a pasta `dist/` para https://app.netlify.com/drop
3. Pronto! URL gerada automaticamente

### **Opção B - Vercel**
```bash
npm i -g vercel
vercel
```

### **Opção C - Railway/Render**
1. Conecte o repositório Git
2. Build command: `npm run build`
3. Start command: `npm run start`

---

## 📋 CHECKLIST PRÉ-DEPLOY

- [x] **Purpose.tsx** com visual do primeiro (intocado)
- [x] **10 Abas funcionais** (incluindo Biometria e Terapeuta IA)
- [x] **Respiração 4-4-6** com som 174Hz funcionando
- [x] **4 Personas IA** (Sofia, Marcus, Luna, Leo)
- [x] **7 Portais imersivos** com Canvas e Web Audio API
- [x] **Roda da Vida** com 8 áreas
- [x] **Demo 90s** auto-play com timer
- [x] **Pitch Mode** ativado via `?pitch`
- [x] **Build limpo** sem erros de compilação

---

## 🎨 ESTRUTURA DO PROJETO

```
client/src/
├── pages/
│   ├── purpose.tsx           # Baseline visual (primeira versão)
│   ├── essentia-demo-90s.tsx # Demo automática 90s
│   └── essentia-mega.tsx     # Versão consolidada
├── components/
│   └── purpose/              # 42 componentes prontos
├── main-essentia.tsx         # Roteador com Pitch Mode
└── index.css                 # Cores/gradientes do primeiro

server/
└── routes-clean.ts           # Backend API (se necessário)
```

---

## 🧪 TESTE LOCAL (5 MINUTOS)

```bash
npm run dev
```

**Checklist esperado:**

1. ✅ `#/purpose` → Visual idêntico ao primeiro (cores, gradientes, tipografia)
2. ✅ `#/demo-90s` → Demo roda ~90s sem travar
3. ✅ `#/mega` → Navegação funciona sem quebrar
4. ✅ **Respiração 4-4-6** → Anima fluida sem "pulos"
5. ✅ **Avatar** → Estados (calmo/atento/grato) sem desalinhamento
6. ✅ **Abas** → Mudam sem flicker
7. ✅ **Mobile** → Nada escapa da viewport

---

## 🔧 TROUBLESHOOTING

### **Imports faltando?**
Copie do `client/src/components/` original que o roteador já resolve.

### **Build com erro?**
```bash
npm run build 2>&1 | grep ERROR
```

### **Demo não carrega?**
Limpe cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

### **Som não funciona?**
Web Audio API requer interação do usuário. Clique em qualquer botão primeiro.

---

## 💡 PRÓXIMOS PASSOS

1. ✅ **Teste local** (5 min) → Valida visual + funcionalidades
2. ✅ **Build** → Gera `dist/` pronto
3. ✅ **Deploy** → Netlify Drop / Vercel / Railway
4. 🎯 **Compartilhar** → URL `?pitch` para investidores

---

## 📞 SUPORTE

- **Estrutura**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Routing**: Hash-based (#/purpose, #/demo-90s, #/mega)
- **Backend**: Express + PostgreSQL (opcional)

---

## 🔥 FEATURES CONSOLIDADAS

### **Purpose (Baseline Visual)**
- 10 abas funcionais
- Roda da Vida 8 áreas
- Avatar 3D + Xamã
- Respiração 4-4-6 com 174Hz
- Rituais matinais/noturnos
- Inspiração + Comunidade
- Biometria + Terapeuta IA

### **Demo 90s**
- Auto-play com timer
- Mostra TODAS as features em sequência
- Controles play/pause
- Finaliza com estatísticas

### **Mega**
- Onboarding inteligente (12 perguntas)
- Tríade + Check-in emocional
- 7 Portais imersivos
- 4 Personas IA contextuais
- Jornada 6 Estágios
- Diário com insights IA
- Comunidade conectada

---

**🎉 TUDO PRONTO PARA USAR!**

Feito com 💜 por Lelão
