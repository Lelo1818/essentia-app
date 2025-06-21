import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Shield, Car, Home, Heart, Briefcase, AlertTriangle, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Seguros() {
  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(null);

  const { data: insurancePolicies, isLoading } = useQuery({
    queryKey: ['/api/insurance-policies'],
  });

  // Mock data for demonstration
  const mockInsurances = [
    {
      id: 1,
      type: "auto",
      provider: "Porto Seguro",
      monthlyPremium: 450,
      coverage: 80000,
      deductible: 2000,
      expiresAt: "2025-08-15",
      isActive: true,
      details: {
        vehicle: "Honda Civic 2022",
        plate: "ABC-1234"
      }
    },
    {
      id: 2,
      type: "health",
      provider: "SulAmérica",
      monthlyPremium: 890,
      coverage: 500000,
      deductible: 0,
      expiresAt: "2025-12-31",
      isActive: true,
      details: {
        plan: "Executivo Nacional",
        dependents: 2
      }
    },
    {
      id: 3,
      type: "life",
      provider: "Bradesco Seguros",
      monthlyPremium: 156,
      coverage: 300000,
      deductible: 0,
      expiresAt: "2026-03-20",
      isActive: true,
      details: {
        beneficiaries: 2
      }
    },
    {
      id: 4,
      type: "property",
      provider: "Itaú Seguros",
      monthlyPremium: 320,
      coverage: 650000,
      deductible: 3000,
      expiresAt: "2025-11-10",
      isActive: true,
      details: {
        address: "Rua das Flores, 123",
        type: "Apartamento"
      }
    }
  ];

  const getInsuranceIcon = (type: string) => {
    switch (type) {
      case 'auto': return <Car className="w-5 h-5" />;
      case 'health': return <Heart className="w-5 h-5" />;
      case 'life': return <Shield className="w-5 h-5" />;
      case 'property': return <Home className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const getInsuranceTypeName = (type: string) => {
    const types = {
      auto: "Seguro Auto",
      health: "Plano de Saúde",
      life: "Seguro de Vida",
      property: "Seguro Residencial"
    };
    return types[type] || type;
  };

  const getInsuranceColor = (type: string) => {
    const colors = {
      auto: "from-blue-600 to-blue-700",
      health: "from-green-600 to-green-700",
      life: "from-purple-600 to-purple-700",
      property: "from-orange-600 to-orange-700"
    };
    return colors[type] || "from-gray-600 to-gray-700";
  };

  const getDaysUntilExpiry = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalMonthlyPremium = mockInsurances.reduce((sum, insurance) => sum + insurance.monthlyPremium, 0);
  const totalCoverage = mockInsurances.reduce((sum, insurance) => sum + insurance.coverage, 0);

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            🛡️ Seguros & Proteções
          </h1>
          <p className="text-muted-foreground">
            Gerencie todas suas proteções e seguros em um só lugar
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Seguro
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura Total</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              R$ {totalCoverage.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Proteção acumulada
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prêmio Mensal</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              R$ {totalMonthlyPremium.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de prêmios mensais
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguros Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {mockInsurances.filter(i => i.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Proteções ativas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Policies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {mockInsurances.map((insurance) => {
          const daysUntilExpiry = getDaysUntilExpiry(insurance.expiresAt);
          const isNearExpiry = daysUntilExpiry <= 30;
          
          return (
            <Card 
              key={insurance.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedInsurance === insurance.id ? 'ring-2 ring-blue-500' : ''
              } ${isNearExpiry ? 'border-yellow-300' : ''}`}
              onClick={() => setSelectedInsurance(selectedInsurance === insurance.id ? null : insurance.id)}
            >
              <CardHeader className={`bg-gradient-to-r ${getInsuranceColor(insurance.type)} text-white rounded-t-lg`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {getInsuranceIcon(insurance.type)}
                    <div>
                      <CardTitle className="text-lg">{getInsuranceTypeName(insurance.type)}</CardTitle>
                      <CardDescription className="text-gray-200">
                        {insurance.provider}
                      </CardDescription>
                    </div>
                  </div>
                  {isNearExpiry && (
                    <Badge variant="secondary" className="bg-yellow-500 text-yellow-900">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Expira em breve
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">
                    R$ {insurance.coverage.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Cobertura máxima</div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Monthly Premium */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Prêmio mensal</span>
                    <span className="text-lg font-bold text-green-600">
                      R$ {insurance.monthlyPremium.toLocaleString()}
                    </span>
                  </div>

                  {/* Deductible */}
                  {insurance.deductible > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Franquia</span>
                      <span className="text-sm font-medium">
                        R$ {insurance.deductible.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Expiry Date */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vencimento</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{insurance.expiresAt}</div>
                      <div className={`text-xs ${isNearExpiry ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                        {daysUntilExpiry > 0 ? `${daysUntilExpiry} dias` : 'Vencido'}
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  {insurance.details && (
                    <div className="space-y-2 pt-2 border-t">
                      {Object.entries(insurance.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground capitalize">
                            {key === 'vehicle' ? 'Veículo' :
                             key === 'plate' ? 'Placa' :
                             key === 'plan' ? 'Plano' :
                             key === 'dependents' ? 'Dependentes' :
                             key === 'beneficiaries' ? 'Beneficiários' :
                             key === 'address' ? 'Endereço' :
                             key === 'type' ? 'Tipo' : key}
                          </span>
                          <span className="text-xs font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedInsurance === insurance.id && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Detalhes da Apólice
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Solicitar Sinistro
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Renovar Seguro
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-12 flex-col">
              <Heart className="w-4 h-4 mb-1" />
              <span className="text-xs">Cotação Saúde</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col">
              <Car className="w-4 h-4 mb-1" />
              <span className="text-xs">Cotação Auto</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col">
              <Home className="w-4 h-4 mb-1" />
              <span className="text-xs">Seguro Casa</span>
            </Button>
            <Button variant="outline" className="h-12 flex-col">
              <Briefcase className="w-4 h-4 mb-1" />
              <span className="text-xs">Seguro Viagem</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}