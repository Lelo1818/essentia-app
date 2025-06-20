import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import flowLogo from "@assets/image_1750383244339.png";
import essentiaLogo from "@assets/image_1750383794230.png";
import eduvibeLogo from "@assets/image_1750383852695.png";
import FlowApp from "./App";
import PurposeApp from "./App-purpose";
import EduApp from "./App-edu";

type AppType = "selector" | "flow" | "purpose" | "edu";

function AppSelector({ onSelectApp }: { onSelectApp: (app: AppType) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Seus Aplicativos</h1>
          <p className="text-xl text-gray-600">Três aplicativos poderosos para transformar sua vida</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Flow App */}
          <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img src={flowLogo} alt="Flow Logo" className="w-full h-full object-contain" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Flow</CardTitle>
              <p className="text-gray-600">Your Path to Prosperity</p>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Controle de receitas e despesas</p>
                <p>✓ Scanner de notas fiscais (OCR)</p>
                <p>✓ Planejamento orçamentário</p>
                <p>✓ Metas financeiras</p>
                <p>✓ Análise de gastos</p>
                <p>✓ Sistema de conquistas</p>
              </div>
              
              <Button 
                onClick={() => onSelectApp("flow")}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-6"
              >
                Abrir Flow
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Purpose App */}
          <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden bg-white">
                <img src={essentiaLogo} alt="Essentia Logo" className="w-full h-full object-contain" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Essentia</CardTitle>
              <p className="text-gray-600">Desperte se Propósito</p>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Jornada guiada em 4 módulos</p>
                <p>✓ Diário pessoal e reflexivo</p>
                <p>✓ Mapa visual do propósito</p>
                <p>✓ Conteúdo inspiracional</p>
                <p>✓ Meditações guiadas</p>
                <p>✓ Sistema de evolução pessoal</p>
              </div>
              
              <Button 
                onClick={() => onSelectApp("purpose")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              >
                Abrir Essentia
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* EDU App */}
          <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden bg-white">
                <img src={eduvibeLogo} alt="EduVibe Logo" className="w-full h-full object-contain" />
              </div>
              <CardTitle className="text-2xl text-gray-900">EduVibe</CardTitle>
              <p className="text-gray-600">Onde aprender não é tarefa, é experiência</p>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Trilhas de aprendizado personalizadas</p>
                <p>✓ Upload e processamento de materiais</p>
                <p>✓ Suporte para TDAH e Dislexia</p>
                <p>✓ Conteúdo em alta adaptado</p>
                <p>✓ Gamificação científica</p>
                <p>✓ Sistema de evolução educacional</p>
              </div>
              
              <Button 
                onClick={() => onSelectApp("edu")}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
              >
                Abrir EduVibe
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Criado especialmente para você - três apps poderosos para transformar sua vida financeira, espiritual e educacional
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContainer() {
  const [currentApp, setCurrentApp] = useState<AppType>("selector");

  if (currentApp === "flow") {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentApp("selector")}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            ← Voltar aos Apps
          </Button>
        </div>
        <FlowApp />
      </div>
    );
  }

  if (currentApp === "purpose") {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentApp("selector")}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            ← Voltar aos Apps
          </Button>
        </div>
        <PurposeApp />
      </div>
    );
  }

  return <AppSelector onSelectApp={setCurrentApp} />;
}

export default AppContainer;