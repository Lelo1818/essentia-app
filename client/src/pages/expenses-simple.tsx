import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/financial-utils";
import { Camera, Plus, Home, Utensils, Car } from "lucide-react";

export default function ExpensesSimple() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["/api/expenses"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando gastos...</p>
        </div>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((sum: number, expense: any) => {
    const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

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
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Foto
            </Button>
            <Button 
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
              <CardTitle className="text-sm sm:text-lg">Esta Semana</CardTitle>
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg sm:text-3xl font-bold text-green-600">
                {formatCurrency(totalExpenses * 0.3)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">Seus Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum gasto registrado
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece fotografando seus recibos para registrar gastos automaticamente.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Camera className="w-4 h-4 mr-2" />
                    Registrar Primeiro Gasto
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {expenses.map((expense: any) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {expense.category === "Alimentação" ? (
                            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          ) : expense.category === "Transporte" ? (
                            <Car className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          ) : (
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{expense.description}</h3>
                          <p className="text-xs sm:text-sm text-gray-500">{expense.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base sm:text-xl font-bold text-red-600">
                          {formatCurrency(parseFloat(expense.amount))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatCurrency(totalExpenses)}
                  </div>
                  <div className="text-sm text-red-700">Total de Gastos</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {expenses.length}
                  </div>
                  <div className="text-sm text-green-700">Transações</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}