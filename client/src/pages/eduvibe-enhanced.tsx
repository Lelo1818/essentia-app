import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Book, 
  Brain, 
  Target, 
  MessageCircle, 
  CheckCircle, 
  Video,
  FileText,
  Users,
  ArrowRight,
  Star,
  Award,
  Lightbulb,
  ArrowLeft,
  Home,
  X,
  Download,
  Upload,
  Edit,
  Share,
  Bookmark,
  Sparkles,
  BarChart3,
  PlayCircle,
  Zap
} from "lucide-react";
import AITextAnalyzer from "@/components/AITextAnalyzer";

interface Module {
  id: number;
  title: string;
  type: 'video' | 'text' | 'interactive' | 'quiz';
  completed: boolean;
  content: string;
  videoUrl?: string;
}

interface LearningPath {
  id: number;
  title: string;
  description: string;
  progress: number;
  modules: Module[];
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  estimatedTime: string;
}

const videoDatabase = {
  1: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  2: "https://www.youtube.com/embed/L_jWHffIx5E",
  3: "https://www.youtube.com/embed/9bZkp7q19f0",
  4: "https://www.youtube.com/embed/dQw4w9WgXcQ"
};

const textDatabase = {
  1: `
# Entendendo o Dinheiro

O dinheiro é uma ferramenta poderosa que pode transformar vidas quando usado corretamente. Neste módulo, você vai aprender:

## O que é o Dinheiro?
O dinheiro é um meio de troca que facilita as transações econômicas. Ele representa valor e permite que você compre bens e serviços.

## Psicologia do Dinheiro
- **Mindset de Abundância**: Acredite que há oportunidades suficientes para todos
- **Planejamento**: Sempre tenha um plano para seus gastos
- **Disciplina**: A chave para o sucesso financeiro é a consistência

## Primeiros Passos
1. Anote todos os seus gastos por uma semana
2. Identifique padrões de comportamento
3. Estabeleça metas financeiras claras
4. Comece com pequenas mudanças

> "O dinheiro é um excelente servo, mas um péssimo mestre." - Francis Bacon
  `,
  2: `
# Criando seu Primeiro Orçamento

Um orçamento é a base de toda vida financeira organizada. Aqui você aprenderá a criar e manter um orçamento eficaz.

## O que é um Orçamento?
É um plano que mostra suas receitas e despesas durante um período específico, geralmente um mês.

## Método 50/30/20
- **50%** para necessidades (moradia, alimentação, transporte)
- **30%** para desejos (lazer, entretenimento, hobbies)
- **20%** para poupança e investimentos

## Passos para Criar seu Orçamento
1. **Liste todas as receitas** (salário, renda extra, etc.)
2. **Categorize as despesas** (fixas e variáveis)
3. **Defina limites** para cada categoria
4. **Monitore regularmente** e ajuste quando necessário

## Dicas Importantes
- Use aplicativos para controle financeiro
- Revise seu orçamento mensalmente
- Seja realista com suas metas
- Tenha uma reserva para emergências

> "Um orçamento é contar seu dinheiro antes de gastá-lo." - Anônimo
  `,
  3: `
# Investimentos Básicos

Investir é fundamental para fazer seu dinheiro crescer ao longo do tempo. Neste módulo, você aprenderá os conceitos básicos.

## Por que Investir?
- **Inflação**: Seu dinheiro perde valor com o tempo
- **Crescimento**: Investimentos podem multiplicar seu patrimônio
- **Liberdade**: Renda passiva proporciona mais opções de vida

## Tipos de Investimentos
### Renda Fixa
- **Poupança**: Mais segura, menor rentabilidade
- **CDB**: Certificado de Depósito Bancário
- **Tesouro Direto**: Títulos do governo

### Renda Variável
- **Ações**: Partes de empresas
- **Fundos Imobiliários**: Investimento em imóveis
- **Criptomoedas**: Moedas digitais (alto risco)

## Perfil do Investidor
- **Conservador**: Prioriza segurança
- **Moderado**: Equilibra risco e retorno
- **Arrojado**: Aceita maior risco por maior retorno

## Primeiros Passos
1. Defina seu perfil de investidor
2. Comece com renda fixa
3. Diversifique seus investimentos
4. Estude continuamente

> "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora." - Provérbio Chinês
  `
};

export default function EduVibeEnhanced() {
  // Botão flutuante para Central Downloads
  const FloatingDownloadButton = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("🖱️ CLIQUE NO BOTÃO FLUTUANTE");
          setCurrentModuleId("1");
          setCurrentStep(6);
        }}
        className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl transition-all duration-300 hover:scale-110"
        title="Central Downloads"
      >
        <Download className="w-8 h-8" />
      </Button>
    </div>
  );
  // Força limpeza de cache e garante que sempre carregue a versão completa
  useEffect(() => {
    localStorage.removeItem('eduvibe-cache');
    localStorage.removeItem('eduvibe-version');
    localStorage.setItem('eduvibe-version', 'enhanced');
    
    // Adiciona meta tag para evitar cache
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'cache-control';
    metaTag.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(metaTag);
    
    console.log('EduVibe Enhanced - Versão completa das 6 telas carregada!');
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [userName, setUserName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);
  const [showingVideo, setShowingVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [showingText, setShowingText] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    type: 'youtube' | 'pdf' | 'text';
    content: string;
    size?: string;
    uploadDate: string;
  }>>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Força refresh de cache para mobile/desktop
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Cache-Control';
    meta.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(meta);
    
    // Força reload da aplicação
    if (window.location.search.indexOf('refreshed=true') === -1) {
      window.location.search += (window.location.search ? '&' : '?') + 'refreshed=true';
    }
  }, []);

  // Função para gerar trilha baseada no objetivo escolhido
  const generateLearningPath = (goal: string): LearningPath => {
    const pathsDatabase = {
      'yoga': {
        title: "Fundamentos do Yoga",
        description: "Uma jornada completa para dominar as bases do yoga",
        modules: [
          { id: 1, title: "Respiração e Postura Básica", type: 'video' as const, content: "# Respiração no Yoga\n\nA respiração é fundamental no yoga..." },
          { id: 2, title: "Saudação ao Sol", type: 'text' as const, content: "# Saudação ao Sol\n\nSequência básica de movimentos..." },
          { id: 3, title: "Meditação e Relaxamento", type: 'video' as const, content: "# Meditação\n\nTécnicas de meditação para iniciantes..." }
        ]
      },
      'programacao': {
        title: "Programação Web Moderna",
        description: "Do básico ao avançado em desenvolvimento web",
        modules: [
          { id: 1, title: "HTML e CSS Fundamentais", type: 'video' as const, content: "# HTML Básico\n\nEstruturas básicas de HTML..." },
          { id: 2, title: "JavaScript Essencial", type: 'text' as const, content: "# JavaScript\n\nLógica de programação com JavaScript..." },
          { id: 3, title: "React e Projetos Práticos", type: 'video' as const, content: "# React\n\nCriando aplicações modernas..." }
        ]
      },
      'culinaria': {
        title: "Arte Culinária Brasileira",
        description: "Domine os sabores da cozinha brasileira",
        modules: [
          { id: 1, title: "Técnicas Básicas de Cozinha", type: 'video' as const, content: "# Técnicas Culinárias\n\nFundamentos da culinária..." },
          { id: 2, title: "Pratos Tradicionais Brasileiros", type: 'text' as const, content: "# Culinária Brasileira\n\nReceitas tradicionais..." },
          { id: 3, title: "Técnicas Avançadas", type: 'video' as const, content: "# Técnicas Avançadas\n\nAperfeiçoando suas habilidades..." }
        ]
      }
    };

    // Se não encontrar o objetivo específico, usa educação financeira como padrão
    const selectedPath = pathsDatabase[goal.toLowerCase()] || {
      title: "Fundamentos de Educação Financeira",
      description: "Uma jornada completa para organizar sua vida financeira",
      modules: [
        { id: 1, title: "Entendendo o Dinheiro", type: 'video' as const, content: textDatabase[1] },
        { id: 2, title: "Criando seu Primeiro Orçamento", type: 'text' as const, content: textDatabase[2] },
        { id: 3, title: "Investimentos Básicos", type: 'video' as const, content: textDatabase[3] }
      ]
    };

    return {
      id: 1,
      title: selectedPath.title,
      description: selectedPath.description,
      progress: 25,
      difficulty: 'Iniciante',
      estimatedTime: "2 semanas",
      modules: selectedPath.modules.map(module => ({
        ...module,
        completed: module.id === 1,
        videoUrl: module.type === 'video' ? videoDatabase[module.id] : undefined
      }))
    };
  };

  // Gera a trilha baseada no objetivo do usuário
  const samplePath = generateLearningPath(learningGoal);

  const showVideo = (moduleId: number) => {
    const videoUrl = videoDatabase[moduleId];
    if (videoUrl) {
      setCurrentVideo(videoUrl);
      setShowingVideo(true);
      toast({
        title: "Vídeo carregado!",
        description: "Aproveite o conteúdo educacional",
      });
    }
  };

  const showText = (moduleId: number) => {
    const textContent = textDatabase[moduleId];
    if (textContent) {
      setCurrentText(textContent);
      setShowingText(true);
      toast({
        title: "Conteúdo carregado!",
        description: "Material de estudo disponível",
      });
    }
  };

  // Função para processar upload de YouTube
  const processYouTubeVideo = async () => {
    console.log("🎬 INICIANDO PROCESSAMENTO YOUTUBE");
    console.log("📍 URL:", youtubeUrl);
    
    if (!youtubeUrl) {
      console.log("❌ URL vazia");
      toast({
        title: "URL necessária",
        description: "Por favor, cole o link do YouTube",
        variant: "destructive"
      });
      return;
    }

    // Validação real de URL do YouTube
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/;
    const match = youtubeUrl.match(youtubeRegex);
    
    console.log("🔍 Regex match:", match);
    
    if (!match) {
      console.log("❌ URL inválida");
      toast({
        title: "URL inválida",
        description: "Por favor, cole um link válido do YouTube",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    console.log("⏳ Iniciando processamento...");
    
    try {
      const videoId = match[1];
      console.log("🎬 Video ID:", videoId);
      
      // Busca informações reais do vídeo via API do YouTube
      const apiUrl = `https://noembed.com/embed?url=${encodeURIComponent(youtubeUrl)}`;
      console.log("🌐 API URL:", apiUrl);
      
      const response = await fetch(apiUrl);
      console.log("📡 Response status:", response.status);
      
      const videoData = await response.json();
      console.log("📊 Video data:", videoData);
      
      const newFile = {
        id: Date.now().toString(),
        name: videoData.title || `YouTube: ${videoId}`,
        type: 'youtube' as const,
        content: youtubeUrl,
        size: videoData.duration ? `Duração: ${Math.floor(videoData.duration/60)}:${(videoData.duration%60).toString().padStart(2,'0')}` : "Duração: N/A",
        uploadDate: new Date().toLocaleString(),
        thumbnail: videoData.thumbnail_url,
        author: videoData.author_name
      };
      
      console.log("📁 Arquivo criado:", newFile);
      
      setUploadedFiles(prev => [...prev, newFile]);
      setYoutubeUrl("");
      
      console.log("✅ Processamento concluído");
      toast({
        title: "Vídeo processado!",
        description: `"${videoData.title || 'Video'}" adicionado à biblioteca`,
      });
    } catch (error) {
      console.log("❌ Erro na API, usando fallback:", error);
      
      // Fallback se API falhar
      const videoId = match[1];
      const newFile = {
        id: Date.now().toString(),
        name: `YouTube: ${videoId}`,
        type: 'youtube' as const,
        content: youtubeUrl,
        uploadDate: new Date().toLocaleString()
      };
      
      console.log("📁 Arquivo fallback:", newFile);
      
      setUploadedFiles(prev => [...prev, newFile]);
      setYoutubeUrl("");
      
      toast({
        title: "Vídeo processado!",
        description: "YouTube video adicionado à sua biblioteca",
      });
    } finally {
      setIsProcessing(false);
      console.log("🏁 Processamento finalizado");
    }
  };

  // Função para processar upload de PDF
  const processPDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione um arquivo PDF",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Processamento real do PDF
      const reader = new FileReader();
      
      reader.onload = async () => {
        try {
          // Converte para base64 para armazenamento
          const base64 = reader.result as string;
          
          // Extrai informações reais do PDF
          const pdfInfo = {
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            lastModified: new Date(file.lastModified).toLocaleDateString(),
            pages: "Estimado: " + Math.ceil(file.size / 50000) + " páginas" // Estimativa baseada no tamanho
          };
          
          const newFile = {
            id: Date.now().toString(),
            name: file.name,
            type: 'pdf' as const,
            content: base64, // Armazena o PDF real em base64
            size: pdfInfo.size,
            uploadDate: new Date().toLocaleString(),
            pages: pdfInfo.pages,
            lastModified: pdfInfo.lastModified
          };
          
          setUploadedFiles(prev => [...prev, newFile]);
          setIsProcessing(false);
          
          toast({
            title: "PDF processado!",
            description: `${file.name} (${pdfInfo.size}) adicionado à biblioteca`,
          });
        } catch (error) {
          setIsProcessing(false);
          toast({
            title: "Erro no processamento",
            description: "Falha ao processar o PDF",
            variant: "destructive"
          });
        }
      };
      
      reader.onerror = () => {
        setIsProcessing(false);
        toast({
          title: "Erro na leitura",
          description: "Não foi possível ler o arquivo",
          variant: "destructive"
        });
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no upload",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  // Função para processar texto direto
  const processTextInput = async () => {
    console.log("📝 INICIANDO PROCESSAMENTO TEXTO");
    console.log("📍 Texto length:", textInput.length);
    console.log("📍 Texto preview:", textInput.substring(0, 100));
    
    if (!textInput.trim()) {
      console.log("❌ Texto vazio");
      toast({
        title: "Texto necessário",
        description: "Digite algum conteúdo para processar",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    console.log("⏳ Iniciando análise...");
    
    try {
      // Análise real do texto
      const textStats = {
        words: textInput.trim().split(/\s+/).length,
        characters: textInput.length,
        paragraphs: textInput.split('\n\n').filter(p => p.trim()).length,
        readingTime: Math.ceil(textInput.trim().split(/\s+/).length / 200) // 200 palavras por minuto
      };
      
      console.log("📊 Estatísticas:", textStats);
      
      // Detecta se é URL, código, ou texto normal
      let textType = "Texto";
      if (textInput.includes('http')) textType = "URL/Link";
      if (textInput.includes('{') || textInput.includes('function') || textInput.includes('class')) textType = "Código";
      if (textInput.split('\n').length > 10 && textInput.length > 500) textType = "Documento";
      
      console.log("🔍 Tipo detectado:", textType);
      
      const newFile = {
        id: Date.now().toString(),
        name: `${textType}: ${textInput.substring(0, 40)}${textInput.length > 40 ? '...' : ''}`,
        type: 'text' as const,
        content: textInput,
        size: `${textStats.words} palavras, ${textStats.characters} chars`,
        uploadDate: new Date().toLocaleString(),
        readingTime: `~${textStats.readingTime} min de leitura`,
        paragraphs: textStats.paragraphs,
        textType: textType
      };
      
      console.log("📁 Arquivo criado:", newFile);
      
      setUploadedFiles(prev => [...prev, newFile]);
      setTextInput("");
      setIsProcessing(false);
      
      console.log("✅ Processamento concluído");
      toast({
        title: "Texto processado!",
        description: `${textType} com ${textStats.words} palavras adicionado`,
      });
    } catch (error) {
      console.log("❌ Erro no processamento:", error);
      setIsProcessing(false);
      toast({
        title: "Erro no processamento",
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

  const goBack = () => {
    if (showingVideo) {
      setShowingVideo(false);
      setCurrentVideo("");
    } else if (showingText) {
      setShowingText(false);
      setCurrentText("");
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Tela de vídeo
  if (showingVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = "/dashboard-unificado"}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Assistindo Vídeo</span>
                <Button variant="ghost" size="sm" onClick={() => setShowingVideo(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                <iframe
                  src={currentVideo}
                  title="Video Educacional"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="text-center">
                <Button onClick={goBack} className="bg-blue-600 hover:bg-blue-700">
                  Continuar Aprendizado
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela de texto
  if (showingText) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = "/dashboard-unificado"}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Material de Estudo</span>
                <Button variant="ghost" size="sm" onClick={() => setShowingText(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {currentText}
                </div>
              </div>
              <div className="text-center mt-8">
                <Button onClick={goBack} className="bg-blue-600 hover:bg-blue-700">
                  Continuar Aprendizado
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela 0: Boas-vindas
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
        <FloatingDownloadButton />
        <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎓</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">EduVibe</h1>
              <p className="text-gray-600">Onde aprender não é tarefa, é experiência</p>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Como você gostaria de ser chamado?"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-center"
              />
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => {
                  if (userName.trim()) {
                    setCurrentStep(1);
                    toast({
                      title: `Bem-vindo(a), ${userName}!`,
                      description: "Vamos começar sua jornada de aprendizado"
                    });
                  }
                }}
                disabled={!userName.trim()}
              >
                Começar Jornada
              </Button>
              
              <div className="border-t pt-4 space-y-2">
                <p className="text-xs text-gray-500 mb-2">Teste direto a funcionalidade:</p>
                <Button 
                  onClick={() => {
                    console.log("🖱️ ACESSO DIRETO AO TESTE");
                    setUserName("Teste");
                    setCurrentModuleId("1");
                    setCurrentStep(6);
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Testar Central Downloads
                </Button>
                <Button 
                  onClick={() => {
                    console.log("🖱️ ACESSO DIRETO À IA");
                    setUserName("Teste IA");
                    setCurrentModuleId("ai");
                    setCurrentStep(6);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Testar IA Real
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela 1: Escolha de Tema
  if (currentStep === 1) {
    const themes = [
      { id: "financas", title: "💰 Educação Financeira", desc: "Organize sua vida financeira" },
      { id: "tecnologia", title: "💻 Tecnologia", desc: "Programação e inovação" },
      { id: "negocios", title: "📈 Negócios", desc: "Empreendedorismo e gestão" },
      { id: "saude", title: "🏥 Saúde e Bem-estar", desc: "Cuide da sua qualidade de vida" },
      { id: "idiomas", title: "🌍 Idiomas", desc: "Aprenda novos idiomas" },
      { id: "criatividade", title: "🎨 Arte e Criatividade", desc: "Desenvolva seu lado criativo" }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Olá, {userName}!</h1>
              <p className="text-gray-600">Que área você gostaria de explorar hoje?</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <Card key={theme.id} className="cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 bg-white border-2 hover:border-blue-500">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{theme.title}</h3>
                  <p className="text-gray-600 mb-4">{theme.desc}</p>
                  <Button 
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      setCurrentStep(2);
                      toast({
                        title: "Tema selecionado!",
                        description: `Vamos explorar ${theme.title.split(' ')[1]}`
                      });
                    }}
                    className="w-full"
                  >
                    Escolher
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tela 2: Objetivo de Aprendizado
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Defina seu objetivo</h1>
              <p className="text-gray-600">O que você espera alcançar?</p>
            </div>
          </div>

          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qual é seu principal objetivo de aprendizado?
                  </label>
                  <Input
                    placeholder="Ex: Quero organizar minhas finanças pessoais"
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quanto tempo você pode dedicar por dia?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["15 min", "30 min", "1 hora", "2+ horas"].map((time) => (
                      <Button
                        key={time}
                        variant={studyTime === time ? "default" : "outline"}
                        onClick={() => setStudyTime(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    if (learningGoal.trim() && studyTime) {
                      setCurrentStep(3);
                      toast({
                        title: "Perfeito!",
                        description: "Vamos criar sua trilha personalizada"
                      });
                    }
                  }}
                  disabled={!learningGoal.trim() || !studyTime}
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela 3: Trilha IA Personalizada
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sua Trilha Personalizada</h1>
              <p className="text-gray-600">IA criou um plano especial para você</p>
            </div>
          </div>

          <Card className="bg-white shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-600" />
                Análise IA Completa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <p className="text-purple-800">
                  🎯 <strong>Seu perfil:</strong> Baseado no seu objetivo "{learningGoal}" e disponibilidade de {studyTime} por dia, 
                  criei uma trilha otimizada para seu sucesso.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">7 dias</div>
                  <div className="text-sm text-blue-700">Para ver resultados</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-green-700">Taxa de sucesso</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-purple-700">Módulos personalizados</div>
                </div>
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  setCurrentStep(4);
                  toast({
                    title: "Trilha ativada!",
                    description: "Vamos começar seu aprendizado"
                  });
                }}
              >
                Ativar Trilha IA
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela 4: Dashboard Principal
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header com navegação */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Olá, {userName}!</h1>
                <p className="text-gray-600">Pronto para aprender algo novo hoje?</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => window.location.href = "/dashboard-unificado"}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard Principal
            </Button>
          </div>

          {/* Trilha de Aprendizado */}
          <Card className="bg-white shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-600" />
                Sua Trilha de Aprendizado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{samplePath.title}</h3>
                  <p className="text-gray-600 mb-4">{samplePath.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{samplePath.difficulty}</Badge>
                    <span className="text-sm text-gray-500">{samplePath.estimatedTime}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm text-gray-500">{samplePath.progress}%</span>
                    </div>
                    <Progress value={samplePath.progress} className="h-2" />
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedPath(samplePath);
                      setCurrentStep(5);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Continuar Aprendizado
                  </Button>
                </div>
                
                {/* Módulos da trilha */}
                <div>
                  <h4 className="font-semibold mb-3">Módulos ({samplePath.modules.length})</h4>
                  <div className="space-y-3">
                    {samplePath.modules.map((module) => (
                      <div key={module.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
                        }`}>
                          {module.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{module.title}</p>
                          <p className="text-xs text-gray-500 capitalize">{module.type}</p>
                        </div>
                        {module.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela 5: Visualização de módulos
  if (currentStep === 5 && selectedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header com navegação */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedPath.title}</h1>
              <p className="text-gray-600">Escolha um módulo para começar</p>
            </div>
            <Button variant="ghost" onClick={() => window.location.href = "/dashboard-unificado"} className="ml-auto">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>

          {/* Lista de módulos */}
          <div className="space-y-4">
            {selectedPath.modules.map((module) => (
              <Card key={module.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        module.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {module.type === 'video' ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        <p className="text-gray-600 text-sm capitalize">Tipo: {module.type}</p>
                        {module.completed && (
                          <Badge variant="default" className="bg-green-100 text-green-700 mt-1">
                            Concluído
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {module.type === 'video' && module.videoUrl && (
                        <Button 
                          onClick={() => showVideo(module.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Assistir Vídeo
                        </Button>
                      )}
                      <Button 
                        onClick={() => showText(module.id)}
                        variant="outline"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Ler Material
                      </Button>
                      <Button 
                        onClick={() => {
                          setCurrentModuleId(module.id);
                          setCurrentStep(6);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Central Downloads
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão de conclusão */}
          <div className="mt-8 text-center">
            <Button 
              onClick={() => {
                toast({
                  title: "Parabéns! 🎉",
                  description: "Você completou a trilha de aprendizado!",
                });
                setCurrentStep(4);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <Award className="w-4 h-4 mr-2" />
              Completar Trilha
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Tela 6: Estudo de Módulo (CORAÇÃO DA APLICAÇÃO - Input/Download)
  if (currentStep === 6 && currentModuleId) {
    const module = selectedPath?.modules.find(m => m.id === parseInt(currentModuleId)) || {
      id: 1,
      title: "Central Downloads",
      type: 'text' as const,
      completed: false,
      content: "Centro de processamento de conteúdo"
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{module.title}</h1>
              <p className="text-gray-600">Centro de Downloads e Recursos</p>
            </div>
          </div>

          {/* Área principal de conteúdo */}
          <div className="space-y-8">
            {/* IA Text Analyzer - Destaque Principal */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Análise Inteligente de Texto</h2>
                  <p className="text-purple-100">IA real conectada - Teste com qualquer texto</p>
                </div>
              </div>
            </div>
            
            <AITextAnalyzer />

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Coluna 1: Janelas de Input */}
              <div className="space-y-6">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-6 h-6 mr-2 text-blue-600" />
                    Central de Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Input de YouTube */}
                  <div className="p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Video className="w-8 h-8 text-red-600" />
                      <div>
                        <h3 className="font-bold text-gray-800">YouTube Download</h3>
                        <p className="text-sm text-gray-600">Cole o link do vídeo</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input 
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                      <Button 
                        onClick={() => {
                          console.log("🖱️ CLIQUE NO BOTÃO YOUTUBE");
                          processYouTubeVideo();
                        }}
                        disabled={isProcessing}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processando...
                          </div>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Processar Vídeo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Input de PDF */}
                  <div className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="font-bold text-gray-800">PDF Upload</h3>
                        <p className="text-sm text-gray-600">Arraste ou selecione PDF</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input 
                        type="file" 
                        accept=".pdf"
                        onChange={(e) => {
                          console.log("🖱️ SELEÇÃO DE PDF");
                          processPDFUpload(e);
                        }}
                        disabled={isProcessing}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 disabled:opacity-50"
                      />
                      {isProcessing && (
                        <div className="flex items-center justify-center py-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                          <span className="text-green-600">Processando PDF...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Análise de Texto com IA */}
                  <div className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-8 h-8 text-purple-600" />
                      <div>
                        <h3 className="font-bold text-gray-800">Análise Inteligente</h3>
                        <p className="text-sm text-gray-600">IA real para estudos</p>
                      </div>
                    </div>
                    <AITextAnalyzer className="border-0 p-0" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Coluna 2: Área de Resultados */}
            <div className="space-y-6">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-yellow-600" />
                    Biblioteca Pessoal ({uploadedFiles.length} itens)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8">
                      <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Faça upload de conteúdo para começar...</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            {file.type === 'youtube' && <Video className="w-5 h-5 text-red-600" />}
                            {file.type === 'pdf' && <FileText className="w-5 h-5 text-orange-600" />}
                            {file.type === 'text' && <Edit className="w-5 h-5 text-purple-600" />}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-600">{file.uploadDate}</p>
                              {file.size && <p className="text-xs text-gray-500">{file.size}</p>}
                              {file.author && <p className="text-xs text-blue-600">Por: {file.author}</p>}
                              {file.readingTime && <p className="text-xs text-purple-600">{file.readingTime}</p>}
                              {file.pages && <p className="text-xs text-orange-600">{file.pages}</p>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {file.type === 'youtube' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setCurrentVideo(file.content);
                                  setShowingVideo(true);
                                }}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (file.type === 'pdf') {
                                  // Abre PDF em nova aba
                                  const newWindow = window.open();
                                  if (newWindow) {
                                    newWindow.document.write(`
                                      <html>
                                        <head><title>${file.name}</title></head>
                                        <body style="margin:0;background:#222;">
                                          <iframe src="${file.content}" width="100%" height="100%" style="border:none;"></iframe>
                                        </body>
                                      </html>
                                    `);
                                  }
                                } else {
                                  setCurrentText(file.content);
                                  setShowingText(true);
                                }
                              }}
                            >
                              {file.type === 'text' ? <Edit className="w-4 h-4" /> : 
                               file.type === 'pdf' ? <FileText className="w-4 h-4" /> : 
                               <FileText className="w-4 h-4" />}
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
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

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
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <Button 
                        onClick={() => {
                          setUploadedFiles([]);
                          toast({
                            title: "Biblioteca limpa!",
                            description: "Todos os arquivos foram removidos",
                          });
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Limpar Biblioteca
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FloatingDownloadButton />
      {/* Tela padrão se nenhuma condição foi atendida */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">EduVibe Enhanced</h1>
          <p className="text-gray-600 mb-6">Sistema carregando...</p>
          <Button 
            onClick={() => {
              setCurrentStep(0);
              setUserName("");
              setCurrentModuleId(null);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Reiniciar Sistema
          </Button>
        </div>
      </div>
    </div>
  );
}