import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Bell, DollarSign, CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScheduledPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  category: string;
  recurring: 'none' | 'monthly' | 'weekly' | 'yearly';
  status: 'pending' | 'scheduled' | 'paid';
  account: string;
}

export default function AgendarPagamentos() {
  const [payments, setPayments] = useState<ScheduledPayment[]>([
    {
      id: "1",
      description: "Aluguel",
      amount: 1200,
      dueDate: new Date(2025, 6, 10),
      category: "Moradia",
      recurring: 'monthly',
      status: 'scheduled',
      account: "Conta Corrente"
    },
    {
      id: "2", 
      description: "Cartão de Crédito",
      amount: 450,
      dueDate: new Date(2025, 6, 15),
      category: "Cartão",
      recurring: 'monthly',
      status: 'pending',
      account: "Conta Corrente"
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    description: "",
    amount: "",
    dueDate: "",
    category: "",
    recurring: "none",
    account: ""
  });

  const { toast } = useToast();

  const handleSchedulePayment = () => {
    console.log("Agendando pagamento:", newPayment);
    
    if (!newPayment.description || !newPayment.amount || !newPayment.dueDate) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const payment: ScheduledPayment = {
      id: Date.now().toString(),
      description: newPayment.description,
      amount: parseFloat(newPayment.amount),
      dueDate: new Date(newPayment.dueDate),
      category: newPayment.category || "Outros",
      recurring: newPayment.recurring as any,
      status: 'scheduled',
      account: newPayment.account || "Conta Corrente"
    };

    setPayments([...payments, payment]);
    setNewPayment({
      description: "",
      amount: "",
      dueDate: "",
      category: "",
      recurring: "none",
      account: ""
    });

    toast({
      title: "Pagamento Agendado",
      description: `${payment.description} agendado para ${payment.dueDate.toLocaleDateString('pt-BR')}`,
      variant: "default"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'scheduled': return 'Agendado';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  const upcomingPayments = payments.filter(p => p.dueDate > new Date() && p.status !== 'paid');
  const totalUpcoming = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agendar Pagamentos</h1>
        <Badge className="bg-blue-600 text-white">
          {upcomingPayments.length} pagamentos pendentes
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">R$ {totalUpcoming.toFixed(2)}</div>
            <div className="text-blue-600 text-sm">Próximos Pagamentos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{payments.filter(p => p.status === 'scheduled').length}</div>
            <div className="text-green-600 text-sm">Agendados</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Bell className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{payments.filter(p => p.recurring !== 'none').length}</div>
            <div className="text-orange-600 text-sm">Recorrentes</div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule New Payment */}
      <Card>
        <CardHeader>
          <CardTitle>Agendar Novo Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Ex: Conta de luz"
                value={newPayment.description}
                onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0,00"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input
                id="dueDate"
                type="date"
                value={newPayment.dueDate}
                onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={newPayment.category} onValueChange={(value) => setNewPayment({...newPayment, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Moradia">Moradia</SelectItem>
                  <SelectItem value="Cartão">Cartão de Crédito</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Saúde">Saúde</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="recurring">Recorrência</Label>
              <Select value={newPayment.recurring} onValueChange={(value) => setNewPayment({...newPayment, recurring: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a recorrência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem recorrência</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="account">Conta</Label>
              <Select value={newPayment.account} onValueChange={(value) => setNewPayment({...newPayment, account: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                  <SelectItem value="Poupança">Poupança</SelectItem>
                  <SelectItem value="Carteira Digital">Carteira Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <InteractiveButton
            onClick={(e) => {
              e.preventDefault();
              handleSchedulePayment();
            }}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            soundType="success"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agendar Pagamento
          </InteractiveButton>
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {payment.category === 'Cartão' ? (
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{payment.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{payment.dueDate.toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{payment.category}</span>
                      {payment.recurring !== 'none' && (
                        <>
                          <span>•</span>
                          <span className="text-orange-600">Recorrente</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg">R$ {payment.amount.toFixed(2)}</div>
                  <Badge className={getStatusColor(payment.status)}>
                    {getStatusLabel(payment.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <div>
              <h4 className="font-semibold text-orange-800">Lembrete Importante</h4>
              <p className="text-orange-700 text-sm">
                Certifique-se de ter saldo suficiente nas contas para os pagamentos agendados. 
                Configuramos lembretes automáticos 2 dias antes do vencimento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}