import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Target, Compass, Star, Mountain, TreePine, Sparkles, ArrowRight, CheckCircle, Play, Users, Book, Trophy, Calendar, Timer, Zap, Eye, Lightbulb } from "lucide-react";
// Usando componentes que realmente existem
import ClaireiraModule from "@/components/purpose/clareira";
import { GuidedBreathingComponent } from "@/components/purpose/guided-breathing";
import { DailyRitualsComponent } from "@/components/purpose/daily-rituals";
import AICoach from "@/components/purpose/ai-coach";
import LifeWheel from "@/components/purpose/life-wheel";
import InspirationHub from "@/components/purpose/inspiration-hub";
import ActionPlanner from "@/components/purpose/action-planner";
import CommunityConnect from "@/components/purpose/community-connect";

export default function EssentiaFocused() {
  const [step, setStep] = useState(1);
  const [currentModule, setCurrentModule] = useState("dashboard");
  const [responses, setResponses] = useState({
    currentMoment: "",
    desires: "",
    obstacles: ""
  });
  const [personalPlan, setPlan] = useState(null);
  const [userProgress, setUserProgress] = useState({
    completedModules: [],
    totalXP: 0,
    currentLevel: 1,
    insights: [],
    rituals: []
  });

  const generatePlan = () => {
    const plan = {
      essence: responses.currentMoment,
      vision: responses.desires,
      challenges: responses.obstacles,
      journey: [
        {
          week: 1,
          focus: "Autoconhecimento",
          practices: [
            "Meditação diária (10 min)",
            "Diário de reflexões",
            "Identificar padrões emocionais"
          ],
          goal: "Clareza sobre seus estados internos"
        },
        {
          week: 2,
          focus: "Propósito",
          practices: [
            "Definir valores fundamentais",
            "Explorar missão pessoal",
            "Visualização do futuro ideal"
          ],
          goal: "Descobrir sua direção verdadeira"
        },
        {
          week: 3,
          focus: "Transformação",
          practices: [
            "Eliminar hábitos limitantes",
            "Criar rituais poderosos",
            "Praticar gratidão ativa"
          ],
          goal: "Implementar mudanças reais"
        },
        {
          week: 4,
          focus: "Integração",
          practices: [
            "Celebrar conquistas",
            "Planejar próximos passos",
            "Compartilhar aprendizados"
          ],
          goal: "Consolidar sua nova essência"
        }
      ]
    };
    
    setPlan(plan);
    setStep(3);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Essentia Focused</h1>
            <p className="text-xl text-gray-600">Jornada de Autodescobrimento Personalizada</p>
          </div>

          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center">
                <Compass className="w-6 h-6 mr-3" />
                Vamos Descobrir Sua Essência
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div>
                <Label className="text-lg font-semibold text-gray-700 flex items-center mb-3">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  Como você se sente neste momento da sua vida?
                </Label>
                <Textarea
                  placeholder="Descreva seus sentimentos, desafios atuais, o que está vivendo..."
                  value={responses.currentMoment}
                  onChange={(e) => setResponses({...responses, currentMoment: e.target.value})}
                  className="text-base min-h-[100px]"
                />
              </div>

              <div>
                <Label className="text-lg font-semibold text-gray-700 flex items-center mb-3">
                  <Star className="w-5 h-5 mr-2 text-pink-600" />
                  O que você mais deseja alcançar ou transformar?
                </Label>
                <Textarea
                  placeholder="Seus sonhos, objetivos, o que realmente importa para você..."
                  value={responses.desires}
                  onChange={(e) => setResponses({...responses, desires: e.target.value})}
                  className="text-base min-h-[100px]"
                />
              </div>

              <div>
                <Label className="text-lg font-semibold text-gray-700 flex items-center mb-3">
                  <Mountain className="w-5 h-5 mr-2 text-indigo-600" />
                  Quais obstáculos você identifica no seu caminho?
                </Label>
                <Textarea
                  placeholder="Medos, limitações, padrões que te impedem de crescer..."
                  value={responses.obstacles}
                  onChange={(e) => setResponses({...responses, obstacles: e.target.value})}
                  className="text-base min-h-[100px]"
                />
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!responses.currentMoment || !responses.desires || !responses.obstacles}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 text-lg font-semibold"
              >
                Criar Minha Jornada Personalizada
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/80">
            <CardContent className="p-12 text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
                <Sparkles className="w-6 h-6 text-pink-500 absolute top-2 right-2 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Criando Sua Jornada Única</h2>
              <p className="text-gray-600 mb-6">
                Analisando suas respostas e criando um plano personalizado de transformação...
              </p>
              <Button 
                onClick={generatePlan}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3"
              >
                Ver Minha Jornada
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard completo do Essentia
  if (currentModule === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Essentia</h1>
                <p className="text-sm text-gray-600">Sua Jornada de Autodescobrimento</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Level {userProgress.currentLevel}
              </Badge>
              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                {userProgress.totalXP} XP
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Resumo Personalizado */}
          <div className="grid gap-6 mb-8">
            <Card className="backdrop-blur-sm bg-white/80 border-l-4 border-purple-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  Sua Essência Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{personalPlan.essence}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/80 border-l-4 border-pink-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Sua Visão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">{personalPlan.vision.substring(0, 120)}...</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/80 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Mountain className="w-5 h-5 text-gray-600 mr-2" />
                    Desafios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">{personalPlan.challenges.substring(0, 120)}...</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Módulos da Jornada */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "jornada", name: "Entrada da Jornada", icon: Play, color: "purple", description: "Inicie sua transformação" },
              { id: "clareira", name: "Clareira", icon: Eye, color: "green", description: "Autoconhecimento profundo" },
              { id: "estudio", name: "Estúdio de Sementes", icon: Lightbulb, color: "blue", description: "Criatividade e propósito" },
              { id: "sementes", name: "Notificações Sementes", icon: Zap, color: "orange", description: "Insights diários" },
              { id: "botao", name: "Botão Mágico", icon: Target, color: "red", description: "Ação transformadora" },
              { id: "integracao", name: "Integração Pós-Ritual", icon: Users, color: "indigo", description: "Consolidação" },
              { id: "encerramento", name: "Encerramento Simbólico", icon: Trophy, color: "yellow", description: "Celebração" },
              { id: "boas-vindas", name: "Boas-Vindas", icon: Heart, color: "pink", description: "Acolhimento" }
            ].map((module) => (
              <Card 
                key={module.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/80 hover:scale-105"
                onClick={() => setCurrentModule(module.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${module.color}-100 flex items-center justify-center group-hover:bg-${module.color}-200 transition-colors`}>
                    <module.icon className={`w-8 h-8 text-${module.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{module.name}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                  {userProgress.completedModules.includes(module.id) && (
                    <Badge className="mt-2 bg-green-100 text-green-800">Completo</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cronograma Semanal */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Seu Cronograma Personalizado</h2>
            <div className="grid gap-4">
              {personalPlan.journey.map((week, index) => (
                <Card key={index} className="backdrop-blur-sm bg-white/80">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                        Semana {week.week}: {week.focus}
                      </CardTitle>
                      <Timer className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{week.goal}</p>
                    <div className="flex flex-wrap gap-2">
                      {week.practices.map((practice, practiceIndex) => (
                        <Badge key={practiceIndex} variant="outline" className="text-xs">
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="mt-8 text-center space-x-4">
            <Button 
              onClick={() => setStep(1)}
              variant="outline"
            >
              Refazer Avaliação
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar módulos específicos
  const renderModule = () => {
    const ModuleWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              onClick={() => setCurrentModule("dashboard")}
              variant="outline"
              className="mb-4"
            >
              ← Voltar ao Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    );

    switch(currentModule) {
      case "jornada":
        return (
          <ModuleWrapper title="Entrada da Jornada">
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-6 h-6 text-purple-600 mr-3" />
                  Inicie Sua Transformação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Com base nas suas respostas, iniciamos uma jornada personalizada de autodescobrimento.
                </p>
                <GuidedBreathingComponent />
              </CardContent>
            </Card>
          </ModuleWrapper>
        );
        
      case "clareira":
        return (
          <ModuleWrapper title="Clareira - Autoconhecimento Profundo">
            <ClaireiraModule />
          </ModuleWrapper>
        );
        
      case "estudio":
        return (
          <ModuleWrapper title="Estúdio de Sementes - Criatividade">
            <InspirationHub />
          </ModuleWrapper>
        );
        
      case "sementes":
        return (
          <ModuleWrapper title="Notificações Sementes - Insights Diários">
            <DailyRitualsComponent />
          </ModuleWrapper>
        );
        
      case "botao":
        return (
          <ModuleWrapper title="Botão Mágico - Ação Transformadora">
            <ActionPlanner />
          </ModuleWrapper>
        );
        
      case "integracao":
        return (
          <ModuleWrapper title="Integração Pós-Ritual">
            <CommunityConnect />
          </ModuleWrapper>
        );
        
      case "encerramento":
        return (
          <ModuleWrapper title="Encerramento Simbólico">
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-600 mr-3" />
                  Celebração da Jornada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Parabéns! Você completou sua jornada de transformação personalizada.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Conquistas Desbloqueadas:</h4>
                    <ul className="text-green-700 mt-2 space-y-1">
                      <li>✨ Autoconhecimento Profundo</li>
                      <li>🎯 Clareza de Propósito</li>
                      <li>🌱 Transformação Pessoal</li>
                      <li>🏆 Jornada Completa</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ModuleWrapper>
        );
        
      case "boas-vindas":
        return (
          <ModuleWrapper title="Boas-Vindas - Acolhimento">
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-6 h-6 text-pink-600 mr-3" />
                  Bem-Vindo à Sua Jornada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Esta é uma jornada única, criada especialmente para você baseada em suas respostas sobre:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <strong>Seu momento atual:</strong> {personalPlan?.essence}
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <strong>Seus desejos:</strong> {personalPlan?.vision}
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <strong>Seus desafios:</strong> {personalPlan?.challenges}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ModuleWrapper>
        );
        
      default:
        return null;
    }
  };

  if (currentModule !== "dashboard") {
    return renderModule();
  }
}