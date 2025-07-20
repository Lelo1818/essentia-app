import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Flame, Shield, Mountain, ArrowRight, Zap, Target, Eye, Heart } from "lucide-react";

export default function Portais() {
  const [step, setStep] = useState('initial'); // initial, reflection, commitment, activated
  const [fear, setFear] = useState('');
  const [commitment, setCommitment] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  const activateCourage = () => {
    setPulseEffect(true);
    setIsActivated(true);
    setStep('activated');
    
    // Efeito sonoro simulado com vibração do dispositivo
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    
    setTimeout(() => setPulseEffect(false), 2000);
  };

  const getBackgroundClass = () => {
    if (isActivated) {
      return "min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-50 transition-all duration-1000";
    }
    return "min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 transition-all duration-1000";
  };

  const getCardClass = () => {
    if (isActivated) {
      return "max-w-3xl w-full shadow-2xl border-0 backdrop-blur-sm bg-gradient-to-br from-white/95 to-orange-50/90 transition-all duration-1000";
    }
    return "max-w-3xl w-full shadow-2xl border-0 backdrop-blur-sm bg-white/95 transition-all duration-1000";
  };

  if (step === 'initial') {
    return (
      <div className={getBackgroundClass()}>
        <div className="flex items-center justify-center p-6 min-h-screen">
          <Card className={getCardClass()}>
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center relative">
                <Shield className="w-10 h-10 text-white" />
                {pulseEffect && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
              <CardTitle className="text-5xl font-bold text-slate-900 mb-6">
                Portal da Coragem
              </CardTitle>
              <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
                <span className="font-semibold text-red-600">Sinta o medo. Escolha a coragem. Dê o passo.</span>
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-4 max-w-2xl mx-auto">
                Este portal é um chamado direto para a ação consciente e a superação do medo. 
                Ative a bravura adormecida, rompa a paralisia da dúvida e enfrente desafios 
                com firmeza e presença.
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl">
                  <Mountain className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Supere Obstáculos</h3>
                  <p className="text-sm text-slate-600">Transforme hesitação em movimento</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl">
                  <Target className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Tome Decisões</h3>
                  <p className="text-sm text-slate-600">Converta intenção em atitude</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl">
                  <Flame className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Inicie Ciclos</h3>
                  <p className="text-sm text-slate-600">Dê o primeiro passo com confiança</p>
                </div>
              </div>

              <Button
                onClick={() => setStep('reflection')}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              >
                <Eye className="w-6 h-6 mr-3" />
                Despertar Minha Coragem
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'reflection') {
    return (
      <div className={getBackgroundClass()}>
        <div className="flex items-center justify-center p-6 min-h-screen">
          <Card className={getCardClass()}>
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                Reconheça Seu Medo
              </CardTitle>
              <p className="text-lg text-slate-600">
                O primeiro passo da coragem é olhar o medo nos olhos sem se identificar com ele.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="space-y-4">
                <label className="text-xl font-semibold text-slate-800 block">
                  Qual é o medo que mais te impede de avançar hoje?
                </label>
                <Textarea
                  placeholder="Seja honesto consigo mesmo. Escreva sem julgamento..."
                  value={fear}
                  onChange={(e) => setFear(e.target.value)}
                  className="min-h-[120px] text-lg p-4 border-2 border-slate-200 focus:border-red-400 rounded-xl"
                />
              </div>

              <div className="flex justify-between items-center">
                <Button
                  onClick={() => setStep('initial')}
                  variant="outline"
                  className="text-slate-600"
                >
                  ← Voltar
                </Button>
                
                <Button
                  onClick={() => setStep('commitment')}
                  disabled={!fear.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Prosseguir
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'commitment') {
    return (
      <div className={getBackgroundClass()}>
        <div className="flex items-center justify-center p-6 min-h-screen">
          <Card className={getCardClass()}>
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                O Primeiro Pequeno Passo
              </CardTitle>
              <p className="text-lg text-slate-600">
                A coragem não anula o medo, ela o guia. Defina uma pequena ação corajosa.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-400">
                <h4 className="font-semibold text-red-800 mb-2">Seu medo identificado:</h4>
                <p className="text-red-700 italic">"{fear}"</p>
              </div>

              <div className="space-y-4">
                <label className="text-xl font-semibold text-slate-800 block">
                  Qual pequeno ato de coragem você pode praticar nas próximas horas?
                </label>
                <Textarea
                  placeholder="Uma ligação adiada, uma conversa difícil, expressar uma opinião, tomar uma decisão..."
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value)}
                  className="min-h-[120px] text-lg p-4 border-2 border-slate-200 focus:border-orange-400 rounded-xl"
                />
              </div>

              <div className="flex justify-between items-center">
                <Button
                  onClick={() => setStep('reflection')}
                  variant="outline"
                  className="text-slate-600"
                >
                  ← Voltar
                </Button>
                
                <Button
                  onClick={activateCourage}
                  disabled={!commitment.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg"
                >
                  <Flame className="w-5 h-5 mr-2" />
                  Ativar Coragem
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'activated') {
    return (
      <div className={getBackgroundClass()}>
        <div className="flex items-center justify-center p-6 min-h-screen">
          <Card className={getCardClass()}>
            <CardHeader className="text-center pb-6">
              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center relative ${pulseEffect ? 'animate-pulse' : ''}`}>
                <Flame className="w-12 h-12 text-white" />
                {pulseEffect && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 mb-4">
                🔥 Coragem Ativada! 🔥
              </CardTitle>
              <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white text-lg px-4 py-2 mb-4">
                Portal Desbloqueado
              </Badge>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">
                  Sua Chama Interior Está Acesa
                </h3>
                <div className="text-center text-3xl font-bold text-red-600 mb-6">
                  "Minha coragem é a luz que guia meus passos."
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/80 rounded-xl border-l-4 border-orange-400">
                  <h4 className="font-bold text-slate-800 mb-2">Seu compromisso corajoso:</h4>
                  <p className="text-slate-700 text-lg italic">"{commitment}"</p>
                </div>

                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <h4 className="font-bold text-orange-800 mb-3">Lembre-se:</h4>
                  <ul className="text-orange-700 space-y-2">
                    <li>✨ A coragem não elimina o medo, ela age mesmo com ele presente</li>
                    <li>🎯 Pequenos passos corajosos constroem grande transformações</li>
                    <li>🔥 Sua energia interior está desbloqueada - use-a agora</li>
                    <li>⚡ O momento de agir é AGORA</li>
                  </ul>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={() => {
                    setStep('initial');
                    setFear('');
                    setCommitment('');
                    setIsActivated(false);
                  }}
                  variant="outline"
                  className="mr-4"
                >
                  Novo Despertar
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-slate-600 to-slate-800 text-white"
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}