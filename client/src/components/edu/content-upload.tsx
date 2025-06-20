import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  Link,
  Camera,
  Brain,
  Zap,
  CheckCircle,
  Calendar,
  Clock,
  Target
} from "lucide-react";

export default function ContentUpload() {
  const [uploadMethod, setUploadMethod] = useState("pdf");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const [learningGoal, setLearningGoal] = useState({
    subject: "",
    deadline: "",
    dailyTime: "",
    examType: "",
    currentLevel: ""
  });

  const uploadMethods = [
    {
      id: "pdf",
      title: "Upload PDF",
      description: "Livros, apostilas, artigos em PDF",
      icon: FileText,
      color: "bg-red-100 text-red-600"
    },
    {
      id: "image",
      title: "Foto/Imagem",
      description: "Fotos de slides, quadros, anotações",
      icon: Image,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "text",
      title: "Colar Texto",
      description: "Cole texto diretamente no app",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "link",
      title: "Link/URL",
      description: "Artigos web, vídeos YouTube",
      icon: Link,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const mockProcessingSteps = [
    { step: "Analisando conteúdo...", progress: 20, duration: 1000 },
    { step: "Extraindo conceitos principais...", progress: 40, duration: 1500 },
    { step: "Criando trilha personalizada...", progress: 60, duration: 2000 },
    { step: "Gerando atividades interativas...", progress: 80, duration: 1000 },
    { step: "Finalizando sua jornada de aprendizado...", progress: 100, duration: 500 }
  ];

  const handleUpload = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < mockProcessingSteps.length; i++) {
      const step = mockProcessingSteps[i];
      setProcessProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }
    
    // Simular conclusão
    setTimeout(() => {
      setIsProcessing(false);
      setProcessProgress(0);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-green-600" />
            Começar Nova Jornada de Aprendizado
          </CardTitle>
          <p className="text-sm text-gray-600">
            Upload seu material e a IA criará uma trilha personalizada para você
          </p>
        </CardHeader>
      </Card>

      {!isProcessing ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Methods */}
          <Card>
            <CardHeader>
              <CardTitle>1. Escolha seu Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        uploadMethod === method.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setUploadMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded ${method.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{method.title}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Upload Area */}
                <div className="mt-6 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  {uploadMethod === "pdf" && (
                    <div>
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Arraste um PDF aqui ou clique para selecionar</p>
                      <Button>Selecionar PDF</Button>
                    </div>
                  )}
                  
                  {uploadMethod === "image" && (
                    <div>
                      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Tire uma foto ou faça upload de imagem</p>
                      <div className="space-x-2">
                        <Button>📷 Tirar Foto</Button>
                        <Button variant="outline">🖼️ Galeria</Button>
                      </div>
                    </div>
                  )}
                  
                  {uploadMethod === "text" && (
                    <div>
                      <Textarea 
                        placeholder="Cole aqui o texto que você quer estudar..."
                        className="min-h-[120px] mb-4"
                      />
                      <Button>Processar Texto</Button>
                    </div>
                  )}
                  
                  {uploadMethod === "link" && (
                    <div>
                      <Input 
                        placeholder="https://exemplo.com/artigo"
                        className="mb-4"
                      />
                      <Button>Analisar Link</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>2. Configure sua Meta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>O que você quer aprender?</Label>
                  <Input 
                    placeholder="Ex: Física para ENEM, Python Básico..."
                    value={learningGoal.subject}
                    onChange={(e) => setLearningGoal({...learningGoal, subject: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Quando é seu prazo/prova?</Label>
                  <Input 
                    type="date"
                    value={learningGoal.deadline}
                    onChange={(e) => setLearningGoal({...learningGoal, deadline: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Quanto tempo tem por dia?</Label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={learningGoal.dailyTime}
                    onChange={(e) => setLearningGoal({...learningGoal, dailyTime: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="30min">30 minutos</option>
                    <option value="1h">1 hora</option>
                    <option value="2h">2 horas</option>
                    <option value="3h">3 horas ou mais</option>
                  </select>
                </div>

                <div>
                  <Label>Tipo de prova/objetivo</Label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={learningGoal.examType}
                    onChange={(e) => setLearningGoal({...learningGoal, examType: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="enem">ENEM</option>
                    <option value="vestibular">Vestibular</option>
                    <option value="concurso">Concurso Público</option>
                    <option value="certificacao">Certificação</option>
                    <option value="pessoal">Crescimento Pessoal</option>
                  </select>
                </div>

                <div>
                  <Label>Seu nível atual no assunto</Label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={learningGoal.currentLevel}
                    onChange={(e) => setLearningGoal({...learningGoal, currentLevel: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="iniciante">Iniciante</option>
                    <option value="basico">Básico</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </div>

                <Button 
                  onClick={handleUpload}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!learningGoal.subject || !learningGoal.deadline}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Criar Trilha com IA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Processing State */
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <Brain className="w-16 h-16 mx-auto text-blue-600 animate-pulse mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  IA Criando Sua Trilha Personalizada
                </h3>
                <p className="text-gray-600">
                  Analisando {learningGoal.subject} para criar a melhor experiência de aprendizado
                </p>
              </div>

              <div className="space-y-4">
                <Progress value={processProgress} className="h-3" />
                <div className="text-sm text-gray-600">
                  {mockProcessingSteps.find(s => s.progress <= processProgress)?.step || "Processando..."}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Cronograma Otimizado</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span>Atividades Personalizadas</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>Tempo Otimizado</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Preview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">O que a IA vai criar para você</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <FileText className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <h4 className="font-medium text-blue-800">Resumos Inteligentes</h4>
              <p className="text-sm text-blue-600">IA extrai pontos principais</p>
            </div>
            
            <div className="text-center p-4">
              <Brain className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <h4 className="font-medium text-purple-800">Quizzes Adaptativos</h4>
              <p className="text-sm text-purple-600">Baseados no seu conteúdo</p>
            </div>
            
            <div className="text-center p-4">
              <Calendar className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <h4 className="font-medium text-green-800">Cronograma Perfeito</h4>
              <p className="text-sm text-green-600">Até o dia da prova</p>
            </div>
            
            <div className="text-center p-4">
              <Zap className="w-8 h-8 mx-auto text-orange-600 mb-2" />
              <h4 className="font-medium text-orange-800">Múltiplos Formatos</h4>
              <p className="text-sm text-orange-600">Áudio, vídeo, flashcards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}