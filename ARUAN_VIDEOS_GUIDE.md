# 🔥 Guia de Gravação - Avatar Aruan (Xamã)

## 🎬 Vídeos para Gravar no HeyGen

### 📋 Checklist Rápido
- [x] Vídeo 1: Onboarding (20s) ✅ INTEGRADO
- [x] Vídeo 2: Portal do Despertar - Intro (30s) ✅ INTEGRADO
- [x] Vídeo 3: Portal da Gratidão (ritual diário) ✅ INTEGRADO
- [x] Vídeo 4: Respiração 4-4-6 - Intro ✅ INTEGRADO
- [x] Vídeo 5: Portal do Recomeço (ritual diário) ✅ INTEGRADO
- [ ] Vídeo 6: Respiração - Abertura Rápida (3-5s)
- [ ] Vídeo 7: Conquista (3s) - opcional

---

## 🎥 Vídeo 1: Onboarding Principal (20s) - DESPERTAR

**Arquivo:** `aruan_onboarding.mp4`

**Script:**
```
Respire... e sinta o poder de seguir mesmo com medo.
A jornada de despertar começa agora.
```

**Especificações:**
- **Duração:** 20 segundos (expanda o texto acima com pausas dramáticas)
- **Formato:** Vertical 9:16 (1080x1920)
- **Fundo:** Natureza com fogo suave ou luz dourada (mais dramático)
- **Trilha:** Tambor heartbeat 72 bpm + vento leve
- **Voz:** Masculina grave, tom ENCORAJADOR, presença firme
- **Expressão:** Olhar penetrante, energia de coragem, chamado à ação
- **Iluminação:** Luz quente lateral (fogo mais evidente)
- **Figurino:** Trajes simbólicos, tecidos naturais, metais/adornos

**Uso no app:** 
Aparece no onboarding, antes de escolher modo Express/Reflexivo - IMPACTO EMOCIONAL MÁXIMO

---

## 🌌 Vídeo 2: Portal do Despertar - Apresentação (20s)

**Arquivo:** `aruan_portal_intro.mp4`

**Script:**
```
Olá, eu sou Aruan.
Estarei com você nesta jornada de despertar.
Respire fundo...
A sabedoria que você procura já vive em você.
```

**Especificações:**
- **Duração:** 20 segundos
- **Formato:** Landscape 16:9 (1920x1080)
- **Fundo:** Mesmo estilo do vídeo 1 (consistência visual)
- **Voz:** Mesma voz, tom mais ACOLHEDOR e introdutório
- **Expressão:** Serena, acolhedora, apresentação do guia

**Uso no app:** 
Toca no Portal do Despertar (/journey) - apresentação formal do Aruan

---

## 🌿 Vídeo 3: Portal da Gratidão - Ritual Diário (30s) ✅ INTEGRADO

**Arquivo:** `Portal da Gratidão_1761137810586.mp4`

**Script:**
```
[Texto do vídeo - gravado e integrado]
Pausa, presença e reconhecimento das bençãos do dia
```

**Especificações:**
- **Duração:** ~30 segundos
- **Formato:** Landscape 16:9 (1920x1080)
- **Fundo:** Natural com luz quente
- **Voz:** Tom calmo, presença, fechamento emocional
- **Expressão:** Serenidade, gratidão, momento de integração
- **Energia:** Fechamento de ciclo, não transição

**Uso no app:** 
- Toca no **Ritual da Gratidão** dentro de Rituais Diários
- Após o vídeo, aparece mensagem: "Respira e agradece. A cada pequeno passo, a vida floresce contigo."
- Usuário escreve 1 frase de gratidão
- Salvo como `ritual_completed: true` no banco

**Status:** ✅ **INTEGRADO** - Funcionando em `/purpose` → aba "Rituais"

---

## 🔱 Vídeo 4: Portal do Recomeço - Ritual Diário (30s) ✅ INTEGRADO

**Arquivo:** `Portal do Recomeço_1761159818471.mp4`

**Script:**
```
[Texto do vídeo - gravado e integrado]
Liberação, renascimento, novo começo
```

**Especificações:**
- **Duração:** ~30 segundos
- **Formato:** Landscape 16:9 (1920x1080)
- **Fundo:** Natural com luz transformadora
- **Voz:** Tom firme, energia de renovação
- **Expressão:** Determinação, recomeço, transformação
- **Energia:** Libertação e novo início

**Uso no app:** 
- Toca no **Ritual do Recomeço** dentro de Rituais Diários
- Após o vídeo, aparece mensagem: "Todo fim é um início disfarçado. Respire fundo. Você está pronto para recomeçar."
- Usuário escreve o que quer deixar pra trás
- Salvo como `ritual_completed: true` no banco

**Simbologia:**
- **Gratidão** = aceitação do presente (passivo, receptivo)
- **Recomeço** = ação para o futuro (ativo, transformador)
- Juntos formam o ciclo completo: acolher + liberar

**Status:** ✅ **INTEGRADO** - Funcionando em `/purpose` → aba "Rituais"

---

## 🔮 Vídeo 5: Portal da Intuição (30s) ✅ INTEGRADO

**Arquivo:** `Portal da Intuição_1761165744262.mp4`

**Script:**
```
[Vídeo HeyGen gravado - Intui\u00e7\u00e3o e sabedoria interior]
```

**Especificações:**
- **Duração:** ~30 segundos
- **Formato:** Landscape 16:9 (1920x1080)
- **Tamanho:** 12MB
- **Energia:** Intuição, clareza interior, percepção sutil

**Uso no app:** 
**✅ INTEGRADO** - Portal da Intuição em `/portals`

**Fluxo completo:**
1. Usuário clica em "Portal da Intuição" na página de portais
2. Fade branco de entrada (2s)
3. Vídeo Portal da Intuição toca (16:9)
4. Após vídeo: mensagem reflexiva aparece
   - "Feche os olhos. O que você sente quando o caminho não é claro, mas o coração sabe?"
5. Campo de texto para reflex\u00e3o
6. Salva reflexão no diário (endpoint /api/reflections)
7. +75 pontos ao completar

**Progressão narrativa dos portais:**
Portal da Clareza → Portal da Gratidão → Portal do Recomeço → **Portal da Intuição**

A intuição é o eixo que liga e equilibra todos os portais anteriores (ciclo masculino/feminino).

**Status:** ✅ **INTEGRADO** - Funcionando em `/portals` → Portal da Intuição

---

## 🧘 Vídeo 6: Respiração - Abertura (3-5s)

**Arquivo:** `aruan_breath_intro.mp4`

**Script:**
```
Respire.
A sabedoria não vem de fora — vem do silêncio em você.
```

**Especificações:**
- **Duração:** 3-5 segundos
- **Formato:** Quadrado 1:1 (1080x1080) ou 16:9
- **Fundo:** Fogo muito suave ou apenas luz (minimalista)
- **Voz:** Tom meditativo, quase sussurrado
- **Respiração visível:** Aruan respira junto, peito sobe/desce suavemente

**Uso no app:** 
Abre a tela de respiração 4-4-6 (/breath)

---

## 🏆 Vídeo 7: Conquista - Parabéns (3s) [OPCIONAL]

**Arquivo:** `aruan_achievement.mp4`

**Script:**
```
Mais um passo dado com coragem.
```

**Especificações:**
- **Duração:** 3 segundos
- **Formato:** Quadrado 1:1 (512x512)
- **Fundo:** Escuro neutro
- **Voz:** Tom celebrativo mas não exagerado
- **Gesto:** Leve aceno de cabeça (aprovação)

**Uso no app:** 
Modal de conquistas especiais (bronze/prata/ouro)

---

## 🎨 Direção Visual Unificada

Para **TODOS** os vídeos, mantenha:

### Paleta de Cores
- Tons terrosos: marrom, bege, ocre
- Acentos quentes: dourado, laranja fogo
- Fundo escuro neutro (não preto total)

### Iluminação
- Luz quente lateral (como fogo de fogueira)
- Evitar luz frontal dura
- Sombras suaves no rosto

### Figurino
- Tecidos naturais (algodão, linho, couro)
- Metais: bronze, cobre (não prata/ouro brilhante)
- Símbolos tribais/ancestrais discretos
- SEM exagero (não "fantasia de índio")

### Expressão
- ✅ Sereno, presente, firme
- ✅ Olhar nos olhos (conexão)
- ✅ Movimentos lentos, deliberados
- ❌ Nunca agressivo, dramático, teatral

### Voz (HeyGen ou Dublagem)
- Tom: grave, baixo registro
- Ritmo: pausado, cadenciado (como heartbeat)
- Volume: médio-baixo (intimidade)
- Dicção: clara mas não robótica

---

## 📦 Status de Integração

### ✅ Vídeos Integrados

```
✓ Despertar Interior_1760814881524.mp4         (Onboarding - 9:16)
✓ Portal da Clareza_1761132977385.mp4          (Portal do Despertar - 16:9)
✓ Portal da Gratidão_1761137810586.mp4         (Ritual de Gratidão - 16:9)
✓ Desperte Sua Coragem_1761138039346.mp4       (Respiração 4-4-6 Intro - 16:9)
✓ Portal do Recomeço_1761159818471.mp4         (Ritual do Recomeço - 16:9)
✓ Portal da Intuição_1761165744262.mp4         (Portal da Intuição - 16:9)
```

### 🔄 Próximos Vídeos (Para Integrar)

```
⏳ Paz Interior Agora_1761141385712.mp4        (Respiração Rápida - 15-20s - 16:9 ou 1:1)
⏳ aruan_achievement.mp4                        (Conquista - 3s - 1:1) [opcional]
```

**Nota:** O "Paz Interior Agora" é um vídeo curto HeyGen para respirações rápidas (3-3-3, 4-4, etc). Integrar em GuidedBreathing component.

**Localização:** `attached_assets/`

---

## 🎯 Próximos Avatares (Futuro)

Após Aruan funcionar, você pode clonar o estilo para:

- **Aiyana** (feminino, intuição)
- **Kael** (masculino, estratégia)  
- **Lumi** (neutro, clareza)

Mesmo processo, apenas ajustando figurino/voz/energia.
