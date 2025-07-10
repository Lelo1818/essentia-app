# Flow Ecosystem

## Overview

The Flow Ecosystem is a comprehensive digital platform consisting of four interconnected applications designed to transform personal financial management, education, and self-development for Brazilian users. The ecosystem combines financial technology, educational technology, and wellness applications into a unified user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Components**: Shadcn/UI component library
- **Styling**: Tailwind CSS for responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server state management
- **Icons**: Lucide React icon library

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Architecture**: RESTful APIs with dedicated endpoints for each application
- **File Serving**: Express static file serving for assets

### Application Structure
The ecosystem consists of four main applications:
1. **Flow** - Financial management system
2. **EduVibe** - Educational platform
3. **Essentia** - Self-development and wellness
4. **Flow Kids** - Children's financial education

Each application operates independently while sharing common infrastructure and user data.

## Key Components

### Core Applications

#### Flow Financial System (`/flow`)
- Real-time financial dashboard with live metrics
- OCR-powered receipt and document processing
- Intelligent goal setting with automatic validation
- Gamification system with XP, levels, and achievements
- Smart budget tracking with category-based analysis
- Brazilian market integration with real cashback partners

#### EduVibe Educational Platform (`/eduvie-clean`)
- Five main modules: Dashboard, Courses, Study Sessions, Content Creation, Analytics
- AI-powered personalized learning paths
- Multiple content formats (video, audio, text, interactive)
- Progress tracking with streaks and performance metrics
- Course management with realistic Brazilian content

#### Essentia Wellness Platform (`/purpose`)
- Eight-module self-development journey
- 3D avatar system with Canvas-based rendering
- Guided breathing exercises and meditation
- Personal rituals and daily practices
- AI-powered coaching and insights
- Journey tracking with milestone progression

#### Flow Kids Educational Platform (`/kids-standalone`)
- Child-friendly gamified interface
- Avatar-based progression system
- Financial education games and activities
- Parental control integration
- Achievement system with rewards

### Shared Infrastructure

#### User Management System
- PostgreSQL-based user profiles with cross-application data sharing
- Authentication system with demo user accounts
- Progress synchronization across all applications

#### Dashboard Hub (`/dashboard-unificado`)
- Unified navigation between all applications
- Aggregated statistics and quick actions
- Cross-application activity feed
- Responsive design for mobile and desktop

## Data Flow

### Database Schema
- **Users Table**: Core user information and authentication
- **Flow Data**: Financial transactions, goals, achievements
- **Education Data**: Course progress, learning sessions, performance metrics
- **Purpose Data**: Wellness journey progress, insights, ritual completion
- **Cross-Application**: Shared achievements and user statistics

### API Endpoints
- `/api/financial-summary` - Real-time financial data aggregation
- `/api/goals` - Goal management and validation
- `/api/real-offers` - Integration with Brazilian cashback partners
- `/api/achievements/unlock` - Gamification system management
- `/api/ecosystem/*` - Cross-application user data management

### Data Synchronization
- Real-time updates using React Query with automatic cache invalidation
- Cross-application state sharing through unified user profiles
- Persistent storage in PostgreSQL with Drizzle ORM type safety

## External Dependencies

### Brazilian Market Integrations
- **Pelando**: Deal aggregation and cashback offers
- **Méliuz**: Cashback program integration
- **Americanas**: E-commerce partnership
- **Banking APIs**: Prepared for Open Banking integration

### Technology Stack
- **Database**: PostgreSQL 16
- **Node.js**: Version 20 runtime
- **Build Tools**: Vite for development and production builds
- **Deployment**: Replit infrastructure with autoscale capability

## Deployment Strategy

### Development Environment
- Replit-based development with hot reload
- Local development server on port 5000
- Automatic build and restart on file changes

### Production Deployment
- Autoscale deployment target for high availability
- Build process: `npm run build`
- Production start: `npm run start`
- External port 80 mapping for public access

### Mobile Optimization
- Responsive design with mobile-first approach
- Touch-optimized components with minimum 44px touch targets
- Mobile-specific navigation and layout adjustments
- Progressive Web App capabilities

## Changelog
- June 23, 2025. Initial setup
- July 8, 2025. Deployment issue identified - Replit blocking real deployment. Alternative hosting configurations created for Railway, Render, and Vercel.
- July 8, 2025. Demo Mode System implemented - First-time visitors see attractive demo profile with sample achievements and AI interactions, but can create real profiles that start completely zeroed.
- July 8, 2025. Final stability audit completed - All FeedbackUtils references removed, debug logs cleaned up, investment buttons enhanced with distinct colors and professional styling for presentation readiness.
- July 8, 2025. EduVibe cache issues resolved - Implemented aggressive cache clearing solutions with localStorage management, meta tags for no-cache, forced redirects with query parameters, and automatic cleanup on component load. All legacy redirect routes (eduvie-clean, eduvie-standalone, edu) now properly redirect to enhanced version. System confirmed working consistently on mobile and desktop.
- July 9, 2025. Ecosystem metrics updated with realistic projections - Updated ecosystem-selector page with more conservative and achievable metrics including: users potential (10K-20K), apps verticais (2-3), retention rate (20-40%), EduVibe users (1.5K), revenue projections (R$ 150K-300K), valuation (R$ 1.5M-2M), break-even timeline (Q2-Q4 2026), and global user targets (1M-3M+). Focus shifted to sustainable growth and qualitative impact over inflated quantitative claims.
- July 10, 2025. Major mobile and functionality fixes implemented - Fixed mobile cache issues forcing old financial content, corrected YouTube download system showing incorrect Trump content, implemented persistent file history with localStorage, added library cleanup functionality, and corrected all "EduVie" spellings to "EduVibe" throughout the interface.
- July 10, 2025. EduVibe AI analysis system fully operational - Real AI integration successfully implemented with Anthropic Claude analyzing YouTube videos and generating specific educational content. System automatically detects YouTube URLs, processes them through AI for content-specific analysis including summaries, study suggestions, and practice exercises. Frontend display issues resolved, now correctly showing AI-generated analysis instead of fallback content. Confirmed working with real video analysis about "Metodologias Ativas de Ensino - Pedagogia Moderna" generating specific content about constructivism, active learning, flipped classroom, and educational technology.

## User Preferences

Preferred communication style: Simple, everyday language.