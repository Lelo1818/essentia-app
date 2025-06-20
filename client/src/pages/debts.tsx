import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  CreditCard,
  Clock,
  Target
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/financial-utils";

export default function Debts() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [negotiationModalOpen, setNegotiationModalOpen] = useState(false);

  const { data: debts = [], isLoading } = useQuery({
    queryKey: ["/api/debts"],
  });

  const totalDebt = debts.reduce((sum: number, debt: any) => {
    const amount = typeof debt.amount === 'string' ? parseFloat(debt.amount) : debt.amount;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  
  const monthlyPayments = debts.reduce((sum: number, debt: any) => {
    const payment = typeof debt.minimumPayment === 'string' ? parseFloat(debt.minimumPayment) : debt.minimumPayment;
    return sum + (isNaN(payment) ? 0 : payment);
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dívidas e Otimização</h1>
            <p className="text-gray-600 mt-2">Gerencie suas dívidas e otimize pagamentos</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total de Dívidas</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDebt)}</p>
                </div>
                <CreditCard className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pagamentos Mensais</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(monthlyPayments)}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Economia Potencial</p>
                  <p className="text-2xl font-bold text-green-600">R$ 180</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => setScheduleModalOpen(true)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Pagamentos
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setSimulationModalOpen(true)}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Simular Cenários
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setNegotiationModalOpen(true)}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Renegociar Dívidas
          </Button>
        </div>

        {/* Debts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {debts.map((debt: any) => (
            <Card key={debt.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{debt.description}</CardTitle>
                  <Badge variant="destructive">
                    {debt.interestRate}% a.m.
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Valor Total</span>
                    <span className="font-semibold">{formatCurrency(debt.amount)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Pagamento Mínimo</span>
                    <span className="font-semibold">{formatCurrency(debt.minimumPayment)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Vencimento</span>
                    <span className="font-semibold">{formatDate(debt.dueDate)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso de Pagamento</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optimization Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                Alerta Importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Seus cartões de crédito têm juros muito altos (12,5% e 15,2% a.m.). Priorize 
                quitar essas dívidas primeiro para evitar o efeito bola de neve.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-500" />
                Meta do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Segundo o plano, você pode quitar o Cartão CB Bank em 3 meses e 
                economizar R$ 180 em juros. Foco total nesta dívida!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Pagamentos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="debt-select">Selecionar Dívida</Label>
                <select className="w-full p-2 border rounded">
                  {debts.map((debt: any) => (
                    <option key={debt.id} value={debt.id}>{debt.description}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="payment-date">Data do Pagamento</Label>
                <Input type="date" id="payment-date" />
              </div>
              <div>
                <Label htmlFor="payment-amount">Valor do Pagamento</Label>
                <Input type="number" id="payment-amount" placeholder="R$ 0,00" />
              </div>
              <Button className="w-full">Agendar Pagamento</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={simulationModalOpen} onOpenChange={setSimulationModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Simular Cenários</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Cenário: Pagamento Extra</Label>
                <Input type="number" placeholder="Valor extra mensal" />
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold">Resultado da Simulação</h4>
                <p className="text-sm">Com R$ 500 extras por mês:</p>
                <ul className="text-sm list-disc list-inside">
                  <li>Quitação: 8 meses mais cedo</li>
                  <li>Economia: R$ 2.400 em juros</li>
                </ul>
              </div>
              <Button className="w-full">Aplicar Cenário</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={negotiationModalOpen} onOpenChange={setNegotiationModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Renegociar Dívidas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Dívida para Renegociar</Label>
                <select className="w-full p-2 border rounded">
                  {debts.map((debt: any) => (
                    <option key={debt.id} value={debt.id}>{debt.description}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Proposta de Desconto (%)</Label>
                <Input type="number" placeholder="Ex: 30" />
              </div>
              <div>
                <Label>Prazo para Pagamento (meses)</Label>
                <Input type="number" placeholder="Ex: 12" />
              </div>
              <Button className="w-full">Enviar Proposta</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}