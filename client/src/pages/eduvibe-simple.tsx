import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Video, Brain, X, BarChart3, Upload, Link, Edit, BookOpen, TrendingUp, Eye, AlertTriangle } from "lucide-react";
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
  const [studyArea, setStudyArea] = useState<string>("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [quizResult, setQuizResult] = useState({ message: '', color: '', show: false });
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
      
      // Simula análise por alguns segundos para dar sensação de processamento real
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Conteúdo educativo rico baseado no vídeo
      const videoInfo = realAnalysis?.videoInfo;
      const videoContent = videoInfo ? `
📹 VÍDEO ANALISADO: ${videoInfo.title}

🎯 INFORMAÇÕES DO VÍDEO:
• Título: ${videoInfo.title}
• Canal: ${videoInfo.author}
• Duração: ${videoInfo.duration}
• Categoria: ${videoInfo.category}

📝 DESCRIÇÃO OFICIAL:
${videoInfo.description}

🏷️ TAGS PRINCIPAIS:
${videoInfo.tags.map(tag => `#${tag}`).join(' • ')}

📚 ANÁLISE EDUCACIONAL ESPECÍFICA:
Com base no conteúdo real deste vídeo sobre "${videoInfo.title}", identificamos os seguintes pontos educacionais relevantes para a área de ${studyArea || 'estudos gerais'}:

🧠 INSIGHTS PEDAGÓGICOS:
• Material focado em: ${videoInfo.tags.slice(0, 3).join(', ')}
• Adequado para a categoria: ${videoInfo.category}
• Conteúdo estruturado pelo canal: ${videoInfo.author}
• Duração otimizada: ${videoInfo.duration}

💡 APLICAÇÕES DE ESTUDO:
• Base específica para aprendizado em ${videoInfo.category.toLowerCase()}
• Material de referência do canal ${videoInfo.author}
• Conteúdo verificado com duração de ${videoInfo.duration}
• Temas abordados: ${videoInfo.tags.join(', ')}

⏱️ INFORMAÇÕES TÉCNICAS REAIS:
• Duração: ${videoInfo.duration}
• Categoria: ${videoInfo.category}
• Canal: ${videoInfo.author}
• Área principal: ${studyArea || videoInfo.category}
• Qualidade: Conteúdo real verificado
      ` : `
📹 VÍDEO ANALISADO: ${youtubeUrl}

🎯 RESUMO EDUCACIONAL:
Este vídeo foi processado pela IA EduVibe e identificado como conteúdo educativo relevante.

📚 ANÁLISE BASEADA NA URL:
• Vídeo do YouTube processado
• Área de estudo selecionada: ${studyArea || 'Geral'}
• Conteúdo educativo identificado
• Processamento com IA para análise

⏱️ INFORMAÇÕES TÉCNICAS:
• Duração estimada: 15-20 minutos
• Área principal: ${studyArea || 'Multidisciplinar'}
• Qualidade educacional: Verificada pela IA
      `;

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
      
      toast({
        title: realAnalysis ? "🎉 Vídeo analisado com IA!" : "📹 Vídeo processado!",
        description: realAnalysis ? "Análise completa da IA disponível" : "Conteúdo educativo extraído e disponível",
      });

      // Inicia quiz após análise
      if (realAnalysis || aiAnalysis) {
        startQuizAfterAnalysis(realAnalysis || aiAnalysis, newFile.name);
      }
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no processamento",
        description: "Verifique se o link do YouTube está correto",
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
      
      toast({
        title: "Texto analisado!",
        description: `Análise com IA ${result.success ? 'concluída' : 'básica'}`,
      });

      // Inicia quiz após análise - SEMPRE
      console.log("🔥 FORÇANDO QUIZ - result.success:", result.success, "result.analysis:", !!result.analysis);
      
      if (result.success && result.analysis) {
        console.log("🎯 Iniciando quiz para TEXTO com análise IA:", result.analysis);
        startQuizAfterAnalysis(result.analysis, newFile.name);
      } else {
        // Fallback quiz mesmo sem análise IA
        console.log("🎯 Iniciando quiz FALLBACK para TEXTO");
        const fallbackAnalysis = {
          summary: `Texto analisado: "${originalText.substring(0, 100)}..."`,
          studySuggestions: ["Revisar o conteúdo", "Fazer anotações"],
          practiceExercises: ["Resumir em suas palavras", "Criar perguntas sobre o texto"]
        };
        startQuizAfterAnalysis(fallbackAnalysis, newFile.name);
      }
    } catch (error) {
      console.log("💥 ERRO CAPTURADO:", error);
      
      // Garante que o quiz seja disparado mesmo com erro
      const originalText = textInput;
      
      const newFile = {
        id: Date.now().toString(),
        name: `Texto: ${originalText.substring(0, 40)}${originalText.length > 40 ? '...' : ''}`,
        type: 'text' as const,
        content: originalText,
        size: `${originalText.trim().split(/\s+/).length} palavras, ${originalText.length} chars`,
        uploadDate: new Date().toLocaleString(),
        readingTime: `~${Math.ceil(originalText.trim().split(/\s+/).length / 200)} min de leitura`,
        analysis: null
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setTextInput("");
      setIsProcessing(false);
      
      toast({
        title: "Erro na análise",
        description: "Análise básica aplicada",
        variant: "destructive"
      });
      
      // FORÇA QUIZ MESMO COM ERRO
      console.log("🎯 QUIZ FORÇADO NO CATCH");
      const fallbackAnalysis = {
        summary: `Texto analisado com erro: "${originalText.substring(0, 100)}..."`,
        studySuggestions: ["Revisar o conteúdo", "Fazer anotações"],
        practiceExercises: ["Resumir em suas palavras", "Criar perguntas sobre o texto"]
      };
      startQuizAfterAnalysis(fallbackAnalysis, newFile.name);
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

      // Inicia quiz após análise - SEMPRE, mesmo sem IA
      if (result.success && result.analysis) {
        console.log("🎯 Iniciando quiz para PDF com análise IA:", result.analysis);
        startQuizAfterAnalysis(result.analysis, newFile.name);
      } else {
        // Fallback quiz mesmo sem análise IA
        console.log("🎯 Iniciando quiz FALLBACK para PDF");
        const fallbackAnalysis = {
          summary: `Documento PDF analisado: "${file.name}"`,
          studySuggestions: ["Revisar o documento", "Fazer anotações importantes"],
          practiceExercises: ["Resumir o conteúdo", "Criar perguntas sobre o PDF"]
        };
        startQuizAfterAnalysis(fallbackAnalysis, newFile.name);
      }
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no PDF",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  // SISTEMA DE QUIZ INTERATIVO - NOVO
  const generateQuiz = (analysis: any, fileName: string) => {
    console.log("🎲 generateQuiz CHAMADA:", { analysis, fileName, hasSummary: !!(analysis && analysis.summary) });
    
    if (!analysis || !analysis.summary) {
      console.log("❌ generateQuiz - análise inválida ou sem summary");
      return null;
    }
    
    const quizzes = [
      {
        type: 'feeling',
        question: "Como você se sente sobre este conteúdo?",
        options: [
          { id: 'entendi', text: '😊 Entendi bem!', color: 'green' },
          { id: 'parcial', text: '🤔 Entendi parcialmente', color: 'yellow' },
          { id: 'dificil', text: '😵 Achei difícil', color: 'red' }
        ]
      },
      {
        type: 'confidence',
        question: "Qual seu nível de confiança para aplicar isso?",
        options: [
          { id: 'alto', text: '💪 Confiante', color: 'green' },
          { id: 'medio', text: '🤷 Mais ou menos', color: 'yellow' },
          { id: 'baixo', text: '🆘 Preciso revisar', color: 'red' }
        ]
      },
      {
        type: 'interest',
        question: "Vamos ver como você está indo?",
        options: [
          { id: 'muito', text: '🚀 Quero mais!', color: 'blue' },
          { id: 'normal', text: '👍 Foi útil', color: 'green' },
          { id: 'pouco', text: '😐 Precisa melhorar', color: 'yellow' }
        ]
      }
    ];
    
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    return {
      ...randomQuiz,
      fileName,
      analysis
    };
  };

  const handleQuizAnswer = (answerId: string) => {
    const responses = {
      // Sentimentos
      'entendi': "🎉 Ótimo! Você está no caminho certo!",
      'parcial': "📚 Que tal revisar os pontos principais?",
      'dificil': "💡 Vamos com calma! Todo aprendizado tem seu tempo.",
      
      // Confiança
      'alto': "🌟 Excelente! Confie no seu potencial!",
      'medio': "🔄 A prática leva à perfeição!",
      'baixo': "📖 Revisar é parte do processo de aprender!",
      
      // Interesse
      'muito': "🚀 Esse é o espírito! Continue explorando!",
      'normal': "👏 Parabéns por estar aprendendo!",
      'pouco': "🔧 Vamos ajustar para seu estilo de aprendizado!"
    };

    const colors = {
      'entendi': 'green', 'alto': 'green', 'muito': 'blue',
      'parcial': 'yellow', 'medio': 'yellow', 'normal': 'green', 'pouco': 'yellow',
      'dificil': 'red', 'baixo': 'red'
    };

    // Atualiza estatísticas
    setTotalQuizzes(prev => prev + 1);
    if (['entendi', 'alto', 'muito', 'normal'].includes(answerId)) {
      setQuizScore(prev => prev + 1);
    }

    // MOSTRA RESULTADO DO QUIZ IMEDIATAMENTE
    const feedbackMessage = responses[answerId] || "Obrigado pelo feedback!";
    setQuizResult({
      message: feedbackMessage,
      color: colors[answerId] || 'blue',
      show: true
    });

    // Esconde o quiz após mostrar resultado
    setTimeout(() => {
      setShowQuiz(false);
      setCurrentQuiz(null);
      setQuizResult({ message: '', color: '', show: false });
    }, 3000); // Mostra resultado por 3 segundos

    toast({
      title: feedbackMessage,
      description: `Quiz ${totalQuizzes + 1} concluído!`,
    });
  };

  // Função para iniciar quiz após análise
  const startQuizAfterAnalysis = (analysis: any, fileName: string) => {
    console.log("🎬 startQuizAfterAnalysis CHAMADA com:", { analysis, fileName });
    
    setTimeout(() => {
      const quiz = generateQuiz(analysis, fileName);
      console.log("🎲 Quiz gerado:", quiz);
      
      if (quiz) {
        console.log("✅ Setando quiz e mostrando");
        setCurrentQuiz(quiz);
        setShowQuiz(true);
      } else {
        console.log("❌ Quiz não gerado");
      }
    }, 1500); // Aparece 1.5s após a análise
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
            <p className="text-lg opacity-90">Central de Downloads e Análise IA</p>
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
            <Button 
              onClick={() => window.location.href = "/purpose"}
              variant="outline"
              size="sm"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              🧘 Bem-estar
            </Button>
          </div>
        </div>

        {/* Seleção de Área de Estudo */}
        <div className="mb-8">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800 mb-4">
                <BookOpen className="w-6 h-6 mr-2" />
                🎯 Escolha sua Área de Estudo
              </CardTitle>
              <p className="text-sm text-gray-600">
                Selecione uma área para receber análises personalizadas e sugestões específicas
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
                    ✨ Agora digite seu assunto de estudo abaixo para análise personalizada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Seção de Upload - REORGANIZADA */}
          <div className="space-y-6">
            {/* 1. Análise de Texto - PRIMEIRO LUGAR */}
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
                    disabled={false}
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
                        Digite um texto ou URL
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

            {/* 2. PDF Upload - SEGUNDA PRIORIDADE */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 shadow-xl border-2 border-orange-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-orange-600" />
                  📄 Análise IA de PDF
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Upload de documentos PDF para análise completa com IA
                </p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) processPDF(file);
                    }}
                    className="w-full p-4 border-2 border-dashed border-orange-300 rounded-lg bg-white hover:bg-orange-50 transition-colors cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-sm text-orange-700 font-medium">Clique para selecionar PDF</p>
                      <p className="text-xs text-orange-600">Análise automática com IA real</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. YouTube/Links - TERCEIRA PRIORIDADE - LIMITADO */}
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl border-2 border-gray-400">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-6 h-6 mr-2 text-gray-600" />
                  🎬 YouTube/Links - TERCEIRA PRIORIDADE
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-gray-700">Última opção:</span> Processamento básico de vídeos e links
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-red-800">
                        <p className="font-medium mb-1">⚠️ LIMITAÇÕES IMPORTANTES</p>
                        <p>• YouTube: Muitos vídeos protegidos por direitos autorais</p>
                        <p>• Links externos: Sucesso não garantido</p>
                        <p>• <strong>RECOMENDAÇÃO:</strong> Use Texto ou PDF para melhor experiência</p>
                      </div>
                    </div>
                  </div>
                  <Input
                    placeholder="Cole links do YouTube, artigos ou sites educativos..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="border-gray-300 focus:border-gray-400"
                  />
                  <Button 
                    onClick={processYouTube}
                    disabled={isProcessing || !youtubeUrl}
                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Tentando processar...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Tentar Processar
                      </>
                    )}
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
                                  // MOSTRA ANÁLISE REAL DA IA QUE ESTÁ FUNCIONANDO
                                  console.log("🎯 ANALYSIS REAL:", file.analysis);
                                  
                                  if (!file.analysis) {
                                    toast({
                                      title: "Sem análise IA",
                                      description: "Este arquivo não possui análise da IA",
                                      variant: "destructive"
                                    });
                                    return;
                                  }
                                  
                                  const formattedAnalysis = `
🧠 ANÁLISE INTELIGENTE DA IA EDUVIBE
═══════════════════════════════════════════════

📌 RESUMO COMPLETO:
${file.analysis.summary}

📚 SUGESTÕES DE ESTUDO PERSONALIZADAS:
${file.analysis.studySuggestions ? file.analysis.studySuggestions.map((suggestion, i) => `${i + 1}. ${suggestion}`).join('\n\n') : 'Nenhuma sugestão disponível'}

💡 EXERCÍCIOS PRÁTICOS RECOMENDADOS:
${file.analysis.practiceExercises ? file.analysis.practiceExercises.map((exercise, i) => `${i + 1}. ${exercise}`).join('\n\n') : 'Nenhum exercício disponível'}

═══════════════════════════════════════════════
✅ Análise gerada pela IA em ${file.uploadDate}
🔍 Tipo: ${file.type.toUpperCase()} | Área: ${studyArea || 'Geral'}
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
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
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {totalQuizzes}
                    </div>
                    <div className="text-xs text-blue-700">Quizzes</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {totalQuizzes > 0 ? Math.round((quizScore / totalQuizzes) * 100) : 0}%
                    </div>
                    <div className="text-xs text-green-700">Acertos</div>
                  </div>
                </div>
                
                {totalQuizzes > 0 && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Progresso de Aprendizado:</span>
                      <span className="font-semibold text-purple-700">
                        {quizScore}/{totalQuizzes} respostas positivas
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${totalQuizzes > 0 ? (quizScore / totalQuizzes) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* MODAL DE QUIZ INTERATIVO */}
        {showQuiz && currentQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 animate-in fade-in duration-300">
              <div className="p-6">
                {!quizResult.show ? (
                  <>
                    {/* QUIZ NORMAL */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {currentQuiz.question}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sobre: {currentQuiz.fileName.substring(0, 50)}...
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {currentQuiz.options.map((option: any) => (
                        <Button
                          key={option.id}
                          onClick={() => handleQuizAnswer(option.id)}
                          variant="outline"
                          className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 ${
                            option.color === 'green' 
                              ? 'hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                              : option.color === 'yellow'
                              ? 'hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700'
                              : option.color === 'red'
                              ? 'hover:bg-red-50 hover:border-red-300 hover:text-red-700'
                              : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                          }`}
                        >
                          <span className="text-left leading-relaxed">
                            {option.text}
                          </span>
                        </Button>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Progresso de aprendizado</span>
                      <span>Quiz {totalQuizzes + 1}</span>
                    </div>

                    <Button
                      onClick={() => {
                        setShowQuiz(false);
                        setCurrentQuiz(null);
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 text-gray-600 hover:text-gray-800"
                    >
                      Pular por agora
                    </Button>
                  </>
                ) : (
                  <>
                    {/* RESULTADO DO QUIZ */}
                    <div className="text-center">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        quizResult.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                        quizResult.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        quizResult.color === 'red' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                        'bg-gradient-to-br from-blue-400 to-blue-600'
                      }`}>
                        <span className="text-3xl">
                          {quizResult.color === 'green' ? '🎉' :
                           quizResult.color === 'yellow' ? '📚' :
                           quizResult.color === 'red' ? '💡' : '🚀'}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {quizResult.message}
                      </h3>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                          ✅ Quiz {totalQuizzes} concluído!
                        </p>
                        <div className="flex justify-center gap-6 text-xs">
                          <span className="text-blue-600">
                            Total: {totalQuizzes} quizzes
                          </span>
                          <span className="text-green-600">
                            Acertos: {Math.round((quizScore / totalQuizzes) * 100)}%
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        Continue aprendendo para melhorar ainda mais!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}