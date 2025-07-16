import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Brain, Target, Compass, Star, Mountain, TreePine, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

export default function EssentiaFocused() {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({
    currentMoment: "",
    desires: "",
    obstacles: ""
  });
  const [personalPlan, setPlan] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <TreePine className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sua Jornada de Transformação</h1>
          <p className="text-lg text-gray-600">Plano personalizado de 4 semanas</p>
        </div>

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

          <Card className="backdrop-blur-sm bg-white/80 border-l-4 border-pink-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-3" />
                Sua Visão de Futuro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{personalPlan.vision}</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-l-4 border-indigo-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Mountain className="w-6 h-6 text-gray-600 mr-3" />
                Desafios a Superar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{personalPlan.challenges}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Seu Cronograma de Transformação</h2>
          
          {personalPlan.journey.map((week, index) => (
            <Card key={index} className="shadow-lg backdrop-blur-sm bg-white/80 border-l-4 border-gradient-to-b from-purple-500 to-pink-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    Semana {week.week}: {week.focus}
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    7 dias
                  </div>
                </div>
                <p className="text-gray-600">{week.goal}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Práticas Diárias:</h4>
                  <ul className="space-y-2">
                    {week.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center space-y-4">
          <Button 
            onClick={() => setStep(1)}
            variant="outline"
            className="mr-4"
          >
            Criar Nova Jornada
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