import { useState } from 'react';
import { ArrowLeft, Sparkles, Heart, RefreshCw, Eye } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { IntuitionPortal } from '@/components/portals/intuition-portal';
import portalClarezaVideo from '@assets/Portal da Clareza_1761132977385.mp4';
import portalGratidaoVideo from '@assets/Portal da Gratidão_1761137810586.mp4';
import portalRecomecoVideo from '@assets/Portal do Recomeço_1761159818471.mp4';
import portalIntuicaoVideo from '@assets/Portal da Intuição_1761165744262.mp4';

type PortalType = 'clareza' | 'gratidao' | 'recomeco' | 'intuicao' | null;

export default function PortalsPage() {
  const [activePortal, setActivePortal] = useState<PortalType>(null);

  const portals = [
    {
      id: 'clareza' as PortalType,
      name: 'Portal da Clareza',
      description: 'Encontre clareza mental e visão para suas decisões',
      icon: Sparkles,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-400',
      videoUrl: portalClarezaVideo,
    },
    {
      id: 'gratidao' as PortalType,
      name: 'Portal da Gratidão',
      description: 'Cultive gratidão e reconheça as bençãos do presente',
      icon: Heart,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-400',
      videoUrl: portalGratidaoVideo,
    },
    {
      id: 'recomeco' as PortalType,
      name: 'Portal do Recomeço',
      description: 'Libere o passado e renasça para novos começos',
      icon: RefreshCw,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-400',
      videoUrl: portalRecomecoVideo,
    },
    {
      id: 'intuicao' as PortalType,
      name: 'Portal da Intuição',
      description: 'Conecte-se à sabedoria interior e à voz do coração',
      icon: Eye,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
      borderColor: 'border-purple-400',
      videoUrl: portalIntuicaoVideo,
    },
  ];

  if (activePortal === 'intuicao') {
    return <IntuitionPortal onClose={() => setActivePortal(null)} />;
  }

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
          <h1 className="text-xl font-bold text-purple-900">Portais da Jornada</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Jornada de Despertar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada portal é uma porta para uma dimensão do seu ser. 
            Escolha sua experiência e deixe Aruan guiar sua transformação.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className={`bg-white/90 rounded-2xl p-8 shadow-lg border-3 ${portal.borderColor} hover:scale-102 transition-all duration-300 hover:shadow-2xl`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
                data-testid={`portal-card-${portal.id}`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${portal.gradient} rounded-full mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {portal.name}
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  {portal.description}
                </p>

                {/* CTA Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${portal.gradient} hover:opacity-90 text-white py-3 rounded-xl shadow-md`}
                  onClick={() => setActivePortal(portal.id)}
                  data-testid={`button-enter-${portal.id}`}
                >
                  Entrar no Portal
                </Button>
              </div>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>💫 Cada portal oferece uma experiência única de transformação</p>
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
