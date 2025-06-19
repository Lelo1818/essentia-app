import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateRelative } from "@/lib/financial-utils";
import { EXPENSE_CATEGORIES } from "@/types";
import { Home, Utensils, Car, Gamepad2, Heart, GraduationCap, ShoppingBag, Building } from "lucide-react";

interface RecentTransactionsProps {
  transactions: any[];
}

const getTransactionIcon = (transaction: any) => {
  if (transaction.type === 'income') {
    return Building;
  }
  
  const icons = {
    moradia: Home,
    alimentacao: Utensils,
    transporte: Car,
    lazer: Gamepad2,
    saude: Heart,
    educacao: GraduationCap,
    outros: ShoppingBag
  };
  return icons[transaction.category as keyof typeof icons] || ShoppingBag;
};

const getTransactionColor = (transaction: any) => {
  if (transaction.type === 'income') {
    return "green";
  }
  
  const colors = {
    moradia: "red",
    alimentacao: "blue",
    transporte: "green",
    lazer: "purple",
    saude: "pink",
    educacao: "indigo",
    outros: "gray"
  };
  return colors[transaction.category as keyof typeof colors] || "gray";
};

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
      gray: "bg-gray-100 text-gray-600"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações Recentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma transação registrada ainda.</p>
            <p className="text-sm mt-2">Suas transações aparecerão aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transações Recentes</CardTitle>
          <Button variant="ghost" className="text-primary-600 hover:text-primary-700">
            Ver todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => {
            const Icon = getTransactionIcon(transaction);
            const color = getTransactionColor(transaction);
            const isIncome = transaction.type === 'income';
            const amount = parseFloat(transaction.amount);
            
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getColorClasses(color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{formatDateRelative(transaction.date)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                    {isIncome ? '+' : '-'}{formatCurrency(amount)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isIncome ? 'Renda' : (EXPENSE_CATEGORIES[transaction.category]?.name || transaction.category)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
