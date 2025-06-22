import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plane, Star, TrendingUp, Gift, Map, Clock, Award } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function Milhas() {
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const { toast } = useToast();

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  // Sistema de milhas baseado no comportamento financeiro
  const userMiles = {
    total: 47850,
    thisMonth: 8420,
    level: "Gold",
    nextLevel: "Platinum",
    milesNeeded: 12150,
    multiplier: 2.5
  };

  const milesPrograms = [
    {
      id: "smiles",
      name: "Smiles",
      logo: "✈️",
      balance: 28450,
      category: "aviacao",
      partner: "Gol",
      multiplier: 3.0,
      lastEarned: 1250,
      status: "ativo",
      transferRate: 1.2, // R$ por milha
      minRedemption: 5000
    },
    {
      id: "latam",
      name: "LATAM Pass",
      logo: "🛫",
      balance: 19400,
      category: "aviacao",
      partner: "LATAM",
      multiplier: 2.8,
      lastEarned: 920,
      status: "ativo",
      transferRate: 1.1,
      minRedemption: 6000
    },
    {
      id: "livelo",
      name: "Livelo",
      logo: "🎁",
      balance: 12580,
      category: "multibeneficio",
      partner: "Bradesco",
      multiplier: 2.0,
      lastEarned: 580,
      status: "ativo",
      transferRate: 0.8,
      minRedemption: 2000
    },
    {
      id: "tudo_azul",
      name: "TudoAzul",
      logo: "💙",
      balance: 8970,
      category: "aviacao",
      partner: "Azul",
      multiplier: 2.5,
      lastEarned: 350,
      status: "ativo",
      transferRate: 1.0,
      minRedemption: 4500
    }
  ];

  const milesOpportunities = [
    {
      id: 1,
      title: "Compras no Cartão - Milhas Dobradas",
      description: "Use o cartão Flow e ganhe 2x mais milhas em todas as compras",
      milesRate: "2 milhas por R$ 1 gasto",
      category: "cartao",
      partner: "Todos os programas",
      requirement: "Cartão Flow Premium",
      available: true,
      bonus: 5000,
      validUntil: "2025-12-31"
    },
    {
      id: 2,
      title: "Meta Atingida = Milhas Bônus",
      description: "Complete suas metas mensais e ganhe milhas extras",
      milesRate: "1000 milhas por meta",
      category: "metas",
      partner: "Sistema Flow",
      requirement: "Meta mensal completa",
      available: true,
      bonus: 3000,
      validUntil: "2025-08-31"
    },
    {
      id: 3,
      title: "Transferência Inteligente",
      description: "Transfira pontos de cartão para milhas com 30% de bônus",
      milesRate: "1 ponto = 1.3 milhas",
      category: "transferencia",
      partner: "Smiles + LATAM",
      requirement: "Saldo > R$ 5.000",
      available: summary?.balance ? summary.balance > 5000 : false,
      bonus: 2000,
      validUntil: "2025-07-30"
    },
    {
      id: 4,
      title: "Cashback → Milhas",
      description: "Converta seu cashback acumulado em milhas",
      milesRate: "R$ 1 = 50 milhas",
      category: "conversao",
      partner: "Livelo",
      requirement: "Cashback > R$ 100",
      available: true,
      bonus: 1500,
      validUntil: "2025-09-15"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      date: "2025-06-20",
      action: "Compra cartão",
      miles: 1250,
      program: "Smiles",
      details: "Magazine Luiza - R$ 625",
      multiplier: "2x"
    },
    {
      id: 2,
      date: "2025-06-18",
      action: "Meta completada",
      miles: 1000,
      program: "Sistema Flow",
      details: "Meta de economia - Junho",
      multiplier: "Bônus"
    },
    {
      id: 3,
      date: "2025-06-15",
      action: "Transferência",
      miles: 2500,
      program: "LATAM Pass",
      details: "Pontos cartão → milhas",
      multiplier: "1.3x"
    },
    {
      id: 4,
      date: "2025-06-12",
      action: "Cashback conversão",
      miles: 750,
      program: "Livelo",
      details: "R$ 15 cashback → milhas",
      multiplier: "50x"
    }
  ];

  const activateOpportunity = (title: string) => {
    toast({
      title: "Oportunidade Ativada!",
      description: `${title} foi ativado na sua conta. Comece a ganhar milhas extras!`,
    });
  };

  const redeemMiles = (program: string, miles: number) => {
    toast({
      title: "Resgate Processado",
      description: `Processando resgate de ${miles.toLocaleString()} milhas do ${program}`,
    });
  };

  const totalMilesValue = milesPrograms.reduce(
    (sum, program) => sum + (program.balance * program.transferRate), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">✈️ Milhas Inteligentes</h1>
          <p className="text-gray-600">Maximize suas milhas com comportamento financeiro inteligente</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Map className="w-4 h-4 mr-2" />
            Simulador Viagem
          </Button>
          <Button>
            <Gift className="w-4 h-4 mr-2" />
            Resgatar Milhas
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Milhas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {userMiles.total.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Estimado</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalMilesValue)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nível Atual</p>
                <p className="text-2xl font-bold text-purple-600">{userMiles.level}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {userMiles.milesNeeded.toLocaleString()} para {userMiles.nextLevel}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-yellow-600">
                  +{userMiles.thisMonth.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Multiplicador: {userMiles.multiplier}x
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programas de Milhas */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Programas de Milhas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milesPrograms.map((program) => (
              <div key={program.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{program.logo}</div>
                    <div>
                      <h3 className="font-semibold">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.partner}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {program.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Saldo:</span>
                    <span className="font-bold text-lg">
                      {program.balance.toLocaleString()} milhas
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Valor estimado:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(program.balance * program.transferRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Último ganho:</span>
                    <span className="font-medium">
                      +{program.lastEarned} milhas
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Multiplicador:</span>
                    <Badge variant="outline">
                      {program.multiplier}x pontos
                    </Badge>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    onClick={() => redeemMiles(program.name, program.balance)}
                    disabled={program.balance < program.minRedemption}
                  >
                    {program.balance >= program.minRedemption 
                      ? `Resgatar ${program.minRedemption.toLocaleString()}+ milhas`
                      : `Mín. ${program.minRedemption.toLocaleString()} milhas`
                    }
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Oportunidades de Milhas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Oportunidades de Milhas Extras
          </CardTitle>
          <p className="text-sm text-gray-600">
            Ganhe mais milhas com base no seu comportamento financeiro
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milesOpportunities.map((opportunity) => (
              <div key={opportunity.id} className={`p-4 border rounded-lg transition-colors ${
                opportunity.available ? 'hover:bg-gray-50 border-green-200' : 'opacity-75 border-gray-200'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{opportunity.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {opportunity.description}
                      </p>
                    </div>
                    <Badge className={opportunity.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                      {opportunity.available ? 'Disponível' : 'Bloqueado'}
                    </Badge>
                  </div>

                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm font-medium text-blue-900">
                      {opportunity.milesRate}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Bônus de ativação: +{opportunity.bonus.toLocaleString()} milhas
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parceiro:</span>
                      <span className="font-medium">{opportunity.partner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requisito:</span>
                      <span className="font-medium">{opportunity.requirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Válido até:</span>
                      <span className="font-medium">
                        {new Date(opportunity.validUntil).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => activateOpportunity(opportunity.title)}
                    disabled={!opportunity.available}
                  >
                    {opportunity.available ? 'Ativar Agora' : 'Indisponível'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Atividade Recente */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plane className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.action}</h4>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    +{activity.miles.toLocaleString()} milhas
                  </div>
                  <div className="text-sm text-gray-600">{activity.program}</div>
                  <Badge variant="outline" className="mt-1">
                    {activity.multiplier}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}