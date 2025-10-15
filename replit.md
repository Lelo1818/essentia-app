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