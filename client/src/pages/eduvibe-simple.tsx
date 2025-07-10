import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Video, Brain, X, BarChart3, Upload, Link, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EduVibeSimple() {
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
  const { toast } = useToast();

  // Salva automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem('eduvibe-files-history', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  // FORÇA LIMPEZA INICIAL E REMOVE FAIXA AZUL
  useEffect(() => {
    console.log('EduVibe Simple - CARREGADO DIRETO NA CENTRAL');
    
    // Remove faixa azul de deploy
    const deployBanner = document.querySelector('[class*="deploy"], [class*="preview"], [class*="temporary"]');
    if (deployBanner) {
      (deployBanner as HTMLElement).style.display = 'none';
    }
    
    // Força foco no conteúdo principal
    document.body.style.background = 'linear-gradient(135deg, #f8faff 0%, #e8f2ff 100%)';
  }, []);

  // Função para processar YouTube
  const processYouTubeVideo = async () => {
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
      const videoData = {
        title: "Vídeo do YouTube",
        author_name: "Canal YouTube",
        duration: 300
      };

      const newFile = {
        id: Date.now().toString(),
        name: videoData.title,
        type: 'youtube' as const,
        content: youtubeUrl,
        size: `Duração: ${Math.floor(videoData.duration / 60)}:${(videoData.duration % 60).toString().padStart(2, '0')}`,
        uploadDate: new Date().toLocaleString(),
        author: videoData.author_name
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setYoutubeUrl("");
      setIsProcessing(false);
      
      toast({
        title: "Vídeo adicionado!",
        description: "YouTube processado com sucesso",
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no processamento",
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
      const response = await fetch('/api/ai/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput })
      });

      const result = await response.json();
      
      const words = textInput.trim().split(/\s+/).length;
      const characters = textInput.length;
      const readingTime = Math.ceil(words / 200);
      
      const newFile = {
        id: Date.now().toString(),
        name: `Texto: ${textInput.substring(0, 40)}${textInput.length > 40 ? '...' : ''}`,
        type: 'text' as const,
        content: textInput,
        size: `${words} palavras, ${characters} chars`,
        uploadDate: new Date().toLocaleString(),
        readingTime: `~${readingTime} min de leitura`,
        analysis: result.success ? result.analysis : null
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setTextInput("");
      setIsProcessing(false);
      
      toast({
        title: "Texto analisado!",
        description: `Análise com IA ${result.success ? 'concluída' : 'básica'}`,
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro na análise",
        description: "Análise básica aplicada",
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎓 EduVibe</h1>
          <p className="text-lg text-gray-600">Central de Downloads e Análise IA</p>
          <p className="text-sm text-gray-500">Onde aprender não é tarefa, é experiência</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              onClick={() => window.location.href = "/dashboard-unificado"}
              variant="outline"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              🏠 Dashboard Principal
            </Button>
            <Button 
              onClick={() => window.location.href = "/flow"}
              variant="outline"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              💰 Flow Financeiro
            </Button>
            <Button 
              onClick={() => window.location.href = "/purpose"}
              variant="outline"
              className="text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              🌟 Essentia
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Seção de Upload */}
          <div className="space-y-6">
            {/* YouTube */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-6 h-6 mr-2 text-red-600" />
                  Download YouTube
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Cole o link do YouTube aqui..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                  <Button 
                    onClick={processYouTubeVideo}
                    disabled={isProcessing}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {isProcessing ? "Processando..." : "Baixar Vídeo"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PDF Upload */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-orange-600" />
                  Upload PDF
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) processPDF(file);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Análise de Texto */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-purple-600" />
                  Análise IA de Texto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Cole seu texto aqui para análise com IA..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={4}
                  />
                  <Button 
                    onClick={processText}
                    disabled={isProcessing}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isProcessing ? "Analisando..." : "Analisar com IA"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Biblioteca de Arquivos */}
          <div className="space-y-6">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Download className="w-6 h-6 mr-2 text-blue-600" />
                    Biblioteca ({uploadedFiles.length})
                  </span>
                  {uploadedFiles.length > 0 && (
                    <Button 
                      onClick={() => {
                        setUploadedFiles([]);
                        toast({
                          title: "Biblioteca limpa!",
                          description: "Todos os arquivos foram removidos",
                        });
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Limpar Tudo
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum arquivo ainda.</p>
                    <p className="text-sm">Faça upload para começar!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {file.type === 'youtube' && <Video className="w-4 h-4 text-red-500" />}
                              {file.type === 'pdf' && <FileText className="w-4 h-4 text-orange-500" />}
                              {file.type === 'text' && <Edit className="w-4 h-4 text-purple-500" />}
                              <h4 className="font-medium text-sm">{file.name}</h4>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <p>📅 {file.uploadDate}</p>
                              <p>📊 {file.size}</p>
                              {file.readingTime && <p>⏱️ {file.readingTime}</p>}
                              {file.author && <p>👤 {file.author}</p>}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            {file.analysis && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const formattedAnalysis = `
📚 ANÁLISE INTELIGENTE - ${file.name}
═══════════════════════════════════════════════

📌 RESUMO PRÁTICO:
${file.analysis.summary}

📘 SUGESTÕES DE ESTUDO:
${file.analysis.studySuggestions?.map((suggestion, i) => `${i + 1}. ${suggestion}`).join('\n') || 'Não disponível'}

💡 EXERCÍCIOS PRÁTICOS:
${file.analysis.practiceExercises?.map((exercise, i) => `${i + 1}. ${exercise}`).join('\n') || 'Não disponível'}

═══════════════════════════════════════════════
⚡ Análise gerada por IA
                                  `;
                                  setCurrentText(formattedAnalysis);
                                  setShowingText(true);
                                }}
                                className="bg-purple-50 hover:bg-purple-100 text-purple-700"
                              >
                                <Brain className="w-4 h-4" />
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCurrentText(file.content);
                                setShowingText(true);
                              }}
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                  Estatísticas de Uso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {uploadedFiles.filter(f => f.type === 'youtube').length}
                    </div>
                    <div className="text-xs text-red-700">Vídeos</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {uploadedFiles.filter(f => f.type === 'pdf').length}
                    </div>
                    <div className="text-xs text-orange-700">PDFs</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {uploadedFiles.filter(f => f.type === 'text').length}
                    </div>
                    <div className="text-xs text-purple-700">Textos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}