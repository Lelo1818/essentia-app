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

### Essentia MVP - Pilares 1 e 2 Implementados

**Pilar 1: Autenticação e Persistência**
-   ✅ Replit Auth integrado (OpenID Connect) com sessões PostgreSQL
-   ✅ 3 novas tabelas criadas: `feme_checkins`, `breath_sessions`, `user_events`
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

**Próximas Melhorias (Backlog)**
-   🔄 Rate limiting no endpoint `/api/events` (prevenir abuso)
-   🔄 Adicionar índices (user_id, created_at) nas tabelas FEME para performance
-   🔄 Migração de MemStorage → DatabaseStorage (Drizzle + PostgreSQL)
-   🔄 Pilar 3: Fluxo narrativo Mega → FEME → Respiração → Portal UAU
-   🔄 Pilar 4: Portal UAU cinematográfico (vídeos, narração, transições)