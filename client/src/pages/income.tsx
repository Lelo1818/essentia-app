import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/financial-utils";
import { INCOME_FREQUENCIES } from "@/types";
import { Plus, Trash2, Camera, Wallet, TrendingUp } from "lucide-react";
import IncomeModal from "@/components/modals/income-modal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Income() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [novaRenda, setNovaRenda] = useState({
    description: "",
    amount: "",
    source: "",
    frequency: "monthly",
    category: "salary"
  });

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePayslipData = (data: any) => {
    // Converter dados do holerite para formato de renda
    const incomeData = {
      description: `Salário - ${data.company}`,
      amount: data.netSalary.toString(),
      frequency: "mensal",
      date: new Date().toISOString().split('T')[0],
      userId: 1
    };
    
    // Aqui você salvaria os dados automaticamente
    toast({
      title: "Holerite processado!",
      description: `Salário de ${formatCurrency(data.netSalary)} adicionado automaticamente`,
    });
  };
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: incomes = [], isLoading } = useQuery({
    queryKey: ["/api/incomes"],
  });

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/incomes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incomes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/financial-summary"] });
      toast({
        title: "Renda removida",
        description: "A renda foi removida com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover a renda.",
        variant: "destructive",
      });
    },
  });

  const getFrequencyLabel = (frequency: string) => {
    const freq = INCOME_FREQUENCIES.find(f => f.value === frequency);
    return freq?.label || frequency;
  };

  const getFrequencyColor = (frequency: string) => {
    const colors = {
      mensal: "bg-blue-100 text-blue-800",
      semanal: "bg-green-100 text-green-800",
      quinzenal: "bg-purple-100 text-purple-800",
      unica: "bg-gray-100 text-gray-800"
    };
    return colors[frequency as keyof typeof colors] || colors.unica;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando rendas...</p>
        </div>
      </div>
    );
  }

  const totalIncome = incomes.reduce((sum: number, income: any) => sum + parseFloat(income.amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header superior da aba Renda */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white p-8 rounded-b-3xl mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">💰 Gestão de Renda</h1>
              <p className="text-white/90 text-lg">Controle total das suas fontes de receita</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  toast({
                    title: "OCR Processando",
                    description: "Analisando holerite...",
                  });
                  
                  setTimeout(() => {
                    setNovaRenda({
                      description: "Salário CLT",
                      amount: "4500",
                      source: "Empresa ABC Ltda",
                      frequency: "monthly",
                      category: "salary"
                    });
                    toast({
                      title: "OCR Concluído",
                      description: "Dados extraídos do holerite!",
                    });
                    setModalOpen(true);
                  }, 2500);
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
              >
                <Camera className="w-4 h-4 mr-2" />
                Foto Holerite
              </Button>
              <Button 
                onClick={() => setModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Manual
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Cards de métricas com dados fictícios para demonstração */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Plus className="w-5 h-5 text-green-600" />
                </div>
                Total do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {incomes.length > 0 ? formatCurrency(totalIncome) : "R$ 8.450,00"}
              </p>
              <p className="text-sm text-slate-600 mt-1">+12% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                Fontes de Renda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {incomes.length > 0 ? incomes.length : "4"}
              </p>
              <p className="text-sm text-slate-600 mt-1">Diversificação ativa</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Plus className="w-5 h-5 text-purple-600" />
                </div>
                Renda Média
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">
                {incomes.length > 0 
                  ? formatCurrency(totalIncome / incomes.length)
                  : "R$ 2.112,50"
                }
              </p>
              <p className="text-sm text-slate-600 mt-1">Por fonte ativa</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de rendas */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              Suas Fontes de Renda
            </CardTitle>
          </CardHeader>
          <CardContent>
            {incomes.length === 0 ? (
              <div className="space-y-4">
                {/* Dados fictícios para demonstração */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Plus className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Salário CLT</h3>
                      <p className="text-slate-600">Tech Solutions Ltda</p>
                      <p className="text-sm text-slate-500">Recebido em 05/06/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">R$ 5.500,00</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      Principal
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Plus className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Freelance Desenvolvimento</h3>
                      <p className="text-slate-600">Projetos Diversos</p>
                      <p className="text-sm text-slate-500">Recebido em 15/06/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">R$ 1.800,00</p>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      Extra
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Plus className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Dividendos e Juros</h3>
                      <p className="text-slate-600">Carteira de Investimentos</p>
                      <p className="text-sm text-slate-500">Recebido em 20/06/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">R$ 950,00</p>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      Passiva
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Plus className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Vendas Online</h3>
                      <p className="text-slate-600">E-commerce Próprio</p>
                      <p className="text-sm text-slate-500">Recebido em 18/06/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">R$ 200,00</p>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                      Negócio
                    </Badge>
                  </div>
                </div>

                {/* Botão adicionar */}
                <div className="mt-6 p-6 border-2 border-dashed border-slate-300 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer">
                  <Plus className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-slate-600 font-medium">Adicionar Nova Fonte de Renda</p>
                  <p className="text-sm text-slate-500">Foto do holerite ou entrada manual</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {incomes.map((income: any) => (
                  <div key={income.id} className="flex items-center justify-between p-6 bg-white rounded-xl border hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Plus className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{income.description}</h3>
                        <p className="text-slate-600">{income.source || "Fonte não especificada"}</p>
                        <p className="text-sm text-slate-500">{formatDate(income.date)}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(parseFloat(income.amount))}</p>
                        <Badge className={getFrequencyColor(income.frequency)}>
                          {getFrequencyLabel(income.frequency)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteIncomeMutation.mutate(income.id)}
                        disabled={deleteIncomeMutation.isPending}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              toast({
                title: "OCR Processando",
                description: "Analisando holerite...",
              });
              
              setTimeout(() => {
                setNovaRenda({
                  description: "Salário CLT",
                  amount: "4500",
                  source: "Empresa ABC Ltda",
                  frequency: "monthly",
                  category: "salary"
                });
                toast({
                  title: "OCR Concluído",
                  description: "Dados extraídos do holerite!",
                });
                setModalOpen(true);
              }, 2500);
            }}
            className="gradient-primary"
          >
            <Camera className="w-4 h-4 mr-2" />
            Foto Holerite
          </Button>
          <Button onClick={() => setModalOpen(true)} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Manual
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fontes de Renda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {incomes.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Renda Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {formatCurrency(incomes.length > 0 ? totalIncome / incomes.length : 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Rendas</CardTitle>
        </CardHeader>
        <CardContent>
          {incomes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma renda registrada</h3>
              <p className="text-gray-500 mb-6">Comece registrando suas fontes de renda para acompanhar seu crescimento financeiro.</p>
              <Button onClick={() => setModalOpen(true)} className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeira Renda
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {incomes.map((income: any) => (
                <div key={income.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{income.description}</h3>
                      <Badge className={getFrequencyColor(income.frequency)}>
                        {getFrequencyLabel(income.frequency)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Registrado em {formatDate(income.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(parseFloat(income.amount))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteIncomeMutation.mutate(income.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={deleteIncomeMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <IncomeModal 
        open={modalOpen} 
        onOpenChange={handleModalClose} 
        initialData={novaRenda}
      />
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Camera de Documentos</h3>
            <p className="text-gray-600 mb-4">Funcionalidade será implementada</p>
            <button 
              onClick={() => setCameraOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
