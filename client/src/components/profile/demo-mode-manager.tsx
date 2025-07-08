import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  UserPlus,
  Star,
  Trophy,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

// Interface para perfil de usuário
interface UserProfile {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  isDemo: boolean;
  userData: {
    totalBalance: number;
    monthlyGoals: number;
    completedCourses: number;
    purposeClarity: number;
    kidsProgress: number;
    achievements: number;
    level: number;
    xp: number;
    lastAiInteraction?: string;
  };
  device: string;
}

// Dados de demonstração atraentes
const DEMO_PROFILE: UserProfile = {
  id: 'demo_profile',
  name: 'Demonstração',
  createdAt: new Date().toISOString(),
  isDemo: true,
  userData: {
    totalBalance: 2450.75,
    monthlyGoals: 3,
    completedCourses: 2,
    purposeClarity: 65,
    kidsProgress: 40,
    achievements: 3,
    level: 2,
    xp: 340,
    lastAiInteraction: 'IA sugeriu economia de R$ 150/mês com mudança de plano'
  },
  device: 'demo'
};

// Storage que gerencia demo vs usuário real
const ProfileManager = {
  key: 'flow-profile-system-v1',
  
  save: (profile: UserProfile): boolean => {
    try {
      const data = JSON.stringify(profile);
      
      // Tenta localStorage primeiro
      localStorage.setItem(ProfileManager.key, data);
      
      // Backup em sessionStorage
      sessionStorage.setItem(ProfileManager.key + '_backup', data);
      
      console.log('💾 Perfil salvo:', profile.name, profile.isDemo ? '(DEMO)' : '(REAL)');
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar perfil:', error);
      return false;
    }
  },
  
  load: (): UserProfile | null => {
    try {
      // Tenta localStorage
      const data = localStorage.getItem(ProfileManager.key);
      if (data) {
        const profile = JSON.parse(data);
        console.log('📁 Perfil carregado:', profile.name, profile.isDemo ? '(DEMO)' : '(REAL)');
        return profile;
      }
      
      // Tenta sessionStorage backup
      const backup = sessionStorage.getItem(ProfileManager.key + '_backup');
      if (backup) {
        const profile = JSON.parse(backup);
        console.log('📁 Perfil recuperado do backup:', profile.name);
        return profile;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Erro ao carregar perfil:', error);
      return null;
    }
  },
  
  isFirstVisit: (): boolean => {
    return !localStorage.getItem(ProfileManager.key) && !sessionStorage.getItem(ProfileManager.key + '_backup');
  }
};

export default function DemoModeManager() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeProfile();
  }, []);

  const initializeProfile = () => {
    const existingProfile = ProfileManager.load();
    
    if (existingProfile) {
      setCurrentProfile(existingProfile);
      console.log('🔄 Perfil existente carregado');
    } else if (ProfileManager.isFirstVisit()) {
      // Primeira visita - mostra demo
      setCurrentProfile(DEMO_PROFILE);
      console.log('🎭 Modo demo ativado para primeira visita');
    } else {
      setCurrentProfile(null);
    }
  };

  const createRealUser = async () => {
    if (!newUserName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite seu nome para criar o perfil",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingUser(true);

    try {
      // Cria perfil real completamente zerado
      const realProfile: UserProfile = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: newUserName.trim(),
        createdAt: new Date().toISOString(),
        isDemo: false,
        userData: {
          totalBalance: 0,        // Começa zerado
          monthlyGoals: 0,        // Começa zerado
          completedCourses: 0,    // Começa zerado
          purposeClarity: 0,      // Começa zerado
          kidsProgress: 0,        // Começa zerado
          achievements: 0,        // Começa zerado
          level: 1,               // Level inicial
          xp: 0                   // XP zerado
        },
        device: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      };

      if (ProfileManager.save(realProfile)) {
        setCurrentProfile(realProfile);
        setNewUserName('');
        setShowCreateForm(false);
        
        toast({
          title: "Perfil criado com sucesso!",
          description: `Bem-vindo(a), ${realProfile.name}! Seus dados começam zerados.`,
        });
        
        console.log('✅ Usuário real criado:', realProfile);
      } else {
        throw new Error('Falha ao salvar perfil');
      }
      
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error);
      toast({
        title: "Erro ao criar perfil",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  const resetToDemo = () => {
    localStorage.removeItem(ProfileManager.key);
    sessionStorage.removeItem(ProfileManager.key + '_backup');
    setCurrentProfile(DEMO_PROFILE);
    setShowCreateForm(false);
    
    toast({
      title: "Demo reativada",
      description: "Voltando ao modo demonstração",
    });
  };

  const getDemoAchievements = () => [
    { name: "Primeiro Login", icon: "🎯", description: "Bem-vindo ao Flow!" },
    { name: "Meta Criada", icon: "💰", description: "Primeira meta financeira definida" },
    { name: "IA Ativada", icon: "🤖", description: "Primeira interação com assistente" }
  ];

  if (!currentProfile) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>Carregando perfil...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          {currentProfile.isDemo ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Demonstração do Flow Ecosystem
            </>
          ) : (
            <>
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Perfil de {currentProfile.name}
            </>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        
        {/* Status do Perfil Atual */}
        <div className={`p-4 rounded-lg border-2 ${
          currentProfile.isDemo 
            ? 'bg-purple-50 border-purple-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{currentProfile.name}</h3>
              <p className="text-sm text-gray-600">
                {currentProfile.isDemo ? 'Modo Demonstração' : 'Usuário Real'} • 
                Level {currentProfile.userData.level} • 
                {currentProfile.userData.xp} XP
              </p>
            </div>
            <Badge variant={currentProfile.isDemo ? "secondary" : "default"}>
              {currentProfile.isDemo ? 'DEMO' : 'REAL'}
            </Badge>
          </div>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-2 bg-white rounded">
              <div className="font-semibold">R$ {currentProfile.userData.totalBalance.toFixed(2)}</div>
              <div className="text-xs text-gray-500">Balance</div>
            </div>
            <div className="p-2 bg-white rounded">
              <div className="font-semibold">{currentProfile.userData.achievements}</div>
              <div className="text-xs text-gray-500">Conquistas</div>
            </div>
            <div className="p-2 bg-white rounded">
              <div className="font-semibold">{currentProfile.userData.completedCourses}</div>
              <div className="text-xs text-gray-500">Cursos</div>
            </div>
            <div className="p-2 bg-white rounded">
              <div className="font-semibold">{currentProfile.userData.purposeClarity}%</div>
              <div className="text-xs text-gray-500">Propósito</div>
            </div>
          </div>
          
          {/* Demonstração das Conquistas (só no modo demo) */}
          {currentProfile.isDemo && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                Conquistas Desbloqueadas:
              </h4>
              <div className="grid gap-2">
                {getDemoAchievements().map((achievement, index) => (
                  <div key={index} className="flex items-center p-2 bg-white rounded border">
                    <span className="text-lg mr-2">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
              
              {currentProfile.userData.lastAiInteraction && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                  <div className="text-xs font-medium text-blue-700">Última interação com IA:</div>
                  <div className="text-sm text-blue-800">{currentProfile.userData.lastAiInteraction}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ações */}
        {currentProfile.isDemo ? (
          <div className="space-y-4">
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-sm text-yellow-800 mb-3">
                Esta é uma demonstração com dados de exemplo. 
                Para começar a usar com seus dados reais, crie sua conta.
              </p>
              
              {!showCreateForm ? (
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar Minha Conta Real
                </Button>
              ) : (
                <div className="space-y-3">
                  <Input
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Digite seu nome..."
                    onKeyPress={(e) => e.key === 'Enter' && createRealUser()}
                  />
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={createRealUser}
                      disabled={isCreatingUser || !newUserName.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isCreatingUser ? (
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <ArrowRight className="w-4 h-4 mr-2" />
                      )}
                      Criar Perfil Zerado
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Seu perfil começará zerado: R$ 0, 0 conquistas, level 1
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-green-800 mb-3">
              Perfil real ativo! Todos os seus dados são salvos e únicos.
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={resetToDemo}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ver Demo Novamente
              </Button>
            </div>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
}