import { CoherenceCompass } from "@/components/coherence-compass";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function CoherencePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/purpose')}
            className="text-white/70 hover:text-white hover:bg-white/10"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/')}
            className="text-white/70 hover:text-white hover:bg-white/10"
            data-testid="button-home"
          >
            <Home className="w-4 h-4 mr-2" />
            Início
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Análise de Coerência FEME
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Sistema científico baseado em princípios de coerência biológica e física quântica
              aplicada ao comportamento humano.
            </p>
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-white/80">
                Medimos não apenas níveis, mas as <span className="font-semibold text-purple-300">relações</span> entre suas dimensões
              </p>
            </div>
          </div>

          {/* Coherence Compass */}
          <div data-testid="coherence-compass-container">
            <CoherenceCompass />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">O que é Coerência?</h3>
              <p className="text-sm text-white/70">
                Coerência é o grau de harmonia entre suas 4 dimensões: Físico, Energético, Mental e Espiritual.
                Quanto maior a coerência, mais alinhado você está consigo mesmo.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-pink-300">Campo de Ressonância</h3>
              <p className="text-sm text-white/70">
                É a força total gerada pela combinação de níveis altos E coerência entre dimensões.
                Indica sua capacidade de manifestação e impacto.
              </p>
            </div>
          </div>

          {/* Como funciona */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Como funciona a análise?</h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">1.</span>
                <p>Analisamos seu último check-in FEME para extrair os níveis de cada dimensão</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">2.</span>
                <p>Calculamos a coerência entre pares de dimensões (Físico-Energético, Energético-Mental, etc.)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">3.</span>
                <p>Detectamos padrões de equilíbrio ou desequilíbrio no sistema como um todo</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">4.</span>
                <p>Geramos insights científicos e recomendações personalizadas baseadas nos dados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
