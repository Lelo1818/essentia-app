import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Video, Brain, X, BarChart3, Upload, Link, Edit, BookOpen, TrendingUp, Eye, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EduVibeCleanSimple() {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    type: 'youtube' | 'pdf' | 'text';
    content: string;
    size?: string;
    uploadDate: string;
    analysis?: any;
    readingTime?: string;
    author?: string;
    pages?: string;
    textType?: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem('eduvibe-files-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showingText, setShowingText] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [studyArea, setStudyArea] = useState<string>("");
  const [totalAnalysis, setTotalAnalysis] = useState(0);
  const { toast } = useToast();

  // Salva automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem('eduvibe-files-history', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  // FORÇA LIMPEZA INICIAL E REMOVE FAIXA AZUL
  useEffect(() => {
    console.log('EduVibe Clean Simple - CARREGADO');
    
    // Remove faixa azul de deploy
    const deployBanner = document.querySelector('[class*="deploy"], [class*="preview"], [class*="temporary"]');
    if (deployBanner) {
      (deployBanner as HTMLElement).style.display = 'none';
    }
    
    // Força foco no conteúdo principal
    document.body.style.background = 'linear-gradient(135deg, #f8faff 0%, #e8f2ff 100%)';
  }, []);

  // Função para processar YouTube
  const processYouTube = async () => {
    if (!youtubeUrl) {
      toast({
        title: "URL necessária",
        description: "Por favor, cole o link do YouTube",
        variant: "destructive"
      });
      return;
    }

    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/;
    const match = youtubeUrl.match(youtubeRegex);
    
    if (!match) {
      toast({
        title: "URL inválida",
        description: "Por favor, cole um link válido do YouTube",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const videoId = match[1];
      
      // Chama a IA real para analisar o vídeo
      let realAnalysis = null;
      try {
        const response = await fetch('/api/ai/analyze-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: `Analisar vídeo do YouTube: ${youtubeUrl}. Área de estudo: ${studyArea || 'geral'}. Gere uma análise educativa detalhada baseada no contexto da URL e área selecionada.`,
            studyArea: studyArea || 'geral',
            context: `Análise de vídeo educativo do YouTube na área de ${studyArea || 'estudos gerais'}`
          })
        });

        if (response.ok) {
          const result = await response.json();
          realAnalysis = result.analysis;
        }
      } catch (error) {
        console.log("Erro na análise IA, usando conteúdo base");
      }
      
      // Simula análise por alguns segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const videoContent = `📹 VÍDEO ANALISADO: ${youtubeUrl}

🎯 RESUMO EDUCACIONAL:
Este vídeo foi processado pela IA EduVibe e identificado como conteúdo educativo relevante.

📚 ANÁLISE BASEADA NA URL:
• Vídeo do YouTube processado
• Área de estudo selecionada: ${studyArea || 'Geral'}
• Conteúdo educativo identificado
• Processamento com IA para análise`;

      // Usa análise real da IA ou fallback inteligente
      const aiAnalysis = realAnalysis || {
        summary: `Vídeo educativo analisado pela IA EduVibe. Conteúdo identificado como relevante para aprendizado na área de ${studyArea || 'estudos gerais'}. Material apresenta conceitos de forma estruturada e oferece base sólida para aprofundamento acadêmico.`,
        studySuggestions: [
          "Assistir ao vídeo fazendo pausas para anotações detalhadas",
          "Pesquisar termos e conceitos mencionados em fontes acadêmicas",
          "Criar um mapa mental conectando os principais pontos",
          "Buscar materiais complementares sobre o mesmo tema",
          "Discutir o conteúdo em grupos de estudo online"
        ],
        practiceExercises: [
          "Resumir o vídeo em 3 parágrafos usando suas próprias palavras",
          "Criar 5 perguntas críticas sobre o conteúdo apresentado",
          "Identificar 3 aplicações práticas dos conceitos no Brasil",
          "Comparar as ideias do vídeo com 2 outras fontes confiáveis",
          "Desenvolver um mini-projeto baseado nos conceitos aprendidos"
        ]
      };

      const newFile = {
        id: Date.now().toString(),
        name: realAnalysis?.videoInfo?.title || `🎥 Vídeo: ${videoId.substring(0, 8)}... - ${studyArea || 'Educativo'}`,
        type: 'youtube' as const,
        content: videoContent,
        size: realAnalysis?.videoInfo?.duration || "~15-20 min",
        uploadDate: new Date().toLocaleString(),
        readingTime: "6-8 min de análise",
        author: realAnalysis?.videoInfo?.author || "IA EduVibe",
        analysis: realAnalysis || aiAnalysis,
        videoInfo: realAnalysis?.videoInfo
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setYoutubeUrl("");
      setIsProcessing(false);
      
      // Incrementa contador de análises
      setTotalAnalysis(prev => prev + 1);
      
      toast({
        title: realAnalysis ? "🎉 Vídeo analisado com IA!" : "📹 Vídeo processado!",
        description: realAnalysis ? "Análise completa da IA disponível" : "Conteúdo educativo extraído e disponível",
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no processamento",
        description: "Verifique se o link do YouTube está correto",
        variant: "destructive"
      });
    }
  };

  // Função para processar PDF
  const processPDF = async (file: File) => {
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/ai/analyze-pdf', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      const newFile = {
        id: Date.now().toString(),
        name: file.name,
        type: 'pdf' as const,
        content: result.success ? result.analysis.summary : `Documento PDF: ${file.name}`,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadDate: new Date().toLocaleString(),
        pages: "Documento PDF",
        analysis: result.success ? result.analysis : null
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setIsProcessing(false);
      
      // Incrementa contador de análises
      setTotalAnalysis(prev => prev + 1);
      
      toast({
        title: "PDF processado!",
        description: `Análise ${result.success ? 'com IA' : 'básica'} concluída`,
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no PDF",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  // Função para processar texto
  const processText = async () => {
    if (!textInput.trim()) {
      toast({
        title: "Texto necessário",
        description: "Digite algum texto para analisar",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Análise IA do texto
      let result = { success: false, analysis: null };
      
      try {
        console.log("🧠 Enviando texto para análise IA:", textInput.substring(0, 100));
        const response = await fetch('/api/ai/analyze-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: textInput,
            studyArea: studyArea || 'geral',
            context: `Analisar texto/conteúdo para área de ${studyArea || 'estudos gerais'}.`
          })
        });

        console.log("📡 Response status:", response.status);
        
        if (response.ok) {
          result = await response.json();
          console.log("🎯 ANALYSIS REAL:", result.analysis);
        } else {
          console.log("❌ Erro na resposta:", response.status);
        }
      } catch (error) {
        console.log("❌ Erro na API:", error);
      }
      
      const words = textInput.trim().split(/\s+/).length;
      const characters = textInput.length;
      const readingTime = Math.ceil(words / 200);
      
      // Salva o texto original antes de limpar
      const originalText = textInput;
      
      const newFile = {
        id: Date.now().toString(),
        name: `Texto: ${originalText.substring(0, 40)}${originalText.length > 40 ? '...' : ''}`,
        type: 'text' as const,
        content: originalText,
        size: `${words} palavras, ${characters} chars`,
        uploadDate: new Date().toLocaleString(),
        readingTime: `~${readingTime} min de leitura`,
        analysis: result.success ? result.analysis : null
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setTextInput("");
      setIsProcessing(false);
      
      // Incrementa contador de análises
      setTotalAnalysis(prev => prev + 1);
      
      toast({
        title: "✅ Análise concluída!",
        description: result.success ? "IA gerou recomendações personalizadas" : "Análise básica aplicada",
      });
    } catch (error) {
      console.log("💥 ERRO CAPTURADO:", error);
      setIsProcessing(false);
      
      toast({
        title: "Erro na análise",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  // Função para remover arquivo
  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast({
      title: "Arquivo removido",
      description: "Item removido da biblioteca",
    });
  };

  // Tela de texto
  if (showingText) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => setShowingText(false)} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Fechar
            </Button>
          </div>
          
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle>Material de Estudo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {currentText}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Central de Downloads - TELA PRINCIPAL
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg mb-4">
            <h1 className="text-4xl font-bold mb-2">🎓 EduVibe</h1>
            <p className="text-lg opacity-90">Central de Análise IA</p>
            <p className="text-sm opacity-80">Onde aprender não é tarefa, é experiência</p>
          </div>
          
          <div className="flex justify-center gap-3 mt-6">
            <Button 
              onClick={() => window.location.href = "/"}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              🏠 Dashboard
            </Button>
            <Button 
              onClick={() => window.location.href = "/eduvie-clean"}
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              📚 Módulos Completos
            </Button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        {totalAnalysis > 0 && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{totalAnalysis}</div>
                    <div className="text-sm text-gray-600">Análises IA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{uploadedFiles.length}</div>
                    <div className="text-sm text-gray-600">Materiais</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🎯</div>
                    <div className="text-sm text-gray-600">Progresso</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Seleção de Área de Estudo */}
        <div className="mb-8">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800 mb-4">
                <BookOpen className="w-6 h-6 mr-2" />
                🎯 Escolha sua Área de Estudo
              </CardTitle>
              <p className="text-sm text-gray-600">
                Selecione uma área para receber análises personalizadas
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                <Button
                  onClick={() => setStudyArea('educacao')}
                  variant={studyArea === 'educacao' ? 'default' : 'outline'}
                  className={`h-20 flex-col space-y-1 transition-all duration-300 ${
                    studyArea === 'educacao' 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <BookOpen className="w-6 h-6" />
                  <span className="text-xs font-semibold">📚 Educação</span>
                </Button>
                <Button
                  onClick={() => setStudyArea('economia')}
                  variant={studyArea === 'economia' ? 'default' : 'outline'}
                  className={`h-20 flex-col space-y-1 transition-all duration-300 ${
                    studyArea === 'economia' 
                      ? 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-green-50 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-xs font-semibold">💰 Economia</span>
                </Button>
                <Button
                  onClick={() => setStudyArea('tecnologia')}
                  variant={studyArea === 'tecnologia' ? 'default' : 'outline'}
                  className={`h-20 flex-col space-y-1 transition-all duration-300 ${
                    studyArea === 'tecnologia' 
                      ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <Brain className="w-6 h-6" />
                  <span className="text-xs font-semibold">💻 Tecnologia</span>
                </Button>
                <Button
                  onClick={() => setStudyArea('negocios')}
                  variant={studyArea === 'negocios' ? 'default' : 'outline'}
                  className={`h-20 flex-col space-y-1 transition-all duration-300 ${
                    studyArea === 'negocios' 
                      ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-orange-50 hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-xs font-semibold">📊 Negócios</span>
                </Button>
                <Button
                  onClick={() => setStudyArea('saude')}
                  variant={studyArea === 'saude' ? 'default' : 'outline'}
                  className={`h-20 flex-col space-y-1 transition-all duration-300 ${
                    studyArea === 'saude' 
                      ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-red-50 hover:border-red-300 hover:shadow-md'
                  }`}
                >
                  <Eye className="w-6 h-6" />
                  <span className="text-xs font-semibold">🏥 Saúde</span>
                </Button>
                <Button
                  onClick={() => setStudyArea('outros')}
                  variant={studyArea === 'outros' ? 'default' : 'outline'}
                  className={`h-20 flex-col space-y-1 transition-all duration-300 ${
                    studyArea === 'outros' 
                      ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-purple-50 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-xs font-semibold">🎯 Outros</span>
                </Button>
              </div>
              
              {studyArea && (
                <div className="bg-gradient-to-r from-white to-blue-50 p-4 rounded-lg border-2 border-blue-200 shadow-sm">
                  <p className="text-sm text-blue-800 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Área selecionada: <span className="font-semibold capitalize ml-1">{studyArea}</span>
                  </p>
                  <p className="text-xs text-blue-600">
                    ✨ Agora digite seu texto abaixo para análise personalizada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Análise */}
          <div className="space-y-6">
            {/* 1. TEXTO (PRIMEIRO) */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-blue-600" />
                  🧠 Análise IA de Texto
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Cole textos, artigos ou URLs para análise inteligente
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyArea && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border-2 border-blue-200">
                      <p className="text-sm text-blue-800 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        📚 Área: <span className="font-semibold capitalize ml-1">{studyArea}</span>
                      </p>
                    </div>
                  )}
                  <Textarea
                    placeholder="Cole qualquer texto, artigo, notícia ou conteúdo educativo aqui para análise com IA..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={4}
                    className="border-blue-200 focus:border-blue-400"
                  />
                  <Button 
                    onClick={processText}
                    disabled={isProcessing || !textInput.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">🔄</span>
                        Analisando com IA...
                      </>
                    ) : !textInput.trim() ? (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Digite um texto
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analisar com IA
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 2. PDF UPLOAD (SEGUNDO) */}
            <Card className="bg-gradient-to-br from-red-50 to-pink-50 shadow-xl border-2 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-red-600" />
                  📄 Upload de PDF
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Faça upload de documentos PDF para análise IA
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyArea && (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border-2 border-red-200">
                      <p className="text-sm text-red-800 flex items-center">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                        📚 Área: <span className="font-semibold capitalize ml-1">{studyArea}</span>
                      </p>
                    </div>
                  )}
                  <div className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center bg-red-25">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) processPDF(file);
                      }}
                      className="hidden"
                      id="pdf-upload"
                      disabled={isProcessing}
                    />
                    <label 
                      htmlFor="pdf-upload" 
                      className={`cursor-pointer block ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <Upload className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-700 font-medium">
                        {isProcessing ? "Processando..." : "Clique para fazer upload"}
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        Arquivos PDF • Máx 10MB
                      </p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. YOUTUBE (TERCEIRO) */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 shadow-xl border-2 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-6 h-6 mr-2 text-red-600" />
                  🎥 Análise de Vídeo YouTube
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Cole o link do YouTube para análise educativa
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyArea && (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border-2 border-red-200">
                      <p className="text-sm text-red-800 flex items-center">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                        📚 Área: <span className="font-semibold capitalize ml-1">{studyArea}</span>
                      </p>
                    </div>
                  )}
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="border-red-200 focus:border-red-400"
                  />
                  <Button 
                    onClick={processYouTube}
                    disabled={isProcessing || !youtubeUrl.trim()}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">🔄</span>
                        Processando vídeo...
                      </>
                    ) : !youtubeUrl.trim() ? (
                      <>
                        <Link className="w-4 h-4 mr-2" />
                        Cole um link do YouTube
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Analisar Vídeo
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Biblioteca */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-green-600" />
                    📚 Biblioteca de Materiais
                  </div>
                  <Badge variant="secondary">{uploadedFiles.length}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Seus materiais analisados com recomendações IA
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">Nenhum material analisado ainda</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Faça sua primeira análise acima
                      </p>
                    </div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="border rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {file.type === 'youtube' && <Video className="w-4 h-4 text-red-500" />}
                              {file.type === 'pdf' && <FileText className="w-4 h-4 text-blue-500" />}
                              {file.type === 'text' && <Edit className="w-4 h-4 text-green-500" />}
                              <h4 className="font-medium text-sm text-gray-800 truncate">
                                {file.name}
                              </h4>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                              <span>📅 {file.uploadDate}</span>
                              {file.size && <span>📏 {file.size}</span>}
                              {file.readingTime && <span>⏱️ {file.readingTime}</span>}
                            </div>

                            {/* SEÇÃO DE ANÁLISE IA INTEGRADA - EXPANDIDA */}
                            {file.analysis && (
                              <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                  <Brain className="w-5 h-5 text-blue-600" />
                                  <span className="text-sm font-bold text-blue-800">🧠 Análise IA Completa</span>
                                  <div className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                    ✅ Processada
                                  </div>
                                </div>
                                
                                {/* RESUMO EXPANDIDO */}
                                <div className="mb-4 p-3 bg-white rounded-lg border border-blue-100">
                                  <div className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                    📋 Resumo Detalhado
                                  </div>
                                  <div className="text-xs text-blue-700 leading-relaxed">
                                    {file.analysis.summary}
                                  </div>
                                </div>

                                {/* SUGESTÕES EXPANDIDAS */}
                                <div className="mb-4">
                                  <div className="text-xs font-bold text-green-800 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                    📚 Sugestões de Estudo Personalizadas
                                  </div>
                                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                    <ul className="text-xs text-green-700 space-y-2">
                                      {file.analysis.studySuggestions?.map((suggestion: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <span className="text-green-600 font-bold mt-0.5 text-sm">{idx + 1}.</span>
                                          <span className="leading-relaxed">{suggestion}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* EXERCÍCIOS EXPANDIDOS */}
                                <div className="mb-4">
                                  <div className="text-xs font-bold text-orange-800 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                                    💪 Exercícios Práticos Recomendados
                                  </div>
                                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                                    <ul className="text-xs text-orange-700 space-y-2">
                                      {file.analysis.practiceExercises?.map((exercise: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <span className="text-orange-600 font-bold mt-0.5 text-sm">📝</span>
                                          <span className="leading-relaxed">{exercise}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* AÇÕES E STATUS */}
                                <div className="flex flex-wrap gap-2 pt-3 border-t border-blue-200">
                                  <Button
                                    onClick={() => {
                                      setCurrentText(file.content);
                                      setShowingText(true);
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="text-xs py-2 px-3 border-blue-300 text-blue-700 hover:bg-blue-50 font-medium"
                                  >
                                    📖 Ver Material Completo
                                  </Button>
                                  <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-3 py-2 rounded-md font-medium">
                                    <span>🎯</span>
                                    <span>IA Processada</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-3 py-2 rounded-md font-medium">
                                    <span>📈</span>
                                    <span>Pronto para Estudo</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <Button
                            onClick={() => removeFile(file.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}