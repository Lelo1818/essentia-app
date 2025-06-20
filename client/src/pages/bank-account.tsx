import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft,
  Eye,
  EyeOff,
  Download,
  Filter,
  Search,
  Smartphone,
  QrCode,
  CreditCard,
  Banknote,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

export default function BankAccount() {
  const [showBalance, setShowBalance] = useState(true);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("30days");

  // Dados das contas bancárias
  const bankAccounts = [
    {
      id: 1,
      bank: "Nubank",
      type: "Conta Corrente",
      number: "12345-6",
      agency: "0001",
      balance: 8750.30,
      color: "bg-gradient-to-r from-purple-600 to-purple-800",
      status: "Ativa"
    },
    {
      id: 2,
      bank: "Inter",
      type: "Conta Poupança",
      number: "98765-4",
      agency: "0001",
      balance: 15200.80,
      color: "bg-gradient-to-r from-orange-500 to-orange-700",
      status: "Ativa"
    },
    {
      id: 3,
      bank: "Santander",
      type: "Conta Salário",
      number: "54321-9",
      agency: "3456",
      balance: 2850.00,
      color: "bg-gradient-to-r from-red-600 to-red-800",
      status: "Ativa"
    }
  ];

  // Extrato detalhado
  const transactions = [
    {
      id: 1,
      accountId: 1,
      type: "credit",
      description: "Transferência Recebida - Freelance Design",
      amount: 2200.00,
      date: "2025-06-20",
      time: "14:30",
      balance: 8750.30,
      category: "Transferência",
      reference: "TED-789456123"
    },
    {
      id: 2,
      accountId: 1,
      type: "debit", 
      description: "Pagamento Fatura Cartão Nubank",
      amount: -2850.00,
      date: "2025-06-19",
      time: "10:15",
      balance: 6550.30,
      category: "Pagamento",
      reference: "DEB-456789123"
    },
    {
      id: 3,
      accountId: 1,
      type: "credit",
      description: "Depósito Salário - Tech Solutions",
      amount: 8500.00,
      date: "2025-06-01",
      time: "08:00",
      balance: 9400.30,
      category: "Salário",
      reference: "DEP-123456789"
    },
    {
      id: 4,
      accountId: 1,
      type: "debit",
      description: "PIX - Supermercado Extra",
      amount: -320.50,
      date: "2025-06-18",
      time: "19:45",
      balance: 9079.80,
      category: "Compras",
      reference: "PIX-987654321"
    },
    {
      id: 5,
      accountId: 1,
      type: "debit",
      description: "TED - Aluguel Apartamento",
      amount: -2200.00,
      date: "2025-06-05",
      time: "09:30",
      balance: 7200.30,
      category: "Moradia",
      reference: "TED-654321987"
    },
    {
      id: 6,
      accountId: 2,
      type: "credit",
      description: "Rendimento Poupança",
      amount: 125.80,
      date: "2025-06-01",
      time: "00:01",
      balance: 15200.80,
      category: "Rendimento",
      reference: "REND-147258369"
    }
  ];

  const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);
  
  const monthlyInflow = transactions
    .filter(t => t.type === "credit" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlyOutflow = transactions
    .filter(t => t.type === "debit" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getTransactionIcon = (category: string) => {
    switch (category) {
      case "PIX":
      case "Transferência": return ArrowUpRight;
      case "Pagamento": return CreditCard;
      case "Salário": return Banknote;
      case "Compras": return ArrowDownLeft;
      case "Rendimento": return TrendingUp;
      default: return DollarSign;
    }
  };

  const maskAccountNumber = (number: string) => {
    return showBalance ? number : "****-*";
  };

  const maskedBalance = (balance: number) => {
    return showBalance ? formatCurrency(balance) : "R$ ****,**";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conta Corrente</h1>
            <p className="text-gray-600 mt-2">Acompanhe seus saldos e movimentações</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showBalance ? "Ocultar" : "Mostrar"} Saldos
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setTransferModalOpen(true)}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Transferir
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Saldo Total</p>
                  <p className="text-2xl font-bold text-blue-600">{maskedBalance(totalBalance)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Entradas (Mês)</p>
                  <p className="text-2xl font-bold text-green-600">{maskedBalance(monthlyInflow)}</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Saídas (Mês)</p>
                  <p className="text-2xl font-bold text-red-600">{maskedBalance(monthlyOutflow)}</p>
                </div>
                <ArrowDownLeft className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Resultado</p>
                  <p className={`text-2xl font-bold ${monthlyInflow - monthlyOutflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {maskedBalance(monthlyInflow - monthlyOutflow)}
                  </p>
                </div>
                {monthlyInflow - monthlyOutflow >= 0 ? 
                  <TrendingUp className="w-8 h-8 text-green-500" /> : 
                  <TrendingDown className="w-8 h-8 text-red-500" />
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="accounts">Contas</TabsTrigger>
            <TabsTrigger value="extract">Extrato</TabsTrigger>
            <TabsTrigger value="transfers">Transferências</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {bankAccounts.map((account) => (
                <Card key={account.id} className="relative overflow-hidden">
                  <div className={`${account.color} h-32 p-6 text-white relative`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-90">{account.bank}</p>
                        <p className="font-semibold">{account.type}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {account.status}
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex justify-between text-sm opacity-90">
                        <span>Ag: {account.agency}</span>
                        <span>C/C: {maskAccountNumber(account.number)}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Saldo Disponível</p>
                        <p className="text-2xl font-bold">{maskedBalance(account.balance)}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <QrCode className="w-3 h-3 mr-1" />
                          PIX
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          TED
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <CreditCard className="w-3 h-3 mr-1" />
                          Pagar
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Extrato
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="extract" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Extrato Detalhado</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <Input 
                        placeholder="Buscar transações..." 
                        className="w-full"
                        icon={<Search className="w-4 h-4" />}
                      />
                    </div>
                    <select 
                      className="px-3 py-2 border rounded-md"
                      value={filterPeriod}
                      onChange={(e) => setFilterPeriod(e.target.value)}
                    >
                      <option value="7days">Últimos 7 dias</option>
                      <option value="30days">Últimos 30 dias</option>
                      <option value="90days">Últimos 90 dias</option>
                      <option value="1year">Último ano</option>
                    </select>
                  </div>

                  {transactions.map((transaction) => {
                    const Icon = getTransactionIcon(transaction.category);
                    const account = bankAccounts.find(acc => acc.id === transaction.accountId);
                    
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Icon className={`w-4 h-4 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold">{transaction.description}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{account?.bank}</span>
                              <span>•</span>
                              <span>{new Date(transaction.date).toLocaleDateString()} às {transaction.time}</span>
                              <span>•</span>
                              <span>{transaction.reference}</span>
                            </div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`text-lg font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Saldo: {showBalance ? formatCurrency(transaction.balance) : "R$ ****,**"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transferir Dinheiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>De (Conta de Origem)</Label>
                      <select className="w-full p-2 border rounded">
                        {bankAccounts.map(account => (
                          <option key={account.id} value={account.id}>
                            {account.bank} - {account.type} - {maskedBalance(account.balance)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Tipo de Transferência</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="outline" className="h-20 flex-col">
                          <QrCode className="w-6 h-6 mb-2" />
                          PIX
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Building2 className="w-6 h-6 mb-2" />
                          TED/DOC
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Chave PIX ou Dados Bancários</Label>
                      <Input placeholder="Digite a chave PIX ou CPF/CNPJ" />
                    </div>

                    <div>
                      <Label>Valor</Label>
                      <Input type="number" placeholder="R$ 0,00" />
                    </div>

                    <Button className="w-full">
                      Continuar Transferência
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transferências Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <QrCode className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-semibold">João Silva</p>
                          <p className="text-sm text-gray-500">PIX • 19/06/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">-R$ 250,00</p>
                        <Button size="sm" variant="outline" className="mt-1">Repetir</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-semibold">Maria Santos</p>
                          <p className="text-sm text-gray-500">TED • 15/06/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">-R$ 1.200,00</p>
                        <Button size="sm" variant="outline" className="mt-1">Repetir</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Smartphone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Recarga de Celular</h3>
                  <p className="text-sm text-gray-600">Recarregue seu celular ou de terceiros</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <CreditCard className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pagar Contas</h3>
                  <p className="text-sm text-gray-600">Pague boletos e contas em geral</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <QrCode className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">QR Code</h3>
                  <p className="text-sm text-gray-600">Pague com QR Code ou gere o seu</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Download className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Extrato PDF</h3>
                  <p className="text-sm text-gray-600">Baixe extratos para declaração</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Building2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Investimentos</h3>
                  <p className="text-sm text-gray-600">Acesse sua carteira de investimentos</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Banknote className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Empréstimos</h3>
                  <p className="text-sm text-gray-600">Simule e contrate empréstimos</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Transfer Modal */}
        <Dialog open={transferModalOpen} onOpenChange={setTransferModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Transferência</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Conta de Origem</Label>
                <select className="w-full p-2 border rounded">
                  {bankAccounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.bank} - {account.type} - {maskedBalance(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Chave PIX</Label>
                <Input placeholder="Digite a chave PIX, CPF ou telefone" />
              </div>

              <div>
                <Label>Valor</Label>
                <Input type="number" placeholder="R$ 0,00" />
              </div>

              <div>
                <Label>Descrição (opcional)</Label>
                <Input placeholder="Motivo da transferência" />
              </div>

              <Button className="w-full">
                Transferir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}