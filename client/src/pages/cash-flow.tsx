import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Plus,
  Download,
  Filter,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function CashFlow() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [newEntryModalOpen, setNewEntryModalOpen] = useState(false);
  const [entryType, setEntryType] = useState("income");

  // Dados simulados de fluxo de caixa (próximos 6 meses)
  const cashFlowData = [
    {
      month: "2025-07",
      name: "Julho 2025",
      plannedIncome: 11235,
      actualIncome: 0,
      plannedExpenses: 8500,
      actualExpenses: 0,
      netFlow: 2735,
      status: "planned"
    },
    {
      month: "2025-08", 
      name: "Agosto 2025",
      plannedIncome: 11235,
      actualIncome: 0,
      plannedExpenses: 8200,
      actualExpenses: 0,
      netFlow: 3035,
      status: "planned"
    },
    {
      month: "2025-09",
      name: "Setembro 2025", 
      plannedIncome: 11235,
      actualIncome: 0,
      plannedExpenses: 8800,
      actualExpenses: 0,
      netFlow: 2435,
      status: "planned"
    },
    {
      month: "2025-10",
      name: "Outubro 2025",
      plannedIncome: 11735, // Inclui aumento
      actualIncome: 0,
      plannedExpenses: 9000,
      actualExpenses: 0,
      netFlow: 2735,
      status: "planned"
    },
    {
      month: "2025-11",
      name: "Novembro 2025",
      plannedIncome: 11735,
      actualIncome: 0,
      plannedExpenses: 9200,
      actualExpenses: 0,
      netFlow: 2535,
      status: "planned"
    },
    {
      month: "2025-12",
      name: "Dezembro 2025",
      plannedIncome: 13235, // 13º salário
      actualIncome: 0,
      plannedExpenses: 12000, // Gastos de fim de ano
      actualExpenses: 0,
      netFlow: 1235,
      status: "planned"
    }
  ];

  // Entradas e saídas detalhadas
  const cashFlowEntries = [
    // Receitas
    {
      id: 1,
      type: "income",
      description: "Salário CLT - Tech Solutions",
      amount: 8500,
      date: "2025-07-01",
      category: "Salário",
      frequency: "mensal",
      status: "confirmed"
    },
    {
      id: 2,
      type: "income", 
      description: "Freelance Design",
      amount: 2200,
      date: "2025-07-15",
      category: "Freelance",
      frequency: "eventual",
      status: "estimated"
    },
    {
      id: 3,
      type: "income",
      description: "Dividendos Ações",
      amount: 450,
      date: "2025-07-20",
      category: "Investimentos",
      frequency: "mensal",
      status: "confirmed"
    },
    {
      id: 4,
      type: "income",
      description: "Cashback Cartão",
      amount: 85,
      date: "2025-07-05",
      category: "Cashback",
      frequency: "mensal",
      status: "confirmed"
    },
    // Despesas
    {
      id: 5,
      type: "expense",
      description: "Aluguel Apartamento",
      amount: -2200,
      date: "2025-07-01",
      category: "Moradia",
      frequency: "mensal",
      status: "confirmed"
    },
    {
      id: 6,
      type: "expense",
      description: "Alimentação",
      amount: -1200,
      date: "2025-07-01",
      category: "Alimentação",
      frequency: "mensal",
      status: "estimated"
    },
    {
      id: 7,
      type: "expense",
      description: "Transporte",
      amount: -800,
      date: "2025-07-01",
      category: "Transporte",
      frequency: "mensal",
      status: "estimated"
    },
    {
      id: 8,
      type: "expense",
      description: "Fatura Cartão Nubank",
      amount: -2850,
      date: "2025-07-15",
      category: "Cartão",
      frequency: "mensal",
      status: "confirmed"
    },
    {
      id: 9,
      type: "expense",
      description: "Seguro Saúde",
      amount: -680,
      date: "2025-07-10",
      category: "Saúde",
      frequency: "mensal",
      status: "confirmed"
    },
    {
      id: 10,
      type: "expense",
      description: "Investimentos",
      amount: -2500,
      date: "2025-07-01",
      category: "Investimentos",
      frequency: "mensal",
      status: "planned"
    }
  ];

  const currentMonthFlow = cashFlowData[0];
  const totalPlannedIncome = cashFlowData.reduce((sum, month) => sum + month.plannedIncome, 0);
  const totalPlannedExpenses = cashFlowData.reduce((sum, month) => sum + month.plannedExpenses, 0);
  const totalNetFlow = totalPlannedIncome - totalPlannedExpenses;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "estimated": return "bg-yellow-100 text-yellow-800";
      case "planned": return "bg-blue-100 text-blue-800";
      case "late": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return CheckCircle;
      case "estimated": return Clock;
      case "planned": return Target;
      case "late": return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fluxo de Caixa</h1>
            <p className="text-gray-600 mt-2">Planeje e acompanhe suas entradas e saídas</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setNewEntryModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Entrada
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Receitas Previstas</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPlannedIncome)}</p>
                  <p className="text-xs text-gray-500">Próximos 6 meses</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Despesas Previstas</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPlannedExpenses)}</p>
                  <p className="text-xs text-gray-500">Próximos 6 meses</p>
                </div>
                <ArrowDownLeft className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Fluxo Líquido</p>
                  <p className={`text-2xl font-bold ${totalNetFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(totalNetFlow)}
                  </p>
                  <p className="text-xs text-gray-500">Próximos 6 meses</p>
                </div>
                {totalNetFlow >= 0 ? 
                  <TrendingUp className="w-8 h-8 text-green-500" /> : 
                  <TrendingDown className="w-8 h-8 text-red-500" />
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Próximo Mês</p>
                  <p className={`text-2xl font-bold ${currentMonthFlow.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(currentMonthFlow.netFlow)}
                  </p>
                  <p className="text-xs text-gray-500">{currentMonthFlow.name}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projection">Projeção</TabsTrigger>
            <TabsTrigger value="entries">Entradas/Saídas</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
            <TabsTrigger value="scenarios">Cenários</TabsTrigger>
          </TabsList>

          <TabsContent value="projection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projeção de Fluxo de Caixa - Próximos 6 Meses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashFlowData.map((month, index) => (
                    <div key={month.month} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{month.name}</h4>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Receitas</p>
                              <p className="font-semibold text-green-600">{formatCurrency(month.plannedIncome)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Despesas</p>
                              <p className="font-semibold text-red-600">{formatCurrency(month.plannedExpenses)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Saldo</p>
                              <p className={`font-semibold ${month.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(month.netFlow)}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Badge className={month.netFlow >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {month.netFlow >= 0 ? "Positivo" : "Negativo"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5 text-green-500" />
                    Receitas Programadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cashFlowEntries
                      .filter(entry => entry.type === "income")
                      .map((entry) => {
                        const StatusIcon = getStatusIcon(entry.status);
                        return (
                          <div key={entry.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <StatusIcon className="w-4 h-4 text-gray-500" />
                              <div>
                                <h4 className="font-semibold">{entry.description}</h4>
                                <p className="text-sm text-gray-500">
                                  {new Date(entry.date).toLocaleDateString()} • {entry.frequency}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-green-600">{formatCurrency(entry.amount)}</p>
                              <Badge className={getStatusColor(entry.status)}>
                                {entry.status}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowDownLeft className="w-5 h-5 text-red-500" />
                    Despesas Programadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cashFlowEntries
                      .filter(entry => entry.type === "expense")
                      .map((entry) => {
                        const StatusIcon = getStatusIcon(entry.status);
                        return (
                          <div key={entry.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <StatusIcon className="w-4 h-4 text-gray-500" />
                              <div>
                                <h4 className="font-semibold">{entry.description}</h4>
                                <p className="text-sm text-gray-500">
                                  {new Date(entry.date).toLocaleDateString()} • {entry.frequency}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-red-600">{formatCurrency(Math.abs(entry.amount))}</p>
                              <Badge className={getStatusColor(entry.status)}>
                                {entry.status}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendência do Fluxo de Caixa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-green-800">Tendência Positiva</h4>
                      </div>
                      <p className="text-sm text-green-700">
                        Seu fluxo de caixa mostra uma tendência positiva consistente nos próximos 6 meses, 
                        com uma média mensal de R$ 2.540 de superávit.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Maior entrada</span>
                        <span className="font-semibold">{formatCurrency(13235)} (Dezembro)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Maior saída</span>
                        <span className="font-semibold">{formatCurrency(12000)} (Dezembro)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Melhor mês</span>
                        <span className="font-semibold">Agosto (+{formatCurrency(3035)})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Pior mês</span>
                        <span className="font-semibold">Dezembro (+{formatCurrency(1235)})</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertas e Recomendações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Atenção em Dezembro</h4>
                          <p className="text-sm text-yellow-700">
                            Dezembro terá o menor superávit devido aos gastos de fim de ano. 
                            Considere economizar nos meses anteriores.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2">
                        <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Oportunidade</h4>
                          <p className="text-sm text-blue-700">
                            Com o superávit médio mensal, você pode aumentar os investimentos 
                            em R$ 500 por mês sem comprometer o fluxo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800">Meta de Reserva</h4>
                          <p className="text-sm text-green-700">
                            Mantendo este ritmo, você terá R$ 15.240 extras nos próximos 6 meses 
                            para fortalecer sua reserva de emergência.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cenário Otimista</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-sm text-green-700">
                        <strong>+20% nas receitas de freelance</strong><br/>
                        Impacto: +R$ 2.640 em 6 meses
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-sm text-green-700">
                        <strong>Redução de 10% nos gastos variáveis</strong><br/>
                        Impacto: +R$ 1.020 em 6 meses
                      </p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="font-semibold text-green-600">
                        Fluxo Total: +R$ 18.900 (vs R$ 15.240)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cenário Pessimista</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-sm text-red-700">
                        <strong>Perda de 50% dos freelances</strong><br/>
                        Impacto: -R$ 6.600 em 6 meses
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-sm text-red-700">
                        <strong>Emergência médica: R$ 5.000</strong><br/>
                        Impacto: -R$ 5.000 (mês único)
                      </p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="font-semibold text-red-600">
                        Fluxo Total: +R$ 3.640 (vs R$ 15.240)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* New Entry Modal */}
        <Dialog open={newEntryModalOpen} onOpenChange={setNewEntryModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Entrada no Fluxo de Caixa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tipo</Label>
                <Select value={entryType} onValueChange={setEntryType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Receita</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Descrição</Label>
                <Input placeholder="Ex: Salário, Aluguel, Freelance..." />
              </div>

              <div>
                <Label>Valor</Label>
                <Input type="number" placeholder="R$ 0,00" />
              </div>

              <div>
                <Label>Data</Label>
                <Input type="date" />
              </div>

              <div>
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {entryType === "income" ? (
                      <>
                        <SelectItem value="salary">Salário</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="investments">Investimentos</SelectItem>
                        <SelectItem value="cashback">Cashback</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="housing">Moradia</SelectItem>
                        <SelectItem value="food">Alimentação</SelectItem>
                        <SelectItem value="transport">Transporte</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="education">Educação</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Frequência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="biweekly">Quinzenal</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                    <SelectItem value="one-time">Única vez</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                Adicionar ao Fluxo de Caixa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}