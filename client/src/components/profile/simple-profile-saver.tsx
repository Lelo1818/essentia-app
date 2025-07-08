import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Download, Upload } from 'lucide-react';

export default function SimpleProfileSaver() {
  const [profileName, setProfileName] = useState('');
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSave = () => {
    console.log("🚀 BOTÃO SAVE CLICADO");
    
    if (!profileName.trim()) {
      alert("Digite um nome para o perfil!");
      return;
    }

    try {
      const profile = {
        id: Date.now(),
        name: profileName.trim(),
        data: {
          balance: 10833.86,
          achievements: 5,
          timestamp: new Date().toISOString()
        }
      };

      // Salva no localStorage
      const existing = JSON.parse(localStorage.getItem('simple-profiles') || '[]');
      const updated = [...existing, profile];
      localStorage.setItem('simple-profiles', JSON.stringify(updated));
      
      setSavedProfiles(updated);
      setProfileName('');
      
      console.log("✅ PERFIL SALVO:", profile);
      alert(`Perfil "${profile.name}" salvo com sucesso!`);
      
    } catch (error) {
      console.error("❌ ERRO:", error);
      alert("Erro ao salvar perfil");
    }
  };

  const loadProfiles = () => {
    try {
      const profiles = JSON.parse(localStorage.getItem('simple-profiles') || '[]');
      setSavedProfiles(profiles);
      console.log("📁 Perfis carregados:", profiles);
    } catch (error) {
      console.error("❌ Erro ao carregar:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Teste de Salvamento Simples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="simple-name">Nome do Perfil</Label>
          <Input
            id="simple-name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Digite um nome..."
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          
          <Button 
            onClick={loadProfiles}
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Carregar
          </Button>
        </div>

        {savedProfiles.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Perfis Salvos ({savedProfiles.length}):</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {savedProfiles.map((profile, index) => (
                <div key={profile.id} className="text-sm p-2 bg-gray-50 rounded">
                  {index + 1}. {profile.name} - {new Date(profile.data.timestamp).toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}