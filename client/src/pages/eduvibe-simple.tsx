import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  BrainCircuit,
  GraduationCap,
  ArrowLeft,
  Home,
  Zap,
  Download,
  BookOpen
} from "lucide-react";

export default function EduVibeSimple() {
  const [userName, setUserName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goHome = () => {
    window.location.href = '/dashboard-unificado';
  };

  // Tela 0: Boas-vindas
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎓</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">EduVibe</h1>
              <p className="text-gray-600">Onde aprender não é tarefa, é experiência</p>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Como você gostaria de ser chamado?"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-center"
              />
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => {
                  if (userName.trim()) {
                    setCurrentStep(1);
                    toast({
                      title: `Bem-vindo(a), ${userName}!`,
                      description: "Vamos começar sua jornada de aprendizado"
                    });
                  }
                }}
                disabled={!userName.trim()}
              >
                Começar Jornada
              </Button>
              
              <div className="border-t pt-4 space-y-2">
                <p className="text-xs text-gray-500 mb-3">Acesso rápido às ferramentas:</p>
                
                <Button 
                  onClick={() => {
                    window.open('https://chatgpt.com/studymode', '_blank');
                    toast({
                      title: "🚀 ChatGPT Study Mode",
                      description: "Abrindo tutor IA revolucionário - nova aba",
                    });
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  🧠 Study Mode ChatGPT
                </Button>

                <Button 
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Central de Downloads
                </Button>

                <Button 
                  onClick={goHome}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela 1: Menu Principal
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Olá, {userName}!</h1>
              <p className="text-gray-600">Que ferramenta você gostaria de usar hoje?</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ChatGPT Study Mode */}
            <Card className="cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 bg-white border-2 hover:border-orange-500">
              <CardContent className="p-6 text-center">
                <BrainCircuit className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-bold mb-2">🧠 Study Mode IA</h3>
                <p className="text-gray-600 mb-4">Tutor ChatGPT personalizado com questionamento socrático</p>
                <Button 
                  onClick={() => {
                    window.open('https://chatgpt.com/studymode', '_blank');
                    toast({
                      title: "🚀 ChatGPT Study Mode",
                      description: "Abrindo tutor IA - nova aba",
                    });
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                >
                  Abrir Study Mode
                </Button>
              </CardContent>
            </Card>

            {/* Central Downloads */}
            <Card className="cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 bg-white border-2 hover:border-green-500">
              <CardContent className="p-6 text-center">
                <Download className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">📚 Central Downloads</h3>
                <p className="text-gray-600 mb-4">Biblioteca de arquivos e recursos educacionais</p>
                <Button 
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                >
                  Acessar Central
                </Button>
              </CardContent>
            </Card>

            {/* Cursos Tradicionais */}
            <Card className="cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 bg-white border-2 hover:border-blue-500">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">📖 Cursos EduVibe</h3>
                <p className="text-gray-600 mb-4">Trilhas de aprendizado estruturadas</p>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Ver Cursos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Benefícios do Study Mode */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">✨ Por que usar o ChatGPT Study Mode?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-orange-700 mb-2">🎯 Aprendizado Ativo</h3>
                    <p className="text-orange-600">Não recebe respostas prontas - você constrói o conhecimento passo a passo</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-700 mb-2">🧠 Questionamento Socrático</h3>
                    <p className="text-orange-600">Perguntas que estimulam o pensamento crítico e compreensão profunda</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-700 mb-2">📊 Personalização Total</h3>
                    <p className="text-orange-600">Adapta-se ao seu nível, ritmo e objetivos específicos</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-700 mb-2">💰 Custo-Benefício</h3>
                    <p className="text-orange-600">20x mais barato que alternativas similares</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tela 2: Central Downloads (Simplificada)
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📚 Central de Downloads</h1>
              <p className="text-gray-600">Seus recursos educacionais em um só lugar</p>
            </div>
          </div>

          <Card className="bg-white shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Em Desenvolvimento</h2>
              <p className="text-gray-600 mb-6">
                A Central de Downloads está sendo desenvolvida. 
                Por enquanto, use o ChatGPT Study Mode para suas necessidades de aprendizado!
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => {
                    window.open('https://chatgpt.com/studymode', '_blank');
                    toast({
                      title: "🚀 ChatGPT Study Mode",
                      description: "Abrindo tutor IA - nova aba",
                    });
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  Usar Study Mode Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela 3: Cursos (Simplificada)
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📖 Cursos EduVibe</h1>
              <p className="text-gray-600">Trilhas estruturadas de aprendizado</p>
            </div>
          </div>

          <Card className="bg-white shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Cursos em Desenvolvimento</h2>
              <p className="text-gray-600 mb-6">
                Nossos cursos estruturados estão sendo preparados. 
                Enquanto isso, experimente o ChatGPT Study Mode - a ferramenta mais avançada de aprendizado com IA!
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => {
                    window.open('https://chatgpt.com/studymode', '_blank');
                    toast({
                      title: "🚀 ChatGPT Study Mode",
                      description: "Abrindo tutor IA - nova aba",
                    });
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <BrainCircuit className="w-4 h-4 mr-2" />
                  Study Mode ChatGPT
                </Button>
                <Button 
                  onClick={goHome}
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard Principal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}