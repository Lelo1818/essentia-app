import { useState, useEffect } from 'react';
import { Book, Play, Upload, Camera, Brain, TrendingUp, Users, Star, Clock, Award, ChevronRight, BarChart3, FileText, Youtube, X } from 'lucide-react';

interface StudySession {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'text' | 'pdf' | 'camera';
  score?: number;
  completed: boolean;
}

interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  totalSessions: number;
  averageScore: number;
}

const EduVibeV2 = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 12,
    xp: 2847,
    streak: 7,
    totalSessions: 45,
    averageScore: 87
  });

  const [recentSessions] = useState<StudySession[]>([
    {
      id: '1',
      title: 'Metodologias Ativas de Ensino',
      duration: 25,
      type: 'video',
      score: 92,
      completed: true
    },
    {
      id: '2', 
      title: 'Gestão Financeira Empresarial',
      duration: 18,
      type: 'pdf',
      score: 85,
      completed: true
    },
    {
      id: '3',
      title: 'Neurociência e Tecnologia',
      duration: 22,
      type: 'camera',
      score: 89,
      completed: true
    }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'text' | 'pdf' | 'youtube' | 'camera' | null>(null);
  const [textInput, setTextInput] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');

  // Simulação do Replit Auth
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({ name: 'Maria Silva', email: 'maria@exemplo.com' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const openUploadModal = (type: 'text' | 'pdf' | 'youtube' | 'camera') => {
    setUploadType(type);
    setShowUploadModal(true);
    setTextInput('');
    setYoutubeUrl('');
    setAnalysisResult('');
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setUploadType(null);
    setIsProcessing(false);
  };

  const processContent = async () => {
    setIsProcessing(true);
    
    // Simulação de processamento com AI
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let mockAnalysis = '';
    if (uploadType === 'text') {
      mockAnalysis = `📝 **Análise de Texto Concluída**

**Resumo:**
O conteúdo aborda conceitos fundamentais sobre ${textInput.substring(0, 50)}...

**Sugestões de Estudo:**
1. Revisar os conceitos principais identificados
2. Praticar com exercícios relacionados
3. Conectar com conhecimentos prévios
4. Criar mapas mentais do conteúdo
5. Discutir em grupos de estudo

**Exercícios Práticos:**
1. Questão conceitual sobre o tema principal
2. Exercício de aplicação prática
3. Análise crítica do conteúdo
4. Comparação com outras fontes
5. Síntese pessoal do aprendizado`;
    } else if (uploadType === 'youtube') {
      mockAnalysis = `🎥 **Análise de Vídeo YouTube**

**URL:** ${youtubeUrl}

**Resumo:**
Vídeo educacional identificado com conteúdo relevante para aprendizado.

**Pontos Principais:**
1. Introdução ao tema
2. Conceitos fundamentais
3. Exemplos práticos
4. Conclusões importantes

**Sugestões de Estudo:**
1. Assistir novamente fazendo anotações
2. Pausar em pontos importantes
3. Pesquisar termos desconhecidos
4. Praticar os exemplos mostrados
5. Buscar conteúdos complementares`;
    } else if (uploadType === 'pdf') {
      mockAnalysis = `📄 **Análise de PDF Concluída**

**Resumo:**
Documento processado com sucesso. Conteúdo educacional identificado.

**Estrutura Identificada:**
- Seções principais
- Conceitos chave
- Exemplos práticos
- Exercícios propostos

**Recomendações:**
1. Leitura ativa com marcações
2. Resumo de cada seção
3. Criação de flashcards
4. Resolução dos exercícios
5. Revisão espaçada`;
    } else if (uploadType === 'camera') {
      mockAnalysis = `📸 **Análise de Imagem Concluída**

**Conteúdo Detectado:**
Texto educacional capturado pela câmera processado com sucesso.

**Elementos Identificados:**
- Texto principal
- Diagramas ou ilustrações
- Fórmulas ou conceitos
- Estrutura do conteúdo

**Próximos Passos:**
1. Revisar o conteúdo transcrito
2. Organizar as informações
3. Criar resumos estruturados
4. Praticar conceitos identificados
5. Buscar fontes complementares`;
    }

    setAnalysisResult(mockAnalysis);
    setIsProcessing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processContent();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Brain className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">EduVibe v2</h1>
            <p className="text-gray-600">Aprendizado inteligente com Replit Auth</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Award className="text-blue-500" size={16} />
              <span>Sistema de conquistas gamificado</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="text-green-500" size={16} />
              <span>Analytics em tempo real</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Users className="text-purple-500" size={16} />
              <span>Autenticação segura</span>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Entrar com Replit Auth
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            Usando o novo sistema de autenticação do Replit
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">EduVibe v2</h1>
              <p className="text-xs text-gray-500">Powered by Replit Auth</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'study', label: 'Estudar', icon: Book },
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

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Nível</p>
                    <p className="text-2xl font-bold text-blue-600">{userProgress.level}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Star className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">XP Total</p>
                    <p className="text-2xl font-bold text-green-600">{userProgress.xp}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sequência</p>
                    <p className="text-2xl font-bold text-orange-600">{userProgress.streak} dias</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Nota Média</p>
                    <p className="text-2xl font-bold text-purple-600">{userProgress.averageScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Sessões Recentes</h2>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {session.type === 'video' && <Play className="text-blue-600" size={16} />}
                        {session.type === 'pdf' && <Upload className="text-blue-600" size={16} />}
                        {session.type === 'camera' && <Camera className="text-blue-600" size={16} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{session.title}</h3>
                        <p className="text-sm text-gray-600">{session.duration} min • Nota: {session.score}%</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* New Features Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Novidades do Replit v2</h3>
                  <p className="text-blue-100 mb-4">
                    Agora com autenticação integrada, banco de dados 40x mais rápido e armazenamento de arquivos
                  </p>
                  <div className="flex space-x-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">Replit Auth</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">Neon DB Otimizado</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">Object Storage</span>
                  </div>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="text-white" size={32} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <Brain className="mx-auto mb-4 text-blue-500" size={48} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Módulo de Estudos v2</h2>
            <p className="text-gray-600 mb-6">
              Agora com Object Storage para upload de arquivos e processamento de IA mais rápido
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => openUploadModal('text')}
                className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <FileText className="mx-auto mb-2 text-orange-600" size={24} />
                <span className="text-sm font-medium text-orange-600">Texto</span>
              </button>
              <button 
                onClick={() => openUploadModal('pdf')}
                className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Upload className="mx-auto mb-2 text-blue-600" size={24} />
                <span className="text-sm font-medium text-blue-600">Upload PDF</span>
              </button>
              <button 
                onClick={() => openUploadModal('youtube')}
                className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <Youtube className="mx-auto mb-2 text-red-600" size={24} />
                <span className="text-sm font-medium text-red-600">YouTube</span>
              </button>
              <button 
                onClick={() => openUploadModal('camera')}
                className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <Camera className="mx-auto mb-2 text-purple-600" size={24} />
                <span className="text-sm font-medium text-purple-600">Câmera</span>
              </button>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {uploadType === 'text' && '📝 Analisar Texto'}
                {uploadType === 'pdf' && '📄 Upload PDF'}
                {uploadType === 'youtube' && '🎥 Analisar YouTube'}
                {uploadType === 'camera' && '📸 Capturar com Câmera'}
              </h2>
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
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Cole ou digite seu texto para análise:
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cole seu texto aqui..."
                  />
                  <button
                    onClick={processContent}
                    disabled={!textInput.trim() || isProcessing}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? 'Analisando...' : 'Analisar Texto'}
                  </button>
                </div>
              )}

              {uploadType === 'pdf' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Selecione um arquivo PDF:
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto mb-4 text-gray-400" size={32} />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clique para selecionar um PDF
                    </label>
                    <p className="text-sm text-gray-500 mt-2">ou arraste e solte aqui</p>
                  </div>
                </div>
              )}

              {uploadType === 'youtube' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Cole a URL do vídeo do YouTube:
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  <button
                    onClick={processContent}
                    disabled={!youtubeUrl.trim() || isProcessing}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? 'Analisando...' : 'Analisar Vídeo'}
                  </button>
                </div>
              )}

              {uploadType === 'camera' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Use a câmera para capturar texto de livros, quadros ou documentos:
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                    <Camera className="mx-auto mb-4 text-gray-400" size={32} />
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="camera-upload"
                    />
                    <label
                      htmlFor="camera-upload"
                      className="cursor-pointer text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Abrir Câmera
                    </label>
                    <p className="text-sm text-gray-500 mt-2">Tire uma foto do conteúdo</p>
                  </div>
                </div>
              )}

              {/* Analysis Result */}
              {analysisResult && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Análise Completa!</h3>
                  <div className="text-sm text-green-700 whitespace-pre-wrap">
                    {analysisResult}
                  </div>
                  <button
                    onClick={() => {
                      setUserProgress(prev => ({
                        ...prev,
                        xp: prev.xp + 50,
                        totalSessions: prev.totalSessions + 1
                      }));
                      closeUploadModal();
                    }}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Salvar Análise (+50 XP)
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="animate-spin mx-auto mb-2 w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <p className="text-sm text-blue-700">Processando conteúdo com IA...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EduVibeV2;