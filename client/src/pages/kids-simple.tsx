export default function KidsSimple() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-600 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">🐷 Flow Kids</h1>
          <p className="text-pink-100 mt-2">Educação Financeira Infantil</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">Level 5</div>
              <div className="text-purple-500">Super Poupador</div>
              <div className="bg-purple-200 rounded-full h-3 mt-2">
                <div className="bg-purple-600 h-3 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-yellow-600">1.250</div>
              <div className="text-yellow-500 text-sm">Flow Coins</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-green-600">28</div>
              <div className="text-green-500 text-sm">Conquistas</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold">
              🏪 Lojinha Virtual
            </button>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
              🏦 Banco do Flow
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">
              📚 Quiz Financeiro
            </button>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Plataforma Ativa</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Realidade Aumentada:</span>
                <span className="text-green-600 font-semibold">✅ Ativa</span>
              </div>
              <div className="flex justify-between">
                <span>Missões Familiares:</span>
                <span className="text-green-600 font-semibold">✅ Funcionando</span>
              </div>
              <div className="flex justify-between">
                <span>Sistema de Conquistas:</span>
                <span className="text-green-600 font-semibold">✅ Ativo</span>
              </div>
              <div className="flex justify-between">
                <span>Avatar 3D Infantil:</span>
                <span className="text-green-600 font-semibold">✅ Operacional</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center">
          <a href="/" className="text-pink-600 font-semibold">← Voltar ao Ecossistema</a>
        </div>
      </div>
    </div>
  );
}