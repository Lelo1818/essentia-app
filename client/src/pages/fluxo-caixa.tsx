import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp, TrendingDown, DollarSign, AlertCircle, Plus, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";

interface FluxoCaixaItem {
  id: string;
  data: string;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
  categoria: string;
  status: "previsto" | "realizado";
  recorrente: boolean;
}

export default function FluxoCaixa() {
  const [periodo, setPeriodo] = useState("30");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [fluxo, setFluxo] = useState<FluxoCaixaItem[]>([]);

  useEffect(() => {
    // Dados de demonstração do fluxo de caixa
    const fluxoExemplo: FluxoCaixaItem[] = [
      {
        id: "1",
        data: "2025-06-25",
        descricao: "Salário Principal",
        valor: 8500,
        tipo: "entrada",
        categoria: "Trabalho",
        status: "previsto",
        recorrente: true
      },
      {
        id: "2",
        data: "2025-06-23",
        descricao: "Aluguel Apartamento",
        valor: 2200,
        tipo: "saida",
        categoria: "Moradia",
        status: "realizado",
        recorrente: true
      },
      {
        id: "3",
        data: "2025-06-24",
        descricao: "Freelance Design",
        valor: 1200,
        tipo: "entrada",
        categoria: "Freelance",
        status: "realizado",
        recorrente: false
      },
      {
        id: "4",
        data: "2025-06-26",
        descricao: "Cartão Nubank - Fatura",
        valor: 450,
        tipo: "saida",
        categoria: "Cartão",
        status: "previsto",
        recorrente: true
      },
      {
        id: "5",
        data: "2025-06-27",
        descricao: "Consultoria Tech",
        valor: 2500,
        tipo: "entrada",
        categoria: "Consultoria",
        status: "previsto",
        recorrente: false
      },
      {
        id: "6",
        data: "2025-06-28",
        descricao: "Supermercado",
        valor: 380,
        tipo: "saida",
        categoria: "Alimentação",
        status: "previsto",
        recorrente: false
      },
      {
        id: "7",
        data: "2025-06-29",
        descricao: "Dividendos Ações",
        valor: 350,
        tipo: "entrada",
        categoria: "Investimentos",
        status: "previsto",
        recorrente: true
      },
      {
        id: "8",
        data: "2025-06-30",
        descricao: "Academia Smart Fit",
        valor: 89,
        tipo: "saida",
        categoria: "Saúde",
        status: "previsto",
        recorrente: true
      }
    ];
    
    setFluxo(fluxoExemplo);
  }, []);

  const fluxoFiltrado = fluxo.filter(item => {
    if (filtroTipo === "entradas") return item.tipo === "entrada";
    if (filtroTipo === "saidas") return item.tipo === "saida";
    return true;
  });

  const totalEntradas = fluxo
    .filter(item => item.tipo === "entrada")
    .reduce((acc, item) => acc + item.valor, 0);

  const totalSaidas = fluxo
    .filter(item => item.tipo === "saida")
    .reduce((acc, item) => acc + item.valor, 0);

  const saldoLiquido = totalEntradas - totalSaidas;

  const entradasPrevistas = fluxo
    .filter(item => item.tipo === "entrada" && item.status === "previsto")
    .reduce((acc, item) => acc + item.valor, 0);

  const saidasPrevistas = fluxo
    .filter(item => item.tipo === "saida" && item.status === "previsto")
    .reduce((acc, item) => acc + item.valor, 0);

  const formatarData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short' 
    });
  };

  const getStatusColor = (status: string) => {
    return status === "realizado" 
      ? "bg-green-100 text-green-800" 
      : "bg-yellow-100 text-yellow-800";
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === "entrada" 
      ? <TrendingUp className="w-4 h-4 text-green-600" />
      : <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Fluxo de Caixa</h1>
          <p className="text-gray-600">Acompanhe entradas e saídas em tempo real</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Movimentação
          </Button>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Próximos 7 dias</SelectItem>
            <SelectItem value="30">Próximos 30 dias</SelectItem>
            <SelectItem value="90">Próximos 90 dias</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="entradas">Só Entradas</SelectItem>
            <SelectItem value="saidas">Só Saídas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalEntradas)}</div>
            <div className="text-sm text-gray-600">Total Entradas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSaidas)}</div>
            <div className="text-sm text-gray-600">Total Saídas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${saldoLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(saldoLiquido)}
            </div>
            <div className="text-sm text-gray-600">Saldo Líquido</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(entradasPrevistas)}</div>
            <div className="text-sm text-gray-600">A Receber</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Movimentações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Movimentações Programadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fluxoFiltrado.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {getTipoIcon(item.tipo)}
                  <div>
                    <div className="font-medium">{item.descricao}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>{formatarData(item.data)}</span>
                      <Badge className={getStatusColor(item.status)} variant="secondary">
                        {item.status === "realizado" ? "Realizado" : "Previsto"}
                      </Badge>
                      {item.recorrente && (
                        <Badge variant="outline" className="text-xs">
                          Recorrente
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${item.tipo === "entrada" ? "text-green-600" : "text-red-600"}`}>
                    {item.tipo === "entrada" ? "+" : "-"}{formatCurrency(item.valor)}
                  </div>
                  <div className="text-sm text-gray-500">{item.categoria}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Alertas do Fluxo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-orange-800">
            <div>• Cartão Nubank vence em 3 dias - {formatCurrency(450)}</div>
            <div>• Salário será creditado em 2 dias - {formatCurrency(8500)}</div>
            {saidasPrevistas > entradasPrevistas && (
              <div>• ⚠️ Saídas previstas excedem entradas em {formatCurrency(saidasPrevistas - entradasPrevistas)}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}