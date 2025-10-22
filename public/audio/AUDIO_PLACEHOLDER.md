# 🥁 Sons de Tambor - Instruções

## 📂 Arquivos Necessários

Coloque os seguintes arquivos de áudio nesta pasta (`/public/audio/`):

### Sons de Tambor Xamânicos:
1. **tribal_drum.mp3** - Tambor tribal profundo (1-2 batidas)
   - Duração: ~1-2 segundos
   - Uso: Quando avatar xamã aparece
   - Referência: Som de djembe ou tambor nativo brasileiro

2. **ceremonial_drum.mp3** - Sequência cerimonial (3-4 batidas ritmadas)
   - Duração: ~2-3 segundos
   - Uso: Momentos de conquista especial
   - Referência: Tambores em cerimônias indígenas

3. **avatar_appear.mp3** - Som místico + tambor suave
   - Duração: ~1 segundo
   - Uso: Quando qualquer avatar (Sofia/Marcus/Luna/Leo) aparece
   - Mix: Sino tibetano + batida suave

## 🎵 Onde Encontrar Sons

### Opções Gratuitas:
- **Freesound.org** - Busque por "tribal drum", "djembe", "ceremonial drum"
- **Zapsplat.com** - Categoria "World > Percussion"
- **Mixkit.co** - Sons gratuitos de percussão

### Opções Pagas (Melhor Qualidade):
- **Epidemic Sound** - Biblioteca profissional
- **AudioJungle** - Sons específicos de xamanismo
- **Splice** - Samples de world percussion

## 🎛️ Especificações Técnicas

```
Formato: MP3
Bitrate: 128-192 kbps
Sample Rate: 44.1 kHz
Canais: Stereo ou Mono
Volume: Normalizado (evitar picos)
```

## 🔧 Como Adicionar

1. Baixe ou crie os sons de tambor
2. Renomeie para os nomes exatos acima
3. Coloque nesta pasta: `/public/audio/`
4. Reinicie o servidor (`npm run dev`)
5. Teste clicando no vídeo do xamã no onboarding

## ✅ Verificação

Sons funcionando se:
- ✅ Tambor toca quando xamã aparece no onboarding
- ✅ Volume está adequado (não muito alto)
- ✅ Som não corta/clippa
- ✅ Timing sincronizado com vídeo

---

**Temporariamente**: O app vai funcionar sem os sons (sistema tem fallback automático). Mas a experiência fica MUITO melhor com eles! 🔥
