import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Target, BookOpen, Zap } from "lucide-react";

export function PromptShowcase() {
  const [activeDemo, setActiveDemo] = useState("none");
  const [isProcessing, setIsProcessing] = useState(false);

  const showcasePrompts = [
    {
      id: "adhd-transform",
      title: "Transformação TDAH/Dislexia",
      description: "Adapta conteúdo complexo para neurodivergentes",
      icon: Brain,
      color: "from-green-600 to-blue-600",
      input: "Explique a Revolução Francesa para um aluno de 14 anos com TDAH",
      output: `🎯 OBJETIVO: Entender a Revolução Francesa em 7 minutos

📱 FORMATO MICRO-LEARNING:
┌─ Bloco 1 (2 min): França quebrada = povo com fome
├─ Bloco 2 (2 min): "Ei, e se a gente mudasse tudo?"
├─ Bloco 3 (2 min): A revolução acontece (1789-1799)
└─ Bloco 4 (1 min): Resultado = França diferente

🎮 ATIVIDADE GAMIFICADA:
• Monte sua equipe: Burguês, Nobre ou Plebeu?
• Missão: Sobreviver à revolução tomando decisões
• Cada escolha = consequências históricas reais

🏆 CONQUISTA DESBLOQUEADA: "Revolucionário Histórico"
🔄 PRÓXIMO NÍVEL: Napoleão Bonaparte`
    },
    {
      id: "financial-story",
      title: "Educação Financeira Narrativa",
      description: "Ensina conceitos financeiros através de histórias",
      icon: Target,
      color: "from-yellow-600 to-orange-600",
      input: "Ensinar juros compostos para uma família brasileira",
      output: `💰 A HISTÓRIA DA FAMÍLIA SANTOS E O TESOURO ESQUECIDO

🏠 CENÁRIO:
A Família Santos descobriu R$ 1.000 esquecidos na poupança da vovó. Agora precisam decidir o que fazer com esse dinheiro.

📊 AS TRÊS OPÇÕES:
1. GASTÃO (o pai): "Vamos gastar tudo no churrasco!"
2. POUPANÇA PEDRO: "Deixa na poupança = R$ 1.065 em 1 ano"  
3. INVESTIDORA ANA: "Tesouro Selic = R$ 1.130 em 1 ano"

🧮 A MAGIA DOS JUROS COMPOSTOS:
Ano 1: R$ 1.130
Ano 5: R$ 1.806 (ganhou R$ 806 só esperando!)
Ano 10: R$ 3.257 (quase TRIPLICOU!)

🎯 LIÇÃO: Dinheiro parado = oportunidade perdida
✨ BONUS: Ana usou os juros do primeiro ano para comprar o churrasco E ainda ter mais dinheiro!`
    },
    {
      id: "gamified-physics",
      title: "Física Gamificada",
      description: "Transforma Física em jogo de aventura",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      input: "Criar jogo educativo sobre leis de Newton",
      output: `🚀 NEWTON QUEST: A AVENTURA DAS FORÇAS

🎮 PERSONAGEM: Captain Isaac (você!)
🌍 MISSÃO: Salvar o universo das Forças do Caos

🎯 LEVEL 1 - Lei da Inércia:
• QUEST: Mover asteroide gigante parado no espaço
• POWER-UP: Propulsores (força externa)
• LIÇÃO: "Objeto parado só sai do lugar com força!"

⚡ LEVEL 2 - F = m.a:
• BOSS BATTLE: Destruir meteoro com canhão
• STRATEGY: Mais força = mais aceleração = mais dano
• UPGRADE: Munição pesada vs munição leve

🔄 LEVEL 3 - Ação e Reação:
• FINAL BOSS: Escapar de buraco negro
• MECÂNICA: Atirar para trás = mover para frente
• EPIC WIN: "Para cada ação, uma reação igual e oposta!"

🏆 ACHIEVEMENT DESBLOQUEADO: "Mestre das Forças"
📈 XP GANHO: +500 pontos de Física`
    }
  ];

  const runDemo = (promptId: string) => {
    setIsProcessing(true);
    setActiveDemo("processing");
    
    setTimeout(() => {
      setActiveDemo(promptId);
      setIsProcessing(false);
    }, 2000);
  };

  const activePrompt = showcasePrompts.find(p => p.id === activeDemo);

  return (
    <div className="space-y-6">
      {/* Demo Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showcasePrompts.map((prompt) => {
          const IconComponent = prompt.icon;
          return (
            <Card 
              key={prompt.id}
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-purple-300"
              onClick={() => runDemo(prompt.id)}
            >
              <CardContent className="p-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${prompt.color} flex items-center justify-center mb-3`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{prompt.title}</h3>
                <p className="text-sm text-gray-600">{prompt.description}</p>
                <Button className="w-full mt-3" variant="outline" size="sm">
                  Demonstrar
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Processing State */}
      {isProcessing && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">IA Processando...</h3>
            <p className="text-gray-600">Analisando contexto e gerando conteúdo personalizado</p>
            <div className="flex justify-center mt-4">
              <Badge className="bg-blue-600 text-white animate-pulse">
                Treevium Engine Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Result */}
      {activePrompt && activeDemo !== "processing" && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-green-600" />
              Resultado da IA: {activePrompt.title}
              <Badge className="ml-auto bg-green-600 text-white">
                Gerado em 2.3s
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Input:</h4>
              <p className="text-gray-600 italic">"{activePrompt.input}"</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-700 mb-3">Output Gerado:</h4>
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {activePrompt.output}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <Badge variant="outline">Personalizado</Badge>
                <Badge variant="outline">Inclusivo</Badge>
                <Badge variant="outline">Engajante</Badge>
              </div>
              <Button variant="outline" size="sm">
                Aplicar na Trilha
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-gray-600">Prompts Ativos</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">89%</div>
          <div className="text-sm text-gray-600">Taxa de Sucesso</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">2.1s</div>
          <div className="text-sm text-gray-600">Tempo Médio</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">12</div>
          <div className="text-sm text-gray-600">Categorias</div>
        </div>
      </div>
    </div>
  );
}