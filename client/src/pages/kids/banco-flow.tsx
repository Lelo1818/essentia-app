import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiggyBank, TrendingUp, ArrowLeft, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BancoFlow({ onBack }: { onBack: () => void }) {
  const [savings, setSavings] = useState(500);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { toast } = useToast();

  const interestRate = 0.5; // 0.5% por semana
  const weeklyInterest = Math.round(savings * (interestRate / 100));

  const deposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setSavings(savings + amount);
      setDepositAmount("");
      toast({
        title: "💰 Depósito realizado!",
        description: `Você depositou R$ ${amount.toFixed(2)}`,
        variant: "default"
      });
    }
  };

  const withdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= savings) {
      setSavings(savings - amount);
      setWithdrawAmount("");
      toast({
        title: "💸 Saque realizado!",
        description: `Você sacou R$ ${amount.toFixed(2)}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Saldo insuficiente!",
        description: "Você não pode sacar mais do que tem",
        variant: "destructive"
      });
    }
  };

  const addInterest = () => {
    setSavings(savings + weeklyInterest);
    toast({
      title: "🎉 Juros creditados!",
      description: `Você ganhou R$ ${weeklyInterest.toFixed(2)} de juros`,
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">🏦 Banco do Flow</h1>
        </div>

        {/* Account Balance */}
        <Card className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-center text-green-800">Sua Conta Poupança</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-4">
              R$ {savings.toFixed(2)}
            </div>
            <Badge className="bg-green-600 text-white text-lg px-6 py-2">
              Saldo Atual
            </Badge>
          </CardContent>
        </Card>

        {/* Banking Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deposit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Fazer Depósito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Valor do Depósito</label>
                  <Input
                    type="number"
                    placeholder="0,00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button onClick={deposit} className="w-full bg-green-600 hover:bg-green-700">
                  Depositar
                </Button>
                <div className="text-xs text-gray-600">
                  💡 Dica: Quanto mais você depositar, mais juros você ganha!
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Withdraw */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PiggyBank className="w-5 h-5 mr-2 text-blue-600" />
                Fazer Saque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Valor do Saque</label>
                  <Input
                    type="number"
                    placeholder="0,00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <Button onClick={withdraw} className="w-full bg-blue-600 hover:bg-blue-700">
                  Sacar
                </Button>
                <div className="text-xs text-gray-600">
                  ⚠️ Lembre-se: Só gaste quando realmente precisar!
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interest Simulation */}
        <Card className="border-yellow-300 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <TrendingUp className="w-5 h-5 mr-2" />
              Simulador de Juros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">0.5%</div>
                <div className="text-yellow-600 text-sm">Taxa Semanal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">R$ {weeklyInterest.toFixed(2)}</div>
                <div className="text-yellow-600 text-sm">Juros desta Semana</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">R$ {(weeklyInterest * 52).toFixed(2)}</div>
                <div className="text-yellow-600 text-sm">Juros por Ano</div>
              </div>
            </div>
            <Button onClick={addInterest} className="w-full bg-yellow-600 hover:bg-yellow-700">
              <Calendar className="w-4 h-4 mr-2" />
              Simular uma Semana
            </Button>
          </CardContent>
        </Card>

        {/* Learning About Banking */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona um Banco?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">🏦 O que é um Banco?</h4>
                <div className="space-y-2 text-sm">
                  <p>• Um lugar seguro para guardar seu dinheiro</p>
                  <p>• Paga juros quando você deixa dinheiro lá</p>
                  <p>• Oferece cartões para facilitar compras</p>
                  <p>• Empresta dinheiro quando você precisa</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">💰 O que são Juros?</h4>
                <div className="space-y-2 text-sm">
                  <p>• É o dinheiro extra que o banco te dá</p>
                  <p>• Recompensa por deixar dinheiro guardado</p>
                  <p>• Quanto mais tempo deixar, mais ganha</p>
                  <p>• É como se o dinheiro "crescesse" sozinho</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">Curiosidades Bancárias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <div className="font-semibold">Primeiro Banco</div>
                <div className="text-purple-600">Foi criado na Itália em 1472!</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🪙</div>
                <div className="font-semibold">Cofre-Forte</div>
                <div className="text-purple-600">Alguns pesam mais que um elefante!</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="font-semibold">Cartão de Crédito</div>
                <div className="text-purple-600">Existe há mais de 70 anos!</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}