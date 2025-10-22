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
-   **6 Vídeos HeyGen Integrados**:
    -   Despertar Interior (9:16) - Onboarding principal
    -   Portal da Clareza (16:9) - Portal do Despertar (/journey)
    -   Portal da Gratidão (16:9) - Ritual de Gratidão
    -   Portal do Recomeço (16:9) - Ritual do Recomeço
    -   Desperte Sua Coragem (16:9) - Intro Respiração 4-4-6 (/breathing-446)
    -   **Portal da Intuição (16:9) - Portal da Intuição (/portals) - NOVO ✨**
-   **1 Vídeo Documentado**: Paz Interior Agora (15-20s) - Preparado para respirações rápidas
-   **Fluxo Completo**: Vídeo intro → Exercício/Ritual → AruanGuidance aparece → Sugere próximo passo → Navega para próxima feature

### Portal da Intuição - Nova Feature (Outubro 22, 2025)
-   **Página de Portais**: Nova página `/portals` com grid de 4 portais: Clareza, Gratidão, Recomeço, e Intuição
-   **Experiência Portal da Intuição**: 
    -   Fade branco de entrada → Vídeo HeyGen → Mensagem reflexiva → Campo de reflexão
    -   Mensagem: "Feche os olhos. O que você sente quando o caminho não é claro, mas o coração sabe?"
    -   Reflexões salvas em banco via endpoint `/api/reflections`
    -   +75 pontos ao completar portal
-   **Progressão Narrativa**: Portal da Intuição equilibra ciclo masculino/feminino, conectando todos os portais anteriores
-   **Arquivos**: client/src/pages/portals.tsx, client/src/components/portals/intuition-portal.tsx
-   **Backend**: Tabela `portal_reflections` adicionada ao schema, endpoints GET/POST `/api/reflections`

### Sistema de Coerência Científica FEME (Outubro 22, 2025)
-   **Camada Científica**: Implementada lógica matemática baseada em princípios de coerência biológica e física quântica aplicada ao comportamento humano
-   **Análise de Relações**: Não mede apenas níveis individuais, mas as RELAÇÕES entre as 4 dimensões (Físico ↔ Energético ↔ Mental ↔ Espiritual)
-   **Motor de Coerência** (server/feme-coherence.ts):
    -   Calcula índice de coerência entre pares de dimensões adjacentes
    -   Detecta 5 padrões: balanced, ascending, descending, chaotic, polarized
    -   Gera insights científicos baseados em desequilíbrios detectados
    -   Calcula campo de ressonância (força total = média × coerência)
    -   Recomendações personalizadas baseadas no estado atual
-   **Endpoint**: GET `/api/feme/coherence` - retorna análise completa do último check-in FEME
-   **Bússola de Coerência** (client/src/components/coherence-compass.tsx):
    -   Visualização circular do índice de coerência (0-100)
    -   Progress bars para equilíbrio dimensional entre pares
    -   Campo de ressonância em destaque
    -   Insights científicos e recomendações práticas
    -   Timestamp do check-in analisado
-   **Página**: `/coherence` - experiência completa com hero section, informações educacionais sobre coerência e campo de ressonância
-   **Arquivos**: server/feme-coherence.ts, client/src/components/coherence-compass.tsx, client/src/pages/coherence.tsx

### UX Improvements
-   **Renomeação "Terapeuta IA" → "Seu Guru"**: Nome mais quente e pessoal, sem mencionar "IA". Aplicado em: aba do dashboard, journey stages, mensagens do Aruan.
-   **Bug Fix - Respiração 4-4-6**: Corrigido círculo de respiração que estava parado (substituído SVG por div com transform:scale, animação 14s sincronizada com ciclo 4-4-6).
-   **MediaPlayer com botão X**: Vídeos agora podem ser fechados/pulados pelo usuário.
-   **Hash Navigation**: Suporte a /purpose#therapist para abrir tabs diretamente via URL.

### Mobile Responsiveness Fix (October 22, 2025)
-   **Breakpoint Change**: Trocado `md:` (768px) para `lg:` (1024px) em toda página /purpose e componentes relacionados. Celulares e tablets com tela grande agora veem versão mobile otimizada.
-   **Auto-scroll Menu**: Menu mobile agora scrolla automaticamente para conteúdo da aba quando usuário clica (useEffect com scrollIntoView).
-   **Layout "100% Confidencial"**: Badges do AI Therapist agora empilham verticalmente no mobile, sem sobreposição.
-   **Vídeos Maiores**: MediaPlayer e VideoPortal usam breakpoint lg: para vídeos full-width em celulares.
-   **Arquivos modificados**: purpose.tsx, App-purpose.tsx, ai-therapist.tsx, MediaPlayer.tsx, video-portal.tsx.
-   **⚠️ PENDENTE - Cache Mobile**: Código funcionando em desktop, mas iPhone do usuário com cache persistente/PWA impedindo atualizações. Aguardando teste em outro device para confirmar correções.

### Known Issues (Outubro 22, 2025)
-   **Mobile Cache Blocker**: iPhone específico do usuário com cache extremamente persistente. Tentativas: limpar Safari, modo privado, remover dados. Desktop funciona perfeitamente. Código mobile correto, aguardando validação em outro device.
-   **Menu Scroll Mobile**: Implementado com offset, mas não visível no device do usuário (cache issue).
-   **Vídeos Tamanho Mobile**: Aumentados para lg:max-w-5xl (MediaPlayer) e lg:max-w-7xl (VideoPortal), mas não visível no device do usuário (cache issue).

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