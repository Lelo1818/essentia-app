# 🔧 SHARED - ARQUIVOS COMPARTILHADOS

## 📁 Arquivos Incluídos

```
shared/
├── package.json              # Dependências
├── package-lock.json         # Lockfile NPM
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite bundler
├── tailwind.config.ts       # Tailwind CSS
├── index.css                # Estilos globais + animações
├── App.tsx                  # Router principal
├── components/
│   └── ui/                  # Shadcn components
├── lib/
│   └── queryClient.ts       # React Query setup
├── ESSENTIA_HANDOVER.md    # Especificações
└── README_SHARED.md        # Este arquivo
```

## 🎯 Descrição

Arquivos **compartilhados** entre todas as versões do Essentia:
- Configurações de build
- Dependências NPM
- Componentes UI reutilizáveis
- Estilos globais e animações
- Router principal

## 🔧 Como Usar

### **1. Estrutura Base do Projeto**

```
project-root/
├── client/
│   ├── src/
│   │   ├── pages/         # ← Adicionar versões aqui
│   │   ├── components/    # ← Copiar de shared/
│   │   ├── lib/          # ← Copiar de shared/
│   │   ├── index.css     # ← Copiar de shared/
│   │   └── App.tsx       # ← Copiar de shared/
│   └── public/
├── server/               # ← Adicionar routes-clean.ts
├── package.json          # ← Copiar de shared/
├── package-lock.json     # ← Copiar de shared/
├── tsconfig.json         # ← Copiar de shared/
├── vite.config.ts        # ← Copiar de shared/
└── tailwind.config.ts    # ← Copiar de shared/
```

### **2. Instalação**

```bash
# 1. Copiar arquivos shared para raiz
cp shared/package.json ./
cp shared/package-lock.json ./
cp shared/tsconfig.json ./
cp shared/vite.config.ts ./
cp shared/tailwind.config.ts ./

# 2. Copiar para client/src/
cp shared/index.css client/src/
cp shared/App.tsx client/src/
cp -r shared/components client/src/
cp -r shared/lib client/src/

# 3. Instalar dependências
npm install
```

### **3. Adicionar Versões Essentia**

```bash
# Purpose
cp purpose-classic/purpose.tsx client/src/pages/

# Demo 90s
cp demo-90s/essentia-demo-90s.tsx client/src/pages/

# Mega
cp mega/essentia-mega.tsx client/src/pages/
cp mega/routes-clean.ts server/
```

## 📦 Dependências Principais

### **Frontend**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "wouter": "^3.3.5",
  "@tanstack/react-query": "^5.x",
  "lucide-react": "^0.x",
  "@radix-ui/react-*": "^1.x",
  "tailwindcss": "^3.x",
  "class-variance-authority": "^0.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

### **Build Tools**
```json
{
  "vite": "^5.x",
  "typescript": "^5.x",
  "@vitejs/plugin-react": "^4.x",
  "@tailwindcss/vite": "^4.x"
}
```

### **Backend** (opcional)
```json
{
  "express": "^4.x",
  "@anthropic-ai/sdk": "^0.x"
}
```

## 🎨 index.css - Animações Globais

### **Animações Incluídas**
```css
@keyframes fadeIn
@keyframes slideInUp
@keyframes float
@keyframes fadeInScale
@keyframes shimmer

Classes utilitárias:
.animate-fade-in
.animate-in
.animate-in-scale
.animate-float
.shimmer
.glass
.gradient-flow
```

### **Uso**
```jsx
<div className="animate-fade-in">
  Aparece com fade
</div>
```

## 🧩 Componentes UI (Shadcn)

### **Disponíveis em components/ui/**
```
Card, CardHeader, CardTitle, CardContent
Button
Progress
Badge
Input
Textarea
Tabs, TabsList, TabsTrigger, TabsContent
Toaster, Toast
Dialog
Dropdown
Select
... (30+ componentes)
```

### **Uso**
```jsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

<Card>
  <CardContent>
    <Button>Clique</Button>
  </CardContent>
</Card>
```

## 🛠️ Configurações

### **vite.config.ts**
```typescript
// Configurado para:
- React + TypeScript
- Aliases (@/components, @/lib, @/pages)
- Port 5000
- Proxy para /api
- Build otimizado
```

### **tailwind.config.ts**
```typescript
// Configurado para:
- Shadcn theming
- Cores customizadas
- Animações
- Responsive breakpoints
- Dark mode (class-based)
```

### **tsconfig.json**
```json
// Configurado para:
- ES2020 target
- Strict mode
- Path aliases
- React JSX
```

## 🔌 React Query Setup

### **lib/queryClient.ts**
```typescript
// Pre-configurado:
- Cache time: 5 minutos
- Stale time: 1 minuto
- Retry: 1 vez
- Default fetcher para /api/*
```

### **Uso**
```jsx
const { data, isLoading } = useQuery({
  queryKey: ['/api/user'],
});

const mutation = useMutation({
  mutationFn: (data) => apiRequest('/api/save', {
    method: 'POST',
    body: JSON.stringify(data)
  })
});
```

## 📱 App.tsx - Router

### **Estrutura**
```jsx
<Switch>
  <Route path="/purpose" component={Purpose} />
  <Route path="/essentia-demo-90s" component={EssentiaDemo90s} />
  <Route path="/essentia-mega" component={EssentiaMega} />
  {/* Adicionar novas rotas aqui */}
</Switch>
```

### **Adicionar Nova Rota**
```jsx
// 1. Import
import MinhaVersao from '@/pages/minha-versao';

// 2. Route
<Route path="/minha-versao" component={MinhaVersao} />
```

## ✅ Checklist de Integração

- [ ] Copiar package.json e lockfile
- [ ] Copiar configs (vite, tailwind, tsconfig)
- [ ] Copiar index.css
- [ ] Copiar App.tsx
- [ ] Copiar components/ui
- [ ] Copiar lib/
- [ ] Executar npm install
- [ ] Adicionar páginas das versões
- [ ] Registrar rotas em App.tsx
- [ ] Testar npm run dev
- [ ] Verificar http://localhost:5000

## 🐛 Troubleshooting

### **Module not found: '@/components/...'**
```
Causa: Aliases não configurados
Solução: Verificar vite.config.ts e tsconfig.json
```

### **Tailwind classes not working**
```
Causa: Build CSS não executado
Solução: npm run dev (Vite compila automaticamente)
```

### **React Query errors**
```
Causa: QueryClientProvider não envolvendo app
Solução: Verificar App.tsx tem <QueryClientProvider>
```

## 📝 Notas

- **Não modificar:** Configs já otimizados
- **Compatível:** Node 20.x + npm 10.x
- **Extensível:** Adicionar componentes em components/
- **Versionado:** package-lock.json garante reprodutibilidade

## 🎯 Próximos Passos

1. Copiar shared/ para projeto base
2. Instalar dependências
3. Adicionar versões específicas
4. Testar build
5. Deploy
