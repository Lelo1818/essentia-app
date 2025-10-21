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

**Em Desenvolvimento (Backlog)**
-   🔄 **Endpoints de Gamificação**: POST/GET `/api/progress` para atualizar pontos
-   🔄 **Lógica de Pontos Automática**: Atribuir pontos ao completar FEME, respiração, IA
-   🔄 **Botões Faltantes**: Conectar "Atualizar Pontuação", "Criar Plano", "Ver Histórico", "Exportar Dados"
-   🔄 **Migração DatabaseStorage**: Trocar MemStorage por PostgreSQL real
-   🔄 **Rate Limiting**: Adicionar throttle nos endpoints de IA e eventos
-   🔄 **Portal UAU**: Fluxo cinematográfico Mega → FEME → Respiração → Portal

### URLs Principais
-   **Essentia (Purpose)**: `/purpose` - Dashboard completo com FEME Compass, AI Coach, atividades
-   **Onboarding**: Aparece automaticamente na primeira visita ao `/purpose`
-   **API Docs**: Ver `server/routes-clean.ts` para todos endpoints