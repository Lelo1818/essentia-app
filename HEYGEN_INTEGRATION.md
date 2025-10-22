# 🎬 Integração Heygen - Guia de Implementação

## 📋 Visão Geral
Este guia mostra onde adicionar os vídeos gerados pelo Heygen nos componentes do Essentia.

## 🎯 Locais de Integração

### 1. **Mega Onboarding - Boas-vindas** ⭐ PRIORIDADE
**Arquivo:** `client/src/components/purpose/mega-onboarding.tsx`  
**Linha:** 162-165

**Vídeo sugerido:**
- Duração: 15-20 segundos
- Conteúdo: "Olá, eu sou [nome do xamã]. Bem-vindo ao Essentia! Vou te guiar nessa jornada de autoconhecimento e transformação. Escolha como prefere começar..."

**Como adicionar:**
```tsx
<WelcomeAvatar 
  videoUrl="https://resource.heygen.com/seu-video-id.mp4"  // ← ADICIONAR URL AQUI
  fallbackImage={shamanAvatar}
/>
```

---

### 2. **AI Coaches - Avatar dos Terapeutas**
**Arquivo:** `client/src/components/purpose/adaptive-companion.tsx`  
**Linha:** 235-239

**Vídeos sugeridos (4 vídeos, um para cada terapeuta):**

#### Sofia - Mentora Empática (Rosa/Roxo)
- Visual: Mulher acolhedora, sorriso gentil
- Animação: Acenos sutis, gestos empáticos
- Duração: Loop de 5-10s

#### Marcus - Estrategista (Azul/Índigo)
- Visual: Homem sério, postura confiante
- Animação: Olhar focado, gestos de raciocínio
- Duração: Loop de 5-10s

#### Luna - Guia Espiritual (Roxo/Rosa)
- Visual: Mulher mística, olhar profundo
- Animação: Movimentos suaves, aura serena
- Duração: Loop de 5-10s

#### Leo - Coach de Vida (Laranja/Vermelho)
- Visual: Homem energético, sorriso motivador
- Animação: Gestos enérgicos, expressões animadas
- Duração: Loop de 5-10s

**Como adicionar:**

Opção 1 - Criar objeto de configuração no início do arquivo:
```tsx
const coachAvatars = {
  supportive: "https://resource.heygen.com/sofia-video.mp4",
  analytical: "https://resource.heygen.com/marcus-video.mp4",
  intuitive: "https://resource.heygen.com/luna-video.mp4",
  motivational: "https://resource.heygen.com/leo-video.mp4"
};
```

Depois no componente:
```tsx
<CoachAvatar 
  videoUrl={coachAvatars[companionPersonality as keyof typeof coachAvatars]}
  fallbackImage={undefined}
  isCompact={false}
/>
```

---

### 3. **Portal UAU - Introdução** 🌟
**Arquivo:** `client/src/pages/journey.tsx`  
**Linha:** 63-67

**Vídeo sugerido:**
- Duração: 30-45 segundos
- Conteúdo: "Você está prestes a vivenciar o Portal UAU, uma experiência que conecta as 4 dimensões do seu ser: Físico, Energético, Mental e Espiritual. Prepare seu coração e sua mente para essa jornada transformadora. Vamos começar?"
- Aspect ratio: 16:9 (landscape)

**Como adicionar:**
```tsx
<PortalIntroAvatar
  videoUrl="https://resource.heygen.com/portal-intro.mp4"  // ← ADICIONAR URL AQUI
  fallbackImage={undefined}
  onComplete={handleIntroComplete}
/>
```

---

## 🎨 Características Técnicas dos Vídeos

### Especificações Recomendadas:
- **Formato:** MP4 (H.264)
- **Resolução:** 
  - Onboarding/Coaches: 512x512 (quadrado)
  - Portal UAU: 1920x1080 (16:9)
- **FPS:** 30
- **Bitrate:** 2-4 Mbps
- **Áudio:** AAC 128kbps (só para vídeos com fala)

### Avatar no Heygen:
- **Tipo:** Custom character ou stock character
- **Figurino:** Roupas neutras ou com elementos místicos/espirituais
- **Background:** Fundo neutro ou desfocado (bokeh)
- **Iluminação:** Soft, evitar sombras fortes

---

## 🚀 Passo a Passo de Implementação

### 1. Gerar vídeos no Heygen
1. Acesse sua conta Heygen
2. Selecione o avatar desejado
3. Escreva o script (textos sugeridos acima)
4. Configure:
   - Voz brasileira (PT-BR)
   - Tom apropriado para cada personalidade
   - Velocidade natural
5. Gere o vídeo

### 2. Obter URLs dos vídeos
- Após geração, copie a URL pública do vídeo
- Formato: `https://resource.heygen.com/video/[id].mp4`

### 3. Adicionar no código
- Edite os arquivos indicados acima
- Substitua `videoUrl={undefined}` pela URL real
- Salve e teste

### 4. Testar
- Navegue até cada seção
- Verifique:
  - ✅ Vídeo carrega corretamente
  - ✅ Áudio sincronizado
  - ✅ Controles funcionando (play/pause)
  - ✅ Transições suaves
  - ✅ Fallback funciona se vídeo falhar

---

## 📝 Scripts Sugeridos

### Onboarding (15-20s)
```
Olá! Eu sou seu guia nessa jornada de transformação.
Bem-vindo ao Essentia, onde você vai descobrir o melhor de si mesmo.
Escolha como prefere começar: de forma rápida e prática, 
ou mergulhando profundamente em reflexões. 
Estou aqui para te acompanhar em cada passo.
```

### Portal UAU (30-45s)
```
Você está prestes a vivenciar uma experiência única.
O Portal UAU conecta as quatro dimensões do seu ser:
o Físico - seu corpo e vitalidade,
o Energético - sua força e motivação,
o Mental - sua clareza e foco,
e o Espiritual - seu propósito e conexão interior.

Prepare-se para uma jornada transformadora.
Encontre um lugar tranquilo, respire fundo...
e vamos começar.
```

### Sofia - Mentora Empática (5s loop)
```
[Acena gentilmente] 
Estou aqui para te ouvir e apoiar. 
Como você está se sentindo hoje?
```

### Marcus - Estrategista (5s loop)
```
[Olhar focado] 
Vamos analisar juntos e encontrar 
o melhor caminho para seus objetivos.
```

### Luna - Guia Espiritual (5s loop)
```
[Gesto sereno] 
Conecte-se com sua sabedoria interior. 
O que sua alma quer te dizer?
```

### Leo - Coach de Vida (5s loop)
```
[Sorriso motivador, punho cerrado] 
Você é capaz de muito mais! 
Vamos transformar sua vida hoje!
```

---

## 🎯 Priorização

### Implementar AGORA (Maior impacto):
1. ✅ **Onboarding** - Primeira impressão crucial
2. ✅ **Portal UAU Intro** - Experiência imersiva

### Implementar em seguida:
3. **Sofia/Marcus/Luna/Leo** - Personalização dos coaches

---

## 💡 Dicas

- **Teste com fallback primeiro:** Veja se o layout está bom antes de adicionar vídeos
- **Use vídeos curtos:** Carregamento mais rápido, melhor UX
- **Loop inteligente:** Coaches podem ter vídeos em loop (5-10s)
- **Voz brasileira:** Configure tom e velocidade para parecer natural
- **Compressão:** Otimize vídeos para web (max 5MB por vídeo)

---

## 🐛 Troubleshooting

### Vídeo não carrega
- Verifique se URL está correta (copy-paste do Heygen)
- Confirme que vídeo é público (não privado)
- Teste URL diretamente no navegador

### Vídeo carrega mas não toca
- Verifique configuração `autoplay` no componente
- Alguns navegadores bloqueiam autoplay com áudio
- Use `muted={true}` para autoplay funcionar

### Performance ruim
- Comprima vídeos (bitrate menor)
- Use resolução adequada (não exagere)
- Considere lazy loading

---

**Pronto para começar? Qualquer dúvida, só avisar! 🚀**
