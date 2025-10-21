# Flow Ecosystem

## Overview
The Flow Ecosystem is a comprehensive digital platform designed for Brazilian users, integrating financial technology, educational technology, and wellness applications. It aims to transform personal financial management, education, and self-development through four interconnected applications: Flow (financial management), EduVibe (education), Essentia (self-development and wellness), and Flow Kids (children's financial education). The ecosystem also includes Thera Funding, an international proprietary trading desk platform.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Technical Stack
-   **Frontend**: React with TypeScript, Shadcn/UI, Tailwind CSS, Wouter, React Query, Lucide React.
-   **Backend**: Node.js with Express.js.
-   **Database**: PostgreSQL with Drizzle ORM.
-   **API**: RESTful APIs.

### Core Applications
The ecosystem comprises five main applications, sharing common infrastructure:
1.  **Flow**: Real-time financial dashboard, OCR, gamified goal setting, smart budgeting, Brazilian market integration.
2.  **EduVibe**: AI-powered personalized learning, diverse content formats, progress tracking, course management.
3.  **Essentia**: Self-development journey, 3D avatar system, guided exercises, AI coaching, journey tracking.
4.  **Flow Kids**: Child-friendly gamified financial education, avatar progression, parental controls.
5.  **Thera Funding**: International prop trading desk, mobile-first, game mode progression, AI-powered trade diary, community features, visual market data, simulated real-time data.

### Shared Infrastructure
-   **User Management**: PostgreSQL-based user profiles, cross-application authentication, progress synchronization.
-   **Dashboard Hub**: Unified navigation, aggregated statistics, cross-application activity feed.

### System Design
-   **Data Flow**: PostgreSQL schema for user, financial, education, and wellness data. RESTful API endpoints for data management.
-   **Deployment**: Replit-based development with hot reload; production deployment targets autoscale with `npm run build` and `npm run start`.
-   **Mobile Optimization**: Responsive design, mobile-first approach, touch-optimized components, PWA capabilities.

## External Dependencies
-   **Brazilian Market Integrations**: Pelando, Méliuz, Americanas, and readiness for Open Banking APIs.
-   **Database**: PostgreSQL 16.
-   **Runtime**: Node.js 20.
-   **Build Tools**: Vite.
-   **Deployment**: Replit infrastructure.

## Recent Changes (Oct 21, 2025)

### Essentia MVP - Pilares 1-3 Implementados ✅

**Pilar 1: Autenticação e Persistência**
-   ✅ Replit Auth integrado (OpenID Connect) com sessões PostgreSQL
-   ✅ 4 tabelas criadas: `feme_checkins`, `breath_sessions`, `user_events`, `user_progress`
-   ✅ Frontend: hook `useAuth` para gerenciar estado de autenticação
-   ✅ Storage: Interface `IStorage` estendida com 6 novos métodos FEME
-   ✅ Implementação atual: MemStorage (in-memory) para desenvolvimento

**Pilar 2: Backend Metrics & Analytics**
-   ✅ Sistema `esLog` conectado ao backend via `/api/events`
-   ✅ 6 endpoints autenticados criados:
    -   POST/GET `/api/feme/checkin` - Check-ins FEME (Físico, Energético, Mental, Espiritual)
    -   POST/GET `/api/breath/session` - Sessões de respiração 4-4-6
    -   POST/GET `/api/events` - Analytics genéricos (POST aberto para pré-login)
-   ✅ Validação Zod em todos endpoints (ranges: FEME 0-10, coerência 0-1)
-   ✅ Limite de 5KB para eventProps no endpoint `/api/events`

**Pilar 3: IA Real + Onboarding Express + Gamificação (NOVO - Oct 21)**
-   ✅ **Integração IA Anthropic Claude 3.5 Sonnet**:
    -   POST `/api/ai/selfsession` - Conversas de autoconhecimento (prompt até 2000 chars)
    -   POST `/api/ai/insight` - Insights personalizados (validação Zod, max 500 chars de contexto)
    -   AI Coach agora usa IA real ao invés de respostas mockadas
    -   Sistema de loading e error handling robusto
-   ✅ **Modo Express no Mega Onboarding**:
    -   4 sliders (0-10) para avaliação rápida FEME (Físico, Energético, Mental, Espiritual)
    -   Opção de modo Reflexivo (4 perguntas profundas) mantido
    -   Dados salvos automaticamente em `/api/feme/checkin` ao completar
    -   Analytics trackando cada resposta (esLog)
-   ✅ **Sensores Biométricos Simulados**:
    -   Variação dinâmica realista: batimentos (60-90bpm), pressão arterial, voz, emoções
    -   Simulação em tempo real sem API externa
-   ✅ **Sistema de Gamificação (schema)**:
    -   Tabela `user_progress` com pontos, níveis, streak, contadores de atividades
    -   Schema Zod validado: `insertUserProgressSchema`

**Pilar 4: Sound Design + Animações + Portal UAU (NOVO - Oct 21 - tarde)**
-   ✅ **Sound System Completo**:
    -   Módulo `client/src/lib/sound.ts` com preload, rate-limiting (80ms), autoplay policy
    -   5 sons placeholder em `/public/audio`: ui_click, ui_success, ui_open, ui_close, breath_tick
    -   Toggle global de som (localStorage) com tracking via `/api/events`
-   ✅ **BreathRing Component**:
    -   Animação sincronizada 4-4-6 (inspire 4s, segure 4s, expire 6s)
    -   Tick sonoro em cada transição de fase
    -   3 ciclos completados = 20 pontos + backend tracking
-   ✅ **MediaPlayer Component**:
    -   Suporte para HLS + fallback nativo
    -   Tracking automático: play, pause, quartile_25/50/75, complete, error
    -   CTA pós-complete: "Fazer Check-in FEME" (aciona pontos + navega)
    -   Evento `media_cta_clicked` trackeado
-   ✅ **Novos Endpoints Backend**:
    -   POST `/api/progress` - Atualizar pontos (delta -1000 a +1000, activity tracking)
    -   POST `/api/plans` - Criar plano de ação (title, goal, firstStep)
    -   GET `/api/history` - Histórico agregado (events, FEME, breath sessions)
    -   POST `/api/media/events` - Tracking de eventos de mídia (assetKey, eventType, meta)
-   ✅ **3 Novas Páginas Funcionais**:
    -   `/journey` - Portal UAU com vídeo, FEME dimensions, 50 pontos ao completar
    -   `/breath` - Respiração 4-4-6 com BreathRing, benefícios listados, 20 pontos por sessão
    -   `/points` - Dashboard de pontos com histórico, stats, FEME summary, exportação JSON

**Pilar 5: Correções de Persistência e Routing (Oct 21 - noite) ✅**
-   ✅ **Schema actionPlans completo**:
    -   Tabela `actionPlans` com id serial, userId, title, goal, firstStep, status, timestamps
    -   Schema Zod validado: `insertActionPlanSchema`
-   ✅ **Storage CRUD real implementado**:
    -   `getUserProgress(userId)` - busca progresso com defaults sensíveis
    -   `updateUserProgress(userId, delta, activity)` - cálculo de níveis (500pts = 1 nível), clamp em zero
    -   `createActionPlan(plan)` - persiste planos com timestamps
    -   `listActionPlansByUserId(userId)` - filtra planos por usuário
    -   `getHistory(userId, limit)` - agrega events, FEME, breath sessions
-   ✅ **Endpoints Backend corrigidos**:
    -   POST `/api/progress` - atualiza storage real, retorna {points, level}
    -   GET `/api/progress` - retorna pontos/níveis atuais
    -   POST `/api/plans` - cria plano real em storage
    -   GET `/api/history` - retorna histórico agregado + progress
-   ✅ **Routing corrigido**:
    -   `/purpose` → botão "Portal UAU" agora redireciona para `/journey` (antes era `/portal-uau`)
    -   MediaPlayer em `/journey` funcional com tracking completo
-   ✅ **Validação Architect**: Persistência end-to-end confirmada, lógica de níveis correta

**Em Desenvolvimento (Backlog)**
-   🔄 **Toggle de Som no Header**: Botão 🔊/🔇 persistente em todas as páginas
-   🔄 **Modal "Criar Plano"**: Formulário completo com validação Zod
-   🔄 **Painel "Focar Aqui"**: 3 sugestões IA + próximos passos (com fallback estático)
-   🔄 **Conectar Botões Restantes**: "Conversar", "Insight", "Exportar Dados" no dashboard Purpose
-   🔄 **Animações Lottie/CSS**: Feedback visual em ganhos de pontos (badge flutuante +10)
-   🔄 **Migração DatabaseStorage**: Trocar MemStorage por PostgreSQL real
-   🔄 **Rate Limiting**: Adicionar throttle nos endpoints de IA e eventos (25KB body limit)
-   🔄 **Som Nature Palette**: Substituir frequências por sons naturais (água, vento, pássaros, fogo, terra)

### URLs Principais
-   **Essentia (Purpose)**: `/purpose` - Dashboard completo com FEME Compass, AI Coach, atividades
-   **Journey (Portal UAU)**: `/journey` - Vídeo transformador + 4 dimensões FEME
-   **Breath (Respiração)**: `/breath` - Técnica 4-4-6 com BreathRing animado
-   **Points (Pontuação)**: `/points` - Histórico, stats, FEME summary, exportação JSON
-   **Onboarding**: Aparece automaticamente na primeira visita ao `/purpose`
-   **API Docs**: Ver `server/routes-clean.ts` para todos endpoints