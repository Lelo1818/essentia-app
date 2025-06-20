import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Zap, Smartphone, Volume2 } from "lucide-react";
import VoiceAssistant from "@/components/voice/voice-assistant";

export default function VoiceAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Assistente por Voz Flow
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Controle suas finanças usando apenas a voz. Registre gastos, consulte saldo e crie metas 
            falando naturalmente em português.
          </p>
          <Badge className="bg-indigo-600 text-white px-4 py-1 text-sm">
            TECNOLOGIA PIONEIRA NO BRASIL
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <Mic className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-green-800 mb-2">Reconhecimento Natural</h3>
              <p className="text-green-700 text-sm">
                Fale naturalmente como "Gastei 50 reais no supermercado" e o sistema entende perfeitamente
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-blue-800 mb-2">Processamento Inteligente</h3>
              <p className="text-blue-700 text-sm">
                IA avançada categoriza automaticamente e extrai valores, datas e contexto
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <Volume2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-purple-800 mb-2">Resposta Vocal</h3>
              <p className="text-purple-700 text-sm">
                Sistema responde por voz confirmando ações e fornecendo informações solicitadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona a Mágica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold">Ative o Microfone</h4>
                <p className="text-gray-600 text-sm">
                  Clique em "Falar" e autorize o acesso ao microfone do seu dispositivo
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold">Fale Naturalmente</h4>
                <p className="text-gray-600 text-sm">
                  Diga seu comando em português normal, sem precisar decorar frases específicas
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold">IA Processa</h4>
                <p className="text-gray-600 text-sm">
                  Algoritmos avançados entendem contexto, valores e categorizam automaticamente
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h4 className="font-semibold">Ação Executada</h4>
                <p className="text-gray-600 text-sm">
                  Sistema executa a ação e confirma por voz e visualmente na interface
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Commands */}
        <Card>
          <CardHeader>
            <CardTitle>Comandos Suportados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-3">📈 Registrar Despesas</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-red-50 p-2 rounded">"Gastei 50 reais no supermercado"</div>
                  <div className="bg-red-50 p-2 rounded">"Comprei remédio por 25 reais"</div>
                  <div className="bg-red-50 p-2 rounded">"Paguei 80 reais de gasolina"</div>
                  <div className="bg-red-50 p-2 rounded">"Despesa de 120 reais em restaurante"</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 mb-3">💰 Registrar Renda</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-green-50 p-2 rounded">"Recebi 3000 reais de salário"</div>
                  <div className="bg-green-50 p-2 rounded">"Ganho de 500 reais com freelance"</div>
                  <div className="bg-green-50 p-2 rounded">"Renda extra de 200 reais"</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">🎯 Criar Metas</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded">"Quero economizar 5000 para viagem"</div>
                  <div className="bg-blue-50 p-2 rounded">"Meta de 2000 reais para curso"</div>
                  <div className="bg-blue-50 p-2 rounded">"Objetivo de 10000 para carro"</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-600 mb-3">📊 Consultas</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-purple-50 p-2 rounded">"Qual meu saldo atual?"</div>
                  <div className="bg-purple-50 p-2 rounded">"Quanto gastei este mês?"</div>
                  <div className="bg-purple-50 p-2 rounded">"Como estão minhas metas?"</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Assistant Component */}
        <VoiceAssistant />

        {/* Technical Info */}
        <Card className="border-gray-200 bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Informações Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-semibold mb-2">Compatibilidade</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Chrome/Edge (melhor suporte)</li>
                  <li>• Safari (iOS/macOS)</li>
                  <li>• Firefox (limitado)</li>
                  <li>• Apps móveis nativos</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Recursos</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Reconhecimento offline</li>
                  <li>• Processamento local</li>
                  <li>• Múltiplos sotaques</li>
                  <li>• Cancelamento de ruído</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Privacidade</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Áudio não armazenado</li>
                  <li>• Processamento local</li>
                  <li>• Dados criptografados</li>
                  <li>• LGPD compliance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}