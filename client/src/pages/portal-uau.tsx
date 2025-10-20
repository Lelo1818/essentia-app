import { useState, useEffect } from "react";
import { PortalUau } from "@/components/purpose-plus/PortalUau";
import { useLocation } from "wouter";
import { trackPortal } from "@/lib/analytics";

interface PortalPrompt {
  question: string;
  answer: string;
}

export default function PortalUauPage() {
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState<PortalPrompt | null>(null);

  useEffect(() => {
    trackPortal('open', 'uau');
    fetch('/data/portal_prompts.json')
      .then(res => res.json())
      .then((prompts: PortalPrompt[]) => {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        setPrompt(prompts[randomIndex]);
      })
      .catch(err => {
        console.error('Error loading portal prompts:', err);
        setPrompt({
          question: "Qual é a pergunta que move seu dia?",
          answer: "Respire. Nomeie o próximo passo. E dê um passo pequeno agora."
        });
      });
  }, []);

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="text-white text-2xl">Carregando Portal UAU...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PortalUau
          videoSrc="/assets/inner-awakening.mp4"
          question={prompt.question}
          answer={prompt.answer}
          cta="Começar ritual"
          onDone={() => {
            trackPortal('complete', 'uau');
            setLocation("/purpose#breathing");
          }}
        />
      </div>
    </div>
  );
}
