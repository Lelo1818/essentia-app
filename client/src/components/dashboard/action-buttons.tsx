import { Calendar, Calculator, DollarSign } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        🚀 Ferramentas Essenciais
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => {
            console.log('Navegando para Agendar Pagamentos...');
            window.location.href = '/agendar-pagamentos';
          }}
          className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 cursor-pointer"
        >
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Agendar Pagamentos</h3>
            <p className="text-blue-100 text-sm">Organize suas contas</p>
          </div>
        </button>

        <button
          onClick={() => {
            console.log('Navegando para Simular Cenários...');
            window.location.href = '/simular-cenarios';
          }}
          className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 cursor-pointer"
        >
          <div className="text-center">
            <Calculator className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Simular Cenários</h3>
            <p className="text-purple-100 text-sm">Projete o futuro</p>
          </div>
        </button>

        <button
          onClick={() => {
            console.log('Navegando para Renegociar Dívidas...');
            window.location.href = '/renegociar-dividas';
          }}
          className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 cursor-pointer"
        >
          <div className="text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Renegociar Dívidas</h3>
            <p className="text-green-100 text-sm">Estratégias inteligentes</p>
          </div>
        </button>
      </div>
    </div>
  );
}