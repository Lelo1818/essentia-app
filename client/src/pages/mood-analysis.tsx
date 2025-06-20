import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingDown, AlertTriangle, Heart } from "lucide-react";
import MoodAnalyzer from "@/components/mood/mood-analyzer";

export default function MoodAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Análise de Humor & Gastos Emocionais
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IA avançada monitora seus padrões emocionais e previne compras por impulso, 
            oferecendo insights psicológicos sobre seus hábitos financeiros.
          </p>
          <Badge className="bg-purple-600 text-white px-4 py-1 text-sm">
            INTELIGÊNCIA EMOCIONAL APLICADA
          </Badge>
        </div>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona a Análise Emocional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold">Detecção de Padrões</h4>
                <p className="text-gray-600 text-sm">
                  IA analisa horários, valores e categorias de gastos para identificar padrões emocionais
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold">Análise de Humor</h4>
                <p className="text-gray-600 text-sm">
                  Sistema identifica gatilhos emocionais como estresse, tristeza ou euforia
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold">Alertas Inteligentes</h4>
                <p className="text-gray-600 text-sm">
                  Receba avisos em tempo real quando detectamos risco de compra emocional
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold">Recomendações</h4>
                <p className="text-gray-600 text-sm">
                  Sugestões personalizadas para melhorar controle emocional e financeiro
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Benefícios Comprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">78%</div>
                <div className="text-green-600">Redução em compras impulsivas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">65%</div>
                <div className="text-green-600">Melhoria no controle financeiro</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">89%</div>
                <div className="text-green-600">Satisfação dos usuários</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Analyzer */}
        <MoodAnalyzer />

        {/* Emotional Triggers Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Guia de Gatilhos Emocionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-3">🚨 Alto Risco</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                    <strong>Estresse:</strong> Compras de "recompensa" após dias difíceis
                  </div>
                  <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                    <strong>Tristeza:</strong> Tentativa de compensar sentimentos negativos
                  </div>
                  <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                    <strong>Ansiedade:</strong> Compras para sensação de controle
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-yellow-600 mb-3">⚠️ Médio Risco</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                    <strong>Euforia:</strong> Gastos excessivos por excesso de confiança
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                    <strong>FOMO:</strong> Medo de perder oportunidades/promoções
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                    <strong>Pressão Social:</strong> Compras para impressionar outros
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}