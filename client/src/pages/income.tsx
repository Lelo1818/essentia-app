import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/financial-utils";
import { INCOME_FREQUENCIES } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import IncomeModal from "@/components/modals/income-modal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Income() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: incomes = [], isLoading } = useQuery({
    queryKey: ["/api/incomes"],
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Renda</h1>
          <p className="text-gray-600 mt-2">Registre e gerencie suas fontes de renda</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Renda
        </Button>
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

      <IncomeModal open={modalOpen} onOpenChange={handleModalClose} />
    </div>
  );
}
