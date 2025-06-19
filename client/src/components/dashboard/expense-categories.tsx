import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/financial-utils";
import { EXPENSE_CATEGORIES } from "@/types";
import { Home, Utensils, Car, Gamepad2, Heart, GraduationCap, ShoppingBag } from "lucide-react";

interface ExpenseCategoriesProps {
  expensesByCategory: Record<string, { total: number; count: number }>;
  totalExpenses: number;
}

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
    moradia: "red",
    alimentacao: "blue",
    transporte: "green",
    lazer: "purple",
    saude: "pink",
    educacao: "indigo",
    outros: "gray"
  };
  return colors[category as keyof typeof colors] || "gray";
};

export default function ExpenseCategories({ expensesByCategory, totalExpenses }: ExpenseCategoriesProps) {
  const categories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 6);

  const getColorClasses = (color: string) => {
    const colors = {
      red: "bg-red-100 text-red-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
      gray: "bg-gray-100 text-gray-600"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum gasto registrado ainda.</p>
            <p className="text-sm mt-2">Comece registrando seus gastos para ver as categorias aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map(([category, data]) => {
            const percentage = ((data.total / totalExpenses) * 100).toFixed(1);
            const Icon = getCategoryIcon(category);
            const color = getCategoryColor(category);
            const categoryName = EXPENSE_CATEGORIES[category]?.name || category;
            
            return (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getColorClasses(color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{categoryName}</div>
                    <div className="text-sm text-gray-500">{data.count} transações</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{formatCurrency(data.total)}</div>
                  <div className="text-sm text-red-600">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
