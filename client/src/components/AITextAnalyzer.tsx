import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, BookOpen, Loader2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AIAnalysis {
  summary: string;
  studySuggestions: string[];
  practiceExercises: string[];
}

interface AITextAnalyzerProps {
  className?: string;
}

export default function AITextAnalyzer({ className = "" }: AITextAnalyzerProps) {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest("POST", "/api/ai/analyze-text", { text });
      return response;
    },
    onSuccess: (data) => {
      console.log("📊 RESPOSTA RECEBIDA DA IA:", data);
      console.log("🔍 ANALYSIS OBJECT:", data.analysis);
      console.log("📝 SUMMARY:", data.analysis?.summary);
      setAnalysis(data.analysis);
    },
    onError: (error) => {
      console.error("Erro na análise:", error);
    }
  });

  const handleAnalyze = () => {
    if (inputText.trim().length < 10) {
      return;
    }
    analyzeMutation.mutate(inputText.trim());
  };

  const handleClear = () => {
    setInputText("");
    setAnalysis(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Input Section */}
      <Card className="border-blue-200 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-5 h-5" />
            Análise Inteligente de Texto
          </CardTitle>
          <p className="text-sm text-gray-600">
            Cole qualquer texto de estudo e nossa IA gerará resumos, sugestões e exercícios personalizados
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Cole aqui o texto que você quer estudar... (mínimo 10 caracteres)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-32 resize-none border-blue-200 focus:border-blue-400"
            disabled={analyzeMutation.isPending}
          />
          
          <div className="flex gap-3 justify-between items-center">
            <div className="text-xs text-gray-500">
              {inputText.length} caracteres
              {inputText.length < 10 && inputText.length > 0 && (
                <span className="text-red-500 ml-2">Mínimo 10 caracteres necessários</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
                disabled={!inputText && !analysis}
              >
                Limpar
              </Button>
              <Button 
                onClick={handleAnalyze}
                disabled={inputText.trim().length < 10 || analyzeMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {analyzeMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analisar com IA
                  </>
                )}
              </Button>
            </div>
          </div>

          {analyzeMutation.isError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              Erro ao processar texto. Tente novamente.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Summary */}
          <Card className="border-green-200 bg-green-50/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
                <BookOpen className="w-5 h-5" />
                📌 Resumo Prático
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-800 leading-relaxed">
                {analysis.summary}
              </div>
            </CardContent>
          </Card>

          {/* Study Suggestions */}
          <Card className="border-blue-200 bg-blue-50/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
                <Lightbulb className="w-5 h-5" />
                📘 Sugestões de Estudo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.studySuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-1 mt-0.5">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practice Exercises */}
          <Card className="border-purple-200 bg-purple-50/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
                <Brain className="w-5 h-5" />
                💡 Exercícios Práticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.practiceExercises.map((exercise, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs px-2 py-1 mt-0.5">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-purple-800 leading-relaxed">
                      {exercise}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Usage Tips */}
      {!analysis && !analyzeMutation.isPending && (
        <Card className="border-gray-200 bg-gray-50/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="text-gray-600 text-sm">
                💡 <strong>Dicas para melhores resultados:</strong>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">1</Badge>
                  Textos com 100+ palavras geram análises mais detalhadas
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">2</Badge>
                  Funciona melhor com conteúdo educacional estruturado
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">3</Badge>
                  Cole artigos, notas de aula ou capítulos de livros
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}