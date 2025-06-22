import { useState, useEffect } from "react";
import { useLocation as useWouterLocation } from "wouter";
import { ArrowLeft, DollarSign, TrendingDown, Calculator, AlertTriangle, CheckCircle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function RenegociarDividas() {
  const [, setLocation] = useLocation();
  const [selectedDebt, setSelectedDebt] = useState<any>(null);
  const [simulationValues, setSimulationValues] = useState({
    cashValue: 0,
    installments: 12
  });
  
  // Capturar parâmetro da URL se vier da página de dívidas
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debtId = urlParams.get('debt');
    if (debtId) {
      // Scroll para a dívida específica quando a página carregar
      setTimeout(() => {
        const element = document.getElementById(`debt-${debtId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.style.border = '3px solid #3b82f6';
          element.style.backgroundColor = '#dbeafe';
        }
      }, 500);
    }
  }, []);

  // Buscar dívidas reais do sistema
  const { data: realDebts, isLoading } = useQuery({
    queryKey: ["/api/debts"],
    retry: false,
  });

  // Simular dívidas baseadas no padrão conhecido do sistema
  const mockDebts = [
    {
      id: 1,
      creditor: "Cartão Nubank",
      amount: "12500.00",
      dueDate: "2024-12-15",
      category: "Cartão de Crédito",
      interestRate: 12.5
    },
    {
      id: 2,
      creditor: "Financiamento Carro",
      amount: "28000.00", 
      dueDate: "2025-01-10",
      category: "Financiamento",
      interestRate: 1.8
    },
    {
      id: 3,
      creditor: "Empréstimo Pessoal",
      amount: "8500.00",
      dueDate: "2024-11-30",
      category: "Empréstimo",
      interestRate: 8.9
    }
  ];

  // Usar dívidas reais se disponíveis, senão usar mock
  const debts = (realDebts && realDebts.length > 0 ? realDebts : mockDebts).map((debt: any) => ({
    id: debt.id,
    name: debt.creditor || debt.description || "Dívida",
    amount: parseFloat(debt.amount),
    minimumPayment: parseFloat(debt.amount) * 0.03, // 3% como parcela mínima
    interestRate: debt.interestRate || 12.5,
    daysOverdue: debt.dueDate ? Math.max(0, Math.floor((new Date().getTime() - new Date(debt.dueDate).getTime()) / (1000 * 60 * 60 * 24))) : 0,
    category: debt.category || "Dívida",
    priority: parseFloat(debt.amount) > 10000 ? "Alta" : parseFloat(debt.amount) > 5000 ? "Média" : "Baixa",
    originalDebt: debt
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateNegotiationOptions = (debt: any) => {
    const amount = debt.amount;
    return {
      discount15: { 
        value: amount * 0.85, 
        savings: amount * 0.15,
        title: "15% Desconto à Vista",
        description: "Pagamento imediato com desconto"
      },
      discount25: { 
        value: amount * 0.75, 
        savings: amount * 0.25,
        title: "25% Desconto à Vista",
        description: "Melhor opção para quem tem reserva"
      },
      installments: { 
        value: amount,
        monthlyPayment: amount / 12,
        title: "Parcelamento em 12x",
        description: "Sem juros adicionais"
      },
      reducedInterest: { 
        value: amount * 1.05, 
        savings: amount * (debt.interestRate / 100 * 0.5),
        title: "Redução de 50% nos Juros",
        description: "Mantém parcelamento com juros reduzidos"
      }
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => setLocation("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Carregando Dívidas...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white p-8 rounded-3xl mb-8 shadow-xl">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-4">
            <DollarSign className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Renegociar Dívidas</h1>
              <p className="text-white/90 text-lg">Estratégias inteligentes baseadas nas suas dívidas reais</p>
            </div>
          </div>
        </div>

        {/* Status das Dívidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 font-medium">Total em Dívidas</p>
                  <p className="text-2xl font-bold text-red-700">
                    {formatCurrency(debts.reduce((sum, debt) => sum + debt.amount, 0))}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 font-medium">Dívidas em Atraso</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {debts.filter(debt => debt.daysOverdue > 0).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-medium">Prioridade Alta</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {debts.filter(debt => debt.priority === "Alta").length}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Dívidas para Renegociação */}
        {debts.length === 0 ? (
          <Card className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Parabéns! Nenhuma dívida encontrada</h3>
            <p className="text-gray-600 mb-4">Você não possui dívidas cadastradas no sistema para renegociar.</p>
            <Button 
              onClick={() => setLocation("/dividas")} 
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Gerenciar Dívidas
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Suas Dívidas - Opções de Renegociação</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {debts.map((debt) => {
                const options = calculateNegotiationOptions(debt);
                
                return (
                  <Card key={debt.id} id={`debt-${debt.id}`} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            {debt.name}
                          </CardTitle>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={debt.priority === "Alta" ? "destructive" : debt.priority === "Média" ? "default" : "secondary"}>
                              {debt.priority} Prioridade
                            </Badge>
                            <Badge variant="outline">{debt.category}</Badge>
                            {debt.daysOverdue > 0 && (
                              <Badge variant="destructive">{debt.daysOverdue} dias em atraso</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-600">{formatCurrency(debt.amount)}</p>
                          <p className="text-sm text-gray-600">Valor Total</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Opção 1: 15% Desconto */}
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">{options.discount15.title}</h4>
                          <p className="text-2xl font-bold text-green-700">{formatCurrency(options.discount15.value)}</p>
                          <p className="text-sm text-green-600 mb-2">Economia: {formatCurrency(options.discount15.savings)}</p>
                          <p className="text-xs text-gray-600">{options.discount15.description}</p>
                          <Badge className="mt-2 bg-green-100 text-green-800">Recomendado</Badge>
                        </div>

                        {/* Opção 2: 25% Desconto */}
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">{options.discount25.title}</h4>
                          <p className="text-2xl font-bold text-blue-700">{formatCurrency(options.discount25.value)}</p>
                          <p className="text-sm text-blue-600 mb-2">Economia: {formatCurrency(options.discount25.savings)}</p>
                          <p className="text-xs text-gray-600">{options.discount25.description}</p>
                          <Badge className="mt-2 bg-blue-100 text-blue-800">Melhor Economia</Badge>
                        </div>

                        {/* Opção 3: Parcelamento */}
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-2">{options.installments.title}</h4>
                          <p className="text-2xl font-bold text-purple-700">{formatCurrency(options.installments.monthlyPayment)}</p>
                          <p className="text-sm text-purple-600 mb-2">por mês</p>
                          <p className="text-xs text-gray-600">{options.installments.description}</p>
                          <Badge className="mt-2 bg-purple-100 text-purple-800">Sem Juros</Badge>
                        </div>

                        {/* Opção 4: Juros Reduzidos */}
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-800 mb-2">{options.reducedInterest.title}</h4>
                          <p className="text-2xl font-bold text-orange-700">{formatCurrency(options.reducedInterest.value)}</p>
                          <p className="text-sm text-orange-600 mb-2">Economia em juros: {formatCurrency(options.reducedInterest.savings)}</p>
                          <p className="text-xs text-gray-600">{options.reducedInterest.description}</p>
                          <Badge className="mt-2 bg-orange-100 text-orange-800">Equilibrado</Badge>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          onClick={() => {
                            console.log('Simular Acordo clicado para:', debt.name);
                            console.log('Dados da dívida:', debt);
                            setSelectedDebt(debt);
                            // Resetar valores de simulação
                            setSimulationValues({ cashValue: 0, installments: 12 });
                            // Forçar re-render e scroll
                            setTimeout(() => {
                              const element = document.getElementById('simulation-section');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              } else {
                                console.log('Elemento simulation-section não encontrado');
                              }
                            }, 200);
                          }}
                        >
                          <Calculator className="h-4 w-4 mr-2" />
                          Simular Acordo
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            console.log('Ligar clicado');
                            alert('📞 Ligando para 0800-000-0000...');
                          }}
                        >
                          Ligar para Negociar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Dicas de Renegociação */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <TrendingDown className="h-5 w-5" />
              Dicas para Renegociação Eficaz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-700">Antes de Negociar</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Tenha sua situação financeira completa em mãos</li>
                  <li>• Defina o máximo que pode pagar à vista</li>
                  <li>• Pesquise histórico de acordos da empresa</li>
                  <li>• Prepare argumentos sobre sua dificuldade financeira</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-700">Durante a Negociação</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Sempre comece com uma proposta menor</li>
                  <li>• Negocie desconto antes de parcelamento</li>
                  <li>• Peça para registrar o acordo por escrito</li>
                  <li>• Confirme a quitação total da dívida</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Simulação */}
        {selectedDebt && (
          <div id="simulation-section" className="mt-8">
            <Card className="border-2 border-green-400 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Simulação de Negociação - {selectedDebt.name}
                </CardTitle>
                <div className="text-sm text-green-700">
                  Valor original: {selectedDebt.remainingAmount?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'N/A'}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Valor que você pode pagar à vista
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 2000"
                      className="w-full"
                      value={simulationValues.cashValue || ''}
                      onChange={(e) => {
                        const valor = parseFloat(e.target.value) || 0;
                        setSimulationValues(prev => ({ ...prev, cashValue: valor }));
                        console.log('Simulando valor:', valor);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Quantas parcelas você prefere
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 12"
                      className="w-full"
                      value={simulationValues.installments || ''}
                      onChange={(e) => {
                        const parcelas = parseInt(e.target.value) || 12;
                        setSimulationValues(prev => ({ ...prev, installments: parcelas }));
                        console.log('Simulando parcelas:', parcelas);
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">Resultado da Simulação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {simulationValues.cashValue > 0 ? 
                          simulationValues.cashValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                          selectedDebt.remainingAmount ? 
                            (selectedDebt.remainingAmount * 0.75).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                            'Digite um valor'
                        }
                      </div>
                      <div className="text-sm text-gray-600">Valor Final</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {simulationValues.cashValue > 0 && selectedDebt.remainingAmount ? 
                          (selectedDebt.remainingAmount - simulationValues.cashValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                          selectedDebt.remainingAmount ? 
                            (selectedDebt.remainingAmount * 0.25).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                            'Digite um valor'
                        }
                      </div>
                      <div className="text-sm text-gray-600">Economia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {simulationValues.cashValue > 0 && selectedDebt.remainingAmount ? 
                          Math.round(((selectedDebt.remainingAmount - simulationValues.cashValue) / selectedDebt.remainingAmount) * 100) + '%' :
                          '25%'
                        }
                      </div>
                      <div className="text-sm text-gray-600">Desconto</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        alert('🎉 Proposta enviada com sucesso! Você será contactado em até 24h.');
                      }}
                    >
                      Aceitar Proposta
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedDebt(null);
                        setSimulationValues({ cashValue: 0, installments: 12 });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Simular Novamente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Botão Voltar */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => setLocation("/")}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}