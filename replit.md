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
2. **EduVie** - Educational platform
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

#### EduVie Educational Platform (`/eduvie-clean`)
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

## User Preferences

Preferred communication style: Simple, everyday language.