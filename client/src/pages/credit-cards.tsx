import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Eye,
  EyeOff,
  Lock,
  Plus,
  Smartphone,
  Shield,
  Clock,
  Target
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { BankLogos, CardFlags } from "@/assets/bank-logos";
import DocumentCamera from "@/components/camera/document-camera";
import { useToast } from "@/hooks/use-toast";

export default function CreditCards() {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const { toast } = useToast();

  const handleBillData = (data: any) => {
    toast({
      title: "Fatura processada!",
      description: `Fatura ${data.bank} de ${formatCurrency(data.totalAmount)} identificada`,
    });
  };

  // Dados dos cartões de crédito do usuário
  const creditCards = [
    {
      id: 1,
      bank: "Nubank",
      name: "Nubank Roxinho",
      number: "5555 1234 5678 9012",
      brand: "Mastercard",
      limit: 15000,
      used: 2850,
      available: 12150,
      dueDate: "2025-07-15",
      minimumPayment: 285,
      currentBill: 2850,
      previousBill: 2420,
      color: "bg-gradient-to-r from-purple-600 to-purple-800",
      cashback: 1.5,
      annualFee: 0,
      status: "Ativo"
    },
    {
      id: 2,
      bank: "Inter",
      name: "Inter Gold",
      number: "4444 8765 4321 1098",
      brand: "Visa",
      limit: 8000,
      used: 1200,
      available: 6800,
      dueDate: "2025-07-20",
      minimumPayment: 120,
      currentBill: 1200,
      previousBill: 980,
      color: "bg-gradient-to-r from-orange-500 to-orange-700",
      cashback: 1.0,
      annualFee: 0,
      status: "Ativo"
    },
    {
      id: 3,
      bank: "Santander",
      name: "SX Black",
      number: "5555 9876 1234 5678",
      brand: "Mastercard",
      limit: 25000,
      used: 4850,
      available: 20150,
      dueDate: "2025-07-25",
      minimumPayment: 485,
      currentBill: 4850,
      previousBill: 3200,
      color: "bg-gradient-to-r from-black to-gray-800",
      cashback: 2.5,
      annualFee: 600,
      status: "Ativo"
    }
  ];

  // Transações recentes nos cartões
  const cardTransactions = [
    {
      id: 1,
      cardId: 1,
      description: "Supermercado Extra",
      amount: 320.50,
      date: "2025-06-19",
      category: "alimentacao",
      installments: 1,
      cashback: 4.81
    },
    {
      id: 2,
      cardId: 1,
      description: "Netflix",
      amount: 45.90,
      date: "2025-06-18",
      category: "entretenimento",
      installments: 1,
      cashback: 0.69
    },
    {
      id: 3,
      cardId: 2,
      description: "Posto Shell",
      amount: 180.00,
      date: "2025-06-17",
      category: "transporte",
      installments: 1,
      cashback: 1.80
    },
    {
      id: 4,
      cardId: 3,
      description: "Restaurante Japonês",
      amount: 280.00,
      date: "2025-06-16",
      category: "alimentacao",
      installments: 1,
      cashback: 7.00
    }
  ];

  const totalLimit = creditCards.reduce((sum, card) => sum + card.limit, 0);
  const totalUsed = creditCards.reduce((sum, card) => sum + card.used, 0);
  const totalAvailable = creditCards.reduce((sum, card) => sum + card.available, 0);
  const totalCashback = cardTransactions.reduce((sum, trans) => sum + trans.cashback, 0);

  const maskCardNumber = (number: string) => {
    if (showCardNumbers) return number;
    return number.replace(/\d(?=\d{4})/g, "*");
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 30) return "text-green-600";
    if (percentage < 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cartões de Crédito</h1>
            <p className="text-gray-600 mt-2">Gerencie seus cartões e faturas</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowCardNumbers(!showCardNumbers)}
            >
              {showCardNumbers ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showCardNumbers ? "Ocultar" : "Mostrar"} Números
            </Button>
            <div className="flex gap-2">
              <Button onClick={() => setCameraOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Camera className="w-4 h-4 mr-2" />
                Foto Fatura
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cartão
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Limite Total</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalLimit)}</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Valor Usado</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalUsed)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Disponível</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAvailable)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cashback Mês</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalCashback)}</p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cards">Meus Cartões</TabsTrigger>
            <TabsTrigger value="bills">Faturas</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="benefits">Benefícios</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {creditCards.map((card) => {
                const usagePercentage = getUsagePercentage(card.used, card.limit);
                return (
                  <Card key={card.id} className="relative overflow-hidden">
                    <div className={`${card.color} h-48 p-6 text-white relative`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm opacity-90">{card.bank}</p>
                          <p className="font-semibold">{card.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-90">{card.brand}</p>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {card.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <p className="text-lg font-mono tracking-wider">
                          {maskCardNumber(card.number)}
                        </p>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex justify-between text-sm">
                          <span>Limite</span>
                          <span>{formatCurrency(card.limit)}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Usado</span>
                            <span className={getUsageColor(usagePercentage)}>
                              {formatCurrency(card.used)} ({usagePercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <Progress value={usagePercentage} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Disponível</p>
                            <p className="font-semibold">{formatCurrency(card.available)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Fatura Atual</p>
                            <p className="font-semibold">{formatCurrency(card.currentBill)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Vence em {new Date(card.dueDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedCard(card);
                              setPaymentModalOpen(true);
                            }}
                          >
                            Pagar Fatura
                          </Button>
                          <Button size="sm" variant="outline">
                            <Lock className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="bills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {creditCards.map((card) => (
                <Card key={card.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      {card.name} - {card.bank}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-red-800">Fatura Atual</p>
                            <p className="text-2xl font-bold text-red-600">{formatCurrency(card.currentBill)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-red-600">Vencimento</p>
                            <p className="font-semibold text-red-800">{new Date(card.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Pagamento Mínimo</p>
                          <p className="font-semibold">{formatCurrency(card.minimumPayment)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fatura Anterior</p>
                          <p className="font-semibold">{formatCurrency(card.previousBill)}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full">
                          Pagar Valor Total - {formatCurrency(card.currentBill)}
                        </Button>
                        <Button variant="outline" className="w-full">
                          Pagar Mínimo - {formatCurrency(card.minimumPayment)}
                        </Button>
                        <Button variant="outline" className="w-full">
                          Pagar Outro Valor
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cardTransactions.map((transaction) => {
                    const card = creditCards.find(c => c.id === transaction.cardId);
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${card?.color || 'bg-gray-400'}`}></div>
                          <div>
                            <h4 className="font-semibold">{transaction.description}</h4>
                            <p className="text-sm text-gray-500">
                              {card?.name} • {new Date(transaction.date).toLocaleDateString()}
                            </p>
                            {transaction.installments > 1 && (
                              <p className="text-xs text-blue-600">{transaction.installments}x sem juros</p>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(transaction.amount)}</p>
                          {transaction.cashback > 0 && (
                            <p className="text-sm text-green-600">+{formatCurrency(transaction.cashback)} cashback</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cashback Acumulado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creditCards.map((card) => (
                      <div key={card.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{card.name}</p>
                          <p className="text-sm text-gray-500">{card.cashback}% de cashback</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">R$ 12,50</p>
                          <p className="text-xs text-gray-500">Este mês</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Programas de Pontos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Rewards Nubank</h4>
                      <p className="text-2xl font-bold text-purple-600">2.450 pontos</p>
                      <p className="text-sm text-purple-600">Expira em 12 meses</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800">Vai de Visa</h4>
                      <p className="text-2xl font-bold text-orange-600">890 pontos</p>
                      <p className="text-sm text-orange-600">Expira em 24 meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Camera Modal */}
        <DocumentCamera 
          open={cameraOpen} 
          onOpenChange={setCameraOpen}
          documentType="credit-card"
          onDataExtracted={handleBillData}
        />

        {/* Payment Modal */}
        <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pagar Fatura - {selectedCard?.name}</DialogTitle>
            </DialogHeader>
            {selectedCard && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span>Valor da fatura</span>
                    <span className="font-bold">{formatCurrency(selectedCard.currentBill)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vencimento</span>
                    <span>{new Date(selectedCard.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <Label>Valor a Pagar</Label>
                  <Input 
                    type="number" 
                    placeholder={formatCurrency(selectedCard.currentBill)} 
                    defaultValue={selectedCard.currentBill}
                  />
                </div>

                <div>
                  <Label>Conta para Débito</Label>
                  <select className="w-full p-2 border rounded">
                    <option>Conta Corrente Nubank</option>
                    <option>Conta Poupança</option>
                  </select>
                </div>

                <div>
                  <Label>Data do Pagamento</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>

                <Button className="w-full">
                  Confirmar Pagamento
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}