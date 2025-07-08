import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Smartphone, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Detecta mobile de forma mais robusta
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Múltiplas verificações para mobile
  const mobileTests = [
    /android/i.test(userAgent),
    /iPhone/i.test(userAgent),
    /iPad/i.test(userAgent),
    /iPod/i.test(userAgent),
    /BlackBerry/i.test(userAgent),
    /Windows Phone/i.test(userAgent),
    navigator.maxTouchPoints > 0,
    window.innerWidth < 768,
    'ontouchstart' in window
  ];
  
  return mobileTests.some(test => test);
};

// Sistema de storage com fallbacks para mobile
const MobileStorage = {
  async save(key: string, data: any): Promise<{ success: boolean; method: string; error?: string }> {
    const dataStr = JSON.stringify(data);
    console.log(`📱 SALVANDO: ${key}`, data);
    
    // Método 1: localStorage direto
    try {
      localStorage.setItem(key, dataStr);
      const verification = localStorage.getItem(key);
      if (verification === dataStr) {
        console.log(`✅ localStorage SUCCESS`);
        return { success: true, method: 'localStorage' };
      }
    } catch (error) {
      console.log(`❌ localStorage FAILED:`, error);
    }
    
    // Método 2: sessionStorage
    try {
      sessionStorage.setItem(key, dataStr);
      const verification = sessionStorage.getItem(key);
      if (verification === dataStr) {
        console.log(`✅ sessionStorage SUCCESS`);
        return { success: true, method: 'sessionStorage' };
      }
    } catch (error) {
      console.log(`❌ sessionStorage FAILED:`, error);
    }
    
    // Método 3: IndexedDB manual
    try {
      const success = await new Promise<boolean>((resolve) => {
        const request = indexedDB.open('FlowProfileDB', 1);
        
        request.onerror = () => resolve(false);
        
        request.onsuccess = (event) => {
          const db = (event.target as any).result;
          try {
            const transaction = db.transaction(['profiles'], 'readwrite');
            const store = transaction.objectStore('profiles');
            const addRequest = store.put({ id: key, data: dataStr, timestamp: Date.now() });
            
            addRequest.onsuccess = () => resolve(true);
            addRequest.onerror = () => resolve(false);
          } catch (e) {
            resolve(false);
          }
        };
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as any).result;
          if (!db.objectStoreNames.contains('profiles')) {
            db.createObjectStore('profiles', { keyPath: 'id' });
          }
        };
      });
      
      if (success) {
        console.log(`✅ IndexedDB SUCCESS`);
        return { success: true, method: 'indexedDB' };
      }
    } catch (error) {
      console.log(`❌ IndexedDB FAILED:`, error);
    }
    
    // Método 4: Document cookies
    try {
      const cookieValue = encodeURIComponent(dataStr);
      document.cookie = `${key}=${cookieValue}; path=/; max-age=86400`;
      
      const cookies = document.cookie.split(';');
      const found = cookies.find(c => c.trim().startsWith(`${key}=`));
      if (found) {
        console.log(`✅ Cookies SUCCESS`);
        return { success: true, method: 'cookies' };
      }
    } catch (error) {
      console.log(`❌ Cookies FAILED:`, error);
    }
    
    return { success: false, method: 'none', error: 'Todos os métodos falharam' };
  },
  
  async load(key: string): Promise<any> {
    console.log(`📱 CARREGANDO: ${key}`);
    
    // Tenta localStorage
    try {
      const data = localStorage.getItem(key);
      if (data) {
        console.log(`✅ Encontrado no localStorage`);
        return JSON.parse(data);
      }
    } catch (error) {
      console.log(`❌ localStorage load failed:`, error);
    }
    
    // Tenta sessionStorage
    try {
      const data = sessionStorage.getItem(key);
      if (data) {
        console.log(`✅ Encontrado no sessionStorage`);
        return JSON.parse(data);
      }
    } catch (error) {
      console.log(`❌ sessionStorage load failed:`, error);
    }
    
    // Tenta IndexedDB
    try {
      const data = await new Promise<string | null>((resolve) => {
        const request = indexedDB.open('FlowProfileDB', 1);
        
        request.onerror = () => resolve(null);
        
        request.onsuccess = (event) => {
          const db = (event.target as any).result;
          try {
            const transaction = db.transaction(['profiles'], 'readonly');
            const store = transaction.objectStore('profiles');
            const getRequest = store.get(key);
            
            getRequest.onsuccess = () => {
              const result = getRequest.result;
              resolve(result ? result.data : null);
            };
            getRequest.onerror = () => resolve(null);
          } catch (e) {
            resolve(null);
          }
        };
      });
      
      if (data) {
        console.log(`✅ Encontrado no IndexedDB`);
        return JSON.parse(data);
      }
    } catch (error) {
      console.log(`❌ IndexedDB load failed:`, error);
    }
    
    // Tenta cookies
    try {
      const cookies = document.cookie.split(';');
      const found = cookies.find(c => c.trim().startsWith(`${key}=`));
      if (found) {
        const value = found.split('=')[1];
        const decoded = decodeURIComponent(value);
        console.log(`✅ Encontrado nos cookies`);
        return JSON.parse(decoded);
      }
    } catch (error) {
      console.log(`❌ Cookies load failed:`, error);
    }
    
    console.log(`❌ Nenhum dado encontrado`);
    return null;
  }
};

export default function MobileFixedManager() {
  const [profileName, setProfileName] = useState('');
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    status: 'idle' | 'saving' | 'success' | 'error';
    message: string;
    method?: string;
  }>({ status: 'idle', message: '' });

  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    console.log(`📱 Device Detection:`, {
      mobile,
      userAgent: navigator.userAgent,
      touchPoints: navigator.maxTouchPoints,
      width: window.innerWidth,
      touchStart: 'ontouchstart' in window
    });
    
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const profiles = await MobileStorage.load('mobile-profiles-v2');
      if (profiles && Array.isArray(profiles)) {
        setSavedProfiles(profiles);
        console.log(`📁 Perfis carregados:`, profiles.length);
      }
    } catch (error) {
      console.error(`❌ Erro ao carregar perfis:`, error);
    }
  };

  const handleSave = async () => {
    if (!profileName.trim()) {
      alert("⚠️ Digite um nome para o perfil!");
      return;
    }

    setSaveStatus({ status: 'saving', message: 'Salvando...' });
    
    try {
      const newProfile = {
        id: Date.now(),
        name: profileName.trim(),
        device: isMobile ? 'mobile' : 'desktop',
        timestamp: new Date().toISOString(),
        data: {
          balance: 10833.86,
          achievements: 5,
          userAgent: navigator.userAgent.substring(0, 100),
          saveMethod: 'unknown'
        }
      };

      const existingProfiles = await MobileStorage.load('mobile-profiles-v2') || [];
      const updatedProfiles = [...existingProfiles, newProfile];
      
      const result = await MobileStorage.save('mobile-profiles-v2', updatedProfiles);
      
      if (result.success) {
        newProfile.data.saveMethod = result.method;
        setSavedProfiles(updatedProfiles);
        setProfileName('');
        setSaveStatus({ 
          status: 'success', 
          message: `Salvo com ${result.method}!`,
          method: result.method
        });
        
        alert(`✅ Perfil salvo!\nMétodo: ${result.method}\nDevice: ${newProfile.device}`);
      } else {
        throw new Error(result.error || 'Falha no salvamento');
      }
      
    } catch (error) {
      console.error("❌ ERRO AO SALVAR:", error);
      setSaveStatus({ 
        status: 'error', 
        message: `Erro: ${error.message}` 
      });
      alert(`❌ Erro ao salvar: ${error.message}`);
    }
  };

  const getStatusIcon = () => {
    switch (saveStatus.status) {
      case 'saving': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Smartphone className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full max-w-md border-2 border-purple-500">
      <CardHeader className="bg-purple-50">
        <CardTitle className="flex items-center">
          <Smartphone className="w-5 h-5 mr-2" />
          Mobile Fixed Manager
        </CardTitle>
        <div className="text-xs text-gray-600">
          Device: {isMobile ? '📱 Mobile' : '💻 Desktop'}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        
        <div className="p-3 bg-gray-100 rounded">
          <div className="flex items-center gap-2 mb-1">
            {getStatusIcon()}
            <span className="text-sm font-semibold">Status:</span>
          </div>
          <div className="text-xs text-gray-700">
            {saveStatus.message || 'Pronto para salvar'}
          </div>
        </div>
        
        <div>
          <Label htmlFor="fixed-name">Nome do Perfil</Label>
          <Input
            id="fixed-name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Digite um nome..."
            className="text-base p-3"
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={saveStatus.status === 'saving'}
          className="w-full bg-purple-600 hover:bg-purple-700 text-lg p-3"
          style={{ minHeight: '48px' }}
        >
          <Save className="w-5 h-5 mr-2" />
          {saveStatus.status === 'saving' ? 'Salvando...' : 'Salvar Perfil'}
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
            <h4 className="font-semibold mb-2">
              ✅ Perfis Salvos ({savedProfiles.length}):
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {savedProfiles.map((profile, index) => (
                <div key={profile.id} className="text-sm p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-semibold">{index + 1}. {profile.name}</div>
                  <div className="text-xs text-gray-600">
                    {profile.device} • {new Date(profile.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-purple-600">
                    Método: {profile.data.saveMethod || 'N/A'}
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