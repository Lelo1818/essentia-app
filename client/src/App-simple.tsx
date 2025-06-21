import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Componente Flow Kids limpo
function SimpleFlowKids() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Flow Kids</h1>
          <p className="text-lg text-gray-700">Educação Financeira Infantil</p>
        </header>
        
        <div className="grid gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">🏆 Conquistas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🐷</div>
                <h3 className="font-bold">Primeiro Cofrinho</h3>
                <p className="text-sm text-gray-600">100 pontos</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-bold">Economizador</h3>
                <p className="text-sm text-gray-600">250 pontos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🎯 Missões</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Guardar 10 moedas</span>
                <span className="text-green-600 font-bold">8/10</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">Aprender sobre poupança</span>
                <span className="text-yellow-600 font-bold">Novo!</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">💰 Seu Dinheiro</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">R$ 125,50</div>
              <p className="text-gray-600">Total economizado</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition-colors"
          >
            ← Voltar ao Ecossistema
          </a>
        </div>
      </div>
    </div>
  );
}

// Componente Flow Principal limpo
function SimpleFlow() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Flow</h1>
          <p className="text-lg text-gray-700">Gestão Financeira Inteligente</p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-green-600 mb-4">💰 Receitas</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">R$ 8.500</div>
            <p className="text-gray-600">Este mês</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-red-600 mb-4">💸 Gastos</h3>
            <div className="text-3xl font-bold text-red-600 mb-2">R$ 6.200</div>
            <p className="text-gray-600">Este mês</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-blue-600 mb-4">📊 Saldo</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">R$ 2.300</div>
            <p className="text-gray-600">Disponível</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple-600 mb-4">🎯 Metas</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Emergência</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Viagem</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full w-2/5"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-orange-600 mb-4">🔮 IA Preditiva</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm">📈 Tendência de economia positiva</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">💡 Sugestão: Reduzir gastos com delivery</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm">🎯 Meta de emergência em 3 meses</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
          >
            ← Voltar ao Ecossistema
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SimpleApp() {
  const path = window.location.pathname;
  
  return (
    <QueryClientProvider client={queryClient}>
      {path === '/kids-simple' && <SimpleFlowKids />}
      {path === '/flow-simple' && <SimpleFlow />}
      {path === '/simple-test' && (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-6">Teste Mobile Simples</h1>
            <div className="space-y-4">
              <a 
                href="/kids-simple"
                className="block w-full bg-pink-600 text-white py-3 rounded-lg font-bold"
              >
                Flow Kids Simples
              </a>
              <a 
                href="/flow-simple"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
              >
                Flow Simples
              </a>
              <a 
                href="/"
                className="block w-full bg-green-600 text-white py-3 rounded-lg font-bold"
              >
                Ecossistema Completo
              </a>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}