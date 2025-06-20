import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import * as React from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, User, Settings, Brain, Award, 
  Edit3, Save, X, Trophy, Target, TrendingUp
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User as UserType, Achievement } from "../../../../../shared/schema-edu";

const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  learningStyle: z.enum(["visual", "auditory", "kinesthetic", "reading"]).optional(),
  hasADHD: z.boolean(),
  hasDyslexia: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery<{ user: UserType }>({
    queryKey: ["/api/edu/profile"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/edu/achievements"],
  });

  const user = profileData?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Erro ao carregar dados do usuário</p>
        </div>
      </div>
    );
  }

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      learningStyle: "visual",
      hasADHD: false,
      hasDyslexia: false,
    },
  });

  // Update form when user data loads
  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        learningStyle: user.learningStyle || "visual",
        hasADHD: user.hasADHD || false,
        hasDyslexia: user.hasDyslexia || false,
      });
    }
  }, [user, form]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiRequest("PUT", "/api/edu/user/1", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/profile"] });
      setIsEditing(false);
      toast({ title: "Perfil atualizado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar perfil", variant: "destructive" });
    }
  });

  const onSubmit = (data: ProfileFormData) => {
    updateUserMutation.mutate(data);
  };

  const getLevel = (experience: number) => Math.floor(experience / 100) + 1;
  const getProgressToNextLevel = (experience: number) => experience % 100;

  const getLearningStyleLabel = (style: string) => {
    switch (style) {
      case "visual": return "Visual";
      case "auditory": return "Auditivo";
      case "kinesthetic": return "Cinestésico";
      case "reading": return "Leitura/Escrita";
      default: return style;
    }
  };

  const getLearningStyleDescription = (style: string) => {
    switch (style) {
      case "visual": return "Aprende melhor com imagens, gráficos e cores";
      case "auditory": return "Aprende melhor ouvindo explicações e discussões";
      case "kinesthetic": return "Aprende melhor com movimento e prática hands-on";
      case "reading": return "Aprende melhor lendo e escrevendo";
      default: return "";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-pulse">
          <Card className="w-96">
            <CardContent className="p-8">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Meu Perfil</h1>
            </div>
            
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Informações Pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="learningStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estilo de Aprendizado</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione seu estilo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="visual">Visual</SelectItem>
                                <SelectItem value="auditory">Auditivo</SelectItem>
                                <SelectItem value="kinesthetic">Cinestésico</SelectItem>
                                <SelectItem value="reading">Leitura/Escrita</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="hasADHD"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Tenho TDAH</FormLabel>
                                <p className="text-sm text-gray-600">
                                  Personaliza o aprendizado com sessões mais curtas e interativas
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hasDyslexia"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Tenho Dislexia</FormLabel>
                                <p className="text-sm text-gray-600">
                                  Adapta o conteúdo com mais recursos visuais e auditivos
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="submit" 
                          disabled={updateUserMutation.isPending}
                          className="flex-1"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {updateUserMutation.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                          className="flex-1"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome
                        </label>
                        <p className="text-gray-900">{user.name}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estilo de Aprendizado
                      </label>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-blue-900">
                            {getLearningStyleLabel(user.learningStyle || "")}
                          </span>
                          <Badge className="bg-blue-100 text-blue-800">
                            Preferido
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-700">
                          {getLearningStyleDescription(user.learningStyle || "")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Configurações de Acessibilidade
                      </label>
                      <div className="space-y-2">
                        {user.hasADHD && (
                          <div className="flex items-center space-x-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <Brain className="w-4 h-4 text-purple-600" />
                            <span className="text-purple-900">Suporte para TDAH ativo</span>
                          </div>
                        )}
                        {user.hasDyslexia && (
                          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <Settings className="w-4 h-4 text-green-600" />
                            <span className="text-green-900">Suporte para Dislexia ativo</span>
                          </div>
                        )}
                        {!user.hasADHD && !user.hasDyslexia && (
                          <p className="text-gray-600 text-sm">
                            Nenhuma configuração especial ativa
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Level Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <Trophy className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Nível {getLevel(user.experience)}</h3>
                  <p className="text-blue-100 mb-4">{user.experience} XP total</p>
                  <div className="bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressToNextLevel(user.experience)}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-100">
                    {getProgressToNextLevel(user.experience)}/100 XP para próximo nível
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Estatísticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sequência</span>
                  <span className="font-bold text-green-600">{user.streak} dias</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Conquistas</span>
                  <span className="font-bold text-yellow-600">{achievements.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Último acesso</span>
                  <span className="text-sm text-gray-500">
                    {user.lastLoginDate 
                      ? new Date(user.lastLoginDate).toLocaleDateString('pt-BR')
                      : "Hoje"
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            {achievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span>Conquistas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.slice(-3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(achievement.earnedAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {achievements.length > 3 && (
                      <Link href="/progresso">
                        <Button variant="outline" size="sm" className="w-full">
                          Ver todas ({achievements.length})
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}