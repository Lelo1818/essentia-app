import { useState } from 'react';
import { ArrowLeft, Sparkles, Heart, Brain, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { MediaPlayer } from '@/components/MediaPlayer';
import { useAuth } from '@/hooks/useAuth';
import { PortalIntroAvatar } from '@/components/avatars/video-avatar';
import portalClarezaVideo from '@assets/Portal da Clareza_1761132977385.mp4';
import shamanAvatar from '@assets/Captura de tela 2025-10-21 212327_1761092690319.png';

export default function JourneyPage() {
  const { user } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowVideo(true);
  };

  const handleVideoComplete = () => {
    // Track completion and award points
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        delta: 50,
        activity: 'portal_uau_complete',
      }),
    }).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/purpose">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-purple-900">Portal do Despertar</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:max-w-5xl">
        {showIntro ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Mensagem do seu Guia
              </h2>
              <p className="text-gray-600">
                Prepare-se para uma experiência transformadora
              </p>
            </div>
            
            {/* Avatar Intro Video - Portal da Clareza */}
            <PortalIntroAvatar
              videoUrl={portalClarezaVideo}
              fallbackImage={shamanAvatar}
              onComplete={handleIntroComplete}
            />
            
            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleIntroComplete}
                data-testid="button-skip-intro"
              >
                Pular Introdução →
              </Button>
            </div>
          </div>
        ) : !showVideo ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Portal do Despertar
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Uma jornada transformadora que desperta as 4 dimensões do seu ser: 
                Físico, Energético, Mental e Espiritual.
              </p>
            </div>

            {/* FEME Dimensions */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-900">Físico</h3>
                </div>
                <p className="text-gray-600">
                  Conexão com seu corpo, saúde e vitalidade física
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-900">Energético</h3>
                </div>
                <p className="text-gray-600">
                  Sua energia vital, entusiasmo e motivação
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-900">Mental</h3>
                </div>
                <p className="text-gray-600">
                  Clareza mental, foco e capacidade de decisão
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900">Espiritual</h3>
                </div>
                <p className="text-gray-600">
                  Propósito, significado e conexão transcendente
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
                onClick={() => setShowVideo(true)}
                data-testid="button-watch-video"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Iniciar Despertar
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                🎁 Ganhe 50 pontos ao completar
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <MediaPlayer
              assetKey="portal_despertar"
              title="Portal do Despertar"
              videoUrl={portalClarezaVideo}
              onComplete={handleVideoComplete}
            />
            
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowVideo(false)}
                data-testid="button-back-to-info"
              >
                Voltar para Informações
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
