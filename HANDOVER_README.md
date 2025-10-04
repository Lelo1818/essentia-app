# 📦 ESSENTIA - HANDOVER DE PRODUÇÃO

## ⚙️ AMBIENTE E CONFIGURAÇÃO

### **Node.js**
- **Versão:** 20.x (recomendado: 20.11.0 ou superior)
- **Verificar:** `node --version`

### **Gerenciador de Pacotes**
- **Tipo:** npm
- **Versão:** 10.x (incluída com Node 20.x)
- **Verificar:** `npm --version`

### **Comandos de Build**
```bash
# 1. Instalar dependências
npm install

# 2. Desenvolvimento (localhost:5000)
npm run dev

# 3. Build para produção
npm run build

# 4. Preview da build
npm run preview
```

---

## 🔐 VARIÁVEIS DE AMBIENTE

### **Necessárias**
```bash
# .env (criar na raiz do projeto)

# Porta do servidor (padrão: 5000)
PORT=5000

# Ambiente
NODE_ENV=development  # ou 'production'

# Database (PostgreSQL via Neon - OPCIONAL para versões standalone)
DATABASE_URL=postgresql://user:password@host:5432/database
PGHOST=hostname
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=database_name
```

### **Opcionais (apenas se usar IA)**
```bash
# Anthropic Claude API (para chat IA funcionar)
ANTHROPIC_API_KEY=sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Nota: Sem esta chave, o sistema funciona mas chat IA usa fallback
```

---

## 📚 DEPENDÊNCIAS EXTERNAS

### **APIs/SDKs Obrigatórios**
Nenhum. O sistema funciona standalone.

### **APIs/SDKs Opcionais**
```json
{
  "@anthropic-ai/sdk": "^0.x" // Apenas para chat IA real
}
```

### **Build Requirements**
- TypeScript 5.x
- Vite 5.x
- React 18.x
- Tailwind CSS 3.x

---

## ⏱️ TIMINGS E ANIMAÇÕES (PRODUÇÃO)

### **Respiração Guiada**
```javascript
// Ciclo completo: 14 segundos
INSPIRAR:  4000ms  // 4 segundos
SEGURAR:   4000ms  // 4 segundos  
EXPIRAR:   6000ms  // 6 segundos
TOTAL:     14000ms // 14 segundos

// Som
FREQUÊNCIA: 174Hz (sine wave)
VOLUME:     0.3 (30%)
```

### **Demo 90s - Timing Exato**
```javascript
INTRO:             3000ms
ONBOARDING:        5000ms
WHEEL:             6000ms
TRIAD:             5000ms
CHECKIN:           5000ms
DASHBOARD:         6000ms
JOURNEY:           6000ms
PORTALS:           8000ms
PORTAL_IMMERSIVE:  8000ms
BREATHING:         8000ms
RITUALS:           8000ms
JOURNAL:           8000ms
AI_CHAT:           8000ms
COMMUNITY:         6000ms
FINALE:            4000ms
TOTAL:             90000ms (90 segundos)
```

### **Transições CSS**
```css
/* Fade in */
animation: fadeIn 0.5s ease-out forwards;

/* Scale on hover */
transition: transform 0.3s ease;
transform: scale(1.02);

/* Portal progress */
interval: 200ms
duration: 50000ms (50 segundos)
steps: 250
increment: 0.4% por step
```

### **Avatar Pulse**
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

## 🎨 CORES E GRADIENTES (PRODUÇÃO)

### **Cores Principais**
```css
/* Variáveis CSS */
--purple-600: #9333ea
--pink-600: #db2777
--green-600: #16a34a
--teal-600: #0d9488
--orange-600: #ea580c
--yellow-600: #ca8a04
--blue-600: #2563eb
--red-600: #dc2626

/* Gradientes principais */
.bg-gradient-purple-pink {
  background: linear-gradient(to right, #9333ea, #db2777);
}

.bg-gradient-green-teal {
  background: linear-gradient(to right, #16a34a, #0d9488);
}

.bg-gradient-orange-yellow {
  background: linear-gradient(to right, #ea580c, #ca8a04);
}
```

### **Portais - Gradientes Específicos**
```css
/* Clareza */
from-blue-500 to-cyan-500
/* #3b82f6 → #06b6d4 */

/* Presença */
from-green-500 to-emerald-500
/* #22c55e → #10b981 */

/* Coragem */
from-red-500 to-orange-500
/* #ef4444 → #f97316 */

/* Sabedoria */
from-purple-500 to-pink-500
/* #a855f7 → #ec4899 */

/* Intuição */
from-pink-500 to-rose-500
/* #ec4899 → #f43f5e */

/* Propósito */
from-orange-500 to-amber-500
/* #f97316 → #f59e0b */

/* Conexão */
from-cyan-500 to-teal-500
/* #06b6d4 → #14b8a6 */
```

---

## 🖋️ FONTES

### **Família Principal**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

font-family: 'Inter', sans-serif;

/* Pesos usados */
400 - Regular (texto body)
500 - Medium (subtítulos)
600 - Semibold (títulos secundários)
700 - Bold (títulos principais)
```

---

## 📐 LAYOUT (PRODUÇÃO)

### **Espaçamentos**
```css
/* Gaps padrão */
gap-2:  0.5rem (8px)
gap-3:  0.75rem (12px)
gap-4:  1rem (16px)
gap-6:  1.5rem (24px)
gap-8:  2rem (32px)

/* Padding de cards */
p-4:  1rem (16px)
p-6:  1.5rem (24px)

/* Margens */
mt-2: 0.5rem (8px)
mt-4: 1rem (16px)
mb-4: 1rem (16px)
```

### **Border Radius**
```css
rounded-lg:   0.5rem (8px)
rounded-xl:   0.75rem (12px)
rounded-2xl:  1rem (16px)
rounded-full: 9999px (circular)
```

### **Sombras**
```css
/* Card padrão */
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)

/* Hover */
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)

/* Portal imersivo */
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

---

## 🎭 AVATAR - EVENTOS REATIVOS

### **Estados e Triggers**
```javascript
// Estado: 'calm' (🧘 purple)
TRIGGERS:
- Início de respiração
- Meditação
- Retorno ao dashboard
- Portais inativos

// Estado: 'attentive' (👁️ amber)
TRIGGERS:
- Início de portal
- Salvando diário
- Interagindo com IA
- Práticas ativas

// Estado: 'grateful' (🙏 green)
TRIGGERS:
- Completar portal
- Completar respiração
- Completar ritual
- Salvar diário (sucesso)
```

### **Transições**
```javascript
// Duração de cada estado
CALM → ATTENTIVE:  imediato (0ms)
ATTENTIVE → GRATEFUL: imediato (0ms)
GRATEFUL → CALM: 1500-2000ms delay
```

---

## 🌐 ROTAS (PRODUÇÃO)

### **URLs Funcionais**
```
/purpose                - Purpose Clássico
/essentia-demo-90s      - Demo AUTO-PLAY 90s
/essentia-mega          - Mega Consolidado
```

### **Servidor**
```javascript
// Express listening on
PORT: 5000
HOST: 0.0.0.0

// Vite dev server proxy
http://localhost:5000 → Frontend + Backend
```

---

## 📦 ASSETS

### **Ícones**
- **Biblioteca:** lucide-react (open source, MIT License)
- **Uso:** Import direto, sem assets externos
- **Exemplo:** `import { Heart } from 'lucide-react'`

### **Emojis**
- **Tipo:** Unicode nativo
- **Licença:** Nenhuma restrição (caracteres Unicode)
- **Renderização:** Sistema operacional do usuário

### **Fontes**
- **Inter:** Google Fonts (Open Font License)
- **Licença:** Uso livre, modificação permitida
- **CDN:** fonts.googleapis.com

### **Imagens/Logos**
- Nenhuma imagem externa usada
- Gradientes CSS nativos
- Canvas HTML5 (sem assets)

### **Som**
- **174Hz:** Gerado via Web Audio API (código nativo)
- **Licença:** Não aplicável (síntese em tempo real)
- **Nenhum arquivo .mp3/.wav necessário**

---

## 🔓 PERMISSÕES E LICENÇAS

### **Confirmação Legal**
```
✅ CONFIRMO que o código-fonte fornecido neste handover 
   tem permissão COMPLETA para:

   - Uso interno no projeto Essentia
   - Modificação e adaptação
   - Consolidação entre versões
   - Deploy em ambientes de produção
   - Integração com outros módulos do ecossistema

   Data: 3 de Outubro de 2025
   Projeto: Essentia (Flow Ecosystem)
   Responsável: Desenvolvimento Replit Agent
```

### **Dependências Open Source**
Todas as dependências usadas possuem licenças permissivas:
- React: MIT
- Vite: MIT
- Tailwind CSS: MIT
- Lucide React: ISC
- @radix-ui/*: MIT
- @tanstack/react-query: MIT
- Anthropic SDK: MIT

---

## ✅ CRITÉRIOS DE ACEITE (VERIFICADOS)

- ✅ **Cores/Fontes/Gradientes:** Idênticos ao deploy atual
- ✅ **Timings de Animação:** 4-4-6 respiração preservado
- ✅ **Layout:** Gaps, radius, sombras mantidos
- ✅ **Avatar:** Reage nos mesmos eventos
- ✅ **Rotas:** Abrem e fluem como em produção
- ✅ **Som 174Hz:** Web Audio API funcionando
- ✅ **IA (opcional):** Fallback se sem API key
- ✅ **LocalStorage:** Persistência de dados
- ✅ **Responsive:** Mobile + Desktop

---

## 📋 CHECKLIST FINAL

Antes de usar o código:

- [ ] Node.js 20.x instalado
- [ ] npm 10.x disponível
- [ ] Executar `npm install`
- [ ] Criar `.env` com variáveis necessárias
- [ ] Executar `npm run dev`
- [ ] Verificar http://localhost:5000
- [ ] Testar /purpose
- [ ] Testar /essentia-demo-90s
- [ ] Testar /essentia-mega
- [ ] Verificar som 174Hz (permitir áudio no navegador)
- [ ] Verificar avatar mudando estados
- [ ] Verificar persistência LocalStorage
- [ ] Build produção: `npm run build`
- [ ] Preview: `npm run preview`

---

## 🆘 TROUBLESHOOTING

### **Problema: Som não toca**
```
Causa: Navegadores bloqueiam áudio sem interação do usuário
Solução: Sistema já implementa audioContext.resume() no clique
Ação: Clique no botão "Respiração Guiada" para iniciar
```

### **Problema: IA não responde**
```
Causa: ANTHROPIC_API_KEY não configurada
Solução: Sistema usa fallback inteligente por persona
Ação: Funciona sem API key, mas respostas são pré-definidas
```

### **Problema: LocalStorage não persiste**
```
Causa: Navegador em modo anônimo ou cookies bloqueados
Solução: Usar navegador normal
Ação: Verificar configurações de privacidade
```

### **Problema: Build falha**
```
Causa: Node.js ou npm versão incompatível
Solução: Usar Node 20.x exatamente
Ação: nvm install 20 && nvm use 20
```

---

## 📞 SUPORTE TÉCNICO

Em caso de bloqueio durante consolidação:

1. **Verificar:** Este README primeiro
2. **Consultar:** ESSENTIA_HANDOVER.md (especificações técnicas)
3. **Testar:** Comandos básicos (npm install, npm run dev)
4. **Reportar:** Erro específico com logs

---

## 🎯 PRÓXIMOS PASSOS

Após receber os 4 ZIPs:

1. Extrair todos em diretório limpo
2. Copiar shared/* para raiz do projeto
3. Verificar purpose-classic/* funcionando
4. Verificar demo-90s/* funcionando
5. Verificar mega/* funcionando
6. Consolidar mantendo "feeling" original
7. Testar integração completa

---

**Status:** ✅ Pronto para handover
**Data:** 3 de Outubro de 2025
**Versão:** 1.0 (Produção)
