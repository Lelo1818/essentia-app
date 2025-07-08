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
  X
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
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [userName, setUserName] = useState("");
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

  // Tela de Boas-vindas (Step 0)
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎓</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">EduVibe Enhanced</h1>
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

  // Dashboard principal (Step 1)
  if (currentStep === 1) {
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
                      setCurrentStep(2);
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

  // Visualização de módulos (Step 2)
  if (currentStep === 2 && selectedPath) {
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
                setCurrentStep(1);
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

  return null;
}