import { useState, useEffect, useRef } from 'react';
import { 
  Brain, BookOpen, Play, Upload, Camera, FileText, Youtube, 
  TrendingUp, Users, Clock, Award, Star, BarChart3, 
  ChevronRight, X, Send, Lightbulb, Target, Zap,
  Download, Share2, Volume2, VolumeX, Maximize2, Minimize2,
  CheckCircle, Circle, RefreshCw, Trash2, Edit3
} from 'lucide-react';

// Enhanced interfaces for Replit v2
interface StudySession {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'pdf' | 'camera';
  analysis: string;
  duration: number;
  score?: number;
  completed: boolean;
  createdAt: Date;
  tags: string[];
}

interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  totalSessions: number;
  averageScore: number;
  badges: string[];
  studyHours: number;
}

interface Quiz {
  id: string;
  sessionId: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  userAnswers: number[];
  score?: number;
  completed: boolean;
}

const EduVibeV2Complete = () => {
  // Authentication state with Replit Auth simulation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, avatar?: string} | null>(null);

  // Main app state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 15,
    xp: 3247,
    streak: 12,
    totalSessions: 58,
    averageScore: 87,
    badges: ['first_upload', 'streak_7', 'pdf_master', 'video_analyst'],
    studyHours: 47.5
  });

  // Study sessions and content
  const [studySessions, setStudySessions] = useState<StudySession[]>([
    {
      id: '1',
      title: 'Metodologias Ativas de Ensino',
      content: 'Conteúdo sobre metodologias ativas...',
      type: 'video',
      analysis: 'Análise detalhada sobre metodologias ativas de ensino, incluindo conceitos de aprendizagem colaborativa e construção do conhecimento.',
      duration: 25,
      score: 94,
      completed: true,
      createdAt: new Date(Date.now() - 86400000),
      tags: ['educação', 'metodologia', 'pedagogia']
    },
    {
      id: '2',
      title: 'Gestão Financeira Empresarial',
      content: 'PDF sobre gestão financeira...',
      type: 'pdf',
      analysis: 'Análise completa sobre princípios de gestão financeira, incluindo fluxo de caixa, investimentos e planejamento estratégico.',
      duration: 32,
      score: 91,
      completed: true,
      createdAt: new Date(Date.now() - 172800000),
      tags: ['finanças', 'gestão', 'negócios']
    }
  ]);

  // Modal and input states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'text' | 'pdf' | 'youtube' | 'camera' | null>(null);
  const [textInput, setTextInput] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState('');

  // Quiz state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Audio and accessibility
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Study Plan Configuration
  const [showStudyPlanModal, setShowStudyPlanModal] = useState(false);
  const [showInitialSetup, setShowInitialSetup] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [studyPlan, setStudyPlan] = useState({
    hoursPerDay: 3,
    daysPerWeek: 5,
    startDate: new Date(),
    goals: ['Melhorar conhecimentos em tecnologia', 'Desenvolver habilidades de análise'],
    subjects: ['Tecnologia', 'Negócios', 'Educação']
  });
  const [initialSetup, setInitialSetup] = useState({
    studyTopic: '',
    timeFrame: 30, // dias
    dailyTime: 2, // horas por dia
    currentLevel: 'beginner', // beginner, intermediate, advanced
    studyType: 'general' // general, exam, project, skill
  });
  const [sessionToSchedule, setSessionToSchedule] = useState<StudySession | null>(null);
  const [scheduleConfig, setScheduleConfig] = useState({
    startDate: new Date(),
    sessionsPerWeek: 3,
    sessionDuration: 60, // minutos
    reminderEnabled: true,
    studyDays: ['monday', 'wednesday', 'friday'] as string[]
  });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Replit Auth handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({ 
      name: 'Maria Silva', 
      email: 'maria@exemplo.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b96db3c8?w=64&h=64&fit=crop&crop=face'
    });
    // Show initial setup for new users
    setTimeout(() => setShowInitialSetup(true), 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Enhanced content processing with AI simulation
  const processContent = async () => {
    setIsProcessing(true);
    
    // Simulated AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    let analysis = '';
    let title = '';
    let content = '';
    let tags: string[] = [];

    if (uploadType === 'text') {
      const wordCount = textInput.split(' ').length;
      title = `Análise de Texto (${wordCount} palavras)`;
      content = textInput;
      tags = ['texto', 'análise', 'estudo'];
      analysis = `📝 **Análise de Texto Completa**

**Resumo Executivo:**
Analisamos ${wordCount} palavras do seu texto. O conteúdo apresenta estrutura clara e conceitos bem definidos.

**Principais Temas Identificados:**
• ${textInput.split(' ').slice(0, 3).join(', ')}
• Conceitos fundamentais bem estruturados
• Linguagem acadêmica apropriada
• Argumentação lógica e sequencial

**Análise de Complexidade:**
- Nível de leitura: ${wordCount > 500 ? 'Avançado' : wordCount > 200 ? 'Intermediário' : 'Básico'}
- Densidade conceitual: ${Math.floor(Math.random() * 40) + 60}%
- Clareza argumentativa: ${Math.floor(Math.random() * 20) + 80}%

**Sugestões de Estudo Personalizadas:**
1. **Revisão Ativa**: Criar resumos de cada parágrafo
2. **Mapas Mentais**: Visualizar conexões entre conceitos
3. **Questionamento**: Formular 5 perguntas sobre o conteúdo
4. **Aplicação**: Buscar exemplos práticos dos conceitos
5. **Discussão**: Compartilhar insights com colegas

**Quiz Recomendado:**
Preparamos 5 questões específicas sobre este conteúdo para testar sua compreensão.

**Tempo de Estudo Estimado:** ${Math.ceil(wordCount / 200)} minutos de leitura ativa`;

    } else if (uploadType === 'youtube') {
      title = `Vídeo YouTube: ${youtubeUrl.split('v=')[1]?.substring(0, 8) || 'Análise'}`;
      content = youtubeUrl;
      tags = ['vídeo', 'youtube', 'audiovisual'];
      analysis = `🎥 **Análise de Vídeo YouTube Avançada**

**URL Processada:** ${youtubeUrl}

**Análise Técnica:**
✅ Link válido do YouTube identificado
✅ Conteúdo educacional detectado
✅ Áudio e vídeo processados
✅ Transcrição automática gerada

**Estrutura do Conteúdo:**
📊 **Introdução** (0-2 min): Apresentação do tema
📈 **Desenvolvimento** (2-15 min): Conceitos principais
🎯 **Conclusão** (15-18 min): Síntese e aplicações
💡 **Recursos extras**: Links e materiais complementares

**Pontos de Aprendizado Identificados:**
• Conceitos visuais bem explicados
• Exemplos práticos demonstrados
• Linguagem clara e didática
• Ritmo adequado para absorção

**Estratégias de Estudo Recomendadas:**
1. **Primeira Assistida**: Visão geral sem pausas
2. **Segunda Assistida**: Anotações detalhadas
3. **Segmentação**: Estudar por blocos temáticos
4. **Prática**: Implementar exemplos mostrados
5. **Revisão**: Assistir novamente após 24h

**Recursos de Acessibilidade:**
🎧 Transcrição automática disponível
📝 Resumo em texto gerado
🔊 Controles de velocidade recomendados
📱 Compatível com dispositivos móveis

**Quiz Personalizado:**
5 questões baseadas no conteúdo específico do vídeo`;

    } else if (uploadType === 'pdf') {
      title = `Documento PDF Analisado`;
      content = 'Arquivo PDF processado';
      tags = ['pdf', 'documento', 'leitura'];
      analysis = `📄 **Análise Completa de PDF**

**Status do Processamento:**
✅ Documento carregado com sucesso
✅ Texto extraído e processado
✅ Estrutura identificada
✅ Conteúdo educacional confirmado

**Análise Estrutural:**
📑 **Páginas**: Múltiplas seções identificadas
📊 **Gráficos**: Elementos visuais detectados
📝 **Texto**: Conteúdo acadêmico estruturado
🔗 **Referências**: Bibliografia presente

**Características do Documento:**
• Formatação profissional
• Linguagem técnica apropriada
• Estrutura lógica clara
• Recursos visuais informativos

**Metodologia de Estudo Sugerida:**
1. **Leitura Exploratória**: Visão geral do documento
2. **Leitura Analítica**: Seção por seção detalhadamente
3. **Síntese**: Resumos de cada capítulo
4. **Esquematização**: Mapas conceituais
5. **Aplicação**: Exercícios práticos

**Ferramentas de Apoio:**
📌 Marcações digitais sugeridas
🔍 Termos-chave destacados
📋 Checklist de compreensão
🎯 Objetivos de aprendizado definidos

**Avaliação Integrada:**
Quiz personalizado com questões específicas do PDF`;

    } else if (uploadType === 'camera') {
      title = `Captura por Câmera`;
      content = 'Imagem processada via OCR';
      tags = ['câmera', 'ocr', 'imagem'];
      analysis = `📸 **Análise de Captura por Câmera**

**Processamento OCR Concluído:**
✅ Imagem capturada e otimizada
✅ Texto extraído com alta precisão
✅ Formatação preservada
✅ Conteúdo educacional identificado

**Qualidade da Captura:**
📊 **Nitidez**: Excelente (95%)
📝 **Legibilidade**: Alta precisão de OCR
🔍 **Detalhes**: Texto e elementos visuais preservados
📐 **Formatação**: Estrutura mantida

**Conteúdo Identificado:**
• Texto principal transcrito
• Fórmulas matemáticas detectadas
• Diagramas e ilustrações preservados
• Estrutura hierárquica mantida

**Otimizações Aplicadas:**
🔧 Correção automática de distorção
🎨 Melhoria de contraste e brilho
📏 Alinhamento e proporção ajustados
🔤 Reconhecimento de caracteres avançado

**Estratégias de Estudo:**
1. **Organização**: Estruturar o conteúdo transcrito
2. **Complementação**: Buscar fontes adicionais
3. **Verificação**: Confirmar transcrição com original
4. **Expansão**: Pesquisar conceitos identificados
5. **Aplicação**: Resolver exercícios relacionados

**Recursos Gerados:**
📱 Versão digital editável
🔊 Áudio síntese disponível
📊 Quiz baseado no conteúdo
💾 Backup automático na nuvem`;
    }

    const newSession: StudySession = {
      id: Date.now().toString(),
      title,
      content,
      type: uploadType!,
      analysis,
      duration: Math.floor(Math.random() * 30) + 15,
      completed: false,
      createdAt: new Date(),
      tags
    };

    setStudySessions(prev => [newSession, ...prev]);
    setCurrentAnalysis(analysis);
    
    // Generate quiz
    const quiz = generateQuiz(newSession);
    setActiveQuiz(quiz);
    
    setIsProcessing(false);
  };

  const generateQuiz = (session: StudySession): Quiz => {
    const questions = [
      {
        id: '1',
        question: `Qual é o conceito principal abordado no conteúdo "${session.title}"?`,
        options: [
          'Metodologia de pesquisa quantitativa',
          'Análise de dados estatísticos',
          'Desenvolvimento de habilidades práticas',
          'Fundamentação teórica aplicada'
        ],
        correctAnswer: 3,
        explanation: 'O conteúdo foca na fundamentação teórica aplicada, conectando conceitos abstratos com aplicações práticas.'
      },
      {
        id: '2',
        question: `Qual estratégia de estudo seria mais eficaz para este tipo de conteúdo?`,
        options: [
          'Leitura passiva repetitiva',
          'Memorização de definições',
          'Análise crítica e síntese',
          'Cópia manual do texto'
        ],
        correctAnswer: 2,
        explanation: 'A análise crítica e síntese permitem maior compreensão e retenção do conhecimento.'
      },
      {
        id: '3',
        question: `Com base na análise, qual é o nível de complexidade do material?`,
        options: [
          'Básico - introdutório',
          'Intermediário - conceitual',
          'Avançado - especializado',
          'Expert - pesquisa avançada'
        ],
        correctAnswer: 1,
        explanation: 'O material apresenta complexidade intermediária, adequada para desenvolvimento conceitual sólido.'
      },
      {
        id: '4',
        question: `Qual seria o tempo ideal de estudo para maximizar o aprendizado?`,
        options: [
          '15-20 minutos de leitura rápida',
          '30-45 minutos de estudo ativo',
          '60+ minutos de memorização',
          '5-10 minutos de revisão superficial'
        ],
        correctAnswer: 1,
        explanation: 'Sessões de 30-45 minutos permitem absorção adequada sem fadiga mental excessiva.'
      },
      {
        id: '5',
        question: `Como você aplicaria o conhecimento adquirido na prática?`,
        options: [
          'Decorando as definições principais',
          'Fazendo resumos detalhados',
          'Conectando com experiências pessoais',
          'Todas as alternativas anteriores'
        ],
        correctAnswer: 3,
        explanation: 'A combinação de múltiplas estratégias (memorização, síntese e conexão pessoal) maximiza o aprendizado.'
      }
    ];

    return {
      id: Date.now().toString(),
      sessionId: session.id,
      questions,
      userAnswers: [],
      completed: false
    };
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    if (!activeQuiz) return;
    
    const newAnswers = [...activeQuiz.userAnswers];
    newAnswers[questionIndex] = answerIndex;
    
    setActiveQuiz({
      ...activeQuiz,
      userAnswers: newAnswers
    });
  };

  const completeQuiz = () => {
    if (!activeQuiz) return;
    
    let correct = 0;
    activeQuiz.questions.forEach((question, index) => {
      if (activeQuiz.userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / activeQuiz.questions.length) * 100);
    
    setActiveQuiz({
      ...activeQuiz,
      score,
      completed: true
    });

    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp + (score > 70 ? 100 : 50),
      totalSessions: prev.totalSessions + 1,
      averageScore: Math.round((prev.averageScore + score) / 2)
    }));

    // Update session
    setStudySessions(prev => prev.map(session => 
      session.id === activeQuiz.sessionId 
        ? { ...session, score, completed: true }
        : session
    ));
  };

  const openUploadModal = (type: 'text' | 'pdf' | 'youtube' | 'camera') => {
    setUploadType(type);
    setShowUploadModal(true);
    setTextInput('');
    setYoutubeUrl('');
    setCurrentAnalysis('');
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setUploadType(null);
    setIsProcessing(false);
    setCurrentAnalysis('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processContent();
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      const utterance = new SpeechSynthesisUtterance('Áudio ativado para melhor acessibilidade');
      speechSynthesis.speak(utterance);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Login screen with enhanced Replit Auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Brain className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">EduVibe v2</h1>
              <p className="text-gray-600 mb-2">Aprendizado Inteligente com IA</p>
              <p className="text-sm text-blue-600 font-medium">Powered by Replit Auth & Neon DB</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <CheckCircle className="text-green-500" size={16} />
                <span>Análise de IA em tempo real</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <CheckCircle className="text-green-500" size={16} />
                <span>Sistema gamificado avançado</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <CheckCircle className="text-green-500" size={16} />
                <span>Object Storage para arquivos</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <CheckCircle className="text-green-500" size={16} />
                <span>Performance 40x mais rápida</span>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Users size={20} />
                <span>Entrar com Replit Auth</span>
              </div>
            </button>
            
            <p className="text-xs text-gray-500 mt-4">
              Autenticação segura • Dados sincronizados • Zero configuração
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">EduVibe v2 Complete</h1>
                <p className="text-xs text-gray-500">Replit Enhanced • Neon DB • Object Storage</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-lg transition-colors ${audioEnabled ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-blue-600">Level {userProgress.level} • {userProgress.xp} XP</p>
                </div>
                {user?.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'study', label: 'Estudar', icon: BookOpen },
              { id: 'sessions', label: 'Minhas Sessões', icon: Clock },
              { id: 'progress', label: 'Progresso', icon: TrendingUp },
              { id: 'achievements', label: 'Conquistas', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Nível Atual</p>
                    <p className="text-3xl font-bold text-blue-800">{userProgress.level}</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center">
                    <Star className="text-blue-700" size={28} />
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(userProgress.xp % 1000) / 10}%` }}></div>
                </div>
                <p className="text-xs text-blue-600 mt-2">{userProgress.xp % 1000}/1000 XP para próximo nível</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-green-700 font-medium">XP Total</p>
                    <p className="text-3xl font-bold text-green-800">{userProgress.xp.toLocaleString()}</p>
                  </div>
                  <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center">
                    <Zap className="text-green-700" size={28} />
                  </div>
                </div>
                <p className="text-sm text-green-600">+{Math.floor(Math.random() * 50) + 25} XP hoje</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Sequência</p>
                    <p className="text-3xl font-bold text-purple-800">{userProgress.streak}</p>
                  </div>
                  <div className="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center">
                    <Target className="text-purple-700" size={28} />
                  </div>
                </div>
                <p className="text-sm text-purple-600">dias consecutivos</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-orange-700 font-medium">Média</p>
                    <p className="text-3xl font-bold text-orange-800">{userProgress.averageScore}%</p>
                  </div>
                  <div className="w-14 h-14 bg-orange-200 rounded-xl flex items-center justify-center">
                    <BarChart3 className="text-orange-700" size={28} />
                  </div>
                </div>
                <p className="text-sm text-orange-600">em {userProgress.totalSessions} sessões</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => openUploadModal('text')}
                  className="group p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:scale-105 border border-orange-200"
                >
                  <FileText className="mx-auto mb-3 text-orange-600 group-hover:scale-110 transition-transform" size={28} />
                  <span className="text-sm font-semibold text-orange-700">Analisar Texto</span>
                  <p className="text-xs text-orange-600 mt-1">Cola e analisa textos</p>
                </button>

                <button 
                  onClick={() => openUploadModal('pdf')}
                  className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 border border-blue-200"
                >
                  <Upload className="mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" size={28} />
                  <span className="text-sm font-semibold text-blue-700">Upload PDF</span>
                  <p className="text-xs text-blue-600 mt-1">Documentos e livros</p>
                </button>

                <button 
                  onClick={() => openUploadModal('youtube')}
                  className="group p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:scale-105 border border-red-200"
                >
                  <Youtube className="mx-auto mb-3 text-red-600 group-hover:scale-110 transition-transform" size={28} />
                  <span className="text-sm font-semibold text-red-700">YouTube</span>
                  <p className="text-xs text-red-600 mt-1">Vídeos educacionais</p>
                </button>

                <button 
                  onClick={() => openUploadModal('camera')}
                  className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 border border-purple-200"
                >
                  <Camera className="mx-auto mb-3 text-purple-600 group-hover:scale-110 transition-transform" size={28} />
                  <span className="text-sm font-semibold text-purple-700">Câmera</span>
                  <p className="text-xs text-purple-600 mt-1">Livros e quadros</p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Atividade Recente</h2>
                <button 
                  onClick={() => setActiveTab('sessions')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver todas
                </button>
              </div>
              
              <div className="space-y-4">
                {studySessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        {session.type === 'video' && <Play className="text-blue-600" size={20} />}
                        {session.type === 'pdf' && <Upload className="text-blue-600" size={20} />}
                        {session.type === 'camera' && <Camera className="text-blue-600" size={20} />}
                        {session.type === 'text' && <FileText className="text-blue-600" size={20} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{session.title}</h3>
                        <p className="text-sm text-gray-600">
                          {session.duration} min • 
                          {session.completed ? ` Nota: ${session.score}%` : ' Em progresso'} • 
                          {session.createdAt.toLocaleDateString()}
                        </p>
                        <div className="flex space-x-1 mt-1">
                          {session.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.completed && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="text-green-600" size={16} />
                        </div>
                      )}
                      <ChevronRight className="text-gray-400" size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Replit v2 Features Showcase */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Powered by Replit v2</h3>
                  <p className="text-blue-100 mb-4">
                    Experiência de aprendizado revolucionária com tecnologia de ponta
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/20 px-4 py-3 rounded-lg backdrop-blur">
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="text-yellow-300" size={16} />
                        <span className="font-semibold">40x Mais Rápido</span>
                      </div>
                      <p className="text-blue-100">Backend otimizado com Gunicorn</p>
                    </div>
                    <div className="bg-white/20 px-4 py-3 rounded-lg backdrop-blur">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="text-green-300" size={16} />
                        <span className="font-semibold">Replit Auth</span>
                      </div>
                      <p className="text-blue-100">Login seguro integrado</p>
                    </div>
                    <div className="bg-white/20 px-4 py-3 rounded-lg backdrop-blur">
                      <div className="flex items-center space-x-2 mb-1">
                        <Upload className="text-orange-300" size={16} />
                        <span className="font-semibold">Object Storage</span>
                      </div>
                      <p className="text-blue-100">Upload de arquivos otimizado</p>
                    </div>
                    <div className="bg-white/20 px-4 py-3 rounded-lg backdrop-blur">
                      <div className="flex items-center space-x-2 mb-1">
                        <BarChart3 className="text-purple-300" size={16} />
                        <span className="font-semibold">Neon DB</span>
                      </div>
                      <p className="text-blue-100">Database 200x mais rápido</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <Brain className="text-white" size={40} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Brain className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Central de Estudos</h2>
              <p className="text-gray-600 mb-6">
                Análise avançada com IA, Object Storage para arquivos e quizzes personalizados
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button 
                onClick={() => openUploadModal('text')}
                className="group p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:scale-105 border border-orange-200"
              >
                <div className="w-16 h-16 mx-auto bg-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="text-orange-600" size={28} />
                </div>
                <h3 className="text-lg font-bold text-orange-800 mb-2">Análise de Texto</h3>
                <p className="text-sm text-orange-600">
                  Cole qualquer texto e receba análise completa com sugestões de estudo personalizadas
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-orange-700">
                  <span className="bg-orange-200 px-2 py-1 rounded-full">IA Avançada</span>
                  <span className="bg-orange-200 px-2 py-1 rounded-full">Quiz Automático</span>
                </div>
              </button>

              <button 
                onClick={() => openUploadModal('pdf')}
                className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 border border-blue-200"
              >
                <div className="w-16 h-16 mx-auto bg-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-blue-600" size={28} />
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">Upload de PDF</h3>
                <p className="text-sm text-blue-600">
                  Carregue documentos, livros e artigos para análise estruturada e extração de conceitos
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-blue-700">
                  <span className="bg-blue-200 px-2 py-1 rounded-full">Object Storage</span>
                  <span className="bg-blue-200 px-2 py-1 rounded-full">OCR Integrado</span>
                </div>
              </button>

              <button 
                onClick={() => openUploadModal('youtube')}
                className="group p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:scale-105 border border-red-200"
              >
                <div className="w-16 h-16 mx-auto bg-red-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Youtube className="text-red-600" size={28} />
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Vídeos YouTube</h3>
                <p className="text-sm text-red-600">
                  Análise automática de vídeos educacionais com transcrição e estratégias de estudo
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-red-700">
                  <span className="bg-red-200 px-2 py-1 rounded-full">Transcrição Auto</span>
                  <span className="bg-red-200 px-2 py-1 rounded-full">Timestamps</span>
                </div>
              </button>

              <button 
                onClick={() => openUploadModal('camera')}
                className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 border border-purple-200"
              >
                <div className="w-16 h-16 mx-auto bg-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="text-purple-600" size={28} />
                </div>
                <h3 className="text-lg font-bold text-purple-800 mb-2">Captura por Câmera</h3>
                <p className="text-sm text-purple-600">
                  Fotografe livros, quadros e documentos para conversão automática em texto estudável
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-purple-700">
                  <span className="bg-purple-200 px-2 py-1 rounded-full">OCR Avançado</span>
                  <span className="bg-purple-200 px-2 py-1 rounded-full">Auto-Crop</span>
                </div>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Recursos Avançados v2</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <Lightbulb className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">IA Contextual</h4>
                  <p className="text-sm text-gray-600">Análises personalizadas baseadas no seu histórico de aprendizado</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <Target className="text-blue-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Quizzes Adaptativos</h4>
                  <p className="text-sm text-gray-600">Questões geradas automaticamente com base no conteúdo específico</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <Share2 className="text-purple-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Sincronização</h4>
                  <p className="text-sm text-gray-600">Dados sincronizados em tempo real com Neon Database</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Meu Progresso</h2>
              <button 
                onClick={() => setShowStudyPlanModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Configurar Plano
              </button>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Meta Diária</h3>
                <div className="flex items-end space-x-2 mb-4">
                  <span className="text-3xl font-bold">2.5</span>
                  <span className="text-blue-200">/ 3.0 horas</span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <p className="text-sm text-blue-200 mt-2">83% concluído hoje</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Semana Atual</h3>
                <div className="flex items-end space-x-2 mb-4">
                  <span className="text-3xl font-bold">18.5</span>
                  <span className="text-green-200">/ 21 horas</span>
                </div>
                <div className="w-full bg-green-400 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <p className="text-sm text-green-200 mt-2">88% da meta semanal</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Próxima Meta</h3>
                <div className="flex items-end space-x-2 mb-4">
                  <span className="text-3xl font-bold">Level</span>
                  <span className="text-purple-200">16</span>
                </div>
                <div className="w-full bg-purple-400 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-purple-200 mt-2">350 XP para próximo nível</p>
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Progresso Semanal</h3>
              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
                  const hours = [1.5, 3.2, 2.8, 3.0, 2.5, 2.0, 1.5][index];
                  const target = 3.0;
                  const percentage = Math.min((hours / target) * 100, 100);
                  
                  return (
                    <div key={day} className="text-center">
                      <div className="mb-2 text-xs font-medium text-gray-600">{day}</div>
                      <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-center p-2">
                        <div 
                          className={`w-6 rounded-lg ${
                            percentage >= 100 ? 'bg-green-500' : 
                            percentage >= 80 ? 'bg-blue-500' :
                            percentage >= 60 ? 'bg-yellow-500' : 'bg-red-400'
                          }`}
                          style={{ height: `${Math.max(percentage, 10)}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">{hours}h</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Sequência de Estudos</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{userProgress.streak} dias</p>
                    <p className="text-sm text-gray-600">Sequência atual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">Melhor: 18 dias</p>
                  <p className="text-sm text-gray-600">Recorde pessoal</p>
                </div>
              </div>
              
              {/* Calendar view */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 21 }, (_, i) => {
                  const isActive = i >= 21 - userProgress.streak;
                  return (
                    <div 
                      key={i}
                      className={`w-8 h-8 rounded-lg border-2 ${
                        isActive 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {isActive && (
                        <CheckCircle className="text-white w-full h-full p-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Desempenho por Tipo</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Texto', average: 92, sessions: 15, color: 'orange' },
                    { type: 'PDF', average: 87, sessions: 8, color: 'blue' },
                    { type: 'YouTube', average: 89, sessions: 12, color: 'red' },
                    { type: 'Câmera', average: 84, sessions: 6, color: 'purple' }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                        <span className="font-medium text-gray-800">{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{item.sessions} sessões</span>
                        <span className="font-semibold text-gray-800">{item.average}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Temas Favoritos</h3>
                <div className="space-y-3">
                  {[
                    { tag: 'educação', count: 8, growth: '+12%' },
                    { tag: 'tecnologia', count: 6, growth: '+8%' },
                    { tag: 'negócios', count: 5, growth: '+15%' },
                    { tag: 'ciências', count: 4, growth: '+5%' }
                  ].map((item, index) => (
                    <div key={item.tag} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {item.tag}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{item.count} estudos</span>
                        <span className="text-sm text-green-600 font-medium">{item.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Conquistas</h2>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">{userProgress.badges.length}/20</p>
                <p className="text-sm text-gray-600">Conquistas desbloqueadas</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                <span className="text-sm text-gray-600">{Math.round((userProgress.badges.length / 20) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(userProgress.badges.length / 20) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Achievement Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Iniciante */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="text-green-600" size={16} />
                  </div>
                  <span>Iniciante</span>
                </h3>
                
                <div className="space-y-3">
                  {[
                    { 
                      id: 'first_upload', 
                      title: 'Primeiro Upload', 
                      description: 'Enviou seu primeiro conteúdo',
                      unlocked: userProgress.badges.includes('first_upload'),
                      icon: Upload,
                      color: 'blue'
                    },
                    { 
                      id: 'first_analysis', 
                      title: 'Primeira Análise', 
                      description: 'Completou sua primeira análise de IA',
                      unlocked: true,
                      icon: Brain,
                      color: 'purple'
                    },
                    { 
                      id: 'first_quiz', 
                      title: 'Primeiro Quiz', 
                      description: 'Finalizou seu primeiro quiz',
                      unlocked: true,
                      icon: Award,
                      color: 'yellow'
                    }
                  ].map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                        achievement.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        achievement.unlocked 
                          ? `bg-${achievement.color}-100` 
                          : 'bg-gray-100'
                      }`}>
                        <achievement.icon 
                          size={20} 
                          className={achievement.unlocked ? `text-${achievement.color}-600` : 'text-gray-400'} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progresso */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-600" size={16} />
                  </div>
                  <span>Progresso</span>
                </h3>
                
                <div className="space-y-3">
                  {[
                    { 
                      id: 'streak_7', 
                      title: 'Semana Completa', 
                      description: '7 dias consecutivos estudando',
                      unlocked: userProgress.badges.includes('streak_7'),
                      icon: Target,
                      color: 'orange',
                      progress: userProgress.streak >= 7 ? 100 : (userProgress.streak / 7) * 100
                    },
                    { 
                      id: 'level_10', 
                      title: 'Nível 10', 
                      description: 'Alcançou o nível 10',
                      unlocked: userProgress.level >= 10,
                      icon: Star,
                      color: 'purple',
                      progress: userProgress.level >= 10 ? 100 : (userProgress.level / 10) * 100
                    },
                    { 
                      id: 'sessions_50', 
                      title: 'Dedicação', 
                      description: '50 sessões de estudo completas',
                      unlocked: userProgress.totalSessions >= 50,
                      icon: Clock,
                      color: 'green',
                      progress: Math.min((userProgress.totalSessions / 50) * 100, 100)
                    }
                  ].map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        achievement.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            achievement.unlocked 
                              ? `bg-${achievement.color}-100` 
                              : 'bg-gray-100'
                          }`}>
                            <achievement.icon 
                              size={16} 
                              className={achievement.unlocked ? `text-${achievement.color}-600` : 'text-gray-400'} 
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{achievement.title}</h4>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                      </div>
                      
                      {!achievement.unlocked && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${achievement.color}-500 h-2 rounded-full transition-all`}
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round(achievement.progress)}% completo
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Especialista */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="text-yellow-600" size={16} />
                  </div>
                  <span>Especialista</span>
                </h3>
                
                <div className="space-y-3">
                  {[
                    { 
                      id: 'pdf_master', 
                      title: 'Mestre dos PDFs', 
                      description: '20+ documentos analisados',
                      unlocked: userProgress.badges.includes('pdf_master'),
                      icon: FileText,
                      color: 'blue',
                      requirement: 20,
                      current: 8
                    },
                    { 
                      id: 'video_analyst', 
                      title: 'Analista de Vídeos', 
                      description: '15+ vídeos processados',
                      unlocked: userProgress.badges.includes('video_analyst'),
                      icon: Play,
                      color: 'red',
                      requirement: 15,
                      current: 12
                    },
                    { 
                      id: 'high_scorer', 
                      title: 'Nota Alta', 
                      description: 'Média acima de 90%',
                      unlocked: userProgress.averageScore >= 90,
                      icon: Zap,
                      color: 'yellow',
                      requirement: 90,
                      current: userProgress.averageScore
                    }
                  ].map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        achievement.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            achievement.unlocked 
                              ? `bg-${achievement.color}-100` 
                              : 'bg-gray-100'
                          }`}>
                            <achievement.icon 
                              size={16} 
                              className={achievement.unlocked ? `text-${achievement.color}-600` : 'text-gray-400'} 
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{achievement.title}</h4>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                      </div>
                      
                      {!achievement.unlocked && achievement.requirement && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${achievement.color}-500 h-2 rounded-full transition-all`}
                              style={{ width: `${Math.min((achievement.current! / achievement.requirement) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {achievement.current}/{achievement.requirement}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Achievements */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Próximas Conquistas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sequência Diamante</h4>
                    <p className="text-sm text-gray-600">30 dias consecutivos • {30 - userProgress.streak} restantes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Nível 20</h4>
                    <p className="text-sm text-gray-600">Próximo marco • {20 - userProgress.level} níveis restantes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Minhas Sessões de Estudo</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Todas
                </button>
                <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Concluídas
                </button>
                <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Em Progresso
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {studySessions.map((session) => (
                <div key={session.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        session.type === 'text' ? 'bg-orange-100' :
                        session.type === 'pdf' ? 'bg-blue-100' :
                        session.type === 'youtube' ? 'bg-red-100' :
                        'bg-purple-100'
                      }`}>
                        {session.type === 'text' && <FileText className="text-orange-600" size={20} />}
                        {session.type === 'pdf' && <Upload className="text-blue-600" size={20} />}
                        {session.type === 'youtube' && <Youtube className="text-red-600" size={20} />}
                        {session.type === 'camera' && <Camera className="text-purple-600" size={20} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{session.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{session.duration} minutos</span>
                          <span>{session.createdAt.toLocaleDateString('pt-BR')}</span>
                          {session.completed && session.score && (
                            <span className="text-green-600 font-medium">Nota: {session.score}%</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {session.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {session.completed ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="text-green-600" size={16} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Clock className="text-yellow-600" size={16} />
                        </div>
                      )}
                      
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Análise Gerada</h4>
                    <p className="text-sm text-gray-600 line-clamp-3">{session.analysis.substring(0, 200)}...</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                      Ver análise completa
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        {session.completed ? 'Revisar' : 'Continuar Estudo'}
                      </button>
                      {!session.completed && (
                        <button 
                          onClick={() => {
                            const quiz = generateQuiz(session);
                            setActiveQuiz(quiz);
                            setShowQuizModal(true);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Fazer Quiz
                        </button>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors" title="Compartilhar">
                        <Share2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors" title="Download">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {studySessions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma sessão ainda</h3>
                <p className="text-gray-600 mb-4">Comece sua jornada de aprendizado criando sua primeira sessão</p>
                <button 
                  onClick={() => setActiveTab('study')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Começar Agora
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Enhanced Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl z-10">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  uploadType === 'text' ? 'bg-orange-100' :
                  uploadType === 'pdf' ? 'bg-blue-100' :
                  uploadType === 'youtube' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  {uploadType === 'text' && <FileText className="text-orange-600" size={20} />}
                  {uploadType === 'pdf' && <Upload className="text-blue-600" size={20} />}
                  {uploadType === 'youtube' && <Youtube className="text-red-600" size={20} />}
                  {uploadType === 'camera' && <Camera className="text-purple-600" size={20} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {uploadType === 'text' && 'Análise Inteligente de Texto'}
                    {uploadType === 'pdf' && 'Upload e Análise de PDF'}
                    {uploadType === 'youtube' && 'Análise de Vídeo YouTube'}
                    {uploadType === 'camera' && 'Captura por Câmera'}
                  </h2>
                  <p className="text-sm text-gray-500">Powered by Replit AI & Object Storage</p>
                </div>
              </div>
              <button 
                onClick={closeUploadModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {uploadType === 'text' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Digite ou cole seu texto para análise completa:
                    </label>
                    <textarea
                      ref={textareaRef}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      className="w-full h-48 p-4 border-2 border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Cole aqui o texto que você quer estudar... (artigos, capítulos de livros, resumos, etc.)"
                    />
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{textInput.length} caracteres • {textInput.split(' ').length} palavras</span>
                      <button
                        onClick={() => setTextInput('')}
                        className="text-red-500 hover:text-red-700"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={processContent}
                    disabled={!textInput.trim() || isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Analisando com IA...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Brain size={20} />
                        <span>Analisar Texto</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {uploadType === 'pdf' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Selecione um arquivo PDF:
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="text-blue-600" size={32} />
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Arraste e solte seu PDF aqui</h3>
                      <p className="text-gray-500 mb-4">ou clique para selecionar um arquivo</p>
                      <div className="flex justify-center space-x-4 text-xs text-gray-400">
                        <span>• Até 50MB</span>
                        <span>• OCR automático</span>
                        <span>• Análise completa</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Recursos do Object Storage</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Armazenamento seguro na nuvem</li>
                      <li>• Processamento OCR avançado</li>
                      <li>• Backup automático</li>
                      <li>• Acesso multiplataforma</li>
                    </ul>
                  </div>
                </div>
              )}

              {uploadType === 'youtube' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cole a URL do vídeo do YouTube:
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="w-full p-4 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {youtubeUrl && (
                      <div className="mt-2 text-sm text-green-600">
                        ✓ URL válida detectada
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={processContent}
                    disabled={!youtubeUrl.trim() || isProcessing}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Processando vídeo...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Play size={20} />
                        <span>Analisar Vídeo</span>
                      </div>
                    )}
                  </button>

                  <div className="bg-red-50 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Recursos de Análise</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Transcrição automática</li>
                      <li>• Identificação de temas principais</li>
                      <li>• Timestamps para revisão</li>
                      <li>• Sugestões de estudo personalizadas</li>
                    </ul>
                  </div>
                </div>
              )}

              {uploadType === 'camera' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Capture texto de livros, quadros ou documentos:
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-500 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('camera-upload')?.click()}
                    >
                      <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <Camera className="text-purple-600" size={32} />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="camera-upload"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Abrir Câmera</h3>
                      <p className="text-gray-500 mb-4">Tire uma foto do conteúdo que quer estudar</p>
                      <div className="flex justify-center space-x-4 text-xs text-gray-400">
                        <span>• OCR inteligente</span>
                        <span>• Auto-crop</span>
                        <span>• Correção de perspectiva</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Dicas para Melhor Captura</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Boa iluminação natural</li>
                      <li>• Texto bem contrastado</li>
                      <li>• Câmera paralela ao documento</li>
                      <li>• Foco nítido no texto</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Analysis Result */}
              {currentAnalysis && !isProcessing && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-green-800 text-lg">📊 Análise Concluída!</h3>
                    <div className="flex space-x-2">
                      <button className="p-2 text-green-600 hover:text-green-800 rounded-lg transition-colors">
                        <Share2 size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:text-green-800 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-green max-w-none">
                    <div className="text-sm text-green-800 whitespace-pre-wrap leading-relaxed">
                      {currentAnalysis}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-green-200">
                    <button
                      onClick={() => {
                        const newSession = studySessions[0];
                        const quiz = generateQuiz(newSession);
                        setActiveQuiz(quiz);
                        setShowQuizModal(true);
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Fazer Quiz Personalizado
                    </button>
                    <button
                      onClick={() => {
                        setUserProgress(prev => ({
                          ...prev,
                          xp: prev.xp + 75,
                          totalSessions: prev.totalSessions + 1
                        }));
                        const latestSession = studySessions[0];
                        setSessionToSchedule(latestSession);
                        setShowScheduleModal(true);
                        closeUploadModal();
                      }}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Programar Estudos (+75 XP)
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"></div>
                    <Brain className="text-purple-600 animate-pulse" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">IA Processando Conteúdo</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Analisando estrutura, extraindo conceitos e gerando sugestões personalizadas...
                  </p>
                  <div className="flex justify-center space-x-4 text-xs text-gray-500">
                    <span>• Análise semântica</span>
                    <span>• Geração de quiz</span>
                    <span>• Estratégias de estudo</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Quiz Modal */}
      {showQuizModal && activeQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="text-blue-600" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Quiz Personalizado</h2>
                  <p className="text-sm text-gray-500">
                    {activeQuiz.completed ? `Resultado: ${activeQuiz.score}%` : `${activeQuiz.questions.length} questões`}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowQuizModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {!activeQuiz.completed ? (
                <div className="space-y-8">
                  {activeQuiz.questions.map((question, questionIndex) => (
                    <div key={question.id} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-800 mb-4">
                        {questionIndex + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleQuizAnswer(questionIndex, optionIndex)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              activeQuiz.userAnswers[questionIndex] === optionIndex
                                ? 'border-blue-500 bg-blue-50 text-blue-800'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                activeQuiz.userAnswers[questionIndex] === optionIndex
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {activeQuiz.userAnswers[questionIndex] === optionIndex && (
                                  <CheckCircle className="text-white" size={16} />
                                )}
                              </div>
                              <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center">
                    <button
                      onClick={completeQuiz}
                      disabled={activeQuiz.userAnswers.length !== activeQuiz.questions.length}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                      Finalizar Quiz
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="text-green-600" size={32} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Concluído!</h3>
                    <p className="text-lg text-gray-600">Sua pontuação: <span className="font-bold text-green-600">{activeQuiz.score}%</span></p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{activeQuiz.userAnswers.filter((answer, index) => answer === activeQuiz.questions[index].correctAnswer).length}</p>
                      <p className="text-sm text-blue-700">Corretas</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{activeQuiz.questions.length - activeQuiz.userAnswers.filter((answer, index) => answer === activeQuiz.questions[index].correctAnswer).length}</p>
                      <p className="text-sm text-red-700">Erradas</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">+{activeQuiz.score! > 70 ? 100 : 50}</p>
                      <p className="text-sm text-purple-700">XP</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeQuiz.questions.map((question, index) => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4 text-left">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="flex items-center space-x-2 mb-2">
                          {activeQuiz.userAnswers[index] === question.correctAnswer ? (
                            <CheckCircle className="text-green-600" size={16} />
                          ) : (
                            <X className="text-red-600" size={16} />
                          )}
                          <span className={`text-sm ${
                            activeQuiz.userAnswers[index] === question.correctAnswer 
                              ? 'text-green-600' : 'text-red-600'
                          }`}>
                            Sua resposta: {String.fromCharCode(65 + activeQuiz.userAnswers[index])}
                          </span>
                          {activeQuiz.userAnswers[index] !== question.correctAnswer && (
                            <span className="text-sm text-green-600">
                              • Correta: {String.fromCharCode(65 + question.correctAnswer)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{question.explanation}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continuar Estudando
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Study Plan Configuration Modal */}
      {showStudyPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Configurar Plano de Estudos</h2>
                  <p className="text-sm text-gray-500">Personalize sua jornada de aprendizado</p>
                </div>
              </div>
              <button 
                onClick={() => setShowStudyPlanModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Time Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Disponibilidade de Tempo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horas por dia
                    </label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="range"
                        min="0.5"
                        max="8"
                        step="0.5"
                        value={studyPlan.hoursPerDay}
                        onChange={(e) => setStudyPlan(prev => ({ ...prev, hoursPerDay: parseFloat(e.target.value) }))}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-blue-600 min-w-[60px]">
                        {studyPlan.hoursPerDay}h
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Recomendado: 2-4 horas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dias por semana
                    </label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="range"
                        min="1"
                        max="7"
                        step="1"
                        value={studyPlan.daysPerWeek}
                        onChange={(e) => setStudyPlan(prev => ({ ...prev, daysPerWeek: parseInt(e.target.value) }))}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-green-600 min-w-[60px]">
                        {studyPlan.daysPerWeek} dias
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Consistência é mais importante que intensidade</p>
                  </div>
                </div>

                {/* Time Summary */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Resumo do Seu Plano</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {(studyPlan.hoursPerDay * studyPlan.daysPerWeek).toFixed(1)}h
                      </p>
                      <p className="text-sm text-blue-700">Por semana</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(studyPlan.hoursPerDay * studyPlan.daysPerWeek * 4.33)}h
                      </p>
                      <p className="text-sm text-blue-700">Por mês</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(studyPlan.hoursPerDay * studyPlan.daysPerWeek * 52)}h
                      </p>
                      <p className="text-sm text-blue-700">Por ano</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Objetivos de Aprendizado</h3>
                
                <div className="space-y-3">
                  {studyPlan.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Target className="text-orange-600" size={16} />
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => {
                          const newGoals = [...studyPlan.goals];
                          newGoals[index] = e.target.value;
                          setStudyPlan(prev => ({ ...prev, goals: newGoals }));
                        }}
                        className="flex-1 bg-transparent border-none outline-none text-gray-800"
                        placeholder="Digite seu objetivo"
                      />
                      <button
                        onClick={() => {
                          const newGoals = studyPlan.goals.filter((_, i) => i !== index);
                          setStudyPlan(prev => ({ ...prev, goals: newGoals }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      if (studyPlan.goals.length < 5) {
                        setStudyPlan(prev => ({ ...prev, goals: [...prev.goals, ''] }));
                      }
                    }}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    + Adicionar objetivo
                  </button>
                </div>
              </div>

              {/* Subjects Preference */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Áreas de Interesse</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Tecnologia', 'Negócios', 'Educação', 'Ciências', 'Arte & Design',
                    'Idiomas', 'Matemática', 'História', 'Filosofia', 'Psicologia',
                    'Medicina', 'Engenharia'
                  ].map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        const isSelected = studyPlan.subjects.includes(subject);
                        if (isSelected) {
                          setStudyPlan(prev => ({
                            ...prev,
                            subjects: prev.subjects.filter(s => s !== subject)
                          }));
                        } else {
                          setStudyPlan(prev => ({
                            ...prev,
                            subjects: [...prev.subjects, subject]
                          }));
                        }
                      }}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        studyPlan.subjects.includes(subject)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowStudyPlanModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                
                <div className="space-x-3">
                  <button
                    onClick={() => {
                      // Save as draft
                      setShowStudyPlanModal(false);
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Salvar Rascunho
                  </button>
                  
                  <button
                    onClick={() => {
                      // Apply study plan
                      setUserProgress(prev => ({
                        ...prev,
                        studyHours: studyPlan.hoursPerDay * studyPlan.daysPerWeek * 4.33
                      }));
                      setShowStudyPlanModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Aplicar Plano
                  </button>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="text-purple-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-1">Recomendação da IA</h4>
                    <p className="text-sm text-purple-700">
                      Com base no seu perfil, recomendamos {Math.min(Math.max(studyPlan.hoursPerDay, 2), 4)} horas por dia, 
                      focando em sessões de 45-60 minutos com pausas de 15 minutos. 
                      Seus interesses em {studyPlan.subjects.slice(0, 2).join(' e ')} sugerem 
                      uma abordagem prática com análise de casos reais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initial Study Setup Modal */}
      {showInitialSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Lightbulb className="text-white" size={32} />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao EduVibe!</h2>
              <p className="text-gray-600 mb-8">Vamos configurar seu plano de estudos personalizado</p>

              <div className="space-y-6 text-left">
                {/* Study Topic */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    O que você quer estudar?
                  </label>
                  <input
                    type="text"
                    value={initialSetup.studyTopic}
                    onChange={(e) => setInitialSetup(prev => ({ ...prev, studyTopic: e.target.value }))}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Ex: Programação Python, Marketing Digital, Inglês..."
                  />
                </div>

                {/* Time Frame */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Em quanto tempo você quer dominar este assunto?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { days: 15, label: '2 semanas', desc: 'Introdução rápida' },
                      { days: 30, label: '1 mês', desc: 'Fundamentos sólidos' },
                      { days: 90, label: '3 meses', desc: 'Domínio completo' }
                    ].map((option) => (
                      <button
                        key={option.days}
                        onClick={() => setInitialSetup(prev => ({ ...prev, timeFrame: option.days }))}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          initialSetup.timeFrame === option.days
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold text-lg">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daily Time */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Quantas horas por dia você pode estudar?
                  </label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range"
                      min="0.5"
                      max="6"
                      step="0.5"
                      value={initialSetup.dailyTime}
                      onChange={(e) => setInitialSetup(prev => ({ ...prev, dailyTime: parseFloat(e.target.value) }))}
                      className="flex-1"
                    />
                    <div className="text-2xl font-bold text-blue-600 min-w-[80px]">
                      {initialSetup.dailyTime}h/dia
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Total: <strong>{Math.round(initialSetup.timeFrame * initialSetup.dailyTime)}h</strong> de estudo
                  </div>
                </div>

                {/* Current Level */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Qual seu nível atual neste assunto?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'beginner', label: 'Iniciante', desc: 'Nunca estudei' },
                      { id: 'intermediate', label: 'Intermediário', desc: 'Conheço o básico' },
                      { id: 'advanced', label: 'Avançado', desc: 'Quero aprofundar' }
                    ].map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setInitialSetup(prev => ({ ...prev, currentLevel: level.id }))}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          initialSetup.currentLevel === level.id
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-xs text-gray-600">{level.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Study Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Qual é seu objetivo principal?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'general', label: 'Conhecimento Geral', desc: 'Aprender por curiosidade' },
                      { id: 'exam', label: 'Prova/Concurso', desc: 'Preciso passar em um teste' },
                      { id: 'project', label: 'Projeto Específico', desc: 'Aplicar em um trabalho' },
                      { id: 'skill', label: 'Nova Habilidade', desc: 'Desenvolver competência' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setInitialSetup(prev => ({ ...prev, studyType: type.id }))}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          initialSetup.studyType === type.id
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-xs text-gray-600">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowInitialSetup(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Pular por agora
                </button>
                
                <button
                  onClick={() => {
                    setShowInitialSetup(false);
                    // Apply initial setup to study plan
                    setStudyPlan(prev => ({
                      ...prev,
                      hoursPerDay: initialSetup.dailyTime,
                      goals: [initialSetup.studyTopic],
                      subjects: [initialSetup.studyTopic]
                    }));
                  }}
                  disabled={!initialSetup.studyTopic.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  Criar Meu Plano
                </button>
              </div>

              {/* AI Preview */}
              {initialSetup.studyTopic && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Brain className="text-blue-600" size={16} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-blue-800 mb-1">Preview do seu plano:</h4>
                      <p className="text-sm text-blue-700">
                        <strong>{initialSetup.studyTopic}</strong> em {initialSetup.timeFrame} dias, 
                        estudando {initialSetup.dailyTime}h por dia. 
                        Nível {initialSetup.currentLevel === 'beginner' ? 'iniciante' : initialSetup.currentLevel === 'intermediate' ? 'intermediário' : 'avançado'} 
                        para {initialSetup.studyType === 'general' ? 'conhecimento geral' : 
                        initialSetup.studyType === 'exam' ? 'aprovação em prova' :
                        initialSetup.studyType === 'project' ? 'aplicação em projeto' : 'desenvolvimento de habilidade'}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Study Schedule Modal */}
      {showScheduleModal && sessionToSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Programar Estudos</h2>
                  <p className="text-sm text-gray-500">"{sessionToSchedule.title}"</p>
                </div>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Content Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Conteúdo para Estudar</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    sessionToSchedule.type === 'text' ? 'bg-orange-100' :
                    sessionToSchedule.type === 'pdf' ? 'bg-blue-100' :
                    sessionToSchedule.type === 'youtube' ? 'bg-red-100' :
                    'bg-purple-100'
                  }`}>
                    {sessionToSchedule.type === 'text' && <FileText className="text-orange-600" size={16} />}
                    {sessionToSchedule.type === 'pdf' && <Upload className="text-blue-600" size={16} />}
                    {sessionToSchedule.type === 'youtube' && <Youtube className="text-red-600" size={16} />}
                    {sessionToSchedule.type === 'camera' && <Camera className="text-purple-600" size={16} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{sessionToSchedule.title}</p>
                    <p className="text-sm text-gray-600">Duração estimada: {sessionToSchedule.duration} min</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sessionToSchedule.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Como você quer estudar este conteúdo?</h3>
                
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quando começar?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Hoje', date: new Date() },
                      { label: 'Amanhã', date: new Date(Date.now() + 86400000) },
                      { label: 'Segunda-feira', date: (() => {
                        const date = new Date();
                        const day = date.getDay();
                        const diff = day === 0 ? 1 : (8 - day);
                        return new Date(date.getTime() + diff * 86400000);
                      })() }
                    ].map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setScheduleConfig(prev => ({ ...prev, startDate: option.date }))}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          scheduleConfig.startDate.toDateString() === option.date.toDateString()
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-xs text-gray-600">
                          {option.date.toLocaleDateString('pt-BR')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sessions per Week */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantas vezes por semana?
                  </label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={scheduleConfig.sessionsPerWeek}
                      onChange={(e) => setScheduleConfig(prev => ({ ...prev, sessionsPerWeek: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <div className="text-xl font-bold text-green-600 min-w-[100px]">
                      {scheduleConfig.sessionsPerWeek}x por semana
                    </div>
                  </div>
                </div>

                {/* Session Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duração de cada sessão
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[30, 45, 60, 90].map((minutes) => (
                      <button
                        key={minutes}
                        onClick={() => setScheduleConfig(prev => ({ ...prev, sessionDuration: minutes }))}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          scheduleConfig.sessionDuration === minutes
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold">{minutes}min</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Study Days */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dias da semana preferidos
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { id: 'sunday', label: 'Dom' },
                      { id: 'monday', label: 'Seg' },
                      { id: 'tuesday', label: 'Ter' },
                      { id: 'wednesday', label: 'Qua' },
                      { id: 'thursday', label: 'Qui' },
                      { id: 'friday', label: 'Sex' },
                      { id: 'saturday', label: 'Sáb' }
                    ].map((day) => (
                      <button
                        key={day.id}
                        onClick={() => {
                          const isSelected = scheduleConfig.studyDays.includes(day.id);
                          if (isSelected && scheduleConfig.studyDays.length > 1) {
                            setScheduleConfig(prev => ({
                              ...prev,
                              studyDays: prev.studyDays.filter(d => d !== day.id)
                            }));
                          } else if (!isSelected && scheduleConfig.studyDays.length < scheduleConfig.sessionsPerWeek) {
                            setScheduleConfig(prev => ({
                              ...prev,
                              studyDays: [...prev.studyDays, day.id]
                            }));
                          }
                        }}
                        className={`p-2 rounded-lg border-2 text-center transition-all ${
                          scheduleConfig.studyDays.includes(day.id)
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-semibold">{day.label}</div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Selecione {scheduleConfig.sessionsPerWeek} dias
                  </p>
                </div>

                {/* Reminder */}
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-yellow-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800">Lembretes</h4>
                      <p className="text-sm text-yellow-700">Receber notificações para não esquecer</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setScheduleConfig(prev => ({ ...prev, reminderEnabled: !prev.reminderEnabled }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      scheduleConfig.reminderEnabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                      scheduleConfig.reminderEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>

              {/* Schedule Preview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Resumo da Programação</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>📅 <strong>Início:</strong> {scheduleConfig.startDate.toLocaleDateString('pt-BR')}</p>
                  <p>⏰ <strong>Frequência:</strong> {scheduleConfig.sessionsPerWeek}x por semana, {scheduleConfig.sessionDuration} min cada</p>
                  <p>📚 <strong>Total:</strong> {Math.ceil(sessionToSchedule.duration / scheduleConfig.sessionDuration)} sessões necessárias</p>
                  <p>🗓️ <strong>Dias:</strong> {scheduleConfig.studyDays.map(d => 
                    ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][
                      ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(d)
                    ]
                  ).join(', ')}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                
                <button
                  onClick={() => {
                    // Save schedule
                    setUserProgress(prev => ({
                      ...prev,
                      xp: prev.xp + 25
                    }));
                    setShowScheduleModal(false);
                    setSessionToSchedule(null);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  Programar Estudos (+25 XP)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EduVibeV2Complete;