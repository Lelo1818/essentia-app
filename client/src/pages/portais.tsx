import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Shield, Mountain, ArrowRight, Zap, Target, Eye, Heart, Play, BookOpen, User, Home, Sparkles, LifeBuoy, Calendar } from "lucide-react";

export default function Portais() {
  // Estados da aplicação
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, questionnaire, journey, portal, diary, gallery, help
  const [selectedPortal, setSelectedPortal] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [assignedAI, setAssignedAI] = useState<any>(null);
  const [completedPortals, setCompletedPortals] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [currentJournalText, setCurrentJournalText] = useState('');
  const [avatarState, setAvatarState] = useState('inicial');
  const [consecutiveDays, setConsecutiveDays] = useState(1);

  // Estados do portal da coragem (mantido)
  const [step, setStep] = useState('initial');
  const [fear, setFear] = useState('');
  const [commitment, setCommitment] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Estados do questionário (movido para fora das condicionais)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tempAnswers, setTempAnswers] = useState<string[]>([]);

  // Dados dos portais
  const portals = [
    {
      id: 'clareza',
      name: 'Portal da Clareza',
      icon: Eye,
      color: 'from-blue-500 to-indigo-600',
      phrase: 'A verdade emerge quando a mente se aquieta',
      practice: 'Feche os olhos por 2 minutos. Faça apenas uma pergunta: "O que realmente importa agora?"',
      unlocked: true
    },
    {
      id: 'presenca',
      name: 'Portal da Presença',
      icon: Heart,
      color: 'from-green-500 to-emerald-600',
      phrase: 'Estar aqui, agora, é o maior presente que você pode se dar',
      practice: 'Respire 5 vezes profundamente. A cada expiração, solte algo que não pertence a este momento.',
      unlocked: true
    },
    {
      id: 'coragem',
      name: 'Portal da Coragem',
      icon: Flame,
      color: 'from-red-500 to-orange-600',
      phrase: 'Sinta o medo. Escolha a coragem. Dê o passo.',
      practice: 'Identifique um pequeno ato de coragem e comprometa-se a realizá-lo hoje.',
      unlocked: true
    }
  ];

  // Dados das IAs
  const ais = [
    { id: 'sofia', name: 'Sofia', focus: 'Calma e Serenidade', phrase: 'Respire. Seu próximo passo pode ser mais leve.' },
    { id: 'marcos', name: 'Marcos', focus: 'Ação e Propósito', phrase: 'A coragem está em você. É hora de agir.' },
    { id: 'luna', name: 'Luna', focus: 'Intuição e Reflexão', phrase: 'Escute sua voz interior. Ela sabe o caminho.' },
    { id: 'leo', name: 'Léo', focus: 'Clareza e Direção', phrase: 'Cada passo claro te aproxima de quem você é.' }
  ];

  // Perguntas do questionário
  const questions = [
    {
      question: 'Como você está se sentindo hoje?',
      options: ['Feliz', 'Ansioso', 'Cansado', 'Motivado', 'Confuso']
    },
    {
      question: 'Prefere foco em ação, calma ou reflexão?',
      options: ['Ação', 'Calma', 'Reflexão']
    },
    {
      question: 'Você busca clareza, coragem ou presença?',
      options: ['Clareza', 'Coragem', 'Presença']
    }
  ];

  // Função para determinar IA baseada nas respostas
  const determineAI = (answers: string[]) => {
    if (answers.includes('Calma') || answers.includes('Ansioso')) return ais[0]; // Sofia
    if (answers.includes('Ação') || answers.includes('Coragem')) return ais[1]; // Marcos
    if (answers.includes('Reflexão') || answers.includes('Confuso')) return ais[2]; // Luna
    return ais[3]; // Léo (padrão)
  };

  // Funções de navegação
  const handleQuestionnaireComplete = () => {
    const ai = determineAI(userAnswers);
    setAssignedAI(ai);
    setCurrentScreen('journey');
  };

  const completePortal = (portalId: string) => {
    if (!completedPortals.includes(portalId)) {
      setCompletedPortals([...completedPortals, portalId]);
      // Muda estado do avatar conforme progresso
      if (completedPortals.length === 0) setAvatarState('primeiro');
      if (completedPortals.length === 1) setAvatarState('segundo');
      if (completedPortals.length === 2) setAvatarState('completo');
    }
    setCurrentScreen('journey');
  };

  const saveJournalEntry = () => {
    if (currentJournalText.trim()) {
      const newEntry = {
        id: Date.now(),
        text: currentJournalText,
        date: new Date().toLocaleDateString('pt-BR')
      };
      setJournalEntries([...journalEntries, newEntry]);
      setCurrentJournalText('');
      setConsecutiveDays(consecutiveDays + 1);
    }
  };

  // Componente de navegação bottom
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-around max-w-md mx-auto">
        <Button
          variant={currentScreen === 'journey' ? 'default' : 'ghost'}
          onClick={() => setCurrentScreen('journey')}
          className="flex flex-col items-center p-2"
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Jornada</span>
        </Button>
        
        <Button
          variant={currentScreen === 'diary' ? 'default' : 'ghost'}
          onClick={() => setCurrentScreen('diary')}
          className="flex flex-col items-center p-2"
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-xs">Diário</span>
        </Button>
        
        <Button
          variant={currentScreen === 'gallery' ? 'default' : 'ghost'}
          onClick={() => setCurrentScreen('gallery')}
          className="flex flex-col items-center p-2"
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-xs">Progresso</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setCurrentScreen('help')}
          className="flex flex-col items-center p-2 text-red-500"
        >
          <LifeBuoy className="w-5 h-5 mb-1" />
          <span className="text-xs">Socorro</span>
        </Button>
      </div>
    </div>
  );

  // Tela de boas-vindas
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center p-6 min-h-screen">
          <Card className="max-w-2xl w-full shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-5xl font-bold text-slate-900 mb-4">
                Essentia
              </CardTitle>
              <p className="text-xl text-slate-600 mb-8">
                Desvende sua essência um símbolo de cada vez
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => setCurrentScreen('questionnaire')}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl w-full"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Começar Minha Jornada
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-xl w-full"
                >
                  <Mountain className="w-5 h-5 mr-2" />
                  Explorar Trilhas Temáticas
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  // Função do questionário (movida para fora das condicionais)
  const handleAnswer = (answer: string) => {
    const newAnswers = [...tempAnswers, answer];
    setTempAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setUserAnswers(newAnswers);
      handleQuestionnaireComplete();
    }
  };

  // Tela do questionário
  if (currentScreen === 'questionnaire') {

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-6">
              <Progress value={(currentQuestion + 1) / questions.length * 100} className="w-full mb-4" />
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                Questão {currentQuestion + 1} de {questions.length}
              </CardTitle>
              <p className="text-xl text-slate-700">
                {questions[currentQuestion].question}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                    size="lg"
                    className="p-4 text-lg font-medium hover:bg-purple-50 hover:border-purple-300 transition-all"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela da jornada principal
  if (currentScreen === 'journey') {
    const getAvatarColor = () => {
      if (avatarState === 'inicial') return 'from-gray-400 to-gray-600';
      if (avatarState === 'primeiro') return 'from-blue-400 to-purple-600';
      if (avatarState === 'segundo') return 'from-purple-400 to-pink-600';
      return 'from-yellow-400 to-orange-600';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 pb-20">
        <div className="p-6">
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 mb-6">
            <CardHeader className="text-center">
              <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-r ${getAvatarColor()} rounded-full flex items-center justify-center`}>
                <User className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Jornada Essentia
              </CardTitle>
              {assignedAI && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <p className="text-sm text-purple-800 font-semibold">Sua IA Guia: {assignedAI.name}</p>
                  <p className="text-purple-700 italic">"{assignedAI.phrase}"</p>
                </div>
              )}
              <Progress value={completedPortals.length / portals.length * 100} className="w-full mt-4" />
              <p className="text-sm text-slate-600 mt-2">
                {completedPortals.length} de {portals.length} portais concluídos
              </p>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {portals.map((portal) => {
              const PortalIcon = portal.icon;
              const isCompleted = completedPortals.includes(portal.id);
              
              return (
                <Card 
                  key={portal.id} 
                  className={`shadow-lg border-0 backdrop-blur-sm transition-all ${
                    isCompleted ? 'bg-green-50/90' : 'bg-white/95 hover:bg-purple-50/90'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                          <PortalIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{portal.name}</h3>
                          {isCompleted && (
                            <Badge className="bg-green-500 text-white mt-1">Concluído ✓</Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setSelectedPortal(portal);
                          setCurrentScreen('portal');
                        }}
                        className={`bg-gradient-to-r ${portal.color} text-white hover:scale-105 transition-all`}
                      >
                        {isCompleted ? 'Revisitar' : 'Entrar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Tela do portal específico
  if (currentScreen === 'portal' && selectedPortal) {
    const PortalIcon = selectedPortal.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-8">
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${selectedPortal.color} rounded-full flex items-center justify-center`}>
                <PortalIcon className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 mb-6">
                {selectedPortal.name}
              </CardTitle>
              <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl mb-6">
                <p className="text-2xl font-semibold text-purple-800 italic">
                  "{selectedPortal.phrase}"
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <h3 className="text-xl font-bold text-orange-800 mb-4">Mini-Prática:</h3>
                <p className="text-orange-700 text-lg leading-relaxed">
                  {selectedPortal.practice}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-blue-800 text-center">
                  🎵 <em>Som ambiente tocando...</em> (placeholder de áudio)
                </p>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={() => completePortal(selectedPortal.id)}
                  size="lg"
                  className={`bg-gradient-to-r ${selectedPortal.color} text-white px-8 py-4 text-lg font-bold rounded-xl`}
                >
                  Concluir Portal
                </Button>
                
                <Button
                  onClick={() => setCurrentScreen('journey')}
                  variant="outline"
                >
                  Voltar à Jornada
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

  // Tela do diário
  if (currentScreen === 'diary') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
        <div className="p-6">
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 mb-6">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle className="text-2xl font-bold text-slate-900">
                Diário Essentia
              </CardTitle>
              {assignedAI && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <p className="text-sm text-purple-800 font-semibold">{assignedAI.name}:</p>
                  <p className="text-purple-700 italic">"{assignedAI.phrase}"</p>
                </div>
              )}
              <div className="mt-4 p-3 bg-green-50 rounded-xl">
                <p className="text-green-800 font-semibold">
                  🌱 {consecutiveDays} dias consecutivos de escrita
                </p>
              </div>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95 mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <label className="text-lg font-semibold text-slate-800 block">
                  Como foi seu dia? O que você descobriu sobre si?
                </label>
                <Textarea
                  placeholder="Escreva seus pensamentos, descobertas, reflexões... Esse é seu espaço sagrado."
                  value={currentJournalText}
                  onChange={(e) => setCurrentJournalText(e.target.value)}
                  className="min-h-[200px] text-lg p-4 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                />
                
                <Button
                  onClick={saveJournalEntry}
                  disabled={!currentJournalText.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white w-full"
                >
                  💫 Salvar Reflexão
                </Button>
              </div>
            </CardContent>
          </Card>

          {journalEntries.length > 0 && (
            <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Suas Últimas Reflexões
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {journalEntries.slice(-3).reverse().map((entry) => (
                  <div key={entry.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <p className="text-sm text-purple-600 font-semibold mb-2">{entry.date}</p>
                    <p className="text-slate-700">{entry.text.slice(0, 150)}...</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // Tela de progresso/galeria
  if (currentScreen === 'gallery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pb-20">
        <div className="p-6">
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 mb-6">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <CardTitle className="text-2xl font-bold text-slate-900">
                Sua Linha do Tempo
              </CardTitle>
              
              <div className={`w-20 h-20 mx-auto mt-4 bg-gradient-to-r ${
                avatarState === 'inicial' ? 'from-gray-400 to-gray-600' :
                avatarState === 'primeiro' ? 'from-blue-400 to-purple-600' :
                avatarState === 'segundo' ? 'from-purple-400 to-pink-600' :
                'from-yellow-400 to-orange-600'
              } rounded-full flex items-center justify-center`}>
                <User className="w-10 h-10 text-white" />
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold text-slate-800">
                  Você concluiu {completedPortals.length} de {portals.length} portais
                </p>
                <p className="text-md text-slate-600">
                  Já explorou sua essência por {consecutiveDays} dias consecutivos
                </p>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Portais Concluídos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {portals.map((portal) => {
                  const PortalIcon = portal.icon;
                  const isCompleted = completedPortals.includes(portal.id);
                  
                  return (
                    <div key={portal.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-purple-50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                          <PortalIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900">{portal.name}</span>
                      </div>
                      
                      {isCompleted ? (
                        <Badge className="bg-green-500 text-white">
                          ✓ Concluído
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-500">
                          Pendente
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/95">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Sua Evolução
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <h4 className="font-semibold text-indigo-800 mb-2">Estado do Avatar</h4>
                  <p className="text-indigo-700">
                    {avatarState === 'inicial' && 'Iniciante - Começando a jornada'}
                    {avatarState === 'primeiro' && 'Explorador - Primeiro portal concluído'}
                    {avatarState === 'segundo' && 'Conhecedor - Dois portais concluídos'}
                    {avatarState === 'completo' && 'Mestre da Essência - Todos os portais concluídos'}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <h4 className="font-semibold text-green-800 mb-2">Jornada no Diário</h4>
                  <p className="text-green-700">
                    {journalEntries.length} reflexões escritas
                  </p>
                  <p className="text-green-700">
                    {consecutiveDays} dias consecutivos de autoconhecimento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Tela de socorro
  if (currentScreen === 'help') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-slate-900 mb-6">
                Socorro Simbólico
              </CardTitle>
              <p className="text-lg text-slate-600 mb-8">
                Você não está sozinho. Respire e permita-se sentir esse apoio.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                  Mensagem da Sofia
                </h3>
                <p className="text-xl text-indigo-700 italic mb-6">
                  "Respire fundo. Este momento difícil também vai passar. Você tem força interior mais do que imagina. Permita-se ser humano, sentir o que precisa sentir, e lembre-se: cada respiração é um novo começo."
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl text-center">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  🎵 Som Calmante Tocando...
                </h4>
                <p className="text-green-700">
                  (Som ambiente de floresta com água corrente - placeholder)
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <h4 className="font-semibold text-yellow-800 mb-2">💛 Lembre-se:</h4>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Você é mais resiliente do que pensa</li>
                    <li>• Este momento é temporário</li>
                    <li>• Pedir ajuda é um ato de coragem</li>
                    <li>• Sua presença no mundo importa</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-2">🌸 Prática Emergencial:</h4>
                  <p className="text-purple-700">
                    Respire profundamente 4 vezes. A cada expiração, solte uma tensão. Coloque a mão no coração e sinta sua força vital pulsando.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={() => setCurrentScreen('journey')}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  ✨ Voltar à Jornada
                </Button>
                
                <p className="text-sm text-slate-500">
                  Se precisar de ajuda profissional, procure sempre um especialista.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}