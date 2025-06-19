import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, calculateDebtOptimization } from "@/lib/financial-utils";
import { Lightbulb, CheckCircle } from "lucide-react";

interface DebtOptimizationProps {
  debts: any[];
}

export default function DebtOptimization({ debts }: DebtOptimizationProps) {
  if (debts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dívidas e Otimização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma dívida registrada.</p>
            <p className="text-sm mt-2">Parabéns! Você está livre de dívidas!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dívidas e Otimização</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {debts.slice(0, 2).map((debt) => {
            const optimization = calculateDebtOptimization(debt);
            const isOptimized = optimization.savings <= 0;
            
            return (
              <div key={debt.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{debt.name}</span>
                  <span className="text-sm font-semibold text-red-600">
                    {parseFloat(debt.interestRate).toFixed(1)}% a.m.
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(debt.amount))}
                  </span>
                  <span className="text-sm text-gray-500">
                    Mín: {formatCurrency(parseFloat(debt.minPayment))}
                  </span>
                </div>
                
                {isOptimized ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Pagamento Otimizado</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Continue pagando {formatCurrency(parseFloat(debt.minPayment))}/mês. Taxa competitiva!
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-yellow-700">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Sugestão de Otimização</span>
                    </div>
                    <p className="text-sm text-yellow-600 mt-1">
                      Pagando {formatCurrency(optimization.suggestedPayment)}/mês, você economiza {formatCurrency(optimization.savings)} em juros
                    </p>
                  </div>
                )}
                
                {!isOptimized && (
                  <Button className="w-full gradient-primary">
                    Otimizar Pagamento
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
