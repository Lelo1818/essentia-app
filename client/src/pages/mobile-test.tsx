export default function MobileTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Mobile Test Page
        </h1>
        <div className="text-lg text-green-600 font-semibold mb-6">
          Sistema Funcionando!
        </div>
        <div className="space-y-4">
          <a 
            href="/flow" 
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Testar Flow
          </a>
          <a 
            href="/kids" 
            className="block w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Testar Kids
          </a>
          <a 
            href="/edu" 
            className="block w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Testar EduVie
          </a>
          <a 
            href="/purpose" 
            className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Testar Essentia
          </a>
        </div>
        <div className="mt-6 text-sm text-gray-600">
          Testando conectividade mobile
        </div>
      </div>
    </div>
  );
}