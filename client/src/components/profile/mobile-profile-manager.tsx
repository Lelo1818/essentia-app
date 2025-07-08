import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Smartphone, Monitor, AlertTriangle } from 'lucide-react';

// Detecta se é mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
};

// Usa diferentes métodos de storage para mobile
const MobileStorage = {
  setItem: (key: string, value: string) => {
    console.log(`📱 MOBILE STORAGE SET: ${key}`);
    try {
      // Método 1: localStorage normal
      localStorage.setItem(key, value);
      console.log(`✅ localStorage funcionou`);
      
      // Método 2: sessionStorage como backup
      sessionStorage.setItem(key + '_session', value);
      console.log(`✅ sessionStorage funcionou`);
      
      // Método 3: IndexedDB simples
      if ('indexedDB' in window) {
        const request = indexedDB.open('FlowProfilesDB', 1);
        request.onsuccess = (event) => {
          const db = (event.target as any).result;
          if (db.objectStoreNames.contains('profiles')) {
            const transaction = db.transaction(['profiles'], 'readwrite');
            const store = transaction.objectStore('profiles');
            store.put({ id: key, data: value });
            console.log(`✅ IndexedDB funcionou`);
          }
        };
        request.onupgradeneeded = (event) => {
          const db = (event.target as any).result;
          if (!db.objectStoreNames.contains('profiles')) {
            db.createObjectStore('profiles', { keyPath: 'id' });
          }
        };
      }
      
      return true;
    } catch (error) {
      console.error(`❌ ERRO MOBILE STORAGE:`, error);
      return false;
    }
  },
  
  getItem: (key: string): string | null => {
    console.log(`📱 MOBILE STORAGE GET: ${key}`);
    try {
      // Tenta localStorage primeiro
      const local = localStorage.getItem(key);
      if (local) {
        console.log(`✅ Encontrado no localStorage`);
        return local;
      }
      
      // Tenta sessionStorage
      const session = sessionStorage.getItem(key + '_session');
      if (session) {
        console.log(`✅ Encontrado no sessionStorage`);
        return session;
      }
      
      console.log(`❌ Não encontrado em nenhum storage`);
      return null;
    } catch (error) {
      console.error(`❌ ERRO MOBILE GET:`, error);
      return null;
    }
  }
};

export default function MobileProfileManager() {
  const [profileName, setProfileName] = useState('');
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [storageTest, setStorageTest] = useState<string>('');

  useEffect(() => {
    setIsMobileDevice(isMobile());
    testStorage();
    loadProfiles();
  }, []);

  const testStorage = () => {
    console.log("🔍 TESTANDO STORAGE NO MOBILE");
    
    const tests = [];
    
    // Teste localStorage
    try {
      localStorage.setItem('test', 'ok');
      const result = localStorage.getItem('test');
      localStorage.removeItem('test');
      tests.push(`localStorage: ${result === 'ok' ? '✅' : '❌'}`);
    } catch (e) {
      tests.push(`localStorage: ❌ ${e.message}`);
    }
    
    // Teste sessionStorage
    try {
      sessionStorage.setItem('test', 'ok');
      const result = sessionStorage.getItem('test');
      sessionStorage.removeItem('test');
      tests.push(`sessionStorage: ${result === 'ok' ? '✅' : '❌'}`);
    } catch (e) {
      tests.push(`sessionStorage: ❌ ${e.message}`);
    }
    
    // Teste touch events
    tests.push(`Touch: ${navigator.maxTouchPoints ? '✅' : '❌'}`);
    tests.push(`UserAgent: ${navigator.userAgent.includes('Mobile') ? '✅ Mobile' : '❌ Desktop'}`);
    
    setStorageTest(tests.join(' | '));
    console.log("🔍 RESULTADOS TESTE:", tests);
  };

  const handleSave = async () => {
    console.log("🚀 MOBILE SAVE INICIADO");
    console.log("🚀 Device:", isMobileDevice ? 'Mobile' : 'Desktop');
    console.log("🚀 Nome:", profileName);
    
    if (!profileName.trim()) {
      alert("⚠️ Digite um nome para o perfil!");
      return;
    }

    try {
      const profile = {
        id: Date.now(),
        name: profileName.trim(),
        device: isMobileDevice ? 'mobile' : 'desktop',
        data: {
          balance: 10833.86,
          achievements: 5,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent.substring(0, 100)
        }
      };

      console.log("💾 SALVANDO PERFIL:", profile);
      
      // Usa o storage mobile otimizado
      const saved = MobileStorage.setItem('mobile-profiles', JSON.stringify([profile]));
      
      if (saved) {
        setSavedProfiles([profile]);
        setProfileName('');
        
        console.log("✅ PERFIL SALVO COM SUCESSO");
        alert(`✅ Perfil "${profile.name}" salvo!\nDevice: ${profile.device}\nID: ${profile.id}`);
      } else {
        throw new Error('Falha no storage');
      }
      
    } catch (error) {
      console.error("❌ ERRO AO SALVAR:", error);
      alert(`❌ Erro: ${error.message}`);
    }
  };

  const loadProfiles = () => {
    try {
      const profiles = MobileStorage.getItem('mobile-profiles');
      if (profiles) {
        const parsed = JSON.parse(profiles);
        setSavedProfiles(parsed);
        console.log("📁 Perfis carregados:", parsed.length);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar:", error);
    }
  };

  return (
    <Card className="w-full max-w-md border-2 border-blue-500">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          {isMobileDevice ? <Smartphone className="w-5 h-5 mr-2" /> : <Monitor className="w-5 h-5 mr-2" />}
          Mobile Profile Manager
        </CardTitle>
        <div className="text-xs text-gray-600">
          Device: {isMobileDevice ? '📱 Mobile' : '💻 Desktop'}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Testes de Compatibilidade */}
        <div className="p-2 bg-gray-100 rounded text-xs">
          <div className="font-semibold mb-1">Testes de Compatibilidade:</div>
          <div>{storageTest}</div>
        </div>
        
        <div>
          <Label htmlFor="mobile-name">Nome do Perfil</Label>
          <Input
            id="mobile-name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Digite um nome..."
            className="text-lg p-3"
            style={{ fontSize: '16px' }} // Evita zoom no iOS
          />
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg p-3"
          style={{ minHeight: '48px' }} // Touch target mínimo
        >
          <Save className="w-5 h-5 mr-2" />
          Salvar Perfil
        </Button>
        
        <Button 
          onClick={loadProfiles}
          variant="outline"
          className="w-full"
        >
          Recarregar ({savedProfiles.length})
        </Button>

        {savedProfiles.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Perfis Salvos ({savedProfiles.length}):
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {savedProfiles.map((profile, index) => (
                <div key={profile.id} className="text-sm p-2 bg-green-50 border border-green-200 rounded">
                  <div className="font-semibold">{index + 1}. {profile.name}</div>
                  <div className="text-xs text-gray-600">
                    {profile.device} • {new Date(profile.data.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    UA: {profile.data.userAgent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}