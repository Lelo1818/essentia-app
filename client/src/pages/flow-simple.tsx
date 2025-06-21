export default function FlowSimple() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">💰 Flow</h1>
          <p className="text-blue-100 mt-2">Gestão Financeira Inteligente</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">R$ 12.500</div>
              <div className="text-green-500">Saldo Total</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-blue-600">R$ 8.200</div>
              <div className="text-blue-500 text-sm">Receitas</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-red-600">R$ 3.700</div>
              <div className="text-red-500 text-sm">Gastos</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
              📊 Ver Dashboard Completo
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">
              💡 Análise Preditiva IA
            </button>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">
              🎯 Metas Financeiras
            </button>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Status do Sistema</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Análise Preditiva:</span>
                <span className="text-green-600 font-semibold">✅ Ativa</span>
              </div>
              <div className="flex justify-between">
                <span>Automação:</span>
                <span className="text-green-600 font-semibold">✅ Funcionando</span>
              </div>
              <div className="flex justify-between">
                <span>Avatar 3D:</span>
                <span className="text-green-600 font-semibold">✅ Operacional</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center">
          <a href="/" className="text-blue-600 font-semibold">← Voltar ao Ecossistema</a>
        </div>
      </div>
    </div>
  );
}