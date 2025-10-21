import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { BreathRing } from '@/components/BreathRing';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function BreathPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBreathComplete = async () => {
    // Save breath session
    try {
      await fetch('/api/breath/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cycles: 3,
          durationSec: 42, // 3 cycles * 14 seconds each
          videoUsed: null,
          audioUsed: null,
        }),
      });

      // Award points
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          delta: 20,
          activity: 'breath_446_complete',
        }),
      });

      toast({
        title: '🎉 Parabéns!',
        description: 'Você completou 3 ciclos de respiração e ganhou 20 pontos!',
      });
    } catch (error) {
      console.error('Error saving breath session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/purpose">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-blue-900">Respiração Consciente</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Técnica 4-4-6
            </h2>
            <p className="text-gray-600 mb-4">
              Esta técnica de respiração acalma o sistema nervoso, reduz ansiedade 
              e promove clareza mental. Perfeita para momentos de estresse ou antes 
              de decisões importantes.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">4s</div>
                <div className="text-xs text-gray-600">Inspire</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">4s</div>
                <div className="text-xs text-gray-600">Segure</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">6s</div>
                <div className="text-xs text-gray-600">Expire</div>
              </div>
            </div>
          </div>

          {/* Breath Ring Component */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <BreathRing mode="446" onComplete={handleBreathComplete} />
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Benefícios:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Reduz ansiedade e estresse
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Melhora foco e concentração
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Equilibra sistema nervoso
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Promove clareza mental
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
