import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, Star, Target, Sparkles, User, Clock, Play, Trophy, CheckCircle, Eye, BookOpen, Brain } from 'lucide-react';

/**
 * ESSENTIA CLEAN DEMO
 * Versão limpa e funcional para demonstração
 * Código organizado e comentado para facilitar entendimento
 */

export default function EssentiaCleanDemo() {
  // Estado principal da aplicação
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dados do usuário (normalmente viriam de uma API)
  const userData = {
    name: "Lelão",
    clarity: 72,
    daysActive: 89,
    achievements: 12,
    currentStage: "Descoberta de Paixões",
    nextMilestone: "Definir Missão Pessoal",
    progress: 67
  };

  // Configuração das etapas da jornada
  const journeyStages = [
    { id: 1, name: "Despertar Interior", completed: true },
    { id: 2, name: "Autoconhecimento Profundo", completed: true },
    { id: 3, name: "Descoberta de Paixões", completed: false, current: true },
    { id: 4, name: "Relacionamentos Significativos", completed: false },
    { id: 5, name: "Missão e Contribuição", completed: false },
    { id: 6, name: "Vida com Propósito", completed: false }
  ];

  // Configuração dos portais disponíveis
  const portals = [
    {
      id: 'clareza',
      title: 'Portal da Clareza',
      description: 'Conecte-se com sua verdade interior',
      color: 'blue',
      unlocked: true,
      completed: false
    },
    {
      id: 'presenca',
      title: 'Portal da Presença',
      description: 'Cultive a consciência do momento presente',
      color: 'green',
      unlocked: true,
      completed: false
    },
    {
      id: 'coragem',
      title: 'Portal da Coragem',
      description: 'Desperte sua força interior',
      color: 'red',
      unlocked: true,
      completed: false
    }
  ];

  // Mentores IA disponíveis
  const aiMentors = [
    {
      id: 'sofia',
      name: 'Sofia',
      title: 'Mentora Empática',
      description: 'Especialista em crescimento emocional',
      color: 'purple'
    },
    {
      id: 'marcos',
      name: 'Marcos',
      title: 'Coach de Ação',
      description: 'Foco em resultados práticos',
      color: 'blue'
    },
    {
      id: 'luna',
      name: 'Luna',
      title: 'Guia Espiritual',
      description: 'Conexão interior e intuição',
      color: 'indigo'
    }
  ];

  // Função para lidar com cliques nos portais
  const handlePortalClick = (portalId: string) => {
    console.log(`Portal ${portalId} clicado`);
    // Aqui você implementaria a lógica do portal
    alert(`Iniciando experiência do ${portals.find(p => p.id === portalId)?.title}`);
  };

  // Função para conversar com mentores IA
  const handleAIChat = (mentorId: string) => {
    console.log(`Iniciando chat com ${mentorId}`);
    // Aqui você integraria com sua API de IA
    alert(`Iniciando conversa com ${aiMentors.find(m => m.id === mentorId)?.name}`);
  };

  // Função para navegar entre abas
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Navegando para aba: ${tab}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header da aplicação */}
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
                Essentia - Jornada de Propósito
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-600 text-white">
                <Star className="w-4 h-4 mr-1" />
                Clareza: {userData.clarity}%
              </Badge>
              <Badge variant="outline">
                <Target className="w-4 h-4 mr-1" />
                {userData.daysActive} dias
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Seção de Boas-vindas */}
        <div className="text-center space-y-4">
          <h2 className="text-xl text-gray-700">
            Bem-vindo de volta, {userData.name}! 
          </h2>
          <p className="text-gray-600">
            Sua clareza sobre propósito cresceu {userData.clarity}% em {userData.daysActive} dias.
          </p>
        </div>

        {/* Navegação por abas */}
        <div className="flex justify-center space-x-2 bg-white rounded-lg p-2 border">
          {[
            { id: 'overview', label: 'Visão Geral', icon: Star },
            { id: 'journey', label: 'Jornada', icon: Target },
            { id: 'portals', label: 'Portais', icon: Eye },
            { id: 'ai', label: 'Mentores IA', icon: Brain },
            { id: 'journal', label: 'Diário', icon: BookOpen }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => handleTabChange(tab.id)}
                className="flex items-center space-x-2"
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Conteúdo baseado na aba ativa */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{userData.clarity}%</div>
                  <div className="text-sm text-gray-600">Clareza Interior</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{userData.daysActive}</div>
                  <div className="text-sm text-gray-600">Dias de Jornada</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">{userData.achievements}</div>
                  <div className="text-sm text-gray-600">Conquistas</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6">
                  <Target className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-sm font-medium text-gray-700">{userData.nextMilestone}</div>
                </CardContent>
              </Card>
            </div>

            {/* Ações rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => handleTabChange('journey')}>
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">Continuar Jornada</h3>
                  <p className="text-sm text-gray-600">Explore os próximos estágios da sua evolução</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => handleTabChange('portals')}>
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Explorar Portais</h3>
                  <p className="text-sm text-gray-600">Experiências imersivas de crescimento</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => handleTabChange('ai')}>
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                  <h3 className="font-semibold mb-2">Mentores IA</h3>
                  <p className="text-sm text-gray-600">Conversas profundas com guias especializados</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'journey' && (
          <Card>
            <CardHeader>
              <CardTitle>Progresso na Jornada</CardTitle>
              <p className="text-gray-600">Etapa {journeyStages.findIndex(s => s.current) + 1} de {journeyStages.length} • {userData.progress}% concluído</p>
            </CardHeader>
            <CardContent>
              <Progress value={userData.progress} className="mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {journeyStages.map((stage) => (
                  <div 
                    key={stage.id}
                    className={`text-center p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-lg ${
                      stage.completed 
                        ? 'bg-green-50 border-green-200' 
                        : stage.current 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => console.log(`Estágio ${stage.id} clicado`)}
                  >
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      stage.completed 
                        ? 'bg-green-500 text-white' 
                        : stage.current 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {stage.completed ? <CheckCircle className="w-4 h-4" /> : stage.id}
                    </div>
                    <div className="text-xs font-medium text-gray-700">{stage.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'portals' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Portais da Jornada</h2>
              <p className="text-gray-600">Experiências imersivas para diferentes aspectos do crescimento pessoal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portals.map((portal) => (
                <Card 
                  key={portal.id} 
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    portal.unlocked ? 'border-green-200' : 'border-gray-200 opacity-60'
                  }`}
                  onClick={() => portal.unlocked && handlePortalClick(portal.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-${portal.color}-100`}>
                      <Eye className={`w-8 h-8 text-${portal.color}-600`} />
                    </div>
                    <h3 className="font-semibold mb-2">{portal.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{portal.description}</p>
                    
                    {portal.unlocked ? (
                      <Button onClick={() => handlePortalClick(portal.id)}>
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar
                      </Button>
                    ) : (
                      <Badge variant="secondary">Bloqueado</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Mentores IA</h2>
              <p className="text-gray-600">Conversas personalizadas com guias especializados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiMentors.map((mentor) => (
                <Card key={mentor.id} className="cursor-pointer hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-${mentor.color}-100`}>
                      <User className={`w-8 h-8 text-${mentor.color}-600`} />
                    </div>
                    <h3 className="font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-sm font-medium text-gray-700 mb-2">{mentor.title}</p>
                    <p className="text-sm text-gray-600 mb-4">{mentor.description}</p>
                    
                    <Button onClick={() => handleAIChat(mentor.id)} className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Conversar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <Card>
            <CardHeader>
              <CardTitle>Diário de Jornada</CardTitle>
              <p className="text-gray-600">Registre suas reflexões e insights</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea 
                  className="w-full h-32 p-3 border rounded-lg resize-none"
                  placeholder="Como você se sente hoje? Que insights surgiram?"
                />
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Salvar Reflexão
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}