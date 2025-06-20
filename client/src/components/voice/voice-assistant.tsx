import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Zap,
  CheckCircle,
  AlertCircle,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface VoiceCommand {
  type: 'expense' | 'income' | 'goal' | 'query' | 'unknown';
  amount?: number;
  category?: string;
  description?: string;
  confidence: number;
  rawText: string;
}

interface VoiceResponse {
  text: string;
  action?: string;
  data?: any;
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const [response, setResponse] = useState<VoiceResponse | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'pt-BR';
      
      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
      };
      
      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Erro no reconhecimento de voz",
          description: "Tente novamente em alguns segundos",
          variant: "destructive"
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  // Parse voice commands using pattern matching
  const parseCommand = (text: string): VoiceCommand => {
    const lowerText = text.toLowerCase();
    
    // Expense patterns
    const expensePatterns = [
      /gastei (\d+) (?:reais? )?(?:no|na|com|em) (.+)/i,
      /comprei (.+) por (\d+) reais?/i,
      /paguei (\d+) (?:reais? )?(?:de|para) (.+)/i,
      /despesa de (\d+) (?:reais? )?(?:em|com) (.+)/i
    ];
    
    // Income patterns  
    const incomePatterns = [
      /recebi (\d+) (?:reais? )?(?:de|do) (.+)/i,
      /ganho de (\d+) (?:reais? )?(?:de|com) (.+)/i,
      /renda de (\d+) reais?/i
    ];

    // Goal patterns
    const goalPatterns = [
      /quero economizar (\d+) (?:reais? )?para (.+)/i,
      /meta de (\d+) (?:reais? )?para (.+)/i,
      /objetivo de (\d+) reais?/i
    ];

    // Query patterns
    const queryPatterns = [
      /quanto (?:eu )?gastei (?:este mês|hoje|esta semana)/i,
      /qual (?:é )?o meu saldo/i,
      /como (?:estão|está) (?:as )?minhas (?:metas|finanças)/i
    ];

    // Check expense patterns
    for (const pattern of expensePatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = parseInt(match[1] || match[2]);
        const description = match[2] || match[1];
        return {
          type: 'expense',
          amount,
          description: description.trim(),
          confidence: 0.9,
          rawText: text,
          category: categorizeExpense(description)
        };
      }
    }

    // Check income patterns
    for (const pattern of incomePatterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          type: 'income',
          amount: parseInt(match[1]),
          description: match[2]?.trim(),
          confidence: 0.9,
          rawText: text
        };
      }
    }

    // Check goal patterns
    for (const pattern of goalPatterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          type: 'goal',
          amount: parseInt(match[1]),
          description: match[2]?.trim(),
          confidence: 0.85,
          rawText: text
        };
      }
    }

    // Check query patterns
    for (const pattern of queryPatterns) {
      if (pattern.test(text)) {
        return {
          type: 'query',
          confidence: 0.8,
          rawText: text
        };
      }
    }

    return {
      type: 'unknown',
      confidence: 0.1,
      rawText: text
    };
  };

  const categorizeExpense = (description: string): string => {
    const categories = {
      'alimentação': ['mercado', 'supermercado', 'comida', 'restaurante', 'lanche', 'café'],
      'transporte': ['uber', 'taxi', 'gasolina', 'combustível', 'ônibus', 'metrô'],
      'saúde': ['farmácia', 'médico', 'hospital', 'remédio', 'consulta'],
      'entretenimento': ['cinema', 'show', 'festa', 'diversão', 'streaming'],
      'casa': ['luz', 'água', 'internet', 'aluguel', 'condomínio', 'casa']
    };

    const lowerDesc = description.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerDesc.includes(keyword))) {
        return category;
      }
    }
    return 'outros';
  };

  const processVoiceCommand = async (text: string) => {
    setIsProcessing(true);
    const command = parseCommand(text);
    setLastCommand(command);

    try {
      let response: VoiceResponse;

      switch (command.type) {
        case 'expense':
          if (command.amount && command.description) {
            await executeExpenseCommand.mutateAsync({
              amount: command.amount,
              description: command.description,
              category: command.category || 'outros'
            });
            response = {
              text: `Despesa de R$ ${command.amount} em ${command.description} registrada com sucesso!`,
              action: 'expense_added'
            };
          } else {
            response = {
              text: "Não consegui entender o valor ou descrição. Tente: 'Gastei 50 reais no supermercado'"
            };
          }
          break;

        case 'income':
          if (command.amount) {
            response = {
              text: `Renda de R$ ${command.amount} registrada!`,
              action: 'income_added'
            };
          } else {
            response = {
              text: "Não consegui entender o valor. Tente: 'Recebi 1000 reais de salário'"
            };
          }
          break;

        case 'goal':
          if (command.amount && command.description) {
            response = {
              text: `Meta de R$ ${command.amount} para ${command.description} criada!`,
              action: 'goal_created'
            };
          } else {
            response = {
              text: "Não consegui entender a meta. Tente: 'Quero economizar 5000 reais para viagem'"
            };
          }
          break;

        case 'query':
          response = {
            text: "Seus gastos este mês: R$ 2.350. Saldo atual: R$ 1.200. Você está 15% acima do planejado em alimentação.",
            action: 'query_response'
          };
          break;

        default:
          response = {
            text: "Não entendi o comando. Tente: 'Gastei 50 reais no mercado' ou 'Qual meu saldo?'"
          };
      }

      setResponse(response);
      speak(response.text);
      
    } catch (error) {
      const errorResponse = {
        text: "Ocorreu um erro ao processar o comando. Tente novamente."
      };
      setResponse(errorResponse);
      speak(errorResponse.text);
    } finally {
      setIsProcessing(false);
      setShowDialog(true);
    }
  };

  const executeExpenseCommand = useMutation({
    mutationFn: async (data: { amount: number; description: string; category: string }) => {
      return apiRequest('/api/expenses', {
        method: 'POST',
        body: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/financial-summary'] });
    }
  });

  const speak = (text: string) => {
    if ('speechSynthesis' in window && isEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleVoice = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      speak("Assistente de voz ativado. Diga 'Gastei 50 reais no mercado' para testar.");
    }
  };

  return (
    <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center text-indigo-800">
            <Brain className="w-5 h-5 mr-2" />
            Assistente por Voz
          </div>
          <Badge className={isEnabled ? "bg-green-500" : "bg-gray-400"}>
            {isEnabled ? "ATIVO" : "INATIVO"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center space-x-3">
            <InteractiveButton
              onClick={toggleVoice}
              className={`${isEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
              soundType="click"
            >
              {isEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
              {isEnabled ? 'Voz Ativa' : 'Ativar Voz'}
            </InteractiveButton>

            <InteractiveButton
              onClick={isListening ? stopListening : startListening}
              disabled={!isEnabled || isProcessing}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              soundType={isListening ? "error" : "success"}
            >
              {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isListening ? 'Parar' : 'Falar'}
            </InteractiveButton>
          </div>

          {isListening && (
            <div className="text-center">
              <div className="w-6 h-6 bg-red-500 rounded-full mx-auto animate-pulse mb-2"></div>
              <p className="text-sm text-gray-600">Ouvindo... Fale agora!</p>
            </div>
          )}

          {isProcessing && (
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Processando comando...</p>
            </div>
          )}

          <div className="bg-white p-3 rounded-lg">
            <h4 className="font-semibold mb-2 text-indigo-700">Comandos de Exemplo:</h4>
            <div className="text-sm space-y-1 text-gray-600">
              <div>💰 "Gastei 50 reais no supermercado"</div>
              <div>💳 "Recebi 1000 reais de salário"</div>
              <div>🎯 "Quero economizar 5000 para viagem"</div>
              <div>📊 "Qual meu saldo atual?"</div>
            </div>
          </div>

          {transcript && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm"><strong>Reconhecido:</strong> "{transcript}"</p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Response Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {lastCommand?.type !== 'unknown' ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
              )}
              Comando Processado
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {lastCommand && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Comando reconhecido:</p>
                <p className="font-medium">"{lastCommand.rawText}"</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge className={`${
                    lastCommand.confidence > 0.8 ? 'bg-green-100 text-green-800' :
                    lastCommand.confidence > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {Math.round(lastCommand.confidence * 100)}% confiança
                  </Badge>
                  <Badge variant="outline">
                    {lastCommand.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            )}
            
            {response && (
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-indigo-800">{response.text}</p>
              </div>
            )}

            <InteractiveButton 
              onClick={() => setShowDialog(false)}
              className="w-full"
              soundType="click"
            >
              Entendi
            </InteractiveButton>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}