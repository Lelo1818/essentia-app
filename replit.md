# Flow Ecosystem

## Overview
The Flow Ecosystem is a comprehensive digital platform for Brazilian users, integrating fintech, edtech, and wellness applications. It aims to transform personal financial management, education, and self-development through four interconnected applications: Flow (financial management), EduVibe (education), Essentia (self-development and wellness), and Flow Kids (children's financial education). The ecosystem also includes Thera Funding, an international proprietary trading desk platform. The business vision is to provide a holistic digital experience that empowers users across crucial aspects of their lives, tapping into the growing digital market in Brazil and beyond.

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
3.  **Essentia**: Self-development journey, 3D avatar system, guided exercises, AI coaching, journey tracking. This application includes features like FEME (Físico, Energético, Mental, Espiritual) check-ins, breathwork sessions, AI-powered self-sessions and insights (using Anthropic Claude 3.5 Sonnet), simulated biometric sensors, and a gamification system for points and levels. It also features an onboarding flow with an expressive avatar (Aruan) and a robust sound system.
4.  **Flow Kids**: Child-friendly gamified financial education, avatar progression, parental controls.
5.  **Thera Funding**: International prop trading desk, mobile-first, game mode progression, AI-powered trade diary, community features, visual market data, simulated real-time data.

### Shared Infrastructure
-   **User Management**: PostgreSQL-based user profiles, cross-application authentication, progress synchronization.
-   **Dashboard Hub**: Unified navigation, aggregated statistics, cross-application activity feed.
-   **System Design**: Data flow managed via PostgreSQL schema and RESTful API endpoints. Mobile-first responsive design with PWA capabilities.

## Recent Changes (October 2025)

### Aruan Avatar System - MVP Completo
-   **AruanGuidance Component**: Sistema de guia pós-exercício onde Aruan aparece após completar rituais/respirações sugerindo próximo passo. Este é o "motor" do app - conecta experiências e guia o usuário na jornada.
-   **4 Vídeos HeyGen Integrados**:
    -   Despertar Interior (9:16) - Onboarding principal
    -   Portal da Clareza (16:9) - Portal do Despertar (/journey)
    -   Portal da Gratidão (16:9) - Ritual de Gratidão
    -   Desperte Sua Coragem (16:9) - Intro Respiração 4-4-6 (/breathing-446)
-   **1 Vídeo Documentado**: Paz Interior Agora (15-20s) - Preparado para respirações rápidas
-   **Fluxo Completo**: Vídeo intro → Exercício/Ritual → AruanGuidance aparece → Sugere próximo passo → Navega para próxima feature

### UX Improvements
-   **Renomeação "Terapeuta IA" → "Seu Guru"**: Nome mais quente e pessoal, sem mencionar "IA". Aplicado em: aba do dashboard, journey stages, mensagens do Aruan.
-   **Bug Fix - Respiração 4-4-6**: Corrigido círculo de respiração que estava parado (substituído SVG por div com transform:scale, animação 14s sincronizada com ciclo 4-4-6).
-   **MediaPlayer com botão X**: Vídeos agora podem ser fechados/pulados pelo usuário.
-   **Hash Navigation**: Suporte a /purpose#therapist para abrir tabs diretamente via URL.

### Documentation
-   **ARUAN_VIDEOS_GUIDE.md**: Guia completo de todos os vídeos Aruan com especificações técnicas, uso no app, e status de integração.

## External Dependencies
-   **Brazilian Market Integrations**: Pelando, Méliuz, Americanas, and readiness for Open Banking APIs.
-   **Database**: PostgreSQL 16.
-   **Runtime**: Node.js 20.
-   **Build Tools**: Vite.
-   **Deployment**: Replit infrastructure.
-   **AI Services**: Anthropic Claude 3.5 Sonnet (for Essentia's AI coaching and insights).
-   **Auth**: Replit Auth (OpenID Connect).