import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, BookOpen, Calendar, Trophy, ArrowRight } from "lucide-react";

export default function EduFocused() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: "",
    timeframe: "",
    hoursPerDay: ""
  });
  const [studyPlan, setStudyPlan] = useState(null);

  const handleSubmit = () => {
    // Simular geração de plano de estudos
    const totalDays = parseInt(formData.timeframe) * 30; // meses para dias
    const totalHours = totalDays * parseInt(formData.hoursPerDay);
    
    const plan = {
      topic: formData.topic,
      timeframe: formData.timeframe,
      hoursPerDay: formData.hoursPerDay,
      totalHours,
      totalDays,
      phases: [
        {
          phase: 1,
          title: "Fundamentos",
          duration: Math.ceil(totalDays * 0.3),
          description: `Conceitos básicos de ${formData.topic}`,
          goals: ["Compreender terminologia", "Identificar conceitos-chave", "Realizar exercícios introdutórios"]
        },
        {
          phase: 2,
          title: "Desenvolvimento",
          duration: Math.ceil(totalDays * 0.4),
          description: `Aprofundamento em ${formData.topic}`,
          goals: ["Aplicar conhecimentos", "Resolver problemas intermediários", "Criar projetos práticos"]
        },
        {
          phase: 3,
          title: "Domínio",
          duration: Math.ceil(totalDays * 0.3),
          description: `Maestria em ${formData.topic}`,
          goals: ["Resolver problemas complexos", "Ensinar outros", "Desenvolver projetos avançados"]
        }
      ]
    };
    
    setStudyPlan(plan);
    setStep(3);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">EduVibe Focused</h1>
            <p className="text-xl text-gray-600">Planejamento Inteligente de Estudos</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Vamos Planejar Seu Aprendizado</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="topic" className="text-lg font-semibold text-gray-700">
                    O que você quer estudar?
                  </Label>
                  <Input
                    id="topic"
                    placeholder="Ex: Python, Marketing Digital, Fotografia..."
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    className="mt-2 text-lg p-4"
                  />
                </div>

                <div>
                  <Label htmlFor="timeframe" className="text-lg font-semibold text-gray-700">
                    Em quanto tempo? (meses)
                  </Label>
                  <Input
                    id="timeframe"
                    type="number"
                    placeholder="Ex: 3, 6, 12..."
                    value={formData.timeframe}
                    onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                    className="mt-2 text-lg p-4"
                  />
                </div>

                <div>
                  <Label htmlFor="hours" className="text-lg font-semibold text-gray-700">
                    Quantas horas por dia?
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="Ex: 1, 2, 3..."
                    value={formData.hoursPerDay}
                    onChange={(e) => setFormData({...formData, hoursPerDay: e.target.value})}
                    className="mt-2 text-lg p-4"
                  />
                </div>

                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.topic || !formData.timeframe || !formData.hoursPerDay}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 text-lg font-semibold"
                >
                  Gerar Plano de Estudos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerando Seu Plano Personalizado</h2>
              <p className="text-gray-600 mb-6">
                Analisando {formData.topic} para {formData.timeframe} meses com {formData.hoursPerDay}h/dia...
              </p>
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3"
              >
                Ver Plano Gerado
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seu Plano de Estudos</h1>
          <p className="text-lg text-gray-600">
            {studyPlan.topic} em {studyPlan.timeframe} meses • {studyPlan.hoursPerDay}h/dia
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{studyPlan.totalHours}h</div>
                <div className="text-sm text-gray-600">Total de Horas</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{studyPlan.totalDays}</div>
                <div className="text-sm text-gray-600">Dias de Estudo</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Fases</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          {studyPlan.phases.map((phase, index) => (
            <Card key={index} className="shadow-lg border-l-4 border-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    Fase {phase.phase}: {phase.title}
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    {phase.duration} dias
                  </div>
                </div>
                <p className="text-gray-600">{phase.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Objetivos:</h4>
                  <ul className="space-y-1">
                    {phase.goals.map((goal, goalIndex) => (
                      <li key={goalIndex} className="flex items-center text-gray-700">
                        <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                        {goal}
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
            Criar Novo Plano
          </Button>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}