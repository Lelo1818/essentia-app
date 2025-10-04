import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, Brain, Zap, Wind, Book, MessageCircle, Users,
  Eye, Shield, Target, Moon, Sparkles, Sunrise, Crown,
  Compass, TrendingUp, Calendar, CheckCircle, Play, Pause
} from 'lucide-react';

type DemoStep = 
  | 'intro'
  | 'onboarding'
  | 'wheel'
  | 'triad'
  | 'checkin'
  | 'dashboard'
  | 'journey'
  | 'portals'
  | 'portal-immersive'
  | 'breathing'
  | 'rituals'
  | 'journal'
  | 'ai-chat'
  | 'community'
  | 'finale';

const STEP_DURATIONS: Record<DemoStep, number> = {
  intro: 3000,
  onboarding: 5000,
  wheel: 6000,
  triad: 5000,
  checkin: 5000,
  dashboard: 6000,
  journey: 6000,
  portals: 8000,
  'portal-immersive': 8000,
  breathing: 8000,
  rituals: 8000,
  journal: 8000,
  'ai-chat': 8000,
  community: 6000,
  finale: 4000
};

const EssentiaAvatar = ({ state }: { state: 'calm' | 'attentive' | 'grateful' }) => {
  const getEmoji = () => {
    if (state === 'calm') return '🧘';
    if (state === 'attentive') return '👁️';
    return '🙏';
  };

  const getColor = () => {
    if (state === 'calm') return '#8b5cf6';
    if (state === 'attentive') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="relative inline-block">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl animate-pulse"
        style={{ backgroundColor: getColor() + '20', border: `3px solid ${getColor()}` }}
      >
        {getEmoji()}
      </div>
    </div>
  );
};

export default function EssentiaDemo90s() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('intro');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const steps: DemoStep[] = [
      'intro', 'onboarding', 'wheel', 'triad', 'checkin',
      'dashboard', 'journey', 'portals', 'portal-immersive',
      'breathing', 'rituals', 'journal', 'ai-chat', 'community', 'finale'
    ];

    const currentIndex = steps.indexOf(currentStep);
    const duration = STEP_DURATIONS[currentStep];

    const timer = setTimeout(() => {
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
        setProgress(0);
      } else {
        setIsPlaying(false);
      }
    }, duration);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (duration / 100)), 100));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentStep, isPlaying]);

  const startDemo = () => {
    setCurrentStep('intro');
    setProgress(0);
    setElapsedTime(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (currentStep === 'intro' && !isPlaying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <EssentiaAvatar state="grateful" />
            </div>
            <CardTitle className="text-4xl mb-2">🌟 Essentia Demo Completa</CardTitle>
            <p className="text-xl text-gray-600">90 segundos • Todos os recursos consolidados</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Badge className="p-3">✨ Onboarding Inteligente</Badge>
              <Badge className="p-3">🎯 Roda da Vida 8 Áreas</Badge>
              <Badge className="p-3">⚡ Tríade Essentia</Badge>
              <Badge className="p-3">😊 Check-in Emocional</Badge>
              <Badge className="p-3">🚀 Jornada 6 Estágios</Badge>
              <Badge className="p-3">🌀 7 Portais Imersivos</Badge>
              <Badge className="p-3">🧘 Respiração 174Hz</Badge>
              <Badge className="p-3">🌅 Rituais Diários</Badge>
              <Badge className="p-3">📔 Diário com IA</Badge>
              <Badge className="p-3">🤖 4 Personas IA</Badge>
              <Badge className="p-3">👥 Comunidade</Badge>
              <Badge className="p-3">🎭 Avatar Reativo</Badge>
            </div>
            <Button 
              onClick={startDemo}
              className="w-full h-16 text-xl bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <Play className="w-6 h-6 mr-2" />
              Iniciar Demo (90s)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      {/* Timer e Controles */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <Button size="sm" onClick={togglePlay} variant="outline">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <div className="text-sm font-mono">
              {Math.floor(elapsedTime / 1000)}s / 90s
            </div>
          </div>
          <Progress value={progress} className="mt-2 w-32" />
        </Card>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* INTRO */}
        {currentStep === 'intro' && (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Essentia
            </h1>
            <p className="text-2xl text-gray-600">Sua jornada de propósito começa agora</p>
            <EssentiaAvatar state="calm" />
          </div>
        )}

        {/* ONBOARDING */}
        {currentStep === 'onboarding' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">✨ Bem-vindo! Qual é seu nome?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-xl font-semibold">Lelo</p>
                <p className="text-sm text-gray-600 mt-2">Vamos conhecer você em 3 etapas</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* RODA DA VIDA */}
        {currentStep === 'wheel' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">🎯 Roda da Vida - 8 Áreas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['❤️ Relacionamentos', '💼 Carreira', '💪 Saúde', '📚 Crescimento', 
                  '💰 Finanças', '🎨 Lazer', '🏡 Ambiente', '🌍 Contribuição'].map((area, i) => (
                  <div key={i} className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="font-semibold">{area}</p>
                    <Progress value={(i + 1) * 12} className="mt-2" />
                    <p className="text-xs text-gray-600 mt-1">{(i + 1) * 12}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TRÍADE */}
        {currentStep === 'triad' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">⚡ Tríade Essentia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <Brain className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-bold text-lg">Consciência</h3>
                  <p className="text-4xl font-bold text-purple-600 mt-2">75%</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <Zap className="w-12 h-12 mx-auto mb-2 text-green-600" />
                  <h3 className="font-bold text-lg">Energia</h3>
                  <p className="text-4xl font-bold text-green-600 mt-2">82%</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <Heart className="w-12 h-12 mx-auto mb-2 text-red-600" />
                  <h3 className="font-bold text-lg">Coerência</h3>
                  <p className="text-4xl font-bold text-red-600 mt-2">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CHECK-IN */}
        {currentStep === 'checkin' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">😊 Como você está hoje?</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div>
                <p className="text-gray-600 mb-4">Humor</p>
                <div className="flex justify-center space-x-4">
                  {['😢', '😕', '😐', '🙂', '😄'].map((emoji, i) => (
                    <div key={i} className={`text-4xl p-2 rounded-lg ${i === 3 ? 'bg-green-100 scale-125' : ''}`}>
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-4">Energia</p>
                <Progress value={70} className="h-4" />
                <p className="text-sm mt-2">70% - Bom!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* DASHBOARD */}
        {currentStep === 'dashboard' && (
          <div className="space-y-4 animate-fade-in">
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <EssentiaAvatar state="grateful" />
                  <div>
                    <h1 className="text-3xl font-bold">Olá, Lelo! ✨</h1>
                    <p className="text-purple-100">Clareza: 75% • 12 práticas • Estágio 3/6</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-gray-600">Dias Consecutivos</p>
              </Card>
              <Card className="text-center p-4">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-600">Total Práticas</p>
              </Card>
              <Card className="text-center p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">75%</p>
                <p className="text-xs text-gray-600">Clareza</p>
              </Card>
              <Card className="text-center p-4">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">4/7</p>
                <p className="text-xs text-gray-600">Portais</p>
              </Card>
            </div>
          </div>
        )}

        {/* JORNADA 6 ESTÁGIOS */}
        {currentStep === 'journey' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="text-center mb-4">
                <EssentiaAvatar state="calm" />
              </div>
              <CardTitle className="text-2xl text-center">
                <Compass className="w-6 h-6 inline mr-2" />
                Jornada de 6 Estágios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { emoji: '🌅', name: 'Despertar Interior', desc: 'Primeiros passos', done: true },
                { emoji: '🧠', name: 'Autoconhecimento', desc: 'Padrões e crenças', done: true },
                { emoji: '✨', name: 'Descoberta de Paixões', desc: 'O que te move', current: true },
                { emoji: '💫', name: 'Relacionamentos', desc: 'Conexões autênticas', done: false },
                { emoji: '🎯', name: 'Missão', desc: 'Impactar o mundo', done: false },
                { emoji: '👑', name: 'Vida com Propósito', desc: 'Plenitude total', done: false }
              ].map((stage, i) => (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-lg ${
                  stage.current ? 'bg-purple-100 border-2 border-purple-600' :
                  stage.done ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <span className="text-3xl">{stage.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold">{stage.name}</p>
                    <p className="text-xs text-gray-600">{stage.desc}</p>
                  </div>
                  {stage.current && <Badge className="bg-purple-600">✨ Atual</Badge>}
                  {stage.done && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* PORTAIS */}
        {currentStep === 'portals' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="text-center mb-4">
                <EssentiaAvatar state="attentive" />
              </div>
              <CardTitle className="text-2xl text-center">🌀 7 Portais Transformadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Eye, name: 'Clareza', color: 'from-blue-500 to-cyan-500' },
                  { icon: Heart, name: 'Presença', color: 'from-green-500 to-emerald-500' },
                  { icon: Shield, name: 'Coragem', color: 'from-red-500 to-orange-500' },
                  { icon: Book, name: 'Sabedoria', color: 'from-purple-500 to-pink-500' },
                  { icon: Moon, name: 'Intuição', color: 'from-pink-500 to-rose-500' },
                  { icon: Target, name: 'Propósito', color: 'from-orange-500 to-amber-500' },
                  { icon: Users, name: 'Conexão', color: 'from-cyan-500 to-teal-500' }
                ].map((portal, i) => {
                  const Icon = portal.icon;
                  return (
                    <div key={i} className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform">
                      <div className={`h-1 bg-gradient-to-r ${portal.color}`} />
                      <div className="p-4 text-center bg-white">
                        <Icon className="w-10 h-10 mx-auto mb-2" />
                        <p className="font-bold text-sm">{portal.name}</p>
                        {i < 4 && <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* PORTAL IMERSIVO */}
        {currentStep === 'portal-immersive' && (
          <div className="animate-fade-in">
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-purple-500 animate-spin" 
                       style={{ borderTopColor: 'transparent' }} />
                  <div className="absolute inset-8 rounded-full flex items-center justify-center text-6xl bg-purple-500/20">
                    👁️
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold text-center">Portal Clareza</h3>
                <Progress value={progress} className="mt-2" />
              </div>
            </div>
          </div>
        )}

        {/* RESPIRAÇÃO */}
        {currentStep === 'breathing' && (
          <Card className="animate-fade-in">
            <CardHeader className="text-center">
              <EssentiaAvatar state="calm" />
              <CardTitle className="text-2xl mt-4">🧘 Respiração Guiada com Som 174Hz</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse opacity-50" />
                <div className="absolute inset-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full animate-ping opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wind className="w-24 h-24 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-lg font-semibold">🔊 Som 174Hz Ativo</p>
              </div>
              <p className="text-gray-600">Inspire... Segure... Expire...</p>
            </CardContent>
          </Card>
        )}

        {/* RITUAIS */}
        {currentStep === 'rituals' && (
          <Card className="animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">🌅 Ritual Matinal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">🙏 3 Gratidões:</p>
                <ul className="space-y-1 text-sm">
                  <li>✓ Saúde da minha família</li>
                  <li>✓ Oportunidade de criar</li>
                  <li>✓ Momento presente</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">💫 Intenção do Dia:</p>
                <p className="text-sm italic">"Viver com presença e compaixão"</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm">3 Respirações Conscientes</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* DIÁRIO */}
        {currentStep === 'journal' && (
          <Card className="animate-fade-in">
            <CardHeader className="text-center">
              <EssentiaAvatar state="attentive" />
              <CardTitle className="text-2xl mt-4">
                <Book className="w-6 h-6 inline mr-2" />
                Diário com Insights IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm italic text-gray-700">
                  "Hoje percebi como tenho medo de decepcionar as pessoas. Isso me faz evitar desafios..."
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="text-xs font-semibold text-purple-900 mb-2">💡 Insight da IA (Sofia):</p>
                <p className="text-sm text-purple-800">
                  "Reconhecer esse padrão é o primeiro passo. Que tal começar com um pequeno desafio esta semana?"
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI CHAT */}
        {currentStep === 'ai-chat' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <EssentiaAvatar state="grateful" />
                <CardTitle className="text-2xl">🤖 4 Personas de IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { emoji: '🌸', name: 'Sofia', focus: 'Empatia & Acolhimento' },
                  { emoji: '🎯', name: 'Marcus', focus: 'Estratégia & Ação' },
                  { emoji: '🌙', name: 'Luna', focus: 'Intuição & Reflexão' },
                  { emoji: '🦁', name: 'Leo', focus: 'Energia & Motivação' }
                ].map((persona, i) => (
                  <div key={i} className={`p-4 rounded-lg text-center ${i === 0 ? 'bg-pink-100 border-2 border-pink-500' : 'bg-gray-50'}`}>
                    <span className="text-3xl">{persona.emoji}</span>
                    <p className="font-bold mt-2">{persona.name}</p>
                    <p className="text-xs text-gray-600">{persona.focus}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="bg-gray-100 p-3 rounded-lg text-sm">
                  <p className="font-semibold">Você:</p>
                  <p>"Como lidar com a ansiedade?"</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg text-sm border-l-4 border-pink-500">
                  <p className="font-semibold text-pink-900">Sofia:</p>
                  <p className="text-pink-800">"Vamos começar respirando juntos. A ansiedade é um sinal do seu corpo..."</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* COMUNIDADE */}
        {currentStep === 'community' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">
                <Users className="w-6 h-6 inline mr-2" />
                Comunidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  author: 'Marina Silva',
                  level: 'Alma Iluminada',
                  content: 'Finalmente tive coragem de seguir minha paixão por arte terapia! 🎨',
                  likes: 24,
                  tags: ['coragem', 'transição']
                },
                {
                  author: 'Roberto Lima',
                  level: 'Buscador Avançado',
                  content: 'Percebi que minha necessidade de controle vem do medo...',
                  likes: 18,
                  tags: ['autoconhecimento']
                }
              ].map((post, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.level}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" /> {post.likes}
                    </span>
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* FINALE */}
        {currentStep === 'finale' && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-6xl">✨</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Essentia Completo
            </h1>
            <p className="text-xl text-gray-600">
              Todos os recursos consolidados em uma experiência única
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-600">Recursos Únicos</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">90s</p>
                <p className="text-sm text-gray-600">Demo Completa</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-600">Funcional</p>
              </div>
            </div>
            <Button 
              onClick={startDemo}
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-12 px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Assistir Novamente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
