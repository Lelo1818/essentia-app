import { HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DebtNegotiationCardProps {
  debt: {
    id: string;
    valorRestante: number;
  };
  onViewDetails: (debtId: string) => void;
  onCallNegotiate: () => void;
}

export function DebtNegotiationCard({ debt, onViewDetails, onCallNegotiate }: DebtNegotiationCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-2 border-green-200">
      <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
        <HandHeart className="w-4 h-4" />
        Estratégias de Renegociação Disponíveis
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* 15% Desconto à Vista */}
        <div className="p-3 bg-green-100 rounded-lg border border-green-300">
          <div className="text-sm font-semibold text-green-800">15% Desconto à Vista</div>
          <div className="text-lg font-bold text-green-700">
            {formatCurrency(debt.valorRestante * 0.85)}
          </div>
          <div className="text-xs text-green-600">
            Economia: {formatCurrency(debt.valorRestante * 0.15)}
          </div>
        </div>

        {/* 25% Desconto à Vista */}
        <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
          <div className="text-sm font-semibold text-blue-800">25% Desconto à Vista</div>
          <div className="text-lg font-bold text-blue-700">
            {formatCurrency(debt.valorRestante * 0.75)}
          </div>
          <div className="text-xs text-blue-600">
            Economia: {formatCurrency(debt.valorRestante * 0.25)}
          </div>
        </div>

        {/* Parcelamento 12x */}
        <div className="p-3 bg-purple-100 rounded-lg border border-purple-300">
          <div className="text-sm font-semibold text-purple-800">Parcelamento 12x</div>
          <div className="text-lg font-bold text-purple-700">
            {formatCurrency(debt.valorRestante / 12)}
          </div>
          <div className="text-xs text-purple-600">por mês</div>
        </div>

        {/* Entrada + Parcelamento */}
        <div className="p-3 bg-orange-100 rounded-lg border border-orange-300">
          <div className="text-sm font-semibold text-orange-800">Entrada + Parcelamento</div>
          <div className="text-lg font-bold text-orange-700">
            {formatCurrency(debt.valorRestante * 0.3)}
          </div>
          <div className="text-xs text-orange-600">
            + 10x de {formatCurrency((debt.valorRestante * 0.7) / 10)}
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          size="sm" 
          className="bg-green-600 hover:bg-green-700 text-white flex-1"
          onClick={() => onViewDetails(debt.id)}
        >
          <HandHeart className="w-4 h-4 mr-2" />
          Ver Detalhes Completos
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1"
          onClick={onCallNegotiate}
        >
          Ligar e Negociar
        </Button>
      </div>
    </div>
  );
}