# Essentia — Portal UAU (Pack)
## Standalone (sem build)
- Suba `standalone/portal-uau.html` no Replit/Netlify.
- Troque `video src=""` por um link MP4 (ou substitua por `<iframe src="...">`).
- Pronto: link único com experiência UAU.

## React (no projeto atual)
- Copie `react/components/purpose-plus/PortalUau.tsx` → `client/src/components/purpose-plus/`
- Importe e use:
```tsx
import { PortalUau } from "@/components/purpose-plus/PortalUau";
<PortalUau
  videoSrc="https://SEU-LINK/portal.mp4"
  question="Qual é a pergunta que move seu dia?"
  answer="Respire. Nomeie o próximo passo. E dê um passo pequeno agora."
  cta="Começar ritual"
  onDone={()=> setActiveTab('breathing') }
/>
```
