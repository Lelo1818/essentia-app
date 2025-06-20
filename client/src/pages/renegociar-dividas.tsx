import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Target,
  CheckCircle,
  AlertTriangle,
  Phone,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Debt {
  id: string;
  creditor: string;
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  monthlyPayment: number;
  daysOverdue: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface NegotiationOffer {
  type: 'discount' | 'installments' | 'interest_reduction';
  title: string;
  description: string;
  savings: number;
  newAmount: number;
  terms: string;
  success_rate: number;
}

export default function RenegociarDividas() {
  const [debts] = useState<Debt[]>([
    {
      id: "1",
      creditor: "Cartão de Crédito XYZ",
      originalAmount: 5000,
      currentBalance: 7200,
      interestRate: 12.5,
      monthlyPayment: 320,
      daysOverdue: 45,
      category: "Cartão de Crédito",
      priority: 'high'
    },
    {
      id: "2",
      creditor: "Financiamento Veículo",
      originalAmount: 25000,
      currentBalance: 18500,
      interestRate: 2.8,
      monthlyPayment: 890,
      daysOverdue: 0,
      category: "Financiamento",
      priority: 'medium'
    },
    {
      id: "3",
      creditor: "Empréstimo Pessoal ABC",
      originalAmount: 8000,
      currentBalance: 6200,
      interestRate: 8.9,
      monthlyPayment: 450,
      daysOverdue: 15,
      category: "Empréstimo",
      priority: 'medium'
    }
  ]);

  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [offers, setOffers] = useState<NegotiationOffer[]>([]);
  const { toast } = useToast();

  const generateNegotiationOffers = (debt: Debt): NegotiationOffer[] => {
    const baseOffers: NegotiationOffer[] = [
      {
        type: 'discount',
        title: 'Desconto à Vista',
        description: 'Quitação com desconto para pagamento à vista',
        savings: debt.currentBalance * 0.3,
        newAmount: debt.currentBalance * 0.7,
        terms: 'Pagamento em até 7 dias',
        success_rate: 85
      },
      {
        type: 'installments',
        title: 'Parcelamento Sem Juros',
        description: 'Divide o valor atual em parcelas sem juros adicionais',
        savings: debt.currentBalance * 0.15,
        newAmount: debt.currentBalance * 0.85,
        terms: 'Até 12x sem juros',
        success_rate: 95
      },
      {
        type: 'interest_reduction',
        title: 'Redução de Juros',
        description: 'Mantém o valor mas reduz significativamente os juros',
        savings: debt.currentBalance * 0.2,
        newAmount: debt.currentBalance * 0.8,
        terms: 'Juros reduzidos para 2.5% a.m.',
        success_rate: 70
      }
    ];

    // Adjust offers based on debt characteristics
    if (debt.daysOverdue > 30) {
      baseOffers[0].savings = debt.currentBalance * 0.4; // Better discount for overdue
      baseOffers[0].newAmount = debt.currentBalance * 0.6;
    }

    if (debt.priority === 'high') {
      baseOffers.forEach(offer => {
        offer.success_rate += 10; // Higher success rate for high priority debts
      });
    }

    return baseOffers;
  };

  const selectDebtForNegotiation = (debt: Debt) => {
    setSelectedDebt(debt);
    const newOffers = generateNegotiationOffers(debt);
    setOffers(newOffers);
    
    toast({
      title: "Análise Iniciada",
      description: `Gerando propostas de negociação para ${debt.creditor}`,
      variant: "default"
    });
  };

  const initiateNegotiation = (offer: NegotiationOffer) => {
    toast({
      title: "Negociação Iniciada",
      description: `Proposta de ${offer.title} enviada. Aguarde retorno em até 48h.`,
      variant: "default"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta Prioridade';
      case 'medium': return 'Média Prioridade';
      default: return 'Baixa Prioridade';
    }
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.currentBalance, 0);
  const totalOverdue = debts.filter(d => d.daysOverdue > 0).length;
  const highPriorityDebts = debts.filter(d => d.priority === 'high').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Renegociar Dívidas</h1>
        <Badge className="bg-red-600 text-white">
          {totalOverdue} dívidas em atraso
        </Badge>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">R$ {totalDebt.toLocaleString()}</div>
            <div className="text-red-600 text-sm">Total em Dívidas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{totalOverdue}</div>
            <div className="text-orange-600 text-sm">Em Atraso</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-700">{highPriorityDebts}</div>
            <div className="text-yellow-600 text-sm">Alta Prioridade</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">30-40%</div>
            <div className="text-green-600 text-sm">Desconto Médio</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Debt List */}
        <Card>
          <CardHeader>
            <CardTitle>Suas Dívidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {debts.map((debt) => (
                <div 
                  key={debt.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedDebt?.id === debt.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectDebtForNegotiation(debt)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{debt.creditor}</h4>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getPriorityColor(debt.priority)}>
                          {getPriorityLabel(debt.priority)}
                        </Badge>
                        {debt.daysOverdue > 0 && (
                          <Badge className="bg-red-100 text-red-800">
                            {debt.daysOverdue} dias em atraso
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">R$ {debt.currentBalance.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        {debt.interestRate}% a.m.
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Valor Original:</span>
                      <div className="font-medium">R$ {debt.originalAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Parcela Atual:</span>
                      <div className="font-medium">R$ {debt.monthlyPayment.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Negotiation Offers */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDebt ? `Propostas para ${selectedDebt.creditor}` : 'Selecione uma Dívida'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDebt ? (
              <div className="space-y-4">
                {offers.map((offer, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{offer.title}</h4>
                        <p className="text-gray-600 text-sm">{offer.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {offer.success_rate}% sucesso
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-500 text-sm">Economia:</span>
                        <div className="text-xl font-bold text-green-600">
                          R$ {offer.savings.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Novo Valor:</span>
                        <div className="text-xl font-bold">
                          R$ {offer.newAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-gray-500 text-sm">Taxa de Sucesso:</span>
                      <Progress value={offer.success_rate} className="mt-1 h-2" />
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded text-sm mb-4">
                      <strong>Condições:</strong> {offer.terms}
                    </div>
                    
                    <InteractiveButton
                      onClick={() => initiateNegotiation(offer)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      soundType="success"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Iniciar Negociação
                    </InteractiveButton>
                  </div>
                ))}
                
                <Separator />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Como Funciona</h4>
                  <div className="text-blue-700 text-sm space-y-1">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Escolha a proposta mais adequada
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Nossa equipe entra em contato com o credor
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Você recebe a proposta oficial em até 48h
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aceite ou negocie os termos finais
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Selecione uma dívida para ver as opções de negociação</p>
                <p className="text-sm mt-2">
                  Analisaremos sua situação e geraremos propostas personalizadas
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Dicas para Negociação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-700">
            <div>
              <h4 className="font-semibold mb-2">Antes de Negociar</h4>
              <ul className="space-y-1">
                <li>• Organize toda a documentação da dívida</li>
                <li>• Calcule quanto você pode pagar realísticamente</li>
                <li>• Considere o impacto no seu orçamento mensal</li>
                <li>• Tenha uma proposta clara em mente</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Durante a Negociação</h4>
              <ul className="space-y-1">
                <li>• Seja honesto sobre sua situação financeira</li>
                <li>• Peça tudo por escrito antes de aceitar</li>
                <li>• Não comprometa seu orçamento básico</li>
                <li>• Negocie prazos e condições que consegue cumprir</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}