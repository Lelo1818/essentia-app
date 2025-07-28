import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Heart, Star, Target, Sparkles, User, Clock, Play, Trophy, CheckCircle, Eye, BookOpen, Brain, Compass, Sun, Moon, Flame, Circle, LifeBuoy, MessageSquare, Home, Users, Calendar } from 'lucide-react';

/**
 * ESSENTIA - PROTÓTIPO NAVEGÁVEL SEGUINDO FLUXOGRAMA
 * 
 * Fluxo baseado no documento:
 * I. Onboarding e Primeiros Passos
 * II. Jornada Principal e Interação Diária  
 * III. Visão de Expansão e Aprofundamento
 */

export default function EssentiaFluxo() {
  // Estados do fluxo principal
  const [currentStep, setCurrentStep] = useState('welcome');
  const [currentLifeArea, setCurrentLifeArea] = useState(0);
  const [lifeWheelData, setLifeWheelData] = useState<{[key: string]: number}>({});
  const [triadeValues, setTriadeValues] = useState({ consciencia: 0, energia: 0, coerencia: 0 });
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [showSocorro, setShowSocorro] = useState(false);

  // Dados da Roda da Vida
  const lifeAreas = [
    { id: 'relacionamentos', name: 'Relacionamentos', question: 'Em seus relacionamentos, o que te nutre hoje? Onde há um desejo de conexão mais profunda?' },
    { id: 'carreira', name: 'Carreira', question: 'Como você se sente em relação ao seu trabalho atual? Que sonhos profissionais movem você?' },
    { id: 'saude', name: 'Saúde', question: 'Como está sua conexão com seu corpo? Que práticas de bem-estar fazem sentido para você?' },
    { id: 'crescimento', name: 'Crescimento Pessoal', question: 'Que aspectos de si mesmo você gostaria de desenvolver? Onde sente que está evoluindo?' },
    { id: 'financas', name: 'Finanças', question: 'Como é sua relação com o dinheiro? Que abundância você quer manifestar?' },
    { id: 'lazer', name: 'Lazer', question: 'O que traz alegria genuína para sua vida? Como você se diverte?' },
    { id: 'ambiente', name: 'Ambiente', question: 'Como você se sente nos espaços que habita? Que ambiente ideal você visualiza?' },
    { id: 'contribuicao', name: 'Contribuição Social', question: 'Como você contribui para o mundo? Que legado quer deixar?' }
  ];

  // Portais Essentia
  const portals = [
    { id: 'clareza', name: 'Portal da Clareza', description: 'Jornada para encontrar sua verdade interior', icon: Sun, color: 'blue' },
    { id: 'presenca', name: 'Portal da Presença', description: 'Cultive a consciência do momento presente', icon: Heart, color: 'green' },
    { id: 'coragem', name: 'Portal da Coragem', description: 'Desperte sua força interior', icon: Flame, color: 'red' },
    { id: 'calma', name: 'Portal da Calma', description: 'Encontre paz em meio ao caos', icon: Moon, color: 'indigo' }
  ];

  // IAs disponíveis
  const aiPersonalities = [
    { id: 'sofia', name: 'Sofia', type: 'Mentora Empática', description: 'Calorosa e encorajadora' },
    { id: 'marcos', name: 'Marcos', type: 'Coach de Ação', description: 'Focado em resultados práticos' },
    { id: 'luna', name: 'Luna', type: 'Guia Espiritual', description: 'Conexão interior e sabedoria' },
    { id: 'leo', name: 'Léo', type: 'Estrategista', description: 'Organização e planejamento' }
  ];

  // Funções de navegação
  const nextStep = () => {
    if (currentStep === 'welcome') setCurrentStep('roda-intro');
    else if (currentStep === 'roda-intro') setCurrentStep('roda-vida');
    else if (currentStep === 'roda-vida') {
      if (currentLifeArea < lifeAreas.length - 1) {
        setCurrentLifeArea(currentLifeArea + 1);
      } else {
        setCurrentStep('triade-calibracao');
      }
    }
    else if (currentStep === 'triade-calibracao') setCurrentStep('direcionamento');
    else if (currentStep === 'direcionamento') setCurrentStep('dashboard');
  };

  const handleLifeAreaRating = (rating: number) => {
    const area = lifeAreas[currentLifeArea];
    setLifeWheelData(prev => ({ ...prev, [area.id]: rating }));
    
    // Simula cálculo da tríade baseado nas respostas
    const avgScore = Object.values({ ...lifeWheelData, [area.id]: rating }).reduce((a, b) => a + b, 0) / Object.keys({ ...lifeWheelData, [area.id]: rating }).length;
    setTriadeValues({
      consciencia: Math.round(avgScore * 8 + Math.random() * 20),
      energia: Math.round(avgScore * 7 + Math.random() * 30),
      coerencia: Math.round(avgScore * 9 + Math.random() * 10)
    });
    
    setTimeout(nextStep, 1500);
  };

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white space-y-8 max-w-2xl mx-auto px-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Bem-vindo ao Essentia
          </h1>
          <p className="text-xl text-purple-200">
            Uma jornada de autoconhecimento e transformação pessoal
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg text-purple-100">
            "Olá! Sou Sofia, sua guia nesta jornada. Juntos vamos explorar quem você é, 
            onde está e para onde quer ir. Cada passo será cuidadosamente acompanhado."
          </p>
        </div>

        <Button 
          onClick={nextStep}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full"
        >
          Iniciar Jornada
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderRodaIntro = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-800">A Roda da Vida Reflexiva</h2>
        
        <div className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <Target className="w-12 h-12 text-white" />
          </div>
          
          <p className="text-xl text-gray-600">
            "Vamos começar entendendo o seu momento atual através da Roda da Vida. 
            Esta não é uma simples avaliação, mas uma jornada de reflexão profunda."
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {lifeAreas.map((area, index) => (
              <div key={area.id} className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-700">{area.name}</h4>
              </div>
            ))}
          </div>
          
          <p className="text-gray-600">
            Vamos explorar cada área com cuidado e atenção. Prepare-se para uma reflexão genuína.
          </p>
        </div>

        <Button 
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full"
        >
          Começar Reflexão
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderRodaVida = () => {
    const currentArea = lifeAreas[currentLifeArea];
    const progress = ((currentLifeArea + 1) / lifeAreas.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Área {currentLifeArea + 1} de {lifeAreas.length}: {currentArea.name}
              </h2>
              <Badge variant="outline">{Math.round(progress)}% concluído</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{currentArea.name}</h3>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Reflexão Guiada:</h4>
              <p className="text-gray-700 text-lg italic">"{currentArea.question}"</p>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Registre suas reflexões no diário:
              </label>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Escreva aqui suas reflexões sobre esta área da sua vida..."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 font-medium">
                Com base na sua reflexão, como você avaliaria esta área da sua vida?
              </p>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <Button
                    key={num}
                    onClick={() => handleLifeAreaRating(num)}
                    variant={num <= 5 ? "destructive" : num <= 7 ? "outline" : "default"}
                    className="aspect-square"
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 - Precisa atenção</span>
                <span>10 - Excelente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTriadeCalibracao = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-800">Sua Tríade Interior</h2>
        
        <div className="bg-white rounded-2xl p-8 shadow-xl space-y-8">
          <p className="text-xl text-gray-600">
            "Com base nas suas reflexões na Roda da Vida, aqui está a sua leitura inicial da Tríade - sua bússola interna."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Consciência</h3>
              <div className="text-3xl font-bold text-blue-600">{triadeValues.consciencia}%</div>
              <p className="text-gray-600">Clareza sobre si mesmo e seus propósitos</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Energia</h3>
              <div className="text-3xl font-bold text-green-600">{triadeValues.energia}%</div>
              <p className="text-gray-600">Vitalidade e motivação para agir</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Coerência</h3>
              <div className="text-3xl font-bold text-purple-600">{triadeValues.coerencia}%</div>
              <p className="text-gray-600">Alinhamento entre valores e ações</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={nextStep}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full"
        >
          Continuar Jornada
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDirecionamento = () => {
    const suggestedPortal = triadeValues.consciencia < 50 ? portals[0] : 
                           triadeValues.energia < 50 ? portals[1] : portals[2];

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-800">Direcionamento Personalizado</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl text-gray-600">
                "Olá! Com base na sua jornada pela Roda da Vida e na leitura da sua Tríade, 
                tenho uma sugestão especial para você começar."
              </p>
            </div>

            <Card className="border-2 border-orange-200">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <suggestedPortal.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{suggestedPortal.name}</h3>
                <p className="text-gray-600">{suggestedPortal.description}</p>
                <Button 
                  onClick={() => setSelectedPortal(suggestedPortal.id)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Explorar Portal Sugerido
                </Button>
              </CardContent>
            </Card>

            <div className="flex space-x-4 justify-center">
              <Button 
                onClick={nextStep}
                variant="outline"
                className="px-8 py-4"
              >
                Ir para Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Essentia Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSocorro(true)}
                className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
              >
                <LifeBuoy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Tríade de Medidores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Consciência</h3>
              <div className="text-2xl font-bold text-blue-600">{triadeValues.consciencia}%</div>
              <Progress value={triadeValues.consciencia} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Energia</h3>
              <div className="text-2xl font-bold text-green-600">{triadeValues.energia}%</div>
              <Progress value={triadeValues.energia} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Coerência</h3>
              <div className="text-2xl font-bold text-purple-600">{triadeValues.coerencia}%</div>
              <Progress value={triadeValues.coerencia} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Roda da Vida Visual */}
        <Card>
          <CardHeader>
            <CardTitle>Sua Roda da Vida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lifeAreas.map(area => (
                <div key={area.id} className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">{area.name}</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {lifeWheelData[area.id] || 0}/10
                  </div>
                  <Progress value={(lifeWheelData[area.id] || 0) * 10} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acesso Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold">Diário Pessoal</h3>
              <p className="text-sm text-gray-600 mt-2">Registre suas reflexões</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold">Portais</h3>
              <p className="text-sm text-gray-600 mt-2">Experiências transformadoras</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold">Mentores IA</h3>
              <p className="text-sm text-gray-600 mt-2">Conversas guiadas</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold">Linha do Tempo</h3>
              <p className="text-sm text-gray-600 mt-2">Sua jornada visual</p>
            </CardContent>
          </Card>
        </div>

        {/* Pílulas Diárias de IA */}
        <Card>
          <CardHeader>
            <CardTitle>Mensagem do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Sofia</p>
                  <p className="text-gray-600 mt-1">
                    "Percebo que você está em um momento de reflexão profunda. Que tal dedicar alguns minutos hoje 
                    para explorar o Portal da Clareza? Sua jornada de autoconhecimento está florescendo."
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Botão Socorro */}
      <Dialog open={showSocorro} onOpenChange={setShowSocorro}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Botão Socorro</DialogTitle>
            <DialogDescription>Estamos aqui para te apoiar neste momento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              <Heart className="w-4 h-4 mr-2" />
              Áudio de Ancoragem
            </Button>
            <Button className="w-full" variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Frase de Apoio
            </Button>
            <Button className="w-full" variant="outline">
              <Moon className="w-4 h-4 mr-2" />
              Portal de Calma
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  // Renderização principal baseada no step atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome': return renderWelcome();
      case 'roda-intro': return renderRodaIntro();
      case 'roda-vida': return renderRodaVida();
      case 'triade-calibracao': return renderTriadeCalibracao();
      case 'direcionamento': return renderDirecionamento();
      case 'dashboard': return renderDashboard();
      default: return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Botão de volta apenas no dashboard */}
      {currentStep === 'dashboard' && (
        <div className="fixed top-4 left-4 z-50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/dashboard-unificado'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard Geral
          </Button>
        </div>
      )}
      
      {renderCurrentStep()}
    </div>
  );
}