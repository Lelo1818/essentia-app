# Essentia — FEME Compass Pack (Layout + React)
## Conteúdo
- `assets/FEME_Compass.svg` — layout de referência.
- `react/components/feme/FEMECompass.tsx` — componente FEME + Selo.
- `react/pages/PortalUau.tsx` — exemplo de rota com vídeo local.

## Integração (Vite/Replit)
1. **Assets**
   - Coloque `assets/FEME_Compass.svg` em `client/public/assets/FEME_Compass.svg`.
   - Coloque o vídeo em `client/public/assets/inner-awakening.mp4`.
2. **Componente FEME**
   - Copie `FEMECompass.tsx` para `client/src/components/feme/` e importe onde quiser.
3. **Rota Portal UAU**
   - Copie `PortalUau.tsx` para `client/src/pages/` e registre a rota `#/portal-uau`.
4. **Dicas**
   - `playsInline` + `muted` garantem autoplay no mobile.
   - Use `poster` estático para primeira pintura.

## Exemplo de uso
```tsx
import { FEMECompass } from "@/components/feme/FEMECompass";
<FEMECompass
  values={{ fisico:7, energetico:6, mental:5, espiritual:7 }}
  coherence={68}
  onHarmonize={()=> setActiveTab?.("breathing")}
/>
```

