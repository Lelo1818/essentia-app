# 🌟 Sistema dos 6 Avatares - Flow Ecosystem

## Overview
Sistema completo de 6 avatares (guardiões) que guiam o usuário através das diferentes dimensões da jornada de transformação pessoal no Essentia.

## 📍 Acesso
**URL:** `/avatars`

## Os 6 Guardiões

### 1. Aruan - O Guardião do Propósito
- **Elemento:** Espírito
- **Cor:** Roxo/Índigo (purple-600 to indigo-600)
- **Vídeo:** `Aruan O guardiao do Proposito_1761230808884.mp4`
- **Energia:** Presença, coragem e propósito
- **Dom:** Conexão com seu eu autêntico
- **Papel na Jornada:** Guardião ancestral que desperta a força interior. É o primeiro contato, o chamado ao despertar.
- **Uso Atual:** Onboarding, Portal do Despertar (/journey)

### 2. Sofia - A Luz da Clareza
- **Elemento:** Mental
- **Cor:** Azul/Ciano (blue-500 to cyan-400)
- **Vídeo:** `Sofia — A Luz da Clareza_1761230808883.mp4`
- **Energia:** Sabedoria, clareza e insight
- **Dom:** Visão além das ilusões
- **Papel na Jornada:** Mestra da mente clara e do discernimento. Guia a dimensão mental.
- **Integração Planejada:** Portal da Clareza, AI Therapist ("Seu Guru")

### 3. Nara - A Cura da Terra
- **Elemento:** Físico
- **Cor:** Verde/Esmeralda (green-600 to emerald-500)
- **Vídeo:** `Nara — A Cura da Terra_1761230808884.mp4`
- **Energia:** Regeneração, vitalidade e equilíbrio
- **Dom:** Conexão profunda com o corpo
- **Papel na Jornada:** Guardiã da cura e do enraizamento terrestre. Guia a dimensão física.
- **Integração Planejada:** FEME Check-in (dimensão Físico), Rituais de enraizamento

### 4. Kael - O Sopro da Sabedoria
- **Elemento:** Energético
- **Cor:** Âmbar/Laranja (amber-500 to orange-400)
- **Vídeo:** `Kael — O Sopro da Sabedoria_1761230808885.mp4`
- **Energia:** Respiração, fluxo e transformação
- **Dom:** Domínio da energia vital
- **Papel na Jornada:** Mestre do sopro vital e da energia sutil. Guia a dimensão energética.
- **Integração Planejada:** Exercícios de respiração (/breath, /breathing-446), FEME dimensão Energético

### 5. Amaya - A Voz da Intuição
- **Elemento:** Espiritual
- **Cor:** Violeta/Roxo (violet-600 to purple-500)
- **Vídeo:** `Amaya — A Voz da Intuição_1761230808885.mp4`
- **Energia:** Percepção, sensibilidade e conexão
- **Dom:** Escuta profunda da alma
- **Papel na Jornada:** Guardiã da intuição e da visão interior. Guia a dimensão espiritual.
- **Integração Planejada:** Portal da Intuição (/portals), FEME dimensão Espiritual, Auto-sessões

### 6. Aruan - O Fogo da Coragem
- **Elemento:** Transformação
- **Cor:** Vermelho/Laranja (red-600 to orange-500)
- **Vídeo:** `Aruan — O Fogo da Coragem_1761230808886.mp4`
- **Energia:** Coragem, ação e transformação
- **Dom:** Poder de agir apesar do medo
- **Papel na Jornada:** Guerreiro do fogo que acende a chama interior. Ativa o poder de transformação.
- **Integração Atual:** Respiração 4-4-6 (/breathing-446)

## Arquitetura Técnica

### Componentes
- **Página Principal:** `client/src/pages/avatars.tsx`
- **Player de Vídeo:** `client/src/components/MediaPlayer.tsx` (reutilizado)
- **Rota:** `/avatars` (standalone - sem navegação Flow)

### Importação dos Vídeos
```typescript
import sofiaVideo from "@assets/Sofia — A Luz da Clareza_1761230808883.mp4";
import naraVideo from "@assets/Nara — A Cura da Terra_1761230808884.mp4";
import aruanGuardiaoVideo from "@assets/Aruan O guardiao do Proposito_1761230808884.mp4";
import kaelVideo from "@assets/Kael — O Sopro da Sabedoria_1761230808885.mp4";
import amayaVideo from "@assets/Amaya — A Voz da Intuição_1761230808885.mp4";
import aruanFogoVideo from "@assets/Aruan — O Fogo da Coragem_1761230808886.mp4";
```

### Interface Avatar
```typescript
interface Avatar {
  id: string;              // ID único
  name: string;            // Nome do avatar
  title: string;           // Título/arquétipo
  element: string;         // Elemento que representa
  color: string;           // Gradiente de cores (Tailwind)
  icon: typeof Sparkles;   // Ícone Lucide
  video: string;           // Path do vídeo
  description: string;     // Descrição do papel
  energy: string;          // Energia que transmite
  gift: string;            // Dom que oferece
}
```

### UX da Página /avatars
1. **Hero Section:** Título + descrição dos 6 Guardiões
2. **Grid Responsivo:** 1 coluna (mobile) → 2 (tablet) → 3 (desktop)
3. **Cards Interativos:**
   - Ícone circular com gradiente
   - Nome e título do avatar
   - Badge do elemento
   - Descrição + energia + dom
   - Botão "Conhecer {Avatar}"
4. **Modal de Vídeo:**
   - Abre ao clicar no card
   - MediaPlayer fullscreen com controles
   - Botão X para fechar
   - Tracking de eventos (quartis, complete)

### Integração com Jornada

#### Fluxo Atual
- **Onboarding:** Aruan (Guardião) apresenta a jornada
- **Portal do Despertar:** Aruan (Guardião) abre o portal da clareza
- **Respiração 4-4-6:** Aruan (Fogo) ativa a coragem
- **Rituais:** Aruan (Guardião) nos rituais de Gratidão e Recomeço
- **Portal da Intuição:** Amaya (implícito - vídeo ainda não integrado)

#### Próximos Passos de Integração
1. **Sofia → AI Therapist:** Substituir nome "Sofia" genérico por vídeo de apresentação
2. **Nara → FEME Físico:** Aparecer ao fazer check-in com dimensão Físico baixa
3. **Kael → Breath Exercises:** Apresentação antes de exercícios de respiração
4. **Amaya → Portal Intuição:** Substituir por vídeo de Amaya
5. **Navegação Dinâmica:** Após completar experiência, avatar sugere próximo passo

## Filosofia dos Avatares

### Simbologia
Cada avatar representa uma dimensão do modelo FEME + transformação:
- **Físico (Nara):** Enraizamento, corpo, matéria
- **Energético (Kael):** Respiração, chi, fluxo vital
- **Mental (Sofia):** Clareza, discernimento, sabedoria
- **Espiritual (Amaya):** Intuição, conexão, transcendência
- **Guardião (Aruan):** Presença, propósito, integração
- **Transformação (Aruan Fogo):** Coragem, ação, mudança

### Progressão Narrativa
1. **Aruan Guardião** → Chamado ao despertar
2. **Sofia** → Clareza mental para ver o caminho
3. **Nara** → Enraizamento físico para sustentar a jornada
4. **Kael** → Energia vital para fluir com a vida
5. **Amaya** → Intuição espiritual para ouvir a alma
6. **Aruan Fogo** → Coragem para agir e transformar

## Sistema de Pontos
- Cada vídeo assistido: +25 pontos
- Completar experiência guiada pelo avatar: +50 pontos
- Ver todos os 6 avatares: +100 pontos bônus (badge "Encontro Completo")

## Estado Atual (Outubro 23, 2025)
- ✅ Página `/avatars` criada e funcionando
- ✅ 6 vídeos HeyGen recebidos e importados
- ✅ Grid interativo com modal de vídeo
- ✅ Integração com MediaPlayer
- ⏳ Integração dos avatares nas experiências específicas (próxima etapa)
- ⏳ Sistema de navegação dinâmica avatar → experiência

## Arquivos Relacionados
- `client/src/pages/avatars.tsx` - Página principal
- `client/src/components/MediaPlayer.tsx` - Player de vídeo
- `attached_assets/*.mp4` - Vídeos dos 6 avatares
- `ARUAN_VIDEOS_GUIDE.md` - Guia detalhado dos vídeos Aruan
