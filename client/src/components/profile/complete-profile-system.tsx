import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  User, 
  Download, 
  Upload,
  Trash2,
  RefreshCw,
  UserPlus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Interface para perfil completo
interface UserProfile {
  id: string;
  name: string;
  createdAt: string;
  userData: {
    totalBalance: number;
    monthlyGoals: number;
    completedCourses: number;
    purposeClarity: number;
    kidsProgress: number;
    achievements: number;
    level: number;
    xp: number;
  };
  device: string;
  version: string;
}

// Sistema de storage robusto que funciona em mobile
const ProfileStorage = {
  key: 'flow-user-profiles-v3',
  
  save: (profiles: UserProfile[]): boolean => {
    try {
      const data = JSON.stringify(profiles);
      console.log('💾 Salvando profiles:', profiles.length);
      
      // Múltiplas tentativas de salvamento
      const methods = [
        () => { localStorage.setItem(ProfileStorage.key, data); return 'localStorage'; },
        () => { sessionStorage.setItem(ProfileStorage.key + '_session', data); return 'sessionStorage'; },
        () => { 
          // Método cookie para mobile extremo
          const compressed = btoa(data);
          document.cookie = `${ProfileStorage.key}=${compressed}; path=/; max-age=2592000`; // 30 dias
          return 'cookies'; 
        }
      ];
      
      for (const method of methods) {
        try {
          const methodName = method();
          console.log(`✅ Salvo via ${methodName}`);
          return true;
        } catch (error) {
          console.log(`❌ Falhou via método:`, error);
          continue;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Erro total no save:', error);
      return false;
    }
  },
  
  load: (): UserProfile[] => {
    try {
      // Tenta localStorage
      const local = localStorage.getItem(ProfileStorage.key);
      if (local) {
        console.log('📁 Carregado do localStorage');
        return JSON.parse(local);
      }
      
      // Tenta sessionStorage
      const session = sessionStorage.getItem(ProfileStorage.key + '_session');
      if (session) {
        console.log('📁 Carregado do sessionStorage');
        return JSON.parse(session);
      }
      
      // Tenta cookies
      const cookies = document.cookie.split(';');
      const found = cookies.find(c => c.trim().startsWith(`${ProfileStorage.key}=`));
      if (found) {
        const compressed = found.split('=')[1];
        const data = atob(compressed);
        console.log('📁 Carregado dos cookies');
        return JSON.parse(data);
      }
      
      console.log('📁 Nenhum perfil encontrado');
      return [];
    } catch (error) {
      console.error('❌ Erro ao carregar:', error);
      return [];
    }
  }
};

export default function CompleteProfileSystem() {
  const [profileName, setProfileName] = useState('');
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = ProfileStorage.load();
    setProfiles(savedProfiles);
    console.log('📋 Perfis carregados:', savedProfiles.length);
  };

  const createNewProfile = async () => {
    if (!profileName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite um nome para o novo perfil",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    try {
      // Cria perfil completamente novo e zerado
      const newProfile: UserProfile = {
        id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: profileName.trim(),
        createdAt: new Date().toISOString(),
        userData: {
          totalBalance: 0, // Começa zerado
          monthlyGoals: 0,
          completedCourses: 0,
          purposeClarity: 0,
          kidsProgress: 0,
          achievements: 0,
          level: 1,
          xp: 0
        },
        device: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        version: '3.0'
      };

      const updatedProfiles = [...profiles, newProfile];
      
      if (ProfileStorage.save(updatedProfiles)) {
        setProfiles(updatedProfiles);
        setSelectedProfile(newProfile);
        setProfileName('');
        
        console.log('✅ Perfil criado:', newProfile);
        
        toast({
          title: "Perfil criado com sucesso!",
          description: `"${newProfile.name}" está pronto para uso`,
        });
      } else {
        throw new Error('Falha ao salvar perfil');
      }
      
    } catch (error) {
      console.error('❌ Erro ao criar perfil:', error);
      toast({
        title: "Erro ao criar perfil",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const selectProfile = (profile: UserProfile) => {
    setSelectedProfile(profile);
    console.log('👤 Perfil selecionado:', profile.name);
    
    toast({
      title: "Perfil ativado",
      description: `Usando perfil "${profile.name}"`,
    });
  };

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    
    if (ProfileStorage.save(updatedProfiles)) {
      setProfiles(updatedProfiles);
      
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(null);
      }
      
      toast({
        title: "Perfil removido",
        description: "Perfil deletado com sucesso",
      });
    }
  };

  const exportProfiles = () => {
    try {
      const dataStr = JSON.stringify(profiles, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `flow-profiles-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Perfis exportados",
        description: "Arquivo de backup baixado",
      });
    } catch (error) {
      console.error('❌ Erro no export:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Sistema de Perfis de Usuário
        </CardTitle>
        <div className="text-sm text-gray-600">
          Crie perfis únicos e zerados para cada usuário
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Perfil Ativo */}
        {selectedProfile && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Perfil Ativo: {selectedProfile.name}
                </h3>
                <p className="text-sm text-green-600">
                  Criado em {new Date(selectedProfile.createdAt).toLocaleDateString()} • 
                  Device: {selectedProfile.device}
                </p>
              </div>
              <Badge variant="outline" className="bg-green-100">
                Level {selectedProfile.userData.level}
              </Badge>
            </div>
          </div>
        )}

        {/* Criar Novo Perfil */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Criar Novo Perfil
          </h3>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Nome do novo perfil..."
                onKeyPress={(e) => e.key === 'Enter' && createNewProfile()}
              />
            </div>
            <Button 
              onClick={createNewProfile}
              disabled={isCreating || !profileName.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isCreating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Cada perfil novo começa zerado (balance: R$ 0, cursos: 0, etc.)
          </p>
        </div>

        {/* Lista de Perfis */}
        {profiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Perfis Salvos ({profiles.length})</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={loadProfiles}>
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Recarregar
                </Button>
                <Button size="sm" variant="outline" onClick={exportProfiles}>
                  <Download className="w-3 h-3 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>
            
            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {profiles.map((profile) => (
                <div 
                  key={profile.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedProfile?.id === profile.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => selectProfile(profile)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-xs text-gray-500">
                        Balance: R$ {profile.userData.totalBalance.toFixed(2)} • 
                        Level: {profile.userData.level} • 
                        XP: {profile.userData.xp}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(profile.createdAt).toLocaleString()} • {profile.device}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {selectedProfile?.id === profile.id && (
                        <Badge variant="default" className="text-xs">Ativo</Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProfile(profile.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {profiles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Nenhum perfil criado ainda</p>
            <p className="text-sm">Crie seu primeiro perfil acima</p>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
}