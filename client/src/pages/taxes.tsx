import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  FileText, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Download,
  Upload
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Taxes() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [documentUploadOpen, setDocumentUploadOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: summary } = useQuery({
    queryKey: ["/api/financial-summary"],
  });

  const { data: incomes = [] } = useQuery({
    queryKey: ["/api/incomes"],
  });

  // Cálculos de impostos baseados na renda real
  const annualIncome = incomes.reduce((sum: number, income: any) => {
    const amount = typeof income.amount === 'string' ? parseFloat(income.amount) : income.amount;
    return sum + (income.frequency === 'mensal' ? amount * 12 : amount);
  }, 0);

  const calculateIRPF = (annualIncome: number) => {
    if (annualIncome <= 22847.76) return 0;
    if (annualIncome <= 33919.80) return (annualIncome * 0.075) - 1713.58;
    if (annualIncome <= 45012.60) return (annualIncome * 0.15) - 4257.57;
    if (annualIncome <= 55976.16) return (annualIncome * 0.225) - 7633.51;
    return (annualIncome * 0.275) - 10432.32;
  };

  const irpfDue = calculateIRPF(annualIncome);
  const inssContribution = Math.min(annualIncome * 0.11, 7507.49 * 12); // Teto INSS 2025
  const totalTaxes = irpfDue + inssContribution;

  // Simulação de restituição baseada em gastos dedutíveis
  const medicalExpenses = 4350; // Gastos médicos fictícios do usuário
  const educationExpenses = 3561; // Gastos com educação
  const privatePensionContributions = 12000; // Previdência privada
  
  const totalDeductions = medicalExpenses + educationExpenses + privatePensionContributions;
  const taxWithDeductions = calculateIRPF(annualIncome - privatePensionContributions);
  const expectedRefund = Math.max(0, irpfDue - taxWithDeductions + (medicalExpenses + educationExpenses) * 0.15);
  
  // Status da declaração e restituição
  const declarationStatus = "Processando";
  const refundStatus = "Pendente";
  const expectedRefundDate = "2025-08-15";

  const taxDocuments = [
    { name: "Informe de Rendimentos", type: "PDF", size: "245 KB", status: "Recebido", date: "2025-03-15" },
    { name: "Comprovante INSS", type: "PDF", size: "180 KB", status: "Pendente", date: "2025-03-20" },
    { name: "Declaração IRPF 2024", type: "PDF", size: "1.2 MB", status: "Enviado", date: "2025-04-30" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recebido": return "bg-green-100 text-green-800";
      case "Enviado": return "bg-blue-100 text-blue-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Impostos</h1>
            <p className="text-gray-600 mt-2">Otimize seus impostos e mantenha tudo em dia com o Fisco</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setCalculatorOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Calculator className="w-4 h-4 mr-2" />
              Simular IR
            </Button>
            <Button variant="outline" onClick={() => setDocumentUploadOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Docs
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Renda Anual</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(annualIncome)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">IRPF Devido</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(irpfDue)}</p>
                </div>
                <FileText className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">INSS</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(inssContribution)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Impostos</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalTaxes)}</p>
                </div>
                <Calculator className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="declaration">Declaração IR</TabsTrigger>
            <TabsTrigger value="refund">Restituição</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Fiscal 2025</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Alíquota Efetiva IRPF</span>
                      <span className="font-semibold">{((irpfDue / annualIncome) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Carga Tributária Total</span>
                      <span className="font-semibold">{((totalTaxes / annualIncome) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Renda Líquida Anual</span>
                      <span className="font-semibold text-green-600">{formatCurrency(annualIncome - totalTaxes)}</span>
                    </div>
                    <Progress value={((totalTaxes / annualIncome) * 100)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Oportunidades de Economia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800">Previdência Privada</h4>
                          <p className="text-sm text-green-700">Economia de até R$ 3.200 ao ano com PGBL/VGBL</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Gastos Médicos</h4>
                          <p className="text-sm text-blue-700">Deduza despesas médicas sem limite</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Educação</h4>
                          <p className="text-sm text-yellow-700">Deduza até R$ 3.561 por dependente</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="declaration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status da Declaração 2025</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="font-semibold">Status: {declarationStatus}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Protocolo</span>
                        <span className="font-semibold">12345678901234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Data de Envio</span>
                        <span className="font-semibold">15/04/2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Tipo</span>
                        <span className="font-semibold">Declaração Completa</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Resumo da Declaração</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Rendimentos Tributáveis</span>
                          <span className="text-sm font-semibold">{formatCurrency(annualIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Deduções Totais</span>
                          <span className="text-sm font-semibold">{formatCurrency(totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Base de Cálculo</span>
                          <span className="text-sm font-semibold">{formatCurrency(annualIncome - totalDeductions)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Imposto Devido</span>
                          <span className="text-red-600">{formatCurrency(irpfDue)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deduções Aplicadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Gastos Médicos</h4>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(medicalExpenses)}</p>
                      <p className="text-sm text-blue-600">Dedução integral</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Educação</h4>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(educationExpenses)}</p>
                      <p className="text-sm text-green-600">Limite por dependente</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Previdência Privada</h4>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(privatePensionContributions)}</p>
                      <p className="text-sm text-purple-600">PGBL - 12% da renda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="refund" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status da Restituição</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800">Restituição Aprovada!</h3>
                      <p className="text-3xl font-bold text-green-600 mt-2">{formatCurrency(expectedRefund)}</p>
                      <p className="text-sm text-green-600 mt-1">Previsão: {expectedRefundDate}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Lote</span>
                        <span className="font-semibold">3º Lote/2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Banco</span>
                        <span className="font-semibold">Nubank (260)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Agência</span>
                        <span className="font-semibold">0001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Conta</span>
                        <span className="font-semibold">12345678-9</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Comprovante
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Restituições</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">IR 2024</h4>
                          <p className="text-sm text-gray-500">Recebido em 15/08/2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">R$ 2.850,00</p>
                          <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">IR 2023</h4>
                          <p className="text-sm text-gray-500">Recebido em 20/07/2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">R$ 1.925,00</p>
                          <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">IR 2022</h4>
                          <p className="text-sm text-gray-500">Recebido em 30/06/2022</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">R$ 3.120,00</p>
                          <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Otimização para Próxima Declaração</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800">Aumente Gastos Médicos</h4>
                    <p className="text-sm text-blue-600 mt-2">Faça check-ups e tratamentos preventivos</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">+R$ 800 restituição</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <h4 className="font-semibold text-green-800">Invista em Educação</h4>
                    <p className="text-sm text-green-600 mt-2">Cursos, pós-graduação para você ou dependentes</p>
                    <p className="text-lg font-bold text-green-600 mt-1">+R$ 534 restituição</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-800">Maximize Previdência</h4>
                    <p className="text-sm text-purple-600 mt-2">Contribua até 12% da renda em PGBL</p>
                    <p className="text-lg font-bold text-purple-600 mt-1">+R$ 1.200 restituição</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Fiscais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-semibold">{doc.name}</h4>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendário Fiscal 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Próximos Vencimentos</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-semibold text-red-800">DARF IRPF 4ª Cota</p>
                          <p className="text-sm text-red-600">Vence: 31/07/2025</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-yellow-800">INSS Autônomo</p>
                          <p className="text-sm text-yellow-600">Vence: 15/07/2025</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Datas Importantes</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm">Declaração IRPF 2026</span>
                        <span className="text-sm font-semibold">Março/2026</span>
                      </div>
                      <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm">Malha Fina 2024</span>
                        <span className="text-sm font-semibold">Agosto/2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Calculator Modal */}
        <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Calculadora de IR</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Renda Mensal Bruta</Label>
                <Input type="number" placeholder="Ex: 8500" />
              </div>
              <div>
                <Label>Dependentes</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 dependentes</SelectItem>
                    <SelectItem value="1">1 dependente</SelectItem>
                    <SelectItem value="2">2 dependentes</SelectItem>
                    <SelectItem value="3">3+ dependentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Deduções Médicas (anual)</Label>
                <Input type="number" placeholder="Ex: 2500" />
              </div>
              <Button className="w-full">Calcular IR</Button>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Resultado</h4>
                <p className="text-sm text-blue-700">IR Mensal: R$ 845,20</p>
                <p className="text-sm text-blue-700">IR Anual: R$ 10.142,40</p>
                <p className="text-sm text-blue-700">Salário Líquido: R$ 7.654,80</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Document Upload Modal */}
        <Dialog open={documentUploadOpen} onOpenChange={setDocumentUploadOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload de Documentos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tipo de Documento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informe">Informe de Rendimentos</SelectItem>
                    <SelectItem value="recibo">Recibo de Pagamento</SelectItem>
                    <SelectItem value="comprovante">Comprovante INSS</SelectItem>
                    <SelectItem value="declaracao">Declaração IRPF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG até 10MB</p>
              </div>
              
              <Button className="w-full">Fazer Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}