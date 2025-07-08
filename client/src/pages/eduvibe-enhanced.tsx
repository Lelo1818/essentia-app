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
  BarChart3
} from "lucide-react";

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

  const samplePath: LearningPath = {
    id: 1,
    title: "Fundamentos de Educação Financeira",
    description: "Uma jornada completa para organizar sua vida financeira",
    progress: 25,
    difficulty: 'Iniciante',
    estimatedTime: "2 semanas",
    modules: [
      {
        id: 1,
        title: "Entendendo o Dinheiro",
        type: 'video',
        completed: true,
        content: textDatabase[1],
        videoUrl: videoDatabase[1]
      },
      {
        id: 2,
        title: "Criando seu Primeiro Orçamento",
        type: 'text',
        completed: false,
        content: textDatabase[2]
      },
      {
        id: 3,
        title: "Investimentos Básicos",
        type: 'video',
        completed: false,
        content: textDatabase[3],
        videoUrl: videoDatabase[3]
      }
    ]
  };

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
    const module = selectedPath?.modules.find(m => m.id === currentModuleId);
    if (!module) return null;

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
                      />
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Download className="w-4 h-4 mr-2" />
                        Processar Vídeo
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
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Clique para selecionar PDF</p>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Extrair Texto
                      </Button>
                    </div>
                  </div>

                  {/* Input de Texto */}
                  <div className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Edit className="w-8 h-8 text-purple-600" />
                      <div>
                        <h3 className="font-bold text-gray-800">Texto Personalizado</h3>
                        <p className="text-sm text-gray-600">Digite ou cole conteúdo</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <textarea 
                        placeholder="Cole seu texto aqui ou digite conteúdo personalizado..."
                        className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Brain className="w-4 h-4 mr-2" />
                        Processar IA
                      </Button>
                    </div>
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
                    IA Processamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Simulação de resultado IA */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">IA Analisando...</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Aguardando conteúdo para processar. A IA criará resumos, questões e materiais de estudo personalizados.
                      </p>
                    </div>

                    {/* Botões de ação */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Share className="w-4 h-4" />
                        Compartilhar
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4" />
                        Salvar
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" />
                        Áudio
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progresso e estatísticas */}
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                    Seu Progresso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Módulo Atual</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-xs text-blue-700">Materiais processados</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">8h</div>
                        <div className="text-xs text-green-700">Tempo estudado</div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        toast({
                          title: "Módulo concluído!",
                          description: "Parabéns pelo progresso!"
                        });
                        setCurrentStep(5);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Concluir Módulo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}