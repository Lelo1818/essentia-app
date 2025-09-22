import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Brain, 
  Zap, 
  Play,
  CheckCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Sun,
  Star
} from 'lucide-react';

// ========================================
// SIMPLES & FUNCIONAL
// ========================================

interface UserProfile {
  id: string;
  name: string;
  consciencia: number;
  energia: number;
  coerencia: number;
  streak: number;
  totalRitualsCompleted: number;
}

// ========================================
// PORTAL DESENHADO SIMPLES
// ========================================

interface SimplePortalProps {
  isActive: boolean;
  progress: number;
  type: 'purple' | 'green' | 'orange';
}

const SimplePortal = ({ isActive, progress, type }: SimplePortalProps) => {
  const colors = {
    purple: '#8b5cf6',
    green: '#10b981', 
    orange: '#f59e0b'
  };
  
  const color = colors[type];
  
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}

      {/* Central Portal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div 
            className={`w-32 h-32 rounded-full border-4 ${isActive ? 'animate-spin' : ''}`}
            style={{ 
              borderColor: color,
              borderTopColor: 'transparent',
              animation: isActive ? 'spin 4s linear infinite' : 'none'
            }}
          />
          
          {/* Inner core */}
          <div 
            className="absolute inset-4 rounded-full flex items-center justify-center text-white text-2xl"
            style={{ backgroundColor: color + '60' }}
          >
            {type === 'purple' && '🧠'}
            {type === 'green' && '⚡'}
            {type === 'orange' && '❤️'}
          </div>

          {/* Progress */}
          {isActive && (
            <div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: color,
                transform: `rotate(${(progress / 100) * 360}deg)`
              }}
            />
          )}
        </div>
      </div>

      {/* Progress text */}
      {isActive && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-white">
          <div className="text-sm font-medium">{progress}% completo</div>
        </div>
      )}
    </div>
  );
};

// ========================================
// MAIN COMPONENT
// ========================================

export default function EssentiaSimples() {
  // Estados - TODOS no topo
  const [user, setUser] = useState<UserProfile | null>(null);
  const [step, setStep] = useState<'onboarding' | 'dashboard' | 'portal'>('onboarding');
  const [onboardingQuestion, setOnboardingQuestion] = useState(0);
  const [consciencia, setConsciencia] = useState(50);
  const [energia, setEnergia] = useState(50);  
  const [coerencia, setCoerencia] = useState(50);
  const [portalActive, setPortalActive] = useState(false);
  const [portalProgress, setPortalProgress] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  
  // ========================================
  // FUNCTIONS
  // ========================================
  
  const completeOnboarding = () => {
    const newUser: UserProfile = {
      id: 'user_simples',
      name: 'Explorador',
      consciencia,
      energia,
      coerencia,
      streak: 0,
      totalRitualsCompleted: 0
    };
    
    setUser(newUser);
    localStorage.setItem('essentia-simples-user', JSON.stringify(newUser));
    setStep('dashboard');
  };

  const startPortal = () => {
    setStep('portal');
    setPortalActive(true);
    setPortalProgress(0);
    
    const interval = setInterval(() => {
      setPortalProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPortalActive(false);
          completePortal();
          return 100;
        }
        return prev + 3;
      });
    }, 150);
  };

  const completePortal = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      totalRitualsCompleted: user.totalRitualsCompleted + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('essentia-simples-user', JSON.stringify(updatedUser));
    setStep('dashboard');
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    const userMessage = chatInput;
    setChatInput('');
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          persona: 'SOFIA',
          context: { triad: user }
        })
      });
      
      const data = await response.json();
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || '🌸 Como posso te ajudar hoje?'
      }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '🌸 Estou aqui para te apoiar! Como você está se sentindo?'
      }]);
    }
  };

  // ========================================
  // EFFECTS
  // ========================================

  useEffect(() => {
    const saved = localStorage.getItem('essentia-simples-user');
    if (saved) {
      setUser(JSON.parse(saved));
      setStep('dashboard');
    }
  }, []);

  // ========================================
  // RENDER
  // ========================================

  if (step === 'onboarding') {
    const questions = [
      { title: 'Consciência', subtitle: 'Como está sua presença hoje?', icon: Brain, color: 'purple' },
      { title: 'Energia', subtitle: 'Como está sua vitalidade?', icon: Zap, color: 'green' },
      { title: 'Coerência', subtitle: 'Suas ações estão alinhadas?', icon: Heart, color: 'red' }
    ];

    if (onboardingQuestion === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Essentia Simples
              </CardTitle>
              <p className="text-gray-600 mt-2">Baseado no que funciona. Portal desenhado incluído!</p>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setOnboardingQuestion(1)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 w-full"
                size="lg"
              >
                Começar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const currentQ = questions[onboardingQuestion - 1];
    const IconComponent = currentQ.icon;
    const value = onboardingQuestion === 1 ? consciencia : onboardingQuestion === 2 ? energia : coerencia;
    const setValue = onboardingQuestion === 1 ? setConsciencia : onboardingQuestion === 2 ? setEnergia : setCoerencia;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <Badge>{onboardingQuestion}/3</Badge>
            <div className="text-5xl mb-3">
              <IconComponent className="w-12 h-12 mx-auto text-purple-600" />
            </div>
            <CardTitle className="text-xl">{currentQ.title}</CardTitle>
            <p className="text-gray-600 text-sm">{currentQ.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="text-center mt-2">
                <div className="text-3xl font-bold text-purple-600">{value}%</div>
              </div>
            </div>

            <Button
              onClick={() => {
                if (onboardingQuestion === 3) {
                  completeOnboarding();
                } else {
                  setOnboardingQuestion(onboardingQuestion + 1);
                }
              }}
              className="w-full"
            >
              {onboardingQuestion === 3 ? 'Finalizar' : 'Próximo'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'portal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Portal em Andamento</CardTitle>
            <Progress value={portalProgress} className="mt-4" />
          </CardHeader>
          <CardContent>
            <SimplePortal 
              isActive={portalActive}
              progress={portalProgress}
              type="purple"
            />
            
            {portalProgress === 100 && (
              <div className="text-center mt-6">
                <Button 
                  onClick={() => setStep('dashboard')}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar Portal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Olá, {user?.name}!</CardTitle>
                <p className="text-purple-100">
                  {user?.totalRitualsCompleted} práticas • {user?.streak} dias consecutivos
                </p>
              </div>
              <Star className="w-8 h-8" />
            </div>
          </CardHeader>
        </Card>

        {/* Tríade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Sua Tríade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold">Consciência</h3>
                <div className="text-2xl font-bold text-purple-600">{user?.consciencia}%</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-bold">Energia</h3>
                <div className="text-2xl font-bold text-green-600">{user?.energia}%</div>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <h3 className="font-bold">Coerência</h3>
                <div className="text-2xl font-bold text-red-600">{user?.coerencia}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Desenhado</CardTitle>
          </CardHeader>
          <CardContent>
            <SimplePortal isActive={false} progress={0} type="purple" />
            <div className="text-center mt-4">
              <Button 
                onClick={startPortal}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Portal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Chat */}
        <div className="text-center">
          <Button 
            onClick={() => setChatOpen(true)}
            variant="outline"
            size="lg"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Conversar com IA
          </Button>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg h-96 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>🌸 Sofia</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setChatOpen(false)}>✕</Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">🌸</div>
                  <p className="text-gray-600">Olá! Como posso te ajudar?</p>
                </div>
              )}
              
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Digite sua mensagem..."
                />
                <Button onClick={sendMessage}>Enviar</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}