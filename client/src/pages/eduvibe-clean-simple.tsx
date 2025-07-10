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
          {/* Seção de Análise de Texto */}
          <div className="space-y-6">
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

                            {/* SEÇÃO DE ANÁLISE IA INTEGRADA */}
                            {file.analysis && (
                              <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
                                <div className="flex items-center gap-2 mb-2">
                                  <Brain className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm font-semibold text-blue-800">Análise IA Completa</span>
                                </div>
                                
                                <div className="text-xs text-blue-700 mb-3 leading-relaxed">
                                  <strong>📋 Resumo:</strong> {file.analysis.summary.substring(0, 150)}...
                                </div>

                                <div className="space-y-2">
                                  <div>
                                    <div className="text-xs font-semibold text-green-700 mb-1">📚 Sugestões de Estudo:</div>
                                    <ul className="text-xs text-green-600 ml-2 space-y-1">
                                      {file.analysis.studySuggestions?.slice(0, 2).map((suggestion: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-1">
                                          <span className="text-green-500 mt-0.5">•</span>
                                          <span>{suggestion.substring(0, 80)}...</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <div className="text-xs font-semibold text-orange-700 mb-1">💪 Exercícios Práticos:</div>
                                    <ul className="text-xs text-orange-600 ml-2 space-y-1">
                                      {file.analysis.practiceExercises?.slice(0, 2).map((exercise: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-1">
                                          <span className="text-orange-500 mt-0.5">•</span>
                                          <span>{exercise.substring(0, 80)}...</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-3 flex gap-2">
                                  <Button
                                    onClick={() => {
                                      setCurrentText(file.content);
                                      setShowingText(true);
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="text-xs py-1 px-2 h-auto border-blue-300 text-blue-600 hover:bg-blue-50"
                                  >
                                    📖 Ver Material
                                  </Button>
                                  <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                    <span>🎯</span>
                                    <span>IA Aplicada</span>
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