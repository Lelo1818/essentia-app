import { useState } from 'react';
import { ArrowLeft, TrendingUp, Award, Calendar, Download } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

export default function PointsPage() {
  const { user } = useAuth();
  const [pointsBadge, setPointsBadge] = useState<number | null>(null);

  // Fetch history
  const { data: history, isLoading } = useQuery({
    queryKey: ['/api/history'],
    enabled: true,
  });

  // Fetch progress (points and level)
  const { data: progress } = useQuery({
    queryKey: ['/api/progress'],
    enabled: true,
  });

  const handleExportData = async () => {
    if (!history) return;

    const exportData = {
      user: user?.name || 'Usuário',
      exportedAt: new Date().toISOString(),
      summary: history.summary,
      femeCheckins: history.femeCheckins,
      breathSessions: history.breathSessions,
      events: history.events,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `essentia-dados-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const showPointsBadge = (points: number) => {
    setPointsBadge(points);
    setTimeout(() => setPointsBadge(null), 2000);
  };

  // Real data from backend
  const totalPoints = progress?.points || 0;
  const currentLevel = progress?.level || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/purpose">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-purple-900">Minha Pontuação</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleExportData}
            data-testid="button-export"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Points Badge (floating animation) */}
        {pointsBadge !== null && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-full shadow-2xl text-2xl font-bold">
              +{pointsBadge} pontos!
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total de Pontos</div>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-purple-600">{totalPoints}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Nível Atual</div>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-yellow-600">{currentLevel}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Atividades</div>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {history?.summary.totalEvents || 0}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico Recente</h2>
          
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Carregando...</div>
          ) : !history || history.events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma atividade registrada ainda
            </div>
          ) : (
            <div className="space-y-3">
              {history.events.slice(0, 10).map((event: any, idx: number) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  data-testid={`event-${idx}`}
                >
                  <div>
                    <div className="font-medium text-gray-900">{event.eventName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.createdAt).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  {event.eventProps?.delta && (
                    <div className={`font-bold ${event.eventProps.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {event.eventProps.delta > 0 ? '+' : ''}{event.eventProps.delta}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FEME Summary */}
        {history?.femeCheckins && history.femeCheckins.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check-ins FEME</h2>
            <div className="space-y-3">
              {history.femeCheckins.map((checkin: any, idx: number) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-gray-600">
                      {new Date(checkin.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm font-medium text-purple-600">
                      Coerência: {(checkin.coerencia * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Físico</div>
                      <div className="font-bold text-red-600">{checkin.fisico}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Energético</div>
                      <div className="font-bold text-yellow-600">{checkin.energetico}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Mental</div>
                      <div className="font-bold text-blue-600">{checkin.mental}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Espiritual</div>
                      <div className="font-bold text-purple-600">{checkin.espiritual}/10</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
