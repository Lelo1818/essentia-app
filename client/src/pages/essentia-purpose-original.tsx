import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, Star, Target, Sparkles, User, Clock, Play, Trophy, CheckCircle } from 'lucide-react';

export default function EssentiaPurposeOriginal() {
  const [activeView, setActiveView] = useState('main');

  const user = {
    name: "Lelão",
    clarity: 72,
    daysActive: 89,
    achievements: 12,
    currentStage: "Descoberta de Paixões",
    nextMilestone: "Definir Missão Pessoal"
  };

  const weeklyInsights = [
    {
      title: "Clareza sobre Valores",
      description: "Identificou autenticidade e impacto como valores centrais",
      level: "Alto",
      timeAgo: "2 dias atrás"
    },
    {
      title: "Resistência à Vulnerabilidade", 
      description: "Dificuldade em compartilhar sonhos com pessoas próximas",
      level: "Médio",
      timeAgo: "5 dias atrás"
    },
    {
      title: "Conexão Propósito-Trabalho",
      description: "Vislumbrou como unir tecnologia e educação", 
      level: "Alto",
      timeAgo: "1 semana atrás"
    }
  ];

  const quickActions = [
    {
      title: "Ritual Matinal de Conexão",
      description: "5 minutos de respiração consciente",
      duration: "5 min",
      points: "+10 pontos",
      priority: "Urgente"
    },
    {
      title: "Reflexão Guiada", 
      description: "Pergunta do dia sobre exploração profunda",
      duration: "10 min",
      points: "+20 pontos",
      priority: "Normal"
    },
    {
      title: "Capturar Insight",
      description: "Registre uma descoberta pessoal",
      duration: "3 min", 
      points: "+15 pontos",
      priority: "Normal"
    },
    {
      title: "Exercício da Linha da Vida",
      description: "Mapeie momentos transformadores",
      duration: "20 min",
      points: "+40 pontos", 
      priority: "Normal"
    }
  ];

  const journeyStages = [
    { id: 1, name: "Despertar Interior", completed: true },
    { id: 2, name: "Autoconhecimento Profundo", completed: true },
    { id: 3, name: "Descoberta de Paixões", completed: false, current: true },
    { id: 4, name: "Relacionamentos Significativos", completed: false },
    { id: 5, name: "Missão e Contribuição", completed: false },
    { id: 6, name: "Vida com Propósito", completed: false }
  ];

  const mentors = [
    {
      id: 'sofia',
      name: 'Sofia',
      title: 'Mentora Empática',
      description: 'Calorosa e encorajadora, foca no crescimento emocional',
      message: 'Oi Lelão, como está sendo seu dia? Percebo que você andou explorando novas ideias.',
      insight: 'Sua dedicação aos rituais diários está criando uma base sólida.'
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-800">Jornada de Propósito</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-xl text-gray-700">
            Bem-vindo de volta, {user.name}. Sua clareza sobre propósito cresceu {user.clarity}% em {user.daysActive} dias.
          </h2>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-purple-600 mb-1">{user.currentStage}</div>
              <div className="text-lg font-semibold text-purple-700 mb-2">{user.clarity}%</div>
              <div className="text-sm text-gray-600">Clareza de Propósito</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-blue-600 mb-1">{user.daysActive}</div>
              <div className="text-sm text-gray-600">Dias na Jornada</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-green-600 mb-1">{user.achievements}</div>
              <div className="text-sm text-gray-600">Conquistas</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-0">
              <Target className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-sm font-medium text-gray-700">{user.nextMilestone}</div>
            </CardContent>
          </Card>
        </div>

        {/* Journey Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Progresso na Jornada</span>
              <Badge variant="outline">Etapa 3 de 6 • 67% concluído</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={67} className="mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {journeyStages.map((stage) => (
                <div 
                  key={stage.id}
                  className={`text-center p-3 rounded-lg border-2 ${
                    stage.completed 
                      ? 'bg-green-50 border-green-200' 
                      : stage.current 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                  }`}
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

        {/* Weekly Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights da Semana</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyInsights.map((insight, index) => (
              <div key={index} className="border-l-4 border-purple-400 pl-4 py-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={insight.level === 'Alto' ? 'default' : 'secondary'}>
                      {insight.level}
                    </Badge>
                    <span className="text-xs text-gray-500">{insight.timeAgo}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Suas Próximas Ações</CardTitle>
            <p className="text-gray-600">Atividades personalizadas para seu momento atual</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{action.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {action.duration}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {action.points}
                    </span>
                    {action.priority === 'Urgente' && (
                      <Badge variant="destructive" className="text-xs">Urgente</Badge>
                    )}
                  </div>
                </div>
                <Button size="sm" className="ml-4">
                  <Play className="w-4 h-4 mr-1" />
                  Iniciar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Mentor */}
        <Card>
          <CardHeader>
            <CardTitle>Sofia - Mentora Empática</CardTitle>
            <p className="text-gray-600">Calorosa e encorajadora, foca no crescimento emocional</p>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 mb-2">{mentors[0].message}</p>
              <div className="flex items-start space-x-2 mt-3">
                <Sparkles className="w-4 h-4 text-yellow-500 mt-1" />
                <p className="text-sm text-gray-600 italic">{mentors[0].insight}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">Conversar</Button>
              <Button variant="outline" size="sm">Insight</Button>
              <Button variant="outline" size="sm">Ações Rápidas</Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-8">
          {[
            { label: 'Jornada', icon: Target },
            { label: 'Transição', icon: Sparkles },
            { label: 'Avatar 3D', icon: User },
            { label: 'Respiração', icon: Heart },
            { label: 'Rituais', icon: Star },
            { label: 'Roda', icon: Target },
            { label: 'Inspiração', icon: Sparkles },
            { label: 'Comunidade', icon: User }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button 
                key={index}
                variant="outline" 
                className="h-16 flex-col space-y-1"
                onClick={() => setActiveView(item.label.toLowerCase())}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}