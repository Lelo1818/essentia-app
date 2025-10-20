# Essentia — Assets Pack (Textos + Placeholders)

## Conteúdo
- `texts/portal_prompts.(json|txt)` — 5 variações de pergunta/resposta para o Portal UAU.
- `texts/feme_microcopy.(json|txt)` — microcópias por pétala FEME (Físico, Energético, Mental, Espiritual).
- `images/*.svg` — 8 placeholders (960x540) para fundos de botões/abas (Respiração, Movimento, Mindfulness, Natureza, Som, Diário, SOS, Portal UAU).

## Como usar rapidamente (Replit/Vite)
1. Copie `images/*.svg` para `client/public/placeholders/`.
2. Em cada botão/aba, use a imagem correspondente como background (cover) ou `<img>`.
3. Carregue `portal_prompts.json` e sorteie uma variação por sessão do Portal UAU.
4. Use `feme_microcopy.json` para tooltips/dicas rápidas ao tocar nas pétalas.

## Sugestão de integração (PortalUau)
- Escolha uma pergunta/resposta do `portal_prompts.json` e aplique nas props `question`/`answer` do componente.
- Quando não houver vídeo pronto, use `portal.svg` como fundo da metade esquerda.

