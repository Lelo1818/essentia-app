import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";

export default function SimpleFinancialOverview() {
  // Buscar dados com invalidação automática
  const { data: summary, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/financial-summary'],
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 1000, // Atualizar a cada 1 segundo
    refetchOnMount: true,
    refetchIntervalInBackground: true,
  });

  // Debug para verificar se os dados estão chegando
  console.log('🔍 SIMPLE FINANCIAL OVERVIEW:', { summary, isLoading, error });

  if (isLoading) return <div>Carregando dados financeiros...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!summary) return <div>Nenhum dado disponível</div>;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: "Receitas",
      value: summary.totalIncome,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12,5%"
    },
    {
      title: "Gastos", 
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "-2,2%"
    },
    {
      title: "Saldo",
      value: summary.balance,
      icon: DollarSign,
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      change: "+23,1%"
    },
    {
      title: "Investimentos",
      value: 8750,
      icon: PiggyBank,
      color: "text-purple-600",
      bgColor: "bg-purple-50", 
      change: "+15,3%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Debug info - remover depois */}
      <div className="col-span-full text-xs text-gray-500 mb-2">
        Debug: totalIncome = {summary?.totalIncome || 'loading...'} | timestamp = {new Date().toLocaleTimeString()}
      </div>
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`${card.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(card.value)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className={card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {card.change}
                </span>
                {' '}desde o mês passado
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}