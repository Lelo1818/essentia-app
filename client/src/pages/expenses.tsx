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
import { ExpenseModal } from "@/components/modals/expense-modal-new";
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
    <div className="space-y-4 p-4 min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Gestão de Gastos</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Registre e acompanhe seus gastos por categoria</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setModalOpen(true)} className="gradient-primary text-xs sm:text-sm">
            <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Foto
          </Button>
          <Button 
            onClick={() => setManualModalOpen(true)}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 text-xs sm:text-sm"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Manual
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-lg">Total do Mês</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-lg sm:text-3xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-lg">Transações</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-lg sm:text-3xl font-bold text-blue-600">
              {expenses.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-lg">Gasto Médio</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-lg sm:text-3xl font-bold text-purple-600">
              {formatCurrency(expenses.length > 0 ? totalExpenses / expenses.length : 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-lg">Categorias</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-lg sm:text-3xl font-bold text-green-600">
              {Object.keys(expensesByCategory).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-lg sm:text-xl">Seus Gastos</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32 sm:w-40 text-xs sm:text-sm">
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
                    <div key={expense.id} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const icons = {
                              "Moradia": Home,
                              "Alimentação": Utensils,
                              "Transporte": Car,
                              "Entretenimento": Gamepad2,
                              "Saúde": Heart,
                              "Educação": GraduationCap,
                              "Compras": ShoppingBag,
                              "Serviços": Plus,
                              "Utilidades": Home,
                              "Outros": Plus,
                            };
                            const IconComponent = icons[expense.category as keyof typeof icons] || Plus;
                            return <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{expense.description}</h3>
                            <div className="flex items-center gap-1 flex-wrap">
                              <Badge className={`${getCategoryColor(expense.category)} text-xs`}>
                                {EXPENSE_CATEGORIES[expense.category]?.name || expense.category}
                              </Badge>
                              {expense.isFromPhoto && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                                  <Camera className="w-3 h-3 mr-1" />
                                  OCR
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {formatDateRelative(expense.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-2">
                        <div className="text-right">
                          <div className="text-base sm:text-xl font-bold text-red-600">
                            {formatCurrency(parseFloat(expense.amount))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteExpenseMutation.mutate(expense.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2"
                          disabled={deleteExpenseMutation.isPending}
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl">Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(expensesByCategory).length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <p className="text-sm sm:text-base">Nenhuma categoria ainda.</p>
                <p className="text-xs sm:text-sm mt-2">Seus gastos aparecerão organizados por categoria aqui.</p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {Object.entries(expensesByCategory)
                  .sort((a, b) => b[1].total - a[1].total)
                  .map(([category, data]) => {
                    const percentage = ((data.total / totalExpenses) * 100).toFixed(1);
                    const Icon = getCategoryIcon(category);
                    const categoryName = EXPENSE_CATEGORIES[category]?.name || category;
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50/80 rounded-lg backdrop-blur-sm hover:bg-gray-100/80 transition-colors">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">{categoryName}</div>
                            <div className="text-xs text-gray-500">{data.count} transações</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <div className="font-semibold text-gray-900 text-xs sm:text-sm">{formatCurrency(data.total)}</div>
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
      
      <ExpenseModal 
        isOpen={manualModalOpen}
        onClose={() => setManualModalOpen(false)}
      />
      </div>
    </div>
  );
}
