import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Save, 
  FolderOpen, 
  Trash2, 
  Plus, 
  Download,
  Upload,
  UserCircle,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedProfile {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  data: {
    financialData: any;
    achievements: any[];
    goals: any[];
    preferences: any;
  };
  stats: {
    totalBalance: number;
    achievements: number;
    daysActive: number;
  };
}

export default function ProfileManager() {
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<SavedProfile | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadProfilesFromStorage();
    loadCurrentProfile();
  }, []);

  const loadProfilesFromStorage = () => {
    try {
      const stored = localStorage.getItem('flow-saved-profiles');
      if (stored) {
        const profiles = JSON.parse(stored).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }));
        setSavedProfiles(profiles);
      }
    } catch (error) {
      console.error("Erro ao carregar perfis:", error);
    }
  };

  const loadCurrentProfile = () => {
    try {
      const stored = localStorage.getItem('flow-current-profile');
      if (stored) {
        const profile = JSON.parse(stored);
        profile.createdAt = new Date(profile.createdAt);
        setCurrentProfile(profile);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil atual:", error);
    }
  };

  const saveCurrentProfile = async () => {
    if (!profileName.trim()) {
      toast({
        title: "Nome Obrigatório",
        description: "Digite um nome para o perfil",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log("🔍 Iniciando salvamento do perfil...");
      
      // Coleta dados do sistema
      const financialSummary = await fetch('/api/financial-summary').then(r => r.json());
      console.log("📊 Dados financeiros coletados:", financialSummary);
      
      const achievements = JSON.parse(localStorage.getItem('flow-achievements') || '[]');
      const goals = JSON.parse(localStorage.getItem('flow-goals') || '[]');
      const preferences = JSON.parse(localStorage.getItem('flow-preferences') || '{}');

      console.log("📈 Conquistas:", achievements.length);
      console.log("🎯 Metas:", goals.length);

      const newProfile: SavedProfile = {
        id: `profile-${Date.now()}`,
        name: profileName.trim(),
        description: profileDescription.trim(),
        createdAt: new Date(),
        data: {
          financialData: financialSummary,
          achievements,
          goals,
          preferences
        },
        stats: {
          totalBalance: financialSummary.balance || 0,
          achievements: achievements.length,
          daysActive: Math.floor((Date.now() - (preferences.startDate || Date.now())) / (1000 * 60 * 60 * 24))
        }
      };

      console.log("💾 Perfil criado:", newProfile);

      // Salva no localStorage
      const updatedProfiles = [...savedProfiles, newProfile];
      setSavedProfiles(updatedProfiles);
      localStorage.setItem('flow-saved-profiles', JSON.stringify(updatedProfiles));
      localStorage.setItem('flow-current-profile', JSON.stringify(newProfile));
      setCurrentProfile(newProfile);

      console.log("✅ Perfil salvo no localStorage");

      // Tenta salvar no servidor também
      try {
        const response = await fetch('/api/profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 1, // ID fixo do usuário demo
            name: newProfile.name,
            description: newProfile.description,
            data: newProfile.data,
            stats: newProfile.stats
          }),
        });

        if (response.ok) {
          console.log("✅ Perfil salvo no servidor também");
        } else {
          console.warn("⚠️ Erro ao salvar no servidor, mas localStorage funcionou");
        }
      } catch (serverError) {
        console.warn("⚠️ Servidor indisponível, usando apenas localStorage:", serverError);
      }

      setProfileName("");
      setProfileDescription("");
      setShowSaveDialog(false);

      toast({
        title: "Perfil Salvo!",
        description: `Perfil "${newProfile.name}" foi salvo com sucesso`,
        variant: "default"
      });
    } catch (error) {
      console.error("❌ Erro ao salvar perfil:", error);
      toast({
        title: "Erro ao Salvar",
        description: "Não foi possível salvar o perfil",
        variant: "destructive"
      });
    }
  };

  const loadProfile = async (profile: SavedProfile) => {
    try {
      // Aplicar dados do perfil ao sistema
      localStorage.setItem('flow-achievements', JSON.stringify(profile.data.achievements));
      localStorage.setItem('flow-goals', JSON.stringify(profile.data.goals));
      localStorage.setItem('flow-preferences', JSON.stringify(profile.data.preferences));
      localStorage.setItem('flow-current-profile', JSON.stringify(profile));
      
      setCurrentProfile(profile);
      setShowLoadDialog(false);

      // Recarregar a página para aplicar as mudanças
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      toast({
        title: "Perfil Carregado!",
        description: `Perfil "${profile.name}" foi carregado. Recarregando dados...`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro ao Carregar",
        description: "Não foi possível carregar o perfil",
        variant: "destructive"
      });
    }
  };

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = savedProfiles.filter(p => p.id !== profileId);
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('flow-saved-profiles', JSON.stringify(updatedProfiles));

    if (currentProfile?.id === profileId) {
      setCurrentProfile(null);
      localStorage.removeItem('flow-current-profile');
    }

    toast({
      title: "Perfil Excluído",
      description: "Perfil foi removido com sucesso",
      variant: "default"
    });
  };

  const exportProfile = (profile: SavedProfile) => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flow-profile-${profile.name.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Perfil Exportado",
      description: "Arquivo baixado com sucesso",
      variant: "default"
    });
  };

  const importProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProfile = JSON.parse(e.target?.result as string);
        importedProfile.id = `imported-${Date.now()}`;
        importedProfile.createdAt = new Date();
        
        const updatedProfiles = [...savedProfiles, importedProfile];
        setSavedProfiles(updatedProfiles);
        localStorage.setItem('flow-saved-profiles', JSON.stringify(updatedProfiles));

        toast({
          title: "Perfil Importado",
          description: `Perfil "${importedProfile.name}" foi importado com sucesso`,
          variant: "default"
        });
      } catch (error) {
        toast({
          title: "Erro na Importação",
          description: "Arquivo inválido ou corrompido",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle className="w-6 h-6 mr-2 text-blue-600" />
            Gerenciador de Perfis
          </div>
          <div className="flex space-x-2">
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <InteractiveButton size="sm" className="bg-green-600 hover:bg-green-700" soundType="success">
                  <Save className="w-4 h-4 mr-1" />
                  Salvar
                </InteractiveButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Salvar Perfil Atual</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profileName">Nome do Perfil *</Label>
                    <Input
                      id="profileName"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Ex: Perfil Principal, Teste, Backup..."
                      required
                      autoFocus
                    />
                    {!profileName.trim() && (
                      <p className="text-sm text-red-500 mt-1">Nome é obrigatório</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="profileDescription">Descrição (opcional)</Label>
                    <Input
                      id="profileDescription"
                      value={profileDescription}
                      onChange={(e) => setProfileDescription(e.target.value)}
                      placeholder="Breve descrição do perfil..."
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                    <p><strong>O que será salvo:</strong></p>
                    <ul className="list-disc ml-4 mt-1">
                      <li>Dados financeiros atuais (R$ {currentProfile?.stats?.totalBalance?.toLocaleString('pt-BR') || '0,00'})</li>
                      <li>Conquistas desbloqueadas ({JSON.parse(localStorage.getItem('flow-achievements') || '[]').length})</li>
                      <li>Metas definidas ({JSON.parse(localStorage.getItem('flow-goals') || '[]').length})</li>
                      <li>Configurações personalizadas</li>
                    </ul>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <InteractiveButton variant="outline" onClick={() => setShowSaveDialog(false)} soundType="click">
                      Cancelar
                    </InteractiveButton>
                    <InteractiveButton 
                      onClick={saveCurrentProfile} 
                      soundType="success"
                      disabled={!profileName.trim()}
                      className={!profileName.trim() ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Salvar Perfil
                    </InteractiveButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
              <DialogTrigger asChild>
                <InteractiveButton size="sm" className="bg-blue-600 hover:bg-blue-700" soundType="click">
                  <FolderOpen className="w-4 h-4 mr-1" />
                  Carregar
                </InteractiveButton>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Carregar Perfil Salvo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {savedProfiles.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <UserCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhum perfil salvo encontrado</p>
                      <p className="text-sm">Salve seu primeiro perfil para começar</p>
                    </div>
                  ) : (
                    savedProfiles.map((profile) => (
                      <Card key={profile.id} className="hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold">{profile.name}</h3>
                                {currentProfile?.id === profile.id && (
                                  <Badge className="bg-green-100 text-green-800">Atual</Badge>
                                )}
                              </div>
                              {profile.description && (
                                <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
                              )}
                              <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {formatCurrency(profile.stats.totalBalance)}
                                </div>
                                <div className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  {profile.stats.achievements} conquistas
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {profile.createdAt.toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-1 ml-4">
                              <InteractiveButton
                                size="sm"
                                variant="outline"
                                onClick={() => loadProfile(profile)}
                                soundType="click"
                              >
                                Carregar
                              </InteractiveButton>
                              <InteractiveButton
                                size="sm"
                                variant="outline"
                                onClick={() => exportProfile(profile)}
                                soundType="click"
                              >
                                <Download className="w-3 h-3" />
                              </InteractiveButton>
                              <InteractiveButton
                                size="sm"
                                variant="outline"
                                onClick={() => deleteProfile(profile.id)}
                                soundType="error"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </InteractiveButton>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="importFile" className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Importar Perfil
                      </Label>
                      <input
                        id="importFile"
                        type="file"
                        accept=".json"
                        onChange={importProfile}
                        className="hidden"
                      />
                    </div>
                    <InteractiveButton variant="outline" onClick={() => setShowLoadDialog(false)} soundType="click">
                      Fechar
                    </InteractiveButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentProfile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-medium text-blue-900">{currentProfile.name}</h3>
                {currentProfile.description && (
                  <p className="text-sm text-blue-700">{currentProfile.description}</p>
                )}
              </div>
              <Badge className="bg-blue-600">Ativo</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-green-600">
                  {formatCurrency(currentProfile.stats.totalBalance)}
                </div>
                <div className="text-gray-600">Saldo Total</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-purple-600">
                  {currentProfile.stats.achievements}
                </div>
                <div className="text-gray-600">Conquistas</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-blue-600">
                  {currentProfile.stats.daysActive}
                </div>
                <div className="text-gray-600">Dias Ativo</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <UserCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="mb-2">Nenhum perfil ativo</p>
            <p className="text-sm">Salve ou carregue um perfil para começar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}