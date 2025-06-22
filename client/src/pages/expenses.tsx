import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, formatDate, formatDateRelative } from "@/lib/financial-utils";
import { EXPENSE_CATEGORIES } from "@/types";
import { Camera, Plus, Trash2, Filter, Home, Utensils, Car, Gamepad2, Heart, GraduationCap, ShoppingBag } from "lucide-react";
import ExpenseCameraModal from "@/components/modals/expense-camera-modal";
import { ExpenseModal } from "@/components/modals/expense-modal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Expenses() {
  const [modalOpen, setModalOpen] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["/api/expenses"],
  });

  const { data: summary } = useQuery({
    queryKey: ["/api/financial-summary"],
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Gasto removido",
        description: "O gasto foi removido com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o gasto.",
        variant: "destructive",
      });
    },
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      moradia: Home,
      alimentacao: Utensils,
      transporte: Car,
      lazer: Gamepad2,
      saude: Heart,
      educacao: GraduationCap,
      outros: ShoppingBag
    };
    return icons[category as keyof typeof icons] || ShoppingBag;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      moradia: "bg-red-100 text-red-800",
      alimentacao: "bg-blue-100 text-blue-800",
      transporte: "bg-green-100 text-green-800",
      lazer: "bg-purple-100 text-purple-800",
      saude: "bg-pink-100 text-pink-800",
      educacao: "bg-indigo-100 text-indigo-800",
      outros: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || colors.outros;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando gastos...</p>
        </div>
      </div>
    );
  }

  const filteredExpenses = selectedCategory === "all" 
    ? expenses 
    : expenses.filter((expense: any) => expense.category === selectedCategory);

  const totalExpenses = expenses.reduce((sum: number, expense: any) => {
    const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  // Calculate expenses by category from actual data
  const expensesByCategory = expenses.reduce((acc: Record<string, { total: number; count: number }>, expense: any) => {
    const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
    if (!isNaN(amount)) {
      if (!acc[expense.category]) {
        acc[expense.category] = { total: 0, count: 0 };
      }
      acc[expense.category].total += amount;
      acc[expense.category].count += 1;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Gastos</h1>
          <p className="text-gray-600 mt-2">Registre e acompanhe seus gastos por categoria</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setModalOpen(true)} className="gradient-primary">
            <Camera className="w-4 h-4 mr-2" />
            Via Foto
          </Button>
          <Button 
            onClick={() => setManualModalOpen(true)}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Manual
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {expenses.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gasto Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {formatCurrency(expenses.length > 0 ? totalExpenses / expenses.length : 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Object.keys(expensesByCategory).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Seus Gastos</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {Object.entries(EXPENSE_CATEGORIES).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedCategory === "all" ? "Nenhum gasto registrado" : "Nenhum gasto nesta categoria"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {selectedCategory === "all" 
                    ? "Comece fotografando seus recibos para registrar gastos automaticamente."
                    : "Registre gastos nesta categoria para vê-los aqui."
                  }
                </p>
                <Button onClick={() => setModalOpen(true)} className="gradient-primary">
                  <Camera className="w-4 h-4 mr-2" />
                  Registrar Primeiro Gasto
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExpenses.map((expense: any) => {
                  const Icon = getCategoryIcon(expense.category);
                  return (
                    <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{expense.description}</h3>
                            <Badge className={getCategoryColor(expense.category)}>
                              {EXPENSE_CATEGORIES[expense.category]?.name || expense.category}
                            </Badge>
                            {expense.isFromPhoto && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                <Camera className="w-3 h-3 mr-1" />
                                OCR
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {formatDateRelative(expense.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xl font-bold text-red-600">
                            {formatCurrency(parseFloat(expense.amount))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteExpenseMutation.mutate(expense.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={deleteExpenseMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(expensesByCategory).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma categoria ainda.</p>
                <p className="text-sm mt-2">Seus gastos aparecerão organizados por categoria aqui.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(expensesByCategory)
                  .sort((a, b) => b[1].total - a[1].total)
                  .map(([category, data]) => {
                    const percentage = ((data.total / totalExpenses) * 100).toFixed(1);
                    const Icon = getCategoryIcon(category);
                    const categoryName = EXPENSE_CATEGORIES[category]?.name || category;
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{categoryName}</div>
                            <div className="text-xs text-gray-500">{data.count} transações</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 text-sm">{formatCurrency(data.total)}</div>
                          <div className="text-xs text-red-600">{percentage}%</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ExpenseCameraModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
