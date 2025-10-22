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

## External Dependencies
-   **Brazilian Market Integrations**: Pelando, Méliuz, Americanas, and readiness for Open Banking APIs.
-   **Database**: PostgreSQL 16.
-   **Runtime**: Node.js 20.
-   **Build Tools**: Vite.
-   **Deployment**: Replit infrastructure.
-   **AI Services**: Anthropic Claude 3.5 Sonnet (for Essentia's AI coaching and insights).
-   **Auth**: Replit Auth (OpenID Connect).