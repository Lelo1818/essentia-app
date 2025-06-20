import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sunrise, Compass, Target, Map, Play, CheckCircle, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { generateReflectionPrompts } from "@/lib/purpose-utils";
import type { JourneyModule } from "@/types/purpose";

const MODULES = [
  {
    key: "despertar",
    name: "Despertar",
    description: "Reconecte-se com sua essência interior e desperte para sua verdadeira natureza",
    icon: Sunrise,
    color: "from-orange-500 to-yellow-500",
    content: {
      intro: "Bem-vinda ao primeiro passo da sua jornada de autodescoberta. O Despertar é sobre reconectar-se com quem você realmente é, além das máscaras sociais e expectativas externas.",
      practices: [
        "Meditação da presença: 10 minutos de silêncio observando apenas a respiração",
        "Questionamento profundo: Quando me sinto mais autêntica?",
        "Momento sagrado: Dedique tempo diário para estar consigo mesma"
      ],
      reflection: "Como posso me reconectar com minha essência verdadeira?"
    }
  },
  {
    key: "descoberta", 
    name: "Descoberta",
    description: "Explore seus valores fundamentais, paixões naturais e talentos únicos",
    icon: Compass,
    color: "from-blue-500 to-indigo-500",
    content: {
      intro: "Agora que despertou para sua essência, é hora de mapear o território interior. A Descoberta revela os elementos fundamentais que compõem sua identidade autêntica.",
      practices: [
        "Exercício dos valores: Liste 10 valores e escolha os 5 mais importantes",
        "Arqueologia das paixões: O que amava fazer na infância?",
        "Inventário de talentos: Em que atividades você se destaca naturalmente?"
      ],
      reflection: "Quais são os elementos não-negociáveis da minha identidade?"
    }
  },
  {
    key: "decisao",
    name: "Decisão", 
    description: "Defina sua missão pessoal e visão de futuro alinhada com seus valores",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    content: {
      intro: "Com autoconhecimento vem a responsabilidade de escolher. A Decisão é sobre integrar suas descobertas em uma direção clara de vida.",
      practices: [
        "Declaração de missão: Em uma frase, qual é seu propósito?",
        "Visão de futuro: Como seria sua vida ideal em 5 anos?",
        "Alinhamento de valores: Suas decisões refletem seus valores?"
      ],
      reflection: "Se eu fosse viver plenamente alinhada com meus valores, o que mudaria?"
    }
  },
  {
    key: "direcao",
    name: "Direção",
    description: "Crie seu plano de ação prático para viver seu propósito no dia a dia",
    icon: Map,
    color: "from-purple-500 to-pink-500", 
    content: {
      intro: "O conhecimento sem ação permanece apenas potencial. A Direção transforma sua sabedoria interior em passos concretos para uma vida mais autêntica.",
      practices: [
        "Metas alinhadas: 3 objetivos que refletem seu propósito",
        "Primeiros passos: Que ação pode tomar hoje?",
        "Sistema de apoio: Quem pode apoiar sua jornada?"
      ],
      reflection: "Que compromisso faço comigo mesma para viver meu propósito?"
    }
  }
];

export default function Journey() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: modules = [] } = useQuery<JourneyModule[]>({
    queryKey: ["/api/purpose/modules"],
  });

  const createModuleMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/purpose/modules", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/modules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/profile"] });
      toast({ title: "Módulo iniciado!", description: "Sua jornada continua..." });
    },
    onError: (error) => {
      console.error("Erro ao iniciar módulo:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível iniciar o módulo. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const updateModuleMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const response = await apiRequest("PUT", `/api/purpose/modules/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/modules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/profile"] });
      toast({ title: "Progresso salvo!", description: "Continue explorando sua jornada." });
    }
  });

  const createReflectionMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/purpose/reflections", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/reflections"] });
      setReflection("");
      toast({ title: "Reflexão salva!", description: "Sua sabedoria foi registrada." });
    }
  });

  const getModuleStatus = (moduleKey: string) => {
    const module = modules.find(m => m.moduleType === moduleKey);
    if (!module) return { status: "not_started", progress: 0, module: null };
    if (module.isCompleted) return { status: "completed", progress: 100, module };
    return { status: "in_progress", progress: module.progress, module };
  };

  const startModule = (moduleKey: string) => {
    createModuleMutation.mutate({
      moduleType: moduleKey,
      progress: 25,
      isCompleted: false
    });
  };

  const completeModule = (moduleKey: string) => {
    const { module } = getModuleStatus(moduleKey);
    if (module) {
      updateModuleMutation.mutate({
        id: module.id,
        progress: 100,
        isCompleted: true,
        completedAt: new Date().toISOString()
      });
    }
  };

  const saveReflection = (moduleKey: string, question: string) => {
    if (!reflection.trim()) return;
    
    createReflectionMutation.mutate({
      moduleType: moduleKey,
      question,
      answer: reflection
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Jornada dos 4 Módulos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Uma jornada guiada de autodescoberta através de quatro etapas essenciais: 
          Despertar, Descoberta, Decisão e Direção.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map((module) => {
          const Icon = module.icon;
          const { status, progress } = getModuleStatus(module.key);
          
          return (
            <Card key={module.key} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${module.color} text-white mr-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{module.name}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {status === "completed" && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completo
                      </Badge>
                    )}
                    {status === "in_progress" && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Em andamento
                      </Badge>
                    )}
                  </div>
                </div>
                
                {status !== "not_started" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardHeader>

              <CardContent className="relative">
                <p className="text-gray-700 mb-4">{module.content.intro}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-gray-900">Práticas sugeridas:</h4>
                  <ul className="space-y-1">
                    {module.content.practices.map((practice, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  {status === "not_started" && (
                    <Button 
                      onClick={() => startModule(module.key)}
                      disabled={createModuleMutation.isPending}
                      className={`bg-gradient-to-r ${module.color} hover:opacity-90 text-white`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Módulo
                    </Button>
                  )}
                  
                  {status === "in_progress" && (
                    <Button 
                      onClick={() => completeModule(module.key)}
                      disabled={updateModuleMutation.isPending}
                      className={`bg-gradient-to-r ${module.color} hover:opacity-90 text-white`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completar
                    </Button>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedModule(module.key)}
                        className="border-gray-300"
                      >
                        Refletir
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <Icon className="w-5 h-5 mr-2 text-purple-600" />
                          Reflexão: {module.name}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-purple-800 font-medium">
                            {module.content.reflection}
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sua reflexão:
                          </label>
                          <Textarea
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="Permita-se explorar profundamente esta questão..."
                            className="min-h-[120px]"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">Perguntas adicionais para reflexão:</p>
                          {generateReflectionPrompts(module.key).slice(0, 3).map((prompt, index) => (
                            <div key={index} className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                              • {prompt}
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          onClick={() => saveReflection(module.key, module.content.reflection)}
                          disabled={!reflection.trim() || createReflectionMutation.isPending}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Salvar Reflexão
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-gray-600">
        <p className="italic">
          "A jornada de mil milhas começa com um único passo. Sua jornada interior começa com uma única respiração consciente."
        </p>
      </div>
    </div>
  );
}