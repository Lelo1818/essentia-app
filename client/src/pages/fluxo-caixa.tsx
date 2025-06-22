import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp, TrendingDown, DollarSign, Filter } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/financial-utils";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function FluxoCaixa() {
  const [periodo, setPeriodo] = useState("30");
  const [tipoVisao, setTipoVisao] = useState("diario");

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  // Simular dados de fluxo de caixa temporal
  const generateCashFlowData = () => {
    const days = parseInt(periodo);
    const data = [];
    let saldoAcumulado = 8500; // Saldo inicial
    
    for (let i = 0; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Simular movimentações baseadas nos dados reais
      let receita = 0;
      let despesa = 0;
      
      // Receitas pontuais
      if (i === 1) receita += 8500; // Salário
      if (i === 5) receita += 1200.50; // Freelance
      if (i === 10) receita += 350.75; // Dividendos
      if (i === 15) receita += 1800; // Aluguel
      if (i === 20) receita += 750.30; // Vendas
      
      // Despesas distribuídas
      if (i % 3 === 0) despesa += 120.50; // Compras ocasionais
      if (i === 5) despesa += 2200; // Aluguel apartamento
      if (i === 8) despesa += 350.45; // Plano saúde
      if (i === 12) despesa += 450.75; // Supermercado
      if (i === 18) despesa += 89.90; // Academia
      if (i === 25) despesa += 320.99; // Roupas
      
      const movimentacao = receita - despesa;
      saldoAcumulado += movimentacao;
      
      data.push({
        date: date,
        dateStr: date.toLocaleDateString('pt-BR'),
        receita,
        despesa,
        saldo: saldoAcumulado,
        movimentacao
      });
    }
    
    return data;
  };

  const cashFlowData = generateCashFlowData();
  
  // Dados para o gráfico
  const chartData = {
    labels: cashFlowData.map(d => d.dateStr),
    datasets: [
      {
        label: 'Saldo Acumulado',
        data: cashFlowData.map(d => d.saldo),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Receitas',
        data: cashFlowData.map(d => d.receita),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: cashFlowData.map(d => -d.despesa),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Fluxo de Caixa - Evolução do Saldo'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  const saldoAtual = cashFlowData[cashFlowData.length - 1]?.saldo || 0;
  const receitaTotal = cashFlowData.reduce((sum, d) => sum + d.receita, 0);
  const despesaTotal = cashFlowData.reduce((sum, d) => sum + d.despesa, 0);
  const variacao = saldoAtual - cashFlowData[0]?.saldo || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fluxo de Caixa</h1>
          <p className="text-gray-600">Acompanhe a evolução do seu saldo ao longo do tempo</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="15">15 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="60">60 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={tipoVisao} onValueChange={setTipoVisao}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diario">Diário</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo Atual</p>
                <p className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatCurrency(saldoAtual)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${saldoAtual >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                <DollarSign className={`w-6 h-6 ${saldoAtual >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receitas no Período</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(receitaTotal)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Despesas no Período</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(despesaTotal)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Variação</p>
                <p className={`text-2xl font-bold ${variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variacao >= 0 ? '+' : ''}{formatCurrency(variacao)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${variacao >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <TrendingUp className={`w-6 h-6 ${variacao >= 0 ? 'text-green-600 rotate-0' : 'text-red-600 rotate-180'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Fluxo de Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Timeline de Movimentações */}
      <Card>
        <CardHeader>
          <CardTitle>Movimentações Detalhadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cashFlowData
              .filter(d => d.receita > 0 || d.despesa > 0)
              .reverse()
              .map((movimento, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${movimento.receita > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                      {movimento.receita > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {movimento.receita > 0 ? 'Receita' : 'Despesa'}
                      </p>
                      <p className="text-sm text-gray-600">{movimento.dateStr}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold ${movimento.receita > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {movimento.receita > 0 ? '+' : '-'}
                      {formatCurrency(movimento.receita > 0 ? movimento.receita : movimento.despesa)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Saldo: {formatCurrency(movimento.saldo)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}