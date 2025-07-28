import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Heart, Star, Target, Sparkles, User, Clock, Play, Trophy, CheckCircle, Eye, BookOpen, Brain, Compass, Sun, Moon, Flame } from 'lucide-react';

/**
 * ESSENTIA - VERSÃO FINAL LIMPA
 * 
 * Sistema completo de desenvolvimento pessoal com:
 * - Dashboard de progresso
 * - Portais temáticos funcionais
 * - Sistema de IA integrado
 * - Jornada de autoconhecimento
 * - Interface clean e responsiva
 */

export default function EssentiaFinalClean() {
  // Estados principais
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{sender: string, message: string}>>([]);
  const [userMessage, setUserMessage] = useState('');

  // Dados do usuário
  const userData = {
    name: "Lelão",
    clarity: 72,
    daysActive: 89,
    achievements: 12,
    currentStage: "Descoberta de Paixões",
    progress: 67,
    streak: 7
  };

  // Configuração dos Portais
  const portals = [
    {
      id: 'clareza',
      title: 'Portal da Clareza',
      description: 'Conecte-se com sua verdade interior através de práticas de reflexão profunda',
      icon: Sun,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-600',
      practices: [
        'Meditação da Clareza',
        'Diário de Insights',
        'Reflexão Guiada',
        'Visualização de Propósito'
      ]
    },
    {
      id: 'presenca',
      title: 'Portal da Presença',
      description: 'Cultive a consciência plena do momento presente',
      icon: Heart,
      color: 'green',
      gradient: 'from-green-400 to-green-600',
      practices: [
        'Respiração Consciente',
        'Mindfulness Ativo',
        'Ancoragem no Presente',
        'Observação Sem Julgamento'
      ]
    },
    {
      id: 'coragem',
      title: 'Portal da Coragem',
      description: 'Desperte sua força interior e ouse viver autenticamente',
      icon: Flame,
      color: 'red',
      gradient: 'from-red-400 to-red-600',
      practices: [
        'Ritual da Coragem',
        'Quebra de Limitações',
        'Ação Corajosa',
        'Expansão da Zona de Conforto'
      ]
    }
  ];

  // Mentores IA
  const mentors = [
    {
      id: 'sofia',
      name: 'Sofia',
      title: 'Mentora Empática',
      description: 'Especialista em crescimento emocional e autoconhecimento',
      color: 'purple',
      personality: 'Calorosa, compreensiva e profundamente intuitiva'
    },
    {
      id: 'marcos',
      name: 'Marcos',
      title: 'Coach de Ação',
      description: 'Focado em resultados práticos e transformação real',
      color: 'blue',
      personality: 'Direto, motivador e orientado para resultados'
    },
    {
      id: 'luna',
      name: 'Luna',
      title: 'Guia Espiritual',
      description: 'Especialista em conexão interior e sabedoria ancestral',
      color: 'indigo',
      personality: 'Serena, sábia e conectada com o transcendente'
    }
  ];

  // Função para iniciar portal
  const startPortal = (portalId: string) => {
    const portal = portals.find(p => p.id === portalId);
    if (portal) {
      setSelectedPortal(portalId);
      console.log(`Iniciando ${portal.title}`);
    }
  };

  // Função para chat com IA
  const startChat = (mentorId: string) => {
    const mentor = mentors.find(m => m.id === mentorId);
    if (mentor) {
      setSelectedMentor(mentorId);
      setChatMessages([{
        sender: mentor.name,
        message: `Olá! Sou ${mentor.name}. Como posso te apoiar na sua jornada hoje?`
      }]);
    }
  };

  // Função para enviar mensagem
  const sendMessage = async () => {
    if (!userMessage.trim() || !selectedMentor) return;

    const mentor = mentors.find(m => m.id === selectedMentor);
    if (!mentor) return;

    // Adiciona mensagem do usuário
    const newMessages = [...chatMessages, {
      sender: 'Você',
      message: userMessage
    }];

    setChatMessages(newMessages);
    setUserMessage('');

    // Simula resposta da IA (aqui você integraria com a API real)
    setTimeout(() => {
      const responses = {
        sofia: [
          "Que interessante! Como isso faz você se sentir?",
          "Percebo uma força em suas palavras. Continue explorando...",
          "Sua jornada é única. O que seu coração está te dizendo?"
        ],
        marcos: [
          "Excelente! Agora vamos focar na ação. Qual é o próximo passo?",
          "Ótima reflexão! Como podemos transformar isso em resultado?",
          "Vejo potencial aqui. Que tal definirmos uma meta clara?"
        ],
        luna: [
          "Sinto uma energia especial em suas palavras...",
          "O universo está te guiando. Você está ouvindo os sinais?",
          "Sua alma está despertando. Continue confiando no processo."
        ]
      };

      const mentorResponses = responses[selectedMentor as keyof typeof responses] || [];
      const randomResponse = mentorResponses[Math.floor(Math.random() * mentorResponses.length)];

      setChatMessages(prev => [...prev, {
        sender: mentor.name,
        message: randomResponse
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/dashboard-unificado'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Essentia
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-600 text-white">
                <Star className="w-4 h-4 mr-1" />
                {userData.clarity}% Clareza
              </Badge>
              <Badge variant="outline">
                <Flame className="w-4 h-4 mr-1" />
                {userData.streak} dias
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Navegação Principal */}
        <div className="flex justify-center space-x-2 bg-white rounded-lg p-2 border shadow-sm">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Target },
            { id: 'portals', label: 'Portais', icon: Eye },
            { id: 'mentors', label: 'Mentores IA', icon: Brain },
            { id: 'journey', label: 'Jornada', icon: Compass }
          ].map((section) => {
            const IconComponent = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center space-x-2"
              >
                <IconComponent className="w-4 h-4" />
                <span>{section.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Seção Dashboard */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            {/* Boas-vindas */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Bem-vindo de volta, {userData.name}!
              </h2>
              <p className="text-xl text-gray-600">
                Sua clareza interior cresceu {userData.clarity}% em {userData.daysActive} dias de jornada.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{userData.clarity}%</div>
                  <div className="text-sm text-gray-600">Clareza Interior</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{userData.daysActive}</div>
                  <div className="text-sm text-gray-600">Dias de Jornada</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">{userData.achievements}</div>
                  <div className="text-sm text-gray-600">Conquistas</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{userData.streak}</div>
                  <div className="text-sm text-gray-600">Dias Seguidos</div>
                </CardContent>
              </Card>
            </div>

            {/* Ações Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" 
                onClick={() => setActiveSection('portals')}
              >
                <CardContent className="p-6 text-center">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-2">Explorar Portais</h3>
                  <p className="text-gray-600">Experiências transformadoras de crescimento</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" 
                onClick={() => setActiveSection('mentors')}
              >
                <CardContent className="p-6 text-center">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">Mentores IA</h3>
                  <p className="text-gray-600">Conversas profundas com guias especializados</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" 
                onClick={() => setActiveSection('journey')}
              >
                <CardContent className="p-6 text-center">
                  <Compass className="w-16 h-16 mx-auto mb-4 text-teal-600" />
                  <h3 className="text-xl font-semibold mb-2">Continuar Jornada</h3>
                  <p className="text-gray-600">Avance nos estágios de evolução</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Seção Portais */}
        {activeSection === 'portals' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Portais da Jornada</h2>
              <p className="text-xl text-gray-600">Experiências imersivas para diferentes aspectos do crescimento pessoal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portals.map((portal) => {
                const IconComponent = portal.icon;
                return (
                  <Card 
                    key={portal.id} 
                    className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2"
                    onClick={() => startPortal(portal.id)}
                  >
                    <CardContent className="p-6">
                      <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${portal.gradient}`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-3">{portal.title}</h3>
                      <p className="text-gray-600 text-center mb-6">{portal.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-700">Práticas incluídas:</h4>
                        {portal.practices.map((practice, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {practice}
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-6" onClick={() => startPortal(portal.id)}>
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar Experiência
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Seção Mentores IA */}
        {activeSection === 'mentors' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Mentores IA</h2>
              <p className="text-xl text-gray-600">Conversas personalizadas com guias especializados em diferentes aspectos do crescimento</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mentors.map((mentor) => (
                <Card 
                  key={mentor.id} 
                  className="cursor-pointer hover:shadow-xl transition-all hover:scale-105"
                  onClick={() => startChat(mentor.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-${mentor.color}-100`}>
                      <User className={`w-10 h-10 text-${mentor.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
                    <p className={`text-sm font-medium text-${mentor.color}-600 mb-3`}>{mentor.title}</p>
                    <p className="text-gray-600 text-sm mb-4">{mentor.description}</p>
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-600 italic">"{mentor.personality}"</p>
                    </div>
                    
                    <Button className="w-full" onClick={() => startChat(mentor.id)}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Conversar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Seção Jornada */}
        {activeSection === 'journey' && (
          <Card>
            <CardHeader>
              <CardTitle>Progresso na Jornada de Autoconhecimento</CardTitle>
              <p className="text-gray-600">Etapa atual: {userData.currentStage} • {userData.progress}% concluído</p>
            </CardHeader>
            <CardContent>
              <Progress value={userData.progress} className="mb-6" />
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Você está fazendo um progresso incrível! Continue explorando os portais e conversando com os mentores para acelerar sua evolução.
                </p>
                <Button onClick={() => setActiveSection('portals')}>
                  <Target className="w-4 h-4 mr-2" />
                  Continuar Jornada
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal do Portal */}
      <Dialog open={!!selectedPortal} onOpenChange={() => setSelectedPortal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPortal && portals.find(p => p.id === selectedPortal)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Bem-vindo ao portal! Esta experiência foi projetada para te guiar em uma jornada profunda de autoconhecimento.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">O que você experimentará:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Práticas guiadas de reflexão</li>
                <li>• Exercícios de consciência</li>
                <li>• Momentos de introspecção profunda</li>
                <li>• Insights personalizados</li>
              </ul>
            </div>
            <div className="flex space-x-3">
              <Button className="flex-1">Iniciar Agora</Button>
              <Button variant="outline" onClick={() => setSelectedPortal(null)}>
                Voltar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal do Chat IA */}
      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              Conversa com {selectedMentor && mentors.find(m => m.id === selectedMentor)?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Área de mensagens */}
            <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'Você' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-lg p-3 ${
                    msg.sender === 'Você' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border shadow-sm'
                  }`}>
                    <p className="text-sm font-medium mb-1">{msg.sender}</p>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input de mensagem */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={sendMessage}>Enviar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}