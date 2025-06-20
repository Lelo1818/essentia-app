import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Calendar, 
  Clock, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Download,
  Brain,
  Zap,
  CheckCircle,
  RotateCcw,
  FileText,
  Video,
  Headphones,
  Target,
  BookOpen,
  Eye,
  Settings
} from "lucide-react";

export default function ProfessionalFeatures() {
  const [currentStep, setCurrentStep] = useState(1);
  const [contentData, setContentData] = useState(null);
  const [trailGenerated, setTrailGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [adhdMode, setAdhdMode] = useState(false);

  // Simulação dos dados da trilha baseada no briefing
  const learningTrail = {
    title: "Física - Leis de Newton",
    targetDate: "2025-07-15",
    dailyTime: "30 min",
    totalDays: 25,
    currentDay: 3,
    schedule: [
      { day: 1, type: "resumo", title: "Resumo: Conceitos Básicos", duration: "15 min", completed: true },
      { day: 1, type: "audio", title: "Áudio Narrado", duration: "10 min", completed: true },
      { day: 2, type: "quiz", title: "Quiz: 5 questões", duration: "10 min", completed: true },
      { day: 2, type: "flashcard", title: "Flashcards", duration: "15 min", completed: true },
      { day: 3, type: "video", title: "Vídeo Resumo", duration: "8 min", completed: false },
      { day: 3, type: "revisao", title: "Revisão Espaçada", duration: "12 min", completed: false },
      { day: 4, type: "quiz", title: "Quiz Avançado", duration: "15 min", completed: false }
    ]
  };

  const handleContentUpload = () => {
    setContentData({
      type: "PDF",
      title: "Apostila de Física - Cap. 2",
      size: "2.3 MB",
      pages: 15,
      extractedText: "As Leis de Newton formam a base da mecânica clássica...",
      confidence: 94
    });
    setCurrentStep(2);
  };

  const generateTrail = () => {
    setTrailGenerated(true);
    setCurrentStep(3);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simular progresso do áudio
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'resumo': return FileText;
      case 'audio': return Headphones;
      case 'quiz': return Brain;
      case 'flashcard': return Zap;
      case 'video': return Video;
      case 'revisao': return RotateCcw;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Status */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-600" />
                EDU Professional - Trilha Inteligente
              </CardTitle>
              <p className="text-sm text-gray-600">
                Baseado em ciência cognitiva e curva de Ebbinghaus
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={dyslexiaMode ? "default" : "outline"}
                onClick={() => setDyslexiaMode(!dyslexiaMode)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Dislexia
              </Button>
              <Button
                size="sm"
                variant={adhdMode ? "default" : "outline"}
                onClick={() => setAdhdMode(!adhdMode)}
              >
                <Zap className="w-4 h-4 mr-1" />
                TDAH
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-20 h-1 mx-2 ${
                    currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600">
              {currentStep === 1 && "Upload do Conteúdo"}
              {currentStep === 2 && "Configuração da Meta"}
              {currentStep === 3 && "Trilha Gerada"}
              {currentStep === 4 && "Executando Trilha"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Content Upload */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>1. Upload de Conteúdo</CardTitle>
            <p className="text-sm text-gray-600">
              Aceita PDF, texto, links ou imagem com OCR automático
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <FileText className="w-8 h-8" />
                  <span className="text-sm">PDF</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Imagem OCR</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <FileText className="w-8 h-8" />
                  <span className="text-sm">Texto</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col space-y-2">
                  <BookOpen className="w-8 h-8" />
                  <span className="text-sm">Link</span>
                </Button>
              </div>

              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Arraste arquivos ou clique para fazer upload
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  PDF, imagens, texto ou links - processamos tudo automaticamente
                </p>
                <Button onClick={handleContentUpload} className="bg-indigo-600 hover:bg-indigo-700">
                  Simular Upload
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Tecnologias Utilizadas:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Google Vision API para OCR avançado</li>
                  <li>• Firebase Storage para armazenamento seguro</li>
                  <li>• Processamento automático de texto</li>
                  <li>• Suporte offline após download</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Goal Configuration */}
      {currentStep === 2 && contentData && (
        <Card>
          <CardHeader>
            <CardTitle>2. Configuração da Meta</CardTitle>
            <p className="text-sm text-gray-600">
              Defina seu objetivo e tempo disponível para gerar trilha personalizada
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Content Preview */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">✅ Conteúdo Processado</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Tipo:</span>
                    <span className="ml-1 font-medium">{contentData.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Páginas:</span>
                    <span className="ml-1 font-medium">{contentData.pages}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tamanho:</span>
                    <span className="ml-1 font-medium">{contentData.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">OCR:</span>
                    <span className="ml-1 font-medium text-green-600">{contentData.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Goal Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Título do Estudo</Label>
                    <Input defaultValue="Física - Leis de Newton" />
                  </div>
                  
                  <div>
                    <Label>Data da Prova/Objetivo</Label>
                    <Input type="date" defaultValue="2025-07-15" />
                  </div>
                  
                  <div>
                    <Label>Tempo Diário Disponível</Label>
                    <select className="w-full p-2 border rounded">
                      <option value="15">15 minutos</option>
                      <option value="30" selected>30 minutos</option>
                      <option value="45">45 minutos</option>
                      <option value="60">1 hora</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Nível de Conhecimento</Label>
                    <select className="w-full p-2 border rounded">
                      <option value="iniciante">Iniciante</option>
                      <option value="basico" selected>Básico</option>
                      <option value="intermediario">Intermediário</option>
                      <option value="avancado">Avançado</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label>Tipo de Aprendizado Preferido</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">🎧 Áudio/Narração</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">📖 Leitura/Resumos</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">🎯 Quizzes/Testes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">🎬 Vídeos</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generateTrail} 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Brain className="w-4 h-4 mr-2" />
                Gerar Trilha Inteligente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Generated Trail */}
      {currentStep === 3 && trailGenerated && (
        <Card>
          <CardHeader>
            <CardTitle>3. Trilha Gerada pela IA</CardTitle>
            <p className="text-sm text-gray-600">
              Baseada na Curva de Ebbinghaus com revisões espaçadas otimizadas
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Trail Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">{learningTrail.totalDays}</div>
                  <div className="text-sm text-gray-600">Dias Total</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{learningTrail.dailyTime}</div>
                  <div className="text-sm text-gray-600">Por Dia</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{learningTrail.currentDay}</div>
                  <div className="text-sm text-gray-600">Dia Atual</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">87%</div>
                  <div className="text-sm text-gray-600">Retenção</div>
                </div>
              </div>

              {/* Ebbinghaus Curve Explanation */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">🧠 Ciência por Trás da Trilha</h5>
                <p className="text-sm text-blue-700 mb-2">
                  Utilizamos a Curva de Ebbinghaus para otimizar a retenção de memória:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>1º dia:</strong> Primeiro contato com conteúdo</li>
                  <li>• <strong>3º dia:</strong> Primeira revisão (retenção: 60%)</li>
                  <li>• <strong>7º dia:</strong> Segunda revisão (retenção: 80%)</li>
                  <li>• <strong>21º dia:</strong> Revisão final (retenção: 95%)</li>
                </ul>
              </div>

              {/* Trail Schedule */}
              <div>
                <h5 className="font-medium text-gray-700 mb-3">Cronograma Detalhado:</h5>
                <div className="space-y-3">
                  {learningTrail.schedule.map((activity, i) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div
                        key={i}
                        className={`flex items-center space-x-4 p-3 border rounded-lg ${
                          activity.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded ${
                          activity.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            activity.completed ? 'text-green-600' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Dia {activity.day}</span>
                            <Badge variant="secondary" className="text-xs">
                              {activity.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">{activity.title}</div>
                        </div>
                        
                        <div className="text-sm text-gray-500">{activity.duration}</div>
                        
                        {activity.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Button size="sm">Iniciar</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button 
                onClick={() => setCurrentStep(4)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Começar Trilha de Aprendizado
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Executing Trail */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Current Activity */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="w-5 h-5 mr-2 text-green-600" />
                Atividade Atual: Vídeo Resumo
              </CardTitle>
              <p className="text-sm text-gray-600">Dia 3 - 8 minutos restantes</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h4 className="text-lg font-medium mb-2">Leis de Newton - Resumo Visual</h4>
                    <p className="text-sm opacity-75">Vídeo gerado automaticamente com FFMPEG</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button onClick={toggleAudio} className="bg-green-600 hover:bg-green-700">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <div className="flex-1">
                    <Progress value={audioProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>2:30</span>
                      <span>8:00</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adaptive Mode Toggles */}
          {(dyslexiaMode || adhdMode) && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Modo Adaptativo Ativo</CardTitle>
              </CardHeader>
              <CardContent>
                {dyslexiaMode && (
                  <div className="mb-4 p-3 bg-white rounded border" style={{ fontFamily: 'OpenDyslexic, Arial, sans-serif' }}>
                    <h5 className="font-medium text-yellow-800 mb-2">🔤 Modo Dislexia Ativo</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Fonte OpenDyslexic para melhor leitura</li>
                      <li>• Espaçamento entre linhas aumentado</li>
                      <li>• Cores contrastantes</li>
                      <li>• Opção de leitura em voz alta</li>
                    </ul>
                  </div>
                )}
                
                {adhdMode && (
                  <div className="p-3 bg-white rounded border">
                    <h5 className="font-medium text-yellow-800 mb-2">⚡ Modo TDAH Ativo</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Sessões curtas de 10-15 minutos</li>
                      <li>• Timer visual com alarmes suaves</li>
                      <li>• Reforços positivos frequentes</li>
                      <li>• Pausas automáticas programadas</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">2 de 3 atividades concluídas</span>
                  <span className="text-sm text-gray-600">67%</span>
                </div>
                <Progress value={67} className="h-3" />
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded">
                    <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-1" />
                    <div className="text-sm font-medium">Resumo</div>
                    <div className="text-xs text-gray-500">15 min</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border-2 border-blue-500">
                    <Video className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                    <div className="text-sm font-medium">Vídeo</div>
                    <div className="text-xs text-gray-500">8 min</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <RotateCcw className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                    <div className="text-sm font-medium">Revisão</div>
                    <div className="text-xs text-gray-500">12 min</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notificações Simbólicas */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Mensagens Simbólicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <div className="text-sm text-purple-700">"Hoje você planta uma semente. 🌱"</div>
            </div>
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <div className="text-sm text-purple-700">"Um passo por dia vale ouro. ✨"</div>
            </div>
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <div className="text-sm text-purple-700">"Respira. E vamos de novo. 🌊"</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}