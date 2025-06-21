import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Zap, BookOpen, Target, Lightbulb, Search, Copy, Download } from "lucide-react";

export default function PromptIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState("educacional");
  const [searchTerm, setSearchTerm] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const promptCategories = [
    { id: "educacional", name: "Educacional", icon: BookOpen, color: "bg-blue-500" },
    { id: "criativo", name: "Criativo", icon: Lightbulb, color: "bg-purple-500" },
    { id: "analitico", name: "Analítico", icon: Brain, color: "bg-green-500" },
    { id: "objetivo", name: "Objetivo", icon: Target, color: "bg-orange-500" }
  ];

  const educationalPrompts = [
    {
      id: "content-creator",
      title: "Criador de Conteúdo Educacional",
      description: "Prompt especializado para criar conteúdo educacional engajante",
      category: "Conteúdo",
      prompt: `Você é um especialista em criação de conteúdo educacional envolvente e transformador. Sua missão é desenvolver material que não apenas ensina, mas inspira e motiva o aprendizado.

TAREFA: Criar conteúdo educacional sobre [TÓPICO]

CONTEXTO DO ESTUDANTE:
- Nível: [INICIANTE/INTERMEDIÁRIO/AVANÇADO]
- Idade: [FAIXA_ETÁRIA]
- Objetivo: [OBJETIVO_ESPECÍFICO]
- Tempo disponível: [TEMPO_ESTUDO]

ESTRUTURA OBRIGATÓRIA:
1. GANCHO INICIAL (desperte curiosidade em 30 segundos)
2. CONCEITOS FUNDAMENTAIS (máximo 3 conceitos por vez)
3. EXEMPLOS PRÁTICOS (relate com o cotidiano do estudante)
4. ATIVIDADE HANDS-ON (aplicação imediata)
5. REFLEXÃO GUIADA (perguntas que consolidam o aprendizado)
6. PRÓXIMOS PASSOS (motive a continuidade)

PRINCÍPIOS:
- Use storytelling sempre que possível
- Inclua elementos visuais/multimídia
- Mantenha linguagem acessível mas não infantilizada
- Conecte com experiências pessoais do estudante
- Termine sempre com um desafio inspirador`
    },
    {
      id: "lesson-plan",
      title: "Criador de Plano de Aula",
      description: "Gera planos de aula detalhados e personalizados",
      category: "Planejamento",
      prompt: `Você é um especialista em educação. Crie um plano de aula completo para:

Tema: [TEMA]
Idade/Série: [IDADE]
Duração: [DURAÇÃO]
Objetivos: [OBJETIVOS]

Estruture o plano com:
1. Objetivos específicos
2. Recursos necessários
3. Metodologia passo a passo
4. Atividades práticas
5. Avaliação
6. Dever de casa opcional

Adapte a linguagem e complexidade para a faixa etária especificada.`
    },
    {
      id: "quiz-generator",
      title: "Gerador de Quiz Inteligente",
      description: "Cria questões adaptadas ao nível do aluno",
      category: "Avaliação",
      prompt: `Crie um quiz educacional com as seguintes especificações:

Matéria: [MATÉRIA]
Tópico específico: [TÓPICO]
Nível de dificuldade: [INICIANTE/INTERMEDIÁRIO/AVANÇADO]
Número de questões: [NÚMERO]
Tipo: [MÚLTIPLA ESCOLHA/VERDADEIRO-FALSO/DISSERTATIVA]

Para cada questão inclua:
- Pergunta clara e objetiva
- Alternativas (se aplicável)
- Resposta correta
- Explicação didática da resposta
- Dica para facilitar o aprendizado`
    },
    {
      id: "content-adapter",
      title: "Adaptador de Conteúdo",
      description: "Adapta textos complexos para diferentes idades",
      category: "Adaptação",
      prompt: `Você é um especialista em adaptação pedagógica. Transforme o seguinte conteúdo:

CONTEÚDO ORIGINAL:
[TEXTO_ORIGINAL]

ADAPTAR PARA:
Idade: [IDADE]
Nível de escolaridade: [NÍVEL]
Objetivos específicos: [OBJETIVOS]

Regras de adaptação:
1. Mantenha as informações essenciais
2. Use vocabulário apropriado para a idade
3. Inclua exemplos práticos e relatable
4. Adicione analogias quando necessário
5. Organize em seções digestíveis
6. Sugira atividades complementares`
    },
    {
      id: "learning-path",
      title: "Criador de Trilha de Aprendizagem",
      description: "Desenvolve sequências personalizadas de estudo",
      category: "Trilhas",
      prompt: `Desenvolva uma trilha de aprendizagem personalizada:

PERFIL DO ALUNO:
- Nome: [NOME]
- Idade: [IDADE]
- Nível atual: [NÍVEL_ATUAL]
- Objetivo: [OBJETIVO_FINAL]
- Tempo disponível: [TEMPO_SEMANAL]
- Estilo de aprendizagem: [VISUAL/AUDITIVO/CINESTÉSICO]
- Áreas de interesse: [INTERESSES]

CRIE UMA TRILHA COM:
1. Diagnóstico inicial
2. Marcos de progresso (milestones)
3. Sequência de tópicos
4. Recursos recomendados
5. Atividades práticas
6. Sistema de recompensas
7. Avaliações periódicas
8. Cronograma flexível`
    },
    {
      id: "adhd-optimizer",
      title: "Otimizador TDAH/Dislexia",
      description: "Adapta conteúdo para neurodivergentes com técnicas comprovadas",
      category: "Inclusivo",
      prompt: `Você é especialista em educação inclusiva para TDAH e dislexia. Transforme este conteúdo:

CONTEÚDO: [MATERIAL_ORIGINAL]
PERFIL: [TDAH/DISLEXIA/AMBOS]

ADAPTAÇÕES OBRIGATÓRIAS:
1. MICRO-LEARNING: Divida em blocos de 5-7 minutos
2. MULTI-SENSORIAL: Combine visual + auditivo + tátil
3. GAMIFICAÇÃO: Pontos, níveis, conquistas imediatas
4. REPETIÇÃO ESPAÇADA: Revisões estratégicas
5. MOVIMENTO: Inclua atividades físicas
6. CORES & DESTACOS: Use coded colors para organização
7. PAUSAS ATIVAS: A cada 15 minutos
8. FEEDBACK POSITIVO: Celebre micro-conquistas

ESTRUTURA FINAL:
- Objetivo claro em 1 frase
- 3 pontos principais max
- Atividade prática hands-on
- Quiz gamificado
- Recompensa imediata`
    },
    {
      id: "financial-literacy",
      title: "Educação Financeira Inteligente",
      description: "Ensina finanças de forma prática e envolvente",
      category: "Especializado",
      prompt: `Crie conteúdo de educação financeira adaptado para:

PERFIL: [IDADE/NÍVEL_FINANCEIRO/OBJETIVOS]

MÉTODO FLOW INTEGRATION:
1. SITUAÇÃO REAL: Use cenários do cotidiano brasileiro
2. IMPACTO EMOCIONAL: Conecte com sonhos pessoais
3. CÁLCULOS SIMPLES: Matemática acessível
4. AÇÃO IMEDIATA: O que fazer hoje mesmo
5. GAMIFICAÇÃO: Desafios de economia/investimento

TÓPICOS ESSENCIAIS:
- Orçamento pessoal/familiar
- Reserva de emergência
- Juros compostos explicados simples
- Investimentos básicos
- Planejamento de metas
- Psicologia do dinheiro

FORMATO:
- Storytelling com personagens brasileiros
- Planilhas interativas simples
- Simuladores visuais
- Metas semanais achievables`
    },
    {
      id: "treevium-integration",
      title: "Biblioteca Treevium Premium",
      description: "Base de prompts especializados testados e otimizados",
      category: "Avançado",
      prompt: `SISTEMA TREEVIUM - BIBLIOTECA ESPECIALIZADA

Você tem acesso a uma base de dados com prompts altamente específicos e testados para diferentes contextos educacionais.

CATEGORIAS DISPONÍVEIS:
- Prompts Educacionais Adaptativos
- Geradores de Conteúdo Personalizado  
- Sistemas de Avaliação Inteligente
- Criadores de Atividades Interativas
- Adaptadores de Complexidade
- Motivadores de Engajamento

INSTRUÇÕES DE USO:
1. Identifique o contexto específico da necessidade educacional
2. Selecione a categoria mais apropriada
3. Aplique o prompt com as variáveis personalizadas
4. Refine baseado no feedback do estudante

EXEMPLO DE APLICAÇÃO:
Para [CONTEXTO_ESPECÍFICO], use o prompt da categoria [CATEGORIA] adaptando as variáveis [LISTA_VARIÁVEIS] conforme o perfil do estudante.

Este sistema garante resultados educacionais otimizados através de prompts testados e validados.`
    }
  ];

  const filteredPrompts = educationalPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUsePrompt = (prompt: string) => {
    setGeneratedContent(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Prompts Inteligentes</h2>
        <p className="text-gray-400">Base de prompts especializados para educação</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap justify-center">
        {promptCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-white mb-1">{prompt.title}</CardTitle>
                  <p className="text-sm text-gray-400">{prompt.description}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {prompt.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleUsePrompt(prompt.prompt)}
                  className="flex-1"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Usar Prompt
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(prompt.prompt)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Prompt Selecionado</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copiar
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="min-h-[300px] bg-gray-900 border-gray-600 text-white"
              placeholder="O prompt aparecerá aqui..."
            />
            <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h4 className="text-blue-300 font-semibold mb-2">💡 Dica de Uso:</h4>
              <p className="text-sm text-blue-200">
                Substitua os termos entre [COLCHETES] pelas informações específicas do seu contexto. 
                Este prompt foi desenvolvido para gerar conteúdo educacional de alta qualidade.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration with Treevium */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Integração com Base de Prompts Treevium
              </h3>
              <p className="text-sm text-purple-200">
                Acesso a biblioteca especializada com prompts testados e otimizados para educação
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Conectar Base
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}