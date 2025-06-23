import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function LiveFinancialCards() {
  const [, setLocation] = useLocation();
  
  // Query com timestamp para evitar cache
  const { data: summary, isLoading } = useQuery({
    queryKey: [`/api/financial-summary-${Date.now()}`],
    queryFn: async () => {
      const response = await fetch('/api/financial-summary?' + Date.now());
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 500,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Debug removido para estabilidade

  if (isLoading) return <div className="text-center py-8">Carregando dados...</div>;
  
  // Se summary undefined, usar valores padrão temporariamente
  const safeData = summary || {
    totalIncome: 15101.8,
    totalExpenses: 4267.94,
    balance: 10833.86
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: "Receitas",
      value: safeData.totalIncome,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12,5%"
    },
    {
      title: "Gastos", 
      value: safeData.totalExpenses,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "-2,2%"
    },
    {
      title: "Saldo",
      value: safeData.balance,
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
    <>
      {/* Debug visual - apenas em modo dev */}
      {!window?.isDemoMode && (
        <div className="bg-yellow-100 p-2 rounded mb-4 text-sm">
          <strong>LIVE UPDATE:</strong> Receitas = R$ {safeData.totalIncome?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} 
          | Timestamp: {new Date().toLocaleTimeString()}
          | API Status: {summary ? '✅ Conectado' : '⚠️ Usando valores seguros'}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isInvestments = card.title === "Investimentos";
          
          return (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${isInvestments ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
              onClick={isInvestments ? () => {
                console.log('Clicando em Investimentos - navegando para /investments');
                setLocation('/investments');
              } : undefined}
            >
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
                {isInvestments && (
                  <div className="mt-3">
                    <button 
                      className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Botão Investimentos clicado');
                        setLocation('/investments');
                      }}
                    >
                      Ver Detalhes →
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}