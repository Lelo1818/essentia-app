import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Smartphone, Contact, Copy, Check, Send, Clock, Camera, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PixTransaction {
  id: string;
  tipo: "enviado" | "recebido";
  valor: number;
  destinatario: string;
  chave: string;
  data: string;
  status: "concluido" | "processando" | "agendado";
  descricao?: string;
}

export default function PixPage() {
  const [valor, setValor] = useState("");
  const [chave, setChave] = useState("");
  const [descricao, setDescricao] = useState("");
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState<PixTransaction[]>([
    {
      id: "1",
      tipo: "recebido",
      valor: 250.00,
      destinatario: "Maria Silva",
      chave: "maria@email.com",
      data: "2025-06-22 10:30",
      status: "concluido",
      descricao: "Freelance design"
    },
    {
      id: "2",
      tipo: "enviado",
      valor: 45.50,
      destinatario: "João Santos",
      chave: "11999887766",
      data: "2025-06-21 18:45",
      status: "concluido",
      descricao: "Divisão conta"
    },
    {
      id: "3",
      tipo: "enviado",
      valor: 120.00,
      destinatario: "Supermercado ABC",
      chave: "12345678000195",
      data: "2025-06-21 14:20",
      status: "concluido"
    }
  ]);

  const [modalEnviar, setModalEnviar] = useState(false);
  const [modalReceber, setModalReceber] = useState(false);
  const { toast } = useToast();

  const minhaChavePix = "lelao@flowecosystem.com";
  const meuQRCode = "00020126580014br.gov.bcb.pix0136lelao@flowecosystem.com520400005303986540512.005802BR5913LELAO SANTOS6008BRASILIA62070503***6304A1B2";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: "Chave PIX copiada para área de transferência",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const gerarQRCode = () => {
    // Simular geração de QR Code baseado no valor
    const qrData = `00020126580014br.gov.bcb.pix0136${minhaChavePix}5204000053039865405${valor.padStart(5, '0')}.005802BR5913LELAO SANTOS6008BRASILIA62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    return qrData;
  };

  const enviarPix = () => {
    if (!valor || !chave) {
      toast({
        title: "Erro",
        description: "Preencha valor e chave PIX",
        variant: "destructive",
      });
      return;
    }

    const novaTransacao: PixTransaction = {
      id: Date.now().toString(),
      tipo: "enviado",
      valor: Number(valor),
      destinatario: detectarTipoChave(chave),
      chave: chave,
      data: new Date().toLocaleString('pt-BR'),
      status: "processando",
      descricao: descricao || undefined
    };

    setTransactions([novaTransacao, ...transactions]);
    
    toast({
      title: "PIX Enviado!",
      description: `R$ ${Number(valor).toFixed(2)} para ${detectarTipoChave(chave)}`,
    });

    // Simular conclusão da transação
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(t => t.id === novaTransacao.id ? {...t, status: "concluido"} : t)
      );
      toast({
        title: "PIX Confirmado!",
        description: "Transação processada com sucesso",
      });
    }, 3000);

    setModalEnviar(false);
    setValor("");
    setChave("");
    setDescricao("");
  };

  const detectarTipoChave = (chave: string): string => {
    if (chave.includes("@")) return chave.split("@")[0];
    if (/^\d{11}$/.test(chave)) return `***${chave.slice(-4)}`;
    if (/^\d{14}$/.test(chave)) return "Empresa";
    return "Contato";
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido": return "bg-green-100 text-green-800";
      case "processando": return "bg-yellow-100 text-yellow-800";
      case "agendado": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const simulateCamera = () => {
    toast({
      title: "Câmera Ativada",
      description: "Simulação: QR Code detectado automaticamente",
    });
    
    setTimeout(() => {
      setChave("merchant@loja.com.br");
      setValor("89.90");
      toast({
        title: "QR Code Lido!",
        description: "Dados preenchidos automaticamente",
      });
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PIX</h1>
          <p className="text-gray-600">Transferências instantâneas 24h</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Saldo Disponível</div>
          <div className="text-2xl font-bold text-green-600">R$ 3.247,80</div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Dialog open={modalEnviar} onOpenChange={setModalEnviar}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <Send className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">Enviar</div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Enviar PIX</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Chave PIX do destinatário</label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    placeholder="CPF, e-mail, telefone ou chave aleatória"
                  />
                  <Button variant="outline" size="icon" onClick={simulateCamera}>
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Valor</label>
                <Input
                  type="number"
                  step="0.01"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descrição (opcional)</label>
                <Input
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Motivo da transferência"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setModalEnviar(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={enviarPix} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Enviar PIX
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={modalReceber} onOpenChange={setModalReceber}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <QrCode className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Receber</div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Receber PIX</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Valor (opcional)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Deixe vazio para valor livre"
                />
              </div>
              
              {/* QR Code Simulado */}
              <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="w-32 h-32 mx-auto bg-black mb-4 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-white" />
                </div>
                <div className="text-xs text-gray-600 break-all font-mono">
                  {gerarQRCode().slice(0, 50)}...
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Sua Chave PIX</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input value={minhaChavePix} readOnly />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(minhaChavePix)}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Contact className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-sm font-medium">Contatos</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-sm font-medium">Agendar</div>
          </CardContent>
        </Card>
      </div>

      {/* Minhas Chaves PIX */}
      <Card>
        <CardHeader>
          <CardTitle>Minhas Chaves PIX</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">E-mail</div>
                <div className="text-sm text-gray-600">{minhaChavePix}</div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(minhaChavePix)}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">CPF</div>
                <div className="text-sm text-gray-600">***.***.***-42</div>
              </div>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.tipo === "enviado" ? "bg-red-100" : "bg-green-100"
                  }`}>
                    <Send className={`w-4 h-4 ${
                      transaction.tipo === "enviado" ? "text-red-600 rotate-45" : "text-green-600 -rotate-45"
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium">{transaction.destinatario}</div>
                    <div className="text-sm text-gray-600">
                      {transaction.data} • {transaction.chave}
                    </div>
                    {transaction.descricao && (
                      <div className="text-xs text-gray-500">{transaction.descricao}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    transaction.tipo === "enviado" ? "text-red-600" : "text-green-600"
                  }`}>
                    {transaction.tipo === "enviado" ? "-" : "+"}{formatarValor(transaction.valor)}
                  </div>
                  <Badge className={getStatusColor(transaction.status)} variant="secondary">
                    {transaction.status === "concluido" ? "Concluído" : 
                     transaction.status === "processando" ? "Processando" : "Agendado"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Limites PIX */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Limites PIX</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-blue-600">Diário (24h)</div>
              <div className="font-bold text-blue-800">R$ 1.250 / R$ 5.000</div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "25%"}}></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Noturno (20h-6h)</div>
              <div className="font-bold text-blue-800">R$ 450 / R$ 1.000</div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "45%"}}></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Mensal</div>
              <div className="font-bold text-blue-800">R$ 8.230 / R$ 20.000</div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "41%"}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}