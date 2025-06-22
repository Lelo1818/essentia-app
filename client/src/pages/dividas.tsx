import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { AlertTriangle, TrendingDown, Calculator, Target, CreditCard, Calendar, DollarSign, CheckCircle, Plus, Camera, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Divida {
  id: string;
  nome: string;
  valorTotal: number;
  valorRestante: number;
  jurosAM: number;
  vencimento: string;
  parcelas: number;
  parcelasRestantes: number;
  valorParcela: number;
  tipo: "cartao" | "financiamento" | "emprestimo" | "outros";
  prioridade: "alta" | "media" | "baixa";
  estrategia?: "snowball" | "avalanche";
}

export default function GestaoDividas() {
  const [dividas, setDividas] = useState<Divida[]>([]);
  const [estrategia, setEstrategia] = useState<"snowball" | "avalanche">("avalanche");
  const [valorExtra, setValorExtra] = useState<number>(200);
  const [modalOpen, setModalOpen] = useState(false);
  const [novaDiv, setNovaDiv] = useState({
    nome: "",
    valorTotal: "",
    valorRestante: "",
    jurosAM: "",
    vencimento: "",
    parcelas: "",
    parcelasRestantes: "",
    valorParcela: "",
    tipo: "cartao" as const,
    prioridade: "media" as const
  });
  const { toast } = useToast();

  useEffect(() => {
    const dividasExemplo: Divida[] = [
      {
        id: "1",
        nome: "Cartão Nubank",
        valorTotal: 4500,
        valorRestante: 3200,
        jurosAM: 12.5,
        vencimento: "todo dia 15",
        parcelas: 12,
        parcelasRestantes: 8,
        valorParcela: 400,
        tipo: "cartao",
        prioridade: "alta"
      },
      {
        id: "2", 
        nome: "Financiamento Honda City",
        valorTotal: 45000,
        valorRestante: 28500,
        jurosAM: 1.2,
        vencimento: "todo dia 8",
        parcelas: 60,
        parcelasRestantes: 36,
        valorParcela: 850,
        tipo: "financiamento",
        prioridade: "media"
      },
      {
        id: "3",
        nome: "Empréstimo Pessoal",
        valorTotal: 8000,
        valorRestante: 5600,
        jurosAM: 3.5,
        vencimento: "todo dia 25",
        parcelas: 24,
        parcelasRestantes: 16,
        valorParcela: 420,
        tipo: "emprestimo",
        prioridade: "alta"
      },
      {
        id: "4",
        nome: "Cartão C6 Bank",
        valorTotal: 1200,
        valorRestante: 800,
        jurosAM: 15.2,
        vencimento: "todo dia 12",
        parcelas: 6,
        parcelasRestantes: 4,
        valorParcela: 200,
        tipo: "cartao",
        prioridade: "alta"
      },
      {
        id: "5",
        nome: "Escola",
        valorTotal: 2300,
        valorRestante: 854,
        jurosAM: 1.2,
        vencimento: "todo dia 10",
        parcelas: 10,
        parcelasRestantes: 4,
        valorParcela: 230,
        tipo: "outros",
        prioridade: "media"
      }
    ];
    setDividas(dividasExemplo);
  }, []);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "cartao": return "💳";
      case "financiamento": return "🚗";
      case "emprestimo": return "🏦";
      default: return "📄";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta": return "text-red-600 bg-red-100";
      case "media": return "text-yellow-600 bg-yellow-100";
      case "baixa": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const calcularEstrategia = () => {
    const dividasOrdenadas = [...dividas].sort((a, b) => {
      if (estrategia === "snowball") {
        return a.valorRestante - b.valorRestante; // Menor valor primeiro
      } else {
        return b.jurosAM - a.jurosAM; // Maior juros primeiro
      }
    });
    return dividasOrdenadas;
  };

  const simularPagamento = () => {
    const dividasOrdenadas = calcularEstrategia();
    let valorDisponivel = valorExtra;
    const resultados = dividasOrdenadas.map(divida => {
      const pagamentoMinimo = divida.valorParcela;
      let pagamentoTotal = pagamentoMinimo;
      
      if (valorDisponivel > 0) {
        const adicional = Math.min(valorDisponivel, divida.valorRestante - pagamentoMinimo);
        pagamentoTotal += adicional;
        valorDisponivel -= adicional;
      }
      
      const novoSaldo = Math.max(0, divida.valorRestante - pagamentoTotal);
      const economia = (divida.valorRestante - novoSaldo) * (divida.jurosAM / 100);
      
      return {
        ...divida,
        pagamentoSugerido: pagamentoTotal,
        novoSaldo,
        economiaJuros: economia
      };
    });
    
    return resultados;
  };

  const totalDividas = dividas.reduce((acc, d) => acc + d.valorRestante, 0);
  const totalJurosMensais = dividas.reduce((acc, d) => acc + (d.valorRestante * d.jurosAM / 100), 0);
  const simulacao = simularPagamento();
  const economiaTotal = simulacao.reduce((acc, s) => acc + s.economiaJuros, 0);

  const handleAddDivida = () => {
    if (!novaDiv.nome || !novaDiv.valorTotal) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o nome e valor total da dívida",
        variant: "destructive",
      });
      return;
    }

    const novaDivida: Divida = {
      id: Date.now().toString(),
      nome: novaDiv.nome,
      valorTotal: Number(novaDiv.valorTotal),
      valorRestante: Number(novaDiv.valorRestante) || Number(novaDiv.valorTotal),
      jurosAM: Number(novaDiv.jurosAM) || 0,
      vencimento: novaDiv.vencimento || "A definir",
      parcelas: Number(novaDiv.parcelas) || 1,
      parcelasRestantes: Number(novaDiv.parcelasRestantes) || Number(novaDiv.parcelas) || 1,
      valorParcela: Number(novaDiv.valorParcela) || Number(novaDiv.valorTotal),
      tipo: novaDiv.tipo,
      prioridade: novaDiv.prioridade
    };

    setDividas([...dividas, novaDivida]);
    setModalOpen(false);
    setNovaDiv({
      nome: "",
      valorTotal: "",
      valorRestante: "",
      jurosAM: "",
      vencimento: "",
      parcelas: "",
      parcelasRestantes: "",
      valorParcela: "",
      tipo: "cartao",
      prioridade: "media"
    });

    toast({
      title: "Sucesso",
      description: "Dívida adicionada com sucesso!",
    });
  };

  const handleOCRUpload = (file: File) => {
    // Simular OCR - em produção conectaria com API real
    toast({
      title: "OCR Processando",
      description: "Analisando documento... (funcionalidade em desenvolvimento)",
    });
    
    // Simular preenchimento automático
    setTimeout(() => {
      setNovaDiv(prev => ({
        ...prev,
        nome: "Cartão de Crédito (OCR)",
        valorTotal: "4550",
        valorRestante: "4550", 
        jurosAM: "12.5",
        vencimento: "todo dia 15",
        parcelas: "12",
        parcelasRestantes: "12",
        valorParcela: "380",
        tipo: "cartao"
      }));
      toast({
        title: "OCR Concluído",
        description: "Dados extraídos do documento! Verifique e adicione a dívida.",
      });
    }, 2000);
  };



  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Dívidas</h1>
          <p className="text-gray-600">Estratégias inteligentes para quitar suas dívidas</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-red-600">R$ {totalDividas.toLocaleString('pt-BR')}</div>
            <div className="text-sm text-gray-600">Total em Dívidas</div>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Dívida
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nova Dívida</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Upload OCR */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <Camera className="w-8 h-8 mx-auto text-gray-400" />
                    <div className="text-sm font-medium">Extrair dados automaticamente</div>
                    <div className="text-xs text-gray-500">
                      Tire uma foto ou faça upload da fatura/contrato
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOCRUpload(new File([], "camera"))}
                        className="w-full sm:w-auto"
                      >
                        <Camera className="w-4 h-4 mr-1" />
                        Tirar Foto
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOCRUpload(new File([], "upload"))}
                        className="w-full sm:w-auto"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Formulário Manual */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Nome da Dívida *</Label>
                    <Input
                      value={novaDiv.nome}
                      onChange={(e) => setNovaDiv({...novaDiv, nome: e.target.value})}
                      placeholder="Ex: Cartão Nubank"
                    />
                  </div>
                  <div>
                    <Label>Tipo</Label>
                    <Select value={novaDiv.tipo} onValueChange={(value) => setNovaDiv({...novaDiv, tipo: value as any})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                        <SelectItem value="financiamento">Financiamento</SelectItem>
                        <SelectItem value="emprestimo">Empréstimo</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Valor Total *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={novaDiv.valorTotal}
                      onChange={(e) => setNovaDiv({...novaDiv, valorTotal: e.target.value})}
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <Label>Valor Restante</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={novaDiv.valorRestante}
                      onChange={(e) => setNovaDiv({...novaDiv, valorRestante: e.target.value})}
                      placeholder="Mesmo que o total"
                    />
                  </div>
                  <div>
                    <Label>Juros ao Mês (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={novaDiv.jurosAM}
                      onChange={(e) => setNovaDiv({...novaDiv, jurosAM: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label>Vencimento</Label>
                    <Input
                      value={novaDiv.vencimento}
                      onChange={(e) => setNovaDiv({...novaDiv, vencimento: e.target.value})}
                      placeholder="Ex: todo dia 15"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setModalOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAddDivida} 
                    className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                  >
                    Adicionar Dívida
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">R$ {totalDividas.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Devido</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">R$ {totalJurosMensais.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Juros/Mês</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{dividas.length}</div>
            <div className="text-sm text-gray-600">Contratos Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">R$ {economiaTotal.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Economia Potencial</div>
          </CardContent>
        </Card>
      </div>

      {/* Configuração da Estratégia */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">Configure Sua Estratégia</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Estratégia de Pagamento</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="estrategia"
                    value="avalanche"
                    checked={estrategia === "avalanche"}
                    onChange={(e) => setEstrategia(e.target.value as "avalanche")}
                  />
                  <div>
                    <div className="font-semibold">Avalanche (Recomendado)</div>
                    <div className="text-sm text-gray-600">Prioriza dívidas com maior juros</div>
                  </div>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="estrategia"
                    value="snowball"
                    checked={estrategia === "snowball"}
                    onChange={(e) => setEstrategia(e.target.value as "snowball")}
                  />
                  <div>
                    <div className="font-semibold">Snowball</div>
                    <div className="text-sm text-gray-600">Prioriza dívidas com menor saldo</div>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Valor Extra Mensal</label>
              <Input
                type="number"
                value={valorExtra}
                onChange={(e) => setValorExtra(Number(e.target.value))}
                className="mb-2"
                placeholder="R$ 200"
              />
              <div className="text-sm text-gray-600">
                Quanto você consegue pagar além do mínimo por mês?
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plano de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle>Plano de Pagamento Otimizado</CardTitle>
          <div className="text-sm text-gray-600">
            Baseado na estratégia {estrategia === "avalanche" ? "Avalanche" : "Snowball"}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulacao.map((divida, index) => (
              <div key={divida.id} className="border rounded-lg p-4 relative">
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Prioridade #{index + 1}
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTipoIcon(divida.tipo)}</div>
                    <div>
                      <h4 className="font-semibold">{divida.nome}</h4>
                      <div className="text-sm text-gray-600">
                        {divida.jurosAM}% a.m. • Vence {divida.vencimento}
                      </div>
                      <Badge className={`text-xs ${getPrioridadeColor(divida.prioridade)} mt-1`}>
                        {divida.prioridade === "alta" ? "Alta" : 
                         divida.prioridade === "media" ? "Média" : "Baixa"} Prioridade
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">R$ {divida.valorRestante.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">
                      {divida.parcelasRestantes} de {divida.parcelas} parcelas
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Pagamento Mínimo</div>
                    <div className="text-lg">R$ {divida.valorParcela}</div>
                  </div>
                  <div>
                    <div className="font-medium">Pagamento Sugerido</div>
                    <div className="text-lg text-green-600 font-bold">
                      R$ {divida.pagamentoSugerido.toFixed(0)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Economia em Juros</div>
                    <div className="text-lg text-blue-600 font-bold">
                      R$ {divida.economiaJuros.toFixed(0)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress 
                    value={((divida.valorTotal - divida.valorRestante) / divida.valorTotal) * 100} 
                    className="h-2" 
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Pago: R$ {(divida.valorTotal - divida.valorRestante).toLocaleString()} de R$ {divida.valorTotal.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas e Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <CardTitle className="text-yellow-800">Alerta Importante</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 text-sm">
              Seus cartões de crédito têm juros muito altos (12.5% e 15.2% a.m.). 
              Priorize quitar essas dívidas primeiro para evitar o efeito bola de neve.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <CardTitle className="text-green-800">Meta do Mês</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 text-sm">
              Seguindo o plano, você pode quitar o Cartão C6 Bank em 3 meses 
              e economizar R$ 180 em juros. Foco total nesta dívida!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Botões de Ação */}
      <div className="flex space-x-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Agendar Pagamentos
        </Button>
        <Button variant="outline">
          <Calculator className="w-4 h-4 mr-2" />
          Simular Cenários
        </Button>
        <Button variant="outline">
          <DollarSign className="w-4 h-4 mr-2" />
          Renegociar Dívidas
        </Button>
      </div>
    </div>
  );
}