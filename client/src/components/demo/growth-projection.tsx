import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

interface GrowthProjectionProps {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function GrowthProjection({ currentBalance, monthlyIncome, monthlyExpenses }: GrowthProjectionProps) {
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const savingsRate = (monthlySavings / monthlyIncome) * 100;
  
  const projections = [
    { period: "3 meses", value: currentBalance + (monthlySavings * 3) },
    { period: "6 meses", value: currentBalance + (monthlySavings * 6) },
    { period: "1 ano", value: currentBalance + (monthlySavings * 12) },
  ];

  const emergencyFund = monthlyExpenses * 6;
  const monthsToEmergencyFund = Math.ceil((emergencyFund - currentBalance) / monthlySavings);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <TrendingUp className="w-5 h-5" />
          Projeção de Crescimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Taxa de Economia */}
        <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Taxa de Economia</span>
          </div>
          <Badge variant={savingsRate > 20 ? "default" : savingsRate > 10 ? "secondary" : "destructive"}>
            {savingsRate.toFixed(1)}%
          </Badge>
        </div>

        {/* Projeções */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Projeções de Saldo:</h4>
          {projections.map((proj, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 bg-white/30 dark:bg-gray-800/30 rounded">
              <span className="text-sm text-gray-600 dark:text-gray-400">{proj.period}</span>
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                {formatCurrency(proj.value)}
              </span>
            </div>
          ))}
        </div>

        {/* Meta Reserva de Emergência */}
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Reserva de Emergência
            </span>
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-300">
            Meta: {formatCurrency(emergencyFund)} em {monthsToEmergencyFund > 0 ? monthsToEmergencyFund : 0} meses
          </div>
        </div>

        {/* Sugestão de Melhoria */}
        {savingsRate < 20 && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Dica Inteligente
              </span>
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              Reduza gastos em R$ {formatCurrency(monthlyExpenses * 0.1)} para atingir 20% de economia
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}