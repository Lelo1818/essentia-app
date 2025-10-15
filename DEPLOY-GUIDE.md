# 🚀 Essentia - Guia Completo de Deploy

## ✅ O QUE FOI FEITO (OS 3 PATCHES)

### 1️⃣ **Patch no Purpose.tsx** ✅
- ✅ Adicionados 2 TabsTrigger faltantes (Biometria + Terapeuta IA)
- ✅ Ajustado grid de 8 para 10 colunas
- ✅ Compilação limpa sem erros

### 2️⃣ **Pitch Mode Habilitado** ✅
- ✅ Criado `client/src/main-essentia.tsx` com detecção de `?pitch`
- ✅ URL `?pitch` força abertura em `#/demo-90s`
- ✅ Sem pitch, abre em `#/purpose` (baseline)

### 3️⃣ **Build Gerado** ✅
- ✅ `npm run build` executado com sucesso
- ✅ 2 packages criados:
  - `ESSENTIA_SOURCE.tar.gz` (223 KB) - código fonte
  - `ESSENTIA_DIST_NETLIFY.tar.gz` (1.1 MB) - build pronto

---

## 📦 COMO BAIXAR OS PACKAGES

### **Opção A - Via Navegador (Mais Fácil)**

Acesse: **https://seu-replit.repl.co/public/essentia-downloads.html**

Página com 2 botões de download direto:
- 📦 Código Fonte Completo
- 🚀 Build Pronto (Netlify Drop)

### **Opção B - Via Replit Files**

1. Vá no painel de arquivos (lado direito)
2. Procure por:
   - `ESSENTIA_SOURCE.tar.gz`
   - `ESSENTIA_DIST_NETLIFY.tar.gz`
3. Clique direito → Download

---

## 🎯 USAR O BUILD PRONTO (30 SEGUNDOS)

### **Deploy no Netlify (Drag & Drop)**

1. **Baixe** `ESSENTIA_DIST_NETLIFY.tar.gz`
2. **Extraia** o arquivo:
   ```bash
   tar -xzf ESSENTIA_DIST_NETLIFY.tar.gz
   ```
3. **Arraste** a pasta extraída para: https://app.netlify.com/drop
4. **Pronto!** URL gerada automaticamente

**🎉 Seu Essentia estará no ar em 30 segundos!**

---

## 💻 DESENVOLVER LOCALMENTE

### **Usar o Código Fonte**

1. **Baixe** `ESSENTIA_SOURCE.tar.gz`
2. **Extraia**:
   ```bash
   tar -xzf ESSENTIA_SOURCE.tar.gz
   ```
3. **Instale dependências**:
   ```bash
   npm install
   ```
4. **Rode local**:
   ```bash
   npm run dev
   ```
5. **Acesse**:
   - `http://localhost:5000/#/purpose` → Baseline visual
   - `http://localhost:5000/#/demo-90s` → Demo 90s
   - `http://localhost:5000/#/mega` → Mega consolidado
   - `http://localhost:5000/?pitch` → Pitch Mode (abre demo)

---

## 🎬 PITCH MODE PARA INVESTIDORES

Para apresentações, use o **Pitch Mode**:

```
https://seu-dominio.com/?pitch
```

**O que acontece:**
- Abre automaticamente em `#/demo-90s`
- Demo auto-play de 90 segundos
- Mostra TODAS as features em sequência
- Controles play/pause disponíveis
- Finaliza com estatísticas impactantes

**Perfeito para:** Reuniões com investidores, apresentações rápidas, demos ao vivo.

---

## 🌐 OUTRAS OPÇÕES DE DEPLOY

### **Vercel**
```bash
npm i -g vercel
vercel
```

### **Railway**
1. Conecte repositório Git
2. Build: `npm run build`
3. Start: `npm run start`

### **Render**
1. New Static Site
2. Build: `npm run build`
3. Publish: `dist/public`

---

## 📋 CHECKLIST PÓS-DEPLOY

Após fazer deploy, teste:

- [ ] ✅ `#/purpose` carrega com visual do primeiro
- [ ] ✅ `#/demo-90s` roda demo completa (~90s)
- [ ] ✅ `#/mega` abre versão consolidada
- [ ] ✅ `?pitch` força abertura na demo
- [ ] ✅ Navegação entre abas funciona
- [ ] ✅ Respiração 4-4-6 anima fluido
- [ ] ✅ Avatar muda estados
- [ ] ✅ Som 174Hz funciona (após interação)
- [ ] ✅ Mobile responsivo (nada escapa viewport)

---

## 🔧 TROUBLESHOOTING

### **"Download não inicia"**
- Tente via painel de arquivos do Replit (lado direito)
- Ou acesse `/public/essentia-downloads.html` direto

### **"Build com erro"**
```bash
rm -rf node_modules/.vite
npm install
npm run build
```

### **"Demo não carrega"**
- Limpe cache do navegador (Ctrl+Shift+Del)
- Tente em aba anônima

### **"Som não funciona"**
- Web Audio API requer interação do usuário
- Clique em qualquer botão primeiro
- Verifique se navegador não está em mute

---

## 📊 ESTRUTURA DOS PACKAGES

### **ESSENTIA_SOURCE.tar.gz (223 KB)**
```
client/src/
├── pages/
│   ├── purpose.tsx           # Baseline (10 abas funcionais)
│   ├── essentia-demo-90s.tsx # Demo auto-play
│   └── essentia-mega.tsx     # Consolidado completo
├── main-essentia.tsx         # Router + Pitch Mode
├── components/purpose/       # 42 componentes
└── index.css                 # Tema do primeiro

package.json
vite.config.ts
tailwind.config.ts
ESSENTIA-README.md
```

### **ESSENTIA_DIST_NETLIFY.tar.gz (1.1 MB)**
```
public/
├── index.html
├── assets/
│   ├── index-[hash].js       # 2.3 MB (minified)
│   ├── index-[hash].css      # 246 KB
│   └── images/               # Logos, avatares
```

---

## 🎨 FEATURES INCLUÍDAS

### **Purpose (Baseline Visual)**
✅ 10 Abas funcionais  
✅ Roda da Vida (8 áreas)  
✅ Avatar 3D + Xamã  
✅ Respiração 4-4-6 + 174Hz  
✅ Rituais matinais/noturnos  
✅ Inspiração + Comunidade  
✅ Biometria + Terapeuta IA  

### **Demo 90s**
✅ Auto-play com timer  
✅ Sequência todas features  
✅ Controles play/pause  
✅ Estatísticas finais  

### **Mega**
✅ Onboarding 12 perguntas  
✅ Tríade + Check-in  
✅ 7 Portais imersivos  
✅ 4 Personas IA (Sofia/Marcus/Luna/Leo)  
✅ Jornada 6 Estágios  
✅ Diário + Insights IA  
✅ Comunidade  

---

## 💡 PRÓXIMOS PASSOS RECOMENDADOS

1. ✅ **Teste local** (5 min)
2. ✅ **Deploy Netlify** (30 seg)
3. 🎯 **Compartilhe** URL `?pitch` com investidores
4. 📊 **Monitore** analytics (Netlify fornece)
5. ✨ **Itere** baseado em feedback

---

## 🔗 LINKS ÚTEIS

- **Netlify Drop**: https://app.netlify.com/drop
- **Vercel Deploy**: https://vercel.com/new
- **Railway**: https://railway.app
- **Render**: https://render.com

---

## 📞 SUPORTE

**Stack:**
- React 18 + TypeScript
- Vite 5.4
- Tailwind CSS + Shadcn/UI
- Hash-based routing

**Compatibilidade:**
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile: ✅

---

**🎉 TUDO PRONTO! BORA DEPLOYAR!**

Feito com 💜 por Lelão
