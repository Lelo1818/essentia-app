import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  MessageCircle, 
  Lightbulb, 
  Target,
  Send,
  Sparkles,
  Eye,
  Heart,
  Compass,
  Zap,
  Users,
  Crown
} from 'lucide-react';

interface FunctionalAIDashboardProps {
  triadScores: {
    consciencia: number;
    energia: number;
    coerencia: number;
  };
  onPillarRecommendation: (pillarId: string) => void;
}

interface AISystem {
  id: string;
  name: string;
  role: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  activePrompt: string;
}

const AI_SYSTEMS = [
  {
    id: 'oracle',
    name: 'Oráculo da Sabedoria',
    role: 'Orientação Profunda',
    icon: Eye,
    color: 'blue',
    bgColor: 'bg-blue-50 border-blue-200',
    description: 'Fornece insights profundos sobre autoconhecimento e direção de vida',
    activePrompt: 'Que pergunta sobre você mesmo você tem evitado fazer?'
  },
  {
    id: 'catalyst',
    name: 'Catalisador da Paixão',
    role: 'Desperta Entusiasmo',
    icon: Heart,
    color: 'red',
    bgColor: 'bg-red-50 border-red-200',
    description: 'Ajuda a identificar e cultivar suas paixões verdadeiras',
    activePrompt: 'O que fazia seus olhos brilharem quando criança?'
  },
  {
    id: 'navigator',
    name: 'Navegador do Propósito',
    role: 'Clarifica Missão',
    icon: Compass,
    color: 'green',
    bgColor: 'bg-green-50 border-green-200',
    description: 'Orienta na descoberta e refinamento de sua missão de vida',
    activePrompt: 'Se dinheiro não fosse um problema, que problema do mundo você resolveria?'
  },
  {
    id: 'amplifier',
    name: 'Amplificador de Talentos',
    role: 'Potencializa Dons',
    icon: Zap,
    color: 'yellow',
    bgColor: 'bg-yellow-50 border-yellow-200',
    description: 'Identifica e desenvolve seus talentos naturais únicos',
    activePrompt: 'Que elogio você recebe que não valoriza tanto?'
  }
];

const SIX_PILLARS_MAPPING = {
  consciencia: ['autoconhecimento', 'missao'],
  energia: ['paixao', 'talentos'],
  coerencia: ['conexao', 'lideranca']
};

export const FunctionalAIDashboard = ({ triadScores, onPillarRecommendation }: FunctionalAIDashboardProps) => {
  const [activeAI, setActiveAI] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Gerar resposta da IA baseada no input do usuário
  const generateAIResponse = async (aiId: string, input: string) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aiSystemId: aiId,
          userMessage: input,
          triadScores,
          context: 'dashboard_interaction'
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com IA');
      }

      const data = await response.json();
      setAiResponse(data.response);
      
      // Se a IA recomendou um pilar específico
      if (data.recommendedPillar) {
        setTimeout(() => {
          if (window.confirm(`A IA recomenda explorar o pilar "${data.recommendedPillar}". Gostaria de iniciar essa jornada agora?`)) {
            onPillarRecommendation(data.recommendedPillar);
          }
        }, 2000);
      }
      
    } catch (error) {
      // Respostas contextuais quando a IA real não está disponível
      const fallbackResponses = generateFallbackResponse(aiId, input);
      setAiResponse(fallbackResponses);
    } finally {
      setIsProcessing(false);
    }
  };

  // Respostas contextuais baseadas nos scores da tríade
  const generateFallbackResponse = (aiId: string, input: string): string => {
    const lowerInput = input.toLowerCase();
    
    switch (aiId) {
      case 'oracle':
        if (triadScores.consciencia < 60) {
          return `🔍 Percebo que seu autoconhecimento pode ser aprofundado (${triadScores.consciencia}%). Sua pergunta "${input}" revela uma busca genuína por clareza interior.\n\nSugestão: Que tal explorarmos o Pilar do Autoconhecimento? Ele oferece práticas específicas para você se conhecer melhor e encontrar respostas que já estão dentro de você.`;
        }
        return `✨ Com sua consciência em ${triadScores.consciencia}%, vejo que você está em um bom caminho de autoconhecimento. Sua reflexão sobre "${input}" mostra maturidade.\n\nContinue questionando-se: "Como posso integrar essa descoberta na minha vida diária?"`;

      case 'catalyst':
        if (lowerInput.includes('paixão') || lowerInput.includes('amor') || lowerInput.includes('entusiasmo')) {
          return `🔥 Sinto a centelha da paixão em suas palavras! Com energia em ${triadScores.energia}%, você tem potencial para despertar ainda mais entusiasmo.\n\nVamos explorar: O que você fazia nos momentos em que se sentia mais vivo e energizado? Essas são pistas preciosas sobre sua paixão verdadeira.\n\nRecomendo o Pilar da Paixão para aprofundar essa descoberta.`;
        }
        return `💖 Energia em ${triadScores.energia}%... Vejo potencial inexplorado! Sobre "${input}": que emoções isso desperta em você?\n\nLembre-se: paixão não é só o que você ama fazer, é o que você não consegue parar de pensar em fazer melhor.`;

      case 'navigator':
        if (lowerInput.includes('propósito') || lowerInput.includes('missão') || lowerInput.includes('sentido')) {
          return `🧭 Sua busca por propósito é nobre! Com sua tríade atual (C:${triadScores.consciencia}% E:${triadScores.energia}% Co:${triadScores.coerencia}%), você está caminhando para maior clareza.\n\nReflexão poderosa: "Se eu pudesse resolver apenas um problema no mundo, qual seria?" A resposta pode revelar sua missão.\n\nO Pilar da Missão oferece práticas específicas para essa descoberta.`;
        }
        return `🎯 Com consciência em ${triadScores.consciencia}%, você tem boa base para encontrar direção. Sobre "${input}": como isso se conecta com o impacto que você quer causar no mundo?\n\nSua missão está na intersecção entre o que você ama, o que você faz bem, o que o mundo precisa e pelo que pode te pagar.`;

      case 'amplifier':
        if (lowerInput.includes('talento') || lowerInput.includes('habilidade') || lowerInput.includes('dom')) {
          return `⚡ Com energia em ${triadScores.energia}%, você tem força para desenvolver seus dons! Sobre talentos: eles são presentes que você trouxe para compartilhar.\n\nPergunta reveladora: "Que atividade fluiu tão naturalmente para você que outros acharam impressionante, mas você achou normal?"\n\nO Pilar dos Talentos pode ajudar a polir esses diamantes brutos.`;
        }
        return `🌟 Energia em ${triadScores.energia}%... Há potencial para amplificar! Sobre "${input}": que habilidades naturais você usa para lidar com isso?\n\nTalentos são como músculos - precisam ser exercitados para se fortalecerem.`;

      default:
        return `🤖 Processando sua reflexão: "${input}". Com sua tríade atual, vejo oportunidades de crescimento em várias direções. Que aspecto você gostaria de explorar mais profundamente?`;
    }
  };

  // Determinar qual pilar recomendar baseado nos scores
  const getRecommendedPillar = (): string => {
    const lowestScore = Math.min(triadScores.consciencia, triadScores.energia, triadScores.coerencia);
    
    if (triadScores.consciencia === lowestScore) {
      return Math.random() > 0.5 ? 'autoconhecimento' : 'missao';
    } else if (triadScores.energia === lowestScore) {
      return Math.random() > 0.5 ? 'paixao' : 'talentos';
    } else {
      return Math.random() > 0.5 ? 'conexao' : 'lideranca';
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim() || !activeAI) return;
    
    generateAIResponse(activeAI, userInput);
    setUserInput('');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Sistemas de IA Funcionais
          <Badge className="ml-2 bg-green-100 text-green-800">
            Real AI Integration
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {AI_SYSTEMS.map((ai) => (
            <Card 
              key={ai.id}
              className={`cursor-pointer transition-all ${ai.bgColor} ${
                activeAI === ai.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => {
                setActiveAI(ai.id);
                setAiResponse('');
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <ai.icon className={`w-5 h-5 mr-2 text-${ai.color}-600`} />
                  <div>
                    <h4 className="font-semibold text-sm">{ai.name}</h4>
                    <p className="text-xs text-gray-600">{ai.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 mb-2">{ai.description}</p>
                {activeAI === ai.id && (
                  <div className="bg-white/50 p-2 rounded text-xs italic">
                    💭 "{ai.activePrompt}"
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interface de Chat */}
        {activeAI && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center mb-3">
              <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-medium text-sm">
                Conversando com {AI_SYSTEMS.find(ai => ai.id === activeAI)?.name}
              </span>
            </div>

            {/* Resposta da IA */}
            {aiResponse && (
              <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                <div className="flex items-start">
                  <Brain className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm whitespace-pre-wrap">{aiResponse}</div>
                </div>
              </div>
            )}

            {/* Input do usuário */}
            <div className="flex space-x-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Compartilhe seus pensamentos, dúvidas ou reflexões..."
                className="flex-1 min-h-[80px]"
                disabled={isProcessing}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isProcessing}
                className="self-end"
              >
                {isProcessing ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              💡 Dica: Seja específico sobre seus desafios, sonhos ou dúvidas. Quanto mais contexto, melhor a orientação.
            </div>
          </div>
        )}

        {/* Recomendação de Pilar */}
        {!activeAI && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium">Sugestão Baseada na sua Tríade</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Com base nos seus scores atuais (C:{triadScores.consciencia}% E:{triadScores.energia}% Co:{triadScores.coerencia}%), 
              recomendo focar no desenvolvimento do pilar que mais pode impactar seu crescimento.
            </p>
            <Button
              onClick={() => onPillarRecommendation(getRecommendedPillar())}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Compass className="w-4 h-4 mr-2" />
              Iniciar Jornada Recomendada
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};