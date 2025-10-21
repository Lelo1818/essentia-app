import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Brain, Heart, Sparkles, Download, User } from "lucide-react";

interface AiSuggestion {
  id: number;
  userId: number;
  suggestionType: string;
  content: string;
  source: string;
  metadata: any;
  createdAt: string;
}

export function SuggestionsHistory() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['/api/suggestions'],
    enabled: isOpen,
  });

  const suggestions: AiSuggestion[] = data?.suggestions || [];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'biometric':
        return <Heart className="w-4 h-4" />;
      case 'sofia':
      case 'marcus':
      case 'luna':
      case 'leo':
        return <User className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'biometric':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'sofia':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'marcus':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'luna':
        return 'bg-pink-100 text-pink-700 border-pink-300';
      case 'leo':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'biometric_insight':
        return '💓 Insight Biométrico';
      case 'therapist_advice':
        return '🧘 Conselho Terapêutico';
      case 'plan_recommendation':
        return '🎯 Recomendação de Plano';
      default:
        return '💡 Sugestão';
    }
  };

  const exportSuggestions = () => {
    const dataStr = JSON.stringify(suggestions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sugestoes-ia-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full"
        data-testid="button-suggestions-history"
      >
        <History className="w-4 h-4 mr-2" />
        Histórico de Sugestões IA
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
              Histórico Completo de Sugestões IA
            </DialogTitle>
            <DialogDescription>
              Todas as sugestões, insights e recomendações geradas pela IA
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-gray-500">Carregando sugestões...</p>
              </div>
            ) : suggestions.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-2">Nenhuma sugestão salva ainda</p>
                  <p className="text-sm text-gray-400">
                    Use os recursos de IA (Análise Biométrica, Terapeutas, etc.) para gerar sugestões
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-700">{suggestions.length}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-red-700">
                        {suggestions.filter(s => s.source === 'biometric').length}
                      </div>
                      <div className="text-sm text-gray-600">Biométrico</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-700">
                        {suggestions.filter(s => ['sofia', 'marcus', 'luna', 'leo'].includes(s.source)).length}
                      </div>
                      <div className="text-sm text-gray-600">Terapeutas</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <Button
                        onClick={exportSuggestions}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Exportar
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Suggestions List */}
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-3">
                    {suggestions.map((suggestion) => (
                      <Card key={suggestion.id} className="border-l-4" style={{ borderLeftColor: suggestion.source === 'biometric' ? '#ef4444' : '#8b5cf6' }}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getSourceColor(suggestion.source)} border`}>
                                {getSourceIcon(suggestion.source)}
                                <span className="ml-1 capitalize">{suggestion.source}</span>
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {getTypeLabel(suggestion.suggestionType)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {new Date(suggestion.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">{suggestion.content}</p>
                          
                          {/* Metadata if available */}
                          {suggestion.metadata && Object.keys(suggestion.metadata).length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-xs text-gray-500 font-semibold mb-1">Contexto:</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                {suggestion.metadata.heartRate && (
                                  <div>
                                    <span className="text-gray-500">BPM:</span>{' '}
                                    <span className="font-medium">{suggestion.metadata.heartRate}</span>
                                  </div>
                                )}
                                {suggestion.metadata.stressLevel !== undefined && (
                                  <div>
                                    <span className="text-gray-500">Estresse:</span>{' '}
                                    <span className="font-medium">{suggestion.metadata.stressLevel}%</span>
                                  </div>
                                )}
                                {suggestion.metadata.energyLevel !== undefined && (
                                  <div>
                                    <span className="text-gray-500">Energia:</span>{' '}
                                    <span className="font-medium">{suggestion.metadata.energyLevel}%</span>
                                  </div>
                                )}
                                {suggestion.metadata.emotionalState && (
                                  <div>
                                    <span className="text-gray-500">Estado:</span>{' '}
                                    <span className="font-medium capitalize">{suggestion.metadata.emotionalState}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
