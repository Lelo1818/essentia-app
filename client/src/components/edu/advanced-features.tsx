import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Mic, 
  Eye,
  Users,
  Globe,
  Zap,
  Camera,
  MapPin,
  Clock,
  Trophy,
  Lightbulb,
  BookOpen,
  Volume2,
  Target,
  Star,
  Smartphone,
  Headphones,
  Video,
  Gamepad2
} from "lucide-react";

export default function AdvancedFeatures() {
  const [activeFeature, setActiveFeature] = useState("voice");

  const advancedFeatures = {
    voice: {
      title: "Conversa com IA Professor",
      description: "Fale naturalmente com o professor virtual",
      icon: Mic,
      color: "bg-blue-100 text-blue-600",
      demo: {
        conversation: [
          { speaker: "user", text: "Professor, não entendi essa fórmula de física" },
          { speaker: "ai", text: "Claro! Qual fórmula específica você gostaria que eu explique? Vou usar exemplos do dia a dia para ficar mais fácil." },
          { speaker: "user", text: "A segunda lei de Newton, F = ma" },
          { speaker: "ai", text: "Perfeito! Imagine que você está empurrando um carrinho de supermercado. A força (F) que você faz, multiplicada pela massa (m) do carrinho, resulta na aceleração (a). Quanto mais pesado o carrinho, mais força você precisa fazer para acelerar na mesma velocidade. Faz sentido?" }
        ]
      },
      features: [
        "Reconhecimento de voz avançado",
        "Respostas contextualizadas",
        "Explicações com analogias",
        "Paciência infinita para repetir"
      ]
    },
    realtime: {
      title: "Tradução Simultânea de Livros",
      description: "Aponte a câmera e veja tradução em tempo real",
      icon: Globe,
      color: "bg-green-100 text-green-600",
      demo: {
        original: "The quick brown fox jumps over the lazy dog",
        translated: "A raposa marrom rápida pula sobre o cachorro preguiçoso",
        languages: ["Inglês → Português", "Espanhol → Português", "Francês → Português"]
      },
      features: [
        "50+ idiomas suportados",
        "Tradução contextual inteligente",
        "Preserva formatação original",
        "Funciona offline após download"
      ]
    },
    ar: {
      title: "Realidade Aumentada Educativa",
      description: "Sobreponha informações no mundo real",
      icon: Eye,
      color: "bg-purple-100 text-purple-600",
      demo: {
        scenarios: [
          "Aponte para uma planta e veja informações botânicas",
          "Olhe para um monumento e conheça sua história",
          "Mire no céu e identifique constelações",
          "Foque em um animal e aprenda sobre ele"
        ]
      },
      features: [
        "Reconhecimento de objetos",
        "Base de dados enciclopédica",
        "Informações contextuais",
        "Experiência imersiva"
      ]
    },
    social: {
      title: "Estudo Colaborativo Global",
      description: "Conecte com estudantes do mundo todo",
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      demo: {
        activeRooms: [
          { topic: "Física - ENEM 2025", participants: 127, country: "Brasil" },
          { topic: "Python Programming", participants: 89, country: "India" },
          { topic: "Spanish Conversation", participants: 45, country: "Mexico" }
        ]
      },
      features: [
        "Salas de estudo por tema",
        "Mentoria peer-to-peer",
        "Competições amigáveis",
        "Troca de materiais"
      ]
    },
    adaptive: {
      title: "IA que Lê Suas Emoções",
      description: "Adapta o ensino baseado no seu estado emocional",
      icon: Brain,
      color: "bg-red-100 text-red-600",
      demo: {
        emotions: [
          { emotion: "Focado", action: "Aumenta complexidade do conteúdo", color: "green" },
          { emotion: "Frustrado", action: "Oferece explicação mais simples", color: "yellow" },
          { emotion: "Cansado", action: "Sugere pausa ou exercício", color: "orange" },
          { emotion: "Entediado", action: "Adiciona gamificação", color: "blue" }
        ]
      },
      features: [
        "Análise facial em tempo real",
        "Ajuste automático de dificuldade",
        "Sugestões de pausa inteligentes",
        "Motivação personalizada"
      ]
    },
    immersive: {
      title: "Simuladores Educacionais",
      description: "Aprenda fazendo em ambientes virtuais",
      icon: Gamepad2,
      color: "bg-indigo-100 text-indigo-600",
      demo: {
        simulations: [
          "Laboratório de Química Virtual",
          "Viagem no Tempo - História",
          "Corpo Humano 3D Interativo",
          "Simulador de Física Quântica"
        ]
      },
      features: [
        "Experiências hands-on",
        "Ambientes fotorrealistas",
        "Consequências realistas",
        "Aprendizado por tentativa"
      ]
    }
  };

  const currentFeature = advancedFeatures[activeFeature];
  const IconComponent = currentFeature.icon;

  return (
    <div className="space-y-6">
      {/* Feature Selection */}
      <Card className="border-l-4 border-l-cyan-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-cyan-600" />
            Recursos Avançados do EDU
          </CardTitle>
          <p className="text-sm text-gray-600">
            Tecnologias de ponta que tornam o aprendizado uma experiência única
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(advancedFeatures).map(([key, feature]) => {
              const FeatureIcon = feature.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFeature(key)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    activeFeature === key ? feature.color + ' border-current' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FeatureIcon className="w-8 h-8 mb-2" />
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Feature Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <IconComponent className="w-5 h-5 mr-2" />
            {currentFeature.title}
          </CardTitle>
          <p className="text-sm text-gray-600">{currentFeature.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Voice Feature Demo */}
            {activeFeature === "voice" && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium mb-3">Conversa Exemplo:</h5>
                  <div className="space-y-3">
                    {currentFeature.demo.conversation.map((msg, i) => (
                      <div key={i} className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.speaker === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          <div className="text-sm">{msg.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Button className="bg-red-500 hover:bg-red-600 rounded-full w-16 h-16">
                    <Mic className="w-8 h-8" />
                  </Button>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-800">Pressione para falar</div>
                    <div className="text-xs text-blue-600">IA está ouvindo e pronta para responder</div>
                  </div>
                </div>
              </div>
            )}

            {/* Translation Feature Demo */}
            {activeFeature === "realtime" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-700 mb-2">Texto Original</h5>
                    <p className="text-sm">{currentFeature.demo.original}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-700 mb-2">Tradução Instantânea</h5>
                    <p className="text-sm">{currentFeature.demo.translated}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {currentFeature.demo.languages.map((lang, i) => (
                    <Badge key={i} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* AR Feature Demo */}
            {activeFeature === "ar" && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-3">Cenários de Uso:</h5>
                  <div className="space-y-2">
                    {currentFeature.demo.scenarios.map((scenario, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">{scenario}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center p-8 border-2 border-dashed border-purple-300 rounded-lg">
                  <Camera className="w-16 h-16 mx-auto text-purple-400 mb-4" />
                  <h4 className="text-lg font-medium text-purple-700 mb-2">
                    Aponte a Câmera para Qualquer Objeto
                  </h4>
                  <p className="text-sm text-purple-600">
                    IA reconhece e sobrepõe informações educativas em tempo real
                  </p>
                </div>
              </div>
            )}

            {/* Social Feature Demo */}
            {activeFeature === "social" && (
              <div className="space-y-4">
                <h5 className="font-medium text-orange-700">Salas de Estudo Ativas:</h5>
                {currentFeature.demo.activeRooms.map((room, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h6 className="font-medium">{room.topic}</h6>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{room.participants} participantes</span>
                        <MapPin className="w-4 h-4" />
                        <span>{room.country}</span>
                      </div>
                    </div>
                    <Button size="sm">Entrar</Button>
                  </div>
                ))}
              </div>
            )}

            {/* Emotion Feature Demo */}
            {activeFeature === "adaptive" && (
              <div className="space-y-4">
                <h5 className="font-medium text-red-700">Adaptação Emocional:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentFeature.demo.emotions.map((item, i) => (
                    <div key={i} className={`p-3 rounded-lg border-l-4 border-${item.color}-500 bg-${item.color}-50`}>
                      <div className="font-medium text-sm">{item.emotion}</div>
                      <div className="text-xs text-gray-600">{item.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulation Feature Demo */}
            {activeFeature === "immersive" && (
              <div className="space-y-4">
                <h5 className="font-medium text-indigo-700">Simulações Disponíveis:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentFeature.demo.simulations.map((sim, i) => (
                    <div key={i} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Gamepad2 className="w-5 h-5 text-indigo-600" />
                        <h6 className="font-medium text-indigo-800">{sim}</h6>
                      </div>
                      <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Iniciar Simulação
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features List */}
            <div className="mt-6">
              <h5 className="font-medium text-gray-700 mb-3">Recursos Técnicos:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentFeature.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="text-cyan-800">Roadmap de Implementação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <h5 className="font-medium text-cyan-800 mb-2">Fase 1 (3 meses)</h5>
                <ul className="text-sm text-cyan-700 space-y-1">
                  <li>• Conversa com IA Professor</li>
                  <li>• Tradução básica</li>
                  <li>• Detecção emocional simples</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h5 className="font-medium text-cyan-800 mb-2">Fase 2 (6 meses)</h5>
                <ul className="text-sm text-cyan-700 space-y-1">
                  <li>• Realidade Aumentada</li>
                  <li>• Salas colaborativas</li>
                  <li>• Simuladores básicos</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h5 className="font-medium text-cyan-800 mb-2">Fase 3 (12 meses)</h5>
                <ul className="text-sm text-cyan-700 space-y-1">
                  <li>• IA emocional avançada</li>
                  <li>• Simulações fotorrealistas</li>
                  <li>• Integração completa</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Lightbulb className="w-4 h-4 mr-2" />
                Começar Desenvolvimento
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}