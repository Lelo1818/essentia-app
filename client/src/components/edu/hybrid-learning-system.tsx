import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap,
  Target,
  Users,
  Globe,
  Mic,
  Eye,
  Gamepad2,
  Volume2,
  Camera,
  BookOpen,
  FileText,
  Video,
  Headphones,
  Clock,
  Star,
  TrendingUp,
  Settings,
  Play,
  Pause
} from "lucide-react";

export default function HybridLearningSystem() {
  const [activeFeature, setActiveFeature] = useState("ebbinghaus");

  // Combinação do briefing técnico + funcionalidades avançadas
  const hybridFeatures = {
    ebbinghaus: {
      title: "Trilhas com Curva de Ebbinghaus",
      description: "Ciência cognitiva aplicada para máxima retenção",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
      technical: {
        backend: "Node.js + MongoDB",
        algorithm: "Spaced Repetition + Forgetting Curve",
        retention: "95% após 21 dias"
      },
      demo: {
        timeline: [
          { day: 1, activity: "Primeiro contato", retention: 100 },
          { day: 3, activity: "Primeira revisão", retention: 60 },
          { day: 7, activity: "Segunda revisão", retention: 80 },
          { day: 21, activity: "Revisão final", retention: 95 }
        ]
      }
    },
    adaptiveAI: {
      title: "IA que Lê Emoções + OCR Multilíngua",
      description: "Combinação de reconhecimento facial + processamento de texto",
      icon: Eye,
      color: "bg-blue-100 text-blue-600",
      technical: {
        vision: "Google Vision API + TensorFlow",
        emotion: "Real-time facial analysis",
        languages: "50+ idiomas com 94% precisão"
      },
      demo: {
        emotions: ["Focado", "Frustrado", "Cansado", "Entediado"],
        adaptations: ["Aumenta dificuldade", "Simplifica", "Sugere pausa", "Gamifica"]
      }
    },
    multimodal: {
      title: "TTS + Vídeos Automáticos + AR",
      description: "Múltiplos formatos gerados automaticamente",
      icon: Video,
      color: "bg-green-100 text-green-600",
      technical: {
        tts: "Google Cloud TTS / Amazon Polly",
        video: "FFMPEG automated generation",
        ar: "ARCore/ARKit integration"
      },
      demo: {
        outputs: ["Áudio narrado", "Vídeo resumo", "Flashcards", "AR overlay"]
      }
    },
    collaborative: {
      title: "Estudo Global + Modo TDAH/Dislexia",
      description: "Social learning + acessibilidade avançada",
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      technical: {
        social: "Firebase Realtime + WebRTC",
        accessibility: "OpenDyslexic + WCAG 2.1",
        offline: "Service Workers + IndexedDB"
      },
      demo: {
        features: ["Salas globais", "Fonte adaptada", "Timer visual", "Suporte offline"]
      }
    }
  };

  const currentFeature = hybridFeatures[activeFeature];
  const IconComponent = currentFeature.icon;

  const techStack = {
    frontend: ["React Native", "Flutter", "WebRTC", "Service Workers"],
    backend: ["Node.js", "Firebase Functions", "MongoDB", "Redis"],
    ai: ["Google Vision", "TensorFlow", "OpenAI GPT", "Anthropic Claude"],
    media: ["FFMPEG", "Google TTS", "Amazon Polly", "WebGL"],
    mobile: ["ARCore", "ARKit", "Push Notifications", "Offline Storage"]
  };

  const marketDifferential = [
    {
      feature: "OCR Multilíngua Avançado",
      us: "50+ idiomas, 94% precisão, contexto preservado",
      competitors: "Básico, poucos idiomas, sem contexto",
      advantage: "🟢 Único no Brasil"
    },
    {
      feature: "IA Emocional Adaptativa",
      us: "Análise facial real-time, ajuste automático",
      competitors: "Algoritmos básicos, sem adaptação",
      advantage: "🟢 Tecnologia própria"
    },
    {
      feature: "Curva de Ebbinghaus Aplicada",
      us: "Ciência cognitiva real, retenção 95%",
      competitors: "Revisões simples, sem ciência",
      advantage: "🟢 Resultados comprovados"
    },
    {
      feature: "Geração Automática Multi-formato",
      us: "PDF→Áudio→Vídeo→Quiz→AR automaticamente",
      competitors: "Formatos isolados, trabalho manual",
      advantage: "🟢 Automação completa"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Zap className="w-6 h-6 mr-3 text-cyan-600" />
            EDU Híbrido - Sistema de Aprendizado Completo
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Combinação do briefing técnico profissional + funcionalidades revolucionárias
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-cyan-600">50+</div>
              <div className="text-sm text-gray-600">Idiomas OCR</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Retenção</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">Faixas Etárias</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Formatos</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Disponível</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos Híbridos Integrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(hybridFeatures).map(([key, feature]) => {
              const FeatureIcon = feature.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFeature(key)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    activeFeature === key 
                      ? feature.color + ' border-current' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FeatureIcon className="w-8 h-8 mb-2" />
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Feature Details */}
          <div className={`p-6 rounded-lg border-2 ${currentFeature.color} bg-opacity-50`}>
            <div className="flex items-center space-x-3 mb-4">
              <IconComponent className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">{currentFeature.title}</h3>
                <p className="text-sm opacity-75">{currentFeature.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">Especificações Técnicas:</h5>
                <div className="space-y-2 text-sm">
                  {Object.entries(currentFeature.technical).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key}:</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-3">Demonstração:</h5>
                {activeFeature === "ebbinghaus" && (
                  <div className="space-y-2">
                    {currentFeature.demo.timeline.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold">
                          {item.day}
                        </div>
                        <div className="flex-1">{item.activity}</div>
                        <Badge variant="secondary">{item.retention}%</Badge>
                      </div>
                    ))}
                  </div>
                )}

                {activeFeature === "adaptiveAI" && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {currentFeature.demo.emotions.map((emotion, i) => (
                      <div key={i} className="p-2 bg-white rounded border">
                        <div className="font-medium">{emotion}</div>
                        <div className="text-xs text-gray-600">
                          → {currentFeature.demo.adaptations[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeFeature === "multimodal" && (
                  <div className="grid grid-cols-2 gap-2">
                    {currentFeature.demo.outputs.map((output, i) => (
                      <div key={i} className="p-2 bg-white rounded border text-sm text-center">
                        {output}
                      </div>
                    ))}
                  </div>
                )}

                {activeFeature === "collaborative" && (
                  <div className="grid grid-cols-2 gap-2">
                    {currentFeature.demo.features.map((feature, i) => (
                      <div key={i} className="p-2 bg-white rounded border text-sm text-center">
                        {feature}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Stack Tecnológico Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div key={category} className="space-y-3">
                <h5 className="font-medium text-gray-700 capitalize">{category}</h5>
                <div className="space-y-1">
                  {technologies.map((tech, i) => (
                    <div key={i} className="text-xs p-2 bg-gray-50 rounded border">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Differential */}
      <Card>
        <CardHeader>
          <CardTitle>Diferenciais Competitivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketDifferential.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="font-medium text-gray-800">{item.feature}</div>
                <div className="text-sm text-green-700">{item.us}</div>
                <div className="text-sm text-gray-600">{item.competitors}</div>
                <div className="text-sm font-medium">{item.advantage}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-800">Roadmap de Implementação Híbrido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h5 className="font-bold text-indigo-800">Fase 1: MVP Técnico (3 meses)</h5>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• OCR básico + TTS</li>
                <li>• Trilhas com Ebbinghaus</li>
                <li>• Upload PDF/imagem</li>
                <li>• Quiz automático</li>
                <li>• Modo TDAH/Dislexia</li>
                <li>• Notificações simbólicas</li>
              </ul>
              <Badge className="bg-indigo-100 text-indigo-700">Baseado no briefing</Badge>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-indigo-800">Fase 2: IA Avançada (6 meses)</h5>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Análise emocional</li>
                <li>• Conversa com IA Professor</li>
                <li>• Tradução simultânea</li>
                <li>• Vídeos automáticos</li>
                <li>• Faixas etárias completas</li>
                <li>• Colaboração básica</li>
              </ul>
              <Badge className="bg-purple-100 text-purple-700">Funcionalidades avançadas</Badge>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-indigo-800">Fase 3: Ecosystem (12 meses)</h5>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Realidade Aumentada</li>
                <li>• Simuladores imersivos</li>
                <li>• Integração Flow+Purpose</li>
                <li>• API para escolas</li>
                <li>• Marketplace conteúdo</li>
                <li>• Expansão global</li>
              </ul>
              <Badge className="bg-green-100 text-green-700">Ecossistema completo</Badge>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Target className="w-4 h-4 mr-2" />
              Implementar Sistema Híbrido
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}