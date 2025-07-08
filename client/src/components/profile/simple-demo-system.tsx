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
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

// Sistema simples que não trava
export default function SimpleDemoSystem() {
  const [isDemo, setIsDemo] = useState(true);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [status, setStatus] = useState('ready');
  const { toast } = useToast();

  useEffect(() => {
    // Verifica se já existe um perfil salvo
    try {
      const saved = localStorage.getItem('simple-flow-profile');
      if (saved) {
        const profile = JSON.parse(saved);
        setUserProfile(profile);
        setIsDemo(false);
      }
    } catch (e) {
      console.log('Nenhum perfil salvo encontrado');
    }
  }, []);

  const createProfile = () => {
    if (!userName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite seu nome para criar o perfil",
        variant: "destructive"
      });
      return;
    }

    setStatus('creating');

    try {
      // Cria perfil zerado
      const newProfile = {
        id: Date.now(),
        name: userName.trim(),
        balance: 0,
        achievements: 0,
        level: 1,
        courses: 0,
        createdAt: new Date().toISOString()
      };

      // Salva no localStorage
      localStorage.setItem('simple-flow-profile', JSON.stringify(newProfile));
      
      setUserProfile(newProfile);
      setIsDemo(false);
      setUserName('');
      setStatus('ready');

      toast({
        title: "Perfil criado!",
        description: `Bem-vindo, ${newProfile.name}! Seus dados começam zerados.`,
      });

    } catch (error) {
      setStatus('error');
      toast({
        title: "Erro ao criar perfil",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const resetToDemo = () => {
    try {
      localStorage.removeItem('simple-flow-profile');
      setUserProfile(null);
      setIsDemo(true);
      setStatus('ready');
      
      toast({
        title: "Demo reativada",
        description: "Voltando ao modo demonstração",
      });
    } catch (error) {
      console.log('Erro ao resetar:', error);
    }
  };

  // Dados da demo
  const demoData = {
    name: "Demonstração",
    balance: 2450.75,
    achievements: 3,
    level: 2,
    courses: 2,
    aiMessage: "IA sugeriu economia de R$ 150/mês"
  };

  const demoAchievements = [
    { name: "Primeiro Login", icon: "🎯", color: "bg-blue-50 border-blue-200" },
    { name: "Meta Criada", icon: "💰", color: "bg-green-50 border-green-200" },
    { name: "IA Ativada", icon: "🤖", color: "bg-purple-50 border-purple-200" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center">
            {isDemo ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                Demonstração Flow Ecosystem
              </>
            ) : (
              <>
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Perfil de {userProfile?.name}
              </>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          
          {/* Perfil Atual */}
          <div className={`p-4 rounded-lg border-2 ${
            isDemo 
              ? 'bg-purple-50 border-purple-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">
                  {isDemo ? demoData.name : userProfile?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {isDemo ? 'Modo Demonstração' : 'Usuário Real'} • 
                  Level {isDemo ? demoData.level : userProfile?.level}
                </p>
              </div>
              <Badge variant={isDemo ? "secondary" : "default"}>
                {isDemo ? 'DEMO' : 'REAL'}
              </Badge>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded border">
                <div className="text-lg font-bold text-green-600">
                  R$ {isDemo ? demoData.balance.toFixed(2) : userProfile?.balance?.toFixed(2) || '0.00'}
                </div>
                <div className="text-xs text-gray-500">Balance</div>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="text-lg font-bold text-yellow-600">
                  {isDemo ? demoData.achievements : userProfile?.achievements || 0}
                </div>
                <div className="text-xs text-gray-500">Conquistas</div>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="text-lg font-bold text-blue-600">
                  {isDemo ? demoData.courses : userProfile?.courses || 0}
                </div>
                <div className="text-xs text-gray-500">Cursos</div>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="text-lg font-bold text-purple-600">
                  {isDemo ? demoData.level : userProfile?.level || 1}
                </div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
            </div>
          </div>

          {/* Demo Achievements */}
          {isDemo && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                Conquistas Desbloqueadas:
              </h4>
              <div className="grid gap-2">
                {demoAchievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center p-3 rounded border ${achievement.color}`}>
                    <span className="text-xl mr-3">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.name}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-600" />
                  <div className="text-sm text-blue-800">{demoData.aiMessage}</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t pt-4">
            {isDemo ? (
              <div className="text-center space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <p className="text-sm text-yellow-800 mb-3">
                    Esta é uma demonstração. Para começar a usar com seus dados reais, crie sua conta.
                  </p>
                  
                  <div className="flex gap-3 max-w-md mx-auto">
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Seu nome..."
                      onKeyPress={(e) => e.key === 'Enter' && createProfile()}
                    />
                    <Button 
                      onClick={createProfile}
                      disabled={status === 'creating' || !userName.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Criar
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Perfil novo começa zerado: R$ 0, 0 conquistas, level 1
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-green-800 mb-3">
                    Perfil real ativo! Seus dados são únicos e salvos.
                  </p>
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
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}