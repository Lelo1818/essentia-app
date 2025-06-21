import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, CreditCard, TrendingUp, AlertCircle, Gift, Zap } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function Cartoes() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const { data: creditCards, isLoading } = useQuery({
    queryKey: ['/api/credit-cards'],
  });

  const { data: milesPrograms } = useQuery({
    queryKey: ['/api/miles-programs'],
  });

  // Mock data for demonstration - replace with real API calls
  const mockCards = [
    {
      id: 1,
      name: "Nubank Ultravioleta",
      bank: "Nubank",
      limit: 15000,
      currentBalance: 3200,
      dueDate: 15,
      annualFee: 0,
      rewardsProgram: "Nubank Rewards",
      isActive: true,
      color: "purple"
    },
    {
      id: 2,
      name: "Santander SX",
      bank: "Santander",
      limit: 25000,
      currentBalance: 8900,
      dueDate: 25,
      annualFee: 800,
      rewardsProgram: "Esfera",
      isActive: true,
      color: "red"
    },
    {
      id: 3,
      name: "Itaú Personnalité",
      bank: "Itaú",
      limit: 50000,
      currentBalance: 12500,
      dueDate: 10,
      annualFee: 1200,
      rewardsProgram: "Sempre Presente",
      isActive: true,
      color: "orange"
    }
  ];

  const mockMiles = [
    {
      id: 1,
      airline: "TAM",
      programName: "LATAM Pass",
      currentMiles: 45230,
      tierStatus: "Gold",
      expirationDate: "2025-12-31"
    },
    {
      id: 2,
      airline: "Gol",
      programName: "Smiles",
      currentMiles: 28750,
      tierStatus: "Silver",
      expirationDate: "2025-08-15"
    }
  ];

  const getUtilizationPercentage = (balance: number, limit: number) => {
    return Math.round((balance / limit) * 100);
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 80) return "destructive";
    if (percentage >= 60) return "yellow";
    return "green";
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            💳 Cartões de Crédito
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus cartões, limites e programas de recompensas
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cartão
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Total</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              R$ {mockCards.reduce((sum, card) => sum + card.limit, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Disponível em {mockCards.length} cartões
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatura Total</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              R$ {mockCards.reduce((sum, card) => sum + card.currentBalance, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockCards.reduce((sum, card) => sum + card.currentBalance, 0) / mockCards.reduce((sum, card) => sum + card.limit, 0)) * 100)}% do limite utilizado
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milhas</CardTitle>
            <Gift className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {mockMiles.reduce((sum, miles) => sum + miles.currentMiles, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockMiles.length} programas ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCards.map((card) => {
          const utilizationPercentage = getUtilizationPercentage(card.currentBalance, card.limit);
          const utilizationColor = getUtilizationColor(utilizationPercentage);
          
          return (
            <Card 
              key={card.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedCard === card.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            >
              <CardHeader className={`bg-gradient-to-r ${
                card.color === 'purple' ? 'from-purple-600 to-purple-700' :
                card.color === 'red' ? 'from-red-600 to-red-700' :
                'from-orange-600 to-orange-700'
              } text-white rounded-t-lg`}>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <CardDescription className="text-gray-200">
                      {card.bank}
                    </CardDescription>
                  </div>
                  <Zap className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">
                    R$ {card.limit.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Limite disponível</div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Current Balance */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Fatura atual</span>
                      <span className="text-sm font-bold">
                        R$ {card.currentBalance.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={utilizationPercentage} 
                      className="h-2"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {utilizationPercentage}% utilizado
                      </span>
                      <Badge variant={utilizationColor === 'destructive' ? 'destructive' : 'secondary'}>
                        {utilizationColor === 'destructive' ? 'Alto' : 
                         utilizationColor === 'yellow' ? 'Médio' : 'Baixo'}
                      </Badge>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vencimento</span>
                    <span className="text-sm font-medium">Todo dia {card.dueDate}</span>
                  </div>

                  {/* Annual Fee */}
                  {card.annualFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Anuidade</span>
                      <span className="text-sm font-medium">
                        R$ {card.annualFee.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Rewards Program */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Programa</span>
                    <Badge variant="outline">{card.rewardsProgram}</Badge>
                  </div>
                </div>

                {selectedCard === card.id && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Fatura Detalhada
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Agendar Pagamento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Miles Programs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Gift className="w-6 h-6 text-blue-600" />
          Programas de Milhas
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {mockMiles.map((miles) => (
            <Card key={miles.id} className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-blue-700">{miles.programName}</CardTitle>
                    <CardDescription>{miles.airline}</CardDescription>
                  </div>
                  <Badge variant="secondary">{miles.tierStatus}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Saldo atual</span>
                    <span className="text-lg font-bold text-blue-700">
                      {miles.currentMiles.toLocaleString()} milhas
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vencimento</span>
                    <span className="text-sm font-medium">{miles.expirationDate}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Ver Extrato
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}