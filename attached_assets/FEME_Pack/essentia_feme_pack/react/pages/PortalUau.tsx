import React from "react";
import { PortalUau } from "@/components/purpose-plus/PortalUau";

export default function PortalUauPage(){
  return (
    <div className="p-4 md:p-6">
      <PortalUau
        videoSrc="/assets/inner-awakening.mp4"
        question="Qual é a pergunta que move seu dia?"
        answer="Respire. Nomeie o próximo passo. E dê um passo pequeno agora."
        cta="Começar ritual"
        onDone={()=> window.location.hash = "#/breathing"}
      />
    </div>
  );
}
