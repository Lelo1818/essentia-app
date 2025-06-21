import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Receipt, TrendingDown, Calendar, FileText, Calculator, DollarSign, PiggyBank } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Impostos() {
  const [selectedYear, setSelectedYear] = useState(2024);

  const { data: taxRecords, isLoading } = useQuery({
    queryKey: ['/api/tax-records'],
  });

  // Mock data for demonstration
  const mockTaxData = {
    2024: {
      totalPaid: 45680,
      totalDeductions: 8950,
      estimatedRefund: 1200,
      status: "Declarado",
      dueDate: "2025-04-30",
      records: [
        {
          id: 1,
          type: "IRPF",
          description: "Imposto de Renda Pessoa Física",
          amount: 35000,
          deductions: 7500,
          refund: 1200,
          filedAt: "2024-03-15",
          status: "Processado"
        },
        {
          id: 2,
          type: "IPTU",
          description: "Imposto Predial e Territorial Urbano",
          amount: 3200,
          deductions: 0,
          refund: 0,
          filedAt: "2024-01-10",
          status: "Pago"
        },
        {
          id: 3,
          type: "IPVA",
          description: "Imposto sobre Propriedade de Veículos",
          amount: 2800,
          deductions: 0,
          refund: 0,
          filedAt: "2024-02-20",
          status: "Pago"
        },
        {
          id: 4,
          type: "ITR",
          description: "Imposto Territorial Rural",
          amount: 4680,
          deductions: 1450,
          refund: 0,
          filedAt: "2024-09-30",
          status: "Processado"
        }
      ]
    },
    2023: {
      totalPaid: 42300,
      totalDeductions: 9200,
      estimatedRefund: 2100,
      status: "Finalizado",
      dueDate: "2024-04-30",
      records: [
        {
          id: 5,
          type: "IRPF",
          description: "Imposto de Renda Pessoa Física",
          amount: 32500,
          deductions: 8200,
          refund: 2100,
          filedAt: "2023-03-20",
          status: "Restituído"
        },
        {
          id: 6,
          type: "IPTU",
          description: "Imposto Predial e Territorial Urbano",
          amount: 2900,
          deductions: 0,
          refund: 0,
          filedAt: "2023-01-15",
          status: "Pago"
        },
        {
          id: 7,
          type: "IPVA",
          description: "Imposto sobre Propriedade de Veículos",
          amount: 2650,
          deductions: 0,
          refund: 0,
          filedAt: "2023-03-10",
          status: "Pago"
        },
        {
          id: 8,
          type: "ITR",
          description: "Imposto Territorial Rural",
          amount: 4250,
          deductions: 1000,
          refund: 0,
          filedAt: "2023-09-28",
          status: "Processado"
        }
      ]
    }
  };

  const currentYearData = mockTaxData[selectedYear];
  const deductionPercentage = Math.round((currentYearData.totalDeductions / currentYearData.totalPaid) * 100);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'processado': return 'bg-blue-100 text-blue-800';
      case 'restituído': return 'bg-purple-100 text-purple-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaxTypeIcon = (type: string) => {
    switch (type) {
      case 'IRPF': return <Receipt className="w-4 h-4" />;
      case 'IPTU': return <DollarSign className="w-4 h-4" />;
      case 'IPVA': return <Calculator className="w-4 h-4" />;
      case 'ITR': return <PiggyBank className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            📋 Impostos & Declarações
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus impostos, deduções e restituições
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Imposto
        </Button>
      </div>

      {/* Year Selector */}
      <Tabs value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="2024">2024</TabsTrigger>
          <TabsTrigger value="2023">2023</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedYear.toString()} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
                <Receipt className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-700">
                  R$ {currentYearData.totalPaid.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Impostos pagos em {selectedYear}
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deduções</CardTitle>
                <TrendingDown className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">
                  R$ {currentYearData.totalDeductions.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {deductionPercentage}% do total pago
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Restituição</CardTitle>
                <PiggyBank className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">
                  R$ {currentYearData.estimatedRefund.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedYear === 2024 ? 'Estimada' : 'Recebida'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-purple-700">
                  {currentYearData.status}
                </div>
                <p className="text-xs text-muted-foreground">
                  Prazo: {currentYearData.dueDate}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Deduction Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                Eficiência em Deduções
              </CardTitle>
              <CardDescription>
                Porcentagem de impostos reduzida através de deduções legais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Deduções aplicadas</span>
                  <span className="text-sm font-bold">{deductionPercentage}%</span>
                </div>
                <Progress value={deductionPercentage} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  Economia de R$ {currentYearData.totalDeductions.toLocaleString()} em impostos
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Records */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-green-600" />
              Registros de {selectedYear}
            </h2>
            
            <div className="grid gap-4">
              {currentYearData.records.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getTaxTypeIcon(record.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.type}</h3>
                          <p className="text-sm text-muted-foreground">{record.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Declarado em: {record.filedAt}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold text-red-600">
                          R$ {record.amount.toLocaleString()}
                        </div>
                        {record.deductions > 0 && (
                          <div className="text-sm text-blue-600">
                            -R$ {record.deductions.toLocaleString()} dedução
                          </div>
                        )}
                        {record.refund > 0 && (
                          <div className="text-sm text-green-600">
                            +R$ {record.refund.toLocaleString()} restituição
                          </div>
                        )}
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Ferramentas Fiscais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-12 flex-col">
                  <Calculator className="w-4 h-4 mb-1" />
                  <span className="text-xs">Calcular IR</span>
                </Button>
                <Button variant="outline" className="h-12 flex-col">
                  <FileText className="w-4 h-4 mb-1" />
                  <span className="text-xs">Gerar DIRPF</span>
                </Button>
                <Button variant="outline" className="h-12 flex-col">
                  <TrendingDown className="w-4 h-4 mb-1" />
                  <span className="text-xs">Simular Deduções</span>
                </Button>
                <Button variant="outline" className="h-12 flex-col">
                  <PiggyBank className="w-4 h-4 mb-1" />
                  <span className="text-xs">Consultar Restituição</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}