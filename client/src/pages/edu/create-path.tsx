import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Brain, Sparkles, Calendar, Target } from "lucide-react";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(100, "Título muito longo"),
  description: z.string().min(1, "Descrição é obrigatória").max(500, "Descrição muito longa"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  targetDays: z.number().min(1, "Mínimo 1 dia").max(365, "Máximo 365 dias"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  hasADHDSupport: z.boolean().default(false),
  hasDyslexiaSupport: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function CreatePath() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      targetDays: 7,
      difficulty: "beginner",
      hasADHDSupport: false,
      hasDyslexiaSupport: false,
    },
  });

  const createPathMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const pathData = {
        userId: 1,
        ...data,
        settings: {
          hasADHDSupport: data.hasADHDSupport,
          hasDyslexiaSupport: data.hasDyslexiaSupport,
        },
      };
      
      const response = await apiRequest("POST", "/api/edu/learning-paths", pathData);
      return response.json();
    },
    onSuccess: (newPath) => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-paths"] });
      toast({ title: "Trilha criada com sucesso!", description: "Vamos começar sua jornada de aprendizado!" });
      setLocation(`/estudar/${newPath.id}`);
    },
    onError: () => {
      toast({ title: "Erro ao criar trilha", variant: "destructive" });
    }
  });

  const onSubmit = (data: FormData) => {
    createPathMutation.mutate(data);
  };

  const subjects = [
    "Tecnologia", "Ciências", "Idiomas", "Arte", "Música", "História", 
    "Literatura", "Matemática", "Filosofia", "Psicologia", "Negócios", 
    "Saúde", "Esportes", "Culinária", "Bem-estar", "Desenvolvimento Pessoal"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/trilhas">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 ml-4">Nova Trilha de Aprendizado</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white">
              <img src="@assets/image_1750383852695.png" alt="EduVibe Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Crie sua trilha personalizada</h2>
              <p className="text-gray-600">Transforme qualquer objetivo em uma jornada de aprendizado estruturada</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>Informações Básicas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título da Trilha</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Fundamentos de Python" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva o que você vai aprender e seus objetivos..."
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto Principal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o assunto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject.toLowerCase()}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span>Configurações Especiais</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="hasADHDSupport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Suporte para TDAH</FormLabel>
                            <p className="text-sm text-gray-600">
                              Sessões mais curtas, mais interativas e com pausas frequentes
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasDyslexiaSupport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Suporte para Dislexia</FormLabel>
                            <p className="text-sm text-gray-600">
                              Mais recursos visuais, áudio e formato otimizado para leitura
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span>Planejamento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="targetDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prazo para conclusão (dias)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              max={365}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nível de Dificuldade</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o nível" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Iniciante</SelectItem>
                              <SelectItem value="intermediate">Intermediário</SelectItem>
                              <SelectItem value="advanced">Avançado</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Brain className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Como funciona?</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Criamos uma trilha personalizada baseada em ciência cognitiva</li>
                          <li>• Dividimos o conteúdo em sessões otimizadas</li>
                          <li>• Adaptamos ao seu estilo de aprendizado</li>
                          <li>• Acompanhamos seu progresso e ajustamos</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link href="/trilhas">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button 
                type="submit" 
                disabled={createPathMutation.isPending}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                {createPathMutation.isPending ? "Criando..." : "Criar Trilha"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}