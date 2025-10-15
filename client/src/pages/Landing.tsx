import { Button } from "@/components/ui/button";
import { Target, BarChart3, Users } from "lucide-react";
import logoUrl from "@assets/Logo Thera_1760542286894.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1a2a] via-[#1a2332] to-[#0f1a2a] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12 text-center">
        {/* Logo e título */}
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-4">
            <img 
              src={logoUrl} 
              alt="Thera Funding" 
              className="rounded-xl w-20 h-20"
            />
            <div className="text-left">
              <div className="text-3xl tracking-[0.18em] font-semibold text-[#c6a86b]">
                THERA
              </div>
              <div className="text-base tracking-[0.32em] text-[#c6a86b] opacity-80">
                FUNDING
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Prop Trading Desk Internacional
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#1a2332]/50 backdrop-blur-sm border border-[#c6a86b]/20 rounded-lg p-6 space-y-3">
            <div className="w-12 h-12 bg-[#c6a86b]/10 rounded-lg flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-[#c6a86b]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c6a86b]">Modo Game</h3>
            <p className="text-sm text-gray-400">
              Pratique com simulação realista antes de operar com capital real
            </p>
          </div>

          <div className="bg-[#1a2332]/50 backdrop-blur-sm border border-[#c6a86b]/20 rounded-lg p-6 space-y-3">
            <div className="w-12 h-12 bg-[#c6a86b]/10 rounded-lg flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6 text-[#c6a86b]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c6a86b]">Análise AI</h3>
            <p className="text-sm text-gray-400">
              Diário de trades com análise emocional e técnica por IA
            </p>
          </div>

          <div className="bg-[#1a2332]/50 backdrop-blur-sm border border-[#c6a86b]/20 rounded-lg p-6 space-y-3">
            <div className="w-12 h-12 bg-[#c6a86b]/10 rounded-lg flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-[#c6a86b]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c6a86b]">Comunidade</h3>
            <p className="text-sm text-gray-400">
              Conecte-se com outros traders e compartilhe estratégias
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 mt-12">
          <Button
            onClick={() => window.location.href = '/api/login'}
            size="lg"
            className="bg-gradient-to-r from-[#c6a86b] to-[#d4b87c] hover:from-[#b89958] hover:to-[#c6a86b] text-[#0f1a2a] font-semibold px-12 py-6 text-lg rounded-lg shadow-2xl shadow-[#c6a86b]/20 transition-all duration-300 hover:scale-105"
            data-testid="button-login"
          >
            Entrar na Plataforma
          </Button>
          <p className="text-sm text-gray-400">
            Entre com Google, GitHub ou Email
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-sm text-gray-500">
          <p>Mobile-First • Real-Time Data • Professional Platform</p>
        </div>
      </div>
    </div>
  );
}
