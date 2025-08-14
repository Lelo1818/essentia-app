import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Brain, Target, Calendar, Clock, FileText, 
  Upload, Camera, Youtube, Play, Pause, RotateCcw,
  CheckCircle, Star, Trophy, Zap, TrendingUp,
  User, Settings, LogOut, Home, GraduationCap,
  ChevronRight, Plus, Eye, EyeOff, AlertCircle,
  RefreshCw, Shuffle, Heart, Timer, Lightbulb,
  Volume2, ArrowRight, X, Send, BarChart3,
  Briefcase, Users, Wrench, Coffee, DollarSign,
  Rocket, Building, Palette, Code, Music
} from 'lucide-react';
import { Link } from 'wouter';

// Categorias de aprendizado expandidas
interface LearningCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
  targetAudience: string;
}

// Persona de usuário
interface UserPersona {
  id: string;
  name: string;
  description: string;
  interests: string[];
  preferredFormat: 'video' | 'text' | 'hands-on' | 'mixed';
  availableTime: number; // minutos por dia
  goals: string[];
}

const EduVibeUniversal = () => {
  // Estados principais
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, avatar?: string, persona?: UserPersona} | null>(null);
  const [activeTab, setActiveTab] = useState('categories');
  const [showInitialSetup, setShowInitialSetup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<LearningCategory | null>(null);
  const [showPersonaSetup, setShowPersonaSetup] = useState(false);

  // Categorias expandidas de aprendizado
  const learningCategories: LearningCategory[] = [
    {
      id: 'professional',
      name: 'Desenvolvimento Profissional',
      description: 'Habilidades para avançar na carreira',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'blue',
      examples: ['Liderança', 'Negociação', 'Gestão de Projetos', 'Comunicação Corporativa', 'Excel Avançado'],
      targetAudience: 'Profissionais que querem crescer na carreira'
    },
    {
      id: 'entrepreneurship',
      name: 'Empreendedorismo & Negócios',
      description: 'Aprenda a criar e gerir negócios',
      icon: <Rocket className="w-6 h-6" />,
      color: 'green',
      examples: ['Como abrir empresa', 'Marketing Digital', 'Vendas', 'Finanças empresariais', 'Pitch para investidores'],
      targetAudience: 'Futuros empreendedores e donos de negócio'
    },
    {
      id: 'technology',
      name: 'Tecnologia & Digital',
      description: 'Domine ferramentas e habilidades digitais',
      icon: <Code className="w-6 h-6" />,
      color: 'purple',
      examples: ['Programação', 'IA para iniciantes', 'Automação', 'Photoshop', 'Criação de sites'],
      targetAudience: 'Pessoas que querem se digitalizar'
    },
    {
      id: 'personal',
      name: 'Desenvolvimento Pessoal',
      description: 'Cresça como pessoa e melhore sua vida',
      icon: <Heart className="w-6 h-6" />,
      color: 'pink',
      examples: ['Inteligência emocional', 'Produtividade', 'Relacionamentos', 'Autoconfiança', 'Mindfulness'],
      targetAudience: 'Quem quer melhorar a qualidade de vida'
    },
    {
      id: 'creative',
      name: 'Habilidades Criativas',
      description: 'Expresse sua criatividade e desenvolva talentos',
      icon: <Palette className="w-6 h-6" />,
      color: 'orange',
      examples: ['Fotografia', 'Design', 'Música', 'Escrita criativa', 'Culinária'],
      targetAudience: 'Pessoas criativas e artistas'
    },
    {
      id: 'financial',
      name: 'Educação Financeira',
      description: 'Organize suas finanças e invista melhor',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'emerald',
      examples: ['Controle financeiro', 'Investimentos', 'Aposentadoria', 'Renda passiva', 'Empreendedorismo'],
      targetAudience: 'Quem quer organizar a vida financeira'
    },
    {
      id: 'health',
      name: 'Saúde & Bem-estar',
      description: 'Cuide melhor da sua saúde física e mental',
      icon: <Heart className="w-6 h-6" />,
      color: 'teal',
      examples: ['Nutrição', 'Exercícios em casa', 'Meditação', 'Sono de qualidade', 'Gestão do estresse'],
      targetAudience: 'Pessoas preocupadas com saúde e qualidade de vida'
    },
    {
      id: 'languages',
      name: 'Idiomas & Comunicação',
      description: 'Aprenda novos idiomas e se comunique melhor',
      icon: <Users className="w-6 h-6" />,
      color: 'indigo',
      examples: ['Inglês para negócios', 'Espanhol', 'Oratória', 'Libras', 'Comunicação não-violenta'],
      targetAudience: 'Quem quer se comunicar melhor'
    }
  ];

  // Personas de usuário
  const userPersonas: UserPersona[] = [
    {
      id: 'working_professional',
      name: 'Profissional Ocupado',
      description: 'Trabalha 8h/dia, quer crescer na carreira',
      interests: ['professional', 'financial', 'personal'],
      preferredFormat: 'mixed',
      availableTime: 30,
      goals: ['Promoção no trabalho', 'Aumentar salário', 'Melhorar produtividade']
    },
    {
      id: 'entrepreneur',
      name: 'Futuro Empreendedor',
      description: 'Quer abrir um negócio próprio',
      interests: ['entrepreneurship', 'financial', 'technology'],
      preferredFormat: 'video',
      availableTime: 60,
      goals: ['Abrir empresa', 'Conseguir investimento', 'Dominar marketing digital']
    },
    {
      id: 'creative',
      name: 'Pessoa Criativa',
      description: 'Artista, designer ou criativo',
      interests: ['creative', 'technology', 'personal'],
      preferredFormat: 'hands-on',
      availableTime: 90,
      goals: ['Monetizar arte', 'Melhorar técnicas', 'Construir portfólio']
    },
    {
      id: 'retiree',
      name: 'Aposentado Ativo',
      description: 'Quer aprender coisas novas na aposentadoria',
      interests: ['personal', 'health', 'creative'],
      preferredFormat: 'text',
      availableTime: 120,
      goals: ['Hobby produtivo', 'Saúde mental', 'Conexões sociais']
    },
    {
      id: 'parent',
      name: 'Pai/Mãe de Família',
      description: 'Quer crescer profissionalmente sem perder tempo com família',
      interests: ['professional', 'financial', 'health'],
      preferredFormat: 'mixed',
      availableTime: 20,
      goals: ['Renda extra', 'Organização doméstica', 'Cuidar da saúde']
    }
  ];

  // Simulação de login
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setShowInitialSetup(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Componente de Seleção de Persona
  const PersonaSetupModal = () => (
    <Dialog open={showPersonaSetup} onOpenChange={() => setShowPersonaSetup(false)}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-800">
            🎯 Qual é o seu perfil?
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Vamos personalizar sua experiência de aprendizado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userPersonas.map((persona) => (
            <Card 
              key={persona.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300"
              onClick={() => {
                setUser(prev => prev ? {...prev, persona} : null);
                setShowPersonaSetup(false);
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg text-blue-700">{persona.name}</CardTitle>
                <CardDescription>{persona.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Tempo disponível:</strong> {persona.availableTime} min/dia
                  </div>
                  <div className="text-sm">
                    <strong>Formato preferido:</strong> {
                      persona.preferredFormat === 'video' ? '📹 Vídeos' :
                      persona.preferredFormat === 'text' ? '📖 Textos' :
                      persona.preferredFormat === 'hands-on' ? '🛠️ Prático' : '🔄 Misto'
                    }
                  </div>
                  <div className="text-sm">
                    <strong>Objetivos:</strong>
                    <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                      {persona.goals.slice(0, 2).map((goal, idx) => (
                        <li key={idx}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Componente de Categorias Expandidas
  const CategoriesComponent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🌟 O que você quer aprender hoje?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Escolha sua área de interesse. Nosso sistema adapta o conteúdo para seu perfil e rotina.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {learningCategories.map((category) => (
          <Card 
            key={category.id} 
            className={`hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-${category.color}-400 hover:scale-105`}
            onClick={() => {
              setSelectedCategory(category);
              setActiveTab('personalized');
            }}
          >
            <CardHeader>
              <div className={`w-12 h-12 bg-${category.color}-100 rounded-full flex items-center justify-center mb-3`}>
                <div className={`text-${category.color}-600`}>
                  {category.icon}
                </div>
              </div>
              <CardTitle className={`text-${category.color}-800 text-lg`}>
                {category.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-xs text-gray-600">
                  <strong>Para quem:</strong> {category.targetAudience}
                </div>
                <div className="text-xs">
                  <strong>Exemplos:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {category.examples.slice(0, 3).map((example, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                    {category.examples.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.examples.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className={`w-full bg-${category.color}-600 hover:bg-${category.color}-700`}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Começar Agora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-orange-800 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            💡 Não encontrou o que procura?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700 mb-4">
            Nosso sistema aprende com você! Digite qualquer assunto que quer aprender 
            e criamos um plano personalizado.
          </p>
          <div className="flex gap-3">
            <Input 
              placeholder="Ex: Como fazer pão caseiro, Como conseguir clientes, Yoga para iniciantes..."
              className="flex-1"
            />
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Brain className="w-4 h-4 mr-2" />
              Criar Plano
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente de Conteúdo Personalizado
  const PersonalizedComponent = () => (
    selectedCategory && (
      <div className="space-y-6">
        <div className="text-center">
          <div className={`inline-flex items-center gap-3 bg-${selectedCategory.color}-50 px-6 py-3 rounded-full border border-${selectedCategory.color}-200 mb-4`}>
            <div className={`text-${selectedCategory.color}-600`}>
              {selectedCategory.icon}
            </div>
            <span className={`text-xl font-semibold text-${selectedCategory.color}-700`}>
              {selectedCategory.name}
            </span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conteúdo personalizado para {user?.persona?.name || 'seu perfil'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Trilha Recomendada */}
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Trilha Recomendada para Você
              </CardTitle>
              <CardDescription>
                Baseado no seu perfil: {user?.persona?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCategory.examples.slice(0, 4).map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{idx + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{topic}</p>
                        <p className="text-xs text-gray-500">
                          {user?.persona?.availableTime && user.persona.availableTime < 40 ? 
                            'Versão Express (15 min)' : 'Versão Completa (45 min)'}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progresso da trilha</span>
                  <span className="text-sm font-medium text-blue-700">1/4 módulos</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Continuar Aprendizado
              </Button>
            </CardFooter>
          </Card>

          {/* Sessão Rápida */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Sessão Rápida
              </CardTitle>
              <CardDescription>
                Perfeito para sua agenda corrida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">
                    {user?.persona?.availableTime || 30} min
                  </p>
                  <p className="text-sm text-gray-600">Tempo disponível hoje</p>
                </div>
                <div className="text-sm text-green-700 font-medium">
                  "5 Dicas de {selectedCategory.examples[0]} que Funcionam"
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Timer className="w-4 h-4 mr-2" />
                Iniciar Agora
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Formatos de Conteúdo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Shuffle className="w-5 h-5" />
              Escolha Como Quer Aprender
            </CardTitle>
            <CardDescription>
              Adaptado para {user?.persona?.preferredFormat === 'video' ? 'quem prefere vídeos' :
              user?.persona?.preferredFormat === 'text' ? 'quem prefere leitura' :
              user?.persona?.preferredFormat === 'hands-on' ? 'quem aprende fazendo' : 'múltiplos formatos'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-4">
                  <Youtube className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Vídeos</p>
                  <p className="text-xs text-gray-500">Visuais e práticos</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-4">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Artigos</p>
                  <p className="text-xs text-gray-500">Leitura focada</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-4">
                  <Wrench className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Prático</p>
                  <p className="text-xs text-gray-500">Mão na massa</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-4">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Mentoria</p>
                  <p className="text-xs text-gray-500">1:1 com expert</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Aplicação Prática */}
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Aplicação Prática
            </CardTitle>
            <CardDescription>
              Como usar isso no seu dia a dia real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Projeto Prático:</h4>
                <p className="text-sm text-emerald-600 mb-2">
                  {selectedCategory.id === 'professional' && "Liderança: Conduza sua próxima reunião aplicando técnicas de comunicação eficaz"}
                  {selectedCategory.id === 'entrepreneurship' && "Negócios: Crie um plano de negócios real para sua ideia"}
                  {selectedCategory.id === 'technology' && "Tech: Construa seu primeiro site ou automação"}
                  {selectedCategory.id === 'personal' && "Pessoal: Implemente uma rotina de produtividade por 7 dias"}
                  {selectedCategory.id === 'creative' && "Criativo: Crie um portfólio com seus melhores trabalhos"}
                  {selectedCategory.id === 'financial' && "Financeiro: Monte seu orçamento pessoal e primeiros investimentos"}
                  {selectedCategory.id === 'health' && "Saúde: Desenhe um plano de exercícios e alimentação personalizado"}
                  {selectedCategory.id === 'languages' && "Idiomas: Tenha sua primeira conversa em inglês em 15 dias"}
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Começar Projeto
                </Button>
              </div>
              
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Resultados Esperados:</h4>
                <ul className="text-sm text-emerald-600 space-y-1">
                  {user?.persona?.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  );

  // Modal de Setup Inicial
  const InitialSetupModal = () => (
    <Dialog open={showInitialSetup} onOpenChange={() => setShowInitialSetup(false)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-blue-800">
            🚀 Bem-vindo ao EduVibe Universal!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Aprendizado para TODOS - estudantes, profissionais, empreendedores, aposentados...
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Para quem é o EduVibe?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Profissionais que querem crescer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-green-600" />
                  <span>Futuros empreendedores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span>Pessoas em desenvolvimento pessoal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-orange-600" />
                  <span>Criativos e artistas</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Quem quer organizar as finanças</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>Aposentados ativos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              <strong>Não importa sua idade, profissão ou disponibilidade de tempo.</strong><br/>
              Criamos um plano personalizado para VOCÊ!
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setIsAuthenticated(true);
              setShowInitialSetup(false);
              setUser({ name: 'Aprendiz Universal', email: 'aprender@eduvibe.com' });
              setShowPersonaSetup(true);
            }}
          >
            <Brain className="w-4 h-4 mr-2" />
            Quero Descobrir Meu Perfil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-800 mb-4">
              🌟 EduVibe Universal
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Aprendizado para TODAS as idades e profissões
            </p>
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
        <InitialSetupModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">EduVibe Universal</h1>
                <p className="text-xs text-gray-500">Aprendizado para todos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">
                  {user?.persona?.name || 'Definir perfil'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPersonaSetup(true)}
              >
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
              <Link to="/dashboard-unificado">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger 
                value="categories" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Categorias</span>
              </TabsTrigger>
              <TabsTrigger 
                value="personalized" 
                className="flex items-center gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                disabled={!selectedCategory}
              >
                <Target className="w-4 h-4" />
                <span>Meu Aprendizado</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="categories" className="mt-0">
            <CategoriesComponent />
          </TabsContent>
          
          <TabsContent value="personalized" className="mt-0">
            <PersonalizedComponent />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modais */}
      <PersonaSetupModal />

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>EduVibe Universal - Aprendizado para TODOS</strong>
            </p>
            <p>
              Profissionais • Empreendedores • Aposentados • Criativos • Estudantes • Pais • Todos!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduVibeUniversal;