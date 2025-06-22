import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCurrency, formatDate, calculateGoalProgress } from "@/lib/financial-utils";
import { Target, Plus, Trash2, Edit, TrendingUp, Calendar, DollarSign, Plane, Home, Car, GraduationCap, Heart, Briefcase, ShoppingBag, PiggyBank } from "lucide-react";
import GoalsModal from "@/components/modals/goals-modal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const updateGoalSchema = z.object({
  currentAmount: z.string().min(1, "Valor é obrigatório"),
});

type UpdateFormData = z.infer<typeof updateGoalSchema>;

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    "Viagem": Plane,
    "viagem": Plane,
    "Moradia": Home,
    "moradia": Home,
    "Transporte": Car,
    "transporte": Car,
    "Educação": GraduationCap,
    "educacao": GraduationCap,
    "Saúde": Heart,
    "saude": Heart,
    "Trabalho": Briefcase,
    "trabalho": Briefcase,
    "Compras": ShoppingBag,
    "compras": ShoppingBag,
    "Investimentos": PiggyBank,
    "investimentos": PiggyBank,
    "Emergência": Target,
    "emergencia": Target,
    "outros": Target,
  };
  
  return icons[category] || Target;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Viagem": "bg-blue-100 text-blue-600 border-blue-200",
    "viagem": "bg-blue-100 text-blue-600 border-blue-200",
    "Moradia": "bg-green-100 text-green-600 border-green-200",
    "moradia": "bg-green-100 text-green-600 border-green-200",
    "Transporte": "bg-purple-100 text-purple-600 border-purple-200",
    "transporte": "bg-purple-100 text-purple-600 border-purple-200",
    "Educação": "bg-yellow-100 text-yellow-600 border-yellow-200",
    "educacao": "bg-yellow-100 text-yellow-600 border-yellow-200",
    "Saúde": "bg-red-100 text-red-600 border-red-200",
    "saude": "bg-red-100 text-red-600 border-red-200",
    "Trabalho": "bg-indigo-100 text-indigo-600 border-indigo-200",
    "trabalho": "bg-indigo-100 text-indigo-600 border-indigo-200",
    "Compras": "bg-pink-100 text-pink-600 border-pink-200",
    "compras": "bg-pink-100 text-pink-600 border-pink-200",
    "Investimentos": "bg-emerald-100 text-emerald-600 border-emerald-200",
    "investimentos": "bg-emerald-100 text-emerald-600 border-emerald-200",
    "Emergência": "bg-orange-100 text-orange-600 border-orange-200",
    "emergencia": "bg-orange-100 text-orange-600 border-orange-200",
    "outros": "bg-gray-100 text-gray-600 border-gray-200",
  };
  
  return colors[category] || "bg-gray-100 text-gray-600 border-gray-200";
};

export default function Goals() {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ["/api/goals"],
  });

  const updateForm = useForm<UpdateFormData>({
    resolver: zodResolver(updateGoalSchema),
    defaultValues: {
      currentAmount: "",
    },
  });

  const deleteGoalMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/goals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Meta removida",
        description: "A meta foi removida com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover a meta.",
        variant: "destructive",
      });
    },
  });

  const updateGoalMutation = useMutation({
    mutationFn: async (data: { id: number; currentAmount: number }) => {
      return apiRequest("PUT", `/api/goals/${data.id}`, { currentAmount: data.currentAmount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Meta atualizada",
        description: "O valor atual da meta foi atualizado com sucesso.",
      });
      setUpdateModalOpen(false);
      setSelectedGoal(null);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a meta.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateGoal = (goal: any) => {
    setSelectedGoal(goal);
    updateForm.setValue("currentAmount", goal.currentAmount);
    setUpdateModalOpen(true);
  };

  const onUpdateSubmit = (data: UpdateFormData) => {
    if (selectedGoal) {
      updateGoalMutation.mutate({
        id: selectedGoal.id,
        currentAmount: parseFloat(data.currentAmount)
      });
    }
  };

  const getGoalStatusColor = (progress: number) => {
    if (progress >= 100) return "bg-green-100 text-green-800";
    if (progress >= 75) return "bg-blue-100 text-blue-800";
    if (progress >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getGoalStatusText = (progress: number) => {
    if (progress >= 100) return "Concluída";
    if (progress >= 75) return "Quase lá";
    if (progress >= 50) return "No caminho";
    return "Iniciando";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando metas...</p>
        </div>
      </div>
    );
  }

  const completedGoals = goals.filter((goal: any) => calculateGoalProgress(goal).isCompleted);
  const activeGoals = goals.filter((goal: any) => !calculateGoalProgress(goal).isCompleted);
  const totalTargetAmount = goals.reduce((sum: number, goal: any) => sum + parseFloat(goal.targetAmount), 0);
  const totalCurrentAmount = goals.reduce((sum: number, goal: any) => sum + parseFloat(goal.currentAmount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metas Financeiras</h1>
          <p className="text-gray-600 mt-2">Defina e acompanhe seus objetivos financeiros</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Total de Metas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {goals.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {completedGoals.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
              Valor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {formatCurrency(totalTargetAmount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {totalTargetAmount > 0 ? Math.round((totalCurrentAmount / totalTargetAmount) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {goals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma meta definida</h3>
            <p className="text-gray-500 mb-6">
              Defina suas metas financeiras para acompanhar seu progresso e alcançar seus objetivos.
            </p>
            <Button onClick={() => setModalOpen(true)} className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Meta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeGoals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Metas Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeGoals.map((goal: any) => {
                    const { percentage, remaining } = calculateGoalProgress(goal);
                    const CategoryIcon = getCategoryIcon(goal.category);
                    return (
                      <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getGoalStatusColor(percentage)}>
                              {getGoalStatusText(percentage)}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateGoal(goal)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteGoalMutation.mutate(goal.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              disabled={deleteGoalMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progresso</span>
                            <span className="font-medium">{Math.round(percentage)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Atual</span>
                            <div className="font-semibold text-blue-600">
                              {formatCurrency(parseFloat(goal.currentAmount))}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Meta</span>
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(parseFloat(goal.targetAmount))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>Faltam {formatCurrency(remaining)} para concluir</span>
                          </div>
                          {goal.targetDate && (
                            <div className="flex items-center gap-1 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>Prazo: {formatDate(goal.targetDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {completedGoals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Metas Concluídas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedGoals.map((goal: any) => (
                    <div key={goal.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                        <Badge className="bg-green-100 text-green-800">
                          ✅ Concluída
                        </Badge>
                      </div>
                      <div className="text-sm text-green-700">
                        Meta de {formatCurrency(parseFloat(goal.targetAmount))} alcançada!
                      </div>
                      {goal.targetDate && (
                        <div className="text-xs text-green-600 mt-1">
                          Prazo: {formatDate(goal.targetDate)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeGoals.length === 0 && completedGoals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Parabéns! 🎉</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">
                    Você concluiu todas as suas metas! Que tal definir novos objetivos?
                  </p>
                  <Button onClick={() => setModalOpen(true)} className="gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Definir Nova Meta
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <GoalsModal open={modalOpen} onOpenChange={setModalOpen} />

      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Atualizar Meta</DialogTitle>
          </DialogHeader>
          {selectedGoal && (
            <Form {...updateForm}>
              <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  <p><strong>Meta:</strong> {selectedGoal.name}</p>
                  <p><strong>Objetivo:</strong> {formatCurrency(parseFloat(selectedGoal.targetAmount))}</p>
                </div>
                
                <FormField
                  control={updateForm.control}
                  name="currentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Atual (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0,00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setUpdateModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 gradient-primary"
                    disabled={updateGoalMutation.isPending}
                  >
                    {updateGoalMutation.isPending ? "Atualizando..." : "Atualizar"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
