import { useState, useEffect } from 'react';
import { Book, Play, Upload, Camera, Brain, TrendingUp, Users, Star, Clock, Award, ChevronRight, BarChart3 } from 'lucide-react';

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

  // Simulação do Replit Auth
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({ name: 'Maria Silva', email: 'maria@exemplo.com' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
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
              <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <Upload className="mx-auto mb-2 text-blue-600" size={24} />
                <span className="text-sm font-medium text-blue-600">Upload PDF</span>
              </button>
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <Play className="mx-auto mb-2 text-green-600" size={24} />
                <span className="text-sm font-medium text-green-600">YouTube</span>
              </button>
              <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <Camera className="mx-auto mb-2 text-purple-600" size={24} />
                <span className="text-sm font-medium text-purple-600">Câmera</span>
              </button>
              <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                <Book className="mx-auto mb-2 text-orange-600" size={24} />
                <span className="text-sm font-medium text-orange-600">Texto</span>
              </button>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
      </main>
    </div>
  );
};

export default EduVibeV2;