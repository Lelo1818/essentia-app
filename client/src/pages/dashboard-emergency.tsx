import { Button } from "@/components/ui/button";
import { DollarSign, BookOpen, Heart, Users } from "lucide-react";

export default function DashboardEmergency() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ecossistema Digital - Lelão
          </h1>
          <p className="text-xl text-gray-600">
            Seus 4 aplicativos em um só lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <DollarSign className="w-12 h-12 text-green-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Flow</h2>
                <p className="text-gray-600">Gestão Financeira</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Controle total das suas finanças com IA integrada
            </p>
            <Button 
              onClick={() => window.location.href = '/flow'}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Acessar Flow
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">EduVibe</h2>
                <p className="text-gray-600">Plataforma Educacional</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Aprendizado personalizado com análise de conteúdo
            </p>
            <Button 
              onClick={() => window.location.href = '/eduvibe'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Acessar EduVibe
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
            <div className="flex items-center mb-4">
              <Heart className="w-12 h-12 text-purple-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Essentia</h2>
                <p className="text-gray-600">Desenvolvimento Pessoal</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Jornada de autoconhecimento e propósito
            </p>
            <Button 
              onClick={() => window.location.href = '/purpose'}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Acessar Essentia
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-pink-500">
            <div className="flex items-center mb-4">
              <Users className="w-12 h-12 text-pink-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Flow Kids</h2>
                <p className="text-gray-600">Educação Financeira</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Ensino financeiro gamificado para crianças
            </p>
            <Button 
              onClick={() => window.location.href = '/kids-standalone'}
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              Acessar Flow Kids
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Status do Sistema</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Operacional</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">Apps Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Disponível</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">∞</div>
                <div className="text-sm text-gray-600">Possibilidades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}